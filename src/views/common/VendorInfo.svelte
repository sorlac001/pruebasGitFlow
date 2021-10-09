<script>
	import { navigate } from "svelte-routing";
	import { store } from "../../Store.svelte";
	import { onMount } from 'svelte';
	import Preloader from "../../components/Preloader.svelte";
	
	let comments;
	var today = new Date;
	$:visible = true;
	let validarCobertura = true;
	$store.vendorInfo.capturista = true;
	if($store.user.entryChannel.toUpperCase() != "CAPTURISTA"){
		$store.vendorInfo.idVendor = $store.user.idVendor;
        $store.vendorInfo.capturista = false;
		
		let month;
		if(today.getMonth() <= 8){
			month = "0"+ (today.getMonth()+1);
		}else{
			month = today.getMonth()+1;
		}
		$store.vendorInfo.folio = $store.vendorInfo.idVendor+today.getFullYear() + "" + month +
		 "" + today.getDate() + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
		$store.vendorInfo.date = month + "/" + today.getDate() + "/" + today.getFullYear();
        
		$store.vendorInfo.comments = ($store.user.entryChannel.trim() +  " Cel " + $store.dataHolder.celPhone.trim() + " DIR " + 
		$store.address.service.postalCode.trim() + ", " + $store.address.service.municipality.trim() + ", " +
		$store.address.service.suburb.trim() + ", " + $store.address.service.street.trim() + ", " + $store.address.service.numOut.trim() + 
		(($store.dataHolder.rfc != "")?(", " + $store.dataHolder.rfc.trim()):'')).replaceAll(" +", " ");
		($store.vendorInfo.comments.length >= 99)? $store.vendorInfo.comments = $store.vendorInfo.comments.substring(0,99):'';
		
		$store.vendorInfo.channel = $store.user.entryChannel;
		navigate("/purchase-summary", { replace: false });
	}
	
	let goBack = () =>{
        if($store.cart.izziMovil.imei != "")
            navigate("/delivery-type", { replace: false });
        else
            navigate("/verification-code", { replace: false });
    };

	let empty;
	let noEmpty = () =>{
		empty = true;
		if ($store.vendorInfo.channel != "" && $store.vendorInfo.comments != "" && 
		$store.vendorInfo.date != "" && $store.vendorInfo.folio != "" && $store.vendorInfo.idVendor != "") {
			empty = false;
			navigate("/purchase-summary", { replace: false });
		}
	};

	let dateVendor = "";
	let dataError = false;
	function parseData(date){
		let month = today.getMonth();
		if(today.getMonth() <= 8){
			month = "0"+ (today.getMonth()+1);
		}else{
			month = today.getMonth()+1;
		}
		let maxDate = today.getFullYear() + "" + month + "" + today.getDate();
		dataError = true;
		if(date.split("-").join("") <= maxDate){
			dataError = false;
			$store.vendorInfo.date = date.split("-")[1]+"/"+date.split("-")[2]+"/"+date.split("-")[0];
			console.log(date);
		}
	}

	function addComment(com) {
		if(com != ""){
			$store.vendorInfo.comments = ($store.vendorInfo.channel.trim() + " Cel " + $store.dataHolder.celPhone.trim() + " DIR " + 
			$store.address.service.postalCode.trim() + ", " + $store.address.service.municipality.trim() + ", " + 
			$store.address.service.suburb.trim() + ", " + $store.address.service.street.trim() + ", " + 
			$store.address.service.numOut.trim() + ", " + (($store.dataHolder.rfc != "")?(", " + $store.dataHolder.rfc.trim()):'')).replaceAll(" +", " ");
			($store.vendorInfo.comments.length >= 99)? $store.vendorInfo.comments = $store.vendorInfo.comments.substring(0,99):'';
		
			if($store.address.service.reference == ""){
				console.log("referencia vacia");
				$store.address.service.reference = $store.vendorInfo.comments;
			}
			console.log("referencia con comentarios");
			$store.address.service.reference = $store.address.service.reference + " " + com;
		}
	}

	onMount(() => {
    	document.onreadystatechange();        
	});
</script>

<div>
	<div class="pure-g justify-content-center">
		<div class={!visible?'':'hide'}>
			<div class="text-center"><Preloader/></div>
		</div>
		<div class={visible?'':'hide'}>
			<div class="pure-g m-b-20">
				<div class="pure-u-1 pure-u-md-2-3 sm-m-b-20">
					<h3 class="text-fs-20">
						Ingresa los datos del vendedor
					</h3>
				</div>
			</div>
			<div class="pure-g m-b-20">
				<div class="panel m-b-20">
					<div class="pure-u-1 pure-u-sm-2-2 {empty?'':'hide'}">
						<div class="alert alert--error m-b-40">
							<p>
								Todos los campos son obligatorios.
							</p>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-2-2 {dataError?'':'hide'}">
						<div class="alert alert--error m-b-40">
							<p>
								La fecha no puede ser posterior al día de hoy.
							</p>
						</div>
					</div>
					<p class="fw-semibold">Usuario</p>
					<div class="pure-g align-items-center m-b-20">
						<div class="pure-u-1 pure-u-sm-1-3">
							<p class="fw-semibold m-b-0">Nombre</p>
							<p>{$store.user.name}</p>
						</div>
						<div class="pure-u-1 pure-u-sm-1-3">
							<p class="fw-semibold m-b-0">Id usuario</p>
							<p>{$store.user.name}</p>
						</div>
						<div class="pure-u-1 pure-u-sm-1-6">
							<div class="ctrl-holder m-b-20">
								<label for="folio" class="placeholder">Folio</label>
								<input type="text" name="folio" id="folio" required 
								bind:value={$store.vendorInfo.folio}/>
							</div>
						</div>
						<div class="pure-u-1 pure-u-sm-1-6">
							<div class="ctrl-holder m-b-20">
								<label for="date" class="placeholder">Fecha</label>
								<input type="date" name="date" id="date" required
								bind:value={dateVendor} on:input={()=>parseData(dateVendor)}/>
							</div>
						</div>
					</div>
					<p class="fw-semibold"></p>
					<div class="pure-g aling-items-center m-b-20">
						<div class="pure-u-1 pure-u-sm-1-3">	
							<div class="ctrl-holder m-b-20">
								<label for="idVendor" class="placeholder">Id vendedor</label>
								<input type="text" name="idVendor" id="idVendor" required
									bind:value={$store.vendorInfo.idVendor}/>
							</div>
						</div>
						<div class="pure-u-1 pure-u-sm-1-3">
							<div class="select-holder m-b-20">
								<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg>
								<label for="chanelEntry" class="hidden-label">Selecciona el giro de tú negocio</label>
								<select name="chanelEntry" id="chanelEntry" bind:value={$store.vendorInfo.channel}>
									<option value="">Selecciona el giro de tú negocio</option>
									<option value="Cambaceo">Cambaceo</option>
									<option value="CC Inbound">CC Inbound</option>
									<option value="CC One Contact">CC One Contact</option>
									<option value="CC Outbound">CC Outbound</option>
									<option value="Distribuidor">Distribuidor</option>
									<option value="Modulo">Modulo</option>
									<option value="Sucursal">Sucursal</option>
									<option value="Otros">Otros</option>
								</select>
							</div>
						</div>
						<div class="pure-u-1 pure-u-sm-1-3">
							<div class="ctrl-holder m-b-20">
								<label for="comment" class="placeholder">Comentarios</label>
								<input type="text" name="comment" id="comment" required
									bind:value={comments} on:change={()=>addComment(comments)}/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="d-flex align-items-center justify-content-between">
				<a href="#/" class="back-link" on:click={goBack}>
					<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"/></svg>
					<span>atrás</span>
				</a>
				<div class={validarCobertura?'':'aDisabled'}>
					<a href="#/" class="pure__button pure__button--primary" on:click={noEmpty}>Siguiente</a>
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