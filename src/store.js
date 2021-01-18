import createStore from 'redux-zero';

const initialState = {
  genericData: {},
  addressData: {},
  contactData: [],
  departmentData: [],
};

const store = createStore(initialState);

export default store;
