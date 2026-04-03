const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const statNumbers = document.querySelectorAll(".stat-value");

const formatStat = (value) => {
  if (value >= 1000) {
    return value.toLocaleString("en-IN");
  }
  return String(value);
};

const runCounter = (node) => {
  const target = Number(node.dataset.target || "0");
  if (!Number.isFinite(target) || target <= 0) {
    return;
  }

  const duration = 1250;
  const start = performance.now();

  const animate = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);
    node.textContent = formatStat(value);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      node.textContent = formatStat(target);
    }
  };

  requestAnimationFrame(animate);
};

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      runCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((stat) => statsObserver.observe(stat));

const ctaForm = document.querySelector(".cta-form");
if (ctaForm) {
  ctaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = ctaForm.querySelector("button");
    if (!button) {
      return;
    }

    button.textContent = "Thanks, we will reach out soon";
    button.disabled = true;
  });
}
