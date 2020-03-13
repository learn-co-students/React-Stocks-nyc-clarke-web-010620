import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stock: [],
    bought: [],
    displaystock: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks").then(resp => resp.json()).then(
      resp => this.setState({stock: resp, displaystock: resp})
    )
  }

  buyStock = (stock) => {
    this.setState({
      bought: [...this.state.bought, stock]
    })
  }

  sellStock = (stockToRemove) => {
    this.setState({
      bought: (this.state.bought.filter(stock=> stock.id !== stockToRemove.id))
    })
  }

  filterStock = (search) =>{
    switch (search){
      case "All":
        this.setState({displaystock: this.state.stock})
        break;
      case "Tech":
        this.setState({displaystock: this.state.stock.filter(stock=>stock.type == "Tech")})
        break;
      case "Sportswear":
        this.setState({displaystock: this.state.stock.filter(stock=>stock.type == "Sportswear")})
        break;
      case "Finance":
        this.setState({displaystock: this.state.stock.filter(stock=>stock.type == "Finance")})
        break;
    }
  }
  
  sortByAlpha = () =>{
    this.setState({displaystock: this.state.displaystock.sort((a,b)=> a.name > b.name ? 1 : -1)})
  }

  sortByPrice = () =>{
    this.setState({displaystock: this.state.stock.sort((a,b) => a.price - b.price)})
  }
  
  
  render() {
    return (
      <div>
        <SearchBar sortByAlpha={this.sortByAlpha} sortByPrice={this.sortByPrice} filterStock={this.filterStock}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.displaystock} buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.bought} sellStock={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
