<script>
    import { navigate } from 'svelte-routing';
	import { validate_each_argument } from 'svelte/internal';
    import {store} from '../../Store.svelte'
    import ModalAction from './ModalAction.svelte';
    let total = 0;


    let isThereIzziMovil = ()=>{

        let id = $store.cart.izziMovil.plan.idOrderVlocity;
        return id != undefined;
    }

    let avisoImeiClickOK=()=>{
        $store.cart.izziMovil = {
            plan: {},
            imei:""
        };
        navigate("/service-address-invoice",{replace:false});
    }

    let clickHandler = ()=>{
        $store.cart.total = total;

        if(isThereIzziMovil() && ($store.cart.izziMovil.imei == ""))
            MicroModal.show("aviso-imei");
        else
            navigate("/service-address-invoice",{replace:false});
    }

    store.subscribe(value => { 
        let list = [];
        let subtotal = 0;
        if($store.cart.plan.promoCost == null)
            total = parseFloat($store.cart.plan.cost );
        else
            total = parseFloat($store.cart.plan.promoCost);
        
        subtotal = 0;
        list = Object.entries($store.cart.twoLines);
        list.forEach(item=>{
            console.log(item[1]);
            subtotal += parseFloat(item[1].price);
        });
        total+= subtotal; 
        

        subtotal = 0;
        list = Object.entries($store.cart.exemptionForcedCharge);
        list.forEach(item=>{
            console.log(item[1]);
            subtotal += parseFloat(item[1].price);
        });
        total+= subtotal;

        
        subtotal = 0;
        list = Object.entries($store.cart.channels.premium);
        list.forEach(item=>{
            console.log(item[1]);
            subtotal += parseFloat(item[1].extra.cost);
        });
        total+= subtotal;        


        subtotal = 0;
        list = Object.entries($store.cart.channels.carta);
        list.forEach(item=>{
            console.log(item[1]);
            subtotal += parseFloat(item[1].extra.cost);
        });
        total+= subtotal;        

        subtotal = 0;
        list = Object.entries($store.cart.payment.extra);
        list.forEach(item=>{
            console.log(item[1]);
            subtotal += parseFloat(item[1].cost);
        });
        total+= subtotal;
        
        subtotal = 0;
        list = Object.entries($store.cart.payment.unique);
        list.forEach(item=>{
            console.log(item[1]);
            subtotal += parseFloat(item[1].cost);
        });
        total+= subtotal;

    });
</script>

<div class="sidebar">
    

    <div class="h2 text-fs-26 fw-semibold primary-text">${total}</div>
    <p class="fw-semibold">Pago para contratar</p>
    <p class="text-fs-13 fw-semibold aqua-text m-b-25">Incluye primer mes</p>
    <div class="pago-mensual">
        <div class="pure-g m-b-15">
            <div class="pure-u-15-24">
                <p class="fw-semibold">{$store.cart.plan.title}</p>
            </div>
            <div class="pure-u-9-24 text-right">
                {#if $store.cart.plan.promoCost == null }
                    
                    <p class="fw-semibold">${$store.cart.plan.cost}</p>
                {:else}
                    <p class="fw-semibold">${$store.cart.plan.promoCost}</p>
                {/if}
            </div>
        </div>
        {#each Object.entries($store.cart.channels.premium) as [key, value]}
            <div class="pure-g m-b-15">
                <div class="pure-u-15-24">
                    <p>{value.extra.title}</p>
                </div>
                <div class="pure-u-9-24 text-right">
                    <p>${value.extra.cost}</p>
                </div>
            </div>
        {/each} 
        {#each Object.entries($store.cart.channels.carta) as [key, value]}
            <div class="pure-g m-b-15">
                <div class="pure-u-15-24">
                    <p>{value.extra.title}</p>
                </div>
                <div class="pure-u-9-24 text-right">
                    <p>${value.extra.cost}</p>
                </div>
            </div>
        {/each}
        {#each Object.entries($store.cart.twoLines) as [key, value]}
            <div class="pure-g m-b-15">
                <div class="pure-u-15-24">
                    <p>{value.title}</p>
                </div>
                <div class="pure-u-9-24 text-right">
                    <p>${value.price}</p>
                </div>
            </div>
        {/each} 
        {#each Object.entries($store.cart.payment.extra) as [key, value]}
            <div class="pure-g m-b-15">
                <div class="pure-u-15-24">
                    <p>{value.quantity+' '+value.title}</p>
                </div>
                <div class="pure-u-9-24 text-right">
                    <p>${value.cost}</p>
                </div>
            </div>
        {/each} 
      
    </div>
    {#if Object.entries($store.cart.izziMovil.plan).length > 0}
        <div class="pago-30dias">
            <p class="text-fs-13 fw-semibold aqua-text m-b-25">Pago a partir de 30 días</p>
            <div class="pure-g">
                <div class="pure-u-15-24">
                    <p>{$store.cart.izziMovil.plan.name}</p>
                </div>
                <div class="pure-u-9-24 text-right">
                    {#if $store.cart.izziMovil.plan.promotionPrice!=null}                        
                        <p>${$store.cart.izziMovil.plan.promotionPrice}</p>
                    {:else} 
                        <p>${$store.cart.izziMovil.plan.price}</p>
                    {/if}
                </div>
            </div>
        </div>
    {/if}

    {#if Object.entries($store.cart.payment.unique).length > 0 || Object.entries($store.cart.exemptionForcedCharge).length > 0}
        <div class="pago-unico">  
            <p class="text-fs-13 fw-semibold aqua-text m-b-25">Pago único</p>            
            {#each Object.entries($store.cart.payment.unique) as [key, value]}
                <div class="pure-g">
                    <div class="pure-u-15-24">
                        <p>{value.quantity+' '+value.title}</p>
                    </div>
                    <div class="pure-u-9-24 text-right">
                        <p>${value.cost}</p>
                    </div>
                </div>
            {/each}
            {#each Object.entries($store.cart.exemptionForcedCharge) as [key, value]}
                <div class="pure-g m-b-15">
                    <div class="pure-u-15-24">
                        <p>{value.title}</p>
                    </div>
                    <div class="pure-u-9-24 text-right">
                        <p>${value.price}</p>
                    </div>
                </div>
            {/each} 
        </div>
    {/if}
    <div class="sidebar-actions">
        <button type="button" on:click={clickHandler} class="pure__button pure__button--primary pure__button--expand m-b-15">Siguiente</button>
        <p><span class="fw-semibold">¡Contrata ahora! </span> <br>¡Obtén más Megas al domiciliar tu pago!</p>
    </div>
</div>
<ModalAction onClick={avisoImeiClickOK} ident="aviso-imei" title="Aviso" message="¿Desea continuar sin validar IMEI? Se removerá izzi móvil del carrito."/>