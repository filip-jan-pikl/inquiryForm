$(function () {
    $.nette.init();
});

$("#specifikace").click(function(){
    $("#formBlock").hide();
    $("#specBlock").fadeIn("slow");
    $("#poptavka").removeClass("activeBtnGrp");
    $("#specifikace").addClass("activeBtnGrp");
});
$("#poptavka").click(function(){
    $("#specBlock").hide();
    $("#formBlock").fadeIn("slow");
    $("#specifikace").removeClass("activeBtnGrp");
    $("#poptavka").addClass("activeBtnGrp");
});

//Odsazeni navbar
$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll > 70) {
        document.getElementById('navigace').style.marginTop = "0px";
    } else {
        document.getElementById('navigace').style.marginTop = (70 - scroll) + "px";
    }
});

//Automaticke skryvani alertu
window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove();
    });
  }, 3000);

//Smaže defaultni text v textarea
function clearContents(element) {
  element.value = '';
}