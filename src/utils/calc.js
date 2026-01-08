export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function compute({
  motorElecKw,
  genKva,
  powerFactor,
  loadFactor,
  hoursPerDay
}) {
  const genLimitKw = genKva * powerFactor;
  const availableKw = Math.max(0, Math.min(genLimitKw, motorElecKw));

  const avgKw = availableKw * loadFactor;
  const kwhDay = avgKw * hoursPerDay;
  const kwhMonth = kwhDay * 30;

  return { availableKw, avgKw, kwhDay, kwhMonth, genLimitKw };
}

  let maxUnits = Math.max(0, Math.min(byKw, byEnergy));

  if (useCase.maxUnitsCap) {
    maxUnits = Math.min(maxUnits, useCase.maxUnitsCap);
  }

  return {
    byKw: Math.max(0, byKw),
    byEnergy: Math.max(0, byEnergy),
    maxUnits
  };

}
