import './Footer.css';

const Footer = () => {
    const links = [
        { text: 'Home', href: '/' },
        { text: 'Analytics', href: '/analytics' },
        { text: 'Features', href: '/features' },
        { text: 'Contact Us', href: '/contact' }
    ];

    const contactInfo = [
        { text: '123 Shortify Street, Tech City, TC 12345' },
        { text: '+1 (234) 567-890', href: 'tel:+1234567890' },
        { text: 'support@shortify.com', href: 'mailto:support@shortify.com' }
    ];

    return (
        <footer className="footer bg-dark text-white py-5">
            <div className="container">
                <div className="row g-4 text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h5 className="footer-heading">Quick Links</h5>
                        <ul className="list-unstyled">
                            {links.map((link) => (
                                <li key={link.href} className="mb-2">
                                    <a href={link.href} className="footer-link">
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-12 col-md-4">
                        <h5 className="footer-heading">Contact Us</h5>
                        <ul className="list-unstyled">
                            {contactInfo.map((info, index) => (
                                <li key={index} className="mb-2">
                                    {info.href ? (
                                        <a href={info.href} className="footer-link">
                                            {info.text}
                                        </a>
                                    ) : (
                                        <span className="footer-text">{info.text}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-12 col-md-4">
                        <h5 className="footer-heading">Subscribe</h5>
                        <p className="footer-text">Get the latest updates and news from Shortify.</p>
                        <form className="footer-form">
                            <input
                                type="email"
                                className="form-control mb-2 mb-sm-0 me-sm-2"
                                placeholder="Enter your email"
                                aria-label="Email"
                            />
                            <button className="btn btn-primary" type="submit">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="footer-copyright">
                    <p className="mb-0">
                        © {new Date().getFullYear()} Shortify. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;