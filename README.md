# GeoState Project README

Welcome to the GeoState project repository! This project is just template for buildig a scalable website without using any frameworks. Below is a guide to help you understand the project structure and how to set it up locally.
Project Structure

The project is organized into several HTML, CSS, and JavaScript files, along with Firebase integration for authentication and Firestore for data storage. Here’s a brief overview of the main files and directories:

## HTML Files:
   ### index.html: Main entry point containing the sign-in/sign-up functionality.
   ###  homepage.html: Home page featuring navigation, reviews, and information about top destinations.
   ### placepage.html: Detailed page for each travel destination, displaying images, descriptions, and booking options.

## CSS Files:
   ### sign_in.css: Styles for the sign-in/sign-up forms.
   ### home_page.css: Styles for the homepage layout and components.
   ### placepage.css: Styles for the detailed destination pages.

## JavaScript Files:
   ### signIn.js: Handles user authentication using Firebase Authentication API.
   ### homepage.js: Manages carousel functionality and data fetching from Firestore.
   ### placePage.js: Handles dynamic content rendering for destination pages.

## Firebase Configuration:
   ## firebase/firebase.js: Firebase SDK setup for authentication and Firestore database.
   ## js/userAuthentication.js: Contains functions for user authentication (signin, signup, Google OAuth) and signout functionality.

## Setup Instructions

To run this project locally, follow these steps:

   ### Clone the Repository:

    bash

    git clone https://github.com/Rohit-Bhetal/GeoState.git
    cd GeoState

   ## Set Up Firebase:
Create a Firebase project at Firebase Console.
Obtain your Firebase SDK configuration (apiKey, authDomain, projectId, etc.).
Replace the placeholder configuration in firebase/firebase.js with your Firebase project configuration.

## Install Dependencies:
This project uses no additional dependencies outside of Firebase, which is managed via CDN links. Ensure you have a stable internet connection to fetch these dependencies.

## Run the Project:
Open any HTML file (e.g., index.html, homepage.html, placepage.html) in a web browser.
Navigate through the application to test the sign-in, sign-up, and destination booking functionalities.

## Usage and Features

   ### Authentication:
Users can sign in using email/password or Google OAuth.
New users can register using email/password.

   ### Homepage:
Displays a carousel of destination images and reviews.
Allows users to search for hotels and explore top destinations.

   ### Destination Pages:
Each destination page (placepage.html) shows detailed information about a specific location.
Users can view images, read descriptions, and book accommodations.

Contributions

Contributions to the GeoState project are welcome. If you find any bugs, have feature requests, or would like to contribute enhancements, please fork the repository and submit a pull request. Ensure that your code follows the project’s coding standards and practices.I'm thinking to add a payment gateway system but firebase dont provide any free payment method.Lets hope to solve the issue
