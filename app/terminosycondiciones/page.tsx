import Footer from "../footer";
import Navbar from "../navbar";

const page = () => {
  return (
    <>
     <Navbar />
    <div className="max-w-4xl mx-auto py-36 px-4 sm:px-6 lg:px-8 text-slate-800">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Términos y Condiciones</h1>

      <p className="mb-4">
        Bienvenido a <strong>Club de Ingenieros</strong>. Al acceder y utilizar nuestro sitio web, servicios y
        cursos, aceptas los siguientes términos y condiciones. Te recomendamos leerlos detenidamente.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Aceptación de los términos</h2>
      <p className="mb-4">
        Al registrarte o usar nuestros servicios, aceptas estos términos y condiciones, así como nuestra política de
        privacidad. Si no estás de acuerdo, no deberías utilizar nuestros servicios.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Uso de la plataforma</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Debes tener al menos 16 años para registrarte.</li>
        <li>Te comprometes a brindar información veraz y actualizada.</li>
        <li>No debes utilizar nuestros cursos con fines ilegales ni compartir el acceso con terceros.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Propiedad intelectual</h2>
      <p className="mb-4">
        Todo el contenido de la plataforma, incluyendo textos, videos, materiales, imágenes y diseños, pertenece a
        Club de Ingenieros o a sus respectivos autores. Está prohibida su reproducción o distribución sin autorización.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Certificados</h2>
      <p className="mb-4">
        Los certificados emitidos por Club de Ingenieros acreditan la participación en nuestros cursos. Estos no
        sustituyen títulos universitarios ni certificaciones oficiales del Estado.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Pagos y devoluciones</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Todos los pagos son procesados de forma segura.</li>
        <li>No se realizan devoluciones una vez activado el acceso al curso.</li>
        <li>En caso de problemas técnicos, puedes contactarnos para revisar tu caso.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Modificaciones del servicio</h2>
      <p className="mb-4">
        Club de Ingenieros se reserva el derecho de modificar, suspender o eliminar cualquier curso, funcionalidad o
        parte del servicio en cualquier momento sin previo aviso.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Cierre de cuenta</h2>
      <p className="mb-4">
        Nos reservamos el derecho de suspender o cancelar cuentas que infrinjan estos términos o hagan uso indebido de
        la plataforma.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contacto</h2>
      <p className="mb-4">
        Si tienes dudas sobre estos términos, puedes comunicarte con nosotros a través de nuestro formulario de
        contacto o correo oficial.
      </p>

      <p className="mt-6 text-sm text-slate-600">
        Última actualización: Junio 2025 | Club de Ingenieros – Educación profesional para ingenieros.
      </p>
    </div>
    <Footer />
    </>
  );
};

export default page;
