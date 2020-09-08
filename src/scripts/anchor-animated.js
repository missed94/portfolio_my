import $ from 'jquery';
global.jQuery = $;
global.$ = $;



$(document).ready(function(){
  $(".header-menu, .footer-menu, .scroll__btn-wrapper, .full-menu__nav").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1000);
  });
});


const about = $("#about");


about.on("click", () => {
  console.log("click");
})