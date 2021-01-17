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
const ct = document.getElementById('cont');
let count = 5;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Clear the form
function clearForm() {
  document.getElementById("addForm").reset();
}

// Add class
function addClass() {
    // Select location to change the section class
    const insertClass = document.getElementById(`sec${count}`);

    // Change the class to the section added to active
    insertClass.className = 'active';
}

// Delete class
function delClass() {
    // Remove the active class
    prevSec = count-2;
    const removeClass = document.getElementById(`sec${prevSec}`);
    removeClass.className = ' ';
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
// Add a Section Title to the navbar and add the section text & author to the main content
function addSection(e){
  e.preventDefault();

  // Get input values
  const newAuthor = document.getElementById('name').value;
  const newTitle = document.getElementById('title').value;
  const newText = document.getElementById('section').value;

  if (count <= 7){
    // Create new a & li elements for the navbar
    const a = document.createElement('a');
    const li = document.createElement('li');

    // Append the a element to the li element
    li.appendChild(a);

    // Create a new p element in the content area
    const p = document.createElement('p');

    // Create new html to insert new elements
    const newSection = document.querySelector('#cont');
    const htmlTextToAdd = '<section id="sec" class=""><div class="landing__container"><div class="accordion"><h3 id="newTitle" class=""></h3></div><div id="newContent" class="panel"></div></div></section>';
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
             
    // Change ids for future aditions
    document.getElementById("sec").id = `sec${count}`;
    document.getElementById("newTitle").id = count;
    document.getElementById("newContent").id = `cont${count}`;

    // Scroll to section on link click
    const lk = document.getElementsByTagName('a');
    a.href = `#${count}`;
 
    // Add text node with input value to a element
    a.appendChild(document.createTextNode(newTitle));
 
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

    // Set added section as active
    addClass();
       
    // Reset counter
    count++;
        
    // Clear the form after submitting
    clearForm();

    // Change the class of the previously added sections so that only the last added is active
    delClass();

   } else {
          // Create new html in the sidebar to include a message to the user
          const newMessage = document.querySelector('#sd');
          const messageToAdd = '<div id="newAuthor"><h3 class="message"></h3><p class="message"></p></div>';
          newMessage.insertAdjacentHTML('beforeend', messageToAdd);
      
          // Select location to insert message
          const insertMessage = document.querySelector('#newAuthor p');
          
          // Message for the user when a new section cannot be added due to the set limit
          insertMessage.textContent = 'You cannot add more sections in this webpage';
  }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Event listener - Form submit event
form.addEventListener('submit', addSection);
  

// Add class 'active' to section when near top of viewport


/**
// Helper function
const isInViewport = function (elem) {
  const bounding = elem.getBoundingClientRect();
  return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Get the h1 heading
const h1 = document.querySelector('h1');
  if (isInViewport(h1)) {
    const positionScroll = document.getElementById(`sec${count}`).id;
    const mySec = document.getElementById(positionScroll);
    window.addEventListener('scroll', function (event) {
    if (isInViewport(mySec)) {
      mySec.classList.add('active');
    }
  }, false);
}
*/



// Scroll to anchor ID using scrollTO event






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
