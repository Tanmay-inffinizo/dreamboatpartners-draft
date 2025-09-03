// =====================
// Register GSAP & ScrollTrigger once
// =====================
gsap.registerPlugin(ScrollTrigger);

// =====================
// Before/After Comparison
// =====================
const comparisonSections = gsap.utils.toArray(".comparisonSection");
comparisonSections.forEach(section => {
  const afterImage = section.querySelector(".afterImage");
  const afterImageImg = afterImage.querySelector("img");

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "center center",
      end: () => "+=" + section.offsetWidth,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      fastScrollEnd: true
    },
    defaults: { ease: "none" }
  })
  .fromTo(afterImage, { xPercent: 100, x: 0 }, { xPercent: 0 })
  .fromTo(afterImageImg, { xPercent: -100, x: 0 }, { xPercent: 0 }, 0);
});

// =====================
// Text Reveal
// =====================
gsap.utils.toArray(".panel").forEach(panel => {
  gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: "top 80%",
      toggleActions: "play none none none",
      fastScrollEnd: true
    }
  }).fromTo(
    panel.querySelectorAll("h4, p, .button-1"),
    {
      opacity: 0,
      y: 50,
      clipPath: "inset(0 100% 0 0)",
    },
    {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0% 0 0)",
      stagger: 0.3,
      duration: 1.8,
      ease: "power2.out"
    }
  );
});

// =====================
// Swiper Initializations
// =====================
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 4 }
  }
});

const swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: { el: ".swiper-pagination2", clickable: true },
  navigation: { nextEl: ".swiper-next-2", prevEl: ".swiper-prev-2" },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  }
});

// =====================
// Stacking Animation
// =====================
function setupStackingAnimation(section) {
  const wrapper = section.querySelector(".wrapper");
  if (!wrapper) return;

  const items = wrapper.querySelectorAll(".item");
  if (!items.length) return;

  const direction = section.classList.contains("horizontal-section") ? "horizontal" : "vertical";

  items.forEach((item, i) => {
    if (i !== 0) gsap.set(item, { [direction === "horizontal" ? "xPercent" : "yPercent"]: 100 });
  });

  // Pre-apply wrapper background
  Object.assign(wrapper.style, {
    backgroundImage: "url('css/images/navy-blue-bg.jpg')",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    willChange: "transform"
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${items.length * 100}%`,
      scrub: 1,
      fastScrollEnd: true,
      anticipatePin: 1,
      invalidateOnRefresh: false
    },
    defaults: { ease: "none" }
  });

  items.forEach((item, i) => {
    tl.to(item, { scale: 0.8, borderRadius: "25px" });
    if (items[i + 1]) {
      tl.to(items[i + 1], { [direction === "horizontal" ? "xPercent" : "yPercent"]: 0 }, "<");
    }
  });
}

window.addEventListener("load", () => {
  document.querySelectorAll(".scroll-section").forEach(setupStackingAnimation);
});

// =====================
// Dynamic Text Reveal
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const clones = document.querySelectorAll(".dynamic-text-clone > div");

  gsap.to(clones, {
    filter: "blur(0px)",
    opacity: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#section-two",
      start: "top top",
      end: "+=100%",
      scrub: true,
      pin: true,
      fastScrollEnd: true
    }
  });
});

// =====================
// Loader / Page Transition
// =====================
const overlay = document.getElementById("stairs-overlay");
const page = document.getElementById("page");
const replayBtn = document.getElementById("replay");

function runTransition() {
  gsap.set(overlay, { display: "none" });
  gsap.set(".stair", { clearProps: "all" });
  gsap.set(page, { clearProps: "all" });

  const tl = gsap.timeline();
  tl.to(overlay, { display: "block", duration: 0 })
    .from(".stair", {
      height: 0,
      duration: 0.5,
      stagger: { amount: -0.2 },
      ease: "power2.out"
    })
    .to(".stair", {
      y: "100%",
      duration: 0.6,
      stagger: { amount: -0.25 },
      ease: "power3.inOut"
    })
    .set(overlay, { display: "none" })
    .set(".stair", { y: "0%" })
    .from(page, {
      opacity: 0,
      scale: 1.2,
      duration: 0.6,
      ease: "power2.out"
    }, 1.3);
}

window.addEventListener("load", runTransition);
if (replayBtn) replayBtn.addEventListener("click", runTransition);

// =====================
// Image Reveal
// =====================
window.addEventListener("load", () => {
  const imageReveals = document.querySelectorAll(".image-reveal img");
  imageReveals.forEach(image => {
    gsap.to(image, {
      clipPath: "inset(0 0% 0 0)",
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: image.parentNode,
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
        fastScrollEnd: true
      }
    });
  });
});

// =====================
// Scroll Zoom
// =====================
window.addEventListener("load", () => {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapper-2",
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: true,
      fastScrollEnd: true
    }
  })
  .to(".image-container-2 img", {
    scale: 2,
    z: 350,
    transformOrigin: "center center",
    ease: "power1.inOut",
    willChange: "transform"
  })
  .to(".section-2.hero-2", {
    scale: 1.1,
    transformOrigin: "center center",
    ease: "power1.inOut",
    willChange: "transform"
  }, "<");
});

// =====================
// Case Study Hover Follow
// =====================
gsap.set('.case-study img.case-study-image', { yPercent: -50, xPercent: -50 });

let activeImage;
gsap.utils.toArray(".case-study").forEach(el => {
  let image = el.querySelector('img.case-study-image'),
      setX, setY,
      align = e => { setX(e.clientX); setY(e.clientY); },
      startFollow = () => document.addEventListener("mousemove", align),
      stopFollow = () => document.removeEventListener("mousemove", align),
      fade = gsap.to(image, { autoAlpha: 1, ease: "none", paused: true, onReverseComplete: stopFollow });

  el.addEventListener('mouseenter', e => {
    fade.play();
    startFollow();
    if (activeImage) {
      gsap.set(image, {
        x: gsap.getProperty(activeImage, "x"),
        y: gsap.getProperty(activeImage, "y")
      });
    }
    activeImage = image;
    setX = gsap.quickTo(image, "x", { duration: 0.6, ease: "power3" });
    setY = gsap.quickTo(image, "y", { duration: 0.6, ease: "power3" });
    align(e);
  });

  el.addEventListener('mouseleave', () => fade.reverse());
});
