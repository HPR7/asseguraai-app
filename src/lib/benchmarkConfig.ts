export type BenchmarkIndustry = "mining" | "energy" | "construction" | "industrial";

export const referenceBenchmark: Record<BenchmarkIndustry, number> = {
  mining:       65,
  energy:       60,
  construction: 68,
  industrial:   62,
};

export const SECTOR_TO_BENCHMARK: Record<string, BenchmarkIndustry> = {
  mineria:      "mining",
  energia:      "energy",
  construccion: "construction",
  industria:    "industrial",
};
