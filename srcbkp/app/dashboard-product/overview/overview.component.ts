import { Component, AfterViewInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { TdLoadingService } from '@covalent/core';

import { ItemsService, UsersService } from '../../../services';

@Component({
  selector: 'product-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.scss'],
  viewProviders: [ ItemsService, UsersService ],
})
export class ProductOverviewComponent implements AfterViewInit {

  items: Object[];
  users: Object[];

  jsonData: any = [
    {'x': 'Email', 'y': 69},
    {'x': 'Social', 'y': 47},
    {'x': 'Ad', 'y': 63},
    {'x': 'Organic', 'y': 82},
    {'x': 'Paid ', 'y': 52},
    {'x': 'Alerting', 'y': 89}];

  constructor(private _titleService: Title,
              private _itemsService: ItemsService,
              private _usersService: UsersService,
              private _loadingService: TdLoadingService) {

  }

  ngAfterViewInit(): void {
    this._titleService.setTitle( 'Product Name' );

    this._loadingService.register('items.load');
    this._itemsService.query().subscribe((items: Object[]) => {
      this.items = items;
      setTimeout(() => {
        this._loadingService.resolve('items.load');
      }, 2000);
    }, (error: Error) => {
      this._itemsService.staticQuery().subscribe((items: Object[]) => {
        this.items = items;
        setTimeout(() => {
          this._loadingService.resolve('items.load');
        }, 2000);
      });
    });
    this._loadingService.register('users.load');
    this._usersService.query().subscribe((users: Object[]) => {
      this.users = users;
      setTimeout(() => {
        this._loadingService.resolve('users.load');
      }, 2000);
    }, (error: Error) => {
      this._usersService.staticQuery().subscribe((users: Object[]) => {
        this.users = users;
        setTimeout(() => {
          this._loadingService.resolve('users.load');
        }, 2000);
      });
    });
    
  }

  public doughnutChartLabels:string[] = ['Organic', 'ad', 'Sales','Mobile','Paid Search'];
  public doughnutChartData:number[] = [350, 450, 100  , 100 ,150];
 public doughnutBachgroundColor = ["Red", "Orange", "Yellow" , "#ffcc00" ,"Green"];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


}
