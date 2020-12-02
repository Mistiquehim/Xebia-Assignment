import React, { Component } from 'react';
import { Debounce } from 'react-throttle';

class Search extends Component {
    render() {
        const { filterUpdate } = this.props
        return (
            <form>
                <Debounce time="400" handler="onChange">
                    <input
                        type='text'
                        className="search-box"
                        ref='filterInput'
                        placeholder='Search Planet..'
                        onChange={() => {
                            filterUpdate(this.refs.filterInput.value)
                        }}
                    />
                </Debounce>
            </form>
        )
    }
}

export default Search;