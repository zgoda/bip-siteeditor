import { useContext } from 'preact/hooks';
import { AppState } from '../state';

export function ContactList() {
  const state = useContext(AppState);

  return (
    <>
      <h2>Dane kontaktowe</h2>
      <details>
        <summary>Kontakt do pracowników instytucji</summary>
        {state.contactsData.value.map((contact) => {
          return <p key={contact.name}>{contact.name}</p>;
        })}
      </details>
      <button class="secondary outline autowidth">
        Dodaj dane kontaktowe pracownika
      </button>
    </>
  );
}
