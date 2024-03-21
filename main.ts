interface Course {
  name: string;
  code: string;
  progression: string;
  url: string;
}

// Läser kurser från localStorage vid start
function loadCourses(): Course[] {
  const courses = localStorage.getItem('courses');
  return courses ? JSON.parse(courses) : [];
}

// Sparar kurser till localStorage
function saveCourses(courses: Course[]) {
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Rensar alla kurser från både localStorage och UI
function clearCourses() : void {
  console.log("Rensar kurser...");
  localStorage.removeItem("courses");
  sessionStorage.clear();
  console.log("localStorage och sessionStorage har rensats.");
  const clearButton = document.getElementById("clearbutton") as HTMLButtonElement;
  clearButton.innerHTML = "";
  printUserDetails(); // Uppdatera UI för att reflektera rensningen
}

// Skriver ut alla kurser
function printUserDetails() {
  const courses = loadCourses();
  console.log("Aktuella kurser att visa:", courses);
  const userDetailsDiv = document.getElementById("courseDetails");
  if (userDetailsDiv) {
    userDetailsDiv.innerHTML = `<h2>Kurser:</h2><ul>` + courses.map(course => `
      <li><strong>Kursnamn:</strong> ${course.name}</li>
      <li><strong>Kurskod:</strong> ${course.code}</li>
      <li><strong>Progression:</strong> ${course.progression}</li>
      <li><strong>Hemsida:</strong> <a href="${course.url}" target="_blank">${course.url}</a></li>
    `).join('') + `</ul>`;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  printUserDetails(); // Skriver ut kurser vid sidans laddning

  const userForm = document.getElementById("courseForm") as HTMLFormElement;
  const clearButton = document.getElementById("clearbutton") as HTMLButtonElement;

  userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Hämta värden från formuläret
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const codeInput = document.getElementById("code") as HTMLInputElement;
    const urlInput = document.getElementById("url") as HTMLInputElement;
    const progressionInput = document.getElementById("progression") as HTMLInputElement;

    const newCourse: Course = {
      name: nameInput.value,
      code: codeInput.value,
      url: urlInput.value,
      progression: progressionInput.value,
    };

    const courses = loadCourses();

    if (courses.some(course => course.code === newCourse.code)) {
      alert('En kurs med denna kod finns redan.');
      return;
    }

    courses.push(newCourse); // Lägg till den nya kursen
    saveCourses(courses); // Spara den uppdaterade listan av kurser

    printUserDetails(); // Uppdatera kurslistan på sidan
      // Rensa formulärfälten
      nameInput.value = "";
      codeInput.value = "";
      urlInput.value = "";
      progressionInput.value = "";
  });

  clearButton.addEventListener("click", clearCourses); // Lägg till event listener för att rensa kurser
});
