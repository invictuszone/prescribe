@extends('superadmin_template', ['active_page' => 'dataset'])

@section('css-includes')
	<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
	<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
	<link href="<?= asset('assets/global/plugins/select2/css/select2.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/select2/css/select2-bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
	<style>
		.form .form-body, .portlet-form .form-body {
			padding-bottom: 5px !important;
		}
		.form-group {
			margin-bottom: 5px;
		}
		.list-group-item {
			padding: 5px 15px;
		}
		.slimScrollBar{
			background-color: #67809f !important;
		}
	</style>
@endsection

@section('js-includes')
	  <script src="<?= asset('assets/global/plugins/jquery-ui/jquery-ui.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
	  <script src="<?= asset('assets/global/plugins/select2/js/select2.full.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/list.min.js') ?>" type="text/javascript"></script>
		<script src="<?= asset('assets/global/plugins/datatables/datatables.min.js') ?>" type="text/javascript"></script>
@endsection

@section('js-scripts')
	<script src="<?= asset('app/controllers/UserCategoriesController.js') ?>"></script>
	<script>
			$(document).ready(function(){
					$('#pleaseWaitModal').modal('show');
			});
	</script>
@endsection

@section('content')
<div ng-controller="categoriesController">
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
			<a href="dashboard">Home</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Categories and Characteristics</span>
		</li>
	</ul>
	<!-- END PAGE BREADCRUMBS -->
	<!-- BEGIN PAGE CONTENT INNER -->
	<div class="page-content-inner">
		<div class="mt-content-body">
			<div class="row">
				<div class="col-md-6">
					<!-- BEGIN EXAMPLE TABLE PORTLET-->
					<div class="portlet light portlet-fit ">
						<div class="portlet-title">
							<div class="caption">

								<span class="caption-subject font-blue-hoki sbold uppercase">Food Categories</span>
								<span class="caption-helper">Drag to reorder</span>
							</div>
							<div class="actions">
								<a ng-click="catToggle('add', 0)" class="btn btn-circle btn-default"><i class="fa fa-plus"></i> Add </a>
                            </div>
						</div>
						<div class="portlet-body">
							<table class="table table-striped table-hover table-bordered responsive" id="table-cat-list">
								<thead>
									<tr>
										<th class="all"> Seq. </th>
										<th class="all"> Name </th>
										<th class="all"> Action </th>
									</tr>
								</thead>
								<tbody>
									<tr ng-repeat="category in categories" id="CR-@{{ category.id }}" CID="@{{ category.id }}">
										<td> @{{ category.Order }} </td>
										<td> @{{ category.Name }}</td>
										<td>
<a href="javascript:;" class="btn btn-icon-only blue-hoki visible-xs"  ng-click="catToggle('edit', category.id)">
                                                                                            <i class="fa fa-edit"></i>
                                                                                        </a>
											<a href="javascript:;" ng-click="catToggle('edit', category.id)" class="blue-hoki hidden-xs">
                                                <i class="fa fa-edit font-blue-hoki edit-delete-icons"></i>
                                            </a>
<a href="javascript:;" class="btn btn-icon-only red-soft visible-xs" ng-click="confirmDelete(category.id)">
                                                                                            <i class="fa fa-remove"></i>
                                                                                        </a>
											<a href="javascript:;" ng-click="confirmDelete(category.id)" class="red-soft hidden-xs">
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
				<div class="col-md-6">
					<!-- BEGIN EXAMPLE TABLE PORTLET-->
					<div class="portlet light portlet-fit ">
						<div class="portlet-title">
							<div class="caption">

								<span class="caption-subject font-blue-hoki sbold uppercase">Food Characteristics</span>
							</div>
							<div class="actions">
								<a ng-click="charToggle('add', 0)" class="btn btn-circle btn-default"><i class="fa fa-plus"></i> Add </a>
                            </div>
						</div>
						<div class="portlet-body">
							<table class="table table-striped table-hover table-bordered responsive" id="table-char-list">
								<thead>
									<tr>
										<!-- <th> Seq. </th> -->
										<th> Name </th>
										<th> Action </th>
									</tr>
								</thead>
								<tbody>
									<tr ng-repeat="characteristic in characteristics" id="CHR-@{{ characteristic.id }}">
										<!-- <td> @{{ $index + 1 }} </td> -->
										<td> @{{ characteristic.Name }}</td>
										<td>
<a href="javascript:;" class="btn btn-icon-only blue-hoki visible-xs"  ng-click="charToggle('edit', characteristic.id)">
                                                                                            <i class="fa fa-edit"></i>
                                                                                        </a>
											<a href="javascript:;" ng-click="charToggle('edit', characteristic.id)" class="blue-hoki hidden-xs">
                                                <i class="fa fa-edit font-blue-hoki"></i>
                                            </a>
<a href="javascript:;" class="btn btn-icon-only red-soft visible-xs"  ng-click="Deletecharacteristic(characteristic.id)">
                                                                                            <i class="fa fa-remove"></i>
                                                                                        </a>
											<a href="javascript:;" ng-click="Deletecharacteristic(characteristic.id)" class="red-soft hidden-xs">
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

	<!-- END PAGE CONTENT INNER -->
	<div id="CategoryModal" class="modal fade" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">@{{form_title}}</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12">
							<div class="form-group">
								<form class="form-horizontal" role="form" name="frmcategory" novalidate="" >
											<label class="control-label">Name</label>
											<input type="text" class="form-control" name="Name" placeholder="Enter Category Name" value="@{{ Name }}"
											ng-model="category.Name" ng-required="true">
											<span class="help-inline"
											ng-show="frmcategory.Name.$invalid && frmcategory.Name.$touched">Field is required</span>
								</form>
							</div>
   <!--  <span class="notice col-xs-12" style="margin-bottom:5px;color:#868686">When a food item is selected previous category will replaced by new a category.</span>-->
						</div>



						<div class="col-xs-8">
							<div id="food-items-cat">

								<div class="form-group">
									<label class="control-label">Food Items</label>
									<select  class="form-control select2-cat-panel" id="cat-select2"  multiple  style="width: 100%">
										<option></option>
										<option ng-repeat="fooditem in fooditems" id="cat-@{{ fooditem.id }}" name="@{{ fooditem.id }}" value="@{{ fooditem.id }}" fcat="@{{ Category.Name }}">
											<span class="name">@{{ fooditem.Name }}</span>
											<span class="name label label-sm label-info pull-right" ng-repeat="Category in fooditem.Categories"> @{{ Category.Name }} </span>
										</option>
									</select>
								</div>
							</div>
						</div>
                                              <div class="col-xs-2"><button class="btn btn-sm green-haze clear-all" style="margin-top:25px;">Clear All</button></div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
					<button type="button" class="btn blue-hoki" id="btn-save" ng-click="frmcategory.$valid && saveCategory(modalstate, id)" ng-disabled="frmcategory.$invalid">Save</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Characteristics Modal -->
	<div id="CharModal" class="modal fade" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">@{{form_title}}</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12">
							<div class="form-group">
								<form class="form-horizontal" role="form" name="frmChar" novalidate="" >
											<label class="control-label">Name</label>
											<input type="text" class="form-control" name="Name" placeholder="Enter Characteristic Name" value="@{{ Name }}"
											ng-model="characteristic.Name" ng-required="true">
											<span class="help-inline"
											ng-show="frmChar.Name.$invalid && frmChar.Name.$touched">Field is required</span>
								</form>
							</div>
						</div>
						<div class="col-xs-8">
							<div id="food-items-char">

								<div class="form-group">
                                                                          <label class="control-label">Food Items</label>
									<select  class="form-control select2-char-panel"
 id="char-select2"multiple  style="width: 100%">
										<option></option>
										<option ng-repeat="fooditem in fooditems" id="char-@{{ fooditem.id }}" name="@{{ fooditem.id }}" value="@{{ fooditem.id }}">
										<span class="name">@{{ fooditem.Name }}</span>
										</option>
									</select>
								</div>
							</div>
						</div>
                                            <div class="col-xs-2"><button class="btn btn-sm green-haze clear-all" style="margin-top:25px;">Clear All</button></div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
					<button type="button" class="btn blue-hoki" id="char-btn-save" ng-click="frmChar.$valid && savecharacteristic(modalstate, id)" ng-disabled="frmChar.$invalid">Save</button>
				</div>
			</div>
		</div>
	</div>
</div>
</div>

@if(Auth::check())
	<script>
			var STAFFID = "{{ Auth::user()->id }}";
			var CID     = "{{ Auth::user()->CID }}";
	</script>
@endif
@endsection
