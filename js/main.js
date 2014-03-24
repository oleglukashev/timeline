//$("div.query-form div.input-text input").placeholder();

$(document).ready(function() {
  setInterval(function() {
    var colors = [
      '#000',
      '#cdde54',
      '#10b596',
      '#516fb6',
      '#f5966a',
      '#9154a2',
      '#de3c41'
    ];

    $("div.logo div.title-container div.title").css('color', colors[Math.floor((Math.random()*6)+1)])
  }, 5000);


  $("div.navigation-container div").on("click", function() {
    var class_object = $(this).attr("class").slice(10);

    $('html, body').animate({
          scrollTop: $("div." + class_object).offset().top
    }, 500);
  });


  $("div.query-form form").on("submit", function() {

    $("div.query-form div.error-name").hide();

    if ($.trim($("div.input-text input")[0].value) === "") {
      $("div.query-form div.error-name").show();
      return false;
    }

    if ($.trim($("div.input-text input")[1].value) === "") {
      $("div.query-form div.error-phone").show();
      return false;
    }

    $.ajax({
      url: "/info.php",
      dataType: "json",
      data: {
        name: $.trim($("div.query-form div.input-text input")[0].value),
        phone: $.trim($("div.query-form div.input-text input")[1].value)
      },
      type: "post",
      success: function(data) {
        if (data === "ok") {
          $("div.query-form div.success").show();
        }
      }
    })
    return false;
  });
});