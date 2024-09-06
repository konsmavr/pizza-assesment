// src/app/pizza.service.ts
import { Injectable } from '@angular/core';
import { Item, Price, Size, items, itemPrices, itemSizes } from './data';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private initialPrices = [...itemPrices];
  private prices = [...itemPrices];

  getItems(): Item[] {
    return items;
  }

  getSizes(): Size[] {
    return itemSizes;
  }

  getPrices(): Price[] {
    return this.prices;
  }
  
  getOriginalPrice(itemId: number, sizeId: number): number {
    const originalPrice = this.initialPrices.find(p => p.itemId === itemId && p.sizeId === sizeId);
    return originalPrice ? originalPrice.price : 0;
  }
  
  updatePrice(itemId: number, sizeId: number, newPrice: number): void {
    const price = this.prices.find(p => p.itemId === itemId && p.sizeId === sizeId);
    if (price) {
      price.price = newPrice;
    }
  }

  resetPrices(): void {
    this.prices = [...this.initialPrices];
  }

  resetItemPrices(itemId: number): void {
    this.prices = this.prices.map(p => {
      if (p.itemId === itemId) {
        const initialPrice = this.initialPrices.find(initP => initP.itemId === p.itemId && initP.sizeId === p.sizeId);
        return initialPrice ? { ...p, price: initialPrice.price } : p;
      }
      return p;
    });
  }
}

