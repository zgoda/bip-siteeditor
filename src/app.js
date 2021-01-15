import { useLang, useMeta, useTitle } from 'hooked-head/preact';
import { Provider } from 'redux-zero/preact';

import { ContactGrid } from './components/contacts';
import { DepartmentGrid } from './components/departments';
import { AddressDataForm, FileInput, GenericDataForm } from './components/forms';
import { SectionTitle, StartOverAgain } from './components/misc';
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
        <SectionTitle title='Dane podstawowe' />
        <p>Podstawowe dane instytucji.</p>
        <GenericDataForm />
        <hr />
        <SectionTitle title='Dane adresowe' />
        <p>Dane adresowe instytucji.</p>
        <AddressDataForm />
        <hr />
        <SectionTitle title='Dane kontaktowe' />
        <p>Dane kontaktowe instytucji.</p>
        <ContactGrid />
        <hr />
        <SectionTitle title='Dane wydziałów i pracowników' />
        <p>Dane jednostek organizacyjnych instytucji oraz pracowników w nich zatrudnionych.</p>
        <DepartmentGrid />
        <hr />
        <StartOverAgain clearFunc={clearData} />
      </div>
    </Provider>
  );
});


export { App };
