export const USE_CASES = [
  {
    id: "incub",
    category: "Agro",
    name: "Hatchery Module (incubación)",
    unit: "módulo",
    kwPeakPerUnit: 6,
    kwhDayPerUnit: 90,
    outputText: (units) => `Capacidad estimada: ~${(units * 6000).toLocaleString("es-AR")} huevos/mes`
  },
  {
    id: "coldroom",
    category: "Frío",
    name: "Cold Room (cámara de frío)",
    unit: "cámara",
    kwPeakPerUnit: 8,
    kwhDayPerUnit: 140,
    outputText: (units) => `Volumen típico: ${units} × (20–30 m³ aprox.)`
  },
  {
    id: "textile",
    category: "Textil",
    name: "Industrial Sewing Stations (textil)",
    unit: "estación",
    kwPeakPerUnit: 1.2,
    kwhDayPerUnit: 8,
    outputText: (units) => `Producción estimada: ~${(units * 35).toLocaleString("es-AR")} prendas/día`
  },
  {
    id: "compressor",
    category: "Taller",
    name: "Air Compressor Package (aire comprimido)",
    unit: "equipo",
    kwPeakPerUnit: 11,
    kwhDayPerUnit: 70,
    outputText: (units) => `Rango típico: ${units} × 10–15 HP (según servicio)`
  },
  {
    id: "ice",
    category: "Servicios",
    name: "Ice Production (hielo)",
    unit: "planta",
    kwPeakPerUnit: 20,
    kwhDayPerUnit: 350,
    outputText: (units) => `Capacidad estimada: ~${(units * 1000).toLocaleString("es-AR")} kg/día`
  }
];
