import React from 'react';

const Chat = (props) => {
  const { handleInputText, text } = props;

  return (
    <div className="d-flex flex-column h-100">
      {/* there will be rendered component messages-box */}
      {/* <div id="messages-box" className="chat-messages overflow-auto mb-3">
        <div className="text-break">
          <b>Keith.Wolff43</b>: dfasdssdfa
        </div>
      </div> */}
      <div className="mt-auto">
        <form>
          <div className="input-group">
            <input
              onChange={handleInputText}
              name="body"
              aria-label="body"
              className="form-control"
              value={text}
            />
            <div className="input-group-append">
              <button
                aria-label="submit"
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
