document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  sections.forEach(section => {
    section.classList.add("reveal");
    observer.observe(section);
  });

  // Highlight the current navigation section while scrolling.
  const navLinks = [...document.querySelectorAll("nav a")];
  const navSections = [...document.querySelectorAll("main section[id]")];

  const updateNav = () => {
    const scrollPosition = window.scrollY + 120;
    let current = navSections[0]?.id;

    navSections.forEach(section => {
      if (section.offsetTop <= scrollPosition) current = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
});
