import { signal } from '@preact/signals';
import { createContext } from 'preact';

export const AppState = createContext(createAppState());

export function createAppState() {
  const genericData = signal({
    name: '',
    shortName: '',
    bipUrl: '',
    nip: '',
    regon: '',
    krs: '',
  });
  return { genericData };
}
