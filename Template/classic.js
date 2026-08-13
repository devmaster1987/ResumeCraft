export const modernTemplate = (data) => {

return `
<div class="modern-resume">

    <div class="modern-header">
        <h1>${data.name || "Your Name"}</h1>
        <h3>${data.title || "Professional Title"}</h3>

        <p>
            ${data.email || ""}
            ${data.phone || ""}
            ${data.location || ""}
        </p>
    </div>


    <section>
        <h2>Profile</h2>
        <p>
            ${data.summary || "Professional summary"}
        </p>
    </section>


    <section>
        <h2>Experience</h2>

        <h3>
            ${data.role || "Job Role"}
        </h3>

        <strong>
            ${data.company || "Company Name"}
        </strong>

        <p>
            ${data.experience || "Experience details"}
        </p>

    </section>



    <section>

        <h2>Education</h2>

        <p>
        ${data.education || "Education"}
        </p>

    </section>



    <section>

        <h2>Skills</h2>

        <p>
        ${data.skills || "Skills"}
        </p>

    </section>


</div>
`;

};