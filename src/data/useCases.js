export const USE_CASES = [
  {
    id: "storage",
    category: "Frío",
    name: "Cold Storage Module",
    unit: "módulo",
    kwPeakPerUnit: 8,
    kwhDayPerUnit: 140,
    outputText: (units) =>
      `Volumen típico: ${units} × (20–30 m³ aprox.)`
  },

  {
    id: "textile",
    category: "Textil",
    name: "Industrial Sewing Stations",
    unit: "estación",
    kwPeakPerUnit: 1.2,
    kwhDayPerUnit: 8,
    maxUnitsCap: 50, // límite industrial real
    outputText: (units) =>
      `Capacidad operativa estimada: hasta ${Math.min(units, 50)} estaciones de costura`
  },

  {
    id: "hatchery",
    category: "Agro",
    name: "Hatchery Module (incubación)",
    unit: "módulo",
    kwPeakPerUnit: 6,
    kwhDayPerUnit: 90,
    outputText: (units) =>
      `Capacidad estimada: ~${units * 6000} huevos/mes`
  },

  {
    id: "compressor",
    category: "Taller",
    name: "Air Compressor Package (aire comprimido)",
    unit: "equipo",
    kwPeakPerUnit: 11,
    kwhDayPerUnit: 70,
    outputText: (units) =>
      `Rango típico: ${units} × 10–15 HP (según servicio)`
  },

  {
    id: "workshop",
    category: "Industria",
    name: "General Workshop Load",
    unit: "línea",
    kwPeakPerUnit: 15,
    kwhDayPerUnit: 120,
    outputText: (units) =>
      `Capacidad estimada: ${units} líneas de trabajo medianas`
  }
];
