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
//Include a success message to the user when a new section is created for 3 seconds
function successMessage() {
  const insertMessage = document.querySelector('#newAuthor p');
  insertMessage.textContent = 'You have successfully added a new section';
  setTimeout(function(){
    document.getElementById('newAuthor').style.display = 'none';
    },3000);
    document.getElementById('newAuthor').style.display = 'block';
}

//Include a message to the user when the limit of 7 section is reached
function failureMessage() {
  document.getElementById('newAuthor').style.display = 'block';
  const newAuthor = document.getElementById('name').value;
  const insertAuthor = document.querySelector('#newAuthor h3');
  insertAuthor.textContent = newAuthor;
  const insertMessage = document.querySelector('#newAuthor p');
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
function addSection(e){
  e.preventDefault();
  validate();
  const navList = document.getElementById('navbar__list');
  const newAuthor = document.getElementById('name').value;
  const newTitle = document.getElementById('title').value;
  const newText = document.getElementById('section').value;
  // The form allows the creation of seven sections. After that a message will be sent to the user.
  // The limit of seven is adopted only for review purposes and it can be changed in the condition.
  if (count <= 7){
    const a = document.createElement('a');
    const li = document.createElement('li');
    li.appendChild(a);
    const p = document.createElement('p');
    const newSection = document.querySelector('#cont');
    const htmlTextToAdd = '<section id="section" class="main__content__cont__sec"><div class="landing__container"><div class="accordion"><h3 id="newTitle" class=""></h3></div><div id="newContent" class="panel"></div></div></section>';
    newSection.insertAdjacentHTML('beforeend', htmlTextToAdd);
    document.getElementById('section').id = `section${count}`;
    document.getElementById('newTitle').id = count;
    document.getElementById('newContent').id = `cont${count}`;
    const insertTitle = document.getElementById(`${count}`);
    const insertContent = document.getElementById(`cont${count}`);
    const insertAuthor = document.querySelector('#newAuthor h3');
    const insertMessage = document.querySelector('#newAuthor p');
    const lk = document.getElementsByTagName('a');
    a.href = `#section${count}`;
    a.className = ' ';
    a.id = `link${count}`;
    a.appendChild(document.createTextNode(newTitle));
    p.appendChild(document.createTextNode(newText));
    navList.appendChild(li);
    insertTitle.textContent = newTitle;
    insertContent.appendChild(p);
    insertAuthor.textContent = `${newAuthor}:`;
    successMessage();      
    count++;
    clearForm();
   } else {
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


// Add active class to nav element when clicked
const myClick = hd.addEventListener('click', changeNav);

function changeNav(e) {
  const myTarget = e.target.id;
  console.log('Clicked id:' + myTarget);
  const myElem = document.getElementById(`${myTarget}`);  
  myElem.classList.add('active');
  const links = document.querySelectorAll('[id^="link"]');
  const linksArr = Array.from(links);
  const result = linksArr.filter(x => x.id).map(x => x.id)
  let removed = result.indexOf(myTarget, 0);
  result.splice(removed,1);
  result.forEach(element => document.getElementById(`${element}`).classList.remove('active'));
}

// Smooth scrolling to sections
function scrollTo() {
	const links = document.getElementsByTagName('a');
	for (let i = 0; i < links.length; i++) {
		let link = links[i];
		if ((link.href && link.href.indexOf('#') != -1) && ((link.pathname == location.pathname) || ('/' + link.pathname == location.pathname)) && (link.search == location.search)) {
			link.onclick = scrollAnchors;
		}
	}
}

function scrollAnchors(e, respond = null) {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
	e.preventDefault();
	let targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;
	const originalTop = distanceToTop(targetAnchor);
	window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
	const checkIfDone = setInterval(function() {
		const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = '-1';
			window.history.pushState('', '', targetID);
			clearInterval(checkIfDone);
		}
	}, 100);
}

//Listener of Smooth scrolling
hd.addEventListener('click', scrollTo);

