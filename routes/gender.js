const express = require("express");
const router = express.Router();
const { Gender } = require("../models");

router.post("/gender", async (req, res) => {
  console.log(req, "req");

  try {
    const { name, image, movie } = req.body;

    const newGender = await Gender.create({
      name: name,
      image: image,
      movie: movie,
    });

    res.status(201).json(newGender);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el género" });
  }
});

module.exports = router;
