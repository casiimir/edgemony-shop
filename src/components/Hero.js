import './Hero.sass';

function Hero({ title, cover, description }) {
  return (
    <section className="Hero">
      <div className="Hero__info">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="Hero__image">
        <img src={cover} alt="cover" />
      </div>
    </section>
  );
}

export default Hero;
