<script>   
    let checked = false;	
    export let clickHandler =(checked)=>{}
</script>

<div class="addon hbomax-addon">
    <input type="checkbox" on:click={()=>{clickHandler(checked)}} bind:checked name="" id="addon_hbomax">
    <label for="addon_hbomax" class="addon-label">
        <span class="addon-check__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="addon-name">
            <img src="/assets/img/logos/hbomax-logo.svg" alt="">
        </div>
        <div class="addon-description">
            <p>1er mes sin costo.</p>
        </div>
        <div class="addon-pricing">
            <p class="fw-semibold">+$<span class="addon-price">109</span></p>
            <p class="small-text">al mes</p>
        </div>
    </label>
</div>