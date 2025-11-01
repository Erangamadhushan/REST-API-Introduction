# Building a Simple REST API using Node.js and Express

### Now let's create a REST AP and perform the various HTTP operations.

**step 1**:
Create the NodeJS project by using the following command

```js
mkdir node-app
cd node-app
```

**Step 2**:
Install the package.json

```js
npm init -y
```

**Step 3**:
Install Express
To begin building a REST API in Node.js, you need to install <a>Express</a>. Run the following command in your terminal

```js
npm install express
```

**Step 4**:
Create the Server
Here's basic example of creating a REST API in Node.js using Express

```js
// Import the Express module
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Define a route for GET requests
app.get('/users', (req, res) => {
    res.json({ message: 'Returning list of users' });
});

// Define a route for POST requests
app.post('/users', (req, res) => {
    const newUser = req.body;
    res.json({ message: 'User created', user: newUser });
});

// Define a route for PUT requests
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    res.json({ message: `User with ID ${userId} updated`, updatedUser });
});

// Define a route for DELETE requests
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId} deleted` });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

```

**Output**: To test the API, open http://localhost:3000 in Postman or another API testing tool.


## Features of REST APIs

- **Stateless**: Each request from a client to a server must contain all the information the server needs to fulfill the request. No session state is stored on the server.

- **Client-Server Architecture**: RESTful APIs are based on a client-server model, where the client and server operate independently, allowing scalability.

- **Cacheable**: Responses from the server can be explicitly marked as cacheable or non-cacheable to improve performance.

- **Uniform Interface**: REST APIs follow a set of conventions and constraints, such as consistent URL paths, standardized HTTP methods, and status codes, to ensure smooth communication.

- **Layered System**: REST APIs can be deployed on multiple layers, which helps with scalability and security.


## Real world Example of Rest APIs :

REST APIs are widely used across various industries to simplify communication between systems. Some common applications include:

- **Social Media**: Integrating third-party platforms like Facebook, Twitter, and Instagram for features like login, sharing, and posting.

- **E-Commerce**: Managing products, processing payments, handling orders, and customer management.

- **Geolocation Services**: GPS tracking, real-time location updates, and location-based services like finding nearby places.

- **Weather Forecasting**: Fetching weather data from external sources to provide real-time weather updates and forecasts.




