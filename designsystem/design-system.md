# Design System: Modern Monochrome Minimalist v2.0

Detta designsystem är inspirerat av moderna, rena gränssnitt som shadcn/ui och Vercel. Det fokuserar på tydlig typografi, subtila kanter, en strikt monokrom färgpalett samt fullständigt stöd för dark mode och tillgänglighet.

## 1. Design Tokens

### Färger (CSS Variabler)

Använd dessa variabler för att säkerställa konsekvens över hela webbplatsen. Systemet stödjer både ljust och mörkt läge automatiskt.

```css
:root {
  /* Bakgrunder */
  --background: #ffffff;
  --foreground: #09090b;

  /* Kort och Containers */
  --card: #ffffff;
  --card-foreground: #09090b;
  --card-border: #e4e4e7;

  /* Komponenter */
  --primary: #18181b;
  --primary-foreground: #ffffff;
  
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  
  --accent: #f4f4f5;
  --accent-foreground: #18181b;

  /* Status-färger */
  --success: #16a34a;
  --success-foreground: #ffffff;
  
  --error: #dc2626;
  --error-foreground: #ffffff;
  
  --warning: #ea580c;
  --warning-foreground: #ffffff;
  
  --info: #2563eb;
  --info-foreground: #ffffff;

  /* Input & Borders */
  --input: #e4e4e7;
  --input-foreground: #09090b;
  --ring: #18181b;
  --ring-offset: #ffffff;
  
  /* Disabled state */
  --disabled: #fafafa;
  --disabled-foreground: #a1a1aa;

  /* Radier */
  --radius-sm: 0.375rem;  /* 6px */
  --radius: 0.5rem;       /* 8px */
  --radius-md: 0.75rem;   /* 12px */
  --radius-lg: 1rem;      /* 16px */
  --radius-full: 9999px;  /* Pill shape */

  /* Spacing Scale */
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Z-index Scale */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-modal: 2000;
  --z-toast: 3000;
  --z-tooltip: 4000;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #09090b;
    --foreground: #fafafa;

    --card: #18181b;
    --card-foreground: #fafafa;
    --card-border: #27272a;

    --primary: #fafafa;
    --primary-foreground: #18181b;
    
    --secondary: #27272a;
    --secondary-foreground: #fafafa;
    
    --muted: #27272a;
    --muted-foreground: #a1a1aa;
    
    --accent: #27272a;
    --accent-foreground: #fafafa;

    --input: #27272a;
    --input-foreground: #fafafa;
    --ring: #fafafa;
    --ring-offset: #09090b;
    
    --disabled: #18181b;
    --disabled-foreground: #52525b;

    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
  }
}
```

### Breakpoints (Responsive)

```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

### Typografi

**Typsnitt:** Inter, Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

**Storlekar:**
- `--text-xs`: 0.75rem (12px)
- `--text-sm`: 0.875rem (14px) - UI-element standard
- `--text-base`: 1rem (16px) - Brödtext
- `--text-lg`: 1.125rem (18px)
- `--text-xl`: 1.25rem (20px)
- `--text-2xl`: 1.5rem (24px)
- `--text-3xl`: 1.875rem (30px)
- `--text-4xl`: 2.25rem (36px)

**Font Weights:**
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

**Läsbarhet:**
- Radavstånd för brödtext: 1.5
- Radavstånd för rubriker: 1.2
- Letter-spacing för rubriker: -0.02em

## 2. Accessibility Guidelines

### Kontrastförhållanden (WCAG 2.1)
- **Normal text:** Minimum 4.5:1 (AA), Föredrar 7:1 (AAA)
- **Stor text (18px+):** Minimum 3:1 (AA)
- **UI-komponenter:** Minimum 3:1 för kanter och ikoner

Våra färger uppfyller följande:
- `--foreground` på `--background`: ~16:1 ✓
- `--muted-foreground` på `--background`: ~4.8:1 ✓
- `--error` på vit bakgrund: ~5.3:1 ✓

### Focus Indicators
Alla interaktiva element MÅSTE ha synliga focus-indikatorer:
```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Touch Targets
Minimumstorlek: **44x44px** för alla klickbara/tappbara element (WCAG 2.5.5)

### Screen Reader Support
- Använd semantiska HTML-element (button, nav, main, etc.)
- Inkludera `aria-label` för ikoner utan text
- Använd `aria-describedby` för hjälptexter
- Markera required fields med `aria-required="true"`

## 3. Component Guidelines

### Kort (Cards)

**Struktur:**
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Rubrik</h3>
    <p class="card-description">Beskrivning</p>
  </div>
  <div class="card-content">
    <!-- Innehåll -->
  </div>
  <div class="card-footer">
    <!-- Footer-innehåll -->
  </div>
</div>
```

**CSS:**
```css
.card {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-6);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card-header {
  margin-bottom: var(--spacing-4);
}

.card-title {
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--card-foreground);
  margin: 0 0 var(--spacing-2) 0;
}

.card-description {
  font-size: var(--text-sm);
  color: var(--muted-foreground);
  margin: 0;
}

.card-content {
  margin-bottom: var(--spacing-4);
}

.card-footer {
  display: flex;
  gap: var(--spacing-3);
  align-items: center;
}
```

### Knappar (Buttons)

**Varianter och storlekar:**

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  font-size: var(--text-sm);
  font-weight: 500;
  border-radius: var(--radius);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
  white-space: nowrap;
}

.btn:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.btn:disabled {
  background: var(--disabled);
  color: var(--disabled-foreground);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Sizes */
.btn-sm {
  height: 32px;
  padding: 0 var(--spacing-3);
  font-size: var(--text-xs);
}

.btn-md {
  height: 40px;
  padding: 0 var(--spacing-4);
}

.btn-lg {
  height: 48px;
  padding: 0 var(--spacing-5);
  font-size: var(--text-base);
}

/* Primary Variant */
.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-primary:active:not(:disabled) {
  opacity: 0.8;
}

/* Secondary/Outline Variant */
.btn-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--accent);
}

/* Outline Variant */
.btn-outline {
  background: transparent;
  border: 1px solid var(--input);
  color: var(--foreground);
}

.btn-outline:hover:not(:disabled) {
  background: var(--accent);
}

/* Ghost Variant */
.btn-ghost {
  background: transparent;
  color: var(--foreground);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--accent);
}

/* Destructive Variant */
.btn-destructive {
  background: var(--error);
  color: var(--error-foreground);
}

.btn-destructive:hover:not(:disabled) {
  opacity: 0.9;
}
```

**HTML Exempel:**
```html
<button class="btn btn-primary btn-md">Primär knapp</button>
<button class="btn btn-secondary btn-md">Sekundär knapp</button>
<button class="btn btn-outline btn-md">Outline knapp</button>
<button class="btn btn-ghost btn-sm">Ghost knapp</button>
<button class="btn btn-destructive btn-md" disabled>Inaktiverad</button>
```

### Formulärelement (Inputs)

**Struktur:**
```html
<div class="form-group">
  <label for="email" class="form-label">
    E-postadress
    <span class="required" aria-label="obligatoriskt">*</span>
  </label>
  <input 
    type="email" 
    id="email" 
    class="form-input"
    placeholder="namn@exempel.se"
    aria-describedby="email-help"
    required
  />
  <p id="email-help" class="form-help">Vi delar aldrig din e-post.</p>
</div>
```

**CSS:**
```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--foreground);
}

.form-label .required {
  color: var(--error);
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--text-sm);
  background: var(--background);
  color: var(--input-foreground);
  border: 1px solid var(--input);
  border-radius: var(--radius);
  transition: all var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 2px var(--ring-offset), 0 0 0 4px var(--ring);
}

.form-input:disabled,
.form-textarea:disabled,
.form-select:disabled {
  background: var(--disabled);
  color: var(--disabled-foreground);
  cursor: not-allowed;
}

.form-input.error {
  border-color: var(--error);
}

.form-input.error:focus {
  box-shadow: 0 0 0 2px var(--ring-offset), 0 0 0 4px var(--error);
}

.form-help {
  font-size: var(--text-xs);
  color: var(--muted-foreground);
  margin: 0;
}

.form-error {
  font-size: var(--text-xs);
  color: var(--error);
  margin: 0;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}
```

### Checkbox & Radio

```html
<label class="checkbox-wrapper">
  <input type="checkbox" class="checkbox-input" />
  <span class="checkbox-label">Jag godkänner villkoren</span>
</label>
```

```css
.checkbox-wrapper,
.radio-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
}

.checkbox-input,
.radio-input {
  width: 16px;
  height: 16px;
  border: 1px solid var(--input);
  border-radius: var(--radius-sm);
  cursor: pointer;
  accent-color: var(--primary);
}

.radio-input {
  border-radius: 50%;
}

.checkbox-label,
.radio-label {
  font-size: var(--text-sm);
  color: var(--foreground);
  user-select: none;
}
```

### Status Badges

**HTML:**
```html
<span class="badge badge-success">Aktiv</span>
<span class="badge badge-error">Fel</span>
<span class="badge badge-warning">Varning</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-default">Standard</span>
```

**CSS:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.badge-default {
  background: var(--muted);
  color: var(--muted-foreground);
}

.badge-success {
  background: var(--success);
  color: var(--success-foreground);
}

.badge-error {
  background: var(--error);
  color: var(--error-foreground);
}

.badge-warning {
  background: var(--warning);
  color: var(--warning-foreground);
}

.badge-info {
  background: var(--info);
  color: var(--info-foreground);
}
```

### Alert/Notification

```html
<div class="alert alert-info" role="alert">
  <svg class="alert-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <!-- Icon SVG -->
  </svg>
  <div class="alert-content">
    <h4 class="alert-title">Information</h4>
    <p class="alert-description">Din profil har uppdaterats framgångsrikt.</p>
  </div>
</div>
```

```css
.alert {
  display: flex;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  border-radius: var(--radius);
  border-left: 3px solid;
}

.alert-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-size: var(--text-sm);
  font-weight: 600;
  margin: 0 0 var(--spacing-1) 0;
}

.alert-description {
  font-size: var(--text-sm);
  margin: 0;
}

.alert-success {
  background: color-mix(in srgb, var(--success) 10%, transparent);
  border-color: var(--success);
  color: color-mix(in srgb, var(--success) 90%, black);
}

.alert-error {
  background: color-mix(in srgb, var(--error) 10%, transparent);
  border-color: var(--error);
  color: color-mix(in srgb, var(--error) 90%, black);
}

.alert-warning {
  background: color-mix(in srgb, var(--warning) 10%, transparent);
  border-color: var(--warning);
  color: color-mix(in srgb, var(--warning) 90%, black);
}

.alert-info {
  background: color-mix(in srgb, var(--info) 10%, transparent);
  border-color: var(--info);
  color: color-mix(in srgb, var(--info) 90%, black);
}
```

## 4. Layout Principles

### Container
```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--spacing-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--spacing-8);
  }
}
```

### Grid System
```css
.grid {
  display: grid;
  gap: var(--spacing-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive */
@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Flex Utilities
```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }

.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }

.gap-1 { gap: var(--spacing-1); }
.gap-2 { gap: var(--spacing-2); }
.gap-3 { gap: var(--spacing-3); }
.gap-4 { gap: var(--spacing-4); }
.gap-6 { gap: var(--spacing-6); }
.gap-8 { gap: var(--spacing-8); }
```

### Whitespace Guidelines
- Mellan sektioner: `var(--spacing-12)` till `var(--spacing-16)`
- Mellan relaterade element: `var(--spacing-4)` till `var(--spacing-6)`
- Inom komponenter: `var(--spacing-2)` till `var(--spacing-4)`

### Alignment
- Formulär och funktionellt innehåll: Vänsterställt
- Marketing/Hero-sektioner: Centrerat OK
- Maximalt innehållsbredd: 65-75 tecken för läsbarhet

## 5. Animation Principles

### När ska man animera?
- ✅ State changes (hover, active, focus)
- ✅ Loading states
- ✅ Modal/dropdown entrances
- ✅ Success/error feedback
- ❌ INTE stora, distraktioner animationer
- ❌ INTE onödiga dekorativa effekter

### Easing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Performance
- Animera endast `transform` och `opacity` för bästa prestanda
- Undvik att animera `width`, `height`, `top`, `left`
- Använd `will-change` sparsamt

```css
.animated-element {
  transition: transform var(--transition-base), opacity var(--transition-base);
}

.animated-element:hover {
  transform: translateY(-2px);
}
```

## 6. Icons

**Rekommenderade bibliotek:**
- Lucide Icons (https://lucide.dev)
- Phosphor Icons (https://phosphoricons.com)
- Heroicons (https://heroicons.com)

**Storlekar:**
- Small: 16px
- Medium: 20px (standard)
- Large: 24px

**Användning:**
```html
<button class="btn btn-primary btn-md">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
  Lägg till
</button>
```

## 7. Komplett Exempel (HTML + CSS)

```html
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Monochrome Design</title>
  <style>
    /* Importera alla CSS-variabler och styles från ovan */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--background);
      color: var(--foreground);
      line-height: 1.5;
      padding: var(--spacing-8) var(--spacing-4);
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Betalningsmetod</h2>
        <p class="card-description">Välj hur du vill betala din order.</p>
      </div>
      
      <div class="card-content">
        <form>
          <div class="form-group">
            <label for="cardNumber" class="form-label">
              Kortnummer
              <span class="required" aria-label="obligatoriskt">*</span>
            </label>
            <input 
              type="text" 
              id="cardNumber" 
              class="form-input"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div class="grid grid-cols-2">
            <div class="form-group">
              <label for="expiry" class="form-label">Utgångsdatum</label>
              <input 
                type="text" 
                id="expiry" 
                class="form-input"
                placeholder="MM/ÅÅ"
              />
            </div>

            <div class="form-group">
              <label for="cvc" class="form-label">CVC</label>
              <input 
                type="text" 
                id="cvc" 
                class="form-input"
                placeholder="123"
              />
            </div>
          </div>

          <label class="checkbox-wrapper">
            <input type="checkbox" class="checkbox-input" />
            <span class="checkbox-label">Spara kortuppgifter för framtida köp</span>
          </label>
        </form>
      </div>

      <div class="card-footer">
        <button class="btn btn-primary btn-md" style="flex: 1;">
          Slutför köp
        </button>
        <button class="btn btn-outline btn-md">
          Avbryt
        </button>
      </div>
    </div>

    <div class="alert alert-info" role="alert" style="margin-top: var(--spacing-6);">
      <div class="alert-content">
        <h4 class="alert-title">Säker betalning</h4>
        <p class="alert-description">Alla transaktioner är krypterade och säkra.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

## 8. Best Practices för Claude

### När Claude skapar HTML-sidor:

1. **Inkludera alltid:**
   - Komplett CSS med variabler i `<style>` eller separat fil
   - Semantic HTML (main, section, article, nav, etc.)
   - Aria-labels för ikoner och interaktiva element
   - Meta viewport tag för responsive design

2. **Responsiv design:**
   - Mobile-first approach
   - Testa break points vid 640px, 768px, 1024px
   - Stack kolumner vertikalt på mobil

3. **Accessibility checklist:**
   - ✅ Alt-text på alla bilder
   - ✅ Focus states på alla interaktiva element
   - ✅ Semantic HTML
   - ✅ ARIA-labels där nödvändigt
   - ✅ Color contrast minimum 4.5:1
   - ✅ Touch targets minimum 44x44px

4. **Performance:**
   - Inline kritisk CSS
   - Lazy load bilder vid behov
   - Minimera animationer
   - Använd system fonts för snabb laddning

### Vanliga komponenter att inkludera:

- Navigation bar (sticky/fixed)
- Hero section
- Cards grid för innehåll
- Formulär med validering
- Footer med länkar
- Loading states
- Toast notifications
- Modal dialogs