import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Download,
  FileText,
  FolderOpen,
  Layers3,
  LockKeyhole,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { caseDeliveries, caseStages } from "./caseContent";
import { clearCaseAccess } from "./caseAccess";
import "./styles.css";
import "./readability.css";
import "./brand.css";
import "./case.css";

const readSelection = () =>
  new URL(window.location.href).searchParams.get("entrega") || "overview";
const documentUrl = (id, kind) => {
  const delivery = caseDeliveries.find(item => item.id === id);
  const extension = kind === 'pdf' ? 'pdf' : delivery.format.toLowerCase();
  return `/case-documents/${id.toLowerCase()}.${extension}`;
};
const stageLabel = (id) =>
  caseStages.find((stage) => stage.id === id)?.label || id;

function Status({ value }) {
  return (
    <span
      className={`delivery-status status-${value === "Disponible" ? "available" : value === "Borrador" ? "draft" : "pending"}`}
    >
      <span />
      {value}
    </span>
  );
}

function PdfReading({ delivery }) {
  const [state, setState] = useState("loading");
  const url = documentUrl(delivery.id, "pdf");
  useEffect(() => {
    const controller = new AbortController();
    setState("loading");
    fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
      credentials: "same-origin",
    })
      .then((response) => {
        if (
          !response.ok ||
          !response.headers.get("content-type")?.includes("application/pdf")
        )
          throw new Error("PDF no disponible");
        setState("ready");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setState("error");
      });
    return () => controller.abort();
  }, [url]);
  if (state === "loading")
    return (
      <div className="document-message" role="status">
        <FileText />
        <p>Preparando el PDF de lectura…</p>
      </div>
    );
  if (state === "error")
    return (
      <div className="document-message" role="alert">
        <FileText />
        <h3>No pudimos abrir el PDF.</h3>
        <p>
          Podés descargar el documento original o usar el botón «Abrir PDF»
          para consultarlo en otra pestaña.
        </p>
      </div>
    );
  return (
    <div className="pdf-reading">
      <iframe
        src={url}
        title={`PDF de lectura ${delivery.id}: ${delivery.title}`}
        referrerPolicy="no-referrer"
        onError={() => setState("error")}
      />
      <p>
        El visor depende de tu navegador. Si no se muestra o preferís leer en
        pantalla completa, usá «Abrir PDF».
      </p>
    </div>
  );
}

function OriginalDocument({ delivery, access }) {
  const available = access.documents?.find(
    (document) => document.id === delivery.id,
  );
  if (access.loading)
    return (
      <div className="document-message" role="status">
        <FileText />
        <p>Comprobando disponibilidad de documentos…</p>
      </div>
    );
  if (!delivery.sourceFile && !available?.pdf)
    return (
      <div className="document-message">
        <FolderOpen />
        <h3>Documento pendiente</h3>
        <p>
          No hay una entrega resuelta incorporada para {delivery.id}. Esta vista
          describe el trabajo previsto; no reemplaza un entregable realizado.
        </p>
      </div>
    );
  if (!access.enabled)
    return (
      <div className="document-message restricted-message">
        <LockKeyhole />
        <h3>No pudimos cargar los documentos</h3>
        <p>
          El catálogo de archivos no está disponible en este momento.
          Recargá la página para volver a intentarlo.
        </p>
      </div>
    );
  if (!available?.original && !available?.pdf)
    return (
      <div className="document-message">
        <FileText />
        <h3>Documento no incorporado</h3>
        <p>
          La entrega figura en el índice, pero su archivo original no está
          disponible. No mostramos un documento de reemplazo.
        </p>
      </div>
    );
  return (
    <div className="original-panel">
      <div className="original-toolbar">
        <div>
          <FileText size={20} />
          <span>
            <strong>
              {delivery.id} · {available.original ? delivery.format : "PDF"}
            </strong>
            <small>
              {available.pdf && available.original
                ? "PDF actualizado y archivo editable disponible por separado"
                : available.pdf
                  ? "Informe académico en PDF"
                  : "Planilla original de la matriz"}
            </small>
          </span>
        </div>
        <div className="document-actions">
          {available.pdf && (
            <a
              className="case-action"
              href={documentUrl(delivery.id, "pdf")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir PDF <ArrowUpRight size={16} />
            </a>
          )}
          {available.original && (
            <a
              className="case-action filled"
              href={documentUrl(delivery.id, "original")}
              download={delivery.sourceFile}
            >
              Descargar {delivery.format} <Download size={16} />
            </a>
          )}
        </div>
      </div>
      {available.pdf ? (
        <PdfReading delivery={delivery} />
      ) : (
        <div className="document-message">
          <Layers3 />
          <h3>
            {delivery.format === "XLSX"
              ? "Una matriz para explorar, no solo para mirar."
              : "El original está disponible para descarga."}
          </h3>
          <p>
            {delivery.format === "XLSX"
              ? "Descargá el Excel para consultar la matriz completa."
              : "Todavía no se generó un PDF de lectura para esta fuente. Podés abrir el archivo original con su aplicación correspondiente."}
          </p>
        </div>
      )}
    </div>
  );
}

function DemoResources({ demo }) {
  const samplePath = `${demo.basePath}/comprobantes_sinteticos`;
  const evidencePath = `${demo.basePath}/evidencia`;

  return (
    <section className="demo-resources" aria-labelledby="demo-resources-title">
      <div className="demo-resources-heading">
        <div>
          <h2 id="demo-resources-title">Probá el prototipo</h2>
          <p>
            Abrí el formulario de n8n y cargá un comprobante sintético. La demo
            usa un modelo externo y consume créditos por extracción; no cargues
            comprobantes reales. Revisá cada campo antes de confirmar.
          </p>
        </div>
        <a className="case-action filled" href={demo.url} target="_blank" rel="noopener noreferrer">
          Abrir formulario de prueba <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="demo-resource-group">
        <div className="demo-resource-group-heading">
          <div>
            <h3>Comprobantes para probar</h3>
            <p>Empezá con una de estas dos facturas ficticias. El paquete incluye todos los casos de ensayo y sus referencias.</p>
          </div>
          <a className="case-action" href={`${demo.basePath}/comprobantes-sinteticos.zip`} download>
            Descargar todos los comprobantes <Download size={16} />
          </a>
        </div>
        <div className="demo-samples">
          {demo.samples.map((sample) => (
            <div className="demo-sample" key={sample.file}>
              <img src={`${samplePath}/${sample.file}.png`} alt={`Comprobante sintético: ${sample.name}`} loading="lazy" />
              <div>
                <strong>{sample.name}</strong>
                <span>Documento ficticio · sin validez fiscal</span>
                <div className="demo-sample-links">
                  <a href={`${samplePath}/${sample.file}.png`} download>Descargar imagen</a>
                  <a href={`${samplePath}/${sample.file}.pdf`} download>Descargar PDF</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="demo-resource-note">El paquete también contiene casos de duplicado, montos inconsistentes y un PDF inválido para probar el rechazo. Ese PDF no sirve para una carga correcta.</p>
      </div>

      <div className="demo-resource-group">
        <div className="demo-resource-group-heading">
          <div>
            <h3>Evidencia técnica</h3>
            <p>Capturas de la prueba, trazas de ejecución y resultados de las reglas. Son ensayos técnicos, no una validación de usuarios de Fan de Pan.</p>
          </div>
          <a className="case-action" href={`${demo.basePath}/evidencia-tecnica.zip`} download>
            Descargar toda la evidencia <Download size={16} />
          </a>
        </div>
        <div className="demo-evidence-grid">
          {demo.evidence.map((item) => (
            <a href={`${evidencePath}/${item.file}`} target="_blank" rel="noopener noreferrer" key={item.file}>
              <img src={`${evidencePath}/${item.file}`} alt="" loading="lazy" />
              <span>{item.name} <ArrowUpRight size={15} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Summary({ delivery }) {
  return (
    <div className="delivery-summary">
      <p className="delivery-intro">{delivery.summary}</p>
      {delivery.demo && <DemoResources demo={delivery.demo} />}
    </div>
  );
}

function Overview({ navigate }) {
  const counts = caseDeliveries.reduce(
    (totals, delivery) => ({
      ...totals,
      [delivery.status]: (totals[delivery.status] || 0) + 1,
    }),
    {},
  );
  return (
    <>
      <div className="case-breadcrumb">
        <span>CASO 001</span>
        <ChevronRight size={13} />
        <span>VISTA EJECUTIVA</span>
      </div>
      <div className="case-overview-header">
        <p className="eyebrow">MALLOW × FAN DE PAN</p>
        <h1 tabIndex={-1} id="case-page-heading">
          Una red que crece.
          <br />
          <em>Una red que se conoce.</em>
        </h1>
        <p>
          Una consultoría sobre la gestión financiera de más de 45 locales: qué
          se relevó, qué proveedor se recomienda y qué falta comprobar.
        </p>
        <div className="case-overview-tags">
          <span>Gastronomía y franquicias</span>
          <span>Arquitectura empresarial</span>
          <span>Consultoría académica · 2026</span>
        </div>
      </div>
      <div className="case-executive">
        <article>
          <span>01 / EL DESAFÍO</span>
          <h2>Información financiera dispersa.</h2>
          <p>
            Los locales registran costos con criterios diferentes. La casa
            matriz consolida los resultados a mano.
          </p>
        </article>
        <article>
          <span>02 / EL ALCANCE</span>
          <h2>Recomendar un proveedor.</h2>
          <p>
            Ayres IT lidera la matriz, pero debe demostrar requisitos obligatorios
            y cerrar condiciones antes de contratar.
          </p>
        </article>
        <article>
          <span>03 / EL CAMINO</span>
          <h2>Un piloto propuesto y una demo técnica.</h2>
          <p>
            Se proponen cinco locales piloto. La demo de IA usa comprobantes
            sintéticos y todavía no se integró a AyresERP.
          </p>
        </article>
      </div>
      <section className="case-roadmap">
        <div className="case-section-title">
          <div>
            <p className="eyebrow">UN TRABAJO, DE PRINCIPIO A FIN</p>
            <h2>Explorá el recorrido.</h2>
          </div>
          <div className="case-status-counts">
            {Object.entries(counts).map(([status, count]) => (
              <span key={status}>
                {count}{" "}
                {status === "Disponible"
                  ? "disponibles"
                  : status === "Borrador"
                    ? "borradores"
                    : "pendientes"}
              </span>
            ))}
          </div>
        </div>
        {caseStages.map((stage) => (
          <div className="delivery-group" key={stage.id}>
            <h3>{stage.label}</h3>
            <div className="delivery-grid">
              {caseDeliveries
                .filter((delivery) => delivery.stage === stage.id)
                .map((delivery) => (
                  <a
                    className="delivery-card"
                    href={`?entrega=${delivery.slug}`}
                    key={delivery.id}
                    onClick={(event) => navigate(event, delivery.slug)}
                  >
                    <div>
                      <span className="delivery-id">{delivery.id}</span>
                      <Status value={delivery.status} />
                    </div>
                    <h4>{delivery.title}</h4>
                    <p>{delivery.summary}</p>
                    <span className="delivery-card-link">
                      Explorar entrega <ArrowUpRight size={16} />
                    </span>
                  </a>
                ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default function CasePage() {
  const [selection, setSelection] = useState(readSelection);
  const [view, setView] = useState("summary");
  const [access, setAccess] = useState({
    loading: true,
    enabled: false,
    documents: [],
  });
  const reduce = useReducedMotion();
  const focusAfterNavigation = useRef(false);
  const delivery = caseDeliveries.find((item) => item.slug === selection);
  const selectedIndex = delivery ? caseDeliveries.indexOf(delivery) : -1;
  useEffect(() => {
    const pop = () => {
      setSelection(readSelection());
      setView("summary");
      focusAfterNavigation.current = true;
    };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  useEffect(() => {
    document.title = delivery
      ? `${delivery.id} · ${delivery.title} — Mallow × Fan de Pan`
      : "El caso Fan de Pan — Mallow";
    if (focusAfterNavigation.current) {
      document
        .getElementById("case-page-heading")
        ?.focus({ preventScroll: true });
      focusAfterNavigation.current = false;
    }
  }, [selection, delivery]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/case-documents/manifest.json", {
      cache: "no-store",
      signal: controller.signal,
      credentials: "same-origin",
    })
      .then((response) => {
        if (
          !response.ok ||
          !response.headers.get("content-type")?.includes("application/json")
        )
          throw new Error("No disponible");
        return response.json();
      })
      .then((data) =>
        setAccess({
          loading: false,
          enabled: data.enabled === true,
          documents: Array.isArray(data.documents) ? data.documents : [],
        }),
      )
      .catch((error) => {
        if (error.name !== "AbortError")
          setAccess({ loading: false, enabled: false, documents: [] });
      });
    return () => controller.abort();
  }, []);
  function choose(slug) {
    const url = new URL(window.location.href);
    if (slug === "overview") url.searchParams.delete("entrega");
    else url.searchParams.set("entrega", slug);
    window.history.pushState({}, "", url);
    setSelection(slug);
    setView("summary");
    focusAfterNavigation.current = true;
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function navigate(event, slug) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    choose(slug);
  }
  function switchView(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? "summary"
        : event.key === "End"
          ? "original"
          : view === "summary"
            ? "original"
            : "summary";
    setView(next);
    document.getElementById(`delivery-tab-${next}`)?.focus();
  }
  return (
    <div className="case-study">
      <a className="skip-link" href="#case-content">
        Saltar al contenido del caso
      </a>
      <header className="case-study-header">
        <a className="brand" href="/" aria-label="Mallow — inicio">
          <img className="mark" src="/mallow-mark.svg" alt="" />
          <span>mallow</span>
        </a>
        <div className="case-header-project">
          <span>CASO DE CONSULTORÍA</span>
          <img
            className="fan-de-pan-logo"
            src="/fan-de-pan-logo.png"
            alt="Fan de Pan"
            width="226"
            height="23"
          />
        </div>
        <a className="case-return" href="/#caso">
          <ArrowLeft size={16} />
          Volver a Mallow
        </a>
        <button className="case-logout" onClick={clearCaseAccess}>
          <LogOut size={14} />Salir del caso
        </button>
      </header>
      <div className="case-layout">
        <aside className="case-sidebar">
          <div className="case-sidebar-title">
            <span className="case-project-number">001</span>
            <div>
              <strong>Fan de Pan</strong>
              <p>Carpeta del proyecto</p>
            </div>
          </div>
          <nav aria-label="Entregas del caso">
            <a
              className={`case-overview-link ${selection === "overview" ? "is-active" : ""}`}
              href="/caso-fan-de-pan"
              aria-current={selection === "overview" ? "page" : undefined}
              onClick={(event) => navigate(event, "overview")}
            >
              <FolderOpen size={17} />
              Vista ejecutiva
            </a>
            {caseStages.map((stage) => (
              <div className="sidebar-stage" key={stage.id}>
                <p>{stage.label}</p>
                {caseDeliveries
                  .filter((item) => item.stage === stage.id)
                  .map((item) => (
                    <a
                      data-delivery
                      key={item.id}
                      href={`?entrega=${item.slug}`}
                      className={selection === item.slug ? "is-active" : ""}
                      aria-current={
                        selection === item.slug ? "page" : undefined
                      }
                      onClick={(event) => navigate(event, item.slug)}
                    >
                      <span>{item.id}</span>
                      <span>{item.shortTitle}</span>
                      <span
                        className={`nav-status ${item.status === "Pendiente" ? "nav-pending" : item.status === "Borrador" ? "nav-draft" : ""}`}
                        aria-label={item.status}
                      />
                    </a>
                  ))}
              </div>
            ))}
          </nav>
          <div className="sidebar-boundary">
            <ShieldCheck size={19} />
            <p>
              Recomendamos el camino.
              <br />
              La organización decide.
            </p>
          </div>
        </aside>
        <div className="case-mobile-index">
          <label htmlFor="delivery-select">EXPLORAR EL CASO</label>
          <select
            id="delivery-select"
            aria-label="Elegir entrega"
            value={selection}
            onChange={(event) => choose(event.target.value)}
          >
            <option value="overview">Vista ejecutiva</option>
            {caseDeliveries.map((item) => (
              <option value={item.slug} key={item.id}>
                {item.id} · {item.shortTitle} · {item.status}
              </option>
            ))}
          </select>
        </div>
        <main id="case-content" className="case-main">
          <div
            className={`case-access-banner ${access.enabled ? "local-access" : ""}`}
          >
            <ShieldCheck size={16} />
            <p>
              {access.enabled
                ? "Acceso al caso habilitado · Introducciones, PDFs de lectura y documentos originales"
                : "Comprobando documentos del proyecto…"}
            </p>
          </div>
          <motion.div
            key={selection}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {selection === "overview" ? (
              <Overview navigate={navigate} />
            ) : !delivery ? (
              <section className="case-not-found">
                <FileText size={36} />
                <h1 id="case-page-heading" tabIndex={-1}>
                  Entrega no encontrada.
                </h1>
                <p>
                  El identificador del enlace no corresponde a una entrega de
                  este caso.
                </p>
                <a
                  className="case-action filled"
                  href="/caso-fan-de-pan"
                  onClick={(event) => navigate(event, "overview")}
                >
                  Volver al índice <ArrowRight size={17} />
                </a>
              </section>
            ) : (
              <>
                <div className="case-breadcrumb">
                  <a
                    href="/caso-fan-de-pan"
                    onClick={(event) => navigate(event, "overview")}
                  >
                    FAN DE PAN
                  </a>
                  <ChevronRight size={13} />
                  <span>{stageLabel(delivery.stage).toUpperCase()}</span>
                  <ChevronRight size={13} />
                  <span>{delivery.id}</span>
                </div>
                <header className="delivery-header">
                  <div className="delivery-header-meta">
                    <span className="delivery-id">{delivery.id}</span>
                    <Status value={delivery.status} />
                  </div>
                  <h1 id="case-page-heading" tabIndex={-1}>
                    {delivery.title}
                  </h1>
                </header>
                <div
                  className="delivery-tabs"
                  role="tablist"
                  aria-label="Vista de la entrega"
                  onKeyDown={switchView}
                >
                  <button
                    id="delivery-tab-summary"
                    role="tab"
                    aria-selected={view === "summary"}
                    aria-controls="delivery-panel"
                    tabIndex={view === "summary" ? 0 : -1}
                    onClick={() => setView("summary")}
                  >
                    <BookOpen size={17} />
                    Introducción
                  </button>
                  <button
                    id="delivery-tab-original"
                    role="tab"
                    aria-selected={view === "original"}
                    aria-controls="delivery-panel"
                    tabIndex={view === "original" ? 0 : -1}
                    onClick={() => setView("original")}
                  >
                    <FileText size={17} />
                    Documentos de la entrega
                    {!access.enabled && <LockKeyhole size={12} />}
                  </button>
                </div>
                <div
                  id="delivery-panel"
                  role="tabpanel"
                  aria-labelledby={`delivery-tab-${view}`}
                  tabIndex={0}
                >
                  {view === "summary" ? (
                    <Summary delivery={delivery} />
                  ) : (
                    <OriginalDocument delivery={delivery} access={access} />
                  )}
                </div>
                <nav
                  className="delivery-pagination"
                  aria-label="Recorrido entre entregas"
                >
                  {selectedIndex > 0 ? (
                    <a
                      href={`?entrega=${caseDeliveries[selectedIndex - 1].slug}`}
                      onClick={(event) =>
                        navigate(event, caseDeliveries[selectedIndex - 1].slug)
                      }
                    >
                      <ArrowLeft size={18} />
                      <span>
                        <small>ANTERIOR</small>
                        {caseDeliveries[selectedIndex - 1].id} ·{" "}
                        {caseDeliveries[selectedIndex - 1].shortTitle}
                      </span>
                    </a>
                  ) : (
                    <a
                      href="/caso-fan-de-pan"
                      onClick={(event) => navigate(event, "overview")}
                    >
                      <ArrowLeft size={18} />
                      <span>
                        <small>VOLVER</small>Vista ejecutiva
                      </span>
                    </a>
                  )}
                  {selectedIndex < caseDeliveries.length - 1 && (
                    <a
                      href={`?entrega=${caseDeliveries[selectedIndex + 1].slug}`}
                      onClick={(event) =>
                        navigate(event, caseDeliveries[selectedIndex + 1].slug)
                      }
                    >
                      <span>
                        <small>SIGUIENTE</small>
                        {caseDeliveries[selectedIndex + 1].id} ·{" "}
                        {caseDeliveries[selectedIndex + 1].shortTitle}
                      </span>
                      <ArrowRight size={18} />
                    </a>
                  )}
                </nav>
              </>
            )}
          </motion.div>
          <footer className="case-study-footer">
            <span>Mallow × Fan de Pan</span>
            <p>Proyecto académico · Actuación Profesional · FCE–UBA</p>
            <span>2026</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
