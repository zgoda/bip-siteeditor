import { signal } from '@preact/signals';
import { createContext } from 'preact';

export const AppState = createContext(createAppState());

export function createAppState() {
  const genericData = signal({
    name: '',
    shortName: '',
    bipUrl: '',
    nip: '',
    regon: '',
    krs: '',
  });
  const addressData = signal({
    street: '',
    zipCode: '',
    town: '',
  });
  /** @type {Array<import("..").ContactData>} */
  const emptyContactList = [];
  const contactsData = signal(emptyContactList);
  /** @type {Array<import("..").Department>} */
  const emptyDepartmentList = [];
  const departmentsData = signal(emptyDepartmentList);
  return { genericData, addressData, contactsData, departmentsData };
}
