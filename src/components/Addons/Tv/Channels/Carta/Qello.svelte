<script>   
    let checked = false;	
    export let clickHandler =(checked)=>{}
</script>

<div class="addon qello-addon">
    <input type="checkbox" name="" id="addon_qello" on:click={()=>{clickHandler(checked)}} bind:checked>
    <label for="addon_qello" class="addon-label">
        <span class="addon-check__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="addon-name">
            <img src="/assets/img/logos/stingray-qello-logo.svg" alt="">
        </div>
        <div class="addon-description">
            <p>1er mes sin costo.</p>
        </div>
        <div class="addon-pricing">
            <p class="fw-semibold">+$<span class="addon-price">95</span></p>
            <p class="small-text">al mes</p>
        </div>
    </label>
</div>