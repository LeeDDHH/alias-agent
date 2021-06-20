import React from 'react';
import ReactDOM from 'react-dom';

import SettingView from './components/settingView';

/*
cssリセッター
https://github.com/krishdevdb/reseter.css
*/
import 'reseter.css/css/reseter.min.css';
import '../styles/app.module.css';

const App: React.FC = React.memo(() => <SettingView />);

App.displayName = 'App';

ReactDOM.render(<App />, document.getElementById('root'));
