<script>
	import {store} from '../../../Store.svelte'
    let checked = false;
    let item = {
        title:'Exención de plazo forzoso',
        price:1500
    };
    export let clickHandler =(checked)=>{
        let obj = $store.cart.exemptionForcedCharge;
        if (!checked) 
            obj[item.title] = item;
        else 
            delete obj[item.title];
        $store.cart.exemptionForcedCharge = obj;
    }
    
</script>
<div class="pure-g m-b-15">
    <div class="pure-u-3-4">
        <p class="m-b-15">Cargo por exención de plazo forzoso</p>
    </div>
    <div class="pure-u-1-4 text-right">
        <span class="checkbox-switch">
            <input type="checkbox" name="exemption_forced" id="exemption_forced" on:click={()=>{clickHandler(checked)}} bind:checked>
            <label for="exemption_forced"></label>
        </span>
    </div>
</div>