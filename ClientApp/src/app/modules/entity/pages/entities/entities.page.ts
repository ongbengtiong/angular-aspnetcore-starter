import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { selectAllEntities } from "../../store/selectors";
import { fromEntityActions } from "../../store/actions";
 

@Component({
  selector: "entities-page",
  templateUrl: "./entities.page.html"
})
export class EntitiesPage implements OnInit {
  title = "Entities Page";

  entities$ = this.store.pipe(select(selectAllEntities));

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(fromEntityActions.loadEntities());
  }
}
