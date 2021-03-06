<?php 
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.
?>
<!DOCTYPE html>
<html>
<head>
	<title>Face Detection Application</title>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="marvinj/marvinj-0.7.js"></script>
	<script src="face_detection/dist/jquery.facedetection.min.js"> </script>
	<script src="photo_approval.js"></script>
	<style>
		.face-box {
  		border: 1px solid #f00;
  		position:absolute;
		}
	</style>
</head>
<body onload="getImageOutline();">

<h1>Photo Approval Application</h1>
<div id="wrapper"></div>

<img id="picture" src="original_photos/color/wu/1.jpg">
<canvas id="outlineCanvas"></canvas>
<canvas id="grayscaleCanvas"></canvas>
<br />
<button onclick="getNextPhoto(false)">Prev</button>
<button onclick="getNextPhoto(true)">Next</button>
<br />
<p id="data"></p>
<p id="pixels"> </p>
<p id="response"></p>
<p id="gs"></p>
<br />

<!-- <fieldset> -->
<!--Image setings-->
<!-- Interval: <input type="number" id="interval" name="interval" min="1" max="100" value="4"> <br/> <br/>
minNeighbors: <input type="number" id="minNeighbors" name="minNeighbors" min="1" max="100" value="1"><br /><br />
Confidence: <input type="number" id="confidence" name="confidence" min="1" max="100" value=""><br/><br/>

<br />
<label>Grayscale</label><br />
<input type="radio" name="grayscale" id="grayscale" value="true"> True<br>
<input type="radio" name="grayscale" id="grayscale" value="false" checked="checked"> False<br> -->
<br>
<button onclick="analyzeImage(6);">Analyze</button>
<button onclick="getImageOutline();">Outline</button>
<!-- <button onclick="debug()">Analyze</button> -->

<!-- </fieldset> -->

</body>
</html>


