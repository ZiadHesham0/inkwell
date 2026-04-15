import React from "react";

function Footer() {
  return (
    <div className="flex flex-wrap gap-x-7 gap-y-3 justify-center md:justify-between items-center py-4 px-5 bg-[#0a0a0a] border-t border-t-white/5 shadow-[0_-8px_30px_rgb(0,0,0,0.5)]  fixed bottom-0 right-0 left-0 z-30">
      <div className="footer-title ">
        <h3 className="h3 text-white text-center  md:text-start mb-1.5 font-heading">
          Inkwell
        </h3>
        <p className="text-muted text-xs">
          @ 2025 Inkwell. the Digital Monolith.
        </p>
      </div>
      <ul className=" flex flex-wrap gap-x-4 text-xs ">
        <li className="text-muted">Changelog</li>
        <li className="text-muted">Privacy</li>
        <li className="text-muted">Terms</li>
        <li className="text-muted">Twitter</li>
        <li className="text-muted">GitHub</li>
      </ul>
    </div>
  );
}

export default Footer;
