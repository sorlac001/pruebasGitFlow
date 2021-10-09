<script context="module">
    import { env } from "../Enviroment.svelte";
    export async function clientEnvioCodigo(payload) {
        var ENVIO_CODIGO = env.api[env.stage].url+'/envioCodigo';
        var APIKEY = env.api[env.stage].key;
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "LvBAPM3WDAO8d9hMBDFWvDsiRk28tvas");

        let endpoint = ENVIO_CODIGO;
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
                throw new Error('Error al consumir el servicio envioCodigo');
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
