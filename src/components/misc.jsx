import { useEffect, useRef, useState } from 'preact/hooks';
import { createElement } from 'preact';
import { AlertCircle, CheckCircle, Info, PlusCircle, XCircle } from 'preact-feather';

import { store } from '../state/store';

function StartOverAgain() {
  const buttonRef = useRef(null);

  const handleClearClick = (/** @type {{ preventDefault: () => void; }} */ e) => {
    e.preventDefault();
    buttonRef.current && buttonRef.current.blur();
    store.reset();
  };

  return (
    <div class="warning-box">
      <p>
        Klikając poniższy przycisk wyczyścisz wszystkie wprowadzone dane i zaczniesz
        edycję od początku.
      </p>
      <p>
        <button class="btn btn-primary" ref={buttonRef} onClick={handleClearClick}>
          wyzeruj
        </button>
      </p>
    </div>
  );
}

function SectionTitle({ title, level = 2 }) {
  return createElement(`h${level}`, {}, title);
}

function EmptyCardItem({ clickHandler, itemRef }) {
  return (
    <div class="card empty-card-item">
      <div class="card-body">
        <button
          class="btn btn-link btn-action"
          aria-label="dodaj element"
          onClick={clickHandler}
          ref={itemRef}
        >
          <PlusCircle size={48} />
        </button>
      </div>
    </div>
  );
}

function EmptyTileItem({ clickHandler, itemRef }) {
  return (
    <div class="tile empty-tile-item">
      <div class="tile-content text-center">
        <button
          class="btn btn-link btn-action"
          aria-label="dodaj element"
          onClick={clickHandler}
          ref={itemRef}
        >
          <PlusCircle size={48} />
        </button>
      </div>
    </div>
  );
}

/**
 * @typedef {object} ToastProps
 * @property {Array<import('../..').Notification>} toastList
 * @property {string} [position='bottom-left']
 * @property {number} [timeout=4000]
 *
 * @param {ToastProps} props
 * @returns {JSX.Element}
 */
function Toast({ toastList, position = 'bottom-left', timeout = 4000 }) {
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [list, toastList]);

  useEffect(() => {
    if (timeout) {
      const interval = setInterval(() => {
        if (toastList.length && list.length) {
          deleteToast(toastList[0].id);
        }
      }, timeout);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeout, list]);

  const statusToIcon = (/** @type {string} */ status) => {
    switch (status) {
      case 'success':
        return <CheckCircle />;
      case 'error':
        return <XCircle />;
      case 'warning':
        return <AlertCircle />;
      default:
        return <Info />;
    }
  };

  const statusToColor = (/** @type {string} */ status) => {
    if (status === 'info') {
      return 'primary';
    }
    return status;
  };

  const deleteToast = (/** @type {string} */ id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };

  return (
    <div class={`notification-container ${position}`}>
      {list.map((toast) => {
        return (
          <div
            key={toast.id}
            class={`notification snackbar ${position} bg-${statusToColor(toast.icon)}`}
          >
            <button onClick={() => deleteToast(toast.id)}>x</button>
            <div class="notification-image">{statusToIcon(toast.icon)}</div>
            <div>
              <p class="notification-title">{toast.title}</p>
              <p class="notification-message">{toast.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { EmptyCardItem, EmptyTileItem, SectionTitle, StartOverAgain, Toast };
