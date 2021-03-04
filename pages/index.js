import Layout from '../components/layout_home.js'
import CustomCardList from '../components/card/customCardList.js'
import Services from '../components/card/services.js'
import CustomSection from '../components/section/customSection.js'
import '@fortawesome/fontawesome-free/css/all.css'
import React from 'react'
import {Container, Row} from "react-bootstrap";
import {useRouter} from 'next/router'

const elements = [
    {
        img_url: '/team-1.jpg',
        title: 'Adam White',
        subtitle: 'Founder Ceo',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
        img_url: '/team-2.jpg',
        title: 'Jasmine Done',
        subtitle: 'Web Designer',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
        img_url: '/team-3.jpg',
        title: 'Mike White',
        subtitle: 'Developer',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
        img_url: '/team-4.jpg',
        title: 'Jarl Doe',
        subtitle: 'Photgrapher',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    }
]
const services = [
    {
        img_url: '/team-1.jpg',
        title: 'Branding',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        icon_name: 'fas fa-gem'
    },
    {
        img_url: '/team-2.jpg',
        title: 'Web Design',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        icon_name: 'fas fa-desktop'
    },
    {
        img_url: '/team-3.jpg',
        title: 'Photography',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        icon_name: 'fas fa-camera'
    },
    {
        img_url: '/team-3.jpg',
        title: 'Graphic Design',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        icon_name: 'fab fa-pied-piper-square'
    },
    {
        img_url: '/team-3.jpg',
        title: 'Development',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        icon_name: 'fas fa-keyboard'
    },
    {
        img_url: '/team-3.jpg',
        title: 'Mobile Apps',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        icon_name: 'fas fa-mobile-alt'
    },
]


function FakeData() {
    const items = [];
    for (let i = 0; i < 1; i++) {
        items.push(
            <>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </>
        )
    }
    const router = useRouter();
    console.log(router.pathname);
    return items;
}

const Demo = () => (
    <Layout>
        <CustomSection id="home" title="Home" subtitle="">
            <Row>
                <p>An example landing page with a heading picture, a navigation bar with design changing when scrolling,
                    in-page navigation links (Services, Team), custom React cards to show services and team</p>
                <p>You can click on Services or Team to go to the corresponding section</p>
                <p>When scrolling the page, the navbar design will adapt to stay visible depending on the background</p>
            </Row>
        </CustomSection>

        <CustomSection id="services" title="Our services" subtitle="Lorem ipsum dolor sit amet">
            <Row>
                <Services cards={services}></Services>
            </Row>
        </CustomSection>

        <CustomSection id="team" title="Our team" subtitle="Lorem ipsum dolor sit amet">
            <Row>
                <CustomCardList cards={elements}></CustomCardList>
            </Row>
        </CustomSection>

        <Container>
            <FakeData/>
        </Container>
    </Layout>
)

export default Demo
