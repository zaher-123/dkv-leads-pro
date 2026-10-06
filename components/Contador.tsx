"use client";

import { useEffect, useRef } from "react";

// Cuenta de 0 al valor cuando el elemento entra en pantalla.
// Sin JavaScript o con reduced motion se queda el valor final que se pinta en el servidor.
export default function Contador({ valor, duracion = 1400 }: { valor: number; duracion?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.textContent = "0";
    let frame = 0;
    let inicio = 0;

    const animar = (marca: number) => {
      if (!inicio) inicio = marca;
      const progreso = Math.min((marca - inicio) / duracion, 1);
      // Curva ease-out: la cuenta frena al llegar.
      const eased = 1 - Math.pow(1 - progreso, 3);
      el.textContent = String(Math.round(valor * eased));
      if (progreso < 1) frame = requestAnimationFrame(animar);
    };

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          frame = requestAnimationFrame(animar);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [valor, duracion]);

  return <span ref={ref}>{valor}</span>;
}
