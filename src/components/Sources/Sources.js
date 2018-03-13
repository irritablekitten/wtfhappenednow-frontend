import React, { Component } from 'react';
import {Grid, Row} from 'react-bootstrap';
import './Sources.css';
//really long list of 40 sources and their attributes
const sourceArray = [
    {id: 'abc-news',
    name: 'ABC News',
    url: 'https://abcnews.go.com'}, 
    {id: 'al-jazeera-english', 
    name: 'Al Jazeera', 
    url: 'https://www.aljazeera.com'}, 
    {id: 'bbc-news',
    name: 'BBC News',
    url: 'https://www.bbc.com/news'}, 
    {id: 'associated-press',
    name: 'Associated Press',
    url: 'https://www.apnews.com'}, 
    {id: 'axios',
    name: 'Axios',
    url: 'https://www.axios.com'}, 
    {id: 'bloomberg',
    name: 'Bloomberg',
    url: 'https://www.bloomberg.com'}, 
    {id: 'business-insider',
    name: 'Business Insider',
    url: 'https://www.businessinsider.com'}, 
    {id: 'cbs-news',
    name: 'CBS News',
    url: 'https://www.cbsnews.com'},
    {id: 'cnbc',
    name: 'CNBC',
    url: 'https://www.cnbc.com'},
    {id: 'cnn',
    name: 'CNN',
    url: 'https://www.cnn.com'}, 
    {id: 'crypto-coins-news',
    name: 'CCN',
    url: 'https://www.ccn.com'}, 
    {id: 'daily-mail',
    name: 'Daily Mail',
    url: 'https://www.dailymail.co.uk'}, 
    {id: 'engadget',
    name: 'Engadget',
    url: 'https://www.engadget.com'}, 
    {id: 'fortune',
    name: 'Fortune',
    url: 'https://fortune.com'}, 
    {id: 'google-news',
    name: 'Google News',
    url: 'https://news.google.com'}, 
    {id: 'hacker-news',
    name: 'Hacker News',
    url: 'https://news.ycombinator.com'}, 
    {id: 'msnbc',
    name: 'MSNBC',
    url: 'https://www.msnbc.com'}, 
    {id: 'national-geographic',
    name: 'National Geographic',
    url: 'https://www.nationalgeographic.com'}, 
    {id: 'nbc-news',
    name: 'NBC News',
    url: 'https://www.nbcnews.com'}, 
    {id: 'new-scientist',
    name: 'New Scientist',
    url: 'https://www.newscientist.com'}, 
    {id: 'newsweek',
    name: 'Newsweek',
    url: 'https://www.newsweek.com'}, 
    {id: 'new-york-magazine',
    name: 'New York Magazine',
    url: 'https://nymag.com'}, 
    {id: 'politico',
    name: 'Politico',
    url: 'https://www.politico.com'},  
    {id: 'recode',
    name: 'Recode',
    url: 'https://www.recode.net'}, 
    {id: 'reuters',
    name: 'Reuters',
    url: 'https://www.reuters.com'}, 
    {id: 'techcrunch',
    name: 'TechCrunch',
    url: 'https://techcrunch.com'}, 
    {id: 'techradar',
    name: 'TechRadar',
    url: 'https://www.techradar.com'}, 
    {id: 'the-economist',
    name: 'The Economist',
    url: 'https://www.economist.com'}, 
    {id: 'the-guardian-uk',
    name: 'The Guardian',
    url: 'https://www.theguardian.com/us'}, 
    {id: 'the-hill',
    name: 'The Hill',
    url: 'https://thehill.com'}, 
    {id: 'the-huffington-post',
    name: 'HuffPost',
    url: 'https://www.huffingtonpost.com'}, 
    {id: 'the-new-york-times',
    name: 'New York Times',
    url: 'https://www.nytimes.com'}, 
    {id: 'the-next-web',
    name: 'TNW',
    url: 'https://thenextweb.com'}, 
    {id: 'the-verge',
    name: 'The Verge',
    url: 'https://www.theverge.com'}, 
    {id: 'the-wall-street-journal',
    name: 'Wall Street Journal',
    url:'https://www.wsj.com'}, 
    {id: 'the-washington-post',
    name: 'Washington Post',
    url: 'https://www.washingtonpost.com'},
    {id: 'time',
    name: 'Time',
    url: 'https://time.com'}, 
    {id: 'usa-today',
    name: 'USA Today',
    url: 'https://www.usatoday.com'}, 
    {id: 'vice-news',
    name: 'Vice News',
    url: 'https://news.vice.com'}, 
    {id: 'wired',
    name: 'WIRED',
    url: 'https://www.wired.com/'}];


class Sources extends Component  {

//creates array of sources using the source id to check for a match and adds the proper name, along with the source url to the array
compareSources(compareSource) {
    let data = [];
    for (let source in sourceArray) {
        if (sourceArray[source].id === compareSource) {
            data.push(sourceArray[source].name, sourceArray[source].url);
            return data;
        }
    }
}

//creates a source button with proper name and source url
makeButton(origSource) {
    let data = this.compareSources(origSource);
    let button = `<a className='source-link' key=${data[0]} href=${data[1]} target="_blank">&nbsp;${data[0]}&nbsp;</a>&nbsp;`;
    return button;
}

//refreshes sources and adds them individually to the top-level source div
componentDidUpdate() {
    document.querySelector('.source').innerHTML = '<a>Frequently appearing:&nbsp;</a>&nbsp;';
    let buttons = [];
    if (this.props.sources !== undefined && this.props.sources !=='') {
     let temp = this.props.sources.slice(0, 12).map((source, c) => buttons.push(this.makeButton(source[0])))
    }
    for (let i in buttons) {
        document.querySelector('.source').innerHTML += buttons[i];
    }
}

render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <div className="source">
                        <a>Frequently appearing:</a>&nbsp;
                        </div>
                    </Row>
                </Grid>
            </div>
        );
    }   
}

export default Sources