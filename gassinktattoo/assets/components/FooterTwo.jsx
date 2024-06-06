import React from 'react';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import '../styles/footer.css';

const FooterTwo = () => {
    return (
            <footer className="footerTwo">
                <div className="footer-content">
                    <p>© {new Date().getFullYear()} GasInkTattoo. Todos los derechos reservados.</p>
                    <div className="payment-methods">
                        <p>Métodos de pago aceptados:</p>
                        <div className="icons">
                            <FaCcVisa className="payment-icon" />
                            <FaCcMastercard className="payment-icon" />
                            <FaCcPaypal className="payment-icon" />
                        </div>
                    </div>
                </div>
            </footer>
    );
};

export default FooterTwo;