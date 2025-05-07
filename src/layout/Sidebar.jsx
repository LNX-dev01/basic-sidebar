import { useState } from "react";
import "boxicons/css/boxicons.min.css";
import log_gym from "../assets/log_gym.png";
import { clsx } from "clsx";
import { useTheme } from "../theme/ThemeContext";
import ProfileMenu from "../components/profile/ProfileMenu";
import NotificationList from "../components/notification/Notification-list";
import ThemeToggleButton from "../components/ToggleMode/ThemeToggleButton";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const notifications = [
    "Nueva actualización disponible",
    "Tienes 3 mensajes no leídos",
    "Tu pedido ha sido enviado",
  ];
  const { darkMode, toggleTheme } = useTheme();
  const [selected, setSelected] = useState("");
  const [selectedSubitem, setSelectedSubitem] = useState("");
  const [expanded, setExpanded] = useState("");

  const handleClick = (itemKey) => {
    setSelected(itemKey); // Seleccionar ítem principal
    setSelectedSubitem(""); // Limpiar subitem seleccionado
    setExpanded(""); // Colapsar cualquier submenú abierto
  };
  const toggleSubmenu = (key) => {
    setExpanded(expanded === key ? "" : key); // Expandir o colapsar
    setSelected(key); // Seleccionar ítem principal al expandir
  };
  const handleSubitemClick = (parentKey, subItemKey) => {
    setSelected(parentKey); // Mantener el ícono del ítem principal en naranja
    setSelectedSubitem(subItemKey); // Seleccionar el subitem
  };
  const menuItems = [
    {
      key: "Estadistica",
      label: "Estadistica",
      icon: "bxs-dashboard",
      path: "/statistics",
      role: ["admin"],
    },
    {
      key: "Usuarios",
      label: "Usuarios",
      icon: "bxs-user",
    },
    { key: "Membresias", label: "Membresias", icon: "bxs-id-card" },
    { key: "Productos", label: "Productos", icon: "bx bxl-product-hunt" },
    {
      key: "Ventas",
      label: "Ventas",
      icon: "bxs-shopping-bag-alt",
      // subItems: [
      //   { key: "Producto", label: "Producto" },
      //   { key: "Servicios", label: "Servicios" },
      // ],
    },
    { key: "Empleados", label: "Empleados", icon: "bxs-user-account" },
  ];
  return (
    <aside
      className={clsx(
        "fixed shadow-inner transition-all duration-200 ease-in-out h-full top-0 left-0", // Posición fija
       
        {
          "w-full lg:w-64 xl:w-72 2xl:w-80": !isCollapsed, // Ajustar anchos responsivos
          "min-h-screen": true, // Altura mínima siempre igual al viewport
          "overflow-y-auto": true, // Habilitar desplazamiento vertical
          "bg-customDarkGray text-gray-100": darkMode,
          "bg-gray-100 text-gray-900": !darkMode,
        }
      )}
    >
      {/* Botón de colapsar */}
      <div className="flex items-center p-4">
        {!isCollapsed && (
          <a
            href="#"
            className="text-sm font-semibold flex items-center mr-1.5"
          >
            <img
              src={log_gym}
              className="mr-2 h-10 w-10 rounded-xl  object-cover"
              alt="Logo"
            />

            <span className="inline-block self-center text-base font-bold whitespace-nowrap lg:text-lg">
              Empresa EA
            </span>
          </a>
        )}
        <button
          onClick={toggleSidebar}
          className={clsx(
            " ml-auto p-1 rounded focus:outline-none shadow-md transform transition duration-300 ease-in-out hover:scale-x-110 text-black",
            {
              "bg-gray-100": darkMode,
              "bg-gray-300": !darkMode,
            }
          )}
        >
          <i
            className={clsx("bx text-xl", {
              "bx-menu-alt-left": isCollapsed,
              "bx bx-menu-alt-right": !isCollapsed,
            })}
          ></i>
        </button>
      </div>

      {/* Menú */}
      <div className="mt-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.key}>
            {/* Item Principal */}
            <a
              href="#"
              onClick={() => {
                handleClick(item.key);
                if (item.subItems) toggleSubmenu(item.key); // Expande si tiene subitems
              }}
              className={clsx(
                "flex items-center justify-between gap-4 px-3 py-2 rounded-lg transition-all duration-300",
                {
                  // Condiciones para light mode
                  "border-y-2 border-orange shadow-xl":
                    selected === item.key && !darkMode,
                  "hover:bg-gray-300": selected !== item.key && !darkMode,

                  // Condiciones para dark mode
                  "border-y-2 border-orange": selected === item.key && darkMode,
                  "hover:bg-orange": selected !== item.key && darkMode,
                }
              )}
            >
              <div className="flex items-center gap-4">
                <div
                  className={clsx(
                    "flex items-center justify-center w-8 h-8 shadow-xl rounded-lg transition-all duration-200",
                    {
                      "bg-orange text-white": selected === item.key,
                      "bg-white text-black": selected !== item.key,
                    }
                  )}
                >
                  {/* <i className={`bx ${item.icon} text-2xl`}></i> */}
                  <i className={`bx ${item.icon} bx-xs`}></i>
                </div>
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </div>
              {!isCollapsed && item.subItems && (
                <i
                  className={clsx("bx", {
                    "bx-chevron-up": expanded === item.key,
                    "bx-chevron-down": expanded !== item.key,
                  })}
                ></i>
              )}
            </a>

            {/* Subitems */}
            {item.subItems && expanded === item.key && (
              <div
                className={clsx("ml-14 mt-2 space-y-2", {
                  // className={clsx("ml-14 mt-2 space-y-2", {
                  hidden: isCollapsed,
                })}
              >
                {item.subItems.map((subItem) => (
                  <a
                    key={subItem.key}
                    href="#"
                    onClick={() => handleSubitemClick(item.key, subItem.key)}
                    className={clsx(
                      "block px-4 py-2 rounded-lg transition-all duration-300 text-xs ",
                      {
                        // light
                        "bg-black text-white":
                          selectedSubitem === subItem.key && !darkMode,
                        "hover:bg-gray-400":
                          selectedSubitem !== subItem.key && !darkMode,
                        //DarMode
                        "bg-gray-600 text-white":
                          selectedSubitem === subItem.key && darkMode,
                        "hover:bg-orange":
                          selectedSubitem !== subItem.key && darkMode,
                      }
                    )}
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Linea de separación */}
      <div
        className={clsx(" divide border-t-2  my-4", {
          "border-cyan-900": darkMode,
          "border-gray-200": !darkMode,
        })}
      >
        <NotificationList darkMode={darkMode} isCollapsed={isCollapsed} />
        <ProfileMenu darkMode={darkMode} isCollapsed={isCollapsed} />
      </div>
      <ThemeToggleButton darkMode={darkMode} toggleTheme={toggleTheme} />
    </aside>
  );
};
export default Sidebar;