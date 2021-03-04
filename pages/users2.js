import Layout from '../components/layout.js'
import {Table} from 'react-bootstrap'

function MyTable({data}) {
    console.log(data.map((item) => {
        return Object.entries(item).map(([v, k]) => {
            return <td>{v}</td>
        })
    }))
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Post</th>
                <th>Phone</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map((item,key) => {
                    return (
                        <tr>
                            <td>{key}</td>
                            {Object.entries(item).map(([k,v]) => {
                                return <td>{v}</td>
                            })}
                        </tr>
                    )
                })
            }
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            </tbody>
        </Table>
    )
}

const Users = ({data}) => (
    <Layout>
        <h1>Users</h1>
        <p>A page getting a list of users from Mongo DB database using server side props and fetching page /api/users</p>
        <p>Data is rendered using component Table from react-bootstrap</p>
        <p>Please note that this is fake data</p>
        <MyTable data={data}/>
    </Layout>
)

export async function getServerSideProps({req}) {
    // const url = process.env.HOST + "/api/users"
    // const res = await fetch(url)
    // const data = await res.json()

    return {props: {data:[]}}
}

export default Users
