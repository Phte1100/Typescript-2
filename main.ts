interface Courses {
    name: string;
    code: string;
    progression: string;
    url: string;
  }

  function printUserDetails(user: Courses): void {
    const userDetailsDiv = document.getElementById("courseDetails");
    if (userDetailsDiv) {
      userDetailsDiv.innerHTML += `
        <h2>Kurser:</h2>
        <ul>
        <li><strong>Kursnamn:</strong> ${user.name}</li>
        <li><strong>Kurskod:</strong> ${user.code}</li>
        <li><strong>Progression:</strong> ${user.progression}</li>
        <li><strong>Hemsida:</strong> ${user.url}</li>
        </ul>
      `;
    }
  }

  const userForm = document.getElementById("courseForm") as HTMLFormElement;

  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Hämta värden från formuläret
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const codeInput = document.getElementById("code") as HTMLInputElement;
    const urlInput = document.getElementById("url") as HTMLInputElement;
    const progressionInput = document.getElementById("progression") as HTMLInputElement;
  
    // Notering: här borde inputvalidering läggas till
  
    // Skapa ett användarobjekt
    const newCourse: Courses = {
      name: nameInput.value,
      code: codeInput.value,
      url: urlInput.value,
      progression: progressionInput.value,
    };
  
    // Använd printUserDetails för att skriva ut användardetaljer
    printUserDetails(newCourse);
  });