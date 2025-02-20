// library components
import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"

import { useAuthContext } from "../../hooks/useAuthContext"
import useOnClickOutside from "../../hooks/useOnClickOutside"
import ButtonExternalLink from "../reusable/ButtonExternalLink"
import BrandIcons from "../SvgIcons/BrandIcons"
import EmojiIcons from "../SvgIcons/EmojiIcons"
import Icons from "../SvgIcons/Icons"

import NavItem from "./NavItem"
import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuthContext()

  const ref = useRef()
  useOnClickOutside(ref, () => setIsOpen(false), isOpen)

  const links = user ? (
    <SignedInLinks profile={user} />
  ) : (
    <SignedOutLinks variant="primary" />
  )
  return (
    <div className="col-start-1 col-end-3 md:col-end-2 row-start-1 row-end-2">
      <div className="relative md:flex">
        {/* <!-- mobile menu bar --> */}
        <div className="px-4 py-3 bg-gray-800 text-gray-100 flex justify-between items-center md:hidden">
          {/* <!-- mobile menu button --> */}
          <button
            className="focus:outline-none"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
          >
            <Icons.Menu />
          </button>
          <div>{links}</div>
        </div>

        {/* <!-- sidebar --> */}
        <div
          ref={ref}
          className={`${
            isOpen ? null : "-translate-x-full"
          } bg-gray-900 text-white xs:w-full md:w-20 xl:w-56 space-y-6 xs:py-4 md:py-8 px-2 absolute inset-y-0 left-0 xxl:left-auto transform md:fixed md:translate-x-0 transition duration-200 ease-in-out border-r border-gray-800 z-50 min-h-screen`}
        >
          {/* <!-- logo --> */}
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-white flex items-center space-x-1 text-center px-3 font-bold text-xl"
              aria-label="FrontendPro logo"
              title="frontendpro homepage"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <EmojiIcons.Rocket size={32} />
              <span className="xs:inline-block md:hidden xl:inline-block">
                FrontendPro
              </span>
            </Link>
            <button
              className="md:hidden p-4 focus:outline-none"
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              <Icons.Cross />
            </button>
          </div>

          {/* <!-- nav --> */}
          <aside className="xs:pt-4 md:pt-8 bg-gray-900">
            <NavItem
              item="challenges"
              icon={
                <Icons.Code className="xs:mr-3 md:mr-0 xl:mr-3 text-xl xl:text-base text-center" />
              }
              setIsOpen={setIsOpen}
            />
            <NavItem
              item="solutions"
              icon={
                <Icons.MessageCode className="xs:mr-3 md:mr-0 xl:mr-3 text-xl xl:text-base text-center" />
              }
              setIsOpen={setIsOpen}
            />
            <NavItem
              item="resources"
              icon={
                <Icons.BrowserCheck className="xs:mr-3 md:mr-0 xl:mr-3 text-xl xl:text-base text-center" />
              }
              setIsOpen={setIsOpen}
            />
            <NavItem
              item="roadmaps"
              icon={
                <Icons.RoadMap className="xs:mr-3 md:mr-0 xl:mr-3 text-xl xl:text-base text-center" />
              }
              setIsOpen={setIsOpen}
            />
            <NavItem
              item="github"
              icon={
                <BrandIcons.GitHub className="xs:mr-3 md:mr-0 xl:mr-3 text-xl xl:text-base text-center" />
              }
              setIsOpen={setIsOpen}
            />
          </aside>

          {/* <!-- discord button --> */}
          <div className="absolute bottom-10 w-full flex justify-center pr-4">
            <ButtonExternalLink
              href="https://discord.com/invite/FYSQUEw6xP"
              size="normal"
              variant="primary"
              className="font-medium group"
            >
              <BrandIcons.Discord
                className="mr-2 -ml-1 group-hover:animate-rotate"
                size={18}
              />
              <span className="xs:inline-block md:hidden xl:inline-block">
                Join Discord
              </span>
            </ButtonExternalLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
