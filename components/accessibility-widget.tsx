"use client"

import { useState, useEffect, useReducer, useRef, useCallback } from "react"

// ─── Types ───────────────────────────────────────────────────────────────────

type ProfileType =
  | "seizureSafe"
  | "visionImpaired"
  | "adhdFriendly"
  | "cognitiveDisability"
  | "blindUsers"

interface AccessibilitySettings {
  textSize: number
  lineHeight: number
  letterSpacing: number
  wordSpacing: number
  textAlign: "default" | "left" | "center" | "right" | "justify"
  dyslexiaFont: boolean
  contentScale: number
  contrastMode:
    | "default"
    | "high"
    | "dark"
    | "light"
    | "monochrome"
    | "lowSaturation"
    | "highSaturation"
  textColor: string
  titleColor: string
  backgroundColor: string
  readingGuide: boolean
  readingMask: boolean
  highlightFocus: boolean
  highlightHover: boolean
  bigCursor: boolean
  hideImages: boolean
  stopAnimations: boolean
  muteSounds: boolean
  tooltips: boolean
  pageStructure: boolean
  usefulLinks: boolean
  keyboardNav: boolean
  activeProfile: ProfileType | null
}

type SettingsAction =
  | { type: "SET_TEXT_SIZE"; payload: number }
  | { type: "SET_LINE_HEIGHT"; payload: number }
  | { type: "SET_LETTER_SPACING"; payload: number }
  | { type: "SET_WORD_SPACING"; payload: number }
  | { type: "SET_TEXT_ALIGN"; payload: AccessibilitySettings["textAlign"] }
  | { type: "TOGGLE_DYSLEXIA_FONT" }
  | { type: "SET_CONTENT_SCALE"; payload: number }
  | {
      type: "SET_CONTRAST_MODE"
      payload: AccessibilitySettings["contrastMode"]
    }
  | { type: "SET_TEXT_COLOR"; payload: string }
  | { type: "SET_TITLE_COLOR"; payload: string }
  | { type: "SET_BACKGROUND_COLOR"; payload: string }
  | { type: "TOGGLE_READING_GUIDE" }
  | { type: "TOGGLE_READING_MASK" }
  | { type: "TOGGLE_HIGHLIGHT_FOCUS" }
  | { type: "TOGGLE_HIGHLIGHT_HOVER" }
  | { type: "TOGGLE_BIG_CURSOR" }
  | { type: "TOGGLE_HIDE_IMAGES" }
  | { type: "TOGGLE_STOP_ANIMATIONS" }
  | { type: "TOGGLE_MUTE_SOUNDS" }
  | { type: "TOGGLE_TOOLTIPS" }
  | { type: "TOGGLE_PAGE_STRUCTURE" }
  | { type: "TOGGLE_USEFUL_LINKS" }
  | { type: "TOGGLE_KEYBOARD_NAV" }
  | {
      type: "ACTIVATE_PROFILE"
      payload: {
        profile: ProfileType
        settings: Partial<AccessibilitySettings>
      }
    }
  | { type: "DEACTIVATE_PROFILE"; payload: AccessibilitySettings }
  | { type: "LOAD_SETTINGS"; payload: Partial<AccessibilitySettings> }
  | { type: "RESET_ALL" }

// ─── Constants ───────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: 100,
  lineHeight: 0,
  letterSpacing: 0,
  wordSpacing: 0,
  textAlign: "default",
  dyslexiaFont: false,
  contentScale: 100,
  contrastMode: "default",
  textColor: "",
  titleColor: "",
  backgroundColor: "",
  readingGuide: false,
  readingMask: false,
  highlightFocus: false,
  highlightHover: false,
  bigCursor: false,
  hideImages: false,
  stopAnimations: false,
  muteSounds: false,
  tooltips: false,
  pageStructure: false,
  usefulLinks: false,
  keyboardNav: false,
  activeProfile: null,
}

const PROFILE_DEFS: {
  id: ProfileType
  label: string
  icon: string
  settings: Partial<AccessibilitySettings>
}[] = [
  {
    id: "seizureSafe",
    label: "Seizure Safe",
    icon: "⚡",
    settings: {
      stopAnimations: true,
      muteSounds: true,
      contrastMode: "lowSaturation",
    },
  },
  {
    id: "visionImpaired",
    label: "Vision Impaired",
    icon: "👁",
    settings: { textSize: 150, contrastMode: "high", bigCursor: true },
  },
  {
    id: "adhdFriendly",
    label: "ADHD Friendly",
    icon: "🧠",
    settings: {
      readingMask: true,
      highlightFocus: true,
      stopAnimations: true,
    },
  },
  {
    id: "cognitiveDisability",
    label: "Cognitive Disability",
    icon: "💡",
    settings: {
      dyslexiaFont: true,
      letterSpacing: 3,
      wordSpacing: 6,
      lineHeight: 2.0,
      readingGuide: true,
    },
  },
  {
    id: "blindUsers",
    label: "Blind Users",
    icon: "🦯",
    settings: { keyboardNav: true },
  },
]

const clamp = (v: number, min: number, max: number, step: number) => {
  const clamped = Math.min(max, Math.max(min, v))
  return Math.round(clamped / step) * step
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

function settingsReducer(
  state: AccessibilitySettings,
  action: SettingsAction
): AccessibilitySettings {
  switch (action.type) {
    case "SET_TEXT_SIZE":
      return {
        ...state,
        textSize: clamp(action.payload, 80, 200, 10),
        activeProfile: null,
      }
    case "SET_LINE_HEIGHT":
      return {
        ...state,
        lineHeight:
          action.payload === 0 ? 0 : clamp(action.payload, 1, 3, 0.5),
        activeProfile: null,
      }
    case "SET_LETTER_SPACING":
      return {
        ...state,
        letterSpacing: clamp(action.payload, 0, 10, 1),
        activeProfile: null,
      }
    case "SET_WORD_SPACING":
      return {
        ...state,
        wordSpacing: clamp(action.payload, 0, 16, 2),
        activeProfile: null,
      }
    case "SET_TEXT_ALIGN":
      return { ...state, textAlign: action.payload, activeProfile: null }
    case "TOGGLE_DYSLEXIA_FONT":
      return {
        ...state,
        dyslexiaFont: !state.dyslexiaFont,
        activeProfile: null,
      }
    case "SET_CONTENT_SCALE":
      return {
        ...state,
        contentScale: clamp(action.payload, 80, 150, 10),
        activeProfile: null,
      }
    case "SET_CONTRAST_MODE":
      return {
        ...state,
        contrastMode:
          state.contrastMode === action.payload ? "default" : action.payload,
        activeProfile: null,
      }
    case "SET_TEXT_COLOR":
      return { ...state, textColor: action.payload, activeProfile: null }
    case "SET_TITLE_COLOR":
      return { ...state, titleColor: action.payload, activeProfile: null }
    case "SET_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload, activeProfile: null }
    case "TOGGLE_READING_GUIDE":
      return {
        ...state,
        readingGuide: !state.readingGuide,
        activeProfile: null,
      }
    case "TOGGLE_READING_MASK":
      return {
        ...state,
        readingMask: !state.readingMask,
        activeProfile: null,
      }
    case "TOGGLE_HIGHLIGHT_FOCUS":
      return {
        ...state,
        highlightFocus: !state.highlightFocus,
        activeProfile: null,
      }
    case "TOGGLE_HIGHLIGHT_HOVER":
      return {
        ...state,
        highlightHover: !state.highlightHover,
        activeProfile: null,
      }
    case "TOGGLE_BIG_CURSOR":
      return { ...state, bigCursor: !state.bigCursor, activeProfile: null }
    case "TOGGLE_HIDE_IMAGES":
      return { ...state, hideImages: !state.hideImages, activeProfile: null }
    case "TOGGLE_STOP_ANIMATIONS":
      return {
        ...state,
        stopAnimations: !state.stopAnimations,
        activeProfile: null,
      }
    case "TOGGLE_MUTE_SOUNDS":
      return { ...state, muteSounds: !state.muteSounds, activeProfile: null }
    case "TOGGLE_TOOLTIPS":
      return { ...state, tooltips: !state.tooltips, activeProfile: null }
    case "TOGGLE_PAGE_STRUCTURE":
      return {
        ...state,
        pageStructure: !state.pageStructure,
        activeProfile: null,
      }
    case "TOGGLE_USEFUL_LINKS":
      return { ...state, usefulLinks: !state.usefulLinks, activeProfile: null }
    case "TOGGLE_KEYBOARD_NAV":
      return { ...state, keyboardNav: !state.keyboardNav, activeProfile: null }
    case "ACTIVATE_PROFILE":
      return {
        ...state,
        ...action.payload.settings,
        activeProfile: action.payload.profile,
      }
    case "DEACTIVATE_PROFILE":
      return { ...action.payload, activeProfile: null }
    case "LOAD_SETTINGS":
      return { ...DEFAULT_SETTINGS, ...action.payload }
    case "RESET_ALL":
      return { ...DEFAULT_SETTINGS }
    default:
      return state
  }
}

// ─── buildStyleSheet ─────────────────────────────────────────────────────────

const EX = ":not([data-a11y-widget]):not([data-a11y-widget] *)"

function buildStyleSheet(s: AccessibilitySettings): string {
  const r: string[] = []
  if (s.textSize !== 100)
    r.push(
      `html { font-size: ${s.textSize}% !important; } [data-a11y-widget], [data-a11y-widget] * { font-size: 16px !important; }`
    )
  if (s.lineHeight > 0)
    r.push(`body *${EX} { line-height: ${s.lineHeight} !important; }`)
  if (s.letterSpacing > 0)
    r.push(
      `body *${EX} { letter-spacing: ${s.letterSpacing}px !important; }`
    )
  if (s.wordSpacing > 0)
    r.push(`body *${EX} { word-spacing: ${s.wordSpacing}px !important; }`)
  if (s.textAlign !== "default")
    r.push(
      `body p${EX}, body li${EX}, body span${EX}, body div${EX} { text-align: ${s.textAlign} !important; }`
    )
  if (s.dyslexiaFont)
    r.push(
      `body *${EX} { font-family: "OpenDyslexic", "Comic Sans MS", sans-serif !important; }`
    )
  if (s.contentScale !== 100)
    r.push(
      `body > *${EX} { transform: scale(${s.contentScale / 100}) !important; transform-origin: top left !important; }`
    )
  if (s.contrastMode === "high")
    r.push(`body${EX} { filter: contrast(1.5) !important; }`)
  if (s.contrastMode === "dark") {
    r.push(
      `body${EX} { filter: invert(1) hue-rotate(180deg) !important; }`
    )
    r.push(
      `body img${EX}, body video${EX}, body iframe${EX} { filter: invert(1) hue-rotate(180deg) !important; }`
    )
  }
  if (s.contrastMode === "light")
    r.push(
      `body${EX} { background-color: #FFFFFF !important; color: #000000 !important; }`
    )
  if (s.contrastMode === "monochrome")
    r.push(`body${EX} { filter: grayscale(100%) !important; }`)
  if (s.contrastMode === "lowSaturation")
    r.push(`body${EX} { filter: saturate(0.3) !important; }`)
  if (s.contrastMode === "highSaturation")
    r.push(`body${EX} { filter: saturate(2.0) !important; }`)
  if (s.textColor)
    r.push(
      `body p${EX}, body span${EX}, body li${EX}, body td${EX}, body label${EX} { color: ${s.textColor} !important; }`
    )
  if (s.titleColor)
    r.push(
      `body h1${EX}, body h2${EX}, body h3${EX}, body h4${EX}, body h5${EX}, body h6${EX} { color: ${s.titleColor} !important; }`
    )
  if (s.backgroundColor)
    r.push(
      `body${EX}, body main${EX}, body section${EX}, body div${EX} { background-color: ${s.backgroundColor} !important; }`
    )
  if (s.highlightFocus)
    r.push(
      `body *${EX}:focus { outline: 3px solid #F4C542 !important; outline-offset: 2px !important; }`
    )
  if (s.highlightHover)
    r.push(
      `body *${EX}:hover { outline: 3px solid #F4C542 !important; outline-offset: 2px !important; }`
    )
  if (s.bigCursor)
    r.push(
      `body *${EX} { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%230c4a6e' stroke='white' stroke-width='2'/%3E%3C/svg%3E") 16 16, auto !important; }`
    )
  if (s.hideImages)
    r.push(`body img${EX} { visibility: hidden !important; }`)
  if (s.stopAnimations)
    r.push(
      `body *${EX}, body *${EX}::before, body *${EX}::after { animation-duration: 0s !important; transition-duration: 0s !important; }`
    )
  if (s.keyboardNav)
    r.push(
      `body a${EX}:focus, body button${EX}:focus, body input${EX}:focus, body select${EX}:focus, body textarea${EX}:focus { outline: 3px solid #F4C542 !important; outline-offset: 2px !important; }`
    )
  return r.join("\n")
}

// ─── Inline style constants for CSS isolation ────────────────────────────────

const WIDGET_FONT = "system-ui, -apple-system, sans-serif"
const WIDGET_BASE: React.CSSProperties = {
  fontSize: "16px",
  fontFamily: WIDGET_FONT,
  lineHeight: "1.4",
  letterSpacing: "0px",
  wordSpacing: "0px",
  textAlign: "left" as const,
  color: "#333",
  cursor: "default",
  boxSizing: "border-box" as const,
}

// ─── useCursorY hook ─────────────────────────────────────────────────────────

function useCursorY(enabled: boolean): number {
  const [y, setY] = useState(0)
  const rafRef = useRef(0)
  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => setY(e.clientY))
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [enabled])
  return y
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategorySection({
  title,
  defaultExpanded,
  children,
}: {
  title: string
  defaultExpanded?: boolean
  children: React.ReactNode
}) {
  const [expanded, setExpanded] = useState(defaultExpanded ?? false)
  return (
    <div style={{ ...WIDGET_BASE, borderBottom: "1px solid #e5e7eb" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        style={{
          ...WIDGET_BASE,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "13px",
          color: "#0c4a6e",
        }}
      >
        {title}
        <span
          style={{
            ...WIDGET_BASE,
            fontSize: "12px",
            transition: "transform 200ms",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </button>
      {expanded && (
        <div style={{ ...WIDGET_BASE, paddingBottom: "12px" }}>{children}</div>
      )}
    </div>
  )
}

function StepperControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (v: number) => void
}) {
  const btnStyle: React.CSSProperties = {
    ...WIDGET_BASE,
    width: "28px",
    height: "28px",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    background: "#f9fafb",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 700,
    color: "#374151",
    padding: 0,
  }
  return (
    <div
      style={{
        ...WIDGET_BASE,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 0",
      }}
    >
      <span style={{ ...WIDGET_BASE, fontSize: "12px", color: "#4b5563" }}>
        {label}
      </span>
      <div
        style={{
          ...WIDGET_BASE,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <button
          style={btnStyle}
          onClick={() => onChange(Math.max(min, value - step))}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span
          style={{
            ...WIDGET_BASE,
            fontSize: "12px",
            fontWeight: 600,
            minWidth: "40px",
            textAlign: "center",
          }}
        >
          {value}
          {unit}
        </span>
        <button
          style={btnStyle}
          onClick={() => onChange(Math.min(max, value + step))}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

function ToggleSwitch({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label
      style={{
        ...WIDGET_BASE,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 0",
        cursor: "pointer",
      }}
    >
      <span style={{ ...WIDGET_BASE, fontSize: "12px", color: "#4b5563" }}>
        {label}
      </span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        style={{
          ...WIDGET_BASE,
          position: "relative",
          width: "36px",
          height: "20px",
          borderRadius: "10px",
          border: "none",
          background: checked ? "#0c4a6e" : "#d1d5db",
          cursor: "pointer",
          padding: 0,
          transition: "background 200ms",
        }}
      >
        <span
          style={{
            ...WIDGET_BASE,
            position: "absolute",
            top: "2px",
            left: checked ? "18px" : "2px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            transition: "left 200ms",
          }}
        />
      </button>
    </label>
  )
}

function AlignmentPicker({
  value,
  onChange,
}: {
  value: AccessibilitySettings["textAlign"]
  onChange: (v: AccessibilitySettings["textAlign"]) => void
}) {
  const opts: {
    v: AccessibilitySettings["textAlign"]
    label: string
    icon: string
  }[] = [
    { v: "default", label: "Default", icon: "↩" },
    { v: "left", label: "Left", icon: "⫷" },
    { v: "center", label: "Center", icon: "☰" },
    { v: "right", label: "Right", icon: "⫸" },
    { v: "justify", label: "Justify", icon: "≡" },
  ]
  return (
    <div style={{ ...WIDGET_BASE, padding: "4px 0" }}>
      <span
        style={{
          ...WIDGET_BASE,
          fontSize: "12px",
          color: "#4b5563",
          display: "block",
          marginBottom: "4px",
        }}
      >
        Text Alignment
      </span>
      <div style={{ ...WIDGET_BASE, display: "flex", gap: "4px" }}>
        {opts.map((o) => (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            title={o.label}
            style={{
              ...WIDGET_BASE,
              flex: 1,
              padding: "4px",
              border: `1px solid ${value === o.v ? "#0c4a6e" : "#d1d5db"}`,
              borderRadius: "4px",
              background: value === o.v ? "#0c4a6e" : "#f9fafb",
              color: value === o.v ? "#fff" : "#374151",
              cursor: "pointer",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            {o.icon}
          </button>
        ))}
      </div>
    </div>
  )
}

function ContrastModeGrid({
  value,
  onChange,
}: {
  value: AccessibilitySettings["contrastMode"]
  onChange: (v: AccessibilitySettings["contrastMode"]) => void
}) {
  const modes: {
    v: AccessibilitySettings["contrastMode"]
    label: string
  }[] = [
    { v: "high", label: "High Contrast" },
    { v: "dark", label: "Dark" },
    { v: "light", label: "Light" },
    { v: "monochrome", label: "Monochrome" },
    { v: "lowSaturation", label: "Low Saturation" },
    { v: "highSaturation", label: "High Saturation" },
  ]
  return (
    <div style={{ ...WIDGET_BASE, padding: "4px 0" }}>
      <span
        style={{
          ...WIDGET_BASE,
          fontSize: "12px",
          color: "#4b5563",
          display: "block",
          marginBottom: "4px",
        }}
      >
        Contrast Mode
      </span>
      <div
        style={{
          ...WIDGET_BASE,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px",
        }}
      >
        {modes.map((m) => (
          <button
            key={m.v}
            onClick={() => onChange(m.v)}
            style={{
              ...WIDGET_BASE,
              padding: "6px 4px",
              border: `1px solid ${value === m.v ? "#0c4a6e" : "#d1d5db"}`,
              borderRadius: "4px",
              background: value === m.v ? "#0c4a6e" : "#f9fafb",
              color: value === m.v ? "#fff" : "#374151",
              cursor: "pointer",
              fontSize: "11px",
              textAlign: "center",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ColorPickerControl({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div
      style={{
        ...WIDGET_BASE,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 0",
      }}
    >
      <span style={{ ...WIDGET_BASE, fontSize: "12px", color: "#4b5563" }}>
        {label}
      </span>
      <div
        style={{
          ...WIDGET_BASE,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          style={{
            ...WIDGET_BASE,
            width: "28px",
            height: "28px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            padding: 0,
            cursor: "pointer",
          }}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            style={{
              ...WIDGET_BASE,
              fontSize: "10px",
              color: "#ef4444",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Page Structure & Useful Links ───────────────────────────────────────────

function PageStructureViewer() {
  const [headings, setHeadings] = useState<
    { tag: string; text: string; el: Element }[]
  >([])
  useEffect(() => {
    const els = document.querySelectorAll(
      "h1:not([data-a11y-widget] *), h2:not([data-a11y-widget] *), h3:not([data-a11y-widget] *), h4:not([data-a11y-widget] *), h5:not([data-a11y-widget] *), h6:not([data-a11y-widget] *)"
    )
    setHeadings(
      Array.from(els).map((el) => ({
        tag: el.tagName.toLowerCase(),
        text: el.textContent?.trim() || "",
        el,
      }))
    )
  }, [])
  const indent: Record<string, number> = {
    h1: 0,
    h2: 12,
    h3: 24,
    h4: 36,
    h5: 48,
    h6: 60,
  }
  if (headings.length === 0)
    return (
      <p
        style={{
          ...WIDGET_BASE,
          fontSize: "11px",
          color: "#9ca3af",
          padding: "4px 0",
        }}
      >
        No headings found
      </p>
    )
  return (
    <div
      style={{
        ...WIDGET_BASE,
        maxHeight: "150px",
        overflowY: "auto",
        padding: "4px 0",
      }}
    >
      {headings.map((h, i) => (
        <button
          key={i}
          onClick={() => {
            h.el.scrollIntoView({ behavior: "smooth", block: "center" })
            ;(h.el as HTMLElement).style.outline = "3px solid #F4C542"
            setTimeout(() => {
              ;(h.el as HTMLElement).style.outline = ""
            }, 2000)
          }}
          style={{
            ...WIDGET_BASE,
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "3px 4px",
            paddingLeft: `${indent[h.tag] ?? 0}px`,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "11px",
            color: "#0c4a6e",
          }}
        >
          <span
            style={{
              ...WIDGET_BASE,
              fontSize: "9px",
              color: "#9ca3af",
              marginRight: "4px",
            }}
          >
            {h.tag.toUpperCase()}
          </span>
          {h.text}
        </button>
      ))}
    </div>
  )
}

function UsefulLinksPanel() {
  const [links, setLinks] = useState<{ text: string; href: string }[]>([])
  useEffect(() => {
    const els = document.querySelectorAll("a[href]:not([data-a11y-widget] *)")
    setLinks(
      Array.from(els)
        .map((el) => ({
          text: el.textContent?.trim() || el.getAttribute("href") || "",
          href: el.getAttribute("href") || "",
        }))
        .filter((l) => l.href && l.text)
    )
  }, [])
  if (links.length === 0)
    return (
      <p
        style={{
          ...WIDGET_BASE,
          fontSize: "11px",
          color: "#9ca3af",
          padding: "4px 0",
        }}
      >
        No links found
      </p>
    )
  return (
    <div
      style={{
        ...WIDGET_BASE,
        maxHeight: "150px",
        overflowY: "auto",
        padding: "4px 0",
      }}
    >
      {links.map((l, i) => (
        <a
          key={i}
          href={l.href}
          style={{
            ...WIDGET_BASE,
            display: "block",
            padding: "3px 4px",
            fontSize: "11px",
            color: "#0c4a6e",
            textDecoration: "none",
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#f3f4f6")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {l.text}
        </a>
      ))}
    </div>
  )
}

// ─── Overlays ────────────────────────────────────────────────────────────────

function ReadingGuideOverlay({ y }: { y: number }) {
  return (
    <div
      data-a11y-widget=""
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: y - 2,
        height: "4px",
        background: "rgba(244,197,66,0.4)",
        zIndex: 9997,
        pointerEvents: "none",
      }}
    />
  )
}

function ReadingMaskOverlay({ y }: { y: number }) {
  return (
    <div
      data-a11y-widget=""
      style={{ position: "fixed", inset: 0, zIndex: 9997, pointerEvents: "none" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: Math.max(0, y - 75),
          background: "rgba(0,0,0,0.7)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: Math.max(0, y - 75),
          left: 0,
          right: 0,
          height: "150px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: y + 75,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.7)",
        }}
      />
    </div>
  )
}

// ─── Tooltip overlay hook ────────────────────────────────────────────────────

function useTooltips(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    let tip: HTMLDivElement | null = null
    const show = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("[data-a11y-widget]")) return
      const title = target.getAttribute("title")
      if (!title) return
      target.dataset.a11yTitle = title
      target.removeAttribute("title")
      tip = document.createElement("div")
      tip.setAttribute("data-a11y-widget", "")
      Object.assign(tip.style, {
        position: "fixed",
        zIndex: "10000",
        background: "#0c4a6e",
        color: "#fff",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontFamily: WIDGET_FONT,
        pointerEvents: "none",
        maxWidth: "200px",
        left: `${e.clientX + 10}px`,
        top: `${e.clientY + 10}px`,
      })
      tip.textContent = title
      document.body.appendChild(tip)
    }
    const hide = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const saved = target.dataset.a11yTitle
      if (saved) {
        target.setAttribute("title", saved)
        delete target.dataset.a11yTitle
      }
      if (tip) {
        tip.remove()
        tip = null
      }
    }
    document.addEventListener("mouseover", show, { passive: true })
    document.addEventListener("mouseout", hide, { passive: true })
    return () => {
      document.removeEventListener("mouseover", show)
      document.removeEventListener("mouseout", hide)
      if (tip) tip.remove()
    }
  }, [enabled])
}

// ─── Mute sounds hook ────────────────────────────────────────────────────────

function useMuteSounds(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const media = document.querySelectorAll(
      "audio, video"
    ) as NodeListOf<HTMLMediaElement>
    media.forEach((el) => {
      try {
        el.muted = true
        el.pause()
      } catch {}
    })
    return () => {
      media.forEach((el) => {
        try {
          el.muted = false
        } catch {}
      })
    }
  }, [enabled])
}

// ─── Keyboard nav hook ───────────────────────────────────────────────────────

function useKeyboardNav(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    let skipLink: HTMLAnchorElement | null = null
    const main = document.querySelector("main")
    if (main && !document.getElementById("a11y-skip-link")) {
      skipLink = document.createElement("a")
      skipLink.id = "a11y-skip-link"
      skipLink.href = "#"
      skipLink.textContent = "Skip to main content"
      skipLink.setAttribute("data-a11y-widget", "")
      Object.assign(skipLink.style, {
        position: "absolute",
        top: "-40px",
        left: "0",
        background: "#0c4a6e",
        color: "#fff",
        padding: "8px 16px",
        zIndex: "10001",
        fontSize: "14px",
        fontFamily: WIDGET_FONT,
        transition: "top 200ms",
      })
      skipLink.addEventListener("focus", () => {
        skipLink!.style.top = "0"
      })
      skipLink.addEventListener("blur", () => {
        skipLink!.style.top = "-40px"
      })
      skipLink.addEventListener("click", (e) => {
        e.preventDefault()
        main.focus()
        main.scrollIntoView({ behavior: "smooth" })
      })
      if (!main.getAttribute("tabindex")) main.setAttribute("tabindex", "-1")
      document.body.prepend(skipLink)
    }
    return () => {
      if (skipLink) skipLink.remove()
    }
  }, [enabled])
}

// ─── Blind users ARIA hook ───────────────────────────────────────────────────

function useBlindUsersAria(enabled: boolean) {
  const addedAttrs = useRef<{ el: Element; attr: string }[]>([])
  useEffect(() => {
    if (!enabled) {
      addedAttrs.current.forEach(({ el, attr }) => el.removeAttribute(attr))
      addedAttrs.current = []
      return
    }
    const interactives = document.querySelectorAll(
      "button:not([aria-label]):not([data-a11y-widget] *), a:not([aria-label]):not([data-a11y-widget] *), input:not([aria-label]):not([data-a11y-widget] *)"
    )
    interactives.forEach((el) => {
      if (
        !el.getAttribute("aria-label") &&
        !el.getAttribute("aria-labelledby") &&
        el.textContent?.trim()
      ) {
        el.setAttribute("aria-label", el.textContent.trim().slice(0, 100))
        addedAttrs.current.push({ el, attr: "aria-label" })
      }
    })
    const sections = document.querySelectorAll(
      "nav:not([role]):not([data-a11y-widget] *), header:not([role]):not([data-a11y-widget] *), footer:not([role]):not([data-a11y-widget] *)"
    )
    sections.forEach((el) => {
      if (!el.getAttribute("role")) {
        const role =
          el.tagName === "NAV"
            ? "navigation"
            : el.tagName === "HEADER"
              ? "banner"
              : "contentinfo"
        el.setAttribute("role", role)
        addedAttrs.current.push({ el, attr: "role" })
      }
    })
    return () => {
      addedAttrs.current.forEach(({ el, attr }) => el.removeAttribute(attr))
      addedAttrs.current = []
    }
  }, [enabled])
}

// ─── Accessible Icon ─────────────────────────────────────────────────────────

function AccessibleIcon() {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <circle cx="12" cy="4.5" r="2.5" fill="white" />
      <path
        d="M12 8c-3.5 0-6 1-6 1l1 2s1.5-.5 3.5-.7V13l-3 7h2.5l2-5 2 5H16.5l-3-7v-2.7c2 .2 3.5.7 3.5.7l1-2s-2.5-1-6-1z"
        fill="white"
      />
    </svg>
  )
}

// ─── Main Widget Component ───────────────────────────────────────────────────

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [settings, dispatch] = useReducer(settingsReducer, DEFAULT_SETTINGS)
  const snapshotRef = useRef<AccessibilitySettings | null>(null)
  const prevSettingsRef = useRef(JSON.stringify(DEFAULT_SETTINGS))

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("a11y-settings")
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === "object") {
          dispatch({ type: "LOAD_SETTINGS", payload: parsed })
        } else {
          localStorage.removeItem("a11y-settings")
        }
      }
    } catch {
      try {
        localStorage.removeItem("a11y-settings")
      } catch {}
    }
  }, [])

  // Persist settings to localStorage on change
  useEffect(() => {
    const serialized = JSON.stringify(settings)
    if (serialized === prevSettingsRef.current) return
    prevSettingsRef.current = serialized
    try {
      localStorage.setItem("a11y-settings", serialized)
    } catch {}
  }, [settings])

  // Inject/update style tag
  useEffect(() => {
    const css = buildStyleSheet(settings)
    let tag = document.getElementById("a11y-styles") as HTMLStyleElement | null
    if (!tag) {
      tag = document.createElement("style")
      tag.id = "a11y-styles"
      document.head.appendChild(tag)
    }
    tag.textContent = css
    return () => {
      const el = document.getElementById("a11y-styles")
      if (el) el.remove()
    }
  }, [settings])

  // Escape key handler
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  // Hooks for DOM mutations
  const cursorY = useCursorY(settings.readingGuide || settings.readingMask)
  useTooltips(settings.tooltips)
  useMuteSounds(settings.muteSounds)
  useKeyboardNav(settings.keyboardNav)
  useBlindUsersAria(settings.activeProfile === "blindUsers")

  // Profile handlers
  const handleProfile = useCallback(
    (profileId: ProfileType) => {
      if (settings.activeProfile === profileId) {
        if (snapshotRef.current) {
          dispatch({
            type: "DEACTIVATE_PROFILE",
            payload: snapshotRef.current,
          })
          snapshotRef.current = null
        } else {
          dispatch({ type: "RESET_ALL" })
        }
      } else {
        if (settings.activeProfile && snapshotRef.current) {
          dispatch({
            type: "DEACTIVATE_PROFILE",
            payload: snapshotRef.current,
          })
        }
        snapshotRef.current = { ...settings, activeProfile: null }
        const def = PROFILE_DEFS.find((p) => p.id === profileId)
        if (def)
          dispatch({
            type: "ACTIVATE_PROFILE",
            payload: { profile: profileId, settings: def.settings },
          })
      }
    },
    [settings]
  )

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET_ALL" })
    snapshotRef.current = null
    try {
      localStorage.removeItem("a11y-settings")
    } catch {}
  }, [])

  return (
    <div data-a11y-widget="" style={{ ...WIDGET_BASE }}>
      {/* Reading Guide Overlay */}
      {settings.readingGuide && <ReadingGuideOverlay y={cursorY} />}
      {/* Reading Mask Overlay */}
      {settings.readingMask && <ReadingMaskOverlay y={cursorY} />}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={
          open
            ? "Close accessibility settings"
            : "Open accessibility settings"
        }
        title="Accessibility"
        style={{
          ...WIDGET_BASE,
          position: "fixed",
          bottom: "96px",
          left: "16px",
          zIndex: 9998,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#0c4a6e",
          color: "#fff",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 200ms",
          transform: "scale(1)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >
        <AccessibleIcon />
      </button>

      {/* Widget Panel */}
      <div
        style={{
          ...WIDGET_BASE,
          position: "fixed",
          bottom: "96px",
          left: "16px",
          zIndex: 9999,
          width: "320px",
          maxHeight: "70vh",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          transition: "transform 300ms, opacity 300ms",
          transformOrigin: "bottom left",
          transform: open ? "scale(1)" : "scale(0.95)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            ...WIDGET_BASE,
            background: "#0c4a6e",
            color: "#fff",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              ...WIDGET_BASE,
              fontWeight: 600,
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Accessibility Settings
          </span>
          <div
            style={{
              ...WIDGET_BASE,
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleReset}
              style={{
                ...WIDGET_BASE,
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "#fff",
                fontSize: "11px",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              title="Reset all settings"
            >
              Reset All
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                ...WIDGET_BASE,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                cursor: "pointer",
                fontSize: "18px",
                padding: "0 2px",
                lineHeight: "1",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div
          style={{
            ...WIDGET_BASE,
            overflowY: "auto",
            maxHeight: "calc(70vh - 48px)",
            padding: "8px 16px",
          }}
        >
          {/* Content Adjustments */}
          <CategorySection title="Content Adjustments" defaultExpanded>
            <StepperControl
              label="Text Size"
              value={settings.textSize}
              min={80}
              max={200}
              step={10}
              unit="%"
              onChange={(v) =>
                dispatch({ type: "SET_TEXT_SIZE", payload: v })
              }
            />
            <StepperControl
              label="Line Height"
              value={settings.lineHeight}
              min={0}
              max={3}
              step={0.5}
              unit="x"
              onChange={(v) =>
                dispatch({ type: "SET_LINE_HEIGHT", payload: v })
              }
            />
            <StepperControl
              label="Letter Spacing"
              value={settings.letterSpacing}
              min={0}
              max={10}
              step={1}
              unit="px"
              onChange={(v) =>
                dispatch({ type: "SET_LETTER_SPACING", payload: v })
              }
            />
            <StepperControl
              label="Word Spacing"
              value={settings.wordSpacing}
              min={0}
              max={16}
              step={2}
              unit="px"
              onChange={(v) =>
                dispatch({ type: "SET_WORD_SPACING", payload: v })
              }
            />
            <AlignmentPicker
              value={settings.textAlign}
              onChange={(v) =>
                dispatch({ type: "SET_TEXT_ALIGN", payload: v })
              }
            />
            <ToggleSwitch
              label="Dyslexia-Friendly Font"
              checked={settings.dyslexiaFont}
              onChange={() => dispatch({ type: "TOGGLE_DYSLEXIA_FONT" })}
            />
            <StepperControl
              label="Content Scale"
              value={settings.contentScale}
              min={80}
              max={150}
              step={10}
              unit="%"
              onChange={(v) =>
                dispatch({ type: "SET_CONTENT_SCALE", payload: v })
              }
            />
          </CategorySection>

          {/* Color Adjustments */}
          <CategorySection title="Color Adjustments">
            <ContrastModeGrid
              value={settings.contrastMode}
              onChange={(v) =>
                dispatch({ type: "SET_CONTRAST_MODE", payload: v })
              }
            />
            <ColorPickerControl
              label="Text Color"
              value={settings.textColor}
              onChange={(v) =>
                dispatch({ type: "SET_TEXT_COLOR", payload: v })
              }
            />
            <ColorPickerControl
              label="Title Color"
              value={settings.titleColor}
              onChange={(v) =>
                dispatch({ type: "SET_TITLE_COLOR", payload: v })
              }
            />
            <ColorPickerControl
              label="Background Color"
              value={settings.backgroundColor}
              onChange={(v) =>
                dispatch({ type: "SET_BACKGROUND_COLOR", payload: v })
              }
            />
          </CategorySection>

          {/* Orientation Aids */}
          <CategorySection title="Orientation Aids">
            <ToggleSwitch
              label="Reading Guide"
              checked={settings.readingGuide}
              onChange={() => dispatch({ type: "TOGGLE_READING_GUIDE" })}
            />
            <ToggleSwitch
              label="Reading Mask"
              checked={settings.readingMask}
              onChange={() => dispatch({ type: "TOGGLE_READING_MASK" })}
            />
            <ToggleSwitch
              label="Highlight Focus"
              checked={settings.highlightFocus}
              onChange={() => dispatch({ type: "TOGGLE_HIGHLIGHT_FOCUS" })}
            />
            <ToggleSwitch
              label="Highlight Hover"
              checked={settings.highlightHover}
              onChange={() => dispatch({ type: "TOGGLE_HIGHLIGHT_HOVER" })}
            />
            <ToggleSwitch
              label="Big Cursor"
              checked={settings.bigCursor}
              onChange={() => dispatch({ type: "TOGGLE_BIG_CURSOR" })}
            />
            <ToggleSwitch
              label="Hide Images"
              checked={settings.hideImages}
              onChange={() => dispatch({ type: "TOGGLE_HIDE_IMAGES" })}
            />
            <ToggleSwitch
              label="Stop Animations"
              checked={settings.stopAnimations}
              onChange={() => dispatch({ type: "TOGGLE_STOP_ANIMATIONS" })}
            />
            <ToggleSwitch
              label="Mute Sounds"
              checked={settings.muteSounds}
              onChange={() => dispatch({ type: "TOGGLE_MUTE_SOUNDS" })}
            />
            <ToggleSwitch
              label="Tooltips"
              checked={settings.tooltips}
              onChange={() => dispatch({ type: "TOGGLE_TOOLTIPS" })}
            />
          </CategorySection>

          {/* Navigation */}
          <CategorySection title="Navigation">
            <ToggleSwitch
              label="Page Structure"
              checked={settings.pageStructure}
              onChange={() => dispatch({ type: "TOGGLE_PAGE_STRUCTURE" })}
            />
            {settings.pageStructure && <PageStructureViewer />}
            <ToggleSwitch
              label="Useful Links"
              checked={settings.usefulLinks}
              onChange={() => dispatch({ type: "TOGGLE_USEFUL_LINKS" })}
            />
            {settings.usefulLinks && <UsefulLinksPanel />}
            <ToggleSwitch
              label="Keyboard Navigation"
              checked={settings.keyboardNav}
              onChange={() => dispatch({ type: "TOGGLE_KEYBOARD_NAV" })}
            />
          </CategorySection>

          {/* Accessibility Profiles */}
          <CategorySection title="Accessibility Profiles">
            <div
              style={{
                ...WIDGET_BASE,
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {PROFILE_DEFS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProfile(p.id)}
                  style={{
                    ...WIDGET_BASE,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 10px",
                    border: `1px solid ${settings.activeProfile === p.id ? "#0c4a6e" : "#d1d5db"}`,
                    borderRadius: "6px",
                    background:
                      settings.activeProfile === p.id
                        ? "#0c4a6e"
                        : "#f9fafb",
                    color:
                      settings.activeProfile === p.id ? "#fff" : "#374151",
                    cursor: "pointer",
                    fontSize: "12px",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <span style={{ ...WIDGET_BASE, fontSize: "16px" }}>
                    {p.icon}
                  </span>
                  <span
                    style={{
                      ...WIDGET_BASE,
                      fontSize: "12px",
                      fontWeight: 500,
                      color:
                        settings.activeProfile === p.id
                          ? "#fff"
                          : "#374151",
                    }}
                  >
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
          </CategorySection>
        </div>
      </div>
    </div>
  )
}
