<script>
    import { onMount } from 'svelte';
    import AutoComplete from "simple-svelte-autocomplete";

    const colorList = [
        { id: 1, name: "White", code: "#FFFFFF" },
        { id: 2, name: "Red", code: "#FF0000" },
        { id: 3, name: "Yellow", code: "#FF00FF" },
        { id: 4, name: "Green", code: "#00FF00" },
        { id: 5, name: "Blue", code: "#0000FF" },
        { id: 6, name: "Black", code: "#000000" },
    ];
    let selectedColorObject;

    onMount(() => {
		// enable functions for main.min.js
		document.onreadystatechange();        
	})
</script>
<div class="wrap">
    
    <h2 class="text-fs-26 m-b-20">Dev guide</h2>
    
    <h3>Autocomplete</h3>
    <p>

        <AutoComplete
            items={colorList}
            placeholder="Colors"           
            bind:selectedItem={selectedColorObject}
            labelFunction={color => color.id + '. ' + color.name} />
    </p>

<br>
<br>
<br>
    <h3>Modales</h3>
    <div class="m-b-20">
        <button type="button" class="pure__button pure__button--primary" data-custom-open="modal-sencilla">Modal Sencilla</button>
        <button type="button" class="pure__button pure__button--primary" data-custom-open="modal-accion">Modal Acción</button>
    </div>

    <h3 class="text-fs-15 fw-semibold">Mostrar o ocultar programáticamente una modal:</h3>
    <pre class=" language-js m-b-20"><code class=" language-js">MicroModal.show('modal-id'); // [1] <br>MicroModal.close('modal-id'); // [2]</code></pre>

    <div class="modal" id="modal-sencilla" aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
            <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-sencilla-title">
                <div class="modal__header" role="banner">
                    <h2 class="modal__title text-fs-23 fw-semibold" id="modal-sencilla-title">Éxito</h2>
                    <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                </div>
                <div class="modal__content" id="modal-1-content" role="main">
                    <p>Su producto ha sido agregado</p>
                </div>
                <div class="modal__footer" role="contentinfo">
                    <button class="pure__button pure__button--primary" data-micromodal-close aria-label="Cerrar esta modal">Enterado</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modal-accion" aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
            <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-accion-title">
                <div class="modal__header" role="banner">
                    <h2 class="modal__title text-fs-23 fw-semibold" id="modal-accion-title">Eliminar documento</h2>
                    <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                </div>
                <div class="modal__content" id="modal-1-content" role="main">
                    <p>¿Deseas eliminar la imagen?</p>
                </div>
                <div class="modal__footer" role="contentinfo">
                    <button class="pure__button pure__button--light-primary" data-micromodal-close aria-label="Cerrar esta modal">Cancelar</button>
                    <button class="pure__button pure__button--primary">Sí, eliminar</button>
                </div>
            </div>
        </div>
    </div>

</div>

<style>
    .wrap{
        padding: 0 20px;
    }
</style>