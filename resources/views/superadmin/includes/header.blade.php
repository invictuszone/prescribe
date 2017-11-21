                    <div class="page-header">
                        <!-- BEGIN HEADER TOP -->
                        <div class="page-header-top">
                            <div class="container">
                                <!-- BEGIN LOGO -->
                                <div class="page-logo">
                                    <a  href="{{ url('superadmin/dashboard') }}">
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
                                        <!-- BEGIN USER LOGIN DROPDOWN -->
                                        <li class="dropdown dropdown-user">
                                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">

                                                <span class="username">{{ Auth::user()->fname }} {{ Auth::user()->lname }}</span>
                                            </a>
                                            <ul class="dropdown-menu dropdown-menu-default">
                                                <li>
                                                    <a href="{{ url('superadmin/account') }}">
                                                        <i class="icon-user"></i> My Profile </a>
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
                                        <!-- END USER LOGIN DROPDOWN -->
                                    </ul>
                                </div>
                                <!-- END TOP NAVIGATION MENU -->
                            </div>
                        </div>
                        <!-- END HEADER TOP -->
                        <!-- BEGIN HEADER MENU -->
                        <div class="page-header-menu">
                            <div class="container">
                                <!-- BEGIN MEGA MENU -->
                                <div class="hor-menu  ">
                                    <ul class="nav navbar-nav">
                                        @if ($active_page == 'dashboard')
                                            <li class="active">
                                        @else
                                            <li>
                                        @endif
                                            <a href="{{ url('superadmin/dashboard') }}"> Dashboard</a>
                                        </li>
                                        @if ($active_page == 'clients')
                                            <li class="active">
                                        @else
                                            <li>
                                        @endif
                                            <a href="{{ url('superadmin/clients') }}"> Clients</a>
                                        </li>
                                        @if ($active_page == 'sub_packages')
                                            <!-- <li class="active"> -->
                                            <li aria-haspopup="true" class="menu-dropdown classic-menu-dropdown active">
                                        @else
                                            <li aria-haspopup="true" class="menu-dropdown classic-menu-dropdown ">
                                        @endif
                                            <a href="javascript:;"> System Preferences
                                                <span class="arrow"></span>
                                            </a>
                                            <ul class="dropdown-menu pull-left">
                                                <li aria-haspopup="true" class=" ">
                                                    <a href="{{ url('superadmin/sub_packages') }}" class="nav-link  ">
                                                       Subscription Packages

                                                    </a>
                                                </li>
                                                <li aria-haspopup="true" class=" ">
                                                                    <a href="{{ url('superadmin/organization') }}" class="nav-link  ">
                                                                      Organizations

                                                                   </a>
                                                </li>
                                            </ul>
                                            </li>
                                        </li>
                                        @if ($active_page == 'dataset')
                                            <li aria-haspopup="true" class="menu-dropdown classic-menu-dropdown active">
                                         @else
                                            <li aria-haspopup="true" class="menu-dropdown classic-menu-dropdown ">
                                        @endif
                                            <a href="javascript:;"> Initialization Dataset
                                                <span class="arrow"></span>
                                            </a>
                                            <ul class="dropdown-menu pull-left">
                                                <li aria-haspopup="true" class=" ">
                                                    <a href="{{ url('superadmin/panel ') }}" class="nav-link  ">
                                                       Food Panels

                                                    </a>
                                                </li>
                                                <li aria-haspopup="true" class=" ">
                                                    <a  href="{{ url('superadmin/fooditems ') }}"  class="nav-link ">
                                                        Food Items </a>
                                                </li>
                                                <li aria-haspopup="true" class=" ">
                                                    <a  href="{{ url('superadmin/catagories') }}"  class="nav-link ">
                                                        Categories and Characteristics</a>
                                                </li>
                                                <li aria-haspopup="true" class=" ">
                                                    <a  href="{{ url('superadmin/diettype') }}"  class="nav-link ">
                                                        Diet Types </a>
                                                </li>
                                                <li aria-haspopup="true" class=" ">
                                                    <a  href="{{ url('superadmin/recipies') }}"  class="nav-link ">
                                                        Recipes </a>
                                                </li>
                                                <li aria-haspopup="true" class=" ">
                                                    <a  href="{{ url('superadmin/units') }}"  class="nav-link ">
                                                        System Settings </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <!-- END MEGA MENU -->
                            </div>
                        </div>
                        <!-- END HEADER MENU -->
                    </div>
                    <!-- END HEADER -->
