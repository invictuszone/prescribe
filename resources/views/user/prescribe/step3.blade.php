<div class="tab-pane" id="step3">
  <div class="row">
    <div class="col-md-12 col-xs-12">
      <div class="portlet light" id="food-list">
        <div class="col-md-2 col-xs-6 prescribe-nav-buttons">
          <a href="#step2" data-toggle="tab"  class="btn btn-icon-only green-haze default tab-change">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </a>
          <a href="#step4" data-toggle="tab" class="btn btn-icon-only green-haze default tab-change" style="margin-right: 4px;">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </a>
        </div>
        <div class="portlet-title">
          <div class="caption">
            <span class="caption-subject font-blue-hoki bold uppercase">Food List</span>
            <span class="caption-helper">Manually Overridden Experimentation Levels of Foods</span>
          </div>
          <div class="actions">
            <label class="mt-checkbox" style="color:#6586A7;">
              <input type="checkbox" id="autoimmuneCheckBox" onchange="toggleAutoImune(this)" name="autoimnue" value="immune" style="margin-right:3px;">
              Autoimmune
              <span></span>
            </label>
          </div>
        </div>
        <div class="portlet-body">
          <div class="well" style="padding: 10px;">
            <div class="col-md-offset-1 col-md-10">
              <div class="slider" id="slider-level"></div>
            </div>
            <div class="row">
              <div class="col-md-12 A-C-T-N-buttons">
                <div class="row">
                  <div class="col-md-6 range-col">
                    <div class="rangeValues range-text" id="never" style="border:3px solid #FF7F7F;"></div>
                  </div>
                  <div class="col-md-6 range-col">
                    <div class="rangeValues range-text" id="try" style="border:3px solid #109ee7;"></div>
                  </div>
                  <div class="col-md-6 range-col">
                    <div class="rangeValues range-text" id="occasionally"  style="border:3px dashed #12d712;"></div>
                  </div>
                  <div class="col-md-6 range-col">
                    <div class="rangeValues range-text" id="allow"  style="border:3px solid #12d712;"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-1 pull-right">
                <a href="javascript:showSliderSettingsModal();"  class="btn blue-hoki btn-default" style="margin-top: 10px; margin-bottom: 10px;">Apply </a>
              </div></div></div>
              <div class="row">
                <div class="table-responsive">
                  <div class="col-md-12">
                    <table class="table table-condensed table-hover responsive" id="table-food-list">

                      <thead>
                        <tr>
                          <th>
                            <input type="text" class="form-control" id="column1_search"  placeholder="Search Food Items "/>
                          </th>
                          <th>
                            <select id="column2_search" class="form-control"  style=":float:width;width:70px;">
                              <option></option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </th>
                          <th>
                            <select id="column3_search" class="form-control"  style=":float:width;width:130px;">
                              <option></option>
                              <option value="No Reaction">No Reaction</option>
                              <option value="IgA">IgA</option>
                              <option value="IgG">IgG</option>
                              <option value="IgE">IgE</option>
                            </select>
                          </th>
                          <th>
                            <select  id="column4_search" class="form-control" >
                              <option></option>
                              <option value="Never">Never</option>
                              <option value="No">No Experimentation</option>
                              <option value="Try">Try</option>
                              <option value="Occasionally">Occasionally</option>
                              <option value="Allow">Allow</option>
                            </select>
                          </th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>

                          <!-- <th>
                          <select class="form-control" >
                          <option></option>
                          <option>Never</option>
                          <option>No</option>
                          <option>Allow</option>
                          <option>Try</option>
                          <option>Yes</option>
                        </select>
                      </th>

                    -->
                  </tr>


                  <tr>
                    <th class="all" style="width:30%">Name</th>
                    <th class="all" style="width:10%">In Diet</th>
                    <th class="all" style="width:15%">Reaction</th>
                    <th class="all" style="width:20%">Experimentation</th>
                    <th  style="width:25%">Characteristics</th>
                    <th>Hidden</th>
                    <th>Hidden</th>
                    <th>Hidden</th>
                  </tr>
                </thead>

                <tbody>

                  <tr ng-repeat="fooditem in fooditems" id="Food-@{{ fooditem.id }}" fontcode="0" backcode="0" bordercode='0' >
                    <td id="@{{ fooditem.id }}" fid="@{{ fooditem.id }}">
                      <div class="col-md-12 item-name food-name-class" ng-click="GetFoodIngredients(fooditem.id, fooditem.Name)" style="cursor: pointer;">
                        @{{ fooditem.Name }}
                      </div>
                    </td>
                    <td>
                      <select  class="form-control in-diet-class" onchange="toggleAllow(this);">
                        <option value="Yes">Yes</option>
                        <option value="No" selected="selected">No</option>
                      </select>
                    </td>
                    <td class="reaction-lvl-class">Pitt</td>
                    <td>
                      <select  class="form-control foodselectr exp-level-class" onchange="updateReactionType(this);" >
                        <option value="Never">Never</option>
                        <option value="No" selected="selected">No Experimentation</option>
                        <option value="Try">Try</option>
                        <option value="Occasionally">Occasionally</option>
                        <option value="Allow">Allow</option>
                      </select>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row step-buttons">
    <div class="col-md-12">
      <a  href="#step2" data-toggle="tab" class="btn yellow pull-left tab-change">Back</a>
      <a href="#step4" data-toggle="tab" class="btn green-haze pull-right tab-change">Generate Prescription</a>
    </div>
  </div>
</div>
</div>




<!-- Modal Starts -->
<div id="showIngredients" class="modal fade" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title">@{{ FoodName }}</h4>
      </div>
      <div class="modal-body form">
        <div class="row">
          <div class="col-xs-offset-1 col-xs-10">
            <div class="panel panel-default" id="foodIngredients">
              <div class="panel-heading">
                Ingredients List
                <!-- (<span class="selectCount">0</span> selected) -->
              </div>
              <div class="panel-body">
                <div class="form-group">
                  <input type="text" class="search form-control" placeholder="Search Food Items">
                </div>
                <div class="scroller" style="height:350px" data-always-visible="1" data-rail-visible1="1">
                  <div class="list list-group foodlistCat" id="ingrdientsList">
                    <!-- Populated From UserPrescribeController -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
      </div>
    </div>
  </div>
</div>


<!-- Apply Modal -->
<div id="sliderSettings" class="modal fade" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title">Apply new Settings</h4>
      </div>

      <div class="modal-body form" id="mymodal">
        <div class="row">
          <div class="col-md-12 col-xs-12">
            <div class="md-radio-list">
              <div class="md-radio   apply-settings-radio "   style="margin-left:20px;margin-top:20px;">
                <input type="radio" id="radio1" name="radio1" class="md-radiobtn" checked="checked"   value="1" >
                <label for="radio1"   >
                  <span></span>
                  <span class="check"   style="background:#666;"></span>
                  <span class="box"></span> All </label>
                </div>
                <div class="md-radio  apply-settings-radio"  style="margin-left:20px;margin-top:20px;">
                  <input type="radio" id="radio2" name="radio1" class="md-radiobtn"  value="2"   >
                  <label for="radio2" >
                    <span></span>
                    <span class="check" style="background:#666;"></span>
                    <span class="box"></span> All Except manual overrides </label>
                  </div>
                  <div class="md-radio" id="custom-setting-radio"  style="margin-left:20px;margin-top:20px;">
                    <input type="radio" id="radio3" name="radio1" class="md-radiobtn"    value="3"   >
                    <label for="radio3"  >
                      <span></span>
                      <span class="check"  style="background:#666;"></span>
                      <span class="box"></span>All & Selected Manual Overridden Items </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col xs-12" id="food-listform" style="display:none">
                <div class="row">
                  <div class=" col-md-12 col-xs-12">
                    <div class="panel panel-default" id="custom-foods">
                      <div class="panel-heading" style="background-color:#6586A7;color:white">
                        Manually Overridden Food's (<span class="Countr">0</span> selected)
                      </div>
                      <div class="panel-body">
                        <div class="list" name="food-items1" id="food-items1">
                          <div class="form-group">
                            <input type="text" id="search" class="search form-control" style="width: 94%;margin-left:20px;margin-top:5px;" placeholder="Search Food Items" >
                          </div>
                          <div class="scroller" style="height:170px" data-always-visible="1" data-rail-visible1="1">
                            <div class="list list-group foodlistCat" id='MO_Food_List' style="width: 95%;overflow: hidden;margin-left:20px;">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
              <button type="button" class="btn blue-hoki" onclick="applySliderSettings();">Apply</button>
            </div>
          </div>
        </div>
      </div>
