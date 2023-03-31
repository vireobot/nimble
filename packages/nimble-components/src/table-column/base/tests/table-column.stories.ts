import { html, ref, when } from '@microsoft/fast-element';
import type { Meta, StoryObj } from '@storybook/html';
import {
    createUserSelectedThemeStory,
    usageWarning
} from '../../../utilities/tests/storybook';
import { ExampleColumnFractionalWidthType, ExampleSortType } from './types';
import { tableTag } from '../../../table';
import {
    SharedTableArgs,
    sharedTableArgTypes,
    sharedTableArgs
} from './table-column-stories-utils';
import { TableColumnSortDirection } from '../../../table/types';
import { iconUserTag } from '../../../icons/user';
import { iconCommentTag } from '../../../icons/comment';
import { tableColumnTextTag } from '../../text';

const simpleData = [
    {
        firstName: 'Ralph',
        lastName: 'Wiggum',
        favoriteColor: 'Rainbow',
        quote: "I'm in danger!"
    },
    {
        firstName: 'Milhouse',
        lastName: 'Van Houten',
        favoriteColor: 'Crimson',
        quote: "Not only am I not learning, I'm forgetting stuff I used to know!"
    },
    {
        firstName: 'Ned',
        lastName: 'Flanders',
        favoriteColor: 'Taupe',
        quote: 'Hi diddly-ho neighbor!'
    },
    {
        firstName: 'Maude',
        lastName: 'Flanders',
        favoriteColor: 'Taupe',
        quote: "Neddy doesn't believe in insurance. He considers it a form of gambling."
    },
    {
        firstName: 'Rod',
        lastName: 'Flanders',
        favoriteColor: 'Taupe',
        quote: 'Lies make baby Jesus cry.'
    },
    {
        firstName: 'Todd',
        lastName: 'Flanders',
        favoriteColor: 'Taupe',
        quote: 'Dad, should I poke Rod with a sharp thing like the mouse did?'
    },
    {
        firstName: 'Maggie',
        lastName: 'Simpson',
        favoriteColor: 'Red'
    }
];

const overviewText = `This page contains information about configuring the columns of a \`nimble-table\`. 
See **Table** for information about configuring the table itself and **Table Column Types** for 
information about specific types of column.`;

const metadata: Meta<SharedTableArgs> = {
    title: 'Table Column Configuration',
    parameters: {
        docs: {
            description: {
                component: overviewText
            }
        }
    },
    // prettier-ignore
    render: createUserSelectedThemeStory(html<SharedTableArgs>`
    ${usageWarning('table')}
    <${tableTag}
        ${ref('tableRef')}
        data-unused="${x => x.updateData(x)}"
    >
        <${tableColumnTextTag}
            field-name="firstName"
        >
            First Name
        </${tableColumnTextTag}>
        <${tableColumnTextTag}
            field-name="lastName"
        >
            Last Name
        </${tableColumnTextTag}>
        <${tableColumnTextTag}
            field-name="favoriteColor"
        >
            Favorite Color
        </${tableColumnTextTag}>
        <${tableColumnTextTag}
            field-name="quote"
        >
            Quote
        </${tableColumnTextTag}>
    </${tableTag}>
    `),
    argTypes: {
        ...sharedTableArgTypes
    },
    args: {
        ...sharedTableArgs(simpleData)
    }
};

export default metadata;

interface DefaultColumnConfigTableArgs extends SharedTableArgs {
    columns: string;
}

// In the Docs tab, Storybook doesn't render the title of the first story
// This is a placeholder to get the useful ones to render
export const columns: StoryObj<DefaultColumnConfigTableArgs> = {
    argTypes: {
        columns: {
            name: 'Default column configuration',
            description:
                'This example shows columns in their default configuration.'
        }
    }
};

type ColumnOrderOption = 'FirstName, LastName' | 'LastName, FirstName';

interface ColumnOrderTableArgs extends SharedTableArgs {
    columnOrder: ColumnOrderOption;
}

const columnOrderDescription = `Configure columns by adding column elements as children of the table. 
The order of the elements controls the order that columns will appear in the table.`;

export const columnOrder: StoryObj<ColumnOrderTableArgs> = {
    parameters: {
        docs: {
            description: {
                story: columnOrderDescription
            }
        }
    },
    // prettier-ignore
    render: createUserSelectedThemeStory(html<ColumnOrderTableArgs>`
        ${usageWarning('table')}
        <${tableTag}
            ${ref('tableRef')}
            data-unused="${x => x.updateData(x)}"
        >
            ${when(x => x.columnOrder === 'FirstName, LastName', html`
                <${tableColumnTextTag}
                    field-name="firstName"
                >
                First Name
                </${tableColumnTextTag}>
                <${tableColumnTextTag}
                    field-name="lastName"
                >
                Last Name
                </${tableColumnTextTag}>
            `)}
            ${when(x => x.columnOrder === 'LastName, FirstName', html`
                <${tableColumnTextTag}
                    field-name="lastName"
                >
                Last Name
                </${tableColumnTextTag}>
                <${tableColumnTextTag}
                    field-name="firstName"
                >
                First Name
                </${tableColumnTextTag}>
            `)}
            </${tableColumnTextTag}>
        </${tableTag}>
    `),
    argTypes: {
        columnOrder: {
            name: 'Column order',
            description: columnOrderDescription,
            options: ['FirstName, LastName', 'LastName, FirstName'],
            control: { type: 'radio' }
        }
    },
    args: {
        columnOrder: 'FirstName, LastName'
    }
};

type HeaderIconOption = 'user' | 'comment';

interface HeaderContentTableArgs extends SharedTableArgs {
    headerIcon: HeaderIconOption;
    headerText: string;
}

const headerContentIntro = 'The content of each column header comes from whatever is slotted in the column element.';
const headerTextContent = `If you provide only text content, Nimble will style it
and add a \`title\` to show a tooltip when truncated.`;
const headerIconContent = 'If you provide icon content, you should set your own `title` on the icon element.';
const headerTitleContent = 'Titles should use "Headline Casing" and Nimble will automatically capitalize them for display in the header.';
const headerContentDescription = `${headerContentIntro} ${headerTextContent} ${headerIconContent} ${headerTitleContent}`;
const headerTextContentDescription = `${headerContentIntro} ${headerTextContent} ${headerTitleContent}`;
const headerIconContentDescription = `${headerContentIntro} ${headerIconContent} ${headerTitleContent}`;

export const headerContent: StoryObj<HeaderContentTableArgs> = {
    parameters: {
        docs: {
            description: {
                story: headerContentDescription
            }
        }
    },
    // prettier-ignore
    render: createUserSelectedThemeStory(html<HeaderContentTableArgs>`
        ${usageWarning('table')}
        <${tableTag}
            ${ref('tableRef')}
            data-unused="${x => x.updateData(x)}"
        >
            <${tableColumnTextTag}
                field-name="firstName"
            >
                ${when(x => x.headerIcon === 'user', html`
                    <${iconUserTag} title="First Name"></${iconUserTag}>
                `)}
                ${when(x => x.headerIcon === 'comment', html`
                    <${iconCommentTag} title="First Name"></${iconCommentTag}>
                `)}
            </${tableColumnTextTag}>
            <${tableColumnTextTag}
                field-name="lastName"
            >
                ${x => x.headerText}
            </${tableColumnTextTag}>
        </${tableTag}>
    `),
    argTypes: {
        headerIcon: {
            name: 'First column header icon',
            description: headerIconContentDescription,
            options: ['user', 'comment'],
            control: { type: 'radio' }
        },
        headerText: {
            name: 'Second column header text',
            description: headerTextContentDescription
        }
    },
    args: {
        headerIcon: 'user',
        headerText: 'Last Name'
    }
};

const commonColumnAttributes = 'In addition to the attributes described in other stories there are other attributes available on all column types.';

interface CommonAttributesTableArgs extends SharedTableArgs {
    columnHidden: boolean;
    columnId: string;
}

export const commonAttributes: StoryObj<CommonAttributesTableArgs> = {
    parameters: {
        docs: {
            description: {
                story: commonColumnAttributes
            }
        }
    },
    // prettier-ignore
    render: createUserSelectedThemeStory(html<CommonAttributesTableArgs>`
        ${usageWarning('table')}
        <${tableTag}
            ${ref('tableRef')}
            data-unused="${x => x.updateData(x)}"
        >
            <${tableColumnTextTag}
                column-id="first-name-column"
                field-name="firstName"
            >
                First Name
            </${tableColumnTextTag}>
            <${tableColumnTextTag}
                column-id="last-name-column"
                field-name="lastName"
                ?column-hidden=${x => x.columnHidden}
            >
                Last Name
            </${tableColumnTextTag}>
            <${tableColumnTextTag}
                column-id="favorite-color-column"
                field-name="favoriteColor"
            >
                Favorite Color
            </${tableColumnTextTag}>
        </${tableTag}>
    `),
    argTypes: {
        columnHidden: {
            name: 'column-hidden',
            description:
                'Add the `column-hidden` attribute to hide a column from display. One use case for this is to sort by a field but not display its value.'
        },
        columnId: {
            name: 'column-id',
            description:
                "Optionally use the `column-id` attribute to uniquely identify a column for features like adding an action menu. If you aren't using features that require a column id you may leave it unset for all columns. If you provide `column-id` for any column within a table then you must provide it for all and they must be unique strings."
        }
    },
    args: {
        columnHidden: false
    }
};

const sortedOptions = {
    [ExampleSortType.none]: [],
    [ExampleSortType.firstColumnAscending]: [
        {
            columnId: 'first-name-column',
            sortDirection: TableColumnSortDirection.ascending
        }
    ],
    [ExampleSortType.firstColumnDescending]: [
        {
            columnId: 'first-name-column',
            sortDirection: TableColumnSortDirection.descending
        }
    ],
    [ExampleSortType.secondColumnDescendingFirstColumnAscending]: [
        {
            columnId: 'last-name-column',
            sortDirection: TableColumnSortDirection.descending
        },
        {
            columnId: 'first-name-column',
            sortDirection: TableColumnSortDirection.ascending
        }
    ]
} as const;

const sortedColumnsDescription = `A column within the table is configured to be sorted by specifying a \`sort-direction\` and a \`sort-index\` on
it. The \`sort-direction\` indicates the direction to sort (\`ascending\` or \`descending\`), and the \`sort-index\` specifies the sort precedence
of the column within the set of all sorted columns. Columns within the table will be sorted from lowest \`sort-index\` to highest \`sort-index\`. 
Sorting is based on the underlying field values in the column, not the rendered values.`;

interface SortingTableArgs extends SharedTableArgs {
    sortedColumns: ExampleSortType;
    getColumnSortData: (
        columnId: string,
        args: SortingTableArgs
    ) => { direction: TableColumnSortDirection, index: number | undefined };
}

export const sorting: StoryObj<SortingTableArgs> = {
    parameters: {
        docs: {
            description: {
                story: sortedColumnsDescription
            }
        }
    },
    // prettier-ignore
    render: createUserSelectedThemeStory(html<SortingTableArgs>`
        ${usageWarning('table')}
        <${tableTag}
            ${ref('tableRef')}
            data-unused="${x => x.updateData(x)}"
        >
            <${tableColumnTextTag}
                field-name="firstName"
                sort-direction="${x => x.getColumnSortData('first-name-column', x).direction}" sort-index="${x => x.getColumnSortData('first-name-column', x).index}"
            >
                First Name
            </${tableColumnTextTag}>
            <${tableColumnTextTag}
                field-name="lastName"
                sort-direction="${x => x.getColumnSortData('last-name-column', x).direction}" sort-index="${x => x.getColumnSortData('last-name-column', x).index}"
            >
                Last Name
            </${tableColumnTextTag}>
            <${tableColumnTextTag}
                field-name="favoriteColor"
                sort-direction="${x => x.getColumnSortData('favorite-color-column', x).direction}" sort-index="${x => x.getColumnSortData('favorite-color-column', x).index}"
            >
                Favorite Color
            </${tableColumnTextTag}>
            <${tableColumnTextTag}
                field-name="quote"
                sort-direction="${x => x.getColumnSortData('quote-column', x).direction}" sort-index="${x => x.getColumnSortData('quote-column', x).index}"
            >
                Quote
            </${tableColumnTextTag}>

        </${tableTag}>
    `),
    argTypes: {
        sortedColumns: {
            name: 'Sort configuration',
            description: sortedColumnsDescription,
            options: Object.values(ExampleSortType),
            control: {
                type: 'radio',
                labels: {
                    [ExampleSortType.none]: 'None',
                    [ExampleSortType.firstColumnAscending]:
                        'First name ascending',
                    [ExampleSortType.firstColumnDescending]:
                        'First name descending',
                    [ExampleSortType.secondColumnDescendingFirstColumnAscending]:
                        'Last name descending then first name ascending'
                }
            }
        },
        getColumnSortData: {
            table: {
                disable: true
            }
        }
    },
    args: {
        sortedColumns: ExampleSortType.firstColumnAscending,
        getColumnSortData: (
            columnId: string,
            args: SortingTableArgs
        ): {
            direction: TableColumnSortDirection,
            index: number | undefined
        } => {
            const sortData = sortedOptions[args.sortedColumns];
            const matchingIndex = sortData.findIndex(
                sortedColumn => sortedColumn.columnId === columnId
            );
            if (matchingIndex === -1) {
                return {
                    direction: TableColumnSortDirection.none,
                    index: undefined
                };
            }

            return {
                direction: sortData[matchingIndex]!.sortDirection,
                index: matchingIndex
            };
        }
    }
};

interface ColumnWidthTableArgs extends SharedTableArgs {
    fractionalWidth: ExampleColumnFractionalWidthType;
    minPixelWidth: number;
    getColumnWidthData: (
        columnId: string,
        args: ColumnWidthTableArgs
    ) => number | undefined;
}

const fractionalWidthOptions = {
    [ExampleColumnFractionalWidthType.default]: [],
    [ExampleColumnFractionalWidthType.firstColumnHalfSize]: [
        {
            columnId: 'first-name-column',
            width: 0.5
        }
    ],
    [ExampleColumnFractionalWidthType.firstColumTwiceSize]: [
        {
            columnId: 'first-name-column',
            width: 2
        }
    ],
    [ExampleColumnFractionalWidthType.thirdColumnHalfFourthColumnTwice]: [
        {
            columnId: 'favorite-color-column',
            width: 0.5
        },
        {
            columnId: 'quote-column',
            width: 2
        }
    ]
} as const;

const fractionalWidthDescription = `Configure each column's width relative to the other columns with the \`fractional-width\` property. For example, a column with a \`fractional-width\` set to 2 will be twice as wide as a column with a \`fractional-width\` set to 1. 
The default value for \`fractional-width\` is 1, and columns that don't support \`fractional-width\` explicitly, or another API responsible for managing the width of the column, will also behave as if they have a \`fractional-width\` of 1.`;

const minPixelWidthDescription = `Table columns that support having a \`fractional-width\` can also be configured to have a minimum width such that its width
will never shrink below the specified pixel width.`;

export const fractionalWidthColumn: StoryObj<ColumnWidthTableArgs> = {
    parameters: {
        docs: {
            description: {
                story: fractionalWidthDescription
            }
        }
    },
    // prettier-ignore
    render: createUserSelectedThemeStory(html<ColumnWidthTableArgs>`
        ${usageWarning('table')}
        <${tableTag}
            ${ref('tableRef')}
            data-unused="${x => x.updateData(x)}"
        >
           <${tableColumnTextTag}
                field-name="firstName"
                fractional-width="${x => x.getColumnWidthData('first-name-column', x)}"
                min-pixel-width="${x => x.minPixelWidth}"
            >
                First Name
            </${tableColumnTextTag}>
            <${tableColumnTextTag}
                field-name="lastName"
                fractional-width="${x => x.getColumnWidthData('last-name-column', x)}"
                min-pixel-width="${x => x.minPixelWidth}"
            >
                Last Name
            </${tableColumnTextTag}>
            <${tableColumnTextTag}
                field-name="favoriteColor"
                fractional-width="${x => x.getColumnWidthData('favorite-color-column', x)}"
                min-pixel-width="${x => x.minPixelWidth}"
           >
                Favorite Color
            </${tableColumnTextTag}>
            <${tableColumnTextTag}
                field-name="quote"
                placeholder="${'<pacifier noise>'}"
                fractional-width="${x => x.getColumnWidthData('quote-column', x)}"
                min-pixel-width="${x => x.minPixelWidth}"
            >
                Quote
            </${tableColumnTextTag}>
        </${tableTag}>
    `),
    argTypes: {
        fractionalWidth: {
            name: 'Fractional width configuration',
            description: fractionalWidthDescription,
            options: Object.values(ExampleColumnFractionalWidthType),
            control: {
                type: 'radio',
                labels: {
                    [ExampleColumnFractionalWidthType.default]: 'Default',
                    [ExampleColumnFractionalWidthType.firstColumnHalfSize]:
                        'First column half size',
                    [ExampleColumnFractionalWidthType.firstColumTwiceSize]:
                        'First column double size',
                    [ExampleColumnFractionalWidthType.thirdColumnHalfFourthColumnTwice]:
                        'Third column half size, fourth column double size'
                }
            }
        },
        minPixelWidth: {
            name: 'min-pixel-width',
            description: minPixelWidthDescription,
            control: {
                type: 'number'
            }
        },
        getColumnWidthData: {
            table: {
                disable: true
            }
        }
    },
    args: {
        fractionalWidth: ExampleColumnFractionalWidthType.default,
        minPixelWidth: 100,
        getColumnWidthData: (
            columnId: string,
            args: ColumnWidthTableArgs
        ): number | undefined => {
            const widthData = fractionalWidthOptions[args.fractionalWidth];
            const matchingIndex = widthData?.findIndex(
                column => column.columnId === columnId
            );
            if (matchingIndex === -1) {
                return 1;
            }

            return widthData[matchingIndex]?.width;
        }
    }
};
