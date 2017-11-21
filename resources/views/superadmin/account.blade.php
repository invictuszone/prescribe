@extends('superadmin_template', ['active_page' => 'account'])

@section('css-includes')
<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
@endsection

@section('js-includes')

@endsection

@section('js-scripts')

@endsection

@section('content')
<div  ng-controller="clientsController">
	<!-- BEGIN PAGE BREADCRUMBS -->
	<ul class="page-breadcrumb breadcrumb">
		<li>
			<a href="{{ url('superadmin/dashboard') }}" >Home</a>
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
								
								<span class="caption-subject font-blue-hoki">Account Settings</span>
							</div>
						</div>
						<div class="portlet-body">
							<form class="form-horizontal" role="form">
								<div class="form-group">
									<label for="inputEmail1" class="col-md-4 control-label">Email</label>
									<div class="col-md-8">
										<input type="email" class="form-control" id="inputEmail1" placeholder="Email"> </div>
								</div>
								<div class="form-group">
									<label for="inputPassword12" class="col-md-4 control-label">Password</label>
									<div class="col-md-8">
										<input type="password" class="form-control" id="inputPassword12" placeholder="Password"> </div>
								</div>
								<div class="form-group">
									<label for="inputPassword12" class="col-md-4 control-label">Re-Password</label>
									<div class="col-md-8">
										<input type="password" class="form-control" id="inputPassword12" placeholder="Password"> </div>
								</div>
								<div class="form-group">
									<div class="col-md-offset-8 col-md-2">
										<button type="submit" class="btn blue-hoki">Update</button>
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
@endsection
