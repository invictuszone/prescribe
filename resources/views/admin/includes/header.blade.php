                    <div class="page-header">
                        <!-- BEGIN HEADER TOP -->
                        <div class="page-header-top">
                            <div class="container">
                                <!-- BEGIN LOGO -->
                                <div class="page-logo">
                                    <a  href="{{ url('admin/dashboard') }}">
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
                                                    <a href="{{ url('admin/account') }}">
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
                                            <a href="{{ url('admin/dashboard') }}"> Dashboard</a>
                                        </li>
                                        @if ($active_page == 'staff')
											<li class="active">
										@else
											<li>
										@endif
                                            <a href="{{ url('admin/staff') }}"> Manage Staff</a>
                                        </li>
                                        @if ($active_page == 'roles')
											<li class="active">
										@else
											<li>
										@endif
                                            <a href="{{ url('admin/roles') }}"> Staff Privileges</a>
                                        </li>
                                        @if ($active_page == 'integrations')
											<li class="active">
										@else
											<li>
										@endif
                                            <a href="{{ url('admin/integrations') }}"> Integrations</a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- END MEGA MENU -->
                            </div>
                        </div>
                        <!-- END HEADER MENU -->
                    </div>
                    <!-- END HEADER -->
