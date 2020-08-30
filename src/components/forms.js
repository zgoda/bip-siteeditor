import { useState } from 'preact/hooks';

const DataInputForm = (({ value, setValue }) => {
  const [jsonData, setJsonData] = useState(value);

  const submitHandler = ((e) => {
    e.preventDefault();
    setValue(jsonData);
  });

  const jsonDataChange = ((e) => {
    setJsonData(e.target.value);
  });

  const clearData = (() => {
    setJsonData('');
  });

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
        <label htmlFor='jsondata'>Wklej zawartość pliku <code>site.json</code> twojej instancji BIP, jeżeli chcesz zmienić jej dane</label>
        <textarea className='json-input' name='jsondata' onInput={jsonDataChange}>{jsonData}</textarea>
        <button className='button button-primary mr-2' type='submit'>wczytaj</button>
        <button className='button button-outline' onClick={clearData}>wyczyść</button>
      </fieldset>
    </form>
  )
});

export { DataInputForm };
