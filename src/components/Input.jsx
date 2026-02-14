import React from 'react';

const CustomInput = ({ 
  label, 
  id, 
  icon: Icon, // Recibe el componente del icono (como CircleUser)
  placeholder, 
  type = "text", 
  ...props 
}) => {
  return (
    <div className="relative group w-full mb-4">
      <label
        className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider"
        htmlFor={id}
      >
        {label}
      </label>
      
      <div className="relative w-full">
        {/* Contenedor del Icono */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-slate-400 group-focus-within:text-[#076163] transition-colors">
              <Icon size={20} />
            </div>
          </div>
        )}
        
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`
            block w-full border border-slate-200 rounded-xl leading-5 
            bg-slate-50  text-slate-900 
            placeholder-slate-400 focus:outline-none focus:ring-2 
            focus:ring-blue-500/20 focus:border-[#076163] 
            transition duration-150 ease-in-out sm:text-sm py-3 pr-3
            ${Icon ? 'pl-10' : 'pl-4'} 
          `}
          {...props} // Para capturar onChange, value, etc.
        />
      </div>
    </div>
  );
};

export default CustomInput;