<script>
    import { onMount } from "svelte";

    import { navigate } from "svelte-routing";
    import { clientEnvioCodigo } from "../../clients/ClientEnvioCodigo.svelte";
    import { clientVerifCodigo } from "../../clients/ClientVerifCodigo.svelte";
    import Modal from "../../components/Addons/Modal.svelte";
    import Store, { store } from "../../Store.svelte";

    let firstDigitInput;
    let secondDigitInput;
    let thirdDigitInput;
    let fourthDigitInput;

    let firstDigitInputFocus;


    function codeInput(e){
        if (e.target.value) {
            if(!e.target.classList.contains("rounded-input--last")){
                e.target.nextElementSibling.focus();
            }
        }
	}


    clientEnvioCodigo({
        "telefono": $store.dataHolder.celPhone,
        "correo": $store.dataHolder.mail
    }).then(response=>{
        if(response.izziErrorCode == "000"){
            console.log("Codigo enviado");
        }
    });

    let continueHandler = () =>{
        navigate("/delivery-type",{replace:false});
    }

    let reintentHandler = () =>{
        clientEnvioCodigo({
            "telefono": $store.dataHolder.celPhone,
            "correo": $store.dataHolder.mail
        }).then(response=>{
            if(response.izziErrorCode == "000"){
                MicroModal.show('reintentCodeModal'); 
                console.log("Codigo enviado");
            }
        });
    }

    let backHandler = ()=>{
        navigate("/service-address-invoice",{replace:false});
    }
    let nextHandler = ()=>{
        let codigo = getVerifUserCode();
        
        clientVerifCodigo({
            "telefono": $store.dataHolder.celPhone,
            "correo": $store.dataHolder.mail,
            "codigo": codigo
        }).then(response=>{
            secondDigitInput = "";
            firstDigitInput = "";
            thirdDigitInput = "";
            fourthDigitInput = "";

            firstDigitInputFocus.focus();
            if(response.izziErrorCode == "000"){
                $store.verificationCode = codigo;
                navigate("/delivery-type",{replace:false});
            }
            else
                MicroModal.show('verifCodeModal'); 
                //alert("Código inválido");
        });

    }
    $: getVerifUserCode=()=>{
        return firstDigitInput+""+secondDigitInput+""+thirdDigitInput+""+fourthDigitInput;
    }
    onMount(() => firstDigitInputFocus.focus())
</script>

<div class="container">
    <div class="wrapper">
        <div class="navbar">
            <div class="left">
                <span class="indications">                                      
                    <h3 class="text-fs-20"><span class="fw-semibold">Introduce el código</span> de verificación enviado vía SMS y Correo a</h3>                    
                </span>
            </div>
        </div>

        <div class="panel verification">
            <div class="number">
                {$store.dataHolder.celPhone}
            </div>
            <div class="email">
                {$store.dataHolder.mail}
            </div>
            <div class="code-inputs">
                <input bind:value={firstDigitInput} bind:this={firstDigitInputFocus} class="rounded-input" type="number" maxlength="1" on:input="{codeInput}">
                <input bind:value={secondDigitInput} class="rounded-input" type="number" maxlength="1" on:input="{codeInput}">
                <input bind:value={thirdDigitInput} class="rounded-input" type="number" maxlength="1" on:input="{codeInput}">
                <input bind:value={fourthDigitInput} class="rounded-input rounded-input--last" type="number" maxlength="1">
            </div>
            <div class="code">
                code
            </div>
            <div class="continue">
                <a href="#/" on:click={continueHandler} class="primary-text">Continuar sin código</a>
            </div>
            <div class="note">
                Recuerda que si no validas el número telefónico afectaras tu comisión
            </div>
            <div class="reintent">
                ¿No recibió el código? <a href="#/" on:click={reintentHandler}>Reenviar</a>
            </div>
        </div>        
        <div class="d-flex align-items-center justify-content-between">
            <div on:click={backHandler} class="back-link">
                <svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"></use></svg>
                <span>atrás</span>
            </div>
            <div on:click={nextHandler} class="pure__button pure__button--primary">Siguiente</div>
        </div>
    </div>
</div>
<Modal ident="verifCodeModal" title="Código inválido" message="Por favor reintente la verificación"/>
<Modal ident="reintentCodeModal" title="Código reenviado" message="Por favor realice la verificación"/>
<style>

    .container {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .wrapper {
        width: 100%;
        max-width: 450px;
    }
    .navbar {
        display: flex;
        margin-bottom: 22px;
        margin-top: 40px;
        
    }
    .navbar > .left {
        width:100%;
        display: flex;
        justify-content: center;
    }
    .navbar > .left > .indications {
        display: flex;
        text-align: center;        
        font-size: 20px;
        max-width: 360px;
    }
    .verification{
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .verification > div {
        margin-bottom: 10px;
    }
    .reintent{
        margin-top: 20px;
    }
    .continue{
        margin-bottom: -10px;
        text-decoration-line: underline;
    }
    .number{
        font-size: 20px;
        font-weight: 600;
        color: #36424B;
    }
</style>