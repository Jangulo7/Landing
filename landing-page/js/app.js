/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const form = document.getElementById('addForm');
const navList = document.getElementById('navbar__list');
const message = document.getElementById('sd');
  

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Clear the form
function clearForm() {
  document.getElementById("addForm").reset();
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// Build the nav

// Form submit event
form.addEventListener('submit', addSection);


// Add a Section Title to the navbar and add the section text & author to the main content
function addSection(e){
  e.preventDefault();

  // Get input values
  const newAuthor = document.getElementById('name').value;
  const newTitle = document.getElementById('title').value;
  const newText = document.getElementById('section').value;

  // Create new li element in the navbar
  const li = document.createElement('li');

  // Create a new p element in the content area
  const p = document.createElement('p');

  // Start html //
  // Create new html to insert new elements
  const newSection = document.querySelector('#cont');
  const htmlTextToAdd = '<section id="sec"><div class="landing__container"><div class="accordion"><h3 id="newTitle" class=""></h3></div><div id="newContent" class="panel"></div></div></section>';
  newSection.insertAdjacentHTML('beforeend', htmlTextToAdd);
    
  // Select location to insert section title
  const insertTitle = document.getElementById('newTitle');
    
  // Select location to insert section content
  const insertContent = document.getElementById('newContent');
    
  // Create new html in the sidebar to include a message to the user
  const newMessage = document.querySelector('#sd');
  const messageToAdd = '<div id="newAuthor"><h3 class="message"></h3><p class="message"></p></div>';
  newMessage.insertAdjacentHTML('beforeend', messageToAdd);
    
  // Select location to insert author
  const insertAuthor = document.querySelector('#newAuthor h3');
    
  // Select location to insert message
  const insertMessage = document.querySelector('#newAuthor p');
    
  // Select location to change the section class
  const insertClass = document.getElementById('sec');
  
  // End html //

  // Change the class to the section added and the text inside
  insertClass.className = 'active';
  p.className = 'active';

  // Add text node with input value to li element
  li.appendChild(document.createTextNode(newTitle));

  // Add text node with input value
  p.appendChild(document.createTextNode(newText));

  // Append li to navbar
  navList.appendChild(li);

  // Add title to the section title
  insertTitle.textContent = newTitle;

  // Add section text to the content area
  insertContent.appendChild(p);

  // Message for the user after inserting a new section
  insertAuthor.textContent = `${newAuthor}:`;
  insertMessage.textContent = 'You have successfully added a new section';

  //Clear the form after submitting
  clearForm();
}



// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


/* Collapsable Sections */
const acc = document.getElementsByClassName('accordion');
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function() {
      const newAcc = this;
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    newAcc.classList.toggle('active');
    /* Toggle between hiding and showing the active panel */
    const panel = newAcc.nextElementSibling;
    if (panel.style.display === 'none') {
      panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
      newAcc.classList.toggle('active');
    }
  });
}

