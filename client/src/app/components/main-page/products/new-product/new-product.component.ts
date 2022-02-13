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

    // showSelectedFile() {
    //     const file = this.input.files;
    //     if (file === null) {
    //         return;
    //     }
    //     const fileName = file[0].name;
    //     this.selectedFile = fileName;
    // }

    // async uploadFile() {
    //     if (this.input.files === null) {
    //         return;
    //     }
    //     const file = this.input.files[0];
    //     this.selectedFile = '';
    //     this.uploadImage(file);
    // }

    // // async uploadImage(file: File) {

    // //     const formData = new FormData();
    // //     formData.append('image', file);
    // //     const response = await fetch('https://api.imgur.com/3/image', {
    // //         method: 'POST',
    // //         headers: {
    // //             Authorization: 'Client-ID {4a59258aa10e62d}',
    // //         },
    // //         body: formData,
    // //     });
    // //     console.log("waiting res")
    // //     await response.json().then((res) => {
    // //         console.log(res)
    // //     })
    // //     console.log("FILE LINK", this.fileLink);
    // // }

    // async uploadImage(file: File) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         console.log(reader.result);
    //         let headers = new HttpHeaders({ 'Authorization': 'Client-ID 546c25a59c58ad7' });
    //         this.http.post('https://api.imgur.com/3/image', reader.result, { headers: headers }).subscribe((res: any) => {
    //             this.fileLink = res['data']['link'];
    //         });
    //     };


    //     // const formData = new FormData();
    //     // formData.append('image', file);
    //     // const response = await fetch('https://api.imgur.com/3/image', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         Authorization: 'Client-ID 4a59258aa10e62d',
    //     //     },
    //     //     body: formData,
    //     // });
    //     // this.fileLink = responseJson.data.link;
    //     console.log("FILE LINK", this.fileLink);
    // }
}


