const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

for (const element of revealElements) {
  observer.observe(element);
}

// Mailto link handler: try to open mail client; fallback to copying address
const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
mailLinks.forEach((link) => {
  link.addEventListener('click', async () => {
    const href = link.getAttribute('href');
    const email = href.replace(/^mailto:/i, '');
    try {
      // attempt to open default mail client
      window.location.href = href;
    } catch (err) {
      // ignore
    }

    // Copy email to clipboard as a fallback so user can paste it manually
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        alert('Email copied to clipboard: ' + email);
      } else {
        // final fallback: show prompt to allow manual copy
        window.prompt('Copy this email address', email);
      }
    } catch (err) {
      window.prompt('Copy this email address', email);
    }
  });
});
