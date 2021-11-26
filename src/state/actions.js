import { action } from 'nanostores';
import {
  addressDataStore,
  contactDataStore,
  departmentDataStore,
  genericDataStore,
} from './store';

const actions = () => ({
  setGenericData: (_state, newData) => ({ genericData: newData }),
  setAddressData: (_state, newData) => ({ addressData: newData }),
  setContactData: (_state, newData) => ({ contactData: newData }),
  setDepartmentData: (_state, newData) => ({ departmentData: newData }),
});

export default actions;

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
};

export const departmentdataActions = {
  set: action(
    departmentDataStore,
    'set',
    (store, /** @type {Array<import('../..').Department>} */ data) => {
      store.set(data);
      return store.get();
    },
  ),
};
