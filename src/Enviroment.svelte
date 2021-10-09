<script context="module">
    export const env = {
        stage: "prod",
        api: {
            url: "https://i6u3l5bzrbfldgkdy7yrbhj4hy.appsync-api.us-east-2.amazonaws.com/graphql",
            key: "da2-xiswyvcqqbadfm5ygtlkcnxqom",
            proxy:{
                url: "https://dev.izziapiweb.mx/izziuxp-web-oc/v1/api",
                auth: "https://dev.izziapiweb.mx/izziuxp-web-oc/v1/auth/loginOC"
            },
            prod:{
                url: "https://prod.izziapiweb.mx/izziuxp-web-oc/v1/api",
                auth: "https://prod.izziapiweb.mx/izziuxp-web-oc/v1/auth/loginOC"
            }
        },
        api2:{
            dev:{
                url: "https://dev.izziapiweb.mx/izzimovilapi/dev",
                auth: "https://dev.izziapiweb.mx/izzimovilapi/auth/dev/login",
                key : "ypgx9tIp6PbmZlnFJiA5vvUnW1WeAHaT"	
            },
            test:{
                url: "https://test.izziapiweb.mx/izzimovilapi/test",
                auth: "https://test.izziapiweb.mx/izzimovilapi/auth/test/login",
                key : "EV5JPlu9OdSt3rZt1gSYnBSbeRRUVi5O"			
            },
            prod:{
                url: "https://prod.izziapiweb.mx/izzimovil/api/v1",
                auth: "https://prod.izziapiweb.mx/izzimovil/api/v1/auth/login",
                key : "s2rSgtQLFty53nRivAntWYZhUnrP036y"
            }
        }
    };
</script>
