import './Hero.sass';

function Hero({ title, cover, description }) {
  return (
    <section className="Hero">
      <h1>{ title }</h1>
      <img src={ cover } alt="cover"/>
      <p>{ description }</p>
    </section>
  )
}

export default Hero;