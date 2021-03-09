import PostForm from "./components/PostForm";

const API_URL = 'http://localhost:4000';

export async function listLogEntries() {
    const response = await fetch(`${API_URL}/`);
    return response.json();
}

export async function createPost(entry) {
    const response = await fetch(`${API_URL}/post/:id`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(entry)
    })
}