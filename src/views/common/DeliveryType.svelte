<script>
    import AutoComplete from "simple-svelte-autocomplete";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { clientStoreSkuAvailability } from "../../clients/ClientStoreSkuAvailability.svelte";
    import Preloader from "../../components/Preloader.svelte";
    import { store } from "../../Store.svelte";

    onMount(() => {
        // enable functions for main.min.js
        document.onreadystatechange();

    });


    if($store.cart.izziMovil.imei == "")
        navigate("/vendor-info", { replace: false });


    let visible = false;
    let branchOfficeList = [];
    const branchOffices = clientStoreSkuAvailability();
    let selectedBranch;

    branchOffices.then((response)=>{
        visible = true;
        branchOfficeList = response.branchOffices;
    });
    let backHandler = () => {
        navigate("/verification-code", { replace: false });
    };
    let nextHandler = () => {
        $store.branch = selectedBranch;
        navigate("/vendor-info", { replace: false });
    };
    let onChangeBranch = () =>{
        
        $store.branch = selectedBranch;
    }
</script>

    
<div class={!visible?'':'hide'}>
	<div class="pure-g">
		<div class="pure-u-1">			
			<div class="text-center"><Preloader/></div>
		</div>
	</div>
</div>
<div class={visible?'':'hide'}>
    <div class="pure-g justify-content-center">
        <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">
            <div class="pure-g m-b-20">
                <div class="pure-u-1 pure-u-md-2-3 sm-m-b-20">
                    <h3 class="text-fs-20">
                        Selecciona la dirección de <span class="fw-semibold"
                            >entrega</span
                        >
                        para el <span class="fw-semibold">SIM</span> izzi móvil
                    </h3>
                </div>
            </div>
            <div class="panel panel--clickable domicile m-b-20">
                <span class="panel-clickable__indicator"
                    ><img
                        src="/assets/img/icons/check.svg"
                        alt=""
                        aria-hidden="true"
                    /></span
                >
                <p class="fw-semibold m-b-0">Entrega a domicilio</p>
                <p class="m-b-0">
                    Recibe tus productos izzi móvil en tu dirección de instalación
                </p>
                <!-- <div class="panel__clickable-contents">
                    <p class="m-b-0">A</p>
                </div> -->
            </div>
            <div class="panel panel--clickable branch m-b-20">
                <span class="panel-clickable__indicator"
                    ><img
                        src="/assets/img/icons/check.svg"
                        alt=""
                        aria-hidden="true"
                    /></span
                >
                <p class="fw-semibold m-b-0">Entrega en sucursal</p>
                <p class="m-b-0">
                    Recibe tus productos izzi móvil en la sucursal de tu preferencía
                </p>
                <br/>
                <br/>
                <p class="fw-semibold m-b-0">Selecciona la sucursal</p>
                <div class="panel__clickable-contents">
                    <AutoComplete
                        items={branchOfficeList}
                        placeholder="Sucursal"
                        bind:selectedItem={selectedBranch}
                        on:change={onChangeBranch}
                        labelFunction={(item) =>
                            item.city + " - " + item.description}
                        />                    
                    {#if selectedBranch }
                    <div>
                        <div class="div-234423">
                            <div class="div-423432">
                                <div class="fw-semibold">
                                    {selectedBranch.description}
                                </div>
                                <div>
                                    {selectedBranch.address}
                                </div>
                                <div>
                                    {selectedBranch.city}
                                </div>
                            </div>
                            <div class="div-423432">
                                <div class="fw-semibold">
                                    Horario                                    
                                </div>
                                <div>
                                    Lunes a viernes {selectedBranch.schedule_Mon_Fri}
                                </div>
                                <div>
                                    Sábado {selectedBranch.schedule_Sat}
                                </div>
                                <div>
                                    Domingo {selectedBranch.schedule_Sun}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/if}
                    <div class="alert">
                        <p>
                            El SIM lo podrás recoger una vez el servicio izzi
                            residencial sea instalado con éxito en tu domicilio.
                        </p>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between">
                <div on:click={backHandler} class="back-link">
                    <svg class="icon" aria-hidden="true"
                        ><use
                            xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"
                        /></svg
                    >
                    <span>atrás</span>
                </div>
                <div
                    on:click={nextHandler}
                    class="pure__button pure__button--primary"
                >
                    Siguiente
                </div>
            </div>
        </div>
    </div>
</div>
<style>
	.hide {
		display: none;
	}
    .div-234423{
        display: flex;
        justify-content: stretch;
    }
    .div-423432{
        display: flex;
        flex-direction: column;
        width:50%;
        padding-left: 20px;
    }
</style>