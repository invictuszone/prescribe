////////////////////Change ///////////////////
var table;
var rowCount = 1;
///////////////////////////////////////
app.controller('FoodPanelController', function($scope, $timeout, $compile, $http, API_URL) {

  $scope.catCounter = 1;
  // //retrieve categories listing from API.
  // $http.get(API_URL + "category/")
  //         .success(function(response) {
  //             $scope.categories = response;
  //             console.log("$scope.categories: ",$scope.categories);
  //             $timeout(function(){
  //                 $scope.modalCatSelect2  = $('#cat-select2').html();
  //             }, 0, false);
  //         });

    //retrieve fooditems listing from API.
    $http.get(API_URL + "fooditems/")
            .success(function(response) {
              $scope.fooditems       = response;

                $timeout(function(){

                  $('.NC-food-select2').select2({
          					width: '100%',
          					placeholder: 'Select Food',
          					// dropdownParent: $(".table-panel")
          				});


                  $scope.NC_Datatable = $('#NC-sample_editable_1').DataTable({
                          scrollY: 150,
                          paging: false,
                          searching: false,
                          info:false,
                          // "order": [[ 0, "desc" ]],
                          "bLengthChange" : false,
                          "bInfo"         : false,
                          rowReorder: true,
                         columnDefs: [
                            // { "width": "20%", "targets": 0 },
                            // { "targets": 1, "orderable": false }
                            { orderable: true, className: 'reorder',"width": "20%", targets: 0 },
                            { orderable: true, className: 'reorder', targets: 1 },
                            { orderable: false, targets: '_all' },
                         ],
                          responsive       : true,
                         "bScrollCollapse" : true,
                         "bPaginate"      : false,
                         "bAutoWidth": false,
                         "aoColumns" : [
                            { sWidth: '95px' },
                            { sWidth: '169px' },
                            { sWidth: '192px' },
                            { sWidth: '82px' }
                            ]
                    });

                  $(document).on('shown.bs.modal', '#FoodPanal-Modal', function () {
                      $scope.NC_Datatable.columns.adjust().draw();
                  });

                  $scope.NC_Datatable.on( 'order.dt search.dt', function () {
                      $scope.NC_Datatable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                          cell.innerHTML = i+1;
                      } );
                  }).draw();

                  //Initialize Categorized Panel
                  catagoryPanel = $("#accordion").html();

                  //retrieve foodpanel listing from API.
                  $http.get(API_URL + "foodpanel/")
                          .success(function(response) {
                               $scope.foodpanels = $.map(response, function(value, index) {
                                return [value];
                              });

                              //***** Initialize FoodPanel DataTable *******//
                              $timeout(function(){
                                $scope.FOOD_Panel_TABLE =	$('#table-panel-list').DataTable({
                                  "lengthMenu": [[20, 50, 75, -1], [20, 50, 75, "All"]],
                                     "scrollY" : "250px"
                                });
                                //Hide Ajax loader
                                $('#pleaseWaitModal').modal('hide');
                              }, 0, false);
                            });

                }, 0, false);


      });

      // function addNC_ItemToTable(ele){
      $scope.addNC_ItemToTable = function(eventELE) {
        // console.log("eventELE: ",eventELE);
        var ele = eventELE.target;
        // console.log("ele: ",ele);
        var row = $(ele).closest('.row');
        // console.log("row: ",row);
        var name = $(row).find('input').val();
        // console.log("name: ",name);
        var associated_name = $(row).find('option:selected').html();
        // console.log("associated_name: ",associated_name);
        var associated_fid = $(row).find('option:selected').attr('FID');
        // console.log("associated_fid: ",associated_fid);

        var html = '<tr id="'+ associated_fid +'" FID="'+ rowCount +''+ associated_fid +'">';
        html    += '  <td>'+ rowCount +'</td>';
        html    += '  <td>'+ name +'</td>';
        html    += '  <td>'+ associated_name +'</td>';
        html    += '  <td><a class="btn btn-xs btn-danger" ng-click="removeNC_ItemToTable($event,\''+ rowCount +''+associated_fid+'\');" FID="'+associated_fid+'">Remove</a></td>';
        html    += '</tr>';
        var temp = $compile(html)($scope);
        $scope.NC_Datatable.row.add($(temp )).draw();
        rowCount++;
      }

      //Remove Non-Categorized Foods from its DataTable
      $scope.removeNC_ItemToTable = function(eventELE,fid) {
        $scope.NC_Datatable.row('[FID="'+fid+'"]').remove().draw( );
        rowCount--;
      }




     /////////////////////////////////////////////////////
     ///*******  FoodPanel Curd Functions  ********///////
    /////////////////////////////////////////////////////
    //show modal form
    $scope.toggle = function(modalstate, id) {
      //Set Modal's Select2
        $scope.modalstate                 = modalstate;
        if(modalstate  == 'edit')
        {
          $scope.FoodPanel             = [];
        }

        $scope.FoodPanel.Name             = "";
        $scope.FoodPanel.Type             = 'Non-Categorized';
        $scope.FoodPanel.ReactionType     = 'IgA';

        //Set NC-Datatable count to initial value
          rowCount = 1;
        //Show Non-Categorized Panel by Default
          $(".C-PanelDiv").hide();
          $("#NC-PanelDiv").show();

        //Reset Form Categorized Panel
          catgoriesCount = 1;
          $("#accordion").html('');
          $('#addCatagory').click();


          // intializePanelModel();
        $('.food-item[selected="selected"]').css("background-color", "#ffffff");
        $('.food-item[selected="selected"]').css("color", "#000000");
        $('.food-item[selected="selected"]').attr('selected',false);
        $('.selectCount').html('0');

        // Set Non-Categorized Panel To Inttial State
        $('#NC-FoodNameInput').val('');
        $('.NC-food-select2').select2('val', '');

        if($('.NC-food-select2').select2('data')[0].id != "")
        {
          var selectedFoodID = $('.NC-food-select2').select2('data')[0].id;
          $("#NCFood-"+ selectedFoodID +"")[0].selected = false;
          $(".NC-food-select2").trigger("change.select2");
        }

        //Clear datatable
          $scope.NC_Datatable
                      .clear()
                      .draw();


        switch (modalstate) {
            case 'add':
                $scope.form_title = "Add New Food Panel";
                $('#FoodPanal-Modal').modal('show');
                break;
            case 'edit':
                $scope.form_title = "Edit Food Panel";
                $scope.id = id;
                //Show Ajax Loader
                  $('#pleaseWaitModal').modal('show');

                $http.get(API_URL + "foodpanel/"+id)
                        .success(function(response) {
                             $scope.FoodPanel = response;
                             console.log("$scope.FoodPanel: ",$scope.FoodPanel);
                            //Hide Ajax Loader
                              $('#pleaseWaitModal').modal('hide');
                              $('#FoodPanal-Modal').modal('show');
                            if($scope.FoodPanel.Type == 'Non-Categorized')
                            {
                              //Set Selected FoodItems
                                if($scope.FoodPanel['fooditems'] != null)
                                {
                                  for (var j = 0; j < $scope.FoodPanel['fooditems'].length; j++)
                                  {
                                    var selectedID = '#NC-food-'+$scope.FoodPanel['fooditems'][j]['FID'];
                                    console.log("selectedID: ",selectedID);

                                    //Set Non-Categorized Datatable
                                      var html = '<tr id="'+ $scope.FoodPanel['fooditems'][j]['FID'] +'" FID="'+ rowCount +''+ $scope.FoodPanel['fooditems'][j]['FID'] +'">';
                                      html    += '  <td>'+ rowCount +'</td>';
                                      html    += '  <td>'+ $scope.FoodPanel['fooditems'][j]['Name'] +'</td>';
                                      html    += '  <td>'+ $scope.FoodPanel['fooditems'][j]['associatedFood'] +'</td>';
                                      html    += '  <td><a class="btn btn-xs btn-danger" ng-click="removeNC_ItemToTable($event,\''+ rowCount +''+ $scope.FoodPanel['fooditems'][j]['FID'] +'\');" FID="'+ $scope.FoodPanel['fooditems'][j]['FID'] +'">Remove</a></td>';
                                      html    += '</tr>';
                                      var temp = $compile(html)($scope);
                                      $scope.NC_Datatable.row.add($(temp )).draw();
                                      rowCount++;
                                  }
                                }
                              //Set Ingrdients Countt
                                $('.selectCount').html($scope.FoodPanel['fooditems'].length);
                            }
                            else if ($scope.FoodPanel.Type == 'Categorized')
                            {
                              //Show Categorized Panel
                                $("#NC-PanelDiv").hide();
                                $(".C-PanelDiv").show();

                                if($scope.FoodPanel['categories'] != null)
                                {
                                  //Reset Form Categorized Panel
                                    catgoriesCount = 1;
                                    $("#accordion").html('');
                                    var TempCatCount   = 1;
                                    var foodDummyCount = 1;

                                  var len = $scope.FoodPanel['categories'].length;
                                  len--;
                                  for (var j = len; j >= 0; j--)
                                  {
                                    //Add category
                                    $('#addCatagory').click();
                                    var addedCategory = $('#CategoryDiv-' + TempCatCount);
                                    var cat_Name_Input      = $(addedCategory).find('.Cat_Name');
                                    var cat_Div_Title       = $(addedCategory).find('.accordion-toggle');
                                    var cat_Div_HBackColor  = $(addedCategory).find('.panel-heading');

                                    $(cat_Name_Input).val($scope.FoodPanel['categories'][j]['Name']);
                                    $(cat_Div_Title).html('');
                                    $(cat_Div_Title).append($scope.FoodPanel['categories'][j]['Name']);
                                    $(cat_Div_HBackColor).css('background',$scope.FoodPanel['categories'][j]['Color']);

                                    var cat_Color_Input = $(addedCategory).find('.Cat_Color');
                                    $(cat_Color_Input).val($scope.FoodPanel['categories'][j]['Color']);

                                    refreshColorPlugin(TempCatCount);

                                    var dataTable = $(addedCategory).find('.Catdatatables')[1];
                                    dataTable = $(dataTable).DataTable({
                                      retrieve: true
                                    });
                                    //Set Selected FoodItems
                                      if($scope.FoodPanel['categories'][j]['fooditems'] != null)
                                      {
                                        for (var k = 0; k < $scope.FoodPanel['categories'][j]['fooditems'].length; k++)
                                        {
                                            var associated_fid    = $scope.FoodPanel['categories'][j]['fooditems'][k]['FID'];
                                            var name              = $scope.FoodPanel['categories'][j]['fooditems'][k]['Name'];
                                            var associated_name   = $scope.FoodPanel['categories'][j]['fooditems'][k]['associatedFood'];

                                            var html = '<tr id="'+ associated_fid +'" FID="'+ foodDummyCount +''+ associated_fid +'">';
                                            html    += '  <td>'+ name +'</td>';
                                            html    += '  <td>'+ associated_name +'</td>';
                                            html    += '  <td><a class="btn btn-xs btn-danger" onclick="removeFromTable(this,\''+ foodDummyCount +''+associated_fid+'\',\''+TempCatCount+'\');" FID="'+associated_fid+'">Remove</a></td>';
                                            html    += '</tr>';

                                            dataTable.row.add($(html )).draw();
                                            foodDummyCount++;
                                        }
                                      }
                                    TempCatCount++;
                                  }
                                }
                            }
                          });
                break;
            default:
                break;
        }
    }

    //save new record / update existing record
    $scope.save = function(modalstate, id) {

      //Show Ajax Loader
        $('#pleaseWaitModal').modal('show');

        $('.emptySearch').val('');
        $(".emptySearch").trigger("keypress").val("");

      if($scope.FoodPanel.Type  == 'Non-Categorized')
      {
        var foods = {FoodItems:""};

        $scope.selectedFoodItems = [];
        var rows = $scope.NC_Datatable.rows().data();

        var tempOrder = 1;
        for (var i = 0; i < rows.length; i++)
        {
          var order = {};
          order['FID']      = rows[i]['DT_RowId'];
          order['Name']     = rows[i][1];
          order['FOrder']   = tempOrder;
          tempOrder++;
          $scope.selectedFoodItems.push(order);
        }

        foods['FoodItems'] = $scope.selectedFoodItems;
        //Add Final FoodList to FoodPanel FoodItems
          $.extend( $scope.FoodPanel, foods );
          $scope.FoodPanel['categories'] = null;
      }
      else if ($scope.FoodPanel.Type  == 'Categorized')
      {
        var accordionChildren = $("#accordion")[0]['children'];
        var Cats     = {categories:""};
        var catID    = [];
        var CatOrder = 1;
        for (var i = 0; i < accordionChildren.length; i++)
        {
          item = {};
          var addedCategory = accordionChildren[i];
          // console.log("addedCategory: ",addedCategory);
          var cat_Name_Input = $(addedCategory).find('.Cat_Name');
          var cat_Name       = $(cat_Name_Input).val();
          item ["cat_Name"]  = cat_Name;
          // console.log("cat_Name: ",cat_Name);
          var cat_Color_Input = $(addedCategory).find('.Cat_Color');
          var cat_Color       = $(cat_Color_Input).val();
          // console.log("cat_Color: ",cat_Color);
          item ["cat_Color"]  = cat_Color;
          item ["CatOrder"]  = CatOrder;
          CatOrder++;
          var dataTable = $(addedCategory).find('.Catdatatables')[1];
          dataTable = $(dataTable).DataTable({
            retrieve: true
          });
          var rows = dataTable.rows().data();
          // console.log("rows: ",rows);
          var items = {};
          for (var j = 0; j < rows.length; j++)
          {
            var temp = {}
            temp["FoodName"]   = rows[j][0];
            temp["FoodItemID"] = rows[j]['DT_RowId'];
            items[j]           = temp;
          }
          item ["FoodItems"] = items;
          catID.push(item);
        }

        Cats['categories'] = catID
        if($scope.FoodPanel['categories'] != "" && $scope.FoodPanel['categories'] != null)
        {
          $scope.FoodPanel['categories'] = [];
          $scope.FoodPanel['categories'] = catID;
        }
        else {
          //Add Final Categories to FoodPanel
            $.extend( $scope.FoodPanel, Cats );
        }

      }

        var url = API_URL + "foodpanel";

        //append staff id to the URL if the form is in edit mode
        if (modalstate === 'edit'){
            url += "/" + id;
        }

        // console.log("$scope.FoodPanel: ",$scope.FoodPanel);

        //Request for Storing or Updating Record
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.FoodPanel),

            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            var FoodPanelResponse = response;

            //Hide Ajax Loader
              $('#pleaseWaitModal').modal('hide');
            //append the new record
              if(FoodPanelResponse != "")
              {
                if (modalstate === 'edit')
                {
                    //Update the row
                    var rowId = "PR-"+id;
                    $scope.FOOD_Panel_TABLE.row("#"+rowId).remove().draw();

                    var newRow = '<tr id="PR-'+ FoodPanelResponse['id'] +'">';
                    newRow    +=    '<td>'+ FoodPanelResponse['Name'] +'</td>';
                    newRow    +=    '<td>'+ FoodPanelResponse['Type'] +'</td>';
                    newRow    +=    '<td>'+ FoodPanelResponse['updated_at'] +'</td>';
                    newRow    +=    '<td>';
                    newRow    +=    '  <a href="javascript:;" ng-click="toggle(\'edit\', '+ FoodPanelResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
                    newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ FoodPanelResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
                    newRow    +=    '</td>';
                    newRow    +='</tr>';

                    var temp = $compile(newRow)($scope);
                    $scope.FOOD_Panel_TABLE.row.add($(temp )).draw();
                }
                else
                {
                  //Add new FoodPanel To FoodPanels listing
                    var newRow = '<tr id="PR-'+ FoodPanelResponse['id'] +'">';
                    newRow    +=    '<td>'+ FoodPanelResponse['Name'] +'</td>';
                    newRow    +=    '<td>'+ FoodPanelResponse['Type'] +'</td>';
                    newRow    +=    '<td>'+ FoodPanelResponse['updated_at'] +'</td>';
                    newRow    +=    '<td>';
                    newRow    +=    '  <a href="javascript:;" ng-click="toggle(\'edit\', '+ FoodPanelResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
                    newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ FoodPanelResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
                    newRow    +=    '</td>';
                    newRow    +='</tr>';

                    var temp = $compile(newRow)($scope);
                    $scope.FOOD_Panel_TABLE.row.add($(temp )).draw();
                }
              }

        }).error(function(response) {

            //Hide Ajax Loader
              $('#pleaseWaitModal').modal('hide');
            alert('This is embarassing. An error has occured. Please check the log for details');
        });

        // if ($scope.FoodPanel.Type  != 'Categorized')
        // {
        //
        // }
        // else
        // {
        //   //Hide Ajax Loader
        //     $('#pleaseWaitModal').modal('hide');
        // }

         $('#FoodPanal-Modal').modal('hide');
    }

    //delete record
    $scope.confirmDelete = function(id) {

        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete)
        {
            $http({
                method: 'DELETE',
                url: API_URL + 'foodpanel/' + id
            }).
                    success(function(data) {

                        //Remove the row
                        var rowId = "PR-"+id;
                        $scope.FOOD_Panel_TABLE.row("#"+rowId).remove().draw();
                    }).
                    error(function(data) {
                       alert('Unable to delete');
                    });
        } else {
            return false;
        }
    }

/** End of Controller **/
});
