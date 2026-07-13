import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {

  const { theme, setTheme } = useTheme();

  return (

    <button

      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark"
        )
      }

      className="rounded-xl border border-slate-300 bg-surface p-2 hover:bg-slate-100"

    >

      {theme === "dark"
        ? <Sun size={20}/>
        : <Moon size={20}/>
      }

    </button>

  );

}

export default ThemeToggle;