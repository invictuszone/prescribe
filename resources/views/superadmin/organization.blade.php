@extends('superadmin_template', ['active_page' => 'preferences'])

@section('css-includes')
<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
@endsection

@section('js-includes')
	<script src="<?= asset('assets/global/plugins/jquery-ui/jquery-ui.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
	<script src="<?= asset('assets/global/scripts/datatable.js') ?>" type="text/javascript"></script>
	<script src="<?= asset('assets/global/plugins/datatables/datatables.min.js') ?>" type="text/javascript"></script>
	<script src="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js') ?>" type="text/javascript"></script>
@endsection

@section('js-scripts')

@endsection

@section('content')
<div  ng-controller="preferencesController">
	<!-- BEGIN PAGE BREADCRUMBS -->
	<ul class="page-breadcrumb breadcrumb">
		<li>
			<a href="{{ url('superadmin/dashboard') }}" >Home</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Organizations</span>
		</li>
	</ul>
	<!-- END PAGE BREADCRUMBS -->
	<!-- BEGIN PAGE CONTENT INNER -->
	<div class="page-content-inner">
		<div class="mt-content-body">
			<div class="row">
				<!-- <div class="col-md-12">
					<!-- BEGIN EXAMPLE TABLE PORTLET->
					<div class="portlet light portlet-fit ">
						<div class="portlet-title">
							<div class="caption">

								<span class="caption-subject font-blue-hoki sbold uppercase">Subscription Packages</span>
							</div>
							<div class="actions">
                <a id="btn-add" class="btn btn-circle blue-hoki" ng-click="toggle('add', 0, 'subscriptions')">
                    <i class="fa fa-plus"></i> Add
								</a>
              </div>
						</div>
						<div class="portlet-body">
							<table class="table table-striped table-hover table-bordered">
								<thead>
									<tr>
										<th> Package </th>
										<th> No. of Staff </th>
										<th> No. of Patients </th>
										<th> Edit </th>
										<th> Delete </th>
									</tr>
								</thead>
								<tbody>
									<tr ng-repeat="subscription in subscriptions">
										<td> @{{ subscription.Name }} </td>
										<td> @{{ subscription.NoOfPeople }} </td>
										<td> @{{ subscription.NoOfPatients }} </td>
										<td>
											<a class="edit" ng-click="toggle('edit', subscription.id, 'subscriptions')" href="javascript:;"> Edit </a>
										</td>
										<td>
											<a class="delete" ng-click="confirmDelete(subscription.id, 'subscriptions')" href="javascript:;"> Delete </a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!-- END EXAMPLE TABLE PORTLET->
				</div> -->
			<div class="col-md-12">
					<!-- BEGIN EXAMPLE TABLE PORTLET-->
					<div class="portlet light portlet-fit ">
						<div class="portlet-title">
							<div class="caption">

								<span class="caption-subject font-blue-hoki sbold uppercase">Organization Types</span>
							</div>
							<div class="actions">
                <a id="org-btn-add" class="btn btn-circle blue-hoki" ng-click="toggle('add', 0, 'organizations')">
                  <i class="fa fa-plus"></i> Add
								</a>
              </div>
						</div>
						<div class="portlet-body">
							<table class="table table-striped table-hover table-bordered">
								<thead>
									<tr>
										<th> Organization </th>
										<th> Edit </th>
										<th> Delete </th>
									</tr>
								</thead>
								<tbody>
									<tr ng-repeat="organization in organizations">
										<td> @{{ organization.Name }} </td>
										<td>
											<a class="edit" ng-click="toggle('edit', organization.id, 'organizations')" href="javascript:;"> Edit </a>
										</td>
										<td>
											<a class="delete" ng-click="confirmDelete(organization.id, 'organizations')" href="javascript:;"> Delete </a>
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
	<!-- <div class="modal fade" id="Package" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog ">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">@{{form_title}}</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" role="form" name="frmSubscription" novalidate="">
						<div class="form-body">
							<div class="form-group">
  								<label class="col-md-3 control-label">Package Name</label>
  								<div class="col-md-9">
  									<input type="text" class="form-control" name="name" placeholder="Enter Package Name" value="@{{Name}}"
                    ng-model="organization.Name" ng-required="true">
                    <span class="help-inline"
                    ng-show="frmSubscription.name.$invalid && frmSubscription.name.$touched">Field is required</span>
  								</div>
							</div>
							<div class="form-group">
  								<label class="col-md-3 control-label">No. of Patients</label>
  								<div class="col-md-3">
  									<input type="number" min="1" class="form-control" value="@{{NoOfPatients}}" ng-model="organization.NoOfPatients">
  								</div>
  								<label class="col-md-3 control-label">No. of Staff</label>
  								<div class="col-md-3">
  									<input type="number" min="1" class="form-control" value="@{{NoOfPeople}}" ng-model="organization.NoOfPeople">
  								</div>
  								<br/>
  								<p class="col-md-offset-2 text-info font-blue-hoki"> Leave No.of Patients and No. of Staff empty to set thier value as unlimited. </p>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
					<button type="button" class="btn blue-hoki" ng-click="save(modalstate, id, 'subscriptions')" ng-disabled="frmSubscription.$invalid">Save</button>
				</div>
			</div>
			<!-- /.modal-content ->
		</div>
		<!-- /.modal-dialog ->
	</div> -->

	<!-- Organization Type Modal -->
	<div class="modal fade bs-modal-sm" id="OrgType" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">@{{form_title}}</h4>
				</div>
				<div class="modal-body">
  					<div class="form-group" name="frmOrganization" novalidate="">
    						<label class="col-md-12 control-label">Organization Type</label>
    						<div class="col-md-12">
    							  <input type="text" class="form-control" name="name" placeholder="Enter Organization Type" value="@{{Name}}"
                    ng-model="organization.Name" ng-required="true">
                    <span class="help-inline"
                    ng-show="frmOrganization.name.$invalid && frmOrganization.name.$touched">Field is required</span>
    						</div>
  					</div>
  					<br/>
  					<br/>
  					<br/>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
					<button type="button" class="btn blue-hoki" ng-click="save(modalstate, id, 'organizations')" ng-disabled="frmOrganization.$invalid">Save</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
  <!-- ng-Controller Ends -->
</div>
@endsection
