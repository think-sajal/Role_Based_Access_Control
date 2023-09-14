ROLE-BASED ACCESS CONTROL (RBAC) SYSTEM DOCUMENTATION

NOTE 
 - The backend code is in the branch named `backend`
 - The frontend code is in the branch named `frontend`

INTRODUCTION
This document describes the implementation of a Role-Based Access Control (RBAC) system using Node.js, Express, Auth0, Jest, and React. The RBAC system allows two types of roles: Admin and User. An Admin role have the rights to create, update and delete user while User role can only view his profile and can not create, update or delete.


REQUIREMENTS
 1. Node.js -> Node.js is a server-side JavaScript runtime that allows you to build scalable and fast network applications. It uses an event-driven, non-blocking I/O model, which makes it efficient and lightweight. Node.js is widely used for building server-side applications, APIs, and microservices.
 
 2. Express -> Express is a fast, unopinionated, and minimalist web framework for Node.js. It provides a simple way to build web applications and APIs, with features such as middleware, routing, and templating.
 
 3. MySQL -> MySQL is a popular open-source relational database management system that is widely used for building scalable and high-performance applications. It provides features such as ACID compliance, transactions, and full-text search.
 
 4. Sequilize -> Sequelize is a popular Object-Relational Mapping (ORM) library for Node.js that provides a simple way to interact with relational databases such as MySQL. Sequelize allows you to define models and associations between them, query the database, and handle migrations.
 
 5. Auth0 -> Auth0 is a powerful Identity-as-a-Service (IDaaS) platform that provides features such as authentication, authorization, and user management. It allows you to add authentication and authorization to your applications without the need to build and maintain your own identity infrastructure.
 
 6. Jest -> Jest is a popular testing framework for JavaScript applications. It provides a simple way to write unit tests, integration tests, and end-to-end tests for your applications.
 
 7. React -> React is a popular front-end library for building user interfaces. It provides a declarative approach to building components and allows you to build reusable UI components that can be composed to build complex UIs. 

Together, these technologies provide a robust, scalable, and secure framework for building modern web applications and APIs. By using these technologies, you can build high-performance applications that can handle a large number of users, while also providing a great user experience.

SETUP

1. Backend

 - git clone -> https://github.com/think-sajal/auth0_rbac_demo.git
 - git checkout backend
 - Install the dependencies -> npm install
 - Set the environment variables -> .env
 - Run the Application -> npm run dev
 - Run the test cases -> npm test (Add "test":"jest" in script in package.json file)
 
2. Frontend

 - git clone -> https://github.com/think-sajal/auth0_rbac_demo.git
 - git checkout frontend
 - Install the dependencies -> npm install
 - Set the environment variables -> .env
 - Run the Application -> npm start
 
USAGE

1. Backend

 - To start the application, navigate to the root directory and run the command npm start.
 - The index.js file initializes the basic services like express, Sequelize and Auth0.
 - The user.routes.js file defines five routes:
   * `/api/users` (GET) - Retrieves all users after authenticating the JWT access token. If the token is valid, the user is authenticated, otherwise an unauthorized error is returned.
   * `/api/users/:id` (GET) - Retrieves a user by ID after authenticating the JWT access token. If the token is valid, the user is authenticated, otherwise an unauthorized error is returned.
   * `/api/users` (POST) - Creates a user after authenticating the JWT access token and verifying that the user has an Admin role. The role is verified using Auth0. If the user role is not Admin, a forbidden error is returned.
   * `/api/users/:id` (PUT) - Updates a user by ID after authenticating the JWT access token and verifying that the user has an Admin role. If the user role is not Admin, a forbidden error is returned.
   * `/api/users/:id` (DELETE) - Deletes a user by ID after authenticating the JWT access token and verifying that the user has an Admin role. If the user role is not Admin, a forbidden error is returned.
 
2. Frontend
 - The frontend of the application is built using React.
 - To start the frontend, navigate to the client directory and run the command npm start.
 - The App.js file contains the main component which renders the different views based on the user's role.
 - If the user is authenticated and has an Admin role, they will see a dashboard view with options to create, update, and delete users.
 - If the user is authenticated and has a User role, they will see a view with a list of users and their details. They can click on a user to view their details.
 - If the user is not authenticated, they will see a login view where they can enter their credentials and authenticate themselves.

  
