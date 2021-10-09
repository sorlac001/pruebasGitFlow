<script>   
    let checked = false;	
    export let clickHandler =(checked)=>{}
</script>


<div class="addon izzitvhdplus-addon">
    <input type="checkbox" on:click={()=>{clickHandler(checked)}} bind:checked  name="" id="addon_izzitvhdplus">
    <label for="addon_izzitvhdplus" class="addon-label">
        <span class="addon-check__indicator"><img src="/assets/img/icons/check.svg" alt="" aria-hidden="true"></span>
        <div class="addon-name">
            <img src="/assets/img/logos/izzitvhd+-logo.svg" alt="">
        </div>
        <div class="addon-description">
            <p></p>
        </div>
        <div class="addon-pricing">
            <p class="fw-semibold">+$<span class="addon-price">120</span></p>
            <p class="small-text">al mes</p>
        </div>
    </label>
</div>