import { html, repeat, when } from '@microsoft/fast-element';
import { DesignSystem } from '@microsoft/fast-foundation';
import type { TableRow, ColumnState } from '.';
import type { MenuButtonToggleEventDetail } from '../../../menu-button/types';
import { TableCell } from '../cell';

// prettier-ignore
export const template = html<TableRow>`
    <template role="row">
        ${repeat(x => x.columnStates, html<ColumnState, TableRow>`
            ${when(x => !x.column.columnHidden, html<ColumnState, TableRow>`
                <${DesignSystem.tagFor(TableCell)}
                    class="cell"
                    :cellTemplate="${x => x.column.cellTemplate}"
                    :cellStyles="${x => x.column.cellStyles}"
                    :cellState="${x => x.cellState}"
                    ?has-action-menu="${x => !!x.column.actionMenuSlot}"
                    action-menu-label="${x => x.column.actionMenuLabel}"
                    @cell-action-menu-beforetoggle="${(x, c) => c.parent.onCellActionMenuBeforeToggle(c.event as CustomEvent<MenuButtonToggleEventDetail>, x.column)}"
                    @cell-action-menu-toggle="${(x, c) => c.parent.onCellActionMenuToggle(c.event as CustomEvent<MenuButtonToggleEventDetail>, x.column)}"
                >

                    ${when((x, c) => ((c.parent as TableRow).currentActionMenuColumn === x.column) && x.column.actionMenuSlot, html<ColumnState, TableRow>`
                        <slot
                            name="${x => `row-action-menu-${x.column.actionMenuSlot!}`}"
                            slot="cellActionMenu"
                        ></slot>
                    `)}
                </${DesignSystem.tagFor(TableCell)}>
            `)}
        `)}
    </template>
`;
