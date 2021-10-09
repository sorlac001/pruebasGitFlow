<script>
    import Preloader from "../Preloader.svelte";

    export let ident;
    export let title;
    export let message;
    export let disabled;
    export let onClick=()=>{}
</script>
<div class="modal" id="{ident}" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1">
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-accion-title">
            <div class="modal__header" role="banner">
                <h2 class="modal__title text-fs-23 fw-semibold" id="modal-accion-title">{title}</h2>
                <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </div>
            <div class="modal__content" id="modal-1-content" role="main">
                <p>{message}</p>
            </div>
            <div class="modal__footer" role="contentinfo">
                <button class="pure__button pure__button--light-primary" data-micromodal-close aria-label="Cerrar esta modal">Cancelar</button>
                <button on:click={onClick} class="pure__button pure__button--primary">Aceptar</button>
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