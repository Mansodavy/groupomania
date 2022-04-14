import React from 'react'
import 'react-router-dom'
import Footer from '../components/Footer'
import Posts from '../components/Posts'
import Header from '../components/Header'

function Dashboard() {
    return (
    <section>
    <Header/>
    <Posts/>
    <Footer/>
    </section>
    )
}

export default Dashboard
