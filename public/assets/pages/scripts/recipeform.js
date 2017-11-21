var FormRepeater=function(){
  return{
    init:function(){
      $(".mt-repeater").each(function(){
        $(this).repeater({
          show:function(){$(this).slideDown(),
          $(".date-picker").datepicker({
            rtl:App.isRTL(),
            orientation:"left",
            autoclose:!0
          });

          // $("#repeaterContainer").find('.ingSelect2').next('.select2-container').remove();
          // $("#repeaterContainer").find('.ingSelect2').select2({
					// 	placeholder: "Select Ingredient",
					// 	// dropdownParent: $("#catagorized")
					// });
          $('.select2-container').remove();
          $('.ingSelect2').select2({
						placeholder: "Select Ingredient",
            // width: 'element',
						// dropdownParent: $("#catagorized")
					});
          // $("#repeaterContainer").find('.unitSelect2').next('.select2-container').remove();
          // $("#repeaterContainer").find('.unitSelect2').select2({
					// 	placeholder: "Select a Unit",
					// 	// dropdownParent: $("#catagorized")
					// });
          $('.unitSelect2').select2({
						placeholder: "Select a Unit",
            // width: 'element',
						// dropdownParent: $("#catagorized")
					});
          // $('.select2-container').css('width','100%');
        },
        hide:function(e){
          confirm("Are you sure you want to delete this element?")
          &&
          $(this).slideUp(e)},
          ready:function(e){

          }
        })
      })
    }
  }
}();
