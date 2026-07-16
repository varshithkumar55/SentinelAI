import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportMissionPDF(mission) {

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  let analysis = mission.analysis_json || mission;

  if (typeof analysis === "string") {
    try {
      analysis = JSON.parse(analysis);
    } catch {
      analysis = mission;
    }
  }

  const timeline =
    analysis.timeline ||
    mission.timeline ||
    {};

  const keyRisks =
    analysis.key_risks ||
    mission.key_risks ||
    [];

  const reasoning =
    analysis.reasoning ||
    mission.reasoning ||
    [];

  const resources =
    analysis.resource_plan ||
    analysis.resource_allocation ||
    mission.resource_plan ||
    mission.resource_allocation ||
    {};

  const strategies =
    analysis.alternative_strategies ||
    mission.alternative_strategies ||
    [];

  let y = 20;

  function checkPageSpace(required = 30) {

    if (y > 270 - required) {
      doc.addPage();
      y = 20;
    }

  }

  //------------------------------------------------
  // HEADER
  //------------------------------------------------

  doc.setFontSize(24);
  doc.setTextColor(25,55,120);
  doc.text(
    "SentinelAI",
    pageWidth/2,
    y,
    {align:"center"}
  );

  y += 8;

  doc.setFontSize(14);
  doc.setTextColor(120);

  doc.text(
    "AI Mission Intelligence Report",
    pageWidth/2,
    y,
    {align:"center"}
  );

  y += 12;

  //------------------------------------------------
  // Mission Information
  //------------------------------------------------

  autoTable(doc,{
    startY:y,

    head:[
      ["Mission Information"]
    ],

    body:[

      ["Mission",mission.title ?? "-"],

      ["Mission Type",mission.mission_type ?? "-"],

      ["Environment",mission.environment ?? "-"],

      ["Priority",mission.priority ?? "-"],

      ["Duration",mission.duration ?? "-"],

      ["Risk Level",mission.risk_level ?? "-"],

      ["AI Confidence",`${mission.confidence ?? 0}%`],

      ["Status",mission.status ?? "Completed"],

      ["Generated",new Date().toLocaleString()]

    ],

    headStyles:{
      fillColor:[25,55,120]
    }

  });

  y = doc.lastAutoTable.finalY + 12;

  //------------------------------------------------
  // Executive Summary
  //------------------------------------------------

  doc.setFontSize(18);
  doc.setTextColor(25,55,120);
  doc.text(
    "Executive Summary",
    14,
    y
  );

  y += 8;

  doc.setFontSize(11);
  doc.setTextColor(0);

  const executiveSummary =
    analysis.summary ||
    analysis.executive_summary ||
    mission.ai_response ||
    "No executive summary available.";

  const summary =
    doc.splitTextToSize(
      executiveSummary,
      180
    );

  doc.text(summary,14,y);

  y += summary.length*6 + 10;

  //------------------------------------------------
  // Metrics
  //------------------------------------------------

  autoTable(doc,{

    startY:y,

    head:[
      ["Mission Metrics","Value"]
    ],

    body:[

      ["Risk Level",mission.risk_level],

      ["Confidence",`${mission.confidence}%`],

      ["Status",mission.status]

    ],

    headStyles:{
      fillColor:[25,55,120]
    }

  });

  y = doc.lastAutoTable.finalY + 10;

  //------------------------------------------------
  // Key Risks
  //------------------------------------------------

  autoTable(doc,{

    startY:y,

    head:[
      ["Key Risks"]
    ],

    body:keyRisks.map(r=>[r]),

    headStyles:{
      fillColor:[180,30,30]
    }

  });

  y = doc.lastAutoTable.finalY + 10;

  //------------------------------------------------
  // Timeline
  //------------------------------------------------

  if(Object.keys(timeline).length){

    autoTable(doc,{

      startY:y,

      head:[
        ["Mission Phase","Description"]
      ],

      body:Object.entries(timeline).map(
        ([phase,desc])=>[
          phase
            .replace(/phase/i,"Phase ")
            .replaceAll("_"," "),
          desc
        ]
      ),

      headStyles:{
        fillColor:[25,55,120]
      }

    });

    y = doc.lastAutoTable.finalY + 10;

  }

  //------------------------------------------------
  // AI Reasoning
  //------------------------------------------------

  doc.addPage();

  y = 20;

  doc.setFontSize(18);

  doc.setTextColor(25,55,120);

  doc.text(
    "AI Decision Justification",
    14,
    y
  );

  y += 10;

  reasoning.forEach(item=>{

    checkPageSpace(35);

    const txt =
      doc.splitTextToSize(
        "• " + item,
        180
      );

    doc.text(txt,14,y);

    y += txt.length*6 + 5;

  });

  //------------------------------------------------
  // Resource Allocation
  //------------------------------------------------

  checkPageSpace(40);

  doc.setFontSize(18);

  doc.setTextColor(25,55,120);

  doc.text(
    "Resource Allocation",
    14,
    y
  );

  y += 10;

  [
    ["Personnel",resources.personnel],
    ["Vehicles",resources.vehicles],
    ["Equipment",resources.equipment],
    ["Budget",resources.budget]
  ].forEach(([title,value])=>{

    if(!value) return;

    checkPageSpace(55);

    doc.setFontSize(14);
    doc.setFont(undefined,"bold");
    doc.setTextColor(25,55,120);

    doc.text(title,14,y);

    y += 8;

    doc.setFont(undefined,"normal");

    doc.setFontSize(11);

    doc.setTextColor(0);

    const lines =
      doc.splitTextToSize(
        value,
        180
      );

    doc.text(lines,14,y);

    y += lines.length*6 + 10;

  });

//------------------------------------------------
// ALTERNATIVE STRATEGIES
//------------------------------------------------

if (strategies.length) {

  doc.addPage();

  y = 20;

  doc.setFontSize(18);

  doc.setTextColor(25,55,120);

  doc.text(
    "Alternative Strategies",
    14,
    y
  );

  y += 12;

  strategies.forEach((strategy,index)=>{

    checkPageSpace(90);

    if(index>0){

      y += 6;

    }

    doc.setFontSize(15);

    doc.setFont(undefined,"bold");

    doc.setTextColor(25,55,120);

    doc.text(
      strategy.name || `Strategy ${index+1}`,
      14,
      y
    );

    y += 8;

    doc.setFont(undefined,"normal");

    doc.setFontSize(11);

    doc.setTextColor(0);

    const description = doc.splitTextToSize(

      strategy.description ||

      strategy.summary ||

      "",

      180

    );

    doc.text(description,14,y);

    y += description.length*6 + 8;

    //------------------------------------------------
    // Pros
    //------------------------------------------------

    if(strategy.pros?.length){

      checkPageSpace(40);

      doc.setFont(undefined,"bold");

      doc.text("Pros",14,y);

      y += 6;

      doc.setFont(undefined,"normal");

      strategy.pros.forEach((pro)=>{

        checkPageSpace(18);

        const txt = doc.splitTextToSize(

          "• " + pro,

          170

        );

        doc.text(txt,18,y);

        y += txt.length*6;

      });

      y += 6;

    }

    //------------------------------------------------
    // Cons
    //------------------------------------------------

    if(strategy.cons?.length){

      checkPageSpace(40);

      doc.setFont(undefined,"bold");

      doc.text("Cons",14,y);

      y += 6;

      doc.setFont(undefined,"normal");

      strategy.cons.forEach((con)=>{

        checkPageSpace(18);

        const txt = doc.splitTextToSize(

          "• " + con,

          170

        );

        doc.text(txt,18,y);

        y += txt.length*6;

      });

      y += 10;

    }

  });

}

 //------------------------------------------------
 // FOOTER
 //------------------------------------------------

const totalPages = doc.getNumberOfPages();

for(let i=1;i<=totalPages;i++){

  doc.setPage(i);

  doc.setFontSize(10);

  doc.setTextColor(120);

  doc.text(

    "Generated by SentinelAI",

    14,

    290

  );

  doc.text(

    `Page ${i} of ${totalPages}`,

    pageWidth-14,

    290,

    {

      align:"right"

    }

  );

}

 //------------------------------------------------
 // SAVE PDF
 //------------------------------------------------

doc.save(

  `${mission.title || "Mission Report"}.pdf`

);

}