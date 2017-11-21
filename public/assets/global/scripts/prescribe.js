$(document).ready(function(){
	// $(".select2-results__options").on('click',function(){
	// 	$("#patientbtn-Div").show();
	// });
  $("#patientbtn").on('click', function(){
      $(".first").addClass('active');
});

         $("#add-another-btn").on('click', function(){
                  // $("#step0-2").addClass('active');
                  // $("#step4").removeClass('active');
                  // $(".mt-step-col").removeClass('last active');
                   location.reload();
                   
});
          
	$("#edit-name").on('click', function(){
		$("#edit-patient-panel").toggleClass("active-edit-panel");
                $("#tick-for-name").show();
                $("#patient-label-section").hide();
                $("#edit-name").hide();
              //  $('#edit-patient-panel').css('display','inline-flex');
	});
         $("#tick-for-name").on('click', function(){
                 $("#edit-patient-panel").toggleClass("active-edit-panel");
                    $("#tick-for-name").hide();
                  $("#patient-label-section").show();
                    $("#edit-name").show();
});
$("#edit-email").on('click', function(){
          $("#patient-email-label").hide();
          $("#edit-email").hide();
           $("#patientEmail1").show();
            $("#tick-for-email").show();

});
$("#edit-dob").on('click', function(){
          $("#patient-dob-label").hide();
          $("#edit-dob").hide();
           $("#patientDOB1").show();
            $("#tick-for-dob").show();

});
$("#edit-gender").on('click', function(){
          $("#label-gender").hide();
          $("#edit-gender").hide();
           $("#edit-gender-panel").show();
            $("#tick-for-gender").show();

});
$("#tick-for-gender").on('click', function(){
                 $("#tick-for-gender").hide();
                    $("#edit-gender-panel").hide();
                  $("#edit-gender").show();
                    $("#label-gender").show();
});
$("#tick-for-email").on('click', function(){
                 $("#patientEmail1").hide();
                    $("#tick-for-email").hide();
                  $("#edit-email").show();
                    $("#patient-email-label").show();
});
$("#tick-for-dob").on('click', function(){
                 $("#patientDOB1").hide();
                    $("#tick-for-dob").hide();
                  $("#edit-dob").show();
                    $("#patient-dob-label").show();
});
           $(".apply-settings-radio").on('click', function(){
             $("#food-listform").hide();
});
           $("#custom-setting-radio").on('click', function(){
             $("#food-listform").show();
});
       $("#edit-email").on('click', function(){
                 $('#patientEmail1').prop('disabled',false);
       });
      $("#edit-dob").on('click', function(){
                $('#patientDOB1').prop('disabled',false);
       });
       $("#existing-patient-btn").on('click', function(){
                   $("#existing-patient-btn").hide();                 
                   $("#existing-patient-dropdown").fadeIn();
       });
      
       $('#checkbox9').click(function(){
                 //  $('#patient').attr('disabled',!this.checked);
                   $('.form1').attr('disabled',this.checked);
                   $("#imageDiv").children().attr("disabled","disabled");
                   $('#existing-patient-dropdown').toggle();
    });
 

     
});
