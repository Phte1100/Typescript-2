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

// Skriver ut alla kurser
function printUserDetails() {
  const courses = loadCourses();
  const userDetailsDiv = document.getElementById("courseDetails");
  if (userDetailsDiv) {
    userDetailsDiv.innerHTML = `<h2>Kurser:</h2><ul>` + courses.map(user => `
      <li><strong>Kursnamn:</strong> ${user.name}</li>
      <li><strong>Kurskod:</strong> ${user.code}</li>
      <li><strong>Progression:</strong> ${user.progression}</li>
      <li><strong>Hemsida:</strong> <a href="${user.url}" target="_blank">${user.url}</a></li>
    `).join('') + `</ul>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  printUserDetails(); // Skriver ut kurser vid sidans laddning
});

const userForm = document.getElementById("courseForm") as HTMLFormElement;

userForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Hämta värden från formuläret
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const codeInput = document.getElementById("code") as HTMLInputElement;
  const urlInput = document.getElementById("url") as HTMLInputElement;
  const progressionInput = document.getElementById("progression") as HTMLInputElement;

  // Skapa ett kursobjekt
  const newCourse: Course = {
    name: nameInput.value,
    code: codeInput.value,
    url: urlInput.value,
    progression: progressionInput.value,
  };

  const courses = loadCourses(); // Ladda befintliga kurser
  courses.push(newCourse); // Lägg till den nya kursen
  saveCourses(courses); // Spara den uppdaterade listan av kurser

  printUserDetails(); // Uppdatera kurslistan på sidan
});