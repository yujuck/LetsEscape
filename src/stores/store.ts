import { Expose } from 'class-transformer';

export class Store {
  #_name: string;
  #_location: string;
  #_telNumber: string;
  #_url: string;

  constructor(name: string, location: string, telNumber: string, url: string) {
    this.#_name = name;
    this.#_location = location;
    this.#_telNumber = telNumber;
    this.#_url = url;
  }

  @Expose()
  get name(): string {
    return this.#_name;
  }

  @Expose()
  get location(): string {
    return this.#_location;
  }

  @Expose()
  get telNumber(): string {
    return this.#_telNumber;
  }

  @Expose()
  get url(): string {
    return this.#_url;
  }
}
