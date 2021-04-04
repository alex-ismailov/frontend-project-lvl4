import React from 'react';

/* there will be rendered component messages-box */
const Messages = () => (
  <div id="messages-box" className="chat-messages overflow-auto mb-3">
    {/* text-break это TextItem компонент */}
    <div className="text-break">
      <b>Keith.Wolff43</b>: dfasdssdfa
    </div>
  </div>
);

export default Messages;
