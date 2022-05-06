import React from 'react'
import 'react-router-dom'
import Footer from '../components/Footer'
import Postinfo from '../components/Postinfo'
import Header from '../components/Header'
import Posts from './Posts'

function Dashboard() {
    return (
    <section>
    <Header/>
    <Postinfo/>
    <Footer/>
    </section>
    )
}

export default Dashboard
