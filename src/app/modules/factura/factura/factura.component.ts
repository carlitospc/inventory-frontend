import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FacturaService } from '../../shared/services/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit {
  private facturaService = inject(FacturaService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['id', 'document', 'number', 'api_client_name', 'reference_code', 'identification', 'graphic_representation_name', 'company', 'trade_name', 'names', 'email', 'total', 'status', 'errors', 'send_email', 'has_claim', 'is_negotiable_instrument', 'payment_form', 'created_at', 'credit_notes', 'debit_notes',
    'actions'];

    allColumns: string[] = [...this.displayedColumns]; // Lista completa de columnas disponibles


  dataSource = new MatTableDataSource<Factura>();
  totalItems: number = 0;
  perPage: number = 10;
  currentPage: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getFacturas(this.currentPage, this.perPage);
  }

  getFacturas(page: number, perPage: number): void {
    this.facturaService.getFacturas(page, perPage).subscribe({
      next: (response: FacturaResponse) => {
        if (response.status === 'OK') {
          this.dataSource = new MatTableDataSource<Factura>(response.data.data);
          this.totalItems = response.data.pagination.total;
          this.currentPage = response.data.pagination.current_page;
          this.perPage = response.data.pagination.per_page;

          if (this.paginator) {
            this.paginator.length = this.totalItems;
            this.paginator.pageIndex = this.currentPage - 1;
            this.paginator.pageSize = this.perPage;
          }
        }
      },
      error: (error: any) => {
        console.log("error: ", error);
      },
      complete: () => {
      }
    });
  }

  pageChanged(event: any) {
    this.getFacturas(event.pageIndex + 1, event.pageSize);
  }

  buscar(termino: string) {
  }

  edit() {
  }

  delete() {
  }

  openCategoryDialog() {
  }

  isColumnVisible(column: string): boolean {
    return this.displayedColumns.includes(column);
  }

  // Alterna la visibilidad de una columna
  toggleColumn(column: string): void {
    const index = this.displayedColumns.indexOf(column);
    if (index === -1) {
      this.displayedColumns.push(column);
    } else {
      this.displayedColumns.splice(index, 1);
    }
  }

}

/* interfaz para el dataSouce */
export interface FacturaResponse {
  status: string;
  message: string;
  data: FacturaData;
}

export interface FacturaData {
  data: Factura[];
  pagination: Pagination;
}

export interface Factura {
  id: number;
  document: Documento;
  number: string;
  api_client_name: string;
  reference_code: string;
  identification: string;
  graphic_representation_name: string;
  company: string;
  trade_name: string;
  names: string;
  email: string;
  total: string;
  status: number;
  errors: any[];
  send_email: number;
  has_claim: number;
  is_negotiable_instrument: number;
  payment_form: PaymentForm;
  created_at: string;
  credit_notes: any[];
  debit_notes: any[];
}

export interface Documento {
  code: string;
  name: string;
}

export interface PaymentForm {
  code: string;
  name: string;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  links: PaginationLink[];
}

export interface PaginationLink {
  url: string | null;
  label: string | number;
  active: boolean;
  page?: number;
}
