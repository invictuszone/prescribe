<?php
// include 'dbmergescript.php';
include 'assets/dbmerge/dbmergescript.php';
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
    <link rel="shortcut icon" href="assets/dbmerge/img/favicon.png">

    <title>Prescribe Diets Database Merger</title>

    <!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- bootstrap theme -->
		<!-- <link href="css/bootstrap-theme.css" rel="stylesheet"> -->
    <link href="assets/dbmerge/css/bootstrap-theme.css" rel="stylesheet">
    <!--external css-->
    <!-- font icon -->
    <link href="assets/dbmerge/css/elegant-icons-style.css" rel="stylesheet" >
    <link href="assets/dbmerge/css/font-awesome.min.css" rel="stylesheet" >
		<link href="assets/dbmerge/assets/datatables/datatables.min.css" rel="stylesheet" >
    <!-- <link href="assets/global/plugins/datatables/datatables.min.js" rel="stylesheet" > -->


    <!-- date picker -->

    <!-- color picker -->

    <!-- Custom styles -->
    <link href="assets/dbmerge/css/style.css" rel="stylesheet">
    <link href="assets/dbmerge/css/style-responsive.css" rel="stylesheet" >
	  <style>
		.bootstrap-tagsinput {
			border:none;
			box-shadow: none;
			line-height: 20px;
			cursor: not-allowed;
		}
		.searchother{
			margin-left: 25%;
			margin-top: 10px;
			margin-bottom: 0px;
			color: #34aadc;
			cursor: pointer;
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
		.list-group-item-heading{
			font-size: 14px;
		}
		.media-heading{
			font-size: 14px; !important
		}
		.infoEdamam{
			font-size: 12px;
		}
		.dtbadge{
			background: #ffffff;
			color: #007aff;
			margin: 3px;
			padding: 6px;
			height: 100%;
		}
		.dtdiv{
			padding: 10px;
			margin-bottom: 10px;
			font-size: 14px;
			FONT-WEIGHT: bolder;
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
						<h3 class="page-header"><i class="fa fa-database"></i> Merge Prescribe Diet Database, USDA Database and Edamam Database</h3>
					</div>
			  </div>
              <div class="row">
                  <div class="col-md-4">
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

                  <div class="col-md-4">
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
                  <div class="col-md-4">
                      <section class="panel">
                          <header class="panel-heading">
                             Edamam
                          </header>
                          <div class="panel-body" id="list3">
							  <div class="input-group" style="margin-bottom: 20px;">
								<input id="edamam-search" type="text" class="form-control input-lg" placeholder="Search Edamam">
								<input id="edamam-page" type="hidden" value="0">
								<div class="input-group-btn">
								  <button class="btn btn-primary" style="height: 45px;width: 45px;" onclick="$('#edamam-page').val('0');searhEdamam();">
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
			  </div>
			  <div class="row">
				<div class="col-md-12">
					<button class="btn btn-block btn-primary" style="margin-bottom:10px;">More Details</div>
				</div>
			  </div>
			  <div class="row">
				  <div class="col-md-8">
					  <section class="panel">
						  <header class="panel-heading">
							 USDA Details
						  </header>
						  <div class="panel-body" id="usdanutritionSheet">

						  </div>
					  </section>
				  </div>
				  <div class="col-md-4">
					  <section class="panel">
						  <header class="panel-heading">
							 USDA Details
						  </header>
						  <div class="panel-body" id="edamamnutritionSheet">

						  </div>
					  </section>
				  </div>
              </div>
          </section>
      </section>
  </section>
  <!-- container section end -->
    <!-- javascripts -->
    <script src="assets/dbmerge/js/jquery.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- nice scroll -->
    <script src="assets/dbmerge/js/jquery.scrollTo.min.js"></script>
    <script src="assets/dbmerge/js/jquery.nicescroll.js" type="text/javascript"></script>

    <!-- jquery ui -->
    <script src="assets/dbmerge/js/jquery-ui-1.9.2.custom.min.js"></script>

    <!--custom checkbox & radio-->
    <script type="text/javascript" src="assets/dbmerge/js/ga.js"></script>
    <!--custom switch-->
    <script src="assets/dbmerge/js/bootstrap-switch.js"></script>
    <!--custom tagsinput-->
    <script src="assets/dbmerge/js/jquery.tagsinput.js"></script>

    <!-- colorpicker -->

    <!-- bootstrap-wysiwyg -->
    <script src="assets/dbmerge/js/jquery.hotkeys.js"></script>
    <script src="assets/dbmerge/js/jquery.hotkeys.js"></script>
    <script src="assets/dbmerge/assets/list.min.js"></script>
	<script src="assets/dbmerge/assets/jquery.slimscroll.min.js"></script>
    <script src="assets/dbmerge/assets/datatables/datatables.min.js"></script>
    <script src="assets/dbmerge/assets/tags/bootstrap-tagsinput.js"></script>
    <script src="assets/dbmerge/js/bootstrap-wysiwyg.js"></script>
    <script src="assets/dbmerge/js/bootstrap-wysiwyg-custom.js"></script>
	<script src="assets/dbmerge/js/tinysort.min.js"></script>
    <!-- ck editor -->
    <script type="text/javascript" src="assets/dbmerge/assets/ckeditor/ckeditor.js"></script>
    <!-- custom form component script for this page-->
    <script src="assets/dbmerge/js/form-component.js"></script>
    <!-- custome script for all page -->
    <script src="assets/dbmerge/js/scripts.js"></script>

	<script>
		$(document).ready(function(){
			$('.list').slimScroll({
				height: '400px'
			});
			var listPD = new List('list1', {
			  valueNames: ['name','ing','ismapped']
			});
		});
		function selectPDItem(ele){
			var text = $(ele).find('h4').text();
			$('#usda-search').val(text);
			$('#edamam-search').val(text);
			$('#edamam-page').val('0');
			searhUSDA();
			searhEdamam();
		}
		function changeEdamamSearch(text){
			$('#edamam-search').val(text);
			$('#edamam-page').val('0');
			searhEdamam();
		}
		function changeUSDASearch(text){
			$('#usda-search').val(text);
			searhUSDA();
		}
		$("#usda-search").on('keyup', function (e) {
    			if (e.keyCode == 13) {
				searhUSDA();
			}
		});
		$("#edamam-search").on('keyup', function (e) {
    			if (e.keyCode == 13) {
				$('#edamam-page').val('0');
				searhEdamam();
			}
		});
		function matchScore(source,target){
			source = source.toLowerCase();
			target = target.toLowerCase();
			//console.log(source,target);
			var terms = source.split("&");
			score = 0;
			for (var term of terms) {
				term = term.trim();
				if(target.indexOf(term) != -1){
					score++;
				}
			}
			return score;
		}
		function searhUSDA(){
			$('#list2').find('.list').html('<img src="assets/dbmerge/assets/loading.gif" style="    max-width: 100%;"/>');
			$('#usdanutritionSheet').html('');
			name = $('#usda-search').val();
			name = name.replace(/[^a-zA-Z0-9]/g, '&');
			name = name.replace('&&', '&');
			name = name.replace('BodyPro','');

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
						score = matchScore(name,item['name']);
						html += '	  <h4 class="list-group-item-heading" >'+item['name']+'</h4>';
						html +='<p class="mscore hidden-item">'+score+'</p>';
						html += '	  <span class="label label-default">'+item['group']+'</span>';
						if(item['ds']=="BL")
							html += '	  <span class="label label-warning ds">Branded Food Products</span>';
						else
							html += '	  <span class="label label-warning ds">Standard Release</span>';
						html += '<p class="searchother" onclick="changeEdamamSearch(\''+item['name']+'\');">Search this in Edamam</p>';
						html += '</a>';
					}
				}
				if(html=='')
					html = '<h4 class="list-group-item-heading" >No results available</h4>';
				$('#list2').find('.list').html(html);

				var listUSDA = new List('list2', {
				  valueNames: ['ds','mscore']
				});
				NodeList = $('#list2').find('.list-group-item');
				console.log(NodeList.length);
				tinysort.defaults.order = 'desc';
				tinysort(NodeList,'.mscore','.ds');
				//listUSDA.sort('mscore', { order: "desc" });
				//listUSDA.sort('ds', { order: "desc" });
			});
		}


		function searhEdamam(){
			item = $('#edamam-search').val();
			p = $('#edamam-page').val();
			if(p == '0'){
				//console.log(p+'request');
				$('#edamamnutritionSheet').html('');
				$('#list3').find('.list').html('<img src="assets/dbmerge/assets/loading.gif" style="    max-width: 100%;"/>');
			}
			else{
				$('#list3').find('.list').append('<img src="assets/dbmerge/assets/loading.gif" style="padding-left:30%;max-width:200px;"/>');
				var container = $('#list3').find('.list');
				container.slimScroll({
				  scrollTo: container[0].scrollHeight
				});
			}

			//console.log("sending request for page"+p);
			$.post("edamamRequest.php",
				{searchFood:true, name: item,page: p},
				function(data){
					//console.log(data);
					if(data.slice(-1)=='1')
						data = data.slice(0,-1)
					try {
						var data = jQuery.parseJSON(data);
						//console.log(data);
						html = '';
						if('hints' in data){
							for(index in data['hints']){
								item = data['hints'][index];
								uri = item['food']['uri'];
								itemId = uri.split("#")[1];
								//console.log(item['name']);
								html += '<a class="list-group-item " id="'+itemId+'">';

								html += '	  <h4 class="list-group-item-heading ds" >'+item['food']['label']+'</h4>';
								label = '';
								html += '<select class="form-control" onchange="getItemDetailEdamam(this);" >';
								html += '<option readonly disabled"></option>';

								for(j in item['measures']){
									label = item['measures'][j]['label'];
									labeluri = item['measures'][j]['uri'];
									uri = encodeURI(uri);
									labeluri = encodeURI(labeluri);
									html += '<option foodname="'+item['food']['label']+'" foodurl="'+uri+'" value="'+labeluri+'">'+label+'</option>';
								}
								//html += '	  <span class="label label-default">'+label.slice(0,-1)+'</span>';
								html += '</select>';
								html += '<p class="searchother" onclick="changeUSDASearch(\''+item['food']['label']+'\');">Search this in USDA</p>';
								html += '</a>';
							}
							if(data['page'] != (data['numPages']-1))
								html += '<a class="list-group-item-heading" style="margin-left:30%;cursor: pointer;margin-top:20px;" onclick="searhEdamam();this.parentNode.removeChild(this);" >Show More ( '+((data['numPages']-1)-data['page'])+' Pages)</a>';

							p = parseInt($('#edamam-page').val()) + 1;
							console.log($('#edamam-page').val(p));
							console.log($('#edamam-page').val());

							$('#list3').find('.list').find('img').remove('img');
							$('#list3').find('.list').append(html);
						}
					}
					catch(err) {
						html = 'There was an error while fetching results. Kindly try again.';
							$('#list3').find('.list').remove('img');
							$('#list3').find('.list').append(html);
					}

					var listEdamam = new List('list3', {
					  valueNames: ['ds']
					});
				}
			);
		}
		function getItemDetailEdamam(ele){
			var selectItem = $(ele).find('option:selected');
			var meaure = $(selectItem).val();
			var meauretext = $(selectItem).text();
			var food = $(selectItem).attr('foodurl');
			var foodname = $(selectItem).attr('foodname');
			$.post("edamamRequest.php",
				{searchNutrient:true, muri: meaure,furi: food},
				function(data){
					data = jQuery.parseJSON(data);
					console.log(data);
					if(data!=null){
						var container = $('#edamamnutritionSheet');
						html = '<div class="well">';
						html += '	<div class="media">';
						html += '		<div class="media-body">';
						html += '	  		<h6 class="media-heading" >'+foodname+'   <small></h6>';
						html += '	  		<span class="label label-info infoEdamam">Weight: '+data['totalWeight']+' g</span><br/><br/>';
						html += '	  		<span class="label label-danger infoEdamam">Calories: '+data['calories']+'</span>';
						html += '		</div>';
						html += '	</div>';
						html += '</div>';
						html += '			</div>';
						html += '<table id="datatable2" class="display" cellspacing="0" width="100%">';
						html += '	<thead>';
						html += '		<tr>';
						html += '			<th>Nutrient</th>';
						html += '			<th>Unit</th>';
						html += '			<th>Value Per '+meauretext+'</th>';
						html += '		</tr>';
						html += '	</thead>';
						html += '	<tbody id="nutrientRows2">';

						for(index in data['totalNutrients']){
							nut = data['totalNutrients'][index];
							//console.log(nut['name']);
							html += '<tr>';
							html += '	<td>'+nut['label']+'</td>';
							html += '	<td>'+nut['unit']+'</td>';
							html += '	<td>'+nut['quantity']+'</td>';
							html += '</tr>';
						}
						html += ' </tbody>';
						html += '</table><br/>';
						html += '	  		<div class=" btn-primary dtdiv">Diet Labels: ';
						for(i in data['dietLabels']){
							lbl = data['dietLabels'][i];
							html += '<span class="badge dtbadge">'+lbl+'</span>';
						}
						html += '			</div>';
						html += '	  		<div class="btn-warning dtdiv">Health Labels: ';
						for(i in data['healthLabels']){
							lbl = data['healthLabels'][i];
							html += '<span class="badge dtbadge">'+lbl+'</span>';
						}
						$(container).html(html);
						$('#datatable2').DataTable({
							"paging": false,
							"scrollCollapse": true,
							"displayLength": 25,
							"scrollY":   "400px"
						});
					}
					else{
						alert('No information Avaialble');
					}
				}
			);
		}
		function getItemDetail(ndbno){
			$('#usdanutritionSheet').html('<img src="assets/dbmerge/assets/loading.gif" style="    max-width: 100%;"/>');
			//console.log(ndbno);
			$url = 'https://api.nal.usda.gov/ndb/reports/?ndbno='+ndbno+'&type=f&format=json&api_key=XLrU1QlvPq18XqUk9WOWlL3ShjdlqAPfSCrOxBkc';

			$.post($url, function(data){
				//console.log(data);
				result = $('#usdanutritionSheet');
				html = '';
				if('report' in data){
					data = data['report']['food'];
					orginalItem = $('#'+data['ndbno']);
					name = $(orginalItem).find('h4').html();
					upc = $(orginalItem).find('.upc-code').html();
					html = '<div class="well"><div class="media">';
					html += '	<div class="media-body">';
					html += '	  <h6 class="media-heading">'+name+'   <small><br/><i>UPC: '+upc+'</i></small></h6>';
					if('sd' in data)
					html += '	  <p>'+data['sd']+'</p>';
					if('ing' in data){
						html += '	  <h6>Ingredients:  </h6>';
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
					html += '			<th>Value per gram</th>';
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
						html += '	<td>'+nut['value']/100+'</td>';
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
