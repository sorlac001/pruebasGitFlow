<script>
	import {config, store} from '../../../Store.svelte'
    let value = 0;
    let minusDisabled = "selector--disabled";
    let plusDisabled = "";
    let price = 226;
    let inc = ()=>{
        reset();
        value++;
        updateStore('FixedTelephoneExtension');
        plusDisabled = (value>=$config.maxExtension ? "selector--disabled":"");
    }
    let dec = ()=>{
        reset();
        value--;
        updateStore('FixedTelephoneExtension');
        minusDisabled = (value<=0 ? "selector--disabled":"");
    }
    let reset = ()=>{
        minusDisabled = "";
        plusDisabled = "";
    }

    let updateStore = (type)=>{
        let item = {
            quantity:value,
            title: "Extensión Telefónica Fija",
            cost:value*price
        };

        let obj = $store.cart.payment.unique;
        if (value > 0 ) 
            obj[type] = item;
        else 
            delete obj[type];
        $store.cart.payment.unique = obj;
    }
</script>

<div class="pure-u-1 pure-u-md-1-2">
    <div class="panel panel--lightgray text-center">
        <p class="fw-semibold m-b-10">Equipo telefónico fijo</p>
        <div class="quantity-selectors m-b-15">
            <button type="button" on:click={dec} class="selector selector--minus {minusDisabled}"><span>-</span></button>
            <span class="quantity-num">{value}</span>
            <button type="button" on:click={inc} class="selector selector--plus {plusDisabled}"><span>+</span></button>
            <input type="hidden" value="">
        </div>
        <div class="h2 text-fs-23 fw-semibold primary-text m-b-10">+$<span>226</span></div>
        <p class="m-b-0">Cada uno / Pago único</p>
    </div>
</div>