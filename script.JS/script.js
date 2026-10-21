
document.addEventListener("DOMContentLoaded", () => {
  const reduzirMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Animações GSAP
  if (window.gsap) {
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!reduzirMovimento) {
      gsap.from(".nav", {
        y: -35,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".subtitulo", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.15
      });

      gsap.from(".conteudo h1", {
        y: 85,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out",
        delay: 0.25
      });

      gsap.from(".descricao, .conteudo .botao", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        delay: 0.65
      });

      const fundo = document.querySelector(".fundo");

      if (fundo && window.ScrollTrigger) {
        gsap.to(fundo, {
          yPercent: 14,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });
      }

      if (window.ScrollTrigger) {
        gsap.utils.toArray(
          ".experiencia h2, .acomodacoes > h2, .reservas h2"
        ).forEach((titulo) => {
          gsap.from(titulo, {
            y: 55,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titulo,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        });

        gsap.from(".card", {
          y: 65,
          opacity: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cards",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.from(".gastronomia > div", {
          x: -55,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gastronomia",
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }
  } else {
    console.warn("GSAP não carregou. Verifique a conexão com a internet.");
  }

  // Datas: impedir datas passadas e checkout antes do check-in
  const checkin = document.querySelector('[name="checkin"]');
  const checkout = document.querySelector('[name="checkout"]');

  const hoje = new Date();
  const dataLocal = [
    hoje.getFullYear(),
    String(hoje.getMonth() + 1).padStart(2, "0"),
    String(hoje.getDate()).padStart(2, "0")
  ].join("-");

  checkin.min = dataLocal;
  checkout.min = dataLocal;

  checkin.addEventListener("change", () => {
    checkout.min = checkin.value || dataLocal;

    if (checkout.value && checkout.value <= checkin.value) {
      checkout.value = "";
    }
  });

  // Demonstração do pedido de reserva
  const form = document.querySelector("#reservaForm");
  const mensagem = document.querySelector("#reservaMensagem");

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!form.reportValidity()) return;

    if (checkout.value <= checkin.value) {
      mensagem.textContent =
        "Escolha um check-out posterior ao check-in.";
      checkout.focus();
      return;
    }

    mensagem.textContent =
      "Formulário preenchido! Esta é uma demonstração: " +
      "para confirmar a reserva, é necessário conectar o site " +
      "a um sistema de reservas.";
  });

  if (window.ScrollTrigger) {
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }
});
