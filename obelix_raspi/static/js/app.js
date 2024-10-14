
class JoystickController
{
  // https://www.cssscript.com/demo/touch-joystick-controller/
  // stickID: ID of HTML element (representing joystick) that will be dragged
  // maxDistance: maximum amount joystick can move in any direction
  // deadzone: joystick must move at least this amount from origin to register value change
  constructor( stickID, maxDistance, deadzone )
  {
    this.id = stickID;
    let stick = document.getElementById(stickID);

    // location from which drag begins, used to calculate offsets
    this.dragStart = null;

    // track touch identifier in case multiple joysticks present
    this.touchId = null;

    this.active = false;
    this.value = { x: 0, y: 0 };

    let self = this;

    function handleDown(event)
    {
      self.active = true;

      // all drag movements are instantaneous
      stick.style.transition = '0s';

      // touch event fired before mouse event; prevent redundant mouse event from firing
      event.preventDefault();

      if (event.changedTouches)
        self.dragStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
      else
        self.dragStart = { x: event.clientX, y: event.clientY };

      // if this is a touch event, keep track of which one
      if (event.changedTouches)
        self.touchId = event.changedTouches[0].identifier;
    }

    function handleMove(event)
    {
      if ( !self.active ) return;

      // if this is a touch event, make sure it is the right one
      // also handle multiple simultaneous touchmove events
      let touchmoveId = null;
      if (event.changedTouches)
      {
        for (let i = 0; i < event.changedTouches.length; i++)
        {
          if (self.touchId == event.changedTouches[i].identifier)
          {
            touchmoveId = i;
            event.clientX = event.changedTouches[i].clientX;
            event.clientY = event.changedTouches[i].clientY;
          }
        }

        if (touchmoveId == null) return;
      }

      const xDiff = event.clientX - self.dragStart.x;
      const yDiff = event.clientY - self.dragStart.y;
      const angle = Math.atan2(yDiff, xDiff);
      const distance = Math.min(maxDistance, Math.hypot(xDiff, yDiff));
      const xPosition = distance * Math.cos(angle);
      const yPosition = distance * Math.sin(angle);

      // move stick image to new position
      stick.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0px)`;

      // deadzone adjustment
      const distance2 = (distance < deadzone) ? 0 : maxDistance / (maxDistance - deadzone) * (distance - deadzone);
      const xPosition2 = distance2 * Math.cos(angle);
      const yPosition2 = distance2 * Math.sin(angle);
      const xPercent = parseFloat((xPosition2 / maxDistance).toFixed(4));
      const yPercent = parseFloat((yPosition2 / maxDistance).toFixed(4));

      self.value = { x: xPercent, y: yPercent };
    }

    function handleUp(event)
    {
      if ( !self.active ) return;

      // if this is a touch event, make sure it is the right one
      if (event.changedTouches && (self.touchId !== event.changedTouches[0].identifier)) return;

      // transition the joystick position back to center
      stick.style.transition = '.2s';
      stick.style.transform = `translate3d(0px, 0px, 0px)`;

      // reset everything
      self.value = { x: 0, y: 0 };
      self.touchId = null;
      self.active = false;
    }

    stick.addEventListener('mousedown', handleDown);
    stick.addEventListener('touchstart', handleDown);
    document.addEventListener('mousemove', handleMove, {passive: false});
    document.addEventListener('touchmove', handleMove, {passive: false});
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchend', handleUp);
  }
}

let joystick = new JoystickController("stick", 128, 8);
let counter = 0;
let prev_x = 0;
let prev_y = 0;

function sendUpdate(x,y) {
  counter++;
  const x_axis = Math.floor(511.5 + x * 511.5);
  const y_axis = Math.floor(511.5 + y * 511.5);
  document.getElementById("status").innerText = `Joystick (${counter}): ${x_axis}, ${y_axis}` ;
  fetch(`/joystick/${x_axis}/${y_axis}`)
}


// Declare a variable called 'timer' to store the timer ID
let timer;
const debounce = (mainFunction, delay) => {
  // Return an anonymous function that takes in any number of arguments
  return function (...args) {
    // Clear the previous timer to prevent the execution of 'mainFunction'
    clearTimeout(timer);

    // Set a new timer that will execute 'mainFunction' after the specified delay
    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};

/**
 * Triggered whenever the joystick is moved.
 */
function update()
{
  const curr_x = joystick.value.x;
  const curr_y = joystick.value.y;
  if ((curr_x !== prev_x) || (curr_y !== prev_y)) {
    prev_x = curr_x;
    prev_y = curr_y;
    // sendUpdate(curr_x, curr_y);
    const workOnChange = debounce(() => sendUpdate(curr_x, curr_y), 50);
    workOnChange()
  }
}

function loop()
{
  requestAnimationFrame(loop);
  update();
}

loop();