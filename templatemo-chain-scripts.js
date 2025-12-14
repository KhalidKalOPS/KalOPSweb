function toggleMenu() {
  document.getElementById("mobileNav").classList.toggle("active");
}

function closeMenu() {
  document.getElementById("mobileNav").classList.remove("active");
}

window.addEventListener("load", () => {
  console.log("JS Loaded Successfully");
});
