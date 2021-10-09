<script>
    import { store } from "../../../../Store.svelte";
    import Blim from "./Premium/Blim.svelte";
    import Golden from "./Premium/Golden.svelte";
    import HbOmax from "./Premium/HBOmax.svelte";
    import Internacional from "./Premium/Internacional.svelte";
    import IzziTv from "./Premium/IzziTv.svelte";
    import NetflixPremium from "./Premium/NetflixPremium.svelte";
    import NetflixStandard from "./Premium/NetflixStandard.svelte";
    import Premium from "./Premium/Premium.svelte";
    import StarPremium from "./Premium/StarPremium.svelte";

    export let item = {};
    let clickHandler = (checked) => {
        let obj = $store.cart.channels.premium;
        if (!checked) 
            obj[item.extra.title] = item;
        else 
            delete obj[item.extra.title];
        $store.cart.channels.premium = obj;
    };
</script>

{#if item.extra.title == "BLIM"}
    <Blim {clickHandler} />
{:else if item.extra.title == "STAR PREMIUM"}
    <StarPremium {clickHandler} />
{:else if item.extra.title == "HBO MAX"}
    <HbOmax {clickHandler} />
{:else if item.extra.title == "GOLDEN PREMIER"}
    <Golden {clickHandler} />
{:else if item.extra.title == "INTERNACIONAL"}
    <Internacional {clickHandler} />
{:else if item.extra.title == "PREMIUM"}
    <Premium {clickHandler} />
{:else if item.extra.title == "Netflix Plan Básico"}
    <NetflixStandard {clickHandler} />
{:else if item.extra.title == "Netflix Plan Premium"}
    <NetflixPremium {clickHandler} />
{:else if item.extra.title == "Izzi tv"}
    <IzziTv {clickHandler} />
{/if}
<!-- // PREMIUM -->