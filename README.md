# README
This repository contains a project that aims to enhance an existing application by adding new features and improving the user experience.
## Contributors
CHRISTIAN STEPHAN JOSUE - 11 <br>
RAZAKAMALALA NOMENA FITIAVANA - 58
### Backend
The backend was made by Nomena
### Frontend
The frontend was made by Stephan

# Project Description
The goal of this project is to implement the following optional improvements to the existing application:

## Add Toolbar and SideBar/Sidenav: Introduce a Toolbar and a SideBar/Sidenav to enhance the presentation and navigation of the application.

## Implement Login/Password Management:

### Simple Case: 
Hardcode a valid login/password combinations directly in the authentication service. <br>
Username: admin <br>
Password: admin <br>

## Enhance Assignment Model:

Added new properties to the Assignment model, including: <br>
Author (student's name or photo)<br>
Subject (e.g., Databases, Web Technologies, Grails, etc.)<br>
Associate an image with each subject and include a photo of the instructor.<br>
Included a "Grade out of 20" property. An Assignment cannot be marked as "submitted" unless it has been graded.

## Improvements to Assignment Display:
### Updated various sections of the application where Assignments are displayed, edited, or entered.
Displayed each Assignment in the list as a Material Card, showing the title, date, student number, a small image representing the assignment.<br>
In the edit dialog, included additional information such as remarks(comments) and the grade.

### Separated Assignments into two sections:
Differentiate between submitted and unsubmitted Assignments by displaying them in separate sections.<br>
Implemented drag-and-drop functionality to move an Assignment from one section to another. By dragging an unsubmitted Assignment card to the "Submitted" section changes the Assignment's status to "Submitted."

### Use Stepper Form for Assignment Creation:
Implement a multi-step form (Stepper) for adding Assignments.

### Improving the UI:
Made the application visually appealing by incorporating individual design elements, ensuring that each enhancement is unique in appearance.


# How to run the project locally?
### Clone the backend and frontend projects.(In one directory for best practice)
backend repository: https://github.com/NomenaRazakamalala/Assignement-Management-Angular-MongoCloud-Back <br>
frontend repository: https://github.com/stephancj/Assignement-Management-Angular-MongoCloud-Front.git

### Change the API URL in frontend project's different service files
Comment the actual api_uri valiable in these service file and uncomment the local uri

### Install dependencies for each project
Run the command: "npm install" for the backend and frontend

### Run the servers
Frontend: ng serve
Backend: npm run start

### open and test 
Backend: open localhost:8010/api/assignments to test if the backend is running well <br>
Frontend: open localhost:4200 and see if the frontend is displayed

## Login
To login, use "admin" username and "admin" password


# Hosting
The application is hosted in render.com with at these following link: <br>
### Backend: https://nomena58-stephan11-assigment-ws.onrender.com/
### Frontend: https://nomena58-stephan11-assigment-front.onrender.com/
