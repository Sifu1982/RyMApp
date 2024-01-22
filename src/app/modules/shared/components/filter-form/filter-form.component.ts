import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Button, Color, Size } from '../../interfaces/button.interface';
import { Gender } from '../../interfaces/character-interface';
import { HomeCharacter } from 'src/app/modules/home/interfaces/home.character.interface';

@Component({
  selector: 'rm-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent implements OnInit {
  @Input() public apiError?: HttpErrorResponse;
  @Output() onFormChange = new EventEmitter();
  @Output() onReset = new EventEmitter();


  public filterForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    gender: new FormControl(''),
  });

  public genders: Gender[] = [
    Gender.FEMALE,
    Gender.GENDERLESS,
    Gender.MALE,
    Gender.UNKNOWN,
  ];

  public filterButton: Button = {
    color: Color.DEFAULT,
    size: Size.SMALL,
    text: 'Filter',
    disabled: false,
  };

  public resetButton: Button = {
    color: Color.DEFAULT,
    size: Size.SMALL,
    text: 'Reset',
    disabled: false,
  };

  private formData: HomeCharacter = {
    id: 0,
    name: '',
    species: '',
    gender: Gender.UNKNOWN,
    image: '',
  };

  ngOnInit(): void {
    this.updateButtonState(this.filterButton);
    this.updateButtonState(this.resetButton);
    this.formSubscription();
  }

  public emitForm(): void {
    this.onFormChange.emit(this.formData);
  }

  public resetForm(): void {
    this.onReset.emit();
    this.filterForm.patchValue({ gender: '', name: '' });
    this.apiError = undefined;
  }

  public updateButtonState(button: Button): Button {
    button.disabled =
      !this.filterForm.valid ||
      (!this.filterForm.get('gender')?.value &&
        !this.filterForm.get('name')?.value);
    return button;
  }

  private formSubscription(): void {
    this.filterForm.valueChanges.subscribe((filterForm) => {
      this.formData = filterForm;
      this.updateButtonState(this.filterButton);
      this.updateButtonState(this.resetButton);
    });
  }
}
