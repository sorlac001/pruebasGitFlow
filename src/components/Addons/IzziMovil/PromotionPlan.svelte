<script>
    import { store } from "../../../Store.svelte";
    import IzziMovilPlan from "./IzziMovilPlan.svelte";

    export let plans;

    let res  = alasql("SELECT*FROM ? WHERE promo=1",[plans]);
    res.forEach(item => {
        item.section = "Planes con promoción";
    });
    let plansPromotion = res;

    let addPlan = (item) => {
        $store.cart.izziMovil.plan = item;
    };
</script>

<div class="h2 text-fs-20 fw-semibold m-b-25">Planes con promoción</div>

{#each plansPromotion as plan}
    <IzziMovilPlan
        item={plan}
        addPlanIzziMovil={() => {
            addPlan(plan);
        }}
    />
{/each}
