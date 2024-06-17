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
  view: View;

  constructor(discount: number) {
    this.uuid = uuidv4();
    this.listOfItems = [];
    this.discount = discount;
    this.priceOfCart = 0;
    this.priceOfCartAfterDiscount = 0;
    this.view = view;
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
      this.removeItemFromCart(item);
      for (let i = 0; i < quantity; i++) {
        this.addItemToCart(item);
      }
    }
  }

  quantityOfItem(item: CartItem): number {
    let quantity = 0;
    this.listOfItems.forEach((element) => {
      if (element.name === item.name && element.price === item.price) {
        quantity += 1;
      }
    });
    return quantity;
  }

  displayCart() {
    this.view.cartView(this);
  }
  // Ma mieć: uuid, listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
  // Ma umożliwiać:
  // - dodawanie/usuwanie przedmiotów do/z koszyka
  // - zmianę ilości produktu w koszyku
  // - podliczać wartość koszyka uwzględniajac rabaty
}

class View {
  constructor() {}

  cartView(cart: Cart) {
    console.log(`Rabat na koszyk: ${cart.discount}%`);
    console.log("Przedmioty w koszyku:");
    cart.listOfItems.find((element) => {
      console.log(
        `Nazwa: ${element.name} | Kategoria: ${
          element.category
        } | Cena po rabacie: ${
          element.priceAfterDiscount
        }$ | Ilość: ${cart.quantityOfItem(element)}`
      );
    });
    console.log(`Cena Koszyka po rabacie: ${cart.priceOfCartAfterDiscount}$`);
  }
}

class Controller {
  constructor() {}

  main() {
    let Cart1 = new Cart(10);

    let Marchew = new CartItem("Marchew", "Warzywa", 50, 10);
    let Kapusta = new CartItem("Kapusta", "Warzywa", 50, 10);
    let Rzodkiewka = new CartItem("Rzodkiewka", "Warzywa", 100, 10);
    let Rower = new CartItem("Rower", "Sport", 250, 10);

    Cart1.addItemToCart(Marchew);
    Cart1.addItemToCart(Kapusta);
    Cart1.addItemToCart(Rzodkiewka);
    Cart1.addItemToCart(Rower);

    Cart1.changeQuantityOfItem(Marchew, 5);

    Cart1.displayCart();
    console.log(Cart1);
  }
}

let controller = new Controller();
let view = new View();

controller.main();
