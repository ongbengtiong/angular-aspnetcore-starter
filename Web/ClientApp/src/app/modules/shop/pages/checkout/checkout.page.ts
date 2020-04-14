import { Component, OnInit } from "@angular/core"; 
import { ShopService } from "../../services/shop.service";
import { Router } from "@angular/router";
 

@Component({
  selector: "checkout-page",
  templateUrl: "./checkout.page.html"
})
export class CheckoutPage   {
  constructor(public shopService: ShopService, public router: Router) {
  }

  errorMessage: string = "";

  onCheckout() {
    this.shopService.checkout()
      .subscribe(success => {
        if (success) {
          this.router.navigate(["/"]);
        }
      }, err => this.errorMessage = "Failed to save order");
  }
}
