<script>
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error = '';

	async function signIn() {
		error = '';

		const { error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (signInError) {
			error = signInError.message;
			return;
		}

		goto('/');
	}
</script>

<div class="box">
	<div class="form">
		<form on:submit|preventDefault={signIn}>
			<h1 class="title">Sign In</h1>
			<p><label for="email">E-mail</label></p>
			<p>
				<input
					name="email"
					type="email"
					bind:value={email}
					placeholder="example@email.com"
					class="input-box"
					required
				/>
			</p>
			<p><label for="password">Password</label></p>
			<p>
				<input
					name="password"
					type="password"
					bind:value={password}
					placeholder="********"
					class="input-box"
					required
				/>
			</p>
			<p><a href="/auth/forgotpw" class="forgotpw">Forgot password?</a></p>
			{#if error}
				<p class="error">{error}</p>
			{/if}
			<div class="button-link">
				<button type="submit" class="button-primary">Sign In</button>
				<p class="no-account">
					Don't have an account? Sign up <a href="/signup" class="signup">here</a>.
				</p>
			</div>
		</form>
	</div>
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
		color: #091747;
	}

	.box {
		vertical-align: middle;
		display: grid;
		align-items: center;
		justify-content: center;
		height: 70vh;
	}

	button {
		background-color: #05577ed7;
		color: #ffffff;
		border: none;
		font-size: small;
		padding: 6px 14px;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #05577ea4;
	}

	.button-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10px;
	}

	.button-primary {
		background-color: #091747;
		font-weight: bold;
		padding: 10px 20px;
	}

	.button-primary:hover {
		background-color: #091747b9;
	}

	.forgotpw {
		font-size: 14px;
	}

	.forgotpw:hover,
	.signup:hover {
		cursor: pointer;
		text-decoration: underline;
	}

	.form {
		background-color: #ffffff;
		border: 1px solid #091747b7;
		border-radius: 4px;
		padding: 30px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.input-box {
		width: 350px;
		margin-bottom: 10px;
	}

	label {
		font-weight: bold;
	}

	.no-account {
		font-size: 14px;
	}

	.signup {
		font-size: 14px;
		text-decoration: underline;
	}

	.title {
		font-size: 35px;
		font-weight: bold;
		margin-bottom: 20px;
	}
</style>
