const express = require("express");
const router = express.Router();
const { Gender, Movie } = require("../models");

router.post("/gender", async (req, res) => {
  console.log(req, "req");

  try {
    const { name, image, movie } = req.body;

    if (name === '' || image === '' || name === undefined || image === undefined) {
      console.log('entramos al if');
      return res.status(400).json("Debes ingresar un nombre y una imagen")
    }

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

router.get("/gender", async (req, res) => {
  try {
    const genderId = req.query.id;
    const genderName = req.query.name;

    if (!genderId && !genderName) {
      return res
        .status(400)
        .json({ error: "Debes proporcionar un ID o un nombre para el género" });
    }

    let gender;
    if (genderId) {
      gender = await Gender.findByPk(genderId, {
        include: {
          model: Movie,
          through: { attributes: [] },
        },
      });
    } else if (genderName) {
      gender = await Gender.findOne({
        where: { name: genderName },
        include: {
          model: Movie,
          through: { attributes: [] },
        },
      });
    }

    if (!gender) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    return res.json(gender.Movies);
  } catch (error) {
    console.error("Error al obtener películas asociadas al género:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
