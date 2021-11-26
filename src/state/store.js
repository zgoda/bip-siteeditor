import createStore from 'redux-zero';
import { atom, map } from 'nanostores';

const initialState = {
  genericData: {},
  addressData: {},
  contactData: [],
  departmentData: [],
};

export const store = createStore(initialState);

/** @type {import('nanostores').MapStore<import('../..').GenericData>} */
export const genericDataStore = map({});

/** @type {import('nanostores').MapStore<import('../..').AddressData>} */
export const addressDataStore = map({});

/** @type {import('nanostores').WritableAtom<Array<import('../..').ContactData>>} */
export const contactDataStore = atom([]);

/** @type {import('nanostores').WritableAtom<Array<import('../..').Department>>} */
export const departmentDataStore = atom([]);
