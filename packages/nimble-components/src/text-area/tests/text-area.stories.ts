import { html } from '@microsoft/fast-element';
import type { Meta, StoryObj } from '@storybook/html';
import { withXD } from 'storybook-addon-xd-designs';
import { createRenderer } from '../../utilities/tests/storybook';
import '..';
import { TextAreaAppearance, TextAreaResize } from '../types';

interface TextAreaArgs {
    appearance: TextAreaAppearance;
    label: string;
    placeholder: string;
    value: string;
    readonly: boolean;
    disabled: boolean;
    spellcheck: boolean;
    resize: TextAreaResize;
    rows: number;
    cols: number;
    maxlength: number;
}

const metadata: Meta<TextAreaArgs> = {
    title: 'Text Area',
    decorators: [withXD],
    parameters: {
        docs: {
            description: {
                component:
                    'A multi-line text input control. The text area is often used in a form to collect user inputs like comments or reviews.'
            }
        },
        design: {
            artboardUrl:
                'https://xd.adobe.com/view/33ffad4a-eb2c-4241-b8c5-ebfff1faf6f6-66ac/screen/7c146e4b-c7c9-4975-a158-10e6093c522d/specs/'
        },
        actions: {
            handles: ['change']
        }
    },
    render: createRenderer(html`
        <nimble-text-area
            appearance="${x => x.appearance}"
            placeholder="${x => x.placeholder}"
            value="${x => x.value}"
            ?readonly="${x => x.readonly}"
            ?disabled="${x => x.disabled}"
            spellcheck="${x => x.spellcheck}"
            resize="${x => x.resize}"
            rows="${x => x.rows}"
            cols="${x => x.cols}"
            maxlength="${x => x.maxlength}"
        >
            ${x => x.label}
        </nimble-text-area>
    `),
    argTypes: {
        appearance: {
            options: Object.values(TextAreaAppearance),
            control: { type: 'radio' },
            table: {
                defaultValue: { summary: 'outline' }
            }
        },
        resize: {
            description: 'Direction(s) the text area is sizeable by the user',
            options: Object.values(TextAreaResize),
            control: { type: 'select' },
            table: {
                defaultValue: { summary: 'none' }
            }
        },
        rows: {
            description: 'Number of visible rows of text.'
        },
        cols: {
            description:
                'Visible width of the text, in average character widths',
            table: {
                defaultValue: { summary: '20' }
            }
        },
        maxlength: {
            description:
                'Maximum number of characters that may be entered by the user'
        }
    },
    args: {
        appearance: TextAreaAppearance.Outline,
        label: 'default label',
        placeholder: 'Placeholder',
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        readonly: false,
        disabled: false,
        spellcheck: false,
        resize: TextAreaResize.both,
        rows: 3,
        cols: 20,
        maxlength: 500
    }
};

export default metadata;

export const outlineTextArea: StoryObj<TextAreaArgs> = {
    args: { label: 'Outline Text Area', appearance: TextAreaAppearance.Outline }
};

export const blockTextArea: StoryObj<TextAreaArgs> = {
    args: { label: 'Block Text Area', appearance: TextAreaAppearance.Block }
};
