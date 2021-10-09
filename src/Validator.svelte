<script context="module">
    export const imeiIsValid = (imei) => {
        return /^\d{15}$/.test(imei);
    };
</script>
