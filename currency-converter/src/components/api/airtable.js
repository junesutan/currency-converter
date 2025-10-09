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

export async function getSavedPairsFromAirtable() {
  const res = await fetch(BASE_URL, { headers });
  const data = await res.json();
  return data.records.map((r) => r.fields);
}
