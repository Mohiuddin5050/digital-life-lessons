import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../../../components/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Website Name */}
        <div>
          <Logo />

          <p className="text-sm leading-relaxed">
            Share experiences, learn from others, and grow together.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@lifelessons.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-red-500">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} LifeLessons. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
