export const translateService = (service) => {
  const serviceMap = {
    electricity: "Electricidad",
    plumbing: "Plomeria",
    gas: "Gas",
    gardening: "Jardineria",
    locksmith: "Cerrajeria",
    painting: "Pintura",
    construction: "Construccion",
    pool: "Pileta",
    carpentry: "Carpinteria",
    glass: "Vidrios",
    pets: "Mascotas",
    security: "Seguridad",
    ironwork: "Herreria",
    technology: "Tecnologia",
    beauty: "Belleza",
    vehicles: "Vehiculos",
    freight: "Fletes",
    events: "Eventos",
    photography: "Fotografia",
    music: "Musica",
  };

  return serviceMap[service] || service;
};

export const translateType = (type) => {
  const typeMap = {
    home: "Servicio a domicilio",
    onsite: "Servicio en lugar",
  };
  return typeMap[type] || type;
};

export const translateAvailability = (availability) => {
  const availabilityMap = {
    available: "Disponible",
    busy: "Contactar",
  };
  return availabilityMap[availability] || availability;
};

export const formatPrice = (price) => {
  if (price === null) {
    return "Pago no registrado";
  }
  return `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("es-AR", { month: "long", day: "numeric" });
};

export const formatTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const translateStatus = (status) => {
  const statusMap = {
    pending: "Pendiente",
    cancelled: "Cancelado",
    finished: "Finalizado",
    scheduled: "Programado",
    "on-progress": "en progreso",
  };

  return statusMap[status] || status;
};
