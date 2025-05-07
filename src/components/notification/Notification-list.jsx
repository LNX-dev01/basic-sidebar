import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import useClickOutside from "../../hooks/useClickOutside";

const NotificationList = ({ darkMode, isCollapsed }) => {
  const [notifications, setNotifications] = useState([
    { key: "1", label: "notification one" },
    { key: "2", label: "notification two" },
    { key: "3", label: "notificartion three" },
  ]);

  const menuItem = {
    key: "notification",
    label: "Notificaciones",
    icon: "bxs-bell",
    subItems: notifications,
  };

  const [expanded, setExpanded] = useState(null);
  const menuRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (expanded === "notification") {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  }, [expanded]);

  useClickOutside(menuRef, () => setExpanded(null));

  const handleMenuClick = (key) => {
    setExpanded((prev) => (prev === key ? null : key));
  };

  const removeNotification = (key) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.key !== key)
    );
  };

  return (
    <div className="relative mt-2">
      {/* Botón principal */}
      <div ref={menuRef}>
        <button
          onClick={() => handleMenuClick(menuItem.key)}
          className={clsx(
            "flex items-center justify-between w-full gap-4 px-3 py-2 rounded-lg transition-all duration-300",
            {
              "hover:bg-gray-300": !darkMode,
              "hover:bg-orange": darkMode,
            }
          )}
        >
          <div className="flex items-center gap-4">
            <div
              className={clsx(
                "flex items-center justify-center w-8 h-8 shadow-xl rounded-lg transition-all duration-200",
                {
                  "bg-gray-100 text-black": darkMode,
                  "bg-white text-black": !darkMode,
                }
              )}
            >
              <i className={`bx ${menuItem.icon} bx-xs`}></i>
            </div>
            {unreadCount > 0 && (
              <span
                className={clsx(
                  "absolute -top-0 left-2  flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full",
                  {
                    "bg-red-500 text-white": !darkMode,
                    "bg-red-600 text-white": darkMode,
                  }
                )}
              >
                {unreadCount}
              </span>
            )}
            {!isCollapsed && (
              <span className="font-medium text-sm">{menuItem.label}</span>
            )}
          </div>
          {!isCollapsed && (
            <i
              className={clsx("bx", {
                "bx-chevron-up": expanded === menuItem.key,
                "bx-chevron-down": expanded !== menuItem.key,
              })}
            ></i>
          )}
        </button>

        {/* Contenedor de notificaciones */}
        {expanded === menuItem.key &&
          !isCollapsed && ( // Añadimos el condicional !isCollapsed
            <div
              className={clsx(
                "mt-2 space-y-1 shadow-lg transition-all duration-300 z-50 rounded-lg",
                {
                  "absolute left-0 w-52": isCollapsed,
                  "w-full": !isCollapsed,
                  "bg-white text-black": !darkMode,
                  "bg-gray-700 text-white": darkMode,
                }
              )}
            >
              {notifications.length > 0 ? (
                notifications.map((subItem) => (
                  <div
                    key={subItem.key}
                    className={clsx(
                      "flex items-center justify-between px-4 py-1 w-full rounded-lg transition-all duration-300 text-sm",
                      {
                        "bg-white text-black hover:bg-gray-200": !darkMode,
                        "bg-gray-700 text-white hover:bg-orange": darkMode,
                      }
                    )}
                  >
                    <span className="flex-grow text-left px-2">
                      {subItem.label}
                    </span>
                    <button
                      onClick={() => removeNotification(subItem.key)}
                      className={clsx(
                        "flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200",
                        {
                          "bg-white hover:bg-gray-200": !darkMode,
                          "bg-gray-600 hover:bg-gray-700": darkMode,
                        }
                      )}
                      title="Eliminar notificación"
                    >
                      <i
                        className={clsx("bx bxs-trash bx-xs", {
                          "text-white": darkMode,
                          "text-black": !darkMode,
                        })}
                      ></i>
                    </button>
                  </div>
                ))
              ) : (
                <div
                  className={clsx(
                    "px-4 py-2 w-full text-center rounded-lg text-sm",
                    {
                      "bg-gray-200 text-gray-900": !darkMode,
                      "bg-gray-600 text-gray-300": darkMode,
                    }
                  )}
                >
                  No notifications
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default NotificationList;
