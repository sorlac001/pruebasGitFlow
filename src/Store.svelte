<script context="module">
    import { writable } from "svelte/store";
    export const config = writable({
        maxExtension: 3,
    });
    export const storeIzziMovil = writable({data:""})

    export const store = writable({
        verificationCode:"",
        processId:  "",
        branch:{},
        order:{
            siebelAccount:"",
            orderNumber:"",
            accountId:""        
        },
        installationDate:{
            date:"",
            schedule:"",
            comments: ""
        },
        cart: {
            total: 0,
            izziMovil: {
                plan: {},
                imei:"",
                portability:false
            },
            twoLines: {},
            bringLinePhone: {},
            exemptionForcedCharge: {},
            plan: {},
            channels: {
                premium: {},
                carta: {},
            },
            payment: {
                unique: {},
                extra:{}
            },
        },
        user: {
            name: "",
            entryChannel: "",
            token: "",
            idVendor: "",
        },
        flags: {
            izziType: "",
            invoice: false,
            americanAdditionalPhone: false,
            americanCelPhone: false,
            recurrentPayment: false,
        },
        address: {
            service: {
                postalCode: "",
                municipality: "",
                suburb: "",
                street: "",
                numOut: "",
                numInt: "",
                rpt: "",
                housing: "",
                betweenStreet1: "",
                betweenStreet2: "",
                reference: "",
            },
            invoice: {
                postalCode: "",
                municipality: "",
                suburb: "",
                street: "",
                numOut: "",
                numInt: "",
                state: "",
                rpt: "",
            },
        },
        dataHolder: {
            pName: "",
            sName: "",
            aPaternal: "",
            aMaternal: "",
            mail: "",
            celPhone: "",
            adittionalPhone: "",
            rfc: "",
            businessActivity: null, //giro
            businessName: null, //razón social
        },
        coverage: {
            service: {
                sipreId: "",
                hub: "",
                state: "",
                node: "",
                branch: "",
                coverage: true,
            },
            invoice: {
                sipreId: "",
                hub: "",
                state: "",
                node: "",
                branch: "",
                coverage: true,
                ftth: false,
            },
        },
        internetProfiler: {
            speed: "",
            ftth: false,
        },
        vendorInfo:{
            folio : "",
            date : "",
            comments : "",
            channel : "",
            idVendor : "",
            capturista : false, 
        },
    });
    store.subscribe((value) => {
        localStorage.setItem("store", JSON.stringify(value));
    });
</script>
