import { useState } from 'preact/hooks';
import { TextField, SubmitButton } from './forms';
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
        <TextField
          name='name'
          value={name}
          changeHandler={setName}
          label='Nazwa kontaktu'
          required={true}
        />
        <TextField
          name='phone'
          value={phone}
          changeHandler={setPhone}
          label='Numer telefonu'
          required={true}
        />
        <TextField
          name='email'
          value={email}
          changeHandler={setEmail}
          label='Adres email'
        />
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

const ContactGrid = (({ data, setData }) => {
  const rowSize = 4;
  const emptyData = {
    name: '',
    phone: '',
    email: '',
  }

  const contactArray = data || [];
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
    const itemIndex = data.findIndex((x) => x.name == oldItem.name);
    const newData = data.map((item, j) => {
      if (j === itemIndex) {
        return newItem;
      }
      return item;
    });
    setData(newData);
  });
  */

  const contactDataAdded = ((_oldItem, newItem) => {
    let newData = Array.from(data);
    newData.push(newItem);
    setData(newData);
  });

  return (
    <div class='container'>
    {rows.map((row, index) => (
      <ContactFormRow row={row} key={`contact-row-${index}`} />
    ))}
      <ContactForm data={emptyData} setData={contactDataAdded} />
    </div>
  )
});

export { ContactGrid };
