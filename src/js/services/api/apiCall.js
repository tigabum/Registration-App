let timeoutDuration = 5000;

export default function apiCall(route, body = {}, method = "GET"){

    const requist = new Promise((resolve, reject)=>{
        const headers = new Headers({
            'Content-Type':'application/json',
        })

        const requestDetails = {
            method,
            mode:'cors',
            headers
        }
        if(method !== 'GET') requestDetails.body = JSON.stringify(body);

        function handleErrors(response){
            if(response.ok){
                console.log("responseOk", response.statusCode);
                console.log("responseCode", response.statusMessage);
                return response.json();
            }else{
                throw Error(response.statusText);
            }
        }

        fetch(`${SERVER_URL}/${route}`, requestDetails)
        .then(handleErrors)
        .then(resolve)
        .then(reject);

    })

    const timeout = new Promise((request, reject)=>{
        setTimeout(reject, timeoutDuration, 'Request timed out!');
    })

    return new Promise((resolve, reject)=>{
        Promise.race([requist, timeout])
        .then(resolve)
        .catch(reject);
    })


}