const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Movie, Gender } = require("../models");

router.post("/movie", async (req, res) => {
  try {
    const { title, date_created, image, rating, character, genderId } =
      req.body;

    if (!title || !date_created || !image || !rating || !character) {
      return res.status(400).json({
        error:
          `${req.body}Todos los campos (title, date_created, image, rating, character) son requeridos.`,
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
    const { title, date_created, rating, gender_id, sort_order } = req.query;

    console.log(gender_id, 'gender_id');

    let conditions = [];
    const includeConditions = [];

    if (!title && !date_created && !rating && !gender_id) {
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
      if (gender_id) {
        includeConditions.push({
          model: Gender,
          where: {
            id: gender_id,
          },
          through: {
            attributes: []
          }
        });
      }

      let order = [];
      if (sort_order) {
        order.push(['date_created', sort_order]);
      }

      const movies = await Movie.findAll({
        where: {
          [Op.and]: conditions,
        },
        include: includeConditions,
        order: order,
      });

      if (movies.length > 0) {
        res.json(movies);
      } else {
        res.status(200).send([])
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error al realizar la consulta");
  }
});


router.put("/movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const updatedData = req.body;

    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Pelicula no encontrada." });
    }
    await movie.update(updatedData);
    res.json(movie);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al editar la pelicula." });
  }
});

router.delete("/movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Pelicula no encontrada." });
    }

    await movie.destroy();
    res.json({ message: "Pelicula eliminada exitosamente." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al eliminar la pelicula." });
  }
});

module.exports = router;
