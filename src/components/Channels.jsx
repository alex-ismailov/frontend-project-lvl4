import React from 'react';
import cn from 'classnames';
import { Nav } from 'react-bootstrap';

const Channels = (props) => {
  const { channels, currentChannelId } = props;

  const buildChannelItem = ({ id, name }) => {
    const classes = cn('nav-link btn-block mb-2 text-left btn', {
      'btn-primary': id === currentChannelId,
      'btn-light': id !== currentChannelId,
    });

    return (
      <Nav.Item key={id}>
        <button type="button" className={classes}>
          {name}
        </button>
      </Nav.Item>
    );
  };

  return (
    <>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">
          +
        </button>
      </div>
      <Nav className="flex-column nav-pills nav-fill">
        {channels.length > 0 && channels.map(buildChannelItem)}
      </Nav>
    </>
  );
};

export default Channels;
