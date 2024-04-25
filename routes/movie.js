const express = require("express");
const router = express.Router();
const { Movie, Gender } = require("../models");

router.post("/movie", async (req, res) => {
  try {
    const { title, date_created, image, rating, character, genderId } =
      req.body;

    if (!title || !date_created || !image || !rating || !character) {
      return res.status(400).json({
        error:
          "Todos los campos (title, date_created, image, rating, character) son requeridos.",
      });
    }

    const newMovie = await Movie.create({
      title: title,
      date_created: date_created,
      image: image,
      rating: rating,
      character: character,
    });

    if (genderId) {
      const gender = await Gender.findByPk(genderId);

      if (gender) {
        await newMovie.addGender(gender, {
          through: {
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      } else {
        // Si el género no se encuentra, devolver un error
        return res.status(404).json({ error: "Género no encontrado" });
      }
    }

    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la película" });
  }
});

router.get("/movie", async (req, res) => {
  try {
    const { title, date_created, rating } = req.query;

    let conditions = [];

    if (!title && !date_created && !rating) {
      Movie.findAll().then((movie) => {
        res.json(movie);
      });
    } else {
      if (title) {
        conditions.push({ title: { [Op.like]: `%${title}%` } });
      }

      if (date_created) {
        conditions.push({ date_created });
      }

      if (rating) {
        conditions.push({ rating });
      }

      const movies = await Movie.findAll({
        where: {
          [Op.or]: conditions,
        },
      });

      if (movies.length > 0) {
        res.json(movies);
      } else {
        res.send(
          "No se encontraron peliculas con los parametros especificados"
        );
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error al realizar la consulta");
  }
});

module.exports = router;
