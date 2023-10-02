# GPT Fitness - Client Side
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/vite-4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![axios](https://img.shields.io/badge/axios-1.5.0-0769AD?style=for-the-badge&logo=axios&logoColor=white)


This is the client-side of the GPT Fitness app. This app allows user to input their physical stats, workout days per week, and dietary restrictions and submit a request to the gpt-3.5-turbo api from openai, which will send back a custom fitness and diet plan. Users who signup and login have the ability to save their plans and delete them. Whenever a logged in user clicks the submit button, their details are saved so they do not need to keep entering them again.
Future updates will include the ability to print and email plans.

This application was built using React with Vite.

## Live Demo
Check out the live demo of the Real Estate Listings App [here](https://gpt-fitness-chi.vercel.app/).

## Table of Contents
- [Technologies Used](#technologies-used)
- [Setup & Installation](#installation)
- [Deployment](#deployment)
- [License](#license)
- [Contact Information](#contact-information)

## Technologies Used

- **Backend:**
  - [OpenAI API](https://beta.openai.com/docs/): Utilized to generate custom diet and fitness plans using GPT-3.5 Turbo.
  - [Flask](https://flask.palletsprojects.com/): A lightweight web framework for building the backend of the application.
  - [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/): Flask extension for JSON Web Tokens (JWT) authentication.
  - [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/): Integration of SQLAlchemy with Flask for database management.
  - [Flask-Bcrypt](https://flask-bcrypt.readthedocs.io/): Flask extension for password hashing.
  - [Flask-Migrate](https://flask-migrate.readthedocs.io/): Flask extension for database migrations.
  
- **Frontend:**
  - [React](https://reactjs.org/): A JavaScript library for building the user interface.
  - [Vite](https://vitejs.dev/): A fast build tool and development server for frontend projects.
  
- **Database:**
  - [PostgreSQL](https://www.postgresql.org/): A powerful, open-source relational database system.

- **Deployment:**
  - [Heroku](https://www.heroku.com/): A cloud platform used for hosting the application.

- **Version Control:**
  - [Git](https://git-scm.com/): Distributed version control system used for managing project source code.

- **Package Management:**
  - [pip](https://pip.pypa.io/en/stable/): Python package manager for installing project dependencies.
  
- **Other Tools:**
  - [dotenv](https://pypi.org/project/python-dotenv/): Used for loading environment variables from a `.env` file.
  - [axios](https://axios-http.com/): A promise-based HTTP client for making API requests in React.
  - [Flask-Cors](https://flask-cors.readthedocs.io/): Flask extension for handling Cross-Origin Resource Sharing (CORS).

## Setup and Installation

To set up and run the GPT Fitness application, follow these steps:

1. **Clone the Repository:**
   git clone <https://github.com/8cott/gpt-fitness-client.git>
   cd gpt-fitness-client

2. **Install Dependencies:**
npm install

3. **Development Server:**
npm run dev

## Deployment
The client side of this app is deployed on [Heroku](https://gpt-fitness-server-5c53c1ab4ccd.herokuapp.com/)

## License
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Contact Information
For any questions or feedback, please feel free to reach out to me:
- Scott Rubin
- Email: scottrubin@gmail.com



This app allows user to input their physical stats, workout days per week, and dietary restrictions and submit a request to the gpt-3.5-turbo api from openai, which will send back a custom fitness and diet plan. Users who signup and login have the ability to save their plans and delete them. Whenever a logged in user clicks the submit button, their details are saved so they do not need to keep entering them again.


Live WebsiteLive Website
Website that allows authenticated users to Create, Read, Update, Delete Real Estate Listings.Website that allows authenticated users to Create, Read, Update, Delete Real Estate Listings.
GitHub - Client Side Source CodeGitHub - Client Side Source Code
GitHub - Server Side Source Code