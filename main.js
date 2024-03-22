// Generisk funktion för att ladda data från localStorage
function $8fd472cea1c46f10$var$loadFromStorage(key) {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return null;
}
// Anpassad funktion för att spara kurser i localStorage
function $8fd472cea1c46f10$var$saveCourses(courses) {
    localStorage.setItem("courses", JSON.stringify(courses));
}
// Funktionen printUserDetails uppdaterad för att använda den generiska funktionen loadFromStorage
function $8fd472cea1c46f10$var$printUserDetails() {
    const courses = $8fd472cea1c46f10$var$loadFromStorage("courses") || [];
    const userDetailsDiv = document.getElementById("courseDetails");
    if (userDetailsDiv) {
        userDetailsDiv.innerHTML = ""; // Rensa befintligt innehåll
        courses.forEach((course)=>{
            const courseDiv = document.createElement("div");
            courseDiv.id = course.code; // Sätter id till kurskoden
            courseDiv.innerHTML = `
          <ul>
            <li><strong>Kursnamn:</strong> ${course.name}</li>
            <li><strong>Kurskod:</strong> ${course.code}</li>
            <li><strong>Progression:</strong> ${course.progression}</li>
            <li><strong>Hemsida:</strong> <a href="${course.url}" target="_blank">${course.url}</a></li>
          </ul>
        `;
            userDetailsDiv.appendChild(courseDiv); // Lägg till den nya div:en i userDetailsDiv
        });
    }
}
// Funktion för att rensa kurser från localStorage och uppdatera UI
function $8fd472cea1c46f10$var$clearCourses() {
    localStorage.removeItem("courses");
    $8fd472cea1c46f10$var$printUserDetails();
}
// Funktion för att rensa formulärfält
function $8fd472cea1c46f10$var$clearFormFields() {
    document.getElementById("name").value = "";
    document.getElementById("code").value = "";
    document.getElementById("url").value = "";
    document.getElementById("progression").value = "A";
}
// Initieringsfunktion som sätter upp eventlyssnare
function $8fd472cea1c46f10$var$initializeApp() {
    $8fd472cea1c46f10$var$printUserDetails();
    const createButton = document.getElementById("courseForm");
    createButton.addEventListener("submit", (event)=>{
        event.preventDefault();
        const newCourse = {
            name: document.getElementById("name").value,
            code: document.getElementById("code").value,
            url: document.getElementById("url").value,
            progression: document.getElementById("progression").value
        };
        const courses = $8fd472cea1c46f10$var$loadFromStorage("courses") || [];
        const existingCourseIndex = courses.findIndex((course)=>course.code === newCourse.code);
        // Om kursen redan finns
        if (existingCourseIndex !== -1) {
            // Visa en bekräftelseruta
            const overwrite = confirm("En kurs med denna kod finns redan. Vill du skriva \xf6ver den befintliga kursen?");
            if (overwrite) // Ersätt den befintliga kursen med den nya informationen
            courses[existingCourseIndex] = newCourse;
            else // Avbryt operationen om användaren klickar "Avbryt"
            return;
        } else // Lägg till kursen om den inte redan finns
        courses.push(newCourse);
        // Spara den uppdaterade listan och uppdatera UI
        $8fd472cea1c46f10$var$saveCourses(courses);
        $8fd472cea1c46f10$var$printUserDetails();
        $8fd472cea1c46f10$var$clearFormFields();
    });
    const clearButton = document.getElementById("clearbutton");
    clearButton.addEventListener("click", $8fd472cea1c46f10$var$clearCourses);
}
document.addEventListener("DOMContentLoaded", $8fd472cea1c46f10$var$initializeApp);


//# sourceMappingURL=main.js.map
