export default function request(url, method = 'GET', body){

    if(method == 'GET') {
        return fetch(url)
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    
}