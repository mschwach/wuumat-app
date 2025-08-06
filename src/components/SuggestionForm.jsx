import React, { useState, useEffect } from "react";

const categories = [
  { value: "Eiscreme", label: "🍦 Eiscreme" },
  { value: "Eier", label: "🥚 Eier" },
  { value: "Obst & Gemüse", label: "🍅 Obst & Gemüse" },
  { value: "Teig- & Backwaren", label: "🥖 Teig- & Backwaren" },
  { value: "Milchprodukte", label: "🥛 Milchprodukte" },
  { value: "Metzgereiprodukte", label: "🥩 Metzgereiprodukte" },
  { value: "Fahrradschläuche", label: "🚴 Fahrradschläuche" },
];

const SuggestionForm = () => {
  const [formType, setFormType] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [isGeolocationActive, setIsGeolocationActive] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  
  // Neuer State zur Erkennung von Mobilgeräten
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryChange = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };
  
  // Funktion für die native Dropdown-Liste auf Mobilgeräten
  const handleNativeCategoryChange = (e) => {
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedCategories(value);
  };

  const useCurrentLocation = () => {
    setIsLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress(`Lat: ${latitude}, Lng: ${longitude}`);
          setIsGeolocationActive(true);
          setIsLocationLoading(false);
        },
        (error) => {
          alert("Standortabfrage fehlgeschlagen. Bitte geben Sie die Adresse manuell ein.");
          console.error("Geolocation Error:", error);
          setIsLocationLoading(false);
        }
      );
    } else {
      alert("Ihr Browser unterstützt keine Standortabfrage.");
      setIsLocationLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(() => (window.location.href = form.getAttribute("data-netlify-redirect")))
      .catch((error) => alert(error));
  };

  return (
    <form
      name="location-suggestion"
      method="POST"
      netlify
      data-netlify-honeypot="_gotcha"
      className="suggestion-form"
      data-netlify-redirect="/success"
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <input type="hidden" name="form-name" value="location-suggestion" />
      <div style={{ display: 'none' }}>
        <label>
          Don't fill this out if you're human: <input name="_gotcha" />
        </label>
      </div>
      
      {selectedCategories.map((cat, index) => (
        <input key={index} type="hidden" name="categories" value={cat} />
      ))}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontWeight: 'bold' }}>
          Melde eine Änderung:*
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ cursor: 'pointer' }}>
            <input
              type="radio"
              name="report-type"
              value="neuer-standort"
              checked={formType === "neuer-standort"}
              onChange={() => setFormType("neuer-standort")}
              required
            />
            <span style={{ marginLeft: '0.5rem' }}>Neuer Standort</span>
          </label>
          <label style={{ cursor: 'pointer' }}>
            <input
              type="radio"
              name="report-type"
              value="standort-nicht-mehr-aktiv"
              checked={formType === "standort-nicht-mehr-aktiv"}
              onChange={() => setFormType("standort-nicht-mehr-aktiv")}
              required
            />
            <span style={{ marginLeft: '0.5rem' }}>Standort nicht mehr aktiv</span>
          </label>
        </div>
      </div>
      
      {formType === "neuer-standort" && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="category-select-form">Kategorie auswählen (Mehrfachauswahl möglich):</label>
          {isMobile ? (
            // Native Dropdown-Liste für Mobilgeräte
            <select
              id="category-select-form"
              name="categories"
              multiple
              size="8"
              value={selectedCategories}
              onChange={handleNativeCategoryChange}
              required={formType === "neuer-standort"}
              style={{ padding: '0.5rem', marginTop: '0.5rem', height: 'auto', overflowY: 'visible' }}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          ) : (
            // Button-basierte Oberfläche für Desktop-Geräte
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.3rem', 
              marginTop: '0.5rem', 
              maxHeight: '150px', 
              overflowY: 'auto', 
              border: '1px solid #ccc', 
              borderRadius: '4px', 
              padding: '0.5rem' 
            }}>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleCategoryChange(cat.value)}
                  style={{
                    padding: '0.3rem 0.7rem', 
                    border: '1px solid #ccc',
                    borderRadius: '20px',
                    backgroundColor: selectedCategories.includes(cat.value) ? '#E3FCDF' : '#fff',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease-in-out',
                    fontWeight: selectedCategories.includes(cat.value) ? 'bold' : 'normal',
                    fontSize: '0.875rem'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div>
        <label htmlFor="address-input">Adresse / GPS-Daten:*</label>
        <input
          id="address-input"
          type="text"
          name="address"
          placeholder="Straße, PLZ, Ort oder GPS-Koordinaten"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          readOnly={isGeolocationActive}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
        <button
          type="button"
          onClick={useCurrentLocation}
          disabled={isLocationLoading}
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#E3FCDF',
            border: '1px solid #000',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          {isLocationLoading ? 'Lade Position...' : 'Aktuelle Position verwenden'}
        </button>
      </div>

      <div>
        <label htmlFor="email-input">E-Mail-Adresse:*</label>
        <input
          id="email-input"
          type="email"
          name="email"
          placeholder="Ihre E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </div>

      <div style={{ fontSize: '0.8rem', color: '#666' }}>
        <p style={{ margin: 0 }}>*Pflichtfelder</p>
        <p style={{ margin: '0.5rem 0' }}>
          **Datenschutzhinweis:** Die übermittelten Daten werden ausschließlich intern zur Überprüfung und Aktualisierung der Standortdaten genutzt und nicht an Dritte weitergegeben.
        </p>
      </div>

      <button
        type="submit"
        style={{
          padding: '1rem 2rem',
          fontSize: '1rem',
          backgroundColor: '#E3FCDF',
          border: '1px solid #000',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        Absenden
      </button>
    </form>
  );
};

export default SuggestionForm;