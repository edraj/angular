import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Config } from '../../config';
import { DialogPartial } from '../../lib/dialog/partial';
import { InputComponent } from '../../lib/input/input.const';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { Toast } from '../../lib/toast/toast.state';
import { EnumResourceType } from '../../models/resource.model';
import { IViewMode } from '../../models/viewmode.model';


@Component({
    templateUrl: './form.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, ...InputComponent, TranslatePipe]
})
export class ResourceFormDialog implements OnInit {


  data!: { type: EnumResourceType; mode: IViewMode };
  dialog!: DialogPartial;


  forceValidation = false;
  resourceForm: FormGroup;
  supportedLanguages = Config.Res.languages;

  get languageValues(): any {
    // convert array to object

    return this.supportedLanguages.reduce((acc: any, cur) => {
      acc[cur.name] = [];
      return acc;
    }, {});
  }

  constructor(private fb: FormBuilder, private toast: Toast) {
    //
  }
  ngOnInit(): void {
    //
    this.resourceForm = this.fb.group({
      shortname: [],
      displaynameValue: this.fb.group({
        ...this.languageValues
      }),
      descriptionValue: this.fb.group({
        ...this.languageValues
      }),
      type: [this.data?.type || EnumResourceType.FOLDER],
      contentType: ['json'],
      body: [],
    });
  }


  saveResource(): void {
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
