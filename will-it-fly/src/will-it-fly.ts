declare var uuidv4: () => string;

class Plane {
  id: number;
  economy_seats: number;
  buisness_seats: number;
  first_class_seats: number;
  fuel_capacity: number;

  constructor(
    id: number,
    economy_seats: number,
    buisness_seats: number,
    firs_class_seats: number,
    fuel_capacity: number
  ) {
    this.id = id;
    this.economy_seats = economy_seats;
    this.buisness_seats = buisness_seats;
    this.first_class_seats = firs_class_seats;
    this.fuel_capacity = fuel_capacity;
  }
}

type class_types = "economic" | "business" | "first-class";

class Passenger {
  id: number;
  flight: Flight;
  class_type: class_types;
  luggage_count: number;

  constructor(
    id: number,
    flight: Flight,
    class_type: class_types,
    luggage_count: number
  ) {
    this.id = id;
    this.flight = flight;
    this.class_type = class_type;
    this.luggage_count = luggage_count;

    this.flight.passengers.push(this);
  }
}

type weather_types = "good" | "wind" | "storm";

class Flight {
  id: number;
  plane: Plane;
  passengers: Passenger[];
  weather: weather_types;
  departure_airport: string;
  arrival_airport: string;
  distance: number;

  constructor(
    id: number,
    plane: Plane,
    weather: weather_types,
    departure_airport: string,
    arrival_airport: string,
    distance: number
  ) {
    this.id = id;
    this.plane = plane;
    this.passengers = [];
    this.weather = weather;
    this.departure_airport = departure_airport;
    this.arrival_airport = arrival_airport;
    this.distance = distance;
  }

  flightBudget(): number {
    let economic: number = 0;
    let buisness: number = 0;
    let first_class: number = 0;
    let luggage: number = 0;
    this.passengers.forEach((passenger) => {
      if (passenger.class_type === "economic") {
        economic += 1;
      } else if (passenger.class_type === "business") {
        buisness += 1;
      } else if ((passenger.class_type = "first-class")) {
        first_class += 1;
      }

      luggage += passenger.luggage_count;
    });
    let seatsCost: number = economic * 300 + buisness * 600 + first_class * 900;
    let luggageCost: number = luggage * 100;
    let totalCost: number = seatsCost + luggageCost;

    return totalCost;
  }

  fuelConsumption(): number {
    let fuelConsumption: number =
      ((this.passengers.length * 3) / 100) * this.distance;

    if (this.weather === "good") {
      return fuelConsumption;
    } else if (this.weather === "wind") {
      fuelConsumption = fuelConsumption + fuelConsumption * 0.1;
      return fuelConsumption;
    } else if (this.weather === "storm") {
      fuelConsumption = fuelConsumption + fuelConsumption * 0.2;
      return fuelConsumption;
    } else {
      return fuelConsumption;
    }
  }

  fuelBudget(): number {
    let fuelCost = this.fuelConsumption() * 7;
    return fuelCost;
  }

  isItWorthIt(): string {
    let isItWorthIt = this.flightBudget() / this.fuelBudget();

    if (isItWorthIt > 3) {
      return "Tak";
    } else {
      return "Nie";
    }
  }

  canFlyDirectly(): string {
    let fuelNeeded = (this.fuelConsumption() * this.distance) / 100;

    if (fuelNeeded <= this.plane.fuel_capacity) {
      return "Tak";
    } else {
      return "Nie";
    }
  }

  enoughPassengers(): string {
    let economyPassengers = 0;
    this.passengers.forEach((element) => {
      if (element.class_type === "economic") {
        economyPassengers += 1;
      }
    });

    let result = this.plane.economy_seats / economyPassengers;

    if (result <= 2) {
      return "Tak";
    } else {
      return "Nie";
    }
  }
}

class View {
  constructor() {}

  getFlightData(flight: Flight): object {
    return {
      flightBudget: flight.flightBudget(),
      fuelConsumption: flight.fuelConsumption(),
      fuelBudget: flight.fuelBudget(),
      isItWorthIt: flight.isItWorthIt(),
      canFlyDirectly: flight.canFlyDirectly(),
      enoughPassengers: flight.enoughPassengers(),
    };
  }

  flightView(flightData: any): string {
    return `
    -------------------------------------------
    -Przychody: ${flightData.flightBudget} PLN                

    -Koszt Paliwa: ${flightData.fuelBudget} PLN

    -Zurzycie paliwa: ${flightData.fuelConsumption} litrów

    -Wystarczająco pasaerów do odbycia lotu: ${flightData.enoughPassengers}

    -Czy potrzebne jest międzylądowanie: ${flightData.canFlyDirectly}

    -Czy lot się opłaca: ${flightData.isItWorthIt}
    -------------------------------------------`;
  }
}

class Controller {
  view: View;

  constructor(view: View) {
    this.view = view;
  }

  main() {
    let samolotLot = new Plane(1, 100, 20, 10, 20000);
    let LotDoLondynu = new Flight(
      1,
      samolotLot,
      "good",
      "Warszawa",
      "Londyn",
      1000
    );

    let Pasażer1 = new Passenger(1, LotDoLondynu, "economic", 2);
    let Pasażer2 = new Passenger(2, LotDoLondynu, "economic", 2);
    let Pasażer3 = new Passenger(3, LotDoLondynu, "economic", 2);
    let Pasażer4 = new Passenger(4, LotDoLondynu, "economic", 2);
    let Pasażer5 = new Passenger(5, LotDoLondynu, "economic", 2);
    let Pasażer6 = new Passenger(6, LotDoLondynu, "economic", 1);
    let Pasażer7 = new Passenger(7, LotDoLondynu, "economic", 1);
    let Pasażer8 = new Passenger(8, LotDoLondynu, "economic", 1);
    let Pasażer9 = new Passenger(9, LotDoLondynu, "economic", 1);
    let Pasażer10 = new Passenger(10, LotDoLondynu, "economic", 1);
    let Pasażer11 = new Passenger(11, LotDoLondynu, "economic", 1);
    let Pasażer12 = new Passenger(12, LotDoLondynu, "economic", 1);
    let Pasażer13 = new Passenger(13, LotDoLondynu, "economic", 1);
    let Pasażer14 = new Passenger(14, LotDoLondynu, "economic", 1);
    let Pasażer15 = new Passenger(15, LotDoLondynu, "economic", 1);
    let Pasażer16 = new Passenger(16, LotDoLondynu, "economic", 1);
    let Pasażer17 = new Passenger(17, LotDoLondynu, "economic", 1);
    let Pasażer18 = new Passenger(18, LotDoLondynu, "economic", 1);
    let Pasażer19 = new Passenger(19, LotDoLondynu, "economic", 1);
    let Pasażer20 = new Passenger(20, LotDoLondynu, "economic", 1);
    let Pasażer21 = new Passenger(21, LotDoLondynu, "economic", 1);
    let Pasażer22 = new Passenger(22, LotDoLondynu, "economic", 1);
    let Pasażer23 = new Passenger(23, LotDoLondynu, "economic", 1);
    let Pasażer24 = new Passenger(24, LotDoLondynu, "economic", 1);
    let Pasażer25 = new Passenger(25, LotDoLondynu, "economic", 1);
    let Pasażer26 = new Passenger(26, LotDoLondynu, "economic", 1);
    let Pasażer27 = new Passenger(27, LotDoLondynu, "economic", 1);
    let Pasażer28 = new Passenger(28, LotDoLondynu, "economic", 1);
    let Pasażer29 = new Passenger(29, LotDoLondynu, "economic", 1);
    let Pasażer30 = new Passenger(30, LotDoLondynu, "economic", 1);
    let Pasażer31 = new Passenger(31, LotDoLondynu, "economic", 1);
    let Pasażer32 = new Passenger(32, LotDoLondynu, "economic", 1);
    let Pasażer33 = new Passenger(33, LotDoLondynu, "economic", 1);
    let Pasażer34 = new Passenger(34, LotDoLondynu, "economic", 1);
    let Pasażer35 = new Passenger(35, LotDoLondynu, "economic", 1);
    let Pasażer36 = new Passenger(36, LotDoLondynu, "economic", 1);
    let Pasażer37 = new Passenger(37, LotDoLondynu, "economic", 1);
    let Pasażer38 = new Passenger(38, LotDoLondynu, "economic", 1);
    let Pasażer39 = new Passenger(39, LotDoLondynu, "economic", 1);
    let Pasażer40 = new Passenger(40, LotDoLondynu, "economic", 1);
    let Pasażer41 = new Passenger(41, LotDoLondynu, "economic", 1);
    let Pasażer42 = new Passenger(42, LotDoLondynu, "economic", 1);
    let Pasażer43 = new Passenger(43, LotDoLondynu, "economic", 1);
    let Pasażer44 = new Passenger(44, LotDoLondynu, "economic", 1);
    let Pasażer45 = new Passenger(45, LotDoLondynu, "economic", 1);
    let Pasażer46 = new Passenger(46, LotDoLondynu, "economic", 1);
    let Pasażer47 = new Passenger(47, LotDoLondynu, "economic", 1);
    let Pasażer48 = new Passenger(48, LotDoLondynu, "economic", 1);
    let Pasażer49 = new Passenger(49, LotDoLondynu, "economic", 1);
    let Pasażer50 = new Passenger(50, LotDoLondynu, "economic", 1);

    let Pasażer51 = new Passenger(51, LotDoLondynu, "business", 2);
    let Pasażer52 = new Passenger(52, LotDoLondynu, "business", 2);
    let Pasażer53 = new Passenger(53, LotDoLondynu, "business", 2);
    let Pasażer54 = new Passenger(54, LotDoLondynu, "business", 2);
    let Pasażer55 = new Passenger(55, LotDoLondynu, "business", 2);
    let Pasażer56 = new Passenger(56, LotDoLondynu, "business", 2);
    let Pasażer57 = new Passenger(57, LotDoLondynu, "business", 2);
    let Pasażer58 = new Passenger(58, LotDoLondynu, "business", 2);
    let Pasażer59 = new Passenger(59, LotDoLondynu, "business", 2);
    let Pasażer60 = new Passenger(60, LotDoLondynu, "business", 2);

    let Pasażer61 = new Passenger(61, LotDoLondynu, "first-class", 1);
    let Pasażer62 = new Passenger(62, LotDoLondynu, "first-class", 1);
    let Pasażer63 = new Passenger(63, LotDoLondynu, "first-class", 1);
    let Pasażer64 = new Passenger(64, LotDoLondynu, "first-class", 1);
    let Pasażer65 = new Passenger(65, LotDoLondynu, "first-class", 1);

    this.flightDisplay(LotDoLondynu);
  }

  flightDisplay(flight: Flight) {
    console.log(view.flightView(view.getFlightData(flight)));
  }
}

let view = new View();
let controller = new Controller(view);
controller.main();
