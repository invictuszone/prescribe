<div class="tab-pane " id="step0-1">
  <div class="row">
	 <div class="col-md-12">
		<div class="portlet light ">
		   <div class="portlet-title">
			  <div class="caption">
				 <span class="caption-subject bold font-blue-hoki uppercase">Patient</span>

			  </div>

			  <div class="action form-inline pull-right">
						 <select class="form-control selectpatient"  id="selectr1" style="width:250px;" name="patientSelect" ng-model="id" >
						   <option value="" selected disabled>Search for Patient</option>
               <option ng-repeat="patient in patients" value="@{{patient.id}}">@{{patient.fname}} @{{patient.lname}}</option>
						 </select>
					   <a ng-click="toggleToAddTab(1)" class="btn blue-hoki btn-outline btn-file pull-right"style="margin-left:5px;" ><b>+</b> Add</a>
				</div>
			</div>

		   <div class="portlet-body" style="min-height:450px">
					<div class="form-group" style=" position:absolute;top:40%;left:40%;">
					  <h3 style="color:#6586A7;font:bold;">No Patient Selected<h3>
						<h6 style="color:#6586A7;padding: 10px ;">Add new Patient /Select Old Patient<h6>
			  </div>
		   </div>
		</div>
	 </div>
  </div>
</div>
