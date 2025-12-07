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
		client: {start:"_app/immutable/entry/start.DRj2SphJ.js",app:"_app/immutable/entry/app.BNoR1gmV.js",imports:["_app/immutable/entry/start.DRj2SphJ.js","_app/immutable/chunks/l-5YitvB.js","_app/immutable/chunks/DaFqHzVn.js","_app/immutable/chunks/ehTGNA6n.js","_app/immutable/entry/app.BNoR1gmV.js","_app/immutable/chunks/DaFqHzVn.js","_app/immutable/chunks/CiEvsBQu.js","_app/immutable/chunks/DmLb38fm.js","_app/immutable/chunks/3IAQgkcG.js","_app/immutable/chunks/ehTGNA6n.js","_app/immutable/chunks/CdKW0PxI.js","_app/immutable/chunks/9eNt1_m9.js","_app/immutable/chunks/DVB_Lmvf.js","_app/immutable/chunks/0uibvxPT.js","_app/immutable/chunks/BeFkd0eD.js","_app/immutable/chunks/D7heD2Hx.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
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
