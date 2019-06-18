import React, { Component } from 'react';
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Content from '../components/utility/Content/Content'

class IndexPage extends Component {
  constructor(props) {
    super(props);
     this.state = {
       matchTime:0,
       dropChance:10,
       parts:0,
       gameTime:0,
       numOfGames: 0
      }
      this.mainCalc=this.mainCalc.bind(this)
      this.changeHandler=this.changeHandler.bind(this)
  }

// this calulates the amount of games that you will have to play to get one card
  mainCalc(){
    let pren=true
    let q= 0
    const chance = (100 - this.state.dropChance) / 100
    while(pren){
      let chancenow= Number(String(1 - Math.pow(chance,q)).substr(0,4 ))
      q++
      console.log(q,"q", chancenow, "chancenow");
      
      if(chancenow== 0.99 || q==4000){

        pren=false
      }
    }
    const nOfGames= q-1
    const total= (this.state.matchTime * nOfGames) * this.state.parts
    this.setState({gameTime:total,numOfGames:nOfGames})
    console.log(nOfGames)
    
  }

// this is just a change handler to update the state
  changeHandler(e){
    const target = e.target;
    const value = parseInt(target.value)
    const name = target.name;

    this.setState({
      [name]: value
    });   
  }
  render() {
    return (
      <div className="body" style={{display: "flex", flexDirection: "column"}}>
        <label>
          Match Time
          <input type="text" onChange={this.changeHandler} name='matchTime' />
          min
        </label>
        <label>
          Drop Chance (in %) eg: {this.state.dropChance}%
          <input type="text" onChange={this.changeHandler} name='dropChance'/>
        </label>
        <label>
            Parts of a single card
            <input type="text" onChange={this.changeHandler} name='parts'/>
        </label>
        <button onClick={this.mainCalc}>get the playtime</button>
        <p>number of games per part: {this.state.numOfGames} number of games per card: {this.state.numOfGames * this.state.parts}</p>
        <p>{this.state.gameTime}min / {String(this.state.gameTime/60).substr(0, 6)} hrs</p>
      </div>
    );
  }
}

export default IndexPage;