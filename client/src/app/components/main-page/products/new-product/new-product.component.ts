import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@app/interfaces/product.interface';
import { ProductService } from '@app/services/product-service/product.service';
@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
    nameAndDescription: FormGroup;
    quantityAndPrice: FormGroup;
    dates: FormGroup;
    // fileLink: string = "";
    // selectedFile = '';

    @ViewChild('fileInput') inputRef: ElementRef;
    get input(): HTMLInputElement {
        return this.inputRef.nativeElement;
    }


    constructor(private formBuilder: FormBuilder, private productService: ProductService, /*private http: HttpClient*/) {}

    ngOnInit(): void {
        this.nameAndDescription = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            imageLink: ['', Validators.required],
        });
        this.quantityAndPrice = this.formBuilder.group({
            quantity: [1, [Validators.required, Validators.min(1)]],
            price: [0, [Validators.required, Validators.min(0)]],
        });
        this.dates = this.formBuilder.group({
            productionDate: [new Date(), Validators.required],
            maxPickupDate: [new Date(), [Validators.required, Validators.min(Date.now())]],
        });
    }

    get isFormValid() {
        return this.nameAndDescription.valid && this.quantityAndPrice.valid && this.dates.valid;
    }

    addProduct() {
        const newProduct: Product = {
            name: this.nameAndDescription.controls.name.value,
            description: this.nameAndDescription.controls.description.value,
            quantityInitial: this.quantityAndPrice.controls.quantity.value,
            quantityLeft: this.quantityAndPrice.controls.quantity.value,
            price: this.quantityAndPrice.controls.price.value * 100,
            imageURL: this.nameAndDescription.controls.imageLink.value,
            maxPickupDate: new Date(this.dates.controls.maxPickupDate.value),
            productionDate: new Date(this.dates.controls.productionDate.value),
        };
        this.productService.addProduct(newProduct);
        console.log(newProduct)
    }
}


