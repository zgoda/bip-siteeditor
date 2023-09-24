import { useContext } from 'preact/hooks';
import { AppState } from './state';
import { addContactButton, addDepartmentButton } from './menutree.json';

export function MenuTree() {
  const state = useContext(AppState);

  return (
    <aside>
      <nav>
        <ul>
          <li>
            <h4>Dane podstawowe</h4>
            <ul>
              <li>Nazwa</li>
              <li>Nazwa skrócona</li>
              <li>NIP</li>
              <li>REGON</li>
              <li>KRS</li>
              <li>Link do BIP</li>
            </ul>
          </li>
          <li>
            <h4>Adres</h4>
            <ul>
              <li>Adres</li>
              <li>Kod pocztowy</li>
              <li>Miejscowość</li>
            </ul>
          </li>
          <li>
            <h4>Dane kontaktowe</h4>
            {state.contactsData.value.map((contact) => {
              return <p key={contact.name}>{contact.name}</p>;
            })}
            <p role="button" class="secondary outline">
              {addContactButton.label}
            </p>
          </li>
          <li>
            <h4>Działy</h4>
            {state.departmentsData.value.map((department) => {
              return <p key={department.name}>{department.name}</p>;
            })}
            <p role="button" class="secondary outline">
              {addDepartmentButton.label}
            </p>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
