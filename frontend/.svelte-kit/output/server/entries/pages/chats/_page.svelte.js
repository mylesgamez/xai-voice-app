import { _ as ensure_array_like } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import { C as Card, a as Card_content, b as Card_header, c as Card_title, d as Card_description } from "../../../chunks/card-title.js";
import "clsx";
import { B as Button } from "../../../chunks/button.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    function formatDate(isoString) {
      const date = new Date(isoString);
      const now = /* @__PURE__ */ new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 6e4);
      const diffHours = Math.floor(diffMs / 36e5);
      const diffDays = Math.floor(diffMs / 864e5);
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : void 0
      });
    }
    function truncate(text, maxLength) {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + "...";
    }
    $$renderer2.push(`<div class="min-h-screen bg-background"><div class="container max-w-2xl py-8 px-4"><div class="mb-6"><h1 class="text-2xl font-bold">Conversations</h1></div> `);
    if (!data.phoneNumber) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!---->`);
      Card($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->`);
          Card_content($$renderer3, {
            class: "py-8 text-center",
            children: ($$renderer4) => {
              $$renderer4.push(`<p class="text-muted-foreground">Please connect your phone number first.</p> `);
              Button($$renderer4, {
                href: "/profile",
                class: "mt-4",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Go to Profile`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (data.conversations.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<!---->`);
        Card($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->`);
            Card_content($$renderer3, {
              class: "py-8 text-center",
              children: ($$renderer4) => {
                $$renderer4.push(`<p class="text-muted-foreground">No conversations yet. Make a phone call to start!</p> `);
                Button($$renderer4, {
                  href: "/profile",
                  class: "mt-4",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->View Profile`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="space-y-3"><!--[-->`);
        const each_array = ensure_array_like(data.conversations);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let conversation = each_array[$$index];
          $$renderer2.push(`<!---->`);
          Card($$renderer2, {
            class: "cursor-pointer transition-colors hover:bg-accent/50",
            onclick: () => goto(`/chats/${conversation.id}`),
            children: ($$renderer3) => {
              $$renderer3.push(`<!---->`);
              Card_header($$renderer3, {
                class: "pb-2",
                children: ($$renderer4) => {
                  $$renderer4.push(`<div class="flex items-center justify-between"><!---->`);
                  Card_title($$renderer4, {
                    class: "text-lg",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->${escape_html(conversation.title)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push(`<!----> <span class="text-sm text-muted-foreground">${escape_html(formatDate(conversation.started_at))}</span></div> <!---->`);
                  Card_description($$renderer4, {
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->${escape_html(conversation.message_count)} message${escape_html(conversation.message_count !== 1 ? "s" : "")} `);
                      if (conversation.ended_at) {
                        $$renderer5.push("<!--[-->");
                        $$renderer5.push(`<span class="ml-2 text-xs text-green-600">Completed</span>`);
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push(`<span class="ml-2 text-xs text-yellow-600">In progress</span>`);
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
              if (conversation.last_message) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<!---->`);
                Card_content($$renderer3, {
                  class: "pt-0",
                  children: ($$renderer4) => {
                    $$renderer4.push(`<p class="text-sm text-muted-foreground"><span class="font-medium">${escape_html(conversation.last_message.role === "user" ? "You" : "AI")}:</span> ${escape_html(truncate(conversation.last_message.content, 100))} `);
                    if (conversation.last_message.source === "voice") {
                      $$renderer4.push("<!--[-->");
                      $$renderer4.push(`<span class="ml-1" title="Voice message">🎤</span>`);
                    } else {
                      $$renderer4.push("<!--[!-->");
                      $$renderer4.push(`<span class="ml-1" title="Text message">💬</span>`);
                    }
                    $$renderer4.push(`<!--]--></p>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer3.push(`<!---->`);
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
          $$renderer2.push(`<!---->`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
