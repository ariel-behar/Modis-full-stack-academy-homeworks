export default function request(url, method = 'GET', body){

    if(method == 'GET') {
        return fetch(url)
    }

    if(['POST', 'PUT', 'PATCH'].includes(method)) {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
    }   

    if(method == 'DELETE') {
        return fetch(url, {
            method: 'DELETE',
        })
    }
}