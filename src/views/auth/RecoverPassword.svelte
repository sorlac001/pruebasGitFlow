<script>
    import { link } from "svelte-routing";
    // core components
</script>

<div>
	<div class="pure-g">
		<div class="pure-u-1">
			<div class="header-contents d-flex align-items-center justify-content-between">
				<a use:link href="./login" class="back-link">
					<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg>
					<span>Regresar</span>
				</a>
				<div class="header-options">
					<a use:link href="/login" class="header-logo"><img src="/assets/img/logos/izzi-logo.svg" alt="izzi"></a>
				</div>
			</div>
		</div>
	</div>
	<div class="pure-g justify-content-center">
		<div class="panel panel--small panel--centered m-b-30 text-center ">
			<div class="m-b-15">
				<img class="izzi-logo m-b-15" src="/assets/img/logos/izzi-logo.svg" alt="izzi">
				<p class="fw-semibold m-b-0">Recuperar contraseña</p>
			</div>
				
			<div class="ctrl-holder m-b-15">
				<label for="recover_noempleado" class="placeholder">No. de empleado</label>
				<input type="text" name="recover_noempleado" id="recover_noempleado" value="" required>
			</div>
			<div class="ctrl-holder m-b-15">
				<label for="recover_email" class="placeholder">Correo electrónico</label>
				<input type="email" name="recover_email" id="recover_email" required>
			</div>
			<div class="m-b-15">
				<button class="pure__button pure__button--primary" type="button">Recuerar contraseña</button>
			</div>
		</div>
	</div>
</div>