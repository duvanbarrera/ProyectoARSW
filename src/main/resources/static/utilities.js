
//Document utilities.js allow implement functions assistants



function download(){
	alert("sd");
	var doc = new jsPDF();
	var x = document.getElementById("fileSelected");	
	var selected = x.options[x.selectedIndex].value;
	var download ;
	if (selected=="latex") {
		download = document.getElementById("prueba").value;
			
	}else if (selected=="text"){
		download = document.getElementById("message").value;
		
	};

	alert(selected +" ssdsf .l. "+download);
	doc.setFontSize(30);
	doc.text(20,20,download);
	doc.save("");
	

}