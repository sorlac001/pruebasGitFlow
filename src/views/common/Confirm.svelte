<script>
    import { navigate } from "svelte-routing";
    import { store } from "../../Store.svelte";

    let nombre = $store.user.name;
    let token = $store.user.token;
    let idVendor = $store.user.idVendor;
    let count = $store.order.siebelAccount;
    let rpt = $store.address.service.rpt;
    let toMenu = () => {
        cleanStorage();
    };
    let cleanStorage = () => {
        $store = {
            verificationCode: "",
            processId: "",
            branch: {},
            order: {
                siebelAccount: "",
                orderNumber: "",
                accountId: "",
            },
            installationDate: {
                date: "",
                schedule: "",
                comments: "",
            },
            cart: {
                total: 0,
                izziMovil: {
                    plan: {},
                    imei: "",
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
                    extra: {},
                },
            },
            user: {
                name: "",
                entryChannel: "",
                token: "",
                idVendor: "",
            },
            flags: {
                izziType: "negocios",
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
                    rpt: "",
                    state: "",
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
            documents: {
                ine: {
                    front: {
                        name: "",
                        type: "",
                        data: "",
                    },
                    rear: {
                        name: "",
                        type: "",
                        data: "",
                    },
                },
                referenceRFC: {
                    name: "",
                    type: "",
                    data: "",
                },
                purchaseOrder: {
                    name: "",
                    type: "",
                    data: "",
                },
                proofAddress: {
                    name: "",
                    type: "",
                    data: "",
                },
            },
        };
        addVendor();
    };
    let addVendor = () => {
        $store.user.name = nombre;
        $store.user.token = token;
        $store.user.idVendor = idVendor;
        $store.address.service.rpt = rpt ;
        navigate("/dashboard", { replace: false });
    };
</script>

<div class="container">
    <div class="wrapper">
        <div class="navbar">
            <img src="/assets/img/content/izzitv-holidays.png" alt="" />
        </div>
        <div class="label">
            <div class="fw-semibold">Gracias por contratar izzi.</div>
            <div>Tu número de cuenta es</div>
            <div class="fw-semibold">{count}</div>
        </div>
        <div on:click={toMenu} class="pure__button pure__button--primary">
            Ir al inicio
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .wrapper {
        width: 100%;
        max-width: 600px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-top: -50px;
    }
    .navbar {
        display: flex;
        margin-bottom: 22px;
        margin-top: 40px;
    }
    .label {
        color: #d31772;
        text-align: center;
        padding-bottom: 20px;
    }
</style>
