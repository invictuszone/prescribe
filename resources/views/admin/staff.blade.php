@extends('admin_template', ['active_page' => 'staff'])

@section('css-includes')
	<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
	<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
@endsection

@section('js-includes')
	<script src="<?= asset('assets/global/plugins/jquery-ui/jquery-ui.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
<script src="<?= asset('assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/jquery.input-ip-address-control-1.0.min.js') ?>" type="text/javascript"></script>
       <script src="<?= asset('assets/pages/scripts/form-input-mask.min.js') ?>" type="text/javascript"></script>
@endsection

@section('js-scripts')
	<script src="<?= asset('app/controllers/StaffController.js') ?>"></script>
@endsection

@section('content')
<div ng-controller="staffController">
	<!-- BEGIN PAGE BREADCRUMBS -->
	<ul class="page-breadcrumb breadcrumb">
		<li>
			<a href="{{ url('admin/dashboard') }}">Home</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Manage Staff</span>
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

								<span class="caption-subject font-blue-hoki sbold uppercase">Staff List</span>
							</div>
							<div class="actions">
								<a id="btn-add" class="btn btn-circle blue-hoki" ng-click="toggle('add', 0)" ><i class="fa fa-plus"></i> Add </a>
              <!--  <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title=""> </a>-->
              </div>
						</div>
						<div class="portlet-body">
							<table class="table table-striped table-hover table-bordered">
								<thead>
									<tr>
										<th> First Name </th>
										<th> Last Name </th>
										<th> Role </th>
										<th> Phone </th>
										<th> Email </th>
										<th> Actions </th>
									</tr>
								</thead>
								<tbody id="staffTable">
									<tr ng-repeat="staff in staffs">
										<td> @{{ staff.FName }} </td>
										<td> @{{ staff.LName }} </td>
										<td> @{{ staff.roleName }} </td>
										<td> @{{ staff.PhoneNo }} </td>
										<td> @{{ staff.email }} </td>
										<td>
											<a href="javascript:;" ng-click="toggle('edit', staff.id)" class="blue-hoki">
                                                <i class="fa fa-edit font-blue-hoki"></i>
                                            </a>
											<a href="javascript:;" ng-click="confirmDelete(staff.id)" class="red-soft">
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
	<div id="addStaff" class="modal fade" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" ng-click="closeModal()" aria-hidden="true"></button>
					<h4 class="modal-title">@{{form_title}}</h4>
				</div>
				<div class="modal-body form">
					<div class="scroller" style="height:300px" data-always-visible="1" data-rail-visible1="1">
						<div class="row">
							<div class="col-md-7">
								<form class="form-horizontal" role="form" name="frmStaff" novalidate="" >

									<div class="form-body">

											<div class="form-group">
												<label class="col-md-4 control-label">First Name</label>
												<div class="col-md-8">
			  									<input type="text" class="form-control" name="FName" placeholder="Enter First Name" value="@{{FName}}"
			                    ng-model="staff.FName" ng-required="true">
			                    <span class="help-inline"
			                    ng-show="frmStaff.FName.$invalid && frmStaff.FName.$touched">Field is required</span>
			  								</div>
											</div>

											<div class="form-group">
												<label class="col-md-4 control-label">Last Name</label>
												<div class="col-md-8">
			  									<input type="text" class="form-control" name="LName" placeholder="Enter Last Name" value="@{{LName}}"
			                    ng-model="staff.LName" ng-required="true">
			                    <span class="help-inline"
			                    ng-show="frmStaff.LName.$invalid && frmStaff.LName.$touched">Field is required</span>
			  								</div>
											</div>

											<div class="form-group">
												<label class="col-md-4 control-label">Role</label>
												<div class="col-md-8">
													<select class="form-control" id="rollSelect" name="Title" ng-required="true" >
														<option ng-repeat="role in roles" id="R@{{ role.id }}" value="@{{ role.id }}">@{{ role.Name }}</option>
													</select>
												</div>
											</div>

											<div class="form-group">
													<label class="col-md-4 control-label">Email</label>
													<div class="col-sm-8">
															<input type="email" class="form-control" id="Email" name="Email" placeholder="Email Address" value="@{{email}}"
															ng-model="staff.email" ng-required="true">
															<span class="help-inline"
															ng-show="frmStaff.Email.$invalid && frmStaff.Email.$touched">Valid Email field is required</span>
													</div>
											</div>

										 <div class="form-group">
												 <label class="col-md-4 control-label">Phone</label>
												 <div class="col-sm-8">
														 <input type="text"  class="form-control" id="mask_phone" name="PhoneNo" placeholder="Contact Number" value="@{{PhoneNo}}"
														 ng-model="staff.PhoneNo" ng-required="true">
												 <span class="help-inline"
														 ng-show="frmStaff.PhoneNo.$invalid && frmStaff.PhoneNo.$touched">Contact number field is required</span>
												 </div>
										 </div>

									</div>
								</form>
							</div>

							<div class="col-md-5">
								<form class="form-horizontal" role="form">
									<div class="form-body">

										<div class="form-group">
											<div class="col-md-12">
												<div class="fileinput fileinput-new" data-provides="fileinput" id="imageDiv">
													<div class="fileinput-preview thumbnail" data-trigger="fileinput" id="imageSection" style="width: 200px; height: 150px; line-height: 150px;">
													</div>
													<div style="text-align:center;">
														<span class="btn blue-hoki btn-outline btn-file">
															<span class="fileinput-new"> Select image </span>
															<span class="fileinput-exists"> Change </span>
															<input type="hidden"><input type="file" file-input="files"> </span>
													</div>
												</div>
											</div>
										</div>

									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" ng-click="closeModal()" class="btn dark btn-outline">Close</button>
					<button type="button" class="btn blue-hoki" id="btn-save" ng-click="save(modalstate, id)" ng-disabled="frmStaff.$invalid">Save</button>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">

$(document).ready(function () {
         $("#mask_phone").inputmask("mask", {
            "mask": "(999) 999-9999"
        });
}); 
</script>
@if(Auth::check())
    <script>
        var cid = "{{ Auth::user()->cid }}";
    </script>
 
@endif
@endsection
