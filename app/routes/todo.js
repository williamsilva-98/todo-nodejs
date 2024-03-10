const express = require("express");
const todosController = require("../controllers/todo");

const router = express.Router();

/**
 * Create a route to handle GET requests
 */
router.get("/", todosController.get);

/**
 * Create a route to handle GET requests
 */
router.get("/:id", todosController.getById);

/**
 * Create a route to handle POST requests
 */
router.post("/", todosController.post);

/**
 * Create a route to handle PUT requests
 */
router.put("/:id", todosController.put);

/**
 * Create a route to handle DELETE requests
 */
router.delete("/:id", todosController.delete);

module.exports = router;
