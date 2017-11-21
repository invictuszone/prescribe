@extends('user_template', ['active_page' => 'recipies'])

@section('css-includes')
<link href="<?= asset('assets/global/plugins/datatables/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/select2/css/select2.min.css') ?>" rel="stylesheet" type="text/css" />
<link href="<?= asset('assets/global/plugins/select2/css/select2-bootstrap.min.css') ?>" rel="stylesheet" type="text/css" />

<style>
.slimScrollBar{
  background-color: #67809f !important;
}
$(".more").shorten({
  "showChars" : 50,
  "moreText"	: "See More",
  "lessText"	: "Less",
  });

  </style>
  @endsection

  @section('js-includes')
  <script src="<?= asset('assets/global/plugins/jquery-ui/jquery-ui.min.js') ?>" type="text/javascript">
  </script>
  <script src="<?= asset('assets/global/plugins/select2/js/select2.full.min.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/shorten-plugin.js') ?>" type="text/javascript"></script>


  <script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/jquery-repeater/jquery.repeater.js') ?>" type="text/javascript"></script>
  <script src="<?= asset('assets/global/plugins/datatables/datatables.min.js') ?>" type="text/javascript"></script>
  @endsection

  @section('js-scripts')
  <script src="<?= asset('app/controllers/recipeController.js') ?>"></script>
  <script src="<?= asset('assets/pages/scripts/recipeform.js') ?>" type="text/javascript"></script>
  <script>
  $(document).ready(function(){
    $('#pleaseWaitModal').modal('show');
  });


  </script>
  @endsection

  @section('content')
  <!-- BEGIN PAGE BREADCRUMBS -->
  <div ng-controller="recipeController" id="DivHtml">
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
    <ul class="page-breadcrumb breadcrumb">
      <li>
        <a href="{{ url('user/dashboard') }}">Home</a>
        <i class="fa fa-circle"></i>
      </li>
      <li>
        <span>Recipes</span>
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

                  <span class="caption-subject font-blue-hoki sbold uppercase">Recipes</span>
                </div>
                <div class="actions">
                  <a data-toggle="modal" ng-click="toggle('add', 0)"  class="btn btn-circle btn-default"><i class="fa fa-plus"></i> Add </a>

                </div>
              </div>
              <div class="portlet-body">
                <table class="table table-striped table-hover table-bordered responsive table-recipes-list" >
                  <thead>
                    <tr>
                      <th class="all"> Name </th>
                      <th> Meal Time </th>
                      <th> Ingredients </th>
                      <th class="all"> Actions </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr ng-repeat="recipe in recipes" id="RR-@{{ recipe.id }}">
                      <td>@{{recipe.Name}}</td>
                      <td>
                        <span ng-repeat="Meal in recipe.Meals">
                          <span class="label label-sm label-info">@{{Meal.Name}}</span>
                        </span>
                      </td>
                      <td class="more">

                        <span class=""  ng-repeat="ingredient in recipe.Ingredients">
                          <span class=""> @{{ ingredient.ingredientName}} , </span>
                        </span>

                      </td>
                      <td>
                        <a href="javascript:;" class="btn btn-icon-only blue-hoki visible-xs" ng-click="toggle('edit', recipe.id)">
                          <i class="fa fa-edit"></i>
                        </a>
                        <a href="javascript:;" ng-click="toggle('edit', recipe.id)" class="blue-hoki hidden-xs">
                          <i class="fa fa-edit font-blue-hoki"></i>
                        </a>
                        <a href="javascript:;" class="btn btn-icon-only red-soft visible-xs" ng-click="confirmDelete(recipe.id)">
                          <i class="fa fa-remove"></i>
                        </a>
                        <a href="javascript:;" ng-click="confirmDelete(recipe.id)" class="red-soft hidden-xs">
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
    <div id="addRecipie" class="modal fade bs-modal-lg" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
            <h4 class="modal-title">@{{form_title}}</h4>
          </div>
          <div class="modal-body form">
            <div class="col-md-12">
              <br/>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">Name</label>
                  <input type="text" value="@{{recipe.Name}}" name="Name" id="recipeName" class="form-control" ng-model="recipe.Name" placeholder="Enter Recipe name..">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">Meal Time</label>
                  <select class="form-control" name="mealID"
                  ng-model="recipe.mealID"
                  ng-change="changedValue(recipe.mealID)"
                  ng-options="value.id as value.Name for (key, value) in meals"
                  >
                  <option value="">Select Meal Time</option>
                </select>
                <!-- <select class="form-control" id="mealtime" name="mealID" ng-required="true" value="@{{recipe.mealID}}"  ng-model="recipe.mealID">
                <option value="">Choose Meal Time</option>
                <option ng-repeat="meal in meals" id="@{{meal.id}}" ng-selected="selectedMealValue == meal.id" value="@{{ meal.id }}">@{{ meal.Name }}</option> -->
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Ingredients</h3>
            </div>
            <div class="panel-body">
              <div class="form-group">
                <form action="#" class="mt-repeater form-horizontal">



                  <div class="scroller" style="height:200px" data-always-visible="1" data-rail-visible1="1">
                    <div data-repeater-list="ingredients">
                      <div data-repeater-item class="mt-repeater-item">
                        <div class="row mt-repeater-row">

                          <!-- jQuery Repeater Container -->
                          <!-- class="mt-repeater-input custom-width" -->
                          <div class="col-md-3">
                            <label class="control-label">Name</label>
                            <br/>
                            <select class="form-control ingredientname Select2 ingSelect2" style="width:100% !important" name="ingredientname" ng-required="true" ng-model="recipe.ingredientname0" id="ingredient">
                              <option value="">Choose Ingredient</option>
                              <option ng-repeat="fooditem in fooditems" value="@{{ fooditem.id }}">@{{ fooditem.Name }}
                              </option>
                            </select>
                          </div>

                          <div class="col-md-2">
                            <label class="control-label">Qty</label>
                            <br/>
                            <input type="number" min="0" name="ingredientqty" ng-model="recipe.ingredientqty0"  class="form-control count1" />
                          </div>

                          <div class="col-md-3">
                            <label class="control-label">Units</label>
                            <br/>
                            <select class="form-control Select2 unitSelect2" style="width:100% !important" ng-model="recipe.ingredientunit0"  name="ingredientunit" ng-required="true" id="select_units" >
                              <option value="" disabled>Choose Unit</option>
                              <option ng-repeat="unit in units" id="opt-@{{ unit.id }}" value="@{{ unit.id }}">@{{unit.unit_name}}</option>
                            </select>
                          </div>

                          <div class="col-md-3">
                            <label class="control-label">Comments</label>
                            <br/>
                            <input type="text" maxlength="50" name="ingredientcomment" ng-model="recipe.ingredientcomment0"   class="form-control" />
                          </div>

                          <div class="col-md-1">
                            <a href="javascript:;" data-repeater-delete class="btn green-haze btn-icon-only mt-repeater-delete">
                              <i class="fa fa-close"></i></a>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                    <a href="javascript:;" id="addingredient" data-repeater-create class="btn blue-hoki mt-repeater-add">
                      <i class="fa fa-plus"></i> Add</a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group mt-repeater">
                <div data-repeater-list="instructions">

                  <div data-repeater-item class="mt-repeater-item mt-overflow">
                    <label class="control-label">Instructions</label>
                    <div class="mt-repeater-cell">
                      <input type="text" placeholder="" name="instructionname" class="form-control mt-repeater-input-inline count2"  />
                      <a href="javascript:;" data-repeater-delete class="btn green-haze mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                        <i class="fa fa-close"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <a href="javascript:;" id="addinstruction" data-repeater-create class="btn blue-hoki mt-repeater-add">
                  <i class="fa fa-plus"></i> Add New Instruction
                </a>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
            <button type="submit" ng-click="save(modalstate,id)" class="btn blue-hoki">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  @endsection
