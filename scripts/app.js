// blur to scrolling
const observer = new IntersectionObserver(entries =>
  entries.forEach(entry =>
    entry.isIntersecting
      ? entry.target.classList.add('show')
      : entry.target.classList.remove('show')
  )
);

[...document.getElementsByTagName('div')].forEach(el => observer.observe(el))

// smooth scrolling
function scrollToTop() { scrollTo({ top: 0, behavior: 'smooth' }) }

// minimises top navbar on scroll
onscroll = () => {
  const cond1 = innerWidth > 1000, cond2 = document.documentElement.scrollTop > 90
  document.getElementById("navbar").style.padding = cond1 ? cond2 ? "0vw 10vw" : "2vw 20vw" : "";
  document.getElementById("navtext").style.fontSize = cond1 ? cond2 ? "1.5vw" : "2.5vw" : "";
  document.getElementById("navimg").style.width = cond1 ? cond2 ? "3vw" : "4vw" : "";
}

// navbar
const navbarItems = `
<nav id="navbar">
  <ul>
    <li><img src="assets/logo.png" id="navimg"></li>
    <li><a id="navtext" href="https://titanplayz100.github.io/">TitanPlayz's Website</a></li>
  </ul>
  <ul class="hide_on_mobile">
    <li><a href="https://youtube.com/@titanplayz100" role="button" class="contrast outline">Youtube</a>
    <li><a href="about-me.html" role="button" class="contrast outline">About Me</a>
    <li><a href="index.html" role="button" class="contrast">Home Page</a>
  </ul>
</nav>
`
document.getElementsByTagName("main")[0].insertAdjacentHTML("beforebegin", navbarItems);

// footer
const footerItems = `
<div class="show" id="footer">
    <a href="" role="button" class="secondary outline" onclick="scrollToTop();return false">Back to top</a>
    <a class="secondary" style="margin: 1vw;" href="https://github.com/TitanPlayz100/titanplayz100.github.io">Github Repo</a>
</div>
`
document.getElementsByTagName("main")[0].insertAdjacentHTML("afterend", footerItems);