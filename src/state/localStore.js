const storage = sessionStorage;

export const localStoreInitialize = () => {
  let initialeStateStorage = [];
  if (storage) {
    if (storage.length > 0) {
      for (let i = 0; i < storage.length; i++) {
        const storageKey = storage.key(i);
        const storageName = storage.getItem(storageKey);
        initialeStateStorage.push({
          id: Number(storageKey),
          name: storageName
        });
      }
    }
  }
  return initialeStateStorage;
};

export const localStoreCreatItem = (id, value) => {
  return storage.setItem(id, value);
};

export const localStoreModifyItem = (id, value) => {
  storage.removeItem(id);
  return storage.setItem(id, value);
};

export const localStoreRemoveItem = (id) => {
  return storage.removeItem(id);
};

export const localStoreSave = (state) => {
  state.map((item) => storage.setItem(item.id, item.name));
};
