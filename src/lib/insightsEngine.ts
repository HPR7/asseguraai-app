import { HIGH_THRESHOLD, MEDIUM_THRESHOLD } from "./riskStandards";
import type { BenchmarkStatus } from "./benchmarkEngine";

export type ScoredWorker = {
  score: number; level: string; seniority: number; fatigue: string;
  taskRisk: string; ppe: string; shift: string; training: boolean;
  incidents: number; name: string; area: string;
};

const CRITICAL_THRESHOLD = 85;

export function generateInsights(workers: ScoredWorker[], isEs: boolean): string[] {
  const insights: string[] = [];

  const highRisk      = workers.filter(w => w.score >= HIGH_THRESHOLD);
  const lowExp        = workers.filter(w => w.seniority < 6);
  const fatigueHigh   = workers.filter(w => w.fatigue === "Alto");
  const lowPPE        = workers.filter(w => w.ppe === "Bajo");

  if (highRisk.length > 0) {
    insights.push(isEs
      ? "⚠️ Riesgo elevado detectado por combinación de tareas críticas, baja experiencia y condiciones operativas exigentes."
      : "⚠️ Elevated risk detected — combination of critical tasks, low experience, and demanding operational conditions.");
  }

  if (lowExp.length > 0) {
    insights.push(isEs
      ? `Alta exposición al riesgo en ${lowExp.length} trabajador${lowExp.length > 1 ? "es" : ""} con menos de 6 meses de experiencia.`
      : `High risk exposure in ${lowExp.length} worker${lowExp.length > 1 ? "s" : ""} with less than 6 months of experience.`);
  }

  if (fatigueHigh.length > 0) {
    insights.push(isEs
      ? `Fatiga elevada identificada como factor de riesgo en ${fatigueHigh.length} trabajador${fatigueHigh.length > 1 ? "es" : ""}.`
      : `High fatigue identified as a risk factor in ${fatigueHigh.length} worker${fatigueHigh.length > 1 ? "s" : ""}.`);
  }

  if (lowPPE.length > 0) {
    insights.push(isEs
      ? `Se detecta bajo cumplimiento de EPP en ${lowPPE.length} actividad${lowPPE.length > 1 ? "es" : ""} crítica${lowPPE.length > 1 ? "s" : ""}.`
      : `Low PPE compliance detected in ${lowPPE.length} critical task${lowPPE.length > 1 ? "s" : ""}.`);
  }

  return insights;
}

export function generateAlerts(workers: ScoredWorker[], isEs: boolean): string[] {
  const alerts: string[] = [];

  const critical   = workers.filter(w => w.score >= CRITICAL_THRESHOLD);
  const nightHigh  = workers.filter(w => w.shift === "Noche" && w.score >= HIGH_THRESHOLD);
  const noTrainHigh = workers.filter(w => !w.training && w.score >= HIGH_THRESHOLD);

  if (critical.length > 0) {
    alerts.push(isEs
      ? `Riesgo crítico detectado en ${critical.length} trabajador${critical.length > 1 ? "es" : ""} con operaciones de alto impacto.`
      : `Critical risk detected in ${critical.length} worker${critical.length > 1 ? "s" : ""} with high-impact operations.`);
  }

  if (nightHigh.length > 0) {
    alerts.push(isEs
      ? `Riesgo elevado en turno nocturno: ${nightHigh.length} trabajador${nightHigh.length > 1 ? "es" : ""} en condiciones operativas exigentes.`
      : `Elevated risk on night shift: ${nightHigh.length} worker${nightHigh.length > 1 ? "s" : ""} under demanding conditions.`);
  }

  if (noTrainHigh.length > 0) {
    alerts.push(isEs
      ? `${noTrainHigh.length} trabajador${noTrainHigh.length > 1 ? "es" : ""} sin capacitación en tareas de alto riesgo.`
      : `${noTrainHigh.length} worker${noTrainHigh.length > 1 ? "s" : ""} without training assigned to high-risk tasks.`);
  }

  return alerts;
}

export function generateRecommendations(workers: ScoredWorker[], isEs: boolean): string[] {
  const recs: string[] = [];

  const highRisk    = workers.filter(w => w.score >= HIGH_THRESHOLD);
  const fatigueHigh = workers.filter(w => w.fatigue === "Alto");
  const noTraining  = workers.filter(w => !w.training);
  const lowPPE      = workers.filter(w => w.ppe === "Bajo");

  if (highRisk.length > 0) {
    recs.push(isEs
      ? "Intervención inmediata en áreas de alto riesgo."
      : "Immediate intervention in high-risk areas.");
  }

  if (fatigueHigh.length > 0) {
    recs.push(isEs
      ? "Revisión de carga laboral y control de fatiga."
      : "Review workload and implement fatigue controls.");
  }

  if (noTraining.length > 0) {
    recs.push(isEs
      ? "Capacitación obligatoria para personal en tareas críticas."
      : "Mandatory training for personnel in critical tasks.");
  }

  if (lowPPE.length > 0) {
    recs.push(isEs
      ? "Refuerzo en cumplimiento de uso de EPP."
      : "Reinforce PPE compliance in critical operations.");
  }

  return recs;
}

export function getExecutiveMessage(rawScore: number, isEs: boolean): string {
  if (rawScore >= HIGH_THRESHOLD) {
    return isEs
      ? "Nivel de riesgo: Alto — Intervención inmediata requerida"
      : "Risk Level: High — Immediate intervention required";
  }
  if (rawScore >= MEDIUM_THRESHOLD) {
    return isEs
      ? "Nivel de riesgo: Moderado — Atención requerida"
      : "Risk Level: Moderate — Attention required";
  }
  return isEs
    ? "Nivel de riesgo: Bajo — Operación controlada"
    : "Risk Level: Low — Controlled operation";
}

export function getBenchmarkMessage(status: BenchmarkStatus | null, diff: number, isEs: boolean): string {
  if (!status) return "";
  if (status === "ABOVE") {
    return isEs
      ? `🔴 La operación está ${diff} pts por encima del nivel de riesgo de referencia.`
      : `🔴 Operation is ${diff} pts above the reference risk baseline.`;
  }
  if (status === "BELOW") {
    return isEs
      ? `🟢 La operación se encuentra ${diff} pts por debajo del nivel de riesgo de referencia.`
      : `🟢 Operation is ${diff} pts below the reference risk baseline.`;
  }
  return isEs
    ? "🟡 La operación está alineada con el nivel de referencia."
    : "🟡 Operation is aligned with the reference baseline.";
}
