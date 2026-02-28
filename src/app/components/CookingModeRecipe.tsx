"use client"

import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"
import TipBox from "@/app/components/TipBox"

const TIPBOX_CLASS =
  "tip-box my-8 py-4 px-4 rounded-xl font-normal bg-[color:var(--color-bg-callout)] text-[color:var(--color-text-on-callout)] [&_p]:!mt-0 [&_p]:mb-1 [&_p:first-child_strong]:block [&_p:first-child_strong]:mb-0 [&_p:first-child_strong]:font-black"

/** Replace blockquotes whose first paragraph is a single strong (e.g. **Serving tip**) with a div.tip-box containing h6 + body so the h6 always renders */
function rehypeBlockquoteTitle() {
  return (tree: Parameters<typeof visit>[0]) => {
    if (!tree || typeof tree !== "object") return
    visit(tree, (node) => {
      const n = node as { type?: string; tagName?: string }
      return n?.type === "element" && n?.tagName === "blockquote"
    }, (node) => {
      if (!node || typeof node !== "object") return
      const n = node as { tagName?: string; properties?: Record<string, string | undefined>; children?: unknown[] }
      const first = n.children?.[0] as { type?: string; tagName?: string; children?: unknown[] } | undefined
      if (!first || first.type !== "element" || first.tagName !== "p") return
      const inlines = first.children
      if (!inlines || inlines.length !== 1) return
      const strong = inlines[0] as { type?: string; tagName?: string; children?: unknown[] }
      if (strong?.type !== "element" || strong?.tagName !== "strong" || !strong.children?.length) return
      const text = strong.children[0] as { type?: string; value?: string }
      const title = text?.type === "text" ? text.value : undefined
      if (!title) return
      const rest = (n.children ?? []).slice(1) as unknown[]
      const h6Node = {
        type: "element",
        tagName: "h6",
        properties: { className: "tip-box-title heading-sm-serif" },
        children: [{ type: "text", value: title }],
      }
      n.tagName = "div"
      n.properties = {
        className: TIPBOX_CLASS,
        role: "note",
        "aria-label": title,
      }
      n.children = [h6Node, ...rest]
    })
  }
}

const STORAGE_PREFIX = "cooking-mode"

type CheckedState = Record<string, boolean>

type CheckedContextValue = {
  checked: CheckedState
  toggle: (itemKey: string) => void
}

const CheckedContext = createContext<CheckedContextValue | null>(null)

type ListContextValue = {
  listId: string
  indexRef: React.MutableRefObject<number>
}

const ListContext = createContext<ListContextValue | null>(null)

type RecipeListContextValue = {
  slug: string
  listIndexRef: React.MutableRefObject<number>
}
const RecipeListContext = createContext<RecipeListContextValue | null>(null)

function ListWrapper({
  as: Tag,
  children,
}: {
  as: "ul" | "ol"
  children: ReactNode
}) {
  const recipeCtx = useContext(RecipeListContext)
  const listIndex = recipeCtx ? recipeCtx.listIndexRef.current++ : 0
  const listId = recipeCtx ? `${recipeCtx.slug}-L${listIndex}` : ""
  const indexRef = useRef(0)
  indexRef.current = 0
  return (
    <ListContext.Provider value={{ listId, indexRef }}>
      <Tag className="list-outside list-none pl-8">{children}</Tag>
    </ListContext.Provider>
  )
}

function CheckableLi({ children }: { children?: ReactNode }) {
  const listCtx = useContext(ListContext)
  const checkedCtx = useContext(CheckedContext)
  if (!listCtx || !checkedCtx) {
    return <li>{children}</li>
  }
  const { listId, indexRef } = listCtx
  const index = indexRef.current++
  const itemKey = `${listId}-${index}`
  const isChecked = checkedCtx.checked[itemKey] ?? false
  return (
    <li>
      <label
        htmlFor={itemKey}
        className="flex cursor-pointer items-start gap-1 py-0.5 min-h-[1.6em]"
      >
        <input
          id={itemKey}
          type="checkbox"
          checked={isChecked}
          onChange={() => checkedCtx.toggle(itemKey)}
          className="-ml-8 mt-1.5 size-4 shrink-0 rounded border-[color:var(--color-border-default)] bg-[color:var(--color-surface)] accent-[color:var(--color-surface-inverted)] focus:ring-2 focus:ring-[color:var(--color-focus)]"
          aria-label={`Mark as ${isChecked ? "incomplete" : "done"}`}
        />
        <span
          className={`inline-block min-h-[1.5em] leading-[1.6] ${isChecked ? "cooking-mode-done w-max max-w-full" : ""}`}
        >
          {children}
        </span>
      </label>
    </li>
  )
}

type CookingModeRecipeProps = {
  content: string
  slug: string
  /** When false, recipe body only (no cooking-mode button or checkboxes). Component kept for later re-enable. */
  showCookingMode?: boolean
}

export default function CookingModeRecipe({ content, slug, showCookingMode = true }: CookingModeRecipeProps) {
  const [isCookingMode, setIsCookingMode] = useState(false)
  const [checked, setChecked] = useState<CheckedState>({})
  const storageKey = `${STORAGE_PREFIX}-${slug}`
  const listIndexRef = useRef(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw) as { checked?: CheckedState; on?: boolean }
        if (parsed.checked && typeof parsed.checked === "object") {
          setChecked(parsed.checked)
        }
        if (typeof parsed.on === "boolean") {
          setIsCookingMode(parsed.on)
        }
      }
    } catch {
      // ignore invalid stored data
    }
  }, [storageKey])

  const persist = useCallback(
    (nextChecked: CheckedState, nextOn: boolean) => {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ checked: nextChecked, on: nextOn })
        )
      } catch {
        // ignore quota / private mode
      }
    },
    [storageKey]
  )

  const toggleItem = useCallback(
    (itemKey: string) => {
      setChecked((prev) => {
        const next = { ...prev, [itemKey]: !prev[itemKey] }
        persist(next, isCookingMode)
        return next
      })
    },
    [isCookingMode, persist]
  )

  const toggleCookingMode = useCallback(() => {
    setIsCookingMode((prev) => {
      const next = !prev
      persist(checked, next)
      return next
    })
  }, [checked, persist])

  const baseComponents = {
    blockquote: ({
      children,
      node,
      "data-title": dataTitleAttr,
      dataTitle,
      ..._rest
    }: {
      children?: ReactNode
      node?: { properties?: Record<string, unknown> }
      "data-title"?: string
      dataTitle?: string
    }) => {
      const titleRaw = node?.properties?.["data-title"]
      const title =
        (typeof titleRaw === "string" ? titleRaw : undefined) ??
        dataTitleAttr ??
        dataTitle
      const body = title ? Children.toArray(children).slice(1) : children
      return <TipBox title={title}>{body}</TipBox>
    },
  }

  const cookingModeComponents = {
    ...baseComponents,
    ul: ({ children }: { children?: ReactNode }) => (
      <ListWrapper as="ul">{children}</ListWrapper>
    ),
    ol: ({ children }: { children?: ReactNode }) => (
      <ListWrapper as="ol">{children}</ListWrapper>
    ),
    li: ({ children }: { children?: ReactNode }) => (
      <CheckableLi>{children}</CheckableLi>
    ),
  }

  listIndexRef.current = 0

  const components = showCookingMode && isCookingMode ? cookingModeComponents : baseComponents

  return (
    <CheckedContext.Provider value={{ checked, toggle: toggleItem }}>
      {showCookingMode && (
        <div className="fixed bottom-6 right-6 z-10">
          <button
            type="button"
            onClick={toggleCookingMode}
            className="rounded-full border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-inverted)] px-4 py-2 text-sm font-bold text-[color:var(--color-text-inverted)] hover:border-[color:var(--color-border-default)] hover:bg-[color:var(--color-surface-inverted)] hover:text-[color:var(--color-text-inverted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)]"
            aria-pressed={isCookingMode}
            aria-label={isCookingMode ? "Exit cooking mode" : "Enter cooking mode"}
          >
            {isCookingMode ? "Recipe mode" : "Cooking mode"}
          </button>
        </div>
      )}
      <div className="prose">
        <RecipeListContext.Provider value={{ slug, listIndexRef }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeBlockquoteTitle()]}
            components={components}
          >
            {content}
          </ReactMarkdown>
        </RecipeListContext.Provider>
      </div>
    </CheckedContext.Provider>
  )
}
