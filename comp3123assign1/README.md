# Assignment 1

This README file provides an overview of the API endpoints included in Assignment 1. The README file contains endpoint routes for user management and employee management, including endpoints for user sign-up, login, and CRUD operations for employee records. Additionally, it explains the use of `express-validator` for request validation and JWT tokens for authentication.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [API Endpoints](#api-endpoints)
   - [User Routes](#user-routes)
   - [Employee Routes](#employee-routes)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

## Overview

The Postman collection titled **Node js - Assignment1** is structured to handle:
- User sign-up and authentication.
- Employee record management, including adding, retrieving, updating, and deleting employee data.
- Validation of API requests using `express-validator`.
- Authentication using JSON Web Tokens (JWT).

## Prerequisites

Before using these endpoints, make sure you have the following prerequisites:
- Node.js installed on your system.
- A local server running on `http://localhost:5000`.
- Postman installed for testing or any other API testing tool.

## API Endpoints

### User Routes

1. **Sign Up**  
   - **Method**: `POST`  
   - **URL**: `http://localhost:5000/api/v1/user/signup`  
   - **Description**: Creates a new user account with validation using `express-validator`.  
   - **Request Body**:
     ```json
     {
       "username": "John",
       "email": "JohnDoe@gmail.com",
       "password": "12345678"
     }
     ```
   - **Authentication**: On successful sign-up, a JWT token is generated for the user.

2. **Login**  
   - **Method**: `POST`  
   - **URL**: `http://localhost:5000/api/v1/user/login`  
   - **Description**: Authenticates a user with email and password using JWT tokens.  
   - **Request Body**:
     ```json
     {
       "email": "JohnDoe@gmail.com",
       "password": "12345678"
     }
     ```
   - **Authentication**: Returns a JWT token upon successful login, which should be used for accessing protected routes.

### Employee Routes

1. **Add Employee**  
   - **Method**: `POST`  
   - **URL**: `http://localhost:5000/api/v1/emp/employees`  
   - **Description**: Adds a new employee record. The request is validated using `express-validator`.  
   - **Request Body**:
     ```json
     {
       "first_name": "John",
       "last_name": "Doe",
       "email": "JohnDoe1@gmail.com",
       "position": "Developer",
       "salary": 2000,
       "department": "Dev"
     }
     ```
   - **Authentication**: Requires a valid JWT token.

2. **Get All Employees**  
   - **Method**: `GET`  
   - **URL**: `http://localhost:5000/api/v1/emp/employees`  
   - **Description**: Retrieves all employee records.
   - **Authentication**: Requires a valid JWT token.

3. **Get Employee By ID**  
   - **Method**: `GET`  
   - **URL**: `http://localhost:5000/api/v1/emp/employees/{employee_id}`  
   - **Description**: Retrieves a specific employee record by ID. Replace `{employee_id}` with the actual ID of the employee.
   - **Authentication**: Requires a valid JWT token.

4. **Delete Employee By ID**  
   - **Method**: `DELETE`  
   - **URL**: `http://localhost:5000/api/v1/emp/employees/{employee_id}`  
   - **Description**: Deletes a specific employee record by ID. Replace `{employee_id}` with the actual ID of the employee.
   - **Authentication**: Requires a valid JWT token.

5. **Update Employee**  
   - **Method**: `PUT`  
   - **URL**: `http://localhost:5000/api/v1/emp/employees/{employee_id}`  
   - **Description**: Updates the details of an existing employee. Replace `{employee_id}` with the actual ID of the employee.  
   - **Request Body**:
     ```json
     {
       "first_name": "John",
       "last_name": "Doe",
       "email": "JohnDoe@gmail.com",
       "position": "Developer",
       "salary": 2000,
       "department": "Dev"
     }
     ```
   - **Authentication**: Requires a valid JWT token.

## Usage

To use the API endpoints:
1. Import the Postman collection into your Postman application.
2. Ensure your local server is running on `http://localhost:5000`.
3. Test each endpoint using the request examples provided.
