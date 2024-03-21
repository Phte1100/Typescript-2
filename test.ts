interface Course {
    name: string;
    code: string;
    progression: string;
    url: string;
  }
  
  // Generisk funktion för att ladda data från localStorage
  function loadFromStorage<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as T;
    }
    return null;
  }
  
  // Anpassad funktion för att spara kurser i localStorage
  function saveCourses(courses: Course[]): void {
    localStorage.setItem('courses', JSON.stringify(courses));
  }
  
  // Funktionen printUserDetails uppdaterad för att använda den generiska funktionen loadFromStorage
  function printUserDetails(): void {
    const courses = loadFromStorage<Course[]>('courses') || [];
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
  
  // Funktion för att rensa kurser från localStorage och uppdatera UI
  function clearCourses(): void {
    localStorage.removeItem("courses");
    printUserDetails();
  }
  
  // Funktion för att rensa formulärfält
  function clearFormFields(): void {
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("code") as HTMLInputElement).value = "";
    (document.getElementById("url") as HTMLInputElement).value = "";
    (document.getElementById("progression") as HTMLSelectElement).value = "A";
  }
  
  // Initieringsfunktion som sätter upp eventlyssnare
  function initializeApp(): void {
    printUserDetails();
  
    const userForm = document.getElementById("courseForm") as HTMLFormElement;
    userForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const newCourse: Course = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        code: (document.getElementById("code") as HTMLInputElement).value,
        url: (document.getElementById("url") as HTMLInputElement).value,
        progression: (document.getElementById("progression") as HTMLSelectElement).value,
      };
  
      const courses = loadFromStorage<Course[]>('courses') || [];
      if (courses.some(course => course.code === newCourse.code)) {
        alert('En kurs med denna kod finns redan.');
        return;
      }
  
      courses.push(newCourse);
      saveCourses(courses);
      printUserDetails();
      clearFormFields();
    });
  
    const clearButton = document.getElementById("clearbutton") as HTMLButtonElement;
    clearButton.addEventListener("click", clearCourses);
  }
  
  document.addEventListener('DOMContentLoaded', initializeApp);
  