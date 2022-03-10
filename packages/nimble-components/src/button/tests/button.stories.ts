import type { Meta, StoryObj } from '@storybook/html';
import { withXD } from 'storybook-addon-xd-designs';
import { html, when } from '@microsoft/fast-element';
import { ButtonAppearance } from '../types';
import '..';
import '../../icons/key';
import { createRenderer } from '../../utilities/tests/storybook';

interface ButtonArgs {
    label: string;
    appearance: string;
    primary: boolean;
    disabled: boolean;
    icon: boolean;
    contentHidden: boolean;
}

const overviewText = `Per [W3C](https://w3c.github.io/aria-practices/#button) - A button is a widget that
enables users to trigger an action or event, such as submitting a form, opening a dialog, canceling an
action, or performing a delete operation. A common convention for informing users that a button launches
a dialog is to append "…" (ellipsis) to the button label, e.g., "Save as…".`;

const primaryDescription = `Set the \`primary\` CSS class on the element to make a button primary. This class has no effect on buttons with a \`ghost\` appearance.

<details>
    <summary>Primary Button Usage</summary>
    Make a button primary to distinguish it visibly for one of the following reasons: 
    <ul>
        <li>to indicate the action that allows the user to accomplish their most common or important goal</li>
        <li>to indicate the action that allows the user to complete their task</li>
    </ul>
</details>
`;

const metadata: Meta<ButtonArgs> = {
    title: 'Button',
    decorators: [withXD],
    parameters: {
        docs: {
            description: {
                component: overviewText
            }
        },
        design: {
            artboardUrl:
                'https://xd.adobe.com/view/33ffad4a-eb2c-4241-b8c5-ebfff1faf6f6-66ac/screen/42001df1-2969-438e-b353-4327d7a15102/specs/'
        },
        actions: {
            handles: ['click']
        }
    },
    argTypes: {
        appearance: {
            options: Object.values(ButtonAppearance),
            control: { type: 'radio' }
        },
        primary: {
            description: primaryDescription
        },
        icon: {
            description:
                'When including an icon, set `slot="start"` on the icon to ensure proper styling.'
        }
    },
    // prettier-ignore
    render: createRenderer(html`
        <nimble-button ?disabled="${x => x.disabled}" appearance="${x => x.appearance}" class="${x => (x.primary ? 'primary' : '')}" ?content-hidden="${x => x.contentHidden}">
            ${when(x => x.icon, html`<nimble-key-icon slot="start"></nimble-key-icon>`)}
            ${x => x.label}
        </nimble-button>
`),
    args: {
        label: 'Ghost Button',
        appearance: 'ghost',
        primary: false,
        icon: false,
        contentHidden: false,
        disabled: false
    }
};

export default metadata;

export const outlineButton: StoryObj<ButtonArgs> = {
    args: { label: 'Outline Button', appearance: ButtonAppearance.Outline }
};

export const ghostButton: StoryObj<ButtonArgs> = {
    args: { label: 'Ghost Button', appearance: ButtonAppearance.Ghost }
};
export const blockButton: StoryObj<ButtonArgs> = {
    args: { label: 'Block Button', appearance: ButtonAppearance.Block }
};
export const iconButton: StoryObj<ButtonArgs> = {
    args: {
        label: 'Icon Button',
        icon: true,
        contentHidden: true,
        appearance: ButtonAppearance.Outline
    }
};
