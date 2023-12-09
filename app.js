
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
  if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
    document.getElementById("navbar").style.padding = "0% 10%";
  } else {
    document.getElementById("navbar").style.padding = "2% 20%";
  }
}