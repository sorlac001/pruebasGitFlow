<script context="module">
    import { env } from "../Enviroment.svelte";
    export async function getCities(payload) {
        var GET_CITIES = env.api[env.stage].url + "/cities";
        var APIKEY = env.api[env.stage].key;
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "LvBAPM3WDAO8d9hMBDFWvDsiRk28tvas");
        headers.append("x-access-origin", "IZZI");
        headers.append("x-access-channel", "Portal OC");
        
        let endpoint = GET_CITIES;
        let requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow",
        };
        console.log(endpoint);
        const resp = fetch(endpoint, requestOptions)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error al consumir el servicio getOffer");
                }
            })
            .then((result) => {
                console.log(result);
                return result;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
        return await resp;
    }
</script>
