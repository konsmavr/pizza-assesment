import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { Item, Size, Price } from '../data';

@Component({
  selector: 'app-pizza-menu',
  templateUrl: './pizza-menu.component.html',
  styleUrls: ['./pizza-menu.component.css']
})
export class PizzaMenuComponent implements OnInit {
  items: Item[] = [];
  sizes: Size[] = [];
  prices: Price[] = [];
  activeItem: number | null = null;
  editedPrices: { [key: number]: boolean } = {};

  constructor(private pizzaService: PizzaService) {}

  ngOnInit(): void {
    this.items = this.pizzaService.getItems();
    this.sizes = this.pizzaService.getSizes();
    this.prices = this.pizzaService.getPrices();
  }

  getPrice(itemId: number, sizeId: number): number {
    const price = this.prices.find(p => p.itemId === itemId && p.sizeId === sizeId);
    return price ? price.price : 0;
  }

  toggleAccordion(itemId: number): void {
    this.activeItem = this.activeItem === itemId ? null : itemId;
  }

  onPriceChange(itemId: number, sizeId: number, event: Event): void {
    const newPrice = parseFloat((event.target as HTMLInputElement).value);
    this.pizzaService.updatePrice(itemId, sizeId, newPrice);
    this.editedPrices[itemId] = true;
  }

  onPriceInputChange(itemId: number, sizeId: number, newPrice: number): void {
    this.pizzaService.updatePrice(itemId, sizeId, newPrice);
    this.editedPrices[itemId] = true;
  }

  resetItem(itemId: number): void {
    this.pizzaService.resetItemPrices(itemId);
    this.prices = this.pizzaService.getPrices();
    this.editedPrices[itemId] = false;

   
  }

  isSizeSelected(itemId: number, sizeId: number): boolean {
    const price = this.prices.find(p => p.itemId === itemId && p.sizeId === sizeId);
    return price ? price.price > 0 : false;
  }

  toggleSize(itemId: number, sizeId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      const originalPrice = this.pizzaService.getOriginalPrice(itemId, sizeId);
      this.pizzaService.updatePrice(itemId, sizeId, originalPrice);
    } else {
      this.pizzaService.updatePrice(itemId, sizeId, 0);
    }
    this.editedPrices[itemId] = true;
  }
}


