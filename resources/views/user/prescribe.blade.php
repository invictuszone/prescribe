@extends('user_template', ['active_page' => 'prescribe'])

@section('css-includes')
	<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
	<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css') ?>"  rel="stylesheet" type="text/css" />


	<link href="<?= asset('assets/global/plugins/select2/css/select2.min.css') ?>" rel="stylesheet" type="text/css" />
	<link href="<?= asset('assets/global/plugins/select2/css/select2-bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
	<link href="<?= asset('assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css') ?>" rel="stylesheet" type="text/css" />
	<link href="<?= asset('assets/global/plugins/switch-css.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/pages/css/profile.min.css') ?>" rel="stylesheet" type="text/css" />

    <link href="<?= asset('assets/global/plugins/nouislider/nouislider.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/nouislider/nouislider.pips.css') ?>" rel="stylesheet" type="text/css" />
	<link href="<?= asset('assets/global/plugins/dietplanner/dietplanner.css') ?>" rel="stylesheet" type="text/css" />
 <link  href="<?= asset('assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css') ?>" rel="stylesheet" type="text/css" />
	<style>
		.mt-element-step .step-line .mt-step-col {
			padding-top: 0px !important;
		}
		.noUi-horizontal .noUi-handle {
			width: 14px;
			height: 28px;
			left: 0px;
			top: -6px;
		}
		.noUi-handle .noUi-tooltip {
			top: -30px !important;
			padding: 2px !important;
			left: 0px !important;
			min-width: 0px !important;
		}

		.noUi-target {
			/*background: linear-gradient(to right, #ffffff 4.16%,#c00000 37.5%, #ff0000 70.83%, #ed7d31 79.16%, #ffc000 87.5%, #ffe100 95.83%, #ffffff 100%);*/
			background :linear-gradient(to right,
    #ffffff       0%,     #ffffff 4.16%,
    #c00000 4.16%, #c00000 37.5%,
    #ff0000      37.5%, #ff0000      70.83%,
    #ed7d31      70.83%, #ed7d31     79.16%,
    #ffc000 79.16%, #ffc000  87.5%,
    #ffe100         87.5%, #ffe100         95.83%,
    #ffffff       95.83%);
			filter: alpha(opacity=60);
		}
		/*FF7F7F*/
		.c-1-color { background: transparent; border-color: #c50000; border-style: solid;  border-width: 3px;}
		.c-2-color { background: transparent;}
		.c-3-color { background: transparent; border-color: #109ee7; border-style: solid;border-width: 3px;}
		.c-4-color { background: transparent; border-color: #12d712; border-style: dashed;border-width: 3px;}
		.c-5-color { background: transparent; border-color: #12d712; border-style: solid;border-width: 3px; }
		.range-col { margin-bottom: 5px; }
		.range-col > .range-text { width: 100%; min-height: 30px; padding: 5px; font-size: 9px; font-weight: 700  }
	</style>
@endsection

@section('js-includes')

	 <script src="<?= asset('assets/global/plugins/jquery-ui/jquery-ui.min.js') ?>" type="text/javascript"></script>
   <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
   <script src="<?= asset('assets/global/plugins/list.min.js') ?>" type="text/javascript"></script>
	 <script src="<?= asset('assets/global/plugins/jquery.columnizer.js') ?>" type="text/javascript"></script>
	 <script src="<?= asset('assets/global/plugins/select2/js/select2.full.min.js') ?>" type="text/javascript"></script>
	 <script src="<?= asset('assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/scripts/app.min.js') ?>" type="text/javascript"></script>


        <script src="<?= asset('assets/pages/scripts/ui-modals.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/pages/scripts/components-bootstrap-select.min.js') ?>" type="text/javascript"></script>


    <script src="<?= asset('assets/global/plugins/nouislider/nouislider.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/nouislider/wNumb.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/datatables/datatables.min.js') ?>" type="text/javascript"></script>
<script src="<?= asset('assets/global/plugins/bootstrap-tabdrop/js/bootstrap-tabdrop.js') ?>" type="text/javascript"></script>
    <!-- <script src="<?= asset('assets/global/scripts/jspdf.js') ?>" type="text/javascript"></script> -->
		<script src="<?= asset('assets/global/scripts/jspdf.min.js') ?>" type="text/javascript"></script>
		<script src="<?= asset('assets/global/scripts/jspdf.plugin.autotable.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/images/logoBase64.js') ?>" type="text/javascript"></script>

<script src="<?= asset('assets/global/plugins/shorten-plugin.js') ?>" type="text/javascript"></script>

<script src="<?= asset('assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js') ?>"  type="text/javascript"></script>
 <script src="<?= asset('assets/pages/scripts/components-bootstrap-select.min.js') ?>" type="text/javascript"></script>
	<!-- <script type="text/javascript" src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"</script> -->

@endsection

@section('js-scripts')
	<script></script>
	<script>
		var reactionValue = ['End',"IgE7","IgE6","IgE5","IgE4","IgE3","IgE2","IgE1","IgE0/1","IgG7","IgA7","IgG6","IgA6","IgG5","IgA5","IgG4","IgA4","IgG3","IgA3","IgG2","IgA2","IgG1","IgA1",'Start'];

		var levelSlider = document.getElementById('slider-level');
		noUiSlider.create(levelSlider, {
			start: [ 0, 23, 23, 23 ],
			connect: [true, true, true, true, true],
			step: 1,
			format: wNumb({
				decimals: 0
			}),
			range: {
				min: 0,
				max: 23
			},
            tooltips: true,
            format: {
                to: function (value) {
					reactionlevel='';
					value = Math.round(value);
					reaction = reactionValue[value];
                    return reaction;
                },
                from: function (value) {
                    return value.replace('', '');
                }
            }
		});

		var connect = levelSlider.querySelectorAll('.noUi-connect');
		var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];

		for ( var i = 0; i < connect.length; i++ ) {
			connect[i].classList.add(classes[i]);
		}

        $('#sliderSettings').on('click', '.food-item', function(e) {
   		toggle($(e.target));
	});
	 function toggle(ele)
   	{
   		if(ele.attr('class')=='name')
   			ele = $(ele.closest('.food-item'));

   		if(ele.attr('selected')!='selected')
   		{
   			selectItem(ele);
   		}else
   		{
   			unselectItem(ele);
   		}
   	}


   	function selectItem(ele)
   	{  var count=1;
   		ele.attr('selected',true);
   		ele.css("background-color", "#67809f");
   		ele.css("color", "#ffffff");

		counter = $(ele).closest('.panel').find('.Countr');
		counter.html(parseInt(counter.html())+1);
   	}
   	function unselectItem(ele)
   	{
   		ele.attr('selected',false);
   		ele.css("background-color", "#ffffff");
   		ele.css("color", "#000000");
		counter = $(ele).closest('.panel').find('.Countr');
		counter.html(parseInt(counter.html())-1);
   	}
   	var options = {valueNames: ['name']};
	var userList = new List('food-items', options);

	</script>
        <script>
	$(document).ready(function(){
			$('#pleaseWaitModal').modal('show');
	});
	</script>
<script>
$(".more").shorten({
  "showChars" : 50,
  "moreText"	: "See More",
  "lessText"	: "Less",
  });

</script>
	<script src="<?= asset('assets/global/plugins/dietplanner/constants.js') ?>" type="text/javascript"></script>
	<script src="<?= asset('assets/global/plugins/dietplanner/dietplanner.js') ?>" type="text/javascript"></script>
	<script src="<?= asset('assets/global/plugins/dietplanner/dietplanner-ui.js') ?>" type="text/javascript"></script>
	<script src="<?=asset('assets/pages/scripts/components-date-time-pickers.min.js' ) ?>" type="text/javascript"></script>
	<script src="<?= asset('app/controllers/UserPrescribeController.js') ?>"></script>
        <script src="<?= asset('assets/global/scripts/prescribe.js') ?>" type="text/javascript"></script>

@endsection

@section('content')
<div id="dietprescriptionapp" ng-controller="prescribeController">


<!-- Ajax Loader -->
  <div class="modal" id="pleaseWaitModal" data-backdrop="static" data-keyboard="false" style="z-index: 99999;">
    <div class="modal-head">

    </div>
    <div class="modal-body">
        <div id="ajax_loader">
            <img src="<?= asset('assets/layouts/layout3/img/ajax-loader.png') ?>" style="display: block; margin-left: auto; margin-right: auto; margin-top:350px;" width="150px">
        </div>
    </div>
</div>
	<!-- BEGIN PAGE BREADCRUMBS -->
	<ul class="page-breadcrumb breadcrumb">
		<li>
			<a href="dashboard">Home</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Prescribe Diets</span>
		</li>
	</ul>
	<div class="page-content-inner">
		<div class="mt-content-body">
			<div class="row">
				<div class="col-md-12">
					<!-- BEGIN SAMPLE FORM PORTLET-->
					<div class="portlet box blue-hoki" id="foodfilters">
						<!-- <div class="portlet-title">
							<div class="caption">
								Prescribe Diets
							</div>
							<div class="tools">
								<a href="" class="fullscreen" style="display:none;"> </a>
							</div>
						</div> -->
						<div class="portlet-body" style="background-color:transparent">
						   <div class="row">
								<div class="col-md-12">
									<div class="row mt-element-step">
										<div class="col-md-offset-1 step-line">

											  <div class="col-md-2 col-xs-2 col-md-offset-0 col-xs-offset-1 mt-step-col first active">
												 <div class="mt-step-number bg-white" >1</div>
												 <div class="mt-step-title uppercase font-grey-cascade hidden-xs">Patient</div>
											  </div>

											<a class="tab-change" href="#" data-toggle="tab" id="navTab1">
												<div class="col-md-3 col-xs-2 mt-step-col">
												 <div class="mt-step-number bg-white">2</div>
												 <div class="mt-step-title uppercase font-grey-cascade hidden-xs">Reactions & Allergies</div>
											  </div>
											</a>

											<a class="tab-change" href="#" data-toggle="tab" id="navTab2">
											  <div class="col-md-2 col-xs-2 mt-step-col ">
												 <div class="mt-step-number bg-white">3</div>
												  <div class="mt-step-title uppercase font-grey-cascade hidden-xs">Diet Types</div>
											  </div>
											</a>

											<a class="tab-change" href="#" data-toggle="tab" id="navTab3">
											  <div class="col-md-2 col-xs-2 mt-step-col">
												 <div class="mt-step-number bg-white">4</div>
												 <div class="mt-step-title uppercase font-grey-cascade hidden-xs">Food List</div>
											  </div>
											</a>

											  <div class="col-md-2 col-xs-2 mt-step-col last" id="navTab4">
												 <div class="mt-step-number bg-white">5</div>
												 <div class="mt-step-title uppercase font-grey-cascade hidden-xs">Export Lists</div>
											  </div>

										</div>
										<div class="tab-content">
											@include('user.prescribe.step0-1')
											@include('user.prescribe.step0-2')
											@include('user.prescribe.step0-3')
											@include('user.prescribe.step1')
											@include('user.prescribe.step2')
											@include('user.prescribe.step3')
											@include('user.prescribe.step4')
										</div>
									</div>
								</div>
							</div>
							<!-- END SAMPLE FORM PORTLET-->
						</div>
					</div>
				</div>
			</div>
			<!-- END PAGE CONTENT INNER -->
		</div>
	</div>
</div>
@if(Auth::check())
    <script>
        var STAFFID = "{{ Auth::user()->id }}";
    </script>
@endif
@endsection
