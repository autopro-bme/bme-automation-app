// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
/// <reference types="@sveltejs/kit" />
import type { SupabaseClient, Session, User } from '@supabase/supabase-js';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: any;
			session: any;
			user: any;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
