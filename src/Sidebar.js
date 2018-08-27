import React, { Component } from 'react';

export  class Sidebar extends Component {
    render() {
        return (
            <aside className="sidebar">
                <input type="text" onChange={this.props.onChange} value={this.props.filter}/>
                {this.props.locations.filter((loc) => loc.lcname.indexOf(this.props.filter) !== -1 ).map((loc) => 
                    <button className={this.props.selected === loc ? "selected" : ""} key={loc.name} onClick={ () => this.props.onSelect(loc)}>{loc.name}</button> )}
                     <i>Data powered by Foursquare</i>
            </aside>    
        )

    }
}