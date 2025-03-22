import React from "react";

class Search extends React.Component {
    state = {
        search: '',
    };

    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.props.searchMovies(this.state.search);
        }
    }

    handleSearch = () => {
        this.props.searchMovies(this.state.search);
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="input-field">
                        <input 
                            className="validate"
                            placeholder="Search"
                            type="search" 
                            value={this.state.search}
                            onChange={(e) => this.setState({ search: e.target.value })}
                            onKeyDown={this.handleKey}
                        />
                        <button 
                            className="btn search-btn deep-purple accent-1"
                            onClick={this.handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export { Search };