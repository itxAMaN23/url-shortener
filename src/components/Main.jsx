import React, { useState } from 'react';
import axios from "axios";
import './Main.css';

const API_BASE_URL = import.meta.env.VITE_API_URL

const Main = () => {

  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/shorten`, { originalURL: longUrl });
      setShortUrl(`${API_BASE_URL}/api/${response.data.shortURL}`);
      setClicks(response.data.clicks || 0);
    } catch (error) {
      setError('Failed to shorten URL. Please try again.');
      console.error('Error shortening URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => alert('URL copied to clipboard!'))
      .catch(() => alert('Failed to copy URL, Try Again.'));
  };

  return (
    <main className="container my-5 text-center d-flex flex-column">

      <section
        className="short-section mt-5 p-4 p-md-5 d-flex flex-column flex-md-row align-items-center gap-4"
        style={{
          height: 'auto',
          minHeight: '75vh',
          alignContent: 'center',
          backgroundColor: 'rgb(136 203 197)',
          borderRadius: '10px',
          textAlign: 'center'
        }}
      >
        
        <div className="text-section w-100 w-md-50">
          <h1 className="display-5 fw-bold mb-4"
            style={{ color: 'var(--primary-color)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>
            Shorten Your URLs
          </h1>
          <p className="lead mb-4"
            style={{ color: 'var(--text-color)', fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
            <strong>Shortify</strong> is a <em>user-friendly</em> platform that allows users to easily shorten long URLs, making them more manageable and shareable. With a sleek, modern interface, <strong>Shortify</strong> offers a <u>seamless</u> experience for converting lengthy web addresses into concise, easy-to-share links.
          </p>

          <form className="m-3" onSubmit={handleSubmit}>
            <div className="input-group mb-3" style={{ flexWrap: 'nowrap', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <input type="url" className="form-control" placeholder="Enter your long URL"
                aria-label="Enter your long URL" value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                style={{ fontSize: '1rem', padding: '12px 15px', border: 'none' }}
              />
              <button className="btn btn-primary" disabled={loading}
                style={{ whiteSpace: 'nowrap', padding: '12px 18px', fontSize: '1rem', transition: 'all 0.3s ease-in-out' }}>
                {loading ? 'Shortening...' : 'Shorten'}
              </button>
            </div>

            {error && <p className="text-danger" style={{ fontSize: '0.9rem' }}>{error}</p>}

            {shortUrl && (
              <div className="mt-4 p-3 border rounded text-dark"
                style={{ backgroundColor: '#f0e6e6', textAlign: 'center', wordBreak: 'break-word' }}>
                <h5>Shortened URL</h5>
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer"
                    className="text-decoration-none"
                    style={{ color: '#ff5722', fontSize: '1rem' }}>
                    {shortUrl}
                  </a>
                  <button className="btn btn-sm btn-outline-primary" onClick={copyToClipboard}
                    style={{ fontSize: '0.9rem', padding: '6px 12px' }}>
                    Copy
                  </button>
                </div>
                <p className="mt-3 mb-0 btn btn-primary" style={{ fontSize: '0.9rem', padding: '8px 12px' }}>
                  Clicks: <span className="px-2 badge text-dark" style={{ backgroundColor: '#fff' }}>{clicks}</span>
                </p>
              </div>
            )}
          </form>
        </div>

        <div className="image-section w-100 w-md-50 d-flex justify-content-center">
          <img src="https://cdn.pixabay.com/photo/2019/07/02/05/56/rocket-4311575_1280.png"
            alt="URL Shortening Illustration"
            className="hero-image"
            style={{ maxWidth: '80%', height: 'auto', animation: 'float 3s ease-in-out infinite' }}
          />
        </div>
      </section>


      <section className="features mt-5 p-5 text-center" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="fw-bold mb-5" style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '2rem' }}>Features</h1>
        <div className="xcard" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '1200px', padding: '0 20px', placeContent: 'center' }}>
          <div style={{ backgroundColor: '#dda15e', borderRadius: '15px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease', textAlign: 'center' }} onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')} onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
            <div className="svg-holder" style={{ margin: '0 auto', width: '60px', height: '60px', backgroundColor: '#bc6c25', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#fff" viewBox="0 0 640 512"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" /></svg>
            </div>
            <h5 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '1rem 0', color: '#fff' }}>URL Customization</h5>
            <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>Create personalized short links with custom aliases to enhance branding and make sharing easier.</p>
          </div>

          <div className="xcard" style={{ backgroundColor: '#fb6f92', borderRadius: '15px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease', textAlign: 'center' }} onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')} onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
            <div className="svg-holder" style={{ margin: '0 auto', width: '60px', height: '60px', backgroundColor: '#e8315f', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#fff" viewBox="0 0 512 512"><path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75z" /></svg>
            </div>
            <h5 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '1rem 0', color: '#fff' }}>Link Expiry Settings</h5>
            <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>Allows users to set an expiration date and time for their short URLs, after which the link becomes inactive.</p>
          </div>

          <div className="xcard" style={{ backgroundColor: '#06d6a0', borderRadius: '15px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease', textAlign: 'center' }} onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')} onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
            <div className="svg-holder" style={{ margin: '0 auto', width: '60px', height: '60px', backgroundColor: '#43e8bd', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='30px' fill='white'><path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" /></svg>
            </div>
            <h5 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '1rem 0', color: '#fff' }}>Analytics Dashboard</h5>
            <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>Provides detailed analytics on each shortened URL, including click trends, geolocation, and referral sources.</p>
          </div>
        </div>
      </section>

      <section className="container faq mt-5 p-4 p-md-5 text-center" style={{ minHeight: '100vh', alignContent: 'center', backgroundColor: 'rgb(136 203 197)', borderRadius: '10px' }}>
        <h1 className="fw-bold mb-5" style={{ color: 'var(--primary-color)', fontSize: 'clamp(2rem, 5vw, 2.5rem)' }}>Frequently Asked Questions</h1>
        <div className="accordion" id="faqAccordion" style={{ maxWidth: '100%', margin: '0 auto' }}>

          {/* FAQ Item 1 */}
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                How does Shortify work?
              </button>
            </h3>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                <strong>Shortify</strong> takes a long URL and generates a shorter, unique link that redirects to the original URL. Simply paste your long URL into the input field, click <strong>Shorten</strong>, and you’ll get a concise link to share.
              </div>
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Is Shortify free to use?
              </button>
            </h3>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes, <strong>Shortify</strong> is completely free to use. You can shorten as many URLs as you want without any cost.
              </div>
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Can I customize my shortened URL?
              </button>
            </h3>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Currently, <strong>Shortify</strong> generates random, unique shortened URLs. Customization options may be added in future updates.
              </div>
            </div>
          </div>

          {/* FAQ Item 4 */}
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Are the shortened URLs permanent?
              </button>
            </h3>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes, the shortened URLs generated by <strong>Shortify</strong> are permanent and will remain active unless manually deleted by the user.
              </div>
            </div>
          </div>

          {/* FAQ Item 5 */}
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                How secure is Shortify?
              </button>
            </h3>
            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                <strong>Shortify</strong> uses secure protocols to ensure your data is safe. We do not store or share any personal information, and all URLs are encrypted for privacy.
              </div>
            </div>
          </div>

          {/* FAQ Item 6 */}
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                Can I track clicks on my shortened URLs?
              </button>
            </h3>
            <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Currently, <strong>Shortify</strong> does not support click tracking. However, this feature is planned for future updates.
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
};

export default Main;