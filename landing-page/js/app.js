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
const message = document.getElementById('sd');
const ct = document.getElementById('cont');
const hd = document.getElementById('header');
let count = 5;
let numClick = 0;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Clear the form
function clearForm() {
  document.getElementById('addForm').reset();
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

// Form validation function.
function validate() {
  if( document.getElementById('name').value == "" ) {
    alert( "Please provide your name!" );
    document.form.Name.focus();
    return false;
  }
  
  if( document.getElementById('title').value == "" ) {
    alert( "Please provide the section title!" );
    document.form.newTitle.focus();
    return false;
  }

  if( document.getElementById('section').value == "" ) {
    alert( "Please provide the section name!" );
    document.form.newSection.focus();
    return false;
  }  
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
// Event listener - DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
      // Create new html to insert the nav
      const newSection = document.querySelector('.page__header');
      const htmlTextToAdd = '<nav class="navbar__menu" id="nav"><ul id="navbar__list"><li><a href="#section1" class=" " id="link1">STEAM</a></li><li><a href="#section2" class=" " id="link2">JOBS</a></li><li><a href="#section3" class=" " id="link3">TIC</a></li><li><a href="#section4" class=" " id="link4">SW</a></li></ul></nav>';
      newSection.insertAdjacentHTML('beforeend', htmlTextToAdd);
});

// Increase nav elements dinamically with the form

// Add a Section Title to the navbar and add the section title & text to the main content
function addSection(e){
  e.preventDefault();

  validate();

  const navList = document.getElementById('navbar__list');

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
    const htmlTextToAdd = '<section id="section" class="main__content__cont__sec"><div class="landing__container"><div class="accordion"><h3 id="newTitle" class=""></h3></div><div id="newContent" class="panel"></div></div></section>';
    newSection.insertAdjacentHTML('beforeend', htmlTextToAdd);
    
    // Change ids for future additions
    document.getElementById('section').id = `section${count}`;
    document.getElementById('newTitle').id = count;
    document.getElementById('newContent').id = `cont${count}`;

    // Select location to insert section title
    const insertTitle = document.getElementById(`${count}`);
     
    // Select location to insert section content
    const insertContent = document.getElementById(`cont${count}`);
         
    // Select location to insert author
    const insertAuthor = document.querySelector('#newAuthor h3');
     
    // Select location to insert message
    const insertMessage = document.querySelector('#newAuthor p');
             
    // Scroll to section on link click
    const lk = document.getElementsByTagName('a');
    a.href = `#section${count}`;
    a.className = ' ';
    a.id = `link${count}`;
 
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
           
    // Reset counter
    count++;
        
    // Clear the form after submitting
    clearForm();

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
// When the user is near the bottom of the page a backToTop button appears 
const backToTopBtn= document.querySelector('.main__content__cont--btn');
const rootElement = document.documentElement;

function handleScroll() {
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
  //scroll to top
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Back to top listeners
backToTopBtn.addEventListener('click', backToTop);
document.addEventListener('scroll', handleScroll);


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


// Add active to nav element when scrolling
const myClick = hd.addEventListener('click', changeNav);

function changeNav(e) {
  // Get clicked element and add active class
  const myTarget = e.target.id;
  console.log('Clicked id:' + myTarget);
  const myElem = document.getElementById(`${myTarget}`);  
  myElem.className = 'active';
  // Get all 'a' elements from nav and then exclude the one clicked
  const links = document.querySelectorAll('[id^="link"]');
  // Convert link NodeList to an array
  const linksArr = Array.from(links);
  //Extract only ids
  const result = linksArr.filter(x => x.id).map(x => x.id)
  // Ge the index of the clicked element
  let removed = result.indexOf(myTarget, 0);
  // Delete from the array the clicked element
  result.splice(removed,1);
  console.log('The REMOVED element:' + removed);
  console.log('The new array:' + result)
  //remove active class from other 'a' element except one clicked
  result.forEach(element => document.getElementById(`${element}`).classList.remove('active'));
}




