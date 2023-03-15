import { useLang, useMeta, useTitle } from 'hoofd/preact';

import { mast, head } from './app.json';

function App() {
  useLang(head.lang);
  useTitle(head.title);
  head.meta.map(({ name, content }) => useMeta({ name, content }));

  return (
    <>
      <h1>{head.title}</h1>
      {mast.paragraphs.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
    </>
  );
}

export { App };
