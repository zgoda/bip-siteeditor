const StartOverAgain = (({ clearFunc }) => {
  return (
    <div className='warning-box'>
      <p>Klikając poniższy przycisk wyczyścisz wszystkie wprowadzone dane i zaczniesz edycję od początku.</p>
      <p><button className='button button-primary' onClick={() => clearFunc()}>wyzeruj</button></p>
    </div>
  )
});

export { StartOverAgain };
