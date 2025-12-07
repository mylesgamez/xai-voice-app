import { Z as store_get, _ as unsubscribe_stores } from "../../../chunks/index2.js";
import { g as getContext } from "../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const connected = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("connected") === "true";
    $$renderer2.push(`<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"><div class="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 text-center">`);
    if (connected) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-6"><div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div> <h1 class="text-3xl font-bold text-white mb-3">You're Connected!</h1> <p class="text-gray-400">Your X account is now linked to your phone number. You're ready to use AI Newscaster!</p></div> <div class="bg-gray-700/50 rounded-xl p-6 mb-6"><p class="text-sm text-gray-400 mb-2">Call this number to get started:</p> <p class="text-3xl font-bold text-white tracking-wide">+1 (628) 200-3655</p> <p class="text-xs text-gray-500 mt-2">Replace with your Twilio number</p></div> <div class="text-left bg-gray-700/30 rounded-xl p-4 mb-6"><h3 class="text-sm font-medium text-gray-300 mb-3">Try saying:</h3> <ul class="space-y-2 text-sm text-gray-400"><li class="flex items-start gap-2"><span class="text-blue-400">"</span> <span>Who do I follow on X?</span> <span class="text-blue-400">"</span></li> <li class="flex items-start gap-2"><span class="text-blue-400">"</span> <span>What are @elonmusk's latest posts?</span> <span class="text-blue-400">"</span></li> <li class="flex items-start gap-2"><span class="text-blue-400">"</span> <span>Send a DM to @friend saying hello</span> <span class="text-blue-400">"</span></li> <li class="flex items-start gap-2"><span class="text-blue-400">"</span> <span>Tweet: Just tried AI Newscaster!</span> <span class="text-blue-400">"</span></li></ul></div> <a href="/chats" class="inline-flex items-center justify-center gap-2 w-full px-4 py-3 mb-4 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition border border-gray-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg> View Past Conversations</a> <a href="/" class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Back to home</a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="mb-6"><div class="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6"><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div> <h1 class="text-2xl font-bold text-white mb-3">Not Connected</h1> <p class="text-gray-400">Please connect your X account first to use AI Newscaster.</p></div> <a href="/" class="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Go to Login</a>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
