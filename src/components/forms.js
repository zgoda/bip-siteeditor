import { useState } from 'preact/hooks';

const DataInputForm = (({ value, setValue }) => {
  const [jsonData, setJsonData] = useState(value);

  const submitHandler = ((e) => {
    setValue(jsonData);
    e.preventDefault();
  });

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <label htmlFor='jsondata'>Wklej zawartość pliku <code>site.json</code> twojej instancji BIP, jeżeli chcesz zmienić jej dane</label>
        <textarea className='json-input' name='jsondata' onInput={(e) => setJsonData(e.target.value)} value={jsonData} />
        <button className='button button-primary mr-2' type='submit'>wczytaj</button>
        <button className='button button-outline' onClick={() => setJsonData('')}>wyczyść</button>
      </fieldset>
    </form>
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
        <label htmlFor='name'>Nazwa instytucji <span className='label-required-marker'>*</span></label>
        <input type='text' name='name' value={name} onInput={(e) => setName(e.target.value)} required={true} />
        <label htmlFor='shortName'>Nazwa skrócona</label>
        <input type='text' name='shortName' value={short_name} onInput={(e) => setShortName(e.target.value)} />
        <label htmlFor='bipUrl'>Adres strony BIP <span className='label-required-marker'>*</span></label>
        <input type='text' name='bipUrl' value={bip_url} onInput={(e) => setBipUrl(e.target.value)} required={true} />
        <label htmlFor='nip'>Numer NIP <span className='label-required-marker'>*</span></label>
        <input type='text' name='nip' value={nip} onInput={(e) => setNip(e.target.value)} required={true} />
        <label htmlFor='regon'>Numer REGON <span className='label-required-marker'>*</span></label>
        <input type='text' name='regon' value={regon} onInput={(e) => setRegon(e.target.value)} required={true} />
        <label htmlFor='krs'>Numer wpisu w KRS</label>
        <input type='text' name='krs' value={krs} onInput={(e) => setKrs(e.target.value)} />
        <button className='button button-primary' type='submit'>zapisz</button>
      </fieldset>
    </form>
  )
});

export { DataInputForm, GenericDataForm };
