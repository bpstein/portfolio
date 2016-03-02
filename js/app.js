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
  var HTMLitemAnchor = '<a class="overlay" href="#" target="_blank"</a>';
  var HTMLitemDescription = '<div class="description"></div>';
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
      $(".item:last")
        .append(formattedItemImage) // Append image to item
        .append(formattedItemDescription) // Append description to overlay
        .append(formattedItemAnchor); // Append overlay to image
      $(".overlay").append(formattedItemDescription); // Append description overlay
      $(".title").append(formattedItemTitle); // Append title to description
      $(".overlay").append(formattedItemOverview); // Append overview to description
    }
  }

  // UNCOMMENT THE BELOW FUNCTION CALL TO RUN JSON OBJECTS
  projects.display(); 

  // ITEM JQUERY EFFECTS ON HOVER
  $('.item').zoom({
    duration: 400,
    magnify: 0.6,
    onZoomIn: function () {
      $(this).parent().find('.itemHover').fadeIn(500);
    },
    onZoomOut: function () {
      $(this).parent().find('.itemHover').fadeOut(400);
    }
  });   

  // NAVBAR FILTER 
  $('nav a').on('click', function() {

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
  $('.item').on('click', function popup() {
    for (project in projects.projects) {
      var HTMLitemDetails = '<p class="popup-detail">%data%</p>';
      var formattedItemDetails = HTMLitemDetails.replace("%data%", projects.projects[project].details);
      $(".modal-body").append(formattedItemDetails);
      $('#popup').fadeIn(450);
    }
  });

  var appendModal =  ("<div class='modal-overlay js-modal-close'></div>");

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

});