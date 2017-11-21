 <?php
//require_once ('stripe/init.php');
//require_once ('stripe/lib/Stripe.php');
//\Stripe\Stripe::setApiKey("sk_test_oiytx7XhVwWvDk79glFs4iPd");
?> 
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js" ng-app="prescribeDiets"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js" ng-app="prescribeDiets"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en-US" ng-app="prescribeDiets">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->
    <head>
        <meta charset="utf-8" />
        <title>Prescribe Diets | Register</title>
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
        <link href="<?= asset('assets/global/plugins/select2/css/select2-bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
        <link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
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

    <body class="login page-container-bg-solid page-header-top-fixed">
        <div class="page-wrapper" id="app">
        <div class="page-wrapper-row">
            <div class="page-wrapper-top">
                    <!-- BEGIN HEADER -->
                    <div class="page-header login-registration-head">
                        <!-- BEGIN HEADER TOP -->
                        <div class="page-header-top">
                            <div class="container">
                                <!-- BEGIN LOGO -->
                                <div class="page-logo">
                                    <a href="index.html">
                                        <img src="<?= asset('assets/layouts/layout3/img/logo-default.jpg') ?>" alt="logo" class="logo-default"
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
        <div class="row">
            <div class="col-md-10 col-md-offset-1 col-xs-12">
                <div class="portlet-body">
                        <div class="mt-element-step">
                            <div class="row step-thin">
                                <a id="pers-details">
                                    <div class="col-md-4 bg-custom-1 mt-step-col">
                                            <div class="mt-step-number bg-white font-grey">1</div>
                                            <div class="mt-step-title uppercase font-grey-cascade">Personal Details</div>
                                    </div>
                                </a>
                                <a id="org-details">
                                    <div class="col-md-4 bg-custom-2 mt-step-col">
                                            <div class="mt-step-number bg-white font-grey">2</div>
                                            <div class="mt-step-title uppercase font-grey-cascade">Organization Details</div>
                                    </div>
                                </a>
                                <a id="acct-details">
                                    <div class="col-md-4 bg-custom-3 mt-step-col">
                                            <div class="mt-step-number bg-white font-grey">3</div>
                                            <div class="mt-step-title uppercase font-grey-cascade">Account Details</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        
            <div class="content">
                <!-- BEGIN REGISTRATION FORM -->
                <div ng-controller="clientController">
                 <form accept-charset="UTF-8" action="/" class="require-validation"
                        data-cc-on-file="false"
                        data-stripe-publishable-key="pk_test_m0zvBCuZV2RdKL8P0CsJGW1Y"
                        id="payment-form" method="post">
                        {!! csrf_field() !!}
                    <div class="form-title">
                        <span class="form-title">Sign Up</span>
                    </div>
                    <div id="personal-details">
                    <div class="row">
                        <p class="hint"> Enter your personal details below: </p>
                        <div class="form-group col-md-6">
                            <label class="control-label visible-ie8 visible-ie9">First Name</label>
                            <input class="form-control placeholder-no-fix" type="text" placeholder="First Name" name="FName" value="@{{FName}}" ng-model="client.FName" ng-required="true" /> </div>
                        <div class="form-group col-md-6">
                            <label class="control-label visible-ie8 visible-ie9">Last Name</label>
                            <input class="form-control placeholder-no-fix" type="text" placeholder="Last Name" name="LName" value="@{{LName}}" ng-model="client.LName" ng-required="true" /> </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                            <label class="control-label visible-ie8 visible-ie9">Email</label>
                            <input class="form-control placeholder-no-fix" type="text" placeholder="Email" name="Email" value="@{{Email}}" ng-model="client.Email" id="email" ng-required="true" /> 
                            <span style="display:none;color:red;font-weight:bold;" id="emailerrormsg">Enter valid email address!</span>
                        </div>
                        <div class="form-group col-md-6">    
                            <div>
                                 <input class="form-control" id="mask_phone" type="text" placeholder="Phone" name="PhoneNo" value="@{{PhoneNo}}" ng-model="client.PhoneNo" ng-required="true" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label visible-ie8 visible-ie9">Address</label>
                            <input class="form-control placeholder-no-fix" type="text" placeholder="Address" name="Address" value="@{{Address}}" ng-model="client.Address" ng-required="true"   /> </div>
                        <div class="form-group col-md-6">
                            <label class="control-label visible-ie8 visible-ie9">City/Town</label>
                            <input class="form-control placeholder-no-fix" type="text" placeholder="City/Town" name="City" value="@{{City}}" ng-model="client.City" ng-required="true"   /> </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label visible-ie8 visible-ie9">State</label>
                            <input class="form-control placeholder-no-fix" type="text" placeholder="State" name="State" value="@{{State}}" ng-model="client.State" ng-required="true"   /> </div>
                        <div class="form-group col-md-6">
                            <label class="control-label visible-ie8 visible-ie9">Country</label>
                            <select name="Country" class="form-control" ng-required="true" ng-model="client.Country" >
                                <option value="">Country</option>
                                <option value="AF">Afghanistan</option>
                                <option value="AL">Albania</option>
                                <option value="DZ">Algeria</option>
                                <option value="AS">American Samoa</option>
                                <option value="AD">Andorra</option>
                                <option value="AO">Angola</option>
                                <option value="AI">Anguilla</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armenia</option>
                                <option value="AW">Aruba</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaijan</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrain</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Belarus</option>
                                <option value="BE">Belgium</option>
                                <option value="BZ">Belize</option>
                                <option value="BJ">Benin</option>
                                <option value="BM">Bermuda</option>
                                <option value="BT">Bhutan</option>
                                <option value="BO">Bolivia</option>
                                <option value="BA">Bosnia and Herzegowina</option>
                                <option value="BW">Botswana</option>
                                <option value="BV">Bouvet Island</option>
                                <option value="BR">Brazil</option>
                                <option value="IO">British Indian Ocean Territory</option>
                                <option value="BN">Brunei Darussalam</option>
                                <option value="BG">Bulgaria</option>
                                <option value="BF">Burkina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="KH">Cambodia</option>
                                <option value="CM">Cameroon</option>
                                <option value="CA">Canada</option>
                                <option value="CV">Cape Verde</option>
                                <option value="KY">Cayman Islands</option>
                                <option value="CF">Central African Republic</option>
                                <option value="TD">Chad</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CX">Christmas Island</option>
                                <option value="CC">Cocos (Keeling) Islands</option>
                                <option value="CO">Colombia</option>
                                <option value="KM">Comoros</option>
                                <option value="CG">Congo</option>
                                <option value="CD">Congo, the Democratic Republic of the</option>
                                <option value="CK">Cook Islands</option>
                                <option value="CR">Costa Rica</option>
                                <option value="CI">Cote d'Ivoire</option>
                                <option value="HR">Croatia (Hrvatska)</option>
                                <option value="CU">Cuba</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="DK">Denmark</option>
                                <option value="DJ">Djibouti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">Dominican Republic</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egypt</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Equatorial Guinea</option>
                                <option value="ER">Eritrea</option>
                                <option value="EE">Estonia</option>
                                <option value="ET">Ethiopia</option>
                                <option value="FK">Falkland Islands (Malvinas)</option>
                                <option value="FO">Faroe Islands</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="GF">French Guiana</option>
                                <option value="PF">French Polynesia</option>
                                <option value="TF">French Southern Territories</option>
                                <option value="GA">Gabon</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Germany</option>
                                <option value="GH">Ghana</option>
                                <option value="GI">Gibraltar</option>
                                <option value="GR">Greece</option>
                                <option value="GL">Greenland</option>
                                <option value="GD">Grenada</option>
                                <option value="GP">Guadeloupe</option>
                                <option value="GU">Guam</option>
                                <option value="GT">Guatemala</option>
                                <option value="GN">Guinea</option>
                                <option value="GW">Guinea-Bissau</option>
                                <option value="GY">Guyana</option>
                                <option value="HT">Haiti</option>
                                <option value="HM">Heard and Mc Donald Islands</option>
                                <option value="VA">Holy See (Vatican City State)</option>
                                <option value="HN">Honduras</option>
                                <option value="HK">Hong Kong</option>
                                <option value="HU">Hungary</option>
                                <option value="IS">Iceland</option>
                                <option value="IN">India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IR">Iran (Islamic Republic of)</option>
                                <option value="IQ">Iraq</option>
                                <option value="IE">Ireland</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Italy</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japan</option>
                                <option value="JO">Jordan</option>
                                <option value="KZ">Kazakhstan</option>
                                <option value="KE">Kenya</option>
                                <option value="KI">Kiribati</option>
                                <option value="KP">Korea, Democratic People's Republic of</option>
                                <option value="KR">Korea, Republic of</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kyrgyzstan</option>
                                <option value="LA">Lao People's Democratic Republic</option>
                                <option value="LV">Latvia</option>
                                <option value="LB">Lebanon</option>
                                <option value="LS">Lesotho</option>
                                <option value="LR">Liberia</option>
                                <option value="LY">Libyan Arab Jamahiriya</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MO">Macau</option>
                                <option value="MK">Macedonia, The Former Yugoslav Republic of</option>
                                <option value="MG">Madagascar</option>
                                <option value="MW">Malawi</option>
                                <option value="MY">Malaysia</option>
                                <option value="MV">Maldives</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Marshall Islands</option>
                                <option value="MQ">Martinique</option>
                                <option value="MR">Mauritania</option>
                                <option value="MU">Mauritius</option>
                                <option value="YT">Mayotte</option>
                                <option value="MX">Mexico</option>
                                <option value="FM">Micronesia, Federated States of</option>
                                <option value="MD">Moldova, Republic of</option>
                                <option value="MC">Monaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="MS">Montserrat</option>
                                <option value="MA">Morocco</option>
                                <option value="MZ">Mozambique</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Namibia</option>
                                <option value="NR">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Netherlands</option>
                                <option value="AN">Netherlands Antilles</option>
                                <option value="NC">New Caledonia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NE">Niger</option>
                                <option value="NG">Nigeria</option>
                                <option value="NU">Niue</option>
                                <option value="NF">Norfolk Island</option>
                                <option value="MP">Northern Mariana Islands</option>
                                <option value="NO">Norway</option>
                                <option value="OM">Oman</option>
                                <option value="PK">Pakistan</option>
                                <option value="PW">Palau</option>
                                <option value="PA">Panama</option>
                                <option value="PG">Papua New Guinea</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Philippines</option>
                                <option value="PN">Pitcairn</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="QA">Qatar</option>
                                <option value="RE">Reunion</option>
                                <option value="RO">Romania</option>
                                <option value="RU">Russian Federation</option>
                                <option value="RW">Rwanda</option>
                                <option value="KN">Saint Kitts and Nevis</option>
                                <option value="LC">Saint LUCIA</option>
                                <option value="VC">Saint Vincent and the Grenadines</option>
                                <option value="WS">Samoa</option>
                                <option value="SM">San Marino</option>
                                <option value="ST">Sao Tome and Principe</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="SN">Senegal</option>
                                <option value="SC">Seychelles</option>
                                <option value="SL">Sierra Leone</option>
                                <option value="SG">Singapore</option>
                                <option value="SK">Slovakia (Slovak Republic)</option>
                                <option value="SI">Slovenia</option>
                                <option value="SB">Solomon Islands</option>
                                <option value="SO">Somalia</option>
                                <option value="ZA">South Africa</option>
                                <option value="GS">South Georgia and the South Sandwich Islands</option>
                                <option value="ES">Spain</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SH">St. Helena</option>
                                <option value="PM">St. Pierre and Miquelon</option>
                                <option value="SD">Sudan</option>
                                <option value="SR">Suriname</option>
                                <option value="SJ">Svalbard and Jan Mayen Islands</option>
                                <option value="SZ">Swaziland</option>
                                <option value="SE">Sweden</option>
                                <option value="CH">Switzerland</option>
                                <option value="SY">Syrian Arab Republic</option>
                                <option value="TW">Taiwan, Province of China</option>
                                <option value="TJ">Tajikistan</option>
                                <option value="TZ">Tanzania, United Republic of</option>
                                <option value="TH">Thailand</option>
                                <option value="TG">Togo</option>
                                <option value="TK">Tokelau</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad and Tobago</option>
                                <option value="TN">Tunisia</option>
                                <option value="TR">Turkey</option>
                                <option value="TM">Turkmenistan</option>
                                <option value="TC">Turks and Caicos Islands</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ukraine</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="UM">United States Minor Outlying Islands</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistan</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VE">Venezuela</option>
                                <option value="VN">Viet Nam</option>
                                <option value="VG">Virgin Islands (British)</option>
                                <option value="VI">Virgin Islands (U.S.)</option>
                                <option value="WF">Wallis and Futuna Islands</option>
                                <option value="EH">Western Sahara</option>
                                <option value="YE">Yemen</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabwe</option>
                            </select>
                        </div>
                        <button type="button" id="" class="btn btn-default pers-next pull-right">Next</button>
                        </div>
                    </div>
                        <div id="organization-details">
                            <div class="row">

                                <div class="col-md-offset-1 col-md-5">
                                    <div class="form-group">
                                        <label class="control-label hint">Organization</label>
                                        <select class="form-control" name="organizationTypes" ng-required="true"  ng-model="client.orgID" >
                                            <option ng-repeat="organization in organizations" value="@{{ organization.id }}">@{{ organization.Name }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label hint">Subscription Package</label>
                                         <select class="form-control" name="Subscription" ng-required="true"  ng-model="client.PackID" >
                                            <option ng-repeat="subscription in subscriptions" value="@{{ subscription.id }}">@{{ subscription.Name }}</option>
                                        </select>
                                    </div>
                                    
                                    
                                </div>
                            <div class="col-md-offset-1 col-md-5">
                                <label class="control-label hint">Logo</label>
                                    <div class="form-group">
                                        
                                        <div class="col-md-12">
                                            <div class="fileinput fileinput-new" data-provides="fileinput" id="imageDiv">
                                                <div class="fileinput-new thumbnail" id="imagesection" style="width: 200px; height: 150px;">
                                                    <img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=no+image" alt="" /> 
                                                </div>
                                                <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"> 
                                                </div>
                                                <div>
                                                    <span class="btn default btn-file">
                                                        <span class="fileinput-new"> Select image </span>
                                                        <span class="fileinput-exists"> Change </span>
                                                        <input type="file" file-input="files"> 
                                                    </span>
                                                    <a href="javascript:;" class="btn red fileinput-exists" data-dismiss="fileinput"> Remove </a>
                                                </div>
                                            </div>
                                         </div>
                                    </div>
                            </div>
                        </div>
                        <div id="org-btn-panel">
                            <button type="button" id="" class="btn btn-default org-back">Back</button>
                            <button type="button" id="" class="btn btn-default org-next pull-right">Next</button>
                        </div>
                    </div>
                        <div id="account-details"> 
                        <div class="row">
                            <div class="col-md-8 col-xs-12 col-md-offset-2">
                            <p class="hint"> Enter your account details below: </p>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                            <label class="control-label hint">Password</label>
                                            <input class="form-control placeholder-no-fix" type="password" id="password" autocomplete="off" placeholder="Password" name="password" value="@{{Password}}" ng-model="client.Password" ng-required="true" /><span style="display:none;color:red;font-weight:bold;" id="passwordErrorMsg1">Password length must be greater than 6 or equal to 6!</span> 
                                    </div>
                                </div> 
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label hint">Confirm Password</label>
                                        <input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="Re-type Your Password" id="repassword" name="password_confirmation" /> <span style="display:none;color:red;font-weight:bold;" id="passwordErrorMsg">Password fields doesn't match!</span> 
                                    </div>
                                </div>
                            </div>
                           
                            <div class="row">
                                <div class="col-md-6">
                                    <div class='form-group'>
                                        <div class='form-group card required'>
                                            <label class='control-label hint'>Card Number</label> <input
                                            autocomplete='off' name="number" class='form-control card-number' size='16'
                                            type='text'>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class='form-group'>
                                        <div class='form-group cvc required'>
                                            <label class='control-label hint'>CVC</label> <input
                                            autocomplete='off' class='form-control card-cvc'
                                            placeholder='ex. 311' size='4' type='text'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div class="form-group">
                                <label class='control-label hint'>Expiration</label> 
                                <div class='form-group expiration required'>
                                    <div class="row">
                                        <div class="col-md-6 col-xs-6">
                                            <input
                                            class='form-control card-expiry-month' placeholder='MM' size='2'
                                            type='text'>
                                        </div>
                                        <div class="col-md-6 col-xs-6">
                                            <input
                                            class='form-control card-expiry-year' placeholder='YYYY'
                                            size='4' type='text'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group margin-top-20 margin-bottom-20">
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" id="termscheckbox" name="tnc" /> I agree to the
                                    <a href="javascript:;">Terms of Service </a> &
                                    <a href="javascript:;">Privacy Policy </a>
                                    <span></span>
                                </label>
                                <div id="register_tnc_error"> </div>
                            </div>
                            
                            <div class="form-actions">
                            <span style="display:none;color:red;font-weight:bold;" id="errorMsg">Please accept our terms and conditions in order to proceed!</span>
                                <button type="button" id="register-back-btn" class="btn btn-default acct-back">Back</button>
                                <button type='submit' class="submit btn red uppercase pull-right submit-button">Submit</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class='form-row'>
                             <div class="alert alert-danger alert-dismissable" id="payerror" style="display: none">
                              <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                 ×
                              </button>
                              <h4><i class="icon fa fa-ban"></i> Error!</h4>
                              <span class="payment-errors"></span>
                            </div>
                        </div>
                    </form>
                </div>
            <!-- END REGISTRATION FORM -->
        </div>
        <div class="copyright hide"> 2017 © Prescribe Diets</div>
        </div>
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
        <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/jquery.input-ip-address-control-1.0.min.js') ?>" type="text/javascript"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="<?= asset('assets/global/scripts/app.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/scripts/register.js') ?>" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
         <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="<?= asset('assets/layouts/layout3/scripts/layout.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/layout3/scripts/demo.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/global/scripts/quick-sidebar.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/layouts/global/scripts/quick-nav.min.js') ?>" type="text/javascript"></script>
        <!-- END THEME LAYOUT SCRIPTS -->
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
        <!-- END PAGE LEVEL SCRIPTS -->
        
        <!-- Load Javascript Libraries (AngularJS, JQuery, Bootstrap) -->
        <script src="<?= asset('app/lib/angular/angular.min.js') ?>"></script>
        <script src="<?= asset('js/jquery.min.js') ?>"></script>
        <script src="<?= asset('js/bootstrap.min.js') ?>"></script>

        <!-- AngularJS Application Scripts -->
        <script src="<?= asset('app/app.js') ?>"></script>

        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="<?= asset('app/controllers/clientController.js') ?>"></script>
        <!-- END THEME LAYOUT SCRIPTS -->

        <!--START STRIPE SCRIPT-->
        <script src='https://js.stripe.com/v2/' type='text/javascript'></script>
        <!--END STRIPE SCRIPT-->

        


    </body>
</html>