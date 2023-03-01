import { useState, useEffect } from "react";
import { BsDice3 } from "react-icons/bs";
function App() {
  const [advice, setAdvice] = useState("");
  const [number, setNumber] = useState("");
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const url = "https://api.adviceslip.com/advice";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      setAdvice(json.slip.advice);
      setNumber(json.slip.id);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="  bg-white dark:bg-slate-800 flex flex-col h-screen justify-center items-center">
      <button
        type="button"
        onClick={handleThemeSwitch}
        className="fixed z-10 right-2 top-2 bg-blue-500 text-lg p-1 rounded-md dark:bg-slate-800 "
      >
        {theme === "dark" ? "🌙" : "🌞"}
      </button>
      <div className=" text-center  p-4  bg-slate-800 dark:bg-white rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl mx-10">
        <h1 className="text-white font-bold  dark:text-slate-900 mt-5 text-base font-Quicksand tracking-tight p-1">
          DAILY ADVICE #{number}{" "}
        </h1>
        <p className="font-Quicksand font-bold text-slate-400 dark:text-slate-400 mt-2 text-xl p-4">
          {advice}
        </p>
        <button
          className=" transition ease-in-out delay-150 bg-blue-500 p-4 rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ... mt-3"
          onClick={fetchData}
        >
          <BsDice3 />
        </button>
      </div>
    </div>
  );
}

export default App;
