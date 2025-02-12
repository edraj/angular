import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Config } from '../../config';
import { DialogPartial } from '../../lib/dialog/partial';
import { InputComponent } from '../../lib/input/input.const';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { Toast } from '../../lib/toast/toast.state';
import { IResource } from '../../models/resource.model';
import { IViewMode } from '../../models/viewmode.model';


@Component({
    templateUrl: './form.dialog.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, ...InputComponent, TranslatePipe]
})
export class SpaceFormDialog implements OnInit {

  data!: { mode?: IViewMode, space?: IResource; };
  dialog!: DialogPartial;

  spaceForm: FormGroup;

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
    this.spaceForm = this.fb.group({
      shortname: [],
      // TODO: create an fb group of supportedLanguages, like this: en: [''], ar: ['']
      displaynameValue: this.fb.group({
        ...this.languageValues
      }),
      descriptionValue: this.fb.group({
        ...this.languageValues
      })
    });
    if (this.data.space) {
      this.spaceForm.patchValue(this.data.space);
    }
  }


  saveSpace(): void {
    this.toast.Hide();


    if (this.spaceForm.valid) {
      // clone into a new object
      const _value = this.spaceForm.value;
      // TODO: proper mapping, this is a skimmed version

      const _space = {..._value};
      // then emit
      this.dialog.close(_space);
    } else {
      this.toast.ShowError('INVALID_FORM');
    }
  }
}
