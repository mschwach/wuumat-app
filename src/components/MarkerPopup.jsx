const MarkerPopup = ({ entry }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${entry.latitude},${entry.longitude}`;

  return (
    <div>
      <h3>{entry.title}</h3>
      <p>{entry.address}</p>
      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Navigation starten</a>
    
    </div>
  );
};

export default MarkerPopup;
