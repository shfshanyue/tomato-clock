import React, { Component } from 'react'
import Clock from './Components/Clock'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props) 
    this.state = {
      status: 'CLEAR' 
    }
    this.handleStart = this.handleStart.bind(this)
  }

  handleStart () {
    this.setState({
      status: 'FOCUS' 
    }) 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">番茄</h1>
          <Clock status={this.state.status} />
          <button onClick={() => this.setState({ status: 'FOCUS' })}>开始</button>
          <button onClick={() => this.setState({ status: 'CLEAR' })}>结束</button>
        </header>
      </div>
    );
  }
}

export default App;
