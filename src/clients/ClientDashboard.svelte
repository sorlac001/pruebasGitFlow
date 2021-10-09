<script context="module">
    import { env } from "../Enviroment.svelte";

    export async function fetchImage(options) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-origin", "{{header_origin}}");
        myHeaders.append("x-access-channel", "{{header_channel}}");

        var CARROUSEL = env.api[env.stage].url+"/carrusel?rpt="+options.rpt;
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        const response = await fetch(
            CARROUSEL,
            requestOptions
        )

        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al consumir el servicio');
            }
        })
        .then(result => {
            return result.response;
        })
        .catch(error => {
            console.error(error);
            return (error);
        });
        return await response;
    };
</script>