const subjectsByClass = {
  1: ["English", "Mathematics", "Environmental Studies"],
  2: ["English", "Mathematics", "Environmental Studies"],
  3: ["English", "Mathematics", "Environmental Studies", "Languages"],
  4: ["English", "Mathematics", "Environmental Studies", "Languages"],
  5: ["English", "Mathematics", "Environmental Studies", "Languages"],
  6: ["Mathematics", "Science", "Social Science", "English", "Languages"],
  7: ["Mathematics", "Science", "Social Science", "English", "Languages"],
  8: ["Mathematics", "Science", "Social Science", "English", "Languages"],
  9: ["Mathematics", "Science", "Social Science", "English", "Languages"],
  10: ["Mathematics", "Science", "Social Science", "English", "Languages"],
  11: ["Physics", "Chemistry", "Mathematics", "Biology", "Accountancy", "Economics", "English"],
  12: ["Physics", "Chemistry", "Mathematics", "Biology", "Accountancy", "Economics", "English"]
};

const grid = document.getElementById("classGrid");
for (let n = 1; n <= 12; n++) {
  const button = document.createElement("button");
  button.className = "class-card";
  button.type = "button";
  button.innerHTML = `<span class="class-num">Class ${n}</span><span class="class-label">${n <= 5 ? "Primary" : n <= 8 ? "Middle school" : n <= 10 ? "Secondary" : "Senior secondary"}</span><span class="arrow">↗</span>`;
  button.addEventListener("click", () => openClass(n));
  grid.appendChild(button);
}

function openClass(n) {
  document.querySelector(".modal-backdrop")?.remove();
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-head">
        <div><span class="eyebrow">ANUVEDA ACADEMY</span><h2 id="modalTitle">Class ${n} subjects</h2></div>
        <button class="close-btn" aria-label="Close">✕</button>
      </div>
      <div class="subject-list">${subjectsByClass[n].map(s => `<div class="subject">${escapeHtml(s)}</div>`).join("")}</div>
      <p class="modal-note">Subject availability and textbook titles can vary by NCERT edition and curriculum. Use the official NCERT portal to select the exact class, subject and book.</p>
      <div class="modal-actions">
        <a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noopener">Find Class ${n} books ↗</a>
        <a class="secondary" href="https://epathshala.nic.in/" target="_blank" rel="noopener">ePathshala ↗</a>
      </div>
    </section>`;
  backdrop.addEventListener("click", e => { if (e.target === backdrop || e.target.closest(".close-btn")) backdrop.remove(); });
  document.body.appendChild(backdrop);
  backdrop.querySelector(".close-btn").focus();
}
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
document.getElementById("year").textContent = new Date().getFullYear();

let deferredPrompt;
const installBtn = document.getElementById("installBtn");
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.hidden = false;
});
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(console.error));
}
