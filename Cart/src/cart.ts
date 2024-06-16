declare var uuidv4: () => string;

class CartItem {
  name: string;
  category: string;
  price: number;
  priceAfterDiscount: number;
  discount: number;
  uuid: string;

  constructor(name: string, category: string, price: number, discount: number) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.priceAfterDiscount = this.discountCalculation(discount);
    this.discount = discount;
    this.uuid = uuidv4();
  }

  discountCalculation(discount: number): number {
    let priceAfterDiscount;
    priceAfterDiscount = this.price * (discount / 100);
    priceAfterDiscount = this.price - priceAfterDiscount;
    return priceAfterDiscount;
  }

  changeNameOfItem(newName: string) {
    this.name = newName;
  }

  changePriceOfItem(newPrice: number) {
    this.price = newPrice;
    this.priceAfterDiscount = this.discountCalculation(this.discount);
  }

  changeDiscountOfItem(newDiscount: number) {
    this.discount = newDiscount;
    this.priceAfterDiscount = this.discountCalculation(newDiscount);
  }
  // Ma miec: Nazwę, Kategorię, Cenę, Rabat % na przedmiot, uuid
  // Ma umożliwiać:
  // - określać jego rabat procentowy
  // - dodawać produkt do kategorii
  // - zmianę nazwy, ceny lub rabatu
}

class Cart {
  // Ma mieć: uuid, listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
  // Ma umożliwiać:
  // - dodawanie/usuwanie przedmiotów do/z koszyka
  // - zmianę ilości produktu w koszyku
  // - podliczać wartość koszyka uwzględniajac rabaty
}
