const fields = ["name", "title", "email", "phone", "location", "summary", "company", "role", "experience", "education", "skills"];
const resumePage = document.getElementById("resumePage");
const templateButtons = document.querySelectorAll(".template-btn");
const downloadBtn = document.getElementById("downloadBtn");
fields.forEach(field => {
    const input = document.getElementById(field);
    if (input) {
        input.addEventListener("input", () => {
            updateResume();
            localStorage.setItem(field, input.value);
        });
    }
});
function updateResume() {
    document.getElementById("rName").innerText = document.getElementById("name").value || "YOUR NAME";
    document.getElementById("rTitle").innerText = document.getElementById("title").value || "Professional Title";
    document.getElementById("rContact").innerHTML = `<span>${document.getElementById("email").value || "email@example.com"}</span><span>|</span><span>${document.getElementById("phone").value || "Phone"}</span><span>|</span><span>${document.getElementById("location").value || "Location"}</span>`;
    document.getElementById("rSummary").innerText = document.getElementById("summary").value || "Your professional summary...";
    document.getElementById("rRole").innerText = document.getElementById("role").value || "Job Role";
    document.getElementById("rCompany").innerText = document.getElementById("company").value || "Company Name";
    document.getElementById("rExperience").innerText = document.getElementById("experience").value || "Experience details...";
    document.getElementById("rEducation").innerText = document.getElementById("education").value || "Your Education";
    document.getElementById("rSkills").innerHTML = (document.getElementById("skills").value || "HTML, CSS, JavaScript").split(",").map(skill => `<span>${skill.trim()}</span>`).join("");
}
function setTemplate(template) {
    resumePage.classList.remove("template-modern", "template-classic");
    resumePage.classList.add(`template-${template}`);
    templateButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.template === template));
    localStorage.setItem("resumeTemplate", template);
    updateResume();
}
templateButtons.forEach(btn => {
    btn.addEventListener("click", () => setTemplate(btn.dataset.template));
});
if (downloadBtn) {
    downloadBtn.addEventListener("click", () => window.print());
}
window.addEventListener("load", () => {
    fields.forEach(field => {
        const saved = localStorage.getItem(field);
        const element = document.getElementById(field);
        if (saved && element) element.value = saved;
    });
    setTemplate(localStorage.getItem("resumeTemplate") || "modern");
});