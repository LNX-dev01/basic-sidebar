import { useTheme } from "../theme/ThemeContext";
import { clsx } from "clsx";
const Footer = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <div
      className={clsx(
        "flex w-full",
        darkMode ? "text-gray-900" : "text-gray-800"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p
            className={clsx(
              "text-sm",
              darkMode ? " text-gray-300" : "text-gray-900"
            )}
          >
            &copy; 2025 TuNombre. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {["Privacidad", "Términos", "Contacto"].map((item) => (
              <a
                key={item}
                href="#"
                className={clsx(
                  "transition hover:text-black",
                  darkMode ? "text-gray-300 hover:text-white" : "text-gray-900"
                )}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
