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

const TextField = (({ name, value, changeHandler, required = false, label }) => {
  return (
    <>
      <Label forElement={name} labelText={label} isRequired={required} />
      <TextInput name={name} value={value} onInput={changeHandler} required={required} />
    </>
  )
});

const ChoiceSingle = (({ name, value, choices, changeHandler, required = false, label }) => {
  return (
    <>
      <Label forElement={name} labelText={label} isRequired={required} />
      <select value={value} onChange={changeHandler} required={required} name={name}>
      {choices.map((item) => {
        return (
          <option value={item.value} key={item.value}>{item.name}</option>
        )
      })}
      </select>
    </>
  )
})

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

const SubmitButton = (({ text = 'zapisz' }) => {
  return (
    <button className='button button-primary' type='submit'>{text}</button>
  )
})

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
        <TextField
          name='name'
          value={name}
          changeHandler={(e) => setName(e.target.value)}
          label='Nazwa instytucji'
          required={true}
        />
        <TextField
          name='shortName'
          value={short_name}
          changeHandler={(e) => setShortName(e.target.value)}
          label='Nazwa skrócona'
        />
        <TextField
          name='bipUrl'
          value={bip_url}
          changeHandler={(e) => setBipUrl(e.target.value)}
          label='Adres strony BIP'
          required={true}
        />
        <TextField
          name='nip'
          value={nip}
          changeHandler={(e) => setNip(e.target.value)}
          label='Numer NIP'
          required={true}
        />
        <TextField
          name='regon'
          value={regon}
          changeHandler={(e) => setRegon(e.target.value)}
          label='Numer REGON'
          required={true}
        />
        <TextField
          name='krs'
          value={krs}
          changeHandler={(e) => setKrs(e.target.value)}
          label='Numer wpisu w KRS'
        />
        <SubmitButton />
      </fieldset>
    </form>
  )
});

const AddressDataForm = (({ data, setData }) => {
  const [street, setStreet] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [town, setTown] = useState('');

  setStreet(data.street || '');
  setZipCode(data.zip_code || '');
  setTown(data.town || '');

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
          label='Ulica lub miejscowość z numerem budynku'
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
        <SubmitButton />
      </fieldset>
    </form>
  )
});

export { GenericDataForm, AddressDataForm, FileInput, TextField, SubmitButton, ChoiceSingle };
