import * as universal from '../entries/pages/chats/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/chats/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/chats/+page.ts";
export const imports = ["_app/immutable/nodes/3.g6U6smIK.js","_app/immutable/chunks/CveQ4vnV.js","_app/immutable/chunks/DaFqHzVn.js","_app/immutable/chunks/3IAQgkcG.js","_app/immutable/chunks/B6hwyZ9q.js","_app/immutable/chunks/9eNt1_m9.js","_app/immutable/chunks/CdKW0PxI.js","_app/immutable/chunks/pYQc-_kp.js","_app/immutable/chunks/DmLb38fm.js","_app/immutable/chunks/BeFkd0eD.js","_app/immutable/chunks/D7heD2Hx.js","_app/immutable/chunks/ehTGNA6n.js","_app/immutable/chunks/CiEvsBQu.js","_app/immutable/chunks/DVB_Lmvf.js","_app/immutable/chunks/l-5YitvB.js"];
export const stylesheets = [];
export const fonts = [];
