@extends('admin_template', ['active_page' => 'integrations'])

@section('css-includes')
<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
@endsection

@section('js-includes')

@endsection

@section('js-scripts')
	<script src="<?= asset('app/controllers/integrationController.js') ?>"></script>
@endsection

@section('content')
<div ng-controller="integrationController">
	<!-- BEGIN PAGE BREADCRUMBS -->
	<ul class="page-breadcrumb breadcrumb">
		<li>
			<a href="{{ url('admin/dashboard') }}">Home</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Integrations</span>
		</li>
	</ul>
	<!-- END PAGE BREADCRUMBS -->
	<!-- BEGIN PAGE CONTENT INNER -->
	<div class="page-content-inner">
		<div class="mt-content-body">
			<div class="row">
				<div class="col-md-12">
					<!-- BEGIN SAMPLE FORM PORTLET-->
					<div class="portlet light ">
						<div class="portlet-title">
							<div class="caption">
								
								<span class="caption-subject font-blue-hoki bold uppercase">Infusionsoft Integration</span>
							</div>
						</div>
						<div class="portlet-body">
							<form class="form-horizontal" role="form" name="frmIntegration" novalidate="" >

								<div class="form-group">
									<label for="inputEmail1" class="col-md-3 control-label pull-left">Application Name or URL</label>
									<div class="col-md-8">
										<input type="text" class="form-control" name="Name" placeholder="Enter a Application Name or URL" value="@{{ Name }}"
										ng-model="integration.Name" ng-required="true">
										<span class="help-inline"
										ng-show="frmIntegration.Name.$invalid && frmIntegration.Name.$touched">Field is required</span>
									</div>
								</div>

								<div class="form-group">
									<label class="col-md-3 control-label pull-left">Encrypted API Key</label>
									<div class="col-md-8">
										<input type="text" class="form-control" name="EncryptedKey" placeholder="Enter the Key" value="@{{ EncryptedKey }}"
										ng-model="integration.EncryptedKey" ng-required="true">
										<span class="help-inline"
										ng-show="frmIntegration.EncryptedKey.$invalid && frmIntegration.EncryptedKey.$touched">Field is required</span>
									</div>
								</div>

								<div class="form-group">
									<div class="col-md-offset-9 col-md-2 pull-right">
										<button type="submit" class="btn blue-hoki" id="btn-save" ng-click="save('edit', id)" ng-disabled="frmIntegration.$invalid">Update</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					<!-- END SAMPLE FORM PORTLET-->
				</div>
			</div>
		</div>
	</div>
</div>
	<!-- END PAGE CONTENT INNER -->
	@if(Auth::check())
	    <script>
	        var cid = "{{ Auth::user()->cid }}";
	    </script>
	@endif
@endsection
