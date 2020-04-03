import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { select, Store } from '@ngrx/store';
import { fromEntityActions } from '../../store/actions';
import { selectAllEntities } from '../../store/selectors';
 
@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html'
})
export class EntitiesComponent implements OnInit {
  title = "Entities Page";

  entities$ = this.store.pipe(select(selectAllEntities));

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    // this.store.dispatch(fromEntityActions.loadEntities());
  }

  delete(id: number) {
    // Call delete action
    const result = confirm("Are you sure you want to delete this entity?");

    if (result) {
      // Logic to delete the item
      this.store.dispatch(fromEntityActions.deleteEntity({ id }));
    }
  }

}
