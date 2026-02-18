import { useState } from "react";
import { CircleUser, Mail, Phone, Building, SendHorizonal, CheckCircle, Loader2 } from "lucide-react";
import CustomInput from "./components/Input";
import logo from "./assets/logo.svg";
import { enviarForm } from "./shared/services/form.service";
function App() {
  // 1. Estados para guardar los datos, la carga y el éxito
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 2. Función para manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Función para enviar a Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // 1. Preparamos los datos con los nombres que Django espera (nombre, email, telefono...)
    const datosParaEnviar = {
      nombre: formData.fullname,
      email: formData.email,
      telefono: formData.phone,
      empresa: formData.company,
    };

    try {
      // 2. ¡Aquí está el cambio! Llamamos a la función externa
      await enviarForm(datosParaEnviar);

      // 3. Si no hubo error en la línea anterior, asumimos éxito
      setIsSuccess(true);
      setFormData({ fullname: "", email: "", phone: "", company: "" }); // Limpiar form
      
    } catch (error) {
      console.error("Error:", error);
      // Opcional: Mostrar el mensaje exacto que mandó Django si quieres
      setErrorMessage("Hubo un error al registrarte. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#076163] to-[#094d4d] flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md space-y-6">
        
        {/* LOGO */}
        <div className="bg-white rounded-2xl shadow-xl p-1 flex items-center justify-center transform transition-all">
          <div className="flex items-center space-x-3">
            <div className="relative h-25 shrink-0">
              <img src={logo} alt="logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">
            Bilse Academy
          </h1>
          <p className="text-teal-100 text-sm opacity-90">Registro al Evento</p>
        </div>

        {/* TARJETA FORMULARIO O MENSAJE DE ÉXITO */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-300">
          
          {isSuccess ? (
            // VISTA DE ÉXITO
            <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="flex justify-center">
                <CheckCircle className="text-green-500 w-16 h-16" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">¡Registro Exitoso!</h2>
              <p className="text-slate-600">
                Gracias por registrarte en Bilse Academy. Te hemos enviado un correo de confirmación.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-4 text-[#076163] font-semibold hover:underline"
              >
                Registrar a otra persona
              </button>
            </div>
          ) : (
            // VISTA DEL FORMULARIO
            <>
              <div className="text-center mb-8">
                <h2 className="text-slate-800 font-semibold text-lg leading-snug">
                  Ingresa tus datos para registrarte a <br />
                  <span className="text-[#076163]">Bilse Academy</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <CustomInput
                  label="Nombre"
                  id="fullname"
                  name="fullname" // Importante: name debe coincidir con el estado
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Ej. Arthur Morgan"
                  icon={CircleUser}
                  required
                />
                <CustomInput
                  label="Correo Electrónico"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  icon={Mail}
                  required
                />
                <CustomInput
                  label="Teléfono"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+52 55 1234 5678"
                  icon={Phone}
                  required
                />
                <CustomInput
                  label="Empresa"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                  icon={Building}
                />

                {errorMessage && (
                  <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                    {errorMessage}
                  </p>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center space-x-2 bg-[#076163] hover:bg-[#094d4d] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#076163] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Registro</span>
                        <SendHorizonal size={18} className="transform rotate-[-10deg]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
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