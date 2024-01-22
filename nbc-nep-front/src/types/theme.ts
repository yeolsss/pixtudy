export interface Root {
  color: Color;
  unit: Unit;
  spacing: Spacing;
  border: Border2;
  heading: Heading;
  body: Body;
  elevation: Elevation;
  desktop: Desktop2;
  tablet: Tablet;
  mobile: Mobile2;
  docs: Docs;
  video: Video;
}

export interface Color {
  metaverse: Metaverse;
  blue: Blue;
  red: Red;
  green: Green;
  yellow: Yellow;
  orange: Orange;
  indigo: Indigo;
  teal: Teal;
  grey: Grey;
  base: Base;
  brand: Brand;
  info: Info;
  success: Success;
  warning: Warning;
  danger: Danger;
  neutral: Neutral;
  bg: Bg;
  text: Text;
  icon: Icon;
  border: Border;
}

export interface Metaverse {
  primary: string;
  secondary: string;
}

export interface Blue {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

export interface Red {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

export interface Green {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

export interface Yellow {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

export interface Orange {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

export interface Indigo {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

export interface Teal {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

export interface Grey {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  "sub-line": string;
}

export interface Base {
  black: string;
  white: string;
}

export interface Brand {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

export interface Info {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
}

export interface Success {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
}

export interface Warning {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
}

export interface Danger {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
}

export interface Neutral {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

export interface Bg {
  primary: string;
  secondary: string;
  tertiary: string;
  "info-bold": string;
  "info-subtle": string;
  "warning-bold": string;
  "warning-subtle": string;
  "success-bold": string;
  "success-subtle": string;
  "danger-bold": string;
  "danger-subtle": string;
  "inverse-bold": string;
  brand: string;
  disabled: string;
  interactive: Interactive;
}

export interface Interactive {
  primary: string;
  "primary-hovered": string;
  "primary-pressed": string;
  secondary: string;
  "secondary-hovered": string;
  "secondary-pressed": string;
  danger: string;
  "danger-hovered": string;
  "danger-pressed": string;
  selected: string;
  "selected-hovered": string;
  "selected-press": string;
}

export interface Text {
  primary: string;
  secondary: string;
  tertiary: string;
  brand: string;
  info: string;
  "info-bold": string;
  warning: string;
  "warning-bold": string;
  success: string;
  "success-bold": string;
  danger: string;
  "danger-bold": string;
  disabled: string;
  interactive: Interactive2;
}

export interface Interactive2 {
  primary: string;
  "primary-hovered": string;
  "primary-pressed": string;
  secondary: string;
  "secondary-hovered": string;
  "secondary-pressed": string;
  selected: string;
  inverse: string;
}

export interface Icon {
  primary: string;
  brand: string;
  info: string;
  warning: string;
  success: string;
  danger: string;
  disabled: string;
  interactive: Interactive3;
}

export interface Interactive3 {
  primary: string;
  "primary-hovered": string;
  "primary-pressed": string;
  secondary: string;
  "secondary-hovered": string;
  "secondary-press": string;
  selected: string;
  inverse: string;
}

export interface Border {
  primary: string;
  secondary: string;
  focusRing: string;
  info: string;
  "info-subtle": string;
  warning: string;
  "warning-subtle": string;
  success: string;
  "success-subtle": string;
  danger: string;
  "danger-subtle": string;
  disabled: string;
  "sub-line": string;
  interactive: Interactive4;
}

export interface Interactive4 {
  primary: string;
  "primary-hovered": string;
  "primary-pressed": string;
  secondary: string;
  "secondary-hovered": string;
  "secondary-pressed": string;
}

export interface Unit {
  "0": number;
  "2": number;
  "4": number;
  "8": number;
  "12": number;
  "13": number;
  "14": number;
  "15": number;
  "16": number;
  "19-5": number;
  "20": number;
  "24": number;
  "32": number;
  "36": number;
  "40": number;
  "48": number;
  "56": number;
  "64": number;
  "80": number;
  "96": number;
  "112": number;
  "128": number;
  "130": number;
  "181": number;
  "412": number;
  "460": number;
}

export interface Spacing {
  "0": string;
  "2": string;
  "4": string;
  "6": string;
  "8": string;
  "12": string;
  "14": string;
  "16": string;
  "19-5": string;
  "20": string;
  "24": string;
  "32": string;
  "36": string;
  "40": string;
  "44": string;
  "48": string;
  "64": string;
  "80": string;
  "96": string;
  "112": string;
  "118": string;
  "128": string;
}

export interface Border2 {
  radius: Radius;
}

export interface Radius {
  "0": string;
  "2": string;
  "4": string;
  "8": string;
  "12": string;
  "16": string;
  "36": string;
  circle: string;
}

export interface Heading {
  mobile: Mobile;
  desktop: Desktop;
}

export interface Mobile {
  "4xl": N4xl;
  "3xl": N3xl;
  "2xl": N2xl;
  xl: Xl;
  lg: Lg;
}

export interface N4xl {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface N3xl {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface N2xl {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Xl {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Lg {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Desktop {
  "4xl": N4xl2;
  "3xl": N3xl2;
  "2xl": N2xl2;
  xl: Xl2;
  lg: Lg2;
  md: Md;
  sm: Sm;
}

export interface N4xl2 {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface N3xl2 {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface N2xl2 {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Xl2 {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Lg2 {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Md {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Sm {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Body {
  lg: Lg3;
  md: Md2;
  sm: Sm2;
}

export interface Lg3 {
  regular: Regular;
  medium: Medium;
  semibold: Semibold;
}

export interface Regular {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Medium {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Semibold {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Md2 {
  regular: Regular2;
  medium: Medium2;
  semibold: Semibold2;
  underline: Underline;
  encode: Encode;
}

export interface Regular2 {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Medium2 {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Semibold2 {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Underline {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Encode {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Sm2 {
  regular: Regular3;
  medium: Medium3;
}

export interface Regular3 {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Medium3 {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: number;
  textCase: string;
  textDecoration: string;
}

export interface Elevation {
  Light: Light;
  Dark: Dark;
}

export interface Light {
  shadow2: string;
  shadow4: string;
  shadow8: string;
  shadow16: string;
}

export interface Dark {
  shadow2: string;
  shadow4: string;
  shadow8: string;
  shadow16: string;
}

export interface Desktop2 {
  layoutGrids: LayoutGrid[];
}

export interface LayoutGrid {
  pattern: string;
  color: Color2;
  alignment: string;
  gutterSize: number;
  offset: number;
  count: number;
}

export interface Color2 {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Tablet {
  layoutGrids: LayoutGrid2[];
}

export interface LayoutGrid2 {
  pattern: string;
  color: Color3;
  alignment: string;
  gutterSize: number;
  offset: number;
  count: number;
}

export interface Color3 {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Mobile2 {
  layoutGrids: LayoutGrid3[];
}

export interface LayoutGrid3 {
  pattern: string;
  color: Color4;
  alignment: string;
  gutterSize: number;
  offset: number;
  count: number;
}

export interface Color4 {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Docs {
  layoutGrids: LayoutGrid4[];
}

export interface LayoutGrid4 {
  pattern: string;
  color: Color5;
  alignment: string;
  gutterSize: number;
  offset: number;
  count: number;
  sectionSize?: number;
}

export interface Color5 {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Video {
  width: string;
  height: string;
}
