import { useEffect, useState } from 'preact/hooks';
import { uid } from 'uid';

import { ChoiceSingle, SubmitButton, TextField } from './forms';
import { SectionTitle } from './misc';
import { MIDDOT } from '../const';

/**
 * @typedef {object} StaffMemberFormProps
 * @property {import('../..').StaffMember} data
 * @property {(staffMember: import('../..').StaffMember) => void} setData
 *
 * @param {StaffMemberFormProps} props
 * @returns {JSX.Element}
 */
function StaffMemberForm({ data, setData }) {
  const [id, setId] = useState('');
  const [personName, setPersonName] = useState('');
  const [role, setRoleName] = useState('');
  const [roleType, setRoleType] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const formName = 'StaffMemberForm';

  useEffect(() => {
    if (data) {
      setId(data.id || uid(16));
      setPersonName(data.name || '');
      setRoleName(data.role || '');
      setRoleType(data.roleType || '');
      setPhotoUrl(data.photoUrl || '');
      setPhone(data.phone || '');
      setEmail(data.email || '');
    }
  }, [data]);

  const roleTypeChoices = [
    {
      name: 'Pracownik',
      value: 'staff',
    },
    {
      name: 'Kierownik',
      value: 'manager',
    },
  ];

  const submitHandler = (
    /** @type {import('preact/src/jsx').JSXInternal.TargetedEvent<HTMLFormElement, Event>} */ e,
  ) => {
    e.preventDefault();
    setData({
      id,
      name: personName,
      role,
      roleType,
      photoUrl,
      phone,
      email,
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField
          name="person_name"
          value={personName}
          changeHandler={setPersonName}
          label="Imię i nazwisko osoby"
          required={true}
          formName={formName}
        />
        <TextField
          name="role_name"
          value={role}
          changeHandler={setRoleName}
          label="Stanowisko"
          required={true}
          formName={formName}
        />
        <ChoiceSingle
          name="role_type"
          value={roleType}
          choices={roleTypeChoices}
          changeHandler={setRoleType}
          label="Rodzaj stanowiska"
          required={true}
          formName={formName}
        />
        <TextField
          name="photo_url"
          value={photoUrl}
          changeHandler={setPhotoUrl}
          label="Adres URL zdjęcia"
          formName={formName}
        />
        <TextField
          name="phone"
          value={phone}
          changeHandler={setPhone}
          label="Numer telefonu"
          formName={formName}
        />
        <TextField
          name="email"
          value={email}
          changeHandler={setEmail}
          label="Adres email"
          formName={formName}
        />
        <SubmitButton />
      </fieldset>
    </form>
  );
}

/**
 * @typedef {object} StaffMemberItemProps
 * @property {import('../..').StaffMember} person
 *
 * @param {StaffMemberItemProps} props
 * @returns {JSX.Element}
 */
function StaffMemberItem({ person }) {
  const roleLine = () => {
    const rolesMap = {
      manager: 'kierownik',
      staff: 'pracownik',
    };
    const elems = [rolesMap[person.roleType] || 'pracownik', person.role];
    const line = elems.join(` ${MIDDOT} `);
    return `Stanowisko: ${line}`;
  };

  const contactLine = () => {
    const elems = [];
    if (person.phone) {
      elems.push(person.phone);
    }
    if (person.email) {
      elems.push(person.email);
    }
    const line = elems.join(` ${MIDDOT} `);
    return `Kontakt: ${line}`;
  };

  const personPhoto = (
    <div class="tile-icon">
      <figure class="avatar avatar-xl">
        <img src={person.photoUrl} alt={person.name} />
      </figure>
    </div>
  );

  return (
    <div class="tile">
      {person.photoUrl ? personPhoto : null}
      <div class="tile-content">
        <p class="tile-title text-large text-bold">{person.name}</p>
        <p class="tile-subtitle">{roleLine()}</p>
        <small class="tile-subtitle text-gray">{contactLine()}</small>
      </div>
      <div class="tile-action">
        <button class="btn btn-primary btn-sm">zmień dane</button>
      </div>
    </div>
  );
}

/**
 * @typedef {object} StaffSectionProps
 * @property {string} departmentName
 * @property {Array<import('../..').StaffMember>} staff
 *
 * @param {StaffSectionProps} props
 * @returns {JSX.Element}
 */
function StaffSection({ departmentName, staff }) {
  return (
    <>
      <SectionTitle title={`${departmentName} - pracownicy`} level={3} />
      {staff.map((item) => {
        return (
          <StaffMemberItem key={`${departmentName}-staff-${item.name}`} person={item} />
        );
      })}
    </>
  );
}

export { StaffMemberForm, StaffSection };
