import { CircleUser, Mail, Phone, Building, SendHorizonal } from "lucide-react";
import CustomInput from "./components/Input";
import logo from "./assets/logo.svg";

function App() {
  return (
    // Fondo general con el degradado de tu marca
    <div className="min-h-screen bg-linear-to-br from-[#076163] to-[#094d4d] flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md space-y-6">
        
        {/* SECCIÓN DEL LOGO: Estilo tarjeta flotante */}
        <div className="bg-white rounded-2xl shadow-xl p-1 flex items-center justify-center transform transition-all">
          <div className="flex items-center space-x-3">
            <div className="relative h-25 shrink-0">
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* CABECERA DE TEXTO (Fuera de la tarjeta) */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">
            Bilse Academy
          </h1>
          <p className="text-teal-100 text-sm opacity-90">Registro al Evento</p>
        </div>

        {/* TARJETA DEL FORMULARIO */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-slate-800 font-semibold text-lg leading-snug">
              Ingresa tus datos para registrarte a <br />
              <span className="text-[#076163]">Bilse Academy</span>
            </h2>
          </div>

          <form className="space-y-5">
            <CustomInput
              label="Nombre"
              id="fullname"
              placeholder="Ej. Arthur Morgan"
              icon={CircleUser}
            />
            <CustomInput
              label="Correo Electrónico"
              id="email"
              type="email"
              placeholder="tu@email.com"
              icon={Mail}
            />
            <CustomInput
              label="Teléfono"
              id="phone"
              type="tel"
              placeholder="+52 55 1234 5678"
              icon={Phone}
            />
            <CustomInput
              label="Empresa"
              id="company"
              placeholder="Nombre de tu empresa"
              icon={Building}
            />

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-[#076163] hover:bg-[#094d4d] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#076163]"
              >
                <span>Enviar Registro</span>
                <SendHorizonal size={18} className="transform rotate-[-10deg]" />
              </button>
            </div>
          </form>
        </div>

        {/* FOOTER */}
        <p className="text-center text-teal-100 text-xs opacity-70">
          © {new Date().getFullYear()} Bilse Consultores. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

export default App;