<?PHP
header('Access-Control-Allow-Origin: *');
require '../php_sheets/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use \PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use \PhpOffice\PhpSpreadsheet\IOFactory;

$reader = IOFactory::createReader('Xlsx');
$reader->setReadDataOnly(TRUE);
$spreadsheet = $reader->load("volunteers_list.xlsx");

$worksheet = $spreadsheet->getActiveSheet();
$highestRow = $worksheet->getHighestRow();
$highestColumn = $worksheet->getHighestColumn();
$highestColumn++;

?>



<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"></script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Montserrat" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="js/html2canvas.js" crossorigin="anonymous"></script> 
</head>
<body style="font-family: 'Montserrat', sans-serif;">
	<?php 
	echo '<div class="container select_mate" id="contain_id"><h1>CSHC Virtual ID Card</h1><br>
	<form action="' . htmlspecialchars($_SERVER["PHP_SELF"]) . '" method="POST" enctype="multipart/form-data" id="fm" class="myForm">'	;
	echo '<div class="row justify-content-md-center"><div class="col-lg-9 col-sm-12"><select id="name" name="name"><option selected disabled value="">Please choose your Name</option>';
	for ($row = 2; $row <= $highestRow; ++$row) {
		$col = 'A';
		echo "<option value='". $row;
		echo "'>";
		echo $worksheet->getCell($col . $row)
		->getValue();
		echo "</option>";
	}
	echo '</select></div>' . PHP_EOL;
	
	echo '<div class="col-lg-3 col-sm-12">
					<div class="file">
						<input type="file" name="image" title="image" id="img"style="display:none;">
						<label for="img">Click here to upload image</label>
					</div>
				</div>';
	echo '<div class="col-lg-3 col-sm-6 mt-4 text-center">
					<input type="submit" name="submit" value="Generate ID Card" class="btn btn-lg">
				</div>';
	echo '</div></form></div>';

	if(isset($_POST["submit"])){
		$r = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);

		if ($r) {
			if(!empty($_FILES["image"]["name"])) { 
				$fileName = basename($_FILES["image"]["name"]);
				$fileType = pathinfo($fileName, PATHINFO_EXTENSION); 
				$allowTypes = array('jpg','png','jpeg','gif', 'JPG', "JPEG", 'PNG', "GIF"); 
				if(in_array($fileType, $allowTypes)){ 
					$image = $_FILES['image']['tmp_name']; 
					$imgContent = file_get_contents($image);
					// echo $imgContent;
					$res = 'data:image/' . $fileType . ';base64,' . base64_encode($imgContent);
					?>

					<div class="container text-center" style="padding: 60px 40px;">
		<div class="row justify-content-md-center">
			<div class="col-sm-auto" style="margin-left: auto;margin-right: auto;display: inline-block;float: none;">
				<div class="id" style="width: 500px; height:auto; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; background: url(pattern.jpg);" id="html-content-holder">
					<!-- background-color:#EAECEE; -->
					<div class="row">
						<div class="col-sm-12" style="padding:20px;">
							<div class="row">
								<div class="col-sm-3">
									<img src="Logos/Section Logos/ieee hyd logo.png" alt="" width="121px">
								</div>
								<div class="col-sm-3">
									<img src="Logos/SAC Logos/sn logo (o).png" alt="" height="40px" class="mx-auto d-block">
								</div>
								<div class="col-sm-3">
									<img src="Logos/75 Years CS/CS 75 Years .png" alt="" height="40px">
								</div>
								<div class="col-sm-3">
									<img src="Logos/CS Hyd Logos/IEEE-CS-HyderabadChapter-Logo.png" alt="" height="40px">
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<img src="CSHC Logo.png" alt="" height="80px">
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12" style="padding:20px;">
							<img src="bg4.png" alt="" height="400px" width="480px;" style="position: absolute; display: block; z-index:0;">
							<img src="<?php echo $res ?>" height="240px" width="240px" class="rounded-circle" style="position: relative; top: 50px; z-index:1;">
						</div>
					</div>
					<div class="row mt-5" >
						<h2 style="font-weight: 900;color:#1B4F72;"><?php echo $worksheet->getCell('A' .$r)->getValue() ?></h2>
						<h3 style="font-weight: 600; font-size:24px;"><?php echo $worksheet->getCell('C' .$r)->getValue() ?></h3>
						<h4 style="font-size:17px"><?php echo $worksheet->getCell('B' .$r)->getValue() ?></h4>
					</div>
					<div class="row" style="background-color: #125767; padding-top: 20px;padding-bottom: 20px;margin: 0;margin-top: 20px; text-align: center; color: #fff;">
						<h6 style="margin-bottom: 0;font-size: 12px;">https://ewh.ieee.org/r10/hyderabad/c/cshc/</h6>
						
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12 dwn">
				<input type="button" value="Download" id="btnConvert" class="btn btn-lg text-center mt-3" >
			</div>
		</div>
		

		
	</div>



					
					<!-- <div class="row">
						<div class="col-lg-6 ">
							<div class="id_c">			
								<div class='id'  id="html-content-holder">
									<div class='bgimg'>
										<div class='background'>
											<img src='bg.png'>
										</div>
										<div class='logo text-center'>
											<img src='cshs white png.png'>
										</div>
										<div class='profile-pic text-center'>
											<img src="<?php echo $res ?>" alt="">
										</div>
									</div>
									<div class='vol_details text-center'><h2><?php echo $worksheet->getCell('A' .$r)->getValue() ?></h2>
										<h3><?php echo $worksheet->getCell('C' .$r)->getValue() ?></h3>
										<h4><?php echo $worksheet->getCell('B' .$r)->getValue() ?></h4>			
									</div><div class='links text-center'>
										<h4>https://ewh.ieee.org/r10/hyderabad/c/cshc</h4>
									</div>
								</div>
							</div>			
						</div> -->
						<!-- <div class="col-lg-6 dwn">
							<input type="button" value="Download" id="btnConvert" class="btn btn-lg text-center" >
						</div>
					</div> -->

					<script>
						$("#btnConvert").on('click', function () {

							html2canvas(document.getElementById("html-content-holder"),{
								allowTaint: true, useCORS: true
							}).then(function (canvas) {
								const imgData = canvas.toDataURL('image/png');
								console.log(imgData);
								var anchorTag = document.createElement("a");
								anchorTag.download = "<?php echo $worksheet->getCell('A' .$r)->getValue().".jpg"; ?>";
								anchorTag.href = canvas.toDataURL("image/png");
								anchorTag.target = '_blank';
								anchorTag.click();
							});
						});
					</script>

					<?php 
				}
			}
		}
	}
	?>

	<style>

.select_mate p{
		font-size: 12px;
		text-align: center;
		font-family: 'Montserrat', sans-serif;
		font-weight: 600;
		color: red;

	}
	
	select{
		border: none;
		height: 50px;
		border-radius: 7px;
		background-color: #fff;
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
		margin-bottom: 30px;
		padding-left: 40px;
		width: 100%;
		font-size: 18px;
		font-family: 'Montserrat', sans-serif;
	}
	option{
		position: relative;
		overflow: hidden;
	}
	/*.container{
		padding: 60px;
	}*/
	.container h1{
		font-size: 48px;
		font-weight: 600;
		font-family: 'Montserrat', sans-serif;
		text-align: center;
	}
	input[type=file]::file-selector-button, label {
 		 background: #2E86C1;
		color: #fff;
		width: 100%;
		border: 0;
		padding: 10px;
		border-radius: 4px;
		text-align: center;
}
input[type=file]{
	width: 100%;
}
	input[type='submit'] {
		background: #34495E;
		color: #fff;
		text-align:center;
	}
	.btn:hover {
		color: #fff;

	}
	#btnConvert{
		background-color: #58D68D;
		color: #fff;
	}
@media only screen and (max-width: 600px) {
  .container{
  	padding:  30px;
  }
}
</style>
</body>
</html>
