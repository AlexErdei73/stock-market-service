import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Stock } from 'src/app/model/stock';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stocks: Stock[];
  constructor() {
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
      new Stock('Second Stock Company', 'SSC', 10, 20, 'NSE'),
      new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE'),
    ];
  }
  getStocks(): Observable<Stock[]> {
    return of(this.stocks);
  }
  createStock(stock: Stock): Observable<any> {
    let foundStock = this.stocks.find((each) => each.code === stock.code);
    if (foundStock) {
      return throwError(
        () => new Error(`Stock with code ${stock.code} already exist`)
      );
    }
    this.stocks.push(stock);
    return of({ msg: `Stock with code ${stock.code} sucessfully created` });
  }
  toggleFavorite(stock: Stock): Observable<Stock> {
    let foundStock = this.stocks.find((each) => each.code === stock.code);
    foundStock!.favorite = !foundStock!.favorite;
    return of(foundStock!);
  }
}
