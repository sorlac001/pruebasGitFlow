<script>
    import { store } from "../../../Store.svelte";
    import IzziMovilPlan from "./IzziMovilPlan.svelte";
    
    export let plans;
    let res  = alasql("SELECT*FROM ? WHERE family='Movil' AND promo=0",[plans]);
    res.forEach(item => {
        item.section = "Planes personales";
    });
    let plansIzziMovil = res;
    
    let addPlan = (item) => {
        $store.cart.izziMovil.plan = item;
    };
</script>

<div class="h2 text-fs-20 fw-semibold m-b-25">Planes personales</div>

{#each plansIzziMovil as plan}
    <IzziMovilPlan
        item={plan}
        addPlanIzziMovil={() => {
            addPlan(plan);
        }}
    />
{/each}