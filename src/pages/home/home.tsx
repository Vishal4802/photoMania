import { FC } from 'react'
import './home.css'

const Home: FC = () => {
  return (
    <div>
        <h2>All Free HD Stock Images at One Place</h2>
        <h3>Images From</h3>
        <div className='source'>
          <img src="/pixabay.png" alt="pixabay" />
          <img src="/pexels.png" alt="pexels" />
          <img src="/unsplash.png" alt="unsplash" />
        </div>
    </div>
  )
}

export default Home