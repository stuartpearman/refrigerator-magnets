function tilify (selector) {
  var tiletext = $(selector).html().trim().replace("<br>","  ").replace(/ +(?= )/g,"  ").replace(/,/g, "").replace(/\./g,"").replace(/\;/g,"");
  var tilesetBody = "";
  tileset = tiletext.split("  ");

  for (a in tileset) {
    tileset[a] = tileset[a].split(" ");
    for (b in tileset[a]) {
      if (tileset[a][b] != "") {
        tileset[a][b] = "<span class='tile'>" + tileset[a][b] + "</span> ";
        tilesetBody += tileset[a][b];
      }
    };
    tilesetBody += "<br>";
  };

  $(".tile-set").html(tilesetBody);
}

function magnetize (selector) {
  var randomColor;
  colors = ["#f00","#fe0","#f90","#0f4","#08f","#b0f"];
  headingWords = $(selector).html().split(" ");
  headingLetters = "";
  for (a in headingWords) {
    headingLetters += "<span class='magnet-word'>";
    for (b in headingWords[a]) {
      headingLetters += "<span class='magnet-letter'>" + headingWords[a][b] + "</span>";
    }
    headingLetters += "</span>";
  }
  $('.magnet-heading').html(headingLetters);
  $('.magnet-letter').each(function(){
    randomColor = colors[Math.floor(Math.random()*6)];
    $(this).css('color', randomColor);
  })
}

function poemSelect (poem, slug) {
  var poemtitle = "." + poem + " h1";
  var poembody = "." + poem + " p";
  tilify(poembody);
  magnetize(poemtitle);
  $(".tile").draggable();
  $(".magnet-letter").draggable();
  $('.full-poem').html("<a href='" + slug + "' class='btn'>Read Full Poem</a>");
}

$(function(){
  $(".tile").draggable();
  $(".magnet-letter").draggable();

  $('.nav-item').on('click', function(){
    $('.slideout').toggleClass('active');
  });
  $('.container').on('click', function(){
    if ($('.slideout').hasClass('active')) {
      $('.slideout').removeClass('active');
    }
  });
});

tilify(".tile-set");
magnetize(".magnet-heading");
