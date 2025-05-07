import { useState } from "react";
import PopupForm from "../components/popup/PopupForm";
import { fieldUser } from "../config/fieldsPopup/fieldsPoup";
import { schemaUser } from "../config/fieldsPopup/schemasPopup";

const MainContent = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Función para manejar el envío del formulario
  const handleFormSubmit = (data) => {
    console.log("Formulario enviado :", data);
    setPopupOpen(false); // Cerrar el popup después de enviar
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={() => setPopupOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Abrir formulario
      </button>

      <PopupForm
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onSubmit={handleFormSubmit}
        fields={fieldUser}
        schema={schemaUser}
      />
    </div>
  );
};

export default MainContent;
