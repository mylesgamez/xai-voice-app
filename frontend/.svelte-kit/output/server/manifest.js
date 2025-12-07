export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.D9xX-oqT.js",app:"_app/immutable/entry/app.BWWElfXt.js",imports:["_app/immutable/entry/start.D9xX-oqT.js","_app/immutable/chunks/JhTlYO8B.js","_app/immutable/chunks/B2myL-Op.js","_app/immutable/chunks/PI8fN_LJ.js","_app/immutable/entry/app.BWWElfXt.js","_app/immutable/chunks/B2myL-Op.js","_app/immutable/chunks/D5IRr4dr.js","_app/immutable/chunks/9WhkDaYY.js","_app/immutable/chunks/CtvB_Hsv.js","_app/immutable/chunks/PI8fN_LJ.js","_app/immutable/chunks/BStlHI7h.js","_app/immutable/chunks/BbXXwbeS.js","_app/immutable/chunks/BN94MnuU.js","_app/immutable/chunks/BPtYs5MB.js","_app/immutable/chunks/CKWyjOcI.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/chats",
				pattern: /^\/chats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/chats/[id]",
				pattern: /^\/chats\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
