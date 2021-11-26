import { atom, cleanStores, map } from 'nanostores';

/** @type {import('nanostores').MapStore<import('../..').GenericData>} */
export const genericDataStore = map({});

/** @type {import('nanostores').MapStore<import('../..').AddressData>} */
export const addressDataStore = map({});

/** @type {import('nanostores').WritableAtom<Array<import('../..').ContactData>>} */
export const contactDataStore = atom([]);

/** @type {import('nanostores').WritableAtom<Array<import('../..').Department>>} */
export const departmentDataStore = atom([]);

export function clearState() {
  cleanStores(
    genericDataStore,
    addressDataStore,
    contactDataStore,
    departmentDataStore,
  );
}
