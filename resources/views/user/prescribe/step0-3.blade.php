<link href="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css') ?>" rel="stylesheet" type="text/css" />
<script src="<?= asset('assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js') ?>" type="text/javascript"></script>
<div class="tab-pane " id="step0-3" >
  <div class="row" style="display:none">
    <div class="col-md-12 col-xs-12">
      <div class="portlet light select-patient-portlet">
        <!-- <div class="row">
        <a href="#step0-2" data-toggle="tab"  class="btn btn-icon-only green-haze default" ng-click ="resetFields()">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </a>
      <a href="#step1" data-toggle="tab" class="btn btn-icon-only green-haze default tab-change" style="margin-right: 4px;">
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </a>
  </div> -->
  <div class="portlet-title">

    <div class="row">
      <a href="#step0-2" data-toggle="tab"  class="btn btn-icon-only green-haze default" ng-click ="resetFields()">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </a>
      <a href="#step1" data-toggle="tab" class="btn btn-icon-only green-haze default tab-change" style="margin-right: 4px;">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </a>
    </div>
    <div class="caption">
      <span class="caption-subject bold font-blue-hoki uppercase">Patient</span>
    </div>
  </div>
  <div class="portlet-body" style="min-height:300px">
  </div>
</div>
</div>
</div>
<div class="row"  id="selectedPatient">
  <div class="col-md-12 col-xs-12">
    <div class="portlet light select-patient-portlet prescribe-portlets">
      <div class="col-md-2 col-xs-6 prescribe-nav-buttons">
        <a href="#step0-2" data-toggle="tab"  class="btn btn-icon-only green-haze default" ng-click ="resetFields()">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </a>
        <a href="#step1" data-toggle="tab" class="btn btn-icon-only green-haze default tab-change" style="margin-right: 4px;">
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
      </div>
      <div class="portlet-title">
        <div class="caption">
          <a herf="#" ng-click="updatePatient()">
            <i class="fa fa-check font-blue-hoki" aria-hidden="true" id="tick-for-name"></i>
          </a>
          <span class="caption-subject bold font-blue-hoki uppercase" id="patient-label-section">
            <a id="edit-name">
              <i class="fa fa-pencil-square-o" aria-hidden="true" style="margin-left: 10px;"></i>
            </a>
            @{{selectedPatient.fname}} @{{selectedPatient.lname}}
            <span id="addpatientname">
            </span>

          </span>
          <div id="edit-patient-panel" class="form-group form-md-line-input">
            <input type="text" class="form-control edit-patient-panel-inputs" id="firstname" ng-model="EditPatient.fname" name="fname"  placeholder="First Name">
            <input type="text" class="form-control edit-patient-panel-inputs" id="lastname" ng-model="EditPatient.lname" name="lname" placeholder="Last Name">
          </div>
          <span class="caption-helper">Add or Edit a Prescription For This Patient</span>
        </div>


      </div>
      <div class="portlet-body">
        <div class="row">
          <div class="col-md-12">
            <!-- BEGIN PROFILE SIDEBAR -->
            <div class="profile-sidebar">
              <!-- PORTLET MAIN -->
              <div class="portlet light profile-sidebar-portlet ">

                <form class="form-horizontal" role="form">
                  <div class="form-body">

                    <div class="form-group">
                      <div class="col-md-9 col-md-offset-3 col-sm-8 col-sm-offset-4">
                        <div class="fileinput fileinput-new" data-provides="fileinput" id="imageDiv">
                          <div class="fileinput-preview thumbnail thumbnail-circle" data-trigger="fileinput" id="imageSection2" style="height: 150px; line-height: 150px;">
                          </div>
                          <div style="text-align:center;">
                            <span class="btn blue-hoki btn-outline btn-file">
                              <span class="fileinput-new"> Select image </span>
                              <span class="fileinput-exists"> Change </span>
                              <input type="hidden"><input type="file" file-input="files"> </span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </form>
                  <!-- SIDEBAR USERPIC -->
                  <!-- <div class="profile-userpic col-md-offset-2" ng-init="selectedPatient.image='avatar.png'">
                  <img src="../assets/images/@{{selectedPatient.image}}" class="img-responsive" alt="">
                </div> -->
                <!-- END SIDEBAR USERPIC -->
                <!-- SIDEBAR USER TITLE -->
                <div class="profile-usertitle">
                  <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-2">
                      <a id="edit-email">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </a>
                      <a herf="#" ng-click="updatePatient()">
                        <i class="fa fa-check font-blue-hoki" aria-hidden="true" id="tick-for-email"></i>
                      </a>
                    </div>
                    <div class="col-md-9 col-sm-6 col-xs-10">
                      <input type="text" value="@{{selectedPatient.email}}" id="patientEmail1" ng-model="EditPatient.email" class="form-control" name="email" placeholder="Email">
                      <label id="patient-email-label">@{{selectedPatient.email}}<span id="patientemaillabel"></span></label>
                    </div>
                  </div>
                  <div class="row patient-details">
                    <div class="col-md-3 col-sm-3 col-xs-2">
                      <a id="edit-dob">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </a>
                      <a herf="#" ng-click="updatePatient()">
                        <i class="fa fa-check font-blue-hoki" aria-hidden="true" id="tick-for-dob"></i>
                      </a>
                    </div>
                    <div class="col-md-9 col-sm-6 col-xs-10">
                      <input class="form-control form-control-inline date-picker" value="@{{selectedPatient.DOB}}" id="patientDOB1" size="16" ng-model="EditPatient.DOB" type="text" name="dob" placeholder="Date of Birth">
                      <label id="patient-dob-label">@{{selectedPatient.DOB}}<span id="patientdoblabel"></span></label>
                    </div>
                  </div>

                  <div class="row patient-details">
                    <div class="col-md-3 col-sm-3 col-xs-2">
                      <a id="edit-gender">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </a>
                      <a herf="#" ng-click="updatePatient()">
                        <i class="fa fa-check font-blue-hoki" aria-hidden="true" id="tick-for-gender"></i>
                      </a>

                    </div>
                    <div class="col-md-9 col-sm-4 col-xs-10">
                      <label id="label-gender">@{{selectedPatient.gender}}</label>
                      <div class="md-radio-inline" id="edit-gender-panel">
                        <div class="md-radio">
                          <input type="radio" id="radio14" name="patientGender1" ng-model="EditPatient.gender" value="Male" class="md-radiobtn">
                          <label for="radio14">
                            <span class="inc"></span>
                            <span class="check"></span>
                            <span class="box"></span> Male
                          </label>
                        </div>
                        <div class="md-radio">
                          <input type="radio" id="radio15" name="patientGender1" ng-model="EditPatient.gender" value="Female" class="md-radiobtn">
                          <label for="radio15">
                            <span class="inc"></span>
                            <span class="check"></span>
                            <span class="box"></span>Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <!-- END SIDEBAR USER TITLE -->
                <!-- SIDEBAR BUTTONS -->

                <!-- END SIDEBAR BUTTONS -->
                <!-- SIDEBAR MENU -->
                <div class="profile-usermenu">
                  <ul class="nav" id="checkfiles">
                    <li>
                      <a href="<?= asset('assets/images/patients/legend.pdf') ?>" download>
                        <i class="fa fa-file-pdf-o font-red"></i> Legend </a>
                      </li>
                      <!--<li>
                      <a href="<?= asset('assets/images/patients/{{patientid}}/{{shoppinglist.filename}}') ?>" download>
                      <i class="fa fa-file-pdf-o font-red"></i> Shopping List</a>
                    </li>
                    <li>
                    <a herf="#" ng-click="genRecipeList()" download>
                    <i class="fa fa-file-pdf-o font-red"></i> Recipe List </a>
                  </li>

                  <li>
                  <a href="<?= asset('assets/images/patients/{{patientid}}/{{comprehensivelist.filename}}') ?>" download>
                  <i class="fa fa-file-pdf-o font-red"></i>Comprehensive List </a>
                </li>-->
              </ul>
            </div>
          </div>
          <!-- END PORTLET MAIN -->
          <!-- PORTLET MAIN -->

          <!-- END PORTLET MAIN -->
        </div>
        <!-- END BEGIN PROFILE SIDEBAR -->
        <!-- BEGIN PROFILE CONTENT -->
        <div class="profile-content">
          <div class="row">
            <div class="col-md-12">
              <!-- BEGIN PORTLET -->
              <div class="portlet light portlet-fit portlet-datatable ">
                <div class="portlet-title">
                  <div class="caption">
                    <i class="fa fa-history font-blue-hoki"></i>
                    <span class="caption-subject font-blue-hoki sbold uppercase">Diet History</span>
                  </div>

                  <a href="#basic" role="button" class="btn green-haze pull-right" id="remove-patient-btn" data-toggle="modal"> Remove Patient </a>


                </div>
                <div class="portlet-body">
                  <div class="table-container">

                    <table class="table table-striped table-bordered table-hover responsive" id="diet-history-datatable">
                      <thead>
                        <tr>

                          <th class="all"> Date </th>
                          <!--<th> Comments </th>-->
                          <th> Files </th>
                          <th> Status </th>
                          <th class="all"> Action </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr ng-repeat="phf in patienthistory" id="PH-@{{ phf.id }}">
                          <td> @{{ phf['HistoryFiles'][0].prescriptionDate }} </td>
                          <!--<td> @{{ phf['HistoryFiles'][0].comments }}</td>-->
                          <td>
                            <span ng-repeat="hf in phf.HistoryFiles">
                              <span title="@{{hf.filetype}}">
                                <a href="<?= asset('assets/images/patients/{{patientid}}/{{hf.filename}}') ?>" download>
                                  <i class="fa fa-file-pdf-o font-red tooltips" data-container="body" data-placement="top" data-original-title="@{{hf.filetype}}"></i>&nbsp;<label style="font-size:12px;">@{{hf.filetype}}</label>
                                </a>
                                <br></span>
                              </span>


                            </td>
                            <td>@{{ phf['HistoryFiles'][0].Status }}</td>
                            <td>
                              <span>
                                <a href="javascript:;" class="btn btn-icon-only blue-hoki visible-xs" ng-click="getPrescriptionRecord(phf.id)">
                                  <i class="fa fa-edit"></i>
                                </a>
                                <a href="javascript:;" ng-click="getPrescriptionRecord(phf.id)" class="hidden-xs blue-hoki">
                                  <i class="fa fa-edit font-blue-hoki"></i>
                                </a>
                              </span>

                              <span>
                                <a href="javascript:;" class="btn btn-icon-only green-haze visible-xs" ng-click="getComment(phf.id)">
                                  <i class="fa fa-comments"></i>
                                </a>
                                <a href="javascript:;" ng-click="getComment(phf.id)" class="hidden-xs blue-hoki">
                                  <i class="fa fa-comments font-blue-hoki"></i>
                                </a>
                              </span>



                              <span>
                                <a href="javascript:;" class="btn btn-icon-only visible-xs red-soft" ng-click="confirmDelete(phf.id)">
                                  <i class="fa fa-remove"></i>
                                </a>
                                <a href="javascript:;" ng-click="confirmDelete(phf.id)" class="hidden-xs red-soft">
                                  <i class="fa fa-remove font-red-soft"></i>
                                </a>
                              </span>
                            </td>
                          </tr>


                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <!-- END PORTLET -->

              </div>

            </div>


          </div>
          <!-- END PROFILE CONTENT -->
        </div>
      </div>
    </div>
  </div>

</div>
</div>
<div class="row step-buttons">
  <div class="col-md-12 col-sm-12">
    <a href="#step0-2" data-toggle="tab" class="btn green-haze pull-left" class="btn yellow pull-left" ng-click ="resetFields()">Back</a>
    <a href="#step1" data-toggle="tab" id="step0-3-AddPresBtn" class="btn green-haze pull-right tab-change" >Add New Prescription</a>
  </div>
</div>
</div>

<div class="modal fade" id="basic" tabindex="-1" role="basic" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title">Remove Patient</h4>
      </div>
      <div class="modal-body">
        <label>Are you sure you want to remove patient ?</label>
        <div class="form-group remove-patient-modal">
          <label class="col-md-3 control-label"><strong>Password</strong></label>
          <div class="col-md-8">
            <input type="password" ng-model="staff.Pass" ng-init="staff.Pass=''" class="form-control" placeholder="Enter Your Password">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
        <button type="button" class="btn green" ng-click="deletePatient()">Confirm changes</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade commentmodal bs-modal-lg" id="step-02Modal" tabindex="-1" role="basic" aria-hidden="true" >
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title" id="Commentnames" >Patient Name</h4>
      </div>
      <div class="modal-body">
        <!--<div class="row">

        <div class="alert alert-success">
        <label style="font-size:16px; margin-bottom:0px;">Comments</label>
        <label class=" pull-right" id="comment-date" style="font-size:16px; margin-bottom:0px;"><strong> comment date </strong> </label>
      </div>
    </div>-->
    <div class="row">
      <div class="col-md-12">
        <span>
          <textarea disabled id="PatientComments" style="width:100%; height:170px; border:none; background-color:#ffffff;"> Comment
          </textarea>
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
