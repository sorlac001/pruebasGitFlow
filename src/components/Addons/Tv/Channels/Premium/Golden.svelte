<script>   
    let checked = false;	
    export let clickHandler =(checked)=>{}
</script>
<div class="addon golden-addon">
    <input type="checkbox" on:click={()=>{clickHandler(checked)}} bind:checked name="" id="addon_golden">
    <label for="addon_golden" class="addon-label">
        <span class="addon-check__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="addon-name">
            <img src="/assets/img/logos/golden-premier-logo.png" alt="">
        </div>
        <div class="addon-description">
            <p>1 mes gratis.</p>
        </div>
        <div class="addon-pricing">
            <p class="fw-semibold">+$<span class="addon-price">50</span></p>
            <p class="small-text">al mes</p>
        </div>
    </label>
</div>