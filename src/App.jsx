import React, { useMemo, useState } from "react";
import { MOTORS } from "./data/motors.js";
import { GENERATORS } from "./data/generators.js";
import { USE_CASES } from "./data/useCases.js";
import { clamp, compute, maxUnitsForUseCase } from "./utils/calc.js";

export default function App() {
  const [motorId, setMotorId] = useState(MOTORS[0]?.id ?? "");
  const [genId, setGenId] = useState(GENERATORS[0]?.id ?? "");

  const [pf, setPf] = useState(0.85);
  const [loadFactor, setLoadFactor] = useState(0.7);
  const [hours, setHours] = useState(16);

  const motor = useMemo(() => MOTORS.find((m) => m.id === motorId), [motorId]);
  const gen = useMemo(() => GENERATORS.find((g) => g.id === genId), [genId]);

  const results = useMemo(() => {
    return compute({
      motorElecKw: motor?.elecKw ?? 0,   // 👈 IMPORTANTE: elecKw (como en motors.js)
      genKva: gen?.kva ?? 0,
      powerFactor: clamp(Number(pf) || 0, 0.5, 1),
      loadFactor: clamp(Number(loadFactor) || 0, 0.1, 1),
      hoursPerDay: clamp(Number(hours) || 0, 1, 24),
    });
  }, [motor, gen, pf, loadFactor, hours]);

  const sortedUseCases = useMemo(() => {
    const arr = USE_CASES.map((u) => {
      const m = maxUnitsForUseCase(
        { availableKw: results.availableKw, kwhDay: results.kwhDay },
        u
      );
      return { ...u, ...m };
    });
    return arr.sort((a, b) => b.maxUnits - a.maxUnits);
  }, [results]);

  return (
    <div className="container">
      <div className="badge">
        ⚡ Energy Simulator — Motor + Generator → kW/kWh → Real-world output
      </div>

      <h1 style={{ marginTop: 12 }}>SimEnergy — Simulador de generación y usos productivos</h1>
<p>
  Seleccionás un motor y un generador, ajustás condiciones de operación y obtenés potencia (kW) y energía (kWh).
  Con eso, la app propone escenarios de uso y capacidad estimada por rubro.
</p>

      <div className="grid" style={{ marginTop: 16 }}>
        <div className="card">
          <h2 style={{ margin: 0, fontSize: 16 }}>Configuración</h2>

          <div className="row" style={{ marginTop: 12 }}>
            <div>
              <label>Motor / Engine (rated electrical output)</label>
              <select value={motorId} onChange={(e) => setMotorId(e.target.value)}>
                {MOTORS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.elecKw} kW
                  </option>
                ))}
              </select>
              <small>Fuel: {motor?.fuel ?? "-"}</small>
            </div>

            <div>
              <label>Generator</label>
              <select value={genId} onChange={(e) => setGenId(e.target.value)}>
                {GENERATORS.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} — {g.kva} kVA
                  </option>
                ))}
              </select>
              <small>Efficiency model: {((gen?.eff ?? 0) * 100).toFixed(1)}%</small>
            </div>
          </div>

          <hr />

          <div className="row">
            <div>
              <label>Power Factor (PF)</label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                max="1"
                value={pf}
                onChange={(e) => setPf(e.target.value)}
              />
              <small>Typical industrial: 0.80–0.90</small>
            </div>

            <div>
              <label>Average load factor</label>
              <input
                type="number"
                step="0.01"
                min="0.1"
                max="1"
                value={loadFactor}
                onChange={(e) => setLoadFactor(e.target.value)}
              />
              <small>Ej: 0.70 para operación realista</small>
            </div>

            <div>
              <label>Hours per day</label>
              <input
                type="number"
                step="1"
                min="1"
                max="24"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              <small>Ej: 16 h/día</small>
            </div>

            <div>
              <label>Generator limit (kW)</label>
              <input readOnly value={(Number(gen?.kva ?? 0) * Number(pf)).toFixed(0)} />
              <small>kW = kVA × PF</small>
            </div>
          </div>

          <hr />

          <h2 style={{ margin: 0, fontSize: 16 }}>Resultados</h2>
          <div className="kpis" style={{ marginTop: 12 }}>
            <div className="kpi">
              <div style={{ opacity: 0.8, fontSize: 12 }}>Potencia disponible</div>
              <div className="v">{results.availableKw.toFixed(0)} kW</div>
              <small>Limited by engine rating and generator (kVA×PF)</small>
            </div>

            <div className="kpi">
              <div style={{ opacity: 0.8, fontSize: 12 }}>Energía por día</div>
              <div className="v">{results.kwhDay.toFixed(0)} kWh</div>
              <small>{results.avgKw.toFixed(0)} kW avg × {hours} h</small>
            </div>

            <div className="kpi">
              <div style={{ opacity: 0.8, fontSize: 12 }}>Energía por mes</div>
              <div className="v">{results.kwhMonth.toFixed(0)} kWh</div>
              <small>~30 días</small>
            </div>

            <div className="kpi">
              <div style={{ opacity: 0.8, fontSize: 12 }}>Validación</div>
              <div className="v" style={{ fontSize: 14, fontWeight: 700 }}>
                Engine rating: {(motor?.elecKw ?? 0).toFixed(0)} kW<br />
                Gen limit: {results.genLimitKw.toFixed(0)} kW
              </div>
              <small>Si limita el gen: subí kVA o PF. Si limita el motor: subí kW.</small>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ margin: 0, fontSize: 16 }}>Opciones productivas</h2>
          <p style={{ marginTop: 6 }}>
            Recomendaciones automáticas según potencia/energía disponible.
          </p>

          <div className="list" style={{ marginTop: 12 }}>
            {sortedUseCases.map((u) => (
              <div className="item" key={u.id}>
                <h3>
                  {u.name} <span style={{ opacity: 0.7 }}>— {u.category}</span>
                </h3>
                <div className="meta">
                  Requerimiento por unidad: {u.kwPeakPerUnit} kW pico • {u.kwhDayPerUnit} kWh/día
                </div>
                <div className="max">
                  Máximo: {u.maxUnits} {u.unit}(s)
                </div>
                <small>
                  Limitado por kW: {u.byKw} | limitado por energía: {u.byEnergy}
                  <br />
                  {u.outputText(u.maxUnits)}
                </small>
              </div>
            ))}
          </div>

          <hr />
          <small>
            <small>
  Próximamente: costos de combustible, $/kWh y reporte exportable para proyectos.
</small>

          </small>
        </div>
      </div>
    </div>
  );
}
