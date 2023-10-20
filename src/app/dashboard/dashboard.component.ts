import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // OnInit -- расширение класса для функции ngOnInit (useEffect(()=>{}, []))
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  // после первого рендера вызывает функцию getHeroes()
  ngOnInit() {
    this.getHeroes();
  }

  // функция
  getHeroes(): void {
    this.heroService
      .getHeroes() // возвращает Обс, на который вскоре подписываемся чтобы следить за изменениями
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
    // возвращает неполный список героев с 1 по 5 позицию, только четырех Героя из списка (2-ого, 3-ого, 4-ого и 5-ого)
  }
}
