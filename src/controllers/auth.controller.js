const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const userExist = await prisma.usuario.findUnique({ where: { email } });
    if (userExist) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await prisma.usuario.create({
      data: { nombre, email, passwordHash, rol: 'cliente' },
      select: { id: true, nombre: true, email: true, rol: true, creadoEn: true }
    });

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ error: 'Credenciales incorrectas.' });
    }

    const validPassword = await bcrypt.compare(password, usuario.passwordHash);
    if (!validPassword) {
      return res.status(400).json({ error: 'Credenciales incorrectas.' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el inicio de sesión.' });
  }
};

const getPerfil = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: { id: true, nombre: true, email: true, rol: true, creadoEn: true }
    });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil.' });
  }
};

module.exports = { register, login, getPerfil };