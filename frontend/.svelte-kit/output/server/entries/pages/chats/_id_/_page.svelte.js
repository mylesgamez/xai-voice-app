import { W as attributes, X as clsx, _ as ensure_array_like, $ as attr_class, V as stringify } from "../../../../chunks/index2.js";
import { g as goto } from "../../../../chunks/client.js";
import { B as Button } from "../../../../chunks/button.js";
import { I as Input } from "../../../../chunks/input.js";
import { c as cn } from "../../../../chunks/index3.js";
import { e as escape_html } from "../../../../chunks/context.js";
function Scroll_area($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...restProps } = $$props;
    $$renderer2.push(`<div${attributes({
      class: clsx(cn("relative overflow-auto", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let messages = [];
    let newMessage = "";
    let sending = false;
    function formatTime(isoString) {
      const date = new Date(isoString);
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex h-screen flex-col bg-background"><header class="border-b px-4 py-3"><div class="container flex max-w-2xl items-center gap-4">`);
      Button($$renderer3, {
        variant: "ghost",
        size: "icon",
        onclick: () => goto(),
        children: ($$renderer4) => {
          $$renderer4.push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div><h1 class="font-semibold">${escape_html(data.conversation?.title || "Conversation")}</h1> `);
      if (data.conversation) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<p class="text-xs text-muted-foreground">${escape_html(new Date(data.conversation.started_at).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        }))}</p>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></div></header> `);
      Scroll_area($$renderer3, {
        class: "flex-1 overflow-y-auto",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="container max-w-2xl space-y-4 px-4 py-4">`);
          if (!data.conversation) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="py-8 text-center text-muted-foreground"><p>Conversation not found.</p> `);
            Button($$renderer4, {
              href: "/chats",
              class: "mt-4",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Back to Chats`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
            if (messages.length === 0) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="py-8 text-center text-muted-foreground"><p>No messages yet. Start the conversation!</p></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push(`<!--[-->`);
              const each_array = ensure_array_like(messages);
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let message = each_array[$$index];
                $$renderer4.push(`<div${attr_class(`flex ${stringify(message.role === "user" ? "justify-end" : "justify-start")}`)}><div${attr_class(`max-w-[80%] rounded-lg px-4 py-2 ${stringify(message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}`)}><p class="whitespace-pre-wrap">${escape_html(message.content)}</p> <div${attr_class(`mt-1 flex items-center gap-1 text-xs ${stringify(message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground")}`)}><span>${escape_html(formatTime(message.created_at))}</span> `);
                if (message.source === "voice") {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<span title="Voice message">🎤</span>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push(`<span title="Text message">💬</span>`);
                }
                $$renderer4.push(`<!--]--></div></div></div>`);
              }
              $$renderer4.push(`<!--]-->`);
            }
            $$renderer4.push(`<!--]-->`);
          }
          $$renderer4.push(`<!--]--></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      if (data.conversation) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="border-t p-4"><form class="container flex max-w-2xl gap-2">`);
        Input($$renderer3, {
          placeholder: "Continue the conversation...",
          disabled: sending,
          class: "flex-1",
          get value() {
            return newMessage;
          },
          set value($$value) {
            newMessage = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          type: "submit",
          disabled: !newMessage.trim() || sending,
          children: ($$renderer4) => {
            {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push(`Send`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></form></div>`);
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
  });
}
export {
  _page as default
};
