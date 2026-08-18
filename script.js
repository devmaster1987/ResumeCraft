// Resume Fields Configuration
const fields = [
    "name",
    "title",
    "email",
    "phone",
    "location",
    "summary",
    "company",
    "role",
    "workYear",
    "experience",
    "education",
    "educationYear",
    "skills",
    "certification",
    "reference",
    "languages"
];

// DOM Elements
const resumePage = document.getElementById("resumePage");
const templateButtons = document.querySelectorAll(".template-btn");
const downloadBtn = document.getElementById("downloadBtn");

// Debounce timer for performance optimization
let updateTimeout;
// Update Resume with Input Values
function updateResume() {
    const getInputValue = (id, defaultText) => 
        document.getElementById(id)?.value || defaultText;

    // Header Information
    document.getElementById("rName").innerText = 
        getInputValue("name", "BRIAN R. BAXTER").toUpperCase();
    
    document.getElementById("rTitle").innerText = 
        getInputValue("title", "GRAPHIC & WEB DESIGNER").toUpperCase();
    
    // Sidebar Contact Information
    document.getElementById("sContact-email").innerText = 
        getInputValue("email", "hello@example.com");
    
    document.getElementById("sContact-phone").innerText = 
        getInputValue("phone", "+123-456-7890");
    
    document.getElementById("sContact-location").innerText = 
        getInputValue("location", "New York City");
    
    // About Me
    document.getElementById("rSummary").innerText = 
        getInputValue("summary", "Your professional summary...");
    
    // Work Experience
    document.getElementById("rRole").innerText = 
        getInputValue("role", "Job Role");
    
    document.getElementById("rWorkYear").innerText = 
        getInputValue("workYear", "2022-Present");
    
    document.getElementById("rCompany").innerText = 
        getInputValue("company", "Company Name");
    
    document.getElementById("rExperience").innerText = 
        getInputValue("experience", "Experience details...");
    
    // Education (Sidebar)
    document.getElementById("sEducation").innerText = 
        getInputValue("education", "Your Education");
    
    document.getElementById("sEducationYear").innerText = 
        getInputValue("educationYear", "Year");
    
    // Skills with Progress Bars
    const skillsInput = getInputValue("skills", "HTML5 (85), CSS3 (80), JavaScript (90)");
    const skillsArray = skillsInput.split(",").map(skill => skill.trim());
    
    let skillsHTML = "";
    skillsArray.forEach(skill => {
        const match = skill.match(/(.+?)\s*\((\d+)%?\)/);
        const skillName = match ? match[1] : skill;
        const percentage = match ? match[2] : Math.random() * 30 + 60;
        
        skillsHTML += `
            <div class="skill-item">
                <div class="skill-header">
                    <span>${skillName}</span>
                    <span>${percentage}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    });
    document.getElementById("rSkills").innerHTML = skillsHTML || '<p>Add skills in format: Skill (90), Another (85)</p>';
    
    // Certification
    document.getElementById("rCertification").innerText = 
        getInputValue("certification", "Your Certification");
    
    // Reference (Sidebar)
    document.getElementById("sReference").innerText = 
        getInputValue("reference", "Reference Name & Email");
    
    // Languages
    const languagesInput = getInputValue("languages", "English");
    document.getElementById("rLanguages").innerHTML = 
        languagesInput
            .split(",")
            .map(lang => `<span>${lang.trim()}</span>`)
            .join("");

    // Handle Profile Image
    const profileImageInput = document.getElementById("profileImage");
    if (profileImageInput && profileImageInput.files && profileImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const profileDiv = document.getElementById("profileImagePreview");
            profileDiv.innerHTML = `<img src="${e.target.result}" alt="Profile">`;
        };
        reader.readAsDataURL(profileImageInput.files[0]);
    }
}
// Template Management
function setTemplate(template) {
    resumePage.classList.remove("template-modern", "template-classic");
    resumePage.classList.add(`template-${template}`);
    templateButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.template === template);
    });
    localStorage.setItem("resumeTemplate", template);
    updateResume();
}

// Template Button Event Listeners
templateButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        setTemplate(btn.dataset.template);
    });
});

// Download/Print Resume as PDF
if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
        const element = document.getElementById("resume");
        const name = document.getElementById("name").value || "Resume";
        
        const options = {
            margin: 0,
            filename: `${name}-Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        html2pdf().set(options).from(element).save().then(() => {
            // Clear all input fields after successful download
            clearAllInputFields();
        });
    });
}

// Clear all input fields
function clearAllInputFields() {
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.value = "";
            localStorage.removeItem(field);
        }
    });
    
    // Clear profile image
    const profileImageInput = document.getElementById("profileImage");
    if (profileImageInput) {
        profileImageInput.value = "";
        localStorage.removeItem("profileImage");
        document.getElementById("profileImagePreview").innerHTML = '<i class="fas fa-user"></i>';
    }
    
    // Reset to modern template
    setTemplate("modern");
    updateResume();
}

// Clear All Data Function (Optional - can be called from console)
function clearAllData() {
    if (confirm("Are you sure you want to clear all resume data? This cannot be undone.")) {
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.value = "";
                localStorage.removeItem(field);
            }
        });
        updateResume();
        localStorage.removeItem("resumeTemplate");
        setTemplate("modern");
    }
}

// Load Saved Data on Page Load
window.addEventListener("load", () => {
    // Restore all field values from localStorage
    fields.forEach(field => {
        const saved = localStorage.getItem(field);
        const element = document.getElementById(field);
        if (saved && element) {
            element.value = saved;
        }
    });

    // Restore profile image
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
        const profileDiv = document.getElementById("profileImagePreview");
        profileDiv.innerHTML = `<img src="${savedProfileImage}" alt="Profile">`;
    }

    // Restore template preference
    const savedTemplate = localStorage.getItem("resumeTemplate") || "modern";
    setTemplate(savedTemplate);

    // Initial resume update
    updateResume();

    // Initialize input listeners with debouncing
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener("input", () => {
                clearTimeout(updateTimeout);
                updateTimeout = setTimeout(() => {
                    updateResume();
                    localStorage.setItem(field, input.value);
                }, 300);
            });
        }
    });

    // Handle profile image upload separately
    const profileImageInput = document.getElementById("profileImage");
    if (profileImageInput) {
        profileImageInput.addEventListener("change", () => {
            updateResume();
            if (profileImageInput.files && profileImageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    localStorage.setItem("profileImage", e.target.result);
                };
                reader.readAsDataURL(profileImageInput.files[0]);
            }
        });
    }
});