import { useTitle, useMeta, useLang } from 'hooked-head/preact';
import { GenericDataForm, AddressDataForm, FileInput } from './components/forms';
import { StartOverAgain } from './components/misc';
import { ContactGrid } from './components/contacts';
import { DepartmentGrid } from './components/departments';
import { Provider } from 'redux-zero/preact';

import store from './store';

const App = (() => {
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
        <ContactGrid />
        <hr />
        <h2>Dane wydziałów i pracowników</h2>
        <p>Dane jednostek organizacyjnych instytucji oraz pracowników w nich zatrudnionych.</p>
        <DepartmentGrid />
        <hr />
        <StartOverAgain clearFunc={clearData} />
      </div>
    </Provider>
  );
});


export { App };
