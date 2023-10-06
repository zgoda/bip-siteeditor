import { useState } from 'preact/hooks';

export function GenericData() {
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [nip, setNip] = useState('');
  const [regon, setRegon] = useState('');
  const [krs, setKrs] = useState('');
  const [bipLink, setBipLink] = useState('');

  return (
    <>
      <h2>Dane podstawowe</h2>
      <details>
        <summary>Podstawowe dane instytucji publicznej</summary>
        <div class="grid">
          <label for="name">Nazwa</label>
          <input
            type="text"
            id="name"
            value={name}
            // @ts-ignore
            onInput={(e) => setName(e.target.value)}
          />
        </div>
        <div class="grid">
          <label for="shortname">Nazwa skrócona</label>
          <input
            type="text"
            id="shortname"
            value={shortName}
            // @ts-ignore
            onInput={(e) => setShortName(e.target.value)}
          />
        </div>
        <div class="grid">
          <label for="nip">NIP</label>
          <input
            type="text"
            id="nip"
            value={nip}
            // @ts-ignore
            onInput={(e) => setNip(e.target.value)}
          />
        </div>
        <div class="grid">
          <label for="regon">REGON</label>
          <input
            type="text"
            id="regon"
            value={regon}
            // @ts-ignore
            onInput={(e) => setRegon(e.target.value)}
          />
        </div>
        <div class="grid">
          <label for="krs">KRS</label>
          <input
            type="text"
            id="krs"
            value={krs}
            // @ts-ignore
            onInput={(e) => setKrs(e.target.value)}
          />
        </div>
        <div class="grid">
          <label for="bipLink">Link do BIP</label>
          <input
            type="text"
            id="bipLink"
            value={bipLink}
            // @ts-ignore
            onInput={(e) => setBipLink(e.target.value)}
          />
        </div>
      </details>
    </>
  );
}
