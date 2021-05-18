import { useState, useEffect } from "react";
// import ReactDOM from "react-dom";

export function useMouse() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function handle(e: { pageX: number; pageY: number; }) {
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    }
    document.addEventListener("mousemove", handle);
    return () => document.removeEventListener("mousemove", handle);
  });

  return mousePosition;
}
