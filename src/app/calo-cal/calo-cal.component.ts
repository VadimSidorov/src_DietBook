import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calo-cal',
  templateUrl: './calo-cal.component.html',
  styleUrls: ['./calo-cal.component.css']
})
export class CaloCalComponent implements OnInit {
  calAmount: number;
  constructor() { }

  ngOnInit() {
  }
  calculate(form: NgForm){
    const value = form.value;
    this.calAmount = value.weight*10 + 6.25*(value.heightFeet*12 + value.heightInch) -5*value.age;
    form.reset()
  }
}
