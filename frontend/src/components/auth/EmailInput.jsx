import { Mail } from "lucide-react";

function EmailInput({
  value,
  onChange,
  placeholder = "Email",
}) {

  return (

    <div className="relative">

      <Mail
        size={20}
        className="absolute left-4 top-3.5 text-slate-400"
      />

      <input
        type="email"
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
        text-white
        placeholder:text-slate-400
        focus:border-blue-500
        focus:outline-none
        transition
        "
      />

    </div>

  );
}

export default EmailInput;