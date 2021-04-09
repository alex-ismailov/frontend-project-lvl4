import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Nav } from 'react-bootstrap';
import { setCurrentChannelId } from './currentChannelIdSlice.js';

const buildNavItem = (id, name, currentChannelId, handleChannel) => {
  const classes = cn('nav-link btn-block mb-2 text-left btn', {
    'btn-primary': id === currentChannelId,
    'btn-light': id !== currentChannelId,
  });
  return (
    <Nav.Item key={id}>
      <button type="button" className={classes} onClick={handleChannel}>
        {name}
      </button>
    </Nav.Item>
  );
};

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();

  const handleChannel = (channelId) => () =>
    dispatch(setCurrentChannelId({ channelId }));

  return (
    <>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">
          +
        </button>
      </div>
      <Nav className="flex-column nav-pills nav-fill">
        {channels.length > 0 &&
          channels.map(({ id, name }) =>
            buildNavItem(id, name, currentChannelId, handleChannel(id))
          )}
      </Nav>
    </>
  );
};

export default Channels;
