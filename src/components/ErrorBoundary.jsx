import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'white', padding: '2rem' }}>
          <h2>⚠️ Something tripped on the tape.</h2>
          <p>Reload, or ping the goblin who wrote this.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
