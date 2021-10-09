<script>
    import { link } from "svelte-routing";
    import { fetchBranch } from "../../clients/Branch.svelte";
    import Preloader from "../../components/Preloader.svelte"    
    const listBranch = fetchBranch({
        sku:28767
    });
    
</script>

<div class="pure-g m-b-20">
    <div class="pure-u-1 text-center">
        <h2 class="text-fs-26 m-b-20">Sucursales</h2>
    </div>
</div>
<div class="container">
    {#await listBranch}
        <Preloader/>
    {:then response }        
        {#each response.data.storeSkuAvailability.branchOffices as item }
            <div class="package panel">
                <div class="title fw-semibold">{item.warehouse}</div>
                <br/>
                <div class="title fw-semibold">{item.city}</div>
                <br/>
                <div class="address">{item.address}</div>
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
        margin-bottom: 10px;
    }
</style>
