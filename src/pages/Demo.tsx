import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/i18n/useLanguage";
import {
  AlertTriangle, Brain, ArrowRight, Users,
  TrendingUp, Zap, CheckCircle2, ShieldOff, BarChart2,
} from "lucide-react";
import {
  getRiskScore, getRiskLevel, getRiskColor, getRiskLabelEs, getRiskLabelEn,
  MAX_SCORE, HIGH_THRESHOLD, MEDIUM_THRESHOLD,
  type RiskLevel,
} from "@/lib/riskStandards";
import { compareToReference, getBenchmarkColor, getBenchmarkArrow } from "@/lib/benchmarkEngine";
import {
  generateInsights, generateAlerts, generateRecommendations,
  getExecutiveMessage, getBenchmarkMessage,
} from "@/lib/insightsEngine";

type Worker = {
  id: number; name: string; area: string; role: string;
  seniority: number; exp: number; shift: string;
  taskRisk: string; incidents: number; nearMiss: number;
  training: boolean; hoursWeek: number; fatigue: string;
  ppe: string; envRisk: string;
};

type Sector = { key: string; label: string; workers: Worker[] };

const SECTORS: Sector[] = [
  {
    key: "industria", label: "Industria",
    workers: [
      { id:1,  name:"Juan Perez",    area:"Mantenimiento", role:"Técnico",    seniority:3,  exp:1,  shift:"Noche", taskRisk:"Alto",  incidents:1, nearMiss:2, training:false, hoursWeek:60, fatigue:"Alto",  ppe:"Bajo",  envRisk:"Alto"  },
      { id:2,  name:"Carlos Ruiz",   area:"Operaciones",   role:"Operador",   seniority:24, exp:5,  shift:"Día",   taskRisk:"Medio", incidents:0, nearMiss:1, training:true,  hoursWeek:48, fatigue:"Bajo",  ppe:"Alto",  envRisk:"Medio" },
      { id:3,  name:"Luis Gomez",    area:"Mantenimiento", role:"Técnico",    seniority:8,  exp:3,  shift:"Noche", taskRisk:"Alto",  incidents:1, nearMiss:2, training:true,  hoursWeek:55, fatigue:"Medio", ppe:"Medio", envRisk:"Alto"  },
      { id:4,  name:"Pedro Sanchez", area:"Logística",     role:"Supervisor", seniority:36, exp:10, shift:"Día",   taskRisk:"Bajo",  incidents:0, nearMiss:0, training:true,  hoursWeek:45, fatigue:"Bajo",  ppe:"Alto",  envRisk:"Bajo"  },
      { id:5,  name:"Miguel Torres", area:"Operaciones",   role:"Operador",   seniority:5,  exp:2,  shift:"Noche", taskRisk:"Medio", incidents:1, nearMiss:2, training:false, hoursWeek:58, fatigue:"Medio", ppe:"Medio", envRisk:"Alto"  },
      { id:6,  name:"Jorge Ramos",   area:"Mantenimiento", role:"Técnico",    seniority:4,  exp:1,  shift:"Noche", taskRisk:"Alto",  incidents:2, nearMiss:4, training:false, hoursWeek:65, fatigue:"Alto",  ppe:"Bajo",  envRisk:"Alto"  },
      { id:7,  name:"Diego Flores",  area:"Operaciones",   role:"Operador",   seniority:18, exp:4,  shift:"Día",   taskRisk:"Medio", incidents:0, nearMiss:1, training:true,  hoursWeek:50, fatigue:"Bajo",  ppe:"Alto",  envRisk:"Medio" },
      { id:8,  name:"Raul Castro",   area:"Logística",     role:"Auxiliar",   seniority:10, exp:3,  shift:"Noche", taskRisk:"Medio", incidents:0, nearMiss:2, training:true,  hoursWeek:52, fatigue:"Medio", ppe:"Medio", envRisk:"Medio" },
      { id:9,  name:"Andres Vega",   area:"Mantenimiento", role:"Técnico",    seniority:6,  exp:2,  shift:"Noche", taskRisk:"Alto",  incidents:1, nearMiss:3, training:false, hoursWeek:60, fatigue:"Alto",  ppe:"Medio", envRisk:"Alto"  },
      { id:10, name:"Cesar Diaz",    area:"Operaciones",   role:"Operador",   seniority:12, exp:3,  shift:"Día",   taskRisk:"Medio", incidents:0, nearMiss:1, training:true,  hoursWeek:48, fatigue:"Bajo",  ppe:"Alto",  envRisk:"Medio" },
    ],
  },
  {
    key: "mineria", label: "Minería",
    workers: [
      { id:1, name:"Jose Quispe",    area:"Perforación",   role:"Operador",   seniority:2,  exp:3, shift:"Noche", taskRisk:"Alto",  incidents:2, nearMiss:4, training:false, hoursWeek:70, fatigue:"Alto",  ppe:"Bajo",  envRisk:"Alto"  },
      { id:2, name:"Carlos Huaman",  area:"Mantenimiento", role:"Técnico",    seniority:5,  exp:4, shift:"Noche", taskRisk:"Alto",  incidents:1, nearMiss:3, training:false, hoursWeek:65, fatigue:"Alto",  ppe:"Medio", envRisk:"Alto"  },
      { id:3, name:"Luis Rojas",     area:"Transporte",    role:"Conductor",  seniority:18, exp:6, shift:"Día",   taskRisk:"Medio", incidents:0, nearMiss:1, training:true,  hoursWeek:55, fatigue:"Medio", ppe:"Alto",  envRisk:"Medio" },
      { id:4, name:"Pedro Flores",   area:"Planta",        role:"Operador",   seniority:12, exp:5, shift:"Día",   taskRisk:"Medio", incidents:0, nearMiss:2, training:true,  hoursWeek:50, fatigue:"Bajo",  ppe:"Alto",  envRisk:"Medio" },
      { id:5, name:"Juan Mamani",    area:"Perforación",   role:"Ayudante",   seniority:1,  exp:1, shift:"Noche", taskRisk:"Alto",  incidents:2, nearMiss:5, training:false, hoursWeek:72, fatigue:"Alto",  ppe:"Bajo",  envRisk:"Alto"  },
    ],
  },
  {
    key: "energia", label: "Energía",
    workers: [
      { id:1, name:"Marco Silva",   area:"Subestación",   role:"Técnico",    seniority:6,  exp:5,  shift:"Noche", taskRisk:"Alto",  incidents:1, nearMiss:2, training:true,  hoursWeek:60, fatigue:"Alto",  ppe:"Medio", envRisk:"Alto"  },
      { id:2, name:"Raul Torres",   area:"Operaciones",   role:"Ingeniero",  seniority:24, exp:8,  shift:"Día",   taskRisk:"Medio", incidents:0, nearMiss:1, training:true,  hoursWeek:48, fatigue:"Bajo",  ppe:"Alto",  envRisk:"Medio" },
      { id:3, name:"Diego Perez",   area:"Mantenimiento", role:"Técnico",    seniority:3,  exp:2,  shift:"Noche", taskRisk:"Alto",  incidents:1, nearMiss:3, training:false, hoursWeek:62, fatigue:"Alto",  ppe:"Bajo",  envRisk:"Alto"  },
      { id:4, name:"Andres Lopez",  area:"Control",       role:"Supervisor", seniority:36, exp:10, shift:"Día",   taskRisk:"Bajo",  incidents:0, nearMiss:0, training:true,  hoursWeek:45, fatigue:"Bajo",  ppe:"Alto",  envRisk:"Bajo"  },
      { id:5, name:"Jorge Diaz",    area:"Subestación",   role:"Operador",   seniority:8,  exp:3,  shift:"Noche", taskRisk:"Alto",  incidents:1, nearMiss:2, training:false, hoursWeek:58, fatigue:"Medio", ppe:"Medio", envRisk:"Alto"  },
    ],
  },
  {
    key: "construccion", label: "Construcción",
    workers: [
      { id:1, name:"Juan Castro",    area:"Estructuras",  role:"Obrero",     seniority:2,  exp:2,  shift:"Día", taskRisk:"Alto",  incidents:1, nearMiss:3, training:false, hoursWeek:55, fatigue:"Medio", ppe:"Bajo",  envRisk:"Alto" },
      { id:2, name:"Carlos Mendoza", area:"Altura",       role:"Técnico",    seniority:4,  exp:3,  shift:"Día", taskRisk:"Alto",  incidents:2, nearMiss:4, training:false, hoursWeek:60, fatigue:"Alto",  ppe:"Bajo",  envRisk:"Alto" },
      { id:3, name:"Luis Vega",      area:"Acabados",     role:"Operario",   seniority:18, exp:5,  shift:"Día", taskRisk:"Medio", incidents:0, nearMiss:1, training:true,  hoursWeek:48, fatigue:"Bajo",  ppe:"Alto",  envRisk:"Medio"},
      { id:4, name:"Pedro Ramos",    area:"Supervisión",  role:"Supervisor", seniority:36, exp:12, shift:"Día", taskRisk:"Bajo",  incidents:0, nearMiss:0, training:true,  hoursWeek:45, fatigue:"Bajo",  ppe:"Alto",  envRisk:"Bajo" },
      { id:5, name:"Miguel Diaz",    area:"Altura",       role:"Ayudante",   seniority:1,  exp:1,  shift:"Día", taskRisk:"Alto",  incidents:2, nearMiss:5, training:false, hoursWeek:58, fatigue:"Alto",  ppe:"Bajo",  envRisk:"Alto" },
    ],
  },
];

function computeStats(workers: Worker[]) {
  const total          = workers.length;
  const totalIncidents = workers.reduce((s, w) => s + w.incidents, 0);
  const totalNearMiss  = workers.reduce((s, w) => s + w.nearMiss, 0);
  const noTraining     = workers.filter(w => !w.training).length;
  const nightShift     = workers.filter(w => w.shift === "Noche").length;

  const scored = workers.map(w => ({ ...w, score: getRiskScore(w), level: getRiskLevel(getRiskScore(w)) }));

  const avgScore    = scored.reduce((s, w) => s + w.score, 0) / total;
  const globalScore = Math.round((avgScore / MAX_SCORE) * 100);

  const highRiskCount   = scored.filter(w => w.level === "HIGH").length;
  const mediumRiskCount = scored.filter(w => w.level === "MEDIUM").length;
  const lowRiskCount    = scored.filter(w => w.level === "LOW").length;

  const areas = [...new Set(workers.map(w => w.area))];
  const areaRisks = areas.map(area => {
    const ws = scored.filter(w => w.area === area);
    const avgS = ws.reduce((s, w) => s + w.score, 0) / ws.length;
    const level = getRiskLevel(avgS);
    return { area, score: Math.round(avgS), pct: Math.min(100, Math.round(avgS / MAX_SCORE * 100)), level, count: ws.length };
  }).sort((a, b) => b.score - a.score).slice(0, 3);

  const highAlerts = scored
    .filter(w => w.level === "HIGH")
    .sort((a, b) => b.score - a.score);

  return {
    total, totalIncidents, totalNearMiss, noTraining, nightShift,
    globalScore, avgRawScore: Math.round(avgScore), highRiskCount, mediumRiskCount, lowRiskCount,
    areaRisks, highAlerts, scored,
  };
}

export default function Demo() {
  const { t, lang } = useLanguage();
  const td = t.demo;
  const isEs = lang === "es";

  const [selectedSector, setSelectedSector] = useState<string>("industria");

  const sector    = SECTORS.find(s => s.key === selectedSector) ?? SECTORS[0];
  const stats     = computeStats(sector.workers);
  const benchmark = compareToReference(stats.avgRawScore, selectedSector);

  const insights        = generateInsights(stats.scored, isEs);
  const alerts          = generateAlerts(stats.scored, isEs);
  const recommendations = generateRecommendations(stats.scored, isEs);
  const executiveMsg    = getExecutiveMessage(stats.avgRawScore, isEs);
  const benchmarkMsg    = benchmark ? getBenchmarkMessage(benchmark.status, benchmark.difference, isEs) : "";

  const globalLevel  = getRiskLevel(Math.round(stats.globalScore * MAX_SCORE / 100));
  const scoreColor   = getRiskColor(globalLevel);
  const scoreLevelLabel = isEs ? getRiskLabelEs(globalLevel) : getRiskLabelEn(globalLevel);
  const circumference = 2 * Math.PI * 42;

  return (
    <div className="w-full pt-44 sm:pt-52 pb-32">

      {/* ── Hero ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-6">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs font-medium text-blue-200">{td.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">
            {td.title1}{" "}<span className="text-gradient-primary">{td.title2}</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">{td.sub}</p>
        </motion.div>
      </div>

      {/* ── Dashboard ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border border-white/10 rounded-3xl overflow-hidden bg-card shadow-2xl"
        >
          {/* Browser chrome */}
          <div className="bg-background/80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-white/60 text-sm font-mono">asseguraai.com/dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">
                Live · {stats.total} {isEs ? "trabajadores" : "workers"}
              </span>
            </div>
          </div>

          {/* Dashboard title + sector selector */}
          <div className="px-6 sm:px-8 pt-6 pb-2 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
            <div>
              <h2 className="text-white font-display font-bold text-xl">{td.dashboardTitle}</h2>
              <p className="text-muted-foreground text-sm">{td.dashboardSub}</p>
            </div>

            {/* Sector selector */}
            <div className="shrink-0">
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-44 bg-background/60 border-white/20 text-white focus:ring-primary h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  {SECTORS.map(s => (
                    <SelectItem key={s.key} value={s.key} className="text-white focus:bg-primary/20 cursor-pointer">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Animated data section ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSector}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Row 1: Score + Area Risk + Alerts */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Global Risk Score */}
                <div className="bg-background/60 border border-red-500/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest mb-3">{td.scoreLabel}</p>
                  <div className="relative flex items-center justify-center w-28 h-28 mb-3">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                      <circle
                        cx="50" cy="50" r="42" fill="none" stroke={scoreColor} strokeWidth="10"
                        strokeDasharray={`${stats.globalScore / 100 * circumference} ${circumference}`}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dasharray 0.5s ease" }}
                      />
                    </svg>
                    <span className="text-4xl font-display font-bold text-white">{stats.globalScore}</span>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full"
                    style={{ color: scoreColor, background: `${scoreColor}18` }}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {isEs ? "Riesgo" : "Risk"} {scoreLevelLabel}
                  </span>
                  <p className="text-muted-foreground text-xs mt-2">
                    {stats.highRiskCount} {isEs ? "trabajadores en riesgo Alto" : "High-risk workers"}
                  </p>
                  <p className="text-xs mt-2 font-medium leading-snug max-w-[180px]" style={{ color: scoreColor }}>
                    {executiveMsg}
                  </p>
                </div>

                {/* Area Risk Chart */}
                <div className="bg-background/60 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">
                      {isEs ? "Riesgo por Área" : "Risk by Area"}
                    </p>
                    <TrendingUp className="w-3.5 h-3.5" style={{ color: "#EF4444" }} />
                  </div>
                  <div className="space-y-3">
                    {stats.areaRisks.map(({ area, pct, level, count }) => {
                      const barColor = getRiskColor(level as RiskLevel);
                      const levelLabel = isEs ? getRiskLabelEs(level as RiskLevel) : getRiskLabelEn(level as RiskLevel);
                      return (
                        <div key={area}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white/80 font-medium truncate max-w-[110px]">{area}</span>
                            <span className="text-muted-foreground ml-2 shrink-0">
                              {count} {isEs ? "trab." : "wkrs"} ·{" "}
                              <span style={{ color: barColor }} className="font-semibold">{levelLabel}</span>
                            </span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-2">
                            <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: barColor, transition: "width 0.5s ease" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-muted-foreground text-xs mt-4">
                    {stats.nightShift}/{stats.total} {isEs ? "en turno nocturno" : "night shift"}
                  </p>
                </div>

                {/* Active Alerts — HIGH risk only */}
                <div className="bg-background/60 border border-red-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">{td.alertsLabel}</p>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: "#EF4444", background: "#EF444420" }}>
                      {stats.highRiskCount} HIGH
                    </span>
                  </div>
                  {stats.highAlerts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-4 gap-2">
                      <span className="text-2xl">✅</span>
                      <p className="text-xs font-semibold text-center" style={{ color: "#22C55E" }}>
                        {isEs ? "Sin trabajadores en riesgo Alto" : "No High-risk workers"}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                      {stats.highAlerts.map(w => {
                        const reason = [
                          w.incidents > 0      ? `${w.incidents} ${isEs ? "inc." : "inc."}` : null,
                          w.nearMiss > 0       ? `${w.nearMiss} ${isEs ? "casi-acc." : "near-miss"}` : null,
                          !w.training          ? (isEs ? "sin capac." : "no training") : null,
                          w.fatigue === "Alto" ? (isEs ? "fatiga alta" : "high fatigue") : null,
                          w.seniority < 6      ? (isEs ? `${w.seniority}m antigüedad` : `${w.seniority}mo tenure`) : null,
                        ].filter(Boolean).slice(0, 3).join(" · ");
                        return (
                          <div key={w.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-red-500/5 border border-red-500/15">
                            <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse" />
                            <div className="flex-1 min-w-0">
                              <p className="text-white/90 text-xs font-semibold">{w.name}</p>
                              <p className="text-muted-foreground text-xs leading-snug">{w.area} · {reason}</p>
                            </div>
                            <span className="text-xs font-bold shrink-0 tabular-nums" style={{ color: "#EF4444" }}>
                              {w.score}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* AI Insights + Alerts + Recommendations */}
                <div className="bg-background/60 border border-primary/20 rounded-2xl p-6 md:col-span-2 space-y-5">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">{td.recsLabel}</p>
                  </div>

                  {/* Main Insight */}
                  {insights[0] && (
                    <div className="flex items-start gap-3 rounded-xl px-4 py-3 bg-amber-500/10 border border-amber-500/20">
                      <span className="text-sm leading-relaxed text-amber-200">{insights[0]}</span>
                    </div>
                  )}

                  {/* Alerts */}
                  {alerts.length > 0 && (
                    <div className="space-y-2">
                      {alerts.map((alert, i) => (
                        <div key={i} className="flex items-start gap-3 rounded-xl px-4 py-2.5 bg-red-500/8 border border-red-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse" />
                          <span className="text-sm text-red-200 leading-snug">{alert}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Secondary Insights */}
                  {insights.slice(1).length > 0 && (
                    <div className="space-y-2">
                      {insights.slice(1).map((ins, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Zap className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                          <span className="text-white/70 text-sm">{ins}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recommendations */}
                  {recommendations.length > 0 && (
                    <div className="border-t border-white/5 pt-4 space-y-2">
                      <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">
                        {isEs ? "Acciones recomendadas" : "Recommended Actions"}
                      </p>
                      {recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-white/80 text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Risk KPIs */}
                <div className="bg-background/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldOff className="w-4 h-4 text-white/40" />
                    <span className="text-muted-foreground text-xs uppercase tracking-widest">
                      {isEs ? "Clasificación de Riesgo" : "Risk Classification"}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { count: stats.highRiskCount,   level: "HIGH"   as RiskLevel, label: isEs ? "Alto"  : "High"   },
                      { count: stats.mediumRiskCount, level: "MEDIUM" as RiskLevel, label: isEs ? "Medio" : "Medium" },
                      { count: stats.lowRiskCount,    level: "LOW"    as RiskLevel, label: isEs ? "Bajo"  : "Low"    },
                    ].map(({ count, level, label }) => {
                      const color = getRiskColor(level);
                      const pct   = Math.round((count / stats.total) * 100);
                      return (
                        <div key={level}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold" style={{ color }}>{label}</span>
                            <span className="text-muted-foreground">{count}/{stats.total} · {pct}%</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-2">
                            <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-muted-foreground text-xs mt-4">
                    {stats.totalIncidents} {isEs ? "incidentes" : "incidents"} · {stats.totalNearMiss} {isEs ? "casi-acc." : "near-miss"}
                  </p>
                </div>
              </div>

              {/* Reference Benchmark */}
              {benchmark && (
                <div className="px-4 sm:px-6 pb-2">
                  <div className="bg-background/60 border border-white/10 rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart2 className="w-4 h-4 text-white/40" />
                      <span className="text-muted-foreground text-xs uppercase tracking-widest">
                        {isEs ? "Reference Benchmark" : "Reference Benchmark"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      {/* Your Score */}
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-muted-foreground text-xs mb-1">{isEs ? "Tu Score" : "Your Score"}</p>
                        <p className="text-white font-bold text-xl tabular-nums">{stats.avgRawScore}</p>
                        <p className="text-muted-foreground text-xs">/ {MAX_SCORE}</p>
                      </div>

                      {/* Reference */}
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-muted-foreground text-xs mb-1">{isEs ? "Referencia" : "Reference"}</p>
                        <p className="text-white font-bold text-xl tabular-nums">{benchmark.reference}</p>
                        <p className="text-muted-foreground text-xs">/ {MAX_SCORE}</p>
                      </div>

                      {/* Status */}
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-muted-foreground text-xs mb-1">{isEs ? "Estado" : "Status"}</p>
                        <p className="font-bold text-sm" style={{ color: getBenchmarkColor(benchmark.status) }}>
                          {getBenchmarkArrow(benchmark.direction)}{" "}
                          {benchmark.status === "ABOVE"
                            ? (isEs ? "Por Encima" : "Above Ref.")
                            : benchmark.status === "BELOW"
                            ? (isEs ? "Por Debajo" : "Below Ref.")
                            : (isEs ? "En Línea" : "At Ref.")}
                        </p>
                      </div>

                      {/* Difference */}
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-muted-foreground text-xs mb-1">{isEs ? "Diferencia" : "Difference"}</p>
                        <p className="font-bold text-xl tabular-nums" style={{ color: getBenchmarkColor(benchmark.status) }}>
                          {benchmark.direction === "up" ? "+" : benchmark.direction === "down" ? "-" : ""}
                          {benchmark.difference}
                        </p>
                        <p className="text-muted-foreground text-xs">{isEs ? "puntos" : "pts"}</p>
                      </div>
                    </div>

                    {/* Insight from engine */}
                    {benchmarkMsg && (
                      <div className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ background: `${getBenchmarkColor(benchmark.status)}12` }}>
                        <p className="text-sm" style={{ color: getBenchmarkColor(benchmark.status) }}>
                          {benchmarkMsg}
                        </p>
                      </div>
                    )}

                    {/* Disclaimer */}
                    <p className="text-muted-foreground/50 text-xs mt-3 italic">
                      {isEs
                        ? "El Reference Benchmark es una línea base interna usada para comparación relativa. No es una métrica oficial de la industria."
                        : "Reference Benchmark is an internal baseline used for relative comparison. It is not an official industry metric."}
                    </p>
                  </div>
                </div>
              )}

              {/* Worker table */}
              <div className="px-4 sm:px-6 pb-6">
                <div className="bg-background/60 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
                    <Users className="w-4 h-4 text-primary" />
                    <p className="text-white text-sm font-semibold">
                      {isEs ? "Perfil de Riesgo por Trabajador" : "Worker Risk Profile"} — {sector.label} ({stats.total})
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/5">
                          {[
                            isEs ? "Trabajador" : "Worker",
                            isEs ? "Área" : "Area",
                            isEs ? "Turno" : "Shift",
                            isEs ? "Tarea" : "Task",
                            isEs ? "PPE Riesgo" : "PPE Risk",
                            isEs ? "Fatiga" : "Fatigue",
                            isEs ? "Capac." : "Training",
                            isEs ? "Inc." : "Inc.",
                            "Score",
                            isEs ? "Nivel" : "Level",
                          ].map(h => (
                            <th key={h} className="text-left text-muted-foreground font-medium px-4 py-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[...stats.scored].sort((a, b) => b.score - a.score).map((w, i) => {
                          const level      = w.level as RiskLevel;
                          const color      = getRiskColor(level);
                          const levelLabel = isEs ? getRiskLabelEs(level) : getRiskLabelEn(level);
                          const taskColor  = w.taskRisk === "Alto" ? "#EF4444" : w.taskRisk === "Medio" ? "#F59E0B" : "#22C55E";
                          const ppeColor   = w.ppe === "Bajo" ? "#EF4444" : w.ppe === "Medio" ? "#F59E0B" : "#22C55E";
                          const fatColor   = w.fatigue === "Alto" ? "#EF4444" : w.fatigue === "Medio" ? "#F59E0B" : "#22C55E";
                          return (
                            <tr
                              key={w.id}
                              className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i === 0 && level === "HIGH" ? "bg-red-500/5" : ""}`}
                            >
                              <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{w.name}</td>
                              <td className="px-4 py-3 text-white/70 whitespace-nowrap">{w.area}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`font-medium ${w.shift === "Noche" ? "text-blue-300" : "text-white/50"}`}>
                                  {isEs ? w.shift : w.shift === "Noche" ? "Night" : "Day"}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: taskColor }}>
                                {isEs ? w.taskRisk : w.taskRisk === "Alto" ? "High" : w.taskRisk === "Medio" ? "Med" : "Low"}
                              </td>
                              <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: ppeColor }}>
                                {isEs
                                  ? (w.ppe === "Bajo" ? "Alto" : w.ppe === "Medio" ? "Medio" : "Bajo")
                                  : (w.ppe === "Bajo" ? "High" : w.ppe === "Medio" ? "Med" : "Low")}
                              </td>
                              <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: fatColor }}>
                                {isEs ? w.fatigue : w.fatigue === "Alto" ? "High" : w.fatigue === "Medio" ? "Med" : "Low"}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="font-semibold" style={{ color: w.training ? "#22C55E" : "#EF4444" }}>
                                  {w.training ? (isEs ? "Sí" : "Yes") : "No"}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="font-bold" style={{ color: w.incidents > 0 ? "#EF4444" : "rgba(255,255,255,0.3)" }}>
                                  {w.incidents}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="font-bold tabular-nums" style={{ color }}>{w.score}</span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color, background: `${color}18` }}>
                                  {levelLabel}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-16 text-center bg-primary/5 rounded-3xl p-8 sm:p-12 border border-primary/20"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">{td.ctaTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8">
            {isEs
              ? "Carga tu propia fuerza laboral y obtén tu Score de Riesgo en minutos"
              : "Load your own workforce data and get your Risk Score in minutes"}
          </h2>
          <Button size="lg" asChild className="group">
            <Link href="/demo-access">
              {td.ctaBtn}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </div>
  );
}
