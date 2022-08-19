import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import type { Dialog, UserDismissed } from '@ni/nimble-components/dist/esm/dialog';
import { USER_DISMISSED } from '@ni/nimble-components/dist/esm/dialog';
import { BooleanValueOrAttribute, toBooleanProperty } from '../utilities/template-value-helpers';

export type { Dialog };
export { USER_DISMISSED };

/**
 * Directive to provide Angular integration for the dialog element.
 * @description
 * In order to provide a custom value for the `CloseReason` for the dialog you need to obtain
 * a `@ViewChild` reference with the custom type specified. For example, to specify the type as `string`:
 * ```ts
 * @ViewChild('dialog', { read: NimbleDialogDirective }) public dialog: NimbleDialogDirective<string>;
 * ```
 */
@Directive({
    selector: 'nimble-dialog'
})
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export class NimbleDialogDirective<CloseReason = void> {
    public get preventDismiss(): boolean {
        return this.elementRef.nativeElement.preventDismiss;
    }

    // preventDismiss property intentionally maps to the prevent-dismiss attribute
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('prevent-dismiss') public set preventDismiss(value: BooleanValueOrAttribute) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'preventDismiss', toBooleanProperty(value));
    }

    public get ariaLabel(): string | null {
        return this.elementRef.nativeElement.ariaLabel;
    }

    // ariaLabel property intentionally maps to the aria-label attribute
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('aria-label') public set ariaLabel(value: string | null) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'ariaLabel', value);
    }

    public get open(): boolean {
        return this.elementRef.nativeElement.open;
    }

    public constructor(private readonly renderer: Renderer2, private readonly elementRef: ElementRef<Dialog<CloseReason>>) {}

    public async show(): Promise<CloseReason | UserDismissed> {
        return this.elementRef.nativeElement.show();
    }

    public close(reason: CloseReason): void {
        this.elementRef.nativeElement.close(reason);
    }
}