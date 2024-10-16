import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IResourceNode } from './resource.state';
@Component({
    selector: 'dm-resource-card',
    templateUrl: './card.partial.html'
    , changeDetection: ChangeDetectionStrategy.OnPush
    , standalone: true
    , imports: [CommonModule, RouterModule]
    })
export class ResourceCardPartial implements OnInit {

    @Input() resource: IResourceNode;
    @Output() onToggle: EventEmitter<IResourceNode> = new EventEmitter();
    @Output() onSelect: EventEmitter<IResourceNode> = new EventEmitter();

    constructor() {
        //
    }
    ngOnInit(): void {
        //
    }
    toggle() {
      this.onToggle.emit(this.resource);
    }
    select() {
      this.onSelect.emit(this.resource);
    }
}
