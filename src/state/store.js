import createStore from 'redux-zero';

const initialState = {
  genericData: {},
  addressData: {},
  contactData: [],
  departmentData: [],
};

export const store = createStore(initialState);
