import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MdInputModule } from '../../lib/mdinput/mdinput.module';
import { Toast } from '../../lib/toast/toast.state';
import { IResource } from '../../models/resource.model';
import { IViewMode } from '../../models/viewmode.model';

@Component({
  selector: 'dm-space-form',
  templateUrl: './form.partial.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, MdInputModule]
})
export class SpaceFormPartial implements OnInit {

  // Add types
  @Input() mode: IViewMode = { forNew: true };

  @Input() space: IResource;
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  forceValidation = false;
  spaceForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private toast: Toast) {
    //
  }
  ngOnInit(): void {
    //
    this.spaceForm = this.fb.group({
      displayname: [],
      shortname: [],
      description: []
    });
    if (this.space) {
      this.spaceForm.patchValue(this.space);
    }
  }


  saveSpace(): void {
    this.forceValidation = false;
    this.toast.Hide();


    if (this.spaceForm.valid) {
      // clone into a new object
      const _value = this.spaceForm.value;

      const _space = { ..._value };

      // then emit
      this.onSave.emit(_space);
    } else {
      this.forceValidation = true;
      this.toast.ShowError('INVALID_FORM');
    }
  }
}
