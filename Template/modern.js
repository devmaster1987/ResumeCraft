export const modernTemplate = (data) => {

return `

<div class="resume-page">

<header class="resume-header">

<h1>
${data.name || "SEBASTIAN BENNETT"}
</h1>

<h3>
${data.title || "Professional Accountant"}
</h3>

<div class="contact-line">
${data.phone || "+123-456-7890"}
&nbsp; | &nbsp;
${data.email || "hello@example.com"}
&nbsp; | &nbsp;
${data.location || "New York City"}
</div>

</header>


<section>

<h2>ABOUT ME</h2>

<p>
${data.summary || 
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Professional summary text goes here."
}
</p>

</section>



<section>

<h2>EDUCATION</h2>


<div class="resume-item">

<h3>
${data.education || "Bachelor of Computer Science"}
</h3>

<span>
University Name | 2020 - 2024
</span>

<p>
Additional education details
</p>

</div>


</section>




<section>

<h2>WORK EXPERIENCE</h2>


<div class="resume-item">

<h3>
${data.role || "Frontend Developer"}
</h3>

<strong>
${data.company || "Company Name"}
</strong>


<p>
${data.experience ||
"Worked on web applications and improved user experience."
}
</p>


</div>



<div class="resume-item">

<h3>
Previous Position
</h3>

<strong>
Previous Company
</strong>


<p>
Experience description goes here.
</p>

</div>


</section>



<section>

<h2>SKILLS</h2>


<div class="skill-list">

${data.skills ||
"JavaScript • HTML • CSS • React • Communication"
}

</div>


</section>


</div>

`;

};