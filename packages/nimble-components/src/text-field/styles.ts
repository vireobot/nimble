import { css } from '@microsoft/fast-element';

import { outlineColor, outlineColorHover, fillColorSelectedRgb, fontFamily, fontColor, labelFontFamily, labelFontSize } from '../theme-provider/design-tokens';

export const styles = css`
:host {
    display: inline-block;
    font-family: ${fontFamily};
    outline: none;
    user-select: none;
    color: ${fontColor};
}

.root {
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: row;
    border-radius: 0px;
    font-family: ${fontFamily};
    border-bottom: 2px solid ${outlineColor};
}

.root:hover{
    border-bottom: 3px solid ${outlineColorHover};
}

.control {
    -webkit-appearance: none;
    font: inherit;
    background: transparent;
    border: 0;
    color: inherit;
    height: 28px;
    width: 100%;
    margin-top: auto;
    margin-bottom: auto;
    border: none;
}

.control:hover,
.control:focus,
.control:disabled,
.control:active {
    outline: none;
}

.control::selection{
    color: ${fontColor};
    background: rgba(${fillColorSelectedRgb}, 0.3);;
}

.control::placeholder {
    color: ${fontColor};
    opacity: 0.5;
}

.control:focus-within::placeholder{
    opacity: 1;
}

.label {
    font-family: ${labelFontFamily};
    font-size: ${labelFontSize};
    line-height: 16px;
    text-transform: uppercase;
}`;