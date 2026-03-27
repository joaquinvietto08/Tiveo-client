export const translateService = (service) => {
  const serviceMap = {
    electricity: "Electricidad",
    plumbing: "Plomería",
    gas: "Gas",
    gardening: "Jardinería",
    locksmith: "Cerrajería",
    painting: "Pintura",
    construction: "Construcción",
    pool: "Pileta",
    carpentry: "Carpintería",
    glass: "Vidrios",
    pets: "Mascotas",
    security: "Seguridad",
    ironwork: "Herrería",
    technology: "Tecnología",
    beauty: "Belleza",
    vehicles: "Vehículos",
    freight: "Fletes",
    events: "Eventos",
    photography: "Fotografía",
    music: "Música",
  };

  return serviceMap[service] || service;
};

export const translateAvailabilityRequest = (availability) => {
  const availabilityRequestMap = {
    available: "Ahora mismo",
    busy: "A coordinar",
  };
  return availabilityRequestMap[availability] || availability;
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

const toDate = (value) => {
  if (!value) return null;
  if (typeof value?.toDate === "function") return value.toDate();
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatDate = (dateTimeValue) => {
  const date = toDate(dateTimeValue);
  if (!date) return "—";
  return date.toLocaleDateString("es-AR", { month: "long", day: "numeric" });
};

export const formatTime = (dateTimeValue) => {
  const date = toDate(dateTimeValue);
  if (!date) return "—";
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const translateStatus = (status, moment) => {
  if (status === "confirm") {
    if (moment === "scheduled") {
      return "Programado";
    }
    if (moment === "now") {
      return "Confirmado";
    }
  }
  const statusMap = {
    requested: "Solicitado",
    going: "En camino",
    cancelled: "Cancelado",
    done: "Finalizado",
    "on-progress": "en progreso",
  };

  return statusMap[status] || status;
};

export const getTimeExperience = (joinedDateStr, mode = "number") => {
  const joined = new Date(joinedDateStr);
  const now = new Date();
  const years = now.getFullYear() - joined.getFullYear();
  const months = now.getMonth() - joined.getMonth();
  const totalMonths = years * 12 + months;

  if (mode === "number") {
    return totalMonths >= 12 ? Math.floor(totalMonths / 12) : totalMonths;
  }

  if (mode === "label") {
    return totalMonths >= 12
      ? "Años de experiencia en Tiveo"
      : "Meses de experiencia en Tiveo";
  }

  return "";
};
