<script context="module">
    import { env } from "../Enviroment.svelte";
    export async function fetchUsers(cred) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-origin", "IZZI");
        myHeaders.append("x-access-channel", "PORTALOC");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "usuario": cred.user,
        "contrasena": cred.pass
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        const resp = await fetch(
          env.api[env.stage].auth,
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
        return await resp; 
    }
  </script>
