<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { clientOrderInfo } from "../../clients/ClientOrderInfo.svelte";
    import { fetchPayment } from "../../clients/ClientPayment.svelte";
    import { fetchStatusPayment } from "../../clients/ClientStatusPayment.svelte";
    import { clientSubmitPaymentAndInstallInfo } from "../../clients/ClientSubmitPaymentAndInstallInfo.svelte";
    import Modal from "../../components/Addons/Modal.svelte";
    import ModalPreloader from "../../components/Addons/ModalPreloader.svelte";
    import { store } from "../../Store.svelte";

    onMount(() => {
        // enable functions for main.min.js
        document.onreadystatechange();
    });

    let modalPreloaderDisabled = false;
    $: messageInfoError = "Error al consumir el servicio";

    let fullname =
        $store.dataHolder.pName +
        " " +
        $store.dataHolder.sName +
        " " +
        $store.dataHolder.aPaternal +
        " " +
        $store.dataHolder.aMaternal;

    let mail = $store.dataHolder.mail;
    let celPhone = $store.dataHolder.celPhone;
    let totales = $store.cart.total;
    let total = ""+ $store.cart.total+"";
    let dateInstall = $store.installationDate.date;
    let mensaje =
        "El pago por el servicio contratado no se ha reflejado, intenta nuevamente en 5 segundos \n NOTA: No refresques la página";
    $: visible = false;
    $: visibleview = false;
    $: url = "";
    $: reference = "";
    let transactionId = $store.processId;
    let cuenta =  $store.order.siebelAccount;
    let rpt = $store.address.service.rpt;
    $: errorCode = "";
    let installationComments =  $store.installationDate.comments;
    $: termExemption = false;
    $: paymentType = "";
    let schedule = { 
		cvTimeslot: $store.installationDate.schedule,
		requestedShipDate: $store.installationDate.date,
	};  

    let viewpayment= () => {    
        visibleview = true;
       
    };

    let onChangePayment = () => {
        fetchPayment({
            cuenta: cuenta,
            rpt: rpt,
            monto: total,
        }).then((response) => {
            console.log(response);
            if (response.response.html != null) {
                url = response.response.html;
                reference = response.response.reference;
                visible = true;
            }
        });
    };
    let statusPayment = () => {
        fetchStatusPayment({
            cuenta: cuenta,
            referencia: reference,
        }).then((response) => {
            console.log(response);
            errorCode = response.izziErrorCode;
        });
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));
    async function checkOderInfo(){
        
        let next = true;
        while(next){
            
            await delay(10000);
            await clientOrderInfo({
                processId:$store.processId
            }).then(response=>{
                if( response.izziPurchaseFinished ){
                    next = false;                    
                    navigate("/confirm", { replace: false });
                }
                else if(response.statusCode == 0){
                    messageInfoError = response.status;
                    MicroModal.close('modalPreloader');
                    MicroModal.show("modalError");
                }
            }).catch(error=>{
                next = false;
            });
        }
    }


    let submitPayment  = () => {
        clientSubmitPaymentAndInstallInfo({
                processId: transactionId,
                schedule: schedule,
                paymentType: paymentType,
                installationComments: installationComments,
                termExemption:termExemption
            }).then((response) => {
                console.log(response);
                if(response.ok){
                    MicroModal.show('modalPreloader'); 
                    checkOderInfo();                   
                }else{
                    MicroModal.show("modalErroSubmit");
                }
            });
    };

    let onChangeStatusPaymentOnline = () => {
        if (errorCode != "000") {
            statusPayment();
            MicroModal.show("modalPayment");
        }
        if (errorCode == "000" && termExemption == false) {
            paymentType = "ONLINE";
            submitPayment();
        }
        if (errorCode == "000" && termExemption == true) {
            paymentType = "ONLINE_SAVED";
            submitPayment();
        }
    };
    let onChangeStatusPaymentVendor = () => {
            paymentType = "VENDOR";
            submitPayment();
    };
    let onChangeStatusPaymentVendorChanels= () => {    
            paymentType = "IZZI_CHANNELS";
            submitPayment();
       
    };

</script>

<div class="pure-g justify-content-center">
    <div class="pure-u-1 pure-u-md-3-4 pure-u-lg-3-5">
        <h2 class="text-fs-23 text-center m-b-25">
            Verifica la información de la compra y solicita el pago.
        </h2>
        <div class="accordion-holder m-b-40">
            <div class="accordion">
                <a href="#/" class="accordion-title"
                    ><span>Datos Personales</span>
                    <svg class="icon" aria-hidden="true"
                        ><use
                            xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"
                        /></svg
                    ></a
                >
                <div class="accordion-content">
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-3">
                            <p class="fw-semibold m-b-0">Nombre</p>
                            <p>{fullname}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-5-12">
                            <p class="fw-semibold m-b-0">Correo electrónico</p>
                            <p>{mail}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <p class="fw-semibold m-b-0">Teléfono</p>
                            <p class="m-b-0">{celPhone}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-panel m-b-40">
                <div class="panel panel--lightgray panel--slim m-b-15">
                    <div class="d-flex align-items-center">
                        <svg class="icon" aria-hidden="true"
                            ><use
                                xlink:href="/assets/img/icons/symbol-defs.svg#icon-calendar"
                            /></svg
                        >
                        <div class="m-l-15">
                            <p class="fw-semibold m-b-0">
                                Fecha de instalación
                            </p>
                            <p class="m-b-0">{dateInstall}</p>
                        </div>
                    </div>
                </div>
                <div class="pure-g">
                    <div class="pure-u-1 pure-u-md-2-3">
                        <div class="text-fs-23 fw-semibold primary-text">
                            Pago para contratar
                        </div>
                        <p class="fw-semibold m-b-0 sm-m-b-15">
                            Incluyes el primer mes
                        </p>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-3 md-text-right">
                        <div class="text-fs-23 fw-semibold primary-text">
                            $ {total}<span />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="payment-tabs" on:click={viewpayment}>
            <div class="payment-tab-controls__holder">
                <div class="payment-tab-controls">
                    <a on:click={onChangePayment}
                        href="#tab_tarjeta" value = "tarjeta"
                        class="payment-tab-control payment-tab-control--active"
                        ><span class="hide-for-mobile">Pago en tarjeta</span
                        ><span class="show-for-mobile">Tarjeta</span></a
                     >
                    <a href="#tab_efectivo" value = "efectivo" class="payment-tab-control"
                        ><span class="hide-for-mobile">Pago en efectivo</span
                        ><span class="show-for-mobile">Efectivo</span></a
                    >
                    <a href="#tab_sucursal"  value = "sucursal" class="payment-tab-control"
                        ><span class="hide-for-mobile">Pago en sucursal</span
                        ><span class="show-for-mobile">Sucursal</span></a
                    >
                </div>
            </div>
            {#if visibleview}
            <div class="payment-tab__content-holder">
                <div
                    id="tab_tarjeta"
                    class="payment-tab-content payment-tab-content--active"
                >
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-7-12">
                            <p>Tu compra estará protegida en todo momento.</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-5-12 md-text-right">
                            <p
                                class="fw-semibold d-flex align-items-center justify-content-end sm-justify-content-start"
                            >
                                <span>Servidor seguro</span>
                                <svg class="icon m-l-10" aria-hidden="true"
                                    ><use
                                        xlink:href="/assets/img/icons/symbol-defs.svg#icon-lock"
                                    /></svg
                                >
                            </p>
                        </div>
                    </div>
                    <div class="panel m-b-15">
                        {#if visible}
                            <div>
                                <div class="iframe-holder m-b-25">
                                    <iframe
                                        id="iframePayment"
                                        title="Payment"
                                        style="height: 610px; overflow:scroll; width: 510px; border: 0px;"
                                        scrolling="no"
                                        src={url}
                                    />
                                </div>
                            </div>
                        {/if}

                        <p class="fw-semibold primary-text text-center">
                            Para obtener más megas activa el pago recurrente
                        </p>
                        <div class="pure-g">
                            <div class="pure-u-3-4">
                                <p class="m-b-15">¡Activar pago recurrente!</p>
                            </div>
                            <div class="pure-u-1-4 text-right">
                                <span class="checkbox-switch">
                                    <input
                                        type="checkbox" bind:checked={termExemption}
                                        name="pago_recurrente"
                                        id="pago_recurrente"
                                         />
                                    <label for="pago_recurrente" />
                                </span>
                            </div>
                        </div>
                        <hr class="m-b-40" />
                        <p class="m-b-0">
                            Acepto el cargo recurrente en mi pago y las
                            condiciones de uso del servicio
                        </p>
                    </div>
                    <div class="text-center">
                        <p class="text-fs-13">
                            Si tu pago no pudo ser procesado, <a
                                href="#/"
                                class="base-text underline"
                                >inténtalo otra vez</a
                            >
                        </p>
                        <button
                            type="button"
                            on:click={() => onChangeStatusPaymentOnline()}
                            class="pure__button pure__button--primary"
                            >Terminar contratación</button
                        >
                    </div>
                </div>
                <div id="tab_efectivo" class="payment-tab-content">
                    <div class="panel text-center m-b-40">
                        <p class="m-b-60">
                            Tu compra estará protegida en todo momento.
                        </p>
                        <button
                            type="button"
                            on:click={() => onChangeStatusPaymentVendor()}
                            class="pure__button pure__button--primary"
                            >Terminar contratación</button
                        >
                    </div>
                </div>
                <div id="tab_sucursal" class="payment-tab-content">
                    <div class="panel text-center m-b-40">
                        <p class="m-b-25">
                            Utiliza la línea de captura para realizar el pago en
                            efectivo en cualquiera sucursal izzi
                        </p>
                        <div
                            class="h2 text-fs-26 fw-semibold primary-text m-b-25"
                        >
                            No. Cuenta {cuenta}
                        </div>
                        <p class="m-b-20">
                            Presenta esté código, tienes 2 días para realizar el
                            pago. Una vez realizado tu pago te llamaremos para
                            confirmar tu visita
                        </p>
                        <button
                            type="button"
                            on:click={() => onChangeStatusPaymentVendorChanels()}
                            class="pure__button pure__button--primary"
                            >Terminar contratación</button
                        >
                    </div>
                </div>
            </div>
            {/if}
        </div>
    </div>
</div>
<Modal ident="modalPayment" title="Aviso" message="{mensaje};" />
<Modal ident="modalErroSubmit" title="Aviso" message="Servicio no disponible por favor reintente" />
<ModalPreloader bind:disabled={modalPreloaderDisabled} ident="modalPreloader" title="Tu solicitud está siendo procesada, por favor no cierres la ventana" message=""/>
<Modal ident="modalError" title="Error" message={messageInfoError}/>