import React, { useMemo, useState } from "react";
import "./App.css";

type Page =
  | "home"
  | "courses"
  | "degrees"
  | "financials"
  | "grades"
  | "classes"
  | "register"
  | "stelli"
  | "verification"
  | "catalog"
  | "balance"
  | "payments"
  | "awards"
  | "loans"
  | "transcript";

type AccessibilitySettings = {
  largeText: boolean;
  highContrast: boolean;
  zoom: boolean;
  spanish: boolean;
};

const pageList: { id: Page; title: string; keywords: string[] }[] = [
  { id: "courses", title: "Courses and Enrollment", keywords: ["courses", "enrollment", "register", "classes"] },
  { id: "degrees", title: "Degrees and Advisement", keywords: ["degree", "advisor", "program", "catalog"] },
  { id: "financials", title: "Student Financials", keywords: ["financial", "aid", "balance", "payments", "loans"] },
  { id: "grades", title: "Grades and Transcripts", keywords: ["grades", "gpa", "transcript"] },
];

const translations: Record<string, string> = {
  "Home": "Inicio",
  "Courses and Enrollment": "Cursos e Inscripción",
  "Degrees and Advisement": "Títulos y Asesoría",
  "Student Financials": "Finanzas del Estudiante",
  "Grades and Transcripts": "Calificaciones y Expedientes",
  "Search UDSIS...": "Buscar UDSIS...",
  "Bookmarks": "Marcadores",
  "No bookmarks yet.": "No hay marcadores todavía.",
  "Bookmark Current Page": "Guardar página actual",
  "Remove Current Page": "Eliminar página actual",
  "Accessibility": "Accesibilidad",
  "Accessibility Options": "Opciones de Accesibilidad",
  "Larger Text": "Texto más grande",
  "High Contrast": "Alto contraste",
  "Zoom": "Zoom",
  "Translate to Spanish": "Traducir al español",
  "1. Select a Term:": "1. Selecciona un semestre:",
  "2. After you Select a Term, You Can:": "2. Después de seleccionar un semestre, puedes:",
  "2026 Spring Semester": "Semestre de Primavera 2026",
  "2026 Summer Semester": "Semestre de Verano 2026",
  "2026 Fall Semester": "Semestre de Otoño 2026",
  "View My Classes": "Ver mis clases",
  "Register/Drop/Add": "Registrar/Quitar/Añadir",
  "Stellic": "Stellic",
  "Enrollment Verification": "Verificación de inscripción",
  "Browse Course Catalog": "Ver catálogo de cursos",
  "My Program": "Mi Programa",
  "Advisor": "Asesor",
  "Transfer Credits": "Créditos Transferidos",
  "Academic Catalog": "Catálogo Académico",
  "University of Delaware": "Universidad de Delaware",
  "Computer Science BS": "Ciencias de Computación BS",
  "Cybersecurity": "Ciberseguridad",
  "Spring 2027": "Primavera 2027",
  "Computer Science": "Ciencias de Computación",
  "Email": "Correo",
  "Schedule Meeting": "Programar Reunión",
  "No transfer credits yet": "No hay créditos transferidos todavía",
  "View Full Report": "Ver reporte completo",
  "Browse the full academic catalog.": "Ver el catálogo académico completo.",
  "Browse Catalog": "Ver catálogo",
  "My Finances": "Mis Finanzas",
  "Balance": "Saldo",
  "Pending Aid": "Ayuda pendiente",
  "Payments": "Pagos",
  "Important Dates": "Fechas importantes",
  "My Awards": "Mis Premios",
  "Awards": "Premios",
  "Financial Aid": "Ayuda financiera",
  "Loans": "Préstamos",
  "Accept/Decline": "Aceptar/Rechazar",
  "Other Important Financial Information": "Otra información financiera importante",
  "Academic Overview": "Resumen Académico",
  "Quick Actions": "Acciones Rápidas",
  "Cumulative GPA": "GPA acumulativo",
  "Courses Completed": "Cursos completados",
  "Academic Standing": "Estado académico",
  "Good": "Bueno",
  "View Unofficial Transcript": "Ver expediente no oficial",
  "Request Official Transcript": "Solicitar expediente oficial",
  "Course": "Curso",
  "Course Title": "Título del curso",
  "Credits": "Créditos",
  "Grade": "Nota",
  "Data Structures": "Estructuras de Datos",
  "Calculus III": "Cálculo III",
  "Intro to Cybersecurity": "Intro a Ciberseguridad",
  "Intro to Agriculture": "Intro a Agricultura",
  "Semester GPA": "GPA del semestre",
  "Semester Credits": "Créditos del semestre",
  "This page is functional, but uses placeholder information.": "Esta página funciona, pero usa información de ejemplo.",
  "Continue": "Continuar",
  "Back Home": "Volver al inicio",
};

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<Page[]>(["courses"]);
  const [search, setSearch] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("2026 Spring Semester");

  const [settings, setSettings] = useState<AccessibilitySettings>({
    largeText: false,
    highContrast: false,
    zoom: false,
    spanish: false,
  });

  function t(text: string) {
    return settings.spanish ? translations[text] || text : text;
  }

  function getPageTitle(id: Page) {
    if (id === "home") return t("Home");
    return t(pageList.find((p) => p.id === id)?.title || id);
  }

  const searchResults = useMemo(() => {
    if (!search.trim()) return pageList;
    const q = search.toLowerCase();

    return pageList.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.includes(q))
    );
  }, [search]);

  function toggleBookmark(target: Page) {
    setBookmarks((prev) =>
      prev.includes(target)
        ? prev.filter((p) => p !== target)
        : [...prev, target]
    );
  }

  function goTo(target: Page) {
    setPage(target);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  function fakeClick(name: string) {
    alert(`${name} clicked. This would open real UDSIS information.`);
  }

  return (
    <div
      className={[
        "app",
        settings.largeText ? "large-text" : "",
        settings.highContrast ? "high-contrast" : "",
        settings.zoom ? "zoom-mode" : "",
      ].join(" ")}
    >
      <header className="topbar">
        <button className="icon-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

        <button className="profile-btn" onClick={() => fakeClick("Profile")}>●</button>

        <button className="search-btn" onClick={() => setSearchOpen(!searchOpen)}>⌕</button>

        <button className="bookmark-btn" onClick={() => setBookmarkOpen(!bookmarkOpen)}>🔖</button>

        <button className="logo" onClick={() => goTo("home")}>
          <span className="ud-box">UD</span> UDSIS
        </button>

        <button className="accessibility" onClick={() => setAccessOpen(!accessOpen)}>
          ♿ {t("Accessibility")}
        </button>
      </header>

      {menuOpen && (
        <div className="panel menu-panel">
          <button onClick={() => goTo("home")}>{t("Home")}</button>
          <button onClick={() => goTo("courses")}>{t("Courses and Enrollment")}</button>
          <button onClick={() => goTo("degrees")}>{t("Degrees and Advisement")}</button>
          <button onClick={() => goTo("financials")}>{t("Student Financials")}</button>
          <button onClick={() => goTo("grades")}>{t("Grades and Transcripts")}</button>
        </div>
      )}

      {searchOpen && (
        <div className="panel">
          <input
            className="search-input"
            placeholder={t("Search UDSIS...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="results">
            {searchResults.map((result) => (
              <button key={result.id} onClick={() => goTo(result.id)}>
                {t(result.title)}
              </button>
            ))}
          </div>
        </div>
      )}

      {bookmarkOpen && (
        <div className="panel">
          <h3>{t("Bookmarks")}</h3>

          {bookmarks.length === 0 && <p>{t("No bookmarks yet.")}</p>}

          {bookmarks.map((b) => (
            <button key={b} onClick={() => goTo(b)}>
              {getPageTitle(b)}
            </button>
          ))}

          {page !== "home" && (
            <button className="blue" onClick={() => toggleBookmark(page)}>
              {bookmarks.includes(page)
                ? t("Remove Current Page")
                : t("Bookmark Current Page")}
            </button>
          )}
        </div>
      )}

      {accessOpen && (
        <div className="panel access-panel">
          <h3>{t("Accessibility Options")}</h3>

          <label>
            <input
              type="checkbox"
              checked={settings.largeText}
              onChange={() => setSettings({ ...settings, largeText: !settings.largeText })}
            />
            {t("Larger Text")}
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={() => setSettings({ ...settings, highContrast: !settings.highContrast })}
            />
            {t("High Contrast")}
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.zoom}
              onChange={() => setSettings({ ...settings, zoom: !settings.zoom })}
            />
            {t("Zoom")}
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.spanish}
              onChange={() => setSettings({ ...settings, spanish: !settings.spanish })}
            />
            {t("Translate to Spanish")}
          </label>
        </div>
      )}

      <main>
        {page === "home" && (
          <section className="home">
            <BigNav title={t("Courses and Enrollment")} icon="♿" onClick={() => goTo("courses")} />
            <BigNav title={t("Degrees and Advisement")} icon="📚" onClick={() => goTo("degrees")} />
            <BigNav title={t("Student Financials")} icon="🌐" onClick={() => goTo("financials")} />
            <BigNav title={t("Grades and Transcripts")} icon="📋" onClick={() => goTo("grades")} />
          </section>
        )}

        {page === "courses" && (
          <section>
            <h1>{t("Courses and Enrollment")}</h1>

            <h2>{t("1. Select a Term:")}</h2>

            <div className="term-grid">
              {["2026 Spring Semester", "2026 Summer Semester", "2026 Fall Semester"].map((term) => (
                <button
                  key={term}
                  className={`term-card ${selectedTerm === term ? "selected" : ""}`}
                  onClick={() => setSelectedTerm(term)}
                >
                  <span className="circle-icon">📅</span>
                  <strong>{t(term)}</strong>
                  <span className="check">{selectedTerm === term ? "✓" : "○"}</span>
                </button>
              ))}
            </div>

            <h2>{t("2. After you Select a Term, You Can:")}</h2>

            <div className="action-row">
              <ActionCard title={t("View My Classes")} icon="📘" onClick={() => goTo("classes")} />
              <ActionCard title={t("Register/Drop/Add")} icon="✚" onClick={() => goTo("register")} />
              <ActionCard title={t("Stellic")} icon="🚦" onClick={() => goTo("stelli")} />
              <ActionCard title={t("Enrollment Verification")} icon="✔" onClick={() => goTo("verification")} />
              <ActionCard title={t("Browse Course Catalog")} icon="🔎" onClick={() => goTo("catalog")} />
            </div>
          </section>
        )}

        {page === "degrees" && (
          <section>
            <h1>{t("Degrees and Advisement")}</h1>

            <div className="grid-two">
              <InfoCard title={t("My Program")} icon="🎓">
                <p>🏫 {t("University of Delaware")}</p>
                <p>🎓 {t("Computer Science BS")}</p>
                <p>🛡 {t("Cybersecurity")}</p>
                <p>🗓 {t("Spring 2027")}</p>
              </InfoCard>

              <InfoCard title={t("Advisor")} icon="👩">
                <p>Samantha Fowle</p>
                <p>{t("Computer Science")}</p>
                <p className="link">samfowle@udel.edu</p>
                <button onClick={() => fakeClick("Email Advisor")}>{t("Email")}</button>
                <button onClick={() => fakeClick("Schedule Meeting")}>{t("Schedule Meeting")}</button>
              </InfoCard>

              <InfoCard title={t("Transfer Credits")} icon="📄">
                <p>{t("No transfer credits yet")}</p>
                <button onClick={() => fakeClick("Transfer Credit Report")}>{t("View Full Report")}</button>
              </InfoCard>

              <InfoCard title={t("Academic Catalog")} icon="📄">
                <p>{t("Browse the full academic catalog.")}</p>
                <button onClick={() => goTo("catalog")}>{t("Browse Catalog")}</button>
              </InfoCard>
            </div>
          </section>
        )}

        {page === "financials" && (
          <section>
            <h1>{t("Student Financials")}</h1>

            <div className="grid-two">
              <InfoCard title={t("My Finances")} icon="🐶">
                <button onClick={() => goTo("balance")}>{t("Balance")}</button>
                <button onClick={() => fakeClick("Pending Aid")}>{t("Pending Aid")}</button>
                <button onClick={() => goTo("payments")}>{t("Payments")}</button>
                <button onClick={() => fakeClick("Important Dates")}>{t("Important Dates")}</button>
              </InfoCard>

              <InfoCard title={t("My Awards")} icon="🏆">
                <button onClick={() => goTo("awards")}>{t("Awards")}</button>
                <button onClick={() => fakeClick("Financial Aid")}>{t("Financial Aid")}</button>
                <button onClick={() => goTo("loans")}>{t("Loans")}</button>
                <button onClick={() => fakeClick("Accept/Decline")}>{t("Accept/Decline")}</button>
              </InfoCard>
            </div>

            <button className="wide-dropdown" onClick={() => fakeClick("Other Financial Information")}>
              {t("Other Important Financial Information")} ▼
            </button>
          </section>
        )}

        {page === "grades" && (
          <section>
            <h1>{t("Grades and Transcripts")}</h1>

            <div className="grid-two">
              <InfoCard title={t("Academic Overview")} icon="📊">
                <div className="stats">
                  <p><strong>3.45</strong><br />{t("Cumulative GPA")}</p>
                  <p><strong>72</strong><br />{t("Courses Completed")}</p>
                  <p><strong className="good">{t("Good")}</strong><br />{t("Academic Standing")}</p>
                </div>
              </InfoCard>

              <InfoCard title={t("Quick Actions")} icon="⚡">
                <button onClick={() => goTo("transcript")}>{t("View Unofficial Transcript")}</button>
                <button onClick={() => fakeClick("Request Official Transcript")}>{t("Request Official Transcript")}</button>
                <button onClick={() => goTo("verification")}>{t("Enrollment Verification")}</button>
              </InfoCard>
            </div>

            <div className="table-card">
              <div className="tabs">
                <button>⌂ {t("Overview")}</button>
                <button className="active">▥ {t("Grades")}</button>
                <button>▧ {t("Transcript")}</button>
                <button>⚒ {t("Tools")}</button>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>{t("Course")}</th>
                    <th>{t("Course Title")}</th>
                    <th>{t("Credits")}</th>
                    <th>{t("Grade")}</th>
                  </tr>
                </thead>

                <tbody>
                  <tr><td>CISC 220</td><td>{t("Data Structures")}</td><td>3</td><td>A</td></tr>
                  <tr><td>MATH 241</td><td>{t("Calculus III")}</td><td>3</td><td>A-</td></tr>
                  <tr><td>CYBR 300</td><td>{t("Intro to Cybersecurity")}</td><td>4</td><td>B</td></tr>
                  <tr><td>AGRI 100</td><td>{t("Intro to Agriculture")}</td><td>2</td><td>A</td></tr>
                </tbody>
              </table>

              <div className="semester-summary">
                <strong>{t("Semester GPA")}: 3.60</strong>
                <strong>{t("Semester Credits")}: 15</strong>
              </div>
            </div>
          </section>
        )}

        {!["home", "courses", "degrees", "financials", "grades"].includes(page) && (
          <section>
            <h1>{getPageTitle(page)}</h1>

            <div className="placeholder">
              <h2>{getPageTitle(page)}</h2>
              <p>{t("This page is functional, but uses placeholder information.")}</p>
              <button onClick={() => fakeClick(page)}>{t("Continue")}</button>
              <button onClick={() => goTo("home")}>{t("Back Home")}</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function BigNav({ title, icon, onClick }: { title: string; icon: string; onClick: () => void }) {
  return (
    <button className="big-nav" onClick={onClick}>
      <span>{icon}</span>
      {title}
      <strong>▼</strong>
    </button>
  );
}

function ActionCard({ title, icon, onClick }: { title: string; icon: string; onClick: () => void }) {
  return (
    <button className="action-card" onClick={onClick}>
      <span>{icon}</span>
      <strong>{title}</strong>
      <b>&gt;</b>
    </button>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="info-card">
      <div className="info-header">
        <span>{icon}</span>
        <h2>{title}</h2>
      </div>

      <div>{children}</div>
    </div>
  );
}