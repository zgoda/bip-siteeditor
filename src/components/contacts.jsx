import { useStore } from '@nanostores/preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { uid } from 'uid';
import { contactDataActions } from '../state/actions';
import { contactDataStore } from '../state/store';

import { SubmitButton, TextField } from './forms';
import { EmptyCardItem, SectionTitle, Toast } from './misc';
import { chunkArray, genToastId } from './utils';

/**
 * @typedef {(arg0: boolean, arg1: import('../..').ContactData) => void} DataEditSwitchFunc
 *
 * @typedef {object} ContactFormProps
 * @property {import('../..').ContactData} data
 * @property {(arg0: import('../..').ContactData) => void} setData
 * @property {DataEditSwitchFunc} switchEditMode
 *
 * @param {ContactFormProps} props
 * @returns
 */
function ContactForm({ data, setData, switchEditMode }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const formName = 'ContactForm';

  useEffect(() => {
    if (data) {
      setId(data.id || uid(16));
      setName(data.name || '');
      setPhone(data.phone || '');
      setEmail(data.email || '');
    }
  }, [data]);

  const submitHandler = (/** @type {{ preventDefault: () => void; }} */ e) => {
    e.preventDefault();
    setData({ id, name, phone, email });
    switchEditMode(false, null);
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
          formName={formName}
        />
        <TextField
          name="phone"
          value={phone}
          changeHandler={setPhone}
          label="Numer telefonu"
          required={true}
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
 * @typedef {object} ContactItemProps
 * @property {import('../..').ContactData} data
 * @property {DataEditSwitchFunc} dataEditSwitch
 *
 * @param {ContactItemProps} props
 * @returns {JSX.Element}
 */
function ContactItem({ data, dataEditSwitch }) {
  const buttonClickHandler = (/** @type {{ preventDefault: () => void; }} */ e) => {
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

/**
 * @typedef {object} ContactFormRowProps
 * @property {Array<import('../..').ContactData>} row
 * @property {boolean} withAddButton
 * @property {DataEditSwitchFunc} dataEditSwitch
 *
 * @param {ContactFormRowProps} props
 * @returns {JSX.Element}
 */
function ContactFormRow({ row, withAddButton, dataEditSwitch }) {
  const addContactButtonRef = useRef(null);

  const emptyItemClickHandler = (/** @type {{ preventDefault: () => void; }} */ e) => {
    e.preventDefault();
    addContactButtonRef.current && addContactButtonRef.current.blur();
    dataEditSwitch(true, null);
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

function ContactGrid() {
  const rowSize = 4;
  const emptyData = {
    id: uid(16),
    name: '',
    phone: '',
    email: '',
  };

  const [formVisible, setFormVisible] = useState(false);
  const [addingNew, setAddingNew] = useState(true);
  const [formData, setFormData] = useState(emptyData);
  const [toastVisible, setToastVisible] = useState(false);
  /** @type {[Array<import('../..').Notification>, import('preact/hooks').StateUpdater<Array<import('../..').Notification>>]} */
  const [toastList, setToastList] = useState([]);

  const contactArray = useStore(contactDataStore);

  /** @type {Array<Array<import('../..').ContactData>>} */
  let rows = [];
  if (contactArray.length) {
    if (contactArray.length > rowSize) {
      rows = chunkArray(contactArray, rowSize);
    } else {
      rows = [contactArray];
    }
  }

  const addButtonSeparate = contactArray.length % rowSize === 0;

  const contactDataChanged = (/** @type {import('../..').ContactData} */ newItem) => {
    contactDataActions.update(newItem);
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

  const contactDataAdded = (/** @type {import('../..').ContactData} */ newItem) => {
    contactDataActions.add(newItem);
    const toast = {
      id: genToastId(),
      icon: 'success',
      title: 'Dane kontaktu zapisane',
      message: 'Dane nowego kontaktu zostały zapisane',
    };
    setToastList([...toastList, toast]);
    setToastVisible(true);
  };

  const formSectionTitle = addingNew ? 'Dodaj nowy kontakt' : 'Edytuj dane kontaktu';

  const changedDataHandler = (/** @type {import('../..').ContactData} */ newItem) => {
    const func = addingNew ? contactDataAdded : contactDataChanged;
    func(newItem);
  };

  /** @type {DataEditSwitchFunc} */
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

export { ContactGrid };
