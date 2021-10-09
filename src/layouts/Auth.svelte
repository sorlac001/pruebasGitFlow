<script>
	import { Router, Route } from "svelte-routing";

	// components for this layout
	import Footer from "../components/Footer.svelte";
	import Login from "../views/auth/Login.svelte";
	import RecoverPassword from "../views/auth/RecoverPassword.svelte";
</script>

<div>
	<main class="login-page">
		<Router url="auth">
			<Route path="login" component="{Login}" />
			<Route path="recover-password" component="{RecoverPassword}" />
		</Router>		
	</main>
	<Footer/>
</div>