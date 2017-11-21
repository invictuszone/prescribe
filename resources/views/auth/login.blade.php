<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js" ng-app="prescribeDiets"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js" ng-app="prescribeDiets"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en-US" ng-app="prescribeDiets">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <meta charset="utf-8" />
        <title>Prescribe Diets | Login</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Prescribe Diets login page" name="description" />
        <meta content="Mujtaba Aslam" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/font-awesome/css/font-awesome.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/simple-line-icons/simple-line-icons.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/bootstrap/css/bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <link href="<?= asset('assets/global/plugins/select2/css/select2.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/select2/css/select2-bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="<?= asset('assets/global/css/components.min.css') ?>" rel="stylesheet" id="style_components" type="text/css" />
        <link href="<?= asset('assets/global/css/plugins.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN PAGE LEVEL STYLES -->
        <link href="<?= asset('assets/pages/css/login-2.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/layouts/layout3/css/layout.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/layouts/layout3/css/themes/default.min.css') ?>" rel="stylesheet" type="text/css" id="style_color" />
        <link href="<?= asset('assets/layouts/layout3/css/custom.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <!-- END THEME LAYOUT STYLES -->
        <link rel="shortcut icon" href="favicon.ico" />
      </head>
    <!-- END HEAD -->

    <body class=" login page-container-bg-solid page-header-top-fixed">

 <div class="page-wrapper-row">
            <div class="page-wrapper-top">
                    <!-- BEGIN HEADER -->
                    <div class="page-header login-registration-head">
                        <!-- BEGIN HEADER TOP -->
                        <div class="page-header-top">
                            <div class="container">
                                <!-- BEGIN LOGO -->
                                <div class="page-logo">
                                    <a  href="{{ url('/') }}">
                                        <img src="<?= asset('assets/layouts/layout3/img/logo-default.png') ?>" alt="logo" class="logo-size">
                                    </a>
                                </div>
                                <!-- END LOGO -->
                                <!-- BEGIN RESPONSIVE MENU TOGGLER -->
                                <a href="javascript:;" class="menu-toggler"></a>
                                <!-- END RESPONSIVE MENU TOGGLER -->
                                <!-- BEGIN TOP NAVIGATION MENU -->
                                 <div class="top-menu">
                                    <ul class="nav navbar-nav pull-right">
                                        <li>

                                            <a href="{{ url('login') }}">Admin Login</a>
                                        </li>
                                        <li style="font-size: 29px;color: rgba(152, 210, 203, 0.36);">|</li>
                                        <li>

                                            <a href="{{ url('staff/login') }}">Staff Login</a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- END TOP NAVIGATION MENU -->
                            </div>
                        </div>
                        <!-- END HEADER TOP -->

                        <!-- BEGIN HEADER MENU -->
                        <div class="page-header-menu">
                            <div class="container">

                                <div class="hor-menu  ">
                                    <ul class="nav navbar-nav">
                                        <!-- BEGIN MENU -->
                                                    <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="{{ url('/#about-us') }}">
                                                            <span class="username">What is Prescribe Diets</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-separator">
                                                        <span class="separator"></span>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="{{ url('/#features') }}">
                                                            <span class="username">Features</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-separator">
                                                        <span class="separator"></span>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a  href="{{ url('/#testimonials') }}">
                                                            <span class="username">Testimonials</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a  href="{{ url('/#pricing') }}">
                                                            <span class="username">Pricing</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-separator">
                                                        <span class="separator"></span>
                                                    </li>

                                                    <li class="menu-dropdown dropdown-separator">
                                                        <span class="separator"></span>
                                                    </li>
                                                   <!-- <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="#">
                                                            <span class="username">Super Admin</span>
                                                        </a>
                                                    </li>-->
                                                    <!--<li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="#">
                                                            <span class="username">Admin</span>
                                                        </a>
                                                    </li>-->
                                                   <!-- <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="#">
                                                            <span class="username">User</span>
                                                        </a>
                                                    </li>-->
                                    </ul>
                                </div>
                                <!-- END MEGA MENU -->
                            </div>
                        </div>
                        <!-- END HEADER MENU -->
                    </div>
                    <!-- END HEADER -->
                </div>
            </div>

        <!-- BEGIN LOGIN -->
        <div class="content login-content">
            <!-- BEGIN LOGIN FORM -->
            <div class="form-title">
                <span class="form-title">Welcome Back !</span>

            </div>
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                        <form class="login-form" method="POST" action="{{ route('login') }}">
                  {{ csrf_field() }}

                    <div class="alert alert-danger display-hide">
                        <button class="close" data-close="alert"></button>
                        <span> Enter any username and password. </span>
                    </div>
                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                        <div class="input-group">
                                                                        <span class="input-group-addon">
                                                                            <i class="fa fa-user"></i>
                                                                        </span>
                        <label for="email" class="control-label visible-ie8 visible-ie9">Username</label>
                        <input id="email" type="email" class="form-control form-control-solid placeholder-no-fix" name="email" placeholder="Username" value="{{ old('email') }}" required autofocus>
                        @if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
</div>
                    </div>

                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                          <div class="input-group">
                                                                        <span class="input-group-addon">
                                                                            <i class="fa fa-unlock-alt" style="font-size: 17px;"></i>
                                                                        </span>
                        <label for="password" class="control-label visible-ie8 visible-ie9">Password</label>
                        <input id="password" type="password" class="form-control form-control-solid placeholder-no-fix" autocomplete="off" placeholder="Password" name="password" required/>
                        @if ($errors->has('password'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
</div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn green-haze btn-block uppercase">Login</button>
                    </div>
                    <div class="form-actions">
                        <label class="col-md-8 col-xs-8" style="margin-top: 15px;">Don't have an account ? Register now!</label>
                        <a class="btn blue-hoki btn-sm uppercase pull-right" href="{{ url('register') }}">Register</a>
                    </div>

                </form>
                <!-- END LOGIN FORM -->
                <!-- BEGIN FORGOT PASSWORD FORM -->
                <form class="forget-form" action="index.html" method="post">
                    <div class="form-title">
                        <span class="form-title">Forget Password ?</span>
                        <span class="form-subtitle">Enter your e-mail to reset it.</span>
                    </div>
                    <div class="form-group">
                        <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Email" name="email" /> </div>
                    <div class="form-actions">
                        <button type="button" id="back-btn" class="btn btn-default">Back</button>
                        <button type="submit" class="btn btn-primary uppercase pull-right">Submit</button>
                    </div>
                </form>
                <!-- END FORGOT PASSWORD FORM -->
                </div>
            </div>

        </div>
        <div class="copyright hide"> 2017 © Prescribe Diets</div>
        <!-- END LOGIN -->
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
        <script src="<?= asset('assets/global/plugins/jquery-validation/js/jquery.validate.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/jquery-validation/js/additional-methods.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/select2/js/select2.full.min.js') ?>" type="text/javascript"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="<?= asset('assets/global/scripts/app.min.js') ?>" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
        <script src="<?= asset('assets/pages/scripts/login.min.js') ?>" type="text/javascript"></script>
        <!-- END PAGE LEVEL SCRIPTS -->
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="<?= asset('assets/layouts/layout3/scripts/layout.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/layout3/scripts/demo.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/global/scripts/quick-sidebar.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/global/scripts/quick-nav.min.js') ?>" type="text/javascript"></script>
        <!-- END THEME LAYOUT SCRIPTS -->
    </body>

</html>
