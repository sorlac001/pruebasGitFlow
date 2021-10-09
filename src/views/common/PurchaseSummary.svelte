<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { clientOrderInfo } from '../../clients/ClientOrderInfo.svelte';
    import { clientPurchaseCreate } from '../../clients/ClientPurchaseCreate.svelte';
    import Modal from '../../components/Addons/Modal.svelte';
    import ModalPreloader from '../../components/Addons/ModalPreloader.svelte';
    import { store } from '../../Store.svelte';

    let goback = () =>{
        if($store.user.entryChannel.toUpperCase() == "CAPTURISTA"){
            navigate("/vendor-info", { replace: false });
        }else{
            if($store.cart.izziMovil.imei != "")
                navigate("/delivery-type", { replace: false });
            else
                navigate("/verification-code", { replace: false });
        }
    };

    let disabled = false;
    let modalPreloaderDisabled = false;
    $: messageInfoError = "Error al consumir el servicio";
    let getExtras = ()=>{
        let extras = [];
        Object.entries($store.cart.channels.premium).forEach(item=>{
            extras.push({
                extId:item[1].extId,
                nuevaCantidad:1
            });
        });
        Object.entries($store.cart.channels.carta).forEach(item=>{
            extras.push({
                extId:item[1].extId,
                nuevaCantidad:1
            });
        });
        Object.entries($store.cart.payment.extra).forEach(item=>{
            extras.push({
                extId:item[1].extId,
                nuevaCantidad:item[1].quantity
            });
        });
        return extras;
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let updateDataInfoStore = (response)=>{
        // "accountNumber": "20074638",
        // "orderNumber": "1-11495312902",
        // "accountId": "1-5A3ZLI0",
        $store.order.siebelAccount = response.accountNumber;
        $store.order.orderNumber = response.orderNumber;
        $store.order.accountId = response.accountId;
    }


    let getDeliveryType = () =>{
        let list = [];
        try {
            list = Object.entries($store.branch);
        }
        catch(err){
            console.log(err);
        }
        if( list.length > 0 ){
            return "SUCURSAL";            
        }
        else
            return "DOMICILIO";
    }

    let getBranchId = () =>{
        let list = [];
        try {
            list = Object.entries($store.branch);
        }
        catch(err){
            console.log(err);
        }
        if( list.length > 0 ){
            return $store.branch.warehouse;            
        }
        else
            return null;
    }

    let getPortability = () =>{
        let porta = false;
        try {
            porta = $store.cart.izziMovil.portability;
        }
        catch(err){}
        return porta;
    }
    let getMobileOrder = () =>{
        if($store.cart.izziMovil.imei != "")
            return {
                "mobileProduct": {
                    "idVlocity": $store.cart.izziMovil.plan.idOrderVlocity,
                    "nombre": $store.cart.izziMovil.plan.name,
                    "offerId": $store.cart.izziMovil.plan.offerId,
                    "precioMensual": $store.cart.izziMovil.plan.price,
                    "promo": $store.cart.izziMovil.plan.promo,
                    "relatedOffer": $store.cart.izziMovil.plan.relatedOffer
                },

                "mobilePhone": {
                    "imei": $store.cart.izziMovil.imei                    
                },
                "tipoEntrega": getDeliveryType(),
                "sucursalId": getBranchId(),
                "portabilidad": getPortability()
            };
        else
            return null;
    }

    async function checkOderInfo(){
        
        let next = true;
        while(next){
            
            await delay(5000);
            await clientOrderInfo({
                processId:$store.processId
            }).then(response=>{
                if( response.waitingForAction && response.status == "PURCHASE_01WP"){
                    next = false;
                    updateDataInfoStore(response);
                    navigate("/install-date", { replace: false });
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

    if($store.address.service.reference == ""){
        $store.address.service.reference = $store.vendorInfo.comments;
    }

    let btnNext = ()=>{
        
        disabled = true;
        let promise = clientPurchaseCreate({
            "salesChannel": "OC",
            "requestedAddress": {
                "stringAddress": $store.address.service.street,
                "addressReference": $store.address.service.reference,
                "postalCode": $store.address.service.postalCode,
                "addressId": $store.coverage.service.sipreId,
                "betweenStreets1" : $store.address.service.betweenStreet1,
                "betweenStreets2" : $store.address.service.betweenStreet2,
                "housingUnit" : $store.address.service.housing,
                "billing" : $store.flags.invoice,//<----factuacion
                "billingPostalCode" : $store.address.invoice.postalCode,
                "billingCity" : "",//<----facturacion estado
                "billingSettlement" : "",//<----asentamiento
                "billingStreet" : $store.address.invoice.street,
                "billingExteriorNumber"  : $store.address.invoice.numOut,
                "billingInteriorNumber" : $store.address.invoice.numInt,
                "billingState" : $store.address.invoice.state
            },
            "personalDetails": {
                "numeroCelular": $store.dataHolder.celPhone,
                "numeroCelularAdicional": $store.dataHolder.adittionalPhone,
                "numeroCelularAmericano": $store.flags.americanCelPhone,
                "numeroCelularAdicionalAmericano": $store.flags.americanAdditionalPhone,
                "codigoVerificacionCel": $store.verificationCode,
                "password": "izzi.2021",
                "razonSocial": $store.dataHolder.businessName,
                "giroNegocio": $store.dataHolder.businessActivity,
                "apMaterno": $store.dataHolder.aMaternal,
                "correo": $store.dataHolder.mail,
                "nombre": $store.dataHolder.pName,
                "segundoNombre": $store.dataHolder.sName,
                "apPaterno": $store.dataHolder.aPaternal,
                "rfc": $store.dataHolder.rfc,
                "portability" : null
            },
            "vendorInfo": {
                "idVendedor": $store.user.idVendor,
                "capturista" : $store.vendorInfo.capturista,
                "folio" : $store.vendorInfo.folio,
                "fechaVenta" : $store.vendorInfo.date,
                "comentarioPromos" : $store.vendorInfo.comments,
                "referido" :  $store.vendorInfo.channel //OC
            },
            "requestedServices": {
                "product": $store.cart.plan.paqId,
                "extras": getExtras()
            },
            "mobileOrder": getMobileOrder()
        }).then(response=>{
            $store.processId = response; 
            MicroModal.show('modalPreloader'); 
            
            checkOderInfo();

        }).catch(error=>{
            console.log(error);
            MicroModal.show('modalError'); 
        });
    };
    
    
    onMount(() => {
        // enable functions for main.min.js
        document.onreadystatechange();        
    });
</script>
<!-- <br><br>
Plan
{JSON.stringify($store.cart.plan)}
<br><br>
Premium
{JSON.stringify($store.cart.channels.premium)}
<br><br>
Carta
{JSON.stringify($store.cart.channels.carta)}
<br><br>
2 lineas
{JSON.stringify($store.cart.twoLines)}
<br><br>
izzi movil
{JSON.stringify($store.cart.izziMovil.plan)}
<br><br>
Unico
{JSON.stringify($store.cart.payment.unique)}
<br><br>
Exencion
{JSON.stringify($store.cart.exemptionForcedCharge)} -->
<div class="pure-g justify-content-center">
    <div class="pure-u-1 pure-u-md-3-4 pure-u-lg-3-5">
        <div class="pure-g m-b-20">
            <div class="pure-u-1 pure-u-md-15-24 sm-m-b-20">
                <h3 class="text-fs-20">Verifica los datos del comprador</h3>
            </div>
        </div>
        <div class="accordion-holder">
            <!--<div class="accordion">
                <a href="#/" class="accordion-title"><span>Resumen de compra</span> <svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg></a>
                <div class="accordion-content">
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-3">
                            <p class="fw-semibold m-b-0">Nombre</p>
                            <p>Santiago Aguayo Agudelo</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-5-12">
                            <p class="fw-semibold m-b-0">Correo electrónico</p>
                            <p>santiago@hotmail.com</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <p class="fw-semibold m-b-0">Teléfono</p>
                            <p class="m-b-0">310 765 5896</p>  
                        </div>
                    </div>
                </div>
            </div>-->
            <div class="accordion accordion--active">
                <a href="#/" class="accordion-title"><span>Datos personales</span> <svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg></a>
                <div class="accordion-content">
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-3">
                            <p class="fw-semibold m-b-0">Nombre completo</p>
                            <p>{$store.dataHolder.pName} {$store.dataHolder.sName} {$store.dataHolder.aPaternal} {$store.dataHolder.aMaternal}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-5-12">
                            <p class="fw-semibold m-b-0">Correo</p>
                            <p>{$store.dataHolder.mail}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <p class="fw-semibold m-b-0">Teléfono(s)</p>
                            <p class="m-b-0">{$store.dataHolder.celPhone}</p>
                            <p class="m-b-0">{$store.dataHolder.adittionalPhone}</p>  
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <p class="fw-semibold m-b-0">RFC</p>
                            <p class="m-b-0">{$store.dataHolder.rfc}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion">
                <a href="#/" class="accordion-title"><span>Dirección de instalación {#if $store.address.invoice.postalCode == ""}y facturación{/if}</span> <svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg></a>
                <div class="accordion-content">
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-3">
                            <p class="fw-semibold m-b-0">Código postal</p>
                            <p >{$store.address.service.postalCode}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-9-24">
                            <p class="fw-semibold m-b-0">Dirección o municipio</p>
                            <p class="text-center">{$store.address.service.municipality}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-7-24">
                            <p class="fw-semibold m-b-0 ">Colonia</p>
                            <p >{$store.address.service.suburb}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <p class="fw-semibold m-b-0">Calle</p>
                            <p>{$store.address.service.street}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <p class="fw-semibold m-b-0">No. Ext.</p>
                            <p >{$store.address.service.numOut}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <p class="fw-semibold m-b-0">No. Int.</p>
                            <p >{$store.address.service.numInt}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <p class="fw-semibold m-b-0">Unidad habitacional</p>
                            <p >{$store.address.service.housing}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <p class="fw-semibold m-b-0">Entre calle 1</p>
                            <p >{$store.address.service.betweenStreet1}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <p class="fw-semibold m-b-0">Entre calle 2</p>
                            <p >{$store.address.service.betweenStreet2}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-2-2">
                            <p class="fw-semibold m-b-0">Referencia</p>
                            <p class="m-b-0">{$store.address.service.reference}</p>
                        </div>
                    </div>
                </div>
            </div>
            {#if $store.address.invoice.postalCode != ""}
            <div class="accordion">
                <a href="#/" class="accordion-title"><span>Dirección de facturación</span> <svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg></a>
                <div class="accordion-content">
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-3">
                            <p class="fw-semibold m-b-0">Código postal</p>
                            <p >{$store.address.invoice.postalCode}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-9-24">
                            <p class="fw-semibold m-b-0">Dirección o municipio</p>
                            <p class="text-center">{$store.address.invoice.municipality}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-7-24">
                            <p class="fw-semibold m-b-0 ">Colonia</p>
                            <p >{$store.address.invoice.suburb}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <p class="fw-semibold m-b-0">Calle</p>
                            <p>{$store.address.invoice.street}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <p class="fw-semibold m-b-0">No. Ext.</p>
                            <p >{$store.address.invoice.numOut}</p>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <p class="fw-semibold m-b-0">No. Int.</p>
                            <p >{$store.address.invoice.numInt}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
            {#if getMobileOrder() != null }
                <div class="accordion">
                    <a href="#/" class="accordion-title"><span>Tipo de envío - SIM izzi móvil</span> <svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg></a>
                    <div class="accordion-content">
                        <p>{getDeliveryType()}</p>
                    </div>
                </div>
            {/if}
        </div>
        <div class="d-flex align-items-center justify-content-between">
            <a href="#/" class="back-link" on:click={goback}>
                <svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"></use></svg>
                <span>atrás</span>
            </a>
            <button {disabled} class="pure__button pure__button--primary" on:click={btnNext}>Confirmar datos</button>
        </div>
    </div>
</div>
<ModalPreloader bind:disabled={modalPreloaderDisabled} ident="modalPreloader" title="Tu solicitud está siendo procesada, por favor no cierres la ventana" message=""/>
<Modal ident="modalError" title="Error" message={messageInfoError}/>
