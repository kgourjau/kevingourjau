import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout.js'
import FakeData from '../../components/fakeData/fakeData.js'

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
            <Layout>
                <h1>Nasa Api</h1>
                <p>A page fetching nasa website api using getInitialProps</p>
                <div>
                    {this.props.title}
                </div>
                <div>
                    <img src={this.props.imageUrl} />
                </div>
                <FakeData k={10}/>
            </Layout>
        )
    }
}