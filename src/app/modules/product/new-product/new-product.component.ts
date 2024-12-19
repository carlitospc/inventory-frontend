import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  stateForm: string = "Agregar"; 
  categories: Category[] = [];
  selectedFile: any;
  nameImage: string = ""

  public productForm!: FormGroup;
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required],
    });

    if(this.data != null) {
      this.updateForm(this.data);
      this.stateForm = "Actualizar";
    }

    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data.categoryResponse.category;
      },
      error: (error: any) => {
        console.log("error al consultar categorias", error);
      },
      complete: () => {
      }
    });
  }

  onSave() {
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('account', data.account);
    uploadImageData.append('category', data.category);console.log(uploadImageData);

    //call service to save a product
    if(this.data != null) {
      this.productService.updateProduct(uploadImageData, this.data.id)
        .subscribe({
          next: (data: any) => {
            this.dialogRef.close(1);
          },
          error: (error: any) => {
            this.dialogRef.close(2);
          },
          complete: () => {
          }
        });
    } else {
      this.productService.saveProduct(uploadImageData)
      .subscribe({
        next: (data: any) => {console.log(data);
          this.dialogRef.close(1);
        },
        error: (error: any) => {
          this.dialogRef.close(2);
        },
        complete: () => {
        }
      })
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.nameImage = this.selectedFile.name;

  }

  updateForm(data: any){
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      account: [data.account, Validators.required],
      category: [data.category.id, Validators.required],
      picture: ['', Validators.required]
    });
  }

}

export interface Category {
  id: number;
  name: string;
  description: string;
}
