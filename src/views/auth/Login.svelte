<script>
	import { navigate } from "svelte-routing";
	import { fetchUsers } from "../../clients/ClientLogin.svelte";
	import { store, storeIzziMovil } from "../../Store.svelte";
	import { onMount } from 'svelte';
	import Preloader from "../../components/Preloader.svelte";
	import {getCities} from "../../clients/ClientGetCities.svelte";
	import { clientLoginIzziMovil } from "../../clients/ClientLoginIzziMovil.svelte";
	import {encode} from 'base-64';

	
	let hassError = false;
	let hassEmpty = false;
	let hassInvalid = false;
	let hassProblem = false;
	let expresiones = /^[a-zA-Z0-9\_\-]/;
	let dataUser = Promise.resolve([]);
	let rptSelected;
	const fetchCities = getCities();

	$:visible = true;

	let logIn = {
		user: "",
		pass: "",
	};

	function valExpresion(arg) {
		if (arg != "") {
			if (expresiones.test(arg) == false) {
				hassInvalid = true;
				if(logIn.user == arg){
					logIn.user = "";
				}else{
					logIn.pass = "";
				}
			}else{
				hassInvalid = false;
			}	
		}
	}

	async function addStore(arg) {
		$store.user.name = arg.nombre;
		$store.user.token = arg.token;
		$store.user.entryChannel = arg.canal;
		$store.user.idVendor = arg.vendedor;
		$store.address.service.rpt = arg.rpt;
		console.log($store.user);
		
		await clientLoginIzziMovil({
			"user" : logIn.user,
			"password" : _auth.process(logIn.pass)
		}).then(resp=>{
			let data = JSON.stringify(resp.response);		
			$storeIzziMovil.data = encode(data);
			navigate("/dashboard", { replace: false });
		});
	}

	async function valContent() {
		if (logIn.user != "" && logIn.pass != "" && rptSelected != "-1") {
			hassEmpty = false;
			visible = false;
			hassError = false;
			hassProblem = false;
			if(hassEmpty == false && hassInvalid == false){
				dataUser = await fetchUsers(logIn);
				console.log(dataUser);
				if (dataUser == null){
					visible = true;
					hassError = true;
				}else if (dataUser == "Error: Error al consumir el servicio" || dataUser == "TypeError: Failed to fetch"){
					hassProblem = true;
					visible = true;
				}else{
					hassError = false;
					dataUser.rpt = rptSelected;
					addStore(dataUser);
				}
			}
		} else {
			hassEmpty = true;
		}
	}

	onMount(() => {
        // enable functions for main.min.js
        //document.onreadystatechange();        
    });
</script>
<div>
	<div class="pure-g justify-content-center">
		<div class="pure-u-1">
			<div class="panel panel--small panel--centered m-b-30 text-center">
				<div class="m-b-15">
					<img
						class="izzi-logo m-b-15"
						src="/assets/img/logos/izzi-logo.svg"
						alt="izzi"
					/>
					<p class="fw-semibold m-b-0">
						Inicia sesión con tus credenciales izzi
					</p>
				</div>
				<div class="ctrl-holder m-b-15">
					<label for="login_user" class="placeholder"
						>Usuario</label
					>
					<input
						type="text"
						name="login_user"
						id="login_user"
						on:change={() => valExpresion(logIn.user)}
						bind:value={logIn.user}
					/>
				</div>
				<div class="ctrl-holder m-b-15">
					<label for="login_password" class="placeholder"
						>contraseña</label
					>
					<input
						type="password"
						name="login_password"
						id="login_password"
						required
						on:change={() => valExpresion(logIn.pass)}
						bind:value={logIn.pass}
					/>
				</div>
				<div>
					<div class="select-holder m-b-20">
						<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg>						
						<select name="" 
							bind:value={rptSelected}
							id="select">
							<option value="-1">Selecciona una ciudad</option>							
							{#await fetchCities}
								<Preloader/>
							{:then data }
								{#each data.response as item }									
									<option value="{item.rpt}">{item.name}</option>                    
								{/each}
							{:catch error}
								<p>An error occurred! {error}</p>
							{/await}
						</select>
					</div>
				</div>

				
				{#if hassInvalid == true}
					<div class="alert alert--error m-b-40">
						<p>Caracteres no permitidos</p>
					</div>
				{/if}
				<div class="m-b-15">
					<div class={!visible?'':'hide'}>
						<div class="text-center"><Preloader/></div>
					</div>
					<div class={visible?'':'hide'}>
						<button class="pure__button pure__button--primary" type="button" on:click={() => valContent()}>
							Iniciar sesión
						</button>
					</div>
				</div>
			</div>
			<div class="text-center m-t-20">
				{#if hassEmpty == true}
					<div class="alert">
						<p>Todos los campos son obligatorios</p>
					</div>
				{/if}
				{#if hassProblem == true}
					<div class="alert">
						<p>No pudimos realizar la consulta, intente más tarde</p>
					</div>
				{/if}
				{#if hassError == true}
					<div class="alert alert--error m-b-40">
						<p>
							Usuario o contraseña incorrectos, si necesita ayuda
							contáctese con Service Desk
						</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.alert{
		max-width: 424px;
		margin-left: auto;
		margin-right: auto;
	}
	.hide{
		display: none;
	}
</style>