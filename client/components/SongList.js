import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'
import '../style/style.css'

class SongList extends Component {

    onSongDelete(id) {
        this.props.mutate({ variables: { id } })
            .then(() => this.props.refetch())
    }

    renderSongs(){
        return this.props.data.songs.map(({ id, title }) => {
            return(
                <li key={id}
                 className="collection-item"
                 onClick={() => hashHistory.push(`/songs/${id}`)}
                 >
                    {title}
                    <i
                    className="material-icons"
                    onClick={() => this.onSongDelete(id)}
                    >delete</i>
                </li>
            )
        })
    }

    render(){
        if(this.props.data.loading) { return <div>Loading...</div> }

        return(
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link
                to="/songs/new"
                className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

const mutation = gql`
mutation DeleteSong($id:ID){
    deleteSong(id:$id){
        title
    }
}
`

export default graphql(mutation)(
graphql(query)(SongList))