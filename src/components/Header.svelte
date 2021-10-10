<script>
	import ProgressBar from "../components/ProgressBar.svelte";
	import { store } from "../Store.svelte";
	import { link, navigate } from "svelte-routing";
	import { onMount } from "svelte";
	import { Util } from '../Util.svelte';
	export let toggle = false;
	export let styleToggle = '';

	
	function clickToggle(event){
		event.preventDefault();
		toggle = !toggle;
		styleToggle = (!toggle) ? '' : 'header-options--expanded';
	}
	let clickHandler = ()=>{
		navigate("/dashboard",{replace:false});
	}

	function clickLogout() {
		navigate("/",{replace:false});
		location.reload();
	}
/*
	if($store.user.idVendor =="")
		document.location.href = "/";
*/
	Util.refresh.disabled();

	onMount(()=>{
		//alert("redirect");
		//alert("redirect");
	});
</script>

<header>
	<div class="pure-g">
		<div class="pure-u-1">
			<div class="header-contents">
				<div on:click={clickHandler} class="header-logo"><img src="/assets/img/logos/izzi-logo.svg" alt="izzi"></div>
				<div class="header-options {styleToggle}">
					<a href="#/" class="header-options__toggle" on:click="{clickToggle}">
						<span>{$store.user.name}</span>
						<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg>
					</a>
					<div class="header-options__dropdown">
						<ul>
							<!--<li><a href="#/">Link</a></li>-->
							<li><a href="#/" on:click={()=>clickLogout()}>Salir</a></li>
						</ul>
					</div>
				</div>
				<!-- <ProgressBar progress={10} /> -->
			</div>
		</div>
	</div>
</header>