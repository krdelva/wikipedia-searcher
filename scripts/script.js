var searchBox = '<input id="src-box" class="replace" type="text" name="search" placeholder="Search..">';
var btnSearch = $(".replace").clone();

function change() {
  $("#btn-search").html(searchBox);
  $(function() {
    $('input').focus();
    $('body').css('background-color', 'rgb(20,56,58)');
    var searchStr = $('input[name=search]');
    $('input').on("keyup", function(keyPressed) {
      searchStr = $('input[name=search]').val();

      function titleCase(str) {
        str = str.toLowerCase().split(' '); 

        for (var i = 0; i < str.length; i++) { 
          str[i] = str[i].split(''); 
          str[i][0] = str[i][0].toUpperCase(); 
          str[i] = str[i].join(''); 
        }
        return str.join(' '); 
      }

      searchStr = titleCase(searchStr);
      
      
     
    $(".link").html('<p><a href="https://en.wikipedia.org/wiki/' + searchStr + '">'+ "Click here to view the full \"" + searchStr + "\"     article" + "</a></p>");


      $.ajax({
        dataType: 'json',
        type: 'GET',
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + searchStr,
        success: function(data, textStatus, jqXHR) {

          $('#results').addClass('selected');
          $.each(data.query.pages, function(i, item) {
            console.log(item.extract);
            $('#results').html(item.extract);
          });
         
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("Please correct the error!");
        }
      });

      $('.link').html.on('click', function() {
        window.open('https://en.wikipedia.org/wiki/' + searchStr);
      });
      $('input').on("focusout", function() {
        $(".replace").replaceWith(btnSearch.clone());
        $('body').css('background-color', 'rgb(58,157,164)');
        $('#results').html('');
        $('#results').removeClass();
      });
    });
  });
}


$("#btn-search").on("click", function() {
  change();
});