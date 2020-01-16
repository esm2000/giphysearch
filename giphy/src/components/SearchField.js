import React, { Component } from 'react';
import GifCard from './GifCard'
import './SearchField.css'

class SearchField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: "",
            searchTerms: "",
            apiKey: "GdnM68Q3Rg5RsJhuUTTpGbs9jfZB2F13",
            gifs: []
        }
    }

    render() {
        return (
            <div className="container">
                <input
                    type="text"
                    value={this.state.searchField}
                    onChange={this.updateSearchTerms.bind(this)}
                    placeholder="..."/>
                <button 
                    id="searchBtn"
                    onClick={this.getSearchResults}>Search</button>
                <button 
                    id="trendingBtn"
                    onClick={this.getTrendingResults}>Trending</button>
                <button 
                    id="randomBtn"
                    onClick={this.getRandomResults}>Random</button>
                {this.getGifs()}
            </div>
        );
    }

    // This function creates the gif card objects
    getGifs = () => {
        return this.state.gifs.map( (url ) => {
            return (
                <GifCard
                    url={url}
                />
            );
        });
    }

    // this function records the value of the search field
    updateSearchTerms = (e) => {
        let searchField = e.target.value;
        let searchTerms = searchField.toUpperCase();

        this.setState({
            searchField: searchField,
            searchTerms: searchTerms
        });
    }

    // this function gets the search results and updates the state
    getSearchResults = () => {
        
        this.processSearchTerms();

        this.getUrls();

    }

    getTrendingResults = () => {
        this.getTrendingData().then((data) => {
            
            let urls = []
            
            console.log(data)
            for(let i = 0; i < data.data.length; i++){
                urls.push(data.data[i].images.fixed_height.url)
            }
            
            this.setState({
                gifs: urls
            });

        }).catch((err) => {
            console.log(err.message)
        })
    }

    getRandomResults = () => {
        this.getRandomGifData().then((data) => {
            
            let urls = []
            
            console.log(data)
            
            urls.push(data.data.images.fixed_height.url)
            
            this.setState({
                gifs: urls
            });

        }).catch((err) => {
            console.log(err.message)
        })
    }
    
    // this function replaces the spaces in the search terms with '+'
    processSearchTerms = () => {
        let searchTerms = this.state.searchTerms.replace(/ /g, '+')

        console.log(searchTerms);

        this.setState({
            searchTerms: searchTerms
        })
    }

    // this function obtains gifs related to search terms
    getSearchData = () => {
        return fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.searchTerms}&api_key=${this.state.apiKey}`).then((response) => {
            if(response.status === 200) {
                return response.json()
            } else {
                throw new Error('Couldn\'t connect to server')
            }
        }).then((data) => {
            return data
        })
    }

    // this function obtains trending gifs
    getTrendingData = () => {
        return fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${this.state.apiKey}`).then((response) => {
            if(response.status === 200) {
                return response.json()
            } else {
                throw new Error('Couldn\'t connect to server')
            }
        }).then((data) => {
            return data
        })
    }

    // this function obtains a random gif
    getRandomGifData = () => {
        return fetch(`http://api.giphy.com/v1/gifs/random?api_key=${this.state.apiKey}`).then((response) => {
            if(response.status === 200) {
                return response.json()
            } else {
                throw new Error('Couldn\'t connect to server')
            }
        }).then((data) => {
            return data
        })
    }

    // this function updates the state with the search urls
    getUrls = () => {
        this.getSearchData().then((data) => {
            
            let urls = []
            
            console.log(data)
            for(let i = 0; i < data.data.length; i++){
                urls.push(data.data[i].images.fixed_height.url)
            }
            
            this.setState({
                gifs: urls
            });

        }).catch((err) => {
            console.log(err.message)
        })
    }
}   

export default SearchField;