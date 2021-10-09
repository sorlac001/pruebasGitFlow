<script>
    import { link } from "svelte-routing";
    import { fetchOffer } from "../../clients/Offer.svelte";
    import Preloader from "../../components/Preloader.svelte";    
    const fetchOffers = fetchOffer();
    
</script>
<div class="pure-g m-b-20">
    <div class="pure-u-1 text-center">
        <h2 class="text-fs-26 m-b-20">Ofertas</h2>
    </div>
</div>
<div class="container">
    {#await fetchOffers}
        <Preloader/>
    {:then response }        
        {#each response.data.listOffer.offers.tripleplay as item }
            <div class="package panel">
                <div class="title fw-semibold">{item.title}</div>
                <br/>
                <div class="response">${item.cost}</div>
            </div>                        
        {/each}
    {:catch error}
        <p>An error occurred! {error}</p>
    {/await}
</div>
<style>
    .container {
        width: 100%;       
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-content: center;
    }
    .package {
        width:200px;
        margin-left: 10px;
    }
</style>
