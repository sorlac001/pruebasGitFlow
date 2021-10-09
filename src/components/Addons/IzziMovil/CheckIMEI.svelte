<script>
    import { onMount } from "svelte";
    import { getProfileByIMEI } from "../../../clients/ClientGetProfileByIMEI.svelte";

    import { store } from "../../../Store.svelte";
    import { imeiIsValid } from "../../../Validator.svelte";
    import Button from "../../Button.svelte";
    let buttonDisabled = false;
    let value = $store.cart.izziMovil.imei;
    let label = "Comprobar";
    let messageError = "";
    let messageSuccess = "";
    let checked = false;


    //portability
    let clickHandler=()=>{
        $store.cart.izziMovil.portability = !checked;
    }

    let onClick = () => {
        messageSuccess = "";
        messageError = "";
        $store.cart.izziMovil.imei = "";
        if (imeiIsValid(value)) {
            buttonDisabled = true;
            getProfileByIMEI({
                imei: value,
            }).then((response) => {
                if (response.compatible){
                    messageSuccess = "El IMEI es compatible";
                    $store.cart.izziMovil.imei  = value;
                }
                else 
                    messageError = "El IMEI no es compatible";

                buttonDisabled = false;

            });
        } else messageError = "El IMEI no es válido";
    };
    onMount(() => {
        document.onreadystatechange();
    });
</script>

<div class="portabilidad-block">
    <p class="fw-semibold">
        Es importante comprobar por IMEI que izzi móvil es compatible con tu
        equipo.
    </p>
    <div class="inline-form m-b-15">
        <div class="ctrl-holder">
            <input
                bind:value
                placeholder="Número de IMEI"
                type="text"
                name="numeroimei"
                id="numeroimei"
                required
            />
        </div>
        <Button
            {label}
            process="Comprobar"
            disabled={buttonDisabled}
            {onClick}
        />
    </div>
    {#if messageError != ""}
        <div class="inline-alert m-b-30">
            <p class="m-b-0">{messageError}</p>
        </div>
    {/if}
    {#if messageSuccess != ""}
        <div class="inline-success m-b-30">
            <p class="m-b-0">{messageSuccess}</p>
        </div>
    {/if}
    <div class="inline-alert m-b-30">
        <p class="m-b-0">
            Para conocer el IMEI de tu dispositivo es necesario que marques
            *#06# desde el teclado de tu equipo
        </p>
    </div>
    <div class="pure-g align-items-center">
        <div class="pure-u-3-4">
            <p class="m-b-0">
                Quiero conservar mi número número telefónico móvil
            </p>
        </div>
        <div class="pure-u-1-4 text-right">
            <span class="checkbox-switch">
                <input
                    type="checkbox"
                    name="portabilidad_izzimovil"
                    id="portabilidad_izzimovil"
                    on:click={()=>{clickHandler(checked)}} bind:checked
                />
                <label for="portabilidad_izzimovil" />
            </span>
        </div>
    </div>
</div>

<style>
    .placeholder {
        background: rgba(255, 255, 255, 0) !important;
        margin-top: -5px;
    }

    .inline-success {
        border-left: solid 4px #0E8F14;
        padding-left: 16px;
    }
</style>
