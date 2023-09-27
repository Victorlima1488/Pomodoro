import 'styled-components';
import {defaultTheme} from '../Styles/themes/theme'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
    export interface defaultTheme extends ThemeType {}
}