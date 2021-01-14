import { PlusCircle } from 'preact-feather';

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
    <div class="card">
      <div class="card-body item-add-button">
        <button class="btn btn-link btn-action" onClick={clickHandler}><PlusCircle size={48} /></button>
      </div>
    </div>
  )
});

export { EmptyItem, SectionTitle, StartOverAgain };
