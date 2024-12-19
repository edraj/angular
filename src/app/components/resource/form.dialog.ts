import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogPartial } from '../../lib/dialog/partial';
import { MdInputModule } from '../../lib/mdinput/mdinput.module';
import { Toast } from '../../lib/toast/toast.state';
import { EnumResourceType } from '../../models/resource.model';


@Component({
    templateUrl: './form.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, MdInputModule]
})
export class ResourceFormDialog implements OnInit {


  data!: { type: EnumResourceType; };
  dialog!: DialogPartial;


  forceValidation = false;
  resourceForm: UntypedFormGroup;


  constructor(private fb: UntypedFormBuilder, private toast: Toast) {
    //
  }
  ngOnInit(): void {
    //
    this.resourceForm = this.fb.group({
      displayname: [],
      shortname: [],
      description: [],
      type: [this.data?.type || EnumResourceType.FOLDER],
      contentType: ['json'],
      body: [],
    });
  }


  saveSpace(): void {
    this.forceValidation = false;
    this.toast.Hide();


    if (this.resourceForm.valid) {
      // clone into a new object
      const _value = this.resourceForm.value;

      const _resource = { ..._value };

      // then emit
      this.dialog.close(_resource);

    } else {
      this.forceValidation = true;
      this.toast.ShowError('INVALID_FORM');
    }
  }
}
