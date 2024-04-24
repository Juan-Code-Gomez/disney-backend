const express = require("express");
const router = express.Router();
const { Character, Movie } = require("../models");

router.post("/character", async (req, res) => {
  try {
    const { name, age, weight, history, image, movie, movieId } = req.body;

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

module.exports = router;
