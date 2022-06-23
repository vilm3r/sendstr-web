import React from "react"
import { DiGithubBadge } from "react-icons/di"
import { MdSettings } from "react-icons/md"
import Link from "next/link"

export function Header() {
  return (
    <header className="bg-custom-green-light mb-5 mx-auto border-0 rounded-xl p-4 shadow-md">
      <div className="container flex justify-between items-center">
        <a href="/" className="py-1.5 mr-4 text-lg cursor-pointer">
          <h1 className="text-xl">Sendstr</h1>
        </a>
        <div className="flex items-center space-x-3">
          {/* <Link
          href="/faq"
          className="text-lg cursor-pointer"
        >FAQ
        </Link> */}
          <a href="https://github.com/vilm3r/sendstr-web">
            <DiGithubBadge className="inline text-3xl" title="Github" />
          </a>
          <Link href="/settings">
            <div className="cursor-pointer">
              <MdSettings className="inline text-2xl" title="Settings" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
