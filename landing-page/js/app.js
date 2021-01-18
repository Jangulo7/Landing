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
  document.getElementById('addForm').reset();
}

// Add class active
function addClass() {
  // Select location to change the section class
  const insertClass = document.getElementById(`sec${count}`);

  // Change the class to the section added to active
  insertClass.className = 'active';
}

// Delete class active
function delClass() {
  // Remove the active class
  prevSec = count-2;
  const removeClass = document.getElementById(`sec${prevSec}`);
  removeClass.className = '';
}

// Message class
//Include a success message to the user when a new section is created
function successMessage() {
  // Select location to insert message
  const insertMessage = document.querySelector('#newAuthor p');
  
  // Message for the user when a new section cannot be added due to the set limit
  insertMessage.textContent = 'You have successfully added a new section';
  
  // Set the message for only 3 seconds
  setTimeout(function(){
    document.getElementById('newAuthor').style.display = 'none';
    },3000);

    document.getElementById('newAuthor').style.display = 'block';
}

//Include a message to the user when the limit of 7 section is reached
function failureMessage() {
  // Set display
  document.getElementById('newAuthor').style.display = 'block';

  // Get input from form
  const newAuthor = document.getElementById('name').value;
  
  // Select location to insert author
  const insertAuthor = document.querySelector('#newAuthor h3');

  // Message for the user after inserting a new section
  insertAuthor.textContent = newAuthor;

  // Select location to insert message
  const insertMessage = document.querySelector('#newAuthor p');
  
  // Message for the user when a new section cannot be added due to the set limit
  insertMessage.textContent = 'You cannot add more sections in this webpage';
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
// Add a Section Title to the navbar and add the section title & text to the main content
function addSection(e){
  e.preventDefault();

  // Get input values
  const newAuthor = document.getElementById('name').value;
  const newTitle = document.getElementById('title').value;
  const newText = document.getElementById('section').value;

  // The form allows the creation of seven sections. After that a message will be sent to the user.
  // The limit of seven is adopted only for review purposes and it can be changed in the condition.
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
    const htmlTextToAdd = '<section id="sec" class="main__content__cont__sec"><div class="landing__container"><div class="accordion"><h3 id="newTitle" class=""></h3></div><div id="newContent" class="panel"></div></div></section>';
    newSection.insertAdjacentHTML('beforeend', htmlTextToAdd);
    
    // Select location to insert section title
    const insertTitle = document.getElementById('newTitle');
     
    // Select location to insert section content
    const insertContent = document.getElementById('newContent');
         
    // Select location to insert author
    const insertAuthor = document.querySelector('#newAuthor h3');
     
    // Select location to insert message
    const insertMessage = document.querySelector('#newAuthor p');
             
    // Change ids for future additions
    document.getElementById('sec').id = `sec${count}`;
    document.getElementById('newTitle').id = count;
    document.getElementById('newContent').id = `cont${count}`;

    // Scroll to section on link click
    const lk = document.getElementsByTagName('a');
    a.href = `#${count}`;
 
    // Add text node with input value (section title) to a element
    a.appendChild(document.createTextNode(newTitle));
 
    // Add text node with input value (section text) 
    p.appendChild(document.createTextNode(newText));
   
    // Append li to navbar
    navList.appendChild(li);
 
    // Add title to the section title
    insertTitle.textContent = newTitle;
   
    // Add section text to the content area
    insertContent.appendChild(p);
     
    // Message for the user after inserting a new section
    insertAuthor.textContent = `${newAuthor}:`;
    
    successMessage();
    
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
    failureMessage();
    clearForm();
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
  const isInViewport = function(elem) {
    const distance = elem.getBoundingClientRect();
    return (
      distance.top >= 0 &&
      distance.left >= 0 &&
      distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

const scrollColor = document.querySelectorAll('.main__content__cont__sec');
window.addEventListener('scroll', function(event) {
// add event on scroll
scrollColor.forEach(element => {
    //for each to all elements in scrollColor
    if (isInViewport(element)) {
      //if in Viewport
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
});
}, false);

// Collapsable Sections 
const collapsableSec = document.getElementsByClassName('accordion');
let i;

for (i = 0; i < collapsableSec.length; i++) {
  collapsableSec[i].addEventListener('click', function() {
      const newAcc = this;
    // Toggle between adding and removing the "active" class
    // Toggle between hiding and showing the active panel
    const panel = newAcc.nextElementSibling;
    if (panel.style.display === 'none') {
      panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
    }
  });
  }

// Scroll to top
//When the user is near the bottom of the page a backToTop button appears 
const backToTopBtn= document.querySelector('.main__content__cont--btn')
const rootElement = document.documentElement

function handleScroll() {
  // do something on scroll
  const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
  if ((rootElement.scrollTop / scrollTotal ) > 0.90) {
    //show button
    backToTopBtn.style.display = 'block'
  } else {
    //hide button
    backToTopBtn.style.display = 'none'
  }
}

function backToTop() {
  //scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}


// Back to top listeners
backToTopBtn.addEventListener('click', backToTop);
document.addEventListener('scroll', handleScroll);
