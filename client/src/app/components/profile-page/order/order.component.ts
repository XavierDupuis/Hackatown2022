import { AfterViewInit, Component, Input } from '@angular/core';
import { Order } from '@app/interfaces/order.interface';
import { Product } from '@app/interfaces/product.interface';
import { ProductService } from '@app/services/product-service/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements AfterViewInit {

  @Input() order: Order;
  products: Product[] = []

  constructor(private productService: ProductService) {

  }

  ngAfterViewInit(): void {
    // for (const product of this.order.orderedProducts) {
    //   this.productService.requestProduct(product.productId).subscribe((product) => {
    //     console.log(product)
    //   })
    // }
    // console.log(this.products)
    const product = this.order.orderedProducts[0];
    this.productService.requestProduct(product.productId).subscribe((product) => {
      console.log(product);
    });
  }
}
