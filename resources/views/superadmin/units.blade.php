@extends('superadmin_template', ['active_page' => 'dataset'])

@section('css-includes')
	<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
	<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
	<style>
		.slimScrollBar{
			background-color: #67809f !important;
		}
	</style>
@endsection

@section('js-includes')
	<script src="<?= asset('assets/global/plugins/jquery-ui/jquery-ui.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/jquery-repeater/jquery.repeater.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/datatables/datatables.min.js') ?>" type="text/javascript"></script>
@endsection

@section('js-scripts')
            <script src="<?= asset('app/controllers/UnitsController.js') ?>"></script>
           <!-- <script src="<?= asset('assets/pages/scripts/recipeform.js') ?>" type="text/javascript"></script> -->
           <script>
			$(document).ready(function(){
					$('#pleaseWaitModal').modal('show');
			});
			//unit convertet

			//Replace Header Name
	    function updateName(ele){
	      var textBox = $(ele);
	      var link = $('#unit-name');
				// console.log("textBox: ",textBox);
	      // console.log("link: ",link);
	      var text = textBox.val();
	      // console.log("text: ",text);
	      if($.trim(text) == "")
	      text = "Name"
	      link.val(text);
	        // console.log("link: ",link);

	    }

			$("#one").keyup(function(){

				convert();
			});

			$("#three").change(function(){
				console.log("wxxxxxxxxxxxxx");
				convert();
			});

			$("#four").change(function(){
				console.log("wxxxxxxxxxxxxx");
				convert();
			});

			function convert() {


			}






			//unit converter end
	</script>
@endsection

@section('content')
	<!-- BEGIN PAGE BREADCRUMBS -->
	<div ng-controller="UnitsController"  id="DivHtml">
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
	<ul class="page-breadcrumb breadcrumb">
		<li>
			<a href="dashboard">Home</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Recipes</span>
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

								<span class="caption-subject font-blue-hoki sbold uppercase">Units</span>
							</div>
							<div class="actions">

								<a ng-click="toggle('add', 0)" href="javascript:;" class="btn btn-circle btn-default"><i class="fa fa-plus"></i> Add </a>
                            </div>
						</div>
						<div class="portlet-body">
							<table class="table table-striped table-hover table-bordered responsive" id="table-units-list">
								<thead>
									<tr>
										<th class="all"> Name </th>
										<th> Abbreviation </th>
										<th class="all"> Actions </th>
									</tr>
								</thead>
								<tbody>
								<tr ng-repeat="unit in units" id="RR-@{{ unit.id }}">
										<td>@{{unit.unit_name}}</td>
										<td><span class="label label-sm label-info">
											@{{unit.abbrivation}}</span>
										</td>
										<td>
<a href="javascript:;" class="btn btn-icon-only blue-hoki visible-xs" ng-click="toggle('edit', unit.id)">
                                                                                            <i class="fa fa-edit"></i>
                                                                                        </a>
											<a href="javascript:;"  ng-click="toggle('edit', unit.id)" class="blue-hoki hidden-xs">
                                                <i class="fa fa-edit font-blue-hoki"></i>
                                            </a>
<a href="javascript:;" class="btn btn-icon-only red-soft visible-xs" ng-click="confirmDelete(unit.id)">
                                                                                            <i class="fa fa-remove"></i>
                                                                                        </a>
											<a href="javascript:;" ng-click="confirmDelete(unit.id)" class="red-soft hidden-xs">
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

<!-- Units Modal -->
	<div class="modal fade bs-modal-lg" id="large" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title">@{{form_title}}</h4>
                    </div>
                    <div class="modal-body">
                    	<div class="row">
                    		<div class="col-md-8">
                    			<div class="form-group">
                                    <label for="Name">Name</label>

                                        <input type="text" class="form-control" onkeyup="updateName(this);" ng-model="unit.unit_name" id="Name" placeholder="Name">

                                    				                                                                </div>
                    		</div>
                    		<div class="col-md-4">
                    			<div class="form-group">
                                    <label for="Abbreviation">Abbreviation</label>

                                        <input type="text" class="form-control" ng-model="unit.abbrivation" id="Abbreviation" placeholder="Abbreviation">


                                </div>
                    		</div>
                    	</div>
                       <div class="row">
                           <div class="col-md-8">
                               <h4>Relative Units (optional)</h4>
                               <hr>
                           </div>
                       </div>
                       <div class="row">
                       		<div class="col-md-2">
                       			<input type="text" class="form-control" id="unit-value" value="1" placeholder="Qty">
                       		</div>
                       		<div class="col-md-3">
                       			<div class="form-group">
                       				<input type="text" class="form-control changename" id="unit-name" placeholder="Unit" disabled>

                                </div>
                       		</div>
                       		<div class="col-md-1" style="text-align: center;"><h4>=</h4></div>
                       		<div class="col-md-2">
                       			<input type="text" class="form-control" id="unit2-value" placeholder="Qty">
                       		</div>
                       		<div class="col-md-3">
                       			<div class="form-group">

                                    <select class="form-control" id="unit2">
																			<option ng-model="unit.unit2_name" ng-repeat="unit in units" id="opt-@{{ unit.id }}" name="@{{ unit.id }}" uid="@{{ unit.id }}" value="@{{ unit.unit_name }}">
																			@{{unit.unit_name}}
																		</option>
                                        <!-- <option disabled>Select A Unit</option>
																											n>


                                        <option value="tablespoon">tablespoon</option>
                                        <option value="teaspoon">teaspoon</option>
																												>
                                        <option value="demi">demi</option>
                                        <option value="dram">dram</option>

                                        <option value="gallon">gallon</option>
                                        <option value="jigger">jigger</option>
																												>
                                        <option value="milliliter">milliliter</option>
                                        <option value="liters">liters</option>
																									n>
                                        <option value="peck">peck</option>
                                        <option value="pinch">pinch</option>
																									ion>
                                        <option value="pony">pony</option>
                                        <option value="quart">quart</option> -->
                                    </select>
                                </div>
                       		</div>
                       		<div class="col-md-1">
                       			<button class="btn btn-default blue-hoki" ng-click="addNC_ItemToTable($event);">Add</button>
                       		</div>

                       </div>
                       <div class="row">
                       		<div class="col-md-12">
                       			<table class="table table-striped table-hover table-bordered responsive" id="table-units-list-modal">
									<thead>
										<tr>
											<th class="all"> Unit Name </th>
											<th> Relative Units  </th>
											<th class="all"> Actions </th>
										</tr>
									</thead>
									<tbody>

									</tbody>
								</table>

                       		</div>
                       	</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                        <button type="button" ng-click="save(modalstate,id)" class="btn green">Save</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
</div>
@endsection
