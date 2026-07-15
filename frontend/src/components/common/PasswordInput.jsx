import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
  label,
  show,
  setShow,
  ...props
}) {

  return (

    <div>

      <label className="mb-2 block font-medium">

        {label}

      </label>

      <div className="relative">

        <input
          {...props}
          type={show ? "text" : "password"}
          className="w-full rounded-xl border border-slate-300 p-3 pr-12 focus:border-blue-600 focus:outline-none"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-900"
        >

          {show
            ? <EyeOff size={20}/>
            : <Eye size={20}/>
          }

        </button>

      </div>

    </div>

  );

}

export default PasswordInput;