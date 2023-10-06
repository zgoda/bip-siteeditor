import { useState } from 'preact/hooks';

export function AddressData() {
  const [streetAddress, setStreetAddress] = useState('');
  const [zip, setZip] = useState('');
  const [town, setTown] = useState('');

  return (
    <>
      <h2>Adres</h2>
      <details>
        <summary>Adres używany w oficjalnych dokumentach</summary>
        <div class="grid">
          <label for="streetAddress">Ulica/miejscowość, numer budynku</label>
          <input
            type="text"
            id="streetAddress"
            value={streetAddress}
            // @ts-ignore
            onInput={(e) => setStreetAddress(e.target.value)}
          />
        </div>
        <div class="grid">
          <label for="zip">Kod pocztowy</label>
          <input
            type="text"
            id="zip"
            value={zip}
            // @ts-ignore
            onInput={(e) => setZip(e.target.value)}
          />
        </div>
        <div class="grid">
          <label for="town">Miejscowość</label>
          <input
            type="text"
            id="town"
            value={town}
            // @ts-ignore
            onInput={(e) => setTown(e.target.value)}
          />
        </div>
      </details>
    </>
  );
}
