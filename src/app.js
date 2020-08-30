import { useState } from 'preact/hooks';
import { DataInputForm, GenericDataForm } from './components/forms';
import { StartOverAgain } from './components/misc';

const App = (() => {
  const [inputData, setInputData] = useState('');
  const [siteData, setSiteData] = useState({});
  const [genericData, setGenericData] = useState({});
  const [addressData, setAddressData] = useState({});

  const parseSiteDataParts = ((inputData) => {
    // parse generic data
    let data = {};
    const genericFields = ['name', 'bip_url', 'nip', 'regon', 'short_name', 'krs'];
    genericFields.map((name) => {
      data[name] = inputData[name];
    })
    setGenericData(data);
    // parse address data
    data = {};
    const addressFields = ['street', 'zip_code', 'town'];
    addressFields.map((name) => {
      data[name] = inputData.address[name];
    })
    setAddressData(data);
  });

  const clearSiteDataParts = (() => {
    setGenericData({});
    setAddressData({});
  });

  const inputDataChanged = ((value) => {
    value = value.trim();
    setInputData(value);
    if (value) {
      const data = JSON.parse(value);
      setSiteData(data);
      parseSiteDataParts(data);
    } else {
      setSiteData({});
      clearSiteDataParts();
    }
  });

  return (
    <div className='container'>
      <h1>Edytor danych instancji BIP</h1>
      <DataInputForm value={inputData} setValue={inputDataChanged} />
      <hr />
      <h2>Dane podstawowe</h2>
      <GenericDataForm data={genericData} setData={setGenericData} />
      <hr />
      <StartOverAgain clearFunc={() => inputDataChanged('')} />
    </div>
  );
});


export { App };
