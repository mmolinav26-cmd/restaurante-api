const prisma = require('../config/db');

const createReservacion = async (req, res) => {
  const { mesa_id, fecha, hora, num_comensales } = req.body;
  const usuario_id = req.user.id;

  if (!mesa_id || !fecha || !hora || !num_comensales) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const mesa = await prisma.mesa.findUnique({ where: { id: Number(mesa_id) } });
    if (!mesa || !mesa.activa) {
      return res.status(400).json({ error: 'Mesa no disponible o inactiva.' });
    }

    if (Number(num_comensales) > mesa.capacidad) {
      return res.status(400).json({ error: `La capacidad máxima es de ${mesa.capacidad} personas.` });
    }

    const fechaObj = new Date(fecha);
    const reservaExistente = await prisma.reservacion.findFirst({
      where: {
        mesaId: Number(mesa_id),
        fecha: fechaObj,
        hora: String(hora),
        NOT: { estado: 'cancelada' }
      }
    });

    if (reservaExistente) {
      return res.status(409).json({ error: 'Mesa ocupada en esa fecha y hora.' });
    }

    const nuevaReserva = await prisma.reservacion.create({
      data: {
        usuarioId: usuario_id,
        mesaId: Number(mesa_id),
        fecha: fechaObj,
        hora: String(hora),
        numComensales: Number(num_comensales),
        estado: 'pendiente'
      }
    });

    res.status(201).json({ mensaje: 'Reservación creada exitosamente', reservacion: nuevaReserva });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar reservación.' });
  }
};

const getMisReservaciones = async (req, res) => {
  try {
    const reservaciones = await prisma.reservacion.findMany({
      where: { usuarioId: req.user.id },
      include: { mesa: true },
      orderBy: { fecha: 'desc' }
    });
    res.json(reservaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservaciones.' });
  }
};

const getAllReservaciones = async (req, res) => {
  const { fecha, estado } = req.query;
  try {
    const where = {};
    if (fecha) where.fecha = new Date(fecha);
    if (estado) where.estado = estado;

    const reservaciones = await prisma.reservacion.findMany({
      where,
      include: { usuario: { select: { id: true, nombre: true, email: true } }, mesa: true },
      orderBy: { fecha: 'desc' }
    });
    res.json(reservaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar reservaciones.' });
  }
};

const updateEstadoReservacion = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const reservacionActualizada = await prisma.reservacion.update({
      where: { id: Number(id) },
      data: { estado }
    });
    res.json({ mensaje: 'Estado actualizado', reservacion: reservacionActualizada });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado.' });
  }
};

const cancelReservacion = async (req, res) => {
  const { id } = req.params;
  try {
    const cancelada = await prisma.reservacion.updateMany({
      where: { id: Number(id), usuarioId: req.user.id },
      data: { estado: 'cancelada' }
    });

    if (cancelada.count === 0) {
      return res.status(404).json({ error: 'Reservación no encontrada.' });
    }
    res.json({ mensaje: 'Reservación cancelada.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar la reservación.' });
  }
};

module.exports = { createReservacion, getMisReservaciones, getAllReservaciones, updateEstadoReservacion, cancelReservacion };