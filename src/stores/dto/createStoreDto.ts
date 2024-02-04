import { IsString } from 'class-validator';
import { Store } from '../store';

class CreateStoreDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  telNumber: string;

  @IsString()
  url: string;

  toEntity(): Store {
    return Store.of(this.name, this.location, this.telNumber, this.url);
  }
}

export { CreateStoreDto };
