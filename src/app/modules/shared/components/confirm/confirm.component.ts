import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  public dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
  }

  onNotClick() {
    this.dialogRef.close(3);
  }

  delete() {
    if (this.data != null) {
      if (this.data.module == 'category') {
        this.categoryService.deleteCategorie(this.data.id)
          .subscribe({
            next: (data: any) => {
              this.dialogRef.close(1);
            },
            error: (error: any) => {
              this.dialogRef.close(2);
            },
            complete: () => {
            }
          })
      } else if (this.data.module == 'product') {
        this.productService.deleteProduct(this.data.id)
          .subscribe({
            next: (data: any) => {
              this.dialogRef.close(1);
            },
            error: (error: any) => {
              this.dialogRef.close(2);
            },
            complete: () => {
            }
          })
      }
    } else {
      this.dialogRef.close(2);
    }
  }

}
