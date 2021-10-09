<script context="module">
    import { env } from "../Enviroment.svelte";
    export async function clientLoginIzziMovil(payload) {
        var POST_LOGIN = env.api2[env.stage].auth;
        var APIKEY = env.api2[env.stage].key;
        let headers = new Headers();
        headers.append("x-api-key", APIKEY);
        headers.append("Content-Type","application/json");

        let endpoint = POST_LOGIN;
        let requestOptions = {
            method: 'POST',
            headers: headers,
            redirect: 'follow',
            body: JSON.stringify(payload)
        };
        console.log(endpoint);
        const resp = fetch(endpoint, requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) {
                return response.json();
                } else {
                throw new Error('Error al consumir el servicio login de izzi móvil');
                }
            })
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(error => {
                console.error(error);
                return error;
            });
        return await resp;
    }
</script>
