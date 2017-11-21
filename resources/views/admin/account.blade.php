@extends('admin_template', ['active_page' => 'account'])

@section('css-includes')
<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />

@endsection

@section('js-includes')
 <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>

@endsection

@section('js-scripts')

@endsection

@section('content')
<div  ng-controller="adminController">
	<!-- BEGIN PAGE BREADCRUMBS -->
	<ul class="page-breadcrumb breadcrumb">
		<li>
			<a href="superadmin/account">Home</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Account Settings</span>
		</li>
	</ul>
	<!-- END PAGE BREADCRUMBS -->
	<!-- BEGIN PAGE CONTENT INNER -->
	<div class="page-content-inner">
		<div class="mt-content-body">
			<div class="row">
				<div class="col-md-6">
					<!-- BEGIN SAMPLE FORM PORTLET-->
					<div class="portlet light ">
						<div class="portlet-title">
							<div class="caption">
								<i class="icon-settings font-dark"></i>
								<span class="caption-subject font-dark bold uppercase">Account Settings</span>
							</div>
						</div>
						<div class="portlet-body">
							<form class="form-horizontal" role="form" id="editform">
								<div class="form-group">
									<label for="inputEmail1" class="col-md-4 control-label">Email</label>
									<div class="col-md-8">
										<input type="email" class="form-control" id="email" ng-model="admin.email" placeholder="Email"><br>
										<span id="emailerrormsg" style="color:red;display:none;font-weight:bold;">Please input valid email address</span> </div>

								</div>
								<div class="form-group">
									<label for="inputPassword12" class="col-md-4 control-label">Password</label>
									<div class="col-md-8">
										<input type="password" class="form-control" ng-model="admin.password" id="password" placeholder="Password"><br>
										<span id="passwordErrorMsg1" style="color:red;display:none;font-weight:bold;">Password length must be greater or equal to 6!</span> </div>
								</div>
								<div class="form-group">
									<label for="inputPassword12" class="col-md-4 control-label">Re-Password</label>
									<div class="col-md-8">
										<input type="password" class="form-control" id="repassword" placeholder="Password"><br> 
										<span id="passwordErrorMsg" style="color:red;display:none;font-weight:bold;">Password fields doesn't match!</span></div>
								</div>
								
								<div class="form-group">
									<div class="col-md-offset-9 col-md-2">
										<button type="submit" ng-click="save()" class="btn blue-hoki submit">Update</button>
										</div>

										<div class="col-md-offset-6 col-md-6">
										<br>
										<span id="successfulmsg" style="color:green;font-weight:bold;display:none;">Profile updated successfully!</span>
										</div>
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
