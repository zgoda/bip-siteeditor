import { ContactGrid } from './contacts';
import { DepartmentGrid } from './departments';
import { AddressDataForm, FileInput, GenericDataForm } from './forms';
import { SectionTitle } from './misc';

const AppInfo = (({ appTitle }) => {
  return (
    <>
      <h1>{appTitle}</h1>
      <FileInput />
      <p>
        Wszystkie wprowadzone poniżej dane są wyświetlane w serwisie BIP jako dane
        instytucji.
      </p>
      <p>
        We wszystkich poniższych formularzach wypełnienie pól oznaczonych czerwoną
        gwiazdką (<span class='label-required-marker'>*</span>) jest wymagane.
      </p>
      <hr />
    </>
  );
});

const GenericData = (() => {
  return (
    <>
      <SectionTitle title='Dane podstawowe' />
      <p>Podstawowe dane instytucji.</p>
      <GenericDataForm />
      <hr />
    </>
  );
});

const AddressData = (() => {
  return (
    <>
      <SectionTitle title='Dane adresowe' />
      <p>Dane adresowe instytucji.</p>
      <AddressDataForm />
      <hr />
    </>
  );
});

const ContactData = (() => {
  return (
    <>
      <SectionTitle title='Dane kontaktowe' />
      <p>Dane kontaktowe instytucji.</p>
      <ContactGrid />
      <hr />
    </>
  );
});

const DepartmentsData = (() => {
  return (
    <>
      <SectionTitle title='Dane wydziałów i pracowników' />
      <p>
        Dane jednostek organizacyjnych instytucji oraz pracowników w nich
        zatrudnionych.
      </p>
      <DepartmentGrid />
      <hr />
    </>
  );
});

export { AddressData, AppInfo, ContactData, DepartmentsData, GenericData };
