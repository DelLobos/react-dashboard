import mockPatients from '../data/mockPatients';

export async function fetchPatients() {
  if (import.meta.env.VITE_USE_MOCK_API) {
    return mockPatients;
  }

  const credentials = btoa(`${import.meta.env.VITE_API_USERNAME}:${import.meta.env.VITE_API_PW}`);
  const response = await fetch(import.meta.env.VITE_API_URL, {
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) throw new Error("Failed to fetch patients");
  return response.json();
}