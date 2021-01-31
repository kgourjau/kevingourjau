import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'

export default class extends Component {
  static async getInitialProps() {
    const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    const data = await res.json()

    return {
      title: data.title,
      imageUrl: data.url
    }
  }

  render () {
    return (
        <div>
            <ul>
                <li>
                    <a href="/api/login">Login</a>
                </li>
                <li>
                    <a href="/api/logout">Logout</a>
                </li>
            </ul>
          <div>
            {this.props.title}
          </div>
          <div>
            <img src={this.props.imageUrl} />
          </div>
        </div>
    )
  }
}