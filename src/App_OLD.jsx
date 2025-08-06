// Datei: src/App.jsx
import React, { useState } from 'react';
import MapView from './components/MapView';
import Footer from './Footer'; // Sicherstellen, dass Footer importiert ist

const categories = [
  { value: "Alle", label: "Alle Kategorien" },
  { value: "Eiscreme", label: "🍦 Eiscreme" },
  { value: "Eier", label: "🥚 Eier" },
  { value: "Obst & Gemüse", label: "🍅 Obst & Gemüse" },
  { value: "Teig- & Backwaren", label: "🥖 Teig- & Backwaren" },
  { value: "Milchprodukte", label: "🥛 Milchprodukte" },
  { value: "Metzgereiprodukte", label: "🥩 Metzgereiprodukte" },
  { value: "Fahrradschläuche", label: "🚲 Fahrradschläuche" }
];

export default function App() {
  const [category, setCategory] = useState("Alle");

  // WICHTIG: Das React Fragment <>...</> umschließt jetzt ZWEI Top-Level-Elemente:
  // 1. Das div mit der Klasse "app-container"
  // 2. Den Footer-Component
  // Dadurch ist der Footer nicht mehr in "app-container" verschachtelt!
  return (
    <> {/* Dies ist das öffnende React Fragment */}
      <div className="app-container">
        <header style={{
          padding: '1rem',
          backgroundColor: '#E3FCDF',
          fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <img
              src="/wuumat.png"
              alt="wuumat Logo"
              style={{ height: '120px' }}
            />
            <div style={{
              textAlign: 'center',
              maxWidth: '90vw',
              padding: '0 1rem',
              wordBreak: 'break-word'
            }}>
              <h1 style={{ margin: '0 0 0.25rem' }}>
                Lebensmittelautomaten und SB-Hofläden in deiner Nähe
              </h1>
              <p style={{ margin: 0 }}>
                Wähle eine Kategorie und finde Standorte in deiner Umgebung
              </p>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                background: '#fff',
                color: '#000',
                fontSize: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                maxWidth: '90vw',
                cursor: 'pointer',
                backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=%23000 height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1rem',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </header>

        <MapView category={category} />

      </div> {/* <-- ENDE DES app-container-Divs */}
      <Footer /> {/* <-- DER FOOTER IST JETZT HIER, AUẞERHALB VON app-container und direkt im React Fragment */}
    </> {/* <-- ENDE DES REACT FRAGMENTS */}
  );
}