const actions = (() => ({
  setGenericData: (_state, newData) => ({ genericData: newData }),
  setAddressData: (_state, newData) => ({ addressData: newData }),
  setContactData: (_state, newData) => ({ contactData: newData }),
  setDepartmentData: (_state, newData) => ({ departmentData: newData }),
}));

export default actions;
