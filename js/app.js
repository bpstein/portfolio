$(window).load(function() {
  // MASONRY GRID FUNCTIONALITY 
  $('#container').masonry({
      "itemSelector": ".item",
      "columnWidth": ".grid-sizer",
  });
});

$(document).ready(function() {

  // DECLARE HTML ELEMENTS FOR PROJECT GRID
  var HTMLitem = '<li class="item '+'%data%"></li>';
  var HTMLitemImage = '<img src="%data%" class="image">';
  var HTMLitemAnchor = '<a class="overlay" href="#"</a>';
  var HTMLitemDescription = '<p class="description"></p>';
  var HTMLitemTitle = '<h3 class="title">%data%</h3>';
  var HTMLitemOverview = '<div class="overview"><p>%data%</p></div>';

  // APPEND HTML ELEMENTS TO PROJECT GRID
  projects.display = function() {
    for (project in projects.projects) {
      var formattedItem = HTMLitem.replace("%data%", projects.projects[project].workType);
      var formattedItemImage = HTMLitemImage.replace("%data%", projects.projects[project].image);
      var formattedItemDescription = HTMLitemDescription;
      var formattedItemAnchor = HTMLitemAnchor.replace("%data%", projects.projects[project].url);
      var formattedItemTitle = HTMLitemTitle.replace("%data%", projects.projects[project].name);
      var formattedItemOverview = HTMLitemOverview.replace("%data%", projects.projects[project].overview);
      $("#project-list").append(formattedItem); // Append project item to grid
      $(".item:last").append(formattedItemImage); // Append image to item
      $(".item:last").append(formattedItemDescription) // Append description to overlay
        .append(formattedItemAnchor); // Append overlay to image
      $(".overlay").append(formattedItemDescription); // Append description overlay
      $(".description:last").append(formattedItemTitle); // Append title to description
      $(".description:last").append(formattedItemOverview); // Append overview to description
    }
  }

  projects.display(); 

  // ITEM JQUERY EFFECTS ON HOVER
  $('.item').zoom({
    duration: 250,
    magnify: 0.6,
    onZoomIn: function () {
      $(this).parent().find('.itemHover').fadeIn(500);
    },
    onZoomOut: function () {
      $(this).parent().find('.itemHover').fadeOut(400);
    }
  });   

  // STICKY NAME  
  $(window).scroll(function() {
    console.log($(window).scrollTop())
    if ($(window).scrollTop() > 190) {
      $('.h1').removeClass('initial');
      $('#top-header').fadeIn(500);
    }
    else {
      $('h1').addClass('initial');
      $('#top-header').fadeOut(200);
    }
    if ($(window).scrollTop() > 190) {
      $('h2').fadeOut(500);
    }
    else {
      $('h2').fadeIn(800);
    }
  });

  // STICKY NAVBAR (WHITE)
  $(window).scroll(function() {
    if ($(window).scrollTop() > 45) {
      $('#navbar').fadeIn(500).addClass('sticky-header', 500).removeClass('initial-header');
    } 
    else {
      $('#navbar').addClass('initial-header').removeClass('sticky-header');
    }
  });

  // NAVBAR FILTER 
  $('nav li').on('click', function() {

    var filter = $(this).text().toLowerCase().replace(' ', '-');
    console.log(filter);

    $('#container .item').each(function() {
      if (!$(this).hasClass(filter)) {
        $(this).hide().addClass('.hide').removeClass('.show');
      }

      else if ($(this).hasClass(filter)) {
        $(this).show().addClass('.show');
        $("#container").masonry(masonryUpdate);
      }

      else {
        $(this).removeClass('.hide').addClass('.show');
        $("#container").masonry("reload");
      }
    });

    return false;

    // Reshuffle the masonry grid after a selection on the navbar
    var masonryUpdate = function() {
      setTimeout(function() {
        $('#container').masonry();
      }, 500);
    }

  $(document).on('click', masonryUpdate);
  $(document).ajaxComplete(masonryUpdate);
});


// MODAL WINDOW FUNCTIONALITY //
  var runModal = function() {
    var appendModal =  ("<div class='modal-overlay js-modal-close'></div>");
    for (project in projects.projects) {
      var HTMLitemDetails = '<p class="popup-detail">%data%</p>';
      var HTMLitemModalTitle = '<h3>%data%</h3>';
      var formattedItemDetails = HTMLitemDetails.replace("%data%", projects.projects[project].details);
      var formattedModalTitle = HTMLitemModalTitle.replace("%data%", projects.projects[project].title);
      $(".modal-body").append(formattedItemDetails);
      // $(".js-modal-close").append(formattedModalTitle);
    }

    $('a[data-modal-id]').click(function(e) {
      e.preventDefault();
      $("body").append(appendModal);
      $(".modal-overlay").fadeTo(500, 0.7);
      var modalBox = $(this).attr('data-modal-id');
      $('#'+modalBox).fadeIn($(this).data());
    });  
    
    $(".js-modal-close, .modal-overlay").click(function() {
      $(".modal-box, .modal-overlay").fadeOut(500, function() {
        $(".modal-overlay").remove();
      });
    });
     
    $(window).resize(function() {
      $(".modal-box").css({
        top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
        left: ($(window).width() - $(".modal-box").outerWidth()) / 2
      });
    });
     
    $(window).resize();
  }

  $('.item').on('click', function() {
    $('#popup').fadeIn(450);
    runModal();
  })

});