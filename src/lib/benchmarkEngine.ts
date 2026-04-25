import { referenceBenchmark, SECTOR_TO_BENCHMARK, type BenchmarkIndustry } from "./benchmarkConfig";

export type BenchmarkStatus = "ABOVE" | "BELOW" | "EQUAL";

export type BenchmarkResult = {
  status:     BenchmarkStatus;
  difference: number;
  direction:  "up" | "down" | "equal";
  reference:  number;
  industry:   BenchmarkIndustry;
};

export function compareToReference(rawScore: number, sectorKey: string): BenchmarkResult | null {
  const industry = SECTOR_TO_BENCHMARK[sectorKey];
  if (!industry) return null;

  const reference = referenceBenchmark[industry];
  const diff = rawScore - reference;

  if (diff > 0)  return { status: "ABOVE", difference: diff,  direction: "up",    reference, industry };
  if (diff < 0)  return { status: "BELOW", difference: -diff, direction: "down",  reference, industry };
  return           { status: "EQUAL", difference: 0,    direction: "equal", reference, industry };
}

export function getBenchmarkColor(status: BenchmarkStatus): string {
  if (status === "ABOVE") return "#EF4444";
  if (status === "BELOW") return "#22C55E";
  return "#F59E0B";
}

export function getBenchmarkArrow(direction: "up" | "down" | "equal"): string {
  if (direction === "up")   return "↑";
  if (direction === "down") return "↓";
  return "—";
}
