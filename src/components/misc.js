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

});

export { EmptyItem, SectionTitle, StartOverAgain };
