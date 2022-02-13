import { AfterViewInit, Component, Input } from '@angular/core';
import { Order } from '@app/interfaces/order.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements AfterViewInit {

  @Input() order: Order;

  constructor(/*private productService: ProductService*/) {
  }

  ngAfterViewInit(): void {}
}
