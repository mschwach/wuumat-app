const { GOOGLE_SHEET_CSV_URL } = process.env;
const Papa = require('papaparse');

exports.handler = async function(event, context) {
  try {
    // Überprüfen, ob die Umgebungsvariable gesetzt ist
    if (!GOOGLE_SHEET_CSV_URL) {
      return {
        statusCode: 500,
        body: 'Google Sheet CSV URL is not configured.',
      };
    }

    // Daten von der Google-Tabelle als Text abrufen
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();

    // CSV-Daten mit PapaParse parsen
    const parsedData = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    }).data;

    // Parsed-Daten als JSON zurückgeben
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: parsedData }),
    };
  } catch (error) {
    console.error('Error in Netlify function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch or parse data.',
      }),
    };
  }
};
