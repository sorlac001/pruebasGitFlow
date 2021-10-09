<script>
	import { navigate } from "svelte-routing";
	import { store } from "../../Store.svelte";
	import { onMount } from 'svelte';
	
	let concurrentUser = "";
	let	navegationType = "";

	let hasEmpty = false;
	const idealInternet = [ //order: hfc/ftth -> content: navegation type -> content: speed for concurrent user
		[ //hfc
			[5, 20, 50, 50],
			[15, 50, 60, 60],
			[30, 60, 100, 100],
			[50, 100, 100, 100],
			[100, 100, 100, 100]
		],
		[//ftth
			[20, 20, 30, 50],
			[20, 50, 50, 60],
			[30, 60, 60, 100],
			[50, 100, 100, 200],
			[100, 200, 200, 500,]
		]
	];
	function goBack() {
		navigate("/service-address", { replace: false });
	}

	function setSpeed(){
		if(concurrentUser != "" && navegationType != ""){
			hasEmpty = false;

			let type = getTypetecnology($store.internetProfiler.ftth);
			let velocidad = getTec(concurrentUser, navegationType, type);

			addStore(velocidad);
		}else{
			hasEmpty = true;
		}
	}

	function getTypetecnology (arg){
		if(arg){
			return 1;
		}else{
			return 0;
		}
	}
	
	function getTec(user, nav, flag){
		return idealInternet[flag][user][nav];
	}

	function addStore(arg){
		$store.internetProfiler.speed = arg;
		navigate('/plan-type', {replace: false});
	}

	onMount(() => {
        // enable functions for main.min.js
        document.onreadystatechange();        
    });
</script>
<div>
	<div class="pure-g justify-content-center">
		<div class="pure-u-1 pure-u-md-1-2 pure-u-lg-9-24 m-b-30">
			<h2 class="text-center text-fs-20 m-b-20">
				<span class="fw-semibold">Perfila a tu cliente</span> para encontrar la velocidad ideal a sus necesidades
			</h2>
			<div class="panel panel--small panel--centered m-b-30">
				<div class="pure-u-1 pure-u-sm-2-2 {hasEmpty?'':'hide'}">
					<div class="alert alert--error m-b-40">
						<p>
							Todos los campos son obligatorios.
						</p>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-2-2">
					<p class="m-b-15">Número de usuarios simultáneos</p>
					<div class="select-holder m-b-20">
						<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg>
						<label for="currentUser" class="hidden-label">Selecciona uno</label>
						<select name="currentUser" id="currentUser" bind:value={concurrentUser}>
							<option value="">Selecciona uno</option>
							<option value="0">1</option>
							<option value="1">2-3</option>
							<option value="2">4-5</option>
							<option value="3">6-9</option>
							<option value="4">10-más</option>
						</select>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-2-2">
					<p class="m-b-15">Tipo de navegación requerida</p>
					<div class="select-holder m-b-20">
						<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg>
						<label for="navegationType" class="hidden-label">Selecciona uno</label>
						<select name="navegationType" id="navegationType" bind:value={navegationType}>
							<option value="">Selecciona uno</option>
							<option value="0">Navegación básica</option>
							<option value="1">Streaming</option>
							<option value="2">Gaming</option>
							<option value="3">Carga y descarga de archivos</option>
						</select>
					</div>
				</div>
			</div>
			<div class="d-flex align-items-center justify-content-between">
				<a href="#/" class="back-link" on:click={()=>goBack()}>
					<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"></use></svg>
					<span>atrás</span>
				</a>
				<a href="#/" class="pure__button pure__button--primary" on:click={()=>setSpeed()}>Siguiente</a>
			</div>
		</div>
	</div>
</div>

<style>
	.hide{
		display: none;
	}
</style>