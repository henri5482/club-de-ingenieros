import Footer from "../footer";
import Navbar from "../navbar";

const Politica = () => {
  return (
    <>
     <Navbar/>
    <div className="max-w-4xl mx-auto  px-4 sm:px-6 lg:px-8 text-slate-800 py-32">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Política de Privacidad</h1>

      <p className="mb-4">
        En <strong>Club de Ingenieros</strong>, valoramos y respetamos tu privacidad. Esta política describe cómo
        recopilamos, usamos, almacenamos y protegemos la información personal que nos proporcionas al utilizar
        nuestros servicios.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Información que recopilamos</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Nombre completo</li>
        <li>Correo electrónico</li>
        <li>Teléfono (opcional)</li>
        <li>Datos relacionados con tus cursos, certificados y progreso académico</li>
        <li>Datos de navegación y uso de la plataforma (cookies, dirección IP, etc.)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Uso de la información</h2>
      <p className="mb-4">
        Utilizamos tus datos personales para:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Registrarte en nuestros cursos y gestionar tus suscripciones</li>
        <li>Emitir certificados personalizados</li>
        <li>Brindarte soporte académico y técnico</li>
        <li>Informarte sobre nuevos cursos, promociones y eventos educativos</li>
        <li>Mejorar nuestra plataforma y experiencia de usuario</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Protección de datos</h2>
      <p className="mb-4">
        Implementamos medidas técnicas y organizativas adecuadas para proteger tu información contra accesos no
        autorizados, pérdida o modificación. Nunca compartiremos tus datos con terceros sin tu consentimiento.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Derechos del usuario</h2>
      <p className="mb-4">
        Puedes acceder, rectificar o eliminar tus datos personales en cualquier momento. También puedes solicitar
        la cancelación de tu suscripción o el cese del uso de tus datos escribiéndonos a nuestro correo oficial.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Cambios en la política</h2>
      <p className="mb-4">
        Nos reservamos el derecho de modificar esta política de privacidad. Te notificaremos cualquier cambio
        importante a través de nuestros canales oficiales.
      </p>

      <p className="mt-6 text-sm text-slate-600">
        Última actualización: Junio 2025 | Club de Ingenieros – Educación especializada para ingenieros en Perú.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default Politica;
