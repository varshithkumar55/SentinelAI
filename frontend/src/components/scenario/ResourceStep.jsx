function ResourceStep({ formData, setFormData }) {

  const updateField = (field,value)=>{
    setFormData(prev=>({
      ...prev,
      [field]:value
    }));
  };

  return(

    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold">
          Available Resources
        </h2>

        <p className="mt-2 text-slate-500">
          Specify available assets.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Personnel"
          value={formData.personnel}
          onChange={(v)=>updateField("personnel",v)}
        />

        <Input
          label="Vehicles"
          value={formData.vehicles}
          onChange={(v)=>updateField("vehicles",v)}
        />

        <Input
          label="Equipment"
          value={formData.equipment}
          onChange={(v)=>updateField("equipment",v)}
        />

        <Input
          label="Budget"
          value={formData.budget}
          onChange={(v)=>updateField("budget",v)}
        />

      </div>

    </div>

  );

}

function Input({label,value,onChange}){

  return(

    <div>

      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        className="w-full rounded-xl border p-3"
      />

    </div>

  );

}

export default ResourceStep;