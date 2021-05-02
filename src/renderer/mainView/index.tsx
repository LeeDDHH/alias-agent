import React from 'react';
import ReactDOM from 'react-dom';

import MainView from './components/mainView';

/*
cssリセッター
https://github.com/krishdevdb/reseter.css
*/
import 'reseter.css/css/reseter.min.css';
import '../styles/app.module.css';

const App: React.FC = () => <MainView />;

ReactDOM.render(<App />, document.getElementById('root'));
