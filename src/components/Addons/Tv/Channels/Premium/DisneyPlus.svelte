<script>   
    let checked = false;	
    export let clickHandler =(checked)=>{}
</script>

<div class="addon disneyplus-addon">
    <input type="checkbox" on:click={()=>{clickHandler(checked)}} name="" id="addon_disneyplus">
    <label for="addon_disneyplus" class="addon-label">
        <span class="addon-check__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="addon-name">
            <img src="/assets/img/logos/disneyplus-logo.svg" alt="">
        </div>
        <div class="addon-description">
            
        </div>
        <div class="addon-pricing">
            <p class="fw-semibold">+$<span class="addon-price">169</span></p>
            <p class="small-text">al mes</p>
        </div>
    </label>
</div>