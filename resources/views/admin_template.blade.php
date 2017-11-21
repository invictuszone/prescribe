<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js" ng-app="prescribeDiets"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js" ng-app="prescribeDiets"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" ng-app="prescribeDiets">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <meta charset="utf-8" />
        <title>Prescribe Diets | Admin</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Prescribe Diets super Admin portal" name="description" />
        <meta content="Mujtaba Aslam" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/font-awesome/css/font-awesome.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/simple-line-icons/simple-line-icons.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/bootstrap/css/bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
			@yield('css-includes')
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="<?= asset('assets/global/css/components.min.css') ?>" rel="stylesheet" id="style_components" type="text/css" />
        <link href="<?= asset('assets/global/css/plugins.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <link href="<?= asset('assets/layouts/layout3/css/layout.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/layouts/layout3/css/themes/default.min.css') ?>" rel="stylesheet" type="text/css" id="style_color" />
        <link href="<?= asset('assets/layouts/layout3/css/custom.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END THEME LAYOUT STYLES -->
        <link rel="shortcut icon" href="<?= asset('assets/layouts/layout3/img/favicon.png') ?>" /> </head>
    <!-- END HEAD -->

    <body class="page-container-bg-solid ng-cloak">
        <div class="page-wrapper">
            <div class="page-wrapper-row">
                <div class="page-wrapper-top">
                    <!-- BEGIN HEADER -->
                    @include('admin.includes.header', ['active_page' => $active_page])
					<!-- END HEADER -->
                </div>
            </div>
            <div class="page-wrapper-row full-height">
                <div class="page-wrapper-middle">
                    <!-- BEGIN CONTAINER -->
                    <div class="page-container">
                        <!-- BEGIN CONTENT -->
                        <div class="page-content-wrapper">
                            <!-- BEGIN CONTENT BODY -->
                            <!-- BEGIN PAGE CONTENT BODY -->
                            <div class="page-content">
                                <div class="container">
									@yield('content')
                                </div>
                            </div>
                            <!-- END PAGE CONTENT BODY -->
                            <!-- END CONTENT BODY -->
                        </div>
                        <!-- END CONTENT -->
                    </div>
                    <!-- END CONTAINER -->
                </div>
            </div>
            <div class="page-wrapper-row">
                <div class="page-wrapper-bottom">
                    <!-- BEGIN FOOTER -->
						@include('admin.includes.footer')
                    <!-- END FOOTER -->
                </div>
            </div>
        </div>
        <!--[if lt IE 9]>
<script src="<?= asset('assets/global/plugins/respond.min.js') ?>"></script>
<script src="<?= asset('assets/global/plugins/excanvas.min.js') ?>"></script>
<script src="<?= asset('assets/global/plugins/ie8.fix.min.js') ?>"></script>
<![endif]-->
        <!-- BEGIN CORE PLUGINS -->
        <script src="<?= asset('assets/global/plugins/jquery.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/bootstrap/js/bootstrap.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/js.cookie.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/jquery.blockui.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js') ?>" type="text/javascript"></script>
        <!-- END CORE PLUGINS -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
			@yield('js-includes')
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="<?= asset('assets/global/scripts/app.min.js') ?>" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->

        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="<?= asset('assets/layouts/layout3/scripts/layout.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/layout3/scripts/demo.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/global/scripts/quick-sidebar.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/global/scripts/quick-nav.min.js') ?>" type="text/javascript"></script>
        <!-- END THEME LAYOUT SCRIPTS -->

        <!-- Load Javascript Libraries (AngularJS, JQuery, Bootstrap) -->
        <script src="<?= asset('app/lib/angular/angular.min.js') ?>"></script>

        <!-- AngularJS Application Scripts -->
        <script src="<?= asset('app/app.js') ?>"></script>
         <script src="<?= asset('app/controllers/adminController.js') ?>"></script>


        <!-- BEGIN PAGE LEVEL SCRIPTS -->
			@yield('js-scripts')
        <!-- END PAGE LEVEL SCRIPTS -->

    </body>

</html>
