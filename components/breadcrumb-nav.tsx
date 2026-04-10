import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

export function BreadcrumbNav({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="bg-gray-50 border-b py-3" aria-label="Breadcrumb">
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-teal-600 transition-colors">{item.label}</Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
