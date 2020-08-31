import { useState, useRef } from 'preact/hooks';

const Label = (({ forElement, labelText, isRequired = false }) => {
  if (isRequired) {
    return (
      <label htmlFor={forElement}>{labelText} <span className='label-required-marker'>*</span></label>
    )
  }
  return (
    <label htmlFor={forElement}>{labelText}</label>
  )
});

const TextInput = (({ name, value, changeHandler, required }) => {
  return (
    <input type='text' name={name} value={value} onInput={changeHandler} required={required} />
  )
});

const TextField = (({ name, value, changeHandler, required, label }) => {
  return (
    <>
      <Label forElement={name} labelText={label} isRequired={required} />
      <TextInput name={name} value={value} onInput={changeHandler} required={required} />
    </>
  )
});

const FileInput = (({ setValue }) => {
  const fileInput = useRef(null);

  const fileSelectorClick = (() => {
    fileInput.current && fileInput.current.click();
  });

  const onFileAdded = ((e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = ((e) => {
      setValue(e.target.result);
    })
    reader.readAsText(file);
  });

  return (
    <div>
      <p>Wybierz plik z danymi twojej instancji BIP (<code>site.json</code>) by załadować dane do edycji.</p>
      <fieldset>
        <input type='file' ref={fileInput} accept='application/json' style='display:none' onChange={onFileAdded} />
        <button id='fileSelect' onClick={fileSelectorClick}>wybierz plik</button>
      </fieldset>
    </div>
  )
});

const GenericDataForm = (({ data, setData }) => {
  const [name, setName] = useState('');
  const [bip_url, setBipUrl] = useState('');
  const [nip, setNip] = useState('');
  const [regon, setRegon] = useState('');
  const [short_name, setShortName] = useState('');
  const [krs, setKrs] = useState('');

  setName(data.name || '');
  setBipUrl(data.bip_url || '');
  setNip(data.nip || '');
  setRegon(data.regon || '');
  setShortName(data.short_name || '');
  setKrs(data.krs || '');

  const submitHandler = ((e) => {
    setData({ name, bip_url, nip, regon, short_name, krs });
    e.preventDefault();
  });

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <Label forElement='name' labelText='Nazwa instytucji' isRequired={true} />
        <input type='text' name='name' value={name} onInput={(e) => setName(e.target.value)} required={true} />
        <Label forElement='shortName' labelText='Nazwa skrócona' />
        <input type='text' name='shortName' value={short_name} onInput={(e) => setShortName(e.target.value)} />
        <Label forElement='bipUrl' labelText='Adres strony BIP' isRequired={true} />
        <input type='text' name='bipUrl' value={bip_url} onInput={(e) => setBipUrl(e.target.value)} required={true} />
        <Label forElement='nip' labelText='Numer NIP' isRequired={true} />
        <input type='text' name='nip' value={nip} onInput={(e) => setNip(e.target.value)} required={true} />
        <Label forElement='regon' labelText='Numer REGON' isRequired={true} />
        <input type='text' name='regon' value={regon} onInput={(e) => setRegon(e.target.value)} required={true} />
        <Label forElement='krs' labelText='Numer wpisu w KRS' />
        <input type='text' name='krs' value={krs} onInput={(e) => setKrs(e.target.value)} />
        <button className='button button-primary' type='submit'>zapisz</button>
      </fieldset>
    </form>
  )
});

const AddressDataForm = (({ data, setData }) => {
  const [street, setStreet] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [town, setTown] = useState('');

  setStreet(data.street);
  setZipCode(data.zip_code);
  setTown(data.town);

  const submitHandler = ((e) => {
    setData({ street, zip_code, town });
    e.preventDefault();
  })

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <TextField
          name='street'
          value={street}
          changeHandler={(e) => setStreet(e.target.value)}
          label='Ulica (miejscowość) z numerem budynku'
          required={true}
        />
        <TextField
          name='zip_code'
          value={zip_code}
          changeHandler={(e) => setZipCode(e.target.value)}
          label='Kod pocztowy'
          required={true}
        />
        <TextField
          name='town'
          value={town}
          changeHandler={(e) => setTown(e.target.value)}
          label='Miejscowość / poczta'
          required={true}
        />
        <button className='button button-primary' type='submit'>zapisz</button>
      </fieldset>
    </form>
  )
});

export { GenericDataForm, AddressDataForm, FileInput };
