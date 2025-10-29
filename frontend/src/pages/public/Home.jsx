import Header from '../../components/Header'
import Proyects from '../../components/Proyects'
import Footer from '../../components/Footer'
import About from '../../components/About'
import Testimonios from '../../components/Testimonios'
import Contact from '../../components/Contact'

const Home = () => {
  return (
    <>
      <Header />
      <Proyects />
      <About/>
      <Testimonios/>
      <Contact />
      <Footer />
    </>
  )
}

export default Home