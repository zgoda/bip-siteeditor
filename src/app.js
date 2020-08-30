import { useState } from 'preact/hooks';
import { DataInputForm } from './components/forms';
import { StartOverAgain } from './components/misc';

const App = (() => {
  const [inputData, setInputData] = useState('');

  return (
    <div className='container'>
      <h1>Edytor danych instancji BIP</h1>
      <DataInputForm value={inputData} setValue={setInputData} />
      <hr />
      <StartOverAgain clearFunc={() => setInputData('')} />
    </div>
  );
});


export { App };
