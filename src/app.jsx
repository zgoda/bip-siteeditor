import { useLang, useMeta, useTitle } from 'hoofd/preact';
import { Provider } from 'redux-zero/preact';

import { StartOverAgain } from './components/misc';
import {
  AddressData,
  AppInfo,
  ContactData,
  DepartmentsData,
  GenericData,
} from './components/parts';
import { store } from './state/store';

function App() {
  const appTitle = 'Edytor danych instancji BIP';

  useLang('pl');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });
  useMeta({ name: 'descritpion', content: 'Program do edycji danych instancji BIP' });

  return (
    <Provider store={store}>
      <div class="container grid-lg my-2">
        <AppInfo appTitle={appTitle} />
        <GenericData />
        <AddressData />
        <ContactData />
        <DepartmentsData />
        <StartOverAgain />
      </div>
    </Provider>
  );
}

export { App };
