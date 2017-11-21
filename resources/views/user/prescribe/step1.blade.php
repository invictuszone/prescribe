<div class="tab-pane" id="step1">
    <div class="row">
        <div class="col-md-12 col-xs-12">
            <div class="portlet light prescribe-portlets">
                <div class="col-md-2 col-xs-6 prescribe-nav-buttons">
                    <a href="javascript:;" ng-disabled="true" class="btn btn-icon-only green-haze default" disabled="disabled">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </a>
                    <a href="#step2" data-toggle="tab" class="btn btn-icon-only green-haze default tab-change" style="margin-right: 4px;">
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </a>
                </div>
                <div class="portlet-title">

                    <div class="caption">
                        <span class="caption-subject font-blue-hoki bold uppercase">Food Panels</span>
                        <span class="caption-helper">Mark or upload Reactions and Allergies for @{{selectedPatient.fname}} @{{selectedPatient.lname}}</span>
                    </div>
                    <div class="actions">
                        <div class="inputs">
                            <div class="portlet-input input-inline">
                                <label class="mt-checkbox" style="margin-bottom:0px;margin-right:15px;">
                                    <input class="include-reactions" type="checkbox" id="inlineCheckbox1" value="option1" > Include Reactions
                                    <span></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="portlet-body" >

                    <div class="actions">
                        <div class="inputs">
                            <div class="portlet-input input-inline input-large food-panel-list col-md-12 col-xs-12" style="width:100% !important">
                                <div class="input-group">
                                    <select class="form-control select2-multiple" name="tags[]" id="allergySelectr" ng-model="selectedPanel"  style="width:100%;height:40px;" aria-hidden="true" multiple="multiple">

                                        <optgroup  id="IgAGroup" label="IgA" >
                                            <option ng-repeat="foodpanel in foodpanels" ng-if="foodpanel.ReactionType == 'IgA'"  title="IgA" value='@{{ foodpanel.id }}' id='POpt@{{ foodpanel.id }}' panelName='@{{ foodpanel.Name }}' panelType='@{{ foodpanel.Type }}' >@{{ foodpanel.Name }}</option>
                                        </optgroup>
                                        <optgroup  id="IgGGroup" label="IgG">
                                            <option ng-repeat="foodpanel in foodpanels" ng-if="foodpanel.ReactionType == 'IgG'" title="IgG" value='@{{ foodpanel.id }}' id='POpt@{{ foodpanel.id }}' panelName='@{{ foodpanel.Name }}' panelType='@{{ foodpanel.Type }}' >@{{ foodpanel.Name }}</option>
                                        </optgroup>
                                        <optgroup  id="IgEGroup" label="IgE">
                                            <option ng-repeat="foodpanel in foodpanels" ng-if="foodpanel.ReactionType == 'IgE'" title="IgE" value='@{{ foodpanel.id }}' id='POpt@{{ foodpanel.id }}' panelName='@{{ foodpanel.Name }}' panelType='@{{ foodpanel.Type }}' >@{{ foodpanel.Name }}</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div class="alert food-panel-alert">
                                    You can select more than one food panels in the search above </div>
                                </div>
                            </div>
                        </div>

                        <br><br>

                        <div class="form-group1 col-xs-12 col-md-6 col-md-offset-3" style="text-align:center;">
                            <h3 style="color:#6586A7;font:bold;margin-top:100px;">No Allergy/Reaction selected<h3>
                            <h5  style="color:#6586A7;">Select Allergy/Reaction <h5>
                            <h5  style="color:#6586A7;">1: Checking "include reaction"checkbox  <h5>
                            <h5  style="color:#6586A7;">2: Selecting Panel From File <h5>
                        </div>

                                        <div class="tabbable-custom nav-justified" style="display:none;min-height:490px;margin-top:10px" >
                                            <ul class="nav nav-tabs nav-justified" id="mytabs">
                                                <!-- <li id="IgATab" style="Display:none">
                                                    <a href="#tab_1_1_1" data-toggle="tab"> IgA  </a>
                                                </li> -->
                                                <!-- <li id="IgGTab" style="Display:none">
                                                    <a href="#tab_1_1_2" data-toggle="tab"> IgG </a>
                                                </li> -->
                                                <!-- <li id="IgETab" style="Display:none">
                                                    <a href="#tab_1_1_3" data-toggle="tab"> IgE </a>
                                                </li> -->
                                            </ul>
                                            <div class="tab-content" id="tabs-body">
                                                <!-- <div class="tab-pane" id="tab_1_1_1">
                                                    <div class="row">
                                                        <div class="Iga128" id="igaPanel" style="display:none">
                                                            <div class="scroller" style="height:500px" data-rail-color="#67809f" data-handle-color="#67809f" data-always-visible="1" data-rail-visible="1" >
                                                                <div class="input-icon right" style="padding-bottom:10px;">
                                                                    <i class="icon-magnifier"></i>
                                                                    <input type="text" style="padding-bottom:10px;" class="search IGASearch form-control " placeholder="search...">
                                                                </div>
                                                                <div class="panel panel-default">
                                                                    <div class="panel-heading">
                                                                        <h4 class="panel-title">
                                                                            <a class="accordion-toggle accordion-toggle-styled" data-toggle="collapse" data-parent="#accordion3" href="#collapse_3_1"> IGA #1 </a>
                                                                        </h4>
                                                                    </div>
                                                                    <div id="collapse_3_1" class="panel-collapse in">
                                                                        <div class="panel-body">
                                                                            <div class="col-md-12 col-sm-12 food-Panel" id="IgAFoodPanel">
                                                                                <!-- Panel Populated from UserPrescibeController -
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> -->

                                                <!-- <div class="tab-pane" id="tab_1_1_2" >
                                                    <div class="row margin-bottom-20" id="SelectFileInput">
                                                        <div class="col-xs-12 col-md-offset-4">
                                                            <div class="fileinput fileinput-new" data-provides="fileinput">
                                                                <div class="input-group input-large">
                                                                    <div class="form-control uneditable-input input-fixed input-medium" data-trigger="fileinput">
                                                                        <i class="fa fa-file fileinput-exists"></i>&nbsp;
                                                                        <span class="fileinput-filename"> </span>
                                                                    </div>
                                                                    <span class="input-group-addon btn default btn-file hideSpan">
                                                                        <span class="fileinput-new"> Select file </span>
                                                                        <span class="fileinput-exists"> Change </span>
                                                                        <input type="file" class="panelfileupload">
                                                                    </span>
                                                                    <a href="javascript:;" class="input-group-addon btn red fileinput-exists showSpan" data-dismiss="fileinput"> Remove </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="igg128" id="iggPanel" style="display:none">
                                                            <div class="scroller" style="height:500px" data-rail-color="#67809f" data-handle-color="#67809f" data-always-visible="1" data-rail-visible="1" >
                                                                <div class="input-icon right" style="padding-bottom:10px;">
                                                                    <i class="icon-magnifier"></i>
                                                                    <input type="text" style="padding-bottom:10px;" class="search IGGSearch form-control " placeholder="search...">
                                                                </div>
                                                                <div class="dummy">
                                                                    <div class="col-md-12 col-sm-12 food-Panel" id="IgGFoodPanel">
                                                                        <!-- Panel Populated from UserPrescibeController --
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> -->

                                                <!-- <div class="tab-pane active" id="tab_1_1_3">
                                                    <div class="row margin-bottom-20" id="SelectFileInput-IGE">
                                                        <div class="col-xs-12 col-md-offset-4">
                                                            <div class="fileinput fileinput-new" data-provides="fileinput">
                                                                <div class="input-group input-large">
                                                                    <div class="form-control uneditable-input input-fixed input-medium" data-trigger="fileinput">
                                                                        <i class="fa fa-file fileinput-exists"></i>&nbsp;
                                                                        <span class="fileinput-filename"> </span>
                                                                    </div>
                                                                    <span class="input-group-addon btn default btn-file hideSpanIGE">
                                                                        <span class="fileinput-new"> Select file </span>
                                                                        <span class="fileinput-exists"> Change </span>
                                                                        <input type="file" class="panelfileuploadIGE">
                                                                    </span>
                                                                    <a href="javascript:;" class="input-group-addon btn red fileinput-exists showSpanIGE" data-dismiss="fileinput"> Remove </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="Ige12" id="igePanel" style="display:none">
                                                            <div class="scroller" style="height:500px" data-rail-color="#67809f" data-handle-color="#67809f" data-always-visible="1" data-rail-visible="1" >
                                                                <div class="input-icon right" style="padding-bottom:10px;">
                                                                    <i class="icon-magnifier"></i>
                                                                    <input type="text" style="padding-bottom:10px;" class="search IGESearch form-control " placeholder="search...">
                                                                </div>
                                                                <div class="col-md-12 col-sm-12 food-Panel" id="IgEFoodPanel">
                                                                    <!-- Panel Populated from UserPrescibeController -
                                                                </div>
                                                            </div>
                                                            <!-- End OF IGE --
                                                        </div>
                                                    </div>
                                                </div> -->
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row step-buttons">
                            <div class="col-md-12 col-sm-12">
                                <!-- <a  href="#step0-3" data-toggle="tab" class="btn yellow pull-left tab-change">Back</a> -->
                                <a href="#step2" data-toggle="tab" class="btn green-haze pull-right tab-change">Next</a>
                            </div>
                        </div>
                    </div>

          <!-- Modal For Aut-Imune Panel Foods -->
          <div class="modal fade" id="FoodPanel-FileUpload-Modal" tabindex="-1" role="basic" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                  <h4 class="modal-title">AutoImmune</h4>
                </div>
                <div class="modal-body">
                  <label>Do you want Gluten-related Autoimmune Foods to persists the gluten autoimmune reactivity?</label>
                  <div class="form-group remove-patient-modal">
                    <div class="col-md-8">
                      <div class="md-radio-inline" style="margin-left:30px;">
                        <div class="md-radio">
                          <input class="form1" type="radio" name="fileCheck-autoimune" value="Yes" class="md-radiobtn" id="autoimune-Yes" checked>
                          <label for="autoimune-Yes">
                            <span class="inc"></span>
                            <span class="check"></span>
                            <span class="box"></span>
                            Yes
                          </label>
                        </div>
                        <div class="md-radio">
                          <input class="form1" type="radio" name="fileCheck-autoimune" value="No" class="md-radiobtn" id="autoimune-No">
                          <label for="autoimune-No">
                            <span class="inc"></span>
                            <span class="check"></span>
                            <span class="box"></span>
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                  <button type="button" class="btn green" id="autoimune-Apply-Btn" onclick="prepareUpload(event)">Apply</button>
                </div>
              </div>
            </div>
          </div>
