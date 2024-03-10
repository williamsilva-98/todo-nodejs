require('dotenv').config();

const express = require("express");
const todoRoutes = require("./app/routes/todo");

/**
 * Create an instance of express
 * and assign it to the app variable
 */
const app = express();

/**
 * Middleware to parse the request body
 * and add it to the request object
 */
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * Create a route to handle GET requests
 * to the root URL
 *
 * The callback function takes two parameters:
 * - req: the request object
 * - res: the response object
 */
app.use("/todos", todoRoutes);

/**
 * Make the app listen on port 3000
 */
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
