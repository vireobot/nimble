import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { focusVisible } from '../utilities/style/focus';

import {
    borderHoverColor,
    fillSelectedColor,
    fillHoverSelectedColor,
    fillHoverColor,
    bodyFont,
    bodyDisabledFontColor
} from '../theme-provider/design-tokens';

export const styles = css`
    ${display('flex')}

    :host {
        font: ${bodyFont};
        cursor: pointer;
        justify-content: left;
    }

    .content {
        padding: 8px 4px;
    }

    :host(.selected) {
        box-shadow: none;
        outline: none;
        background-color: ${fillSelectedColor};
    }

    :host(:hover.selected) {
        background-color: ${fillHoverSelectedColor};
    }

    :host(:hover) {
        background-color: ${fillHoverColor};
    }

    :host(:hover):host([disabled]) {
        box-shadow: none;
        background-color: transparent;
    }

    :host(:${focusVisible}) {
        box-shadow: 0px 0px 0px 1px ${borderHoverColor} inset;
        outline: 1px solid ${borderHoverColor};
        outline-offset: -4px;
    }

    :host(:active) {
        box-shadow: none;
        outline: none;
        background-color: ${fillSelectedColor};
    }

    :host([disabled]) {
        color: ${bodyDisabledFontColor};
        cursor: default;
    }

    .content[disabled] {
        box-shadow: none;
        outline: none;
    }
`;