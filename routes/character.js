const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Character, Movie } = require("../models");

router.post("/character", async (req, res) => {
  try {
    const { name, age, weight, history, image, movie, movieId } = req.body;

    if (!name || !age || !weight || !history || !image || !movie) {
      return res.status(400).json({
        error:
          "Todos los campos (name, age, weight, history, image) son requeridos.",
      });
    }

    const newCharacter = await Character.create({
      name: name,
      age: age,
      weight: weight,
      history: history,
      image: image,
      movie: movie,
    });

    if (movieId) {
      const movie = await Movie.findByPk(movieId);

      if (movie) {
        await newCharacter.addMovie(movie, {
          through: {
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      } else {
        // Si la pelicula no se encuentra, devolver un error
        return res.status(404).json({ error: "Pelicula no encontrada" });
      }
    }

    res.status(201).json(newCharacter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el personaje" });
  }
});

router.get("/character", async (req, res) => {
  try {
    const { name, age, movie } = req.query;

    let conditions = [];

    if (!name && !age && !movie) {
      Character.findAll().then((character) => {
        res.json(character);
      });
    } else {
      if (name) {
        conditions.push({ name: { [Op.like]: `%${name}%` } });
      }

      if (age) {
        conditions.push({ age });
      }

      if (movie) {
        conditions.push({ movie });
      }

      const characters = await Character.findAll({
        where: {
          [Op.and]: conditions,
        },
      });

      if (characters.length > 0) {
        res.json(characters);
      } else {
        res.status(200).send([])
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrió un error al realizar la consulta.");
  }
});

module.exports = router;
