<script>
    import { navigate } from "svelte-routing";
    import {store} from '../../Store.svelte';
    export let plan;
    export let isResidencial = false;
    export let isTv = false;

    let promoCost = null;
    try {
        if( plan.promoCost != null )
            promoCost = plan.promoCost
    }
    catch(err){}

    function removeDot(arg){
        let cost = arg.split(".")
        if (cost.length >1 ) {
            return cost[0];
        }
        return arg;
    }

    function addPlanStore(){				
		$store.cart.plan = plan;
		navigate("/addons", { replace: false });
	}
    
        
</script>
<div class="offer offer-unlimited offer-v{plan.vel}" data-precio="1,640" data-velocidad="200">
    <div class="offer-title">
        <h2 class="fw-semibold velocidad">{plan.title}</h2>
    </div>
    <div class="offer-contents">
        <div class="offer-promo">
            {#if plan.vel <= 20}
                <p class="h5 large fw-regular">Navega con Más Megas <br/><span class="fw-semibold">al domiciliar</span></p>
            {:else if plan.vel <= 100}
                <p class="h5 large fw-regular">Navega con Más Megas <br/><span class="fw-semibold">al domiciliar</span> y ahorra al traer tu línea telefónica</p>
            {:else if plan.vel <= 1000}
                <p class="h4 large fw-regular">¡Ahorra al traer tu línea telefónica!</p>
            {/if}
            <div class="promo-tag">PROMOCIÓN</div>
        </div>

        <div class="offer-pricing h4 large fw-semibold m-b-10">
            <span class="h2 big-md primary-text line-height-1 fw-semibold">${removeDot(plan.cost)}</span>
        </div>
        {#if !isTv}
            <p class="fw-medium m-b-15">Al mes al traer tu línea telefónica</p>
        {/if}
        <button class="pure__button pure__button--primary" type="button" on:click={addPlanStore}>Seleccionar</button>
        <p class="contract-text">CONTRATO A 12 MESES</p>
    </div>
</div>