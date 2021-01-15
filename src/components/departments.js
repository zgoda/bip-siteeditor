import { useEffect, useState } from 'preact/hooks';
import { connect } from 'redux-zero/preact';

import actions from '../actions';
import { ChoiceSingle, SubmitButton, TextField } from './forms';
import { SectionTitle } from './misc';

const DepartmentForm = (({ data, setData }) => {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setDomain(data.domain || '');
      setLocation(data.location || '');
      setPhone(data.phone || '');
      setEmail(data.email || '');
    }
  }, [data]);

  const origData = { ...data };

  const submitHandler = ((e) => {
    e.preventDefault();
    setData(origData, { name, domain, location, phone, email });
  })

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField name='name' value={name} changeHandler={setName} label='Nazwa wydziału / jednostki organizacyjnej' required={true} />
        <TextField name='domain' value={domain} changeHandler={setDomain} label='Zakres działalności' />
        <TextField name='location' value={location} changeHandler={setLocation} label='Lokalizacja' />
        <TextField name='phone' value={phone} changeHandler={setPhone} label='Numer telefonu' />
        <TextField name='email' value={email} changeHandler={setEmail} label='Adres email' />
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

  useEffect(() => {
    if (data) {
      setPersonName(data.person_name || '');
      setRoleName(data.role_name || '');
      setRoleType(data.role_type || '');
      setPhotoUrl(data.photo_url || '');
      setPhone(data.phone || '');
      setEmail(data.email || '');
    }
  }, [data]);

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

const DepartmentItem = (({ departmentData }) => {

  const showLocationLine = departmentData.location || departmentData.domain;
  const locationLine = (() => {
    let elems = [];
    if (departmentData.location) {
      elems.push(departmentData.location);
    }
    if (departmentData.domain) {
      elems.push(departmentData.domain);
    }
    return elems.join(' &middot; ');
  });

  const showContactLine = departmentData.phone || departmentData.email;
  const contactLine = (() => {
    let elems = [];
    if (departmentData.phone) {
      elems.push(departmentData.phone);
    }
    if (departmentData.email) {
      elems.push(departmentData.email);
    }
    return elems.join(' &middot; ');
  });

  return (
    <div class="tile">
      <div class="tile-content">
        <p class="tile-title text-large text-bold">{departmentData.name}</p>
        {showLocationLine && <p class="tile-subtitle">{locationLine()}</p>}
        {showContactLine && <small class="tile-subtitle text-gray">{contactLine()}</small>}
        <p><button class="btn btn-primary btn-sm">zmień dane</button></p>
      </div>
      <div class="tile-action">
        <button class="btn btn-link">pracownicy</button>
      </div>
    </div>
  )
});

const allDataMapToProps = (
  ({ departmentData }) => ({ departmentData })
);

const DepartmentGridBase = (({ departmentData, setDepartmentData }) => {
  const [deptFormVisible, setDeptFormVisible] = useState(false);
  const [staffFormVisible, setStaffFormVisible] = useState(false);

  const emptyDeptData = {
    name: '',
    domain: '',
    location: '',
    phone: '',
    email: '',
  }

  const emptyStaffData = {
    person_name: '',
    role_name: '',
    role_type: 'staff',
    photo_url: '',
    phone: '',
    email: '',
  }

  const deptArray = departmentData || [];

  return (
    <div class='container'>
      <div class="columns">
        <div class="column col-xs-6">
          <SectionTitle title='Dane wydziałów' level={3} />
          {deptArray.map((item) => {
            return (
              <DepartmentItem key={`department-item-${item.name}`} departmentData={item} />
            )
          })}
          {deptFormVisible && <DepartmentForm data={emptyDeptData} />}
        </div>
        <div class="column col-xs-6">
          <SectionTitle title='Pracownicy' level={3} />
          {staffFormVisible && <StaffMemberForm data={emptyStaffData} />}
        </div>
      </div>
    </div>
  )
});

const DepartmentGrid = connect(allDataMapToProps, actions)(DepartmentGridBase);

export { DepartmentGrid }
