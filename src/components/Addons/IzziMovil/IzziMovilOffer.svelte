<script>
    import { getOffer } from '../../../clients/ClientGetOffer.svelte';
	import {store} from '../../../Store.svelte'
    import Preloader from '../../Preloader.svelte';
    import BusinessPlan from './BusinessPlan.svelte';    
    import PersonalPlan from './PersonalPlan.svelte';   
    import PromotionPlan from './PromotionPlan.svelte';
    
    let plans = [];
    let promise = getOffer();
    const rpt = $store.address.service.rpt;
    $:thereIsPromotionPlans = true;

    let isInvalidRptsForPromotion = () =>{
        const res = (rpt == "400" || rpt == "453" || rpt == "614" || rpt == "612");
        return res;
    }

    promise.then(resp=>{
        const res = isInvalidRptsForPromotion()
        if(res){
            thereIsPromotionPlans = false;
            plans = resp.plans;
        }
        else
            plans = removeRelatedOffer(resp.plans);
    });

    let removeRelatedOffer = (plans)=>{
        let res = alasql("SELECT*FROM ? WHERE promo=1",[plans]);
        let excludeEquivalentPlans = [];
        res.forEach(item => {
            
            plans.forEach(jtem=>{
                if(jtem.idOrderVlocity != item.relatedOffer)
                    excludeEquivalentPlans.push(jtem);
            });
        });
        if(res.length == 0){
            thereIsPromotionPlans = false;
            return plans;
        }
        else
            return excludeEquivalentPlans;
    }

</script>

{#await promise }
    <div class="pure-g">
        <div class="pure-u-1">			
            <div class="text-center"><Preloader/></div>
        </div>
    </div>
        
{:then response }
    {#if thereIsPromotionPlans }        
        <PromotionPlan {plans}/>
    {/if}
    <br/>
    <PersonalPlan {plans}/>
    <br/>
    <BusinessPlan {plans}/>
{/await}
