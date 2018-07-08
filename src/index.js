import component from './component';

import 'purecss';
import './main.css';
import './main.scss';

let demoComponent = component();

document.body.appendChild(demoComponent);

// HMR Interface
if (module.hot) {
  // Capture hot update
  module.hot.accept('./component', () => {
    const nextComponent = component();

    // replace old component with the hot loaded one
    document.body.replaceChild(nextComponent, demoComponent);

    demoComponent = nextComponent;
  });
}