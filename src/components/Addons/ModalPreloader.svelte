<script>
    import Preloader from "../Preloader.svelte";

    export let ident;
    export let title;
    export let message;
    export let disabled;
</script>

<div class="modal" id="{ident}" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1">
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-sencilla-title">
            <div class="modal__header" role="banner">
                <h2 class="modal__title text-fs-23 fw-semibold" id="modal-sencilla-title">{title}</h2>                
            </div>
            <div class="modal__content" id="modal-1-content" role="main">
                <div class="div-233424">
                    <p>{message}</p>
                    <p><Preloader/></p>
                </div>
            </div>
            <div class="modal__footer" role="contentinfo">
                <!-- <button {disabled} class="pure__button pure__button--primary" aria-label="Cerrar esta modal">Reenviar</button> -->
            </div>
        </div>
    </div>
</div>
<style>
    .div-233424 {
        display: flex;
        flex-direction: column;
    }
    .div-233424 > p {
        width: 100%;
        text-align: center;
    }
</style>