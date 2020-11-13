import { useState } from 'preact/hooks';
import { TextField, SubmitButton, ChoiceSingle } from './forms';
import { chunkArray } from './utils';

const DepartmentForm = ((props) => {

  const submitHandler = ((e) => {
    e.preventDefault();
  })

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField
          name='name'
          value={props.name}
          changeHandler={(e) => props.setName(e.target.value)}
          label='Nazwa wydziału / jednostki organizacyjnej'
        />
        <TextField
          name='domain'
          value={props.domain}
          changeHandler={(e) => props.setDomain(e.target.value)}
          label='Zakres działalności'
        />
        <TextField
          name='location'
          value={props.location}
          changeHandler={(e) => props.setLocation(e.target.value)}
          label='Lokalizacja'
        />
        <TextField
          name='phone'
          value={props.phone}
          changeHandler={(e) => props.setPhone(e.target.value)}
          label='Numer telefonu'
        />
        <TextField
          name='email'
          value={props.email}
          changeHandler={(e) => props.setEmail(e.target.value)}
          label='Adres email'
        />
        <SubmitButton />
      </fieldset>
    </form>
  )
}); 

const StaffMemberForm = (({ data, setData }) => {
  const [person_name, setPersonName] = useState('');
  const [role_name, setRoleName] = useState('');
  const [role_type, setRoleType] = useState('');
  const [photo_url, setPhotoUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const origData = { ...data };

  setPersonName(data.person_name);
  setRoleName(data.role_name);
  setRoleType(data.role_type);
  setPhotoUrl(data.photo_url);
  setPhone(data.phone);
  setEmail(data.email);

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
        <TextField
          name='person_name'
          value={person_name}
          changeHandler={(e) => setPersonName(e.target.value)}
          label='Imię i nazwisko osoby'
          required={true}
        />
        <TextField
          name='role_name'
          value={role_name}
          changeHandler={(e) => setRoleName(e.target.value)}
          label='Stanowisko'
          required={true}
        />
        <ChoiceSingle
          name='role_type'
          value={role_type}
          choices={roleTypeChoices}
          changeHandler={(e) => setRoleType(e.target.value)}
          label='Rodzaj stanowiska'
          required={true}
        />
        <TextField
          name='photo_url'
          value={photo_url}
          changeHandler={(e) => setPhotoUrl(e.target.value)}
          label='Adres URL zdjęcia'
        />
        <TextField
          name='phone'
          value={phone}
          changeHandler={(e) => setPhone(e.target.value)}
          label='Numer telefonu'
        />
        <TextField
          name='email'
          value={email}
          changeHandler={(e) => setEmail(e.target.value)}
          label='Adres email'
        />
        <SubmitButton />
      </fieldset>
    </form>
  )
});

const DepartmentBox = (({ data, setData }) => {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [staff, setStaff] = useState([]);

  setName(data.name);
  setDomain(data.domain);
  setLocation(data.location);
  setPhone(data.phone);
  setEmail(data.email);
  setStaff(data.staff);

  const staffMemberDataChanged = ((oldData, newData) => {
    const itemIndex = staff.findIndex((x) => x.person_name == oldData.person_name);
    const newStaff = staff.map((item, i) => {
      if (i === itemIndex) {
        return newData;
      }
      return item;
    })
    setData(newStaff);
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
    <div class='row'>
    {row.map((item) => (
      <div class='column' key={item.name}>
        <DepartmentBox data={item} setData={dataChanged} />
      </div>
    ))}
    </div>
  )
});

const DepartmentGrid = (({ data, setData }) => {
  const rowSize = 2;

  const deptArray = data || [];
  let rows = [];
  if (deptArray.length) {
    if (deptArray.length > rowSize) {
      rows = chunkArray(deptArray, rowSize);
    } else {
      rows = [deptArray];
    }
  }

  const departmentDataChanged = ((oldItem, newItem) => {
    const itemIndex = data.findIndex((x) => x.name == oldItem.name);
    const newData = data.map((item, j) => {
      if (j === itemIndex) {
        return newItem;
      }
      return item;
    });
    setData(newData);
  });

  return (
    <div class='container'>
    {rows.map((row) => (
      <DepartmentRow row={row} dataChanged={departmentDataChanged} />
    ))}
    </div>
  )
});

export { DepartmentGrid }
