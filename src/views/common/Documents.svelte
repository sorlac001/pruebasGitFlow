<script>
	import { navigate } from "svelte-routing";
	import { store } from "../../Store.svelte";
	import { onMount } from 'svelte';
	import { fetchAttachFile } from "../../clients/ClientDocuments.svelte";
	import Preloader from "../../components/Preloader.svelte";

	let documents= {
		cardId : [
			{
				name: "",
				type: "",
				data: "",
			},
			{
				name: "",
				type: "",
				data: "",
			}
			],
		referenceRFC: {
			name: "",
			type: "",
			data: "",
		},
		purchaseOrder:{
			name: "",
			type: "",
			data: "",
		},
		proofAddress:{
			name: "",
			type: "",
			data: "",
		},
	};	
	let files, input, inputAddress, inputReference, inputpurchaseOrder;

	/*objeto para verificar documento*/
	let file = {
			name: "",
			type: "",
			data: "",
		}
    onMount(() => {
        // enable functions for main.min.js
       document.onreadystatechange();        
    });

	function goBack() {
		navigate("/install-date", { replace: false });
	}

	function nextHandler() {
		navigate("/payment-type", { replace: false });
	}
	
	function getBase64(f) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(f);
			reader.onload = () => {
			let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
			if ((encoded.length % 4) > 0) {
				encoded += '='.repeat(4 - (encoded.length % 4));
			}
			resolve(encoded);
			};
			reader.onerror = error => reject(error);
		});
	}

	let preloadCardid = false;
	let disableContinue = false;
	let hasMoreTwo = false;
	let hasEmpty = false;
	let disabledCarId = false;
	let hasErrorCardId = false;
	async function addCardId(card){
		hasEmpty = true;
		if(card.length > 0){
			hasEmpty = false;
			hasMoreTwo = true;
			if(card.length <=2){
				hasMoreTwo = false;
				let upload;
				hasErrorCardId = false;
				for (let i = 0; i < card.length; i++) {
					documents.cardId[i].name = card[i].name.split(".")[0];
					documents.cardId[i].type = card[i].name.split(".")[1];
					documents.cardId[i].data = await getBase64(card[i]);
					preloadCardid = true;
					disableContinue = true;
					disabledCarId = true;
					upload = await fetchAttachFile($store.order, documents.cardId[i]);
					preloadCardid = false;
					disableContinue = false;
					disabledCarId = false;
					if(upload != "Error: Error al consumir el servicio"){
						console.log(documents.cardId);
					}else{
						documents.cardId[i].name = "";
						documents.cardId[i].type = "";
						documents.cardId[i].data = "";
						hasErrorCardId = true;
					}
				}
				if (documents.cardId[0].name == "" && documents.cardId[1].name == "") {
					input.value = '';
				}
			}else{
				input.value = '';
			}
			console.log(documents.cardId);
		}
		disableContinue = false;
	}

	let preloadAddress = false;
	let hasErrorAddress = false;
	let disabledAddress = false;
	async function addAddress(fil, inp) {
		let upload;
		hasErrorAddress = false;
		if(fil.length <= 1){
			console.log(fil);
			documents.proofAddress.name = fil[0].name.split(".")[0];
			documents.proofAddress.type = fil[0].name.split(".")[1];
			documents.proofAddress.data = await getBase64(fil[0]);
			preloadAddress = true;
			disableContinue = true;
			disabledAddress = true;
			upload = await fetchAttachFile($store.order, documents.proofAddress);
			preloadAddress = false;
			disabledAddress = false;
			disableContinue = false;
			if(upload != "Error: Error al consumir el servicio"){
				console.log(documents.proofAddress);
			}else{
				hasErrorAddress = true;
				documents.proofAddress.data = "";
				documents.proofAddress.name = "";
				documents.proofAddress.type = "";
			}
		}else{
			inp.value = '';
		}
		disableContinue = false;
	}

	let disabledReference = false;
	let preloadReference = false;
	let hasErrorReference = false;
	async function addReference(fil, inp) {
		let upload;
		hasErrorReference = false;
		if(fil.length <= 1){
			console.log(fil);
			documents.referenceRFC.name = fil[0].name.split(".")[0];
			documents.referenceRFC.type = fil[0].name.split(".")[1];
			documents.referenceRFC.data = await getBase64(fil[0]);
			preloadReference = true;
			disableContinue = true;
			disabledReference = true;
			upload = await fetchAttachFile($store.order, documents.referenceRFC);
			preloadReference = false;
			disableContinue = false;
			disabledReference = false;
			if(upload != "Error: Error al consumir el servicio"){
				console.log(documents.proofAddress);
			}else{
				hasErrorAddress = true;
				documents.referenceRFC.data = "";
				documents.referenceRFC.name = "";
				documents.referenceRFC.type = "";
			}
		}else{
			inp.value = '';
		}
		disableContinue = false;
		console.log(documents.referenceRFC);
	}

	let preloadPurchase = false;
	let hasErrorPurchase = false;
	let disabledPurchase = false;
	async function addPurchaseOrder(fil, inp) {
		let upload;
		hasErrorPurchase = false;
		if(fil.length <= 1){
			console.log(fil);
			documents.purchaseOrder.name = fil[0].name.split(".")[0];
			documents.purchaseOrder.type = fil[0].name.split(".")[1];
			documents.purchaseOrder.data = await getBase64(fil[0]);
			preloadPurchase = true;
			disableContinue = true;
			disabledPurchase = true;
			upload = await fetchAttachFile($store.order, documents.purchaseOrder);
			preloadPurchase = false;
			disableContinue = false;
			disabledPurchase = false;
			if(upload != "Error: Error al consumir el servicio"){
				console.log(documents.purchaseOrder);
			}else{
				hasErrorpurchaseOrder = true;
				documents.purchaseOrder.data = "";
				documents.purchaseOrder.name = "";
				documents.purchaseOrder.type = "";
			}
		}else{
			inp.value = '';
		}
		disableContinue = false;
		console.log(documents.purchaseOrder);
	}

	async function validateFiles() {
		hasEmpty = true;
		if(documents.cardId[0].name != ""){
			hasEmpty = false;
			nextHandler();
		}
	}
</script>
<div>
	<div class="pure-g justify-content-center">
		<div class="pure-u-1 pure-u-sm-5-6">
			<div class="pure-g m-b-20">
				<div class="pure-u-1 pure-u-md-2-3 sm-m-b-20">
					<h3 class="text-fs-20">
						Solicita los siguientes documentos, puedes arrastrar y soltar en los campos o seleccionar y búscalos en tu ordenador
					</h3>
				</div>
			</div>
			<div class="pure-g justify-content-center">
				<div class="pure-u-1 pure-2-2 {hasEmpty?'':'hide'}">
					<div class="alert alert--error m-b-20">
						<p>La Identificación oficial es un campo obligatorio, debes agregar por lo menos un documento.</p>
					</div>
				</div>
				<div class="pure-u-1 pure-2-2 {hasMoreTwo?'':'hide'}">
					<div class="alert alert--error m-b-20">
						<p>Solo se pueden agregar hasta dos archivos para la Identificación oficial</p>
					</div>
				</div>
				<div class="pure-u-1 pure-2-2 {hasErrorCardId?'':'hide'}">
					<div class="alert alert--error m-b-20">
						<p>El archivo es demasiado grande, solo se aceptan archivos menores a 100kb </p>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-2">
					<div class="ctrl-holder m-b-20">
						<label for="cardId" class="files">
							<div class={!preloadCardid?'':'hide'}>
								{#if documents.cardId[0].name == "" && documents.cardId[1].name == ""}
									<span class="pure-u-md-5-6">Identificación oficial, <span class="upload-link">Subir archivo</span></span>
									<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-briefcase"></use></svg>
								{/if}
								{#if documents.cardId[0].name != "" || documents.cardId[1].name != ""}
									{#each documents.cardId as card}
									<div class="prue-g">
										{#if card.name != ""}
											<div class="prue-u-1 pure-md-2-2 aling-items-center m-b-20">
												<span class="prue-u-1 text-center">{card.name + "."+ card.type}</span>
											</div>
										{/if}
									</div>
									{/each}
								{/if}
							</div>
							<div class="pure-g justify-content-center {preloadCardid?'':'hide'}">
								<Preloader/>
							</div>	
						</label>
						<input type="file" name="cardId" id="cardId" multiple accept=".pdf, image/*" disabled={disabledCarId?'disabled':''} bind:files bind:this={input} on:change={()=>addCardId(files)}>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-2">
					<div class="ctrl-holder m-b-20">
						<label for="address" class="files">
							{#if documents.proofAddress.name == ""}
								<div class={!preloadAddress?'':'hide'}>
									<span class="pure-u-md-5-6">Comprobante de domicilio, <span class="upload-link">Subir archivo</span></span>
									<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-briefcase"></use></svg>
								</div>
							{/if}
							{#if documents.proofAddress.name != ""}
								<div class={!preloadAddress?'':'hide'}>
									<div class="prue-g">
										<div class="prue-u-1 pure-md-2-2 aling-items-center m-b-20">
											<span class="prue-u-1 text-center">{documents.proofAddress.name + "."+ documents.proofAddress.type}</span>
										</div>
									</div>
								</div>
							{/if}
							<div class="pure-g justify-content-center {preloadAddress?'':'hide'}">
								<Preloader/>
							</div>
						</label>
						<input type="file" name="address" id="address" accept=".pdf, image/*" bind:files bind:this={inputAddress} on:change={()=>addAddress(files, inputAddress)}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-2">
					<div class="ctrl-holder m-b-20">
						<label for="reference" class="files">
							{#if documents.referenceRFC.name == ""}
								<div class={!preloadReference?'':'hide'}>
									<span class="pure-u-md-5-6">Referecnia o RFC, <span class="upload-link">Subir archivo</span></span>
									<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-briefcase"></use></svg>
								</div>
							{/if}
							{#if documents.referenceRFC.name != ""}
								<div class={!preloadReference?'':'hide'}>
									<div class="prue-g">
										<div class="prue-u-1 pure-md-2-2 aling-items-center m-b-20">
											<span class="prue-u-1 text-center">{documents.referenceRFC.name + "."+ documents.referenceRFC.type}</span>
										</div>
									</div>
								</div>
							{/if}
							<div class="pure-g justify-content-center {preloadReference?'':'hide'}">
								<Preloader/>
							</div>
						</label>
						<input type="file" name="reference" id="reference" accept=".pdf, image/*" bind:files bind:this={inputReference} on:change={()=>addReference(files, inputReference)}/>
					</div>
				</div>
				<div class="pure-u-1 pure-u-sm-1-2">
					<div class="ctrl-holder m-b-20">
						<label for="purchaseOrder" class="files">
							{#if documents.purchaseOrder.name == ""}
								<div class={!preloadPurchase?'':'hide'}>
									<span class="pure-u-md-5-6">Orden de compra impresa o comprobante de pago, <span class="upload-link">Subir archivo</span></span>
							<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-briefcase"></use></svg>
								</div>
							{/if}
							{#if documents.purchaseOrder.name != ""}
								<div class={!preloadPurchase?'':'hide'}>
									<div class="prue-g">
										<div class="prue-u-1 pure-md-2-2 aling-items-center m-b-20">
											<span class="prue-u-1 text-center">{documents.purchaseOrder.name + "."+ documents.purchaseOrder.type}</span>
										</div>
									</div>
								</div>
							{/if}
							<div class="pure-g justify-content-center {preloadPurchase?'':'hide'}">
								<Preloader/>
							</div>
						</label>
						<input type="file" name="purchaseOrder" id="purchaseOrder" accept=".pdf, image/*" bind:files bind:this={inputpurchaseOrder} on:change={()=>addPurchaseOrder(files, inputpurchaseOrder)}/>
					</div>
				</div>
			</div>
			<div class="pure-g m-b-20">
				<div class="pure-u-1 pure-u-md-2-2 sm-m-b-20">
					<div class="d-flex align-items-center justify-content-between">
						<a href="#/" class="back-link" on:click={() => goBack()}>
							<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"/></svg>
							<span>atrás</span>
						</a>
						<div class={!disableContinue?'':'aDisabled'}>
							<a href="#/" class="pure__button pure__button--primary"
							on:click={()=>validateFiles()}>Siguiente</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.hide{
		display: none;
	}
	
	.files{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 40px 24px;	
		max-height: 120px;

		background: #FFFFFF;
		border: 1px dashed rgba(0, 0, 0, 0.23);
		box-sizing: border-box;
		border-radius: 8px;
		font-size: 13px;
	}

	input[type="file"]{
		display: none;
	}

	.upload-link {
		color:rgb(0,100,200);
	}

	/*Disabled events for tags <a>*/
		.aDisabled{
		pointer-events: none;
		cursor: default;
		opacity: 0.6;
	}
</style>