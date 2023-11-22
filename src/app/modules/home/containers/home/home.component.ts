import { Card } from 'src/app/modules/shared/interfaces/card.interface';
import { Component, OnInit } from '@angular/core';
import { HomeCharacter } from '../../interfaces/home.character.interface';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  public homeCharacters: HomeCharacter[] = [];
  public isShowed = true;

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  public navigateToDetail(id: number): void {
    this.router.navigate(['detail/', id]);
  }

  public setHomeCharacters(formValue: any): void {
    console.log(formValue);
    this.homeService
      .setGender(formValue.gender)
      .subscribe((filteredCharacters: HomeCharacter[]) => {
        console.log(filteredCharacters);
        this.homeCharacters = filteredCharacters;
      });
  }

  public resetHome(formValue: any): void {
    this.homeService
      .resetForm(formValue)
      .subscribe((homeCharacters: HomeCharacter[]) => {
        this.homeCharacters = homeCharacters;
      });
  }

  public setCardConfig(homeCharacter: HomeCharacter): Card {
    return {
      name: homeCharacter.name,
      species: homeCharacter.species,
      gender: homeCharacter.gender,
      image: homeCharacter.image,
    };
  }

  private getCharacters(): void {
    this.homeService.getCharacters().subscribe((homeCharacters) => {
      this.homeCharacters = homeCharacters;
    });
  }
}
