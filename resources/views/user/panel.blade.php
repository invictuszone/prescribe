@extends('user_template', ['active_page' => 'panel'])
@section('css-includes')
<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/select2/css/select2.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/select2/css/select2-bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/jquery-minicolors/jquery.minicolors.css') ?>" rel="stylesheet" type="text/css" />

<style>
    .btn-del-food{
			margin-top: 0em !important;
		}
		.food-select2{
			min-width: 150px;
		}
    .NC-food-select2{
      min-width: 150px;
    }

		.select2-container .select2-selection--single {
			border-color: #c2cad8;
			border-style: solid;
			border-width: 1px;
			    height: 34px;
			line-height: 32px;
		}
		.btn.blue-hoki:not(.btn-outline) {
			margin-bottom: 5px;
		}
		table.dataTable {
			margin-top: 0px !important;
		}
		.dataTables_scroll {
			margin-bottom: 0px !important;
		}

   .list-group-item {
			padding: 5px 15px;
		}
	.name{
		margin-left:5px;
		width:300px;
	}
	.selecttype
	{
		/* width:170px; */
		height:36px!important;
	}
	.reactiontype{
		/* width:200px; */
		height:36px!important;
	}
	.type{
		/* margin-left:40px; */
	}
	.reaction{
		/* margin-left:50px; */
		margin-top:20px;
	}
  /********Change********************/
  .table1{

    margin-top:0px !important;
  }
  .table-scrollable {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
     border:0px!important;
     margin: 0px !important;
}
  /********Change********************/
</style>
@endsection
@section('js-includes')
<script src="<?= asset('assets/global/plugins/jquery-ui/jquery-ui.min.js') ?>" type="text/javascript"></script>
<script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
<script src="<?= asset('assets/global/plugins/jquery-repeater/jquery.repeater.js') ?>" type="text/javascript"></script>
<script src="<?= asset('assets/global/plugins/select2/js/select2.full.min.js') ?>" type="text/javascript"></script>
<script src="<?= asset('assets/global/plugins/list.min.js') ?>" type="text/javascript"></script>
<script src="<?= asset('assets/global/plugins/datatables/datatables.min.js') ?>" type="text/javascript"></script>
<script src="<?= asset('assets/global/plugins/jquery-minicolors/jquery.minicolors.min.js') ?>" type="text/javascript"></script>
@endsection
@section('js-scripts')
<script src="<?= asset('app/controllers/UserFoodPanelController.js') ?>"></script>
<script src="<?= asset('assets/pages/scripts/panel-repeater.min.js') ?>" type="text/javascript"></script>

<script>


    $(document).ready(function(){
        $('#pleaseWaitModal').modal('show');
    });

   	$("#Panel-Type").change( function(e) {
   		var temp= $(this).val();
      console.log("temp: ",temp);
   		if(temp=='Categorized')
   		{
  			// intializePanelModel();
        // Refresh accordion to handle new order
        // refreshAccordingPlugins();
   			$("#NC-PanelDiv").hide();
   			$(".C-PanelDiv").show();
        $("#note").show();
   		}
   		if(temp=='Non-Categorized')
   		{
   			$(".C-PanelDiv").hide();
   			$("#NC-PanelDiv").show();
        $("#note").hide();
   		}
   	});

</script>
<script>
		$.fn.modal.Constructor.prototype.enforceFocus = function() {};
      var catagoryPanel = '';
      var catDatatables = [];
			// var catagoryPanel = $("#accordion").html();
			// intializePanelModel();
		function intializePanelModel() {
      refreshAccordingPlugins();
		}

    var catgoriesCount = 1;
    $( "#accordion" ).accordion({
      header: ".panel-heading",
      collapsible: true,
      active: 0,
      autoHeight: true,
      autoActivate: true
      });

    $( "#accordion" ).sortable({
      axis: "y",
      handle: "h4",
      stop: function( event, ui ) {
        // IE doesn't register the blur when sorting
        // so trigger focusout handlers to remove .ui-state-focus
        ui.item.children( "h3" ).triggerHandler( "focusout" );

        // Refresh accordion to handle new order
        // refreshAccordingPlugins();
        $( this ).accordion( "refresh" );
      }
    });

    //Refresh Specific Color Plugin
    function refreshColorPlugin(catNum){
      // console.log("catNum: ",catNum);
      // console.log("catNum: ",$('#CategoryDiv-' + catNum));
      // console.log("catNum: ",$('#CategoryDiv-' + catNum).find('.demo'));
      $('#CategoryDiv-' + catNum).find('.demo').minicolors({
        control: $(this).attr('data-control') || 'hue',
        defaultValue: $(this).attr('data-defaultValue') || '',
        inline: $(this).attr('data-inline') === 'true',
        letterCase: $(this).attr('data-letterCase') || 'lowercase',
        opacity: $(this).attr('data-opacity'),
        position: $(this).attr('data-position') || 'bottom left',
        change: function(hex, opacity) {
          if (!hex) return;
          if (opacity) hex += ', ' + opacity;
          var header = $(this).closest('.panel').find('.panel-heading');
          if (typeof console === 'object') {
            header.css('background-color',hex);
            if(isColorBright(hex))
              header.css('color','#000');
            else
              header.css('color','#fff');
          }
        },
        theme: 'bootstrap'
      });
    }
    //Referesh All Plugins
    function refreshAccordingPlugins(){
      $('#CategoryDiv-' + catgoriesCount).find('.demo').minicolors({
        control: $(this).attr('data-control') || 'hue',
        defaultValue: $(this).attr('data-defaultValue') || '',
        inline: $(this).attr('data-inline') === 'true',
        letterCase: $(this).attr('data-letterCase') || 'lowercase',
        opacity: $(this).attr('data-opacity'),
        position: $(this).attr('data-position') || 'bottom left',
        change: function(hex, opacity) {
          if (!hex) return;
          if (opacity) hex += ', ' + opacity;
          var header = $(this).closest('.panel').find('.panel-heading');
          if (typeof console === 'object') {
            header.css('background-color',hex);
            if(isColorBright(hex))
              header.css('color','#000');
            else
              header.css('color','#fff');
          }
        },
        theme: 'bootstrap'
      });
      //Set Select2
      $('#CategoryDiv-' + catgoriesCount).find('.food-select2').select2({
        width: '100%',
        placeholder: 'Select Food',
      });

      //Set DataTableles
      catDatatables[catgoriesCount] = $('#CategoryDiv-' + catgoriesCount).find('.Catdatatables').DataTable({
                                          scrollY: 150,
                                          paging: false,
                                          searching: false,
                                          info:false,
                                          retrive:true,
                                          "order": [[ 0, "asc" ]]
                                        });
      var cdt = catDatatables[catgoriesCount];
      $(".panel-heading").on('click', function () {
        setTimeout(function(){
          // console.log("Click");
          cdt.columns.adjust().draw();
          // $($.fn.dataTable.tables(true)).DataTable().columns.adjust().responsive.recalc();
        }, 100);
      });
      // $('#CategoryDiv-1').on('shown.bs.collapse', function (e) {
      //   $($.fn.dataTable.tables(true)).DataTable().columns.adjust().responsive.recalc();
      // });
      // $('.catagoryPanel').on('shown.bs.collapse', function (e) {
      //     cdt.draw();
      //     // console.log($(e.currentTarget).find('.panel-body').find('.table')[0].id);
      //     var tableIdToUpdate = $(e.currentTarget).find('.panel-body').find('.table')[0].id;
      //     $('#' + tableIdToUpdate).DataTable().columns.adjust().responsive.recalc();
      // });

      //Set Add item Onclick Fn
      var removeBtn = $('#CategoryDiv-' + catgoriesCount).find('a')[1];
      var addBtn    = $('#CategoryDiv-' + catgoriesCount).find('a')[2];
      // console.log("tempBtn: ",$('#CategoryDiv-' + catgoriesCount).find('a'));
      $(removeBtn).attr('onclick','removeCatagory('+ catgoriesCount +');');
      $(addBtn).attr('onclick','addItemToTable(this,'+ catgoriesCount +');');

      catgoriesCount++;
    }

    $('#addCatagory').click( function() {
      addNewCatagory();
    });

    //Add new Category
    function addNewCatagory(){
      $('#accordion').prepend(catagoryPanel);
      $('#accordion').accordion( "refresh" );
      $('#accordion')[0]['children'][0].id = 'CategoryDiv-' + catgoriesCount;
      // console.log("accordion: ",$('#CategoryDiv-' + catgoriesCount));
      refreshAccordingPlugins();
    }

    //Remove Category
    function removeCatagory(categoryNum){
      $('#CategoryDiv-' + categoryNum).remove();
      // $('#accordion').prepend(catagoryPanel);
      $('#accordion').accordion( "refresh" );
    }

    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, 'g'), replace);
    }

    //Replace Header Name
    function updateCatName(ele){
      var textBox = $(ele);
      var link = textBox.closest('.catagoryPanel').find('label > a');
      // console.log("textBox: ",textBox);
      var text = textBox.val();
      // console.log("text: ",text);
      if($.trim(text) == "")
      text = "Untitled Category"
      link.html(text);
        // console.log("link: ",link);
    }
    function isColorBright(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      r = parseInt(result[1], 16);
      g = parseInt(result[2], 16);
      b = parseInt(result[3], 16);
      cmax = (r > g) ? r : g;
      if (b > cmax)
        cmax = b;
      cmin = (r < g) ? r : g;
      if (b < cmin)
        cmin = b;
      cmin = cmin / 255.0;
      cmax = cmax / 255.0;
      l = (cmin + cmax)/2;

      if(l > 0.6)
        return true;
      else
        return false;
    }

    var foodDummyCount = 1;
    function addItemToTable(ele, catNum){
      // console.log("ele: ",ele);
      var row = $(ele).closest('.row');
      var name = $(row).find('input').val();
      var associated_name = $(row).find('option:selected').html();
      var associated_fid = $(row).find('option:selected').attr('FID');

      var table = catDatatables[catNum];
      var html = '<tr id="'+ associated_fid +'" FID="'+ foodDummyCount +''+ associated_fid +'">';
      html    += '  <td>'+ name +'</td>';
      html    += '  <td>'+ associated_name +'</td>';
      html    += '  <td><a class="btn btn-xs btn-danger" onclick="removeFromTable(this,\''+ foodDummyCount +''+associated_fid+'\',\''+catNum+'\');" FID="'+associated_fid+'">Remove</a></td>';
      html    += '</tr>';

      table.row.add($(html)).draw();
      foodDummyCount++;
    }
    function removeFromTable(ele,fid,catNum) {
      var table = catDatatables[catNum];
      table.row('[FID="'+fid+'"]').remove().draw();
    }
		</script>
@endsection
@section('content')
<div ng-controller="FoodPanelController">
  <!-- Ajax Loader -->
  <div class="modal" id="pleaseWaitModal" data-backdrop="static" data-keyboard="false">
    <div class="modal-head">

    </div>
    <div class="modal-body">
        <div id="ajax_loader">
            <img src="<?= asset('assets/layouts/layout3/img/ajax-loader.gif') ?>" style="display: block; margin-left: auto; margin-right: auto; margin-top:150px;" width="90px">
        </div>
    </div>
</div>
<!-- BEGIN PAGE BREADCRUMBS -->
<ul class="page-breadcrumb breadcrumb">
   <li>
      <a href="{{ url('user/dashboard') }}" >Home</a>
      <i class="fa fa-circle"></i>
   </li>
   <li>
      <span>Food Panels</span>
   </li>
</ul>
<!-- END PAGE BREADCRUMBS -->
<!-- BEGIN PAGE CONTENT INNER -->
<div class="page-content-inner">
   <div class="mt-content-body">
      <div class="row">
         <div class="col-md-12">

            <!-- BEGIN EXAMPLE TABLE PORTLET-->
            <div class="portlet light portlet-fit ">
               <div class="portlet-title">
                  <div class="caption">

                     <span class="caption-subject font-blue-hoki sbold uppercase">Food Panels</span>
                  </div>
                  <div class="actions">
                     <a ng-click="toggle('add', 0)" class="btn btn-circle btn-default"><i class="fa fa-plus"></i> Add </a>
                  </div>
               </div>
               <div class="portlet-body">
                  <table class="table table-striped table-hover table-bordered responsive" id="table-panel-list">
                     <thead>
                        <tr>
                           <th class="all"> Name </th>
                           <th> Type </th>
                           <th> Last Modified </th>
                           <th class="all"> Actions </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr ng-repeat="foodpanel in foodpanels" id="PR-@{{ foodpanel.id }}">
                           <td> @{{ foodpanel.Name }} </td>
                           <td> @{{ foodpanel.Type }} </td>
                           <td> @{{ foodpanel.updated_at }} </td>
                           <td>
<a href="javascript:;" class="btn btn-icon-only blue-hoki visible-xs" ng-click="toggle('edit', foodpanel.id)">
                                                                                            <i class="fa fa-edit"></i>
                                                                                        </a>
       											<a href="javascript:;" ng-click="toggle('edit', foodpanel.id)" class="blue-hoki hidden-xs">
                                                       <i class="fa fa-edit font-blue-hoki"></i>
                                                   </a>
<a href="javascript:;" class="btn btn-icon-only red-soft visible-xs" ng-click="confirmDelete(foodpanel.id)">
                                                                                            <i class="fa fa-remove"></i>
                                                                                        </a>
       											<a href="javascript:;" ng-click="confirmDelete(foodpanel.id)" class="red-soft hidden-xs">
                                                       <i class="fa fa-remove font-red-soft"></i>
                                                   </a>
       										</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
            <!-- END EXAMPLE TABLE PORTLET-->
         </div>
      </div>
   </div>
</div>
<!-- END PAGE CONTENT INNER -->
<div id="FoodPanal-Modal" class="modal fade bs-modal-lg"  aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
			<div class="modal-header C-PanelDiv">
				<!--<button type="button" class="btn btn-danger pull-right">Remove Selected Catagory</button>-->
				<button type="button" class="btn blue-hoki pull-right" id="addCatagory">Add New Category</button>
				<h4 class="modal-title">@{{ form_title }}</h4>
			</div>
			<div class="modal-body form" id="mymodal" style="padding-bottom: 5px;">
				<div class="row">
					<div class="col-md-12 col-xs-12">
						<form role="form" name="frmFoodPanel" novalidate="">
							<div class="col-md-4 col-xs-12">
							<br/>
								<div class="form-group">
									<label class="control-label"><b>Name</b></label>
									<input type="text" class="form-control" name="Name" id="foodP-Name" placeholder="Enter Panel Name" value="@{{ Name }}"
       										ng-model="FoodPanel.Name" ng-required="true">
       								<span class="help-inline"
       										ng-show="frmFoodPanel.Name.$invalid && frmFoodPanel.Name.$touched">Field is required</span>
								</div>
							</div>
							<div class="col-md-4 col-xs-12">
								<br/>
								<div class="form-group type" >

									<label class=" control-label " ><b>Type</b></label>
									<select class="form-control selecttype"  id="Panel-Type" ng-model="FoodPanel.Type" ng-init="FoodPanel.Type='Non-Categorized'">
										<option id="2" value="Non-Categorized">Non-Categorized</option>
										<option id="1" value="Categorized">Categorized</option>
									</select>
								</div>
							</div>
							<div class="col-md-4 col-xs-12">
								<br/>
								<div class="form-group reaction" style="margin-top:0px;">
									<label class=" control-label "><b> Reaction</b></label>
									<select class="form-control reactiontype"  id="reation_type" ng-model="FoodPanel.ReactionType">
										<option id="1" value="IgA">IgA</option>
										<option id="2" value="IgG">IgG</option>
										<option id="1" value="IgE">IgE</option>
									</select>
								</div>
							</div>
						</form>
					</div>
					<span class="notice col-xs-10"  id="note" style="margin-left:25px;color:#868686;display:none; margin-bottom:15px;">All categories will be displayed on the basis you add them.</span>
				</div>
        <!-- Non-Categorized -->
        <div class="row" type="non-catagorized" id="NC-PanelDiv">
					<div class="col-sm-offset-1 col-sm-10">
            <div class="panel-group NC-accordion" id="NC-accordion">
							<div class="panel panel-default NC-catagoryPanel">
								<div class="panel-heading">
									<h4 class="panel-title">
										<a class="accordion-toggle "> Non-Categorized </a>
									</h4>
								</div>
								<div class="panel-body table-panel" style="min-height:390px">
									<div class="row">
										<div class="col-md-4"><input type="text" id="NC-FoodNameInput" placeholder="Display Name" class="form-control" /></div>
										<div class="col-md-6">
											<select id="single" class="form-control select2 NC-food-select2" style="min-width:120px">
												<option></option>
                        <option class="NC-Foods" ng-repeat="fooditem in fooditems" id="NCFood-@{{ fooditem.id }}" name="@{{ fooditem.id }}" FID="@{{ fooditem.id }}" value="@{{ fooditem.id }}">@{{ fooditem.Name }}</option>
											</select>
										</div>
										<div class="col-md-2"> <a ng-click="addNC_ItemToTable($event);"  class="btn btn-md blue-hoki"><i class="fa fa-plus"></i> Add Item</a> </div>
									</div>
									<br/>
									<div class="row">
										<div class="col-sm-12">
											<table class="table table-striped table-hover table-bordered datatables responsive" id="NC-sample_editable_1">
												<thead>
													<tr>
                            <th> Seq. No. </th>
														<th> Food Name </th>
														<th> Associated Food </th>
														<th> Action </th>
													</tr>
												</thead>
												<tbody>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
        <!-- Categorized -->
				<div class="row C-PanelDiv" type="catagorized" id="C-PanelDiv">
					<div class="col-sm-offset-1 col-sm-10">
            <div class="panel-group accordion" id="accordion">
							<div class="panel panel-default catagoryPanel">
                <div class="panel-heading">
                  <label class="panel-title">
                    <a class="accordion-toggle "> Untitled Category </a>
                  </label>
                  <a href="javascript:;" class="btn btn-icon-only red pull-right" style="width: 40px; height: 42px;">
                    <i class="fa fa-times" style="margin-top:8px;"></i>
                  </a>
                </div>
								<div class="panel-body table-panel" style="min-height:390px">
									<div class="row">
										<div class="form-group col-sm-8">
											<label for="catName">Category Name</label>
											<input type="text" class="form-control Cat_Name" id="catName" onkeyup="updateCatName(this);" placeholder="Untitled Category">
										</div>
										<div class="form-group col-sm-4">
											<label>Background</label>
												<input type="hidden" id="hidden-input" class="demo Cat_Color" value="#f5f5f5">
										</div>
									</div>
									<div class="row">
										<div class="col-md-4"><input type="text" placeholder="Display Name" class="form-control" /></div>
										<div class="col-md-6">
											<select id="single" class="form-control select2 food-select2" style="min-width:120px">
												<option></option>
                        <option class="NC-Foods" ng-repeat="fooditem in fooditems" id="CFood-@{{ fooditem.id }}" name="@{{ fooditem.id }}" FID="@{{ fooditem.id }}" value="@{{ fooditem.id }}">@{{ fooditem.Name }}</option>
											</select>
										</div>
										<div class="col-md-2"> <a class="btn btn-md blue-hoki"><i class="fa fa-plus"></i> Add Item</a> </div>
									</div>
									<br/>
									<div class="row">
										<div class="col-sm-12">
											<table class="table table-striped table-hover table-bordered datatables Catdatatables responsive" id="non-cat-dtable">
												<thead>
													<tr>
														<th> Food Name </th>
														<th> Associated Food </th>
														<th> Action </th>
													</tr>
												</thead>
												<tbody>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
      <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
        <button type="button" class="btn blue-hoki" id="char-btn-save" ng-click="frmFoodPanel.$valid && save(modalstate, id)" ng-disabled="frmFoodPanel.$invalid">Save</button>
      </div>
		</div>
	</div>
</div>
</div>
@endsection
