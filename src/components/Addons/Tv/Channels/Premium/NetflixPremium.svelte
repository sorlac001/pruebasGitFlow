<script>   
    let checked = false;	
    export let clickHandler =(checked)=>{}
</script>

<div class="addon netflix-premium-addon">
    <input type="checkbox" on:click={()=>{clickHandler(checked)}} bind:checked name="" id="addon_netflixpremium">
    <label for="addon_netflixpremium" class="addon-label">
        <span class="addon-check__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="addon-name">
            <img src="/assets/img/logos/netflix-logo.svg" alt="">
        </div>
        <div class="addon-description">
            <p>Plan Premium</p>
        </div>
        <div class="addon-pricing">
            <p class="fw-semibold">+$<span class="addon-price">266</span></p>
            <p class="small-text">al mes</p>
        </div>
    </label>
</div>