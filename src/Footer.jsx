// Datei: src/Footer.jsx
import { useState, useEffect } from "react";
import SuggestionForm from './components/SuggestionForm'; // <-- Korrekter Importpfad
import './Footer.css';

const Footer = () => {
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  // Funktion zum Scrollen nach oben
  const handleScrollToTop = () => {
    const mainContainer = document.getElementById('main-scroll-container');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Effekt zum Überwachen des Scroll-Verhaltens
  useEffect(() => {
    const toggleVisibility = () => {
      const mainContainer = document.getElementById('main-scroll-container');
      if (mainContainer) {
        if (mainContainer.scrollTop > 300) {
          setShowScrollTopButton(true);
        } else {
          setShowScrollTopButton(false);
        }
      }
    };

    const mainContainer = document.getElementById('main-scroll-container');
    if (mainContainer) {
      mainContainer.addEventListener('scroll', toggleVisibility);
    }
    
    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener('scroll', toggleVisibility);
      }
    };
  }, []);

  // Handler zum Öffnen des Impressum-Popups
  const handleImpressumClick = () => {
    setIsMenuOpen(false);
    setIsImpressumOpen(true);
  };

  // Handler zum Öffnen des Formular-Popups
  const handleFormClick = () => {
    setIsMenuOpen(false);
    setIsFormOpen(true);
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 9999,
        fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif'
      }}>
        {/* Aufklappbares Menü mit den Optionen */}
        {isMenuOpen && (
          <div className="footer-menu">
            <div className="footer-menu-item" onClick={handleFormClick}>
              Neuen oder inaktiven Standort melden
            </div>
            <div className="footer-menu-item" onClick={handleImpressumClick}>
              Impressum & Datenschutz
            </div>
          </div>
        )}
        {/* Der kreisförmige Menü-Button */}
        <button className="footer-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="menu-icon"></span>
        </button>
      </div>

      {/* Pfeil-Button zum Scrollen nach oben - Unten links */}
      {showScrollTopButton && (
        <button className="scroll-to-top-button" onClick={handleScrollToTop} title="Nach oben scrollen">
          &uarr;
        </button>
      )}

      {/* Popup für das Impressum */}
      {isImpressumOpen && (
        <div
          className="lightbox-overlay"
          onClick={(e) => {
            if (e.target.classList.contains('lightbox-overlay')) {
              setIsImpressumOpen(false);
            }
          }}
        >
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={() => setIsImpressumOpen(false)}>
              &times;
            </button>
            <div className="text-content">
              <h2>Impressum</h2>
              <p>
                FTI Schwach UG (haftungsbeschränkt)<br />
                Geschäftsführung: Matthias Schwach<br />
                Lippstädter Str. 180<br />
                33449 Langenberg<br />
                Amtsgericht Gütersloh: HRB 9845<br />
                USt-IdNr.: DE 242837392<br />
                E-Mail: <a href="mailto:kontakt@fti-schwach.de" style={{ color: '#007BFF', textDecoration: 'none' }}>kontakt@fti-schwach.de</a><br />
                Telefon: 0179 1076873
              </p>
              <h3>Datenschutzhinweise</h3>
              <p>
                <strong>1. Standortdaten:</strong><br />
                Die Standortfreigabe dient ausschließlich der lokalen Anzeige nahegelegener Automaten. Es werden keine Daten gespeichert oder übertragen.</p>
              <p><strong>2. Vorschlagsformular:</strong><br />
                Die eingegebenen Daten (inkl. E-Mail) werden über Netlify Forms DSGVO-konform verarbeitet und per E-Mail übermittelt – ohne dauerhafte Speicherung.</p>
              <p><strong>3. Favoriten:</strong><br />
                Deine Favoriten werden ausschließlich lokal auf deinem Gerät gespeichert (Local Storage), ohne Serververbindung.</p>
              <p><strong>Analyse & Tracking:</strong><br />
                Diese Seite verwendet keine Cookies, Google Fonts, Tracker oder Werbung.</p>
              <p><strong>Hinweis:</strong><br />
                Die Standortdaten stammen aus der Community und können Fehler enthalten. Melde uns Korrekturen und neue Standorte einfach über unser Formular! Wir übernehmen jedoch keine Gewähr für die Richtigkeit der Daten.</p>
              <p><strong>Rechte:</strong><br />
                Du hast das Recht auf Auskunft, Berichtigung und Löschung. Kontakt: <a href="mailto:kontakt@fti-schwach.de" style={{ color: '#007BFF', textDecoration: 'none' }}>kontakt@fti-schwach.de</a></p>
            </div>
          </div>
        </div>
      )}

      {/* Popup für das Melde-Formular */}
      {isFormOpen && (
        <div
          className="lightbox-overlay"
          onClick={(e) => {
            if (e.target.classList.contains('lightbox-overlay')) {
              setIsFormOpen(false);
            }
          }}
        >
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={() => setIsFormOpen(false)}>
              &times;
            </button>
            <SuggestionForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;