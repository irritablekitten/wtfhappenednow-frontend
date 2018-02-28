import React, { Component } from 'react';
import _ from 'lodash';
import Wordcloud from 'wordcloud';
import moment from 'moment';
import {Grid, Row, Col} from 'react-bootstrap';
import logo from './wtfnow.gif';
import '../css/ComplexTrends.css';


class ComplexTrends extends Component  {
  constructor(props){
    super(props);
    this.state = {
      current: {},
      sixAgo: {},
      twelveAgo: {},
      twentyFour: {}
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
        current: messages[24],
        sixAgo: messages[18],
        twelveAgo: messages[12],
        twentyFour: messages
    });  
  }

  pickWeight(list) {
    if (list[0][1] > 40 && list[1][1] > 20) {
      return 1;
    }
    else if (list[0][1] > 24 && list[1][1] > 10) {
      return 2;
    }
    else if (list[0][1] > 12) {
      return 3;
    }
    else {
      return 4;
    }
  }

  getTotals() {
    let copy = this.state.twentyFour;
    let newObj = {};
    let newArray = [];
    copy.map(function(trend) {
      for (let firstCount in trend.wordcount.slice(0, 10)) {
        for (let secondCount in trend.wordcount.slice(0, 10)) {
          if (trend.wordcount[firstCount][0] === trend.wordcount[secondCount][0]) {
            let trendWord = trend.wordcount[firstCount][0];
            let total = {
              word: trendWord,
              count: trend.wordcount[firstCount][1] + trend.wordcount[secondCount][1]
            };
            newObj[trendWord] = total;
          }
        }
      }
    })
    for(let singleTrend in newObj) {
      let temp = [newObj[singleTrend].word, newObj[singleTrend].count];
      newArray.push(temp);
    }
    newArray.sort(function(a, b) {
      return b[1] - a[1];
    });
    return newArray;
  }

  componentWillMount() {
    let app = this.props.db.database().ref('/newsdata/1d3V3Yd3CRen8aqYTrXx/results');
    app.limitToLast(25).on('value', snapshot => {
      this.getData(snapshot.val()); 
    });
    
  }

  componentDidUpdate() {
    Wordcloud(
      this.refs["currentwordcount"],
      {list: this.state.current.wordcount.slice(0, 50),
        gridSize: Math.round(16 * document.querySelector('.canvas').style.width / 1024),
        fontFamily: 'Times, serif', 
        weightFactor: this.pickWeight(this.state.current.wordcount),
        backgroundColor: '#000',
      color: 'random-light'}  
    );
    Wordcloud(
      this.refs["sixagowordcount"],
    {list: this.state.sixAgo.wordcount.slice(0, 50),
      gridSize: Math.round(16 * document.querySelector('.canvas').style.width / 1024),
      fontFamily: 'Times, serif',
    weightFactor: this.pickWeight(this.state.sixAgo.wordcount),
    backgroundColor: '#000',
    color: 'random-light'}
    );
    Wordcloud(
      this.refs["twelveagowordcount"],
    {list: this.state.twelveAgo.wordcount.slice(0, 50),
      gridSize: Math.round(16 * document.querySelector('.canvas').style.width / 1024),
      fontFamily: 'Times, serif',
      weightFactor: this.pickWeight(this.state.twelveAgo.wordcount),
    backgroundColor: '#000',
    color: 'random-light'}
    );
    Wordcloud(
      this.refs["dailytrend"],
    {list: this.getTotals(),
      gridSize: Math.round(16 * document.querySelector('.big-canvas').style.width / 1024),
      fontFamily: 'Times, serif',
      weightFactor: 0.75}
    );

    let spinners = document.querySelectorAll('.App-logo');
    for (let i = 0; i < spinners.length; i++) {
      spinners[i].style.display = 'none';
    }
    console.log('Server timestamp: ' + this.state.current.fulldate + ' PDT');
  }

  render() {
  let now = moment().format('LT');
  let sixHours = moment().subtract(6, 'hours').format('LT');
  let twelveHours = moment().subtract(12, 'hours').format('LT');
  return (
  <div>
    <Grid>
      <Row>
        <div className="daily-trend trend">
        <canvas ref="dailytrend" className="big-canvas" height="300" width="300"/>
        </div>
      </Row>
    </Grid>
    <Grid>
      <Row className="show-grid">
      <Col md={4}>
          <div className="current-trend trend">
            <h4><strong>Hourly: {now}</strong></h4>
            <img src={logo} className="App-logo" alt="LOADING..." />
            <canvas ref="currentwordcount" className="canvas"/>
          </div>
        </Col>

        <Col md={4}>
          <div className="six-ago-trend trend">
              <h4><strong>6hrs ago: {sixHours}</strong></h4>
              <img src={logo} className="App-logo" alt="LOADING..." />
              <canvas ref="sixagowordcount" className="canvas"/>
            </div>
        </Col>

        <Col md={4}>
          <div className="twelve-ago-trend trend">
              <h4><strong>12hrs ago: {twelveHours}</strong></h4>
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