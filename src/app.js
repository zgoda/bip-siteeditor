import { useState } from 'preact/hooks';
import { useTitle, useMeta, useLang } from 'hooked-head/preact';
import { GenericDataForm, AddressDataForm, FileInput } from './components/forms';
import { StartOverAgain } from './components/misc';
import { ContactGrid } from './components/contacts';
import { DepartmentGrid } from './components/departments';
import { Provider } from 'redux-zero/preact';

import store from './store';

const App = (() => {
  const genericFields = ['name', 'bip_url', 'nip', 'regon', 'short_name', 'krs'];
  const addressFields = ['street', 'zip_code', 'town'];

  const emptyGenericData = {};
  for (const key of genericFields) {
    emptyGenericData[key] = '';
  }
  const emptyAddress = {}
  for (const key of addressFields) {
    emptyAddress[key] = '';
  }

  const [contactData, setContactData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const appTitle = 'Edytor danych instancji BIP';

  useLang('pl');
  useTitle(appTitle);
  useMeta({name: 'author', content: 'Jarek Zgoda'});

  const clearData = (() => store.reset());

  return (
    <Provider store={store}>
      <div class='container grid-lg my-2'>
        <h1>{appTitle}</h1>
        <FileInput />
        <p>Wszystkie wprowadzone poniżej dane są wyświetlane w serwisie BIP jako dane instytucji.</p>
        <p>We wszystkich poniższych formularzach wypełnienie pól oznaczonych czerwoną gwiazdką (<span class='label-required-marker'>*</span>) jest wymagane.</p>
        <hr />
        <h2>Dane podstawowe</h2>
        <p>Podstawowe dane instytucji.</p>
        <GenericDataForm />
        <hr />
        <h2>Dane adresowe</h2>
        <p>Dane adresowe instytucji.</p>
        <AddressDataForm />
        <hr />
        <h2>Dane kontaktowe</h2>
        <p>Dane kontaktowe instytucji.</p>
        <ContactGrid data={contactData} setData={setContactData} />
        <hr />
        <h2>Dane wydziałów i pracowników</h2>
        <p>Dane jednostek organizacyjnych instytucji oraz pracowników w nich zatrudnionych.</p>
        <DepartmentGrid data={departmentData} setData={setDepartmentData} />
        <hr />
        <StartOverAgain clearFunc={clearData} />
      </div>
    </Provider>
  );
});


export { App };
