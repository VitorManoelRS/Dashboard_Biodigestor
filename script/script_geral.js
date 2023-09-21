//FUNÇÃO PARA PUXAR E TIRAR A SIDEBAR
function openNav() {
    var bar = document.getElementById("mySidebar");
    var main = document.getElementById("content");
    if (bar.style.left === "0px") {
        bar.style.left = "-250px";
        main.style.marginLeft = "0";
    }
    else {
        bar.style.left = "0px";
        main.style.marginLeft = "250px";
    }
}

// FUNÇÃO PARA O DROPDOWN DA SIDEBAR
$(document).ready(function(){

    $('.sub-btn').click(function(){
      $(this).next('.sub-menu').slideToggle();
      $(this).find('.dropdown').toggleClass('rotate');
    });  
    $('.menu-btn').click(function(){
      $('.side-bar').addClass('active');
      $('.menu-btn').css("visibility", "hidden");
    });
  
    $('.close-btn').click(function(){
      $('.side-bar').removeClass('active');
      $('.menu-btn').css("visibility", "visible");
    });
  
  });
