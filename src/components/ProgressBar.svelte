<script>
	export let progress;
</script>

<div class="progress-bar-holder">
	<div class="progress-bar"></div>
	<div class="progress-indicator" style="width: {progress}%"></div>
	<div class="progress-text" style="width: {progress}%">{progress}%</div>
</div>
