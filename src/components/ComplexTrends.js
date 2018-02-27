import React, { Component } from 'react';
import _ from 'lodash';
import Wordcloud from 'wordcloud';
import {Grid, Row, Col} from 'react-bootstrap';
import logo from './wtfnow.gif';
import '../css/ComplexTrends.css';


class ComplexTrends extends Component  {
  constructor(props){
    super(props);
    this.state = {
      current: {},
      sixAgo: {},
      twelveAgo: {}
    };
  }
  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
    this.setState({
        current: messages[12],
        sixAgo: messages[6],
        twelveAgo: messages[0],
        twentyFour: messages
    });  
  }

  pickWeight(list) {
    console.log(list[0][1], list[1][1]);
    if (list[0][1] > 40 && list[1][1] > 20) {
      return 1;
    }
    else if (list[0][1] > 25) {
      return 2;
    }
    else {
      return 3;
    }
  }

  getTotals() {
    let copy = this.state.twentyFour;
    copy.map(trend => {
      console.log(trend);
    })
  }

  componentWillMount() {
    let app = this.props.db.database().ref('/newsdata/1d3V3Yd3CRen8aqYTrXx/results');
    app.limitToLast(24).on('value', snapshot => {
      this.getData(snapshot.val()); 
    });
    
  }

  componentDidUpdate() {
    Wordcloud(
      this.refs["currentwordcount"],
      {list: this.state.current.wordcount.slice(0, 50),
        gridSize: Math.round(16 * document.querySelector('.canvas').style.width / 1024),
        fontFamily: 'Times, serif', 
        weightFactor: this.pickWeight(this.state.current.wordcount)}  
    );
    Wordcloud(
      this.refs["sixagowordcount"],
    {list: this.state.sixAgo.wordcount.slice(0, 50),
      gridSize: Math.round(16 * document.querySelector('.canvas').style.width / 1024),
      fontFamily: 'Times, serif',
    weightFactor: this.pickWeight(this.state.sixAgo.wordcount)}
    );
    Wordcloud(
      this.refs["twelveagowordcount"],
    {list: this.state.twelveAgo.wordcount.slice(0, 50),
      gridSize: Math.round(16 * document.querySelector('.canvas').style.width / 1024),
      fontFamily: 'Times, serif',
      weightFactor: this.pickWeight(this.state.twelveAgo.wordcount)}
    );

    let spinners = document.querySelectorAll('.App-logo');
    for (let i = 0; i < spinners.length; i++) {
      spinners[i].style.display = 'none';
    }

    this.getTotals();
  }

  render() {
  return (
  <div className="trends">
    <Grid>
      <Row className="show-grid">
      <Col xs={8} md={4}>
          <div className="current-trend">
            <h4><strong>Now: {this.state.current.fulldate}</strong></h4>
            <img src={logo} className="App-logo" alt="LOADING..." />
            <canvas ref="currentwordcount" className="canvas"/>
          </div>
        </Col>

        
        <Col xs={8} md={4}>
          <div className="six-ago-trend">
              <h5><strong>6hrs: {this.state.sixAgo.fulldate}</strong></h5>
              <img src={logo} className="App-logo" alt="LOADING..." />
              <canvas ref="sixagowordcount" className="canvas"/>
            </div>
        </Col>

        <Col xs={8} md={4}>
          <div className="twelve-ago-trend">
              <h5><strong>12hrs: {this.state.twelveAgo.fulldate}</strong></h5>
              <img src={logo} className="App-logo" alt="LOADING..." />
            <canvas ref="twelveagowordcount" className="canvas" />
          </div>
        </Col>
      </Row>
    </Grid>
    </div>
    );
  }
}

export default ComplexTrends