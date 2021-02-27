import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
interface DataTablesResponse {
  data: any[];
  draw: number;
  to: number;
  total: number;
}


@Component({
  selector: 'app-product',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  stocks: any = [];


  addForm = this.fb.group({
    name: [''],
    type: [''],
    price: [''],
    qty: [''],
    exp: [''],


  });

  editForm = this.fb.group({
    id: [''],
    name: [''],
    type: [''],
    price: [''],
    qty: [''],
    exp: [''],


  });


  deleteForm = this.fb.group({
    id: [''],


  });

  table: string = 'show';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {this.LoadTable();
  }


LoadTable(): void{

  const that = this;

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    serverSide: true,
    processing: true,
    ajax: (dataTablesParameters: any, callback) => {
      that.http
        .post<DataTablesResponse>(
          'http://127.0.0.1:8000/api/datatable_stock',
          dataTablesParameters, {}
        ).subscribe(resp => {
          that.stocks = resp.data;

          callback({
            recordsTotal: resp.to,
            recordsFiltered: resp.total,
            data: []
          });
        });
    },
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'type' },
      { data: 'price' },
      { data: 'qty' },
      { data: 'exp' },
      { data: 'จัดการ' },
    ]
  };
}

  addSubmit(): void {
    console.log(this.addForm.value)
    this.http.post('http://127.0.0.1:8000/api/add_product', this.addForm.value)
      .subscribe(
        (res) => {
          console.log(res);

        }
      );
  }

  editSubmit(): void {
    console.log(this.editForm.value)
    this.http.put('http://127.0.0.1:8000/api/edit_stock/' + this.editForm.value.id, this.editForm.value)

      .subscribe(
        (res) => {
          window.location.reload();

        }
      );

  }


  deleteSubmit(): void {
    console.log(this.deleteForm.value)
    this.http.delete('http://127.0.0.1:8000/api/delete_stock/' + this.deleteForm.value.id,)
      .subscribe(
        (res) => {
          console.log(res);

        }
      );

  }
  showProduct(stock: any): void {
    console.log(stock);

  }
  deleteProduct(stock: any): void {
    this.http.delete('http://127.0.0.1:8000/api/delete_stock/' + stock.id)
      .subscribe(
        (res) => {
          window.location.reload();
          console.log(res);
          this.LoadTable();

        }
      );
  }
  changeProduct(stock: any): void {
  this.table = 'edit';
  this.editForm = this.fb.group({
    id: [stock.id],
    name: [stock.name],
    type: [stock.type],
    price: [stock.price],
    qty: [stock.qty],
    exp: [stock.exp],
  })



  }

}

