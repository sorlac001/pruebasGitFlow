<script context="module">
    import { env } from "../Enviroment.svelte";
    export async function clientOrderInfo(payload) {
        var ORDER_INFO = env.api[env.stage].url+'/orderInfo?processId={processId}';
        var APIKEY = env.api[env.stage].key;
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "LvBAPM3WDAO8d9hMBDFWvDsiRk28tvas");
        
        let endpoint = ORDER_INFO
              		.replace("{processId}",payload.processId)
              		;
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
                    throw new Error("Error al consumir el servicio clientOrderInfo");
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
