import { useEffect, useRef } from "react";

const Presentation = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const halfHeight = window.innerHeight / 2;

      if (iframeRef.current) {
        iframeRef.current.focus();
      }

      if (y < halfHeight) {
        // Previous page: left arrow
        const event = new KeyboardEvent("keydown", {
          key: "ArrowLeft",
          bubbles: true,
        });
        document.dispatchEvent(event);
      } else {
        // Next page: right arrow
        const event = new KeyboardEvent("keydown", {
          key: "ArrowRight",
          bubbles: true,
        });
        document.dispatchEvent(event);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gray-100">
      <iframe
        ref={iframeRef}
        src="/BYD-convoy-presentation-TEST.pdf"
        className="w-full h-full"
        title="BYD Convoy Presentation"
      />
    </div>
  );
};

export default Presentation;
