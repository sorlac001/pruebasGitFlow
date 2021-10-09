<script>
	import {store} from '../../Store.svelte'
</script>
<div class="panel panel--no-mobile m-b-25">
    <div class="h2 text-fs-23 fw-semibold m-b-10">{$store.cart.plan.title}</div>
    {#if $store.cart.plan.description != null}
        <p class="m-b-0">{$store.cart.plan.description}</p>
    {/if}
</div>