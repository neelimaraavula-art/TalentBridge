/* =========================================================
   TALENTBRIDGE AI
   COMPLETE FRONTEND PROTOTYPE
========================================================= */

let loginRole = "admin";

let currentUser = null;

let interviewIndex = 0;

let interviewScore = 0;

let currentProject = "Banking AI Platform";


/* =========================================================
   DEMO DATA
========================================================= */

const projects = [

    {
        name:"Banking AI Platform",
        description:"Build a scalable AI-powered banking platform.",
        skills:["Python","FastAPI","AWS","React"],
        team:8,
        duration:"6 months",
        match:94
    },

    {
        name:"Healthcare Analytics Platform",
        description:"Build an analytics platform for healthcare intelligence.",
        skills:["Python","Data Science","SQL","AWS"],
        team:6,
        duration:"5 months",
        match:88
    },

    {
        name:"Retail Intelligence System",
        description:"Develop a real-time retail recommendation platform.",
        skills:["Python","React","Node.js","SQL"],
        team:7,
        duration:"4 months",
        match:84
    },

    {
        name:"Cloud Migration Program",
        description:"Modernize enterprise applications using cloud services.",
        skills:["AWS","Node.js","React","SQL"],
        team:10,
        duration:"8 months",
        match:79
    }

];


let talents = [

    {
        name:"Priya Sharma",
        role:"Backend Developer",
        skills:["Python","FastAPI","AWS"],
        match:94,
        availability:"Immediate",
        experience:"2 - 4 years"
    },

    {
        name:"Arjun Kumar",
        role:"Full Stack Developer",
        skills:["React","Node.js","AWS"],
        match:89,
        availability:"15 Days",
        experience:"2 - 4 years"
    },

    {
        name:"Sneha Nair",
        role:"Data Scientist",
        skills:["Python","SQL","Data Science"],
        match:87,
        availability:"Immediate",
        experience:"4+ years"
    },

    {
        name:"Rahul Verma",
        role:"Cloud Engineer",
        skills:["AWS","Python","SQL"],
        match:92,
        availability:"30 Days",
        experience:"4+ years"
    }

];


let applications =
    JSON.parse(localStorage.getItem("applications")) || [];


let auditLogs =
    JSON.parse(localStorage.getItem("auditLogs")) || [

        {
            title:"Workforce analysis completed",
            description:"5 capability gaps detected.",
            time:"Today • 21:34"
        },

        {
            title:"Candidate matching completed",
            description:"12 talent profiles analyzed.",
            time:"Today • 21:35"
        },

        {
            title:"Candidate shortlisted",
            description:"Priya Sharma achieved 94% match.",
            time:"Today • 21:36"
        }

    ];


/* =========================================================
   LOGIN
========================================================= */

function selectLoginRole(role, button){

    loginRole = role;

    document
        .querySelectorAll(".role-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );

    button.classList.add("active");

}


function togglePassword(){

    const input =
        document.getElementById("loginPassword");

    input.type =
        input.type === "password"
        ? "text"
        : "password";

}


function login(event){

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    if(!email || !password){

        showToast("Please enter email and password.");

        return;

    }


    currentUser = {

        email:email,

        role:loginRole

    };


    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );


    if(loginRole === "admin"){

        loadAdmin();

    }

    else{

        loadTalent();

    }


    addAudit(
        "User login",
        `${email} logged into ${loginRole} portal.`
    );


    showToast(
        `Welcome to TalentBridge AI!`
    );

}


/* =========================================================
   PAGE SWITCHING
========================================================= */

function showRegistration(){

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("registrationPage")
        .classList.remove("hidden");

}


function showLogin(){

    document
        .getElementById("registrationPage")
        .classList.add("hidden");

    document
        .getElementById("adminDashboard")
        .classList.add("hidden");

    document
        .getElementById("talentDashboard")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

}


function logout(){

    currentUser = null;

    localStorage.removeItem("currentUser");

    showLogin();

    showToast("Logged out successfully.");

}


/* =========================================================
   TALENT REGISTRATION
========================================================= */

function registerTalent(event){

    event.preventDefault();


    const name =
        document.getElementById("talentName").value.trim();

    const email =
        document.getElementById("talentEmail").value.trim();

    const experience =
        document.getElementById("talentExperience").value;

    const availability =
        document.getElementById("talentAvailability").value;

    const role =
        document.getElementById("talentRole").value.trim();


    const skills = [];


    document
        .querySelectorAll(".skill-option input:checked")
        .forEach(input => {

            skills.push(input.value);

        });


    if(skills.length === 0){

        showToast(
            "Please select at least one skill."
        );

        return;

    }


    const profile = {

        name,
        email,
        experience,
        availability,
        role,
        skills

    };


    localStorage.setItem(
        "talentProfile",
        JSON.stringify(profile)
    );


    talents.push({

        name,
        role,
        skills,
        match:90,
        availability,
        experience

    });


    showToast(
        "Talent profile created successfully!"
    );


    setTimeout(() => {

        document.getElementById("loginEmail").value = email;

        showLogin();

    },1000);

}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function loadAdmin(){

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("registrationPage")
        .classList.add("hidden");

    document
        .getElementById("talentDashboard")
        .classList.add("hidden");

    document
        .getElementById("adminDashboard")
        .classList.remove("hidden");


    adminSection("overview");

    renderProjects();

    renderTalent();

    renderActivity();

}


function adminSection(section, button){

    const sections = [

        "overview",
        "projects",
        "talent",
        "gaps",
        "activity"

    ];


    sections.forEach(name => {

        const element =
            document.getElementById(
                "admin" +
                capitalize(name)
            );

        if(element){

            element.classList.add("hidden");

        }

    });


    const selected =
        document.getElementById(
            "admin" +
            capitalize(section)
        );


    if(selected){

        selected.classList.remove("hidden");

    }


    document
        .querySelectorAll("#adminDashboard .side-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );


    if(button){

        button.classList.add("active");

    }


    const titles = {

        overview:"Workforce Overview",

        projects:"Projects & Staffing",

        talent:"Talent Network",

        gaps:"Skill Gap Resolution",

        activity:"AI Audit Trail"

    };


    document.getElementById(
        "adminPageTitle"
    ).textContent = titles[section];

}


function capitalize(word){

    return word.charAt(0).toUpperCase() + word.slice(1);

}


/* =========================================================
   PROJECT RENDERING
========================================================= */

function renderProjects(){

    const container =
        document.getElementById("projectList");

    if(!container) return;


    container.innerHTML = "";


    projects.forEach(project => {

        const card =
            document.createElement("div");

        card.className = "project-card";


        card.innerHTML = `

            <div class="project-top">

                <span class="active-status">
                    ● ACTIVE
                </span>

                <span>
                    ${project.duration}
                </span>

            </div>


            <h3>
                ${project.name}
            </h3>


            <p>
                ${project.description}
            </p>


            <div class="project-skills">

                ${project.skills
                    .map(skill =>
                        `<span>${skill}</span>`
                    )
                    .join("")}

            </div>


            <div class="project-footer">

                <div>

                    <strong>
                        ${project.team}
                    </strong>

                    <small>
                        team members
                    </small>

                </div>


                <button
                    class="outline-btn"
                    onclick="runAIAnalysis('${project.name}')">

                    ✦ Analyze

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   CREATE PROJECT
========================================================= */

function openProjectModal(){

    document
        .getElementById("projectModal")
        .classList.remove("hidden");

}


function closeProjectModal(){

    document
        .getElementById("projectModal")
        .classList.add("hidden");

}


function createProject(event){

    event.preventDefault();


    const name =
        document.getElementById("projectName").value.trim();

    const skillString =
        document.getElementById("projectSkills").value;

    const team =
        document.getElementById("projectTeam").value;


    const newProject = {

        name,

        description:
            "New enterprise project created by workforce admin.",

        skills:
            skillString
                .split(",")
                .map(s => s.trim()),

        team,

        duration:"New Project",

        match:85

    };


    projects.push(newProject);


    renderProjects();


    document.getElementById(
        "activeProjectCount"
    ).textContent = projects.length + 14;


    closeProjectModal();


    addAudit(
        "New project created",
        `${name} was added to the workforce planning system.`
    );


    showToast(
        "Project created. AI analysis started."
    );


    setTimeout(() => {

        runAIAnalysis(name);

    },500);

}


/* =========================================================
   AI WORKFORCE ANALYSIS
========================================================= */

function runAIAnalysis(target){

    const modal =
        document.getElementById("aiModal");

    const title =
        document.getElementById("aiTitle");

    const result =
        document.getElementById("aiResult");


    title.textContent =
        `Analyzing: ${target}`;


    result.innerHTML = `
        <strong>AI Agent started.</strong><br><br>
        Analyzing project demand,
        employee capacity and talent availability...
    `;


    modal.classList.remove("hidden");


    const steps =
        document.querySelectorAll(".ai-step");


    steps.forEach(step => {

        step.style.opacity = ".35";

    });


    steps.forEach((step,index) => {

        setTimeout(() => {

            step.style.opacity = "1";

        },600 * (index + 1));

    });


    setTimeout(() => {

        result.innerHTML = `

            <strong>
                ✓ Capability analysis completed
            </strong>

            <br><br>

            <b>
                5 skill gaps detected.
            </b>

            <br><br>

            Internal workforce can cover:
            React and PostgreSQL.

            <br><br>

            External talent recommended:
            Python × 2,
            FastAPI × 2,
            AWS × 1.

            <br><br>

            <strong>
                Top AI Match:
                Priya Sharma — 94%
            </strong>

            <br><br>

            <button
                class="outline-btn"
                onclick="recommendCandidate()">

                View Candidate

            </button>

        `;

        addAudit(
            "AI workforce analysis completed",
            `${target}: 5 capability gaps detected and candidate recommendations generated.`
        );

    },3500);

}


function recommendCandidate(){

    closeAIModal();

    adminSection("talent");

    showToast(
        "Top candidate Priya Sharma recommended."
    );

}


function closeAIModal(){

    document
        .getElementById("aiModal")
        .classList.add("hidden");

}


/* =========================================================
   TALENT NETWORK
========================================================= */

function renderTalent(){

    const container =
        document.getElementById("talentList");

    if(!container) return;


    container.innerHTML = "";


    talents.forEach((talent,index) => {

        const card =
            document.createElement("div");

        card.className = "talent-card";


        const initials =
            talent.name
                .split(" ")
                .map(word => word[0])
                .join("");


        card.setAttribute(
            "data-search",
            (
                talent.name +
                " " +
                talent.role +
                " " +
                talent.skills.join(" ")
            ).toLowerCase()
        );


        card.innerHTML = `

            <div class="talent-avatar">
                ${initials}
            </div>


            <div class="talent-info">

                <h3>
                    ${talent.name}
                </h3>

                <p>
                    ${talent.role}
                </p>


                <div class="talent-tags">

                    ${talent.skills
                        .map(skill =>
                            `<span>${skill}</span>`
                        )
                        .join("")}

                </div>

            </div>


            <div class="match-score">

                <strong>
                    ${talent.match}%
                </strong>

                <small>
                    AI Match
                </small>

            </div>


            <button
                class="outline-btn"
                onclick="inviteCandidate(${index})">

                Invite

            </button>

        `;


        container.appendChild(card);

    });

}


function searchTalent(){

    const query =
        document
            .getElementById("talentSearch")
            .value
            .toLowerCase();


    document
        .querySelectorAll(".talent-card")
        .forEach(card => {

            const data =
                card.getAttribute("data-search");

            card.style.display =
                data.includes(query)
                ? "grid"
                : "none";

        });

}


function inviteCandidate(index){

    const talent = talents[index];


    addAudit(
        "Candidate shortlisted",
        `${talent.name} shortlisted with ${talent.match}% AI match.`
    );


    showToast(
        `${talent.name} invited for AI interview.`
    );


    setTimeout(() => {

        startInterview();

    },800);

}


/* =========================================================
   TALENT DASHBOARD
========================================================= */

function loadTalent(){

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("registrationPage")
        .classList.add("hidden");

    document
        .getElementById("adminDashboard")
        .classList.add("hidden");

    document
        .getElementById("talentDashboard")
        .classList.remove("hidden");


    const savedProfile =
        JSON.parse(
            localStorage.getItem("talentProfile")
        );


    let name =
        savedProfile?.name ||
        currentUser.email
            .split("@")[0];


    document.getElementById(
        "talentHeaderName"
    ).textContent = name;


    document.getElementById(
        "talentWelcomeName"
    ).textContent = name;


    const initials =
        name
            .split(" ")
            .map(x => x[0])
            .join("")
            .substring(0,2)
            .toUpperCase();


    document.getElementById(
        "talentAvatar"
    ).textContent = initials;


    renderTalentProjects();

    renderApplications();

    renderProfile();


    talentSection("home");

}


function talentSection(section, button){

    const sections = [

        "home",
        "projects",
        "applications",
        "profile"

    ];


    sections.forEach(name => {

        const element =
            document.getElementById(
                "talent" +
                capitalize(name)
            );

        if(element){

            element.classList.add("hidden");

        }

    });


    const selected =
        document.getElementById(
            "talent" +
            capitalize(section)
        );


    if(selected){

        selected.classList.remove("hidden");

    }


    document
        .querySelectorAll("#talentDashboard .side-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );


    if(button){

        button.classList.add("active");

    }


    const titles = {

        home:"My Dashboard",

        projects:"Available Projects",

        applications:"My Applications",

        profile:"My Skill Profile"

    };


    document.getElementById(
        "talentPageTitle"
    ).textContent = titles[section];

}


/* =========================================================
   TALENT PROJECTS
========================================================= */

function renderTalentProjects(){

    const container =
        document.getElementById(
            "talentProjectList"
        );

    if(!container) return;


    container.innerHTML = "";


    projects.forEach((project,index) => {

        const card =
            document.createElement("div");

        card.className = "project-card";


        card.setAttribute(
            "data-search",
            project.name.toLowerCase()
        );


        card.innerHTML = `

            <div class="project-top">

                <span class="active-status">
                    ● OPEN
                </span>

                <span>
                    ${project.duration}
                </span>

            </div>


            <h3>
                ${project.name}
            </h3>


            <p>
                ${project.description}
            </p>


            <div class="project-skills">

                ${project.skills
                    .map(skill =>
                        `<span>${skill}</span>`
                    )
                    .join("")}

            </div>


            <div class="project-footer">

                <div>

                    <strong>
                        ${project.match}%
                    </strong>

                    <small>
                        AI match
                    </small>

                </div>


                <button
                    class="outline-btn"
                    onclick="openProjectDetails('${project.name}')">

                    View Project

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


function searchProjects(){

    const query =
        document
            .getElementById("projectSearch")
            .value
            .toLowerCase();


    document
        .querySelectorAll(
            "#talentProjectList .project-card"
        )
        .forEach(card => {

            const data =
                card.getAttribute("data-search");

            card.style.display =
                data.includes(query)
                ? "block"
                : "none";

        });

}


/* =========================================================
   PROJECT DETAILS
========================================================= */

function openProjectDetails(name){

    const project =
        projects.find(
            p => p.name === name
        );


    if(!project) return;


    currentProject = name;


    document.getElementById(
        "detailsProjectName"
    ).textContent = project.name;


    document
        .getElementById("projectDetailsModal")
        .classList.remove("hidden");

}


function closeProjectDetails(){

    document
        .getElementById("projectDetailsModal")
        .classList.add("hidden");

}


function applyToProject(){

    const existing =
        applications.find(
            a =>
                a.project === currentProject &&
                a.email === currentUser.email
        );


    if(existing){

        showToast(
            "You already applied to this project."
        );

        return;

    }


    const application = {

        project:currentProject,

        email:currentUser.email,

        status:"AI Interview Pending",

        match:94,

        date:new Date().toLocaleDateString()

    };


    applications.push(application);


    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );


    closeProjectDetails();


    addAudit(
        "Talent application submitted",
        `${currentUser.email} applied for ${currentProject}.`
    );


    showToast(
        "Application submitted. AI interview is ready."
    );


    renderApplications();


    setTimeout(() => {

        startInterview();

    },1000);

}


/* =========================================================
   APPLICATIONS
========================================================= */

function renderApplications(){

    const container =
        document.getElementById(
            "applicationsList"
        );

    if(!container) return;


    container.innerHTML = "";


    const userApplications =
        applications.filter(
            a =>
                !currentUser ||
                a.email === currentUser.email
        );


    document.getElementById(
        "applicationCount"
    ).textContent =
        userApplications.length;


    if(userApplications.length === 0){

        container.innerHTML = `

            <div class="panel">

                <h3>
                    No applications yet
                </h3>

                <p class="muted">
                    Explore projects and apply to opportunities
                    that match your skills.
                </p>

                <button
                    class="primary-btn"
                    onclick="talentSection('projects')">

                    Explore Projects

                </button>

            </div>

        `;

        return;

    }


    userApplications.forEach((application,index) => {

        const card =
            document.createElement("div");

        card.className =
            "application-card";


        card.innerHTML = `

            <div>

                <h3>
                    ${application.project}
                </h3>

                <p>
                    Applied on ${application.date}
                </p>

                <span class="badge warning-badge">
                    ${application.status}
                </span>

            </div>


            <div>

                <strong
                    style="color:var(--teal);font-size:20px">

                    ${application.match}%

                </strong>

                <small
                    style="display:block;color:var(--muted)">

                    AI Match

                </small>

            </div>


            <div class="application-actions">

                <button
                    class="outline-btn"
                    onclick="startInterview()">

                    Start Interview

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile(){

    const container =
        document.getElementById(
            "profileCard"
        );

    if(!container) return;


    const profile =
        JSON.parse(
            localStorage.getItem(
                "talentProfile"
            )
        );


    if(!profile){

        container.innerHTML = `

            <h3>
                Complete your profile
            </h3>

            <p class="muted">
                Create your talent profile to receive
                AI project recommendations.
            </p>

            <button
                class="primary-btn"
                onclick="showRegistration()">

                Create Profile

            </button>

        `;

        return;

    }


    const initials =
        profile.name
            .split(" ")
            .map(x => x[0])
            .join("")
            .toUpperCase();


    container.innerHTML = `

        <div class="profile-header">

            <div class="profile-big-avatar">
                ${initials}
            </div>

            <div>

                <h2>
                    ${profile.name}
                </h2>

                <p>
                    ${profile.role}
                </p>

            </div>

        </div>


        <div class="profile-info-grid">

            <div>

                <span>Email</span>

                <strong>
                    ${profile.email}
                </strong>

            </div>


            <div>

                <span>Experience</span>

                <strong>
                    ${profile.experience}
                </strong>

            </div>


            <div>

                <span>Availability</span>

                <strong>
                    ${profile.availability}
                </strong>

            </div>

        </div>


        <div style="margin-top:25px">

            <span class="panel-kicker">
                SKILLS
            </span>

            <div class="talent-tags">

                ${profile.skills
                    .map(skill =>
                        `<span>${skill}</span>`
                    )
                    .join("")}

            </div>

        </div>

    `;

}


/* =========================================================
   AI INTERVIEW
========================================================= */

const interviewQuestions = [

    "Explain how you would design a scalable FastAPI service for a banking application.",

    "How would you deploy a Python backend application using AWS?",

    "A production API suddenly becomes slow. How would you investigate the problem?",

    "How would you design a database for a high-volume transaction system?",

    "Tell me about a technical problem you solved and how you approached it."

];


function startInterview(){

    interviewIndex = 0;

    interviewScore = 0;


    document
        .getElementById("interviewModal")
        .classList.remove("hidden");


    showInterviewQuestion();

}


function showInterviewQuestion(){

    const question =
        interviewQuestions[
            interviewIndex
        ];


    document.getElementById(
        "interviewQuestion"
    ).textContent =

        `Question ${interviewIndex + 1} of ${interviewQuestions.length}: ${question}`;


    document.getElementById(
        "interviewAnswer"
    ).value = "";


    document.getElementById(
        "interviewFeedback"
    ).classList.add("hidden");


    document.getElementById(
        "interviewProgressBar"
    ).style.width =

        (
            interviewIndex /
            interviewQuestions.length *
            100
        ) + "%";

}


function submitInterviewAnswer(){

    const answer =
        document
            .getElementById("interviewAnswer")
            .value
            .trim();


    if(answer.length < 10){

        showToast(
            "Please provide a meaningful answer."
        );

        return;

    }


    const score =
        Math.min(
            95,
            65 +
            Math.floor(answer.length / 12)
        );


    interviewScore += score;


    const feedback =
        document.getElementById(
            "interviewFeedback"
        );


    feedback.classList.remove("hidden");


    feedback.innerHTML = `

        <strong>
            ✦ AI Evaluation: ${score}/100
        </strong>

        <br><br>

        The answer demonstrates
        technical reasoning and problem-solving ability.

    `;


    setTimeout(() => {

        interviewIndex++;


        if(
            interviewIndex >=
            interviewQuestions.length
        ){

            finishInterview();

        }

        else{

            showInterviewQuestion();

        }

    },1800);

}


function skipQuestion(){

    interviewIndex++;


    if(
        interviewIndex >=
        interviewQuestions.length
    ){

        finishInterview();

    }

    else{

        showInterviewQuestion();

    }

}


function finishInterview(){

    const average =
        Math.round(
            interviewScore /
            interviewQuestions.length
        );


    const feedback =
        document.getElementById(
            "interviewFeedback"
        );


    feedback.classList.remove("hidden");


    feedback.innerHTML = `

        <strong>
            ✓ AI Interview Completed
        </strong>

        <br><br>

        Overall Technical Score:
        <strong>${average}/100</strong>

        <br><br>

        Recommendation:
        <strong>
            Suitable for technical review
        </strong>

    `;


    addAudit(
        "AI interview completed",
        `${currentUser?.email || "Candidate"} completed the AI interview with score ${average}/100.`
    );


    applications.forEach(application => {

        if(
            currentUser &&
            application.email === currentUser.email
        ){

            application.status =
                "AI Interview Completed";

        }

    });


    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );


    setTimeout(() => {

        closeInterview();

        renderApplications();

        showToast(
            `Interview completed. AI score: ${average}/100`
        );

    },2500);

}


function closeInterview(){

    document
        .getElementById("interviewModal")
        .classList.add("hidden");

}


/* =========================================================
   AI AGENT
========================================================= */

function openAgent(){

    document
        .getElementById("agentPanel")
        .classList.remove("hidden");

}


function closeAgent(){

    document
        .getElementById("agentPanel")
        .classList.add("hidden");

}


function agentEnter(event){

    if(event.key === "Enter"){

        sendAgentMessage();

    }

}


function quickAgent(message){

    document.getElementById(
        "agentInput"
    ).value = message;


    sendAgentMessage();

}


function sendAgentMessage(){

    const input =
        document.getElementById(
            "agentInput"
        );


    const message =
        input.value.trim();


    if(!message) return;


    addAgentMessage(
        message,
        "user"
    );


    input.value = "";


    setTimeout(() => {

        const response =
            generateAIResponse(message);


        addAgentMessage(
            response,
            "ai"
        );

    },700);

}


function addAgentMessage(message,type){

    const container =
        document.getElementById(
            "agentMessages"
        );


    const item =
        document.createElement("div");


    item.className =
        `agent-message ${type}`;


    if(type === "ai"){

        item.innerHTML = `

            <div class="message-icon">
                ✦
            </div>

            <div>
                ${message}
            </div>

        `;

    }

    else{

        item.innerHTML = `

            <div>
                ${message}
            </div>

        `;

    }


    container.appendChild(item);


    container.scrollTop =
        container.scrollHeight;

}


function generateAIResponse(message){

    const text =
        message.toLowerCase();


    if(
        text.includes("project") ||
        text.includes("opportun")
    ){

        return `
            I found <strong>4 active projects</strong>
            in the current talent network.
            Your strongest match is
            <strong>Banking AI Platform — 94%</strong>.
            Would you like to apply?
        `;

    }


    if(
        text.includes("skill") ||
        text.includes("profile")
    ){

        const profile =
            JSON.parse(
                localStorage.getItem(
                    "talentProfile"
                )
            );


        if(profile){

            return `
                Your current skills are:
                <strong>
                ${profile.skills.join(", ")}
                </strong>.
                Your availability is
                <strong>
                ${profile.availability}
                </strong>.
            `;

        }


        return `
            Your talent profile has not been created yet.
            Create one so I can match you with projects.
        `;

    }


    if(
        text.includes("interview")
    ){

        return `
            I can start your technical interview now.
            The interview contains
            <strong>5 adaptive technical questions</strong>
            and generates an AI-style evaluation.
            <br><br>
            <button
                class="outline-btn"
                onclick="startInterview()">
                Start Interview
            </button>
        `;

    }


    if(
        text.includes("match") ||
        text.includes("best")
    ){

        return `
            Based on the current skill-capacity analysis,
            your strongest opportunity is
            <strong>Banking AI Platform</strong>
            with an estimated
            <strong>94% skill match</strong>.
        `;

    }


    if(
        text.includes("gap") ||
        text.includes("workforce")
    ){

        return `
            Current workforce analysis detected
            <strong>31 skill gaps</strong>.
            The highest-risk capability is
            <strong>AWS</strong>.
            I recommend checking internal capacity first,
            then external talent, then contractor or
            upskilling options.
        `;

    }


    return `
        I can help you with
        <strong>projects, skills, matching,
        interviews and workforce planning.</strong>
        Try asking:
        "Show me projects"
        or
        "Find my best match".
    `;

}


/* =========================================================
   ATTRITION FAILURE / RECOVERY
========================================================= */

function simulateAttrition(){

    openAgent();


    addAgentMessage(
        "Simulate employee attrition event",
        "user"
    );


    setTimeout(() => {

        addAgentMessage(
            `
            <strong>⚠ Attrition detected.</strong><br><br>

            Employee:
            Rahul Verma<br>

            Critical skills:
            AWS + Python<br><br>

            Affected project:
            Banking AI Platform<br><br>

            Workforce capacity has fallen below
            the required threshold.
            `,
            "ai"
        );

    },700);


    setTimeout(() => {

        addAgentMessage(
            `
            <strong>Recovery planning started.</strong><br><br>

            1. Checking internal workforce...<br>
            2. Checking external talent...<br>
            3. Checking contractor option...<br>
            4. Checking upskilling option...
            `,
            "ai"
        );

    },1600);


    setTimeout(() => {

        addAgentMessage(
            `
            <strong>✓ Recovery recommendation</strong><br><br>

            Priya Sharma has
            <strong>94% skill compatibility</strong>.
            <br><br>

            AI recommends technical interview
            followed by human approval.
            `,
            "ai"
        );


        addAudit(
            "Attrition recovery initiated",
            "AI detected AWS/Python capacity loss and generated replacement recommendation."
        );


        showToast(
            "AI recovered from attrition scenario."
        );

    },2800);

}


/* =========================================================
   AUDIT LOG
========================================================= */

function addAudit(title,description){

    auditLogs.unshift({

        title,
        description,
        time:
            "Today • " +
            new Date().toLocaleTimeString(
                [],
                {
                    hour:"2-digit",
                    minute:"2-digit"
                }
            )

    });


    auditLogs =
        auditLogs.slice(0,20);


    localStorage.setItem(
        "auditLogs",
        JSON.stringify(auditLogs)
    );


    renderActivity();

}


function renderActivity(){

    const table =
        document.getElementById(
            "adminActivityTable"
        );


    if(table){

        table.innerHTML = `

            <div class="table-head">

                <span>EVENT</span>
                <span>DETAIL</span>
                <span>STATUS</span>
                <span>TIME</span>

            </div>

        `;


        auditLogs
            .slice(0,5)
            .forEach(log => {

                table.innerHTML += `

                    <div class="table-row">

                        <span>
                            ${log.title}
                        </span>

                        <span>
                            ${log.description}
                        </span>

                        <span class="badge success-badge">
                            Verified
                        </span>

                        <span>
                            ${log.time}
                        </span>

                    </div>

                `;

            });

    }


    const timeline =
        document.getElementById(
            "timeline"
        );


    if(timeline){

        timeline.innerHTML = "";


        auditLogs.forEach(log => {

            timeline.innerHTML += `

                <div class="timeline-item">

                    <div class="timeline-dot"></div>

                    <div>

                        <strong>
                            ${log.title}
                        </strong>

                        <p>
                            ${log.description}
                        </p>

                        <small>
                            ${log.time}
                        </small>

                    </div>

                </div>

            `;

        });

    }

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function showNotifications(){

    document
        .getElementById(
            "notificationModal"
        )
        .classList.remove("hidden");

}


function closeNotifications(){

    document
        .getElementById(
            "notificationModal"
        )
        .classList.add("hidden");

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message){

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    },3000);

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderActivity();

        const savedUser =
            JSON.parse(
                localStorage.getItem(
                    "currentUser"
                )
            );


        if(savedUser){

            currentUser =
                savedUser;

        }

    }
);