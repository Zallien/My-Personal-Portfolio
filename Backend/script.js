const projects = [
    {
        title: "POS System",
        tech: ["C#", ".NET", "MySQL"],
        images: [
            "assets/images/p1-1.png",
            "assets/images/p1-2.png",
            "assets/images/p1-3.png"
        ],
        link: "https://github.com/yourrepo"
    },
    {
        title: "Inventory System",
        tech: ["PHP", "MySQL", "Bootstrap"],
        images: [
            "assets/images/p2-1.png",
            "assets/images/p2-2.png",
            "assets/images/p2-3.png"
        ],
        link: "https://github.com/yourrepo"
    }
];

const container = document.getElementById("projects-container");

projects.forEach(project => {
    const col = document.createElement("div");
    col.className = "col-md-6";

    col.innerHTML = `
        <div class="project-card">
            <h4>${project.title}</h4>

            <div class="project-images">
                ${project.images.map(img => `<img src="${img}">`).join("")}
            </div>

            <p><strong>Tech Stack:</strong> ${project.tech.join(", ")}</p>

            <a href="${project.link}" target="_blank" class="btn btn-info">
                View Project
            </a>
        </div>
    `;

    container.appendChild(col);
});