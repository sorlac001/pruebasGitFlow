<script>   
    let checked = false;	
    export let clickHandler =(checked)=>{}
</script>

<div class="addon acorntv-addon">
    <input type="checkbox" name="" id="addon_acorntv" on:click={()=>{clickHandler(checked)}} bind:checked>
    <label for="addon_acorntv" class="addon-label">
        <span class="addon-check__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="addon-name">
            <img src="/assets/img/logos/acorntv-logo.svg" alt="">
        </div>
        <div class="addon-description">
            <p>Primer mes con <br>25% de descuento.</p>
        </div>
        <div class="addon-pricing">
            <p class="fw-semibold">+$<span class="addon-price">79</span></p>
            <p class="small-text">al mes</p>
        </div>
    </label>
</div>