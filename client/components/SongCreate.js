import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'

class SongCreate extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
        }
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.mutate({
            variables: { title: this.state.title },
            refetchQueries: [{ query: query }]
        })
            .then(() => hashHistory.push('/'))
                .catch( e => console.log(e) )
    }

    render(){
        return(
            <div>
                <Link
                to="/"
                >
                 back
                </Link>
                <h3>Create a new song</h3>
                <form>
                    <label>Song title:</label>
                    <input
                    onChange={(e) => this.setState({ title: e.target.value })}
                    value={this.state.title}
                    />
                    <button className="btn"  onClick={this.onSubmit.bind(this)}>add</button>
                </form>
            </div>
        )
    }

}

const mutation = gql`
mutation Addsong($title: String){
  addSong(title: $title){
    id
    title
  }
}
`

export default graphql(mutation)(SongCreate)