import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Layers3,
  ScanLine,
  ChartNoAxesCombined,
  Sparkles,
  Check,
  Menu,
  X,
  Plus,
  FileText,
  ShieldCheck,
  CornerDownRight,
} from "lucide-react";
import { navigation, services, steps, team } from "./content";
import "./styles.css";
import "./readability.css";
import "./brand.css";

const icons = {
  scan: ScanLine,
  layers: Layers3,
  chart: ChartNoAxesCombined,
  sparkles: Sparkles,
  arrow: ArrowUpRight,
};

function Mark({ className = "" }) {
  return (
    <img
      className={`mark ${className}`}
      src="/mallow-mark.svg"
      alt=""
      aria-hidden="true"
    />
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeroArt() {
  const reduce = useReducedMotion();
  return (
    <div
      className="hero-art"
      aria-label="Ilustración conceptual: conectar negocio, datos y tecnología"
    >
      <div className="art-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <motion.div
        className="mallow-sculpture"
        animate={reduce ? {} : { y: [0, -12, 0], rotate: [-9, -5, -9] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="sculpture-inner">
          <Mark />
        </div>
      </motion.div>
      <motion.div
        className="art-note note-top"
        animate={reduce ? {} : { y: [0, 7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="note-icon">
          <ScanLine size={18} />
        </span>
        <div>
          <small>EL PUNTO DE PARTIDA</small>
          <strong>Entender tu negocio.</strong>
        </div>
        <Check size={17} className="green" />
      </motion.div>
      <div className="art-note note-bottom">
        <span className="note-icon">
          <ChartNoAxesCombined size={19} />
        </span>
        <div>
          <small>EL PRÓXIMO PASO</small>
          <strong>Decidir con claridad.</strong>
          <div className="mini-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <ArrowUpRight size={20} />
      </div>
      <span className="art-tag tag-one">
        <span />
        Negocio
      </span>
      <span className="art-tag tag-two">
        <span />
        Datos
      </span>
      <span className="art-tag tag-three">
        <span />
        Tecnología
      </span>
      <svg className="art-spark" viewBox="0 0 52 52" aria-hidden="true">
        <path
          d="M26 0Q27 25 52 26Q27 27 26 52Q25 27 0 26Q25 25 26 0"
          fill="currentColor"
        />
      </svg>
      <span className="art-caption">MENOS RUIDO. MÁS DIRECCIÓN.</span>
    </div>
  );
}

function Method() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = steps[active];
  const Icon = icons[current.icon];
  function onKeyDown(event) {
    let next;
    if (event.key === "ArrowRight") next = (active + 1) % steps.length;
    if (event.key === "ArrowLeft")
      next = (active + steps.length - 1) % steps.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = steps.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`step-${next}`)?.focus();
    }
  }
  return (
    <section id="metodo" className="method section">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">03 / NUESTRO MÉTODO</p>
            <h2>
              No saltamos a la solución.
              <br />
              <em>Construimos el camino.</em>
            </h2>
          </div>
          <p>
            Un proceso claro, de la primera pregunta
            <br className="desktop-break" /> a una decisión fundamentada.
          </p>
        </Reveal>
        <div
          className="method-tabs"
          role="tablist"
          aria-label="Etapas de nuestra metodología"
          onKeyDown={onKeyDown}
        >
          {steps.map((step, index) => (
            <button
              role="tab"
              id={`step-${index}`}
              aria-controls="method-panel"
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              key={step.title}
              onClick={() => setActive(index)}
            >
              <span className="step-number">0{index + 1}</span>
              {step.title}
              <ArrowUpRight size={19} />
              {active === index && (
                <motion.span
                  className="tab-line"
                  layoutId="method-underline"
                  transition={{ duration: reduce ? 0 : 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
        <div
          id="method-panel"
          role="tabpanel"
          aria-labelledby={`step-${active}`}
          tabIndex={0}
          className="method-panel"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="method-content"
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
            >
              <div className="method-visual">
                <div className="method-ring">
                  <Icon size={54} strokeWidth={1.2} />
                </div>
                <span>0{active + 1} / 04</span>
                <div className="diagram-label">
                  {current.title.toUpperCase()}
                </div>
              </div>
              <div className="method-description">
                <h3>{current.subtitle}</h3>
                <p>{current.text}</p>
                <div className="deliverable">
                  <FileText size={18} />
                  <span>
                    <small>LO QUE TE LLEVÁS</small>
                    {current.output}
                  </span>
                  <Check size={18} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CaseDialog({ dialogRef }) {
  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      aria-labelledby="case-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current.close();
      }}
    >
      <div className="dialog-inner">
        <button
          className="icon-button dialog-close"
          aria-label="Cerrar detalle del proyecto"
          onClick={() => dialogRef.current.close()}
        >
          <X />
        </button>
        <p className="eyebrow">MALLOW × FAN DE PAN / RESUMEN PÚBLICO</p>
        <h2 id="case-dialog-title">
          De una red que crece
          <br />a una red <em>que se conoce.</em>
        </h2>
        <p>
          El crecimiento de Fan de Pan plantea un desafío: contar con
          información financiera estandarizada y comparable, sin sumar
          complejidad a la operación de cada franquiciado.
        </p>
        <div className="dialog-grid">
          <article>
            <span>01 / DIAGNÓSTICO</span>
            <h3>Entender la situación</h3>
            <p>
              Relevamiento de procesos y arquitectura empresarial actual, con
              foco en la gestión financiera y la comunicación con la casa
              matriz.
            </p>
          </article>
          <article>
            <span>02 / RECOMENDACIÓN</span>
            <h3>Elegir un camino</h3>
            <p>
              Evaluación de soluciones de mercado y propuesta de una
              implementación SaaS modular: cinco locales piloto y despliegue por
              oleadas.
            </p>
          </article>
          <article>
            <span>03 / INNOVACIÓN</span>
            <h3>Probar antes de escalar</h3>
            <p>
              Oportunidad de IA para asistir la carga de comprobantes, con
              controles y confirmación humana. No se presenta como una solución
              productiva validada.
            </p>
          </article>
        </div>
        <div className="privacy-note">
          <ShieldCheck size={22} />
          <p>
            Este resumen no incluye documentación financiera ni respuestas
            confidenciales de proveedores. La implementación está fuera del
            alcance de la consultoría. El acceso privado requiere autenticación
            de servidor y no está configurado en esta versión.
          </p>
        </div>
        <button
          className="button primary"
          onClick={() => dialogRef.current.close()}
        >
          Volver al sitio <ArrowRight size={17} />
        </button>
      </div>
    </dialog>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef(null);
  const menuButton = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  useEffect(() => {
    function escape(event) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menuOpen]);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <motion.div
        className="reading-progress"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Mallow — inicio">
            <Mark />
            <span>mallow</span>
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map(([label, id]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#contacto" className="button nav-contact">
            Conversemos <ArrowUpRight size={16} />
          </a>
          <button
            ref={menuButton}
            className="menu-toggle icon-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Navegación móvil"
          >
            {[...navigation, ["Contacto", "contacto"]].map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={17} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero container" id="inicio">
          <div className="hero-copy">
            <Reveal>
              <div className="hero-eyebrow">
                <span className="status-dot" />
                CONSULTORÍA CON CRITERIO
              </div>
              <h1>
                Suaves en
                <br />
                la experiencia.
                <br />
                <em>Rigurosos</em>
                <br />
                por dentro<span className="purple">.</span>
              </h1>
              <p className="hero-description">
                Hacemos simple lo complejo. Conectamos negocio y tecnología para
                que tu próximo paso tenga una dirección clara.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#caso">
                  Conocé nuestro trabajo <ArrowUpRight size={18} />
                </a>
                <a className="text-link" href="#metodo">
                  Cómo lo hacemos <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-footnote">
                <span className="tiny-mark">✳</span>Primero entendemos. Después
                recomendamos.
              </div>
            </Reveal>
          </div>
          <Reveal className="hero-art-wrapper" delay={0.15}>
            <HeroArt />
          </Reveal>
          <div className="hero-bottom">
            <span>ESTRATEGIA CON PERSPECTIVA HUMANA.</span>
            <a href="#nosotros" aria-label="Descubrir Mallow">
              <ArrowDown size={17} /> DESLIZÁ PARA CONOCERNOS
            </a>
          </div>
        </section>
        <div className="expertise-strip">
          <div className="container">
            <span>El negocio primero.</span>
            <span>
              <Plus />
              Arquitectura empresarial
            </span>
            <span>
              <Plus />
              Estrategia y transformación
            </span>
            <span>
              <Plus />
              Selección de soluciones
            </span>
            <span>
              <Plus />
              IA con propósito
            </span>
          </div>
        </div>
        <section id="nosotros" className="section about container">
          <Reveal className="about-top">
            <p className="eyebrow">01 / SOMOS MALLOW</p>
            <div>
              <h2>
                La tecnología es una parte.
                <br />
                <em>Entenderte es el principio.</em>
              </h2>
              <p>
                Detrás de cada sistema hay personas, decisiones y una forma de
                trabajar. Miramos el conjunto para transformar la complejidad de
                tu organización en un camino que se pueda entender y recorrer.
              </p>
            </div>
          </Reveal>
          <div className="about-bottom">
            <Reveal className="philosophy">
              <span className="asterisk">✳</span>
              <h3>
                Claridad para decidir.
                <br />
                Criterio para avanzar.
              </h3>
              <p>
                No partimos de una herramienta.
                <br />
                Partimos de una buena pregunta.
              </p>
            </Reveal>
            <Reveal className="values">
              <article>
                <span>01</span>
                <div>
                  <h3>Escuchar antes de proponer</h3>
                  <p>
                    Cada organización tiene su contexto. El diagnóstico empieza
                    ahí.
                  </p>
                </div>
                <ScanLine />
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Fundamentar cada decisión</h3>
                  <p>
                    Evidencia, costos y riesgos visibles. Sin promesas difíciles
                    de sostener.
                  </p>
                </div>
                <ChartNoAxesCombined />
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Pensar en quienes lo usan</h3>
                  <p>
                    Una transformación solo tiene sentido si las personas pueden
                    adoptarla.
                  </p>
                </div>
                <Layers3 />
              </article>
            </Reveal>
          </div>
        </section>
        <section id="servicios" className="section services-section">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow">02 / LO QUE HACEMOS</p>
                <h2>
                  Distintas miradas.
                  <br />
                  <em>Una misma dirección.</em>
                </h2>
              </div>
              <p>
                Del diagnóstico a la recomendación.
                <br />
                Combinamos nuestras prácticas según el desafío.
              </p>
            </Reveal>
            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = icons[service.icon];
                return (
                  <Reveal key={service.title} delay={index * 0.06}>
                    <article className={`service-card service-${index}`}>
                      <div className="service-top">
                        <span className="service-icon">
                          <Icon size={25} strokeWidth={1.5} />
                        </span>
                        <span>0{index + 1}</span>
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                      <div className="chips">
                        {service.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
        <Method />
        <section id="caso" className="section case-section container">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">04 / EL CRITERIO, EN PRÁCTICA</p>
              <h2>
                Un desafío real.
                <br />
                <em>Una mirada integral.</em>
              </h2>
            </div>
            <span className="outline-label">
              PROYECTO DE CONSULTORÍA · 2026
            </span>
          </Reveal>
          <Reveal>
            <article className="case-card">
              <div className="case-copy">
                <div className="case-kicker">
                  <span className="status-dot" />
                  ESTRATEGIA + GESTIÓN FINANCIERA
                </div>
                <h3>
                  Crecer es importante.
                  <br />
                  <em>
                    Crecer con claridad,
                    <br />
                    también.
                  </em>
                </h3>
                <p>
                  Acompañamos a Fan de Pan en el análisis de su gestión
                  financiera: de la información dispersa a una propuesta para
                  conocer y gestionar mejor su red de franquicias.
                </p>
                <div className="case-tags">
                  <span>Arquitectura empresarial</span>
                  <span>Selección de soluciones</span>
                </div>
                <button
                  className="button case-button"
                  onClick={() => dialogRef.current.showModal()}
                >
                  Explorar el caso <ArrowUpRight size={18} />
                </button>
                <small className="case-disclaimer">
                  Diagnóstico y recomendación. No implementación realizada.
                </small>
              </div>
              <div className="case-art">
                <div className="bread-seal">
                  <svg viewBox="0 0 100 62" fill="none" aria-hidden="true">
                    <path
                      d="M13 49C1 22 20 4 40 11C56-5 83 6 81 25C99 26 102 48 86 52H22C17 52 15 51 13 49Z"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      d="M30 25L37 37M48 19L55 31M67 26L72 36"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>
                    FAN
                    <br />
                    DE PAN
                  </span>
                  <small>EL NEGOCIO DE CRECER.</small>
                </div>
                <span className="case-art-label">
                  GASTRONOMÍA / FRANQUICIAS
                </span>
                <div className="case-fact">
                  <strong>+45</strong>
                  <span>
                    locales en una red.
                    <br />
                    Un desafío compartido.
                  </span>
                  <ArrowUpRight />
                </div>
                <div className="case-orbit" />
              </div>
            </article>
          </Reveal>
          <div className="case-source">
            <span>
              Basado en el relevamiento del equipo y los entregables de la
              consultoría.
            </span>
            <span>
              Buenos Aires, Argentina <span className="source-dot">↗</span>
            </span>
          </div>
        </section>
        <section id="equipo" className="section team-section">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow">05 / LAS PERSONAS DETRÁS</p>
                <h2>
                  Miradas distintas.
                  <br />
                  <em>Un equipo que conecta.</em>
                </h2>
              </div>
              <p>
                Nos une la curiosidad por entender
                <br />y el compromiso de hacer las cosas con criterio.
              </p>
            </Reveal>
            <div className="team-grid">
              {team.map((person, index) => (
                <Reveal key={person.name} delay={index * 0.03}>
                  <article className="person">
                    <div className={`avatar avatar-${person.color}`}>
                      <span>{person.initials}</span>
                      <Mark />
                      <span className="person-number">0{index + 1}</span>
                    </div>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="team-academic">
              <img
                className="academic-mark"
                src="/logo_FCE_sin_fondo.png"
                alt="Facultad de Ciencias Económicas · Universidad de Buenos Aires"
                width="2315"
                height="2480"
                loading="lazy"
              />
              <div>
                <strong>Formación que se encuentra con la práctica.</strong>
                <p>
                  Licenciatura en Sistemas de Información de las Organizaciones
                  {" · "}Facultad de Ciencias Económicas · Universidad de Buenos Aires.
                </p>
              </div>
              <span className="outline-label">APLSI · GRUPO 2</span>
            </Reveal>
          </div>
        </section>
        <section id="contacto" className="section contact container">
          <Reveal>
            <p className="eyebrow">06 / EMPECEMOS POR UNA CONVERSACIÓN</p>
            <h2>
              Las buenas decisiones
              <br />
              empiezan con una
              <br />
              <em>buena pregunta.</em>
              <span className="contact-spark">✳</span>
            </h2>
            <div className="contact-bottom">
              <p>
                ¿Qué necesita hoy tu organización?
                <br />
                Ordenemos el punto de partida.
              </p>
              <a href="#equipo" className="button primary">
                Conocé al equipo <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="contact-note">
              <CornerDownRight size={18} />
              <p>
                Proyecto académico: el canal de contacto comercial todavía no
                está habilitado. Sin formularios que simulen envíos ni datos de
                contacto ficticios.
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a
              className="brand"
              href="#inicio"
              aria-label="Mallow — volver al inicio"
            >
              <Mark />
              <span>mallow</span>
            </a>
            <p>
              Suave en la experiencia.
              <br />
              Riguroso por dentro.
            </p>
            <a href="#inicio" className="back-to-top">
              Volver al inicio <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Mallow · Proyecto académico · FCE–UBA</p>
            <p>Actuación Profesional · Cátedra Piorun</p>
            <span>
              Hecho con criterio <span className="purple">✳</span>
            </span>
          </div>
        </div>
      </footer>
      <CaseDialog dialogRef={dialogRef} />
    </MotionConfig>
  );
}
