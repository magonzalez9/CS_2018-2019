var currentImg = 1; 

function filterImagePixels()  {
	var img = document.getElementById("picture");
	// Create canvas and get image
    var c = document.createElement("canvas");
	var ctx = c.getContext("2d");

    // Set canvas dimensions proportional to image dimensions
    c.width = img.naturalWidth; 
    c.height = img.naturalHeight; 

    // Draw image onto the canvas and get image data
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);


    // Loop through every pixel in order to determine its color
    var pixelArray = new Array(img.naturalHeight); 
    var p = 0; 

  	// Multi dimensional array (x by x)
	for (var i = 0; i < img.naturalHeight; i++) {
		// Multi dimensional array (x by x)
		pixelArray[i] = new Array(img.naturalWidth);

		for (var j = 0; j < img.naturalWidth; j++) {

			if (imgData.data[p] > 160 && imgData.data[p+1] > 155 && imgData.data[p+2] > 155) {
				pixelArray[i][j] = 0; // white pixel
			} else {
				pixelArray[i][j] = 1; // dark pixel
			}
			p+=4; 
	  	}
  	}

    return pixelArray; 
} // --end of function filterImagePixels

function analyzeImage(){
	 
	// Get settings ---------
	var interval = parseInt(document.getElementById('interval').value, 10); 
	var minNeighbors = parseInt(document.getElementById('minNeighbors').value, 10);
	var confidence = parseInt(document.getElementById('confidence').value, 10); 
	var grayscale = document.querySelector('input[name="grayscale"]:checked').value;
	var imageData = ""; 
	// Settings -------------

	var img = document.getElementById("picture");
	var filteredPixelArray = filterImagePixels(); 

	if (grayscale == "false") {
		grayscale = false; 
	} else {
		grayscale = true; 
	}

	/* RETURN VALUES */
	// x — X coord of the face in the picture
	// y — Y coord of the face in the picture
	// width — Width of the face
	// height — Height of the face
	// positionX — X position relative to the document
	// positionY — Y position relative to the document
	// offsetX — X position relative to the offset parent
	// offsetY — Y position relative to the offset parent
	// scaleX — Ratio between original image width and displayed width
	// scaleY — Ratio between original image height and displayed height
	// confidence — Level of confidence position relative to the document

	// Get the face location
    $('#picture').faceDetection({
    	interval: interval,
    	minNeighbors: minNeighbors, 
    	confidence: null, 
    	async: false, 
    	grayscale: grayscale,
        complete: function (faces) {
        	// Get the count
        	if (faces.length > 0 ) {
        		// Output data for TESTING -------------------------------------------------------
        		imageData +=  "Image data (width: " + img.naturalWidth + " | height:" + img.naturalHeight + ")<br>";
        		imageData += "(x: " + faces[0].positionX + " | y: " + faces[0].positionY +")" + "<br>"+ "Face width: "+ faces[0].width + " | Face height: "+ faces[0].height;
        		imageData += "<br> Face Center: (x: " + ((faces[0].positionX+((faces[0].width)/2)) - img.offsetLeft) + ", y: " + ((faces[0].positionY+((faces[0].height)/2)) - img.offsetTop)+ ")"; 
        		document.getElementById("data").innerHTML = imageData;
        		// Output data for TESTING -------------------------------------------------------

        		// Draw the BOX
			    $div = $("<div>", {"class": "face-box"});
			    // $div.css('top', (faces[0].positionY+((faces[0].height)/2)) - img.offsetTop); //y
			    // $div.css('left', (faces[0].positionX+((faces[0].width)/2)) - img.offsetLeft); //x
			    $div.css('top', faces[0].positionY); //y
			    $div.css('left', faces[0].positionX); //x
			    $div.css('width', faces[0].width);
			    $div.css('height', faces[0].height);
			    $("#wrapper").append($div);

			    getImageOutline();

			    // document.getElementById("response").innerHTML = "Confidence: " + faces[0].confidence;
			    // Call the photo approval php 
			    $.ajax({  
				    type: 'post' ,  
				    url: 'photo-approval-post.php', 
				    data: { faceWidth: faces[0].width,
				    		faceHeight: faces[0].height, 
				    		faceXPos: (faces[0].positionX+((faces[0].width)/2)) - img.offsetLeft, 
				    		faceYPos: (faces[0].positionY+((faces[0].height)/2)) - img.offsetTop, 
				    		imgWidth: img.naturalWidth,
				    		imgHeight: img.naturalHeight, 
				    		filteredPixelArray: JSON.stringify(filteredPixelArray)
				    },
				    success: function(response) {
				        document.getElementById("pixels").innerHTML = response;
				    },
				    error : function(xhr, status, error)
				    {
				        alert("There was an error!" + error); 
				    }
				});
        	} else {
        		console.log("No face found");
        	}
        }
    });
}

function getImageOutline(){
	var canvas = document.getElementById("outlineCanvas");
	canvas.width = 275; 
	canvas.height = 275; 

	image = new MarvinImage();
	image.load("original_photos/color/wu/"+currentImg+".jpg", imageLoaded);

	function imageLoaded(){
		  var imageOut = new MarvinImage(image.getWidth(), image.getHeight());
		  // canvas.width = image.getWidth; 
		  // canvas.height = image.getHeight; 
		  // Edge Detection (Prewitt approach)
		  Marvin.prewitt(image, imageOut);
		  // Invert color
		  Marvin.invertColors(imageOut, imageOut);
		  // Threshold
		  Marvin.thresholding(imageOut, imageOut, 190);
		  imageOut.draw(canvas); 
	}
}


// TESTING FUNCTIONS ----------------------------------------------------------------------------------------

function debug(){
	analyzeImage(); 
	testArrays(); 

	var img = document.getElementById("picture");
	pixelArray = filterImagePixels(); 
	alert(img.naturalWidth + ", " + img.naturalHeight );
	var cleanStr = ""; 
	for(var i = 0; i < img.naturalHeight; i++){
		for (var j = 0; j < img.naturalWidth; j++) {
			cleanStr += pixelArray[i][j];
		}
		// cleanStr += "<br>";
	}
	// Print face template
	document.getElementById("pixels").innerHTML = cleanStr;
}

function getNextPhoto(next){
	if (next == true) {
		currentImg++;
	} else {

		currentImg--; 
	}
	document.getElementById("wrapper").innerHTML = "";
	document.getElementById("picture").setAttribute("src", "original_photos/color/wu/" + currentImg + ".jpg");
}

function getGrayScaleValue(r, g, b){
	// Apply affine transfomation to rgb values in order to color-categorize the pixels from 0-1
	// E.g. 0 (lighter pixel) - 1 (darker pixel) 
	// f(t)=(d−c)(b−a) / (t−a) + c
	var rValue = parseFloat(((r - 255) * (1 - 0) / (0 - 255) + 0).toFixed(2));
	var gValue = parseFloat(((g - 255) * (1 - 0) / (0 - 255) + 0).toFixed(2));
	var bValue = parseFloat(((b - 255) * (1 - 0) / (0 - 255) + 0).toFixed(2));

	var sumAvg = ((rValue + gValue + bValue) / 3).toFixed(2);

	// The lower the number the greater the darkness definition 
	var bwSensitivity = .5; 

	if (sumAvg >= bwSensitivity) {
		return "*";
	} else if (sumAvg < bwSensitivity){ 
		return "_"; 
	}
} // --end of function getGrayScaleValue

function testArrays(){
	
	var template = new Array(10); 
	// Create default template array
	for (var i = 0; i < 10; i++){
		template[i] = new Array(10);
		for (var j = 0; j < 10; j++) {
			if ((i == 9 || i == 8 )&& (j>=3 && j<= 6)) {
				template[i][j] = 1;
			} else {
				template[i][j] = 0; 
			}
		}
	} // --end of for loop
	
	printArray(template);

	var width = 100; 
	var height = 100; 
	// Now map to new array in case image dimensions are different
	var newArray = new Array(height); 

	
}

function printArray(arr){
	var cleanStr = "";
	for(var i = 0; i < arr.length; i++){
		for (var j = 0; j < arr[i].length; j++) {
			cleanStr += arr[i][j];
		}
		cleanStr += "<br>";
	}

	document.getElementById("data").innerHTML = cleanStr;
}

