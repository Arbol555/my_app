$(document).ready(function () {

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('.ir-arriba').slideDown(300);
    } else {
      $('.ir-arriba').slideUp(300);
    }
  });

  $('#menu').superfish();

  /*Menú responsivo
  -----------------------------------------------------------------------*/
  var menuBtn = $('.btn-menu-drop');
  var combinedMenu = $('.nav-bar nav').clone();
  var buscador = $('header .buscador-content').clone();
  buscador.addClass('buscador').prependTo(combinedMenu);

  combinedMenu.slicknav({
    prependTo: '.mb-mainNav',
    label: '',
    nestedParentLinks: false,
    duration: 50,
    closedSymbol: '<i class="icon-flecha" aria-hidden="true"></i>',
    openedSymbol: '<i class="icon-flecha flecha-up" aria-hidden="true"></i>',
    init: function () {
      $(".slicknav_nav").wrapInner("<div class='slicknav-wrap cfx'></div>")
    }
  });

  // cierra el menú al cliquear en un subitem
  $('#subMenu').click(function () {
    $('#subMenu').hide();
  })

}) //End dom

// intento: parámetro para validar si sigue esperando el height del frame
function resizeIframe(intento) {
  var iframe = window.parent.document.getElementById('frame');

  if (typeof intento != "undefined") {
    if (iframe.contentWindow.document.body.scrollHeight == 0 && intento < 3) {
      setTimeout(() => {
        resizeIframe(intento + 1);
      }, 1000);
    }
  }

  // Ajusto el tamanio del iframe
  var valuePx = iframe.contentWindow.document.body.scrollHeight;
  valuePx = valuePx + 40;
  iframe.style.height = valuePx + 'px';
}

function zoom() {
  resizeIframe(0);
  var iframe = window.parent.document.getElementById('frame');
  var relzoom = iframe.scrollWidth / iframe.contentWindow.document.body.scrollWidth;
  if (relzoom < 1) {
    iframe.contentWindow.document.body.style.zoom = relzoom;
  }
}

function resizeVentana() {
  resizeIframe();
}
