'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        <li>
          <Link
            href="/"
            className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <svg className="w-4 h-4 text-neutral-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
            {index === items.length - 1 ? (
              <span className="text-neutral-900 font-semibold capitalize">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium capitalize"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  )
}
