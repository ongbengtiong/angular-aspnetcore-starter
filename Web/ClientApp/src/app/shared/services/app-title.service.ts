import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AppTitleService {
  private title = new BehaviorSubject<String>('App title');
  private title$ = this.title.asObservable();

  constructor() {}

  setTitle(title: String) {
    this.title.next(title);
  }

  getTitle(): Observable<String> {
    return this.title$;
  }
}