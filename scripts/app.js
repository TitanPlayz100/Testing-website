// adds blur to scrolling
const observer = new IntersectionObserver(entries =>
  entries.forEach(entry =>
    entry.isIntersecting
      ? entry.target.classList.add('visible')
      : entry.target.classList.remove('visible')
  )
);

document.getElementsByTagName('div').forEach(el => observer.observe(el))

// smooth scrolling
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

// minimises top navbar on scroll
window.onscroll = () => {
  const cond1 = innerWidth > 1000, cond2 = document.body.scrollTop > 90
  document.getElementById("navbar").style.padding = cond1 ? cond2 ? "0vw 10vw" : "2vw 20vw" : "";
  document.getElementById("navtext").style.fontSize = cond1 ? cond2 ? "1.5vw" : "2.5vw" : "";
  document.getElementById("navimg").style.width = cond1 ? cond2 ? "3vw" : "4vw" : "";
}

// navbar
var navbarItems = `
<nav class="navbar" id="navbar">
  <ul>
    <li><img src="assets/logo.png" class="navimg" id="navimg"></li>
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
document.getElementsByTagName("main").insertAdjacentHTML("beforebegin", navbarItems);

// footer
var footerItems = `
<div class="footer show" id="footer">
  <center>
    <a href="" role="button" class="secondary outline" onclick="scrollToTop();return false">Back to top</a>
  </center>
</div>
`
document.getElementsByTagName("main").insertAdjacentHTML("afterend", footerItems);