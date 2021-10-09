<script>
	import { navigate } from "svelte-routing";
	import {store} from '../../Store.svelte';
	import { onMount } from 'svelte';
	import { Util } from '../../Util.svelte';
	import Preloader from "../../components/Preloader.svelte";
	
	// components
	import PlanTypeUnit from '../../components/PlanType/PlanTypeUnit.svelte';

	// clients
	import { fetchOffer } from "../../clients/Offer.svelte";
	import { clientValidateServiceability } from "../../clients/ClientValidateServiceability.svelte";

	$:tabIsUnlimited = false;
	$:tabIsTripleplay = false;
	$:tabIsResidencial = false;
	$:tabIsInternet = false;
	$:tabIsTV = false;

	const fetchOffers = clientValidateServiceability({
		"postalCode": $store.address.service.postalCode,
		"id": $store.coverage.service.sipreId,
		"oc": true
	});
	fetchOffers.then(response =>{
		visible = true;

		if(response.offers.unlimited.length > 0){
			tabIsUnlimited = true;
		}
		if(response.offers.tripleplay.length > 0){
			tabIsTripleplay = true;
		}
		if(response.offers.residencial.length > 0){
			tabIsResidencial = true;
		}
		if(response.offers.internet.length > 0){
			tabIsInternet = true;
		}
		if(response.offers.tv.length > 0){
			tabIsTV = true;
		}

		processProfilerData( response );
	}).catch(error=>console.log(error));

	let profilerData = [];
	let processProfilerData = (response)=>{
		let offers = [];
		let izziType = $store.flags.izziType;
		if(izziType == "residencial"){
			offers.push("unlimited");
			offers.push("tripleplay");
			offers.push("residencial");
			offers.push("internet");
			offers.push("tv");
		}
		else if(izziType == "negocios"){
			offers.push("izzinegocios_3P");
			offers.push("izzinegocios");
			offers.push("izzinegocios_internet");
			offers.push("izzinegocios_tv");
		}
		offers.forEach(iOffer=>{
			let res = alasql(
				"SELECT * FROM ? WHERE vel < "+$store.internetProfiler.speed,
				[response.offers[iOffer]]);
			res.forEach(element => {
				element.isUnlimited = false;
				element.isResidencial = false;
				if (iOffer == "unlimited") {
					element.isUnlimited = true;
				}
				else if(iOffer == 'residencial') {
					element.isResidencial = true;
				}
				profilerData.push(element);
			});
		});
	}

	$:visible = false;

	function addPlan( plan ){				
		$store.cart.plan = plan;
		navigate("/addons", { replace: false });
	}

   
	
	onMount(() => {
		// enable functions for main.min.js
		document.onreadystatechange();        
	});

	Util.refresh.disabled();
</script>

<div class={!visible?'':'hide'}>
	<div class="pure-g">
		<div class="pure-u-1">			
			<div class="text-center"><Preloader/></div>
		</div>
	</div>
</div>
<div class={visible?'':'hide'}>
	<div class="pure-g">
		<div class="pure-u-1">
			<h2 class="text-fs-26 fw-regular text-center m-b-20">Selecciona el tipo de plan</h2>
			<div class="rounded-tabs">
				<div class="rounded-tab-controls__holder">
					<div class="rounded-tab-controls">
						<a href="#tab_recomendado" class="pure__button pure__button--primary-outline rounded-tab-control rounded-tab-control--active">Recomendado</a>
						{#if $store.flags.izziType == "residencial"}	
							<a href="#tab_unlimited" class="pure__button pure__button--primary-outline rounded-tab-control {tabIsUnlimited?'':'hide'}">Unlimited</a>
							<a href="#tab_tripleplay" class="pure__button pure__button--primary-outline rounded-tab-control {tabIsTripleplay?'':'hide'}">Internet + izzitv</a>
							<a href="#tab_residencial" class="pure__button pure__button--primary-outline rounded-tab-control {tabIsResidencial?'':'hide'}">Internet + Telefonía</a>
							<a href="#tab_internet" class="pure__button pure__button--primary-outline rounded-tab-control {tabIsInternet?'':'hide'}">Internet</a>
						{/if}
						{#if $store.flags.izziType == "negocios"}
							<a href="#tab_tripleplay" class="pure__button pure__button--primary-outline rounded-tab-control">Internet + izzitv</a>
							<a href="#tab_residencial" class="pure__button pure__button--primary-outline rounded-tab-control">Internet</a>
						{/if}
					</div>
					<span class="rounded-tab-control-selected"></span>
					<a href="#/" class="rounded-tab-control-selector"><svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg></a>
				</div>
				<div class="rounded-tab__content-holder">
					<div id="tab_recomendado" class="rounded-tab-content rounded-tab-content--active">
						
						<div class="offers-grid offers-grid--offers-recommended">
							{#await fetchOffers}
								<Preloader/>
							{:then response}
								{#each profilerData as item }
									{#if item.isUnlimited}
										<PlanTypeUnit plan={item} isUnlimited={true}/>
									{:else if item.isResidencial}
										<PlanTypeUnit plan={item} isResidencial={true}/>
									{:else}
										<PlanTypeUnit plan={item}/>
									{/if}
								{/each}
							{/await}
						</div>						
					</div>
					{#if $store.flags.izziType == "residencial"}											
						<div id="tab_unlimited" class="rounded-tab-content">						
							<div class="offers-grid offers-grid--offers-recommended">
								{#await fetchOffers}
									<Preloader/>
								{:then response}
									{#each response.offers.unlimited as item }
										<PlanTypeUnit plan={item}/>
									{/each}								
								{/await}
							</div>
						</div>
						<div id="tab_tripleplay" class="rounded-tab-content">
							<div class="offers-grid offers-grid--offers-recommended">
								{#await fetchOffers}
									<Preloader/>
								{:then response}
									{#each response.offers.tripleplay as item }
										<PlanTypeUnit plan={item}/>
									{/each}
								{/await}
							</div>
						</div>
						<div id="tab_residencial" class="rounded-tab-content">
							<div class="offers-grid offers-grid--offers-recommended">

								{#await fetchOffers}
									<Preloader/>
								{:then response}
									{#each response.offers.residencial as item }
										<PlanTypeUnit plan={item} isResidencial={true}/>
									{/each}
								{/await}
							</div>
						</div>
						<div id="tab_internet" class="rounded-tab-content">
							<div class="offers-grid offers-grid--offers-recommended">
								{#await fetchOffers}
									<Preloader/>
								{:then response}
									{#each response.offers.internet as item }
										<PlanTypeUnit plan={item}/>
									{/each}
								{/await}
							</div>
						</div>
						<div id="tab_tv" class="rounded-tab-content">
							<div class="offers-grid offers-grid--offers-recommended">

								{#await fetchOffers}
									<Preloader/>
								{:then response}
									{#each response.offers.tv as item }
										<PlanTypeUnit plan={item} isTv={true}/>
									{/each}
								{/await}
							</div>
						</div>
					{/if}
					{#if $store.flags.izziType == "negocios"}											
						<div id="tab_tripleplay" class="rounded-tab-content">
							<div class="offers-grid offers-grid--offers-recommended">
								{#await fetchOffers}
									<Preloader/>
								{:then response}
									{#each response.offers.izzinegocios_3P as item }
										<PlanTypeUnit plan={item}/>
									{/each}
								{/await}
							</div>
						</div>
						<div id="tab_residencial" class="rounded-tab-content">
							<div class="offers-grid offers-grid--offers-recommended">

								{#await fetchOffers}
									<Preloader/>
								{:then response}
									{#each response.offers.izzinegocios as item }
										<PlanTypeUnit plan={item}/>
									{/each}
								{/await}
							</div>
						</div>
						<div id="tab_internet" class="rounded-tab-content">
							<div class="offers-grid offers-grid--offers-recommended">
								{#await fetchOffers}
									<Preloader/>
								{:then response}
									{#each response.offers.izzinegocios_internet as item }
										<PlanTypeUnit plan={item}/>
									{/each}
								{/await}
							</div>
						</div>
						<div id="tab_tv" class="rounded-tab-content">
							<div class="offers-grid offers-grid--offers-recommended">

								{#await fetchOffers}
									<Preloader/>
								{:then response}
									{#each response.offers.izzinegocios_tv as item }
										<PlanTypeUnit plan={item}/>
									{/each}
								{/await}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.hide{
		display: none;
	}
</style>