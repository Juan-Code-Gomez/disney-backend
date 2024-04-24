const express = require("express");
const router = express.Router();
const { Movie, Gender } = require("../models");

router.post("/movie", async (req, res) => {
  try {
    const { title, date_created, image, rating, character, genderId } =
      req.body;

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

module.exports = router;
