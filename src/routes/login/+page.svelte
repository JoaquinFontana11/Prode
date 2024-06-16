<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	export let form;

	let username: string = '';
	let password: string = '';
</script>

<section class="relative">
	<div class="center">
		<p>Prode DPMA</p>
		<form class="form" method="POST" action="?/login">
			<div class="form__div">
				<input class="form__input" type="text" name="username" placeholder=" " required />
				<label class="form__label" for="user">Usuario</label>
			</div>
			<div class="form__div">
				<input class="form__input" type="password" name="password" placeholder=" " required />
				<label class="form__label" for="password">Contraseña</label>
			</div>
			<input class="form__button" type="submit" />
			{#if form?.fail}
				<span class="text__error">{form.message}</span>
			{/if}
		</form>
	</div>
</section>
