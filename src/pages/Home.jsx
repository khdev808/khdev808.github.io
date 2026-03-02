import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import './Home.css';

const services = [
  {
    title: 'AI Solutions',
    desc: 'Custom AI models, chatbots, and automation. We integrate OpenAI, LangChain, and custom ML to streamline operations and delight users.',
    icon: 'ai',
  },
  {
    title: 'Web Development',
    desc: 'Fast, scalable web apps - React, Next.js, Vue, and beyond. From SPAs to enterprise dashboards, we build for performance and growth.',
    icon: 'web',
  },
  {
    title: 'Mobile Apps',
    desc: 'Native iOS (Swift) and Android (Kotlin), or cross-platform with React Native and Flutter. We ship apps that users love.',
    icon: 'mobile',
  },
];

const skills = [
  { label: 'AI & ML:', items: 'OpenAI, LangChain, Hugging Face, TensorFlow, PyTorch, Custom LLMs' },
  { label: 'Frontend:', items: 'React, Next.js, Vue.js, TypeScript, React Native, Tailwind' },
  { label: 'Backend:', items: 'Node.js, Python, Django, FastAPI, Laravel' },
  { label: 'Mobile:', items: 'Swift, Kotlin, Flutter, React Native' },
  { label: 'Database & APIs:', items: 'PostgreSQL, MongoDB, Firebase, GraphQL, REST, gRPC' },
  { label: 'Cloud & DevOps:', items: 'AWS, GCP, Vercel, Docker, Kubernetes, CI/CD' },
  { label: 'Integrations:', items: 'Slack, Stripe, Twilio, Mapbox, Google APIs' },
];

const whyList = [
  'Production-ready code - tested, scalable, and maintainable',
  'Transparent process with regular updates and clear timelines',
  'Full-stack expertise - one team from design to deployment',
  'AI-native thinking - we build smart, not just fast',
];

const categoryLabels = {
  ai: 'AI',
  web: 'Web',
  mobile: 'Mobile',
};

export default function Home() {
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setFormStatus({ type: 'loading', message: 'Sending...' });

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Thanks! We\'ll get back to you within 24 hours.' });
        form.reset();
      } else {
        const errMsg = data.errors?.map((e) => e.message).join(', ') || data.error || 'Something went wrong. Please try again.';
        setFormStatus({ type: 'error', message: errMsg });
      }
    } catch {
      setFormStatus({ type: 'error', message: 'Unable to send. Please check your connection and try again.' });
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">KHDev</h1>
          <div className="hero__info">
            <p className="hero__tagline">
              AI · Web · Mobile
            </p>
            <p className="hero__sub">
              We build intelligent apps that scale. From AI-powered workflows to native mobile and sleek web - your idea, our execution.
            </p>
          </div>
          <div className="hero__cta-group">
            <Link to="/#projects" className="btn btn--primary">
              See Our Work
            </Link>
            <Link to="/#contact" className="btn btn--outline">
              Start a Project
            </Link>
          </div>
        </div>
        <div className="hero__socials">
          <a href="https://www.linkedin.com/company/khdev" className="hero__social" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <img src="/assets/png/linkedin-ico.png" alt="" />
          </a>
          <a href="https://github.com/khdev808" className="hero__social" target="_blank" rel="noreferrer" aria-label="GitHub">
            <img src="/assets/png/github-ico.png" alt="" />
          </a>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <div className="hero__mouse" />
        </div>
      </section>

      <section id="services" className="services section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">What We Build</h2>
            <p className="section__sub">
              From AI chatbots to cross-platform apps - we deliver the full stack. Pick one focus or combine them for something truly custom.
            </p>
          </div>
          <div className="services__grid">
            {services.map(({ title, desc, icon }) => (
              <div key={icon} className="services__card">
                <span className={`services__icon services__icon--${icon}`}>
                  {icon === 'ai' && '◆'}
                  {icon === 'web' && '◇'}
                  {icon === 'mobile' && '▣'}
                </span>
                <h3 className="services__card-title">{title}</h3>
                <p className="services__card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Who We Are</h2>
            <p className="section__sub">
              <strong>KHDev</strong> is a development studio based in Duluth, MN, specializing in <strong>AI</strong>, <strong>web</strong>, and <strong>mobile</strong> applications. We work with startups and enterprises to turn ambitious ideas into polished products - clean code, thoughtful design, and a partnership mindset from day one.
            </p>
          </div>
          <div className="about__grid">
            <div className="about__main">
              <h3 className="about__subtitle">Why Partner With Us</h3>
              <ul className="about__list">
                {whyList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="about__para">
                Whether you're validating an MVP, scaling an existing product, or integrating AI into your stack - we're here to make it happen. Let's <strong>connect</strong> and build something remarkable.
              </p>
              <Link to="/#contact" className="btn btn--accent">
                Get in Touch
              </Link>
            </div>
            <div className="about__skills">
              <h3 className="about__subtitle">Tech Stack</h3>
              <div className="skills">
                {skills.map(({ label, items }, i) => (
                  <div key={i} className="skills__item">
                    <strong>{label}</strong> {items}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Featured Work</h2>
            <p className="section__sub">
              Real projects we've built with real teams. AI assistants, mapping platforms, sustainability apps, and more - each one shipped and live.
            </p>
          </div>
          <div className="projects__list">
            {projects.map((project, i) => (
              <article
                key={project.slug}
                className={`projects__item projects__item--${i % 2 === 0 ? 'img-left' : 'img-right'}`}
              >
                <div className="projects__img-wrap">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="projects__img"
                    loading="lazy"
                  />
                  {(project.categories?.length || project.category) && (
                    <span className="projects__badges">
                      {(project.categories || [project.category]).map((cat) => (
                        <span key={cat} className={`projects__badge projects__badge--${cat}`}>
                          {categoryLabels[cat] || cat}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
                <div className="projects__body">
                  <h3 className="projects__title">{project.title}</h3>
                  <p className="projects__desc">{project.shortDesc}</p>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="btn btn--accent"
                  >
                    Case Study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact section">
        <div className="container">
          <div className="section__header section__header--light">
            <h2 className="section__title">Let's Build</h2>
            <p className="section__sub">
              Have a product idea? Need AI integration? Ready to scale? Tell us about your project - we'll respond within 24 hours.
            </p>
          </div>
          <form
            action="https://formspree.io/f/manebodo"
            method="post"
            className="contact__form"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_subject" value="New project inquiry from KHDev website" />
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="contact__field">
              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell us about your project, timeline, and what you're looking for..."
                required
              />
            </div>
            <button type="submit" className="btn btn--accent contact__submit" disabled={formStatus.type === 'loading'}>
              {formStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {formStatus.message && (
              <p className={`contact__status contact__status--${formStatus.type}`}>
                {formStatus.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
