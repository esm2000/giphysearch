import React, { Component } from 'react';
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
                <br/>
                <button id="trendingBtn">Trending</button>
                <button id="randomBtn">Random</button>
                
            </div>
        );
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

        this.test();

    }

    test = () => {
        console.log(this.state.gifs)
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

    // this function 
    getUrls = () => {
        this.getSearchData(this.state.searchTerm).then((data) => {
            
            let urls = []
            
            for(let i = 0; i < data.data.length; i++){
                urls.push(data.data[i].url)
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