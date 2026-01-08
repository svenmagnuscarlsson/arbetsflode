/**
 * Workflow Data - Arbetsflöde för säkerhetssystem v4.1
 * Strukturerad data baserad på arbetsflode_sakerhetssystem_v4_1.md
 */

const WORKFLOW_DATA = {
  title: "Arbetsflöde för säkerhetssystem",
  version: "4.1",
  
  // Kvalitetskontroll (löpande genom alla faser)
  quality: {
    id: "kvalitet",
    title: "KVALITET",
    description: "Kvalitetskontroll är en integrerad del av samtliga processer.",
    sections: [
      {
        title: "Felhantering",
        items: [
          "Rapportering vid internt upptäckt fel",
          "Rapportering vid kundreklamation",
          "Undersökning av grundorsak",
          "Genomförande av korrigerande åtgärder",
          "Uppföljning av åtgärdernas effektivitet",
          "Dokumentation av alla fel och åtgärder"
        ]
      },
      {
        title: "Ansvar",
        items: [
          "Kvalitetsansvarig utsedd av företagsledningen",
          "Ställföreträdande kvalitetsansvarig (vid större organisationer)",
          "Tydliga ansvar och befogenheter för varje roll"
        ]
      }
    ]
  },

  // Alla steg (intro, faser, gates, sammanfattning)
  steps: [
    // Intro
    {
      id: "intro",
      type: "intro",
      title: "Välkommen",
      description: "Hjälp oss validera arbetsflödet för säkerhetssystem genom att gå igenom varje fas och gate. Din feedback är värdefull för att förbättra processen.",
      features: [
        {
          icon: "📋",
          title: "Granska varje steg",
          description: "Gå igenom aktiviteter, dokumentation och godkännandekriterier"
        },
        {
          icon: "💬",
          title: "Ge feedback",
          description: "Kommentera, föreslå tillägg eller borttagningar"
        },
        {
          icon: "💾",
          title: "Automatisk sparning",
          description: "Din feedback sparas automatiskt lokalt"
        },
        {
          icon: "📤",
          title: "Skicka in",
          description: "I slutet sammanställs din feedback och skickas"
        }
      ]
    },

    // Fas 1: SÄLJ
    {
      id: "salj",
      type: "phase",
      number: 1,
      title: "SÄLJ",
      subtitle: "Anbudsgivning & Avtal",
      sections: [
        {
          title: "Aktiviteter",
          icon: "📋",
          items: [
            "Kundkontakt och initial behovsanalys",
            "Identifiering och förtydligande av kundkrav",
            "Kartläggning av tillämpliga normer och standarder",
            "Systemoffert eller komponentoffert",
            "Genomgång av krav med kund",
            "Dokumentation av alla ändringar och förtydliganden"
          ]
        },
        {
          title: "Dokumentation",
          icon: "📄",
          items: [
            "Offertformulär",
            "Kravspecifikation",
            "Noteringar från uppföljningssamtal",
            "Arkiverade anbud"
          ]
        }
      ]
    },

    // Gate 1
    {
      id: "gate1",
      type: "gate",
      number: 1,
      title: "Gate 1: Ordererkännande",
      criteria: [
        "Kundkrav är fullständigt dokumenterade",
        "Tillämpliga normer och larmklass är fastställda",
        "Offert är godkänd av kund",
        "Ordererkännande är utfärdat och signerat"
      ],
      responsible: "Säljansvarig",
      approvedBy: "Kund + Säljchef"
    },

    // Fas 2: PROJEKTLEDNING
    {
      id: "projektledning",
      type: "phase",
      number: 2,
      title: "PROJEKTLEDNING",
      subtitle: "Uppstart & Styrning",
      sections: [
        {
          title: "Aktiviteter",
          icon: "📋",
          items: [
            "Tillsättning av projektledare",
            "Projektplanering och resursallokering",
            "Kickoff-möte internt",
            "Kickoff-möte med kund",
            "Koordinering av alla faser (pågår genom hela projektet)",
            "Löpande statusrapportering",
            "Riskhantering och eskalering"
          ]
        },
        {
          title: "Dokumentation",
          icon: "📄",
          items: [
            "Projektplan",
            "Resursallokering",
            "Mötesprotokoll",
            "Statusrapporter"
          ]
        }
      ]
    },

    // Gate 2
    {
      id: "gate2",
      type: "gate",
      number: 2,
      title: "Gate 2: Projektstart godkänd",
      criteria: [
        "Projektledare är tillsatt",
        "Resurser är allokerade",
        "Kickoff genomförd med kund",
        "Projektplan är godkänd"
      ],
      responsible: "Projektledare",
      approvedBy: "Projektchef"
    },

    // Fas 3: PROJEKTERING
    {
      id: "projektering",
      type: "phase",
      number: 3,
      title: "PROJEKTERING",
      subtitle: "Teknisk planering",
      sections: [
        {
          title: "Aktiviteter",
          icon: "📋",
          items: [
            "Detaljerad teknisk planering",
            "Inköp av komponenter och tjänster",
            "Avstämning av inköp mot order",
            "Framställning av arbetsdokument",
            "Tidplanering för installation",
            "Intern granskning av projektering"
          ]
        },
        {
          title: "Dokumentation",
          icon: "📄",
          items: [
            "Ritningsunderlag",
            "Kopplingsscheman",
            "Kabeldragningsplaner",
            "Materialspecifikationer",
            "Installationsanvisningar",
            "Arbetsorder",
            "Inköpsorder",
            "Plocklista",
            "Anläggningsmapp"
          ]
        }
      ]
    },

    // Gate 3
    {
      id: "gate3",
      type: "gate",
      number: 3,
      title: "Gate 3: Projektering godkänd",
      criteria: [
        "Teknisk lösning uppfyller kravspecifikation",
        "Alla komponenter är beställda/tillgängliga",
        "Arbetsdokument är kompletta och granskade",
        "Tidplan är realistisk och godkänd",
        "Kund har godkänt systemdesign (vid behov)"
      ],
      responsible: "Projekteringsledare",
      approvedBy: "Projektledare + Kund*"
    },

    // Fas 4: INSTALLATION
    {
      id: "installation",
      type: "phase",
      number: 4,
      title: "INSTALLATION",
      subtitle: "Utförande",
      sections: [
        {
          title: "Aktiviteter",
          icon: "📋",
          items: [
            "Detaljplanering av arbetsmoment",
            "Montering av system enligt ritningar",
            "Löpande dokumentation av avvikelser",
            "Driftsättning",
            "Egenkontroll och testning",
            "Slutprovning mot kravspecifikation"
          ]
        },
        {
          title: "Dokumentation",
          icon: "📄",
          items: [
            "Uppdatering av ritningar vid avvikelser från plan",
            "Dokumentation av tillkommande arbeten",
            "Ändringslogg under byggtid",
            "Testprotokoll",
            "Provningsrapporter",
            "Egenkontrollchecklista"
          ]
        },
        {
          title: "Slutprovning ska verifiera",
          icon: "✓",
          items: [
            "Samtliga detektorer och givare",
            "Centralenhetens funktion",
            "Signalöverföring till larmcentral",
            "Sabotageskydd",
            "Reservkraft/batterifunktion",
            "Larmdon och signalering"
          ]
        }
      ]
    },

    // Gate 4
    {
      id: "gate4",
      type: "gate",
      number: 4,
      title: "Gate 4: Slutprovning godkänd",
      criteria: [
        "Alla testprotokoll är godkända",
        "Anläggningen uppfyller kravspecifikation",
        "Avvikelser är dokumenterade och åtgärdade",
        "Relationsritningar är uppdaterade",
        "Anläggningen är klar för överlämning"
      ],
      responsible: "Installationsansvarig",
      approvedBy: "Projektledare"
    },

    // Fas 5: ÖVERLÄMNANDE
    {
      id: "overlamning",
      type: "phase",
      number: 5,
      title: "ÖVERLÄMNANDE",
      subtitle: "Leverans",
      sections: [
        {
          title: "Aktiviteter",
          icon: "📋",
          items: [
            "Kundutbildning (dokumenterad)",
            "Genomgång av anläggningens funktion",
            "Genomgång av larmrutiner och åtgärder",
            "Dokumentation av anläggningsansvarig och ersättare",
            "Överlämning av dokumentation",
            "Kundgodkännande och signering"
          ]
        },
        {
          title: "Kundutbildning ska dokumentera",
          icon: "🎓",
          items: [
            "Utbildningens omfattning och innehåll",
            "Vem som fått utbildning (namn, roll)",
            "Vem som givit utbildning",
            "Datum och tidpunkt"
          ]
        },
        {
          title: "Dokumentation att överlämna",
          icon: "📤",
          items: [
            "Anläggarintyg",
            "Relationsritningar (uppdaterade)",
            "Skötselinstruktion för larmanläggningen",
            "Anvisningar vid utlöst larm, sabotage eller felsignal",
            "Kontrolljournal",
            "Garantivillkor och kontaktuppgifter"
          ]
        },
        {
          title: "Dokumentation att arkivera",
          icon: "🗄️",
          items: [
            "Namn på anläggningsansvarig",
            "Namn på ersättare för anläggningsansvarig",
            "Kontaktuppgifter",
            "Signerat överlämningsdokument"
          ]
        }
      ]
    },

    // Gate 5
    {
      id: "gate5",
      type: "gate",
      number: 5,
      title: "Gate 5: Projekt avslutat",
      criteria: [
        "Kundutbildning är genomförd och dokumenterad",
        "Anläggningsansvarig och ersättare är dokumenterade",
        "Alla dokument är överlämnade",
        "Kund har signerat mottagande",
        "Eventuella kvarstående punkter är dokumenterade med tidplan"
      ],
      responsible: "Projektledare",
      approvedBy: "Kund"
    },

    // Fas 6: SERVICE
    {
      id: "service",
      type: "phase",
      number: 6,
      title: "SERVICE",
      subtitle: "Eftermarknad",
      sections: [
        {
          title: "Aktiviteter",
          icon: "📋",
          items: [
            "Upprättande av serviceavtal",
            "Planerade revisionsbesiktningar",
            "Teknisk support",
            "Akutservice",
            "Dokumentation av serviceärenden"
          ]
        },
        {
          title: "Feedback och förbättring",
          icon: "🔄",
          items: [
            "Sammanställning av återkommande fel och driftsstörningar",
            "Återkoppling till projektering för framtida förbättringar",
            "Uppdatering av standardlösningar baserat på erfarenhet",
            "Underlag till ledningens genomgång"
          ]
        },
        {
          title: "Dokumentation",
          icon: "📄",
          items: [
            "Serviceavtal",
            "Besiktningsprotokoll",
            "Servicehistorik per anläggning",
            "Felstatistik och trendanalys"
          ]
        }
      ]
    },

    // Sammanfattning
    {
      id: "summary",
      type: "summary",
      title: "Sammanfattning",
      description: "Här kan du se en översikt av all din feedback och skicka in den."
    }
  ],

  // Gate summary table
  gateSummary: [
    { gate: 1, name: "Ordererkännande", responsible: "Säljansvarig", approvedBy: "Kund + Säljchef" },
    { gate: 2, name: "Projektstart godkänd", responsible: "Projektledare", approvedBy: "Projektchef" },
    { gate: 3, name: "Projektering godkänd", responsible: "Projekteringsledare", approvedBy: "Projektledare + Kund*" },
    { gate: 4, name: "Slutprovning godkänd", responsible: "Installationsansvarig", approvedBy: "Projektledare" },
    { gate: 5, name: "Projekt avslutat", responsible: "Projektledare", approvedBy: "Kund" }
  ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WORKFLOW_DATA;
}
