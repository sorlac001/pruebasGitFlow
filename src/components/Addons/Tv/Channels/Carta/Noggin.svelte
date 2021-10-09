<script>   
    let checked = false;	
    export let clickHandler =(checked)=>{}
</script>


<div class="addon noggin-addon">
    <input type="checkbox" name="" on:click={()=>{clickHandler(checked)}} bind:checked id="addon_noggin">
    <label for="addon_noggin" class="addon-label">
        <span class="addon-check__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="addon-name">
            <img src="/assets/img/logos/noggin-logo.svg" alt="">
        </div>
        <div class="addon-description">
            <p>1 mes gratis.</p>
        </div>
        <div class="addon-pricing">
            <p class="fw-semibold">+$<span class="addon-price">49</span></p>
            <p class="small-text">al mes</p>
        </div>
    </label>
</div>