const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE;

const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
  AIRTABLE_NAME
)}`;

const headers = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  "Content-Type": "application/json",
};

//format the date
function formatDateToSingapore(dateInput) {
  const parsed = new Date(dateInput);
  return parsed.toLocaleString("en-SG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Singapore",
  });
}

export async function getSavedPairsFromAirtable() {
  const res = await fetch(BASE_URL, { headers });
  const data = await res.json();
  return data.records.map((r) => r.fields);
}

export async function savePairToAirtable(pair) {
  const formattedDate = formatDateToSingapore(new Date());
  try {
    const formattedDate = formatDateToSingapore(new Date());

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        records: [
          {
            fields: {
              from: pair.from,
              to: pair.to,
              rate: pair.rate,
              dateSaved: formattedDate, // readable format
            },
          },
        ],
      }),
    });
    const data = await res.json();
    console.log("response status:", res.status);
    console.log("response body:", data);
    console.log("Saved to Airtable:", data);
    return data;
  } catch (err) {
    console.error("Failed to save to Airtable:", err);
  }
}
