import { create } from "@storybook/theming/create";
import logo from "./nimble-ui-logo.png";
import {
  Black91,
  Brand,
  Brand50,
  Selection100,
  White
} from "@ni/nimble-tokens/dist/styledictionary/js/tokens";

export default create({
  base: "light",

  colorPrimary: Brand,
  colorSecondary: Selection100,

  // UI
  appBg: "white",
  appContentBg: "#F4F4F4",
  appBorderColor: "grey",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "black",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barTextColor: White,
  barSelectedColor: White,
  barBg: Brand,

  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "black",
  inputBorderRadius: 4,

  brandTitle: "Nimble components",
  brandUrl: "https://github.com/ni/nimble",
  brandImage: logo
});
