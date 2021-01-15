import { useEffect, useRef, useState } from 'preact/hooks';
import { connect } from 'redux-zero/preact';

import actions from '../actions';

const Label = (({ forElement, labelText, isRequired = false }) => {
  if (isRequired) {
    return (
      <label class='form-label' for={forElement}>{labelText} <span class='label-required-marker'>*</span></label>
    )
  }
  return (
    <label class='form-label' for={forElement}>{labelText}</label>
  )
});

const TextInput = (({ name, value, changeHandler, required }) => {
  return (
    <input class='form-input' type='text' name={name} value={value} onInput={(e) => changeHandler(e.target.value)} required={required} />
  )
});

const TextField = (({ name, value, changeHandler, required = false, label }) => {
  return (
    <div class='form-group'>
      <Label forElement={name} labelText={label} isRequired={required} />
      <TextInput name={name} value={value} changeHandler={changeHandler} required={required} />
    </div>
  )
});

const ChoiceSingle = (({ name, value, choices, changeHandler, required = false, label }) => {
  return (
    <div class='form-group'>
      <Label forElement={name} labelText={label} isRequired={required} />
      <select class='form-select' value={value} onChange={(e) => changeHandler(e.target.value)} required={required} name={name}>
      {choices.map((item) => {
        return (
          <option value={item.value} key={item.value}>{item.name}</option>
        )
      })}
      </select>
    </div>
  )
});

const SubmitButton = (({ text = 'zapisz' }) => {
  return (
    <button class='btn btn-primary' type='submit'>{text}</button>
  )
});

const allDataMapToProps = (
  ({ genericData, addressData, contactData, departmentData }) => ({ genericData, addressData, contactData, departmentData })
);

const FileInputBase = (({ setGenericData, setAddressData, setContactData, setDepartmentData }) => {
  const fileInput = useRef(null);

  const genericFields = ['name', 'bip_url', 'nip', 'regon', 'short_name', 'krs'];
  const addressFields = ['street', 'zip_code', 'town'];

  const parseSiteDataParts = ((content) => {
    const jsonData = JSON.parse(content);
    // parse generic data
    let data = {};
    genericFields.map((name) => {
      data[name] = jsonData[name];
    })
    setGenericData(data);
    // parse address data
    data = {};
    addressFields.map((name) => {
      data[name] = jsonData.address[name];
    })
    setAddressData(data);
    setContactData(jsonData.contacts);
    setDepartmentData(jsonData.departments);
  });

  const fileSelectorClick = (() => {
    fileInput.current && fileInput.current.click();
  });

  const onFileAdded = ((e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = ((e) => {
      parseSiteDataParts(e.target.result);
    })
    reader.readAsText(file);
  });

  return (
    <div class='form-group'>
      <p>Wybierz plik z danymi twojej instancji BIP (<code>site.json</code>) by załadować dane do edycji.</p>
      <fieldset>
        <input class='form-input' type='file' ref={fileInput} accept='application/json' style='display:none' onInput={onFileAdded} />
        <button class='btn btn-primary' id='fileSelect' onClick={fileSelectorClick}>wybierz plik</button>
      </fieldset>
    </div>
  )
});

const FileInput = connect(allDataMapToProps, actions)(FileInputBase);

const genericDataMapToProps = (
  ({ genericData }) => ({ genericData })
);

const GenericDataFormBase = (({ genericData, setGenericData }) => {
  const [name, setName] = useState('');
  const [bip_url, setBipUrl] = useState('');
  const [nip, setNip] = useState('');
  const [regon, setRegon] = useState('');
  const [short_name, setShortName] = useState('');
  const [krs, setKrs] = useState('');

  useEffect(() => {
    if (genericData) {
      setName(genericData.name || '');
      setBipUrl(genericData.bip_url || '');
      setNip(genericData.nip || '');
      setRegon(genericData.regon || '');
      setShortName(genericData.short_name || '');
      setKrs(genericData.krs || '');
    }
  }, [genericData]);

  const submitHandler = ((e) => {
    e.preventDefault();
    setGenericData({ name, bip_url, nip, regon, short_name, krs });
  });

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField name='name' value={name} changeHandler={setName} label='Nazwa instytucji' required={true} />
        <TextField name='shortName' value={short_name} changeHandler={setShortName} label='Nazwa skrócona' />
        <TextField name='bipUrl' value={bip_url} changeHandler={setBipUrl} label='Adres strony BIP' required={true} />
        <TextField name='nip' value={nip} changeHandler={setNip} label='Numer NIP' required={true} />
        <TextField name='regon' value={regon} changeHandler={setRegon} label='Numer REGON' required={true} />
        <TextField name='krs' value={krs} changeHandler={setKrs} label='Numer wpisu w KRS' />
        <SubmitButton />
      </fieldset>
    </form>
  )
});

const GenericDataForm = connect(genericDataMapToProps, actions)(GenericDataFormBase);

const AddressDataFormBase = (({ addressData, setAddressData }) => {
  const [street, setStreet] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [town, setTown] = useState('');

  useEffect(() => {
    if (addressData) {
      setStreet(addressData.street || '');
      setZipCode(addressData.zip_code || '');
      setTown(addressData.town || '');
    }
  }, [addressData]);

  const submitHandler = ((e) => {
    e.preventDefault();
    setAddressData({ street, zip_code, town });
  })

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField name='street' value={street} changeHandler={setStreet} label='Ulica lub miejscowość z numerem budynku' required={true} />
        <TextField name='zip_code' value={zip_code} changeHandler={setZipCode} label='Kod pocztowy' required={true} />
        <TextField name='town' value={town} changeHandler={setTown} label='Miejscowość / poczta' required={true} />
        <SubmitButton />
      </fieldset>
    </form>
  )
});

const AddressDataForm = connect(allDataMapToProps, actions)(AddressDataFormBase);

export { AddressDataForm, ChoiceSingle, FileInput, GenericDataForm, SubmitButton, TextField };
