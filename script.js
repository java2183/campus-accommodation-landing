const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const enquiryForm = document.querySelector("#enquiry-form");
const formStatus = document.querySelector("#form-status");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      navigation.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      navigation.classList.remove("is-open");
      menuToggle.focus();
    }
  });
}

if (enquiryForm && formStatus) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) {
      return;
    }

    const formData = new FormData(enquiryForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`CampusNest enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );

    formStatus.textContent = "Your email app should open with your message ready. If it doesn't, email hello@campusnest.edu.";
    window.location.href = `mailto:hello@campusnest.edu?subject=${subject}&body=${body}`;
  });
}
