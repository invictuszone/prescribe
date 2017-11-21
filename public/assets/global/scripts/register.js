$(document).ready(function(){
	$("#org-details").on('click',function(){
		$("#personal-details").hide();
		$("#account-details").hide();
		$("#organization-details").show();
			$(".bg-custom-2").css("background","#67809f");
			$(".bg-custom-1").css("background","#3fc9d6");
			$(".bg-custom-3").css("background","#3fc9d6");


	});
	$("#pers-details").on('click',function(){
		$("#organization-details").hide();
		$("#account-details").hide();
		$("#personal-details").show();
			$(".bg-custom-1").css("background","#67809f");
			$(".bg-custom-2").css("background","#3fc9d6");
			$(".bg-custom-3").css("background","#3fc9d6");


	});
	$("#acct-details").on('click',function(){
		$("#personal-details").hide();
		$("#organization-details").hide();
		$("#account-details").show();
			$(".bg-custom-1").css("background","#3fc9d6");
			$(".bg-custom-2").css("background","#3fc9d6");
			$(".bg-custom-3").css("background","#67809f");

	});
	$(".pers-next").on('click',function(){
		$("#personal-details").hide();
		$("#account-details").hide();
		$("#organization-details").show();
			$(".bg-custom-2").css("background","#67809f");
			$(".bg-custom-1").css("background","#3fc9d6");
			$(".bg-custom-3").css("background","#3fc9d6");
	});
	$(".org-next").on('click',function(){
		$("#personal-details").hide();
		$("#organization-details").hide();
		$("#account-details").show();
			$(".bg-custom-1").css("background","#3fc9d6");
			$(".bg-custom-2").css("background","#3fc9d6");
			$(".bg-custom-3").css("background","#67809f");

	});
	$(".org-back").on('click',function(){
		$("#organization-details").hide();
		$("#account-details").hide();
		$("#personal-details").show();
			$(".bg-custom-1").css("background","#67809f");
			$(".bg-custom-2").css("background","#3fc9d6");
			$(".bg-custom-3").css("background","#3fc9d6");
	});
	$(".acct-back").on('click',function(){
		$("#personal-details").hide();
		$("#account-details").hide();
		$("#organization-details").show();
			$(".bg-custom-2").css("background","#67809f");
			$(".bg-custom-1").css("background","#3fc9d6");
			$(".bg-custom-3").css("background","#3fc9d6");
	});
     $(".submit-button").on('click',function(){
//                $("#account-details").delay(300).fadeOut();
//                $(".form-title").delay(300).fadeOut();
//                $(".portlet-body").delay(300).fadeOut();
//               $("#register-submit").show();
//               $('.progress .progress-bar').delay(5000).css("width",
//                 function() {
//                     return $(this).attr("aria-valuenow") + "%";
//                 }
//         )
// $(".heading-2").hide();
// $(".heading-1").show();
// setTimeout(function() {
//  $(".heading-1").hide();
// $(".heading-2").show();
//  },3000);



     });


});
