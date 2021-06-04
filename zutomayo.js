const addDiv = (parentDiv, className, callBack = null ) => {
	const t = document.createElement("div");
	t.classList.add(className);
	if( callBack && typeof callBack === "function") callBack(t);
	parentDiv.appendChild(t);
	return t;
}

const createFace = () =>{
	const clock = document.getElementById("clock");
	let vp = [clock.clientWidth,clock.clientHeight];
	let chokei = Math.min(...vp);
	
	const clockFace = addDiv(clock,"clock-face",( t )=>{
		[t.style.height,t.style.width] = [chokei+"px",chokei+"px"];
		[t.style.top,t.style.left] = [(vp[1]-chokei) / 2 + "px",(vp[0]-chokei) / 2 + "px"];
	});

	const r60 = 360 / 60;
	const originX = clockFace.clientWidth / 2;
	for( let i = 0 ; i < 60 ; i ++){
		const deg = i * r60;
		addDiv( clockFace,
				i % 5 ===0 ? "clock-line1" : "clock-line2",
				( t ) => {
					if( i > 0 ) {
						t.style.transformOrigin = `${originX}px center`;
						t.style.transform=`rotate(${deg}deg)`;
					}
				}
		);
	}
	
	const r12 = 360 / 12;
	const hankei = originX;
	const moziPos = hankei -30 ;
	const MathPi = Math.PI / 180;
	for( let i = 0 ; i < 12 ; i ++){
		const deg = i * r12;
		addDiv( clock ,"clock-text",
			( t ) =>{
			const mojiX = hankei + moziPos * Math.sin( deg * MathPi );
			const mojiY = hankei - moziPos * Math.cos( deg * MathPi );
			[t.style.top,t.style.left] = [mojiY + "px",mojiX + "px"];
			t.innerText = i === 0 ? "12" : i.toString();
		});
	}
	
	addDiv( clockFace , "clock-center" );
};

function timeRefresh () {
	updateClock();
	updateText();
	setTimeout(timeRefresh, 1000);
}

function timeRefreshSecond() {
	updateSecond();
	setTimeout(timeRefreshSecond, 60000);
}

function updateSecond(){
	var now = moment();
	var second = now.seconds() * 6 + 1;
	
	document.documentElement.style.setProperty("--byousin-start-deg", second + "deg");
	document.documentElement.style.setProperty("--byousin-end-deg", (second + 360) + "deg");
	
	//var second = now.seconds() * 6;
	//$("#second").css("transform", "rotate(" + second + "deg)");
}

function updateClock(){
	var now = moment();
	
	//秒
	var second = now.seconds() * 6;

	//分
	var minute = now.minutes() * 6 + second / 60;

	//時
	var hour = ((now.hours() % 12) / 12) * 360 + minute / 12;

	$("#hour").css("transform", "rotate(" + hour + "deg)");
	$("#minute").css("transform", "rotate(" + minute + "deg)");
}

function updateText(){
    $("#nday").html(moment().format('YYYY/MM/DD'));
    $("#ntime").html(moment().format('HH:mm'));
}

window.addEventListener("DOMContentLoaded", () => {
	 createFace();
	 timeRefresh();
	 timeRefreshSecond();
});

