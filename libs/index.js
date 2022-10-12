var term;

		
if(outerWidth != 1920){
	handler.chartResize();
}

function onRestore(){
	handler.showCountry();
}

function onChangeMode(val){
	if(val == '3d'){
		$("#globe3D").css("background-image","url(./imgs/globe_ico_selected.png)");
		$("#map2D").css("background-image","url(./imgs/map_ico.png)");
		location.reload();
	}else{
		$("#map2D").css("background-image","url(./imgs/map_ico_selected.png)");
		$("#globe3D").css("background-image","url(./imgs/globe_ico.png)");
		handler.disposeMesh();
		handler.isGlobe = false;
		handler.init.call(handler);
	}
}		
		
function term_search_pop(_self, type){
	var width = $("#term_search").width()
	var top = $(_self).offset().top+30;
	var left = $(_self).offset().left-width+20;
	$("#term_search").css("display","block");
	$("#term_search").css("top",top+"px");
	$("#term_search").css("left",left+"px");
	
	var today = new Date();
	var month = today.getMonth()+1;
	var date = today.getDate();
	
	var str = today.getFullYear()+'-'+ month +'-'+date;
	
	$("#start").val(str);
	$("#end").val(str);
	//달력 설정
	$("#start").datepicker({
		format:"yyyy-mm-dd",
		autoclose:true,
		language:'ko',	//korea version js파일 필요
		todayHighlight : true	//오늘 날짜 하이라이트
	})
	
	$("#end").datepicker({
		format:"yyyy-mm-dd",
		autoclose:true,
		language:'ko',	//korea version js파일 필요
		todayHighlight : true	//오늘 날짜 하이라이트
	})
}

function close_term_pop(){
	$("#term_search").css("display","none");
}

function setTerm(id, flag){
	reset();
	$(id).css("background-color","#00a8e9");
	$(id).css("color","white");
	term = flag;
}

function reset(){
	$(".setTerm").css("background-color","#ffffff");
	$(".setTerm").css("color","black");
}

function onSearch(){
	var start = $("#start").val();
	var end = $("#end").val();
	if(term == undefined){
		term = 'M'
	}
	alert(start+"~"+end+' '+term);
	term = undefined;
	
	close_term_pop()
}

function dragMouseDown(e) {
	e = e || window.event;
	e.preventDefault();
	// get the mouse cursor position at startup:
	pos3 = e.clientX;
	pos4 = e.clientY;
	document.onmouseup = closeDragElement;
	// call a function whenever the cursor moves:
	document.onmousemove = elementDrag;
}
function elementDrag(e) {
	var elmnt = document.getElementById('term_search');
	e = e || window.event;
	e.preventDefault();
	// calculate the new cursor position:
	pos1 = pos3 - e.clientX;
	pos2 = pos4 - e.clientY;
	pos3 = e.clientX;
	pos4 = e.clientY;
	// set the element's new position:
	elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}
function closeDragElement() {
	/* stop moving when mouse button is released:*/
	document.onmouseup = null;
	document.onmousemove = null;
}

function changeGlobeMat(){
	var checkBox = document.getElementById("toggle_chk");
	
	if(checkBox.checked){
		handler.earth.material.diffuseTexture = new BABYLON.Texture("imgs/earthmap.jpg", handler.scene);
		handler.cloud.isVisible = false;
	}else{
		handler.earth.material.diffuseTexture = new BABYLON.Texture("imgs/earth_map.jpg", handler.scene);
		handler.cloud.isVisible = true;
	}
}