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

export function maxUnitsForUseCase({ availableKw, kwhDay }, useCase) {
  const byKw = Math.floor(availableKw / useCase.kwPeakPerUnit);
  const byEnergy = Math.floor(kwhDay / useCase.kwhDayPerUnit);
  const maxUnits = Math.max(0, Math.min(byKw, byEnergy));

  return {
    byKw: Math.max(0, byKw),
    byEnergy: Math.max(0, byEnergy),
    maxUnits
  };
}
