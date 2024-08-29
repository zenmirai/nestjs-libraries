import { StorageAdapterContract } from "./storage.interface";

export class StorageService {
  constructor(private storage: StorageAdapterContract) {

  }
}