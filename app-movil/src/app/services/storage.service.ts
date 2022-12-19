import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public _storage: Storage | null = null;

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async get(key: string) {
    return await this._storage.get(key);
  }

  async set(key: string, value: any) {
    await this._storage.set(key, value);
  }

  // TODO: fix exist
  exist(keySearch: string) {
    return new Promise((resolve, reject) => {
      let founded = false;
      this._storage.forEach((data, key, index) => {
        if (key === keySearch) {
          founded = true;
        }
      });
      resolve(founded);
    });
  }

  async remove(key: string) {
    await this._storage.remove(key);
  }

  async clear() {
    await this._storage.clear();
  }

}
