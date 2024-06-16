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
  uuid: string;
  listOfItems: CartItem[];
  discount: number;
  priceOfCart: any;
  priceOfCartAfterDiscount: number;

  constructor(discount: number) {
    this.uuid = uuidv4();
    this.listOfItems = [];
    this.discount = discount;
    this.priceOfCart = 0;
    this.priceOfCartAfterDiscount = 0;
  }

  addItemToCart(cartItem: CartItem) {
    this.listOfItems.push(cartItem);
    this.calculatePriceOfCart(cartItem);
    this.calculatePriceOfCartAfterDiscount();
  }

  removeItemFromCart(cartItem: CartItem) {
    this.listOfItems.forEach((element, index) => {
      if (element.uuid === cartItem.uuid) {
        this.listOfItems.splice(index, 1);
      }
    });
    this.calculatePriceOfCart(cartItem);
    this.calculatePriceOfCartAfterDiscount();
  }

  calculatePriceOfCart(cartItem: CartItem) {
    let totalPrice = 0;
    for (let item of this.listOfItems) {
      totalPrice += item.price;
    }
    this.priceOfCart = totalPrice;
  }

  calculatePriceOfCartAfterDiscount() {
    let priceAfterDiscount = this.priceOfCart * (this.discount / 100);
    priceAfterDiscount = this.priceOfCart - priceAfterDiscount;
    this.priceOfCartAfterDiscount = priceAfterDiscount;
  }

  changeQuantityOfItem(item: CartItem, quantity: number) {
    if (quantity === 0) {
      this.removeItemFromCart(item);
    } else {
      for (let i = 0; i < quantity - 1; i++) {
        this.addItemToCart(item);
      }
    }
  }

  // Ma mieć: uuid, listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
  // Ma umożliwiać:
  // - dodawanie/usuwanie przedmiotów do/z koszyka
  // - zmianę ilości produktu w koszyku
  // - podliczać wartość koszyka uwzględniajac rabaty
}
