# Arbetsflöde för säkerhetssystem
**Version 4.1** | Datum: 2026-01-08

## Processöversikt

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    KVALITET (Löpande genom alla faser)                      │
│         Felrapportering • Korrigerande åtgärder • Dokumentation             │
└─────────────────────────────────────────────────────────────────────────────┘
        │           │            │            │            │
        ▼           ▼            ▼            ▼            ▼
    ┌───────┐   ┌────────┐   ┌──────────┐  ┌───────────┐  ┌─────────┐
    │ SÄLJ  │──▶│PROJEKT-│──▶│PROJEKTE- │──▶│INSTALLA-  │──▶│ÖVERLÄMN-│──▶ SERVICE
    │       │   │LEDNING │   │RING      │  │TION       │  │ANDE     │
    └───────┘   └────────┘   └──────────┘  └───────────┘  └─────────┘
          │           │            │             │             │
       GATE 1      GATE 2       GATE 3        GATE 4        GATE 5
                                    │
                                    ▼
                            ┌──────────────┐
                            │  FEEDBACK    │
                            │  TILL NYA    │
                            │  PROJEKT     │
                            └──────────────┘
```

---

## KVALITET (Löpande genom alla faser)

Kvalitetskontroll är en integrerad del av samtliga processer.

### Felhantering
- Rapportering vid internt upptäckt fel
- Rapportering vid kundreklamation
- Undersökning av grundorsak
- Genomförande av korrigerande åtgärder
- Uppföljning av åtgärdernas effektivitet
- Dokumentation av alla fel och åtgärder

### Ansvar
- Kvalitetsansvarig utsedd av företagsledningen
- Ställföreträdande kvalitetsansvarig (vid större organisationer)
- Tydliga ansvar och befogenheter för varje roll

---

## 1. SÄLJ (Anbudsgivning & Avtal)

### Aktiviteter
- Kundkontakt och initial behovsanalys
- Identifiering och förtydligande av kundkrav
- Kartläggning av tillämpliga normer och standarder
- Systemoffert eller komponentoffert
- Genomgång av krav med kund
- Dokumentation av alla ändringar och förtydliganden

### Dokumentation
- Offertformulär
- Kravspecifikation
- Noteringar från uppföljningssamtal
- Arkiverade anbud

### ✓ GATE 1: Ordererkännande
**Kriterier för godkännande:**
- Kundkrav är fullständigt dokumenterade
- Tillämpliga normer och larmklass är fastställda
- Offert är godkänd av kund
- Ordererkännande är utfärdat och signerat

---

## 2. PROJEKTLEDNING (Uppstart & Styrning)

### Aktiviteter
- Tillsättning av projektledare
- Projektplanering och resursallokering
- Kickoff-möte internt
- Kickoff-möte med kund
- Koordinering av alla faser (pågår genom hela projektet)
- Löpande statusrapportering
- Riskhantering och eskalering

### Dokumentation
- Projektplan
- Resursallokering
- Mötesprotokoll
- Statusrapporter

### ✓ GATE 2: Projektstart godkänd
**Kriterier för godkännande:**
- Projektledare är tillsatt
- Resurser är allokerade
- Kickoff genomförd med kund
- Projektplan är godkänd

---

## 3. PROJEKTERING (Teknisk planering)

### Aktiviteter
- Detaljerad teknisk planering
- Inköp av komponenter och tjänster
- Avstämning av inköp mot order
- Framställning av arbetsdokument
- Tidplanering för installation
- Intern granskning av projektering

### Dokumentation (Skapande)
- Ritningsunderlag
- Kopplingsscheman
- Kabeldragningsplaner
- Materialspecifikationer
- Installationsanvisningar
- Arbetsorder
- Inköpsorder
- Plocklista
- Anläggningsmapp

### ✓ GATE 3: Projektering godkänd
**Kriterier för godkännande:**
- Teknisk lösning uppfyller kravspecifikation
- Alla komponenter är beställda/tillgängliga
- Arbetsdokument är kompletta och granskade
- Tidplan är realistisk och godkänd
- Kund har godkänt systemdesign (vid behov)

---

## 4. INSTALLATION (Utförande)

### Aktiviteter
- Detaljplanering av arbetsmoment
- Montering av system enligt ritningar
- Löpande dokumentation av avvikelser
- Driftsättning
- Egenkontroll och testning
- Slutprovning mot kravspecifikation

### Dokumentation (Revidering)
- Uppdatering av ritningar vid avvikelser från plan
- Dokumentation av tillkommande arbeten
- Ändringslogg under byggtid
- Testprotokoll
- Provningsrapporter
- Egenkontrollchecklista

### Slutprovning ska verifiera
- Samtliga detektorer och givare
- Centralenhetens funktion
- Signalöverföring till larmcentral
- Sabotageskydd
- Reservkraft/batterifunktion
- Larmdon och signalering

### ✓ GATE 4: Slutprovning godkänd
**Kriterier för godkännande:**
- Alla testprotokoll är godkända
- Anläggningen uppfyller kravspecifikation
- Avvikelser är dokumenterade och åtgärdade
- Relationsritningar är uppdaterade
- Anläggningen är klar för överlämning

---

## 5. ÖVERLÄMNANDE (Leverans)

### Aktiviteter
- Kundutbildning (dokumenterad)
- Genomgång av anläggningens funktion
- Genomgång av larmrutiner och åtgärder
- Dokumentation av anläggningsansvarig och ersättare
- Överlämning av dokumentation
- Kundgodkännande och signering

### Kundutbildning ska dokumentera
- Utbildningens omfattning och innehåll
- Vem som fått utbildning (namn, roll)
- Vem som givit utbildning
- Datum och tidpunkt

### Dokumentation att överlämna
- Anläggarintyg
- Relationsritningar (uppdaterade)
- Skötselinstruktion för larmanläggningen
- Anvisningar vid utlöst larm, sabotage eller felsignal
- Kontrolljournal
- Garantivillkor och kontaktuppgifter

### Dokumentation att arkivera
- Namn på anläggningsansvarig
- Namn på ersättare för anläggningsansvarig
- Kontaktuppgifter
- Signerat överlämningsdokument

### ✓ GATE 5: Projekt avslutat
**Kriterier för godkännande:**
- Kundutbildning är genomförd och dokumenterad
- Anläggningsansvarig och ersättare är dokumenterade
- Alla dokument är överlämnade
- Kund har signerat mottagande
- Eventuella kvarstående punkter är dokumenterade med tidplan

---

## 6. SERVICE (Eftermarknad)

### Aktiviteter
- Upprättande av serviceavtal
- Planerade revisionsbesiktningar
- Teknisk support
- Akutservice
- Dokumentation av serviceärenden

### Feedback och förbättring
- Sammanställning av återkommande fel och driftsstörningar
- Återkoppling till projektering för framtida förbättringar
- Uppdatering av standardlösningar baserat på erfarenhet
- Underlag till ledningens genomgång

### Dokumentation
- Serviceavtal
- Besiktningsprotokoll
- Servicehistorik per anläggning
- Felstatistik och trendanalys

---

## Bilaga A: Beslutspunkter (Gates) - Sammanfattning

| Gate | Namn | Ansvarig | Godkänns av |
|------|------|----------|-------------|
| 1 | Ordererkännande | Säljansvarig | Kund + Säljchef |
| 2 | Projektstart godkänd | Projektledare | Projektchef |
| 3 | Projektering godkänd | Projekteringsledare | Projektledare + Kund* |
| 4 | Slutprovning godkänd | Installationsansvarig | Projektledare |
| 5 | Projekt avslutat | Projektledare | Kund |

*Vid större projekt eller på kundens begäran
