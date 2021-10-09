<script context = "module">
    import { env } from "../Enviroment.svelte";

    export async function fetchDataUser(user, address, falg) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-origin", "{{header_origin}}");
        myHeaders.append("x-access-channel", "{{header_channel}}");
        myHeaders.append("Authorization", "{{token}}");
        myHeaders.append("Content-Type", "application/json");
        
        var COVERAGE = env.api[env.stage].url+"/cobertura";
        var raw = JSON.stringify({
            negocios: falg,
            celular: user.celPhone,
            correo: user.mail,
            direccion: {
                rpt: address.rpt,
                cp: address.postalCode,
                delegacion: address.municipality,
                colonia: address.suburb,
                calle: address.street,
                numExterior: address.numOut,
                numInterior: address.numInt,
            },
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        const resp = await fetch(
            COVERAGE,
            requestOptions
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error al consumir el servicio");
                }
            })
            .then((result) => {
                return result.response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
        return await resp;
    }
</script>
