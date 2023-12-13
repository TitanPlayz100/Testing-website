
// adds blur to scrolling
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('div');

hiddenElements.forEach((el) => {
    observer.observe(el);
});

// minimises top navbar on scroll
window.onscroll = function() {scrollFunction()};


function scrollFunction() {
  if (window.innerWidth > 1000) {
    if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
      document.getElementsByClassName("navbar")[0].style.padding = "0vw 10vw";
      document.getElementsByClassName("navtext")[0].style.fontSize = "1.5vw";
      document.getElementsByClassName("navimg")[0].style.width = "3vw";
    } else {
      document.getElementsByClassName("navbar")[0].style.padding = "2vw 20vw";
      document.getElementsByClassName("navtext")[0].style.fontSize = "2.5vw";
      document.getElementsByClassName("navimg")[0].style.width = "4vw";
    }
  } else {
      document.getElementsByClassName("navbar")[0].style.padding = "";
      document.getElementsByClassName("navtext")[0].style.fontSize = "";
      document.getElementsByClassName("navimg")[0].style.width = "";
  }
  
}

// navbar
var navbarItems = `
<nav class="navbar">
  <ul>
    <li><img src="assets/logo.png" class="navimg"></li>
    <li><strong><a class="navtext" href="https://titanplayz100.github.io/">TitanPlayz's
          Website</a></strong></li>
  </ul>
  <ul class="hide_on_mobile">
    <li><a href="https://youtube.com/@titanplayz100" role="button" class="contrast outline">Youtube</a>
    <li><a href="about-me.html" role="button" class="contrast outline">About Me</a>
    <li><a href="index.html" role="button" class="contrast">Home Page</a>
  </ul>
</nav>
`
document.getElementsByClassName("container")[0].insertAdjacentHTML("beforebegin", navbarItems);

// footer
var footerItems = `
<div class="footer show">
  <center>
    <a href="" role="button" class="secondary outline" onclick="scrollToTop();return false">Back to top</a>
  </center>
</div>
`
document.getElementsByClassName("container")[0].insertAdjacentHTML("afterend", footerItems);

// smooth scrolling
function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}