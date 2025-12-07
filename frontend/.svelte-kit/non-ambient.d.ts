
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/chats" | "/chats/[id]" | "/dashboard";
		RouteParams(): {
			"/chats/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/chats": { id?: string };
			"/chats/[id]": { id: string };
			"/dashboard": Record<string, never>
		};
		Pathname(): "/" | "/chats" | "/chats/" | `/chats/${string}` & {} | `/chats/${string}/` & {} | "/dashboard" | "/dashboard/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}