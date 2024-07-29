const fireEvent = {
  keyDown(eventInitDict?: KeyboardEventInit) {
    window.dispatchEvent(new KeyboardEvent('keydown', eventInitDict));
  },
};

export default fireEvent;
