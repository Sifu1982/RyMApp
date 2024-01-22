import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';

import { ValidationLabelDirective } from './directives/validation-label.directive';

@NgModule({
  declarations: [CardComponent, ButtonComponent, FilterFormComponent, ValidationLabelDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ButtonComponent, CardComponent, FilterFormComponent]
})

export class SharedModule {}
