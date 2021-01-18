import { customAlphabet, urlAlphabet } from 'nanoid';

const chunkArray = ((array, chunkSize) => {
  let a = array || [];
  let R = [];
  for (let index = 0; index < a.length; index += chunkSize) {
    R.push(a.slice(index, index + chunkSize));
  }
  return R;
});

const genToastId = ((len = 20) => {
  const alphabet = urlAlphabet.replace('_', '');
  const nanoid = customAlphabet(alphabet, len);
  return nanoid();
});

export { chunkArray, genToastId };
