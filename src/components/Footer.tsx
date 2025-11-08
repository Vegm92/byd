import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[var(--byd-very-light-blue)] border-t border-gray-200 py-12">
      <div className="container px-4">
        {/* Email Footer Template per Brand Guidelines */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Logo / Dealer Name Section */}
          <div className="space-y-4">
            <div className="byd-logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e2/BYD_Auto_2022_logo.svg"
                alt="BYD Auto Logo"
                className="h-10 w-auto"
                style={{ minHeight: "3rem" }}
              />
            </div>
            <p className="text-sm font-semibold text-foreground">
              BYD Auto Europe
            </p>
            <p className="text-xs text-[var(--byd-gray)]">BUILD YOUR DREAMS</p>
            <p className="text-xs text-[var(--byd-gray)] italic">
              Technological Innovations for a Better Life
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Contact Information
            </h3>
            <div className="space-y-2 text-xs text-[var(--byd-gray)]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Company Address</p>
                  <p>BYD Europe B.V.</p>
                  <p>Barcelona, Spain</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <div>
                  <p className="font-medium">Tel | Mobile</p>
                  <p>+34 XXX XXX XXX</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:info@byd.com"
                    className="hover:text-[var(--byd-red)] transition-colors"
                  >
                    info@byd.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 shrink-0" />
                <div>
                   <a
                     href="https://www.bydglobal.com/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="hover:text-[var(--byd-red)] transition-colors"
                   >
                     www.bydglobal.com
                   </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Follow Us
            </h3>
             <div className="flex gap-4">
               <a
                 href="https://www.instagram.com/byd_global/?hl=en"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-[var(--byd-red)] hover:border-[var(--byd-red)] transition-colors group"
                 aria-label="Instagram"
               >
                 <Instagram className="w-4 h-4 text-[var(--byd-gray)] group-hover:text-white transition-colors" />
               </a>
               <a
                 href="https://x.com/BYDCompany"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-[var(--byd-red)] hover:border-[var(--byd-red)] transition-colors group"
                 aria-label="Twitter"
               >
                 <Twitter className="w-4 h-4 text-[var(--byd-gray)] group-hover:text-white transition-colors" />
               </a>
               <a
                 href="https://www.facebook.com/bydcompany/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-[var(--byd-red)] hover:border-[var(--byd-red)] transition-colors group"
                 aria-label="Facebook"
               >
                <Facebook className="w-4 h-4 text-[var(--byd-gray)] group-hover:text-white transition-colors" />
              </a>
               <a
                 href="https://www.linkedin.com/company/byd/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-[var(--byd-red)] hover:border-[var(--byd-red)] transition-colors group"
                 aria-label="LinkedIn"
               >
                <Linkedin className="w-4 h-4 text-[var(--byd-gray)] group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Confidentiality Notice & Copyright */}
        <div className="border-t border-gray-200 pt-8 space-y-2">
          <p className="text-xs text-[var(--byd-gray)] text-center">
            This email and any attachments are confidential and intended solely
            for the use of the individual or entity to whom they are addressed.
          </p>
          <p className="text-xs text-[var(--byd-gray)] text-center">
            &copy; 2025 BYD Auto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
