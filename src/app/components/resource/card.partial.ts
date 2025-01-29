import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IResourceNode } from './tree.state';
@Component({
    selector: 'dm-resource-card',
    templateUrl: './card.partial.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule]
})
export class ResourceCardPartial implements OnInit {

    @Input() resource: IResourceNode;

    @Output() onToggle: EventEmitter<IResourceNode> = new EventEmitter();
    @Output() onSelect: EventEmitter<IResourceNode> = new EventEmitter();
    @Output() onDelete: EventEmitter<IResourceNode> = new EventEmitter();

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
    delete() {
      this.onDelete.emit(this.resource);
    }
}
