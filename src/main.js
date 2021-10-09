import App from "./App.svelte";

const app = new App({
	props: {
		name: 'izziuxp-web-oc'
	},
	target: document.getElementById("app"),
});

export default app;