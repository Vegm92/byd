import logo from "../assets/images/byd-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[var(--byd-very-light-blue)] border-t border-gray-200 py-12">
      <div className="container px-4">
        {/* Simplified Footer */}
        <div className="text-center space-y-4 mb-8">
          <div className="byd-logo flex justify-center">
            <img
              src={logo}
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
