import { useState } from 'preact/hooks';
import { useTitle, useMeta, useLang } from 'hooked-head/preact';
import { GenericDataForm, AddressDataForm, FileInput } from './components/forms';
import { StartOverAgain } from './components/misc';
import { ContactGrid } from './components/contacts'

const App = (() => {
  const [genericData, setGenericData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [contactData, setContactData] = useState([]);

  const parseSiteDataParts = ((jsonData) => {
    // parse generic data
    let data = {};
    const genericFields = ['name', 'bip_url', 'nip', 'regon', 'short_name', 'krs'];
    genericFields.map((name) => {
      data[name] = jsonData[name];
    })
    setGenericData(data);
    // parse address data
    data = {};
    const addressFields = ['street', 'zip_code', 'town'];
    addressFields.map((name) => {
      data[name] = jsonData.address[name];
    })
    setAddressData(data);
    setContactData(jsonData.contacts);
  });

  const clearSiteDataParts = (() => {
    setGenericData({});
    setAddressData({});
    setContactData([]);
  });

  const inputDataChanged = ((value) => {
    value = value.trim();
    if (value) {
      const data = JSON.parse(value);
      parseSiteDataParts(data);
    } else {
      clearSiteDataParts();
    }
  });

  const appTitle = 'Edytor danych instancji BIP';

  useLang('pl');
  useTitle(appTitle);
  useMeta({name: 'author', content: 'Jarek Zgoda'});

  return (
    <div className='container'>
      <h1>{appTitle}</h1>
      <FileInput setValue={inputDataChanged} />
      <p>We wszystkich poniższych formularzach wypełnienie pól oznaczonych czerwoną gwiazdką (<span className='label-required-marker'>*</span>) jest wymagane.</p>
      <hr />
      <h2>Dane podstawowe</h2>
      <GenericDataForm data={genericData} setData={setGenericData} />
      <hr />
      <h2>Dane adresowe</h2>
      <AddressDataForm data={addressData} setData={setAddressData} />
      <hr />
      <h2>Dane kontaktowe</h2>
      <ContactGrid data={contactData} setData={setContactData} />
      <hr />
      <StartOverAgain clearFunc={() => inputDataChanged('')} />
    </div>
  );
});


export { App };
