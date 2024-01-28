import { Store } from '../store';

describe('Store domain', () => {
  const storeInfo = {
    name: '매장 이름',
    location: '매장 주소',
    telNumber: '매장 전화번호',
    url: '매장 URL',
  };

  it('should create store', () => {
    const store = new Store(
      storeInfo.name,
      storeInfo.location,
      storeInfo.telNumber,
      storeInfo.url,
    );

    expect(store).toBeInstanceOf(Store);
    expect(store.name).toBe(storeInfo.name);
  });
});
