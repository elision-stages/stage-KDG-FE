import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {VendorService} from "../../../service/user/vendor.service";
import staticRandomInt from "../../../helpers/staticRandomInt";

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html'
})
export class VendorComponent {
  loading: boolean = true;

  breadcrumb: MenuItem[]
  home: MenuItem = {icon: 'pi pi-home', routerLink: '/'}

  vendor: any = null
  id: number

  random: Function = staticRandomInt();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vendorService: VendorService)
  {
    this.route.params.subscribe( params => this.loadVendor(params['id']) );
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'))
  }

  loadVendor(id: number) {
    this.vendorService.getVendor(id).subscribe({
      next: vendor => {
        this.loading = false
        this.vendor = vendor
      },
      error: _error => {
        this.router.navigate(['pages/notfound'])
      }
    })
  }
}
