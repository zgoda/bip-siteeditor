import { useStore } from '@nanostores/preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { departmentDataActions } from '../state/actions';
import { departmentDataStore } from '../state/store';

import { SubmitButton, TextField } from './forms';
import { EmptyTileItem, SectionTitle } from './misc';
import { StaffMemberForm, StaffSection } from './staff';

function DepartmentForm({ data, setData }) {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const formName = 'DepartmentForm';

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

  const submitHandler = (e) => {
    e.preventDefault();
    setData(origData, { name, domain, location, phone, email });
  };

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField
          name="name"
          value={name}
          changeHandler={setName}
          label="Nazwa wydziału / jednostki organizacyjnej"
          required={true}
          formName={formName}
        />
        <TextField
          name="domain"
          value={domain}
          changeHandler={setDomain}
          label="Zakres działalności"
          formName={formName}
        />
        <TextField
          name="location"
          value={location}
          changeHandler={setLocation}
          label="Lokalizacja"
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

function DepartmentItem({ departmentData, setData, departmentStaffDisplay }) {
  const [formVisible, setFormVisible] = useState(false);

  const staffButtonRef = useRef(null);

  const midDot = String.fromCharCode(183);

  const showLocationLine = departmentData.location || departmentData.domain;
  const locationLine = () => {
    let elems = [];
    if (departmentData.location) {
      elems.push(departmentData.location);
    }
    if (departmentData.domain) {
      elems.push(departmentData.domain);
    }
    return elems.join(` ${midDot} `);
  };

  const showContactLine = departmentData.phone || departmentData.email;
  const contactLine = () => {
    let elems = [];
    if (departmentData.phone) {
      elems.push(departmentData.phone);
    }
    if (departmentData.email) {
      elems.push(departmentData.email);
    }
    return elems.join(` ${midDot} `);
  };

  const displayStaffButtonClick = (e) => {
    e.preventDefault();
    staffButtonRef && staffButtonRef.current.blur();
    departmentStaffDisplay(departmentData.name);
  };

  const editButtonClick = (e) => {
    e.preventDefault();
    setFormVisible(!formVisible);
  };

  return (
    <>
      <div class="tile">
        <div class="tile-content">
          <p class="tile-title text-large text-bold">{departmentData.name}</p>
          {showLocationLine && <p class="tile-subtitle">{locationLine()}</p>}
          {showContactLine && (
            <small class="tile-subtitle text-gray">{contactLine()}</small>
          )}
          <p>
            <button class="btn btn-primary btn-sm" onClick={editButtonClick}>
              zmień dane
            </button>
          </p>
        </div>
        <div class="tile-action">
          <button
            class="btn btn-link"
            onClick={displayStaffButtonClick}
            ref={staffButtonRef}
          >
            pracownicy
          </button>
        </div>
      </div>
      {formVisible && <DepartmentForm data={departmentData} setData={setData} />}
    </>
  );
}

function DepartmentSection({
  departmentData,
  setDepartmentData,
  departmentStaffDisplay,
}) {
  const [deptFormVisible, setDeptFormVisible] = useState(false);
  const addDepartmentButtonRef = useRef(null);

  const emptyDeptData = {
    name: '',
    domain: '',
    location: '',
    phone: '',
    email: '',
  };

  const addDepartmentClick = (e) => {
    e.preventDefault();
    addDepartmentButtonRef.current && addDepartmentButtonRef.current.blur();
    setDeptFormVisible(!deptFormVisible);
  };

  return (
    <>
      <SectionTitle title="Dane wydziałów" level={3} />
      {departmentData.map((item) => {
        return (
          <DepartmentItem
            key={`department-item-${item.name}`}
            departmentData={item}
            departmentStaffDisplay={departmentStaffDisplay}
            setData={setDepartmentData}
          />
        );
      })}
      <EmptyTileItem
        clickHandler={addDepartmentClick}
        itemRef={addDepartmentButtonRef}
      />
      {deptFormVisible && (
        <DepartmentForm data={emptyDeptData} setData={setDepartmentData} />
      )}
    </>
  );
}

function DepartmentGrid() {
  const [staffFormVisible, setStaffFormVisible] = useState(false);
  const [staffAddButtonVisible, setStaffAddButtonVisible] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState('');

  const addStaffMemberButtonRef = useRef(null);

  const emptyStaffData = {
    person_name: '',
    role_name: '',
    role_type: 'staff',
    photo_url: '',
    phone: '',
    email: '',
  };

  const addStaffMemberClick = (e) => {
    e.preventDefault();
    addStaffMemberButtonRef.current && addStaffMemberButtonRef.current.blur();
    setStaffFormVisible(!staffFormVisible);
  };

  const displayDepartmentStaff = (department) => {
    setCurrentDepartment(department);
  };

  const deptArray = useStore(departmentDataStore);

  const staffMap = {};
  deptArray.forEach((element) => {
    staffMap[element.name] = element.staff;
  });

  setStaffAddButtonVisible(deptArray.length > 0);
  if (deptArray.length > 0 && !currentDepartment) {
    setCurrentDepartment(deptArray[0].name);
  }

  return (
    <div class="container">
      <div class="columns">
        <div class="column col-xs-3">
          <DepartmentSection
            departmentData={deptArray}
            setDepartmentData={departmentDataActions.set}
            departmentStaffDisplay={displayDepartmentStaff}
          />
        </div>
        <div class="divider-vert" />
        <div class="column col-xs-9">
          {currentDepartment && (
            <StaffSection
              departmentName={currentDepartment}
              staff={staffMap[currentDepartment] || []}
            />
          )}
          {staffAddButtonVisible && (
            <EmptyTileItem
              clickHandler={addStaffMemberClick}
              itemRef={addStaffMemberButtonRef}
            />
          )}
          {staffFormVisible && <StaffMemberForm data={emptyStaffData} />}
        </div>
      </div>
    </div>
  );
}

export { DepartmentGrid };
