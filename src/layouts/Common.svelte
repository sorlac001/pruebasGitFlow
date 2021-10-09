<script>
	import { Router, Route } from "svelte-routing";
	
	// components for this layout
	import Header from "../components/Header.svelte";
	import Footer from "../components/Footer.svelte";
	import Dashboard from "../views/common/Dashboard.svelte";
	import InternetProfiler from "../views/common/InternetProfiler.svelte";
	import ServiceAddress from "../views/common/ServiceAddress.svelte";
	import PlanType from "../views/common/PlanType.svelte";
	import DeliveryType from "../views/common/DeliveryType.svelte";
	import VerificationCode from "../views/common/VerificationCode.svelte";
	import PurchaseSummary from "../views/common/PurchaseSummary.svelte";
	import Confirm from "../views/common/Confirm.svelte";
	import OfferList from "../views/common/OfferList.svelte";
	import BranchList from "../views/common/BranchList.svelte";
	import Addons from "../views/common/Addons.svelte";
	import PaymentType from "../views/common/PaymentType.svelte";
	import ServiceAddressInvoice from "../views/common/ServiceAddressInvoice.svelte";
	import Documents from "../views/common/Documents.svelte";
	
	import StyleGuide from "../views/common/guides/StyleGuide.svelte";
	import DevGuide from "../views/common/guides/DevGuide.svelte";
	import Summary from "../views/Summary.svelte";
	import InstallationDate from "../views/common/InstallationDate.svelte";
	import VendorInfo from "../views/common/VendorInfo.svelte";
</script>

<div>
	<Header/>
	<main>
		<Router url="common">
			<Route path="dashboard" component="{Dashboard}" />
			<Route path="internet-profiler" component="{InternetProfiler}" />
			<Route path="service-address" component="{ServiceAddress}" />
			<Route path="style-guide" component="{StyleGuide}" />
			<Route path="dev-guide" component="{DevGuide}" />
			<Route path="delivery-type" component="{DeliveryType}" />
			<Route path="verification-code" component="{VerificationCode}" />
			<Route path="vendor-info" component="{VendorInfo}" />
			<Route path="purchase-summary" component="{PurchaseSummary}" />
			<Route path="plan-type" component="{PlanType}" />
			<Route path="install-date" component="{InstallationDate}"/>
			<Route path="confirm" component="{Confirm}" />
			<Route path="offer-list" component="{OfferList}" />
			<Route path="branch-list" component="{BranchList}" />
			<Route path="addons" component="{Addons}" />
			<Route path="payment-type" component="{PaymentType}" />
			<Route path="service-address-invoice" component="{ServiceAddressInvoice}"/>
			<Route path="documents" component="{Documents}"/>
			<Route path="summary" component="{Summary}"/>
		</Router>		
	</main>
	<Footer/>
</div>