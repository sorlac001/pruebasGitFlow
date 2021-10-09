<script>
	import {config, store} from '../../../Store.svelte'

    export let hdExtension;

    let value = 0;
    let minusDisabled = "selector--disabled";
    let plusDisabled = "";
    let price = 100;
    let inc = ()=>{
        reset();
        value++;
        updateStore('HDExtension');
        plusDisabled = (value>=$config.maxExtension ? "selector--disabled":"");
    }
    let dec = ()=>{
        reset();
        value--;
        updateStore('HDExtension');
        minusDisabled = (value<=0 ? "selector--disabled":"");
    }
    let reset = ()=>{
        minusDisabled = "";
        plusDisabled = "";
    }

    let updateStore = (type)=>{
        let item = {
            extId:hdExtension.extId,
            quantity:value,
            title: hdExtension.extra.extName,
            cost:value*hdExtension.extra.cost
        };

        let obj = $store.cart.payment.extra;
        if (value > 0 ) 
            obj[type] = item;
        else 
            delete obj[type];
        $store.cart.payment.extra = obj;
    }
</script>

<div class="panel panel--lightgray">
    <div class="pure-g align-items-center">
        <div class="pure-u-1 pure-u-md-7-12 pure-u-lg-15-24 sm-m-b-20">
            <img class="extensionhd-thumb m-b-15" src="/assets/img/content/extension-hd-thumb.png" alt="">
            <p class="fw-semibold m-b-5">{hdExtension.extra.extName}</p>
            <p class="m-b-10">{hdExtension.extra.subtitle}</p>
            <div class="h2 text-fs-23 fw-semibold primary-text">+$<span>{hdExtension.extra.cost}</span> <span class="text-fs-15 fw-regular base-text">al mes</span></div>
        </div>
        <div class="pure-u-1 pure-u-md-5-12 pure-u-lg-9-24">
            <div class="quantity-selectors">
                <button type="button" on:click={dec} class="selector selector--minus {minusDisabled}"><span>-</span></button>
                <span class="quantity-num">{value}</span>
                <button type="button" on:click={inc} class="selector selector--plus {plusDisabled}"><span>+</span></button>
                <input type="hidden" value="">
            </div>
        </div>
    </div>
</div>