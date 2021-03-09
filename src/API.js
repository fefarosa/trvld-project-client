export async function createPost(entry) {
    const response = await fetch(`http://localhost:4000/`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(entry)
    })
    return response.json();
}