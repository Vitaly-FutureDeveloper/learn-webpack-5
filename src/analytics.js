import * as $ from 'jquery';

function createAnalitics() {
  let counter = 0;
  let isDestroyed = false;

  const listener = () => counter++

  $(document).on('click', listener);

  return {
    destroy(){
      document.removeEventListener('click', listener);
      destroyed = true;
    },
    getClicks(){
      if(destroyed){
        return `Analytlcks is Destroed Total clicks = ${counter}`;
      }
      return counter;
    }
  }
}

window.analytick = createAnalitics();
