import { attr } from '@microsoft/fast-element';
import {
    DesignSystem,
    TextArea as FoundationTextArea,
    textAreaTemplate as template
} from '@microsoft/fast-foundation';
import { styles } from './styles';
import { TextAreaAppearance } from './types';

export type { TextArea };

declare global {
    interface HTMLElementTagNameMap {
        'nimble-text-area': TextArea;
    }
}

/**
 * A nimble-styed HTML text area
 */
class TextArea extends FoundationTextArea {
    /**
     * The appearance the text area should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    @attr
    public appearance!: TextAreaAppearance;

    public connectedCallback(): void {
        super.connectedCallback();
        if (!this.appearance) {
            this.appearance = TextAreaAppearance.Outline;
        }
    }
}

const nimbleTextArea = TextArea.compose({
    baseName: 'text-area',
    baseClass: FoundationTextArea,
    // @ts-expect-error FAST templates have incorrect type, see: https://github.com/microsoft/fast/issues/5047
    template,
    styles,
    shadowOptions: {
        delegatesFocus: true
    }
});

DesignSystem.getOrCreate().withPrefix('nimble').register(nimbleTextArea());