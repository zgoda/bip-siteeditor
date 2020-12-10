import { useState } from 'preact/hooks';
import { TextField, SubmitButton } from './forms';
import { chunkArray } from './utils';

const ContactForm = (({ data, setData }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const origData = { ...data };

  setName(data.name);
  setPhone(data.phone);
  setEmail(data.email);

  const submitHandler = ((e) => {
    e.preventDefault();
    setData(origData, { name, phone, email });
  });

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField
          name='name'
          value={name}
          changeHandler={(e) => setName(e.target.value)}
          label='Nazwa kontaktu (można pozostawić pustą jeżeli ma być tylko jeden)'
        />
        <TextField
          name='phone'
          value={phone}
          changeHandler={(e) => setPhone(e.target.value)}
          label='Numer telefonu'
          required={true}
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
    <div class='row'>
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

  const contactDataAdded = ((_oldItem, newItem) => {
    let newData = Array.from(data);
    newData.push(newItem);
    setData(newData);
  });

  return (
    <div class='container'>
    {rows.map((row) => (
      <ContactFormRow row={row} />
    ))}
      <ContactForm data={emptyData} setData={contactDataAdded} />
    </div>
  )
});

export { ContactGrid };
