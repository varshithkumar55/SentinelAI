import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

function PasswordInput({
  value,
  onChange,
  placeholder,
}) {

  const [show, setShow] = useState(false);

  return (

    <div className="relative">

      <Lock
        className="absolute left-4 top-3.5 text-slate-400"
        size={20}
      />

      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-800
        py-3
        pl-12
        pr-12
        text-white
        placeholder:text-slate-400
        focus:border-blue-500
        focus:outline-none
        transition
        "
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-3 text-slate-400 hover:text-white"
      >

        {show ? <EyeOff size={20} /> : <Eye size={20} />}

      </button>

    </div>

  );
}

export default PasswordInput;