<script>   
    let checked = false;	
    export let clickHandler =(checked)=>{}
</script>

<div class="addon starzplay-addon">
    <input type="checkbox" name="" on:click={()=>{clickHandler(checked)}} bind:checked id="addon_starzplay">
    <label for="addon_starzplay" class="addon-label">
        <span class="addon-check__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="addon-name">
            <img src="/assets/img/logos/starzplay-logo.svg" alt="">
        </div>
        <div class="addon-description">
            <p>Primer mes con <br>25% de descuento.</p>
        </div>
        <div class="addon-pricing">
            <p class="fw-semibold">+$<span class="addon-price">89</span></p>
            <p class="small-text">al mes</p>
        </div>
    </label>
</div>