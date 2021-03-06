import { useEffect, useState } from 'preact/hooks';
import { AlertCircle, CheckCircle, Info, PlusCircle, XCircle } from 'preact-feather';

const StartOverAgain = (({ clearFunc }) => {
  return (
    <div class='warning-box'>
      <p>
        Klikając poniższy przycisk wyczyścisz wszystkie wprowadzone dane i zaczniesz
        edycję od początku.
      </p>
      <p>
        <button class='btn btn-primary' onClick={() => clearFunc()}>wyzeruj</button>
      </p>
    </div>
  )
});

const SectionTitle = (({ title, level = 2 }) => {
  const Tag = `h${level}`;
  return (
    <Tag>{title}</Tag>
  )
});

const EmptyCardItem = (({ clickHandler, itemRef }) => {
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
  )
});

const EmptyTileItem = (({ clickHandler, itemRef }) => {
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
  )
});

/**
 * Toast component
 */

const Toast = (({ toastList, position = 'bottom-left', timeout = 4000 }) => {
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

  const statusToIcon = ((status) => {
    switch (status) {
      case 'success':
        return <CheckCircle />
      case 'error':
        return <XCircle />
      case 'warning':
        return <AlertCircle />
      default:
        return <Info />
    }
  });

  const statusToColor = ((status) =>{
    if (status === 'info') {
      return 'primary';
    }
    return status;
  });

  const deleteToast = ((id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  });

  return (
    <div class={`notification-container ${position}`}>
      {list.map((toast, i) => {
        return (
          <div
            key={i}
            class={`notification snackbar ${position} bg-${statusToColor(toast.icon)}`}
          >
            <button onClick={() => deleteToast(toast.id)}>x</button>
            <div class="notification-image">
              {statusToIcon(toast.icon)}
            </div>
            <div>
              <p class="notification-title">{toast.title}</p>
              <p class="notification-message">{toast.message}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
});

export { EmptyCardItem, EmptyTileItem, SectionTitle, StartOverAgain, Toast };
