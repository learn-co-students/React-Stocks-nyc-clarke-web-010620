import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  state = {
    stockIndex: []
  }

  componentDidMount() {
    this.fetchIndex()
  }
  
  fetchIndex = () => {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(stocks => console.log(stocks))
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          //render the list of stocks here
        }
      </div>
    );
  }

}

export default StockContainer;
