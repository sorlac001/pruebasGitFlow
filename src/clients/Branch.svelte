<script context="module">
    import { env } from "../Enviroment.svelte"; 

    export async function fetchBranch(payload) {
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", env.api.key);
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `
            {
                storeSkuAvailability(sku: ${payload.sku}) {
                    branchOffices {
                    warehouse
                    address
                    city
                    }
                }
            }`,
            variables: {},
        });
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql,
            redirect: "follow",
        };
        const response = await fetch(
            env.api.url,
            requestOptions
        )

        .then(response => {
                  console.log(response);
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error('Error al consumir el servicio');
                  }
                })
                .then(result => {
                    console.log(result);
                    return (result);
                })
                .catch(error => {
                    console.error(error);
                    return (error);
                });
        return await response;
    };

</script>