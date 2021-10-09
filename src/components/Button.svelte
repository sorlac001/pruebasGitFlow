<script>
    export let label;    
    export let process;
    export let disabled;
    $: value = label;
    export let onClick = ()=>{        
    }
    let updateBlock = ()=>{
        value = process;
        //disabled = true;
    }
</script>
<button 
    type="button" 
    class="pure__button pure__button--primary"
    {disabled}
    on:click={()=>{
        if(!disabled) onClick();
        updateBlock();
        }}>{value}</button>