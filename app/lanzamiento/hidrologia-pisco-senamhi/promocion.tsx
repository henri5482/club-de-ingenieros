// components/Promocion.jsx
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// --- Configuration Constants ---
const PROMOTION_TOTAL_COUPONS = 10;
const COUNTDOWN_DURATION_SECONDS = 10 * 60; // 10 minutes
const PRODUCT_PRICE = 99;
const COUPON_REFRESH_INTERVAL_MS = 15000; // 15 seconds

// --- Type Definitions ---
type PaymentMethod = "Yape" | "Plin" | "Transferencia" | "";

const Promocion = () => {
  const [availableCoupons, setAvailableCoupons] = useState(
    PROMOTION_TOTAL_COUPONS
  );
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_DURATION_SECONDS);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentPaymentMethod, setCurrentPaymentMethod] =
    useState<PaymentMethod>("");
  const [couponNumberForModal, setCouponNumberForModal] = useState(0);
  const [isClientHydrated, setIsClientHydrated] = useState(false);

  // Initialize component and reset coupons on page load
  useEffect(() => {
    setIsClientHydrated(true);
    // Reset coupons to total on page load to ensure fresh start for demo
    setAvailableCoupons(PROMOTION_TOTAL_COUPONS);
    localStorage.setItem(
      "availableCoupons",
      PROMOTION_TOTAL_COUPONS.toString()
    );
    localStorage.setItem(
      "availableCoupons_server",
      PROMOTION_TOTAL_COUPONS.toString()
    ); // Also reset server simulation
  }, []);

  // Save to localStorage and manage celebration
  useEffect(() => {
    if (!isClientHydrated) return;
    localStorage.setItem("availableCoupons", availableCoupons.toString());
    setShowCelebration(availableCoupons === 0);
  }, [availableCoupons, isClientHydrated]);

  // Countdown timer
  useEffect(() => {
    if (!isClientHydrated || timeLeft <= 0 || availableCoupons === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime <= 1 ? 0 : prevTime - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, availableCoupons, isClientHydrated]);

  // Simulate server-side coupon count (optional, for demo purposes)
  useEffect(() => {
    if (!isClientHydrated) return;

    const intervalId = setInterval(() => {
      // This simulates server-side validation
      const savedCoupons =
        localStorage.getItem("availableCoupons_server") ||
        PROMOTION_TOTAL_COUPONS.toString();
      const serverCount = Math.min(
        PROMOTION_TOTAL_COUPONS,
        Math.max(0, parseInt(savedCoupons, 10))
      );
      setAvailableCoupons(serverCount);
    }, COUPON_REFRESH_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isClientHydrated]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(remainingSeconds).padStart(2, "0"),
    };
  };

  const time = formatTime(timeLeft);

  const handlePurchaseClick = (paymentMethod: PaymentMethod) => {
    if (!isClientHydrated || availableCoupons <= 0 || timeLeft <= 0) return;

    setCurrentPaymentMethod(paymentMethod);
    const couponNum = PROMOTION_TOTAL_COUPONS - availableCoupons + 1;
    setCouponNumberForModal(couponNum);
    setShowConfirmationModal(true);
  };

  const confirmPurchase = () => {
    if (!isClientHydrated || availableCoupons <= 0) {
      setShowConfirmationModal(false);
      return;
    }

    const newCount = availableCoupons - 1;
    setAvailableCoupons(newCount);
    // Also update server simulation
    localStorage.setItem("availableCoupons_server", newCount.toString());
    setShowConfirmationModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative pt-20 pb-32">
      {/* Promotion Header */}
      <div className="bg-red-600 text-white text-center py-3 rounded-lg mb-8 flex items-center justify-center">
        <span className="text-2xl mr-2">⚠️</span>
        <h1 className="text-xl md:text-2xl font-bold uppercase ">
          APROVECHA LA PROMOCIÓN DE PRE-VENTA:
        </h1>
        <span className="text-2xl ml-2">⏰</span>
      </div>

      {/* Coupons and Countdown Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 items-center">
        {/* Available Coupons Card */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center flex flex-col items-center w-full max-w-xl mx-auto">
          {" "}
          {/* Added w-full max-w-sm */}
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
            🥳 CUPOS DISPONIBLES 🥳
          </h2>
          {isClientHydrated && showCelebration ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              className="text-red-600 text-3xl md:text-4xl font-extrabold mb-4" // Adjusted text size for celebration
            >
              🎉 ¡Todos los cupones se agotaron! 🎉
            </motion.div>
          ) : (
            <div className="text-red-600 text-5xl md:text-6xl font-extrabold mb-4">
              {isClientHydrated ? availableCoupons : "..."}
            </div>
          )}
          {/* <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full px-2">

            <button
              onClick={() => handlePurchaseClick("Yape")}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#6e2c9a] text-white font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              disabled={
                !isClientHydrated || availableCoupons === 0 || timeLeft <= 0
              }
            >
              Yape
            </button>
            <button
              onClick={() => handlePurchaseClick("Plin")}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#00D6B7] text-white font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              disabled={
                !isClientHydrated || availableCoupons === 0 || timeLeft <= 0
              }
            >
              Plin
            </button>
            <button
              onClick={() => handlePurchaseClick("Transferencia")}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              disabled={
                !isClientHydrated || availableCoupons === 0 || timeLeft <= 0
              }
            >
              Transferencia
            </button>
          </div> */}
        </div>

        {/* Countdown and Product Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4">
            TIEMPO RESTANTE
          </h2>
          <div className="flex justify-center space-x-2 sm:space-x-4 text-3xl sm:text-4xl font-extrabold text-gray-800">
            <div className="flex flex-col items-center">
              <span className="bg-gray-200 p-2 rounded text-red-600">{time.days}</span>
              <span className="text-xs sm:text-sm font-normal">DÍAS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-gray-200 p-2 rounded text-red-600">{time.hours}</span>
              <span className="text-xs sm:text-sm font-normal">HORAS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-gray-200 p-2 rounded text-red-600">{time.minutes}</span>
              <span className="text-xs sm:text-sm font-normal">MINUTOS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-gray-200 p-2 rounded text-red-600">{time.seconds}</span>
              <span className="text-xs sm:text-sm font-normal">SEGUNDOS</span>
            </div>
          </div>
          <p className="text-slate-800 mt-6 text-xl md:text-2xl font-bold">
            INVERSIÓN:{" "}
            <span className="text-red-600">S/.{PRODUCT_PRICE}</span>{" "}
            <span className="text-sm">(Único Pago)</span>
          </p>
          <div className="mt-4 text-left text-gray-700 text-sm max-w-xs mx-auto">
            {" "}
            {/* Adjusted max-width for benefit list */}
            <p className="flex items-center mb-1">
              <span className="text-green-500 mr-2">✔</span> CERTIFICADO 120
              HORAS
            </p>
            <p className="flex items-center mb-1">
              <span className="text-green-500 mr-2">✔</span> VIDEOS
            </p>
            <p className="flex items-center mb-1">
              <span className="text-green-500 mr-2">✔</span> MATERIALES
            </p>
            <p className="flex items-center mb-1">
              <span className="text-green-500 mr-2">✔</span> LIBRO NANDA
            </p>
            <p className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> AUDIO LIBRO
            </p>
          </div>
          <p className="text-gray-500 text-xs mt-4 flex items-center justify-center text-center">
            <span className="text-yellow-500 mr-1">▲</span> Una vez realizado el
            Yape, Transferencia, envíe al WhatsApp:{" "}
            <a
              href="https://wa.me/51936972560"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 ml-1 hover:underline"
            >
              936 972 560
            </a>
          </p>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bank Account Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            FORMAS DE PAGO
          </h2>
          <p className="font-bold text-sm text-gray-700 mb-2 md:text-xl">
            DEPOSITO A NOMBRE:{" "}
            <span className=" text-slate-900 text-sm md:text-lg font-bold">
              Luis NELLY SURAYRA INFANZON MEDINA
            </span>
          </p>
          <h3 className="font-bold  text-gray-700 mb-2 text-sm
           md:text-xl">
            CUENTAS BANCARIAS:
          </h3>
          <div className="mb-4 text-lg">
            <p className="flex items-center text-gray-700 md:text-lg text-sm">
              <span className="text-green-500 mr-2">✔</span> BANCO DE CREDITO
              DEL PERÚ - BCP
            </p>
            <p className="ml-6 md:text-lg text-gray-600 text-sm">
              Cta de Ahorro:{" "}
              <span className="font-semibold text-slate-800">
                220-97206275-0-56
              </span>
            </p>
            <p className="ml-6 md:text-lg text-gray-600 text-sm">
              CCI:{" "}
              <span className="font-semibold text-slate-800">
                002-22019720627505626
              </span>
            </p>
          </div>
          <div className="mb-4">
            <p className="flex items-center text-gray-700 md:text-lg text-sm">
              <span className="text-green-500 mr-2">✔</span> BANCO DE LA NACION:
            </p>
            <p className="ml-6 text-gray-600  md:text-lg text-sm">
              Número de cuenta:{" "}
              <span className="font-semibold">04-401-075939</span>
            </p>
            <p className="ml-6 text-gray-600  md:text-lg text-sm">
              CCI: <span className="font-semibold">401 004401075939 05</span>
            </p>
          </div>
          <div className="mb-4">
            <p className="flex items-center text-gray-700 md:text-lg text-sm">
              <span className="text-green-500 mr-2">✔</span> También puede
              realizar el yape al número
            </p>
            <p className="ml-6 text-gray-600 md:text-lg font-bold text-sm">
              {" "}
              927 545 815
            </p>
          </div>
        </div>
        {/* Yape QR Code Image */}
        <div className="flex flex-col items-center justify-center p-4">
          {" "}
          {/* Added flex-col and justify-center for better alignment */}
          <Image
            src="/yape.webp"
            alt="Yape QR code or payment instruction visual"
            width={500}
            height={300}
            className="w-full h-4/5 max-w-sm rounded-lg shadow-md"
          />{" "}
          {/* Added max-w-sm, rounded-lg, shadow-md */}
          <p className="mt-4 text-sm text-gray-700 text-center font-semibold max-w-sm">
            ENVÍA TU COMPROBANTE DE PAGO Y DATOS AL NÚMERO DE WHATSAPP INDICADO.
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-sm text-center relative"
            >
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                aria-label="Cerrar modal"
              >
                {" "}
                &times;{" "}
              </button>
              {currentPaymentMethod === "Yape" && (
                <img
                  src="https://www.yape.com.pe/images/logo-yape_positive.png"
                  alt="Yape Logo"
                  className="w-24 h-auto mx-auto mb-4"
                />
              )}
              {currentPaymentMethod === "Plin" && (
                <img
                  src="https://plin.pe/wp-content/themes/plin/imgs/logo.png"
                  alt="Plin Logo"
                  className="w-24 h-auto mx-auto mb-4"
                />
              )}
              {currentPaymentMethod === "Transferencia" && (
                <p className="text-gray-500 text-sm mb-4">
                  Transferencia bancaria
                </p>
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Confirmación de pago vía {currentPaymentMethod}
              </h3>
              <p className="text-gray-600 mb-1">
                Cupo #{couponNumberForModal} reservado
              </p>
              <p className="text-green-600 font-bold text-2xl mb-4">
                S/. {PRODUCT_PRICE}
              </p>
              {currentPaymentMethod === "Yape" && (
                <p></p>
              )}
              {currentPaymentMethod === "Plin" && (
                <p></p>
              )}
              {currentPaymentMethod === "Transferencia" && (
                <p className="text-gray-500 text-sm mb-6">
                  Realiza la transferencia a las cuentas indicadas.
                </p>
              )}
              <p className="text-gray-500 text-xs mb-4">
                No olvides enviar tu comprobante de pago y datos personales al
                WhatsApp indicado en la página.
              </p>
              <button
                onClick={confirmPurchase}
                className="w-full px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
              >
                {" "}
                Aceptar y Confirmar Reserva{" "}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Instruction Text */}
      <div className="mt-12 p-6 sm:p-8 bg-white rounded-2xl shadow-xl text-gray-800 text-center max-w-2xl mx-auto border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-4">
          ¡Último paso importante!
        </h2>
        <p className="text-base leading-relaxed">
          {" "}
          Una vez realizado el depósito o transferencia, envía la constancia de
          pago al WhatsApp junto con tus datos personales:{" "}
        </p>
        <ul className="text-left mt-4 space-y-2 text-sm sm:text-base list-disc list-inside mx-auto max-w-xs">
          <li>
            <strong>Nombre y Apellido</strong>
          </li>
          <li>
            <strong>N° DNI</strong>
          </li>
          <li>
            <strong>Correo Electrónico</strong>
          </li>
          <li>
            <strong>N° Celular</strong>
          </li>
        </ul>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
         
          <a
            href="https://wa.me/51927545815"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-green-700 transition flex items-center gap-2 text-sm md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0a11.93 11.93 0 0 0-8.52 3.48A11.93 11.93 0 0 0 0 12c0 2.1.54 4.17 1.57 6.02L0 24l5.99-1.56A11.93 11.93 0 0 0 12 24c3.18 0 6.17-1.24 8.48-3.48A11.93 11.93 0 0 0 24 12c0-3.18-1.24-6.17-3.48-8.52zM12 21.82c-2.26 0-4.45-.66-6.3-1.9l-.45-.29-3.55.93.95-3.46-.3-.48A9.89 9.89 0 0 1 2.18 12c0-5.42 4.4-9.82 9.82-9.82S21.82 6.58 21.82 12 17.42 21.82 12 21.82zm5.6-7.08c-.28-.14-1.65-.82-1.9-.92s-.44-.14-.62.14c-.19.28-.72.92-.88 1.1-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.4-1.65-1.56-1.92s-.02-.42.12-.56c.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.06-.22-.53-.45-.46-.6-.46h-.52c-.18 0-.46.07-.7.34s-.92.9-.92 2.2.94 2.56 1.07 2.74c.14.18 1.86 2.84 4.5 3.98.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.08 1.65-.67 1.88-1.32.23-.64.23-1.18.16-1.32-.06-.13-.26-.2-.54-.34z" />{" "}
            </svg>
            927 545 815
          </a>
        </div>
      </div>
    </div>
  );
};

export default Promocion;
