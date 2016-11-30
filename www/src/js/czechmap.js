  $(function(){
     var czechMapOverlap = $('#czechMap-overlap');
     var czechMap = $('#czechMap');

    // map hover 
    $(".czechMap-area").hover(function(){
        czechMapOverlap.attr('src', $(this).attr('data-img') );
        czechMapOverlap.hide(0).stop(false, true);
        czechMapOverlap.fadeIn(500);
    },function(){
         var krajAktual = document.getElementById('frm-inquiryForm-inquiryForm-map').value;
         if (krajAktual.length > 0) {
           $("#czechMap-overlap").attr("src", "dest/img/mapacr/" + krajAktual + ".png");
         } else {
           $("#czechMap-overlap").attr("src", "dest/img/mapacr/none.png");
         }
    });

    $(".czechMap-area").click(function(){
       var tempScrollTop = $(window).scrollTop();
       var result = $(this).attr('data-img');
       result = result.replace('/dest/img/mapacr/', '');
       result = result.replace('.png', '');
       document.getElementById('frm-inquiryForm-inquiryForm-map').value = result;
       $(window).scrollTop(tempScrollTop);
       return false;
    });
    //Nastavi kraj v selectboxu dle mapy    
    function kraj(kraj) { alert();
      document.getElementById('frm-inquiryForm-inquiryForm-map').value = kraj;
    }

    $("#frm-inquiryForm-inquiryForm-map").change(function(){
       if (this.value.length > 0) {
           czechMapOverLap = document.getElementById('czechMap-overlap');
           czechMapOverLap.src = "dest/img/mapacr/" + this.value + ".png";
         } else {
           $("#czechMap-overlap").attr("src", "dest/img/mapacr/none.png");
         }
    });

    function aktualniKraj() {
      krajAktual = document.getElementById('frm-inquiryForm-inquiryForm-map').value;
      if (krajAktual.length > 0) {
        $("#czechMap-overlap").attr("src", "dest/img/mapacr/" + kraj + ".png");
      } else {
        $("#czechMap-overlap").attr("src", "dest/img/mapacr/none.png");
      }
    }
});