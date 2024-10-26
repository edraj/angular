import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PathState } from './resource.state';
@Component({
    selector: 'dm-resource-path',
    templateUrl: './path.partial.html'
    , changeDetection: ChangeDetectionStrategy.OnPush
    , standalone: true
    , imports: [CommonModule, RouterModule]
    })
export class ResourcePathPartial implements OnInit {

    @Input() id: string;
    @Output() onSomething: EventEmitter<any> = new EventEmitter();

    constructor(public pathState: PathState) {
        //
    }
    ngOnInit(): void {
        //
    }
}
