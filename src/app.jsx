import { useLang, useMeta, useTitle } from 'hoofd/preact';

import { mast, head } from './app.json';
import { MenuTree } from './menutree';

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
      <div class="parent">
        <MenuTree />
      </div>
    </>
  );
}
