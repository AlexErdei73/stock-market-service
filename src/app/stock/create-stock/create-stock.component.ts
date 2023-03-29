import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css'],
})
export class CreateStockComponent {
  public stock: Stock;
  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];
  public message: string = '';
  constructor(private stockService: StockService) {
    this.stock = new Stock('', '', 0, 0, 'NASDAQ');
  }

  setStockPrice(price: number) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm: { valid: any }) {
    console.log('Stock form', stockForm);
    if (stockForm.valid) {
      this.stockService.createStock(this.stock).subscribe({
        next: (message) => (this.message = message.msg),
        error: (err) => {
          this.message = err.message;
          console.error(err);
        },
      });
    } else {
      console.error('Stock form is in an invalid state');
    }
  }
}
