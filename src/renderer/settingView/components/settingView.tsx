import React, { useState, useEffect } from 'react';

import { convertKeyboardKey } from '../../../lib/KeyboardLayout';

import styles from '../../styles/mainView.module.css';

const SettingView = () => {
  const [keys, setKeys] = useState<HotKeys>([]);
  // const [input, setInput] = useState('');
  // const [message, setMessage] = useState<string | null>('');

  useEffect(() => {
    //   const handleMessage = (event, message) => setMessage(message)
    //   window.ipcApi.on('message', handleMessage)
    //   return () => {
    //     window.ipcRenderer.removeListener('message', handleMessage)
    //   }
    // window.ipcApi.handleInitInputValue(resetKeys);
  }, []);

  const resetKeys = () => setKeys([]);

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const result = await window.ipcApi.handleMessage(input);
  //   setMessage(result);
  // };

  const keyDownAction = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const newKeys = convertKeyboardKey(evt, keys);
    setKeys(newKeys);
  };

  const visualKeys = () => {
    if (keys.length === 0) return '';
    return keys.join('+');
  };

  return (
    <div className={styles.height100}>
      <input
        className={`${styles.width100}`}
        onKeyDown={(e) => keyDownAction(e)}
        readOnly={true}
        value={visualKeys()}
      />
      <input type="button" onClick={resetKeys} value={'Clear'} />
      {/* {message && <p>{message}</p>}

      <form className={styles.height100} onSubmit={handleSubmit}>
        <input
          className={`${styles.height100} ${styles.width100} ${styles.font}`}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form> */}
    </div>
  );
};

export default SettingView;
