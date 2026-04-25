import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, LogOut, RefreshCw, Users, Clock, Building2, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/useLanguage";

type ContactRequest = {
  id: number;
  name: string;
  email: string;
  company: string;
  sector: string;
  message: string;
  urgency: string;
  createdAt: string;
};

const STORAGE_KEY = "assegura_admin_token";

const urgencyLabel: Record<string, { es: string; en: string; color: string }> = {
  immediate: { es: "Inmediato", en: "Immediate", color: "text-red-400 bg-red-400/10" },
  "1-3months": { es: "1-3 meses", en: "1-3 months", color: "text-yellow-400 bg-yellow-400/10" },
  exploration: { es: "Exploración", en: "Exploration", color: "text-blue-400 bg-blue-400/10" },
};

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "es" ? "es-PE" : "en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function Admin() {
  const { lang } = useLanguage();
  const [token, setToken] = useState(() => sessionStorage.getItem(STORAGE_KEY) ?? "");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<ContactRequest[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchData = useCallback(async (t: string) => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/contact", {
        headers: { "x-admin-token": t },
      });
      if (res.status === 401) {
        setError(lang === "es" ? "Contraseña incorrecta" : "Incorrect password");
        setToken("");
        sessionStorage.removeItem(STORAGE_KEY);
        setData(null);
        return;
      }
      if (!res.ok) throw new Error();
      setData(await res.json());
    } catch {
      setFetchError(lang === "es" ? "Error al cargar los datos" : "Error loading data");
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    if (token) fetchData(token);
  }, [token, fetchData]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const t = input.trim();
    if (!t) return;
    sessionStorage.setItem(STORAGE_KEY, t);
    setToken(t);
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken("");
    setInput("");
    setData(null);
  }

  function exportCSV() {
    if (!data || data.length === 0) return;
    const headers = lang === "es"
      ? ["ID", "Nombre", "Email", "Empresa", "Sector", "Urgencia", "Mensaje", "Fecha"]
      : ["ID", "Name", "Email", "Company", "Sector", "Urgency", "Message", "Date"];
    const rows = data.map(r => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      r.email,
      `"${r.company.replace(/"/g, '""')}"`,
      r.sector,
      r.urgency,
      `"${r.message.replace(/"/g, '""')}"`,
      new Date(r.createdAt).toLocaleString(lang === "es" ? "es-PE" : "en-US"),
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assegura-ai-contactos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-card border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-white font-display font-bold text-lg">
                {lang === "es" ? "Panel de Administración" : "Admin Panel"}
              </h1>
              <p className="text-muted-foreground text-xs">ASSEGURA AI</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                {lang === "es" ? "Contraseña" : "Password"}
              </label>
              <Input
                type="password"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="••••••••"
                className="bg-background border-white/10 text-white"
                autoFocus
              />
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
              {lang === "es" ? "Ingresar" : "Sign In"}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-3">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-blue-200">
                {lang === "es" ? "Panel de Administración" : "Admin Panel"}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
              {lang === "es" ? "Solicitudes de Contacto" : "Contact Requests"}
            </h1>
            {data && (
              <p className="text-muted-foreground mt-1">
                {data.length} {lang === "es" ? "solicitudes recibidas" : "requests received"}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={exportCSV}
              disabled={!data || data.length === 0}
              className="border-white/10 text-white hover:bg-white/5 disabled:opacity-40"
              title={lang === "es" ? "Exportar a Excel / Google Sheets" : "Export to Excel / Google Sheets"}
            >
              <Download className="w-4 h-4 mr-2" />
              {lang === "es" ? "Exportar CSV" : "Export CSV"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchData(token)}
              disabled={loading}
              className="border-white/10 text-white hover:bg-white/5"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {lang === "es" ? "Actualizar" : "Refresh"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-white/10 text-white hover:bg-white/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {lang === "es" ? "Salir" : "Sign Out"}
            </Button>
          </div>
        </div>

        {fetchError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-red-400">
            {fetchError}
          </div>
        )}

        {loading && !data && (
          <div className="flex items-center justify-center py-24">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {data && data.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">
              {lang === "es" ? "Aún no hay solicitudes recibidas." : "No requests received yet."}
            </p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="space-y-4">
            {data.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-card border border-white/10 rounded-2xl p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm font-bold">#{req.id}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg leading-tight">{req.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Mail className="w-3.5 h-3.5" />
                        <a href={`mailto:${req.email}`} className="hover:text-primary transition-colors">
                          {req.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {urgencyLabel[req.urgency] && (
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${urgencyLabel[req.urgency].color}`}>
                        {lang === "es" ? urgencyLabel[req.urgency].es : urgencyLabel[req.urgency].en}
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(req.createdAt, lang)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4 shrink-0 text-primary/60" />
                    <span><span className="text-white/60 mr-1">{lang === "es" ? "Empresa:" : "Company:"}</span>{req.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-4 h-4 shrink-0 text-primary/60 font-bold text-xs flex items-center justify-center">§</span>
                    <span><span className="text-white/60 mr-1">{lang === "es" ? "Sector:" : "Sector:"}</span>{req.sector}</span>
                  </div>
                </div>

                <div className="bg-background/40 rounded-xl p-4 border border-white/5">
                  <p className="text-xs text-muted-foreground mb-1.5 uppercase tracking-wide">
                    {lang === "es" ? "Mensaje" : "Message"}
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed">{req.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
