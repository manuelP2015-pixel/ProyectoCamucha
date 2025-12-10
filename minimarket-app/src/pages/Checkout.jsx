import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Banknote, CheckCircle, ArrowLeft, Upload } from 'lucide-react';
import { useAuth } from '../app/auth-provider';
import { createOrder } from '../services/orders-service';
import { useSettings } from '../app/settings-provider';
import './Checkout.css';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { settings } = useSettings();
    const [step, setStep] = useState(1); // 1: Review, 2: Payment, 3: Receipt
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderId, setOrderId] = useState('');
    const [paidTotal, setPaidTotal] = useState(0);
    const [orderStatus, setOrderStatus] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [paymentProof, setPaymentProof] = useState(null);
    const [paymentRef, setPaymentRef] = useState('');

    if (cart.length === 0 && step !== 3) {
        return (
            <div className="container section text-center">
                <h2>Tu carrito está vacío</h2>
                <button className="btn btn-primary mt-4" onClick={() => navigate('/catalog')}>
                    Ir a comprar
                </button>
            </div>
        );
    }

    const handlePayment = () => {
        if (!paymentMethod) return;
        if (!user) {
            setError('Debes iniciar sesión para pagar.');
            return;
        }
        setError('');
        setShowModal(true);
    };

    const handleConfirmPayment = async () => {
        if (!paymentMethod) {
            setError('Selecciona un método.');
            return;
        }
        if (!paymentProof) {
            setError('Adjunta el comprobante.');
            return;
        }
        setError('');
        const total = getCartTotal();
        const newOrder = await createOrder({
            items: cart,
            total,
            clientEmail: user?.email || 'invitado@camucha.com',
            clientName: user?.name || 'Invitado',
            paymentMethod,
            paymentProof,
            paymentRef
        });
        setOrderId(newOrder.id);
        setPaidTotal(total);
        setOrderStatus(newOrder.status || 'verificacion');
        setStep(3);
        clearCart();
        setShowModal(false);
        setPaymentProof(null);
        setPaymentRef('');
    };

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setPaymentProof(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const paymentInfo = useMemo(() => settings.payments || {}, [settings]);

    const renderReview = () => (
        <div className="checkout-review animate-fade-in">
            <h2>Resumen de Compra</h2>
            <div className="review-items">
                {cart.map(item => (
                    <div key={item.id} className="review-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-info">
                            <h4>{item.name}</h4>
                            <p>Cant: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                            S/ {(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
            <div className="review-total">
                <span>Total a Pagar:</span>
                <span>S/ {getCartTotal().toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-block btn-lg" onClick={() => setStep(2)}>
                Continuar al Pago
            </button>
        </div>
    );

    const renderPayment = () => (
        <div className="checkout-payment animate-fade-in">
            <button className="back-link" onClick={() => setStep(1)}>
                <ArrowLeft size={18} /> Volver
            </button>
            <h2>Selecciona Método de Pago</h2>

            <div className="payment-options">
                <div
                    className={`payment-option ${paymentMethod === 'Yape' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('Yape')}
                >
                    <Smartphone size={32} color="#7209b7" />
                    <span>Yape</span>
                </div>
                <div
                    className={`payment-option ${paymentMethod === 'Plin' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('Plin')}
                >
                    <Smartphone size={32} color="#00b4d8" />
                    <span>Plin</span>
                </div>
                <div
                    className={`payment-option ${paymentMethod === 'Tarjeta' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('Tarjeta')}
                >
                    <CreditCard size={32} color="#f72585" />
                    <span>Tarjeta Débito/Crédito</span>
                </div>
                <div
                    className={`payment-option ${paymentMethod === 'Efectivo' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('Efectivo')}
                >
                    <Banknote size={32} color="#4361ee" />
                    <span>Contra Entrega</span>
                </div>
            </div>

            <button
                className="btn btn-success btn-block btn-lg mt-4"
                disabled={!paymentMethod}
                onClick={handlePayment}
            >
                {paymentMethod ? `Pagar con ${paymentMethod}` : 'Seleccione un método'}
            </button>
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

            {showModal && (
                <div className="payment-modal">
                    <div className="payment-modal-content">
                        <h3>Completa tu pago ({paymentMethod})</h3>
                        <p className="text-sm text-slate-600">
                            Sube el comprobante y añade una referencia (ej. código de operación).
                        </p>

                        {paymentMethod === 'Yape' && (
                            <div className="pay-box">
                                <p>Número: {paymentInfo.yape?.number || 'No definido'}</p>
                                {paymentInfo.yape?.qr && <img src={paymentInfo.yape.qr} alt="QR Yape" className="qr-img" />}
                            </div>
                        )}
                        {paymentMethod === 'Plin' && (
                            <div className="pay-box">
                                <p>Número: {paymentInfo.plin?.number || 'No definido'}</p>
                                {paymentInfo.plin?.qr && <img src={paymentInfo.plin.qr} alt="QR Plin" className="qr-img" />}
                            </div>
                        )}
                        {paymentMethod === 'Tarjeta' && (
                            <div className="pay-box">
                                <p>{paymentInfo.tarjeta?.account || 'Cuenta no definida'}</p>
                                <p>{paymentInfo.tarjeta?.cci || ''}</p>
                            </div>
                        )}
                        {paymentMethod === 'Efectivo' && (
                            <div className="pay-box">
                                <p>{paymentInfo.contraentrega?.note || 'Pago al entregar'}</p>
                            </div>
                        )}

                        <label className="upload-btn">
                            <Upload size={18} />
                            <span>{paymentProof ? 'Comprobante cargado' : 'Subir comprobante (imagen/PDF)'}</span>
                            <input type="file" accept="image/*,.pdf" onChange={handleFile} />
                        </label>

                        <input
                            type="text"
                            placeholder="Referencia o comentario"
                            className="pay-input"
                            value={paymentRef}
                            onChange={(e) => setPaymentRef(e.target.value)}
                        />

                        <div className="modal-actions">
                            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
                            <button className="btn btn-success" onClick={handleConfirmPayment}>Enviar comprobante</button>
                        </div>
                        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );

    const renderReceipt = () => {
        const isVerif = orderStatus === 'verificacion';
        return (
            <div className="checkout-receipt animate-fade-in">
                <div className="receipt-card">
                    <div className="receipt-header">
                        <CheckCircle size={48} color={isVerif ? '#f59e0b' : 'var(--success)'} />
                        <h2>{isVerif ? 'Pago enviado' : '¡Pago Exitoso!'}</h2>
                        <p>
                            {isVerif
                                ? 'Tu comprobante está en verificación. Te avisaremos cuando se confirme.'
                                : 'Gracias por tu compra en Minimarket Camucha'}
                        </p>
                    </div>

                    <div className="receipt-details">
                        <div className="receipt-row">
                            <span>N° Pedido:</span>
                            <strong>{orderId}</strong>
                        </div>
                        <div className="receipt-row">
                            <span>Fecha:</span>
                            <strong>{new Date().toLocaleString()}</strong>
                        </div>
                        <div className="receipt-row">
                            <span>Método de Pago:</span>
                            <strong>{paymentMethod}</strong>
                        </div>
                        <div className="receipt-row">
                            <span>Estado:</span>
                            <strong>{isVerif ? 'En verificación' : 'Confirmado'}</strong>
                        </div>

                        <div className="receipt-divider"></div>

                        <div className="receipt-total">
                            <span>Total Pagado:</span>
                            <span>S/ {paidTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="btn btn-primary btn-block mt-4" onClick={() => navigate('/')}>
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="checkout-page container section">
            <div className="checkout-container">
                {step === 1 && renderReview()}
                {step === 2 && renderPayment()}
                {step === 3 && renderReceipt()}
            </div>
        </div>
    );
};

export default Checkout;
