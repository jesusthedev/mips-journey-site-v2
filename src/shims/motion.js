// src/shims/motion.js
import React from 'react';

export const motion = new Proxy({}, {
  get: (_, tag) => (props = {}) => {
    const Tag = tag || 'div';
    const { children, ...rest } = props;
    return React.createElement(Tag, rest, children);
  }
});

export const AnimatePresence = ({ children }) =>
  React.createElement(React.Fragment, null, children);

