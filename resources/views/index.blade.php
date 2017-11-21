<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js" ng-app="prescribeDiets"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js" ng-app="prescribeDiets"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en-US" ng-app="prescribeDiets">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->
    <!-- BEGIN HEAD -->
    <head>
        <meta charset="utf-8" />
        <title>Prescribe Diets</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" user-scalable="no" />
        <meta content="Prescribe Diets landing page" name="description" />
        <meta content="Mujtaba Aslam" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/font-awesome/css/font-awesome.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/simple-line-icons/simple-line-icons.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/bootstrap/css/bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="<?= asset('assets/global/css/components.min.css') ?>" rel="stylesheet" id="style_components" type="text/css" />
        <link href="<?= asset('assets/global/css/plugins.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN PAGE LEVEL STYLES -->
        <link href="<?= asset('assets/pages/css/about.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/pages/css/pricing.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <link href="<?= asset('assets/layouts/layout3/css/layout.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/layouts/layout3/css/themes/default.min.css') ?>" rel="stylesheet" type="text/css" id="style_color" />
        <link href="<?= asset('assets/layouts/layout3/css/custom.min.css') ?>" rel="stylesheet" type="text/css" />
        <!-- END THEME LAYOUT STYLES -->
        <link rel="shortcut icon" href="<?= asset('assets/layouts/layout3/img/favicon.png') ?>" /> </head>
    <!-- END HEAD -->
        <style>
            .page-header {
                height: 100%;
            }
            .page-content {
                padding-top: 0px;
            }
            .about-text>h4 {
                background-color: #67809F;
            }
        </style>
    <body class="page-container-bg-solid page-header-top-fixed">
        <div class="page-wrapper" id="app">
            <div class="page-wrapper-row">
                <div class="page-wrapper-top">
                    <!-- BEGIN HEADER -->
                        <div class="page-header">
                        <!-- BEGIN HEADER TOP -->
                        <div class="page-header-top">
                            <div class="container">
                                <!-- BEGIN LOGO -->
                                <div class="page-logo">
                                    <a href="{{ url('/') }}">
                                        <img src="<?= asset('assets/layouts/layout3/img/logo-default.png') ?>" alt="logo"  class="logo-size">
                                    </a>
                                </div>
                                <!-- END LOGO -->
                                <!-- BEGIN RESPONSIVE MENU TOGGLER -->
                                <a href="javascript:;" class="menu-toggler"></a>
                                <!-- END RESPONSIVE MENU TOGGLER -->
                                <!-- BEGIN TOP NAVIGATION MENU -->

                                <!-- END TOP NAVIGATION MENU -->
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
                            </div>
                        </div>
                        <!-- END HEADER TOP -->
                        <!-- BEGIN HEADER MENU -->
                        <div class="page-header-menu">
                            <div class="container">
                                <!-- BEGIN MEGA MENU -->
                                <div class="hor-menu  ">
                                    <ul class="nav navbar-nav">

                                        <li>

                                            <a href="#about-us"> What is Prescribe Diets</a>
                                        </li>

                                        <li>

                                            <a href="#features"> Features</a>
                                        </li>

                                        <!-- <li>

                                            <a href="#testimonials"> Testimonials</a>
                                        </li> -->


                                        <li>

                                            <a href="#pricing" > Pricing</a>
                                        </li>

                                        

                                        

                                        <li>

                                            <a href="{{ url('register') }}" ><strong> Register NOW</strong></a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- END MEGA MENU -->
                            </div>
                        </div>
                        <!-- END HEADER MENU -->
                    </div>
                    <!-- END HEADER -->

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
                                    <!-- BEGIN PAGE CONTENT INNER -->
                                    <div class="page-content-inner">
                                        <!-- BEGIN CONTENT HEADER -->
                                        <div class="row margin-bottom-40 about-header" style="
    margin-top: 10px;
">
                                            <div class="col-md-12">
                                                <h1>About Us</h1>
                                                <h2>Life is either a great adventure or nothing</h2>
                                    <a href="{{ url('register') }}" >
                                                <button  type="button" class="btn btn-danger">JOIN US TODAY</button> </a>
                                            </div>
                                        </div>
                                        <!-- END CONTENT HEADER -->
                                        <!-- BEGIN TEXT & VIDEO -->
                                        <div class="row margin-bottom-40 stories-header" data-auto-height="true" id="about-us">
                                            <div class="col-md-12">
                                                <h1>What is Prescribe Diets?</h1>
                                            </div>
                                        </div>
                                        <div class="row margin-bottom-40">
                                            <div class="col-lg-6">
                                                <div class="portlet light about-text">
                                                    <h4>
                                                        <i class="fa fa-check icon-info"></i> About Prescribe Diets</h4>
                                                    <p class="margin-top-20"> 
Prescribe Diets, in short, is a solution to the growing need for customized diets in a world that is learning to use food as medicine.  We’ve designed this program in such a way so as to maximize the impact that food can make on the health status and health improvement of your patients, your clients, your own health, and the community as a whole. </p>
                                                    <div class="row">
                                                        <div class="col-xs-6">
                                                            <ul class="list-unstyled margin-top-10 margin-bottom-10">
                                                                <li>
                                                                    <i class="fa fa-check"></i> Enter Food ingredients of your own, or use ours! </li>
                                                                <li>
                                                                    <i class="fa fa-check"></i> Tag each food with unique characteristics</li>
                                                                <li>
                                                                    <i class="fa fa-check"></i> Make dietary decisions based on desired nutrient outcomes</li>
                                                                <li>
                                                                    <i class="fa fa-check"></i> Enter food allergies, sensitivities, along with the ability to create custom food allergy panels</li>
                                                            </ul>
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <ul class="list-unstyled margin-top-10 margin-bottom-10">
                                                                <li>
                                                                    <i class="fa fa-check"></i> Create Diet Types (or use ours)</li>
                                                                <li>
                                                                    <i class="fa fa-check"></i> Create a Custom Diet for an individual using food reactions, characteristics, diet types and more!</li>
                                                                <li>
                                                                    <i class="fa fa-check"></i> Create Custom Shopping Lists and Recipe Lists for your clients! </li>    
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="about-quote">
                                                        <h4>
There isn’t a diet program on the market that has the flexibility to customize a person’s diet to this degree.  EMPLOY the POWER of GREAT EATING on your clients/patients! </h4>
                                                        <p class="about-author">Dr. Tony Ganem, DC FAAIH</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <iframe src="http://player.vimeo.com/video/22439234" style="width:100%; height:500px;border:0" allowfullscreen> </iframe>
                                            </div>
                                        </div>
                                        <!-- END TEXT & VIDEO -->
                                        <!-- BEGIN LINKS BLOCK -->

                                        <div class="row margin-bottom-40 stories-header" data-auto-height="true" id="features">
                                            <div class="col-md-12">
                                                <h1>Prominent Features</h1>
                                            </div>
                                        </div>
                                        <div class="row about-links-cont  margin-bottom-40" data-auto-height="true">
                                            <div class="col-md-6 about-links">
                                                <div class="row">
                                                    <div class="col-sm-6 about-links-item">
                                                        <h5><strong>A Database of over 800 Natural Foods</strong></h5>
                                                        
                                                    </div>
                                                    <div class="col-sm-6 about-links-item">
                                                        <h5><strong>Over 60 Pre-programmed Diet Types</strong></h5>
                                                        
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6 about-links-item">
                                                        <h5><strong>Over 50 Food Characteristics</strong></h5>
                                                        
                                                    </div>
                                                    <div class="col-sm-6 about-links-item">
                                                        <h5><strong>Over 20 Nutrients to Modify the Diet For</strong></h5>
                                                        
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6 about-links-item">
                                                        <h5><strong>Custom Recipe Lists with Scoring</strong></h5>
                                                        
                                                    </div>
                                                    <div class="col-sm-6 about-links-item">
                                                        <h5><strong>Custom Shopping Lists</strong></h5>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-sm-12">
                                                <div class="about-image" style="background: url(<?= asset('assets/pages/media/works/img4.jpg') ?>) center no-repeat;"></div>
                                            </div>
                                        </div>
                                        <!-- END LINKS BLOCK -->
                                        <!-- BEGIN MEMBERS SUCCESS STORIES -->
                                        <!-- <div class="row margin-bottom-40 stories-header" data-auto-height="true" id="testimonials">
                                            <div class="col-md-12">
                                                <h1>Members Success Stories</h1>
                                            </div>
                                        </div>
                                        <div class="row margin-bottom-20 stories-cont">
                                            <div class="col-lg-3 col-md-6">
                                                <div class="portlet light">
                                                    <div class="photo">
                                                        <img src="<?= asset('assets/pages/media/users/teambg1.jpg') ?>" alt="" class="img-responsive" /> </div>
                                                    <div class="title">
                                                        <span> Mark Wahlberg </span>
                                                    </div>
                                                    <div class="desc">
                                                        <span> We are at our very best, and we are happiest, when we are fully engaged in work we enjoy on the journey toward the goal we've established for ourselves. </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-6">
                                                <div class="portlet light">
                                                    <div class="photo">
                                                        <img src="<?= asset('assets/pages/media/users/teambg2.jpg') ?>" alt="" class="img-responsive" /> </div>
                                                    <div class="title">
                                                        <span> Lindsay Lohan </span>
                                                    </div>
                                                    <div class="desc">
                                                        <span> Do what you love to do and give it your very best. Whether it's business or baseball, or the theater, or any field. If you don't love what you're doing and you can't give it your best, get out of
                                                            it. </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-6">
                                                <div class="portlet light">
                                                    <div class="photo">
                                                        <img src="<?= asset('assets/pages/media/users/teambg5.jpg') ?>" alt="" class="img-responsive" /> </div>
                                                    <div class="title">
                                                        <span> John Travolta </span>
                                                    </div>
                                                    <div class="desc">
                                                        <span> To be nobody but yourself in a world which is doing its best, to make you everybody else means to fight the hardest battle which any human being can fight; and never stop fighting. </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-6">
                                                <div class="portlet light">
                                                    <div class="photo">
                                                        <img src="<?= asset('assets/pages/media/users/teambg8.jpg') ?>" alt="" class="img-responsive" /> </div>
                                                    <div class="title">
                                                        <span> Tom Brady </span>
                                                    </div>
                                                    <div class="desc">
                                                        <span> You have to accept whatever comes and the only important thing is that you meet it with courage and with the best that you have to give. Never give up, never surrender. Go all out or gain nothing.
                                                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                        <!-- END MEMBERS SUCCESS STORIES -->

                                        <div class="row margin-bottom-40 stories-header" data-auto-height="true"id="pricing">
                                            <div class="col-md-12">
                                                <h1>Pricing</h1>
                                            </div>
                                        </div>
                                        <div class="pricing-content-2 row about-links-cont" data-auto-height="true">
                                                    <div class="pricing-table-container" style="
    padding: 15px;
">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="price-column-container border-left border-top border-right">
                                                                    <div class="price-table-head price-1">
                                                                        <h2 class="uppercase bg-blue font-grey-cararra opt-pricing-5">Budget</h2>
                                                                    </div>
                                                                    <div class="price-table-pricing">
                                                                        <h3>
                                                                            <sup class="price-sign">$</sup>24</h3>
                                                                        <p class="uppercase">per month</p>
                                                                    </div>
                                                                    <div class="price-table-content">
                                                                        <div class="row no-margin">
                                                                            <div class="col-xs-3 text-right">
                                                                                <i class="icon-user"></i>
                                                                            </div>
                                                                            <div class="col-xs-9 text-left uppercase">3 Users</div>
                                                                        </div>
                                                                        <div class="row no-margin">
                                                                            <div class="col-xs-3 text-right">
                                                                                <i class="icon-drawer"></i>
                                                                            </div>
                                                                            <div class="col-xs-9 text-left uppercase">25 Patients</div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="price-table-footer">
                                                                       <a href="{{ url('register') }}" > <button type="button" class="btn grey-salsa btn-outline sbold uppercase">Sign Up</button> </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="price-column-container featured-price">
                                                                    <div class="price-feature-label uppercase bg-red">Best Value</div>
                                                                    <div class="price-table-head price-2">
                                                                        <h2 class="uppercase bg-green-jungle font-grey-cararra opt-pricing-5">Start up</h2>
                                                                    </div>
                                                                    <div class="price-table-pricing">
                                                                        <h3>
                                                                            <sup class="price-sign">$</sup>59</h3>
                                                                        <p class="uppercase">per month</p>
                                                                    </div>
                                                                    <div class="price-table-content">
                                                                        <div class="row no-margin">
                                                                            <div class="col-xs-3 text-right">
                                                                                <i class="icon-user-follow"></i>
                                                                            </div>
                                                                            <div class="col-xs-9 text-left uppercase">10 Users</div>
                                                                        </div>
                                                                        <div class="row no-margin">
                                                                            <div class="col-xs-3 text-right">
                                                                                <i class="icon-drawer"></i>
                                                                            </div>
                                                                            <div class="col-xs-9 text-left uppercase">100 Patients</div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="price-table-footer">
                                                                       <a href="{{ url('register') }}" > <button type="button" class="btn green featured-price uppercase">Get it now!</button> </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="price-column-container border-left border-top border-right">
                                                                    <div class="price-table-head price-3">
                                                                        <h2 class="uppercase bg-blue-ebonyclay font-grey-cararra opt-pricing-5">enterprise</h2>
                                                                    </div>
                                                                    <div class="price-table-pricing">
                                                                        <h3>
                                                                            <sup class="price-sign">$</sup>128</h3>
                                                                        <p class="uppercase">per month</p>
                                                                    </div>
                                                                    <div class="price-table-content">
                                                                        <div class="row no-margin">
                                                                            <div class="col-xs-3 text-right">
                                                                                <i class="icon-users"></i>
                                                                            </div>
                                                                            <div class="col-xs-9 text-left uppercase">Unlimited Users</div>
                                                                        </div>
                                                                        <div class="row no-margin">
                                                                            <div class="col-xs-3 text-right">
                                                                                <i class="icon-drawer"></i>
                                                                            </div>
                                                                            <div class="col-xs-9 text-left uppercase font-green sbold">Unlimited Patients</div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="price-table-footer">
                                                                     <a href="{{ url('register') }}" >   <button type="button" class="btn grey-salsa btn-outline sbold uppercase">Sign Up</button> </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                        </div>
                                    </div>
                                    <!-- END PAGE CONTENT INNER -->
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
                    <!-- BEGIN PRE-FOOTER -->
                    <div class="page-prefooter">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-3 col-sm-6 col-xs-12 footer-block">
                                    <h2>About</h2>
                                    <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam dolore. </p>
                                </div>
                                <div class="col-md-3 col-sm-6 col-xs12 footer-block">
                                    <h2>Subscribe Email</h2>
                                    <div class="subscribe-form">
                                        <form action="javascript:;">
                                            <div class="input-group">
                                                <input type="text" placeholder="mail@email.com" class="form-control">
                                                <span class="input-group-btn">
                                                    <button class="btn" type="submit">Submit</button>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-6 col-xs-12 footer-block">
                                    <h2>Follow Us On</h2>
                                    <ul class="social-icons">
                                        <li>
                                            <a href="javascript:;" data-original-title="rss" class="rss"></a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" data-original-title="facebook" class="facebook"></a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" data-original-title="twitter" class="twitter"></a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" data-original-title="googleplus" class="googleplus"></a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" data-original-title="linkedin" class="linkedin"></a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" data-original-title="youtube" class="youtube"></a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" data-original-title="vimeo" class="vimeo"></a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-3 col-sm-6 col-xs-12 footer-block">
                                    <h2>Contacts</h2>
                                    <address class="margin-bottom-40"> Phone: 800 123 3456
                                        <br> Email:
                                        <a href="mailto:info@metronic.com">info@metronic.com</a>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END PRE-FOOTER -->
                    <!-- BEGIN INNER FOOTER -->
                    <div class="page-footer">
                        <div class="container"> 2017 © Prescribe Diets By <a href="http://invictuszone.com/" target="_blank"> Invictus Zone</a> 
                       &nbsp;|&nbsp;
                    <a href="http://prescribediets.com/" target="_blank">Prescribe Diets</a></div>
                    </div>
                    <div class="scroll-to-top">
                        <i class="icon-arrow-up"></i>
                    </div>
                    <!-- END INNER FOOTER -->
                    <!-- END FOOTER -->
                </div>
            </div>
        </div>
        <!-- END QUICK NAV -->
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
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="<?= asset('assets/global/scripts/app.min.js') ?>" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="<?= asset('assets/layouts/layout3/scripts/layout.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/layout3/scripts/demo.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/global/scripts/quick-sidebar.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/global/scripts/quick-nav.min.js') ?>" type="text/javascript"></script>
        <!-- END THEME LAYOUT SCRIPTS -->
    </body>

</html>
