import { uid } from 'uid/secure';

const chunkArray = ((array, chunkSize) => {
  let a = array || [];
  let R = [];
  for (let index = 0; index < a.length; index += chunkSize) {
    R.push(a.slice(index, index + chunkSize));
  }
  return R;
});

const genToastId = ((len = 24) => {
  return uid(len);
});

export { chunkArray, genToastId };
