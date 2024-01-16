import { Root } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends Root {}
}
