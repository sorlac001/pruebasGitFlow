<script>
	import { navigate } from "svelte-routing";
	import { store, storeIzziMovil} from "../../Store.svelte";
	import { onMount } from 'svelte';
	import Preloader from "../../components/Preloader.svelte"; 
	import { fetchImage } from "../../clients/ClientDashboard.svelte";

	function addType(e){
		if(e == "movil")
			window.open("https://izzimovil.izziapiweb.mx/login.html?data="+$storeIzziMovil.data);
		else {
			$store.flags.izziType = e;
			navigate("/service-address", { replace: false });
		}	
	}

	const fetchImages = fetchImage({rpt:$store.address.service.rpt});
	$:visible = false;

	onMount(() => {
        // enable functions for main.min.js
        //document.onreadystatechange();        
    });

	function cargaCarrousel() {
		document.onreadystatechange();
		setTimeout(() => {
			visible = true;
		}, 9);
	}
</script>

<div>
	<div class="pure-g justify-content-center">
		<div class="pure-u-2 pure-u-lg-2-4 m-t-20">
			<div class="pure-g m-t-20">    
				<div class="pure-u-1 pure-u-md-1-2">
					<div class="featured-tabs F">
						{#await fetchImages}
							<Preloader/>
						{:then response}    
						<div class="featured-tab__content-holder" on:load={cargaCarrousel()}>
							<div >
							{#each response as image }
								{#if image.index == 1}
									<div id={"feature"+image.index} class="featured-tab-content featured-tab-content--active">
										<img src={image.imagen} alt={image.tipo}>
									</div>
								{/if}
								{#if image.index > 1}
									<div id={"feature"+image.index} class="featured-tab-content">
										<img src={image.imagen} alt={image.tipo}>
									</div>
								{/if}
							{/each}
							<div class="featured-tab-controls">
							{#each response as image }
								{#if image.index == 1}
									<a href={"#feature"+image.index} class="featured-tab-control featured-tab-control--active"><span></span></a>
								{/if}
								{#if image.index > 1}
									<a href={"#feature"+image.index} class="featured-tab-control "><span></span></a>
								{/if}
							{/each}
							</div>
							</div>
						</div>
						{:catch error}
							<p>An error occurred! {error}</p>
						{/await}
					</div>
				</div>
				<div class="pure-u-1 pure-u-md-1-2 m-b-20">
					<div class="pure-g m-b-20">
						<div class="pure-u-1 pure-md-2-2 m-b-20">
							<p class="fw-semibold m-b-0">Hola, {$store.user.name}</p>
						</div>
						<div class="pure-u-1 pure-md-2-2 m-b-20 cards-grid">
							<div class="pure-g">
								<div class="pure-u-1 pure-u-md-1-2">
									<div class="card card--primary" on:click={()=> addType("residencial")}>
										<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-home"></use></svg>
										<p>Quiero izzi residencial</p>
									</div>
								</div>
								<div class="pure-u-1 pure-u-md-1-2">
									<div class="card card--green" on:click={()=> addType("negocios")}>
										<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-briefcase"></use></svg>
										<p>Quiero izzi negocios</p>
									</div>
								</div>
								<div class="pure-u-1 pure-u-md-1-2">
									<div class="card card--orange" on:click={()=> addType("movil")}>
										<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-smartphone"></use></svg>
										<p>Quiero izzi móvil</p>
									</div>
								</div>
								<!--<div class="card card--white">
									<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-inbox"></use></svg>
									<p>Buzón de ordenes</p>
								</div>-->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card{
		cursor: pointer;
		margin-left: auto;
	}
</style>