import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumDataType, IData } from './data.model';
import { DataService } from './data.service';

@Component({
    selector: 'cr-data',
    template: `{{ (data$ | async)?.value}}`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class DataPartialComponent {
    data$: Observable<IData | undefined>;

    @Input()
    set dataitem(value: { key: string; type: EnumDataType }) {
        this.data$ = this._dataService.GetSingleDataByKey(value.type, value.key);
    }

    constructor(private _dataService: DataService) {}
}
