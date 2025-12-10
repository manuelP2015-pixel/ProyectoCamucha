import React from 'react';
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useSettings } from '../app/settings-provider';
import './Footer.css';

const Footer = () => {
    const { settings } = useSettings();
    const { contact, schedule, footerLinks, storeName, tagline } = settings;

    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-section">
                    <h3>{storeName}</h3>
                    <p>{tagline}</p>
                    <div className="social-links">
                        {/* Social icons placeholders */}
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Contacto</h3>
                    <ul className="contact-list">
                        <li>
                            <MapPin size={18} />
                            <span>{contact.address}</span>
                        </li>
                        <li>
                            <Phone size={18} />
                            <span>{contact.phone}</span>
                        </li>
                        <li>
                            <MessageCircle size={18} />
                            <span>{contact.whatsapp}</span>
                        </li>
                        {contact.email && (
                            <li>
                                <MessageCircle size={18} />
                                <span>{contact.email}</span>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Horarios</h3>
                    <ul className="contact-list">
                        <li>
                            <Clock size={18} />
                            <span>{schedule.weekday}</span>
                        </li>
                        <li>
                            <Clock size={18} />
                            <span>{schedule.sunday}</span>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Información</h3>
                    <ul className="footer-links">
                        <li><a href="/nosotros">Nosotros</a></li>
                        <li><a href="/terminos">Términos y Condiciones</a></li>
                        <li><a href="/privacidad">Política de Privacidad</a></li>
                        <li><a href="/reclamaciones">Libro de Reclamaciones</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} {storeName}. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
