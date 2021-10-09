<script>
    export let ident;
    export let title;
    export let message;
</script>

<div class="modal" id="{ident}" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-sencilla-title">
            <div class="modal__header" role="banner">
                <h2 class="modal__title text-fs-23 fw-semibold" id="modal-sencilla-title">{title}</h2>
                <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </div>
            <div class="modal__content" id="modal-1-content" role="main">
                <p>{message}</p>
            </div>
            <div class="modal__footer" role="contentinfo">
                <button class="pure__button pure__button--primary" data-micromodal-close aria-label="Cerrar esta modal">Enterado</button>
            </div>
        </div>
    </div>
</div>