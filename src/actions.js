/* eslint-disable no-unused-vars */
const actions = (store => ({
  setGenericData: (state, newData) => ({ genericData: newData }),
  setAddressData: (state, newData) => ({ addressData: newData }),
  setContactData: (state, newData) => ({ contactData: newData }),
  setDepartmentData: (state, newData) => ({ departmentData: newData }),
}));

export default actions;
