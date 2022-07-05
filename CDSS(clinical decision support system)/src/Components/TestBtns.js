import React, { Component } from 'react'

export default class TestBtns extends Component {
  render() {
    return (
      <div className='test_btns'>
        <span onClick={() => this.props.Drug1()}>Drug 1</span>
        <span onClick={() => this.props.Drug2()}>Drug 2</span>
      </div>
    )
  }
}
