@extends('user_template', ['active_page' => 'diettype'])

@section('css-includes')
  <link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
  <link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
  <link href="<?= asset('assets/global/plugins/select2/css/select2.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/select2/css/select2-bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
  <style>
    .form .form-body, .portlet-form .form-body {
      padding-bottom: 0px !important;
    }
    .form-group {
      margin-bottom: 5px;
    }
    .list-group-item {
      padding: 5px 15px;
    }
    .slimScrollBar{
      background-color: #67809f !important;
    }
  </style>
@endsection

@section('js-includes')
    <script src="<?= asset('assets/global/plugins/jquery-ui/jquery-ui.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/select2/js/select2.full.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/list.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/datatables/datatables.min.js') ?>" type="text/javascript"></script>
@endsection

@section('js-scripts')
  <script src="<?= asset('app/controllers/UserDietTypesController.js') ?>"></script>
  <script>
      $(document).ready(function(){
          $('#pleaseWaitModal').modal('show');
      });
  </script>
@endsection

@section('content')
<div ng-controller="DietypeController">
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
      <a href="{{ url('user/dashboard') }}">Home</a>
      <i class="fa fa-circle"></i>
    </li>
    <li>
      <span>Diet Types</span>
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

                <span class="caption-subject font-blue-hoki sbold uppercase">Diet Types</span>
              </div>
              <div class="actions">
                <a ng-click="Toggle('add', 0)" class="btn btn-circle btn-default"><i class="fa fa-plus"></i> Add </a>
              </div>
            </div>
            <div class="portlet-body">
              <table class="table table-striped table-hover table-bordered responsive" id="table-diet-list">
                <thead>
                  <tr>
                    <!-- <th> Seq. </th> -->
                    <th> Name </th>
                    <!-- <th> Type </th> -->
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr ng-repeat="diettype in diettypes" id="DR-@{{ diettype.id }}">
                    <!-- <td>  @{{ $index + 1 }} </td> -->
                    <td> @{{ diettype.Name }}</td>
                    <!-- <td> @{{ diettype.Type }} </td> -->
                    <td>
<a href="javascript:;" class="btn btn-icon-only blue-hoki visible-xs" ng-click="Toggle('edit', diettype.id)">
                                                                                            <i class="fa fa-edit"></i>
                                                                                        </a>
                      <a href="javascript:;" ng-click="Toggle('edit', diettype.id)" class="blue-hoki hidden-xs">
                                                <i class="fa fa-edit font-blue-hoki"></i>
                                            </a>
<a href="javascript:;" class="btn btn-icon-only red-soft visible-xs" ng-click="confirmDelete(diettype.id)">
                                                                                            <i class="fa fa-remove"></i>
                                                                                        </a>
                      <a href="javascript:;" ng-click="confirmDelete(diettype.id)" class="red-soft hidden-xs">
                                                <i class="fa fa-remove font-red-soft"></i>
                                            </a>
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
  <!-- END PAGE CONTENT INNER -->
  <div id="DietTypeModal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog  modal-full">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">@{{ form_title }}</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-body">
                                <form role="form" name="frmDiet" novalidate="">
                                    <div class="form-group">
                                        <label class="control-label">Diet Name</label>
                                        <input type="text" class="form-control" name="Name" placeholder="Enter Diet Name" value="@{{ Name }}"
                                        ng-model="DietType.Name" ng-required="true">
                                        <span class="help-inline"
                                        ng-show="frmDiet.Name.$invalid && frmDiet.Name.$touched">Field is required</span>
                                    </div>
                                </form>

                                    <div class="form-group" id="diet-select2">
                                        <label for="single" class="control-label">Sub Types</label>
                                        <select id="dietselect2" class="form-control selectDietType"  multiple   style="width: 100%">
                                            <option></option>
                                            <option class="diet-selection" ng-repeat="DietType in diettypes" id="DOpt-@{{ DietType.id }}" value="@{{ DietType.id }}">@{{ DietType.Name }}</option>
                                        </select>
                                        <span class="help-block">When this diet type is selected, these sub types are also selected.</span>
                                    </div>

                                    <div class="form-group" style="Display:none" ng-init="DietType.Type='Exclusion'">
                                        <label class="control-label">Filter Type</label>
                                        <div class="mt-radio-list" style="padding:0px 0px">
                                            <label class="mt-radio">
                                                <input type="radio" name="optionsRadios" id="optionsRadios4" value="Exclusion" ng-model="DietType.Type"> Exclusion (Exclude foods selected in final list)
                                                <span></span>
                                            </label>
                                            <label class="mt-radio">
                                                <input type="radio" name="optionsRadios" id="optionsRadios5" value="Inclusion" ng-model="DietType.Type"> Inclusion (Include only foods selected in final list)
                                                <span></span>
                                            </label>
                                        </div>
                                    </div>
                                    

                                </div>
                                
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" id="cat-select2">
                                        <label for="single" class="control-label">Categories</label>
                                        <select id="single" class="form-control selectCatagory"  multiple  style="width: 100%">
                                            <option></option>
                                            <option ng-repeat="Category in categories" id="CatOpt-@{{ Category.id }}" value="@{{ Category.id }}">@{{ Category.Name }}</option>
                                        </select>
                                    </div>
<div class="form-group" id="char-select2">
                                        <label for="single" class="control-label">Characteristics</label>
                                        <select id="single" class="form-control selectCharacteristic"  multiple  style="width: 100%">
                                            <option></option>
                                            <option ng-repeat="Characteristic in characteristics" id="CharOpt-@{{ Characteristic.id }}" value="@{{ Characteristic.id }}">@{{ Characteristic.Name }}</option>
                                        </select>
                                    </div>
                            
                            

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div id="food-items" class="col-md-11 diet-food-items">
                            <!--    <div class="panel-heading">
                                    Final Food List (<span class="selectCount">0</span> selected)
                                    <button type="button" ng-click="toggleAllFoods()" class="btn green-haze col-md-offset-1 col-xs-offset-8">Select All</button>
                                </div> -->
                                <div class="form-group">
                                    <select  class="form-control select2-diet-types-panel"  id="item-select" multiple  style="width: 100%">
                                        <option></option>
                                        <option ng-repeat="fooditem in fooditems" id="item-@{{ fooditem.id }}" value="@{{ fooditem.id }}">@{{ fooditem.Name }}</option>
                                    </select>
                                </div>
                             </div>

                            <div class="col-md-1"><button class="btn btn-sm green-haze clear-all">Clear All</button></div>
                        </div>  
                      
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
                    <button type="button" class="btn blue-hoki" id="btn-save" ng-click="frmDiet.$valid && save(modalstate, id)" ng-disabled="frmDiet.$invalid">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
