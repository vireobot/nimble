import { html } from '@microsoft/fast-element';
import { TableRow } from '..';
import { TableColumnText } from '../../../../table-column/text';
import type { TableColumnTextCellRecord } from '../../../../table-column/text';
import { waitForUpdatesAsync } from '../../../../testing/async-helpers';
import { fixture, Fixture } from '../../../../utilities/tests/fixture';
import type { TableRecord } from '../../../types';
import { TableRowPageObject } from './table-row.pageobject';

interface SimpleTableRecord extends TableRecord {
    stringData: string;
    moreStringData: string;
}

// prettier-ignore
async function setup(): Promise<Fixture<TableRow<SimpleTableRecord>>> {
    return fixture<TableRow<SimpleTableRecord>>(
        html`<nimble-table-row>
            </nimble-table-row>`
    );
}

describe('TableRow', () => {
    let element: TableRow<SimpleTableRecord>;
    let connect: () => Promise<void>;
    let disconnect: () => Promise<void>;
    let pageObject: TableRowPageObject<SimpleTableRecord>;

    beforeEach(async () => {
        ({ element, connect, disconnect } = await setup());
        pageObject = new TableRowPageObject<SimpleTableRecord>(element);
    });

    afterEach(async () => {
        await disconnect();
    });

    it('can construct an element instance', () => {
        // prettier-ignore
        expect(document.createElement('nimble-table-row')).toBeInstanceOf(TableRow);
    });

    it('column cell view template is applied to generated cells', async () => {
        await connect();

        const textColumn1 = new TableColumnText();
        element.columns = [textColumn1];
        await waitForUpdatesAsync();

        const renderedCell = pageObject.getRenderedCell(0);

        expect(renderedCell!.cellViewTemplate).toEqual(
            textColumn1.currentCellViewTemplate
        );
    });

    it('rendered cell gets cellState from column', async () => {
        await connect();

        const textColumn1 = new TableColumnText();
        textColumn1.fieldName = 'stringData';
        const textColumn2 = new TableColumnText();
        textColumn2.fieldName = 'moreStringData';
        element.columns = [textColumn1, textColumn2];
        element.dataRecord = {
            stringData: 'string 1',
            moreStringData: 'foo'
        };
        await waitForUpdatesAsync();

        const columnStates = element.columnStates;
        const firstCell = pageObject.getRenderedCell(0);
        const firstCellState = columnStates[0]?.cellState;
        expect(firstCellState).toEqual(firstCell!.cellState);
        const firstCellRecord = firstCellState!
            .cellRecord as TableColumnTextCellRecord;
        expect(firstCellRecord.value).toBe('string 1');
        const secondCell = pageObject.getRenderedCell(1);
        const secondCellState = columnStates[1]?.cellState;
        expect(secondCellState).toEqual(secondCell!.cellState);
        const secondCellRecord = secondCellState!
            .cellRecord as TableColumnTextCellRecord;
        expect(secondCellRecord.value).toBe('foo');
    });

    it('does not have aria-selected attribute when it is not selectable', async () => {
        element.selectable = false;
        element.selected = false;
        await connect();

        expect(element.hasAttribute('aria-selected')).toBeFalse();
    });

    it('has aria-selected attribute set to "true" when it is selected', async () => {
        element.selectable = true;
        element.selected = true;
        await connect();

        expect(element.getAttribute('aria-selected')).toBe('true');
    });

    it('has aria-selected attribute set to "false" when it is not selected', async () => {
        element.selectable = true;
        element.selected = false;
        await connect();

        expect(element.getAttribute('aria-selected')).toBe('false');
    });

    it('updates aria-selected attribute when selection state changes', async () => {
        element.selectable = true;
        element.selected = false;
        await connect();

        element.selected = true;
        await waitForUpdatesAsync();

        expect(element.getAttribute('aria-selected')).toBe('true');
    });
});
