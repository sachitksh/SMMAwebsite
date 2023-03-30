const currentUrl = window.location.pathname;
const links = document.querySelectorAll('.navbar a',);


links.forEach(link => {
  const linkUrl = link.getAttribute('href');
  if (currentUrl === linkUrl) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
