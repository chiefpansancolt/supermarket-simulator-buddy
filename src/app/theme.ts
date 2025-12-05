import { createTheme } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react/types";

export const customTheme: CustomFlowbiteTheme = createTheme({
  button: {
    base: "cursor-pointer",
  },
  dropdown: {
    inlineWrapper: "cursor-pointer",
  },
  modal: {
    header: {
      close: {
        base: "cursor-pointer",
      },
    },
  },
  select: {
    field: {
      select: {
        base: "cursor-pointer",
      },
    },
  },
  sidebar: {
    item: {
      base: "cursor-pointer text-sm",
    },
  },
  tabs: {
    tablist: {
      tabitem: {
        base: "cursor-pointer",
      },
    },
  },
});
