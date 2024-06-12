declare var uuidv4: () => string;

class Contact {
  imie: string;
  nazwisko: string;
  adres_email: string;
  uuid: string;
  data_utworzenia: string;
  data_modyfikacji: string;

  constructor(imie: string, nazwisko: string, adres_email: string) {
    this.imie = imie;
    this.nazwisko = nazwisko;
    this.adres_email = adres_email;
    this.uuid = uuidv4();
    this.data_utworzenia = this.dateToString(new Date());
    this.data_modyfikacji = this.updateDate();

    KsiazkaAdresowa.lista_kontaktów.push(this);
  }

  dateToString(date: Date): string {
    return date.toLocaleDateString();
  }

  updateDate() {
    return this.dateToString(new Date());
  }

  changeName(newName: string): string {
    this.updateDate();
    return (this.imie = newName);
  }

  changeSurname(newSurname: string): string {
    this.updateDate();
    return (this.imie = newSurname);
  }

  changeEmail(newEmail: string): string {
    this.updateDate();
    return (this.adres_email = newEmail);
  }

  // Ma mieć: Imie, Nazwisko, adres-emial, datę modyfikacji i utworzenia, uuid
  // Ma umożliwiać: aktualizację datę modyfikacji, pozwalac na modyfikację imienia, nazwiska oraz adresu email
}

class Group {
  lista_kontaktów: Contact[];
  nazwa_grupy: string;
  uuid: string;
  view: View;

  constructor(nameOfGroup: string) {
    this.nazwa_grupy = nameOfGroup;
    this.lista_kontaktów = [];
    this.uuid = uuidv4();

    this.view = view;

    KsiazkaAdresowa.lista_grup.push(this);
  }

  changeNameOfGroup(newName: string): string {
    return (this.nazwa_grupy = newName);
  }

  addContact(contact: Contact) {
    this.lista_kontaktów.push(contact);
  }

  removeContact(contact: Contact) {
    let foundContact = this.lista_kontaktów.find((element, index) => {
      return contact.uuid === element.uuid;
    });

    if (foundContact !== undefined) {
      this.lista_kontaktów.splice(
        this.lista_kontaktów.indexOf(foundContact),
        1
      );
    } else {
      throw new Error("Niepoprawnie Podany Kontakt");
    }
  }

  isContactExiste(contact: Contact) {
    let foundContact = this.lista_kontaktów.find((element, index) => {
      return contact.uuid === element.uuid;
    });

    if (foundContact) {
      this.view.contactFoundMessage();
    } else {
      this.view.contactNotFoundMessage();
    }
  }

  // Ma mieć: listę kontaktów oraz nazwę grupy oraz uuid
  // Ma umożliwiać: zmianę nazwy grupy, można dodać lub usunac kontakt z grupy, można sprawdzić czy kontakt istnieje w grupie
}

class AddressBook {
  lista_kontaktów: Contact[];
  lista_grup: Group[];
  view: View;
  private static instance: AddressBook;
  constructor() {
    this.lista_kontaktów = [];
    this.lista_grup = [];
    this.view = view;
  }

  public static getInstance(): AddressBook {
    if (!AddressBook.instance) {
      AddressBook.instance = new AddressBook();
    }
    return AddressBook.instance;
  }

  findContactPhrase(phrase: string) {
    const regExpZPhrase = new RegExp(phrase, "i");

    const wynik = this.lista_kontaktów.find((element) => {
      Object.values(element).find((value) => {
        if (regExpZPhrase.test(value) && phrase != "") {
          view.viewOfContact(element);
        }
      });
    });
  }

  changeName(contact: Contact, NewName: string) {
    contact.changeName(NewName);
  }

  changeSurname(contact: Contact, NewSurname: string) {
    contact.changeSurname(NewSurname);
  }

  changeEmail(contact: Contact, NewEmail: string) {
    contact.changeEmail(NewEmail);
  }

  changeNameOfGroup(group: Group, newName: string) {
    group.nazwa_grupy = newName;
  }

  deleteContact(contact: Contact) {
    this.lista_kontaktów.forEach((element: Contact, index) => {
      if (element.uuid === contact.uuid) {
        this.lista_kontaktów.splice(index, 1);
      }
    });
  }

  deleteGroup(group: Contact) {
    this.lista_grup.forEach((element: Group, index) => {
      if (element.uuid === group.uuid) {
        this.lista_grup.splice(index, 1);
      }
    });
  }

  addContactToGroup(group: Group, contact: Contact) {
    group.addContact(contact);
  }

  deleteContactFromGroup(group: Group, contact: Contact) {
    group.lista_kontaktów.forEach((element: Contact, index) => {
      if (element.uuid === contact.uuid) {
        group.lista_kontaktów.splice(index, 1);
      }
    });
  }

  // Ma mieć: listę wszystkich kontaktów, listę grup kontaktów
  // Ma umożliwiać: szukanie kontaktu po frazie, dodawanie/usuwanie/modyfikacje nowych kontaktów, dodawanie/usuwanie/modyfikacje nowych grup
}

class View {
  constructor() {}

  contactFoundMessage() {
    console.log("Taki kontakt istnieje w grupie.");
  }

  contactNotFoundMessage() {
    console.log("Taki kontakt nie istnieje w grupie.");
  }

  viewOfContact(contact: Contact) {
    console.log(`    Imie i Nazwisko: ${contact.imie} ${contact.nazwisko}\n
    Adres Email: ${contact.adres_email}\n
    Data utworzenia: ${contact.data_utworzenia} \n
    Uuid: ${contact.uuid}`);
  }
}

class Controller {
  constructor() {}

  main() {
    let contact1 = new Contact("Jan", "Kowalski", "jan.kowalski@example.com");
    let contact2 = new Contact("Anna", "Nowak", "anna.nowak@example.com");
    let contact3 = new Contact("Ewa", "Kaczmarek", "ewa.kaczmarek@example.com");
    let contact4 = new Contact("Michał", "Zając", "michal.zajac@example.com");
    let contact5 = new Contact("Dorota", "Król", "dorota.krol@example.com");

    let grupa1 = new Group("Kontakty Ważne");
    let grupa2 = new Group("Przyjaciele");

    KsiazkaAdresowa.addContactToGroup(grupa1, contact1);
    KsiazkaAdresowa.addContactToGroup(grupa1, contact2);
    KsiazkaAdresowa.addContactToGroup(grupa1, contact3);
    KsiazkaAdresowa.addContactToGroup(grupa2, contact4);
    KsiazkaAdresowa.addContactToGroup(grupa2, contact5);

    console.log(KsiazkaAdresowa);
  }
}

let view = new View();
let KsiazkaAdresowa = AddressBook.getInstance();
let controller = new Controller();

controller.main();
