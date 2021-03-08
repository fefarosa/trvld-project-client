const API_URL = 'http://localhost:4000';

export async function listLogEntries() {
    const response = await fetch(`${API_URL}/location`);
    return response.json();
}