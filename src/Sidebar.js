import React, { Component } from 'react';

export  class Sidebar extends Component {
    render() {
        return (
            <aside className="sidebar">
            {this.props.locations.map((loc) => <p key={loc.name}>{loc.name}</p> )}
            </aside>    
        )

    }
}
