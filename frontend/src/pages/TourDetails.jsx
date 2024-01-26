import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup, Progress } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import useFetch from "./../hooks/useFetch";
import { BASE_URL, FLASK_URL } from "./../utils/config";
import { AuthContext } from "./../context/AuthContext";
import axios from "axios";
import { Badge } from "reactstrap";
import TourCard from "../shared/TourCard";
import Subtitle from "../shared/Subtitle";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  // fetch data from database

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  // destructure proprties tour objeccct
  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // format date
  const options = { day: "numeric", month: "long", year: "numeric" };
  const [clickedRating, setClickedRating] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [totalAvailableTickets, setTotalAvailableTickets] = useState(null);
  const [overallSentiment, setOverallSentiment] = useState("positive");

  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);

  const calculateSentiment = () => {
    let posCount = 0;
    let negCount = 0;
    let neuCount = 0;

    if (reviews) {
      reviews.forEach((review) => {
        switch (review.sentiment) {
          case 1:
          case 2:
            negCount++;
            break;
          case 3:
            neuCount++;
            break;
          case 4:
          case 5:
            posCount++;
            break;
          default:
            break;
        }
      });
    }

    setPositiveCount(posCount);
    setNegativeCount(negCount);
    setNeutralCount(neuCount);

    setOverallSentiment(
      positivePercentage > negativePercentage
        ? positivePercentage > neutralPercentage
          ? "positive"
          : "neutral"
        : negativePercentage > neutralPercentage
        ? "negative"
        : "neutral"
    );
  };

  const totalReviews = positiveCount + negativeCount + neutralCount; // Add 1 for the current review
  const positivePercentage = (positiveCount / totalReviews) * 100;
  const negativePercentage = (negativeCount / totalReviews) * 100;
  const neutralPercentage = (neutralCount / totalReviews) * 100;

  const fetchAvailableTickets = async () => {
    if (selectedDate) {
      console.log(selectedDate);
      try {
        const response = await fetch(
          `${BASE_URL}/available-tickets?date=${selectedDate}&tourName=${title}`
        );
        if (response.ok) {
          const data = await response.json();
          setTotalAvailableTickets(data.totalAvailableTickets);
          console.log(totalAvailableTickets);
        } else {
          setTotalAvailableTickets(null);
        }
      } catch (error) {
        console.error("Error fetching available tickets:", error);
        setTotalAvailableTickets(null);
      }
    }
  };

  // submit request to the  server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user || user === undefined || user === null) {
      alert("please sign in");
    }
    try {
      if (!user || user === undefined || user === null) {
        alert("please sign in");
      }

      const pythonServerUrl = `${FLASK_URL}/predict`;
      const pythonServerResponse = await axios.post(pythonServerUrl, {
        text: reviewText,
      });

      // Get sentiment result from the Python server response
      const sentimentClass = pythonServerResponse.data.sentiment_class;

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: clickedRating,
        sentiment: sentimentClass,
      };

      console.log("Submitting review:", reviewObj);

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      console.log("Response:", res);

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again later.");
    }

    setClickedRating(null);
  };

  const fetchDataForId = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/tours/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for ID ${id}:`, error.message);
      return null;
    }
  };

  const [recommendedTours, setRecommendedTours] = useState();

  const getRecommendedTours = async () => {
    try {
      const pythonServerResponse = await axios.post(`${FLASK_URL}/recommend`, {
        title: title,
      });

      const results = await Promise.all(
        pythonServerResponse.data.recommendations.map((id) =>
          fetchDataForId(id)
        )
      );

      const ans = results.map((item) => {
        return item.data;
      });

      setRecommendedTours(ans);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(recommendedTours);

  const finalAvailableTickets =
    totalAvailableTickets > -1 ? totalAvailableTickets : maxGroupSize;

  function formatDateString(inputDateString) {
    const inputDate = new Date(inputDateString);

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const formattedDate = inputDate.toLocaleString("en-US", options);

    return formattedDate;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAvailableTickets();
    calculateSentiment();
  }, [tour, selectedDate]);

  useEffect(() => {
    getRecommendedTours();
  }, [title]);

  return (
    <>
      <section>
        <Container>
          {loading && (
            <h4 className="text-center pt-5">Loading.............</h4>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="Not shown" />
                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1 ">
                        <i
                          class="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i class="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i class="ri-map-pin-2-line"></i> {city}
                      </span>
                      <span>
                        <i class="ri-money-dollar-circle-line"></i> ₹{price} /
                        per person
                      </span>
                      <span>
                        <i class="ri-group-line"></i>
                        {finalAvailableTickets} left
                      </span>
                    </div>
                    <h5>Echoes of the Past</h5>
                    <p>{desc}</p>
                  </div>
                  {/* {=========================== tour reviws Section==================} */}
                  <div className="tour__reviews mt-4">
                    <h4>
                      Reviews ({reviews?.length} reviews)
                      {overallSentiment && (
                        <Badge
                          color={
                            overallSentiment === "positive"
                              ? "success"
                              : overallSentiment === "negative"
                              ? "danger"
                              : "secondary"
                          }
                          className="ml-2"
                          pill
                          style={{ marginLeft: "5px" }}
                        >
                          Overall Sentiment: {overallSentiment}
                        </Badge>
                      )}
                    </h4>
                    <div className="sentiment_progress_bar-container d-flex">
                      <div className="sentiment_progress_bar d-flex">
                        <p>Positive : </p>
                        <Progress
                          multi
                          className="mb-3"
                          style={{ width: "55%", marginLeft: "15px" }}
                        >
                          <Progress
                            bar
                            color="success"
                            value={positivePercentage}
                          >
                            {Math.round(positivePercentage)}%
                          </Progress>
                        </Progress>
                      </div>

                      <div className="sentiment_progress_bar d-flex">
                        <p>Negative : </p>

                        <Progress
                          multi
                          className="mb-3"
                          style={{ width: "55%", marginLeft: "5px" }}
                        >
                          <Progress
                            bar
                            color="danger"
                            value={negativePercentage}
                          >
                            {Math.round(negativePercentage)}%
                          </Progress>
                        </Progress>
                      </div>

                      <div className="sentiment_progress_bar d-flex">
                        <p>Neutral : </p>

                        <Progress
                          multi
                          className="mb-3"
                          style={{ width: "55%", marginLeft: "16px" }}
                        >
                          <Progress
                            bar
                            color="secondary"
                            value={neutralPercentage}
                          >
                            {Math.round(neutralPercentage)}%
                          </Progress>
                        </Progress>
                      </div>
                    </div>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span
                            key={rating}
                            onMouseEnter={() => setTourRating(rating)}
                            onMouseLeave={() => setTourRating(null)}
                            onClick={() => setClickedRating(rating)}
                            className={`${
                              clickedRating >= rating ? "clicked" : ""
                            }`}
                          >
                            {rating}
                            <i class="ri-star-s-fill"></i>
                          </span>
                        ))}
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {/* {new Date().toLocaleDateString(
                                    "en-us",
                                    options
                                  )} */}
                                  {formatDateString(review.createdAt)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i class="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* {=========================== tour reviews Section end ==================} */}
                </div>
              </Col>
              <Col lg="4">
                <Booking
                  tour={tour}
                  avgRating={avgRating}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  totalAvailableTickets={totalAvailableTickets}
                  setTotalAvailableTickets={setTotalAvailableTickets}
                />
              </Col>
            </Row>
          )}
          <Container>
            <Row>
              <Col lg="12" className="mb-5 mt-5">
                <Subtitle subtitle={"Explore"} />
                <h2 className="featured__tour-title">Recommended for you</h2>
              </Col>
              {recommendedTours?.map((tour, index) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
            </Row>
          </Container>
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
