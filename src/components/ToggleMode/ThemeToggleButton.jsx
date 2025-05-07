import clsx from "clsx";
const ThemeToggleButton = ({ darkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "relative group flex items-center ml-3 space-x-2 p-2 rounded-2xl bg-orange shadow-lg",
        {
          "hover:shadow-cyan-500/50 ": darkMode,
          "hover:shadow-gray-900 ": !darkMode,
        }
      )}
    >
      <i
        className={clsx("bx text-lg text-gray-100", {
          "bx-moon": darkMode,
          "bx-sun ": !darkMode,
        })}
      ></i>
      <span
        className={clsx(
          "absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300  text-xs rounded px-2 py-1 top-11 left-1/3 transform -translate-x-1/2",
          { 
            "bg-cyan-900 text-white": darkMode,
            "bg-gray-400 text-white": !darkMode,
           }
        )}
      >
        {darkMode ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default ThemeToggleButton;
/*
*/
