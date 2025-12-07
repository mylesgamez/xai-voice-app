import { U as attr_style, V as stringify, W as attributes, X as clsx, Y as store_get, Z as unsubscribe_stores } from "../../chunks/index2.js";
import { a as auth } from "../../chunks/auth.js";
import { g as getContext, s as setContext, e as escape_html } from "../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { c as cn } from "../../chunks/index3.js";
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
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_CONTEXT_KEY = "sidebar";
function setSidebarContext(state) {
  setContext(SIDEBAR_CONTEXT_KEY, state);
}
function getSidebarContext() {
  return getContext(SIDEBAR_CONTEXT_KEY);
}
function Sidebar_provider($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    let isOpen = true;
    let isMobile = false;
    function toggle() {
      isOpen = !isOpen;
    }
    setSidebarContext({
      get isOpen() {
        return isOpen;
      },
      get isMobile() {
        return isMobile;
      },
      toggle
    });
    $$renderer2.push(`<div class="flex min-h-screen w-full"${attr_style(`--sidebar-width: ${stringify(SIDEBAR_WIDTH)}; --sidebar-width-mobile: ${stringify(SIDEBAR_WIDTH_MOBILE)};`)}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...restProps } = $$props;
    const sidebar = getSidebarContext();
    if (sidebar.isMobile) {
      $$renderer2.push("<!--[-->");
      if (sidebar.isOpen) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="fixed inset-0 z-40 bg-black/50" role="button" tabindex="-1"></div> <aside${attributes({
          class: clsx(cn("fixed inset-y-0 left-0 z-50 flex w-[var(--sidebar-width-mobile)] flex-col border-r bg-background", className)),
          ...restProps
        })}>`);
        children?.($$renderer2);
        $$renderer2.push(`<!----></aside>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<aside${attributes({
        class: clsx(cn("flex h-screen w-[var(--sidebar-width)] flex-col border-r bg-background transition-all duration-300", !sidebar.isOpen && "w-0 overflow-hidden border-r-0", className)),
        ...restProps
      })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></aside>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Sidebar_header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...restProps } = $$props;
    $$renderer2.push(`<div${attributes({
      class: clsx(cn("flex h-14 items-center border-b px-4", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function Sidebar_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...restProps } = $$props;
    $$renderer2.push(`<div${attributes({
      class: clsx(cn("flex-1 overflow-auto py-2", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function Sidebar_footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...restProps } = $$props;
    $$renderer2.push(`<div${attributes({
      class: clsx(cn("mt-auto border-t p-4", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function Sidebar_group($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...restProps } = $$props;
    $$renderer2.push(`<div${attributes({ class: clsx(cn("px-3 py-2", className)), ...restProps })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function Sidebar_menu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...restProps } = $$props;
    $$renderer2.push(`<ul${attributes({
      class: clsx(cn("flex w-full flex-col gap-1", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></ul>`);
  });
}
function Sidebar_menu_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...restProps } = $$props;
    $$renderer2.push(`<li${attributes({ class: clsx(cn("", className)), ...restProps })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></li>`);
  });
}
function Sidebar_menu_button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      href,
      isActive = false,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    if (href) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attributes({
        href,
        class: clsx(cn("flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors", "hover:bg-accent hover:text-accent-foreground", isActive && "bg-accent text-accent-foreground", className)),
        ...restProps
      })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({
        type: "button",
        class: clsx(cn("flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors", "hover:bg-accent hover:text-accent-foreground", isActive && "bg-accent text-accent-foreground", className)),
        ...restProps
      })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></button>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Sidebar_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, $$slots, $$events, ...restProps } = $$props;
    getSidebarContext();
    $$renderer2.push(`<button${attributes({
      type: "button",
      class: clsx(cn("inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground", className)),
      ...restProps
    })}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> <span class="sr-only">Toggle sidebar</span></button>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    const publicRoutes = ["/", "/dashboard"];
    let isPublicRoute = publicRoutes.includes(store_get($$store_subs ??= {}, "$page", page).url.pathname);
    if (isPublicRoute) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!---->`);
      Sidebar_provider($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->`);
          Sidebar($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->`);
              Sidebar_header($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg></div> <span class="font-semibold">AI Newscaster</span></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> <!---->`);
              Sidebar_content($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->`);
                  Sidebar_group($$renderer5, {
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->`);
                      Sidebar_menu($$renderer6, {
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->`);
                          Sidebar_menu_item($$renderer7, {
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->`);
                              Sidebar_menu_button($$renderer8, {
                                href: "/chats",
                                isActive: store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/chats"),
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg> Chats`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!---->`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> <!---->`);
                          Sidebar_menu_item($$renderer7, {
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->`);
                              Sidebar_menu_button($$renderer8, {
                                href: "/profile",
                                isActive: store_get($$store_subs ??= {}, "$page", page).url.pathname === "/profile",
                                children: ($$renderer9) => {
                                  $$renderer9.push(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> Profile`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer8.push(`<!---->`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> <!---->`);
              Sidebar_footer($$renderer4, {
                children: ($$renderer5) => {
                  if (store_get($$store_subs ??= {}, "$auth", auth).isConnected) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<div class="flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted"><span class="text-xs font-medium">${escape_html(store_get($$store_subs ??= {}, "$auth", auth).xName?.charAt(0) || "U")}</span></div> <div class="flex flex-col"><span class="text-sm font-medium">${escape_html(store_get($$store_subs ??= {}, "$auth", auth).xName)}</span> <span class="text-xs text-muted-foreground">@${escape_html(store_get($$store_subs ??= {}, "$auth", auth).xUsername)}</span></div></div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                    if (!store_get($$store_subs ??= {}, "$auth", auth).loading) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<a href="/profile" class="text-sm text-muted-foreground hover:text-foreground">Connect X account</a>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]-->`);
                  }
                  $$renderer5.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> <main class="flex-1 overflow-auto"><div class="md:hidden fixed top-0 left-0 z-30 p-2"><!---->`);
          Sidebar_trigger($$renderer3, {});
          $$renderer3.push(`<!----></div> `);
          children($$renderer3);
          $$renderer3.push(`<!----></main>`);
        }
      });
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
