<script>
	import {store} from '../../../Store.svelte'
    let checked = false;
    let item = {
        title:'Trae tu línea',
        price:100
    };
    export let clickHandler =(checked)=>{
        let obj = $store.cart.bringLinePhone;
        if (!checked) 
            obj[item.title] = item;
        else 
            delete obj[item.title];
        $store.cart.bringLinePhone = obj;
    }
    
</script>

<div class="pure-g m-b-15">
    <div class="pure-u-3-4">
        <p class="m-b-15">Trae tu línea telefónica residencial</p>
    </div>
    <div class="pure-u-1-4 text-right">
        <span class="checkbox-switch">
            <input type="checkbox" name="portabilidad_lineafija" id="portabilidad_lineafija" on:click={()=>{clickHandler(checked)}} bind:checked>
            <label for="portabilidad_lineafija"></label>
        </span>
    </div>
</div>