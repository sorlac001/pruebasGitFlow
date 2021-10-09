<script context="module">
    import { env } from "../Enviroment.svelte";
    export async function clientSubmitPaymentAndInstallInfo(payload) {
        var SUBMIT_PAYMENT_AND_INSTALL_INFO = env.api[env.stage].url+'/submitPaymentAndInstallInfo';
        var APIKEY = env.api[env.stage].key;
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "LvBAPM3WDAO8d9hMBDFWvDsiRk28tvas");

        let endpoint = SUBMIT_PAYMENT_AND_INSTALL_INFO;
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
                return response;
                } else {
                throw new Error('Error al consumir el servicio clientSubmitPaymentAndInstallInfo');
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
