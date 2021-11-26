import { useStore } from '@nanostores/preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { uid } from 'uid';

import {
  addressDataActions,
  contactDataActions,
  departmentdataActions,
  genericDataActions,
} from '../state/actions';
import { addressDataStore, genericDataStore } from '../state/store';

/**
 * @typedef {object} LabelProps
 * @property {string} forElement
 * @property {string} labelText
 * @property {boolean} [isRequired=false]
 *
 * @param {LabelProps} props
 * @returns {JSX.Element}
 */
function Label({ forElement, labelText, isRequired = false }) {
  return (
    <label class="form-label" for={forElement}>
      {labelText} {isRequired && <span class="label-required-marker">*</span>}
    </label>
  );
}

/**
 * @typedef {object} TextInputProps
 * @property {string} id
 * @property {string} name
 * @property {string} value
 * @property {(value: string) => void} changeHandler
 * @property {boolean} required
 *
 * @param {TextInputProps} props
 * @returns {JSX.Element}
 */
function TextInput({ id, name, value, changeHandler, required }) {
  return (
    <input
      id={id}
      class="form-input"
      type="text"
      name={name}
      value={value}
      // @ts-ignore
      onInput={(e) => changeHandler(e.target.value)}
      required={required}
    />
  );
}

/**
 * @typedef {object} TextFieldProps
 * @property {string} name
 * @property {string} value
 * @property {(value: string) => void} changeHandler
 * @property {boolean} [required=false]
 * @property {string} label
 * @property {string} formName
 *
 * @param {TextFieldProps} props
 * @returns {JSX.Element}
 */
function TextField({ name, value, changeHandler, required = false, label, formName }) {
  const inputId = `input-${formName}-${name}`;
  return (
    <div class="form-group">
      <Label forElement={inputId} labelText={label} isRequired={required} />
      <TextInput
        id={inputId}
        name={name}
        value={value}
        changeHandler={changeHandler}
        required={required}
      />
    </div>
  );
}

/**
 * @typedef {object} ChoiceSingleProps
 * @property {string} name
 * @property {string} value
 * @property {Array<Record<string, string>>} choices
 * @property {(value: string) => void} changeHandler
 * @property {boolean} [required=false]
 * @property {string} label
 * @property {string} formName
 *
 * @param {ChoiceSingleProps} props
 * @returns {JSX.Element}
 */

function ChoiceSingle({
  name,
  value,
  choices,
  changeHandler,
  required = false,
  label,
  formName,
}) {
  const inputId = `input-${formName}-${name}`;
  return (
    <div class="form-group">
      <Label forElement={inputId} labelText={label} isRequired={required} />
      <select
        class="form-select"
        value={value}
        // @ts-ignore
        onChange={(e) => changeHandler(e.target.value)}
        required={required}
        name={name}
        id={inputId}
      >
        {choices.map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

/**
 * @typedef {object} SubmitButtonProps
 * @property {string} [text='zapisz']
 *
 * @param {SubmitButtonProps} props
 * @returns {JSX.Element}
 */
function SubmitButton({ text = 'zapisz' }) {
  return (
    <button class="btn btn-primary" type="submit">
      {text}
    </button>
  );
}

function FileInput() {
  const fileInput = useRef(null);

  const parseSiteDataParts = (/** @type {string} */ content) => {
    const jsonData = JSON.parse(content);
    // parse generic data
    genericDataActions.set({
      name: jsonData.name,
      bipUrl: jsonData.bip_url,
      nip: jsonData.nip,
      regon: jsonData.regon,
      shortName: jsonData.short_name,
      krs: jsonData.krs,
    });
    // parse address data
    addressDataActions.set({
      street: jsonData.address.street,
      zipCode: jsonData.address.zip_code,
      town: jsonData.address.town,
    });
    const contactData = jsonData.contacts.map((/** @type {Array<any>} */ item) => {
      return { ...item, id: uid(16) };
    });
    contactDataActions.set(contactData);
    const deptData = jsonData.departments.map((/** @type {Array<any>} */ item) => {
      // @ts-ignore
      const staff = item.staff.map((person) => {
        return { ...person, id: uid(16) };
      });
      return { ...deptData, staff, id: uid(16) };
    });
    departmentdataActions.set(deptData);
  };

  const fileSelectorClick = () => {
    fileInput.current && fileInput.current.click();
  };

  const onFileAdded = (
    /** @type {import("preact").JSX.TargetedEvent<HTMLInputElement, Event>} */ e,
  ) => {
    e.preventDefault();
    // @ts-ignore
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      parseSiteDataParts(e.target.result.toString());
    };
    reader.readAsText(file);
  };

  return (
    <div class="form-group">
      <p>
        Wybierz plik z danymi twojej instancji BIP (<code>site.json</code>) by załadować
        dane do edycji.
      </p>
      <fieldset>
        <input
          class="form-input"
          type="file"
          ref={fileInput}
          accept="application/json"
          style="display:none"
          onInput={(e) => onFileAdded(e)}
        />
        <button class="btn btn-primary" id="fileSelect" onClick={fileSelectorClick}>
          wybierz plik
        </button>
      </fieldset>
    </div>
  );
}

function GenericDataForm() {
  const [name, setName] = useState('');
  const [bip_url, setBipUrl] = useState('');
  const [nip, setNip] = useState('');
  const [regon, setRegon] = useState('');
  const [short_name, setShortName] = useState('');
  const [krs, setKrs] = useState('');

  const genericData = useStore(genericDataStore);

  useEffect(() => {
    if (genericData) {
      setName(genericData.name || '');
      setBipUrl(genericData.bipUrl || '');
      setNip(genericData.nip || '');
      setRegon(genericData.regon || '');
      setShortName(genericData.shortName || '');
      setKrs(genericData.krs || '');
    }
  }, [genericData]);

  const submitHandler = (/** @type {{ preventDefault: () => void; }} */ e) => {
    e.preventDefault();
    genericDataActions.set({
      name,
      bipUrl: bip_url,
      nip,
      regon,
      shortName: short_name,
      krs,
    });
  };

  const formName = 'generic';

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField
          name="name"
          value={name}
          changeHandler={setName}
          label="Nazwa instytucji"
          required={true}
          formName={formName}
        />
        <TextField
          name="shortName"
          value={short_name}
          changeHandler={setShortName}
          label="Nazwa skrócona"
          formName={formName}
        />
        <TextField
          name="bipUrl"
          value={bip_url}
          changeHandler={setBipUrl}
          label="Adres strony BIP"
          required={true}
          formName={formName}
        />
        <TextField
          name="nip"
          value={nip}
          changeHandler={setNip}
          label="Numer NIP"
          required={true}
          formName={formName}
        />
        <TextField
          name="regon"
          value={regon}
          changeHandler={setRegon}
          label="Numer REGON"
          required={true}
          formName={formName}
        />
        <TextField
          name="krs"
          value={krs}
          changeHandler={setKrs}
          label="Numer wpisu w KRS"
          formName={formName}
        />
        <SubmitButton />
      </fieldset>
    </form>
  );
}

function AddressDataForm() {
  const [street, setStreet] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [town, setTown] = useState('');

  const addressData = useStore(addressDataStore);

  useEffect(() => {
    if (addressData) {
      setStreet(addressData.street || '');
      setZipCode(addressData.zipCode || '');
      setTown(addressData.town || '');
    }
  }, [addressData]);

  const submitHandler = (/** @type {{ preventDefault: () => void; }} */ e) => {
    e.preventDefault();
    addressDataActions.set({ street, zipCode: zip_code, town });
  };

  const formName = 'address';

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField
          name="street"
          value={street}
          changeHandler={setStreet}
          label="Ulica lub miejscowość z numerem budynku"
          required={true}
          formName={formName}
        />
        <TextField
          name="zip_code"
          value={zip_code}
          changeHandler={setZipCode}
          label="Kod pocztowy"
          required={true}
          formName={formName}
        />
        <TextField
          name="town"
          value={town}
          changeHandler={setTown}
          label="Miejscowość / poczta"
          required={true}
          formName={formName}
        />
        <SubmitButton />
      </fieldset>
    </form>
  );
}

export {
  AddressDataForm,
  ChoiceSingle,
  FileInput,
  GenericDataForm,
  SubmitButton,
  TextField,
};
