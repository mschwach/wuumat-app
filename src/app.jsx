// Datei: src/App.jsx
import React, { useState } from 'react';
import MapView from './components/MapView';
import Footer from './Footer';

const categories = [
  { value: "Alle", label: "Alle Kategorien" },
  { value: "Eiscreme", label: "🍦 Eiscreme" },
  { value: "Eier", label: "🥚 Eier" },
  { value: "Obst & Gemüse", label: "🍅 Obst & Gemüse" },
  { value: "Teig- & Backwaren", label: "🥖 Teig- & Backwaren" },
  { value: "Milchprodukte", label: "🥛 Milchprodukte" },
  { value: "Metzgereiprodukte", label: "🥩 Metzgereiprodukte" },
  { value: "Fahrradschläuche", label: "🚴 Fahrradschläuche" }
];

export default function App() {
  const [category, setCategory] = useState("Alle");

  return (
    <div
      id="main-scroll-container"
      style={{
        width: '100%',
        minHeight: '100vh',
        overflowY: 'auto'
      }}
    >
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
          {/* Anpassung für Barrierefreiheit: Text für Screenreader unsichtbar */}
          <label>
            <span style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}>
              Kategorie auswählen
            </span>
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
          </label>
        </div>
      </header>

      <main style={{ width: '100%', height: '600px', marginBottom: '2rem' }}>
        <MapView category={category} />
      </main>

      <Footer />
    </div>
  );
}