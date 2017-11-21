app.controller('UnitsController', function($scope,$timeout,$compile, $http, API_URL) {

//retrieve units from php controller
  $http.get(API_URL + "units/")
  .success(function(response) {
     $scope.units = response;
    //  console.log("$scope.units",response['id']);

     $timeout(function(){
                $scope.Unit_TABLE =  $('#table-units-list').DataTable({
                  "lengthMenu": [ [20, 50, 75, -1], [20, 50, 75, "All"] ],
                   "scrollY" : "250px",
                });
                $scope.Unit_modal_TABLE =  $('#table-units-list-modal').DataTable({
                  "lengthMenu": [ [20, 50, 75, -1], [20, 50, 75, "All"] ],
                   "scrollY" : "250px",
                });
                
                $('#pleaseWaitModal').modal('hide');
      }, 0, false);
$(document).on('shown.bs.modal', '#large', function () {
    $scope.Unit_modal_TABLE.columns.adjust().draw();
});

     //console.log("Units in units controller.js:", $scope.units);
     $('#pleaseWaitModal').modal('hide');
     console.log('sucess',response);
  }).error(function(response) {

     //Hide Ajax Loader
       $('#pleaseWaitModal').modal('hide');
       console.log('error',response);
     alert('This is embarassing. An error has occured. Please check the log for details');
 });

 // function addNC_ItemToTable(ele){
 $scope.addNC_ItemToTable = function(eventELE) {
   // console.log("eventELE: ",eventELE);
   var ele = eventELE.target;
    //console.log("eleeeeee: ",ele);
   var row = $(ele).closest('.row');

   var first_value = $(row).find('#unit-value').val();
   var name = $(row).find('#unit-name').val();
  //  console.log("first_value: ",name);
  //  console.log("name: ",name);
   var second_value = $(row).find('#unit2-value').val();
   var associated_name = $(row).find('option:selected').val();
  //  console.log("second_value: ",second_value);
  //  console.log("associated_name: ",associated_name);

   var uid = $(row).find('option:selected').attr('name');
    console.log("uid: ",uid);

    var html = '<tr id="'+ uid +'" >';
   //var html = '<tr id="'+ associated_fid +'" FID="'+ rowCount +''+ associated_fid +'">';
  //  html    += '  <td>'+ rowCount +'</td>';
   html    += '  <td>'+first_value+' '+' '+ name +'</td>';
   html    += '  <td>'+second_value+' '+' '+ associated_name +'</td>';
   html    +=    '<td>';
  //  html    += '  <a href="javascript:;" ng-click="toggle(\'edit\', '+ uid +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
   html    += '  <a href="javascript:;" class="btn btn-xs btn-danger" ng-click="removeNC_ItemToTable($event,\''+uid+'\');" uid="'+uid+'" class="red-soft">Remove</a>';
   html    +=    '</td>';
   html    += '</tr>';
   var temp = $compile(html)($scope);
   $scope.Unit_modal_TABLE.row.add($(temp )).draw();
   //rowCount++;
 }

 $scope.removeNC_ItemToTable = function(eventELE,uid) {

   $scope.Unit_modal_TABLE.row('[id="'+uid+'"]').remove().draw( );
   //rowCount--;
 }




 //show modal form
 $scope.toggle = function(modalstate,id) {
   $scope.modalstate = modalstate;
     $scope.unit = null;
     $scope.Unit_modal_TABLE.clear().draw();
     $('#unit-value').val('');
     $('#unit-name').val('');
     $('#unit2-value').val('');
     switch (modalstate) {
         case 'add':
         //setTimeout(formrepeater, 5000);
             $scope.form_title = "Add Unit";
             $('#large').modal('show');
            // setTimeout(formrepeater, 5000);
             break;
         case 'edit':

             $scope.form_title = "Edit Units Details";
            // setTimeout(formrepeater, 5000);
             $scope.id = id;
            // console.log('id',id)

             //Show Ajax Loader
               $('#pleaseWaitModal').modal('show');
             $http.get(API_URL + 'units/' + id)
                     .success(function(response) {
                       console.log("edit respoms",response);
                       $scope.unit = response;
                       //Hide Ajax Loader
                         $('#pleaseWaitModal').modal('hide');
                       //Show Modal
                         $('#large').modal('show');
                         $('#unit-name').val($scope.unit['unit_name']);
                         //Set Selected FoodItems
                           if($scope.unit['RelativeUnits'] != null)
                           {
                             for (var j = 0; j < $scope.unit['RelativeUnits'].length; j++)
                             {
                               var selectedID = '#NC-food-'+$scope.unit['RelativeUnits'][j]['child_unit'];
                               console.log("selectedID: ",selectedID);
                              // $('#unit-name').val($scope.unit['unit_name']);
                               //Set Non-Categorized Datatable
                                 var html = '<tr id="'+ $scope.unit['RelativeUnits'][j]['child_unit'] +'" >';
                                //  html    += '  <td>1 '+ $scope.unit['unit_name'] +'</td>';
                                 html    += '  <td>'+ $scope.unit['RelativeUnits'][j]['parent_value'] +'</td>';
                                 html    += '  <td>'+ $scope.unit['RelativeUnits'][j]['value'] +'</td>';
                                 html    += '  <td><a class="btn btn-xs btn-danger" ng-click="removeNC_ItemToTable($event,\''+ $scope.unit['RelativeUnits'][j]['child_unit'] +'\');" uid="'+ $scope.unit['RelativeUnits'][j]['child_unit'] +'">Remove</a></td>';
                                 html    += '</tr>';
                                 var temp = $compile(html)($scope);
                                 $scope.Unit_modal_TABLE.row.add($(temp )).draw();

                                //  rowCount++;
                             }
                           }

                        //  if( $scope.unit!=null)
                        // {
                        //   $('input[id=Name]').val($scope.unit['unit_name']);
                        //   $('input[id=Abbreviation]').val($scope.unit['abbrivation']);
                        //
                        //
                        // }



                     });
             break;
         default:
             break;
     }
 }






 //save new record / update existing record
 $scope.save = function(modalstate,id)
 {
   //Show Ajax Loader
     $('#pleaseWaitModal').modal('show');

     console.log("$scope.unit",$scope.unit);
    var url = API_URL + "units";
    if (modalstate === 'edit'){
         url += "/" + id;
     }

     $scope.selectedUnits = [];
     var rows = $scope.Unit_modal_TABLE.rows().data();
     console.log("rows in table: ", rows);

     var units = {RelativeUnits:""};
     for (var i = 0; i < rows.length; i++)
     {
       var order = {};
       order['uid']      = rows[i]['DT_RowId'];
       order['unit2_value']     = rows[i][1];
       order['unit1_value']     = rows[i][0];
      //  order['FOrder']   = tempOrder;
      //  tempOrder++;
       $scope.selectedUnits.push(order);
     }
     units['RelativeUnits'] = $scope.selectedUnits;
     $.extend($scope.unit, units);
     console.log("$scope.unit after extend: ", $scope.unit);

     $http({
         method: 'POST',
         url: url,
         data: $.param($scope.unit),
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).success(function(response) {


       console.log('response new new: ',response);
          var unitResponse = response;


         //Hide Ajax Loader
           $('#pleaseWaitModal').modal('hide');

         if(unitResponse != null)
         {

           if (modalstate === 'edit')
           {
               //Update the row
               var rowId = "RR-"+id;
              //  console.log("edit : unitResponse['id']",unitResponse['id']);
              //  console.log("edit : unitResponse['unit_name']",unitResponse['unit_name']);
                 $scope.Unit_TABLE.row("#"+rowId).remove().draw();

              var newRow = '<tr id="RR-'+ unitResponse['id'] +'">';
                 newRow    +=    '<td>'+ unitResponse['unit_name'] +'</td>';
                 newRow    +=    '<td><span class="label label-sm label-info"> '+ unitResponse['abbrivation'] +' </span></td>';
                 newRow    +=    '<td>';
                 newRow    +=    '  <a href="javascript:;" ng-click="toggle(\'edit\', '+ unitResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
                 newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ unitResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
                 newRow    +=    '</td>';
                 newRow    +='</tr>';

                 var temp = $compile(newRow)($scope);
                 $scope.Unit_TABLE.row.add($(temp )).draw();
                 console.log("Sl: ",$('#opt-'+unitResponse['id']));
                 //$('#unit-name').html('');


                 $('#opt-'+unitResponse['id']).html('');
                 $('#opt-'+unitResponse['id']).html(unitResponse['unit_name']);



           }
           else
           {
             var newRow = '<tr id="RR-'+ unitResponse['id'] +'">';
                 newRow    +=    '<td>'+ unitResponse['unit_name'] +'</td>';
                 newRow    +=    '<td><span class="label label-sm label-info"> '+ unitResponse['abbrivation'] +' </span></td>';
                 newRow    +=    '<td>';
                 newRow    +=    '  <a href="javascript:;" ng-click="toggle(\'edit\', '+ unitResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
                 newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ unitResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
                 newRow    +=    '</td>';
                 newRow    +='</tr>';

                 var temp = $compile(newRow)($scope);
                 $scope.Unit_TABLE.row.add($(temp )).draw();

                 var value = '<option id="opt-'+ unitResponse['id'] +'" name="'+ unitResponse['id'] +'" uid='+ unitResponse['id'] +'" value="'+ unitResponse['unit_name'] +'">'+ unitResponse['unit_name'] +'</option>';
                 $('#unit2').append(value);
           }
        }
       })
        .error(function(response) {

           //Hide Ajax Loader
           console.log("save error message", response);
             $('#pleaseWaitModal').modal('hide');

           alert('This is embarassing. An error has occured. Please check the log for details');
       });


       $('#large').modal('hide');
 }

 //delete units record
$scope.confirmDelete = function(id) {

    var isConfirmDelete = confirm('Are you sure you want to delete this record?');
    if (isConfirmDelete)
    {
        $http({
            method: 'DELETE',
            url: API_URL + 'units/' + id
        }).
                success(function(data) {
                  console.log('delete data',data);
                    //Remove the row
                    var rowId = "RR-"+id;
                    $scope.Unit_TABLE.row("#"+rowId).remove().draw();

                    //Remove Option
                    $('#opt-'+id).remove();
                }).
                error(function(data) {

                    alert('error! Unable to delete the record');
                });
    }
    else {
        return false;
    }
}
//var w= document.getElementById("one");


})
