// src/shims/motion.js
import * as React from 'react';

export const motion = new Proxy({}, {
  get: (_, tag) => {
    return function MotionShim(props = {}) {
      const Tag = tag || 'div';
      const { children, ...rest } = props;
      return React.createElement(Tag, rest, children);
    };
  }
});

export const AnimatePresence = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};
