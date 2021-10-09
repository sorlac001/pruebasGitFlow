<script>
	import Preloader from "../../../components/Preloader.svelte"
	import { onMount } from 'svelte';
	
    onMount(() => {
        // enable functions for main.min.js
        document.onreadystatechange();        
    });

</script>

<div>
	<div class="pure-g m-b-40">
		<div class="pure-u-1 text-center">
			<h1 class="text-fs-26">Guia de estilos</h1>
			<img class="izzi-logo" src="/assets/img/logos/izzi-logo.svg" alt="izzi">
		</div>
	</div>
	<div class="pure-g m-b-20">
		<div class="pure-u-1 text-center">
			<h2 class="text-fs-26 m-b-20">Cards</h2>
		</div>
	</div>
	<div class="pure-g m-b-30">
		<div class="pure-u-1 pure-u-md-1-2">
			<div class="featured-tabs">
				<div class="featured-tab__content-holder">
					<div id="feature1" class="featured-tab-content featured-tab-content--active">
						<img src="/assets/img/content/featured-tab-thumb-1.jpg" alt="">
					</div>
					<div id="feature2" class="featured-tab-content">
						<img src="/assets/img/content/featured-tab-thumb-2.jpg" alt="">
					</div>
				</div>
				<div class="featured-tab-controls">
					<a href="#feature1" class="featured-tab-control featured-tab-control--active"><span></span></a>
					<a href="#feature2" class="featured-tab-control"><span></span></a>
				</div>
			</div>
		</div>
		<div class="pure-u-1 pure-u-md-1-2">
			<div class="cards-grid">
				<div class="card card--white">
					<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-inbox"></use></svg>
					<p>Card Default</p>
				</div>
				<div class="card card--orange">
					<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-smartphone"></use></svg>
					<p>Card Orange</p>
				</div>
				<div class="card card--green">
					<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-briefcase"></use></svg>
					<p>Card Green</p>
				</div>
				<div class="card card--primary">
					<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-home"></use></svg>
					<p>Card Primary</p>
				</div>
			</div>
		</div>
	</div>
	<div class="pure-g">
		<div class="pure-u-1">
			<div class="panel panel--small panel--centered m-b-30">
				<p>Panel pequeño y centrado</p>
				<h2 class="text-fs-26 m-b-20">Paleta de colores</h2>
				<div class="bg-primary" style="width: 100%; height: 20px; margin-bottom: 15px"></div>
				<div class="bg-base" style="width: 100%; height: 20px; margin-bottom: 15px"></div>
				<div class="bg-yellow" style="width: 100%; height: 20px; margin-bottom: 15px"></div>
				<div class="bg-blue" style="width: 100%; height: 20px; margin-bottom: 15px"></div>
				<div class="bg-aqua" style="width: 100%; height: 20px; margin-bottom: 15px"></div>
				<div class="bg-orange" style="width: 100%; height: 20px; margin-bottom: 15px"></div>
				<div class="bg-green" style="width: 100%; height: 20px; margin-bottom: 40px"></div>
				<h2 class="text-fs-26">Titulo tamaño 26</h2>
				<h2 class="text-fs-23">Titulo tamaño 23</h2>
				<h2 class="text-fs-20">Titulo tamaño 20</h2>
				<p class="m-b-0">Parrafo default (15px)</p>
			</div>
		</div>
	</div>
	<div class="pure-g">
		<div class="pure-u-1 pure-u-md-7-24 md-order-1">
			<p>sidebar</p>
		</div>
		<div class="pure-u-1 pure-u-md-17-24 md-order-0">
			<div class="panel m-b-30">
				<p>Panel normal</p>
				<h2 class="text-fs-26 m-b-20">Inputs</h2>
				<div class="pure-g align-items-center m-b-20">
					<div class="pure-u-1 pure-u-sm-1-2">
						<div class="ctrl-holder m-b-20">
							<label for="nombre" class="placeholder">Nombre</label>
							<input type="text" name="" id="nombre" value="" required>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-2">
						<div class="ctrl-holder m-b-20">
							<label for="correo" class="placeholder">Correo</label>
							<input type="email" name="" id="correo" required>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-2">
						<div class="select-holder m-b-20">
							<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-angle-left"></use></svg>
							<label for="select" class="hidden-label">Selecciona</label>
							<select name="" id="select">
								<option value="">Selecciona</option>                                                          
								<option value="1">1</option>                                                          
								<option value="2">2</option>                                                          
							</select>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-2-2">
						<div class="pure-g">
							<div class="pure-u-2-3">
								<p>¿Deseas domiciliar? </p>
							</div>
							<div class="pure-u-1-3">
								<span class="checkbox-switch">
									<input type="checkbox" name="domiciliar" id="domiciliar" checked>
									<label for="domiciliar"></label>
								</span>
							</div>
						</div>
					</div>
					<div class="pure-u-1 pure-u-sm-1-2 pure-u-sm-offset-1-4">
						<div class="text-center">
							<p class="fw-semibold"><a href="#/" class="primary-text">Acción</a></p>
							<button class="pure__button pure__button--primary" type="button">ENVIAR</button>
						</div>
					</div>
				</div>
				<h2 class="text-fs-26 m-b-20">Alertas</h2>
				<div class="alert">
					<p>Alerta normal</p>
				</div>
				<div class="alert alert--success">
					<p>Alerta éxito</p>
				</div>
				<div class="alert alert--error m-b-40">
					<p>Alerta error</p>
				</div>
				<h2 class="text-fs-26 m-b-20">Botones</h2>
				<a href="#/" class="pure__button pure__button--primary">Boton primario</a>
				<a href="#/" class="pure__button pure__button--light-primary">Boton primario alterno</a>
			</div>
			<h2 class="text-center text-fs-26 m-b-20">Filas de acciones superior</h2>
			<div class="pure-g m-b-20">
				<div class="pure-u-1 pure-u-md-2-3 sm-m-b-20">
					<h3 class="text-fs-20">Texto de ejemplo para fila de <span class="fw-semibold">acción</span></h3>
				</div>
				<div class="pure-u-1 pure-u-md-1-3 md-text-right">
					<a href="#/" class="pure__button pure__button--primary">Siguiente</a>
				</div>
			</div>
			<h2 class="text-center text-fs-26 m-b-20">Filas de acciones (atrás y siguiente)</h2>
			<div class="d-flex align-items-center justify-content-between">
				<a href="#/" class="back-link">
					<svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"></use></svg>
					<span>atrás</span>
				</a>
				<a href="#/" class="pure__button pure__button--primary">Siguiente</a>
			</div>
		</div>
	</div>
	<div class="text-center"><Preloader/></div>
</div>