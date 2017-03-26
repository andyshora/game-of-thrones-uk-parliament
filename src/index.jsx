import React from 'react';
import ReactDOM from 'react-dom';

// Views
import Lords from './views/lords';

import './styles/index.css';
/**
 * Our main application
 */
const App = () => <Lords />;

ReactDOM.render(<App />, document.getElementById('root'));
