const StartOverAgain = (({ clearFunc }) => {
  return (
    <div class='warning-box'>
      <p>Klikając poniższy przycisk wyczyścisz wszystkie wprowadzone dane i zaczniesz edycję od początku.</p>
      <p>
        <button class='btn btn-primary' onClick={() => clearFunc()}>
          wyzeruj
        </button>
      </p>
    </div>
  )
});

export { StartOverAgain };
