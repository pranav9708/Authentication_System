# Authentication System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/pranav9708/Authentication_System/blob/main/LICENSE)

## Overview

This is a complete authentication system that serves as a starter code for creating new web applications. It includes features like user sign-up, sign-in, sign-out, password reset, and social authentication via Google. The project is built using MongoDB, Express.js, and EJS for templating.

**Repository:** [https://github.com/pranav9708/Authentication_System.git](https://github.com/pranav9708/Authentication_System.git)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
  - [Sign Up](#sign-up)
  - [Sign In](#sign-in)
  - [Sign Out](#sign-out)
  - [Reset Password](#reset-password)
  - [Google Authentication](#google-authentication)
- [Security](#security)
- [Bonus Feature](#bonus-feature)
- [Display Notifications](#display-notifications)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration with email
- User login
- User logout
- Password reset
- Secure storage of encrypted passwords in the database
- Google login/signup (Social authentication)
- **Bonus Feature**: Forgot password (with reset password link)

## Getting Started

### Prerequisites

1. **Node.js:** Ensure you have Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).

2. **MongoDB:** Install and configure MongoDB on your system. You can download it from [mongodb.com](https://www.mongodb.com/try/download/community).

### Installation

1. **Clone this repository** to your local machine:

   ```bash
   git clone https://github.com/pranav9708/Authentication_System.git

2. **Navigate to the project directory**:

    ```bash
    cd Authentication_System

3. **Install the project dependencies**:

    ```bash
    npm install

4. **Create a .env file in the project root directory and configure the following environment variables**:

    ```plaintext
    mongoURL=YOUR_MONGODB_CONNECTION_STRING
    sessionSecret=YOUR_SESSION_SECRET
    clientID=YOUR_GOOGLE_CLIENT_ID
    clientSecret=YOUR_GOOGLE_CLIENT_SECRET
    port=YOUR_PORT_NUMBER
    callbackURL=GOOGLE_CALLBACK_URL
    nodemailerEmail=NODEMAILER_EMAIL;
    nodemailerPassword=NODEMAILER_EMAIL_PASSWORD;

5.  **Start the application**:

    ```bash
    npm start

Access the application in your web browser at http://localhost:3000.

## Folder Structure

The project has a scalable folder structure with separate folders for models, controllers, and routes. The main folders are as follows:

- **models**: Contains database schema definitions.
- **controllers**: Handles the application's logic.
- **routes**: Defines the application's routes.
- **views**: Contains EJS templates for rendering pages.
- **config**: Contains application configuration files.
- **mailer**: Contains functions for sending emails.
- **assets**: Contains CSS and other static assets.

# Authentication System

## Folder Structure

The project has a scalable folder structure with separate folders for models, controllers, and routes. The main folders are as follows:

- **models**: Contains database schema definitions.
- **controllers**: Handles the application's logic.
- **routes**: Defines the application's routes.
- **views**: Contains EJS templates for rendering pages.
- **config**: Contains application configuration files.
- **mailer**: Contains functions for sending emails.
- **assets**: Contains CSS and other static assets.

## Usage

### Sign Up

- Navigate to the registration page at `http://localhost:3000/signup`.
- Provide a valid email address and a strong password.
- Click the "Sign Up" button.
- If successful, you will be redirected to the login page.

### Sign In

- Visit the login page at `http://localhost:3000/login`.
- Enter your registered email and password.
- Click the "Sign In" button.
- Upon successful login, you will be redirected to a blank home page with options to sign out and reset your password.

### Sign Out

- To log out, simply click the "Sign Out" button on the home page.
- You will be logged out and redirected to the login page.

### Password Reset

- If you forget your password, click the "Forgot Password" link on the login page.
- Enter your registered email address.
- An email with a password reset link will be sent to your email address.
- Click the password reset link, and you will be directed to a page to reset your password securely.

### Google Authentication

- Click the "Sign in with Google" button on the login or signup page.
- You will be redirected to Google's authentication page.
- After successful Google authentication, you will be logged in or registered accordingly.

## Security

User passwords are securely stored in the database using encryption. Ensure that you follow best practices for securing your `.env` file, especially the `SESSION_SECRET` and `GOOGLE_CLIENT_SECRET` variables.

## Bonus Feature

The project includes a bonus feature for password recovery, where a password reset link is sent to your email.

## Display Notifications

The application provides notifications for unmatching passwords during sign-up and incorrect passwords during sign-in. These notifications are displayed on the respective pages to provide feedback to the user.

## Contributing

If you would like to contribute to this project or report issues, please refer to the project's [GitHub repository](https://github.com/pranav9708/Authentication_System).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Feel free to customize and expand upon this authentication system to fit the requirements of your specific web application. Enjoy building your projects with this robust authentication system!
