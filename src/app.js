import { useState } from 'preact/hooks';
import { useTitle, useMeta, useLang } from 'hooked-head/preact';
import { GenericDataForm, AddressDataForm, FileInput } from './components/forms';
import { StartOverAgain } from './components/misc';
import { ContactGrid } from './components/contacts';
import { DepartmentGrid } from './components/departments';

const App = (() => {
  const [genericData, setGenericData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [contactData, setContactData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

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
    setDepartmentData(jsonData.departments);
  });

  const clearSiteDataParts = (() => {
    setGenericData({});
    setAddressData({});
    setContactData([]);
    setDepartmentData([]);
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
      <p>
        Wszystkie wprowadzone poniżej dane są wyświetlane w serwisie i nie służą one do niczego
        innego.
      </p>
      <p>
        We wszystkich poniższych formularzach wypełnienie pól oznaczonych czerwoną gwiazdką
        (<span className='label-required-marker'>*</span>) jest wymagane.
      </p>
      <hr />
      <h2>Dane podstawowe</h2>
      <p>
        Podstawowe dane instytucji.
      </p>
      <GenericDataForm data={genericData} setData={setGenericData} />
      <hr />
      <h2>Dane adresowe</h2>
      <p>
        Dane adresowe instytucji.
      </p>
      <AddressDataForm data={addressData} setData={setAddressData} />
      <hr />
      <h2>Dane kontaktowe</h2>
      <p>
        Dane kontaktowe instytucji. W przypadku jedynego wpisu nazwę można pozostawić pustą,
        w przeciwnym wypadku jest ona wymagana.
      </p>
      <ContactGrid data={contactData} setData={setContactData} />
      <hr />
      <h2>Dane wydziałów i pracowników</h2>
      <p>
        Dane jednostek organizacyjnych instytucji oraz pracowników w nich zatrudnionych. W
        szczególnym przypadku braku podziału na jednostki organizacyjne nazwę można pozostawić
        pustą, w przeciwnym wypadku jest ona wymagana.
      </p>
      <DepartmentGrid data={departmentData} setData={setDepartmentData} />
      <hr />
      <StartOverAgain clearFunc={() => inputDataChanged('')} />
    </div>
  );
});


export { App };
