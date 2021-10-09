  <script context="module">
    import { env } from "../Enviroment.svelte";

    export async function fetchAddress(address) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var ADDRESSES = env.api[env.stage].url+"/direcciones";

      var raw = JSON.stringify({
        "rpt": address.rpt,
        "cp": address.postalCode,
        "delegacion": address.municipality,
        "colonia": address.suburb,
        "calle": address.street,
        "numExterior": address.numOut

      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      
      const resp = fetch( ADDRESSES, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error al consumir el servicio");
          }
        })
        .then((result) => {
          return result;
        })
        .catch((error) => {
          console.error(error);
          return error;
        });
      return await resp;
    }
  </script>
