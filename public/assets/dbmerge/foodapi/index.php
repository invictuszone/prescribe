<?php
include 'dbmergescript.php';
$pdItems = getItems($conn);
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Creative - Bootstrap 3 Responsive Admin Template">
    <meta name="author" content="GeeksLabs">
    <meta name="keyword" content="Creative, Dashboard, Admin, Template, Theme, Bootstrap, Responsive, Retina, Minimal">
    <link rel="shortcut icon" href="img/favicon.png">

    <title>Prescribe Diets and USDA Merger</title>

    <!-- Bootstrap CSS -->    
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- bootstrap theme -->
    <link href="css/bootstrap-theme.css" rel="stylesheet">
    <!--external css-->
    <!-- font icon -->
    <link href="css/elegant-icons-style.css" rel="stylesheet" >
    <link href="css/font-awesome.min.css" rel="stylesheet" >
    <link href="assets/datatables/datatables.min.css" rel="stylesheet" >
	
    <!-- date picker -->
    
    <!-- color picker -->
    
    <!-- Custom styles -->
    <link href="css/style.css" rel="stylesheet">
    <link href="css/style-responsive.css" rel="stylesheet" >
	  <style>
		.bootstrap-tagsinput {
			border:none;
			box-shadow: none;
			line-height: 20px;
			cursor: not-allowed;
		}
		.hidden-item{
			display:none;
		}
		.ing-tag{
			color: #34aadc;
		}
		.search {
			width: 100%;
			border: 1px solid #ccc7c7;
		}
		tr.group,
		tr.group:hover {
			background-color: #ddd !important;
		}
	  </style>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 -->
    <!--[if lt IE 9]>
      <script src="js/html5shiv.js"></script>
      <script src="js/respond.min.js"></script>
      <script src="js/lte-ie7.js"></script>
    <![endif]-->
  </head>
  <body>

  <!-- container section start -->
  <section id="container" class="">
      <!--main content start-->
      <section id="main-content" style="margin-left:0px">
          <section class="wrapper" style="margin-top: 0px;">
			  <div class="row">
					<div class="col-lg-12">
						<h3 class="page-header"><i class="fa fa-database"></i> Merge Prescribe Diet Database and USDA Database</h3>
					</div>
			  </div>
              <div class="row">
                  <div class="col-md-6">
                      <section class="panel">
                          <header class="panel-heading">
                             Prescribe Diets
                          </header>
                          <div class="panel-body" id="list1">
							  <input class="form-control input-lg m-bot15 search" type="text" placeholder="Search Prescribe Diets">
							  <div class="list list-group">
									<?php
										foreach($pdItems as $item){
											$item['name'] = utf8_encode($item['name']);
											$ings = implode (" , ", $item['ingredients']);
											$html = '<a class="list-group-item" id="'.$item['id'].'" onclick="selectPDItem(this);">
														<h4 class="list-group-item-heading name" style="display: inline-block;">'.$item['name'].'</h4>';
											//if($item['linked']!=null){
											//	$html .= '<span class="label label-success pull-right"><i class="fa fa-barcode" aria-hidden="true"></i></span><p class="ismapped hidden-item">true</p>';
											//}
											//else
												$html .= '<p class="ismapped hidden-item">false</p>';
											if($ings != "")
												$html .= '<p class="ing-tag ing">'.$ings.'"</p>';
											$html .= '</a>';
											echo $html;
										}
									?>
							  </div>
							  <ul class="pagination"></ul>
                          </div>
                      </section>
                  </div>
				  
                  <div class="col-md-6">
                      <section class="panel">
                          <header class="panel-heading">
                             USDA
                          </header>
                          <div class="panel-body" id="list2">
							  <div class="input-group" style="margin-bottom: 20px;">
								<input id="usda-search" type="text" class="form-control input-lg" placeholder="Search USDA">
								<div class="input-group-btn">
								  <button class="btn btn-primary" style="height: 45px;width: 45px;" onclick="searhUSDA();">
									<i class="glyphicon glyphicon-search"></i>
								  </button>
								</div>
							  </div>
							  
							  <div class="list-group list">
							  </div>
							  <ul class="pagination"></ul>
                          </div>
                      </section>
                  </div>
				  
                  <div class="col-md-12">
                      <section class="panel">
                          <header class="panel-heading">
                             Link Foods Here
                          </header>
                          <div class="panel-body" id="nutritionSheet">
							  
                          </div>
                      </section>
                  </div>
              </div>
          </section>
      </section>
  </section>
  <!-- container section end -->
    <!-- javascripts -->
    <script src="js/jquery.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- nice scroll -->
    <script src="js/jquery.scrollTo.min.js"></script>
    <script src="js/jquery.nicescroll.js" type="text/javascript"></script>

    <!-- jquery ui -->
    <script src="js/jquery-ui-1.9.2.custom.min.js"></script>

    <!--custom checkbox & radio-->
    <script type="text/javascript" src="js/ga.js"></script>
    <!--custom switch-->
    <script src="js/bootstrap-switch.js"></script>
    <!--custom tagsinput-->
    <script src="js/jquery.tagsinput.js"></script>
    
    <!-- colorpicker -->
   
    <!-- bootstrap-wysiwyg -->
    <script src="js/jquery.hotkeys.js"></script>
    <script src="js/jquery.hotkeys.js"></script>
    <script src="assets/list.min.js"></script>
	<script src="assets/jquery.slimscroll.min.js"></script>
    <script src="assets/datatables/datatables.min.js"></script>
    <script src="assets/tags/bootstrap-tagsinput.js"></script>
    <script src="js/bootstrap-wysiwyg.js"></script>
    <script src="js/bootstrap-wysiwyg-custom.js"></script>
    <!-- ck editor -->
    <script type="text/javascript" src="assets/ckeditor/ckeditor.js"></script>
    <!-- custom form component script for this page-->
    <script src="js/form-component.js"></script>
    <!-- custome script for all page -->
    <script src="js/scripts.js"></script>
	
	<script>
		$(document).ready(function(){
			var listPD = new List('list1', {
			  valueNames: ['name','ing','ismapped']
			});
			//listPD.sort('ismapped', { order: "asc" });
			$('#list1 .list').slimScroll({
				height: '400px'
			});
		});
		function selectPDItem(ele){
			var text = $(ele).find('h4').text();
			$('#usda-search').val(text);
			
			searhUSDA();
		}
		$("#usda-search").on('keyup', function (e) {
    			if (e.keyCode == 13) {			
				searhUSDA();
			}
		});
		function searhUSDA(){
			$('#list2').find('.list').html('<img src="assets/loading.gif" style="    max-width: 100%;"/>');
			$('#nutritionSheet').html('');
			name = $('#usda-search').val();
			$url = 'https://api.nal.usda.gov/ndb/search/?q="'+name+'"&max=2000&format=json&api_key=XLrU1QlvPq18XqUk9WOWlL3ShjdlqAPfSCrOxBkc';
			$.post($url, function(data){
				//console.log(data);
				html = '';
				if('list' in data){
					for(index in data['list']['item']){
						item = data['list']['item'][index];
						//console.log(item['name']);
						html += '<a class="list-group-item " id="'+item['ndbno']+'" onclick="getItemDetail(\''+item['ndbno']+'\');">';
						if(item['name'].indexOf(', UPC: ') > -1){
							upc = item['name'].split(", UPC: ");
							item['name']= upc[0];
							upc = upc[1];
							html += '<span class="label label-info pull-right" style="font-size: 14px;"><i class="fa fa-barcode" style="margin-right: 8px;" aria-hidden="true"></i> '+upc+'</span><p class="upc-code hidden-item">'+upc+'</p>';
						}
						html += '	  <h4 class="list-group-item-heading" >'+item['name']+'</h4>';
						html += '	  <span class="label label-default">'+item['group']+'</span>';
						if(item['ds']=="BL")
							html += '	  <span class="label label-warning ds">Branded Food Products</span>';
						else
							html += '	  <span class="label label-warning ds">Standard Release</span>';
						html += '</a>';
					}
				}
				if(html=='')
					html = '<h4 class="list-group-item-heading" >No results available</h4>';
				$('#list2').find('.list').html(html);
				
				var listUSDA = new List('list2', {
				  valueNames: ['ds']
				});
				listUSDA.sort('ds', { order: "desc" });
				$('#list2 .list').slimScroll({
					height: '400px'
				});
			});
		}
		function getItemDetail(ndbno){
			$('#nutritionSheet').html('<img src="assets/loading.gif" style="    max-width: 100%;"/>');
			console.log(ndbno);
			$url = 'https://api.nal.usda.gov/ndb/reports/?ndbno='+ndbno+'&type=f&format=json&api_key=XLrU1QlvPq18XqUk9WOWlL3ShjdlqAPfSCrOxBkc';
			$.post($url, function(data){
				console.log(data);
				result = $('#nutritionSheet');
				html = '';
				if('report' in data){
					data = data['report']['food'];
					orginalItem = $('#'+data['ndbno']);
					name = $(orginalItem).find('h4').html();
					upc = $(orginalItem).find('.upc-code').html();
					html = '<div class="well"><div class="media">';
					html += '	<div class="media-body">';
					html += '	  <h4 class="media-heading" style="font-size: 28px;">'+name+'   <small><br/><i style="font-size: 18px;">UPC: '+upc+'</i></small></h4>';
					if('sd' in data)
					html += '	  <p>'+data['sd']+'</p>';
					if('ing' in data){
						html += '	  <h3>Ingredients:  </h3>';
						html += '	  <p class="ing-tag">'+data['ing']['desc']+'</p>';
					}
					html += '	</div>';
					//html += ' </div>';
					result.html(html);
					html = '<table id="datatable" class="display" cellspacing="0" width="100%">';
					html += '	<thead>';
					html += '		<tr>';
					html += '			<th>Nutrient</th>';
					html += '			<th>Unit</th>';
					html += '			<th>Group</th>';
					html += '			<th>Value per 100 g</th>';
					for(index in data['nutrients'][0]['measures']){
						measure = data['nutrients'][0]['measures'][index];
						html += '			<th>'+measure['label']+' (Qty: '+measure['qty']+')</th>';
					}
					html += '		</tr>';
					html += '	</thead>';
					html += '	<tbody id="nutrientRows">';
					
					for(index in data['nutrients']){
						nut = data['nutrients'][index];
						//console.log(nut['name']);
						html += '<tr>';
						html += '	<td>'+nut['name']+'</td>';
						html += '	<td>'+nut['unit']+'</td>';
						html += '	<td>'+nut['group']+'</td>';
						html += '	<td>'+nut['value']+'</td>';
						for(j in nut['measures']){
							measure = nut['measures'][j];
							html += '			<th>'+measure['value']+'</th>';
						}
						html += '</tr>';
					}
					html += ' </tbody>';
					html += '</table></div>';
					$(result).append(html);
					makeNutrientTable();
				}
				//$('#list2').html(html);
			});
		}
		function makeNutrientTable(){
		 var table = $('#datatable').DataTable({
			"columnDefs": [
				{ "visible": false, "targets": 2 }
			],
			"paging": false,
			"scrollY":   "400px",
			"scrollCollapse": true,
			"order": [[ 2, 'asc' ]],
			"displayLength": 25,
			"drawCallback": function ( settings ) {
				var api = this.api();
				var rows = api.rows( {page:'current'} ).nodes();
				var last=null;
	 
				api.column(2, {page:'current'} ).data().each( function ( group, i ) {
					if ( last !== group ) {
						$(rows).eq( i ).before(
							'<tr class="group"><td colspan="10">'+group+'</td></tr>'
						);
	 
						last = group;
					}
				} );
			 }
		   });
		}
	</script>

  </body>
</html>
