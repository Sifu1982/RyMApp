import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[validationLabel]'
})
export class ValidationLabelDirective {

  private validation?: ElementRef<HTMLElement>;
  private _errors?: HttpErrorResponse | undefined;

  @Input() set errors( value: HttpErrorResponse | undefined ) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    this.validation = el;
   }

  setErrorMessage(): void {
    if ( !this.validation ) return;

    if ( !this._errors ) {
      this.validation.nativeElement.innerText = '';
      return
    }

    const errors = Object.keys(this._errors);
    console.log((errors));

    if (this._errors instanceof HttpErrorResponse) {
      this.handleHttpErrorResponse(this._errors);
    }
  }

  private handleHttpErrorResponse(errorResponse: HttpErrorResponse): void {
    const { status, message } = errorResponse;

    if ( !this.validation ) return;

    if (status === 404) {
      this.validation.nativeElement.innerText = 'No hay personajes';
    } else {
      this.validation.nativeElement.innerText = `Error: ${message || 'Desconocido'}`;
    }
  }
}
