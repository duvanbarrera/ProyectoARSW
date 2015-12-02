
//Document utilities.js allow implement functions assistants



function download(){
	
	var doc = new jsPDF();
	var x = document.getElementById("fileSelected");	
	
	var download = document.getElementById("message").value;
	doc.setFontSize(10);
	doc.text(20,20,download);
	doc.save("");
	

}