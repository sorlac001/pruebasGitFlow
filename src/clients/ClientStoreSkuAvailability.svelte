<script context="module">
    import { env } from "../Enviroment.svelte";
    export async function clientStoreSkuAvailability() {
        var CLIENT_STORE_SKU_AVAILABILITY = env.api[env.stage].url+'/getStores';
        var APIKEY = env.api[env.stage].key;

        let endpoint = CLIENT_STORE_SKU_AVAILABILITY;
        let headers = new Headers();
        headers.append("x-api-key", APIKEY);
        headers.append("Content-Type","application/json");
        // headers.append("Authorization", session.getBearerToken());
        // headers.append("X-Trace-Id", session.getTraceId());             

        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow',                
        };
        const resp = fetch(endpoint, requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al consumir el servicio orderQuota');
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
