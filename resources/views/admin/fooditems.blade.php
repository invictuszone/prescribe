@extends('user_template', ['active_page' => 'fooditems'])

@section('css-includes')
    <link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/select2/css/select2.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/select2/css/select2-bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= asset('assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput-typeahead.css') ?>" rel="stylesheet" type="text/css" />

    <link href="<?= asset('assets/layouts/layout3/css/custom.min.css') ?>" rel="stylesheet" type="text/css" />

    <style>
        .form .form-body, .portlet-form .form-body {
            padding-right: 0px !important;
        }
        .label-info{
            margin-left:5px;
        }
        .list-group-item {
            padding: 5px 15px;
        }
        .slimScrollBar{
            background-color: #67809f !important;
        }
.ingredients{
display:inline-block,
width:250px
height:50px;
}
    </style>
@endsection

@section('js-includes')

    <script src="<?= asset('assets/global/plugins/jquery-ui/jquery-ui.min.js') ?>" type="text/javascript">
 </script>
<script src="<?= asset('assets/global/plugins/shorten-plugin.js') ?>" type="text/javascript">
 </script>
    <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/select2/js/select2.full.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/typeahead/handlebars.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/typeahead/typeahead.bundle.min.js') ?>" type="text/javascript"></script>
    <script src="<?= asset('assets/global/plugins/list.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/datatables/datatables.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/datatables/dataTables.rowReorder.min.js') ?>" type="text/javascript"></script>
        <script src="<?= asset('assets/global/plugins/jquery-repeater/jquery.repeater.js') ?>" type="text/javascript"></script>
                <script src="<?= asset('assets/pages/scripts/form-repeater.min.js') ?>" type="text/javascript"></script>

@endsection

@section('js-scripts')
 <script src="<?= asset('app/controllers/UserFoodItemsController.js') ?>"></script>

 </script>
    <script>
    $(document).ready(function(){
            $('#pleaseWaitModal').modal('show');
    });


$(".more").shorten({
    "showChars" : 30,
    "moreText"  : "See More",
    "lessText"  : "Less",
});
    </script>
@endsection

@section('content')
<div ng-controller="FoodItemsController">
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
            <span>Food Items</span>
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

                                <span class="caption-subject font-blue-hoki sbold uppercase">Food Items </span>
 <span class="caption-helper">Food items are searchable by categories & ingredients</span>
                            </div>
                            <div class="actions">
                                <a ng-click="Toggle('add', 0)" class="btn btn-circle btn-default"><i class="fa fa-plus"></i> Add </a>
              </div>
                        </div>
                        <div class="portlet-body">

                            <table class="table table-striped table-hover table-bordered   table-items-list responsive" id="table-items-list">
                                <thead>
                                    <tr>
                                        <!-- <th> Seq. </th> -->
                                        <th class="all"> Name </th>
                                        <th> Categories </th>
                                                                                  <th> Ingredients </th>
                                        <th class="all"> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="fooditem in fooditems" id="FR-@{{ fooditem.id }}" FID="@{{ fooditem.id }}">
                                        <!-- <td> @{{ fooditem.Order }} </td> -->
                                        <td> @{{ fooditem.Name }} </td>
                                        <td>
                                            <span class="label label-sm label-info" ng-repeat="Category in fooditem.Categories"> @{{ Category.Name }} </span>
                                        </td>
                                        <td >

                                    <div class="more" style="max-width:300px!important; white-space: normal;"  ><span class="ingredients "   ng-repeat="Ing in fooditem.Ingredients"> @{{ Ing.Name }} ,</span></div>
                                        </td>
                                        <td>
                                            <a href="javascript:;" class="btn btn-icon-only blue-hoki visible-xs" ng-click="Toggle('edit', fooditem.id)">
                                                <i class="fa fa-edit"></i>
                                            </a>
                                            <a href="javascript:;" ng-click="Toggle('edit', fooditem.id)" class="blue-hoki hidden-xs">
                                                <i class="fa fa-edit font-blue-hoki"></i>
                                            </a>
                                            <a href="javascript:;" class="btn btn-icon-only red-soft visible-xs" ng-click="confirmDelete(fooditem.id)">
                                                <i class="fa fa-remove"></i>
                                            </a>
                                            <a href="javascript:;" ng-click="confirmDelete(fooditem.id)" class="red-soft hidden-xs">
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
    <div id="FoodItmsModal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">@{{ form_title }}</h4>
                </div>
                <div class="modal-body food-item-modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <form  role="form" name="frmFood" novalidate="">
                                <div class="form-body">
                                    <div class="form-group">
                                        <label class="control-label">Name</label>
                                        <div style="padding-left:0px;">
                                            <input type="text" class="form-control" name="Name" placeholder="Enter Name" value="@{{ Name }}"
                                            ng-model="fooditem.Name" ng-required="true">
                                            <span class="help-inline"
                                            ng-show="frmFood.Name.$invalid && frmFood.Name.$touched">Field is required</span>
                                        </div>
                                    </div>
                                    <!-- <div class="form-group">
                                        <label class="control-label ">AKA</label>
                                        <div style="padding-left:0px;">
                                            <input type="text" class="form-control" placeholder="Also known as .." id="tagsinputValue" data-role="tagsinput" value="@{{ AkaName }}" ng-model="fooditem.AkaName">
                                            <span class="help-block">Other Names for this food.</span>
                                        </div>
                                    </div> -->
                                    <div class="form-group mt-repeater">
                                      <div data-repeater-list="group-c" id="AkaRepeater">
                                        <div data-repeater-item class="mt-repeater-item">
                                          <div class="row mt-repeater-row AkaDIv">
                                            <div class="col-md-5">

                                              <input type="text" placeholder="Alias Name" class="form-control AkaName_Class" />
                                            </div>
                                            <div class="col-md-5">
                                              <label class="mt-checkbox">
                                                <input type="checkbox" id="inlineCheckbox21" class="AkaCheckBox_Class" value="option1"> Show on Food List
                                                <span></span>
                                              </label>
                                            </div>
                                              <div class="col-md-1">
                                                <a href="javascript:;" data-repeater-delete class="btn btn-danger mt-repeater-delete" style="margin-top: 0px!important;">
                                                  <i class="fa fa-close"></i>
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <a href="javascript:;" data-repeater-create class="btn blue-hoki mt-repeater-add">
                                          <i class="fa fa-plus"></i> Add
                                        </a>
                                  </div>

                                </div>
                            </form>
                        </div>
                        <div class="col-md-4">
                            <div id="food-items" >
                                <div class="form-group">
                                    <label class="control-label">Ingredients</label>
                                    <select  class="form-control select2-food-items-panel"  id="Ing-select2" multiple  style="width: 100%">
                                        <option></option>
                                        <option ng-repeat="fooditem in fooditems" id="IngOpt-@{{ fooditem.id }}" value="@{{ fooditem.id }}">@{{ fooditem.Name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4" >

                                <div class="form-group">
                                    <label for="single" class="control-label">Categories</label>
                                    <div style="padding-left:0px;" id="cat-select2">
                                        <select id="single" class="form-control selectCatagory" multiple style="width: 100%">
                                            <option></option>
                                            <option ng-repeat="Category in categories" id="CatOpt-@{{ Category.id }}" value="@{{ Category.id }}">@{{ Category.Name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="single" class="control-label">Characteristics</label>
                                    <div style="padding-left:0px;" id="char-select2">
                                        <select id="single" class="form-control selectCharacteristic"  multiple  style="width: 100%">
                                            <option></option>
                                            <option ng-repeat="Characteristic in characteristics" id="CharOpt-@{{ Characteristic.id }}" value="@{{ Characteristic.id }}">@{{ Characteristic.Name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="single" class="control-label">Diet Types</label>
                                    <div style="padding-left:0px;" id="diet-select2">
                                        <select id="DietSelect" class="form-control selectDietType"  multiple   style="width: 100%">
                                            <option></option>
                                            <option class="diet-selection" ng-repeat="DietType in diettypes" id="DOpt-@{{ DietType.id }}" value="@{{ DietType.id }}" dtname="@{{ DietType.Name }}">@{{ DietType.Name }}<i class="fa fa-check food-items-check"></i></option>
                                        </select>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label class="control-label">URL</label>
                            <input type="text" class="form-control" name="url" value="@{{ Url }}" ng-init="fooditem.Url = '#'" ng-model="fooditem.Url" placeholder="Enter URL" >
                        </div>
                    </div>
<div class="row" style="margin-top: 15px;">
                        <div class="col-md-6">

                            <label class="mt-checkbox"   >
                                <input type="checkbox" id="autoimmuneCheckBox-Food" name="autoimnue" value="immune" >
                                        Triggers Gluten-related Autoimmune Issues                                   <span></span>
                                            </label>
                        </div>
                        <div class="col-md-6">

                            <label class="mt-checkbox"  \>
                                <input type="checkbox" id="comprehensive-Food" name="comprehensive" value="comprehensive" checked >
                                        Show on the Comprehensive and Shopping Lists
                                    <span></span>
                                            </label>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
                    <button type="button" class="btn blue-hoki" id="btn-save" ng-click="frmFood.$valid && save(modalstate, id)" ng-disabled="frmFood.$invalid">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
