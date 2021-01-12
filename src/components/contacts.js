import { useState } from 'preact/hooks';
import { connect } from 'redux-zero/preact';

import actions from '../actions';
import { SubmitButton,TextField } from './forms';
import { chunkArray } from './utils';

const ContactForm = (({ data, setData }) => {
  const [name, setName] = useState(data.name || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [email, setEmail] = useState(data.email || '');

  const origData = { ...data };

  const submitHandler = ((e) => {
    e.preventDefault();
    setData(origData, { name, phone, email });
    setName('');
    setPhone('');
    setEmail('');
  });

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField name='name' value={name} changeHandler={setName} label='Nazwa kontaktu' required={true} />
        <TextField name='phone' value={phone} changeHandler={setPhone} label='Numer telefonu' required={true} />
        <TextField name='email' value={email} changeHandler={setEmail} label='Adres email' />
        <SubmitButton />
      </fieldset>
    </form>
  )
});

const ContactItem = (({ data }) => {
  return (
    <div class="card">
      <div class="card-header">
        <p class="card-title h5">{data.name}</p>
      </div>
      <div class="card-body">
        <p><strong>Numer telefonu:</strong> {data.phone}</p>
        <p><strong>Adres email:</strong> {data.email}</p>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary">zmień dane</button>
      </div>
    </div>
  )
});

const ContactFormRow = (({ row }) => {
  return (
    <div class='columns mb-2r'>
    {row.map((item) => (
      <div class='column' key={item.name}>
        <ContactItem data={item} />
      </div>
    ))}
    </div>
  )
});

const allDataMapToProps = (
  ({ contactData }) => ({ contactData })
);

const ContactGridBase = (({ contactData, setContactData }) => {
  const rowSize = 4;
  const emptyData = {
    name: '',
    phone: '',
    email: '',
  }

  const contactArray = contactData || [];
  let rows = [];
  if (contactArray.length) {
    if (contactArray.length > rowSize) {
      rows = chunkArray(contactArray, rowSize);
    } else {
      rows = [contactArray];
    }
  }

  /*
  const contactDataChanged = ((oldItem, newItem) => {
    const itemIndex = contactArray.findIndex((x) => x.name === oldItem.name);
    const newData = contactArray.map((item, j) => {
      if (j === itemIndex) {
        return newItem;
      }
      return item;
    });
    setContactData(newData);
  });
  */

  const contactDataAdded = ((_oldItem, newItem) => {
    let newData = Array.from(contactData);
    newData.push(newItem);
    setContactData(newData);
  });

  return (
    <div class='container'>
    {rows.map((row, index) => (
      <ContactFormRow row={row} key={`contact-row-${index}`} />
    ))}
      <h3>Dodaj nowy kontakt</h3>
      <ContactForm data={emptyData} setData={contactDataAdded} />
    </div>
  )
});

const ContactGrid = connect(allDataMapToProps, actions)(ContactGridBase);

export { ContactGrid };
