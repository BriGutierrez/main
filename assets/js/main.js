// Where form submissions are sent. Leave empty to use Netlify Forms (if hosted on
// Netlify), or paste a Formspree / Basin / Getform endpoint URL here.
const FORM_ENDPOINT = "";

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Contact + newsletter forms: validate, submit via fetch, show inline status.
document.querySelectorAll("form[data-form]").forEach((form) => {
  const msg = form.querySelector(".form-msg");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // "What services are you interested in?" needs at least one box ticked.
    const group = form.querySelector("[data-require-one]");
    if (group) {
      const first = group.querySelector("input[type=checkbox]");
      const any = group.querySelector("input[type=checkbox]:checked");
      first.setCustomValidity(any ? "" : "Please choose at least one service.");
    }
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const url = FORM_ENDPOINT || form.getAttribute("action") || "/";
    msg.textContent = "Sending…";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: FORM_ENDPOINT ? data : new URLSearchParams(data),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      msg.textContent = form.dataset.success;
    } catch {
      msg.textContent = "Sorry, something went wrong. Please try again or email us directly.";
    }
  });
  form.addEventListener("change", () => {
    const first = form.querySelector("[data-require-one] input[type=checkbox]");
    if (first) first.setCustomValidity("");
  });
});
