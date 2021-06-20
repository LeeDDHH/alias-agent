import React, { useState, useEffect, useCallback } from 'react';

import styles from '../../styles/mainView.module.css';

const MainView = React.memo(() => {
  const [input, setInput] = useState('');

  useEffect(() => {
    //   const handleMessage = (event, message) => setMessage(message)
    //   window.ipcApi.on('message', handleMessage)
    //   return () => {
    //     window.ipcRenderer.removeListener('message', handleMessage)
    //   }
    window.ipcApi.handleInitInputValue(resetInput);
  }, []);

  const resetInput = useCallback(() => {
    setInput('');
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      await window.ipcApi.handleExecAlias(input);
      resetInput();
    },
    [input, resetInput]
  );

  /*
    IDEA
    tabでのアクション
      - 入力した文字列からaliasの候補を自動補完する
        - なければ、入力した文字列をそのまま表示する
      - 引数が必要なaliasの場合、一つスペースをあける
      - 入力した文字列をもとに候補のaliasが複数あれば、tabで他の候補も表示する
        - 仕様的に衝突すると思うので、やり方は別途考える
   */
  const handleKeyEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setInput(event.target.value);
    },
    []
  );

  return (
    <div className={`${styles.height100} ${styles.inputLayer}`}>
      <form className={styles.height100} onSubmit={handleSubmit}>
        <input
          className={`${styles.height100} ${styles.width100} ${styles.inputBox}`}
          type="text"
          value={input}
          onChange={(e) => handleKeyEvent(e)}
          autoFocus
          onBlur={resetInput}
          spellCheck={false}
        />
      </form>
    </div>
  );
});

MainView.displayName = 'MainView';

export default MainView;
