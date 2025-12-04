import { createTheme } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react/types";

export const customTheme: CustomFlowbiteTheme = createTheme({
  button: {
    base: "cursor-pointer",
  },
  dropdown: {
    inlineWrapper: "cursor-pointer",
  },
});
