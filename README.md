# Organic Food Grocer Web Application Full Stack Development Assignment
The above git repository is the submission of an Assignment in my Full Stack Development Course which I took 03.2024. This project was worked on along side of Huseyin Bator.
The Features which I primarily worked on are:
- Special Deals Page
- Shopping Page
- Checkout Pages

## Project Overview:
SOIL is a long-term organic food grocer with several store locations around Melbourne. They focus on bringing premium, organic fresh food to the community and offer face-to-face seminars on diet, nutrition, and small-scale organic farming. To modernize their operations and compete with other online food businesses, we developed a new website experience for their business.

## Features

### Frontend Features

1. **UI Structure**:
    - Header
    - Footer
    - Main Areas
    - Navigation Bar

2. **Landing Home Page**:
    - Displays information regarding organic foods and nutritional advice

3. **Authentication**:
    - Sign Up Page
    - Sign In Page

4. **Special Deals Page**:
    - Displays special offers and deals

5. **Shopping Page**:
    - Display all available products allowing the locked out user to go through to checkout

6. **Checkout Pages**:
    - Display summary of the users order, financial information validation...

7. **User Profile** (for logged-in users):
    - View profile details
    - Edit profile details
    - Delete profile details

### Backend Features

1. **API Endpoints**:
    - User authentication (sign up, sign in)
    - CRUD operations for user profiles
    - Fetching special deals and nutritional advice

2. **Database**:
    - Cloud MySQL database to store user information and deals

## Technology Stack

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js, Sequelize, cors
- **Database**: Cloud MySQL

## Screenshots
[Screenshots](https://docs.google.com/document/d/11Emcymn0s-1uubmTwI3J3mycLLzaUswJ8cMOvimghbk/edit?usp=sharing)

## Setup Instructions

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MySQL Database

### Installation

1. **Clone the repository**

2. **Setup Client:**
- 'cd client'
- 'npm install'
- 'npm start'

3. **Configure Server:**
- Navigate to 'Server/src/database/config.js'
- Configure to existing cloud MySQL database
- NOTE: This will write data over the configured MySQL database, make sure there is nothing important in the database configured

4. **Setup Server:**
- 'cd server'
- 'npm install'
- 'npm start'

5. On a browser navigate to 'http://localhost:3000'.
