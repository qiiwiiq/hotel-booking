const day = 86400000;
let checkInDay = '';
let checkOutDay = '';
let priceWeekday = 1180;
let priceWeekend = 1300;

$( function() {
  $("#date-check-in").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    onSelect: function(dateText) {
      const minDate = dayjs(dateText).add(1, 'day').format('YYYY-MM-DD');
      $("#date-check-out").datepicker("option", "minDate", minDate);
      checkInDay = dateText;
      checkReserve();
    }
  });

  $("#date-check-out").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    onSelect: function(dateText) {
      const maxDate = dayjs(dateText).subtract(1, 'day').format('YYYY-MM-DD');
      $("#date-check-in").datepicker("option", "maxDate", maxDate);
      checkOutDay = dateText;
      checkReserve()
    }
  });
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
  clearForm();
})

// 送出預約表單
$("#btn-send").click(() => {
  $("#reserveDayFrom").text(checkInDay);
  $("#reserveDayTo").text(checkOutDay);
  $(".dialog-reserve").css({"display": "none"});
  $(".dialog-success").css({"display": "flex"});
})

// 返回鍵
$("#btn-back").click(() => {
  $(".dialog-success").css({"display": "none"});
  $("body").css({"overflow": "auto"});
  clearForm();
})


// 選完 check in & check out 日期 - 計算天數及帳單
function checkReserve() {
  if (checkInDay && checkOutDay) {
    countDay();
    charge();
    $(".bill").css("opacity", 1);
  }
}

// 計算天數
function countDay() {
  let dayOfStay = 0;
  dayOfStay = (dayjs(checkOutDay) - dayjs(checkInDay)) / day;
  $("#stayOfDay").text(dayOfStay);
}

// 計算帳單金額
function charge() {
  let charge = 0;
  let date = checkInDay;
  while (date !== checkOutDay) {
    let day = dayjs(date).day();
    if (day == 5 || day == 6 || day == 0) charge += priceWeekend;
    else charge += priceWeekday;
    date = dayjs(date).add(1, 'day').format('YYYY-MM-DD');
  }
  $("#totalCharge").text(charge);
}

// 清空表格
function clearForm() {
  checkInDay = '';
  checkOutDay = '';
  $("#date-check-in, #date-check-out").datepicker("setDate", null);
  $("#date-check-in, #date-check-out").datepicker("option", "minDate", 0);
  $("#date-check-in, #date-check-out").datepicker("option", "maxDate", null);
  $("#stayOfDay").text(0);
  $("#totalCharge").text(0);
  $(".bill").css("opacity", 0);
}