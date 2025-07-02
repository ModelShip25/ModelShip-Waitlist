import Logo from "./logo"
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub, FaInstagram, FaDiscord, FaYoutube, FaDev } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-[#0B0B1F] border-t border-[#3B3A58]/30">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Logo />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 w-full md:w-auto md:justify-end">
          <div className="flex flex-col items-center md:items-end">
            <span className="text-gray-300 text-sm mb-1">Follow us on all social accounts and join our community</span>
            <div className="flex gap-4 mt-1">
              <a href="https://twitter.com/modelshipai" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="text-gray-400 hover:text-blue-400 transition-colors" size={24} />
              </a>
              <a href="https://facebook.com/modelshipai" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="text-gray-400 hover:text-blue-600 transition-colors" size={24} />
              </a>
              <a href="https://linkedin.com/company/modelship" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="text-gray-400 hover:text-blue-700 transition-colors" size={24} />
              </a>
              <a href="https://github.com/ModelShip25" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub className="text-gray-400 hover:text-gray-100 transition-colors" size={24} />
              </a>
              <a href="https://www.instagram.com/modelshipai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-gray-400 hover:text-pink-500 transition-colors" size={24} />
              </a>
              <a href="https://discord.gg/n4ZxyR29" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <FaDiscord className="text-gray-400 hover:text-gray-100 transition-colors" size={24} />
              </a>
              <a href="https://www.youtube.com/@modelshipai" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube className="text-gray-400 hover:text-red-500 transition-colors" size={24} />
              </a>
              {/* add dev.to */}
              <a href="https://dev.to/modelshipai" target="_blank" rel="noopener noreferrer" aria-label="Dev.to">
                <FaDev className="text-gray-400 hover:text-gray-100 transition-colors" size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} ModelShip. All rights reserved.</div>
      </div>
    </footer>
  )
}
