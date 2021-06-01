import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LyricSong extends Component {
    constructor(props){
        super(props)
        this.state= {
            lyrics: ''
        }
    }

    onAddLyrics() {
        this.props.mutate({ 
            variables: { 
                id: this.props.idSong, 
                content: this.state.lyrics 
            } })

            this.setState({ lyrics: "" })
    }

    onSubmitHandler(e){
        e.preventDefault()
    }

    render() {
        
        return(
            <div>
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                    <label>Add your lyrics</label>
                    <input 
                    onChange={(e) => this.setState({ lyrics: e.target.value })}
                    value={this.state.lyrics}
                    />
                </form>
                <button
                onClick={() => this.onAddLyrics()}
                ><i className="material-icons">add</i></button>
            </div>
        )
    }
}

const mutation = gql`
mutation onAddLyrics($content: String, $id: ID){
  addLyricToSong(content: $content, songId: $id){
    id
    title
    lyrics{
      id
      content
    }
  }
}
`

export default graphql(mutation)(LyricSong)