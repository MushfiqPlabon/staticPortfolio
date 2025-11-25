export class InputModeController {
  constructor() {
    this.handleFirstMouse = this.handleFirstMouse.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  init() {
    window.addEventListener('mousemove', this.handleFirstMouse);
    window.addEventListener('touchstart', this.handleTouch);
  }

  handleFirstMouse() {
    document.body.classList.add('using-mouse');
    // Once the mouse is used, we no longer need this specific listener.
    // The touch listener will handle switching back if needed.
    window.removeEventListener('mousemove', this.handleFirstMouse);
  }

  handleTouch() {
    document.body.classList.remove('using-mouse');
  }

  destroy() {
    window.removeEventListener('mousemove', this.handleFirstMouse);
    window.removeEventListener('touchstart', this.handleTouch);
  }
}
