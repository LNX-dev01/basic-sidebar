import { useState, useRef } from "react";
import clsx from "clsx";
import useClickOutside from "../../hooks/useClickOutside";

const ProfileMenu = ({ darkMode, isCollapsed }) => {
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setExpanded(false));

  const menuItems = [
    { key: "profile", label: "Mi perfil", icon: "bxs-user" },
    { key: "settings", label: "Configuración", icon: "bxs-cog" },
    { key: "logout", label: "Cerrar sesión", icon: "bxs-log-out" },
  ];

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div
      className={clsx("relative mt-2", {
        "w-full": !isCollapsed, // Se adapta al contenedor
      })}
      ref={menuRef}
    >
      {/* Botón principal */}
      <button
        onClick={handleToggle}
        className={clsx(
          "flex items-center gap-4 px-3 py-2 rounded-lg transition-all duration-300",
          {
            "w-full": !isCollapsed, // El botón ocupa todo el ancho cuando no está colapsado
            "hover:bg-gray-300": !darkMode,
            "hover:bg-orange": darkMode,
          }
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-center w-8 h-8 shadow-xl rounded-full transition-all duration-200",
            {
              "bg-gray-100 text-black": darkMode,
              "bg-white text-black": !darkMode,
            }
          )}
        >
          <i className="bx bxs-user bx-sm"></i>
        </div>
        {!isCollapsed && (
          <span className="font-medium text-sm">Perfil</span>
        )}
        {!isCollapsed && (
          <i
            className={clsx("bx ml-auto", {
              "bx-chevron-up": expanded,
              "bx-chevron-down": !expanded,
            })}
          ></i>
        )}
      </button>

      {/* Lista desplegable */}
      {expanded && !isCollapsed && (
        <div
          className={clsx(
            "mt-2 rounded-lg shadow-lg transition-all duration-200 z-50",
            {
              "absolute left-0 w-48": isCollapsed, // Flotante si está colapsado
              "w-full": !isCollapsed, // Se adapta al contenedor si no está colapsado
              "bg-white text-black": !darkMode,
              "bg-gray-700 text-white": darkMode,
            }
          )}
        >
          {menuItems.map((item) => (
            <a
              key={item.key}
              href="#"
              className={clsx(
                "flex items-center gap-3 px-4 py-2 text-sm transition-all duration-200 rounded-lg",
                {
                  "hover:bg-gray-200": !darkMode,
                  "hover:bg-orange": darkMode,
                }
              )}
            >
              <i className={`bx ${item.icon}`}></i>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
/*
*/