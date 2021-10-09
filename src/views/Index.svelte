<script>
    import { afterUpdate, onMount } from "svelte";
    import { link, navigate } from "svelte-routing";

    onMount(() => {        
        navigate("/auth/login",{replace:true});
    });
</script>