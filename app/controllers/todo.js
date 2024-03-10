const { DataTypes } = require("sequelize");
const connection = require("../../sequelize");
const TodoModel = require("../models/todo");

const todoController = {
  get: async function (req, res) {
    const sequelize = connection;

    try {
      const todos = await TodoModel(sequelize, DataTypes).findAll();

      return res.status(200).send(todos ?? []);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
  getById: async function (req, res) {
    const sequelize = connection;

    const id = req.params.id;

    try {
      const todo = await TodoModel(sequelize, DataTypes).findOne({
        where: {
          id: id,
        },
      });

      if (!todo) {
        return res.status(404).send({ message: "Todo not found" });
      }

      return res.status(200).send(todo ?? {});
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
  post: async function (req, res) {
    const sequelize = connection;

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    } else if (!description) {
      return res.status(400).send({ message: "Description is required" });
    }

    try {
      const todo = await TodoModel(sequelize, DataTypes).create({
        title: req.body.title,
        description: req.body.description,
        done: req.body.done,
      });

      return res.status(201).send({
        message: "Todo created successfully",
        id: todo.id,
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
  put: async function (req, res) {
    const sequelize = connection;

    const id = req.params.id;

    const { title, description, done } = req.body;

    // Validate if exists a todo with the id
    const todoExists = await TodoModel(sequelize, DataTypes).findOne({
      where: {
        id: id,
      },
    });

    if (!todoExists) {
      return res.status(404).send({ message: "Todo not found" });
    }

    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    } else if (!description) {
      return res.status(400).send({ message: "Description is required" });
    } else if (done === undefined) {
      return res.status(400).send({ message: "Done is required" });
    } else if (typeof done !== "boolean") {
      return res.status(400).send({ message: "Done must be a boolean" });
    }

    try {
      await TodoModel(sequelize, DataTypes).update(
        {
          title: title,
          description: description,
          done: done,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).send({
        message: "Todo updated successfully",
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
  delete: async function (req, res) {
    const sequelize = connection;

    const id = req.params.id;

    // Validate if exists a todo with the id
    const todoExists = await TodoModel(sequelize, DataTypes).findOne({
      where: {
        id: id,
      },
    });

    if (!todoExists) {
      return res.status(404).send({ message: "Todo not found" });
    }

    try {
      await TodoModel(sequelize, DataTypes).destroy({
        where: {
          id: id,
        },
      });

      return res.status(200).send({
        message: "Todo deleted successfully",
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
};

module.exports = todoController;
