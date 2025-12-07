import { Y as store_get, Z as unsubscribe_stores } from "../../../chunks/index2.js";
import { a as auth } from "../../../chunks/auth.js";
import { B as Button } from "../../../chunks/button.js";
import { I as Input } from "../../../chunks/input.js";
import { C as Card, b as Card_header, c as Card_title, d as Card_description, a as Card_content } from "../../../chunks/card-title.js";
import "clsx";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const API_URL = "http://localhost:8000";
    let phoneInput = "";
    function connectX() {
      if (!phoneInput) {
        alert("Please enter your phone number");
        return;
      }
      auth.setPhone(phoneInput);
      window.location.href = `${API_URL}/api/auth/x/start?phone=${encodeURIComponent(phoneInput)}`;
    }
    function disconnectX() {
      auth.disconnect();
      phoneInput = "";
    }
    function formatPhone(e) {
      const input = e.target;
      if (input.value && !input.value.startsWith("+")) {
        phoneInput = "+" + input.value.replace(/[^0-9]/g, "");
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="container max-w-2xl py-8 px-4"><h1 class="text-2xl font-bold mb-6">Profile</h1> <!---->`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Card_title($$renderer5, {
                class: "text-lg",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Phone Number`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Your phone number is used to identify you when you call the AI Newscaster service.`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <!---->`);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              Input($$renderer5, {
                type: "tel",
                oninput: formatPhone,
                placeholder: "+1 555 123 4567",
                disabled: store_get($$store_subs ??= {}, "$auth", auth).isConnected,
                get value() {
                  return phoneInput;
                },
                set value($$value) {
                  phoneInput = $$value;
                  $$settled = false;
                }
              });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <!---->`);
      Card($$renderer3, {
        class: "mt-6",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Card_header($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Card_title($$renderer5, {
                class: "text-lg",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->X Account`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Card_description($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Connect your X account to get personalized news and interact with the platform.`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <!---->`);
          Card_content($$renderer4, {
            children: ($$renderer5) => {
              if (store_get($$store_subs ??= {}, "$auth", auth).loading) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<p class="text-muted-foreground">Loading...</p>`);
              } else {
                $$renderer5.push("<!--[!-->");
                if (store_get($$store_subs ??= {}, "$auth", auth).isConnected) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-full bg-muted"><span class="text-sm font-medium">${escape_html(store_get($$store_subs ??= {}, "$auth", auth).xName?.charAt(0) || "U")}</span></div> <div><p class="font-medium">${escape_html(store_get($$store_subs ??= {}, "$auth", auth).xName)}</p> <p class="text-sm text-muted-foreground">@${escape_html(store_get($$store_subs ??= {}, "$auth", auth).xUsername)}</p></div></div> `);
                  Button($$renderer5, {
                    variant: "destructive",
                    onclick: disconnectX,
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Disconnect`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----></div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                  Button($$renderer5, {
                    onclick: connectX,
                    disabled: !phoneInput,
                    children: ($$renderer6) => {
                      $$renderer6.push(`<svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg> Connect with X`);
                    },
                    $$slots: { default: true }
                  });
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
      $$renderer3.push(`<!----> `);
      if (store_get($$store_subs ??= {}, "$auth", auth).isConnected) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<!---->`);
        Card($$renderer3, {
          class: "mt-6",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Card_header($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Card_title($$renderer5, {
                  class: "text-lg",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Call AI Newscaster`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <!---->`);
                Card_description($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Call this number to get personalized news delivered by AI.`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> <!---->`);
            Card_content($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<p class="text-3xl font-bold tracking-wide">+1 (628) 200-3655</p> <p class="text-xs text-muted-foreground mt-2">Your Twilio number</p>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <!---->`);
        Card($$renderer3, {
          class: "mt-6",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Card_header($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Card_title($$renderer5, {
                  class: "text-lg",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Try Saying`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> <!---->`);
            Card_content($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<ul class="space-y-2 text-sm text-muted-foreground"><li>"Who do I follow on X?"</li> <li>"What are @elonmusk's latest posts?"</li> <li>"Send a DM to @friend saying hello"</li> <li>"Tweet: Just tried AI Newscaster!"</li></ul>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
