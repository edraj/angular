import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { EnumGaAction, EnumGaCategory, GaTracking, IGaOptions } from '../../core/ga';


@Directive({
    selector: '[edTrack]',
    exportAs: 'edGa'
})
export class GaDirective {
    @Input() edTrack: Partial<IGaOptions> = { category: EnumGaCategory.General, action: EnumGaAction.Click };

    constructor(private el: ElementRef) {

    }

    @HostListener('click', ['$event.target'])
    onClick(target: HTMLElement): void {

        GaTracking.RegisterEvent(
            this.edTrack.category || EnumGaCategory.General,
            this.edTrack.action || EnumGaAction.Click,
            this.edTrack.label,
            this.edTrack.value
        );
    }
}
