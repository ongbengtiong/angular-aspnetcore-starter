import { Component, OnInit, NgZone, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, NgForm, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';

import { fromShopActions } from '../../store/actions';

import { Product } from '../../models/product';
import { debounceTime, filter, tap, switchMap } from 'rxjs/operators';
import { ShopService } from '../../services/shop.service';
import { Category } from '../../models/category';
import { ErrorStateMatcher } from '@angular/material/core';
import { MccScrollspyService, MccScrollspyItemDirective } from 'material-community-components';
import { Subscription } from 'rxjs';

export const DatesCompareValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const artistBirthDate = control.get('artistBirthDate');
  const artistDeathDate = control.get('artistDeathDate');
  if (!artistBirthDate || !artistDeathDate) {
    return null;
  }
  if (artistBirthDate.pristine || artistDeathDate.pristine) {
    return null;
  }

  return (artistBirthDate.value > artistDeathDate.value) ? { 'datesCompare': true } : null;
};

// https://itnext.io/materror-cross-field-validators-in-angular-material-7-97053b2ed0cf
class DatesCompareErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    return control.dirty && form.invalid;
  }

}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ProductComponent implements OnInit, OnDestroy {
  items: any[]; //MccScrollspyItemDirective[];

  private _subscription: Subscription;

  public entityForm: FormGroup;
  public isEdit: boolean;
  public title = 'Product';
  isCategoryLoading: boolean;
  filteredCategory: Category[] = [];
  filterCategoryCtrl: FormControl = new FormControl();

  errorMessage: string;
  datesCompareErrorMatcher = new DatesCompareErrorMatcher();
  private validationMessages = {
    required: 'required!',
    email: 'email!'
  };

  // NgZone: https://github.com/angular/angular/issues/20290
  constructor(
    protected store: Store<any>,
    protected route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public zone: NgZone,
    private shopService: ShopService,
    private changeDetectorRef: ChangeDetectorRef,
    private mccScrolspyService: MccScrollspyService

  ) { }

  ngOnInit(): void {
    const entity = this.route.snapshot.data['entity'];

    this.isEdit = entity ? true : false;
    this.initForm(entity || {});


    this.filterCategoryCtrl.valueChanges.pipe(
      debounceTime(400),
      // distinctUntilChanged(), // prevent http calls if value remains unchanged
      filter(search => !!search && search.length > 3), // wait until more than 3 char is entered
      tap(() => this.isCategoryLoading = true),
      switchMap(value => this.shopService.searchCategory(value))
    ).subscribe(items => {
      if (items != null && items.length > 0) {
        this.filteredCategory = items;
      }
      this.isCategoryLoading = false;
    });

    this._subscription = this.mccScrolspyService.group('My Scrollspy').subscribe(items => {
      /* this.items = items.map(o => {
         return {
           focus: o.focus,
           id: o.id,
           label: '>>>' + o.label
         };
       });*/
      this.items = items;
      this.changeDetectorRef.detectChanges();
    });
  }
  ngOnDestroy() {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }
  save(): void {
    const entity = {
      productId: this.entityForm.value.id,
      category: this.entityForm.value.category,
      size: this.entityForm.value.size,
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
    // this.zone.run(() => { this.router.navigate(['products']); });
    this.router.navigate(['/shop/products']);
  }



  private initForm(entity: Product) {
    this.entityForm = this.formBuilder.group({
      id: [entity.productId],
      category: [entity.category, [Validators.required]],
      size: [entity.size],
      price: [entity.price, [Validators.required, Validators.min(0)]],
      title: [entity.title, [Validators.required, Validators.maxLength(250)]],
      imageUrl: [entity.imageUrl],
      artDescription: [entity.artDescription, [Validators.required, Validators.maxLength(2000)]],
      artDating: [entity.artDating],
      artId: [entity.artId],
      artist: [entity.artist],
      artistDates: this.formBuilder.group({
        artistBirthDate: [entity.artistBirthDate],
        artistDeathDate: [entity.artistDeathDate]
      },
        { validators: DatesCompareValidator }
      ),
      artistNationality: [entity.artistNationality],
    });
  }
  canSave() {
    return (this.entityForm.dirty && this.entityForm.valid);
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.entityForm.get(controlName).hasError(errorName);
  }

  scrollTo(id: string): void {
    this.mccScrolspyService.scrollTo('My Scrollspy', id);
  }
}
