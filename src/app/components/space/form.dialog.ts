import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogPartial } from '../../lib/dialog/partial';
import { MdInputModule } from '../../lib/mdinput/mdinput.module';
import { Toast } from '../../lib/toast/toast.state';
import { IResource } from '../../models/resource.model';
import { IViewMode } from '../../models/viewmode.model';


@Component({
  templateUrl: './form.dialog.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, MdInputModule]
})
export class SpaceFormDialog implements OnInit {

  data!: { mode?: IViewMode, space?: IResource; };
  dialog!: DialogPartial;

  forceValidation = false;
  spaceForm: FormGroup;

  constructor(private fb: FormBuilder, private toast: Toast) {
    //
  }
  ngOnInit(): void {
    //
    this.spaceForm = this.fb.group({
      displayname: [],
      shortname: [],
      description: []
    });
    if (this.data.space) {
      this.spaceForm.patchValue(this.data.space);
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
      this.dialog.close(_space);
    } else {
      this.forceValidation = true;
      this.toast.ShowError('INVALID_FORM');
    }
  }
}
