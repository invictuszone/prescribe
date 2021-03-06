@extends('user_template', ['active_page' => 'dashboard'])

@section('css-includes')
    <link href="<?= asset('assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/morris/morris.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/fullcalendar/fullcalendar.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/jqvmap/jqvmap/jqvmap.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/responsive/1.0.6/css/dataTables.responsive.css">

@endsection

@section('js-includes')
  <script src="<?= asset('assets/global/plugins/moment.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/morris/morris.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/morris/raphael-min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/fullcalendar/fullcalendar.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/flot/jquery.flot.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/flot/jquery.flot.resize.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/flot/jquery.flot.categories.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/jquery-easypiechart/jquery.easypiechart.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/jquery.sparkline.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/jqvmap/jqvmap/jquery.vmap.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.russia.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.world.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.europe.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.germany.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.usa.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/jqvmap/jqvmap/data/jquery.vmap.sampledata.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/counterup/jquery.waypoints.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/counterup/jquery.counterupUserDashboard.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/datatables/datatables.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/scripts/jspdf.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/scripts/jspdf.plugin.autotable.js') ?>" type="text/javascript"></script>

  <script src="<?= asset('assets/images/logoBase64.js') ?>" type="text/javascript"></script>
    <script type="text/javascript" src="//cdn.datatables.net/responsive/1.0.6/js/dataTables.responsive.min.js"></script>

@endsection

@section('js-scripts')
    <script src="<?= asset('assets/pages/scripts/dashboard.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('app/controllers/UserDashboardController.js') ?>"></script>
    <script>
        $(document).ready(function(){
            $('#pleaseWaitModal').modal('show');
        });

    </script>
@endsection

@section('content')
<div ng-controller="dashboardController">
  <!-- Ajax Loader -->
  <div class="modal" id="pleaseWaitModal" data-backdrop="static" data-keyboard="false">
    <div class="modal-head">

    </div>
    <div class="modal-body">
        <div id="ajax_loader">
            <img src="<?= asset('assets/layouts/layout3/img/ajax-loader.gif') ?>" style="display: block; margin-left: auto; margin-right: auto; margin-top:150px;" width="90px">
        </div>
    </div>
</div>
  <!-- BEGIN PAGE BREADCRUMBS -->
  <ul class="page-breadcrumb breadcrumb">
    <li>
      <a href="dashboard">Home</a>
      <i class="fa fa-circle"></i>
    </li>
    <li>
      <span>Dashboard</span>
    </li>
  </ul>
  <!-- END PAGE BREADCRUMBS -->
  <!-- BEGIN PAGE CONTENT INNER -->
  <div class="page-content-inner">
    <div class="mt-content-body">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="portlet light ">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="icon-bubble font-dark hide"></i>
                                <span class="caption-subject font-green-steel bold uppercase">Recent Patients</span>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="row">
                                <div class="col-md-2 col-sm-3" ng-repeat="Patient in Patients | orderBy:'id':true | limitTo: 6" id="PDiv-@{{ Patient.id }}">

                                  <!-- reverse -->
                                    <!--begin: widget 1-1 -->
                                    <div class="mt-widget-1">

                                        <div class="mt-img" ng-if="Patient.image != 'avatar.png' && Patient.image != 'NULL'">
                                            <img src="<?= asset('assets/images/patients/{{ Patient.id }}/{{ Patient.image }}') ?>" style="width:80px; height:80px" />
                                        </div>
                                        <div class="mt-img" ng-if="Patient.image == 'avatar.png' || Patient.image == 'NULL'">
                                            <img src="<?= asset('assets/images/avatar.png') ?>" style="width:80px; height:80px" />
                                        </div>
                                        <div class="mt-body">

                                            <h3 class="mt-username" data-toggle="tooltip" data-container="body" data-placement="top" title="@{{ Patient.fname }} @{{ Patient.lname }}" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">@{{ Patient.fname }} <br> @{{ Patient.lname }}</h3>

                                            <a ng-href="/user/prescribe#/patient?pid=@{{ Patient.id }}" class="btn blue-hoki recent-patient-btns">
                                              <!-- <a ng-click="prescribe(Patient.id)" class="btn blue-hoki recent-patient-btns"></a> -->
                                              <!-- <a ng-href="/user/prescribe?pid=1" class="btn blue-hoki recent-patient-btns"></a> -->
                                              Prescribe
                                            </a>

                                        </div>
                                    </div>
                                    <!--end: widget 1-1 -->
                                </div>

                             </div>
                            </div>
                        </div>
                    </div>
                </div>

            <div class="row">

            </div>
      <div class="row">
        <div class="col-md-8 col-sm-12">
          <div class="portlet light ">
            <div class="portlet-title">
              <div class="caption caption-md">
                <i class="icon-bar-chart font-dark hide"></i>
                <span class="caption-subject font-green-steel bold uppercase">Recent Diets</span>
                <!-- <span class="caption-helper">weekly stats...</span> -->
              </div>
              <!-- <div class="actions">
                <div class="btn-group btn-group-devided" data-toggle="buttons">
                  <label class="btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm active">
                    <input type="radio" name="options" class="toggle" id="option1">Today</label>
                  <label class="btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm">
                    <input type="radio" name="options" class="toggle" id="option2">Week</label>
                  <label class="btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm">
                    <input type="radio" name="options" class="toggle" id="option2">Month</label>
                </div>
              </div> -->
            </div>
            <div class="portlet-body" >

              <div class="table-scrollable table-scrollable-borderless">
                <table class="table table-hover table-light responsive" id="table-patient-list">
                  <thead>
                    <tr class="uppercase">
                      <!--<th> Patient Photo </th>-->
                                                                                        <th class="all"> Patient Name </th>
                      <th> Created At </th>
                      <th> Status </th>
                      <th> Files </th>
                      <th class="all"> Actions </th>
                    </tr>
                  </thead>
                  <tr ng-repeat="Diet in recentDiets" id="PR-@{{ Diet['HistoryFiles'][0].dietprescriptionid }}">
                    <!--<td class="fit">
                      <img class="user-pic rounded" src="<?= asset('assets/images/patients/{{ Diet.pid }}/{{ Diet.image }}') ?>">
                    </td>-->
                    <td>
                      <a ng-href="/user/prescribe#/patient?pid=@{{ Diet.pid }}" class="primary-link">@{{ Diet.fname }} @{{ Diet.lname }}</a>
                    </td>
                    <td> @{{ Diet['HistoryFiles'][0].prescriptionDate }} </td>

                    <td> @{{ Diet['HistoryFiles'][0].Status }} </td>
                    <td>
                      <br>
                      <span title="Legend">
                        <a href="<?= asset('assets/images/patients/legend.pdf') ?>" target="_blank" download>
                          <i class="fa fa-file-pdf-o font-blue-hoki tooltips" data-container="body" data-placement="top" data-original-title="Legend"></i>
                          <label>Legend</label>
                        </a>
                      </span><br>
                      <span ng-repeat="Files in Diet.HistoryFiles" title="@{{Files.filetype}}">
                        <a href="<?= asset('assets/images/patients/{{Diet.pid}}/{{Files.filename}}') ?>" target="_blank" download>
                          <i class="fa fa-file-pdf-o font-blue-hoki tooltips" data-container="body" data-placement="top" data-original-title="Files.filetype"></i>
                          <label>@{{Files.filetype}}</label>
                        </a><br>
                      </span>
                    </td>
                    <td>
                      <span>
                        <a  data-toggle="modal" ng-click="toggleModal(Diet.id)"   class="blue-hokie">
                          <i class="fa fa-comments font-blue-hoki" ></i>
                        </a>
                      </span>
                      <span>
                        <a ng-href="/user/prescribe#/patient?pid=@{{ Diet.pid }}&prescID=@{{ Diet['HistoryFiles'][0].dietprescriptionid }}" target="_blank" class="blue-hoki">
                          <i class="fa  fa-edit font-blue-hoki"></i>
                        </a>
                      </span>
                      <span>
                        <a href="javascript:;" ng-click="confirmDelete(Diet['HistoryFiles'][0].dietprescriptionid)" class="red-soft">
                          <i class="fa fa-remove font-red-soft"></i>
                        </a>
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="dashboard-stat2 ">
                                <div class="display">
                                    <div class="number">
                                        <h3 class="font-green-sharp">
                                            <span class="counter ng-cloak">@{{ CatCount }}</span>
                                        </h3>
                                        <small>Food <br class="hidden-sm" /> Categories</small>
                                    </div>

                                </div>
                                <div class="progress-info">
                                    <div class="progress">
                                        <span style="width: 100%;" class="progress-bar progress-bar-success green-sharp">

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="dashboard-stat2 ">
                                <div class="display">
                                    <div class="number">
                                        <h3 class="font-red-haze">
                                            <span class="counter ng-cloak">@{{ CharCount }}</span>
                                        </h3>
                                        <small>Food Characteristics</small>
                                    </div>

                                </div>
                                <div class="progress-info">
                                    <div class="progress">
                                        <span style="width: 100%;" class="progress-bar progress-bar-success red-haze">

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="dashboard-stat2 ">
                                <div class="display">
                                    <div class="number">
                                        <h3 class="font-blue-sharp">
                                            <span class="counter ng-cloak">@{{ DietCount }}</span>
                                        </h3>
                                        <small>Diet Types</small>
                                    </div>
                                </div>
                                <div class="progress-info">
                                    <div class="progress">
                                        <span style="width: 100%;" class="progress-bar progress-bar-success blue-sharp">

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="dashboard-stat2 ">
                                <div class="display">
                                    <div class="number">
                                        <h3 class="font-green-sharp">
                                            <span class="counter ng-cloak">@{{RecipeCount}}</span>
                                        </h3>
                                        <small>Recipes</small>
                                    </div>

                                </div>
                                <div class="progress-info">
                                    <div class="progress">
                                        <span style="width: 100%;" class="progress-bar progress-bar-success green-sharp">

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="dashboard-stat2 ">
                                <div class="display">
                                    <div class="number">
                                        <h3 class="font-red-haze">
                                            <span class="counter ng-cloak">@{{ FoodCount }}</span>
                                        </h3>
                                        <small>Food Items</small>
                                    </div>

                                </div>
                                <div class="progress-info">
                                    <div class="progress">
                                        <span style="width: 100%;" class="progress-bar progress-bar-success red-haze">

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="dashboard-stat2 ">
                                <div class="display">
                                    <div class="number">
                                        <h3 class="font-blue-sharp">
                                            <span class="counter ng-cloak">@{{ PanelCount }}</span>
                                        </h3>
                                        <small>Food Panels</small>
                                    </div>

                                </div>
                                <div class="progress-info">
                                    <div class="progress">
                                        <span style="width: 100%;" class="progress-bar progress-bar-success blue-sharp">

                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      </div>

            <div class="row widget-row">
                <div class="col-md-3 col-sm-6">
                    <!-- BEGIN WIDGET THUMB -->
                    <div class="widget-thumb widget-bg-color-white text-uppercase margin-bottom-20 ">
                        <h4 class="widget-thumb-heading">Patients</h4>
                        <div class="widget-thumb-wrap">

                            <i class="widget-thumb-icon bg-green fa fa-user" aria-hidden="true"></i>
                            <div class="widget-thumb-body">
                                <span class="widget-thumb-subtitle">This Week</span>
                                <span class="widget-thumb-body-stat counter ng-cloak">@{{ PatientCountWeekly }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- END WIDGET THUMB -->
                </div>
                <div class="col-md-3 col-sm-6">
                    <!-- BEGIN WIDGET THUMB -->
                    <div class="widget-thumb widget-bg-color-white text-uppercase margin-bottom-20 ">
                        <h4 class="widget-thumb-heading">Patients</h4>
                        <div class="widget-thumb-wrap">
                            <i class="widget-thumb-icon bg-blue fa fa-users"></i>
                            <div class="widget-thumb-body">
                                <span class="widget-thumb-subtitle">Total</span>
                                <span class="widget-thumb-body-stat counter ng-cloak">@{{ PatientCount }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- END WIDGET THUMB -->
                </div>
                <div class="col-md-3 col-sm-6">
                    <!-- BEGIN WIDGET THUMB -->
                    <div class="widget-thumb widget-bg-color-white text-uppercase margin-bottom-20 ">
                        <h4 class="widget-thumb-heading">Prescription</h4>
                        <div class="widget-thumb-wrap">
                            <i class="widget-thumb-icon bg-green fa fa-file-text-o" aria-hidden="true"></i>
                            <div class="widget-thumb-body">
                                <span class="widget-thumb-subtitle">This Week</span>
                                <span class="widget-thumb-body-stat counter ng-cloak">@{{ DietPresCountWeekly }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- END WIDGET THUMB -->
                </div>
                <div class="col-md-3 col-sm-6">
                    <!-- BEGIN WIDGET THUMB -->
                    <div class="widget-thumb widget-bg-color-white text-uppercase margin-bottom-20 ">
                        <h4 class="widget-thumb-heading">Prescription</h4>
                        <div class="widget-thumb-wrap">
                            <i class="widget-thumb-icon bg-blue fa fa-files-o"></i>
                            <div class="widget-thumb-body">
                                <span class="widget-thumb-subtitle">Total</span>
                                <span class="widget-thumb-body-stat counter ng-cloak">@{{ DietPresCount }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- END WIDGET THUMB -->
                </div>
            </div>
      </div>
    </div>
  </div>

    <!-- END PAGE CONTENT INNER -->


<div class="modal fade commentmodal" id="commmentModal" tabindex="-1" role="basic" aria-hidden="true" >
                                                            <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                                        <h4 class="modal-title" id="names">Patient Name</h4>
                                                                    </div>
                                                                    <div class="modal-body">
                  <!--          <div class="row">
           <div class="col-md-12">
           <div class="alert alert-success">
                 <label style="font-size:16px; margin-bottom:0px;">Comments</label>
                <label class=" pull-right" id="comment-date" style="font-size:16px; margin-bottom:0px;"><strong></strong> </label>
          </div>
         </div>
       </div>-->
       <div class="row">
         <div class="col-md-12">
           <span>
             <textarea disabled id="pComments" style="width:100%; height:120px; border:none; background-color:#ffffff;"> Comment </textarea>
           </span>
         </div>
       </div>
                                                                                            </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <!-- /.modal-dialog -->
                                                        </div>



@endsection
