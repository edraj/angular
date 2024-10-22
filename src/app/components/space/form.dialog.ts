import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogPartial } from '../../lib/dialog/partial';
import { SpaceFormPartial } from './form.partial';


@Component({
  templateUrl: './form.dialog.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, SpaceFormPartial]
})
export class SpaceFormDialog implements OnInit {

  data!: any;
  dialog!: DialogPartial;

  constructor() {
    //
  }
  ngOnInit(): void {

  }
  create(form: any): void {
    this.dialog.close(form);
  }
}
