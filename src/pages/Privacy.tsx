import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

const content = {
  es: {
    badge: "Legal",
    title: "Política de Privacidad",
    updated: "Última actualización: 2025",
    sections: [
      {
        number: "1",
        title: "Identidad del Responsable",
        body: "ASSEGURA AI (en adelante, «la Empresa») es responsable del tratamiento de los datos personales recopilados a través del sitio web www.asseguraai.com. La Empresa presta servicios de consultoría en seguridad, salud ocupacional, medio ambiente (HSE) y soluciones basadas en inteligencia artificial en Latinoamérica.",
      },
      {
        number: "2",
        title: "Marco Legal Aplicable",
        body: "Esta política cumple con las principales normativas de protección de datos en Latinoamérica:",
        items: [
          "🇵🇪 Perú: Ley N° 29733 – Ley de Protección de Datos Personales",
          "🇲🇽 México: Ley Federal de Protección de Datos Personales",
          "🇧🇷 Brasil: LGPD – Lei Geral de Proteção de Dados",
          "🇨🇴 Colombia: Ley 1581 de 2012",
          "🇦🇷 Argentina: Ley 25.326",
          "🇨🇱 Chile: Ley 19.628",
        ],
        footer: "Además, se consideran principios regionales como el derecho de habeas data, que permite acceder, rectificar y eliminar datos personales.",
      },
      {
        number: "3",
        title: "Datos que Recopilamos",
        body: "Podemos recopilar los siguientes datos:",
        items: [
          "Nombre completo",
          "Correo electrónico",
          "Empresa",
          "Sector industrial",
          "Información sobre necesidades o riesgos operativos",
          "Datos de contacto (teléfono, WhatsApp)",
        ],
      },
      {
        number: "4",
        title: "Finalidad del Tratamiento",
        body: "Los datos personales se utilizan para:",
        items: [
          "Contactar al usuario",
          "Agendar reuniones o diagnósticos",
          "Evaluar necesidades en HSE y riesgos",
          "Proporcionar propuestas comerciales",
          "Mejorar nuestros servicios",
          "Cumplir obligaciones legales",
        ],
      },
      {
        number: "5",
        title: "Base Legal",
        body: "Tratamos los datos bajo las siguientes bases:",
        items: [
          "Consentimiento del usuario",
          "Ejecución de servicios solicitados",
          "Interés legítimo empresarial",
          "Cumplimiento de obligaciones legales",
        ],
      },
      {
        number: "6",
        title: "Conservación de los Datos",
        body: "Los datos serán conservados:",
        items: [
          "Mientras exista relación comercial",
          "O hasta que el usuario solicite su eliminación",
          "O según lo requerido por la legislación aplicable",
        ],
      },
      {
        number: "7",
        title: "Derechos del Titular",
        body: "El usuario puede ejercer en cualquier momento:",
        items: [
          "Acceso a sus datos",
          "Rectificación",
          "Cancelación / eliminación",
          "Oposición al tratamiento",
          "Portabilidad (cuando aplique)",
        ],
      },
      {
        number: "8",
        title: "Transferencia Internacional de Datos",
        body: "Dado que operamos en LATAM, los datos pueden ser transferidos entre países, garantizando:",
        items: [
          "Medidas de seguridad adecuadas",
          "Cumplimiento de normativas locales",
          "Protección equivalente al país de origen",
        ],
      },
      {
        number: "9",
        title: "Seguridad de la Información",
        body: "ASSEGURA AI implementa medidas técnicas y organizativas para proteger los datos contra:",
        items: [
          "Acceso no autorizado",
          "Pérdida",
          "Alteración",
          "Uso indebido",
        ],
      },
      {
        number: "10",
        title: "Uso de Cookies",
        body: "Este sitio puede utilizar cookies para:",
        items: [
          "Analítica web",
          "Mejora de experiencia",
          "Personalización",
        ],
        footer: "El usuario puede gestionar o desactivar cookies desde su navegador.",
      },
      {
        number: "11",
        title: "Contacto",
        body: "Para ejercer derechos o realizar consultas, escríbenos a:",
        contact: "contacto@asseguraai.com",
      },
      {
        number: "12",
        title: "Actualizaciones",
        body: "Esta política puede ser modificada para adaptarse a cambios legales o tecnológicos en la región.",
      },
    ],
  },
  en: {
    badge: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: 2025",
    sections: [
      {
        number: "1",
        title: "Data Controller",
        body: "ASSEGURA AI (hereinafter, \"the Company\") is responsible for processing the personal data collected through the website www.asseguraai.com. The Company provides consulting services in safety, occupational health, environment (HSE) and artificial intelligence solutions across Latin America.",
      },
      {
        number: "2",
        title: "Applicable Legal Framework",
        body: "This policy complies with the main data protection regulations in Latin America:",
        items: [
          "🇵🇪 Peru: Law No. 29733 – Personal Data Protection Law",
          "🇲🇽 Mexico: Federal Law on Protection of Personal Data",
          "🇧🇷 Brazil: LGPD – General Data Protection Law",
          "🇨🇴 Colombia: Law 1581 of 2012",
          "🇦🇷 Argentina: Law 25.326",
          "🇨🇱 Chile: Law 19.628",
        ],
        footer: "Regional principles such as the right of habeas data are also considered, allowing users to access, correct and delete their personal data.",
      },
      {
        number: "3",
        title: "Data We Collect",
        body: "We may collect the following data:",
        items: [
          "Full name",
          "Email address",
          "Company",
          "Industry sector",
          "Information about operational needs or risks",
          "Contact details (phone, WhatsApp)",
        ],
      },
      {
        number: "4",
        title: "Purpose of Processing",
        body: "Personal data is used to:",
        items: [
          "Contact the user",
          "Schedule meetings or diagnostics",
          "Assess HSE needs and risks",
          "Provide commercial proposals",
          "Improve our services",
          "Comply with legal obligations",
        ],
      },
      {
        number: "5",
        title: "Legal Basis",
        body: "We process data under the following bases:",
        items: [
          "User consent",
          "Performance of requested services",
          "Legitimate business interest",
          "Compliance with legal obligations",
        ],
      },
      {
        number: "6",
        title: "Data Retention",
        body: "Data will be retained:",
        items: [
          "While a commercial relationship exists",
          "Or until the user requests deletion",
          "Or as required by applicable legislation",
        ],
      },
      {
        number: "7",
        title: "User Rights",
        body: "Users may exercise at any time:",
        items: [
          "Access to their data",
          "Rectification",
          "Cancellation / deletion",
          "Opposition to processing",
          "Portability (where applicable)",
        ],
      },
      {
        number: "8",
        title: "International Data Transfers",
        body: "Since we operate across LATAM, data may be transferred between countries, ensuring:",
        items: [
          "Adequate security measures",
          "Compliance with local regulations",
          "Equivalent protection to the country of origin",
        ],
      },
      {
        number: "9",
        title: "Information Security",
        body: "ASSEGURA AI implements technical and organizational measures to protect data against:",
        items: [
          "Unauthorized access",
          "Loss",
          "Alteration",
          "Misuse",
        ],
      },
      {
        number: "10",
        title: "Use of Cookies",
        body: "This site may use cookies for:",
        items: [
          "Web analytics",
          "Experience improvement",
          "Personalization",
        ],
        footer: "Users can manage or disable cookies from their browser settings.",
      },
      {
        number: "11",
        title: "Contact",
        body: "To exercise rights or make inquiries, write to us at:",
        contact: "contacto@asseguraai.com",
      },
      {
        number: "12",
        title: "Updates",
        body: "This policy may be modified to adapt to legal or technological changes in the region.",
      },
    ],
  },
};

export default function Privacy() {
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
            <Shield className="w-4 h-4 text-primary" />
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
