var{TextureLoader:e,Scene:t,TorusGeometry:i,BufferGeometry:o,BufferAttribute:n,PointsMaterial:a,Points:r,PointLight:c,PerspectiveCamera:d,WebGLRenderer:l,Color:s,Clock:w}=require("three"),{Tooltip:h}=require("bootstrap");(new e).load("./assets/particle.png");const g=document.querySelector("#bg"),m=new t,p=new i(.7,.2,16,100),u=new o,y=new Float32Array(21e4);for(let e=0;e<21e4;e++)y[e]=(Math.random()-.5)*(7*Math.random());u.setAttribute("position",new n(y,3));const v=new a({size:.01,color:"grey"}),f=new a({size:.002,transparent:!0,color:"grey"}),x=new r(p,v),C=new r(u,f);m.add(x,C);const R=new c(16777215,.1);R.position.x=2,R.position.y=3,R.position.z=4,m.add(R);const S={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",(()=>{S.width=window.innerWidth,S.height=window.innerHeight,z.aspect=S.width/S.height,z.updateProjectionMatrix(),A.setSize(S.width,S.height),A.setPixelRatio(Math.min(window.devicePixelRatio,2))}));const z=new d(75,S.width/S.height,.1,100);z.position.x=0,z.position.y=0,z.position.z=2,m.add(z);const A=new l({canvas:g});A.setSize(S.width,S.height),A.setPixelRatio(Math.min(window.devicePixelRatio,2)),A.setClearColor(new s("#ed944d"),1);document.addEventListener("mousemove",(e=>{b=e.clientY,P=e.clientX}));let P=0,b=0;const M=new w,q=()=>{const e=M.getElapsedTime();x.rotation.y=.5*e,x.rotation.x=.5*e,x.rotation.z=.5*e,C.rotation.y=.008*e,C.rotation.x=-.01*e,C.rotation.z=-.006*e,P>0&&(C.rotation.x=4e-6*e*-b,C.rotation.y=4e-6*e*-P),A.render(m,z),window.requestAnimationFrame(q)};q();[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function(e){return new h(e)}));$(window).on("load",(function(){$("#static-email").tooltip(),$("#static-email").on("click",(function(){var e=document.createRange();e.selectNode(document.getElementById("static-email")),window.getSelection().removeAllRanges(),window.getSelection().addRange(e);try{document.execCommand("copy")?($("#static-email").trigger("copied",["Copied!"]),window.getSelection().removeAllRanges()):($("#static-email").trigger("copied",["Copy with Ctrl-c"]),window.getSelection().removeAllRanges())}catch(e){$("#static-email").trigger("copied",["Copy with Ctrl-c"]),window.getSelection().removeAllRanges()}})),$("#static-email").on("copied",(function(e,t){}))})),$(window).on("load",(function(){$(window).on("scroll",(function(){$(".hideme").each((function(e){const t=$(this).position().top+$(this).outerHeight()/2.5;$(window).scrollTop()+$(window).height()>t&&$(this).animate({opacity:"1"},300)}))}))}));
//# sourceMappingURL=index.4a9a34af.js.map
