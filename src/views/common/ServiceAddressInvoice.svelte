<script>
	import { navigate } from "svelte-routing";
	import { store } from "../../Store.svelte";
	import { onMount } from 'svelte';
	import AutoComplete from "simple-svelte-autocomplete";
	import { fetchMunicipality } from '../../clients/ClientMunicipality.svelte';
	import { fetchAddress } from '../../clients/ClientAdresses.svelte';
	import { fetchDataUser } from '../../clients/ClientCoverage.svelte';

	let disabledInputMunicipality = false;

	let flags = {
		invoice: false,
		moralPerson: false,
		americanAdditionalPhone:false,
		americanCelPhone:false,
	}; 

	let flagcoverage = false;

	if($store.flags.izziType == "negocios"){
		flagcoverage = true;
	}
	//datos del formulario
	let address = {
		service:{ //dirección de instalación
			postalCode: "",
			municipality: "",
			suburb: "",
			street: "",
			numOut: "",
			numInt: "",
			rpt : "",
			housing: "",
			betweenStreet1: "",
			betweenStreet2: "",
			reference:""	
		},
		invoice : { //dirección de facturación
			postalCode: "",
			municipality: "",
			suburb: "",
			street: "",
			numOut: "",
			numInt: "",
			rpt : "",
			state: ""
		}
	};
	let dataHolder = { //datos del usuario
		pName: "",
		sName: "",
		aPaternal: "",
		aMaternal: "",
		mail: "",
		adittionalPhone: "",
		celPhone: "",
		rfc:""
	};
	
	let business = {
		activity : null,
		name : null
	}

	
	//validación de fomulario
	const expressions = {
		text: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/,
		postalCode: /^[0-9]{5}$/,
		phone: /^[0-9]{10}$/,
		rfc: /^([a-zA-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([a-zA-Z\d]{2})([aA\d])$/

	};
	let errors={
		hasserviceInvalid : false,
		hasServiceNumIntInvalid : false,
		hasServiceHousingInvalid : false,
		hasServiceStreet1Invalid : false,
		hasServiceStreet2Invalid : false,
		hasServiceReferenceInvalid : false,

		hasInvalidInvoice : false,
		hasCPInvoiceInvalid : false,
		hasCPNotFound : false,
		hasSuburbInvoiceInvalid : false,
		hasStreetInvoiceInvalid : false,
		hasNumOutInvoiceInvalid : false,
		hasNumIntInvoiceInvalid : false,
		hasMunicipalityInvoiceInvalid : false,

		hasEmptyData : false,
		hasInvalidData : false,
		hasRFCInvalid : false,
		hasPhoneInvalid : false,
		hasAditionalPhoneInvalid: false,
		hasSameNumber : false,

		hasBusinessEmpty : false,
		hasBusinessEmptyMoral :false,
		hasEmptyBusinessName : false,
		hasEmeptyBusinessActivity : false,
		hasInvalidBusinessName : false
	}
	
	//autocomplete
	let municipality = "";
	let addresses = {};
	let suburbs= [];

	//promise cobertura
	let fetchData = Promise.resolve([]);

	onMount(() => {
		// enable functions for main.min.js
    	document.onreadystatechange();
		window.scrollTo(0,0);        
	});

	function goBack() {
		navigate("/addons", { replace: false });
	}

	function loadData(){
		if($store.address.service.street != ""){
			address.service = $store.address.service;
			dataHolder.aPaternal = $store.dataHolder.aPaternal;
			dataHolder.aMaternal = $store.dataHolder.aMaternal;
			dataHolder.mail = $store.dataHolder.mail;
			dataHolder.pName = $store.dataHolder.pName;
			dataHolder.sName = $store.dataHolder.sName;
			flags.invoice = $store.flags.invoice;
		}
	}

	async function validatePostalCode(arg){
		address.invoice.municipality = "";
		address.invoice.numOut = "";
		address.invoice.suburb = "";
		address.invoice.street = "";
		disabledInputMunicipality = "";
		suburbs = [];
		errors.hasCPInvoiceInvalid = false;
		if ((expressions.postalCode.test(arg)) && arg != ""){
			await getMunicipality(arg);
			document.onreadystatechange();//evita que labels oculten la información de los inputs
		}else if(arg != ""){
			errors.hasCPInvoiceInvalid = true;
		}
	}

	async function getMunicipality(cp){ //delegación o municipio por el CP
		municipality = await fetchMunicipality(cp);
		if(municipality.municipality != null){
			errors.hasCPNotFound = false;
			address.invoice.municipality = municipality.municipality;
			getSuburbs(address.invoice.postalCode, address.invoice.municipality);
			disabledInputMunicipality = true;
		}else{
			errors.hasCPNotFound = true;
			disabledInputMunicipality = false;
		}
	}

	async function getSuburbs(cp, municipality) { //lista de colonias por delegación o municipio
		addresses = await fetchAddress(cp, municipality);
		for (let i = 0; i < addresses.addresses.length; i++) {
			suburbs[i] = addresses.addresses[i].colonia;
		}
		address.invoice.state = address.state[0];
		
	}

	function validateText(arg){
		removeInvalid(arg);
		if ((expressions.text.test(arg)) && arg != "") {
			removeInvalid(arg);
		}else if(arg != ""){
			addInvalid(arg);
		}
	}

	function removeInvalid(arg){
		switch (arg) {
			case address.service.numInt:
				errors.hasServiceNumIntInvalid = false;
				break;
			case address.service.housing:
				errors.hasServiceHousingInvalid = false;
				break;
			case address.service.reference:
				errors.hasServiceReferenceInvalid = false;
				break;
			case address.service.betweenStreet1:
				errors.hasServiceStreet1Invalid = false;
				break;
			case address.service.betweenStreet2:
				errors.hasServiceStreet2Invalid = false;
				break;
			case address.invoice.numInt:
				errors.hasNumIntInvoiceInvalid = false;
				break;
			case address.invoice.numOut:
				errors.hasNumOutInvoiceInvalid = false;
				break;
			case address.invoice.street:
				errors.hasStreetInvoiceInvalid = false;
				break;
			case address.invoice.suburb:
				errors.hasSuburbInvoiceInvalid = false;
				break;
			case address.invoice.municipality:
				errors.hasMunicipalityInvoiceInvalid = false;
				break;
			case business.name:
				errors.hassInvalidBusinessName = false;
				break;
		}
	}

	function addInvalid(arg){
		switch (arg) {
			case address.service.numInt:
				errors.hasServiceNumIntInvalid = true;
				break;
			case address.service.housing:
				errors.hasServiceHousingInvalid = true;
				break;
			case address.service.reference:
				errors.hasServiceReferenceInvalid = true;
				break;
			case address.service.betweenStreet1:
				errors.hasServiceStreet1Invalid = true;
				break;
			case address.service.betweenStreet2:
				errors.hasServiceStreet2Invalid = true;
				break;
			case address.invoice.numInt:
				errors.hasNumIntInvoiceInvalid = true;
				break;
			case address.invoice.numOut:
				errors.hasNumOutInvoiceInvalid = true;
				break;
			case address.invoice.street:
				errors.hasStreetInvoiceInvalid = true;
				break;
			case address.invoice.suburb:
				errors.hasSuburbInvoiceInvalid = true;
				break;
			case address.invoice.municipality:
				errors.hasMunicipalityInvoiceInvalid = true;
				break;
			case business.name:
				errors.hassInvalidBusinessName = true;
				break;
		}
	}

	function validateAditionalPhone(phone) {
		errors.hasAditionalPhoneInvalid = false;
		if(phone != "" && (expressions.phone.test(phone))){
			errors.hasAditionalPhoneInvalid = false;
			
			errors.hasSameNumber = false;
			if(dataHolder.celPhone == phone){
				errors.hasSameNumber = true;
				dataHolder.adittionalPhone = "";
			}
		}else if(phone != ""){
			errors.hasAditionalPhoneInvalid = true;
		}
	}

	function validatePhone(phone) {
		errors.hasPhoneInvalid = false;
		
		if(phone != "" && (expressions.phone.test(phone))){
			errors.hasPhoneInvalid = false;
			
			errors.hasSameNumber = false;
			if(dataHolder.adittionalPhone == phone){
				errors.hasSameNumber = true;
				dataHolder.adittionalPhone = "";
			}
		}else if(phone != ""){
			errors.hasPhoneInvalid = true;
		}
	}

	function validateRFC(arg){
		errors.hasRFCInvalid = false;
		if (arg != "" && (expressions.rfc.test(arg))) {
			dataHolder.rfc = arg.toUpperCase();
			errors.hasRFCInvalid = false;
		} else if(arg != ""){
			errors.hasRFCInvalid = true;
		}
	}

	async function valContent() {
		if(flags.invoice){
			if (address.invoice.municipality != "" && address.invoice.numOut !="" && address.invoice.postalCode != "" &&
				address.invoice.street !="" && address.invoice.suburb !="" && dataHolder.rfc != ""){
					
				errors.hasEmptyInvoice = false;
				if(dataHolder.celPhone != ""){
					errors.hasEmptyData = false;
					if ($store.flags.izziType == "negocios") {
						if(business.activity != null){
							errors.hasEmeptyBusinessActivity = false;
							if(flags.moralPerson){
								if (business.name != null) {
									errors.hasEmptyBusinessName = false;
									fetchData = await fetchDataUser(dataHolder, address.invoice, flagcoverage);
									addStore(address ,dataHolder, fetchData, business);
								}else{
									errors.hasEmptyBusinessName = true;
								}
							}else{	
								fetchData = await fetchDataUser(dataHolder, address.invoice, flagcoverage);
								addStore(address ,dataHolder, fetchData, business);
							}
						}else{
							errors.hasEmeptyBusinessActivity = true;
						}
					} else {
						fetchData = await fetchDataUser(dataHolder, address.invoice, flagcoverage);
						let b = "";
						addStore(address ,dataHolder, fetchData, b);	
					}
				}else{
					errors.hasEmptyData = true;
				}
			} else {
				errors.hasEmptyInvoice = true;
			}
		}else{
			errors.hasEmptyInvoice = false;
			if(dataHolder.celPhone != ""){
				errors.hasEmptyData = false;
				if ($store.flags.izziType == "negocios") {
					if(business.activity != null){
						errors.hasEmeptyBusinessActivity = false;
						if(flags.moralPerson){
							if (business.name !=null) {
								errors.hasEmptyBusinessName = false;
								fetchData = "";
								addStore(address ,dataHolder, fetchData, business);
							}else{
								errors.hasEmptyBusinessName = true;
							}
						}else{
							fetchData = "";
							addStore(address ,dataHolder, fetchData, business);
						}
					}else{
						errors.hasEmeptyBusinessActivity = true;
					}
				} else {
					fetchData = "";
					let b = "";
					addStore(address ,dataHolder, fetchData, b);	
				}
			}else{
				errors.hasEmptyData = true;
			}
		}
	}

	function addStore(add, data, coverage, b) {	
		if(coverage !=""){
			$store.coverage.invoice.state = coverage.estado;
			$store.address.invoice.street = add.invoice.street;
			$store.address.invoice.postalCode = add.invoice.postalCode;
			$store.address.invoice.suburb = add.invoice.suburb;
			$store.address.invoice.municipality = add.invoice.municipality;
			$store.address.invoice.numOut = add.invoice.numOut;
			$store.address.invoice.numInt = add.invoice.numInt;
		}
		if (b !="") {
			$store.dataHolder.businessActivity = b.activity;
			$store.dataHolder.businessName = b.name;
		}

		if (data.celPhone != "" && flags.americanCelPhone) {
			$store.flags.americanCelPhone = true;	
		}else{
			$store.flags.americanCelPhone = false;
		}
		if (data.adittionalPhone != "" && flags.americanAdditionalPhone) {
			$store.flags.americanAdditionalPhone = true;	
		}else{
			$store.flags.americanAdditionalPhone = false;	
		}
		
		$store.address.service.numInt = add.service.numInt;
		$store.address.service.housing = add.service.housing;
		$store.address.service.reference = add.service.reference;
		$store.address.service.betweenStreet1 = add.service.betweenStreet1;
		$store.address.service.betweenStreet2 = add.service.betweenStreet2;

		$store.dataHolder.celPhone = data.celPhone;
		$store.dataHolder.adittionalPhone = data.adittionalPhone;
		$store.dataHolder.rfc = data.rfc.toUpperCase();
		
		navigate('/verification-code', {replace: false});
	}
</script>

<div>
	<div class="pure-g justify-content-center" on:load={loadData()}>
		<div class="pure-g m-b-20">
			<div class="pure-u-1 pure-u-md-2-3 sm-m-b-20">
				<h3 class="text-fs-20 m-t-10">
					Completa los datos del titular
				</h3>
			</div>
		</div>
		<div class="panel m-b-30">
			<div class={errors.hasServiceNumIntInvalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Solo se permiten caracteres alfanuméricos para el campo Num. Int.
					</p>
				</div>
			</div>
			<div class={errors.hasServiceHousingInvalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Solo se permiten caracteres alfanuméricos para el campo Unidad Habitacional.
					</p>
				</div>
			</div>
			<div class={errors.hasServiceStreet1Invalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Solo se permiten caracteres alfanuméricos para el campo Calle 1.
					</p>
				</div>
			</div>
			<div class={errors.hasServiceStreet2Invalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Solo se permiten caracteres alfanuméricos para el campo Calle 2.
					</p>
				</div>
			</div>
			<div class={errors.hasServiceReferenceInvalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Solo se permiten caracteres alfanuméricos para el campo Referencia.
					</p>
				</div>
			</div>
			<div class={errors.hasserviceInvalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Para continuar corrija los campos con caracteres no permitidos.
					</p>
				</div>
			</div>

			<p class="fw-semibold">Dirección de instalación</p>
			<div class="pure-g align-items-center m-b-20">
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="postaleCode" class="placeholder disabled">Código postal</label>
						<input type="text" name="postaleCode" id="postaleCode" pattern="[0-9]+" required disabled
							bind:value={address.service.postalCode}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="municipality" class="placeholder disabled">Delegación o municipio</label>
						<input type="text" name="municipality" id="municipality" pattern="" required disabled
						bind:value={address.service.municipality}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="Suburb" class="placeholder disabled">Colonia</label>
						<input type="text" name="Suburb" id="Suburb" required disabled
						bind:value={address.service.suburb} />
					</div>
				</div>

				<div class="pure-u-1 pure-u-sm-2-3">
					<div class="ctrl-holder m-b-20">
						<label for="street" class="placeholder disabled">Calle</label>
						<input type="text" name="street" id="street" required disabled
							bind:value={address.service.street}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-6">
					<div class="ctrl-holder m-b-20">
						<label for="numOut" class="placeholder disabled">No. Ext.</label>
						<input type="text" name="numOut" id="numOut" required disabled
							bind:value={address.service.numOut} />
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-6">
					<div class="ctrl-holder m-b-20">
						<label for="numInt" class="placeholder disabled">No. Int.</label>
						<input type="text" name="numInt" id="numInt"  
							bind:value={address.service.numInt} on:input={() => validateText(address.service.numInt)}/>
					</div>
				</div>
				<div class="pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="housing" class="placeholder disabled">Unidad Habitacional</label>
						<input type="text" name="housing" id="housing"  
							bind:value={address.service.housing} on:input={() => validateText(address.service.housing)}/>
					</div>
				</div>
				<div class="pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="betweenStreet1" class="placeholder disabled">Entre Calle 1</label>
						<input type="text" name="betweenStreet1" id="betweenStreet1" required 
							bind:value={address.service.betweenStreet1} on:input={() => validateText(address.service.betweenStreet1)}/>
					</div>
				</div>
				<div class="pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="betweenStreet2" class="placeholder disabled">Entre Calle 2</label>
						<input type="text" name="betweenStreet2" id="betweenStreet2" required 
							bind:value={address.service.betweenStreet2} on:input={() => validateText(address.service.betweenStreet2)}/>
					</div>
				</div>
				<div class="pure-u-sm-1-1">
					<div class="ctrl-holder m-b-20">
						<label for="reference" class="placeholder disabled">Referencia</label>
						<input type="text" name="reference" id="reference" 
							bind:value={address.service.reference} on:input={() => validateText(address.service.reference)}/>
					</div>
				</div>
			</div>

			<div class="pure-g">
				<div class="pure-u-5-6">
					<span class="fw-semibold">¿Desea facturar con otra dirección?</span>
				</div>
				<div class="pure-u-1-6">
					<span class="checkbox-switch">
						<input type="checkbox" name="invoice" id="invoice" bind:checked={flags.invoice}>
						<label for="invoice"></label>
					</span>
				</div>
			</div>
			{#if !flags.invoice}
				<hr class="m-t-20 m-b-20"/>
			{/if}
			{#if flags.invoice}
			<div class={errors.hasEmptyInvoice?'':'hide'}>
				<div class="alert">
					<p>Todos los campos con * son obligatorios</p>
				</div>
			</div>
			<div class={errors.hasCPInvoiceInvalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>El código postal consta de 5 digitos númericos.</p>
				</div>
			</div>
			<div class={errors.hasCPNotFound?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>No existe el Código Postal {address.invoice.postalCode}.</p>
				</div>
			</div>
			<div class={errors.hasMunicipalityInvoiceInvalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Solo se permiten caracteres alfanuméricos para el campo Delegación o municipio.
					</p>
				</div>
			</div>
			<div class={errors.hasSuburbInvoiceInvalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Solo se permiten caracteres alfanuméricos para el campo colonia.
					</p>
				</div>
			</div>
			<div class={errors.hasStreetInvoiceInvalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Solo se permiten caracteres alfanuméricos para el campo Calle.
					</p>
				</div>
			</div>
			<div class={errors.hasNumOutInvoiceInvalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Solo se permiten caracteres alfanuméricos para el campo No. Ext.
					</p>
				</div>
			</div>
			<div class={errors.hasNumIntInvoiceInvalid?'':'hide'}>
				<div class="alert alert--error m-b-40">
					<p>
						Solo se permiten caracteres alfanuméricos para el campo No. Int.
					</p>
				</div>
			</div>
				<div class="pure-g align-items-center m-t-20 m-b-20" on:load={document.onreadystatechange()}>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
							<label for="postaleCodeInvoice" class="placeholder">Código postal *</label>
							<input type="text" name="postaleCodeInvoice" id="postaleCodeInvoice" pattern="[0-9]+" required
								bind:value={address.invoice.postalCode} on:input={() => validatePostalCode(address.invoice.postalCode)}/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
								<label for="municipalityInvoice" class="placeholder">Delegación o municipio *</label>
								<input type="text" name="municipalityInvoice" id="municipalityInvoice" pattern="" required disabled={disabledInputMunicipality}
								bind:value={address.invoice.municipality} on:input={() => validateText(address.invoice.municipality)}/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-3">
						<div class="ctrl-holder m-b-20">
							{#if suburbs.length == 0}
								<label for="SuburbInvoice" class="placeholder">Colonia *</label>
								<input type="text" name="SuburbInvoice" id="SuburbInvoice" required 
								bind:value={address.invoice.suburb} on:input={() => validateText(address.invoice.suburb)}/>
							{/if}
							{#if suburbs.length != 0}
								<div></div>
									<AutoComplete
									items={suburbs.filter((item, index)=>{
										return suburbs.indexOf(item) === index;
									})}
									placeholder="Colonias *"
									labelFielName = "Suburb"
									ValueFielName = "Suburb"
									bind:selectedItem={address.invoice.suburb}/>
							{/if}
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-2-3">
						<div class="ctrl-holder m-b-20">
								<label for="streetInvoice" class="placeholder">Calle *</label>
								<input type="text" name="streetInvoice" id="streetInvoice" required 
									bind:value={address.invoice.street} on:input={() => validateText(address.invoice.street)}/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-6">
						<div class="ctrl-holder m-b-20">
								<label for="numOutInvoice" class="placeholder">No. Ext. *</label>
								<input type="text" name="numOutInvoice" id="numOutInvoice" required 
									bind:value={address.invoice.numOut} on:input={() => validateText(address.invoice.numOut)}/>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-6">
						<div class="ctrl-holder m-b-20">
							<label for="numIntInvoice" class="placeholder">No. Int.</label>
							<input type="text" name="numIntInvoice" id="numIntInvoice" 
								bind:value={address.invoice.numInt} on:input={() => validateText(address.invoice.numInt)}/>
						</div>
					</div>
				</div>
			{/if}				
			
			<p class="fw-semibold">Datos del titular</p>
			<div class={errors.hasEmptyData?'':'hide'}>
				<div class="alert">
					<p>El campo Teléfono celular es obligatorio</p>
				</div>
			</div>
			<div class="pure-g align-items-center m-b-20">
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="pName" class="placeholder disabled">Primer nombre</label>
						<input type="text" name="pName" id="pName" required disabled
							bind:value={dataHolder.pName}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="sName" class="placeholder disabled">Segundo nombre</label>
						<input type="text" name="sName" id="sName" required disabled
							bind:value={dataHolder.sName} />
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="aPaternal" class="placeholder disabled">Apellido paterno</label>
						<input type="text" name="aPaternal" id="aPaternal" required disabled
							bind:value={dataHolder.aPaternal}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="aMaternal" class="placeholder disabled">Apellido materno</label>
						<input type="text" name="aMaternal" id="aMaternal" required disabled
							bind:value={dataHolder.aMaternal}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="mail" class="placeholder disabled">Correo electrónico</label>
						<input type="email" name="mail" id="mail" required
							bind:value={dataHolder.mail} disabled/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="rfc" class="placeholder disabled">RFC {flags.invoice?'*':''}</label>
						<input type="text" name="rfc" id="rfc" required 
						bind:value={dataHolder.rfc} on:input={() => validateRFC(dataHolder.rfc)}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-2-2 {errors.hasAditionalPhoneInvalid?'':'hide'}">
					<div class="alert alert--error m-b-40">
						<p>El telefono adicional consta de 10 digitos numéricos</p>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-2-2 {errors.hasPhoneInvalid?'':'hide'}">
					<div class="alert alert--error m-b-40">
						<p>El telefono consta de 10 digitos numéricos</p>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-2-2 {errors.hasSameNumber?'':'hide'}">
					<div class="alert alert--error m-b-40">
						<p>El teléfono celular y adicional no pueden ser iguales</p>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="celPhone" class="placeholder disabled">Teléfono celular *</label>
						<input type="text" name="celPhone" id="celPhone" required 
						bind:value={dataHolder.celPhone} on:input={() => validatePhone(dataHolder.celPhone)}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="ctrl-holder m-b-20">
						<label for="adittionalPhone" class="placeholder disabled">Celular adicional</label>
						<input type="text" name="adittionalPhone" id="adittionalPhone" required 
						bind:value={dataHolder.adittionalPhone} on:input={() => validateAditionalPhone(dataHolder.adittionalPhone)}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3"></div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="pure-g">
						<div class="pure-u-2-3">
							<span class="">Teléfono americano</span>
						</div>
						<div class="pure-u-1-3">
							<span class="checkbox-switch">
								<input type="checkbox" name="celPhoneFlag" id="celPhoneFlag" bind:checked={flags.americanCelPhone}>
								<label for="celPhoneFlag"></label>
							</span>
						</div>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-3">
					<div class="pure-g">
						<div class="pure-u-2-3">
							<span class="">Teléfono americano</span>
						</div>
						<div class="pure-u-1-3">
							<span class="checkbox-switch">
								<input type="checkbox" name="additionalPhoneFlag" id="additionalPhoneFlag" bind:checked={flags.americanAdditionalPhone}>
								<label for="additionalPhoneFlag"></label>
							</span>
						</div>
					</div>
				</div>
				<div class="alert alert--error m-b-40 {errors.hasRFCInvalid?'':'hide'}">
					<p>
						El RFC se conforma de 4 letras 6 números y 3 letras y/o números ejemplo GAMC9008094HA
					</p>
				</div>
			</div>
			{#if $store.flags.izziType == "negocios"}
			<p class="fw-semibold">Captura los datos de tu negocio</p>
			<div class="pure-g align-items-center m-b-20">
				
				<div class="pure-u-1 pure-u-2-2">
					<div class="alert alert--error m-b-40 {errors.hasEmeptyBusinessActivity?'':'hide'}">
						<p>
							El giro de tu negocio es obligatorio
						</p>
					</div>
				</div>
								
				<div class="pure-u-1-4"></div>
				<div class="pure-u-1 pure-u-sm-1-2">
					<div class="select-holder m-b-20">
						<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg>
						<label for="businessType" class="hidden-label">Selecciona el giro de tú negocio</label>
						<select name="businessType" id="businessType" bind:value={business.activity}>
							<option value="">Selecciona el giro de tú negocio</option>
							<option value="Residencial">Residencial</option>
							<option value="Comercio">Comercio</option>
							<option value="Hoteles y restaurantes">Hoteles y restaurantes</option>
							<option value="Servicios Profecionales">Servicios Profecionales</option>
							<option value="Educativos">Educativos</option>
							<option value="Salud">Salud</option>
							<option value="Gobierno">Gobierno</option>
							<option value="Otros">Otros</option>
						</select>
					</div>
				</div>
				<div class="pure-u-1-4"></div>

				<div class="pure-u-1-4"></div>
				<div class="pure-u-1-2">
					<div class="pure-g">
						<div class="pure-u-5-6">
							<span class="">¿Es una persona moral?</span>
						</div>
						<div class="pure-u-1-6">
							<span class="checkbox-switch">
								<input type="checkbox" name="moralPersonFlag" id="moralPersonFlag" bind:checked={flags.moralPerson}>
								<label for="moralPersonFlag"></label>
							</span>
						</div>
					</div>
					<div class={!flags.moralPerson?'':'hide'}>
						<hr class="m-t-20 m-b-20"/>
					</div>
				</div>
				<div class="pure-u-1-4"></div>
				{#if flags.moralPerson}
				<div class="pure-u-1 pure-u-2-2">
					<div class="alert alert--error m-b-40 {errors.hasEmptyBusinessName?'':'hide'}">
						<p>
							La razón social es obligatoria.
						</p>
					</div>
				</div>
				<div class="pure-u-1-4 "></div>
				<div class="pure-u-1 pure-u-sm-1-2 m-t-20">
					<div class="ctrl-holder m-b-20">
						<label for="moralPerson" class="placeholder disabled">Razón social</label>
						<input type="text" name="moralPerson" id="moralPerson" required
							bind:value={business.name} on:input={() => validateText(business.name)}/>
					</div>
				</div>
				<div class="pure-u-1-4 "></div>
				{/if}
			</div>
			{/if}
		</div>
		<div class="d-flex align-items-center justify-content-between">
			<a href="#/" class="back-link" on:click={() => goBack()}>
				<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"/></svg>
				<span>atrás</span>
			</a>
			<a href="#/" class="pure__button pure__button--primary"
				on:click={() => valContent()}>Siguiente</a>
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
</style>