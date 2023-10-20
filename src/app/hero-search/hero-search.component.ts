import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>; //у обcов один знак доллара в конце, у сабжей два, но тут чето не два
  private searchTerms = new Subject<string>(); // сабж имеет методы как зрелища, так и зрителя

  constructor(private heroService: HeroService) {}

  // Вставьте поисковый запрос в наблюдаемый поток.
  search(term: string): void {
    this.searchTerms.next(term); // генерируем события в сабже, используя .next()
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // pipe -- оператор изменяющий наблюдаемую
      // подождите 300 мс после каждого нажатия клавиши, прежде чем рассматривать термин
      debounceTime(300),

      // игнорировать новый термин, если он такой же, как предыдущий
      distinctUntilChanged(),

      // переключение на новый поиск, наблюдаемый каждый раз при изменении термина
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
