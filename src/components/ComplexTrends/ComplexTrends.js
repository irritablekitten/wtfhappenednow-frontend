import React, { Component } from 'react';
import _ from 'lodash';
import Wordcloud from 'wordcloud';
import moment from 'moment';
import {Grid, Row, Col} from 'react-bootstrap';
import logo from './wtfnow.gif';
import './ComplexTrends.css';
import Sources from '../Sources/Sources';

class ComplexTrends extends Component  {
  constructor(props){
    super(props);
    this.state = {
      current: {},
      sixAgo: {},
      twelveAgo: {},
      twentyFour: {},
      dailySourceTrend: {}
    };
  }

  //get pieces of data from db results and set state
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
        twentyFour: messages,
        dailySourceTrend: this.getSourceTotals(messages)
    });  
  }

  //return a number for the font weight of every cloud, based on the trend sizes at the time
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

  //return a number for the big word cloud's font weight
  pickBigWeight(list) {
    if (list[0][1] > 100 && list[1][1] > 80 && list[2][1] > 70 && list[3][1] > 60 && list[4][1]) {
      return 0.5;
    }
    else if (list[0][1] > 80 && list[19][1] > 40 && list[29][1] > 30)  {
      return 1;
    }
    else if (list[0][1] > 60 && list[19][1] > 20 && list[29][1] > 10) {
      return 1.1;
    }
    else if (list[0][1] > 40 && list[19][1] > 10 && list[29][1] > 4) {
      return 1.2;
    }
    else {
      return 1.5;
    }
  }

  //adds the last 24 records together, finding matches between words and updating the total count for each
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

  //adds the last 24 source records together
  getSourceTotals(copy) {
    let newObj = {};
    let newArray = [];
    copy.map(function(trend) {
      for (let firstCount in trend.sourcecount.slice(0, 5)) {
        for (let secondCount in trend.sourcecount.slice(0, 5)) {
          if (trend.sourcecount[firstCount][0] === trend.sourcecount[secondCount][0]) {
            let trendSource = trend.sourcecount[firstCount][0];
            let total = {
              source: trendSource,
              count: trend.sourcecount[firstCount][1] + trend.sourcecount[secondCount][1]
            };
            newObj[trendSource] = total;
          }
        }
      }
    })
    for(let singleTrend in newObj) {
      let temp = [newObj[singleTrend].source, newObj[singleTrend].count];
      newArray.push(temp);
    }
    newArray.sort(function(a, b) {
      return b[1] - a[1];
    });
    return newArray;
  }

  //runs when the word clouds update every hour to present the new trends, and updates the moment timestamps to reflect that //useful when browser is left open
  updateTime() {
    document.querySelectorAll('h4')[0].innerHTML = 'Hourly: ' + moment().format('LT');
    document.querySelectorAll('h4')[1].innerHTML = '6hrs ago: ' + moment().subtract(6, 'hours').format('LT');
    document.querySelectorAll('h4')[2].innerHTML = '12hrs ago: ' + moment().subtract(12, 'hours').format('LT');
  }

  //grab data from db
  componentWillMount() {
    let app = this.props.db.database().ref('/newsdata/1d3V3Yd3CRen8aqYTrXx/results');
    app.limitToLast(25).on('value', snapshot => {
      this.getData(snapshot.val()); 
    });
    
  }
  //calculates word clouds when the page loads and when a new trend is posted to the db
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

    let dailyTrend = this.getTotals();
    Wordcloud(
      this.refs["dailytrend"],
    {list: dailyTrend,
      gridSize: Math.round(16 * document.querySelector('.big-canvas').style.width / 1024),
      fontFamily: 'Times, serif',
      weightFactor: this.pickBigWeight(dailyTrend)}
    );

    let spinners = document.querySelectorAll('.App-logo');
    for (let i = 0; i < spinners.length; i++) {
      spinners[i].style.display = 'none';
    }
    this.updateTime();
    console.log('Server timestamp: ' + this.state.current.fulldate);
  }

  render() {
  return (
  <div>
    <Sources sources={this.state.dailySourceTrend} />
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
            <h4><strong>Hourly: </strong></h4>
            <img src={logo} className="App-logo" alt="LOADING..." />
            <canvas ref="currentwordcount" className="canvas"/>
          </div>
        </Col>

        <Col md={4}>
          <div className="six-ago-trend trend">
              <h4><strong>6hrs ago: </strong></h4>
              <img src={logo} className="App-logo" alt="LOADING..." />
              <canvas ref="sixagowordcount" className="canvas"/>
            </div>
        </Col>

        <Col md={4}>
          <div className="twelve-ago-trend trend">
              <h4><strong>12hrs ago: </strong></h4>
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