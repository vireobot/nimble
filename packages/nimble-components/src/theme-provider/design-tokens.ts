import { DesignToken } from '@microsoft/fast-foundation';
import hexRgb from 'hex-rgb';
import {
    Black91,
    Black85,
    Black15,
    White,
    Brand100,
    Selection100,
    BodyFamily,
    OverlineCapsFamily
} from '@ni/nimble-tokens/dist/styledictionary/js/tokens';
import { NimbleTheme } from './themes';

function rgbString(hexValue: string): string {
    const { red, green, blue } = hexRgb(hexValue);
    return `${red}, ${green}, ${blue}`;
}

const { create } = DesignToken;

export const theme = create<NimbleTheme>({ name: 'theme', cssCustomPropertyName: null }).withDefault(NimbleTheme.Light);

// Color Tokens
export const applicationBackgroundColor = create<string>('application-background-color').withDefault((element: HTMLElement) => ((theme.getValueFor(element) === NimbleTheme.Light ? White : Black85)) as string);
export const fillColorSelected = create<string>('fill-color-hover').withDefault(Selection100);
export const outlineColor = create<string>('outline-color').withDefault((element: HTMLElement) => ((theme.getValueFor(element) === NimbleTheme.Light ? Black91 : Black15)) as string);
export const outlineColorRgb = create<string>('outline-color-rgb').withDefault((element: HTMLElement) => (rgbString(theme.getValueFor(element) === NimbleTheme.Light ? Black91 : Black15)));
export const outlineColorHover = create<string>('outline-color-hover').withDefault(Brand100);

// Component Sizing Tokens
export const controlHeight = create<string>('control-height').withDefault('30px');
export const standardPadding = create<string>('standard-padding').withDefault('8px');

// Font Family Tokens
export const fontFamily = create<string>('font-family').withDefault(BodyFamily);
export const labelFontFamily = create<string>('label-font-family').withDefault(OverlineCapsFamily);

// Font Sizing Tokens
export const labelFontSize = create<string>('label-font-size').withDefault('11px');

// Font Color Tokens
export const fontColor = create<string>('label-font-color').withDefault((element: HTMLElement) => ((theme.getValueFor(element) === NimbleTheme.Light ? Black91 : Black15)) as string);
