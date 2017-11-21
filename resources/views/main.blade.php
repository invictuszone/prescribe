<!DOCTYPE html>
<!--
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 4.7.1
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Dribbble: www.dribbble.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
Renew Support: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <meta charset="utf-8" />
        <title>Prescribe Diets | Main</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Preview page of Metronic Admin Theme #3 for " name="description" />
        <meta content="" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
         <link href="<?= asset('assets/global/plugins/font-awesome/css/font-awesome.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/simple-line-icons/simple-line-icons.min.css') ?>" rel="stylesheet" type="text/css" />
       <link href="<?= asset('assets/global/plugins/bootstrap/css/bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
       <link href="<?= asset('assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL STYLES -->
          <link href="<?= asset('assets/global/css/components.min.css') ?>" rel="stylesheet" id="style_components" type="text/css" />
          <link href="<?= asset('assets/global/css/plugins.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN PAGE LEVEL STYLES -->
         <link href="<?= asset('assets/pages/css/lock-2.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/layouts/layout3/css/custom.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <!-- END THEME LAYOUT STYLES -->
        <link rel="shortcut icon" href="favicon.ico" />
		 <!-- Styles -->
        <style>
          #pbody{
			  width: 656px;
			  padding:40px;
			  line-height: 1.42857;
			   }
			.heading{
				text-align: center;
				color:white;
				margin-top:0px!important
			}
			.paragraph
			{
			color:white;
			font-size: 14px;
	                text-align:center;
			}

        </style>
		</head>
    <!-- END HEAD -->


        <div class="page-lock">
            <div class="page-logo">
                <a class="brand" href="#">
                   <img src="<?= asset('assets/layouts/layout3/img/logo-default-dummy.png') ?>" alt="logo" width="270px"> </a>
            </div>
            <div class="page-body">
                <div class="col-md-12 col-xs-12">
                    <h1 class="heading"><b>Prescribe Diets</b></h1>
                </div>
                    <div class="form-inline">
					  <span> <p class="paragraph" >This is just a dummy screen.</p></span>
                        <div class="row">
                            <div class="col-md-5 col-md-offset-1 col-xs-5">
                                <span class="input-group-btn">
                                     <a href="{{ url('login') }}">
                                    <button class="btn blue-hoki btnstaff">
    								<h5><i class="fa fa-user-md" aria-hidden="true" style="margin-right:4px;"></i>
                                    <b>  User Login </b></h5>
                                    </button>
</a>

                                </span>
                                </div>
                                <div class="col-md-5 col-md-offset-1 col-xs-5 col-xs-offset-1">
    							<span class="input-group-btn">
                     <a href="{{ route('staff.login') }}">
                                    <button type="submit" class="btn  blue-hoki">
    								<h5><i class="fa fa-user" aria-hidden="true" style="margin-right:4px;"></i>
                                    <b>Staff Login</b></h5>
                                    </button>
                        </a>
                                </span>
                            </div>
                        </div>
                        <!-- /input-group -->
                    </div>
		</div>

            <div class="copyright hide"> 2017 © Prescribe Diets</div>
        </div>
        <!--[if lt IE 9]>
            <script src="<?= asset('assets/global/plugins/respond.min.js') ?>"></script>
			<script src="<?= asset('assets/global/plugins/excanvas.min.js') ?>"></script>
			<script src="<?= asset('assets/global/plugins/ie8.fix.min.js') ?>"></script>
<![endif]-->
        <!-- BEGIN CORE PLUGINS -->
		 <script src="<?= asset('assets/global/plugins/jquery.min.js') ?>" type="text/javascript"></script>
		 <script src="<?= asset('assets/global/plugins/bootstrap/js/bootstrap.min.js') ?>" type="text/javascript"></script>
		 <script src="<?= asset('assets/global/plugins/js.cookie.min.js') ?>"  type="text/javascript"></script>
		 <script src="<?= asset('assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js') ?>" type="text/javascript"></script>
         <script src="<?= asset('assets/global/plugins/jquery.blockui.min.js') ?>"  type="text/javascript"></script>
         <script src="<?= asset('assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js') ?>"  type="text/javascript"></script>
        <!-- END CORE PLUGINS -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
         <script src="<?= asset('assets/global/plugins/backstretch/jquery.backstretch.min.js') ?>"  type="text/javascript"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
         <script src="<?= asset('assets/global/scripts/app.min.js') ?>"  type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
         <script src="<?= asset('assets/pages/scripts/lock-2.min.js') ?>" type="text/javascript"></script>
        <!-- END PAGE LEVEL SCRIPTS -->
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <!-- END THEME LAYOUT SCRIPTS -->
    </body>

</html>
