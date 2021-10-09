<script>
	import { Router, Route } from "svelte-routing";
  
	// Layout
	import Auth from "./layouts/Auth.svelte";
	import Common from "./layouts/Common.svelte";

	// No Layout Pages
	import Index from "./views/Index.svelte";
	import Landing from "./views/Landing.svelte";
	import Profile from "./views/Profile.svelte";
  
	export let url = "";
  </script>
  
  <Router url="{url}">
	<!-- layout -->
	<Route path="/*common" component="{Common}" />
	<Route path="auth/*auth" component="{Auth}" />

	<!-- no layout pages -->
	<Route path="landing" component="{Landing}" />
	<Route path="profile" component="{Profile}" />
	<Route path="/" component="{Index}" />
  </Router>