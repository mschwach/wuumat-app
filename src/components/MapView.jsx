// Datei: src/components/MapView.jsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerPopup from "./MarkerPopup";
import Papa from "papaparse";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const categoryIcons = {
  "Eiscreme": "/icons/Eiscreme.png",
  "Eier": "/icons/Eier.png",
  "Obst & Gemüse": "/icons/Obst_&_Gemuese.png",
  "Teig- & Backwaren": "/icons/Teig-_&_Backwaren.png",
  "Milchprodukte": "/icons/Milchprodukte.png",
  "Metzgereiprodukte": "/icons/Metzgereiprodukte.png",
  "Fahrradschläuche": "/icons/Fahrradschlaeuche.png",
};

const subsectionToCategory = {
  "57528517": "Metzgereiprodukte",
  "57529089": "Milchprodukte",
  "57529327": "Eiscreme",
  "57529320": "Teig- & Backwaren",
  "57529322": "Eier",
  "57529215": "Obst & Gemüse",
  "62377821": "Fahrradschläuche",
};

const getIcon = (src) => new L.Icon({
  iconUrl: src,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const userMarkerIcon = new L.Icon({
  iconUrl: "/icons/Stecknadel.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13);
    }
  }, [position, map]);
  return null;
};

const MapView = ({ category = "Alle" }) => {
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [showLocationButton, setShowLocationButton] = useState(true);

  // Funktion zum Abrufen des Standorts
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setShowLocationButton(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setShowLocationButton(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setShowLocationButton(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Korrekter Aufruf der Netlify Function
        const response = await fetch(
          "/.netlify/functions/get-locations"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        
        console.log("Daten von Netlify Function:", json);

        const parsed = json.data.map((entry, index) => {
          const latStr = typeof entry.latitude === 'string' ? entry.latitude.replace(',', '.') : entry.latitude;
          const lonStr = typeof entry.longitude === 'string' ? entry.longitude.replace(',', '.') : entry.longitude;
          const lat = parseFloat(latStr);
          const lon = parseFloat(lonStr);
          
          if (isNaN(lat) || isNaN(lon)) {
            console.error("Fehler beim Parsen der Koordinaten für Eintrag:", entry);
            console.error("Ursprüngliche Werte:", entry.latitude, entry.longitude);
            console.error("Konvertierte Werte:", latStr, lonStr);
          }

          return {
            id: index,
            title: entry.title,
            latitude: lat,
            longitude: lon,
            address: entry.address,
            subsection: String(entry.subsectionId).split(".")[0],
          };
        });
        
        const validEntries = parsed.filter(e => !isNaN(e.latitude) && !isNaN(e.longitude));
        console.log("Geparste und gefilterte Einträge:", validEntries);
        
        setData(validEntries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%", position: 'relative' }}>
      {showLocationButton && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <p style={{ marginBottom: '1rem' }}>
            Finde Automaten und SB-Hofläden in deiner Umgebung!
          </p>
          <button
            onClick={getUserLocation}
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              backgroundColor: '#E3FCDF',
              border: '1px solid #000',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Meine Position anzeigen
          </button>
        </div>
      )}
      <MapContainer
        center={userLocation || [51.1657, 10.4515]}
        zoom={userLocation ? 13 : 7}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        touchZoom={false}
        doubleClickZoom={false}
        dragging={true}
      >
        <MapUpdater position={userLocation} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userLocation && (
          <Marker position={userLocation} icon={userMarkerIcon}>
            <Popup>Dein aktueller Standort</Popup>
          </Marker>
        )}
        {data
          .filter((entry) => {
            const categoryName = subsectionToCategory[String(entry.subsection)];
            return categoryName && (category === "Alle" || categoryName === category);
          })
          .map((entry) => {
            const categoryName = subsectionToCategory[String(entry.subsection)];
            if (!categoryName) return null;
            return (
              <Marker
                key={entry.id}
                position={[entry.latitude, entry.longitude]}
                icon={getIcon(categoryIcons[categoryName])}
              >
                <Popup>
                  <MarkerPopup entry={entry} />
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default MapView;
