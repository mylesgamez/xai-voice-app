import { W as attributes, X as clsx, a0 as bind_props } from "./index2.js";
import { c as cn } from "./index3.js";
function Input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className,
      value = "",
      type = "text",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<input${attributes(
      {
        type,
        value,
        class: clsx(cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)),
        ...restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/>`);
    bind_props($$props, { value });
  });
}
export {
  Input as I
};
