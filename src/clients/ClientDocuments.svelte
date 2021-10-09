<script context="module">
    import { env } from "../Enviroment.svelte";

    export async function fetchAttachFile(account, file) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "LvBAPM3WDAO8d9hMBDFWvDsiRk28tvas");

        var DOCUMENTS = env.api[env.stage].url + "/attachFiles"
        var raw = JSON.stringify({
        "accountNumber": account.siebelAccount,
        "accountId": account.accountId,
        "file": {
            "fileName": file.name,
            "fileExtension": file.type,
            "data": file.data
        }
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        const response = await fetch(DOCUMENTS, requestOptions)

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