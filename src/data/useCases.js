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
  name: "Industrial Sewing Stations",
  unit: "estación",
  kwPeakPerUnit: 1.2,
  kwhDayPerUnit: 8,
  maxUnitsCap: 50, // 👈 límite industrial real
  outputText: (units) =>
    `Capacidad operativa estimada: hasta ${Math.min(units, 50)} estaciones de costura`
}

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
