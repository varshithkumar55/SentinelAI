function KeyRisks({ data }) {

  return (

    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold">
        Key Risks
      </h2>

      <div className="space-y-4">

        {(data.key_risks || []).map((risk, index) => (

          <div
            key={index}
            className="rounded-xl bg-red-50 p-4"
          >

            ⚠ {risk}

          </div>

        ))}

      </div>

    </div>

  );
}

export default KeyRisks;