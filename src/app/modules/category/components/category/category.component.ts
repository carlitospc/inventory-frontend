import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  processCategoriesResponse(resp: any) {
    const dataCategory: CategoryElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listCategory = resp.categoryResponse.category;
      
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
    }
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
        next: (data: any) => {
          console.log(data);
          this.processCategoriesResponse(data);
        },
        error: (error: any) => {
          console.log("error: ", error);
        },
        complete: () => {
          console.log("Completed fetching categories");
        }
      });
  }

  edit(id: number, name: string, description: string){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      data: {id: id, name: name, description: description},
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1) {
        this.openSnackBar("Categoria actualizada", "Exitosa");
        this.getCategories();
      } else if(result == 2){
        this.openSnackBar("Se producjo un error al actualizar categoria", "Error");
      }
    });
  } 

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {id: id, module: 'category'},
    });
    
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1) {
        this.openSnackBar("Categoria eliminada", "Exitosa");
        this.getCategories();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al eliminarar categoria", "Error");
      }
    });
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.getCategories();
    }

    this.categoryService.getCategorieById(termino)
      .subscribe({
        next: (resp: any) => {
          this.processCategoriesResponse(resp);
        },
        error: (error: any) => {
        },
        complete: () => {
        }
      })
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1) {
        this.openSnackBar("Categoria agregada", "Exitosa");
        this.getCategories();
      } else if(result == 2){
        this.openSnackBar("Se producjo un error al guardar categoria", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }
}

export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}
