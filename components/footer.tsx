import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-[#0B0B1F] border-t border-[#3B3A58]/30">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Logo />
        </div>
        <div className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} ModelShip. All rights reserved.</div>
      </div>
    </footer>
  )
}
