<script>   
    let checked = false;	
    export let clickHandler =(checked)=>{}
</script>

<div class="addon internacional-addon">
    <input type="checkbox" on:click={()=>{clickHandler(checked)}} bind:checked name="" id="addon_internacional">
    <label for="addon_internacional" class="addon-label">
        <span class="addon-check__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="addon-name">
            <p>Internacional</p>
        </div>
        <div class="addon-description">
            
        </div>
        <div class="addon-pricing">
            <p class="fw-semibold">+$<span class="addon-price">70</span></p>
            <p class="small-text">al mes</p>
        </div>
    </label>
</div>