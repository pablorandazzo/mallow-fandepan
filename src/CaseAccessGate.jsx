import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import {
  CASE_ACCESS_PASSWORD,
  hasCaseAccess,
  grantCaseAccess,
} from "./caseAccess";
import "./access.css";

export default function CaseAccessGate({ children }) {
  const [allowed, setAllowed] = useState(hasCaseAccess);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const input = useRef(null);
  useEffect(() => {
    const reconcile = () => setAllowed(hasCaseAccess());
    window.addEventListener("pageshow", reconcile);
    return () => window.removeEventListener("pageshow", reconcile);
  }, []);
  useEffect(() => {
    if (!allowed) document.title = "Acceso al caso Fan de Pan — Mallow";
  }, [allowed]);
  function submit(event) {
    event.preventDefault();
    if (password !== CASE_ACCESS_PASSWORD) {
      setError("Contraseña incorrecta. Volvé a intentarlo.");
      setPassword("");
      input.current?.focus();
      return;
    }
    if (!grantCaseAccess()) {
      setError(
        "Permití el almacenamiento de sesión del navegador para continuar.",
      );
      return;
    }
    setPassword("");
    setError("");
    setAllowed(true);
  }
  if (allowed) return children;
  return (
    <main className="case-access-page">
      <a className="brand" href="/" aria-label="Mallow — inicio">
        <img className="mark" src="/mallow-mark.svg" alt="" />
        <span>mallow</span>
      </a>
      <section
        className="case-access-card"
        aria-labelledby="case-access-heading"
      >
        <span className="access-lock">
          <LockKeyhole size={25} strokeWidth={1.4} />
        </span>
        <p className="eyebrow">MALLOW × FAN DE PAN</p>
        <h1 id="case-access-heading">
          Acceso al caso
          <br />
          <em>Fan de Pan</em>
        </h1>
        <p>
          Ingresá la contraseña de la entrega para explorar el proyecto y sus
          documentos.
        </p>
        <form onSubmit={submit}>
          <label htmlFor="case-password">Contraseña del caso</label>
          <input
            ref={input}
            id="case-password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoCapitalize="off"
            spellCheck={false}
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              error ? "case-access-error" : "case-access-session"
            }
          />
          {error && (
            <p id="case-access-error" className="access-error" role="alert">
              {error}
            </p>
          )}
          <button className="button primary" type="submit">
            Entrar al caso <ArrowRight size={17} />
          </button>
        </form>
        <p id="case-access-session" className="access-session">
          Recordaremos el acceso durante esta sesión del navegador.
        </p>
      </section>
      <a className="access-back" href="/#caso">
        <ArrowLeft size={15} />
        Volver a Mallow
      </a>
      <p className="access-academic">
        Entrega académica · Actuación Profesional · FCE–UBA
      </p>
    </main>
  );
}
