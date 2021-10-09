<script>
	import {store} from '../../../Store.svelte'
    import IzziMovilPlan from './IzziMovilPlan.svelte';
    
    export let plans;
    let res  = alasql("SELECT*FROM ? WHERE family='Negocios' AND promo=0",[plans]);
    res.forEach(item => {
        item.section = 'Planes de negocio';
    });
    let businessPlans = res;

    let addPlan = (item)=>{
        $store.cart.izziMovil.plan = item;
    }
</script>

<div class="h2 text-fs-20 fw-semibold m-b-25">Planes de negocio</div>
{#each businessPlans as plan}
    <IzziMovilPlan 
        item={plan} 
        addPlanIzziMovil={()=>{
            addPlan(plan);
        }}/>
{/each}