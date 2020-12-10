import { useState, useRef } from 'preact/hooks';

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
    <div class='form-group'>
      <p>Wybierz plik z danymi twojej instancji BIP (<code>site.json</code>) by załadować dane do edycji.</p>
      <fieldset>
        <input class='form-input' type='file' ref={fileInput} accept='application/json' style='display:none' onChange={onFileAdded} />
        <button class='btn btn-primary' id='fileSelect' onClick={fileSelectorClick}>wybierz plik</button>
      </fieldset>
    </div>
  )
});

const SubmitButton = (({ text = 'zapisz' }) => {
  return (
    <button class='btn btn-primary' type='submit'>{text}</button>
  )
})

const GenericDataForm = (({ data, setData }) => {
  const [name, setName] = useState(data.name || '');
  const [bip_url, setBipUrl] = useState(data.bip_url || '');
  const [nip, setNip] = useState(data.nip || '');
  const [regon, setRegon] = useState(data.regon || '');
  const [short_name, setShortName] = useState(data.short_name || '');
  const [krs, setKrs] = useState(data.krs || '');

  const submitHandler = ((e) => {
    e.preventDefault();
    setData({ name, bip_url, nip, regon, short_name, krs });
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

const AddressDataForm = (({ data, setData }) => {
  const [street, setStreet] = useState(data.street || '');
  const [zip_code, setZipCode] = useState(data.zip_code || '');
  const [town, setTown] = useState(data.town || '');

  const submitHandler = ((e) => {
    e.preventDefault();
    setData({ street, zip_code, town });
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

export { GenericDataForm, AddressDataForm, FileInput, TextField, SubmitButton, ChoiceSingle };
