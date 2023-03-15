import { render } from 'preact';
import { App } from './app';
import { AppState, createAppState } from './state';

render(
  <AppState.Provider value={createAppState()}>
    <App />
  </AppState.Provider>,
  document.getElementById('app'),
);
