<script>
    import { link } from "svelte-routing";

    
</script>

<div class="wrap">
        
    <h2 class="text-fs-26 m-b-20">Index</h2>
    <h2 class="fw-semibold">Guías</h2>  
    <br />
    <a use:link href="/style-guide">Style guide</a>
    <br />
    <a use:link href="/dev-guide">Dev guide</a>
    <br />
    <br />
    <h2 class="fw-semibold">Vistas</h2>  
    <br />
    <a use:link href="/auth/login">Login</a>
    <br />
    <a use:link href="/dashboard">Dashboard</a>
    <br />
    <a use:link href="/internet-profiler">Internet Profile</a>
    <br />
    <a use:link href="/auth/recover-password">Recover Password</a>
    <br />
    <a use:link href="/service-address">Service Address</a>
    <br />
    <a use:link href="/service-address-invoice">Invoice Address</a>
    <br />
    <a use:link href="/delivery-type">Delivery Type</a>
    <br />
    <a use:link href="/plan-type">Plan Type</a>
    <br />
    <a use:link href="/install-date">Installation Date</a>
    <br />
    <a use:link href="/documents">Documents</a>
    <br />
    <a use:link href="/verification-code">Verification Code</a>
    <br>
    <a use:link href="/vendor-info">Vendor info</a>
    <br />
    <a use:link href="/purchase-summary">Purchase Summary</a>
    <br />
    <a use:link href="/confirm">Confirm</a>
    <br />
    <a use:link href="/addons">Addons</a>
    <br />
    <a use:link href="/payment-type">Payment Type</a>
    <br />
    <br />
    <h2 class="fw-semibold">Vistas de ejemplo</h2>    
    <a use:link href="/profile">Profile</a>
    <br />
    <a use:link href="/landing">Landing</a>
    <br />
    <br />
    <h2 class="fw-semibold">Graphql</h2>  
    <a use:link href="/offer-list">OfferList</a>
    <br />
    <a use:link href="/branch-list">BranchList</a>
    <br />
    <br />

</div>

<style>
    .wrap{
        padding: 0 20px;
    }
</style>