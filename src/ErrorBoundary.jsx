import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false, err:null } }
  static getDerivedStateFromError(err){ return { hasError:true, err } }
  componentDidCatch(err, info){ console.error('App crashed:', err, info) }
  render(){
    if(this.state.hasError){
      return (
        <div style={{padding:'2rem'}}>
          <h2 style={{margin:0}}>Something tripped on the tape.</h2>
          <p style={{opacity:.7}}>Reload, or ping the goblin who wrote this.</p>
        </div>
      )
    }
    return this.props.children
  }
}
