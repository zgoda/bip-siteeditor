import { useEffect, useState } from 'preact/hooks';

import { ChoiceSingle, SubmitButton, TextField } from './forms';
import { SectionTitle } from './misc';

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

const StaffMemberItem = (({ person }) => {

  const roleLine = (() => {
    const rolesMap = {
      manager: 'kierownik',
      staff: 'pracownik',
    };
    const elems = [
      rolesMap[person.role_type] || 'pracownik',
      person.role_name,
    ];
    return elems.join(` ${String.fromCharCode(183)} `);
  });

  const contactLine = (() => {
    const elems = [];
    if (person.phone) {
      elems.push(person.phone);
    }
    if (person.email) {
      elems.push(person.email);
    }
    return elems.join(` ${String.fromCharCode(183)} `);
  });

  const personPhoto = (
    <div class="tile-icon">
      <figure class="avatar avatar-xl">
        <img src={person.photo_url} alt={person.name} />
      </figure>
    </div>
  )

  return (
    <div class="tile">
      {person.photo_url ? personPhoto : null}
      <div class="tile-content">
        <p class="tile-title text-large text-bold">{person.person_name}</p>
        <p class="tile-subtitle">{roleLine()}</p>
        <small class="tile-subtitle text-gray">{contactLine()}</small>
      </div>
      <div class="tile-action">
        <button class="btn btn-primary btn-sm">zmień dane</button>
      </div>
    </div>
  )
});

const StaffSection = (({ departmentName, staff }) => {
  return (
    <>
      <SectionTitle title={`${departmentName} - pracownicy`} level={3} />
      {staff.map((item) => {
        return (
          <StaffMemberItem key={`${departmentName}-staff-${item.person_name}`} person={item} />
        )
      })}
    </>
  )
});

export { StaffMemberForm, StaffSection };
