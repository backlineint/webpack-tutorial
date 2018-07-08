export default (text = 'Hello World') => {
  const element = document.createElement('div');

  element.className = 'pure-button myclass';
  element.innerHTML = text;

  return element;
};
