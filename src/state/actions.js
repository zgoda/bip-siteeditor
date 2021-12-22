import { action } from 'nanostores';
import {
  addressDataStore,
  contactDataStore,
  departmentDataStore,
  genericDataStore,
} from './store';

export const genericDataActions = {
  set: action(
    genericDataStore,
    'set',
    (store, /** @type {import('../..').GenericData} */ data) => {
      store.set(data);
      return store.get();
    },
  ),
};

export const addressDataActions = {
  set: action(
    addressDataStore,
    'set',
    (store, /** @type {import('../..').AddressData} */ data) => {
      store.set(data);
      return store.get();
    },
  ),
};

export const contactDataActions = {
  set: action(
    contactDataStore,
    'set',
    (store, /** @type {Array<import('../..').ContactData>} */ data) => {
      store.set(data);
      return store.get();
    },
  ),
  add: action(
    contactDataStore,
    'add',
    (store, /** @type {import('../..').ContactData} */ item) => {
      store.set([...store.get(), item]);
      return store.get();
    },
  ),
  update: action(
    contactDataStore,
    'update',
    (store, /** @type {import('../..').ContactData} */ item) => {
      const newContent = store.get().map((contact) => {
        if (contact.id === item.id) {
          return item;
        }
        return contact;
      });
      store.set(newContent);
      return store.get();
    },
  ),
  remove: action(
    contactDataStore,
    'remove',
    (store, /** @type {import('../..').ContactData} */ item) => {
      const newContent = store.get().filter((contact) => {
        if (contact.id !== item.id) {
          return contact;
        }
      });
      store.set(newContent);
      return store.get();
    },
  ),
};

export const departmentDataActions = {
  set: action(
    departmentDataStore,
    'set',
    (store, /** @type {Array<import('../..').Department>} */ data) => {
      store.set(data);
      return store.get();
    },
  ),
  setStaff: action(
    departmentDataStore,
    'setStaff',
    (
      store,
      /** @type {string} */ department,
      /** @type {Array<import('../..').StaffMember>} */ staff,
    ) => {
      const newContent = store.get().map((item) => {
        if (item.name === department) {
          item.staff = staff;
        }
        return item;
      });
      store.set(newContent);
      return store.get();
    },
  ),
};
