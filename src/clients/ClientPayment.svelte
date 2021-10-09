<script context="module">
    import { env } from "../Enviroment.svelte";
    
      export async function fetchPayment(payload) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "LvBAPM3WDAO8d9hMBDFWvDsiRk28tvas");
        var PAYMENTURL = env.api[env.stage].url + "/payment";
    
        var raw = JSON.stringify({
          "plataforma": "PLATFORM_IZZI_OC",
          "canal": "CHANNEL_IZZI_OC",
          "cuenta": payload.cuenta,
          "rpt": payload.rpt,
          "monto": payload.monto
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        const resp = fetch(PAYMENTURL, requestOptions)
        .then(response => {
                      if (response.ok) {
                        return response.json();
                      } else {
                        throw new Error('Error al consumir el servicio');
                      }
                    })
                    .then(result => {
                        return result;
                    })
                    .catch(error => {
                        console.error(error);
                        return (error);
                    });
            return await resp; 
      }
    </script>