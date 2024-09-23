# Heritage Explorer

![image](https://github.com/ShreedharJoshi31/heritage-explorer/assets/99608980/cfc118f6-368c-4944-b632-7603a3d0b802)

Heritage Explorer is a web application that allows users to explore various historical sites in Maharashtra, India. It provides detailed information about these historical places and allows users to book tickets for visiting them.

## Table of Contents

1. [Project Description](#project-description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [Generating QR Codes](#generating-qr-codes)
8. [Sentiment Analysis](#sentiment-analysis)
9. [Ticket Verification and Validation](#ticket-verification-and-validation)
10. [Dynamic Tour Recommendations](#dynamic-tour-recommendations)
11. [Closing](#closing)

### Project Description

Heritage Explorer is a web-based platform that aims to promote and educate users about the rich historical heritage of Maharashtra. It offers a comprehensive database of historical sites, complete with detailed information, images, and the ability to book tickets for visits.

### Features

- Explore a wide range of historical sites in Maharashtra.
- View detailed information about each historical site, including history, significance, and visitor information.
- Book tickets for visiting historical places.
- User registration and authentication.
- User reviews and ratings for historical sites.
- Generate QR codes for bookings, allowing easy access to a PDF with booking details.
- **Sentiment Analysis**: Analyze comments on each tour details page to provide insights into the sentiment expressed by users.
- **Dynamic Tour Recommendations**: Receive personalized tour recommendations based on each tour, enhancing the user experience and encouraging exploration.
- **Ticket Verification**: Heritage Explorer now includes ticket verification to prevent reuse of tickets for multiple entries. QR codes are validated in real time at the entrance, ensuring each ticket is used only once.

### Technologies Used

- MongoDB: Database for storing historical site information.
- Express.js: Backend server for handling API requests.
- React: Frontend for the user interface.
- Node.js: Runtime for the backend server.
- Python: ML models and Flask
- Other libraries and tools as needed.

### Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables as specified below.

### Usage

1. Run the backend development server with `npm run dev`.
2. Run the frontend development server with `npm run start`.
3. Run the Flask development server with `python model.py`.
4. Access the website through your web browser.

### Configuration

Before running the application, you need to set up the following environment variables in a `.env` file:

- `PORT`: The port on which the server will run.
- `MONGO_URI`: The URI for your MongoDB database.
- `JWT_SECRET_KEY`: A secret key used for JWT token generation and authentication.
- `RAZORPAY_KEY_ID`: The Razorpay API Key ID for handling payments.
- `RAZORPAY_KEY_SECRET`: The Razorpay API Key Secret for payment processing.
- `FRONTEND_URL`: The URL of the frontend application (for enabling CORS and cross-origin requests).

Make sure to provide appropriate values for these variables before running the application. You can create a `.env` file in the root directory of the backend and define these variables according to your setup.

Here's an example of what your `.env` file might look like:

```plaintext
PORT=5000
MONGO_URI=mongodb://localhost/heritage_explorer
JWT_SECRET_KEY=your-secret-key
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=https://your-frontend-url.com
```

### Generating QR Codes

When a booking is made through the /bookings endpoint, a QR code is generated for that booking. Scanning the QR code will provide a PDF with all the booking details, making it easy for users to access and present their booking information.

### Sentiment Analysis

The platform incorporates sentiment analysis to provide insights into user comments on each tour details page. This feature allows users and administrators to understand the overall sentiment expressed in the comments section.

### Ticket Verification and Validation

In order to prevent the misuse of tickets for multiple entries, Heritage Explorer now includes a ticket verification and validation feature. When users present their QR code at the entrance of a historical site, the system checks its validity in real time. This ensures that each ticket is valid for one-time use only, preventing duplicate entries.

This feature is seamlessly integrated into the booking system, providing a secure and streamlined process for both users and site administrators.

### Dynamic Tour Recommendations

Receive personalized tour recommendations based on each tour you explore. This dynamic feature enhances the user experience, providing tailored suggestions for further exploration.

## Closing

Thank you for exploring Heritage Explorer, your gateway to the rich historical heritage of Maharashtra. We hope you find this platform informative and useful in your journey to discover and experience the history and culture of this beautiful region.
If you have any questions, encounter issues, or wish to contribute to the project, please don't hesitate to get in touch. Your feedback and involvement are highly valued as we continue to improve and expand the Heritage Explorer experience.
Enjoy your exploration of Maharashtra's heritage, and let the journey begin!
