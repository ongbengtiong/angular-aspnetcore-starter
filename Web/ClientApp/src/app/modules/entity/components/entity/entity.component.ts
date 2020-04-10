import { Component, OnInit, NgZone } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";

import { fromEntityActions } from '../../store/actions';

import { Entity } from "../../models/entity";

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html'
})

export class EntityComponent implements OnInit {
  public entityForm: FormGroup;
  public isEdit: boolean;
  public title = "Entity";

  // NgZone: https://github.com/angular/angular/issues/20290
  constructor(
    protected store: Store<any>,
    protected route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public zone: NgZone
  ) { }

  ngOnInit(): void {
    const entity = this.route.snapshot.data["entity"];

    this.isEdit = entity ? true : false;
    this.initForm(entity || {});
  }

  save(): void {
    const entity = {
      id: this.entityForm.value.id,
      name: this.entityForm.value.name,
      code: this.entityForm.value.code
    };

    if (this.isEdit) {
      this.store.dispatch(fromEntityActions.updateEntity({ update: entity }));
    } else {
      // Otherwise add the entity as new
      this.store.dispatch(fromEntityActions.createEntity({ new: entity }));
    }
    this.zone.run(() => { this.router.navigate(['entities']); });
    //this.router.navigate(["entities"]);
  }

  private initForm(entity: Entity) {
    this.entityForm = this.formBuilder.group({
      id: [entity.id],
      name: [entity.name],
      code: [entity.code]
    });
  }
}
