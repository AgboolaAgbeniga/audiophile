import React from 'react'
import Header from './components/layout/Header'
import Category from './components/layout/Category'
import CategorySection from './components/layout/CategorySection'
import ProductSection from './components/layout/ProductSection'
import InfoSection from './components/layout/InfoSection'
import Footer from './components/layout/Footer'

const page = () => {
  return (
    <div className='text-primary gap-6 flex flex-col'>

    <Header/>
    <Category/>
    <CategorySection/>
    <ProductSection/>
    <InfoSection/>
    <Footer/>
      </div>
  )
}

export default page