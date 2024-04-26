const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require("../models");

router.post("/register", async (req, res) => {
  try {
    const { userLogin, password } = req.body;

    const userExist = await User.findOne({ where: { userLogin } });
    if (userExist) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        userLogin: userLogin,
        password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.log(error, 'error');
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

router.post('/login', async (req, res) => {
    try {
        const { userLogin, password } = req.body;
        
        const user = await User.findOne({ where: { userLogin } });
        
        if (!user) {
            return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
        }
        
        // Generar un token JWT
        const token = jwt.sign(
            { id: user.id, userLogin: user.userLogin }, process.env.SECRET_KEY_JWT, 
            { expiresIn: '1h' } 
        );
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

module.exports = router;