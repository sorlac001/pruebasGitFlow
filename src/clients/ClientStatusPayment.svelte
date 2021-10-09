<script context="module">
  import { env } from "../Enviroment.svelte";
  
    export async function fetchStatusPayment(payload) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "LvBAPM3WDAO8d9hMBDFWvDsiRk28tvas");
  
      var STATUSPAYMENTURL = env.api[env.stage].url + "/statusPayment";
  
      var raw = JSON.stringify({
        "cuenta": payload.cuenta,
        "referencia": payload.referencia
      });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      const resp = fetch(STATUSPAYMENTURL, requestOptions)
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