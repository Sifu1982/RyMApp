import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Card } from 'src/app/modules/shared/interfaces/card.interface';
import { HomeCharacter } from '../../interfaces/home.character.interface';
import { HomeService } from '../../services/home.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  public apiError?: HttpErrorResponse;
  public homeCharacters: HomeCharacter[] = [];

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  public navigateToDetail(id: number): void {
    this.router.navigate(['detail/', id]);
  }

  public setHomeCharacters(formValue: HomeCharacter): void {
    if (formValue.name && formValue.gender) {
      this.homeService.getCharactersByNameAndGender(formValue.name, formValue.gender)
      .subscribe((result) => {
        if (result instanceof Array) {
          this.homeCharacters = result;
          this.apiError = undefined;
        } else if (result instanceof HttpErrorResponse) {
          this.apiError = result;
          this.handleError(result);
        }
      });
    } else if (formValue.name) {
      this.homeService.getCharactersByName(formValue.name).subscribe((characters) => {
        this.homeCharacters = characters;
        this.apiError = undefined;
      });
    } else if (formValue.gender) {
      this.homeService.setGender(formValue.gender).subscribe((characters) => {
        this.homeCharacters = characters;
        this.apiError = undefined;
      });
    }
  }

  public handleError(error: HttpErrorResponse): void {
    console.log('No hay personajes', error);
  }

  public setCardConfig(homeCharacter: HomeCharacter): Card {
    return {
      name: homeCharacter.name,
      species: homeCharacter.species,
      gender: homeCharacter.gender,
      image: homeCharacter.image,
    };
  }

  public getCharacters(): void {
    this.homeService.getCharacters().subscribe((homeCharacters) => {
      this.homeCharacters = homeCharacters;
    });
  }
}
