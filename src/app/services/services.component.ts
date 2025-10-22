import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { share } from 'rxjs';

interface Stock{
  id:number;
  symbol:string;
  name:string;
  shares:number;
  price:number;
  }

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
 title = 'Stock Portfolio';
 newstock = {symbol:'',name:'',shares:0,price:0};

 stocks:Stock[] = [
  {id:1, symbol:'AAPL',name:'Apple Inc',shares:10,price:175.0},
  {id:2, symbol:'TSLA',name:'Tesla Inc',shares:5,price:275.0},
  
 ];
 editingid:number| null = null;
 editstockmodel:Stock|null = null;

 private nextid = this.stocks.length+1;

 //add stock
 addstock(form:NgForm) {
  const s = this.newstock.symbol.trim();
  const n = this.newstock.name.trim();
  if(!s||!n||this.newstock.shares <=0 ||this.newstock.price<=0){
    return;
  }
  this.stocks.push({
    id:this.nextid++,
    symbol:s.toUpperCase(),
    name:n,
    shares:this.newstock.shares,
    price:this.newstock.price,
    });

  form.reset({symbol:'',name:'',shares:0,price:0})
 }


 edit(stock:Stock) {
  this.editingid = stock.id;
  this.editstockmodel = {...stock};
 }
 save() {
  if(!this.editstockmodel) return;
  const idx = this.stocks.findIndex(x=>x.id === this.editstockmodel!.id);
  if(idx >-1) {
    if(!this.editstockmodel.symbol.trim()||!this.editstockmodel.name.trim()||this.editstockmodel.shares <=0 || this.editstockmodel.price <=0){
      return;
    }  
   this.stocks[idx] = {
    ...this.editstockmodel,
    symbol:this.editstockmodel.symbol.trim().toUpperCase(),
    name:this.editstockmodel.name.trim()
   };
  
  }
 this.canceledit();

 }

 canceledit() {
  this.editingid = null;
  this.editstockmodel = null;
 }

 deletestock(stock:Stock){
  this.stocks = this.stocks.filter(x =>x.id !== stock.id);
  if(this.editingid === stock.id) this.canceledit();
 }

 totalvalue():number {
      return this.stocks.reduce((sum,s)=>sum + s.shares * s.price, 0);
     }
}
