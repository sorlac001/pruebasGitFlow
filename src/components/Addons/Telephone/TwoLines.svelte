<script>
	import {store} from '../../../Store.svelte'
    let checked = false;
    let item = {
        title:'Hazlo 2 líneas',
        price:175
    };
    export let clickHandler =(checked)=>{
        let obj = $store.cart.twoLines;
        if (!checked) 
            obj[item.title] = item;
        else 
            delete obj[item.title];
        $store.cart.twoLines = obj;
    }
    
</script>

<div class="label__selectable_wrapper m-b-15">
    <input type="checkbox" id="hazlo2lineas" name="hazlo2lineas" value="" on:click={()=>{clickHandler(checked)}} bind:checked>
    <label for="hazlo2lineas" class="label__selectable">
        <span class="label__selectable__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="label__description">
            <div class="h2 text-fs-20 fw-semibold m-b-5">Hazlo 2 líneas</div>
            <p class="text-fs-13 m-b-0">Segunda línea telefónica con llamadas ilimitadas</p>
        </div>
        <div class="label__pricing">
            <div class="h2 text-fs-23 fw-semibold primary-text">+$<span>175</span></div>
            <p class="text-fs-15">al mes</p>
        </div>
        <div class="label__action pure__button"><span class="on-uncheck">Seleccionar</span><span class="on-check">Quitar</span></div>
    </label>
</div>