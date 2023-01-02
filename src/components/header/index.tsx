import React from "react"
import { DiGithubBadge } from "react-icons/di"
import { MdSettings } from "react-icons/md"
import Link from "next/link"

export function Header() {
  return (
    <header className="mb-5 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="py-1.5 mr-4 text-lg cursor-pointer">
          <h1 className="text-2xl text-primary font-semibold">Sendstr</h1>
        </a>
        <div className="flex items-center space-x-3">
          {/* <Link
          href="/faq"
          className="text-lg cursor-pointer"
        >FAQ
        </Link> */}
          <a href="https://github.com/vilm3r/sendstr-web">
            <DiGithubBadge className="inline text-3xl primary-hover" title="Github" />
          </a>
          <Link href="/settings">
            <div className="cursor-pointer">
              <MdSettings className="inline text-2xl primary-hover" title="Settings" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
