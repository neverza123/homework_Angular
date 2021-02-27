import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient){ }

  ngOnInit(): void {

  }


  addForm = this.fb.group({
    name: [''],
    type: [''],
    price: [''],
    qty: [''],
    exp: [''],


  });

 addSubmit(): void {
    console.log(this.addForm.value)
    this.http.post('http://127.0.0.1:8000/api/add_product', this.addForm.value)
      .subscribe(
        (res) => {
          console.log(res);

        }
      );
  }





}
