@extends('admin_template', ['active_page' => 'roles'])

@section('css-includes')
<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
@endsection

@section('js-includes')
	<script src="<?= asset('assets/global/plugins/jquery-ui/jquery-ui.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
@endsection

@section('js-scripts')
  <script src="<?= asset('app/controllers/RolesController.js') ?>"></script>
@endsection

@section('content')
<div ng-controller="rolesController">
	<!-- BEGIN PAGE BREADCRUMBS -->
	<ul class="page-breadcrumb breadcrumb">
		<li>
			<a href="{{ url('admin/dashboard') }}">Home</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Staff Privileges</span>
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
								
								<span class="caption-subject font-blue-hoki sbold uppercase">Manage Privileges</span>
							</div>
							<div class="actions">
								<a class="btn btn-circle btn-default" ng-click="toggle('add', 0)"><i class="fa fa-plus"></i> Add </a>
                              <!--  <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title=""> </a>-->
                            </div>
						</div>
						<div class="portlet-body">
							<table class="table table-striped table-hover table-bordered">
								<thead>
									<tr>
										<th> Role </th>
										<th> Food Management </th>
										<th> Food Panel </th>
										<th> Diet Prescription </th>
										<th> Actions </th>
									</tr>
								</thead>
								<tbody>
									<tr ng-repeat="role in roles">
										<td> @{{ role.Name }} </td>
										<td>
											<ul ng-repeat="FM in role.FoodManagement track by $index">
												<li ng-if="$index == 0 && FM == 1"> View </li>
												<li ng-if="$index == 1 && FM == 1"> Add </li>
												<li ng-if="$index == 2 && FM == 1"> Edit </li>
												<li ng-if="$index == 3 && FM == 1"> Remove </li>
											</ul>
										</td>
										<td>
											<ul ng-repeat="FP in role.FoodPanel track by $index">
                        <li ng-if="$index == 0 && FP == 1"> View </li>
												<li ng-if="$index == 1 && FP == 1"> Add </li>
												<li ng-if="$index == 2 && FP == 1"> Edit </li>
												<li ng-if="$index == 3 && FP == 1"> Remove </li>
											</ul>
										</td>
										<td>
                      <ul ng-repeat="DP in role.DietPrescription track by $index">
                        <li ng-if="$index == 0 && DP == 1"> View </li>
												<li ng-if="$index == 1 && DP == 1"> Add </li>
												<li ng-if="$index == 2 && DP == 1"> Edit </li>
												<li ng-if="$index == 3 && DP == 1"> Remove </li>
											</ul>
										</td>
										<td>
											<a href="javascript:;" class="blue-hoki" ng-click="toggle('edit', role.id)">
                          <i class="fa fa-edit font-blue-hoki"></i>
                      </a>
											<a href="javascript:;" class="red-soft" ng-click="confirmDelete(role.id)">
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
		<div id="RoleModal" class="modal fade" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">@{{form_title}}</h4>
				</div>
				<div class="modal-body form">
					<div class="col-md-12">

						<form class="form-horizontal" role="form" name="frmRole" novalidate="">
							<div class="form-body">

                <div class="form-group">
                  <label class="col-md-offset-1 col-md-2 control-label">Role</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" name="Name" placeholder="Enter a Role Name.." value="@{{Name}}"
                    ng-model="role.Name" ng-required="true">
                    <span class="help-inline"
                    ng-show="frmRole.Name.$invalid && frmRole.Name.$touched">Field is required</span>
                  </div>
                </div>

							</div>
						</form>

					</div>
					<div class="col-md-12">
						<table class="table table-condensed table-striped">
							<thead>
								<tr>
									<th> Modules </th>
									<th> Permission </th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<dl>
											<dt>Food Managment</dt>
											<dd>
												<ul>
													<li> Food Catagories </li>
													<li> Food Characteristics </li>
													<li> Ingredients </li>
													<li> Recipies </li>
												</ul>
											</dd>
										</dl>
									</td>
									<td>
										<div class="mt-checkbox-inline">
											<label class="mt-checkbox">
                        <input type="checkbox" ng-model="role.FMR" ng-true-value="'1'" ng-false-value="'0'"> Read
												<span></span>
											</label>
											<label class="mt-checkbox">
												<input type="checkbox" ng-model="role.FMA" ng-true-value="'1'" ng-false-value="'0'"> Add
												<span></span>
											</label>
											<label class="mt-checkbox">
												<input type="checkbox" ng-model="role.FME" ng-true-value="'1'" ng-false-value="'0'"> Edit
												<span></span>
											</label>
											<label class="mt-checkbox">
												<input type="checkbox" ng-model="role.FMD" ng-true-value="'1'" ng-false-value="'0'"> Delete
												<span></span>
											</label>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<dl>
											<dt>Food Panels</dt>
										</dl>
									</td>
									<td>
                    <div class="mt-checkbox-inline">
											<label class="mt-checkbox">
                        <input type="checkbox" ng-model="role.FPR" ng-true-value="'1'" ng-false-value="'0'"> Read
												<span></span>
											</label>
											<label class="mt-checkbox">
												<input type="checkbox" ng-model="role.FPA" ng-true-value="'1'" ng-false-value="'0'"> Add
												<span></span>
											</label>
											<label class="mt-checkbox">
												<input type="checkbox" ng-model="role.FPE" ng-true-value="'1'" ng-false-value="'0'"> Edit
												<span></span>
											</label>
											<label class="mt-checkbox">
												<input type="checkbox" ng-model="role.FPD" ng-true-value="'1'" ng-false-value="'0'"> Delete
												<span></span>
											</label>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<dl>
											<dt>Diet Prescription</dt>
										</dl>
									</td>
									<td>
                    <div class="mt-checkbox-inline">
											<label class="mt-checkbox">
                        <input type="checkbox" ng-model="role.DPR" ng-true-value="'1'" ng-false-value="'0'"> Read
												<span></span>
											</label>
											<label class="mt-checkbox">
												<input type="checkbox" ng-model="role.DPA" ng-true-value="'1'" ng-false-value="'0'"> Add
												<span></span>
											</label>
											<label class="mt-checkbox">
												<input type="checkbox" ng-model="role.DPE" ng-true-value="'1'" ng-false-value="'0'"> Edit
												<span></span>
											</label>
											<label class="mt-checkbox">
												<input type="checkbox" ng-model="role.DPD" ng-true-value="'1'" ng-false-value="'0'"> Delete
												<span></span>
											</label>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
					<button type="button" class="btn blue-hoki" id="btn-save" ng-click="save(modalstate, id)" ng-disabled="frmRole.$invalid">Save</button>
				</div>
			</div>
		</div>
  </div>
</div>
@if(Auth::check())
    <script>
        var cid = "{{ Auth::user()->cid }}";
    </script>
@endif
@endsection
