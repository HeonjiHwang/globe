var GlobeHandler = function(scene, engine){
	this.scene = scene;
	this.engine = engine;
	this.target = new BABYLON.Vector3(5,-3,-4);
	this.camPos = new BABYLON.Vector3(0.44140673800554797, -0.7402775849282448, 9.568453694683141);
	
	//light
	this.hLight = undefined;
	this.dLight = undefined;
	
	//default mesh and value of globe
	this.earth = undefined;
	this.night = undefined;
	this.cloud = undefined;
	this.parentS = undefined;
	this.radius = 13;
	this.isCenter = false;
	
	//camera
	this.camera = undefined;
	this.camera2 = undefined;
	//gui
	this.gui = {};
	this.disc = [];
	this.center = '수원'
	
	//animation
	this.nPoints = {};
	this.mLine = {};
	this.discObserver = undefined;
	this.clicked = false;
	
	//charts
	this.chartArr = [];
	this.upChart = [];
	this.chartWidth = $(".detail").width()/3;
	
	//longitude and latitude
	this.LonLat = {};
	this.allLonLat = {"California(north)":{lat:36.778259,lon: -119.417931, aws:'Y',gcp:'N',sam:'N'},시드니:{lat:-33.865143,lon:151.209900, aws:'Y', gcp:'Y',sam:'N'}
				 ,Ohio:{lat:40.367474,lon:-82.996216, aws:'Y', gcp:'N',sam:'N'}
				 , 북경:{lat:39.916668,lon:116.383331, sam:'Y',continent:'ASIA',agency:'Y',csp:'N',cx:'N'}
				 ,Melbourne:{lat:-37.8082,lon:144.9578, aws:'N', gcp:'Y',sam:'N'},Toronto:{lat:43.651070,lon:-79.347015, aws:'N', gcp:'Y',sam:'N'}
				 ,Tokyo:{lat:35.652832,lon:139.839478, aws:'Y', gcp:'Y',sam:'N'},"Virginia(north)":{lat:37.926868,lon:-78.024902, aws:'Y', gcp:'Y',sam:'N'}
				 ,Montreal:{lat:45.630001,lon:73.519997, aws:'N', gcp:'Y',sam:'N'},"Salt Lake City":{lat:40.758701,lon:-111.876183, aws:'N', gcp:'Y',sam:'N'}
				 ,"Canada(centeral)":{lat:50,lon:-79, aws:'Y', gcp:'N',sam:'N'}
				 ,홍콩:{lat:22.302711,lon:114.177216, sam:'Y',continent:'ASIA', agency:'Y',csp:'Y',cx:'Y'}
				 ,Stockholm:{lat:59.3326,lon:18.0649, aws:'Y', gcp:'N',sam:'N'},Ireland:{lat:53.350140,lon:-6.266155, aws:'Y', gcp:'N',sam:'N'}
				 ,런던:{lat:51.5073509,lon:-0.1277583, sam:'Y',continent:'EU', agency:'Y',csp:'Y',cx:'Y'}
				 ,파리:{lat:48.864716,lon:2.349014, sam:'N',continent:'EU',agency:'Y',csp:'N',cx:'N'}
				 ,Frankfurt:{lat:50.110924,lon:8.682127, aws:'Y', gcp:'Y',sam:'N'},Zurich:{lat:47.3667,lon:8.5500, aws:'Y', gcp:'Y',sam:'N'}
				 ,Milan:{lat:45.464664,lon:9.188540, aws:'Y', gcp:'N',sam:'N'},Spain:{lat:40.2085,lon:-3.7130, aws:'Y', gcp:'N',sam:'N'}
				 ,"Sao Paulo":{lat:-23.533773,lon:-46.625290, aws:'Y', gcp:'Y',sam:'N'},"Cape Town":{lat:-33.918861,lon:18.423300, aws:'Y', gcp:'N',sam:'N'}
				 ,Bahrain:{lat:25.9434256,lon:50.6014985, aws:'Y', gcp:'N',sam:'N'},Mumbai:{lat:19.076090,lon:72.877426, aws:'Y', gcp:'Y',sam:'N'}
				 ,Hyderabad:{lat:17.387140,lon:78.491684, aws:'Y', gcp:'N',sam:'N'}
				 ,싱가폴:{lat:1.290270,lon:103.851959, sam:'Y',continent:'ASIA',agency:'Y',csp:'N',cx:'N'}
				 ,Indonesia:{lat:-6.200000,lon:106.816666, aws:'Y', gcp:'N',sam:'N'},Ningxia:{lat:36.015854,lon:106.242607, aws:'Y', gcp:'N',sam:'N'}
				 ,Osaka:{lat:34.669529,lon:135.497009, aws:'Y', gcp:'Y',sam:'N'},"Asia Pacific(Melbourne)":{lat:-37.8082,lon:144.9578, aws:'Y', gcp:'N',sam:'N'}
				 ,"Las Vegas":{lat:36.114647,lon:-115.172813, aws:'N', gcp:'Y',sam:'N'},"Los Angeles":{lat:34.052235,lon:-118.243683, aws:'N', gcp:'Y',sam:'N'}
				 ,"Carolina(south)":{lat:33.836082,lon:-81.163727, aws:'N', gcp:'Y',sam:'N'},Netherland:{lat:52.2130,lon:5.2794, aws:'N', gcp:'Y',sam:'N'}
				 ,Belgium:{lat:51.260197,lon:4.402771, aws:'N', gcp:'Y',sam:'N'},Warsaw:{lat:52.237049,lon:21.017532, aws:'N', gcp:'Y',sam:'N'}
				 ,Finland:{lat:60.192059,lon:24.945831, aws:'N', gcp:'Y',sam:'N'},Doha:{lat:25.286106,lon:51.534817, aws:'N', gcp:'Y',sam:'N'}
				 ,델리:{lat:28.610001,lon:77.230003, sam:'Y',continent:'ASIA',agency:'Y',csp:'N',cx:'N'}
				 ,Taiwan:{lat:25.105497,lon:121.597366, aws:'N', gcp:'Y',sam:'N'}
				 ,Jakarta:{lat:-6.121435,lon:106.774124, aws:'N', gcp:'Y',sam:'N'},Seoul:{lat:37.532600,lon:127.024612, aws:'Y', gcp:'Y',sam:'N',continent:'ASIA'}
				 ,Oregon:{lat:44,lon:-120.5, aws:'Y', gcp:'N',sam:'N'}
				 ,일본:{lat:36.2048,lon:138.2529, sam:'Y',continent:'ASIA',agency:'Y',csp:'N',cx:'N'}
				 ,독일:{lat:52.520008,lon:13.404954, sam:'Y',continent:'EU',agency:'Y',csp:'N',cx:'N'}
				 ,모스크바:{lat:55.751244,lon:37.618423, sam:'Y',continent:'EU',agency:'Y',csp:'N',cx:'N'}
				 ,첸나이:{lat:13.067439,lon:80.237617, sam:'Y',continent:'ASIA',agency:'Y',csp:'N',cx:'N'}
				 ,상해:{lat:31.224361,lon:121.469170, sam:'Y',continent:'ASIA',agency:'Y',csp:'N',cx:'N'}
				 ,상암:{lat:37.574373,lon:126.883361, sam:'Y',continent:'ASIA',agency:'Y',csp:'N',cx:'N'}
				 ,수원:{lat:37.263490,lon:127.028302, sam:'Y',continent:'ASIA',agency:'Y',csp:'Y',cx:'Y'}
				 ,산호세:{lat:37.335480,lon:-121.893028, sam:'Y',continent:'AME', agency:'Y',csp:'Y',cx:'Y'}
				 ,뉴저지:{lat:39.833851,lon:-74.871826, sam:'Y',continent:'AME',agency:'Y',csp:'N',cx:'N'}
				 ,브라질:{lat:-23.533773,lon:-46.625290, sam:'Y',continent:'AME',agency:'Y',csp:'N',cx:'N'}};
					
	this.networkLine = {0:{src:'산호세',dst:'뉴저지'}, 1:{src:'산호세', dst:'뉴저지'}, 2:{src:'산호세', dst:'브라질'}, 3:{src:'싱가폴', dst:'독일'}, 
						4:{src:'런던', dst:'싱가폴'}, 5:{src:'런던', dst:'모스크바'}, 6:{src:'홍콩', dst:'델리'}, 7:{src:'홍콩', dst:'첸나이'}, 
						8:{src:'수원', dst:'북경'}, 9:{src:'수원', dst:'일본'}, 10:{src:'수원', dst:'상해'}, 11:{src:'상암', dst:'수원'}, 12:{src:'수원', dst:'홍콩'}, 
						13:{src:'일본', dst:'산호세'}, 14:{src:'홍콩', dst:'싱가폴'}};
							
	this.isGlobe = true;
	this.init.call(this);
}

GlobeHandler.prototype.init = function(){
	var handler = this;
	
	//latitude sorting
	{
		var lat = [], name = [];
		for(k in handler.allLonLat){
			var use = handler.allLonLat[k];
			if(use.sam == 'Y'){
				lat.push(use.lat);
			}
		}
		lat.sort(function(a, b){ return b-a;});
		
		for(var i=0;i<lat.length;i++){
			for(k in handler.allLonLat){
				var use = handler.allLonLat[k];
				if(use.lat == lat[i] && use.sam == 'Y'){
					name.push(k);
				}
			}
		}
		for(var i=0;i<name.length; i++){
			for(k in handler.allLonLat){
				if(k == name[i]){
					var use = handler.allLonLat[k];
					handler.LonLat[k] = use;
				}
			}
		}
	}
	
	//background
	{
		var layer = new BABYLON.Layer('','./imgs/earth_map_background.jpg',handler.scene, true);
		handler.scene.clearColor = new BABYLON.Color3(0,0,0);
	}
	
	//settings
	{
		handler.lightSetting();
		handler.setMaterials();
		handler.MouseEvent();
		
		if(handler.isGlobe == true){
			handler.cameraSetting();
			handler.meshSetting();
			//handler.testCamera();
			//handler.testMesh();
		}else{
			handler.camera2DSetting();
			handler.mesh2DSetting();
		}
	}
	
	handler.hlB = new BABYLON.HighlightLayer("hl", this.scene);
	handler.hlB.outerGlow = false;
}

GlobeHandler.prototype.testCamera = function(){
	var handler = this;
	
	handler.camPos = new BABYLON.Vector3(-2.477365150779833, 10.885810482200009, -1.8450788396640672);
	handler.isCenter = true;
	
	//TARGET CAMERA FOR BACKGROUND & ARCROTATECAMERA FOR TARGETSSSSSS
	{
		var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, BABYLON.Vector3.Zero(), handler.scene);
		
		handler.scene.activeCameras.push(camera);
		handler.scene.activeCamera = camera;
		
		camera.position = handler.camPos;
		camera.attachControl(canvas, true);
		camera.inertia = 0.7;
		camera.lowerRadiusLimit = 10;
		camera.upperRadiusLimit = 1000;
		camera.upperBetaLimit = Math.PI / 2*2;
		camera.angularSensibilityX = camera.angularSensibilityY = 500;
		camera.checkCollisions = true;
	}
	
	//RIGHT CLICK DISABLE & ZOOM IN AND OUT DISABLE ON ARCROTATECAMERA
	{
		var pointers = camera.inputs.attached["pointers"];
		if(pointers){
			pointers.buttons = [0]
		}
		camera.inputs.remove(camera.inputs.attached.mousewheel);
	}
	handler.camera = camera;
};

GlobeHandler.prototype.testMesh = function(){
	var handler = this;	
	
	//EARTH MATERIAL
	{
		var earthMap = new BABYLON.StandardMaterial('earthMap', handler.scene);
		earthMap.diffuseTexture = new BABYLON.Texture("imgs/earthmap.jpg", handler.scene);
		//earthMap.bumpTexture = new BABYLON.Texture("imgs/earth_bumpmap.jpg", handler.scene);
		earthMap.specularColor = new BABYLON.Color3(0,0,0);
	}
	
	//CREATE EARTH MESH
	{
		handler.earth = BABYLON.Mesh.CreateSphere('earth', 120, handler.radius, handler.scene);
		handler.earth.material = earthMap;
		handler.earth.position = new BABYLON.Vector3(0,0,15);
		handler.earth.rotation.z = Math.PI;
		handler.earth.rotation.y = Math.PI*3;
		handler.earth.visibility = 1;
		handler.earth.checkCollisions = true;
		handler.camera.setTarget(new BABYLON.Vector3(0,0,15))
	}
	//PARENT SPHERE(LON & LAT)
	{
		var Psphere = BABYLON.Mesh.CreateSphere('Psphere', 120, handler.radius, handler.scene);
		Psphere.position = new BABYLON.Vector3(0,0,15);
		Psphere.rotation.y = Math.PI*5+Math.PI/2*0.5;
		Psphere.visibility = 0;
		handler.parentS = Psphere;
	}
	//NIGHT
	/*{
		var nightMap = new BABYLON.StandardMaterial('nightMap', handler.scene);
		nightMap.diffuseTexture = new BABYLON.Texture("imgs/earth_lightsmap.jpg", handler.scene);
		nightMap.bumpTexture = new BABYLON.Texture("imgs/earth_bumpmap.jpg", handler.scene);
		nightMap.specularColor = new BABYLON.Color3(0,0,0);
		
		handler.night = BABYLON.Mesh.CreateSphere('night', 120, handler.radius, handler.scene);
		handler.night.material = nightMap;
		handler.night.parent = handler.earth;
		handler.night.visibility = 0;
		handler.night.checkCollisions = true;
	}
		
	//CLOUD
	{	
		var cloudMat = new BABYLON.StandardMaterial('cloudMat', handler.scene);
		cloudMat.opacityTexture = new BABYLON.Texture("imgs/earth_cloud2.png", handler.scene);
		cloudMat.specularColor = new BABYLON.Color3(0,0,0);
		cloudMat.alpha = 0.8
		
		var cloud = BABYLON.Mesh.CreateSphere("cloud", 120, handler.radius+0.1, handler.scene);
		cloud.material = cloudMat;
		cloud.isPickable = false;
		cloud.parent = handler.earth;
		cloud.checkCollisions = true;
		handler.cloud = cloud;
	}*/
	
	var atmosphere1 = new BABYLON.HighlightLayer("hl", scene);
	atmosphere1.addMesh(handler.earth, new BABYLON.Color3.FromHexString('#5aadff'));
	atmosphere1.innerGlow = false;
}

GlobeHandler.prototype.setMaterials = function(){
	var handler = this;
	
	if(handler._blue_mat == undefined){
		var mat = new BABYLON.StandardMaterial("blueMat", handler.scene);
		mat.specularColor = new BABYLON.Color3(0, 0, 0);
		mat.diffuseColor = new BABYLON.Color3.FromHexString('#3498db');
		mat.emessiveColor = new BABYLON.Color3.FromHexString('#000000');
		mat.fogEnable = false;
		mat.forceDepthWrite = true;
		handler._blue_mat = mat;
	}
	
	if(handler._orange_mat == undefined){
		var mat = new BABYLON.StandardMaterial("orangeMat", handler.scene);
		mat.specularColor = new BABYLON.Color3(0, 0, 0);
		mat.diffuseColor = new BABYLON.Color3.FromHexString('#ffa54b');
		mat.emessiveColor = new BABYLON.Color3.FromHexString('#ffa54b');
		mat.fogEnable = false;
		mat.forceDepthWrite = true;
		handler._orange_mat = mat;
	}	

	if(handler._white_mat == undefined){
		var mat = new BABYLON.StandardMaterial("whiteMat", handler.scene);
		mat.specularColor = new BABYLON.Color3(0, 0, 0);
		mat.diffuseColor = new BABYLON.Color3.FromHexString('#ffffff');
		mat.emessiveColor = new BABYLON.Color3.FromHexString('#ffffff');
		mat.fogEnable = false;
		mat.forceDepthWrite = true;
		handler._white_mat = mat;
	}

	if(handler._green_mat == undefined){
		var mat = new BABYLON.StandardMaterial("greenMat", handler.scene);
		mat.specularColor = new BABYLON.Color3(0, 0, 0);
		mat.diffuseColor = new BABYLON.Color3.FromHexString('#04ab28');
		mat.emessiveColor = new BABYLON.Color3.FromHexString('#04ab28');
		mat.fogEnable = false;
		mat.forceDepthWrite = true;
		handler._green_mat = mat;
	}
	
	if(handler._red_mat == undefined){
		var mat = new BABYLON.StandardMaterial("redMat", handler.scene);
		mat.specularColor = new BABYLON.Color3(0, 0, 0);
		mat.diffuseColor = new BABYLON.Color3.FromHexString('#ff0000');
		mat.emessiveColor = new BABYLON.Color3.FromHexString('#ff0000');
		mat.fogEnable = false;
		mat.forceDepthWrite = true;
		handler._red_mat = mat;
	}
}

GlobeHandler.prototype.lightSetting = function(){
	var handler = this;
	handler.hLight = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(2, 10, 3), handler.scene);
	handler.dlight = new BABYLON.HemisphericLight("dlight", new BABYLON.Vector3(0, -3, 0), handler.scene);
	handler.hLight.intensity = 1.2;
	handler.dlight.intensity = 1.1;
}

GlobeHandler.prototype.changeMesh = function(){
	var handler = this;
	
	var max = 14.5;
	var min = 13.5;
	
	var pos = new BABYLON.Vector3(0,0,0);
	
	var observer = handler.scene.onBeforeRenderObservable.add(function(){
		
		var lonlat = handler.LonLat[handler.center];
		var korea = handler.llarToWorld(handler.toRadians(lonlat.lat), handler.toRadians(lonlat.lon), 0, handler.radius/2);
		
		var sphere = BABYLON.Mesh.CreateSphere('k', 30, 0.2, handler.scene);
		sphere.position = korea;
		sphere.parent = handler.parentS;
		sphere.getBoundingInfo().boundingBox._update(sphere.computeWorldMatrix(true));
		pos = sphere.absolutePosition;
		sphere.dispose();
		
		var dis = BABYLON.Vector3.Distance(handler.camera.position, pos);
		if(dis >= min && dis < min+0.4){
			handler.earth.visibility = 0.7;
			handler.night.visibility = 0.2;
		}else if(dis >= min+0.4 && dis < min+0.8){
			handler.earth.visibility = 0.44;
			handler.night.visibility = 0.5;
		}else if(dis >= min+0.8 && dis < max){
			handler.earth.visibility = 0.2;
			handler.night.visibility = 0.7;
		}else if(dis >= max){
			handler.earth.visibility = 0;
			handler.night.visibility = 1;
		}else{
			handler.earth.visibility = 1;
			handler.night.visibility = 0;
		}
	});
}

GlobeHandler.prototype.EarthAnimation = function(){ //animation 수정
	var handler = this;
	
	var plus = 0.0585;
	
	var max = Math.PI*4;
	if(handler.isCenter == true){
		var max = Math.PI*5+Math.PI/2*0.5
	}
	//EARTH ANIMATION WHEN LOADING ALL FINISHED
	{
		var startOb = handler.scene.onBeforeRenderObservable.add(function(){
			handler.earth.rotation.y += plus;
			handler.parentS.rotation.y += plus;
		});
	}
	handler.cameraMove(startOb);
};

GlobeHandler.prototype.cameraMove = function(startOb){
	var handler = this;
	
	var observer = handler.scene.onBeforeRenderObservable.add(function(){
		handler.camera2.position.x += 0.0401;
		handler.camera2.position.y += 0.03094;
		handler.camera2.position.z += 0.04007;
		
		if(handler.camera2.position.x >= 5.2 && handler.scene.onBeforeRenderObservable.hasObservers()){
			handler.scene.onBeforeRenderObservable.remove(observer);
			handler.scene.onBeforeRenderObservable.remove(startOb);
			console.log(handler.camera2.position);
			handler.camera2.position = new BABYLON.Vector3(5.2,4,0);
			handler.earth.rotation.y = Math.PI*4;
			handler.parentS.rotation.y = 0;
			handler.setLinks();
			setTimeout(function(){
				handler.showChart(1);
			},500)
			
			var cloudOb = handler.scene.onBeforeRenderObservable.add(function(){
				handler.cloud.rotation.y += 0.001;
				handler.cloud.rotation.x += 0.0005;
				handler.cloud.rotation.z += 0.002;
			});
		}
	});
	
	return observer;
}

GlobeHandler.prototype.setLinks = function(){
	var handler = this;
	
	//get all position from LonLat and create sphere to link the flags
	{
		for(k in handler.LonLat){
			var coor = handler.LonLat[k];
			var pos = handler.isGlobe == true ? handler.llarToWorld(handler.toRadians(coor.lat), handler.toRadians(coor.lon), 0, handler.radius/2)
											  : handler.llarTo2D(coor.lat, coor.lon, 0);
			
			var sphere = BABYLON.Mesh.CreateSphere(k, 30, 0.2, handler.scene);
			sphere.position = pos;
			sphere.visibility = 0;
			sphere.parent = handler.isGlobe == true ? handler.parentS : handler.map;
			
			handler.flagSetting(sphere, k);
			for(key in handler.networkLine){
				var src = handler.networkLine[key].src;
				var dst = handler.networkLine[key].dst;
				if(k == src){
					lonlat = handler.LonLat[k];
					var benchmark = handler.isGlobe == true ? handler.llarToWorld(handler.toRadians(lonlat.lat), handler.toRadians(lonlat.lon), 0, handler.radius/2)
															: handler.llarTo2D(lonlat.lat, lonlat.lon, 0);
					dstLonLat = handler.LonLat[dst];
					handler.createLine(benchmark, lonlat, dstLonLat, dst, sphere, src);
				}
			}
		}
	}
}

//vec3(benchMark), benchmark(lonlat), nation(lonlat), nation(string), sphere, srcnation(string)
GlobeHandler.prototype.createLine = function(korea, benchMark, lonlat, nation, sphere, srcNation){
	var handler = this;
	if(lonlat == undefined) return;
	//get middle points 
	{
		var mid = [];
		if(handler.isGlobe == true){
			var other = handler.llarToWorld(handler.toRadians(lonlat.lat), handler.toRadians(lonlat.lon), 0, handler.radius/2);	//endPoint
			var distance = BABYLON.Vector3.Distance(korea, other);
			var alt = distance >= 12 ? 6 : distance >=10 ? 5 : distance >=8 ? 2.8 : distance >= 3 ? 2 : 0.5; 		//altitude
			mid = handler.getMidPoint(benchMark, lonlat, alt);								//get middle points (src{lon,lat}, dst{lon,lat}, altitude)
		}else{
			var other = handler.llarTo2D(lonlat.lat, lonlat.lon, 0);	//endPoint
			var distance = BABYLON.Vector3.Distance(korea, other);
			var alt = distance >=8 ? 1 : distance >= 3 ? 1 : 0.5; 		//altitude
			var mid1 = handler.get2DMidPoint(korea, other, alt, 0.25);
			var mid2 = handler.get2DMidPoint(other, korea, alt, 0.25);
			mid1.y-=0.5; mid2.y-=0.5;
			mid = [mid1, mid2];
		}
	}
	
	//get bezier curve points
	{
		var points = [];
		var dot = handler.isGlobe == true ? distance*30 : (distance+1)*30;
		var bezier = BABYLON.Curve3.CreateCubicBezier(korea, mid[0], mid[1], other, dot);
		var roundedPoints = bezier.getPoints();
		for(var j=0;j<roundedPoints.length;j++){
			points.push(roundedPoints[j]);
		}
		handler.nPoints[srcNation+"_"+nation] = points;
		
		var activeLine = BABYLON.MeshBuilder.CreateLines("line_"+srcNation+"_"+nation, {points:points}, handler.scene);
		activeLine.parent = handler.isGlobe == true ? handler.parentS : handler.map;
		activeLine.visibility = 0;
	}
	
	//create line
	{
		var i=0, arr = [], line;
		var observer = handler.scene.onBeforeRenderObservable.add(function(){
			
			var point = [points[i], points[i+1]];
			var line = BABYLON.MeshBuilder.CreateLines("path", {points:point}, handler.scene);
			line.parent = handler.isGlobe == true ? handler.parentS : handler.map;
			arr.push(line);
			
			var point = [points[i+2], points[i+3]];
			var line = BABYLON.MeshBuilder.CreateLines("path", {points:point}, handler.scene);
			line.parent = handler.isGlobe == true ? handler.parentS : handler.map;
			arr.push(line);
			
			i+=4;
			if(i+4 > points.length && handler.scene.onBeforeRenderObservable.hasObservers()){
				handler.scene.onBeforeRenderObservable.remove(observer);
				for(var j=0;j<arr.length;j++)
					arr[j].dispose();
				arr = [];
				handler.setLines(points, 0, 0, nation, srcNation, activeLine); //미리 라인 만들어놓음
				handler.movingLine(srcNation+"_"+nation, 0, 0);			//라인 움직임
			}
		});
	}
}

GlobeHandler.prototype.setLines = function(points, idx, index, nation, src, activeLine){
	var handler = this;
	
	//중복체크
	for(k in handler.mLine){
		if(k == src+"_"+nation)
			return;
	}
	var arr = [];
	for(var i=idx;i<points.length;i++){
		if(i+2 <= points.length){
			var point = [points[i],points[i+1]];
			var line = BABYLON.MeshBuilder.CreateLines("path_"+src+"_"+nation, {points:point}, handler.scene);
			line.parent = handler.isGlobe == true ? handler.parentS : handler.map;
			line.isVisible = false;
			arr.push(line);
		}
	}
	
	var line = BABYLON.Mesh.CreateTube(src+"_"+nation, points, 0.02, 10, null, 3, handler.scene, false, BABYLON.Mesh.FRONTSIDE);
	line.material = handler._red_mat;
	line.parent = handler.isGlobe == true ? handler.parentS : handler.map;
	line.isVisible = false;
	handler.hlB.addMesh(line, new BABYLON.Color3.FromHexString('#ff0000'));
	
	handler.mLine[src+"_"+nation] = {mesh: arr, stat:'G', error:line, active:activeLine};
}

GlobeHandler.prototype.movingLine = function(key, idx, index){
	var handler = this;
	
	if(handler.mLine[key] == undefined) return;
	
	var arr = handler.mLine[key].mesh;
	var stat = handler.mLine[key].stat;
	var line = handler.mLine[key].error;
	
	if(arr.length <= 0)return;
	
	for(var i=0;i<arr.length;i++){
		arr[i].isVisible = false;
		if(stat == 'G'){
			arr[i].color = new BABYLON.Color3.White();
			line.isVisible = false;
		}
		else if(stat == 'B'){
			line.isVisible = line.isVisible == false ? true : false;
			arr[i].color = new BABYLON.Color3.Red();
		}
		else if(stat == 'S'){
			arr[i].color = handler._orange_mat.diffuseColor;
			line.isVisible = false;
		}
	}
	
	for(var i=idx;i<arr.length;i+=2){
		if(i+2 <= arr.length){
			arr[i].isVisible = true;
		}
		if(i>=index && i<=index+7)
			arr[i].color = handler._blue_mat.diffuseColor;
	}
	
	setTimeout(function(){
		idx = idx == 0 ? 1 : 0;
		index = (index+7 <= arr.length+2) ? index+7 : 0;
		handler.movingLine(key, idx, index);
	},500);
}

GlobeHandler.prototype.distanceObserver = function(mesh){
	var handler = this;
		
	var len = Object.keys(handler.LonLat).length-1;
	var max = 13.8;
	var min = 13.3;
	if(handler.isCenter == true){
		max = 19;
		min = 18.3;
	}
	var nation = mesh.name;
	var arr = handler.gui[nation];
	if(arr == undefined) return;
	
	setTimeout(function(){
		var observer = handler.scene.onBeforeRenderObservable.add(function(){
			var dis = BABYLON.Vector3.Distance(handler.camera.position, mesh.absolutePosition);
			if(dis >= min && dis < min+0.2){
				for(var i=0;i<arr.length;i++){
					arr[i].alpha = 0.7;
				}
			}else if(dis >= min+0.2 && dis < min+0.4){
				for(var i=0;i<arr.length;i++){
					arr[i].alpha = 0.4;
				}
			}else if(dis >= min+0.4 && dis < max){
				for(var i=0;i<arr.length;i++){
					arr[i].alpha = 0.2;
				}
			}else if(dis >= max){
				for(var i=0;i<arr.length;i++){
					arr[i].alpha = 0;
				}
			}else{
				for(var i=0;i<arr.length;i++){
					arr[i].alpha = 1;
				}
			}
		});
	},500);
}

GlobeHandler.prototype.MouseEvent = function(){
	var handler = this;
	
	handler.scene.onPointerObservable.add((pointerInfo)=>{
		switch(pointerInfo.type){
			case BABYLON.PointerEventTypes.POINTERMOVE:
				var pickInfo = handler.scene.pick(handler.scene.pointerX, handler.scene.pointerY, function(mesh){return mesh.isPickable;});
				if(pickInfo != undefined && pickInfo.pickedMesh != null){
					if(pickInfo.pickedMesh.name.includes("line") && pickInfo.pickedMesh.isVisible == true){
						$("#viewport").css("cursor", "pointer");
					}else{
						$("#viewport").css("cursor", "default");
					}
				}
				break;
			case BABYLON.PointerEventTypes.POINTERDOWN:
				var pickInfo = handler.scene.pick(handler.scene.pointerX, handler.scene.pointerY, function(mesh){return mesh.isPickable;});
				if(pickInfo != undefined && pickInfo.pickedMesh != null){
					if(pickInfo.pickedMesh.name.includes("line_") && pickInfo.pickedMesh.isVisible == true){
						var targetName = pickInfo.pickedMesh.name.split("_")[2];
						handler.hideCountry(targetName);
					}
				}
				break;
		}
	});
}

GlobeHandler.prototype.hideCountry = function(nation){
	var handler = this;
	handler.clicked = true;
	$("#closeBtn").css("display","block");
	
	//reset
	{
		for(key in handler.gui){
			if(key != nation){
				var arr = handler.gui[key];
				for(var i=0;i<arr.length;i++){arr[i].isVisible = false;}
			}
		}
		for(key in handler.mLine){
			var arr = handler.mLine[key].mesh;
			handler.mLine[key].error.isVisible = false;
			handler.mLine[key].active.isVisible = false;
			for(var i=0;i<arr.length;i++){
				arr[i].visibility = 0;
			}
		}
		for(var i=0;i<handler.disc.length;i++){
			handler.disc[i].dispose();
		}
		handler.scene.onBeforeRenderObservable.remove(handler.discObserver);
		handler.disc = [];
	}
	//camera action
	{
		var animation = handler.cameraAction(1, undefined, nation);
		animation.onAnimationEnd = function(){
			handler.updateData(nation);
			handler.createDisc(nation);
		}
	}
	
	//show network line
	{
		for(k in handler.networkLine){
			var src = handler.networkLine[k].src;
			var dst = handler.networkLine[k].dst;
			
			var key = src == nation ? dst : dst == nation ? src : 'none';
			if(key != 'none'){
				var arr = handler.gui[key];
				for(var i=0;i<arr.length;i++){arr[i].isVisible = true;}
			}
		}
		for(k in handler.mLine){
			if(k.includes(nation)){
				var arr = handler.mLine[k].mesh;
				handler.mLine[k].active.isVisible = true;
				handler.mLine[k].error.isVisible = handler.mLine[k].stat == 'B' ? true : false;
				for(var i=0;i<arr.length;i++){
					arr[i].visibility = 1;
				}
			}
		}
	}
}

GlobeHandler.prototype.showCountry = function(){
	var handler = this;
	handler.clicked = false;
	$("#closeBtn").css("display","none");
	$("#wrapper").css("visibility","hidden");
	
	handler.restoreCamera(1);
	
	for(k in handler.gui){
		var arr = handler.gui[k];
		for(var i=0;i<arr.length;i++){
			arr[i].isVisible = true;
		}
	}
	for(k in handler.mLine){
		var arr = handler.mLine[k].mesh;
		handler.mLine[k].error.isVisible = handler.mLine[k].stat == 'B' ? true : false;
		handler.mLine[k].active.isVisible = true;
		for(var i=0;i<arr.length;i++){
			arr[i].visibility = 1;
		}
	}
	for(var i=0;i<handler.disc.length;i++){
		handler.disc[i].dispose();
	}
	handler.scene.onBeforeRenderObservable.remove(handler.discObserver);
	handler.disc = [];
}

GlobeHandler.prototype.createDisc = function(nation){
	var handler = this;
	
	var lonlat = handler.LonLat[nation];
	var pos = handler.isGlobe == true ? handler.llarToWorld(handler.toRadians(lonlat.lat), handler.toRadians(lonlat.lon), 0.1, handler.radius/2)
										: handler.llarTo2D(lonlat.lat, lonlat.lon, 0.02);

	var radius = handler.isGlobe == true ? 0.2 : 0.1;
	
	var mat1 = new BABYLON.StandardMaterial("map_mat", handler.scene);
	mat1.opacityTexture = new BABYLON.Texture("imgs/sun.png", handler.scene);
	mat1.specularColor = new BABYLON.Color3(0, 0, 0);
	mat1.diffuseColor = new BABYLON.Color3.FromHexString('#ffffff');
	var mat2 = new BABYLON.StandardMaterial("map_mat", handler.scene);
	mat2.opacityTexture = new BABYLON.Texture("imgs/sun.png", handler.scene);
	mat2.specularColor = new BABYLON.Color3(0, 0, 0);
	mat2.diffuseColor = new BABYLON.Color3.FromHexString('#fffa6b');
	mat2.alpha = 0;
	
	var sphere = BABYLON.Mesh.CreateSphere('disc_parent', 30, 1, handler.scene);
	sphere.parent = handler.isGlobe == true ? handler.parentS : handler.map;
	sphere.position = pos;
	sphere.visibility = 0;
	
	var disc1 = BABYLON.MeshBuilder.CreateDisc('disc1', {radius: radius, tessellation:100}, handler.scene);
	disc1.parent = sphere;
	disc1.material = mat1;
	disc1.billboardMode = handler.isGlobe == true ? BABYLON.Mesh.BILLBOARDMODE_ALL : BABYLON.Mesh.BILLBOARDMODE_NONE;
	
	var disc2 = BABYLON.MeshBuilder.CreateDisc('disc1', {radius: radius, tessellation:100}, handler.scene);
	disc2.parent = sphere;
	disc2.material = mat2;
	disc2.billboardMode = handler.isGlobe == true ? BABYLON.Mesh.BILLBOARDMODE_ALL : BABYLON.Mesh.BILLBOARDMODE_NONE;
	
	handler.disc.push(sphere);
	handler.disc.push(disc1);
	handler.disc.push(disc2);
	
	handler.discObserver = handler.scene.onBeforeRenderObservable.add(function(){
		mat2.alpha += 0.01;
		mat1.alpha -= 0.01;
		if(mat2.alpha >= 0.98){
			mat2.alpha = 0;
			mat1.alpha = 1;
		}
	});
}

GlobeHandler.prototype.cameraAction = function(speedRatio, changePos, nation){
	var handler = this;
	
	var cameraPos = handler.camera.position.clone();
	var target = new BABYLON.Vector3();
	
	//get changepos
	{
		if(handler.isCenter == true)
			changePos = handler.getCenterPos(nation);
		
		if(handler.isGlobe == false)
			changePos = handler.getMapCamPos(nation);
		else if(handler.isGlobe == true)
			changePos = handler.getGlobeCamPos(nation);
	}
	
	//animation
	{
		var distance = BABYLON.Vector3.Distance(cameraPos, changePos);
		var frameRate = distance/speedRatio * 10;
		handler.camera.animations = [];
		
		var cameraAnimation = new BABYLON.Animation("camPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		var key = [];
		key.push({
			frame:0,
			value:cameraPos
		});
		key.push({
			frame:frameRate,
			value:changePos
		});
		
		cameraAnimation.setKeys(key);
		handler.camera.animations.push(cameraAnimation);
		animation = handler.scene.beginAnimation(handler.camera, 0, frameRate*2, false, 1);
	}
	
	return animation;
}

GlobeHandler.prototype.getGlobeCamPos = function(nation){
	var handler = this;
	
	var changePos = new BABYLON.Vector3();
	
	var lonlat = handler.LonLat[nation];
	var lat = lonlat.lat - 30;
	var lon = lonlat.lon - 20;
	var temp = handler.llarToWorld(handler.toRadians(lat), handler.toRadians(lon), 9, handler.radius/2);
	
	var sphere = BABYLON.Mesh.CreateSphere('change', 30, 0.2, handler.scene);
	sphere.position = temp;
	sphere.parent = handler.parentS;
	sphere.getBoundingInfo().boundingBox._update(sphere.computeWorldMatrix(true));
	changePos = sphere.absolutePosition
	sphere.dispose();
	
	return changePos;
}

GlobeHandler.prototype.getMapCamPos = function(nation){
	var handler = this;
	
	var changePos = new BABYLON.Vector3();
	var lonlat = handler.LonLat[nation];
	
	//change position
	{
		var temp = handler.llarTo2D(lonlat.lat, lonlat.lon, 1);
		var sphere = BABYLON.Mesh.CreateSphere('change', 30, 0.2, handler.scene);
		sphere.position = temp;
		sphere.position.y +=0.3;
		sphere.parent = handler.map;
		sphere.getBoundingInfo().boundingBox._update(sphere.computeWorldMatrix(true));
		changePos = sphere.absolutePosition.clone();
		sphere.dispose();
	}
	
	//change target
	{
		var tmpTarget = handler.llarTo2D(lonlat.lat, lonlat.lon, 0);
		var sphere2 = BABYLON.Mesh.CreateSphere('target', 30, 0.2, handler.scene);
		sphere2.position = tmpTarget;
		sphere.position.y -=0.3;
		sphere2.parent = handler.map;
		sphere2.getBoundingInfo().boundingBox._update(sphere2.computeWorldMatrix(true));
		target = sphere2.absolutePosition;
		sphere2.dispose();
		
		handler.camera.setTarget(target);
	}
	
	return changePos;
}

GlobeHandler.prototype.getCenterPos = function(nation){
	var handler = this;
	
	var changePos = new BABYLON.Vector3();
	var lonlat = handler.LonLat[nation];
	
	//change position
	{
		var temp = handler.llarToWorld(handler.toRadians(lonlat.lat), handler.toRadians(lonlat.lon), 14, handler.radius/2);
		var sphere = BABYLON.Mesh.CreateSphere('change', 30, 0.2, handler.scene);
		sphere.position = temp;
		sphere.parent = handler.parentS;
		sphere.getBoundingInfo().boundingBox._update(sphere.computeWorldMatrix(true));
		changePos = sphere.absolutePosition
		sphere.dispose();
	}
	
	return changePos;
}
GlobeHandler.prototype.restoreCamera = function(speedRatio){
	var handler = this;
	
	var changePos = handler.camPos;
	if(handler.isCenter == true && handler.isGlobe == true){
		var lonlat = handler.LonLat[handler.center];
		var tmpTarget = handler.llarToWorld(handler.toRadians(lonlat.lat), handler.toRadians(lonlat.lon), 0, handler.radius/2);
		var temp = handler.llarToWorld(handler.toRadians(lonlat.lat), handler.toRadians(lonlat.lon), 14, handler.radius/2);
		
		var sphere = BABYLON.Mesh.CreateSphere('change', 30, 0.2, handler.scene);
		sphere.position = temp;
		sphere.parent = handler.parentS;
		sphere.getBoundingInfo().boundingBox._update(sphere.computeWorldMatrix(true));
		changePos = sphere.absolutePosition;
		sphere.dispose();
		
		var sphere2 = BABYLON.Mesh.CreateSphere('target', 30, 0.2, handler.scene);
		sphere2.position = tmpTarget;
		sphere2.parent = handler.parentS;
		sphere2.getBoundingInfo().boundingBox._update(sphere2.computeWorldMatrix(true));
		target = sphere2.absolutePosition;
		sphere2.dispose();
		
		handler.camera.setTarget(new BABYLON.Vector3(0,0,15));
	}
	if(handler.isGlobe == true && handler.isCenter != true){
		handler.camera.setTarget(new BABYLON.Vector3(5,-3,-4));
	}
	if(handler.isGlobe == false && handler.isCenter == true){
		handler.camera.setTarget(handler.camTarget);
	}
	var cameraPos = handler.camera.position.clone();
	var distance = BABYLON.Vector3.Distance(cameraPos, handler.camPos);
	var frameRate = distance/speedRatio * 10;
	
	handler.camera.animations = [];
	var cameraAnimation = new BABYLON.Animation("camPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
	var key = [];
	key.push({
		frame:0,
		value:cameraPos
	});
	key.push({
		frame:frameRate,
		value:changePos
	});
	
	cameraAnimation.setKeys(key);
	handler.camera.animations.push(cameraAnimation);
	animation = handler.scene.beginAnimation(handler.camera, 0, frameRate, false, 1);
	
	return animation;
}

GlobeHandler.prototype.flagSetting = function(mesh, region){
	var handler = this;
	
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
	
	var width = 80;
	var font = 14;
	
	var rect = new BABYLON.GUI.Rectangle();
	rect.width = width+"px";
	rect.height = "25px";
	rect.color = "#ffffff";
	rect.fontSize = font+"px";
	rect.background = "#061e38";
	rect.thickness = 1.5;
	advancedTexture.addControl(rect);
	rect.linkWithMesh(mesh);
	rect.linkOffsetY = -45;
	rect.alpha = 0;
	
    var button = BABYLON.GUI.Button.CreateSimpleButton(region, region);
    button.width = width+"px";
    button.height = "28px";
    button.color = "#ffffff";
	button.alpha = 0;
    rect.addControl(button);
	
	var target = new BABYLON.GUI.Ellipse();
	target.width = "10px";
	target.height = "10px";
	target.color = "#ffffff";
	target.background = "#ffffff";
	advancedTexture.addControl(target);
	target.linkWithMesh(mesh);
	target.alpha = 0;
	
	var line = new BABYLON.GUI.Line();
	line.lineWidth = 3;
	line.color = "#ffffff";
	line.y2 = 12;
	line.linkOffsetY = -5;
	advancedTexture.addControl(line);
	line.linkWithMesh(mesh);
	line.connectedControl = rect;
	line.alpha = 0;
	
	if(region == 'Tokyo' || region == 'Mumbai' || region == 'Ohio' || region == "Paris"){
		rect.linkOffsetY = -60;
	}
	if(region == 'Milan' || region == '수원'){
		rect.linkOffsetY = -35;
	}
	if(region == '상암'){
		rect.linkOffsetY = -70;
	}
	if(region == 'Ireland'){
		rect.linkOffsetY = -95;
	}
	if(region == "London" || region == 'Salt Lake City'){
		rect.linkOffsetY = -90;
	}
	if(region == "Frankfurt" || region == 'Las Vegas'){
		rect.linkOffsetY = -77;
	}
	
	//event
    button.onPointerDownObservable.add(function(){
		if(button.alpha > 0){
			handler.hideCountry(button.name);
		}
		rect.background="#061e38";
		button.color = "#ffffff";
    });
	button.onPointerMoveObservable.add(function(){
		rect.background="#3498db";
		button.color = "#ffffff";
	});
	button.onPointerOutObservable.add(function(){
		rect.background="#061e38";
		button.color = "#ffffff";
	});
	
	handler.gui[region] = [rect, button, target, line];
	
	var dis = BABYLON.Vector3.Distance(handler.camera.position, mesh.position);
	if(dis <= 9){
		var observer = handler.scene.onBeforeRenderObservable.add(function(){
			rect.alpha+=0.05;
			button.alpha+=0.05;
			target.alpha+=0.05;
			line.alpha+=0.05;
			if(rect.alpha >=0.99 && handler.scene.onBeforeRenderObservable.hasObservers()){
				handler.scene.onBeforeRenderObservable.remove(observer);
				if(handler.isGlobe == true)
					handler.distanceObserver(mesh);
			}
		});
	}else{
		if(handler.isGlobe == true)
			handler.distanceObserver(mesh);
	}
}

GlobeHandler.prototype.toRadians = function(degree){
	return degree * (Math.PI/180);
}

GlobeHandler.prototype.reverseRadians = function(radian){
	return radian/(Math.PI/180);
}

GlobeHandler.prototype.llarToWorld = function(lat, lon, alt, rad){
	var x = rad*Math.cos(lat)*Math.cos(lon)+alt*Math.cos(lat)*Math.cos(lon);
	var z = rad*Math.cos(lat)*Math.sin(lon)+alt*Math.cos(lat)*Math.sin(lon);
	var y = rad*Math.sin(lat)+alt*Math.sin(lat);
	
	return new BABYLON.Vector3(x,y,z);
}

GlobeHandler.prototype.getMidPoint = function(src, dst, alt){
	var handler = this;
	
	var lat1 = src.lat;
	var lon1 = src.lon;
	var lat2 = dst.lat;
	var lon2 = dst.lon;
	
	var dLon = handler.toRadians(lon2-lon1);
	
	lat1 = handler.toRadians(lat1);
	lat2 = handler.toRadians(lat2);
	lon1 = handler.toRadians(lon1);
	
	var bx = Math.cos(lat2) * Math.cos(dLon);
	var by = Math.cos(lat2) * Math.sin(dLon);
	var lat3 = Math.atan2(Math.sin(lat1)+Math.sin(lat2), Math.sqrt((Math.cos(lat1)+bx)*(Math.cos(lat1)+bx)+by*by));
	var lon3 = lon1 +Math.atan2(by, Math.cos(lat1)+bx);
	
	var x = handler.reverseRadians(lat3);
	var y = handler.reverseRadians(lon3);
	var points = {lat:x, lon:y};
	
	var point1 = handler.getSecondMidPoint(src, points, alt);
	var point2 = handler.getSecondMidPoint(points, dst, alt);
	
	return [point1, point2];
}

GlobeHandler.prototype.getSecondMidPoint = function(src, dst, alt, i){
	var lat1 = src.lat;
	var lon1 = src.lon;
	var lat2 = dst.lat;
	var lon2 = dst.lon;
	
	var dLon = handler.toRadians(lon2-lon1);
	
	lat1 = handler.toRadians(lat1);
	lat2 = handler.toRadians(lat2);
	lon1 = handler.toRadians(lon1);
	
	var bx = Math.cos(lat2) * Math.cos(dLon);
	var by = Math.cos(lat2) * Math.sin(dLon);
	var lat3 = Math.atan2(Math.sin(lat1)+Math.sin(lat2), Math.sqrt((Math.cos(lat1)+bx)*(Math.cos(lat1)+bx)+by*by));
	var lon3 = lon1 +Math.atan2(by, Math.cos(lat1)+bx);
	var point = handler.llarToWorld(lat3, lon3, alt, handler.radius/2);
	
	return point;
}

GlobeHandler.prototype.get2DMidPoint = function(p1, p2, alt, percentage){
	var dir = p2.clone().subtract(p1);
	var length = dir.length();
	dir = dir.normalize().scale(length*percentage);
	var val = p1.clone().add(dir);
	val.z = -alt;
	return val;
}

GlobeHandler.prototype.llarTo2D = function(lat, lon, alt){
	var width = 8192*0.0015;
	var height = 4096*0.0015;
	var temp = width/2;
	var temp2 = height/2;
	var z = -alt;
	
	lat+=90;
	lon+=180
	x = -(lon * width) /360
	y = -(lat * height) /180
	
	x+=temp;
	y+=temp2;
	return new BABYLON.Vector3(x,y,z);
}

GlobeHandler.prototype.cameraSetting = function(){
	var handler = this;
	
	handler.camPos = new BABYLON.Vector3(0.44140673800554797, -0.7402775849282448, 9.568453694683141);
	//TARGET CAMERA FOR BACKGROUND & ARCROTATECAMERA FOR TARGETSSSSSS
	{
		var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, BABYLON.Vector3.Zero(), handler.scene);
		var camera2 = new BABYLON.TargetCamera('camera2', BABYLON.Vector3.Zero(), handler.scene);
		
		camera2.parent = camera
		camera.attachControl(canvas, true);
		
		handler.scene.activeCameras.push(camera);
		handler.scene.activeCameras.push(camera2);
		handler.scene.activeCamera = camera;
		
		camera.setTarget(handler.target);
		
		camera2.position = new BABYLON.Vector3(0,0,-5.2);
		
		camera.position = handler.camPos;
		camera.inertia = 0.7;
		camera.lowerRadiusLimit = 10;
		camera.upperRadiusLimit = 1000;
		camera.upperBetaLimit = Math.PI / 2*2;
		camera.angularSensibilityX = camera.angularSensibilityY = 500;
	}
	
	//RIGHT CLICK DISABLE & ZOOM IN AND OUT DISABLE ON ARCROTATECAMERA
	{
		var pointers = camera.inputs.attached["pointers"];
		if(pointers){
			pointers.buttons = [0]
		}
		camera.inputs.remove(camera.inputs.attached.mousewheel);
		camera.inputs.attached.pointers.panningSensibility  = 0;
	}
	if(handler.camera != undefined){
		handler.camera.dispose();
		handler.camera = undefined;
	}
	handler.camera = camera;
	handler.camera2 = camera2;
};

GlobeHandler.prototype.meshSetting = function(){
	var handler = this;
	
	//EARTH MATERIAL
	{
		var earthMap = new BABYLON.StandardMaterial('earthMap', handler.scene);
		earthMap.diffuseTexture = new BABYLON.Texture("imgs/earthmap.jpg", handler.scene);
		earthMap.diffuseTexture = new BABYLON.Texture("imgs/earth_map.jpg", handler.scene);
		earthMap.bumpTexture = new BABYLON.Texture("imgs/earth_bumpmap.jpg", handler.scene);
		earthMap.specularColor = new BABYLON.Color3(0,0,0);
	}
	
	//CREATE EARTH MESH
	{
		handler.earth = BABYLON.Mesh.CreateSphere('earth', 120, handler.radius, handler.scene);
		handler.earth.material = earthMap;
		handler.earth.position = handler.target;
		handler.earth.rotation.z = Math.PI;
		handler.earth.rotation.y = Math.PI*1.6;
		handler.earth.visibility = 1;
		handler.earth.scaling.set(0.9,0.9,0.9);
	}
	
	//NIGHT
	/*{
		var nightMap = new BABYLON.StandardMaterial('nightMap', handler.scene);
		nightMap.diffuseTexture = new BABYLON.Texture("imgs/earth_lightsmap.jpg", handler.scene);
		nightMap.bumpTexture = new BABYLON.Texture("imgs/earth_bumpmap.jpg", handler.scene);
		nightMap.specularColor = new BABYLON.Color3(0,0,0);
		
		handler.night = BABYLON.Mesh.CreateSphere('night', 120, handler.radius, handler.scene);
		handler.night.material = nightMap;
		handler.night.parent = handler.earth;
		handler.night.visibility = 0;
	}*/
		
	//CLOUD
	{	
		var cloudMat = new BABYLON.StandardMaterial('cloudMat', handler.scene);
		cloudMat.opacityTexture = new BABYLON.Texture("imgs/earth_cloud2.png", handler.scene);
		cloudMat.specularColor = new BABYLON.Color3(0,0,0);
		cloudMat.alpha = 0;
		
		var cloud = BABYLON.Mesh.CreateSphere("cloud", 120, handler.radius+0.1, handler.scene);
		cloud.material = cloudMat;
		cloud.isPickable = false;
		cloud.parent = handler.earth;
		cloud.isVisible = true;
		handler.cloud = cloud;
	}
	//CREATE EARTH'S ATMOSPHERE
	{
		var atmosphere1 = new BABYLON.HighlightLayer("hl", scene);
		atmosphere1.addMesh(handler.earth, new BABYLON.Color3.FromHexString('#5aadff'));
		atmosphere1.blurVerticalSize = 3;
		atmosphere1.blurHorizontalSize = 3;
		atmosphere1.innerGlow = false;
	}	
	//parent Sphere
	{
		var Psphere = BABYLON.Mesh.CreateSphere('Psphere', 120, handler.radius, handler.scene);
		Psphere.position = handler.target;
		Psphere.visibility = 0;
		Psphere.scaling.set(0.9,0.9,0.9);
		handler.parentS = Psphere;
	}
	
	setTimeout(function(){
		cloudMat.alpha = 0.8;
	},1000);
	handler.EarthAnimation();
};

GlobeHandler.prototype.camera2DSetting = function(){
	var handler = this;
	
	handler.camPos = new BABYLON.Vector3(0.12873205138030736, 9.606330457217888, -0.00035224242463960186);
	//handler.camPos = new BABYLON.Vector3(5.38423412242771, 7.956625673388214, -0.016962513493019443);
	handler.camTarget = new BABYLON.Vector3(0,0,0);
	handler.isCenter = true;
	
	{
		var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, BABYLON.Vector3.Zero(), handler.scene);
		
		camera.attachControl(canvas, true);
		camera.setTarget(new BABYLON.Vector3.Zero());
		camera.inertia = 0.7;
		camera.lowerRadiusLimit = 3;
		camera.upperRadiusLimit = 1000;
		camera.upperBetaLimit = Math.PI / 2 *2;
		camera.angularSensibilityX = camera.angularSensibilityY = 500;
	}
	
	camera.position = handler.camPos;
	if(handler.camera != undefined){
		handler.camera.dispose();
		handler.camera = undefined;
	}
	handler.camera = camera;
};
GlobeHandler.prototype.mesh2DSetting = function(){
	var handler = this;
	
	var width = 8192*0.0015;
	var height = 4096*0.0015;
	var material = new BABYLON.StandardMaterial("board_material1", handler.scene);
	material.specularColor = new BABYLON.Color3(0, 0, 0);		// Disable light reflection
	material.diffuseTexture = new BABYLON.Texture("imgs/earth_map.jpg", handler.scene);
	material.backFaceCulling = true;
	material.fogEnable = false;
	material.forceDepthWrite = true;
	material.diffuseTexture.uScale = 1;
	material.diffuseTexture.vScale = -1;
	
	var fUvs = new BABYLON.Vector4(1,0, 0,1);	// Front UVs
	var bUvs = new BABYLON.Vector4(0,0, 1,1);	// Back UVs  (Reverse)
	var board =  BABYLON.MeshBuilder.CreatePlane("board", {'width': width, 'height': height, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: fUvs, backUVs: bUvs}, handler.scene);
	board.rotation.y = Math.PI/2;
	board.rotation.x = Math.PI/2;
	board.material = material;
	handler.map = board;
	handler.setLinks();
};

GlobeHandler.prototype.disposeMesh = function(){
	var handler = this;
	
	$("#wrapper").css("display","none");
	if(handler.isGlobe == true){
		handler.earth.dispose();
		handler.parentS.dispose();
		if(handler.isCenter == false){
			handler.camera2.dispose();
		}
	}else{
		handler.map.dispose();
	}
	
	for(k in handler.mLine){
		handler.mLine[k].error.dispose();
		var arr = handler.mLine[k].mesh;
		for(var i=0;i<arr.length;i++){
			arr[i].dispose();
		}
	}
	for(k in handler.gui){
		var arr = handler.gui[k];
		for(var i=0;i<arr.length;i++){
			arr[i].dispose();
		}
	}
	
	handler.mLine = {};
	handler.gui = {};
	handler.nPoints = {};
	handler.LonLat = {};
	
	if(handler.scene.onBeforeRenderObservable.hasObservers() == true){
		handler.scene.onBeforeRenderObservable.clear();
		handler.scene.onBeforeRenderObservable.remove();
	}
	
	var meshes = handler.scene.getActiveMeshes();
	if(meshes.length > 0){
		for(var i=0;i<meshes.length;i++){
			meshes[i].dispose();
		}
	}
}

GlobeHandler.prototype.reset = function(){
	$('.loc_title').text("");
	$('.location').text("");
	$('.status').text("");
	$('.details').text("");
	$('#agency_won').text("");
	$('#csp_won').text("");
	$('#cx_won').text("");
	$(".status").css("color","#ff9600");
	$(".agency_details").show();
	$(".csp_details").show();
	$(".cx_details").show();
	$(".detail").css("width","86%");
	
	for(var i=0;i<handler.upChart.length;i++){
		handler.upChart[i].clear();
	}
	handler.upChart = [];
}

GlobeHandler.prototype.rePosition = function(){
	var handler = this;
	
	//position 계산
	{
		var top = $("#info").offset().top;
		var height = $("#wrapper").height();
		var pos = top-height-handler.autoSize(10);
		$("#wrapper").css('top',pos+'px');
	}
}

GlobeHandler.prototype.chartResize = function(isTemp){
	//그래프 리사이즈
	{
		for(var i=0;i<handler.chartArr.length;i++){
			handler.chartArr[i].resize();
		}
		for(var i=0;i<handler.upChart.length;i++){
			handler.upChart[i].resize();
		}
		if(isTemp == undefined)
			handler.showChart();
	}
	
	//폰트 사이즈
	{
		$("html").css("font-size",handler.autoSize(10)+"px");
		$("div#detail_cost").css("line-height",handler.autoSize(35)+"px");
	}
	
	if(outerWidth <= 1900){
		$(".al").css("display","none");
		$("div#unit").hide();
		$("div#detail_cost").css("right","0px");
		$("div#detail_cost").css("left","auto")
		$("#cost").css("right","0px");
		$("#cost").css("left","auto")
	}else{
		$(".al").css("display","block");
		$("div#unit").show();
		$("div#detail_cost").css("left","0px");
		$("#cost").css("left","0px")
	}
	if(outerWidth<1167){
		$(".topNhold").text("Top N 거점 트래픽 사용량");
	}
	if(outerHeight < 984){
		$(".pre_year").hide();
		$(".cur_year").hide();
	}
}

GlobeHandler.prototype.updateData = function(nation){
	var handler = this;	
	handler.rePosition();
	
	handler.reset();
	var arr = ['agency','csp','cx']
	setTimeout(function(){
		$("#wrapper").css("visibility","visible");
		for(var i=0;i<3;i++){
			handler.updateChart(nation, arr[i]);
		}
	},200)
	var stat = 'Good';
	for(k in handler.mLine){
		if(k.includes(nation)){
			if(handler.mLine[k].stat != 'G'){
				stat = 'Bad';
				stat += " "+k; 
				$(".status").css("color","#ff0000");
				$(".status").css("font-weight","bold");
			}
		}
	}
	nation = handler.getLanguage(nation).toUpperCase();
	$('.loc_title').text("SEC "+nation+" DC");
	$('.location').text(nation+" DC");
	$('.status').text("Status : "+stat);
	$('.details').text("RTT : 1ms / Packet Loss : 0%");
	var region = handler.getLanguage(nation);
	var agency = handler.LonLat[region].agency == 'Y' ? Math.floor(Math.random(1000000-0)*1000000) : 0;
	var csp = handler.LonLat[region].csp == 'Y' ? Math.floor(Math.random(1000000-0)*1000000) : 0;
	var cx = handler.LonLat[region].cx == 'Y' ? Math.floor(Math.random(1000000-0)*1000000) : 0;
	var allC = agency+csp+cx;
	$('#agency_won').text(agency.toLocaleString());
	$('#csp_won').text(csp.toLocaleString());
	$('#cx_won').text(cx.toLocaleString());
	$('#won').text(allC.toLocaleString());
}

GlobeHandler.prototype.getLanguage = function(nation){
	var check_eng = /[a-zA-Z]/;
	var check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	var str;
	
	var txt = {모스크바:"Moscow",런던:"London",파리:"Paris",북경:"Beijing",일본:"Japan",홍콩:"Hong Kong",산호세:"San Jose",뉴저지:"New Jersey"
		  ,브라질:"Brazil",델리:"Delhi",첸나이:"Chennai",싱가폴:"Singapore",상해:"Shanghai",독일:"Germany",상암:"Sangam",수원:"Suwon",시드니:"Sydney"};
	
	if(check_eng.test(nation)){
		for(k in txt){
			if(txt[k].toUpperCase() == nation)
				str = k;
		}
	}else if(check_kor.test(nation)){
		str = txt[nation];
	}
	
	if(str == undefined)
		str = nation;
	
	return str;
}

GlobeHandler.prototype.autoSize = function(defaultSize, isY){
	var width = outerWidth;
	var x = defaultSize * width;
	var returnVal = x/1920;
	
	if(isY == true){
		var height = outerHeight;
		var y = defaultSize * height;
		returnVal = y/1040;
	}
	return returnVal;
}

GlobeHandler.prototype.updateChart = function(nation, id){
	var handler = this;
	
	var width = $(".detail").width();
	var info = handler.LonLat[handler.getLanguage(nation)];
	if(id == 'agency'){
		if(info.agency == 'N'){
			$("."+id+"_details").hide();
			$(".detail").css("width",'59.9%');
			return;
		}
	}else if(id == 'csp'){
		if(info.csp == 'N'){
			$("."+id+"_details").hide();
			$(".detail").css("width",'59.9%');
			return;
		}
		
	}else if(id == 'cx'){
		if(info.cx == 'N'){
			$("."+id+"_details").hide();
			$(".detail").css("width",'59.9%');
			return;
		}
		
	}
	
	var data = [];
	for(var i=1;i<=12;i++){
		data.push(i+"월");
	}
	//drawing chart
	
	setTimeout(function(){
		var myChart = echarts.init(document.getElementById(id+"_chart"));
		myChart.resize();
		var option = {
				xAxis:{
					type:'category',
					boundaryGap:true,
					data:data,
					axisTick:{show:false},
					axisLabel:{show:true, interval:false, color:'#ffffff', fontSize:handler.autoSize(10)}
				},
				yAxis:[
					{
						type:'value',
						scale:true,
						max:100,
						min:0,
						interval:50,
						axisLabel:{show:true, interval:false, color:'#ffffff', fontSize:handler.autoSize(10)},
						splitLine:{lineStyle:{color:'#555555', type:'dashed'}}
					},
					{
						type:'value',
						name:'',
						scale:true,
						max:100000,
						min:0,
						interval:50000,
						axisLabel:{show:true, interval:false, color:'#ffffff', fontSize:handler.autoSize(10)},
						splitLine:{lineStyle:{color:'#555555', type:'dashed'}}
					}
				],
				series:[
					{
						name:'Value',
						type:'bar',
						barMaxWidth:handler.autoSize(17),
						yAxisIndex: 0,
						itemStyle:{color:'#ffffff'},
						data: (function (){
							var res = [];
							for(var i=0;i<12;i++){
								res.push(Math.floor((Math.random()*(100-5)+5)));
							}
							return res;
						})()
					},
					{
						name:'Value',
						type:'line',
						yAxisIndex: 1,
						itemStyle:{color:'#ffffff'},
						data: (function (){
							var res = [];
							for(var i=0;i<12;i++){
								res.push(Math.floor((Math.random()*(100000-5)+5)));
							}
							return res;
						})()
					}
				],
				grid:{
					height:handler.autoSize(100),
					top:handler.autoSize(50)
				}
			};
			
			//차트 반영
			myChart.count = 12;
			myChart.setOption(option);
			handler.upChart.push(myChart);
		},200);
}

GlobeHandler.prototype.showChart = function(id){
	var handler = this;
	handler.chartArr = [];
	
	var line = $("#cost").height();
	
	var arr = [];
	for(var i=0;i<15;i++){
		arr.push(Math.floor((Math.random()*(2000-0)+0)));
	}
	arr.sort(function(f,s){return s-f})
	
	$("#info").css("display", "block");
	handler.showTrafficChart();
	handler.showCSPChart();
	handler.showStrongholdChart(arr);
	handler.showRateChart();
	
	if(id == undefined){
		var nation = $(".loc_title").text().split('SEC ')[1].split(' DC')[0];
		var arr = ['agency','csp','cx']
		for(var i=0;i<3;i++){
			handler.updateChart(nation, arr[i]);
		}
	}
}
GlobeHandler.prototype.showTrafficChart = function(){
	var cost = Math.floor((Math.random()*(1000000-0)+0)).toLocaleString();
	$("#won").text(cost);
	var height = $("#traffic_detail").height();
	var xData = [];
	for(var i=1;i<=16;i++){
		var month = i;
		if(i>12)
			month-=12;
		xData.push(month+'월');
	}
	
	var myChart = echarts.init(document.getElementById("traffic_detail"));
	
	var option = {
		legend:{
			data:['통신사망', 'CSP망', 'CX망', '전체회선비용'],
			textStyle:{color:'#fff', fontSize:handler.autoSize(11)},
			right:handler.autoSize(80),
			top:handler.autoSize(30, true),
			itemWidth:handler.autoSize(12),
			itemHeight:handler.autoSize(8, true)
		},
		xAxis:{
			type:'category',
			boundaryGap:true,
			data:xData,
			axisTick:{show:false},
			axisLabel:{show:true, interval:false, color:'#ffffff', fontSize:handler.autoSize(14)},
			splitLine:{lineStyle:{color:'#fff'}}
		},
		yAxis:[
			{
				type:'value',
				scale:true,
				max:100,
				min:0,
				interval:50,
				axisLabel:{show:true, interval:false, color:'#ffffff', fontSize:handler.autoSize(14)},
				splitLine:{lineStyle:{color:'#555555', type:'dashed'}}
			},
			{
				type:'value',
				name:'',
				scale:true,
				max:100000,
				min:0,
				interval:50000,
				axisLabel:{show:true, interval:false, color:'#ffffff', fontSize:handler.autoSize(14)},
				splitLine:{lineStyle:{color:'#555555', type:'dashed'}}
			}
		],
		series:[
			{
				name:'통신사망',
				type:'bar',
				stack:'bar2',
				barMaxWidth:handler.autoSize(17),
				yAxisIndex: 0,
				itemStyle:{color:'#5a5a5a', borderColor : "#fff"},
				data: (function (){
					var res = [];
					for(var i=0;i<16;i++){
						res.push(Math.floor((Math.random()*(33-0)+0)));
					}
					return res;
				})()
			},
			{
				name:'CSP망',
				type:'bar',
				stack:'bar2',
				yAxisIndex: 0,
				itemStyle:{color:'#a0a0a0', borderColor : "#fff"},
				data: (function (){
					var res = [];
					for(var i=0;i<16;i++){
						res.push(Math.floor((Math.random()*(33-0)+0)));
					}
					return res;
				})()
			},
			{
				name:'CX망',
				type:'bar',
				stack:'bar2',
				yAxisIndex: 0,
				itemStyle:{color:'#fff', borderColor : "#fff"},
				data: (function (){
					var res = [];
					for(var i=0;i<16;i++){
						res.push(Math.floor((Math.random()*(33-0)+0)));
					}
					return res;
				})()
			},
			{
				name:'전체회선비용',
				type:'line',
				yAxisIndex: 1,
				itemStyle:{color:'#ffffff'},
				data: (function (){
					var res = [];
					for(var i=0;i<16;i++){
						res.push(Math.floor((Math.random()*(100000-0)+0)));
					}
					return res;
				})()
			}
		],
		grid:{
			height:handler.autoSize(70, true),
			top:handler.autoSize(50, true)
		}
	};
	
	//차트 반영
	myChart.count = 16;
	myChart.setOption(option);
	
	handler.chartArr.push(myChart);
}

GlobeHandler.prototype.showCSPChart = function(){
	var handler = this;
	
	var arr = ['aws','oci','azure','nbp'];
	var title = ['response','packet'];
	var max = [800,20];
	var interval = [200,5];
	var nation = [];
	
	for(k in handler.LonLat){
		nation.push(k);
	}
	for(var i=0;i<arr.length;i++){
		pie_chart(arr[i]);
	}
	for(var j=0;j<title.length;j++){
		var data = [];
		for(var i=0;i<nation.length;i++){
			data.push(Math.floor((Math.random()*(max[j]-0)+0)));
		}
		horizontal_bar(data, title[j], max[j], interval[j]);
	}
	
	function pie_chart(cloud){
		var colorPalette = ['#fff','#2c353b85']
		var arr = [];
		for(var i=0;i<2;i++){
			if(i==0)
				arr.push(Math.floor((Math.random()*(100-0)+0)));
			else
				arr.push(100-arr[0]);
		}
		//echart 객체
		var myChart = echarts.init(document.getElementById('pie_'+cloud));
		
		//차트 속성 & 데이터 지정
		var option = {
			title:{
					show:true, text:arr[0]+"%",
					x:'center', y:'center',
					textStyle:{color:'#fff', fontSize:handler.autoSize(14), fontWeight:'normal'}
				  },
			legend:{show:false},
			series:{
				name:'',
				type:'pie',
				radius:['70%', '98%'],
				avoidLabelOverlap:true,
				hoverAnimation:false,
				data:[
					{value:arr[0], name:''},
					{value:arr[1], name:''}
				],
				label:{normal:{show:false, position:'center'},
					   emphasis:{show:false}},
				labelLine:{normal:{show:false}},
				itemStyle:{borderColor : '#fff'},
				color:colorPalette
			}
		};
		myChart.setOption(option);
		handler.chartArr.push(myChart);
	}
	function horizontal_bar(data, id, max, interval){
		var myChart = echarts.init(document.getElementById("bar_"+id));
		var txt = id == 'response'? '응답속도 (ms)' : '패킷손실율 (%)'
		option = {
			title:{text:txt, textStyle:{color:'#fff', fontStyle:'normal', fontSize:handler.autoSize(15)+'px', fontWeight:'normal'},padding:[30, 0, 0, 30]},
			legend:{show:false},
			xAxis:{type:'value',
					max:max,
					min:0,
					interval:interval,
					boundaryGap: true,
					axisLabel:{show:true, interval:false, color:'#fff', fontSize:handler.autoSize(9)+'px'},
					splitLine:{lineStyle:{color:'#555555', type:'dashed'}}
					},
			yAxis:{type:'category', data:nation,
					axisLabel:{show:true, interval:false, color:'#ffffff', fontSize:handler.autoSize(7)+'px'},
					axisTick:{show:false},
					splitLine:{lineStyle:{color:'#555555', type:'dashed'}}
					},
			series:[
				{
					name:'',
					type:'bar',
					data:data,
					itemStyle:{color:'#ffffff'},
					barMaxWidth:handler.autoSize(3),
				}
			],
			grid:{
				width:handler.autoSize(140),
				height:handler.autoSize(130, true),
				top:handler.autoSize(60, true),
				left:handler.autoSize(55)
			}
		}
		myChart.count = 15;
		myChart.setOption(option);
		handler.chartArr.push(myChart);
	}
}

GlobeHandler.prototype.showStrongholdChart = function(numArr){
	var handler = this;
	
	if(numArr == undefined || numArr.length == 0) return;
	
	$("#position_detail").empty();
	var nation = [];
	var max = numArr[0];
	for(k in handler.LonLat){
		nation.push(k);
	}
	var html;
	html = "<table class='pos_chart'>";
	
	for(var i=0;i<nation.length;i++){
		var num = numArr[i]/max * 100;
		if(numArr[i]>999){numArr[i].toString().split('')}
		html+="<tr><td class='pos_td' id='pos_td'>"+nation[i];
		html+="<span style='position:absolute; right:2px;'>"+numArr[i].toLocaleString()+"</span>"
		html+="<br><div class='pos_div' id='pos_td' style='width:"+num+"%;'></div></td></tr>"
	}
	html+="</table>";
	
	$("#position_detail").append(html);
}

GlobeHandler.prototype.showRateChart = function(){
	var colors = [['#396ba8','#469c9b','#a47a50','#b3b7b6'],['#005f89','#0092b7','#8cadb4','#646464']];
	var tempNum = [[40,20,12,19],[34,28,28,10]];
	var tempLegend = [['AWS','AZURE','NBP','OCI'],['IM','CE','DS','R&D']];
	var id = ['service','depart'];
	
	for(var i=0;i<2;i++){
		var color = colors[i];
		var num = tempNum[i];
		var legend = tempLegend[i];
		var name = id[i];
		var isLegend = outerWidth<1000 ? false : true;
		var isTooltip = outerWidth<1000 ? true : false;
		
		//chart
		var colorPalette = color;
		var myChart = echarts.init(document.getElementById('pie_'+name));
		
		var option = {
			title:{
					show:true, text:"%",
					x:'center', y:'35%',
					textStyle:{color:'#fff', fontSize:handler.autoSize(14)}
				  },
			legend:{show:isLegend, bottom:10, left:'center', data:legend, textStyle:{color:"#fff", fontSize:handler.autoSize(12)},
				itemWidth:handler.autoSize(10), itemHeight:handler.autoSize(10), labels:{padding:{right:0, left:0}}},
			tooltip: {show:isTooltip},
			series:{
				name:'',
				type:'pie',
				radius:['45%', '80%'],
				center:['50%','40%'],
				avoidLabelOverlap:true,
				hoverAnimation:false,
				data:[
					{value:num[0], name:legend[0]},
					{value:num[1], name:legend[1]},
					{value:num[2], name:legend[2]},
					{value:num[3], name:legend[3]}
				],
				label:{show:true, position:'inside',formatter:'{c}', color:'#fff', fontSize:handler.autoSize(14)},
				emphasis:{label:{show:true}},
				labelLine:{normal:{show:false}},
				color:colorPalette
			}
		};
		
		myChart.setOption(option);
		handler.chartArr.push(myChart);
		
	}
}