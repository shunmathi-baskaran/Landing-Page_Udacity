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
let unorderedList=document.querySelector('#navbar__list');
let sectionList=document.querySelectorAll('section');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Change link active state when scroll
 * @param {element which is in viewport} section 
 */
function changeActiveLink(section){
    let mainNavLinks=document.querySelectorAll('nav ul li a');
    for(let link of mainNavLinks){
        if(link.classList.contains('navbar__menu-active')){
            link.classList.remove('navbar__menu-active');
        }
        if(link.href.split('#')[1]==section.id){
           link.classList.add('navbar__menu-active');
        }
    }
}


/**
 * get the coordinates of the section element
 * @param {section element} elem 
 */
function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    for(let section of sectionList){
        let newList=document.createElement('li');
        let link=document.createElement('a');
        link.setAttribute('href',`#${section.id}`);
        link.innerHTML=section.attributes['data-nav'].nodeValue;
        link.classList.add('menu__link');        
        newList.appendChild(link);
        unorderedList.appendChild(newList);
    }
    unorderedList.firstChild.firstChild.classList.add('navbar__menu-active');
}


// Add class 'active' to section when near top of viewport
function addActive(){   
    for(let section of sectionList){
        let head=document.querySelector(`#${section.id} h2`);
        if(head.getBoundingClientRect().top <= window.innerHeight && head.getBoundingClientRect().top >=0){
            section.classList.add('your-active-class');
            changeActiveLink(section);
        }
        else{
            section.classList.remove('your-active-class');
        }
    }
}


//Scroll to anchor ID using scrollTO event
function scrollToSection(){
    if(event.target.nodeName==='A'){
        event.preventDefault();
        let section=document.querySelector(event.target.hash);
        changeActiveLink(section);
        secCoordinates=getCoords(section);
        window.scrollTo({
            left:secCoordinates.left,
            top:secCoordinates.top,
            behavior:"smooth"});
    }
}
  
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded',buildNav);


// Scroll to section on link click
unorderedList.addEventListener('click',scrollToSection);


// Set sections as active
window.addEventListener('scroll', addActive);

