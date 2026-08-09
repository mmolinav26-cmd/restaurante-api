const prisma = require('../config/db');

const getMesas = async (req, res) => {
  const { activa } = req.query;
  try {
    const where = activa !== undefined ? { activa: activa === 'true' } : {};
    const mesas = await prisma.mesa.findMany({ where, orderBy: { numero: 'asc' } });
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar mesas.' });
  }
};

const getMesaById = async (req, res) => {
  const { id } = req.params;
  try {
    const mesa = await prisma.mesa.findUnique({ where: { id: Number(id) } });
    if (!mesa) return res.status(404).json({ error: 'Mesa no encontrada.' });
    res.json(mesa);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mesa.' });
  }
};

const createMesa = async (req, res) => {
  const { numero, capacidad, ubicacion } = req.body;
  if (!numero || !capacidad) {
    return res.status(400).json({ error: 'Número y capacidad son requeridos.' });
  }
  try {
    const nuevaMesa = await prisma.mesa.create({
      data: { numero: Number(numero), capacidad: Number(capacidad), ubicacion }
    });
    res.status(201).json(nuevaMesa);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'El número de mesa ya existe.' });
    }
    res.status(500).json({ error: 'Error al crear la mesa.' });
  }
};

const updateMesa = async (req, res) => {
  const { id } = req.params;
  try {
    const mesaActualizada = await prisma.mesa.update({
      where: { id: Number(id) },
      data: req.body
    });
    res.json(mesaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar mesa.' });
  }
};

const deleteMesa = async (req, res) => {
  const { id } = req.params;
  try {
    const mesaDesactivada = await prisma.mesa.update({
      where: { id: Number(id) },
      data: { activa: false }
    });
    res.json({ mensaje: 'Mesa desactivada exitosamente (Soft Delete)', mesa: mesaDesactivada });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar mesa.' });
  }
};

module.exports = { getMesas, getMesaById, createMesa, updateMesa, deleteMesa };