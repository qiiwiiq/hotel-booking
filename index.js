$( function() {
  $( "#date-check-in" ).datepicker();
  $( "#date-check-out" ).datepicker();
});

// 切換房間圖片
$(".room-image").hover(function() {
  let imgsrc = $(this).attr("src");
  $("#display-img").attr("src", imgsrc);
})

// 預定房間
$("#btn-reserve").click(() => {
  $(".dialog-reserve").css({"display": "flex"});
  $("body").css({"overflow": "hidden"});
})

// 關閉預約表單彈窗
$(".btn-close").click(() => {
  $(".dialog-reserve").css({"display": "none"});
  $("body").css({"overflow": "auto"});
})

// 送出預約表單
$("#btn-send").click(() => {
  $(".dialog-reserve").css({"display": "none"});
  $("body").css({"overflow": "auto"});
})