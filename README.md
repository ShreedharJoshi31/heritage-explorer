# Heritage Explorer

![Screenshot (869)](https://github.com/ShreedharJoshi31/heritage-explorer/assets/99608980/501f844a-9c51-483d-844d-647ef21ddef0)


Heritage Explorer is a web application that allows users to explore various historical sites in Maharashtra, India. It provides detailed information about these historical places and allows users to book tickets for visiting them.

## Table of Contents
1. [Project Description](#project-description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [API Routes](#api-routes)
    - [Auth Routes](#api-routes-apiv1)
    - [Booking Routes](#booking-routes)
    - [Payment Routes](#payment-routes)
    - [Review Routes](#review-routes)
    - [User Routes](#user-routes)
    - [Tour Routes](#tour-routes)
8. [Deployment](#deployment)
9. [Closing](#closing)

### Project Description
Heritage Explorer is a web-based platform that aims to promote and educate users about the rich historical heritage of Maharashtra. It offers a comprehensive database of historical sites, complete with detailed information, images, and the ability to book tickets for visits.

### Features
- Explore a wide range of historical sites in Maharashtra.
- View detailed information about each historical site, including history, significance, and visitor information.
- Book tickets for visiting historical places.
- User registration and authentication.
- User reviews and ratings for historical sites.
- Generate QR codes for bookings, allowing easy access to a PDF with booking details.

### Technologies Used
- MongoDB: Database for storing historical site information.
- Express.js: Backend server for handling API requests.
- React: Frontend for the user interface.
- Node.js: Runtime for the backend server.

### Installation
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables as specified in `.env.example`.

### Usage
1. Run the backend with `npm run start-dev`.
2. Run the frontend with `npm run start`.

### Configuration
Before running the application, you need to set up the following environment variables in a `.env` file:

- `PORT`: The port on which the server will run.
- `MONGO_URI`: The URI for your MongoDB database.
- `JWT_SECRET_KEY`: A secret key used for JWT token generation and authentication.
- `RAZORPAY_KEY_ID`: The Razorpay API Key ID for handling payments.
- `RAZORPAY_KEY_SECRET`: The Razorpay API Key Secret for payment processing.
- `FRONTEND_URL`: The URL of the frontend application (for enabling CORS and cross-origin requests).

Make sure to provide appropriate values for these variables before running the application. You can create a `.env` file in the root directory of the backend and define these variables according to your setup.

### API Routes (/api/v1)

#### Auth Routes
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in a user.

#### Booking Routes
- `GET /booking`: Get all user bookings (requires user authentication).
- `POST /booking`: Create a new booking (requires user authentication).
- `GET /booking/:id`: Get a specific booking.
- `DELETE /booking/:id`: Delete a specific booking.
- `GET /booking`: Get all bookings (requires admin authentication).
- `GET /booking/user/:userId`: Get bookings for a specific user.
- `GET /booking/qrcode/:bookingId`: Generate a QR code for a booking.

#### Payment Routes
- `POST /payment/checkout`: Initiate a payment checkout process.
- `POST /payment/verification`: Verify payment details.

#### Review Routes
- `POST /review/:tourId`: Create a review for a tour.

#### User Routes
- `PUT /users/:id`: Update user information (requires user authentication).
- `DELETE /users/:id`: Delete a user (requires user authentication).
- `GET /users/:id`: Get information for a specific user (requires user authentication).
- `GET /users`: Get all users (requires admin authentication).

#### Tour Routes
- `POST /tours`: Create a new tour (requires admin authentication).
- `PUT /tours/:id`: Update a tour (requires admin authentication).
- `DELETE /tours/:id`: Delete a tour (requires admin authentication).
- `GET /tours/:id`: Get information for a specific tour.
- `GET /tours`: Get a list of all tours.
- `GET /tours/search/getTourBySearch`: Search for tours by specific criteria.
- `GET /tours/search/getFeaturedTour`: Get featured tours.
- `GET /tours/search/getTourCount`: Get the total count of tours.

### Deployment

- **Frontend**: The frontend of Heritage Explorer is deployed on Netlify. You can access the live website at [Heritage Explorer Frontend](https://heritage-explorer-31.netlify.app/home). The frontend interacts with the backend server to provide users with historical site information and booking services.

- **Backend**: The server of Heritage Explorer is deployed on Render. The backend API is hosted at [Heritage Explorer Backend](https://heritage-explorer-backend.onrender.com). The server handles user authentication, database interactions, payment processing, and more.


## Closing

Thank you for exploring Heritage Explorer, your gateway to the rich historical heritage of Maharashtra. We hope you find this platform informative and useful in your journey to discover and experience the history and culture of this beautiful region.

If you have any questions, encounter issues, or wish to contribute to the project, please don't hesitate to get in touch. Your feedback and involvement are highly valued as we continue to improve and expand the Heritage Explorer experience.

Enjoy your exploration of Maharashtra's heritage, and let the journey begin!

[Visit Heritage Explorer](https://heritage-explorer-31.netlify.app/)
