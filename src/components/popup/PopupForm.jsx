import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
const PopupForm = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  fields = [],
  schema,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const handleFormSubmit = (data) => {
    onSubmit(data); // Llama al prop "onSubmit" pasado desde el padre
    // console.log(data);
    
  };

  if (!isOpen) return null;
3
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-gray-100 w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Formulario</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label htmlFor={field.name} className="text-sm font-medium mb-1">
                {field.label}
              </label>
              {field.type === "file" ? (
                <input
                  id={field.name}
                  type="file"
                  {...register(field.name)}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  {...register(field.name)}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {errors[field.name] && (
                <span className="text-red-500 text-xs mt-1">
                  {errors[field.name].message}
                </span>
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PopupForm