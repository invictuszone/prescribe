                    <div class="page-header">
                        <!-- BEGIN HEADER TOP -->
                        <div class="page-header-top">
                            <div class="container">
                                <!-- BEGIN LOGO -->
                                <div class="page-logo">
                                    <a href="{{ url('user/dashboard') }}">
                                        <img src="<?= asset('assets/layouts/layout3/img/logo-default.png') ?>" alt="logo"  class="logo-size">
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
                                                <span class="username">{{ Auth::user()->FName }} {{ Auth::user()->LName }}</span>
                                            </a>
                                            <ul class="dropdown-menu dropdown-menu-default">
                                                <li>
                                                    <a href="{{ url('user/account') }}">
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
                                            <a href="{{ url('user/dashboard') }}"> Dashboard</a>
                                        </li>
                                        @if ($active_page == 'prescribe')
											<li class="active">
										@else
											<li>
										@endif
                                            <a href="{{ url('user/prescribe') }}"  onclick="location.reload();"> Prescribe Diets</a>
                                        @if ($active_page == 'panel')
											<li class="active">
										@else
											<li>
										@endif
                                            <a href="{{ url('user/panel') }}" > Food Panels</a>
                                        </li>
                                        @if ($active_page == 'fooditems')
											<li class="active">
										@else
											<li>
										@endif
                                            <a href="{{ url('user/fooditems') }}" > Food Items</a>
                                        </li>
                                        @if ($active_page == 'catagories')
											<li class="active">
										@else
											<li>
										@endif
                                            <a href="{{ url('user/catagories') }}">Categories and Characteristics</a>
                                        </li>
                                        @if ($active_page == 'diettype')
											<li class="active">
										@else
											<li>
										@endif
                                            <a href="{{ url('user/diettype') }}" > Diet Types </a>
                                        </li>
                                        @if ($active_page == 'recipies')
											<li class="active">
										@else
											<li aria-haspopup="true" class="menu-dropdown classic-menu-dropdown ">
										@endif
                                            <a href="{{ url('user/recipies') }}"> Recipes</a>
                                        </li>
                                        @if ($active_page == 'units')
                                            <li class="active">
                                        @else
                                            <li>
                                        @endif
                                            <a href="{{ url('user/units') }}" > System Settings </a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- END MEGA MENU -->
                            </div>
                        </div>
                        <!-- END HEADER MENU -->
                    </div>
                    <!-- END HEADER -->
