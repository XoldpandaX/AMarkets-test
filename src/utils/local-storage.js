import isPlainObject from 'lodash.isplainobject';

function getStorageItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getStorageCollectionItem(key, itemId) {
  const item = getStorageItem(key).filter(({ id }) => id === itemId);
  return item.length ? item[0] : null;
}

function setStorageItem(key, item) {
  const setCollectionItem = (changingCollection) => {
    if (!item.id) {
      throw new Error('Collection element should be a plain object and has to uniq id');
    }

    const searchIndex = changingCollection.findIndex(
      (collection) => collection.id === item.id,
    );
    const result = changingCollection;

    if (searchIndex !== -1) {
      result[searchIndex] = item;
    } else {
      result.push(item);
    }

    localStorage.setItem(key, JSON.stringify(result));
  };

  const currentItem = getStorageItem(key);
  if (!currentItem) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  if (currentItem && isPlainObject(item)) {
    setCollectionItem(currentItem);
  }
}

function removeStorageCollectionItem(key, itemId) {
  const currentItems = getStorageItem(key);
  const updatedItems = currentItems.filter(
    (currentItem) => currentItem.id !== itemId,
  );

  localStorage.removeItem(key);
  setStorageItem(key, updatedItems);
}

export {
  getStorageItem,
  getStorageCollectionItem,
  setStorageItem,
  removeStorageCollectionItem,
};
