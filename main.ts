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
  function saveCourses(courses: Course[]): any {
    localStorage.setItem('courses', JSON.stringify(courses));
  }
  
  // Funktionen printUserDetails uppdaterad för att använda den generiska funktionen loadFromStorage
  function printUserDetails(): void {
    const courses = loadFromStorage<Course[]>('courses') || [];
    const userDetailsDiv = document.getElementById("courseDetails");
    if (userDetailsDiv) {
      userDetailsDiv.innerHTML = ''; // Rensa befintligt innehåll
      courses.forEach(course => {
        const courseDiv = document.createElement('div');
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
  
    const createButton = document.getElementById("courseForm") as HTMLFormElement;
    createButton.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const newCourse: Course = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        code: (document.getElementById("code") as HTMLInputElement).value,
        url: (document.getElementById("url") as HTMLInputElement).value,
        progression: (document.getElementById("progression") as HTMLSelectElement).value,
      };
  
      const courses = loadFromStorage<Course[]>('courses') || [];
      const existingCourseIndex = courses.findIndex(course => course.code === newCourse.code);
  
      // Om kursen redan finns
      if (existingCourseIndex !== -1) {
        // Visa en bekräftelseruta
        const overwrite = confirm("En kurs med denna kod finns redan. Vill du skriva över den befintliga kursen?");
        if (overwrite) {
          // Ersätt den befintliga kursen med den nya informationen
          courses[existingCourseIndex] = newCourse;
        } else {
          // Avbryt operationen om användaren klickar "Avbryt"
          return;
        }
      } else {
        // Lägg till kursen om den inte redan finns
        courses.push(newCourse);
      }
  
      // Spara den uppdaterade listan och uppdatera UI
      saveCourses(courses);
      printUserDetails();
      clearFormFields();
    });
  
    const clearButton = document.getElementById("clearbutton") as HTMLButtonElement;
    clearButton.addEventListener("click", clearCourses);
  }
  
  document.addEventListener('DOMContentLoaded', initializeApp);
    