<div class="tab-pane active" id="step0-2">
    <div class="row">
        <div class="col-md-12 col-xs-12" >
            <div class="portlet light prescribe-portlets">
                <div class="portlet-title">
                    <div class="col-md-2 col-xs-6 prescribe-nav-buttons">
                        <a href="javascript:;" ng-disabled="true" class="btn btn-icon-only green-haze default">
                            <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        </a>
                        <button href="#step0-3" data-toggle="tab" ng-disabled="frmPatient.$invalid" ng-click="frmPatient.$valid && addPatient()" class="btn btn-icon-only green-haze default tab-change step02ptnButton" style="margin-right: 4px;">
                            <i class="fa fa-chevron-right" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="caption">
                        <span class="caption-subject bold font-blue-hoki uppercase">Patient</span>
                        <span class="caption-helper">Select or Add New Patient</span>
                    </div>
                </div>
                <div class="portlet-body-selectpatient">
                    <div class="content">
                        <div class="row ">
                            <div class="col-md-8 col-md-offset-2">
                                <div class="md-checkbox has-success" style="margin-top:10px;">
                                    <input type="checkbox" id="checkbox9" class="md-check">
                                    <label for="checkbox9">
                                        <span class="inc"></span>
                                        <span class="check"></span>
                                        <span class="box"></span>For Existing Patients</label>
                                    </div>
                                </div>

                            </div>
                            <div class="row ">
                                <div class="col-md-8 col-sm-10 col-md-offset-2 col-sm-offset-1">
                                    <!--<button class="btn blue-hoki btn-block btn-outline" id="existing-patient-btn">Select Existing Patients</button>-->
                                </div>
                                <div class="col-md-8 col-sm-10 col-md-offset-2 col-sm-offset-1" id="existing-patient-dropdown" >

                                    <select class="selectpatient" data-live-search="true" id="patient">

                                        <option value="" selected disabled></option>

                                        <!-- <option class="patient-name" ng-repeat="patient in patients" value="@{{patient.id}}" id="POpt-@{{patient.id}}"  pid="@{{patient.id}}" pname="@{{patient.fname}} @{{patient.lname}}"  pnumber="@{{patient.email}}"  emailid="@{{patient.email}}" pimg="../assets/images/patients/@{{patient.id}}/@{{patient.image}}"> @{{patient.fname}} @{{patient.lname}}</option> -->

                                    </select>
                                </div></div>


                                <div class="row">
                                    <h4 class="text-center">OR</h4>
                                    <!--<a href="javascript:;" class="clear-button fileinput-exists" data-dismiss="fileinput">Clear</a>-->
                                </div>
                                <div class="row ">
                                    <div class="col-md-12 col-xs-12 ini-details" >
                                        <form class="form-patient" role="form" name="frmPatient" novalidate="">
                                            <div class="col-md-4 col-xs-12 col-md-offset-2 col-sm-6" >
                                                <div class="form-group">
                                                    <label  class="formlabel"><b>First Name</b></label>
                                                    <input type="text" class="form-control form1" name="FName" id="patientFname"  placeholder="First Name" ng-model="patient.FName" ng-required="true"/>
                                                    <span class="help-inline"
                                                    ng-show="frmPatient.FName.$invalid && frmPatient.FName.$touched">Field is required</span>
                                                </div>

                                                <div class="form-group">
                                                    <label  class="formlabel" ><b>Last Name</b></label>
                                                    <input type="text" class="form-control form1" name="LName" id="patientLname" placeholder="Last Name" ng-model="patient.LName" ng-required="true"/>
                                                    <span class="help-inline"
                                                    ng-show="frmPatient.LName.$invalid && frmPatient.LName.$touched">Field is required</span>
                                                </div>

                                                <div class="form-group">
                                                    <label  class="formlabel"> <b>Email</b></label>
                                                    <input type="email" class="form-control form1" name="Email" id="patientEmaill" font size="10" placeholder="Email" ng-model="patient.Email" ng-required="true"/>
                                                    <span class="help-inline"
                                                    ng-show="frmPatient.Email.$invalid && frmPatient.Email.$touched">Valid Email field is required
                                                </span>
                                                <br>
                                            </div>

                                            <div class="form-group" >
                                                <label  class="formlabel" ><b>Date Of Birth</b></label>
                                                <input class="form-control  date-picker form1" name="DOB" size="16" type="text" value="" id="patientDOB" ng-model="patient.DOB"  placeholder="Date Of Birth" ng-required="true"/>
                                                <span class="help-inline"
                                                ng-show="frmPatient.DOB.$invalid && frmPatient.DOB.$touched">Field is required
                                            </span>
                                        </div>

                                    </div>
                                    <div class="col-md-4 col-xs-12 col-sm-6" >
                                        <div class="form-group" style="text-align: center;">
                                            <div class="fileinput fileinput-new" data-provides="fileinput" id="imageDiv">
                                                <div class="fileinput-preview thumbnail thumbnail-circle" data-trigger="fileinput" id="imageSection"></div>
                                                <div id="selectImage" style="text-align:center">
                                                    <span class="btn blue-hoki btn-outline btn-file">
                                                        <span class="fileinput-new"> Select image </span>
                                                        <span class="fileinput-exists"> Change </span>
                                                        <input type="hidden" id="imageInput1"><input type="file" file-input="files" id="imageInput2">
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="md-radio-inline" style="margin-left:30px;margin-top:72px;">
                                              <!-- ng-init="patient.Gender='Male'" -->
                                                <div class="md-radio">                                                                                          <input class="form1" type="radio" name="patientGender" style="width:13px;margin-left:30px;margin-top:95px;" value="Male" ng-model="patient.Gender" class="md-radiobtn" id="gender-male">
                                                    <label for="gender-male">
                                                        <span class="inc"></span>
                                                        <span class="check"></span>
                                                        <span class="box"></span>
                                                        Male  </label>
                                                    </div>
                                                    <div class="md-radio">                                                                                          <input class="form1" type="radio" name="patientGender" value="Female" ng-model="patient.Gender" class="md-radiobtn" id="gender-female">
                                                        <label for="gender-female">
                                                            <span class="inc"></span>
                                                            <span class="check"></span>
                                                            <span class="box"></span>
                                                            Female</label>
                                                        </div>                                                                                      </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row step-buttons">
                    <div class="col-md-12 col-sm-12" id="patientbtn-Div">
                        <button href="#step0-3" data-toggle="tab" ng-disabled="frmPatient.$invalid" ng-click="frmPatient.$valid && addPatient()" class="btn green-haze pull-right tab-change step02ptnButton" id="patientbtn">Add</button>
                        <!-- <button href="#" class="btn green-haze pull-right" ng-click="genLegend()">Leg</button> -->
                    </div>
                </div>
            </div>
