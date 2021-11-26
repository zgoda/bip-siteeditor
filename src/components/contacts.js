import { useEffect, useRef, useState } from 'preact/hooks';
import { connect } from 'redux-zero/preact';

import actions from '../actions';
import { SubmitButton, TextField } from './forms';
import { EmptyCardItem, SectionTitle, Toast } from './misc';
import { chunkArray, genToastId } from './utils';

function ContactForm({ data, setData, switchEditMode }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setPhone(data.phone || '');
      setEmail(data.email || '');
    }
  }, [data]);

  const origData = { ...data };

  const submitHandler = (e) => {
    e.preventDefault();
    setData(origData, { name, phone, email });
    switchEditMode(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField
          name="name"
          value={name}
          changeHandler={setName}
          label="Nazwa kontaktu"
          required={true}
        />
        <TextField
          name="phone"
          value={phone}
          changeHandler={setPhone}
          label="Numer telefonu"
          required={true}
        />
        <TextField
          name="email"
          value={email}
          changeHandler={setEmail}
          label="Adres email"
        />
        <SubmitButton />
      </fieldset>
    </form>
  );
}

function ContactItem({ data, dataEditSwitch }) {
  const buttonClickHandler = (e) => {
    e.preventDefault();
    dataEditSwitch(false, data);
  };

  return (
    <div class="card">
      <div class="card-header">
        <p class="card-title h5">{data.name}</p>
      </div>
      <div class="card-body">
        <dl>
          <dt>Numer telefonu</dt>
          <dd>{data.phone}</dd>
          <dt>Adres email</dt>
          <dd>{data.email}</dd>
        </dl>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" onClick={buttonClickHandler}>
          zmień dane
        </button>
      </div>
    </div>
  );
}

function ContactFormRow({ row, withAddButton, dataEditSwitch }) {
  const addContactButtonRef = useRef(null);

  const emptyItemClickHandler = (e) => {
    e.preventDefault();
    addContactButtonRef.current && addContactButtonRef.current.blur();
    dataEditSwitch(true);
  };

  const contactAddItem = (
    <div class="column col-3 col-sm-6 col-xs-12" key="contact-add-button">
      <EmptyCardItem
        clickHandler={emptyItemClickHandler}
        itemRef={addContactButtonRef}
      />
    </div>
  );

  return (
    <div class="columns mb-2r">
      {row.map((item) => (
        <div class="column col-3 col-sm-6 col-xs-12" key={`contact-item-${item.name}`}>
          <ContactItem data={item} dataEditSwitch={dataEditSwitch} />
        </div>
      ))}
      {withAddButton ? contactAddItem : null}
    </div>
  );
}

const allDataMapToProps = ({ contactData }) => ({ contactData });

function ContactGridBase({ contactData, setContactData }) {
  const rowSize = 4;
  const emptyData = {
    name: '',
    phone: '',
    email: '',
  };

  const [formVisible, setFormVisible] = useState(false);
  const [addingNew, setAddingNew] = useState(true);
  const [formData, setFormData] = useState(emptyData);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastList, setToastList] = useState([]);

  const contactArray = contactData || [];
  let rows = [];
  if (contactArray.length) {
    if (contactArray.length > rowSize) {
      rows = chunkArray(contactArray, rowSize);
    } else {
      rows = [contactArray];
    }
  }

  const addButtonSeparate = contactArray.length % rowSize === 0;

  const contactDataChanged = (oldItem, newItem) => {
    const itemIndex = contactArray.findIndex((x) => x.name === oldItem.name);
    const newData = contactArray.map((item, j) => {
      if (j === itemIndex) {
        return newItem;
      }
      return item;
    });
    setContactData(newData);
    const newList = Array.from(toastList);
    newList.push({
      id: genToastId(),
      icon: 'success',
      title: 'Dane kontaktu zapisane',
      message: 'Zmienione dane kontaktu zostały zapisane',
    });
    setToastList(newList);
    setToastVisible(true);
  };

  const contactDataAdded = (_oldItem, newItem) => {
    let newData = Array.from(contactData);
    newData.push(newItem);
    setContactData(newData);
    const newList = Array.from(toastList);
    newList.push({
      id: genToastId(),
      icon: 'success',
      title: 'Dane kontaktu zapisane',
      message: 'Dane nowego kontaktu zostały zapisane',
    });
    setToastList(newList);
    setToastVisible(true);
  };

  const formSectionTitle = addingNew ? 'Dodaj nowy kontakt' : 'Edytuj dane kontaktu';

  const changedDataHandler = (oldItem, newItem) => {
    const func = addingNew ? contactDataAdded : contactDataChanged;
    func(oldItem, newItem);
  };

  const switchEditMode = (val, data) => {
    setAddingNew(val);
    setFormData(val ? emptyData : data);
    setFormVisible(!formVisible);
  };

  const formSection = (
    <>
      <SectionTitle title={formSectionTitle} level={3} />
      <ContactForm
        data={formData}
        setData={changedDataHandler}
        switchEditMode={switchEditMode}
      />
    </>
  );

  return (
    <div class="container">
      {rows.map((row, index, arr) => {
        const isLastRow = arr.length === index + 1;
        const withAddButton = isLastRow && row.length < 4;
        return (
          <ContactFormRow
            row={row}
            key={`contact-row-${index}`}
            withAddButton={withAddButton}
            dataEditSwitch={switchEditMode}
          />
        );
      })}
      {addButtonSeparate && (
        <ContactFormRow
          row={[]}
          key={`contact-row-${rows.length}`}
          withAddButton={true}
          dataEditSwitch={switchEditMode}
        />
      )}
      {formVisible ? formSection : null}
      {toastVisible && <Toast toastList={toastList} />}
    </div>
  );
}

const ContactGrid = connect(allDataMapToProps, actions)(ContactGridBase);

export { ContactGrid };
