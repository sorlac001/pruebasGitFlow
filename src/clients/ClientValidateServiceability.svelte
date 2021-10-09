<script context="module">
    import { env } from "../Enviroment.svelte";
    export async function clientValidateServiceability(payload) {
        var VALIDATE_SERVICEABILITY = 'https://prod.izziapiweb.mx/test/izzi/ms/purchaseServices/serviceability/validate';
        var APIKEY = env.api[env.stage].key;

        let endpoint = VALIDATE_SERVICEABILITY;
        let headers = new Headers();
        //headers.append("x-api-key", APIKEY);
        headers.append("Content-Type","application/json");
        // headers.append("Authorization", session.getBearerToken());
        // headers.append("X-Trace-Id", session.getTraceId());             

        let requestOptions = {
            method: 'POST',
            headers: headers,
            redirect: 'follow',
            body: JSON.stringify(payload)
        };
        const resp = fetch(endpoint, requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) {
                return response.json();
                } else {
                throw new Error('Error al consumir el servicio validateServiceability');
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
