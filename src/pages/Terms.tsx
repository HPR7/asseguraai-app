import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

const content = {
  es: {
    badge: "Legal",
    title: "Términos del Servicio",
    updated: "Última actualización: 2025",
    sections: [
      {
        number: "1",
        title: "Identificación",
        body: "Los presentes Términos del Servicio regulan el acceso y uso del sitio web www.asseguraai.com, operado por ASSEGURA AI (en adelante, «la Empresa»), dedicada a servicios de consultoría en seguridad, salud ocupacional, medio ambiente (HSE) y soluciones basadas en inteligencia artificial.",
      },
      {
        number: "2",
        title: "Aceptación de los Términos",
        body: "Al acceder o utilizar este sitio web, el usuario acepta estos Términos del Servicio. Si el usuario no está de acuerdo, deberá abstenerse de utilizar el sitio.",
      },
      {
        number: "3",
        title: "Servicios Ofrecidos",
        body: "ASSEGURA AI ofrece:",
        items: [
          "Consultoría en HSE (Seguridad, Salud y Medio Ambiente)",
          "Implementación de sistemas de gestión (ISO 45001, ISO 14001)",
          "Evaluación de riesgos",
          "Soluciones basadas en inteligencia artificial",
          "Modelos predictivos y análisis de datos",
        ],
        footer: "Los servicios pueden variar según el alcance contratado.",
      },
      {
        number: "4",
        title: "Uso del Sitio Web",
        body: "El usuario se compromete a:",
        items: [
          "Utilizar el sitio de manera lícita",
          "No introducir información falsa o engañosa",
          "No intentar vulnerar la seguridad del sitio",
          "No usar el sitio para actividades ilegales",
        ],
      },
      {
        number: "5",
        title: "Formularios y Contacto",
        body: "Al completar formularios, el usuario:",
        items: [
          "Garantiza que la información proporcionada es veraz",
          "Acepta ser contactado por la Empresa",
          "Autoriza el uso de sus datos según la Política de Privacidad",
        ],
      },
      {
        number: "6",
        title: "Relación Comercial",
        body: "El uso del sitio web no constituye automáticamente una relación contractual. La relación se formaliza mediante propuesta, contrato o acuerdo específico.",
      },
      {
        number: "7",
        title: "Limitación de Responsabilidad",
        body: "ASSEGURA AI:",
        items: [
          "No garantiza resultados específicos en los servicios",
          "No será responsable por decisiones tomadas por el cliente basadas en análisis o recomendaciones",
          "No se responsabiliza por interrupciones del sitio web",
        ],
        footer: "Las decisiones finales siempre son responsabilidad del cliente.",
      },
      {
        number: "8",
        title: "Propiedad Intelectual",
        body: "Todo el contenido del sitio (textos, diseño, marca, logotipo, modelos, metodologías) es propiedad de ASSEGURA AI. Queda prohibido reproducir, distribuir o modificar sin autorización previa.",
      },
      {
        number: "9",
        title: "Confidencialidad",
        body: "La Empresa se compromete a:",
        items: [
          "Tratar la información del cliente de forma confidencial",
          "No divulgar información sin autorización",
          "Aplicar buenas prácticas de seguridad",
        ],
      },
      {
        number: "10",
        title: "Servicios Basados en IA",
        body: "Los servicios que involucren inteligencia artificial:",
        items: [
          "Se basan en modelos predictivos y análisis de datos",
          "No garantizan resultados exactos o infalibles",
          "Deben ser utilizados como apoyo en la toma de decisiones",
        ],
      },
      {
        number: "11",
        title: "Disponibilidad del Servicio",
        body: "ASSEGURA AI no garantiza que el sitio web esté disponible en todo momento ni que esté libre de errores o interrupciones.",
      },
      {
        number: "12",
        title: "Modificaciones",
        body: "La Empresa se reserva el derecho de modificar los servicios, contenidos y Términos del Servicio en cualquier momento.",
      },
      {
        number: "13",
        title: "Legislación Aplicable",
        body: "Estos términos se interpretan conforme a las leyes aplicables en Latinoamérica, considerando operaciones regionales. En caso de controversia, las partes buscarán resolver mediante negociación directa.",
      },
      {
        number: "14",
        title: "Contacto",
        body: "Para consultas sobre estos términos, escríbenos a:",
        contact: "contacto@asseguraai.com",
      },
    ],
  },
  en: {
    badge: "Legal",
    title: "Terms of Service",
    updated: "Last updated: 2025",
    sections: [
      {
        number: "1",
        title: "Identification",
        body: "These Terms of Service govern access to and use of the website www.asseguraai.com, operated by ASSEGURA AI (hereinafter, \"the Company\"), dedicated to consulting services in safety, occupational health, environment (HSE) and artificial intelligence solutions.",
      },
      {
        number: "2",
        title: "Acceptance of Terms",
        body: "By accessing or using this website, the user agrees to these Terms of Service. If the user does not agree, they must refrain from using the site.",
      },
      {
        number: "3",
        title: "Services Offered",
        body: "ASSEGURA AI offers:",
        items: [
          "HSE Consulting (Safety, Health and Environment)",
          "Management system implementation (ISO 45001, ISO 14001)",
          "Risk assessment",
          "Artificial intelligence-based solutions",
          "Predictive models and data analytics",
        ],
        footer: "Services may vary depending on the contracted scope.",
      },
      {
        number: "4",
        title: "Website Use",
        body: "The user agrees to:",
        items: [
          "Use the site lawfully",
          "Not submit false or misleading information",
          "Not attempt to compromise the site's security",
          "Not use the site for illegal activities",
        ],
      },
      {
        number: "5",
        title: "Forms and Contact",
        body: "By completing forms, the user:",
        items: [
          "Guarantees that the information provided is accurate",
          "Agrees to be contacted by the Company",
          "Authorizes the use of their data in accordance with the Privacy Policy",
        ],
      },
      {
        number: "6",
        title: "Commercial Relationship",
        body: "Use of the website does not automatically constitute a contractual relationship. The relationship is formalized through a specific proposal, contract or agreement.",
      },
      {
        number: "7",
        title: "Limitation of Liability",
        body: "ASSEGURA AI:",
        items: [
          "Does not guarantee specific results from services",
          "Is not liable for decisions made by the client based on analyses or recommendations",
          "Is not responsible for website interruptions",
        ],
        footer: "Final decisions are always the client's responsibility.",
      },
      {
        number: "8",
        title: "Intellectual Property",
        body: "All site content (texts, design, brand, logo, models, methodologies) is the property of ASSEGURA AI. Reproduction, distribution or modification without prior authorization is prohibited.",
      },
      {
        number: "9",
        title: "Confidentiality",
        body: "The Company commits to:",
        items: [
          "Treating client information confidentially",
          "Not disclosing information without authorization",
          "Applying good security practices",
        ],
      },
      {
        number: "10",
        title: "AI-Based Services",
        body: "Services involving artificial intelligence:",
        items: [
          "Are based on predictive models and data analysis",
          "Do not guarantee exact or infallible results",
          "Should be used as decision-support tools",
        ],
      },
      {
        number: "11",
        title: "Service Availability",
        body: "ASSEGURA AI does not guarantee that the website will be available at all times or that it will be free from errors or interruptions.",
      },
      {
        number: "12",
        title: "Modifications",
        body: "The Company reserves the right to modify services, content and Terms of Service at any time.",
      },
      {
        number: "13",
        title: "Applicable Law",
        body: "These terms are interpreted in accordance with the applicable laws in Latin America, taking into account regional operations. In case of dispute, the parties will seek to resolve through direct negotiation.",
      },
      {
        number: "14",
        title: "Contact",
        body: "For inquiries about these terms, write to us at:",
        contact: "contacto@asseguraai.com",
      },
    ],
  },
};

export default function Terms() {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <div className="w-full pt-44 sm:pt-52 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-6">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-blue-200">{c.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3">
            {c.title}
          </h1>
          <p className="text-muted-foreground text-sm">{c.updated}</p>
        </motion.div>

        <div className="space-y-10">
          {c.sections.map((section, i) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border border-white/10 rounded-2xl p-6 sm:p-8 bg-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 text-primary text-sm font-bold shrink-0">
                  {section.number}
                </span>
                <h2 className="text-lg sm:text-xl font-display font-semibold text-white">
                  {section.title}
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-3">{section.body}</p>

              {"items" in section && section.items && (
                <ul className="space-y-2 mb-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {"footer" in section && section.footer && (
                <p className="text-muted-foreground leading-relaxed text-sm mt-3 pt-3 border-t border-white/10">
                  {section.footer}
                </p>
              )}

              {"contact" in section && section.contact && (
                <a
                  href={`mailto:${section.contact}`}
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-1"
                >
                  {section.contact}
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
