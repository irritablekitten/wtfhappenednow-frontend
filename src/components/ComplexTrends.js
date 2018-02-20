import React, { Component } from 'react';
import _ from 'lodash';
import Wordcloud from 'wordcloud';
import {Grid, Row, Col} from 'react-bootstrap';


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
        twelveAgo: messages[0]
    });  
  }

  componentWillMount() {
    let app = this.props.db.database().ref('/newsdata/1d3V3Yd3CRen8aqYTrXx/results');
    app.limitToLast(13).on('value', snapshot => {
      this.getData(snapshot.val()); 
    });
    
  }

  componentDidUpdate() {
    Wordcloud(
      this.refs["currentwordcount"],
      {list: this.state.current.wordcount.slice(0, 50),
        gridSize: Math.round(16 * document.querySelector('.canvas').style.width / 1024),
        fontFamily: 'Times, serif', 
        weightFactor: 3}  
    );
    Wordcloud(
      this.refs["sixagowordcount"],
    {list: this.state.sixAgo.wordcount.slice(0, 50),
      gridSize: Math.round(16 * document.querySelector('.canvas').style.width / 1024),
      fontFamily: 'Times, serif',
    weightFactor: 3}
    );
    Wordcloud(
      this.refs["twelveagowordcount"],
    {list: this.state.twelveAgo.wordcount.slice(0, 50),
      gridSize: Math.round(16 * document.querySelector('.canvas').style.width / 1024),
      fontFamily: 'Times, serif',
      weightFactor: 3}
    );
  }

  render() {
  return (
  <div className="trends">
    <Grid>
      <Row className="show-grid">
      <Col xs={8} md={4}>
          <div className="current-trend">
            <h4><strong>Now: {this.state.current.fulldate}</strong></h4>
            <canvas ref="currentwordcount" className="canvas"/>
          </div>
        </Col>

        
        <Col xs={8} md={4}>
          <div className="six-ago-trend">
              <h5>6hrs: {this.state.sixAgo.fulldate}</h5>
              <canvas ref="sixagowordcount" className="canvas"/>
            </div>
        </Col>

        <Col xs={8} md={4}>
          <div className="twelve-ago-trend">
              <h5>12hrs: {this.state.twelveAgo.fulldate}</h5>
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