import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StockComponent } from '../stock/stock.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
  }

  deleteForm = this.fb.group({
    id: [''],


  });

  deleteSubmit(): void {
    console.log(this.deleteForm.value)
    this.http.delete('http://127.0.0.1:8000/api/delete_stock/' + this.deleteForm.value.id,)
      .subscribe(
        (res) => {
          window.location.reload();
          console.log(res);


        }
      );




}
}
