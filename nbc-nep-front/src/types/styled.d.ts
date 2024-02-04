import { Root } from './theme.types'

declare module 'styled-components' {
  export interface DefaultTheme extends Root {}
}
