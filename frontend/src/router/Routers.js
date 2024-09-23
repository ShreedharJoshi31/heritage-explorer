import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../pages/Home";
import Tours from "./../pages/Tours";
import About from "./../pages/About";
import TourDetails from "./../pages/TourDetails";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Bookings from "../pages/Bookings";
import Map from "../components/Map/Map";
// import DownloadPDF from "../shared/DownloadPDF";
import VerifyBooking from "../pages/VerifyBooking";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/about" element={<About />} />
      <Route path="/bookings" element={<Bookings />} />
      {/* <Route path="/bookings/:id" element={<DownloadPDF />} /> */}
      <Route path="/bookings/verify/:id" element={<VerifyBooking />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  );
};

export default Routers;
