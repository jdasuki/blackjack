const baseUrl = 'http://localhost:8080/draw';

const getOptions = {
    method: `GET`,
    headers: {
        "Content-Type": "application/json"
    }};

async function getCards(drawCount) {
    const res = await fetch(`${baseUrl}/${drawCount}`, getOptions);

    if (res.status !== 200) {
        throw new NodeServerError(
          "Error with node server."
        );
    }
    const body = await res.json();
    return body;
}


class NodeServerError extends Error {
}

export default {
    getCards
}