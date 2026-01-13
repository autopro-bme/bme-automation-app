<script>
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	let first_name = '';
	let last_name = '';
	let email = '';
	let password = '';
	let phone_number = '';
	let position = '';
	let region = '';
	let error = '';

	async function signUp() {
		error = '';

		const { data, error: signUpError } = await supabase.auth.signUp({
			email,
			password
		});

		if (signUpError) {
			error = signUpError.message;
			return;
		}

		const user = data.user;

		if (user) {
			const { error: profileError } = await supabase.from('profiles').insert({
				id: user.id,
				first_name,
				last_name,
				phone_number,
				position,
				region
			});

			if (profileError) {
				error = profileError.message;
				return;
			}
		}

		// redirect to sign in
		goto('/auth/signin');
	}
</script>

<div class="box">
	<div class="form">
		<form on:submit|preventDefault={signUp}>
			<h1 class="title">Sign Up</h1>
			<p><label for="first_name">First Name</label></p>
			<p>
				<input
					name="first_name"
					type="text"
					bind:value={first_name}
					placeholder="John"
					class="input-box"
					required
				/>
			</p>
			<p><label for="last_name">Last Name</label></p>
			<p>
				<input
					name="last_name"
					type="text"
					bind:value={last_name}
					placeholder="Smith"
					class="input-box"
					required
				/>
			</p>
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
			<p><label for="phone_number">Phone Number</label></p>
			<p>
				<input
					name="phone_number"
					type="text"
					bind:value={phone_number}
					placeholder="0123456789"
					class="input-box"
					required
				/>
			</p>
			<p><label for="position">Position</label></p>
			<p>
				<input
					name="position"
					type="text"
					bind:value={position}
					placeholder="Technical Director"
					class="input-box"
					required
				/>
			</p>
			<p><label for="region">Region</label></p>
			<p>
				<select name="region" id="region" bind:value={region} class="input-box" required>
					<option value="" disabled selected>Choose a Region</option>
					<option value="local">Local</option>
					<option value="overseas">Overseas</option>
					<option value="sabah">Sabah</option>
					<option value="sarawak">Sarawak</option>
				</select>
			</p>
			{#if error}
				<p class="error">{error}</p>
			{/if}
			<p><a href="/auth/forgotpw" class="forgotpw">Forgot password?</a></p>
			<div class="button-link">
				<button type="submit" class="button-primary">Sign Up</button>
				<p class="no-account">
					Already have an account? Sign in <a href="/signin" class="signup">here</a>.
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
		min-height: 100vh;
		margin: 30px 0;
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
