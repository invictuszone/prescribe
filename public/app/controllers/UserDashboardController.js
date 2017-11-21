app.controller('dashboardController', function($scope, $timeout, $compile, $http, API_URL) {
  $scope.Api_URL      = API_URL;
  $scope.PatientCount = 0;
  $scope.CatCount     = 0;
  $scope.CharCount    = 0;
  $scope.DietCount    = 0;
  $scope.FoodCount    = 0;
  $scope.PanelCount   = 0;
  $scope.RecipeCount  = 0;

  //retrieve categories listing from API.
  $http.get(API_URL + "userdashboard/")
          .success(function(response) {

              // console.log("response: ",response);
              $scope.Patients             = response['Patients'];
              $scope.recentDiets          = response['recentDiets'];
              $scope.PatientCount         = response['PatientCount'];
              $scope.PatientCountWeekly   = response['PatientCountWeekly'];
              $scope.DietPresCount        = response['DietPresCount'];
              $scope.DietPresCountWeekly  = response['DietPresCountWeekly'];
              $scope.CatCount             = response['CatCount'];
              $scope.CharCount            = response['CharCount'];
              $scope.DietCount            = response['DietCount'];
              $scope.FoodCount            = response['FoodCount'];
              $scope.PanelCount           = response['PanelCount'];
              $scope.RecipeCount          = response['RecipeCount'];
              // console.log('$scope.recentDiets',$scope.recentDiets);

              // //***** Initialize characteristics DataTable *******//
              $timeout(function(){
                $scope.Patient_TABLE =	$('#table-patient-list').DataTable({
                  "lengthMenu": [ [20, 50, 75, -1], [20, 50, 75, "All"] ],
                  "scrollY"     : "180px",
                  "order": [[ 1, "desc" ]],
                  "responsive": true
                });

                $('.counter').counterUp({});
              }, 0, false);

              //Hide Ajax Loader
                $('#pleaseWaitModal').modal('hide');

           }).error(function(response) {
             //Hide Ajax Loader
               $('#pleaseWaitModal').modal('hide');

           });

     ///////////////////////////////////////////////////////////
     ////////////**** Delete Patient Diet History Record****///
     /////////////////////////////////////////////////////////
     $scope.confirmDelete = function(id) {
           var isConfirmDelete = confirm('Are you sure you want this record?');
           if (isConfirmDelete) {
               $http({
                   method: 'DELETE',
                   url: API_URL + 'prescribe/' + id
               }).
                       success(function(data) {

                           //Remove the row
                           var rowId = "PR-"+id;
                           $scope.Patient_TABLE.row("#"+rowId).remove().draw();
                       }).
                       error(function(data) {

                           alert('Unable to delete');
                       });
           } else {
               return false;
           }
      }
      $scope.toggleModal = function(id){

        $('#commmentModal').modal('show');
        console.log("$scope.recentDiets: ",$scope.recentDiets);
        console.log("id: ",id);
        $.each($scope.recentDiets, function(key, Diets) {
          if(Diets['id'] == id)
          {
            console.log("$scope.recentDiets[i]: ",Diets);
            $('#names').html('');
            $('#names').html(Diets['fname'] +' '+ Diets['lname']);

            $('#pComments').html('');
            $('#pComments').html(Diets['HistoryFiles'][0]['comments']);
          }
        });
        // for (var i = 0; i < $scope.recentDiets.length; i++)
        // {
        //   if($scope.recentDiets[i].id == id)
        //   {
        //     console.log("$scope.recentDiets[i]: ",$scope.recentDiets[i]);
        //     $('#names').html('');
        //     $('#names').html($scope.recentDiets[i].fname +' '+ $scope.recentDiets[i].lname);
        //
        //     $('#pComments').html('');
        //     $('#pComments').html($scope.recentDiets[i].HistoryFiles[0].comments);
        //   }
        // }
        //$scope.Pfname = ;
      }

    /////////////////////////////////////////
    ////////LEGEND FILE////////
    //////////////////////////////////////

    $scope.genLegend = function() {

        var doc = new jsPDF();
        doc.page = 1;
        var count = 0;

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(76, 36, 'Legend for this Shopping List');
        doc.text(14, 56, 'Foods in Black');
        doc.text(68, 56, 'These are foods that maybe allowed on this diet.');
        doc.setTextColor(211, 211, 211);
        doc.text(14, 70, 'Light Gray Foods');
        doc.setTextColor(0, 0, 0);
        doc.text(68, 70, 'These are foods restricted from this diet.');

        doc.setFillColor(255, 255, 0);
        doc.rect(12, 79, 34, 8, 'F');
        doc.text(14, 84, 'Foods in Black');
        doc.text(68, 84, 'These are foods that are slightly sensitive and need to avoid today.');

        doc.setFillColor(255, 218, 185);
        doc.rect(12, 93, 34, 8, 'F');
        doc.text(14, 98, 'Foods in Black');
        doc.text(68, 98, 'These are foods that are moderately sensitive and need to avoid them');
        doc.text(68, 103, 'for 3 months.');

        doc.setFillColor(255, 127, 80);
        doc.rect(12, 112, 34, 8, 'F');
        doc.text(14, 117, 'Foods in Black');
        doc.text(68, 117, 'These are foods that are little more sensitive and need to avoid them');
        doc.text(68, 122, 'for 6 months.');

        doc.setFillColor(255, 0, 0);
        doc.rect(12, 131, 34, 8, 'F');
        doc.text(14, 136, 'Foods in Black');
        doc.text(68, 136, 'These are foods that are highly sensitive and need to avoid them as');
        doc.text(68, 141, 'they produce allergic reactions.');

        doc.setFillColor(255, 255, 0);
        doc.rect(12, 150, 34, 8, 'F');

        doc.setTextColor(211, 211, 211);
        doc.text(14, 155, 'Foods in Gray');

        doc.setFillColor(255, 160, 122);
        doc.rect(12, 158, 34, 8, 'F');
        doc.text(14, 163, 'Foods in Gray');

        doc.setFillColor(255, 127, 80);
        doc.rect(12, 166, 34, 8, 'F');
        doc.text(14, 171, 'Foods in Gray');

        doc.setTextColor(0, 0, 0);
        doc.text(68, 155, 'These foods have various sensitivities but moreover, they are');
        doc.text(68, 163, 'not allowed on this diet at this time.');
        doc.setDrawColor(0, 255, 255);
        doc.rect(12, 180, 34, 8);
        doc.setTextColor(211, 211, 211);
        doc.text(13, 185, 'Light Gray Foods');
        doc.setTextColor(0, 0, 0);
        doc.text(68, 185, 'These are foods that are going to experiment at this time');

        doc.setFillColor(255, 255, 0);
        doc.rect(12, 193, 34, 8, 'F');
        doc.setDrawColor(0, 255, 255);
        doc.rect(12, 193, 34, 8);
        doc.setTextColor(0, 0, 0);
        doc.text(14, 198, 'Foods in Black');
        doc.setFillColor(255, 127, 80);
        doc.rect(12, 201, 34, 8, 'F');
        doc.setDrawColor(0, 255, 255);
        doc.rect(12, 201, 34, 8);
        doc.text(14, 206, 'Foods in Black');
        doc.setFillColor(255, 160, 122);
        doc.rect(12, 209, 34, 8, 'F');
        doc.setDrawColor(0, 255, 255);
        doc.rect(12, 209, 34, 8);
        doc.text(14, 214, 'Foods in Black');
       doc.setFillColor(255, 0, 0);
        doc.rect(12, 217, 34, 8, 'F');
        doc.setDrawColor(0, 255, 255);
        doc.rect(12, 217, 34, 8);
        doc.text(14, 222, 'Foods in Black');
        doc.setFillColor(192, 0, 0);
        doc.rect(12, 225, 34, 8, 'F');
        doc.setDrawColor(0, 255, 255);
        doc.rect(12, 225, 34, 8);
        doc.text(14, 230, 'Foods in Black');

        doc.text(68, 198, 'These are foods that are allowed for experimenting');
        doc.text(68, 206, 'in diet.');

        //Occasionally
        // doc.setFillColor(255, 255, 0);
        // doc.rect(12, 223, 34, 8, 'F');
        // doc.setDrawColor(0, 128, 0);
        // doc.rect(12, 223, 34, 8);
        // doc.setTextColor(0, 0, 0);
        // doc.text(14, 228, 'Foods in Black');
        //
        // doc.setFillColor(255, 127, 80);
        // doc.rect(12, 231, 34, 8, 'F');
        // doc.setDrawColor(0, 128, 0);
        // doc.rect(12, 231, 34, 8);
        // doc.text(14, 236, 'Foods in Black');
        //
        // doc.setFillColor(255, 160, 122);
        // doc.rect(12, 239, 34, 8, 'F');
        // doc.setDrawColor(0, 128, 0);
        // doc.rect(12, 239, 34, 8);
        // doc.text(14, 244, 'Foods in Black');
        var x = 14;
        var y = 243;
        var rectx = 12;
        var recty = 238;
        var br = 255;
        var bg = 255;
        var bb = 0;
        for (var i = 0; i < 5; i++)
        {
          if(i == 1)
          {
            br = 255;
            bg = 127;
            bb = 80;
          }
          else if (i == 2) {
            br = 255;
            bg = 160;
            bb = 122;
          }
  else if (i == 3) {
            br = 255;
            bg = 0;
            bb = 0;
          }
  else if (i == 4) {
            br = 192;
            bg = 0;
            bb = 0;
          }
          dottedLine(doc, rectx - 0.3, recty + 0.1, rectx - 0.3, recty + 8, 1); // first vertical line
          dottedLine(doc, rectx + 34.5, recty , rectx + 34.5, recty + 8, 1); // second vertical line
          dottedLine(doc, rectx - 0.3, recty - 0.5, rectx + 34.5, recty - 0.5, 1); //first horizontal line
          dottedLine(doc, rectx - 0.3, recty + 8.5, rectx + 34.5, recty + 8.5, 1); //second horizontal line
          ///function for dotted line////
          function dottedLine(doc, xFrom, yFrom, xTo, yTo, segmentLength) {
              // Calculate line length (c)
              var a = Math.abs(xTo - xFrom);
              var b = Math.abs(yTo - yFrom);
              var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

              // Make sure we have an odd number of line segments (drawn or blank)
              // to fit it nicely
              var fractions = c / segmentLength;
              var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

              // Calculate x, y deltas per segment
              var deltaX = adjustedSegmentLength * (a / c);
              var deltaY = adjustedSegmentLength * (b / c);

              var curX = xFrom,
                  curY = yFrom;
              while (curX <= xTo && curY <= yTo) {
                  doc.setDrawColor(18, 215, 18);
                  doc.line(curX, curY, curX + deltaX, curY + deltaY);
                  curX += 2 * deltaX;
                  curY += 2 * deltaY;
              }
          }
          doc.setFillColor(br, bg, bb);
          doc.rect(rectx, recty, 34, 8, 'F');
          doc.text(x, y, 'Foods in Black');
          y = y + 8;
          recty = recty + 8;
        }

        doc.text(68, 243, 'These foods with dashed green border are');
        doc.text(68, 251, 'foods that are used occasionally.');


        //

        footer();

        doc.addPage();
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFillColor(255, 255, 0);
        doc.rect(12, 36, 34, 8, 'F');
        doc.setDrawColor(0,  128, 0);
        doc.rect(12, 36, 34, 8);
        doc.text(14, 41, 'Foods in Black');
        doc.setFillColor(255, 127, 80);
        doc.rect(12, 44, 34, 8, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setDrawColor(0, 128, 0);
        doc.rect(12, 44, 34, 8);

        doc.text(14,49, 'Foods in Black');
        doc.setFillColor(255, 160, 122);
        doc.rect(12, 52, 34, 8, 'F');
        doc.setDrawColor(0, 128, 0);
        doc.rect(12, 52, 34, 8);
       doc.setTextColor(0, 0, 0);
        doc.text(14, 57, 'Foods in Black');

         doc.setFillColor(255, 0,0);
        doc.rect(12, 60 ,34, 8, 'F');
        doc.setDrawColor(0, 128, 0);
        doc.rect(12, 60, 34, 8);
         doc.setTextColor(0, 0, 0);
        doc.text(14, 65, 'Foods in Black');
        doc.setFillColor(192,0, 0);
        doc.rect(12, 68, 34, 8, 'F');
        doc.setDrawColor(0, 128, 0);
        doc.rect(12, 68, 34, 8);
          doc.setTextColor(0, 0, 0);
        doc.text(14, 73, 'Foods in Black');
        doc.text(68, 41, 'These foods are included in diet.');

        doc.setFillColor(255, 255, 0);
        doc.rect(12, 90, 34, 8, 'F');
        doc.setDrawColor(0, 1255, 0, 0);
        doc.rect(12, 90, 34, 8);
        doc.setTextColor(0, 0, 0);
        doc.text(14, 95, 'Foods in Black');
        doc.setFillColor(255, 160, 122);
        doc.rect(12, 98, 34, 8, 'F');
        doc.setDrawColor(255, 0, 0);
        doc.rect(12, 98, 34, 8);
        doc.text(14, 103, 'Foods in Black');
        doc.setFillColor(255, 127, 80);
        doc.rect(12, 106, 34, 8, 'F');
        doc.setDrawColor(255, 0, 0);
        doc.rect(12, 106, 34, 8);
        doc.text(14, 111, 'Foods in Black');
        doc.setDrawColor(255, 0, 0);
        doc.rect(12, 114, 34, 8);
        doc.text(14, 119, 'Foods in Black');

 doc.setFillColor(255, 0,0);
        doc.rect(12, 122, 34, 8, 'F');
        doc.setDrawColor(255, 0, 0);
        doc.rect(12, 122, 34, 8);
        doc.text(14, 127, 'Foods in Black');
        doc.setFillColor(192,0, 0);
        doc.rect(12, 130, 34, 8, 'F');
        doc.setDrawColor(255, 0, 0);
        doc.rect(12, 130, 34, 8);
        doc.text(14, 135, 'Foods in Black');
        doc.text(68, 95, 'Foods with red border are totally removed from diet because ');
        doc.text(68, 103, 'it may contain ingredients that cause auto-immune issues.');
        footer();

        var pdf = doc.output();

        var data = new FormData();
        data.append('data', pdf);
        data.append('filename', 'Legend');
        data.append('id', 'pdffileupload');


        var xhr = new XMLHttpRequest();
        xhr.open('post', '../app/uploadFile.php', true); //Post to php Script to save to server
        xhr.send(data);
        doc.save('Legend.pdf');

        function footer() {
            doc.setFontSize(10);
            doc.text(58, 290, 'Copyrights - 2017 Prescribe Diets. All Rights Reserved'); //print number bottom right
            doc.setFontSize(14);
            doc.text(88, 12, 'Diet Specification');
        };
    }

$('[data-toggle="tooltip"]').tooltip();
    ///////////////////////////////////////////////////////
    //////////END OF LEGEND FILE//////
    /////////////////////////////////////////////////////
});
