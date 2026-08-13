// ResumeCraft - Resume Builder Logic


const fields = [
    "name",
    "title",
    "email",
    "phone",
    "location",
    "summary",
    "company",
    "role",
    "experience",
    "education",
    "skills"
];



// Get all inputs and listen for changes

fields.forEach(field => {

    const input = document.getElementById(field);

    if(input){

        input.addEventListener(
            "input",
            updateResume
        );

    }

});





function updateResume(){


    // Personal Info

    document.getElementById("rName").innerText =
    document.getElementById("name").value ||
    "YOUR NAME";



    document.getElementById("rTitle").innerText =
    document.getElementById("title").value ||
    "Professional Title";




 document.getElementById("rContact").innerHTML = `
<span>${document.getElementById("email").value || "email@example.com"}</span>
<span>|</span>
<span>${document.getElementById("phone").value || "Phone"}</span>
<span>|</span>
<span>${document.getElementById("location").value || "Location"}</span>
`;



    // Summary


    document.getElementById("rSummary").innerText =

    document.getElementById("summary").value ||

    "Your professional summary...";





    // Experience


    document.getElementById("rRole").innerText =

    document.getElementById("role").value ||

    "Job Role";



    document.getElementById("rCompany").innerText =

    document.getElementById("company").value ||

    "Company Name";




    document.getElementById("rExperience").innerText =

    document.getElementById("experience").value ||

    "Experience details...";





    // Education


    document.getElementById("rEducation").innerText =

    document.getElementById("education").value ||

    "Your Education";





    // Skills


  document.getElementById("rSkills").innerHTML = 
(document.getElementById("skills").value || "HTML, CSS, JavaScript")
.split(",")
.map(skill => `<span>${skill.trim()}</span>`)
.join("");



}






// Download / Print Resume


const downloadBtn = document.getElementById(
    "downloadBtn"
);


if(downloadBtn){


downloadBtn.addEventListener(
    "click",
    ()=>{


        window.print();


    }
);


}







// Load saved data (future feature)


window.addEventListener(
"load",
()=>{


    fields.forEach(field=>{


        const saved =
        localStorage.getItem(field);



        if(saved){


            const element =
            document.getElementById(field);



            if(element){

                element.value = saved;

            }


        }


    });



    updateResume();


});






// Auto save


fields.forEach(field=>{


const element =
document.getElementById(field);



if(element){


element.addEventListener(
"input",
()=>{


localStorage.setItem(
field,
element.value
);


});


}


});