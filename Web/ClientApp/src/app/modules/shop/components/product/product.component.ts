import { Component, OnInit, NgZone } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";

import { fromShopActions } from '../../store/actions';

import { Product } from "../../models/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
  public entityForm: FormGroup;
  public isEdit: boolean;
  public title = "Product";

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
      productId: this.entityForm.value.id,
      category: this.entityForm.value.category,
      size: this.entityForm.value.size ,
      price: this.entityForm.value.price,
      title: this.entityForm.value.title,
      imageUrl: this.entityForm.value.imageUrl,
      artDescription: this.entityForm.value.artDescription,
      artDating: this.entityForm.value.artDating,
      artId: this.entityForm.value.artId,
      artist: this.entityForm.value.artist,
      artistBirthDate: this.entityForm.value.artistBirthDate,
      artistDeathDate: this.entityForm.value.artistDeathDate,
      artistNationality: this.entityForm.value.artistNationality,
    };

    if (this.isEdit) {
      this.store.dispatch(fromShopActions.updateProduct({ update: entity }));
    } else {
      // Otherwise add the entity as new
      this.store.dispatch(fromShopActions.createProduct({ new: entity }));
    }
    this.zone.run(() => { this.router.navigate(['.']); });
    //this.router.navigate(["entities"]);
  }

  private initForm(entity: Product) {
    this.entityForm = this.formBuilder.group({
      id: [entity.productId],
      category: [entity.category],
      size: [entity.size],
      price: [entity.price],
      title: [entity.title],
      imageUrl: [entity.imageUrl],
      artDescription: [entity.artDescription],
      artDating: [entity.artDating],
      artId: [entity.artId],
      artist: [entity.artist],
      artistBirthDate: [entity.artistBirthDate],
      artistDeathDate: [entity.artistDeathDate],
      artistNationality: [entity.artistNationality],
    });
  }
}
