const fullMenu = document.querySelector(".full-menu");
const hamburger = document.querySelector(".hamburger");


const closeMenu = (menu) => {
  menu.style.left = 100 + "%"
}

const openMenu = (menu) => {
  menu.style.left = "0"
}

hamburger.addEventListener("click", () => {
  openMenu(fullMenu);
})

fullMenu.addEventListener("click", e => {
const $target = e.target
  if ($target.className == "close-icon" 
  || $target.className == "full-menu__nav__link"
  ) {
    closeMenu(fullMenu)
  }

})

window.addEventListener("resize", e => {

  if (e.currentTarget.innerWidth > 767) {
    closeMenu(fullMenu)
  }

});
