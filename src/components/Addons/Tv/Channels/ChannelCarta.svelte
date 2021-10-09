<script>
    import { store } from "../../../../Store.svelte";
    import Acorn from "./Carta/Acorn.svelte";
    import DogTv from "./Carta/DogTV.svelte";
    import Noggin from "./Carta/Noggin.svelte";
    import Paramount from "./Carta/Paramount.svelte";
    import StarzPlay from "./Carta/StarzPlay.svelte";
    import Stingray from "./Carta/Stingray.svelte";


    export let item = {};
    let clickHandler = (checked) => {
        let obj = $store.cart.channels.carta;
        if (!checked) 
            obj[item.extra.title] = item;
        else 
            delete obj[item.extra.title];
        $store.cart.channels.carta = obj;
    };
</script>

{#if item.extra.title == "Acorn TV"}    
    <Acorn {clickHandler} />
{:else if item.extra.title == "Stingray Karaoke"}    
    <Stingray {clickHandler} />
{:else if item.extra.title == "Stingray Karaoke"}    
    <Noggin {clickHandler} />
{:else if item.extra.title == "Stingray Karaoke"}    
    <StarzPlay {clickHandler} />
{:else if item.extra.title == "Dog TV"}    
    <DogTv {clickHandler} />
{:else if item.extra.title == "Paramount+"}    
    <Paramount {clickHandler} />
{/if}
