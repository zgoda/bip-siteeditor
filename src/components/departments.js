import { useState } from 'preact/hooks';
import { TextField, SubmitButton, ChoiceSingle } from './forms';
import { chunkArray } from './utils';
import { connect } from 'redux-zero/preact';

import actions from '../actions';

const DepartmentForm = ((props) => {

  const submitHandler = ((e) => {
    e.preventDefault();
    const { name, domain, location, phone, email } = {... props};
    props.submitHandler({ name, domain, location, phone, email });
  })

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField name='name' value={props.name} changeHandler={props.setName} label='Nazwa wydziału / jednostki organizacyjnej' />
        <TextField name='domain' value={props.domain} changeHandler={props.setDomain} label='Zakres działalności' />
        <TextField name='location' value={props.location} changeHandler={props.setLocation} label='Lokalizacja' />
        <TextField name='phone' value={props.phone} changeHandler={props.setPhone} label='Numer telefonu' />
        <TextField name='email' value={props.email} changeHandler={props.setEmail} label='Adres email' />
        <SubmitButton />
      </fieldset>
    </form>
  )
}); 

const StaffMemberForm = (({ data, setData }) => {
  const [person_name, setPersonName] = useState(data.person_name || '');
  const [role_name, setRoleName] = useState(data.role_name || '');
  const [role_type, setRoleType] = useState(data.role_type || '');
  const [photo_url, setPhotoUrl] = useState(data.photo_url || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [email, setEmail] = useState(data.email || '');

  const origData = { ...data };

  const roleTypeChoices = [
    {
      name: 'Pracownik',
      value: 'staff'
    },
    {
      name: 'Kierownik',
      value: 'manager'
    }
  ]

  const submitHandler = ((e) => {
    e.preventDefault();
    setData(origData, { person_name, role_name, role_type, photo_url, phone, email });
  });

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField name='person_name' value={person_name} changeHandler={setPersonName} label='Imię i nazwisko osoby' required={true} />
        <TextField name='role_name' value={role_name} changeHandler={setRoleName} label='Stanowisko' required={true} />
        <ChoiceSingle name='role_type' value={role_type} choices={roleTypeChoices} changeHandler={setRoleType} label='Rodzaj stanowiska' required={true} />
        <TextField name='photo_url' value={photo_url} changeHandler={setPhotoUrl} label='Adres URL zdjęcia' />
        <TextField name='phone' value={phone} changeHandler={setPhone} label='Numer telefonu' />
        <TextField name='email' value={email} changeHandler={setEmail} label='Adres email' />
        <SubmitButton />
      </fieldset>
    </form>
  )
});

const DepartmentBox = (({ data, setData }) => {
  const [name, setName] = useState(data.name || '');
  const [domain, setDomain] = useState(data.domain || '');
  const [location, setLocation] = useState(data.location || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [email, setEmail] = useState(data.email || '');
  const [staff, setStaff] = useState(data.staff || []);

  const staffMemberDataChanged = ((oldData, newData) => {
    const itemIndex = staff.findIndex((x) => x.person_name == oldData.person_name);
    const newStaff = staff.map((item, i) => {
      if (i === itemIndex) {
        return newData;
      }
      return item;
    })
    setStaff(newStaff);
    setData({ name, domain, location, phone, email, staff });
  });

  return (
    <div>
      {name && <h3>Dane wydziału {name}</h3>}
      <DepartmentForm
        name={name} setName={setName}
        domain={domain} setDomain={setDomain}
        location={location} setLocation={setLocation}
        phone={phone} setPhone={setPhone}
        email={email} setEmail={setEmail}
        submitHandler={setData}
      />
      <h4>Dane pracowników</h4>
      {staff.map((staffMember) => {
        return (
          <div class='item-box'>
            <StaffMemberForm data={staffMember} setData={staffMemberDataChanged} />
          </div>
        )
      })}
    </div>
  )
})

const DepartmentRow = (({ row, dataChanged }) => {
  return (
    <div class='columns'>
    {row.map((item) => (
      <div class='column' key={item.name}>
        <DepartmentBox data={item} setData={dataChanged} />
      </div>
    ))}
    </div>
  )
});

const allDataMapToProps = (
  ({ departmentData }) => ({ departmentData })
);

const DepartmentGridBase = (({ departmentData, setDepartmentData }) => {
  const rowSize = 2;

  const deptArray = departmentData || [];
  let rows = [];
  if (deptArray.length) {
    if (deptArray.length > rowSize) {
      rows = chunkArray(deptArray, rowSize);
    } else {
      rows = [deptArray];
    }
  }

  const departmentDataChanged = ((oldItem, newItem) => {
    const itemIndex = departmentData.findIndex((x) => x.name == oldItem.name);
    const newData = departmentData.map((item, j) => {
      if (j === itemIndex) {
        return newItem;
      }
      return item;
    });
    setDepartmentData(newData);
  });

  return (
    <div class='container'>
    {rows.map((row) => (
      <DepartmentRow row={row} dataChanged={departmentDataChanged} />
    ))}
    </div>
  )
});

const DepartmentGrid = connect(allDataMapToProps, actions)(DepartmentGridBase);

export { DepartmentGrid }
