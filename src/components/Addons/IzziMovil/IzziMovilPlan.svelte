<script>
	import {store} from '../../../Store.svelte'
    export let item;
    export let addPlanIzziMovil = ()=>{
        // alert(JSON.stringify(item))
        // $store.cart.izziMovil.plan = item;
    }

    let isVisibleDescription = false;
    let showMore = () =>{
        isVisibleDescription = true;
    }
    let hideMore = () =>{
        isVisibleDescription = false;
    }
</script>

<div class="label__selectable_wrapper label__selectable_wrapper--plans m-b-10">
    <input type="checkbox" on:click={addPlanIzziMovil} id="plan_izzimovil_{item.idOrderVlocity}" name="plan_izzimovil_{item.idOrderVlocity}" value="">
    <label for="plan_izzimovil_{item.idOrderVlocity}" class="label__selectable">
        <span class="label__selectable__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="label__description">
            <img class="sim-icon" src="/assets/img/content/izzi-movil-sim.png" alt="">
            <div class="h2 text-fs-18 fw-semibold m-b-5">{item.name}</div>
            
            {#if !isVisibleDescription }
                <p class="text-fs-13 m-b-0">
                    <a href="#/" on:click={showMore} class="primary-text">Conoce más</a>
                </p>
            {:else}
                <p class="text-fs-13 m-b-0">
                    <a href="#/" on:click={hideMore} class="primary-text">Ocultar</a></p>
                <p>{item.description}</p>
            {/if}
        </div>
        <div class="label__pricing">
            <div class="h2 text-fs-20 fw-semibold">
                {#if item.promotionPrice!=null}
                    <span class="gray-text line-through">$<span>{item.price}</span></span> 
                    <span class="primary-text">${item.promotionPrice}</span>
                {:else} 
                    <span class="primary-text">${item.price}</span>
                {/if}
                <span class="text-fs-15 fw-regular">al mes</span>
            </div>            
        </div>
        <div class="label__action pure__button"><span class="on-uncheck">Agregar</span><span class="on-check">Quitar</span></div>
    </label>
</div>


