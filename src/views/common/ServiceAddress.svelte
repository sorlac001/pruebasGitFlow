<script>
	import { navigate } from "svelte-routing";
	import { store } from "../../Store.svelte";
	import { onMount } from 'svelte';
	import AutoComplete from "simple-svelte-autocomplete";
	import { fetchMunicipality } from '../../clients/ClientMunicipality.svelte';
	import { fetchAddress } from '../../clients/ClientAdresses.svelte';
	import { fetchDataUser } from '../../clients/ClientCoverage.svelte';
	import Preloader from "../../components/Preloader.svelte";

	let validarCobertura = true;
	let visible = true;
	let disabled= ""; //disabled input Municipality
	let sub = ""; //suburb field before changing
	let st = ""; //street field before changing

	//data form
	let address = {
		postalCode: "",
		municipality: "",
		suburb: "",
		street: "",
		numOut: "",
		numInt: "",
		rpt : ""
	};
	let dataHolder = {
		pName: "",
		sName: "",
		aPaternal: "",
		aMaternal: "",
		mail: ""
	};
	let mailConfirm = "";

	const expressions = {
		name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
		text: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, 
		mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		postaleCode: /^[0-9]{5}$/
	};

	//flag's error
	let hassMailInvalid = false;
	let hassCPInvalid = false;
	let hassEmpty = false;
	let hassInvalid = false;
	let hassNoMatch = false;
	let badMail = "";
	let disable = false;
	let hassCPNotFound = false;
	let hassNameInvalid = false;
	let hassSecondNameInvalid = false;
	let hassAPatenalInvalid = false;
	let hassAMaternalInvalid = false;

	//field autocomplete
	let municipality = "";
	let addresses;
	let filterStreet = [];
	let filterNumber = [];
	let addressesList = {
		suburb:[],
		streets:[],
		numOuts:[],
		numInts:[],
		rpt:[]
	};

	//field coverage
	let flag;
	let fetchDataMail = Promise.resolve([]);
	
	async function validatePostalCode(arg){
		address.municipality = "";
		address.numOut = "";
		address.suburb = "";
		address.street = "";
		disabled = "";
		addressesList = {
				suburb:[],
				streets:[],
				numOuts:[],
				numInts:[],
				rpt:[]
			};
		if ((expressions.postaleCode.test(arg))){//validate only numbers
			await getMunicipality(arg);
			document.onreadystatechange();//evita que labels oculten la información de los inputs
			hassCPInvalid = false;
		}else{
			hassCPInvalid = false;
			if(arg != ""){
				hassCPInvalid = true;
			}
		}
	}

	async function getMunicipality(cp){
		municipality = await fetchMunicipality(cp);
		if(municipality.municipality != null){
			hassCPNotFound = false;
			address.municipality = municipality.municipality;
			getSuburbs();
			disabled = "disabled";
		}else{
			hassCPNotFound = true;
			disable = "";
		}
	}

	let suburbComplete = [];
	async function getSuburbs() {
		addresses = await fetchAddress(address);
		addressesList.suburb = addresses.response.colonias;
		suburbComplete = addressesList.suburb;
	}

	
	let newSub = "";
	function handleCreateSubur(newSuburb) {
		address.suburb = newSuburb;
		suburbComplete.unshift(newSuburb);
		suburbComplete = suburbComplete;
		return newSuburb;
	}

	async function reloadStreetList(){
		filterStreet = [];
		await filterStreets();
		sub = address.suburb;
		address.street = "";
		address.numOut = "";
	}

	let streetComplete = [];
	async function filterStreets(){
		filterStreet = await fetchAddress(address);
		streetComplete = filterStreet.response.calles;
	}

	//let textStreet = "";
	let test;
	function handleCreateStreet(newStreet) {
		address.street = newStreet;
		streetComplete.unshift(newStreet);
		streetComplete = streetComplete;
		return newStreet;
	}

	async function reloadNumExt(){
		numberComplete = [];
		filterNumber = [];
		await filterNumbers();
		document.onreadystatechange();
		st = address.street;
		address.numOut = "";
	}

	let numberComplete = [];
	async function filterNumbers() {
		filterNumber = await fetchAddress(address);
		numberComplete = filterNumber.response.numeros;
	}

	let text = "";
	function handleCreateNumber(newNumber) {
		address.numOut = newNumber;
		document.onreadystatechange();
		numberComplete.unshift(newNumber);
		numberComplete = numberComplete;
		return newNumber;
	}

	function validateMail(arg){
		if ((arg == dataHolder.mail || arg == mailConfirm) && arg != ""){
			if ((expressions.mail.test(arg))) {
				hassMailInvalid = false;
				badMail = "";
				if(dataHolder.mail != "" && mailConfirm != ""){
					compareMails(dataHolder.mail, mailConfirm)
				}
			} else {
				hassMailInvalid = true;
				badMail = arg;
			}
		}
	}

	function compareMails(mail, confirm){
		if(mail != confirm){
			hassNoMatch = true;
			mailConfirm = "";
		}else{
			hassNoMatch = false;
		}
	}

	function validateDataHolder(arg) {
		if(arg != "" && (expressions.name.test(arg))) {
			dataHolderNoErrors(arg);
		}else if(arg != ""){
			dataHolderErrors(arg);
		}
	}

	function dataHolderErrors(arg){
		switch (arg) {
			case dataHolder.aMaternal:
				hassAMaternalInvalid = true;
			break;
			case dataHolder.aPaternal:
				hassAPatenalInvalid = true
			break;
			case dataHolder.pName:
				hassNameInvalid = false;
			break;
			case dataHolder.sName:
				hassSecondNameInvalid = true;
			break;
			default:
				break;
		}
	}

	function dataHolderNoErrors(arg){
		switch (arg) {
			case dataHolder.aMaternal:
				hassAMaternalInvalid = false;
			break;
			case dataHolder.aPaternal:
				hassAPatenalInvalid = false;
			break;
			case dataHolder.pName:
				hassNameInvalid = false;
			break;
			case dataHolder.sName:
				hassSecondNameInvalid = false;
			break;
			default:
				break;
		}
	}

	function flagNegocios(){
		switch ($store.flags.izziType) {
			case "negocios":
				flag = true;
				break;
			case "residencial":
				flag = false;
				break;
			default:
				break;
		}
	};

	function validateTextField(arg) {
		hassInvalid = false;
		if ((expressions.text.test(arg)) && arg != "") {
			hassInvalid = false;
		} else if(arg != ""){
			hassInvalid = true;
		}
	}

	function goBack() {
		$store.flags.izziType = "";
		$store.address.service.street = "";
		navigate("/dashboard", { replace: false });
	}

	async function checkCoverage(){
		hassEmpty = true;
		if (validateFieldNoEmpty()){
			hassEmpty = false;
			if(hasNoErrors()){
				flagNegocios();
				validarCobertura = false;
				visible = false;
				fetchDataMail = await fetchDataUser(dataHolder, address, flag);
				console.log(fetchDataMail);
				addStore(address, dataHolder, fetchDataMail);
			}
		}
	}

	function validateFieldNoEmpty() {
		if (address.street != "" && address.postalCode != "" && address.suburb != "" && address.municipality != "" && address.numOut != "" && dataHolder.aPaternal != "" && dataHolder.aMaternal != "" && mailConfirm != "" && dataHolder.mail && dataHolder.pName != ""){
			return true;
		} else {
			return false;
		}
	}

	function hasNoErrors(){
		if(hassCPInvalid || hassEmpty || hassInvalid || hassNoMatch || hassNameInvalid || hassAMaternalInvalid || hassAPatenalInvalid || hassCPNotFound || hassMailInvalid){
			return false;
		}else{
			return true;
		}
	}

	function addStore(add, dataHolder, coverage) {
		$store.address.service.street = add.street;
		$store.address.service.postalCode = add.postalCode;
		$store.address.service.suburb = add.suburb;
		$store.address.service.municipality = add.municipality;
		$store.address.service.numOut = add.numOut;
		$store.address.service.numInt = add.numInt;

		$store.dataHolder.aPaternal = dataHolder.aPaternal;
		$store.dataHolder.aMaternal = dataHolder.aMaternal;
		$store.dataHolder.mail = dataHolder.mail;
		$store.dataHolder.pName = dataHolder.pName;
		$store.dataHolder.sName = dataHolder.sName;

		$store.coverage.service.coverage = coverage.cobertura;
		$store.coverage.service.state = coverage.estado;
		$store.internetProfiler.ftth = coverage.ftth;
		$store.coverage.service.hub = coverage.hub;
		$store.coverage.service.node = coverage.nod;
		$store.coverage.service.branch = coverage.rama;
		$store.address.service.rpt = coverage.rpt;
		$store.coverage.service.sipreId = coverage.sipreId;

		navigate('/internet-profiler', {replace: false});
	}

	function loadData(){
		address.rpt = $store.address.service.rpt;
		if($store.address.service.street != ""){
			address.postalCode = $store.address.service.postalCode;
			address.municipality = $store.address.service.municipality;
			address.suburb = $store.address.service.suburb;
			address.street = $store.address.service.street;
			address.numOut = $store.address.service.numOut;
			address.numInt = $store.address.service.numInt;
			dataHolder.aPaternal = $store.dataHolder.aPaternal;
			dataHolder.aMaternal = $store.dataHolder.aMaternal;
			dataHolder.mail = $store.dataHolder.mail;
			mailConfirm = $store.dataHolder.mail;
			dataHolder.pName = $store.dataHolder.pName;
			dataHolder.sName = $store.dataHolder.sName;
		}
		st = address.street;
		sub = address.suburb;
	}

	onMount(() => {
    	document.onreadystatechange();        
	});
</script>

<div>
	<div class="pure-g justify-content-center" on:load={loadData()}>
		<div>
			<div class="pure-g m-b-20">
				<div class="pure-u-1 pure-u-md-2-3 sm-m-b-20">
					<h3 class="text-fs-20">
						Solicita la <span class="fw-semibold">dirección de instalación</span> y los <span class="fw-semibold">datos del titular</span>
					</h3>
				</div>
				<div class="pure-u-1 pure-u-md-1-3 md-text-right">
					<div class={!visible?'':'hide'}>
						<div class="text-center"><Preloader/></div>
					</div>
				</div>
			</div>
			<div class="panel m-b-30">
				<div class={hassEmpty?'':'hide'}>
					<div class="alert">
						<p>Todos los campos son obligatorios</p>
					</div>
				</div>
				<div class={hassInvalid?'':'hide'}>
					<div class="alert alert--error m-b-40">
						<p>
							No se permiten caracteres especiales.
						</p>
					</div>
				</div>
				<div class={hassCPNotFound?'':'hide'}>
					<div class="alert alert--error m-b-40">
						<p>
							No existe el Código Postal {address.postalCode}
						</p>
					</div>
				</div>
				<div class={hassCPInvalid?'':'hide'}>
					<div class="alert alert--error m-b-40">
						<p>El código postal consta de 5 digitos númericos.</p>
					</div>
				</div>	
				<p class="fw-semibold">Dirección de instalación</p>
				<div class="pure-g align-items-center m-b-20">
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
							<label for="postaleCode" class="placeholder">Código postal</label>
							<input type="text" name="postaleCode" id="postaleCode" required
								bind:value={address.postalCode} on:input={() => validatePostalCode(address.postalCode)}/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
								<label for="municipality" class="placeholder">Delegación o municipio</label>
								<input type="text" name="municipality" id="municipality" pattern="" {disabled}
								bind:value={address.municipality} on:input={() => validateTextField(address.municipality)}/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
							{#if addressesList.suburb.length == 0}
								<label for="Suburb" class="placeholder">Colonia</label>
								<input type="text" name="Suburb" id="Suburb" required
									bind:value={address.suburb} on:input={() => validateTextField(address.suburb)}/>
							{/if}
							{#if addressesList.suburb.length != 0}
									<AutoComplete
									items={suburbComplete}
									placeholder="Colonias"
									labelFielName = "Suburb"
									ValueFielName = "Suburb"
									bind:selectedItem = {address.suburb}
									create = {true}
									bind:newSub
									createText = {'Colonia no encontrada, ¿deseas continuar? presiona enter'}
									onCreate = {handleCreateSubur}/>
							{/if}
						</div>
					</div>
					<div class="pure-u-1 {address.suburb?"pure-u-sm-1-2":"pure-u-sm-2-3"}">
						<div class="ctrl-holder m-b-20">
							{#if address.suburb != sub}
								<div on:load={reloadStreetList()}></div>
							{/if}
							{#if filterStreet.length == 0}
								<label for="street" class="placeholder">Calle</label>
								<input type="text" name="street" id="street" required
									bind:value={address.street} on:input={() => validateTextField(address.street)}/>
							{/if}
							{#if filterStreet.length != 0}
									<AutoComplete
									items={streetComplete}
									placeholder="Calles"
									labelFielName = "Street"
									ValueFielName = "Street"
									bind:selectedItem = {address.street}
									create = {true}
									bind:test
									createText = {'Calle no encontrada, ¿deseas continuar? presiona enter'}
									onCreate = {handleCreateStreet}/>	
							{/if}
						</div>
					</div>
					<div class="pure-u-1 {address.suburb?"pure-u-sm-1-4":"pure-u-sm-1-6"}">
						<div class="ctrl-holder m-b-20">
							{#if address.street != st}
								<div on:load={reloadNumExt()}></div>
							{/if}
							{#if filterNumber.length == 0}
								<div on:load={document.onreadystatechange()}></div>
								<label for="numOut" class="placeholder">No. Ext.</label>
								<input type="text" name="" id="numOut" required
									bind:value={address.numOut} on:input={() => validateTextField(address.numOut)}/>
							{/if}
							{#if filterNumber.length != 0}
								<AutoComplete
								items={numberComplete}
								placeholder="No. Ext"
								labelFielName = "numOut"
								ValueFielName = "numOut"
								bind:selectedItem={address.numOut}
								create = {true}
								bind:text
								createText = {'No. Ext. no encontrado, ¿deseas continuar? presiona enter'}
								onCreate = {handleCreateNumber}/>
							{/if}
						</div>
					</div>

					<div class="pure-u-1 {address.suburb?"pure-u-sm-1-4":"pure-u-sm-1-6"}">
						<div class="ctrl-holder m-b-20">
							<label for="numInt" class="placeholder">No. Int.</label>
							<input type="text" name="" id="numInt" required
								bind:value={address.numInt} on:input={() => validateTextField(address.numInt)}/>
						</div>
					</div>
				</div>
				<p class="fw-semibold">Datos del titular</p>
				<div class="pure-g align-items-center m-b-20">
					<div class="pure-u-1 pure-u-sm-2-2 {hassNameInvalid?'':'hide'}">
						<div class="alert alert--error m-b-40 ">
							<p>
								Solo se permiten letras en el nombre.
							</p>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-2-2 {hassSecondNameInvalid?'':'hide'}">
						<div class="alert alert--error m-b-40 ">
							<p>
								Solo se permiten letras en el segundo nombre.
							</p>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-2-2 {hassAPatenalInvalid?'':'hide'}">
						<div class="alert alert--error m-b-40 ">
							<p>
								Solo se permiten letras en el apellido paterno.
							</p>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-2-2 {hassAMaternalInvalid?'':'hide'}">
						<div class="alert alert--error m-b-40 ">
							<p>
								Solo se permiten letras en el apellido materno.
							</p>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
							<label for="pName" class="placeholder">Primer nombre</label>
							<input type="text" name="pName" id="pName" required
								bind:value={dataHolder.pName} on:input={() =>validateDataHolder(dataHolder.pName)}/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
							<label for="sName" class="placeholder">Segundo nombre</label>
							<input type="text" name="sName" id="sName" required
								bind:value={dataHolder.sName} on:input={() => validateDataHolder(dataHolder.sName)}/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
							<label for="aPaternal" class="placeholder">Apellido paterno</label>
							<input type="text" name="aPaternal" id="aPaternal" required
								bind:value={dataHolder.aPaternal} on:input={() => validateDataHolder(dataHolder.aPaternal)}
							/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
							<label for="aMaternal" class="placeholder">Apellido materno</label>
							<input type="text" name="aMaternal" id="aMaternal" required
								bind:value={dataHolder.aMaternal} on:input={() => validateDataHolder(dataHolder.aMaternal)}/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
							<label for="mail" class="placeholder">Correo electrónico</label>
							<input type="email" name="mail" id="mail" required
								bind:value={dataHolder.mail} on:input={() => validateMail(dataHolder.mail)}/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
							<label for="mail_confirm" class="placeholder">Confirmar correo electrónico</label>
							<input type="email" name="mail_confirm" id="mail_confirm" required
							bind:value={mailConfirm} on:change={() => validateMail(mailConfirm)}/>
						</div>
					</div>
				</div>
				<div class={hassNoMatch?'':'hide'}>
					<div class="alert alert--error m-b-40">
						<p>
							Los correos no coinciden.
						</p>
					</div>
				</div>
				<div class={hassMailInvalid?'':'hide'}>
					<div class="alert alert--error m-b-40">
						<p>
							El correo {badMail} no es una cuenta de correo valida.
						</p>
					</div>
				</div>
			</div>
			<div class="d-flex align-items-center justify-content-between">
				<a href="#/" class="back-link" on:click={() => goBack()}>
					<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"/></svg>
					<span>atrás</span>
				</a>
				<div class={validarCobertura?'':'aDisabled'}>
					<a href="#/" class="pure__button pure__button--primary"
					on:click={() => checkCoverage()}>Siguiente</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.hide{
		display: none;
	}
	input:disabled{
		background: #F5F6F8;
	}
	/*Disabled events for tags <a>*/
	.aDisabled{
		pointer-events: none;
		cursor: default;
		opacity: 0.6;
	}
</style>