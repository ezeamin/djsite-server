# Welcome to my Dj Oficial Site (Server) 👋

![Version](https://img.shields.io/badge/version-1.1.1-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/ezeamin/djsite-server#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/ezeamin/djsite-server/graphs/commit-activity)

### An easy to use budgeting tool for your party.

Built with React, Node.js, Express and mongoDB. 

It exposes a CRUD API for the front-end budgeting, and a REST API for the back-end. On a subdomain (branch 'admin'), it includes an admin page. It uses Google Maps API for route calculation and autocomplete. All back-end and front-end routes are protected. 

### 🏠 [Homepage](https://github.com/ezeamin/djsite-server#readme)

### ✨ [Client Demo](https://djezeamin.com)

### 💫 [Server Demo](https://djezeamin.herokuapp.com) (use along with client)

### 👨‍💻 [Admin Demo](https://admin.djezeamin.com)

## Dependencies

Package Manager: [npm](https://www.npmjs.com/) 

- Client dependencies:
  - [React](https://reactjs.org) (v18.1.0)
  - [React-router-dom](https://reactrouter.com/web) (v6.3.0)
  - [React-Bootstrap](https://react-bootstrap.github.io) (v2.3.1)
  - [Bootstrap](https://getbootstrap.com/) (v5.1.3)
  - [Axios](https://axios-http.com/) (v0.27.2)
  - [SweetAlert2](https://sweetalert2.github.io/) (v11.4.10)
  - [React-Places-Autocomplete](https://github.com/hibiken/react-places-autocomplete#readme) (v7.3.0)
  
- Server dependencies:
    
    JavaScript runtime: [Node.js](https://nodejs.org/en/) (v16.13.1)
  - [Express](https://expressjs.com/) (v4.18.1)
  - [Morgan](https://github.com/expressjs/morgan#readme) (v1.10.0)
  - [cors](https://github.com/expressjs/cors#readme) (v2.8.5)
  - [dotenv](https://github.com/motdotla/dotenv#readme) (v16.0.0)
  - [googleapis]
  - [mongoose](https://mongoosejs.com/) (v6.3.3)
  - [node-fetch](https://github.com/node-fetch/node-fetch) (v2.6.7)
  - [nodemailer](https://nodemailer.com/about/) (v6.7.5)
  - [request](https://github.com/request/request#readme) (v2.88.2)
  - [request-promise-native](https://github.com/request/request-promise-native#readme) (v1.0.9)
  - [ua-parser-js](https://github.com/faisalman/ua-parser-js) (v1.0.2)

## Installation

#### Important: You **must** have node.js (tested on v16.13.1) installed on your machine. [Download here](https://nodejs.org/en/download/)

This app works with a mongoDB database. You can and shall install it on your machine or on a remote server before launching the app.

  - Step 1: Install all client and server dependencies
  
    Run the following command at the root directory of the project, both for client and server projects.

    ```sh
    npm install
    ```

  - Step 2: Create a .env file

    1- Navigate to the server's root directory.

    2- Create a .env empty file

    3- Fill in the file with the guidelines provided at the `.env-sample` file in the same directory. During this step, you'll use your local/cloud DB information.

## Usage

#### Important: You will first need to make sure your mongoDB database is up and running.

Run the following command on the root directory of the project, both for client and server projects.

```sh
npm start
```

Server will start and listen on port 5000. Client will start on port 3000.

## Author

👤 **Ezequiel Amin** - Full Stack MERN Developer

- Website: https://ezequielamin.com
- Github: [ezeamin](https://github.com/ezeamin)
- LinkedIn: [Ezequiel Amin](https://linkedin.com/in/ezequielamin)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/ezeamin/djsite-server/issues).

Important: This app has no tests done because there wasn't enough time to do so. Be free to test your code and submit a pull request.

## Show your support

Give a ⭐️ if you found this project nice!
