<script>
	import { store } from "../../Store.svelte";
	import { navigate } from "svelte-routing";

	let user = {
		username : '',
		password : '',
		ciudad   : '',
	};

	$:isEmptyUser = false;
	$:isEmptyPassword = false;
	$:isGoodUser = true;
	$:isGoodPassword = true;

	const regularExpressions = /^[a-zA-Z0-9\s]{1,10}$/;

	function SignIn(username, password, ciudad){
		
		if(username == ""){
			isEmptyUser = true;
		}
		if(password == ""){
			isEmptyPassword = true;
		}

		if(!isEmptyUser && !isEmptyPassword){
			if(isGoodUser && isGoodPassword){
				console.log("Ya iniciaste sesión :) "+username+" "+password+" "+ciudad);
				$store.user.name=user.username;
				$store.user.token=user.password;
				$store.address.rpt="000";
				navigate("/dashboard", { replace: false });
			}
		}
	}

/*
	function ValidationContent(){
		if(isGoodUser || isGoodPassword){
			return false;
		}
	};
*/

	let FilterPassword = () => {
		if(user.password != ""){
			isGoodPassword = regularExpressions.test(user.password);
			isEmptyPassword = false;
		} else {
			isGoodPassword = true;
		}
	}

	let FilterUser = () => {
		if(user.username != ""){
			isGoodUser = regularExpressions.test(user.username);
			isEmptyUser = false;
		} else {
			isGoodUser = true;
		}
	}

</script>
<div>
	<div class="pure-g justify-content-center">
		<div class="pure-u-1">
			<div class="panel panel--small panel--centered m-b-30 text-center">
				<div class="m-b-15">
					<img class="izzi-logo m-b-15" src="/assets/img/logos/izzi-logo.svg" alt="izzi"/>
					<p class="fw-semibold m-b-0">
						Inicia sesión con tus credenciales izzi
					</p>
				</div>
				<div class="ctrl-holder m-b-15">
					<label for="user" class="placeholder">Usuario</label>
					<input type="text" name="user" id="user" bind:value={user.username} on:input={FilterUser}/>
				</div>

				<div class="alert alert--error m-b-40 {isGoodUser ? "hide" : ""}"><p>Usuario no válido</p></div>
				{#if isEmptyUser}
					<div class="alert alert--error m-b-40 "><p>Introduzca un nombre de Usuario por favor</p></div>
				{/if}
				

				<div class="ctrl-holder m-b-15">
					<label for="password" class="placeholder">Contraseña</label>
					<input type="password" name="password" id="password"  required bind:value={user.password} on:input={
						FilterPassword}/>
				</div>
				
				<div class="alert alert--error m-b-40 {isGoodPassword ? "hide" : ""}"><p>Contraseña no válida</p></div>

				{#if isEmptyPassword}
					<div class="alert alert--error m-b-40 "><p>Introduzca una contraseña por favor</p></div>
				{/if}
		
				<div>
					<div class="select-holder m-b-20"><svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg> 				
						<select name="ciudades" id="select" bind:value={user.ciudad}>
							<option value="-1">Seleccione una ciudad</option>
							<option value="1">CDMX</option>
							<option value="2">Guadalajara</option>
							<option value="3">Monterrey</option>
						</select>
					</div>
				</div>
			</div>
			<div class="pure-u-1 pure-u-sm-1-2 pure-u-sm-offset-1-4">
				<div class="text-center">
					<p class="fw-semibold"><a href="#/" class="primary-text">Recuperar contraseña</a></p> 
				<button class="pure__button pure__button--primary" type="button" 
				on:click={
					() =>  
						SignIn(user.username, user.password, user.ciudad)
					}
				>Iniciar Sesion</button>
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