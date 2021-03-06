// import $ from "jquery";
// import Popper from "popper.js";
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/alert';


require("../css/style.scss");

$(function () {
  if (typeof Storage != "undefined") {
    if (!sessionStorage.getItem("done")) {
      setTimeout(function () {
        $("#contactFormModal").modal("show");
        sessionStorage.setItem("done", true);
      }, 5000);
    }
  }
});

(function () {
  var newsletterForm = document.querySelector("#mc-embedded-subscribe-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      var email = document.querySelector("#mce-EMAIL").value.trim();
      if (email) {
        e.preventDefault();
        fetch("/newsletter-signup", {
          method: 'POST',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ email }) // data can be `string` or {object}!

      }).then(res => res.json())
        .then(response => {
          if (response.code === 200) {
            var img = `<img src='/media/spinner.svg' class="mx-auto d-block"/>`
            var html = `
            <div class="alert alert-success" role="alert">
              Thanks for subscribing. Please check your Mail.
            </div>
            `
            document.getElementById("mc-embedded-subscribe-form").innerHTML = img
            setTimeout(() => {
              document.getElementById("mc-embedded-subscribe-form").parentElement.innerHTML = html          
            }, 3000)
          } else {
            let img = `<img src='/media/spinner.svg' class="mx-auto d-block"/>`
            let html = `<div class="alert alert-danger" role="alert">
                An error occured. Please try again later!
              </div>`
            document.getElementById("mc-embedded-subscribe-form").innerHTML = img
            setTimeout(() => {
              document.getElementById("mc-embedded-subscribe-form").parentElement.innerHTML = html
            }, 3000)
          }
        })
        .catch(error => {
          console.error('Error:', error)
        });
      }
    })
  }
})();
//

$('.counter-count').each(function () {
  $(this).prop('Counter', 0).animate({
    Counter: $(this).text()
  }, {
      duration: 5000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
});
var scrollbuttons = document.getElementsByClassName('scrollbutton');
for (var i = 0, len = scrollbuttons.length; i < len; i++) {
  scrollbuttons[i].addEventListener('click', function (event) {
    event.preventDefault()
    document.querySelector(event.target.attributes.href.value).scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
  })
}

//
// let typedCursor = new Typed('.subtitle', {
//   strings: ["Learn digital skills with us to get the most fulfilling jobs."],
//   typeSpeed: 30,
//   loop: true
// });
// console.log(typedCursor)

//nav-sticky
// const nav = document.querySelector('#headernav');
// const navTop = nav.offsetTop;
//
// function stickyNavigation() {
//   console.log('navTop = ' + navTop);
//   console.log('scrollY = ' + window.scrollY);
//
//   if (window.scrollY >= navTop) {
//     // nav offsetHeight = height of nav
//     document.body.style.paddingTop = nav.offsetHeight + 'px';
//     document.body.classList.add('fixed-nav');
//   } else {
//     document.body.style.paddingTop = 0;
//     document.body.classList.remove('fixed-nav');
//   }
// }
//
// window.addEventListener('scroll', stickyNavigation);
