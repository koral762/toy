import { Link } from 'react-router-dom'
import  img  from '../assets/img/hero.png'

export function Home() {
    return (
        <section className="home-page flex flex-column align-c">
            {/* <h1>Welcome</h1> */}
            <Link to="/toys">
                <img src={img} alt="hero" />
            </Link>
        </section>
    )
}
