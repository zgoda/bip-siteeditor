import { useEffect, useState } from 'preact/hooks';
import { AlertCircle, CheckCircle, Info, PlusCircle, XCircle } from 'preact-feather';

const StartOverAgain = (({ clearFunc }) => {
  return (
    <div class='warning-box'>
      <p>Klikając poniższy przycisk wyczyścisz wszystkie wprowadzone dane i zaczniesz edycję od początku.</p>
      <p><button class='btn btn-primary' onClick={() => clearFunc()}>wyzeruj</button></p>
    </div>
  )
});

const SectionTitle = (({ title, level = 2 }) => {
  const Tag = `h${level}`;
  return (
    <Tag>{title}</Tag>
  )
});

const EmptyItem = (({ clickHandler }) => {
  return (
    <div class="card empty-item">
      <div class="card-body">
        <button class="btn btn-link btn-action" onClick={clickHandler}><PlusCircle size={48} /></button>
      </div>
    </div>
  )
});

/**
 * Toast component
 */

const Toast = (({ toastList, position, timeout }) => {
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
  }, [timeout]);

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
          <div key={i} class={`notification snackbar ${position} bg-${statusToColor(toast.icon)}`}>
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

export { EmptyItem, SectionTitle, StartOverAgain, Toast };
