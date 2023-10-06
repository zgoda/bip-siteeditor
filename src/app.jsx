import { useLang, useMeta, useTitle } from 'hoofd/preact';

import { mast, head } from './app.json';
import { GenericData } from './components/genericdata';
import { AddressData } from './components/addressdata';
import { ContactList } from './components/contactlist';
import { DepartmentList } from './components/departmentlist';

export function App() {
  useLang(head.lang);
  useTitle(head.title);
  useMeta({ name: 'author', content: head.author });
  useMeta({ name: 'descritpion', content: head.description });

  return (
    <>
      <h1>{head.title}</h1>
      {mast.paragraphs.map((para) => (
        <p key={para}>{para}</p>
      ))}
      <GenericData />
      <AddressData />
      <ContactList />
      <DepartmentList />
    </>
  );
}
