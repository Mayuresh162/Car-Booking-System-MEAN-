import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService, Driver } from '../service/driver/driver.service';
import { SelectionModel } from '@angular/cdk/collections';
import { LoginService } from '../service/login/login.service';
import { ConfirmBookingComponent } from '../confirm-booking/confirm-booking.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  driverDataSource;
  displayedColumns;
  bookDetails;
  selectedDriver;
  selection =  new SelectionModel<Driver>(false, []);

  constructor(public driverService: DriverService, public loginService: LoginService,
    public dialog: MatDialog, private route: ActivatedRoute, public router: Router, ) {
    this.route.queryParams.subscribe(queryParams => {
      this.bookDetails = queryParams;
    });
    this.getDrivers();
  }

  ngOnInit() {
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.driverDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.driverDataSource.data.forEach(row => this.selection.select(row));
  }

  getDrivers() {
    this.driverService.getDrivers()
    .subscribe(res => {
      const response: any = res;
      this.driverDataSource = new MatTableDataSource(response);
      this.displayedColumns = ['select', 'name', 'price', 'language'];
    });
  }

  onDriverSelected(data) {
    this.selectedDriver = data;
  }

  navigateToPay() {
    const dialogReference = this.dialog.open(ConfirmBookingComponent, {
      data: {
        bookingData: this.bookDetails,
        selectedDriver: this.selectedDriver
      },
      disableClose: true
    });
    dialogReference.componentInstance.title = 'Confirm Booking';
    dialogReference.componentInstance.positiveButtonText = 'Confirm';
    dialogReference.componentInstance.negativeButtonText = 'Cancel';
    dialogReference.componentInstance.onPositiveAction.subscribe((payload) => {
      this.storeDriverDetails(payload);
    });
  }

  storeDriverDetails(payload) {
    // this.driverService.setSelectedDriver(payload);
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/payment'], {
        queryParams: payload
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  filterDriver(language) {
    this.driverService.getDriverByLanguage(language)
    .subscribe(res => {
      const response: any = res;
      this.driverDataSource = new MatTableDataSource(response);
      this.displayedColumns = ['select', 'name', 'price', 'language'];
    });
  }

}

