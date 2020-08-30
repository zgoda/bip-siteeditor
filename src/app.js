import { useState } from 'preact/hooks';
import { DataInputForm } from './components/forms';

const App = (() => {
  const [inputData, setInputData] = useState('');

  return (
    <div className='container'>
      <h1>Edytor danych instancji BIP</h1>
      <DataInputForm value={inputData} setValue={setInputData} />
    </div>
  );
});


export { App };
