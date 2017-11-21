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
        <script>
          // $(document).ready(function(){
          //         $('#pleaseWaitModal').modal('show');
          // });
          window.open("http://diet.invictuszone.com/login","_self")
        </script>

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
                                        <!-- BEGIN USER LOGIN -->
                                        @if (Auth::guest())
                                            <li class="dropdown dropdown-user dropdown-dark">
                                                <a href="{{ url('login') }}">
                                                    <span class="username">Login</span>
                                                </a>
                                            </li>
                                            <li class="dropdown dropdown-user dropdown-dark">
                                                <a href="{{ url('register') }}">
                                                    <span class="username">Register</span>
                                                </a>
                                            </li>
                                        @else
                                    <!-- END USER LOGIN -->
                                        <li class="menu-dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                                    <i class="icon-user"></i> {{ Auth::user()->fname }} {{ Auth::user()->lname }} <span class="caret"></span>
                                                </a>
                                                <ul class="dropdown-menu dropdown-menu-default" role="menu">
                                                    <li>
                                                      @role('SuperAdmin') {{-- Laravel-permission blade helper --}}
                                                      <a href="{{ url('superadmin/dashboard') }}"><i class="icon-user"></i> SuperAdmin</a>
                                                      @endrole
                                                      @role('Admin') {{-- Laravel-permission blade helper --}}
                                                      <a href="{{ url('admin/dashboard') }}"><i class="icon-user"></i> Admin</a>
                                                      @endrole
                                                    </li>
                                                    <li>
                                                        <a href="{{ route('logout') }}"
                                                            onclick="event.preventDefault();
                                                                     document.getElementById('logout-form').submit();"><i class="icon-key"></i>
                                                            Logout
                                                        </a>

                                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                                            {{ csrf_field() }}
                                                        </form>
                                                    </li>
                                                </ul>
                                            </li>
                                        @endif
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
                                                        <a href="#about-us">
                                                            <span class="username">What is Prescribe Diets</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-separator">
                                                        <span class="separator"></span>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="#features">
                                                            <span class="username">Features</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-separator">
                                                        <span class="separator"></span>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="#testimonials">
                                                            <span class="username">Testimonials</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="#pricing">
                                                            <span class="username">Pricing</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-separator">
                                                        <span class="separator"></span>
                                                    </li>

                                                    <li class="menu-dropdown dropdown-separator">
                                                        <span class="separator"></span>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="{{ url('superadmin/dashboard') }}">
                                                            <span class="username">Super Admin</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="{{ url('admin/dashboard') }}">
                                                            <span class="username">Admin</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-dropdown dropdown-user dropdown-dark">
                                                        <a href="{{ url('user/dashboard') }}">
                                                            <span class="username">User</span>
                                                        </a>
                                                    </li>
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
                <span class="form-title">Welcome.</span>
                <span class="form-subtitle">Please login.</span>
            </div>
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                        <div class="login-form">
                  {{ csrf_field() }}

                    <div class="alert alert-danger display-hide">
                        <button class="close" data-close="alert"></button>
                        <span> Enter any username and password. </span>
                    </div>
                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                        <label for="email" class="control-label visible-ie8 visible-ie9">Username</label>
                        <input id="email" type="email" class="form-control form-control-solid placeholder-no-fix" name="email" placeholder="Username" value="{{ old('email') }}" required autofocus>
                        @if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>

                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                        <label for="password" class="control-label visible-ie8 visible-ie9">Password</label>
                        <input id="password" type="password" class="form-control form-control-solid placeholder-no-fix" autocomplete="off" placeholder="Password" name="password" required/>
                        @if ($errors->has('password'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
                    </div>

                    <div class="form-actions">
                   <a href="{{ url('user/dashboard') }}">
                        <button type="submit" class="btn red btn-block uppercase">Login</button>
                        </a>
                    </div>

                    <div class="form-actions">
                        <div class="pull-left">
                            <label class="rememberme mt-checkbox mt-checkbox-outline">
                                <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember me
                                <span></span>
                            </label>
                        </div>
                        <div class="pull-right forget-password-block">
                            <a class="btn btn-link" href="{{ route('password.request') }}" class="forget-password">Forgot Password?</a>
                        </div>
                    </div>
                </div>
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
