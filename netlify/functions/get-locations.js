const {
  GOOGLE_SHEET_URL
} = process.env;

exports.handler = async function(event, context) {
  try {
    if (!GOOGLE_SHEET_URL) {
      return {
        statusCode: 500,
        body: 'Google Sheet URL is not configured.',
      };
    }

    const response = await fetch(GOOGLE_SHEET_URL);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching data from Google Sheet:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch data.',
      }),
    };
  }
};