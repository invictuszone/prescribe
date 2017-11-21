<div class="tab-pane " id="step2">
  <div class="row">
    <div class="col-md-12 col-xs-12">
      <div class="portlet light prescribe-portlets" style="min-height:600px">
        <div class="portlet-title">
          <div class="col-md-2 col-xs-6 prescribe-nav-buttons">
            <a href="#step1" data-toggle="tab"  class="btn btn-icon-only green-haze default tab-change">
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
            <a href="#step3" data-toggle="tab" class="btn btn-icon-only green-haze default tab-change" style="margin-right: 4px;">
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </a>
          </div>

          <div class="caption">
            <span class="caption-subject bold font-blue-hoki uppercase"> DietTypes </span>
            <span class="caption-helper">Select DietTypes and Apply Experimentation Levels</span>
          </div>

        </div>

        <div class="portlet-body" style="min-height:450px"  >
          <div class="row">
            <div class="col-md-12- col-xs-12" id="foodfilters" >

              <select id="dietselect2" class="form-control selectDietType"  multiple   style="width: 100%">
                <option></option>
                <option class="diet-selection" ng-repeat="DietType in diettypes" id="DOpt-@{{ DietType.id }}" value="@{{ DietType.id }}">@{{ DietType.Name }}</option>
              </select>


            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-xs-12"  id="foodfiltersselected">
              <div class="input-icon right" style="padding-bottom:10px;padding-top:10px;">
                <i class="icon-magnifier"></i>
                <input type="text" style="padding-bottom:10px;padding-top:10px;" class="foodFilerSearch form-control" placeholder="search...">
              </div>
              <div class="scroller" style=" height:422px" id="food-scroll-div" data-rail-color="#67809f" data-handle-color="#67809f" data-always-visible="1" data-rail-visible="1" >
                <div class="list-group list" id="foodfiltersselected-div" >
                  <!-- style="overflow: scroll;height: 101.937px;" -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row step-buttons">
    <div class="col-md-12 col-sm-12">
      <a  href="#step1" data-toggle="tab" class="btn yellow pull-left tab-change" >Back</a>
      <a href="#step3" data-toggle="tab" class="btn green-haze pull-right tab-change">Next</a>
    </div>
  </div>
</div>

<!-- Step Modal -->
<div id="responsive" class="modal fade bs-modal-lg" tabindex="-1" data-width="760">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="dietTypeFoodList-Heading"> </h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">

            <div class="panel panel-default" id="dietTypeFoodList-List">
              <div class="panel-heading">
                Food List
                <span>
                  <input type="text" class="form-control pull-right food-list-modal-search" placeholder="Search Food Items">
                </span>

              </div>

              <div class="panel-body">

                <div class="scroller" style="height:350px" data-always-visible="1" data-rail-visible1="1">
                  <div class="list list-group foodlistCat" id="dietTypeFoodList">
                    <!-- Foodlist Poplated from UserPrescribeController function openFoodList(dietTypeId) -->
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div class="modal-footer" id="dietTypeFoodList-ModalFooter">
        <button type="button" data-dismiss="modal" class="btn btn-outline dark">Close</button>
        <button id="dietTypeFoodList-ModalBtn" type="button" class="btn green" ng-click="saveDietFoodItems()">Save changes</button>
      </div>
    </div>
  </div>
</div>

<!-- Manual Overrides modal -->
<div id="responsive-1" class="modal fade bs-modal-lg" tabindex="-1" data-width="760">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="dietTypeMOList-Heading"> </h4>
      </div>
      <div class="modal-body">
          <div class="row" id="dietTypeMOList">
            <!-- <div class="col-md-3 col-sm-3 col-xs-3">
                <ul class="nav nav-tabs tabs-left">
                    <li class="active">
                        <a href="#tab_6_1" data-toggle="tab"> Allow </a>
                    </li>
                    <li>
                        <a href="#tab_6_2" data-toggle="tab"> Occasionally </a>
                    </li>

                    <li>
                        <a href="#tab_6_3" data-toggle="tab"> Try </a>
                    </li>
                    <li>
                        <a href="#tab_6_4" data-toggle="tab"> No </a>
                    </li>
                    <li>
                        <a href="#tab_6_5" data-toggle="tab"> Never </a>
                    </li>
                </ul>
            </div>
            <div class="col-md-9 col-sm-9 col-xs-9">
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_6_1">
                        <div class="list-group">
                            <a href="javascript:;" class="list-group-item"> Allow </a>
                            <a href="javascript:;" class="list-group-item list-group-item-success"> Occasionally </a>
                            <a href="javascript:;" class="list-group-item list-group-item-info"> Try</a>
                            <a href="javascript:;" class="list-group-item list-group-item-warning"> No</a>
                            <a href="javascript:;" class="list-group-item list-group-item-danger"> Never </a>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab_6_2">
                        <div class="list-group">
                            <a href="javascript:;" class="list-group-item"> Allow </a>
                            <a href="javascript:;" class="list-group-item list-group-item-success"> Occasionally </a>
                            <a href="javascript:;" class="list-group-item list-group-item-info"> Try</a>
                            <a href="javascript:;" class="list-group-item list-group-item-warning"> No</a>
                            <a href="javascript:;" class="list-group-item list-group-item-danger"> Never </a>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab_6_3">
                        <div class="list-group">
                            <a href="javascript:;" class="list-group-item"> Allow </a>
                            <a href="javascript:;" class="list-group-item list-group-item-success"> Occasionally </a>
                            <a href="javascript:;" class="list-group-item list-group-item-info"> Try</a>
                            <a href="javascript:;" class="list-group-item list-group-item-warning"> No</a>
                            <a href="javascript:;" class="list-group-item list-group-item-danger"> Never </a>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab_6_4">
                       <div class="list-group">
                            <a href="javascript:;" class="list-group-item"> Allow </a>
                            <a href="javascript:;" class="list-group-item list-group-item-success"> Occasionally </a>
                            <a href="javascript:;" class="list-group-item list-group-item-info"> Try</a>
                            <a href="javascript:;" class="list-group-item list-group-item-warning"> No</a>
                            <a href="javascript:;" class="list-group-item list-group-item-danger"> Never </a>
                        </div>
                    </div>
                     <div class="tab-pane fade" id="tab_6_5">
                       <div class="list-group">
                            <a href="javascript:;" class="list-group-item"> Allow </a>
                            <a href="javascript:;" class="list-group-item list-group-item-success"> Occasionally </a>
                            <a href="javascript:;" class="list-group-item list-group-item-info"> Try</a>
                            <a href="javascript:;" class="list-group-item list-group-item-warning"> No</a>
                            <a href="javascript:;" class="list-group-item list-group-item-danger"> Never </a>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
      </div>
      <div class="modal-footer" id="dietTypeMOList-ModalFooter">
        <button type="button" data-dismiss="modal" class="btn btn-outline dark">Close</button>
        <button id="dietTypeMOList-ModalBtn" type="button" class="btn green" ng-click="saveDietFoodItems()">Save changes</button>
      </div>
    </div>
  </div>
</div>
