// RISK SCORE = EXP + TASK + HIST + SHIFT + FAT + PPE + ENV + TRAIN

export interface WorkerRiskInput {
  seniority: number;
  taskRisk: string;
  incidents: number;
  shift: string;
  fatigue: string;
  ppe: string;
  envRisk: string;
  training: boolean;
}

export function getRiskScore(w: WorkerRiskInput): number {
  const EXP   = w.seniority < 6 ? 20 : w.seniority <= 12 ? 10 : 0;
  const TASK  = w.taskRisk === "Alto" ? 25 : w.taskRisk === "Medio" ? 15 : 5;
  const HIST  = w.incidents === 0 ? 0 : w.incidents === 1 ? 10 : 20;
  const SHIFT = w.shift === "Noche" ? 10 : 0;
  const FAT   = w.fatigue === "Alto" ? 10 : w.fatigue === "Medio" ? 5 : 0;
  const PPE   = w.ppe === "Bajo" ? 10 : w.ppe === "Medio" ? 5 : 0;
  const ENV   = w.envRisk === "Alto" ? 10 : w.envRisk === "Medio" ? 5 : 0;
  const TRAIN = w.training ? 0 : 5;
  return EXP + TASK + HIST + SHIFT + FAT + PPE + ENV + TRAIN;
}

export const MAX_SCORE = 110;
export const HIGH_THRESHOLD = 71;
export const MEDIUM_THRESHOLD = 41;

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export function getRiskLevel(score: number): RiskLevel {
  if (score >= HIGH_THRESHOLD) return "HIGH";
  if (score >= MEDIUM_THRESHOLD) return "MEDIUM";
  return "LOW";
}

export function getRiskColor(level: RiskLevel): string {
  if (level === "HIGH")   return "#EF4444";
  if (level === "MEDIUM") return "#F59E0B";
  return "#22C55E";
}

export function getRiskLabelEs(level: RiskLevel): string {
  if (level === "HIGH")   return "Alto";
  if (level === "MEDIUM") return "Medio";
  return "Bajo";
}

export function getRiskLabelEn(level: RiskLevel): string {
  if (level === "HIGH")   return "High";
  if (level === "MEDIUM") return "Medium";
  return "Low";
}
