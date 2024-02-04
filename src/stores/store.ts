import { Expose } from 'class-transformer';

export class Store {
  // #_name: string;
  // #_location: string;
  // #_telNumber: string;
  // #_url: string;

  name: string;
  location: string;
  telNumber: string;
  url: string;

  constructor(name: string, location: string, telNumber: string, url: string) {
    // this.#_name = name;
    // this.#_location = location;
    // this.#_telNumber = telNumber;
    // this.#_url = url;

    this.name = name;
    this.location = location;
    this.telNumber = telNumber;
    this.url = url;
  }

  static of(
    name: string,
    location: string,
    telNumber: string,
    url: string,
  ): Store {
    const store = new Store(name, location, telNumber, url);
    return store;
  }

  // @Expose()
  // get name(): string {
  //   return this.#_name;
  // }

  // @Expose()
  // get location(): string {
  //   return this.#_location;
  // }

  // @Expose()
  // get telNumber(): string {
  //   return this.#_telNumber;
  // }

  // @Expose()
  // get url(): string {
  //   return this.#_url;
  // }
}
