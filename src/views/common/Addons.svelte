<script>
	import { link, navigate } from "svelte-routing"
	import PlanDescription from '../../components/Addons/PlanDescription.svelte'
	import Cart from '../../components/Addons/Cart.svelte'
	import { onMount } from 'svelte';
	import Channel from "../../components/Addons/Tv/Channels/Channel.svelte"
	import ChannelCarta from "../../components/Addons/Tv/Channels/ChannelCarta.svelte";
	import { store } from "../../Store.svelte";
	import HdExtension from "../../components/Addons/Tv/HDExtension.svelte";
	import TwoLines from "../../components/Addons/Telephone/TwoLines.svelte";
	import TelephoneExtension from "../../components/Addons/Telephone/TelephoneExtension.svelte";
	import FixedTelephoneExtension from "../../components/Addons/Telephone/FixedTelephoneExtension.svelte";
	import IzziMovilOffer from "../../components/Addons/IzziMovil/IzziMovilOffer.svelte";
	import IzziMovilSelected from "../../components/Addons/IzziMovil/IzziMovilSelected.svelte";
	import BringLinePhone from "../../components/Addons/Telephone/BringLinePhone.svelte";
	import ExemptionForcedCharge from "../../components/Addons/Telephone/ExemptionForcedCharge.svelte";

	onMount(() => {
		// enable functions for main.min.js
		document.onreadystatechange();   
		window.scrollTo(0,0);     
	});	

	let canalesPremium = $store.cart.plan.extrasMap.canalesPremium;
	let canalesCarta = $store.cart.plan.extrasMap.canalesCarta;

	let hdExtension = null;
	let ext = $store.cart.plan.extrasMap.extensiones;
	let res = alasql("SELECT*FROM ? WHERE paqextVisible=true",[ext]);
	if (res.length > 0 ){
		hdExtension = res[0];
	}


	let telefono = [];
	try {
		telefono = $store.cart.plan.extrasMap.telefono;
	}
	catch(error){}

	let extensiones = [];
	try {
		extensiones = $store.cart.plan.extrasMap.extensiones;
	}
	catch(error){}

	let channelsActive = "";
	let phoneActive = "";
	let izziMovilActive = "";

	let channelsTabActive = "";
	let phoneTabActive = "";
	let izziMovilTabActive = "";


	if(extensiones.length == 0 && telefono.length == 0){

		izziMovilActive ="addon-tab-content--active";
		izziMovilTabActive ="addon-tab-control--active";
	}
	else if(extensiones.length > 0){

		channelsActive ="addon-tab-content--active";
		channelsTabActive ="addon-tab-control--active";
	}
	else if(telefono.length > 0){

		phoneActive ="addon-tab-content--active";
		phoneTabActive ="addon-tab-control--active";
	}


	function backHandler(){
		// reset cart
		$store.cart.channels.premium = {};
		$store.cart.channels.carta = {};
		$store.cart.payment.extra = {};
		navigate("/plan-type", { replace: false });
	}

</script>

<div>
	<div class="pure-g">
		<div class="pure-u-1 pure-u-md-15-24 pure-u-lg-17-24">
			<h2 class="text-fs-26 m-b-25">Personaliza tu paquete</h2>
			<PlanDescription/>
			<div class="panel panel--no-mobile m-b-25">
				<div class="h2 text-fs-23 fw-semibold m-b-25">Hey, agrega complementos</div>
				<div class="addon-tabs">
					<div class="addon-tab-controls__holder">
						<div class="addon-tab-controls">
							{#if extensiones.length>0 }
								<a href="#tab_television" class="addon-tab-control {channelsTabActive}">Televisión</a>
							{/if}
							{#if telefono.length > 0}
								<a href="#tab_telefonia" class="addon-tab-control {phoneTabActive}">Telefonía</a>
							{/if}
							
							<a href="#tab_movil" class="addon-tab-control {izziMovilTabActive}">izzi móvil</a>
						</div>
					</div>
					<div class="addon-tab__content-holder">
						<div id="tab_television" class="addon-tab-content {channelsActive}">
							<div class="pure-g align-items-center m-b-25">
								<div class="pure-u-2-3">
									<div class="h2 text-fs-20 fw-semibold">Canales premium</div>
								</div>
								<div class="pure-u-1-3 text-right">
									<p class="m-b-0">Opcional</p>
								</div>
							</div>
							<div class="addons-grid">
								{#each canalesPremium as item }																								
									<Channel {item}/>
								{/each}					
								
							</div>
							<div class="pure-g align-items-center m-b-25">
								<div class="pure-u-2-3">
									<div class="h2 text-fs-20 fw-semibold">Canales a la carta</div>
								</div>
								<div class="pure-u-1-3 text-right">
									<p class="m-b-0">Opcional</p>
								</div>
							</div>
							<div class="addons-grid">
								
								{#each canalesCarta as item }																								
									<ChannelCarta {item}/>
								{/each}

							</div>
							<div class="pure-g align-items-center m-b-25">
								<div class="pure-u-2-3">
									<div class="h2 text-fs-20 fw-semibold">Complementa tu diversión</div>
								</div>
								<div class="pure-u-1-3 text-right">
									<p class="m-b-0">Opcional</p>
								</div>
							</div>
							{#if hdExtension != null}
								<HdExtension {hdExtension}/>
							{/if}
						</div>
						<div id="tab_telefonia" class="addon-tab-content {phoneActive}">
							<TwoLines/>
							<BringLinePhone/>
							<hr class="m-b-25">
							<div class="pure-g">
								<TelephoneExtension/>								
							</div>
							
						</div>

						<div id="tab_movil" class="addon-tab-content {izziMovilActive}">						
							<div class="pure-g align-items-center m-b-40">
								<div class="pure-u-1 pure-u-md-19-24 sm-m-b-20">
									<div class="h2 text-fs-20 fw-semibold">Hey, ¡agrega un plan ilimitado de telefonía móvil!</div>
									<p class="m-b-0">Descubre los planes exclusivos que tenemos para ti, desde <span class="fw-semibold">$200.00 pesos</span></p>
								</div>
								<div class="pure-u-1 pure-u-md-5-24 text-right sm-only-text-left">
									<p class="m-b-0">Opcional</p>
								</div>
							</div>
							
							{#if Object.entries($store.cart.izziMovil.plan).length == 0}
								<IzziMovilOffer/>
							{:else}
								<IzziMovilSelected/>								
							{/if}
						</div>
					</div>
				</div>
			</div>
			<div class="d-flex align-items-center justify-content-between">
				<div on:click={backHandler} class="back-link">
					<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"></use></svg>
					<span>atrás</span>
				</div>
			</div>
		</div>
		<div class="pure-u-1 pure-u-md-9-24 pure-u-lg-7-24">
			<Cart/>
		</div>
	</div>
</div>
<style>
	.back-link{
		cursor: pointer;
	}
</style>