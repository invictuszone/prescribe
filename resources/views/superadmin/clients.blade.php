@extends('superadmin_template', ['active_page' => 'clients'])

@section('css-includes')
<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
@endsection

@section('js-includes')
<script  src="<?= asset('assets/global/scripts/datatable.js') ?>" type="text/javascript"></script>
<script  src="<?= asset('assets/global/plugins/datatables/datatables.min.js') ?>" type="text/javascript"></script>
<script  src="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js') ?>" type="text/javascript"></script>
<script src="<?= asset('assets/pages/scripts/table-datatables-buttons.min.js') ?>" type="text/javascript"></script>
<script src="<?= asset('assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js') ?>" type="text/javascript"></script>
<script src="<?= asset('app/controllers/ClientsController.js') ?>"></script>

@endsection

@section('js-scripts')

@endsection

@section('content')
<div  ng-controller="clientsController">
  <!-- BEGIN PAGE BREADCRUMBS -->
  <ul class="page-breadcrumb breadcrumb">
    <li>
      <a href="{{ url('superadmin/dashboard') }}" >Home</a>
      <i class="fa fa-circle"></i>
    </li>
    <li>
      <span>Clients</span>
    </li>
  </ul>
  <!-- END PAGE BREADCRUMBS -->
  <!-- BEGIN PAGE CONTENT INNER -->
  <div class="page-content-inner">
    <div class="mt-content-body">
      <div class="row">
        <div class="col-md-12">
          <!-- BEGIN EXAMPLE TABLE PORTLET-->
          <div class="portlet light portlet-fit ">
            <div class="portlet-title">
              <div class="caption">
                
                <span class="caption-subject font-blue-hoki sbold uppercase">Clients List</span>
              </div>
              
            </div>
                        <div class="portlet-body">
                          <table class="table table-striped table-hover table-bordered responsive" id="client-table">
                            <thead>
                              <tr>
                                <th> Name </th>
                                <th> Organization </th>
                                <th> Package </th>
                                <!-- <th> Edit </th> -->
                                <th class="all"> Delete </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr ng-repeat="client in clients">
                                <td> @{{ client.FName }} @{{ client.LName }} </td>
                                <td> @{{ client.orgName }} </td>
                                <td> @{{ client.packName }} </td>
                                <!-- <td>
                                <a class="edit" href="javascript:;"> Edit </a>
                                </td> -->
                                <td>
                                  <a class="delete" ng-click="confirmDelete(client.id)" href="javascript:;"> Delete </a>
                                </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                  </div>
                </div>
              </div>
            </div>
          </div>
         

          <!-- END PAGE CONTENT INNER -->
          @endsection
