<<<<<<< HEAD
var Oa="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var La=(e=21)=>{let t="",r=e;for(;r--;)t+=Oa[Math.random()*64|0];return t},rs=La;var Ve=class extends Error{constructor(t){super(t),this.name="i.js \u2764\uFE0F  brackets parse ERROR"}};function Na({open:e,close:t,pos:r,nodes:i},c,p){return{nodeType:"bracket",open:e,close:t,nodes:i,pos:Object.assign({},r,{end:c}),content:p.substring(r.start,c+1),innerContent:p.substring(r.start+1,c)}}function Pa(e){let t=new Map;return e.forEach(([r,i=r])=>t.set(r,i)),{quotes:t}}function Ia(e){let t={},r={};return e.forEach(([i,c])=>{r[i]=c,t[c]=i}),{opens:t,closes:r}}function zn(e){let{text:t,parent:r,start:i,end:c,opt:p}=e;if(i===c&&!p.includeEmpty)return;let f=p.pairs.reduce((x,P)=>x.concat(P.split("")),[]).map(x=>`${p.escape}${x}`),S=x=>f.reduce((P,R)=>P.split(R).join(R[1]),x),_=r.pos.depth+1;r.nodes.push({nodeType:"text",pos:{start:i,end:c,depth:_},content:S(t.substring(i,c))})}var Gn=e=>{let t=e.pop();if(t===void 0)throw new Ve("LogicError :)");return t};function ct(e,t){let i=Object.assign({pairs:["()","{}","[]"],nestMax:100,escape:"\\",skip:!1,includeEmpty:!1,quotes:['"',"'","`"]},t||{}),{pairs:c,nestMax:p,escape:f,skip:S}=i,{opens:_,closes:x}=Ia(c),{quotes:P}=Pa(i.quotes),R=[{nodeType:"root",nodes:[],pos:{start:0,end:0,depth:-1},content:e}],k=0,V=null,$=0;for(let ee=0;ee<e.length;ee++){let te=Gn(R),W=e[ee],y=ee>0&&e[ee-1]===f;if(S&&["{","}","(",")","[","]"].includes(W)&&te.nodeType==="root")R.push(te);else if(S&&["{","(","["].includes(te.open)&&(W==="<"||W===">"))R.push(te);else if(y)R.push(te);else if(V!==null)V===W&&(V=null),R.push(te);else if(P.has(W))V=P.get(W),$=ee,R.push(te);else if(x[W]!==void 0){if(R.length>=p)throw new Ve(`over nest max limit. options: { nestMax: '${i.nestMax}' }`);zn({text:e,parent:te,start:k,end:ee,opt:i}),R.push(te),R.push({nodeType:"bracket-open",pos:{start:ee,depth:te.pos.depth+1},open:W,close:x[W],nodes:[]}),k=ee+1}else if(_[W]!==void 0){if(te.nodeType==="root"||_[W]!==te.open)throw new Ve(`404 pair '${_[W]}' :${ee}`);let ye=Gn(R);zn({text:e,parent:te,start:k,end:ee,opt:i});let Le=Na(te,ee,e);ye.nodes.push(Le),R.push(ye),k=ee+1}else R.push(te)}if(V!==null)throw new Ve(`unclosed quote ${V} near "...${e.substring(k-20,k+30)}..."`);let he=Gn(R);if(he.nodeType!=="root")throw new Ve(`404 pair '${he.open}' :${he.pos.start}`);return zn({text:e,parent:he,start:k,end:e.length,opt:i}),he.nodes}function ss(e){return[...e].reduce((t,r)=>(t.quote?(r===t.quote&&(t.quote=void 0),t.a[t.a.length-1]+=r):r==="="?t.a[t.a.length-1].length?t.a.push("="):t.a[t.a.length-1]="=":r===" "?t.a[t.a.length-1]!=="="&&t.a[t.a.length-1].length&&t.a.push(""):(['"',"'","`"].includes(r)&&(t.quote=r),t.a[t.a.length-1]+=r),t),{a:[""]}).a}function lt(e,t="|",r=!1){let i=[...e].reduce((c,p)=>(c.quote?(p===c.quote&&(c.quote=void 0),c.a[c.a.length-1]+=p):p===t?c.a.push(""):(['"',"'","`"].includes(p)&&(c.quote=p),c.a[c.a.length-1]+=p),c),{a:[""]}).a;return r?i.filter(c=>c):i}function os(e,t="|"){var r=e.lastIndexOf(t);return[e.substr(0,r),e.substr(r+1)]}function is(e){if(['"',"'"].includes(e[0])&&e[0]===e[e.length-1]){for(var t=1;t<e.length-1;){if(e[t]===e[0]&&e[t-1]!=="\\")return!1;t++}return!0}return!1}function Ra(e){return e.filter(t=>t.opts&&t.opts.length).forEach(t=>{t.opts2={};let r=t.opts.find(_=>_.type==="loop");if(r){let _=r.key;t.opts2.key=new Function(`return ${_}`)();let x=r.value.split(" as ");if(!x[1])throw"Alias for the loop not defined";let P=x[1].split(",");t.opts2.loop_fn=x[0].trim(),t.opts2.loop_alias=P[0].trim(),P[1]&&(t.opts2.loop_key_alias=P[1].trim())}let i=t.opts.find(_=>_.type==="text");i&&(is(i.value)?t.opts2.text=i.value.substring(1,i.value.length-1):t.opts2.textFn=i.value);let c=t.opts.find(_=>_.type==="html");c&&(is(c.value)?t.opts2.html=c.value.substring(1,c.value.length-1):t.opts2.htmlFn=c.value),["if","style","attrs","enterStyles","updateStyles","exitStyles","enterAttrs","updateAttrs","exitAttrs"].forEach(_=>{let x=t.opts.find(P=>P.type===_);x&&(t.opts2[_]=x.value)}),t.opts.filter(_=>_.type==="eventCallback").forEach(_=>{t.opts2.events||(t.opts2.events={});let x=_.key.substr(1);if(t.opts2.events[x])throw`ui.js compile error: Duplicate event name "${x}"`;_.value[0]==="("&&console.warn(`"${_.key}(" is deprecated. Use "${_.key}{" inside "${t.content.length>40?t.content.substring(0,40)+"...":t.content}" declaration`),_.value=_.value[0]==="("?_.value.substring(1,_.value.length-1).trim():_.value.trim(),_.value[0]==="{"?_.value=_.value.substring(0,_.value.length-1)+";this.render()}":_.value="("+_.value+")==this.render()",t.opts2.events[x]=_.value}),t.opts.filter(_=>_.type==="eventBind"||_.type==="eventBindSelfNamed").forEach(_=>{t.opts2.events||(t.opts2.events={});let x=_.key.substr(1);if(t.opts2.events[x])throw`ui.js compile error: Duplicate event name "${x}"`;t.opts2.events[x]=new Function(`return (...args) => this.${_.value}(...args)`)()}),t.opts.filter(_=>_.type==="eventCallFunction").forEach(_=>{t.opts2.events||(t.opts2.events={});let x=_.key.substr(1);if(t.opts2.events[x])throw`ui.js compile error: Duplicate event name "${x}"`;t.opts2.events[x]=`${_.value}${_.args}`})}),e.filter(t=>t.opts&&t.opts.length).forEach(t=>{t.opts2||(t.opts2={}),t.opts2.attrs2||(t.opts2.attrs2={},t.opts2.attrsB={},t.opts2.attrsR={}),t.opts.filter(p=>p.type==="booleanAttribute").forEach(p=>{t.opts2.attrs2[p.key]&&console.warn(`ui.js compile warning: direct attibute "${p.key}" override attrs({...${p.key}...}) declaration in tag ""!`),t.opts2.attrs2[p.key]=p.key,t.opts2.attrsB[p.key]=!0}),t.opts.filter(p=>p.type==="stringAttribute").forEach(p=>{t.opts2.attrs2[p.key]&&console.warn(`ui.js compile warning: direct attibute "${p.key}" override attrs({...${p.key}...}) declaration in tag ""!`),t.opts2.attrs2[p.key]=p.value}),t.opts.filter(p=>p.type==="jsAttribute").forEach(p=>{if(p.key[0]==="%"){var f=p.key.substr(1);t.opts2.attrsR[f]=p.value}else var f=p.key;t.opts2.attrs2[f]&&console.warn(`ui.js compile warning: direct attibute "${f}" override attrs({...${f}...}) declaration in tag ""!`),t.opts2.attrs2[f]=p.value.endsWith("%")?p.value:p})}),e.forEach(t=>{t.opts2&&t.opts2.attrs2&&!Object.keys(t.opts2.attrs2).length&&(delete t.opts2.attrs2,delete t.opts2.attrsB),t.opts2&&t.opts2.events&&!Object.keys(t.opts2.events).length&&delete t.opts2.events}),e}function Be({AAA:e,item:t,tag:r,a:i},c="enter",p="enterStyles"){if(i===c&&e.length){let f=e.shift().content;if(f[0]==="("){if(t.opts.find(S=>S.type===c))throw`ui.js template parse error: duplicate ${c}() inside "<${r}>" declaration`;t.opts.push({type:p,value:f.slice(1,-1)})}else if(f[0]==="{"){if(c==="if")throw`ui.js template parse error: expected "if(..." but "if${f[0]}..." found inside "<${r}>"`;if(t.opts.find(S=>S.type===c))throw`ui.js template parse error: duplicate ${c}() inside "<${r}>" declaration`;t.opts.push({type:p,value:f.slice(1,-1)})}else throw`ui.js template parse error: expected "${c}{..." but "${c}${f[0]}..." found inside "<${r}>"`;return!0}return!1}function as(e){return e.filter(t=>t.nodeType==="bracket"&&t.innerContent[0]!=="/").forEach(t=>{t.opts=[];let r=ct(t.innerContent).map(c=>({nodeType:c.nodeType,content:c.content.trim()}));var i="";do{let c=r.shift();if(c.nodeType==="bracket")if(t.opts.length){let p=t.opts[t.opts.length-1];if(p.type==="jsAttribute")p.value+=c.content;else throw`ui.js template parse error: unxpected brackets "${c.content}" at the end of <${i}> attributes`}else throw`ui.js template parse error: unxpected brackets "${c.content}" at the end of <${i}> attributes`;else if(c.nodeType==="text"){let p=ss(c.content);i||(i=p.shift());do{let f=p.shift();if(p[0]&&p[0][0]==="="){let S=p.shift().substr(1);if(f[0]==="@"){if(['"',"'","`"].includes(S[0]))throw`ui.js template parse error: quotes around ${S} is prohibited`;if(r.length&&r[0].nodeType==="bracket"&&!p.length){let _=r.shift();t.opts.push({type:"eventCallFunction",key:f,value:S,args:_.content})}else t.opts.push({type:"eventBind",key:f,value:S.endsWith("/")?S.substring(0,S.length-1):S})}else if(S.startsWith('"')&&S.endsWith('"')||S.startsWith("`")&&S.endsWith("`")||S.startsWith("'")&&S.endsWith("'"))t.opts.push({type:"stringAttribute",key:f,value:S.slice(1,-1)});else if(S.length){let _=S.endsWith("/")?S.substring(0,S.length-1):S;_.startsWith('"')&&_.endsWith('"')||_.startsWith("`")&&_.endsWith("`")||_.startsWith("'")&&_.endsWith("'")?t.opts.push({type:"stringAttribute",key:f,value:_.slice(1,-1)}):t.opts.push({type:"jsAttribute",key:f,value:_})}else{if(!r.length)throw`ui.js template parse error: unxpected end of attribute "...${f}=" inside "<${i}>" declaration`;let _=r.shift().content;_[0]==="{"?t.opts.push({type:"eueAttribute",key:f,value:_}):_[0]==="["?t.opts.push({type:"transitionAttribute",key:f,value:_}):t.opts.push({type:"jsAttribute",key:f,value:_.substring(1,_.length-1)})}}else if(f==="loop"&&r.length){let S=r.shift().content;if(S[0]==="("){if(t.opts.find(P=>P.type==="loop"))throw`ui.js template parse error: duplicate loop${S} inside "<${i}>" declaration`;let[_,x]=os(S.slice(1,-1));if(x)t.opts.push({type:"loop",key:x,value:_});else throw`ui.js template parse error: non-keyed loop not supported yet. "loop${S}" inside "<${i}>"`}else throw`ui.js template parse error: expected "loop(..." but "loop${S[0]}..." found inside "<${i}>" `}else if(!Be({AAA:r,item:t,tag:i,a:f},"if","if")){if(!Be({AAA:r,item:t,tag:i,a:f},"style","style")){if(!Be({AAA:r,item:t,tag:i,a:f},"attrs","attrs")){if(!Be({AAA:r,item:t,tag:i,a:f},"enter","enterStyles")){if(!Be({AAA:r,item:t,tag:i,a:f},"update","updateStyles")){if(!Be({AAA:r,item:t,tag:i,a:f},"exit","exitStyles")){if(!Be({AAA:r,item:t,tag:i,a:f},"#enter","enterAttrs")){if(!Be({AAA:r,item:t,tag:i,a:f},"#update","updateAttrs")){if(!Be({AAA:r,item:t,tag:i,a:f},"#exit","exitAttrs")){if(f==="text"&&r.length){let S=r.shift().content;if(S[0]==="("){if(t.opts.find(_=>_.type==="text"))throw`ui.js template parse error: duplicate text{c} inside "<${i}>" declaration`;t.opts.push({type:"text",value:S.slice(1,-1)})}else throw`ui.js template parse error: expected "text(..." but "text{c[0]}..." found inside "<${i}>"`}else if(f==="html"&&r.length){let S=r.shift().content;if(S[0]==="("){if(t.opts.find(_=>_.type==="html"))throw`ui.js template parse error: duplicate html{c} inside "<${i}>" declaration`;t.opts.push({type:"html",value:S.slice(1,-1)})}else throw`ui.js template parse error: expected "html(..." but "html{c[0]}..." found inside "<${i}>"`}else if(f)if(f[0]==="@")if(!p.length&&r[0]&&r[0].nodeType==="bracket"){let S=r.shift();t.opts.push({type:"eventCallback",key:f,value:S.content})}else f.endsWith("/")?t.opts.push({type:"eventBindSelfNamed",key:f.trim().slice(0,-1),value:f.trim().slice(1,-1)}):t.opts.push({type:"eventBindSelfNamed",key:f.trim(),value:f.trim().slice(1)});else{if(f==="=")throw`ui.js template parse error: unxpected end of attribute "${f}" inside "<${i}>" declaration`;f!=="/"&&t.opts.push({type:"booleanAttribute",key:f.endsWith("/")?f.slice(0,-1):f})}}}}}}}}}}}while(p.length)}}while(r.length)}),Ra(e)}var Yn={"!DOCTYPE":!0,"!doctype":!0,area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,menuitem:!0,param:!0,source:!0,track:!0,wbr:!0,circle:!0,ellipse:!0,line:!0,path:!0,polygon:!0,polyline:!0,rect:!0,stop:!0,use:!0};var Ht=class extends Error{constructor(t){super(t),this.name="ui.js \u2764\uFE0F  syntax ERROR"}};function qn(e,t=[]){if(!t.length)return e;if(e[0]=="@"){if(e.length===1)throw"empty alias tag <@>";let r=t.find(i=>i.alias===e);if(r)e=r.name;else throw`alias <${e}> not defined`}return e}function Wn(e,t){let r=t.find(i=>i.name===e);return r?r.alias:e}function Ba(e,t){let r=[{children:[]}];if(r.last=()=>r[r.length-1],e.forEach(i=>{if(i.nodeType==="text"){var c=r[r.length-1];if(c.text)throw"children and text() attribute at the same time";c.children.push({tag:"#text",content:i.content})}else{var p=i.content.match(new RegExp("^<(@?[a-z][-a-z0-9]*)(\\s.*)?\\/>$","s"));if(p){var c=r[r.length-1];if(c.text)throw"children and text() attribute at the same time";c.children.push(Object.assign({tag:qn(p[1],t)},i.opts2))}else{var f=i.content.match(new RegExp("^<(@?[a-z][-a-z0-9]*)(\\s.*)?>$","s"));if(f)if(Yn[f[1]]){let _=r[r.length-1];if(_.text)throw"children and text() attribute at the same time";_.children.push(Object.assign({tag:qn(f[1],t)},i.opts2))}else r.push(Object.assign({tag:qn(f[1],t),children:[]},i.opts2));else{var S=i.content.match(new RegExp("^<\\/(@?[a-z][-a-z0-9]*)(\\s.*)?>$","s"));if(S){if(Yn[S[1]])throw`can't close self-closing tag "</${S[1]}>"`;let _=r[r.length-2],x=r.pop();if(x.children.length===1&&x.children[0].tag==="#text"?(x.text=x.children[0].content,delete x.children):x.children.length||delete x.children,_){if(_.text)throw"children and text() attribute at the same time";let P=Wn(x.tag,t),R=Wn(S[1],t);if(P!==R)throw`the opening and closing tags are not the same <${P}>...</${R}>`;_.children.push(x)}else throw!x.children||x.children[0].tag!==S[1]?`missing the opening tag for </${S[1]}>`:`closed twice tag <${x.children[0].tag}>`}}}}}),r.length>1){let i=r.find(c=>c.tag);throw`Unclosed tag <${Wn(i.tag,t)}>`}return r[0].children}var cs=Ba;var ut={};ut.animate=function(e,t,r,i,c,p,f){if(typeof e!="number"||typeof t!="number"||typeof r!="number"||typeof i!="function")return;typeof c=="string"&&H[c]&&(c=H[c]),typeof c!="function"&&(c=H.linear),typeof p!="function"&&(p=function(){});var S=window.requestAnimationFrame||function(k){window.setTimeout(k,1e3/60)},_=!1,x=t-e;function P(k){if(!_){var V=(k||+new Date)-R;V>=0&&i(c(V,e,x,r)),V>=0&&V>=r?(i(t),p(f,t)):S(P)}}if(i(e),x){var R=window.performance&&window.performance.now?window.performance.now():+new Date;S(P)}return{update:function(k,V,$){R=window.performance&&window.performance.now?window.performance.now():+new Date,e=k,t=V,x=t-e,typeof $=="string"&&H[$]&&(c=H[$])},cancel:function(){_=!0},last:t}};ut.animateCSS=function(e,t,r,i,c,p,f,S){var _=function(x){e.style[t]=x+r};return ut.animate(i,c,p,_,f,S)};ut.cancel=function(e){e&&e.cancel()};var H=ut.easings={};H.linear=function(e,t,r,i){return r*e/i+t};H.easeInQuad=function(e,t,r,i){return r*(e/=i)*e+t};H.easeOutQuad=function(e,t,r,i){return-r*(e/=i)*(e-2)+t};H.easeInOutQuad=function(e,t,r,i){return(e/=i/2)<1?r/2*e*e+t:-r/2*(--e*(e-2)-1)+t};H.easeInCubic=function(e,t,r,i){return r*(e/=i)*e*e+t};H.easeOutCubic=function(e,t,r,i){return r*((e=e/i-1)*e*e+1)+t};H.easeInOutCubic=function(e,t,r,i){return(e/=i/2)<1?r/2*e*e*e+t:r/2*((e-=2)*e*e+2)+t};H.easeInQuart=function(e,t,r,i){return r*(e/=i)*e*e*e+t};H.easeOutQuart=function(e,t,r,i){return-r*((e=e/i-1)*e*e*e-1)+t};H.easeInOutQuart=function(e,t,r,i){return(e/=i/2)<1?r/2*e*e*e*e+t:-r/2*((e-=2)*e*e*e-2)+t};H.easeInQuint=function(e,t,r,i){return r*(e/=i)*e*e*e*e+t};H.easeOutQuint=function(e,t,r,i){return r*((e=e/i-1)*e*e*e*e+1)+t};H.easeInOutQuint=function(e,t,r,i){return(e/=i/2)<1?r/2*e*e*e*e*e+t:r/2*((e-=2)*e*e*e*e+2)+t};H.easeInSine=function(e,t,r,i){return-r*Math.cos(e/i*(Math.PI/2))+r+t};H.easeOutSine=function(e,t,r,i){return r*Math.sin(e/i*(Math.PI/2))+t};H.easeInOutSine=function(e,t,r,i){return-r/2*(Math.cos(Math.PI*e/i)-1)+t};H.easeInExpo=function(e,t,r,i){return e==0?t:r*Math.pow(2,10*(e/i-1))+t};H.easeOutExpo=function(e,t,r,i){return e==i?t+r:r*(-Math.pow(2,-10*e/i)+1)+t};H.easeInOutExpo=function(e,t,r,i){return e==0?t:e==i?t+r:(e/=i/2)<1?r/2*Math.pow(2,10*(e-1))+t:r/2*(-Math.pow(2,-10*--e)+2)+t};H.easeInCirc=function(e,t,r,i){return-r*(Math.sqrt(1-(e/=i)*e)-1)+t};H.easeOutCirc=function(e,t,r,i){return r*Math.sqrt(1-(e=e/i-1)*e)+t};H.easeInOutCirc=function(e,t,r,i){return(e/=i/2)<1?-r/2*(Math.sqrt(1-e*e)-1)+t:r/2*(Math.sqrt(1-(e-=2)*e)+1)+t};H.easeInElastic=function(e,t,r,i){var c=0,p=r;if(e==0)return t;if((e/=i)==1)return t+r;if(c||(c=i*.3),p<Math.abs(r)){p=r;var f=c/4}else var f=c/(2*Math.PI)*Math.asin(r/p);return-(p*Math.pow(2,10*(e-=1))*Math.sin((e*i-f)*(2*Math.PI)/c))+t};H.easeOutElastic=function(e,t,r,i){var c=0,p=r;if(e==0)return t;if((e/=i)==1)return t+r;if(c||(c=i*.3),p<Math.abs(r)){p=r;var f=c/4}else var f=c/(2*Math.PI)*Math.asin(r/p);return p*Math.pow(2,-10*e)*Math.sin((e*i-f)*(2*Math.PI)/c)+r+t};H.easeInOutElastic=function(e,t,r,i){var c=0,p=r;if(e==0)return t;if((e/=i/2)==2)return t+r;if(c||(c=i*(.3*1.5)),p<Math.abs(r)){p=r;var f=c/4}else var f=c/(2*Math.PI)*Math.asin(r/p);return e<1?-.5*(p*Math.pow(2,10*(e-=1))*Math.sin((e*i-f)*(2*Math.PI)/c))+t:p*Math.pow(2,-10*(e-=1))*Math.sin((e*i-f)*(2*Math.PI)/c)*.5+r+t};H.easeInBack=function(e,t,r,i,c){return c==null&&(c=1.70158),r*(e/=i)*e*((c+1)*e-c)+t};H.easeOutBack=function(e,t,r,i,c){return c==null&&(c=1.70158),r*((e=e/i-1)*e*((c+1)*e+c)+1)+t};H.easeInOutBack=function(e,t,r,i,c){return c==null&&(c=1.70158),(e/=i/2)<1?r/2*(e*e*(((c*=1.525)+1)*e-c))+t:r/2*((e-=2)*e*(((c*=1.525)+1)*e+c)+2)+t};H.easeInBounce=function(e,t,r,i){return r-H.easeOutBounce(i-e,0,r,i)+t};H.easeOutBounce=function(e,t,r,i){return(e/=i)<1/2.75?r*(7.5625*e*e)+t:e<2/2.75?r*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?r*(7.5625*(e-=2.25/2.75)*e+.9375)+t:r*(7.5625*(e-=2.625/2.75)*e+.984375)+t};H.easeInOutBounce=function(e,t,r,i){return e<i/2?H.easeInBounce(e*2,0,r,i)*.5+t:H.easeOutBounce(e*2-i,0,r,i)*.5+r*.5+t};var Se=ut;var Ma={},Me=Ma;var Oe={duration:500};function Vn(e,t,r){var i=e[t];if(t<r)for(;t<r;t++)e[t]=e[t+1];else for(;t>r;t--)e[t]=e[t-1];e[r]=i}function pt(e,t){if(typeof Me[e.tag]=="function")var r=new Me[e.tag](t,e);else if(e.svg)var r=document.createElementNS("http://www.w3.org/2000/svg",e.tag);else var r=document.createElement(e.tag);return Object.assign(r,{_attrs:{},_styles:{},_attrsV:{},_styleV:{},_colors:{},_events:{}}),r}function ls(e,t,r){t._BASE_ELEMENT?r?e._childNodes.splice(e._childNodes.findIndex(i=>i===r)+1,0,t):e._childNodes.unshift(t):r?r.after(t):e.prepend(t)}function ft(e,t){t._BASE_ELEMENT?e._childNodes.unshift(t):e.prepend(t)}function mt(e,t,r){var R;var i=void 0,c="linear",p=void 0,f=void 0,S=void 0;if(typeof r=="object"){var _=r.duration||Oe.duration,x=r.to;r.ease&&(c=r.ease),r.fn&&(p=r.fn),r.done&&(f=r.done),r.from!==void 0&&(i=r.from),r.default!==void 0&&(S=r.default)}else var _=Oe.duration,x=r;if(i===void 0){var P=e.__rendererName?e.state[t]:e.getAttribute(t);i=P==null?S||0:Number(P)}Se.cancel(e._attrs[t]),p?(i=((R=e._attrs[t])==null?void 0:R.last)||0,e._attrs[t]=Se.animate(i,x,_,k=>{e.setAttribute(t,p(k))},c,f,e)):e._attrs[t]=Se.animate(i,x,_,k=>{e.setAttribute(t,k)},c,f,e)}function Fa(e,t,r){var i="linear",c=0;if(typeof r=="object"){var p=r.duration||Oe.duration,f=r.to;r.ease&&(i=r.ease),r.delay&&(c=r.delay)}else var p=Oe.duration,f=r;e._colors[t]=t+" "+p+"ms "+i+" "+c+"ms",clearTimeout(e._styles[t]),e._styles[t]=setTimeout(()=>{delete e._colors[t];var _=Object.values(e._colors).join(",");e._transition!=_&&(e._transition=_,e._transition?e.style.setProperty("transition",e._transition):e.style.removeProperty("transition"))},p+c);var S=Object.values(e._colors).join(",");e._transition!=S&&(e._transition=S,e._transition?e.style.setProperty("transition",e._transition):e.style.removeProperty("transition")),e.style.getPropertyValue(t)||e.style.setProperty(t,"#000000"),e.style.setProperty(t,getComputedStyle(e)[t]),setTimeout(()=>{e.style.setProperty(t,f)},0)}function Qt(e,t,r){if(["color","background","fill","stroke","background-color","border-color"].includes(t)){Fa(e,t,r);return}var i="linear",c=void 0,p=void 0,f=0,S="",_=void 0,x=void 0;if(typeof r=="object"){if(typeof r.duration=="function"&&(r.duration=r.duration()),r.duration===0&&r.to){Se.cancel(e._styles[t]),e.style.setProperty(t,r.to);return}var P=r.duration||Oe.duration,R=r.to;r.from!==void 0&&(p=r.from),r.default!==void 0&&(x=r.default),r.ease&&(i=r.ease),r.done&&(c=r.done),r.threshold!==void 0&&(f=r.threshold),r.fn&&(_=r.fn)}else var P=Oe.duration,R=r;var k=t.startsWith("--"),V=k?e.style.getPropertyValue(t):e.style[t];if(!V&&x&&(V=x),typeof R=="string"?["px","%","deg","vw","vh","em"].some($=>{if(R.endsWith($))return p!==void 0?p.endsWith($)&&(p=Number(p.substring(0,p.length-$.length))):p=Number(V.substring(0,V.length-$.length)),R=Number(R.substring(0,R.length-$.length)),S=$,!0})||(R=Number(R)):p===void 0&&(p=Number(V)),f&&Math.abs(p-R)<f){Se.cancel(e._styles[t]),e.style.setProperty(t,r.to);return}Se.cancel(e._styles[t]),_?e._styles[t]=Se.animate(p,R,P,$=>{e.style.setProperty(t,_($+S))},i,c,e):e._styles[t]=Se.animate(p,R,P,$=>{e.style.setProperty(t,$+S)},i,c,e)}function Et(e,t){return!!(e==="input"&&["checked","autofocus","readonly","required","disabled","multiple"].includes(t)||e==="option"&&["selected"].includes(t)||e==="button"&&["disabled","multiple"].includes(t)||e==="select"&&["disabled"].includes(t))}function us(e,t,r,i,c){return typeof c!="object"?(e.setAttribute(i,c),Oe.duration):(mt(e,i,c),c.duration?c.duration:Oe.duration)}function ps(e,t,r,i,c){return Qt(e,i,c),c.duration?c.duration:Oe.duration}function fs(e,t,r,i,c,p){var f=0,S=0;if(t.exitAttrs){var _=t.exitAttrs(r);typeof _=="object"&&(S=Object.entries(_).reduce((P,R)=>Math.max(us(e,t,r,R[0],R[1]),P),0))}if(t.exitStyles){var x=t.exitStyles(r);typeof x=="object"&&(f=Object.entries(x).reduce((P,R)=>Math.max(ps(e,t,r,R[0],R[1]),P),0))}if(e.isExit=!0,f>0||S>0){let P=setTimeout(()=>p.Done.then(()=>{xt(e),c.exit.delete(i)}),f>S?f:S);c.exit.set(i,{element:e,timeout:P});return}clearTimeout(c.exit[i]),xt(e)}function ms(e,t,r,i,c){var p=0,f=0;if(t.exitAttrs){var S=t.exitAttrs(r);typeof S=="object"&&(f=Object.entries(S).reduce((x,P)=>Math.max(us(e,t,r,P[0],P[1]),x),0))}if(t.exitStyles){var _=t.exitStyles(r);typeof _=="object"&&(p=Object.entries(_).reduce((x,P)=>Math.max(ps(e,t,r,P[0],P[1]),x),0))}if(e.isExit=!0,p>0||f>0){let x=setTimeout(()=>i.Done.then(()=>{i.__i__[c]=!1,xt(e)}),p>f?p:f);return i.__i__[c]={exit:x},!1}return clearTimeout(i.__i__[c]),i.__i__[c]=!1,xt(e),!0}async function xt(e){if(e.nodeName==="#text"){console.log("TEXT");return}if(e.__i__)for(let r of Object.values(e.__i__))clearTimeout(r.exit);for(let r of Object.values(e._attrs))r!=null&&r.cancel&&r.cancel();for(let r of Object.values(e._styles))r!=null&&r.cancel&&r.cancel();let t=e.__rendererName?e.document._childNodes:e.children;for(;t.length;){let r=t[t.length-1];await xt(r)}await e.remove()}function At(e,t,r,i,c,p,f){var S=c.keys,_=c.elements,x=c.exit,P=_.length,R=f.length,k=P>R?P:R,V=0,$=0,he=0;do{if($<R){var ee=e.key(f[$],$);if($>=P){P++,k=P>R?P:R;var te=x.get(ee);if(te){clearTimeout(te.timeout);var W=te.element;delete W.isExit,e.svg||(W.className=""),x.delete(ee)}else var W=pt(e,t);if(i[e.loop_alias]=f[$],e.loop_key_alias&&(i[e.loop_key_alias]=$),wt(W,e,i,de,te),$===0)if(x.size)for(let Ue of x){Ue[1].element.before(W);break}else r?r.after(W):ft(t,W);else _[$-1].after(W);_.splice($,0,W),W.key=ee,S[ee]=!0,$++;continue}else{var y=_[$].key;if(ee===y){i[e.loop_alias]=f[$],e.loop_key_alias&&(i[e.loop_key_alias]=$),e.Update_Tag(_[$],e,i,de),$++;continue}else if(S[ee]){var ye=void 0,Le=void 0;let Ue;for(var Qe=void 0,_e=$+1;_e<k;_e++)if(!ye&&_e<P&&_[_e].key===ee&&(ye=_e+1),!Le&&_e<R&&e.key(f[_e],_e)===y&&(Le=_e+1),ye&&Le){var Ne=_[$];if(ye>=Le)Ue=_[ye-1],t.insertBefore(Ue,Ne),i[e.loop_alias]=f[$],e.loop_key_alias&&(i[e.loop_key_alias]=$),e.Update_Tag(Ue,e,i,de),ye===Le?(_e-$>1&&(ye>=_.length?_[_e-1].after(Ne):t.insertBefore(Ne,_[ye])),_[$]=_[_e],_[_e]=Ne):(Vn(_,ye-1,$),V++),$++;else{Ue=!0;var Ke=Le-1+V;if(Ke>=_.length)_[_.length-2].after(Ne);else{if(!_[Ke])throw 9999999999;t.insertBefore(Ne,_[Ke])}Vn(_,$,(Ke>P?P:Ke)-1),i[e.loop_alias]=f[$],e.loop_key_alias&&(i[e.loop_key_alias]=$),e.Update_Tag(Ne,e,i,de)}break}if(Ue)continue}else{P++,k=P>R?P:R;var te=x.get(ee);if(te)clearTimeout(te.timeout),W=te.element,delete W.isExit,e.svg||(W.className=""),x.delete(ee);else var W=pt(e,t);i[e.loop_alias]=f[$],e.loop_key_alias&&(i[e.loop_key_alias]=$),wt(W,e,i,de,te),$===0?r?r.after(W):ft(t,W):_[$-1].after(W),_.splice($,0,W),W.key=ee,S[ee]=!0,$++;continue}}}delete S[_[$].key],e.loop_key_alias&&(i[e.loop_key_alias]=$+he,he++),fs(_[$],e,i,_[$].key,c,t),_.splice($,1),P--,k=P>R?P:R}while($<k);return c.length=_.length,x.size+c.length}function Ua(){return{ret_element:function(e,t,r,i){return e},children:function(e,t,r,i){i.UPDATE_Chidldren(e,t.children,r)},fn_text:function(e,t,r,i){var c=t.text(r);if(!e){console.log("NOT element.__lastText",e),console.trace();return}e.__lastText!==c&&(e.textContent=e.__lastText=c)},fn_html:function(e,t,r,i){var c=t.html(r);e.__lastHTML!==c&&(e.innerHTML=e.__lastHTML=c)},updateProps:function(e,t,r,i){t.updateProps(e,t,r,i)}}}function Kt(e){var t=[],r=Ua();return e.tag==="#text"?(t.push(r.ret_element),t):(e.children?t.push(r.children):e.html?typeof e.html=="function"&&t.push(r.fn_html):e.text&&typeof e.text=="function"&&t.push(r.fn_text),e.updateProps&&(t=[...t,...e.updateProps]),t.push(r.ret_element),t)}function Da(e,t,r,i,c,p){return t.Update_Tag(e.__rendererName?e._childNodes[c]:e.childNodes[c],t,r,de),c+1}function ja(e,t,r,i,c,p){let f=t.loop(r);if(!p||p.length===0){if(!p||p.exit.size===0)return f.length?i===0?(t.enter(t,e,void 0,r,i,f,de),c+e.__i__[i].length):(t.enter(t,e,c===0?void 0:e.__rendererName?e._childNodes[c-1]:e.childNodes[c-1],r,i,f,de),c+e.__i__[i].length):c;if(f.length){let S=At(t,e,i===0||c===0?void 0:e.__rendererName?e._childNodes[c]:e.childNodes[c],r,p,i,f);return c+S}else return c+p.exit.size}else if(f.length){let S=At(t,e,i===0||c===0?void 0:e.__rendererName?e._childNodes[c-1]:e.childNodes[c-1],r,p,i,f);return c+S}else{let S=At(t,e,i===0||c===0?void 0:e.__rendererName?e._childNodes[c]:e.childNodes[c],r,p,i,f);return c+S}}function ka(e,t,r,i,c,p){if(p===!1)if(t.if(r)){let _=pt(t,e);if(t.children)Fe(_,t.children,r);else if(t.text){var f=typeof t.text=="function"?t.text(r):t.text;_.__lastText!==f&&(_.textContent=_.__lastText=f)}else if(t.html){var S=typeof t.html=="function"?t.html(r):t.html;_.__lastHTML!==S&&(_.innerHTML=_.__lastHTML=S)}return t.enterProps&&t.enterProps(_,t,r,de),c===0?ft(e,_):e.__rendererName?e._childNodes[c-1].after(_):e.childNodes[c-1].after(_),e.__i__[i]={exit:!1},c+1}else return c;else{if(t.if(r))return p.exit?(clearTimeout(p.exit),t.enterProps&&t.enterProps(e.__rendererName?e._childNodes[c]:e.childNodes[c],t,r,de),e.__i__[i]={exit:!1},c+1):(t.Update_Tag(e.__rendererName?e._childNodes[c]:e.childNodes[c],t,r,de),c+1);if(p.exit)return c+1;{let _=e.__rendererName?e._childNodes:e.childNodes;return ms(_[c],t,r,e,i)?c:c+1}}}function za(e,t,r,i,c,p){if(p===!1||p.length===0)if(t.if(r)){let f=t.loop(r);return f.length?i===0?(t.enter(t,e,void 0,r,i,f,de),c+e.__i__[i].length):(t.enter(t,e,c===0?void 0:e.__rendererName?e._childNodes[c-1]:e.childNodes[c-1],r,i,f,de),c+e.__i__[i].length):c}else return c;else if(t.if(r)){let f=t.loop(r),S=At(t,e,i===0&&c===0?void 0:e.__rendererName||e.__rendererName?e._childNodes[c]:e.childNodes[c],r,p,i,f);return c+S}else{if(p.length===0)return c+p.exit.size;{let f=At(t,e,i===0&&c===0?void 0:e.__rendererName?e._childNodes[c]:e.childNodes[c],r,p,i,[]);return c+f}}}function Xt(e,t,r){if(!e.isExit){var i=void 0;e.Done=new Promise(p=>i=p);var c=0;t.every((p,f)=>{if(!e.__i__)return console.groupCollapsed("Not initialized element!!! "+p.tag),console.dir(e),console.log("component",t),console.log("tag",p),console.trace(),console.groupEnd(),!1;let S=e.__i__[f];return p.tag==="#text"?(c++,!0):(p.hasOwnProperty("if")?p.loop?c=za(e,p,r,f,c,S):c=ka(e,p,r,f,c,S):p.loop?c=ja(e,p,r,f,c,S):c=Da(e,p,r,f,c,S),!0)}),i()}}function hs(e,t,r,i){var p,f;if(e.tag==="input"&&r==="value")t._attrsV[r]!==i&&(t._attrsV[r]=i,t.value!=i&&(t.value=i));else if(r==="class"){if(typeof i=="object"&&i!==null)throw"Cannot do transition on class attribute";var c=i||void 0;t._attrsV[r]!==c&&(t._attrsV[r]=c,c?e.svg?t.setAttribute(r,c):t.className=c:t.removeAttribute(r))}else if(r==="style"){if(typeof i=="object"&&i!==null)throw"Cannot do transition on style attribute";var c=i||void 0;t._attrsV[r]!==c&&(t._attrsV[r]=c,c?t.setAttribute(r,c):t.removeAttribute(r))}else(typeof i=="object"||t._attrsV[r]!==i||Array.isArray(i))&&(Et(e.tag,r)?(t._attrsV[r]=i,e.tag==="input"&&e.attrs2.type==="radio"&&r==="checked"&&!e.attrsB[r]?e.attrs2.value?e.attrs2.value==i?(t.setAttribute(r,""),t[r]=r):(t.removeAttribute(r),t[r]=""):i?(t.setAttribute(r,""),t[r]=r):(t.removeAttribute(r),t[r]=""):i?t.setAttribute(r,"")||(t[r]=r):t.removeAttribute(r)||(t[r]="")):e.tag==="textarea"&&r==="value"?t.value=i:(!e.attrs3||!e.attrs3[r])&&typeof i=="object"?i!=null&&i.skip||t._attrsV[r]!==i.to&&(t._attrsV[r]=i.to,i!=null&&i.disabled?((p=t._attrs[r])!=null&&p.cancel&&t._attrs[r].cancel(),t.setAttribute(r,i.to)):mt(t,r,i)):t._attrsV[r]!==i&&(t._attrsV[r]=i,(f=t._attrs[r])!=null&&f.cancel&&t._attrs[r].cancel(),t.setAttribute(r,i)))}function Ga(){return{updateAttrs:function(e,t,r,i){Object.entries(t.updateAttrs(r)).forEach(([c,p])=>{i.updateAttribute(t,e,c,p)})},attrs3:function(e,t,r,i){Object.entries(t.attrs3).forEach(([c,p])=>{i.updateAttribute(t,e,c,typeof p=="function"?p(r):p)})},updateStyles:function(e,t,r,i){Object.entries(t.updateStyles(r)).forEach(([c,p])=>{var f;typeof p=="object"?e._styleV[c]!==p.to&&(p!=null&&p.skip||(e._styleV[c]=p.to,p!=null&&p.disabled?((f=e._styles[c])!=null&&f.cancel&&e._styles[c].cancel(),e.style.setProperty(c,p.to)):i.animateCSS(e,c,p))):e._styleV[c]!==p&&(e._styleV[c]=p,e.style.setProperty(c,p))})},style:function(e,t,r,i){Object.entries(t.style(r)).forEach(([c,p])=>{e._styleV[c]!==p&&(e._styleV[c]=p,e.style.setProperty(c,p))})},events:function(e,t,r,i){e.__datum={...r}}}}function Zt(e){let t=[],r=Ga();return e.updateAttrs&&t.push(r.updateAttrs),e.attrs3&&t.push(r.attrs3),e.style&&t.push(r.style),e.updateStyles&&t.push(r.updateStyles),e.events&&t.push(r.events),t}var ds=(...e)=>e.filter(t=>typeof t=="function").reduce((t,r)=>t===null?r:function(...c){t.apply(this,c),r.apply(this,c)},null);var Ya={createElement:pt,insertElement:ls,prependElement:ft,Enter_Children:Fe,UPDATE_Chidldren:Xt,Update_Tag:Kt,animateAttr:mt,animateCSS:Qt,enterProps:en,enterAttribute:ys,updateProps:Zt,updateAttribute:hs},de=Ya;function ys(e,t,r,i){var p;if(r==="class"){var c=i||void 0;t._attrsV[r]=c,c&&(e.svg?t.setAttribute(r,c):t.className=c)}else if(r==="style"){var c=i||void 0;t._attrsV[r]=c,c&&t.setAttribute(r,c)}else r==="id"?(t._attrsV[r]=i,t.id=i,t.setAttribute(r,i)):Et(e.tag,r)?e.tag==="input"&&e.attrs2.type==="radio"&&r==="checked"&&!e.attrsB[r]?e.attrs2.value?e.attrs2.value==i&&(t.setAttribute(r,""),t._attrsV[r]=i&&!0):i&&(t.setAttribute(r,""),t._attrsV[r]=i&&!0):(t._attrsV[r]=i&&!0,i&&t.setAttribute(r,"")):e.tag==="textarea"&&r==="value"?(t._attrsV[r]=i,t.innerHTML=i):((p=t._attrs[r])!=null&&p.cancel&&t._attrs[r].cancel(),t._attrsV[r]=i,t.setAttribute(r,i))}function qa(){return{enterAttrs:function(e,t,r,i){Object.entries(t.enterAttrs(r)).forEach(([c,p])=>{var f;if(Array.isArray(p))throw"not implemented";typeof p=="object"?(e._attrsV[c]=p,i.animateAttr(e,c,p)):((f=e._attrs[c])!=null&&f.cancel&&e._attrs[c].cancel(),i.enterAttribute(t,e,c,p))})},attrs:function(e,t,r,i){var c=t.attrs?t.attrs(r):{};t.attrs2&&Object.entries(t.attrs2).forEach(([p,f])=>{c[p]=typeof f=="function"?f(r):f}),Object.entries(c).forEach(([p,f])=>{i.enterAttribute(t,e,p,f)})},enterStyles:function(e,t,r,i){Object.entries(t.enterStyles(r)).forEach(([c,p])=>{var f;if(Array.isArray(p))throw"not implemented";typeof p=="object"?(e._styleV[c]=p.to,i.animateCSS(e,c,p)):(e._styleV[c]=p,(f=e._styles[c])!=null&&f.cancel&&e._styles[c].cancel(),e.style.setProperty(c,p))})},style:function(e,t,r,i){Object.entries(t.style(r)).forEach(([c,p])=>{e._styleV[c]=p,e.style.setProperty(c,p)})},events:function(e,t,r,i){e.__datum={...r},Object.entries(t.events).forEach(([c,p])=>{e._events[c]=f=>p(f,e.__datum,e),e.addEventListener(c,e._events[c])})}}}function en(e){let t=[],r=qa();return e.enterAttrs&&t.push(r.enterAttrs),(e.attrs||e.attrs2)&&t.push(r.attrs),e.style&&t.push(r.style),e.enterStyles&&t.push(r.enterStyles),e.events&&t.push(r.events),t}function _s(e){return(t,r,i,c,p,f,S)=>{var _={},x=new Map,P=[],R=i;return f.forEach((k,V)=>{var $=S.createElement(t,r);$.key=t.key(k,V),_[$.key]=!0,P.push($),c[t.loop_alias]=k,t.loop_key_alias&&(c[t.loop_key_alias]=V),t.enterProps&&t.enterProps($,t,c,S),t.children?S.Enter_Children($,t.children,c):(t.text&&(typeof t.text=="function"?$.textContent=$.__lastText=t.text(c):$.textContent=$.__lastText=t.text),t.html&&(typeof t.html=="function"?$.innerHTML=$.__lastHTML=t.html(c):$.innerHTML=$.__lastHTML=t.html)),V===0&&!R?S.prependElement(r,$):R.after($),R=$}),r.__i__[p]={length:f.length,exit:x,elements:P,keys:_},R}}function Wa(e,t,r,i){e.__i__={},t.forEach((c,p)=>{if(c.if&&!c.if(r)){e.__i__[p]=!1;return}if(c.loop){if(c.loop(r).length)throw 123;e.__i__[p]=!1;return}else{let f=e.__rendererName?e._childNodes:e.children;wt(f[p],c,r,i,!0);return}})}function wt(e,t,r,i,c){return t.enterProps&&t.enterProps(e,t,r,i),t.children?c?Wa(e,t.children,r,i):Fe(e,t.children,r):(t.text&&(typeof t.text=="function"?e.textContent=e.__lastText=t.text(r):e.textContent=e.__lastText=t.text),t.html&&(typeof t.html=="function"?e.innerHTML=e.__lastHTML=t.html(r):e.innerHTML=e.__lastHTML=t.html)),e}function bs(e,t,r,i,c){return e.element=document.createTextNode(e.content),r?r.after(e.element):t.prepend(e.element),t.__i__[c]={exit:!1},e.element}function gs(e){return(t,r,i,c,p,f,S)=>{var _=S.createElement(t,r);return t.enterProps&&t.enterProps(_,t,c,S),t.text&&(typeof t.text=="function"?_.textContent=_.__lastText=t.text(c):_.textContent=_.__lastText=t.text),t.html&&(typeof t.html=="function"?_.innerHTML=_.__lastHTML=t.html(c):_.innerHTML=_.__lastHTML=t.html),S.insertElement(r,_,i),r.__i__[p]={exit:!1},_}}function vs(e){return(t,r,i,c,p,f,S)=>{var _=S.createElement(t,r);return t.enterProps&&t.enterProps(_,t,c,S),S.insertElement(r,_,i),S.Enter_Children(_,t.children,c),r.__i__[p]={exit:!1},_}}function Fe(e,t,r){e.__i__={};var i;t.forEach((c,p)=>{if(c.if&&!c.if(r)){e.__i__[p]=!1;return}if(c.loop){let f=c.loop(r);if(f.length){i=c.enter(c,e,i,r,p,f,de);return}else{e.__i__[p]=!1;return}}else{i=c.enter(c,e,i,r,p,void 0,de);return}})}function Ss(e){if(e.tag==="#text"){e.enter=bs;return}e.enterProps=en(e),e.updateProps=Zt(e),e.Update_Tag=Kt(e),e.loop?e.enter=_s(e):e.enter=e.children?vs(e):gs(e)}var Va=Object.getPrototypeOf(async function(){}).constructor,tn=Va;var Ja=["svg","g","path","polygon","rect","circle","line","clipPath","cursor","defs","desc","ellipse","filter","font","glyph","image","text","textPath","animate","animateMotion","animateTransform"],nn=(e,t)=>new Function(`return ({ ${e.context.join(",")} }) => ${e[t]}`)(),Ha=(e,t)=>new Function(`return ({ ${e.context.join(",")} }) => ({${e[t]}})`)(),rn=(e,t,r)=>new Function(`return (event, { ${e.context.join(",")} }, element) => {setTimeout(()=>this.render(),0);${t} = event.target.${r}} `)(),Qa=(e,t)=>new Function(`return async (event, { ${e.context.join(",")} }, element) => ${t}`)(),Ka=(e,t)=>new Function(`return ({ ${e.context.join(",")} }) => ${t.value+(t.args||"")}`)();function Jn(e,t,r){return e.forEach((i,c)=>{Ja.includes(i.tag)&&(i.svg=!0),i.context=[...t],i.loop_alias&&(i.loop=nn(i,"loop_fn"),i.context.push(i.loop_alias),i.loop_key_alias&&i.context.push(i.loop_key_alias)),i.textFn&&(i.text=nn(i,"textFn"),delete i.textFn),i.htmlFn&&(i.html=nn(i,"htmlFn"),delete i.htmlFn),i.if&&(i.if=nn(i,"if")),["style","attrs","enterStyles","updateStyles","exitStyles","enterAttrs","updateAttrs","exitAttrs"].forEach(p=>{i[p]&&(i[p]=Ha(i,p))}),i.events&&Object.entries(i.events).forEach(([p,f])=>{typeof f=="string"&&(i.events[p]=Qa(i,f))}),i.attrsR&&Object.keys(i.attrsR).length&&Object.entries(i.attrsR).forEach(([p,f])=>{if(i.events||(i.events={}),i.events.input)throw"@input and reactive attr at the same time";i.tag==="input"?p==="value"?i.events.input=rn(i,f,"value"):p==="checked"&&(i.attrs2.type==="checkbox"?i.events.input=rn(i,f,"checked"):i.attrs2.type==="radio"&&(i.events.input=rn(i,f,"value"))):i.tag==="textarea"&&p==="value"&&(i.events.input=rn(i,f,"value"))}),i.attrs2&&(Object.keys(i.attrs2).length&&(i.attrs3={}),Object.entries(i.attrs2).forEach(([p,f])=>{typeof f=="object"&&f.type==="jsAttribute"&&(i.attrs3[p]=i.attrs2[p]=Ka(i,f))}),Object.keys(i.attrs3).length||delete i.attrs3),Ss(i),i.children&&Jn(i.children,i.context,r)}),e}function Xa(e){return e.filter(t=>{if(t.nodeType==="bracket"){let r=t.innerContent.split(" ").join("");if(["","/","@","@/","/@"].includes(r))throw`Empty tag <${r}>`}return!(t.nodeType==="text"&&!t.content.trim().length)})}function Za(e=""){return Xa(ct(e,{skip:!0,pairs:["<>","{}","()","[]"]}))}function Ts(e,t=[],r=!1){return Jn(cs(as(Za(e)),t),["state"],r)}var ec="static|template|state|class|style|walt";function tc(e){return e.split(/\r\n|\n|\r/)}function nc(e,t){let r=e.match(new RegExp(`^\\s*<!(${t})>\\s*$`,"i"));return r?r[1]:null}function rc(e,t){let r=e.match(new RegExp(`^\\s*<!${t}\\s+([^>]*)>\\s*$`,"i"));return r?r[1]:null}async function sc(e){let t=tc(e),r={};var i=void 0,c=0;for(let p=0;p<t.length;p++){let f=t[p];if(!f.trim().length)continue;let S=nc(f,ec);if(!(!S&&["css","import","tag","renderer"].some(_=>{let x=rc(f,_);if(x)return i=_,r[i]||(r[i]=[]),r[_].push(i==="tag"?{value:x,line:p}:x),!0}))){if(!i&&!S){i="template",c=p,r.template="",r.template+=`
`+f;continue}if(S){if(i=S,!r[S])r[S]="";else throw`duplicate <!${S}> block at line ${p}`;continue}else{if(["css","import","tag","renderer"].includes(i))if(!r.template)i="template",c=p,r.template="";else{if(f.trim().startsWith("//"))continue;throw`unexpected "${f.trim()}" at line ${p}. Template started at line ${c}`}r[i]+=`
`+f;continue}}}return r}function Je(e){return['"',"'","`"].includes(e[0])&&e[0]==e[e.length-1]?e.substring(1,e.length-1).trim():e.trim()}function oc(e){let t={},r=lt(e.value," ",!0).map(Je);if(r.length>2)throw`excess arguments <!tag ${e.value}> at line ${e.line}`;if(r.some(i=>!i))throw`empty argument <!tag ${e.value}> at line ${e.line}`;if(r.length===1){if(r[0][0]==="@")throw`alias is present but path is not <!tag ${e.value}> at line ${e.line}`;t.alias="@"+r[0].split("\\").pop().split("/").pop(),t.path=r[0]}else{if(r[0][0]!=="@")throw`missing alias identifier "@" <!tag ${e.value}> at line ${e.line}`;t.alias=r[0],t.path=r[1]}return t}function ic(e){if(lt(e," ",!0).length>1)throw`excess parameters <!import ${e}>`;return Je(e)}function ac(e){let t=lt(e," ",!0);if(t.length>2)throw`excess parameters <!renderer ${e}>`;if(t.length==2&&t[1]!=="html")throw`unknown second parameter <!renderer ${e}>`;return Je(e)}function sn(e){try{Function("var "+e)}catch(t){return!1}return!0}function cc(e){let t=lt(e," ",!0);if(t.length<3)throw`not enough parameters <!import ${e}>`;if(t.length===3){if(t[1].toLowerCase()!=="from")throw`wrong parameters <!import ${e}>`;if(t[0].startsWith("{")&&t[0].endsWith("}")){let i=t[0].substring(1,t[0].length-1);if(!i.length)throw`wrong parameters <!import ${e}>`;if(!i.split(",").map(p=>p.trim()).every(sn))throw`invalid variable name <!import ${e}>`;return{type:"object",import:t[0],path:Je(t[2])}}else{if(!sn(t[0]))throw`invalid variable name <!import ${e}>`;return{type:"var",import:t[0],path:Je(t[2])}}}else{try{var r=ct(e,{pairs:["{}"]})}catch(i){throw`invalid variable name <!import ${e}>`}if(r.length>2)throw`wrong parameters <!import ${e}>`;if(r.length===1){if(r[0].nodeType==="bracket")throw`wrong parameters <!import ${e}>`;if(t[0]==="*"&&t[1].toLowerCase()==="as"&&t[3].toLowerCase()==="from"&&t.length===5){if(!sn(t[2]))throw`invalid variable name <!import ${e}>`;return{type:"*",import:t[2],path:Je(t[4])}}else throw`wrong parameters <!import ${e}>`}else{let i=lt(r[1].content," ",!0);if(i.length!==2||i[0].toLowerCase()!=="from")throw`wrong parameters <!import ${e}>`;if(!r[0].innerContent.trim().length)throw`wrong parameters <!import ${e}>`;let c=r[0].innerContent.split(",").map(p=>p.trim());if(!c.every(sn))throw`invalid variable name <!import ${e}>`;return{type:"object",import:"{"+c.join(",")+"}",path:Je(i[1])}}}}async function Es(e){let t=await sc(e);return t.tag&&(t.tag=t.tag.map(oc)),t.css&&(t.css=t.css.map(ic)),t.import&&(t.import=t.import.map(cc)),t.renderer&&(t.renderer=t.renderer.map(ac)),t}function lc(e){return["Update_Tag","enterProps","updateProps"].forEach(t=>{Array.isArray(e[t])&&(e[t].length?e[t]=ds(...e[t]):delete e[t])}),e}function Hn(e){e.forEach((t,r)=>{e[r]=lc(t),t.children&&Hn(t.children)})}var Ct=class{constructor({stiffness:t=300,damping:r=70,mass:i=10,delta:c=.01,target:p,current:f,callback:S,done:_}={}){this.stiffness=t,this.damping=r,this.delta=c,this.mass=i,this.callback=S,this.done=_,this.target=p||0,this.current=f||0,this.running=!1,this.velocity=0,this.acceleration=0,this.step()}set(t,r=!1){this.target=t,r?this.current=t:this.running||this.step()}stop(){cancelAnimationFrame(this.rafId),this.done&&this.done(this.current)}start(){this.step()}step(){if(this.isAtTarget())this.current=this.target,this.running=!1,this.done&&this.done(this.current);else{let t=this.lastFrameTime?Math.min(Math.max((Date.now()-this.lastFrameTime)/1e3,.008333333333333333),.03333333333333333):.016666666666666666;this.running=!0,this.advance(t),this.lastFrameTime=Date.now(),this.rafId=requestAnimationFrame(()=>this.step())}this.callback&&this.callback(this.current)}advance(t){let r=-this.stiffness*(this.current-this.target),i=-this.damping*this.velocity;this.acceleration=(r+i)/this.mass,this.velocity+=this.acceleration*t,this.current+=this.velocity*t}isAtTarget(){return Math.abs(this.target-this.current)<this.delta&&Math.abs(this.velocity)<=this.delta}};var uc=function(e){"use strict";var t=i,r=Object.prototype.hasOwnProperty;function i(){for(var o={},n=0;n<arguments.length;n++){var s=arguments[n];for(var a in s)r.call(s,a)&&(o[a]=s[a])}return o}let c=o=>o;function p(o){function n(s){if(!Array.isArray(s))throw new Error("Transform must be used on an Array. Received "+JSON.stringify(s));let a=(()=>{let[d]=s;return d.Type in o&&typeof o[d.Type]=="function"?o[d.Type]:c})();if(a.length===2)return a(s,n);let[l,...u]=a(s),h=l.params.filter(Boolean).map(d=>n([d,...u]));return t(l,{params:h})}return n}function f(o){let n=s=>{if(s==null)return s;let a=(()=>"*"in o&&typeof o["*"]=="function"?o["*"]:s.Type in o&&typeof o[s.Type]=="function"?o[s.Type]:c)();if(a.length===2)return a(s,n);let l=a(s),u=l.params.map(n);return t(l,{params:u})};return n}var S={map:p,mapNode:f},_=S,x=_.map,P=_.mapNode,R=function(o){let n=s=>{if(s==null)return s;let{params:a}=s,l=(()=>"*"in o&&typeof o["*"]=="function"?o["*"]:s.Type in o&&typeof o[s.Type]=="function"?o[s.Type]:()=>s)();return l.length===2?(l(s,n),s):(l(s),a.forEach(n),s)};return n},k=R,V=function(o,n,s,a,l,u,h,d){if(n===void 0)throw new Error("invariant requires an error message argument");if(!o){var m;if(n===void 0)m=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var v=[s,a,l,u,h,d],b=0;m=new Error(n.replace(/%s/g,function(){return v[b++]})),m.name="Invariant Violation"}throw m.framesToPop=1,m}},$=V,he=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ee(o){return o&&o.__esModule?o.default:o}function te(o,n){return n={exports:{}},o(n,n.exports),n.exports}var W=te(function(o,n){(function(s,a){a(n)})(he,function(s){let a={whitespace:/[ \t]+/,comment:[{match:/\/\/.*?$/},{match:/\/\*[^]*?\*\//,lineBreaks:!0}],number:[{match:/0[xX][0-9a-fA-F]+/},{match:/0[oO][0-9]+/},{match:/0[bB][01]+/},{match:/(?:[0-9]+(?:\.[0-9]+)?e-?[0-9]+)/},{match:/[0-9]+\.[0-9]+|[0-9]+/}],char:[{match:/'(?:\\['\\bfnrtv0]|[^'\\\n])'/,value:We=>We.slice(1,-1)}],string:[{match:/"(?:\\["\\rn]|[^"\\\n])*?"/,value:We=>We.slice(1,-1)},{match:/'(?:\\['\\bfnrtv0]|[^'\\\n])*?'/,value:We=>We.slice(1,-1)},{match:/`(?:\\['\\bfnrtv0]|[^'\\])*?`/,value:We=>We.slice(1,-1)}],identifier:{match:/[A-Za-z_$][A-Za-z0-9_$]*/,keywords:{keyword:["break","if","else","import","as","from","export","return","switch","case","default","const","let","for","continue","do","while","throw","function","global","module","type","lambda"],type:["i32","i64","f32","f64","bool"]}},punctuator:["+","++","-","--",">>",">>>","<<","=","==","+=","-=","=>","<=",">=","!=","%","*","/","^","&","~","|","!","**",":","(",")",".","{","}",",","[","]",";",">","<","?","||","&&","{","}","..."],newline:{match:/(?:\r\n|\r|\n)/,lineBreaks:!0}},l="Program",u="Keyword",h="Export",d="Import",m="Statement",v="IfThenElse",b="Select",g="Else",w="UnaryExpression",N="BinaryExpression",B="TernaryExpression",U="NumberLiteral",z="StringLiteral",Z="CharacterLiteral",K="Punctuator",$e="Identifier",pe="ArraySubscript",O="Constant",D="Type",j="ArrayType",Y="DeclType",q="GenericType",J="UserType",X="FunctionType",ne="Declaration",re="StaticDeclaration",ie="StaticValueList",ge="ImmutableDeclaration",ve="FunctionDeclaration",me="ArrayDeclaration",at="IndirectFunctionCall",St="FunctionCall",qe="Loop",Tt="MemoryAssignment",ae="Assignment",Mr="AssignmentExpression",Fr="Param",$n="Typedef",On="Struct",Ln="UnionType",Nn="ReturnStatement",Pn="Sequence",In="ObjectLiteral",Rn="Pair",Ur="TypeCast",Bn="Break",Mn="Comment",Fn="Sizeof",Un="Spread",Dr="Closure",Dn="Noop",jr="ClosureType",jn="Block",kr="ObjectField",zr="FunctionIndex",Gr="FunctionIdentifier",Yr="FunctionPointer",qr="FunctionArguments",Wr="FunctionResult",Vr="FunctionLocals",Jr="NativeMethod",kn="Unreachable",Hr="Access",Qr="i32",Kr="f32",Xr="i64",Zr="f64",es="Memory",ts="Table",ns="bool";s.Program=l,s.Keyword=u,s.Export=h,s.Import=d,s.Statement=m,s.IfThenElse=v,s.Select=b,s.Else=g,s.UnaryExpression=w,s.BinaryExpression=N,s.TernaryExpression=B,s.NumberLiteral=U,s.StringLiteral=z,s.CharacterLiteral=Z,s.Punctuator=K,s.Identifier=$e,s.ArraySubscript=pe,s.Constant=O,s.Type=D,s.ArrayType=j,s.DeclType=Y,s.GenericType=q,s.UserType=J,s.FunctionType=X,s.Declaration=ne,s.StaticDeclaration=re,s.StaticValueList=ie,s.ImmutableDeclaration=ge,s.FunctionDeclaration=ve,s.ArrayDeclaration=me,s.IndirectFunctionCall=at,s.FunctionCall=St,s.Loop=qe,s.MemoryAssignment=Tt,s.Assignment=ae,s.AssignmentExpression=Mr,s.Param=Fr,s.Typedef=$n,s.Struct=On,s.UnionType=Ln,s.ReturnStatement=Nn,s.Sequence=Pn,s.ObjectLiteral=In,s.Pair=Rn,s.TypeCast=Ur,s.Break=Bn,s.Comment=Mn,s.Sizeof=Fn,s.Spread=Un,s.Closure=Dr,s.Noop=Dn,s.ClosureType=jr,s.Block=jn,s.ObjectField=kr,s.FunctionIndex=zr,s.FunctionIdentifier=Gr,s.FunctionPointer=Yr,s.FunctionArguments=qr,s.FunctionResult=Wr,s.FunctionLocals=Vr,s.NativeMethod=Jr,s.Unreachable=kn,s.Access=Hr,s.i32=Qr,s.f32=Kr,s.i64=Xr,s.f64=Zr,s.Memory=es,s.Table=ts,s.bool=ns,s.builtinTypes={i32:Qr,f32:Kr,i64:Xr,f64:Zr,Memory:es,Table:ts,bool:ns},s.statements={Program:l,Export:h,Import:d,IfThenElse:v,Else:g,Declaration:ne,ImmutableDeclaration:ge,FunctionDeclaration:ve,ArrayDeclaration:me,Loop:qe,MemoryAssignment:Tt,Assignment:ae,Typedef:$n,Struct:On,UnionType:Ln,ReturnStatement:Nn,Sequence:Pn,ObjectLiteral:In,Pair:Rn,Break:Bn,Comment:Mn,Sizeof:Fn,Spread:Un,Noop:Dn,Block:jn,Unreachable:kn},s.default={Program:l,Keyword:u,Export:h,Import:d,Statement:m,IfThenElse:v,Select:b,Else:g,UnaryExpression:w,BinaryExpression:N,TernaryExpression:B,NumberLiteral:U,StringLiteral:z,CharacterLiteral:Z,Punctuator:K,Identifier:$e,ArraySubscript:pe,Constant:O,Type:D,ArrayType:j,DeclType:Y,GenericType:q,UserType:J,FunctionType:X,Declaration:ne,ImmutableDeclaration:ge,FunctionDeclaration:ve,ArrayDeclaration:me,StaticDeclaration:re,StaticValueList:ie,IndirectFunctionCall:at,FunctionCall:St,Loop:qe,MemoryAssignment:Tt,Assignment:ae,AssignmentExpression:Mr,Param:Fr,Typedef:$n,Struct:On,UnionType:Ln,ReturnStatement:Nn,Sequence:Pn,ObjectLiteral:In,Pair:Rn,TypeCast:Ur,Break:Bn,Comment:Mn,Sizeof:Fn,Spread:Un,Closure:Dr,Access:Hr,Noop:Dn,ClosureType:jr,Block:jn,ObjectField:kr,FunctionIndex:zr,FunctionIdentifier:Gr,FunctionPointer:Yr,FunctionArguments:qr,FunctionResult:Wr,FunctionLocals:Vr,NativeMethod:Jr,Unreachable:kn},s.tokens=a,Object.defineProperty(s,"__esModule",{value:!0})})}),y=ee(W),ye=W.tokens,Le=W.semantics,Qe=W.builtinTypes,_e=W.statements,Ne=W.i32,Ke=W.f32,Ue=W.i64,Sc=W.f64,Ms=te(function(o){(function(n,s){o.exports?o.exports=s():n.moo=s()})(he,function(){var n=Object.prototype.hasOwnProperty,s=typeof Object.assign=="function"?Object.assign:function(O,D){if(O==null)throw new TypeError("Target cannot be null or undefined");O=Object(O);for(var j=1;j<arguments.length;j++){var Y=arguments[j];if(Y!=null)for(var q in Y)n.call(Y,q)&&(O[q]=Y[q])}return O},a=typeof new RegExp().sticky=="boolean";function l(O){return O&&O.constructor===RegExp}function u(O){return O&&typeof O=="object"&&O.constructor!==RegExp&&!Array.isArray(O)}function h(O){return O.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function d(O){var D=new RegExp("|"+O);return D.exec("").length-1}function m(O){return"("+O+")"}function v(O){var D=O.map(function(j){return"(?:"+j+")"}).join("|");return"(?:"+D+")"}function b(O){if(typeof O=="string")return"(?:"+h(O)+")";if(l(O)){if(O.ignoreCase)throw new Error("RegExp /i flag not allowed");if(O.global)throw new Error("RegExp /g flag is implied");if(O.sticky)throw new Error("RegExp /y flag is implied");if(O.multiline)throw new Error("RegExp /m flag is implied");return O.source}else throw new Error("not a pattern: "+O)}function g(O){for(var D=Object.getOwnPropertyNames(O),j=[],Y=0;Y<D.length;Y++){var q=D[Y],J=O[q],X=Array.isArray(J)?J:[J],ne=[];X.forEach(function(re){u(re)?(ne.length&&j.push(N(q,ne)),j.push(N(q,re)),ne=[]):ne.push(re)}),ne.length&&j.push(N(q,ne))}return j}function w(O){for(var D=[],j=0;j<O.length;j++){var Y=O[j];if(!Y.name)throw new Error("Rule has no name: "+JSON.stringify(Y));D.push(N(Y.name,Y))}return D}function N(O,D){(typeof D!="object"||Array.isArray(D)||l(D))&&(D={match:D});var j=s({tokenType:O,lineBreaks:!!D.error,pop:!1,next:null,push:null,error:!1,value:null,getType:null},D),Y=j.match;return j.match=Array.isArray(Y)?Y:Y?[Y]:[],j.match.sort(function(q,J){return l(q)&&l(J)?0:l(J)?-1:l(q)?1:J.length-q.length}),j.keywords&&(j.getType=Z(j.keywords)),j}function B(O,D){O=Array.isArray(O)?w(O):g(O);for(var j=null,Y=[],q=[],J=0;J<O.length;J++){var X=O[J];if(X.error){if(j)throw new Error("Multiple error rules not allowed: (for token '"+X.tokenType+"')");j=X}if(X.match.length!==0){Y.push(X);var ne=v(X.match.map(b)),re=new RegExp(ne);if(re.test(""))throw new Error("RegExp matches empty string: "+re);var ie=d(ne);if(ie>0)throw new Error("RegExp has capture groups: "+re+`
Use (?: \u2026 ) instead`);if(!D&&(X.pop||X.push||X.next))throw new Error("State-switching options are not allowed in stateless lexers (for token '"+X.tokenType+"')");if(!X.lineBreaks&&re.test(`
`))throw new Error("Rule should declare lineBreaks: "+re);q.push(m(ne))}}var ge=a?"":"|(?:)",ve=a?"ym":"gm",me=new RegExp(v(q)+ge,ve);return{regexp:me,groups:Y,error:j}}function U(O){var D=B(O);return new K({start:D},"start")}function z(O,D){var j=Object.getOwnPropertyNames(O);D||(D=j[0]);for(var Y=Object.create(null),q=0;q<j.length;q++){var J=j[q];Y[J]=B(O[J],!0)}for(var q=0;q<j.length;q++)for(var X=Y[j[q]].groups,ne=0;ne<X.length;ne++){var re=X[ne],ie=re&&(re.push||re.next);if(ie&&!Y[ie])throw new Error("Missing state '"+ie+"' (in token '"+re.tokenType+"' of state '"+j[q]+"')");if(re&&re.pop&&+re.pop!=1)throw new Error("pop must be 1 (in token '"+re.tokenType+"' of state '"+j[q]+"')")}return new K(Y,D)}function Z(O){for(var D=Object.create(null),j=Object.create(null),Y=Object.getOwnPropertyNames(O),q=0;q<Y.length;q++){var J=Y[q],X=O[J],ne=Array.isArray(X)?X:[X];ne.forEach(function(me){if((j[me.length]=j[me.length]||[]).push(me),typeof me!="string")throw new Error("keyword must be string (in keyword '"+J+"')");D[me]=J})}function re(me){return JSON.stringify(me)}var ie="";ie+=`(function(value) {
`,ie+=`switch (value.length) {
`;for(var ge in j){var ve=j[ge];ie+="case "+ge+`:
`,ie+=`switch (value) {
`,ve.forEach(function(me){var at=D[me];ie+="case "+re(me)+": return "+re(at)+`
`}),ie+=`}
`}return ie+=`}
`,ie+="})",(0,eval)(ie)}var K=function(O,D){this.startState=D,this.states=O,this.buffer="",this.stack=[],this.reset()};K.prototype.reset=function(O,D){return this.buffer=O||"",this.index=0,this.line=D?D.line:1,this.col=D?D.col:1,this.setState(D?D.state:this.startState),this},K.prototype.save=function(){return{line:this.line,col:this.col,state:this.state}},K.prototype.setState=function(O){if(!(!O||this.state===O)){this.state=O;var D=this.states[O];this.groups=D.groups,this.error=D.error||{lineBreaks:!0,shouldThrow:!0},this.re=D.regexp}},K.prototype.popState=function(){this.setState(this.stack.pop())},K.prototype.pushState=function(O){this.stack.push(this.state),this.setState(O)},K.prototype._eat=a?function(O){return O.exec(this.buffer)}:function(O){var D=O.exec(this.buffer);return D[0].length===0?null:D},K.prototype._getGroup=function(O){if(O===null)return-1;for(var D=this.groups.length,j=0;j<D;j++)if(O[j+1]!==void 0)return j;throw new Error("oops")};function $e(){return this.value}if(K.prototype.next=function(){var O=this.re,D=this.buffer,j=O.lastIndex=this.index;if(j!==D.length){var Y=this._eat(O),q=this._getGroup(Y),J,X;q===-1?(J=this.error,X=D.slice(j)):(X=Y[0],J=this.groups[q]);var ne=0;if(J.lineBreaks){var re=/\n/g,ie=1;if(X===`
`)ne=1;else for(;re.exec(X);)ne++,ie=re.lastIndex}var ge={type:J.getType&&J.getType(X)||J.tokenType,value:J.value?J.value(X):X,text:X,toString:$e,offset:j,lineBreaks:ne,line:this.line,col:this.col},ve=X.length;if(this.index+=ve,this.line+=ne,ne!==0?this.col=ve-ie+1:this.col+=ve,J.shouldThrow)throw new Error(this.formatError(ge,"invalid syntax"));return J.pop?this.popState():J.push?this.pushState(J.push):J.next&&this.setState(J.next),ge}},typeof Symbol<"u"&&Symbol.iterator){var pe=function(O){this.lexer=O};pe.prototype.next=function(){var O=this.lexer.next();return{value:O,done:!O}},pe.prototype[Symbol.iterator]=function(){return this},K.prototype[Symbol.iterator]=function(){return new pe(this)}}return K.prototype.formatError=function(O,D){var j=O.value,Y=O.offset,q=O.lineBreaks?j.indexOf(`
`):j.length,J=Math.max(0,Y-O.col+1),X=this.buffer.substring(J,Y+q);return D+=" at line "+O.line+" col "+O.col+`:

`,D+="  "+X+`
`,D+="  "+Array(O.col).join(" ")+"^",D},K.prototype.clone=function(){return new K(this.states,this.state)},K.prototype.has=function(O){for(var D in this.states)for(var j=this.states[D].groups,Y=0;Y<j.length;Y++){var q=j[Y];if(q.tokenType===O||q.keywords&&n.call(q.keywords,O))return!0}return!1},{compile:U,states:z,error:Object.freeze({error:!0})}})}),ir=Array.prototype.slice,Fs=function(o){return ir.call(o)},Us=function(o){return ir.call(o,1)},ln=function(o,n,s){var a=s-n.length;switch(a){case 0:return function(){return we(o,Ae(n,arguments),s)};case 1:return function(l){return we(o,Ae(n,arguments),s)};case 2:return function(l,u){return we(o,Ae(n,arguments),s)};case 3:return function(l,u,h){return we(o,Ae(n,arguments),s)};case 4:return function(l,u,h,d){return we(o,Ae(n,arguments),s)};case 5:return function(l,u,h,d,m){return we(o,Ae(n,arguments),s)};case 6:return function(l,u,h,d,m,v){return we(o,Ae(n,arguments),s)};case 7:return function(l,u,h,d,m,v,b){return we(o,Ae(n,arguments),s)};case 8:return function(l,u,h,d,m,v,b,g){return we(o,Ae(n,arguments),s)};case 9:return function(l,u,h,d,m,v,b,g,w){return we(o,Ae(n,arguments),s)};case 10:return function(l,u,h,d,m,v,b,g,w,N){return we(o,Ae(n,arguments),s)};default:return Ds(o,n,a)}},Ae=function(o,n){return o.concat(Fs(n))},Ds=function(o,n,s){var a=js(s),l="false||function("+a+"){ return processInvocation(fn, concatArgs(args, arguments)); }";return(0,eval)(l)},js=function(o){for(var n=[],s=0;s<o;s+=1)n.push("a"+s.toString());return n.join(",")},ks=function(o,n){return o.length>n?o.slice(0,n):o},we=function(o,n,s){return n=ks(n,s),n.length===s?o.apply(null,n):ln(o,n,s)},De=function(o){return ln(o,[],o.length)};De.to=De(function(o,n){return ln(n,[],o)}),De.adaptTo=De(function(o,n){return De.to(o,function(s){var a=Us(arguments).concat(s);return n.apply(this,a)})}),De.adapt=function(o){return De.adaptTo(o.length,o)};var Lt=De;function M(o){return o[0]}function zs(){let o=this.lexer,n=this.Syntax,{extendNode:s,drop:a,nth:l,nuller:u,nonEmpty:h,add:d,flatten:m,compose:v}=this.helpers,{node:b,binary:g,constant:w,identifier:N,statement:B,unary:U,ternary:z,subscript:Z,access:K,fun:$e,declaration:pe,call:O,struct:D,result:j,string:Y,char:q,typedef:J,voidFun:X,type:ne,arrayType:re,assignment:ie,forLoop:ge,whileLoop:ve,typeGeneric:me,spread:at,builtinDecl:St,assignmentExpr:qe,addressOf:Tt}=this.nodes(o);return{Lexer:o,ParserRules:[{name:"_$ebnf$1",symbols:[]},{name:"_$ebnf$1",symbols:["_$ebnf$1","wschar"],postprocess:function(ae){return ae[0].concat([ae[1]])}},{name:"_",symbols:["_$ebnf$1"],postprocess:function(ae){return null}},{name:"__$ebnf$1",symbols:["wschar"]},{name:"__$ebnf$1",symbols:["__$ebnf$1","wschar"],postprocess:function(ae){return ae[0].concat([ae[1]])}},{name:"__",symbols:["__$ebnf$1"],postprocess:function(ae){return null}},{name:"wschar",symbols:[/[ \t\n\v\f]/],postprocess:M},{name:"Struct",symbols:["TYPE","__","Identifier","_","EQUALS","_","Union","SEPARATOR"],postprocess:D},{name:"Struct",symbols:["TYPE","__","Identifier","_","EQUALS","_","NativeType","SEPARATOR"],postprocess:D},{name:"Union",symbols:["StructDefinition"],postprocess:M},{name:"Union",symbols:["StructDefinition","_","OR","_","Union"],postprocess:b(n.UnionType)},{name:"StructDefinition",symbols:["ArrayType"],postprocess:M},{name:"StructDefinition",symbols:["Identifier"],postprocess:M},{name:"StructDefinition",symbols:["LCB","_","StructBody","_","RCB"],postprocess:v(b(n.ObjectLiteral),m)},{name:"StructBody",symbols:["StructNameAndType"],postprocess:M},{name:"StructBody",symbols:["StructNameAndType","_","COMMA","_","StructBody"],postprocess:m},{name:"StructNameAndType",symbols:["Identifier","_","COLON","_","Type"],postprocess:b(n.Pair)},{name:"StructNameAndType",symbols:["AddressOf","_","COLON","_","Type"],postprocess:b(n.Pair)},{name:"AddressOf",symbols:["AND","Identifier"],postprocess:Tt},{name:"TypeDef",symbols:["TYPE","__","Identifier","_","EQUALS","_","TypeDefinition","_","FATARROW","_","Type","_","SEPARATOR"],postprocess:v(J)},{name:"TypeDefinition",symbols:["LB","_","TypeList","_","RB"],postprocess:m},{name:"TypeDefinition",symbols:["LB","_","RB"],postprocess:m},{name:"TypeList",symbols:["Type"],postprocess:M},{name:"TypeList",symbols:["Type","_","COMMA","_","TypeList"],postprocess:m},{name:"_Type",symbols:["NativeType"],postprocess:M},{name:"_Type",symbols:["GenericType"],postprocess:M},{name:"_Type",symbols:["Identifier"],postprocess:M},{name:"ArrayType",symbols:["_Type","_","LSB","_","RSB"],postprocess:re},{name:"Type",symbols:["_Type"],postprocess:M},{name:"Type",symbols:["ArrayType"],postprocess:M},{name:"GenericType",symbols:["Identifier","LT","_","StaticObjectLiteral","_","GT"],postprocess:me},{name:"StaticObjectLiteral",symbols:["LCB","_","RCB"],postprocess:v(b(n.ObjectLiteral))},{name:"StaticObjectLiteral",symbols:["LCB","_","StaticPropertyList","_","RCB"],postprocess:v(b(n.ObjectLiteral),m)},{name:"StaticPropertyValue",symbols:["Number"],postprocess:M},{name:"StaticPropertyValue",symbols:["Boolean"],postprocess:M},{name:"StaticPropertyValue",symbols:["StringLiteral"],postprocess:M},{name:"StaticProperty",symbols:["Identifier","_","COLON","_","StaticPropertyValue"],postprocess:b(n.Pair)},{name:"StaticPropertyList",symbols:["StaticProperty"],postprocess:M},{name:"StaticPropertyList",symbols:["StaticProperty","_","COMMA","_","StaticPropertyList"],postprocess:m},{name:"ObjectLiteral",symbols:["LCB","_","RCB"],postprocess:b(n.ObjectLiteral)},{name:"ObjectLiteral",symbols:["LCB","_","PropertyList","_","RCB"],postprocess:v(b(n.ObjectLiteral),m)},{name:"PropertyList",symbols:["Property"],postprocess:M},{name:"PropertyList",symbols:["Property","_","COMMA","_","PropertyList"],postprocess:m},{name:"Property",symbols:["Identifier","_","COLON","_","Ternary"],postprocess:b(n.Pair)},{name:"Property",symbols:["SPREAD","Identifier"],postprocess:at},{name:"Property",symbols:["Identifier"],postprocess:M},{name:"Import",symbols:["IMPORT","_","ImportDefinition","__","FROM","__","StringLiteral","_","SEPARATOR"],postprocess:b(n.Import)},{name:"ImportDefinition",symbols:["LCB","_","ImportAndTypeList","_","RCB"],postprocess:v(b(n.ObjectLiteral),m)},{name:"ImportAndTypeList",symbols:["ImportName"],postprocess:M},{name:"ImportAndTypeList",symbols:["ImportAndType"],postprocess:M},{name:"ImportAndTypeList",symbols:["ImportName","_","COMMA","_","ImportAndTypeList"],postprocess:m},{name:"ImportAndTypeList",symbols:["ImportAndType","_","COMMA","_","ImportAndTypeList"],postprocess:m},{name:"ImportAndType",symbols:["ImportName","_","COLON","_","Type"],postprocess:b(n.Pair)},{name:"ImportAndType",symbols:["ImportName","_","AS","_","Identifier"],postprocess:b(n.BinaryExpression,{value:"as"})},{name:"ImportAndType",symbols:["ImportAndType","_","AS","_","Identifier"],postprocess:b(n.BinaryExpression,{value:"as"})},{name:"ImportName",symbols:["Identifier"],postprocess:M},{name:"If",symbols:["IF","_","LB","_","Expression","_","RB","_","BranchBody"],postprocess:b(n.IfThenElse)},{name:"If",symbols:["IF","_","LB","_","Expression","_","RB","_","BranchBody","_","Else"],postprocess:b(n.IfThenElse)},{name:"Else",symbols:["ELSE","_","BranchBody"],postprocess:b(n.Else)},{name:"BranchBody",symbols:["Statement"],postprocess:M},{name:"BranchBody",symbols:["Block"],postprocess:M},{name:"For",symbols:["FOR","_","LB","_","ForArg","_","SEPARATOR","_","Expression","_","SEPARATOR","_","ForArg","_","RB","_","BranchBody"],postprocess:ge},{name:"ForArg",symbols:["_Assignment"],postprocess:M},{name:"ForArg",symbols:["Ternary"],postprocess:M},{name:"While",symbols:["WHILE","_","LB","_","Expression","_","RB","_","BranchBody"],postprocess:ve},{name:"Break",symbols:["BREAK","_","SEPARATOR"],postprocess:b(n.Break)},{name:"Program",symbols:["_"],postprocess:v(b("Program",{value:"ROOT_NODE"}),m)},{name:"Program",symbols:["_","SourceElementList","_"],postprocess:v(b("Program",{value:"ROOT_NODE"}),m)},{name:"SourceElementList",symbols:["SourceElement"],postprocess:m},{name:"SourceElementList",symbols:["SourceElement","_","SourceElementList"],postprocess:v(a,m,m)},{name:"SourceElement",symbols:["Function"],postprocess:M},{name:"SourceElement",symbols:["GlobalDeclaration"],postprocess:M},{name:"SourceElement",symbols:["GlobalImmutableDeclaration"],postprocess:M},{name:"SourceElement",symbols:["StaticDeclaration"],postprocess:M},{name:"SourceElement",symbols:["Struct"],postprocess:M},{name:"SourceElement",symbols:["TypeDef"],postprocess:M},{name:"SourceElement",symbols:["Export"],postprocess:M},{name:"SourceElement",symbols:["Import"],postprocess:M},{name:"Statement",symbols:["ExpressionStatement"],postprocess:M},{name:"Statement",symbols:["Declaration"],postprocess:M},{name:"Statement",symbols:["ImmutableDeclaration"],postprocess:M},{name:"Statement",symbols:["Assignment"],postprocess:M},{name:"Statement",symbols:["If"],postprocess:M},{name:"Statement",symbols:["For"],postprocess:M},{name:"Statement",symbols:["While"],postprocess:M},{name:"Statement",symbols:["Break"],postprocess:M},{name:"Statement",symbols:["Unreachable"],postprocess:M},{name:"Statement",symbols:["ReturnStatement"],postprocess:M},{name:"Block",symbols:["LCB","_","RCB"],postprocess:b(n.Block)},{name:"Block",symbols:["LCB","_","StatementList","_","RCB"],postprocess:v(b(n.Block),m)},{name:"StatementList",symbols:["Statement"],postprocess:a},{name:"StatementList",symbols:["Statement","_","StatementList"],postprocess:m},{name:"Function",symbols:["FUNCTION","__","Identifier","_","FunctionParameters","_","Block"],postprocess:X},{name:"Function",symbols:["FUNCTION","__","Identifier","_","FunctionParameters","_","FunctionResult","_","Block"],postprocess:$e},{name:"FunctionParameters",symbols:["LB","_","RB"],postprocess:b(n.FunctionArguments)},{name:"FunctionParameters",symbols:["LB","_","ParameterList","_","RB"],postprocess:v(b(n.FunctionArguments),m,m)},{name:"ParameterList",symbols:["NameAndType"],postprocess:M},{name:"ParameterList",symbols:["NameAndType","_","COMMA","_","ParameterList"],postprocess:m},{name:"NameAndType",symbols:["Identifier","_","COLON","_","DeclType"],postprocess:b(n.Pair)},{name:"DeclType",symbols:["Type"],postprocess:v(s({Type:n.DeclType}),l(0))},{name:"FunctionResult",symbols:["COLON","_","Type"],postprocess:v(j,a)},{name:"GlobalDeclaration",symbols:["LET","_","NameAndType","_","SEPARATOR"],postprocess:pe(n.Declaration)},{name:"GlobalDeclaration",symbols:["LET","_","NameAndType","_","EQUALS","_","Atom","_","SEPARATOR"],postprocess:pe(n.Declaration)},{name:"GlobalImmutableDeclaration",symbols:["CONST","_","Identifier","_","COLON","_","GenericType","_","SEPARATOR"],postprocess:St},{name:"GlobalImmutableDeclaration",symbols:["CONST","_","NameAndType","_","EQUALS","_","ObjectLiteral","_","SEPARATOR"],postprocess:pe(n.ImmutableDeclaration)},{name:"GlobalImmutableDeclaration",symbols:["CONST","_","NameAndType","_","EQUALS","_","Atom","_","SEPARATOR"],postprocess:pe(n.ImmutableDeclaration)},{name:"Declaration",symbols:["LET","_","NameAndType","_","EQUALS","_","Expression","_","SEPARATOR"],postprocess:pe(n.Declaration)},{name:"Declaration",symbols:["LET","_","NameAndType","_","SEPARATOR"],postprocess:pe(n.Declaration)},{name:"ImmutableDeclaration",symbols:["CONST","_","NameAndType","_","EQUALS","_","Expression","_","SEPARATOR"],postprocess:pe(n.ImmutableDeclaration)},{name:"ImmutableDeclaration",symbols:["CONST","_","NameAndType","_","EQUALS","_","ObjectLiteral","_","SEPARATOR"],postprocess:pe(n.ImmutableDeclaration)},{name:"ImmutableDeclaration",symbols:["CONST","_","Identifier","_","COLON","_","GenericType","_","SEPARATOR"],postprocess:St},{name:"StaticNameAndType",symbols:["Identifier","_","COLON","_","ArrayType"],postprocess:b(n.Pair)},{name:"StaticDeclaration",symbols:["CONST","_","StaticNameAndType","_","EQUALS","_","LSB","_","RSB","_","SEPARATOR"],postprocess:pe(n.StaticDeclaration)},{name:"StaticDeclaration",symbols:["CONST","_","StaticNameAndType","_","EQUALS","_","LSB","_","StaticValueList","_","RSB","_","SEPARATOR"],postprocess:v(pe(n.StaticDeclaration),m)},{name:"StaticValueList",symbols:["Atom"],postprocess:M},{name:"StaticValueList",symbols:["Atom","_","COMMA","_","StaticValueList"],postprocess:m},{name:"Unreachable",symbols:["THROW","_","SEPARATOR"],postprocess:b(n.Unreachable)},{name:"Unreachable",symbols:["THROW","_","Expression","_","SEPARATOR"],postprocess:b(n.Unreachable)},{name:"Pair",symbols:["Identifier","_","COLON","_","Identifier"],postprocess:b(n.Pair)},{name:"Export",symbols:["EXPORT","__","ImmutableDeclaration"],postprocess:b(n.Export,{value:"export"})},{name:"Export",symbols:["EXPORT","__","Function"],postprocess:b(n.Export,{value:"export"})},{name:"Export",symbols:["EXPORT","__","TypeDef"],postprocess:b(n.Export,{value:"export"})},{name:"Export",symbols:["EXPORT","__","Struct"],postprocess:b(n.Export,{value:"export"})},{name:"ReturnStatement",symbols:["RETURN","__","Expression","_","SEPARATOR"],postprocess:b(n.ReturnStatement)},{name:"ReturnStatement$subexpression$1",symbols:[{literal:";"}],postprocess:u},{name:"ReturnStatement",symbols:["RETURN","ReturnStatement$subexpression$1"],postprocess:b(n.ReturnStatement)},{name:"Assignment",symbols:["_Assignment","_","SEPARATOR"],postprocess:M},{name:"_Assignment",symbols:["Subscript","_","EQUALS","_","Expression"],postprocess:ae=>ie(ae,"=")},{name:"_Assignment",symbols:["Subscript","_","PLSEQUALS","_","Expression"],postprocess:ae=>ie(ae,"+=")},{name:"_Assignment",symbols:["Subscript","_","MINEQUALS","_","Expression"],postprocess:ae=>ie(ae,"-=")},{name:"_Assignment",symbols:["Subscript","_","EQUALS","_","ObjectLiteral"],postprocess:ae=>ie(ae,"=")},{name:"ExpressionStatement",symbols:["Call","_","SEPARATOR"],postprocess:M},{name:"Expression",symbols:["AssignmentExpression"],postprocess:M},{name:"AssignmentExpression",symbols:["Identifier","_","EQUALS","_","Ternary"],postprocess:ae=>qe(ae,"=")},{name:"AssignmentExpression",symbols:["Identifier","_","PLSEQUALS","_","Ternary"],postprocess:ae=>qe(ae,"+=")},{name:"AssignmentExpression",symbols:["Identifier","_","MINEQUALS","_","Ternary"],postprocess:ae=>qe(ae,"-=")},{name:"AssignmentExpression",symbols:["Ternary"],postprocess:M},{name:"Ternary",symbols:["Ternary","_","QUESTION","_","TernaryPair"],postprocess:z},{name:"Ternary",symbols:["Binary"],postprocess:M},{name:"TernaryPair",symbols:["Expression","_","COLON","_","Expression"],postprocess:b(n.Pair)},{name:"Binary",symbols:["Logical"],postprocess:M},{name:"Logical",symbols:["Logical","_",{literal:"||"},"_","Bitwise"],postprocess:g},{name:"Logical",symbols:["Logical","_",{literal:"&&"},"_","Bitwise"],postprocess:g},{name:"Logical",symbols:["Bitwise"],postprocess:M},{name:"Bitwise",symbols:["Bitwise","_",{literal:"|"},"_","Sum"],postprocess:g},{name:"Bitwise",symbols:["Bitwise","_",{literal:"^"},"_","Sum"],postprocess:g},{name:"Bitwise",symbols:["Bitwise","_",{literal:"&"},"_","Sum"],postprocess:g},{name:"Bitwise",symbols:["Equality"],postprocess:M},{name:"Equality",symbols:["Equality","_",{literal:"=="},"_","Comparison"],postprocess:g},{name:"Equality",symbols:["Equality","_",{literal:"!="},"_","Comparison"],postprocess:g},{name:"Equality",symbols:["Comparison"],postprocess:M},{name:"Comparison",symbols:["Comparison","_",{literal:"<"},"_","Shift"],postprocess:g},{name:"Comparison",symbols:["Comparison","_",{literal:">"},"_","Shift"],postprocess:g},{name:"Comparison",symbols:["Comparison","_",{literal:"<="},"_","Shift"],postprocess:g},{name:"Comparison",symbols:["Comparison","_",{literal:">="},"_","Shift"],postprocess:g},{name:"Comparison",symbols:["Shift"],postprocess:M},{name:"Shift",symbols:["Shift","_",{literal:">>"},"_","Sum"],postprocess:g},{name:"Shift",symbols:["Shift","_",{literal:"<<"},"_","Sum"],postprocess:g},{name:"Shift",symbols:["Shift","_",{literal:">>>"},"_","Sum"],postprocess:g},{name:"Shift",symbols:["Sum"],postprocess:M},{name:"Sum",symbols:["Sum","_",{literal:"+"},"_","Product"],postprocess:g},{name:"Sum",symbols:["Sum","_",{literal:"-"},"_","Product"],postprocess:g},{name:"Sum",symbols:["Product"],postprocess:M},{name:"Product",symbols:["Product","_",{literal:"*"},"_","Typecast"],postprocess:g},{name:"Product",symbols:["Product","_",{literal:"/"},"_","Typecast"],postprocess:g},{name:"Product",symbols:["Product","_",{literal:"%"},"_","Typecast"],postprocess:g},{name:"Product",symbols:["Typecast"],postprocess:M},{name:"Typecast",symbols:["Expression","_","COLON","_","DeclType"],postprocess:b(n.Pair)},{name:"Typecast",symbols:["Expression","_","AS","_","DeclType"],postprocess:b(n.Pair)},{name:"Typecast",symbols:["Unary"],postprocess:M},{name:"Unary",symbols:[{literal:"!"},"Call"],postprocess:U},{name:"Unary",symbols:[{literal:"~"},"Call"],postprocess:U},{name:"Unary",symbols:[{literal:"-"},"Call"],postprocess:U},{name:"Unary",symbols:[{literal:"+"},"Call"],postprocess:U},{name:"Unary",symbols:[{literal:"++"},"Call"],postprocess:U},{name:"Unary",symbols:[{literal:"--"},"Call"],postprocess:U},{name:"Unary",symbols:["Call"],postprocess:M},{name:"Call",symbols:["Subscript","_","LB","_","ArgumentList","_","RB"],postprocess:v(O,m)},{name:"Call",symbols:["Subscript","_","LB","_","RB"],postprocess:O},{name:"Call",symbols:["Subscript"],postprocess:M},{name:"ArgumentList",symbols:["Expression"],postprocess:M},{name:"ArgumentList",symbols:["NativeType"],postprocess:M},{name:"ArgumentList",symbols:["Expression","_","COMMA","_","ArgumentList"],postprocess:m},{name:"Subscript",symbols:["Access","LSB","_","Expression","_","RSB","Subscript"],postprocess:Z},{name:"Subscript",symbols:["Access","LSB","_","Expression","_","RSB"],postprocess:Z},{name:"Subscript",symbols:["Access"],postprocess:M},{name:"Access",symbols:["Access","DOT","Identifier"],postprocess:v(K,a)},{name:"Access",symbols:["NativeType","DOT","Access"],postprocess:v(K,a)},{name:"Access",symbols:["Grouping"],postprocess:M},{name:"Grouping",symbols:["LB","_","Expression","_","RB"],postprocess:l(2)},{name:"Grouping",symbols:["Atom"],postprocess:M},{name:"Atom",symbols:["Identifier"],postprocess:M},{name:"Atom",symbols:["StringLiteral"],postprocess:M},{name:"Atom",symbols:["CharacterLiteral"],postprocess:M},{name:"Atom",symbols:["Number"],postprocess:M},{name:"NativeType",symbols:[o.has("type")?{type:"type"}:ne],postprocess:ne},{name:"Identifier",symbols:[o.has("identifier")?{type:"identifier"}:N],postprocess:N},{name:"Number",symbols:[o.has("number")?{type:"number"}:number],postprocess:w},{name:"StringLiteral",symbols:[o.has("string")?{type:"string"}:Y],postprocess:Y},{name:"CharacterLiteral",symbols:[o.has("char")?{type:"char"}:q],postprocess:q},{name:"word",symbols:[/[a-zA-Z_]/],postprocess:M},{name:"word",symbols:["word",/[a-zA-Z0-9_]/],postprocess:d},{name:"digit",symbols:[/[0-9]/],postprocess:M},{name:"digit",symbols:["digit",/[0-9]/],postprocess:d},{name:"SEPARATOR",symbols:["_",{literal:";"}],postprocess:u},{name:"QUESTION",symbols:[{literal:"?"}],postprocess:u},{name:"COMMA",symbols:[{literal:","}],postprocess:u},{name:"AND",symbols:[{literal:"&"}],postprocess:u},{name:"DOT",symbols:[{literal:"."}],postprocess:u},{name:"LB",symbols:[{literal:"("}],postprocess:u},{name:"RB",symbols:[{literal:")"}],postprocess:u},{name:"LSB",symbols:[{literal:"["}],postprocess:u},{name:"RSB",symbols:[{literal:"]"}],postprocess:u},{name:"LCB",symbols:[{literal:"{"}],postprocess:u},{name:"RCB",symbols:[{literal:"}"}],postprocess:u},{name:"OR",symbols:[{literal:"|"}],postprocess:u},{name:"COLON",symbols:[{literal:":"}],postprocess:u},{name:"EQUALS",symbols:[{literal:"="}],postprocess:u},{name:"PLSEQUALS",symbols:[{literal:"+="}],postprocess:u},{name:"MINEQUALS",symbols:[{literal:"-="}],postprocess:u},{name:"GT",symbols:[{literal:">"}],postprocess:u},{name:"LT",symbols:[{literal:"<"}],postprocess:u},{name:"FATARROW",symbols:[{literal:"=>"}],postprocess:u},{name:"SPREAD",symbols:[{literal:"..."}],postprocess:u},{name:"FUNCTION",symbols:[{literal:"function"}],postprocess:u},{name:"LET",symbols:[{literal:"let"}],postprocess:u},{name:"CONST",symbols:[{literal:"const"}],postprocess:u},{name:"EXPORT",symbols:[{literal:"export"}],postprocess:u},{name:"IMPORT",symbols:[{literal:"import"}],postprocess:u},{name:"AS",symbols:[{literal:"as"}],postprocess:u},{name:"FROM",symbols:[{literal:"from"}],postprocess:u},{name:"RETURN",symbols:[{literal:"return"}],postprocess:u},{name:"TYPE",symbols:[{literal:"type"}],postprocess:u},{name:"IF",symbols:[{literal:"if"}],postprocess:u},{name:"ELSE",symbols:[{literal:"else"}],postprocess:u},{name:"FOR",symbols:[{literal:"for"}],postprocess:u},{name:"WHILE",symbols:[{literal:"while"}],postprocess:u},{name:"SWITCH",symbols:[{literal:"switch"}],postprocess:u},{name:"DO",symbols:[{literal:"do"}],postprocess:u},{name:"THROW",symbols:[{literal:"throw"}],postprocess:u},{name:"BREAK",symbols:[{literal:"break"}],postprocess:u}],ParserStart:"Program"}}function ar(o){return o[0]}function cr(){let o=this.Syntax,{flatten:n}=this.helpers,{node:s}=this.nodes(this.lexer);return{Lexer:void 0,ParserRules:[{name:"TypeList",symbols:["DefaultArgument"],postprocess:ar},{name:"TypeList",symbols:["DefaultArgument","_","COMMA","_","TypeList"],postprocess:n},{name:"DefaultArgument",symbols:["Type","_","EQUALS","_","Atom"],postprocess:s(o.Assignment)},{name:"ParameterList",symbols:["DefaultFunctionArgument"],postprocess:ar},{name:"ParameterList",symbols:["DefaultFunctionArgument","_","COMMA","_","ParameterList"],postprocess:n},{name:"DefaultFunctionArgument",symbols:["NameAndType","_","EQUALS","_","Atom"],postprocess:s(o.Assignment)}],ParserStart:"TypeList"}}var lr=te(function(o){(function(n,s){o.exports?o.exports=s():n.nearley=s()})(he,function(){function n(d,m,v){return this.id=++n.highestId,this.name=d,this.symbols=m,this.postprocess=v,this}n.highestId=0,n.prototype.toString=function(d){function m(b){return b.literal?JSON.stringify(b.literal):b.type?"%"+b.type:b.toString()}var v=typeof d>"u"?this.symbols.map(m).join(" "):this.symbols.slice(0,d).map(m).join(" ")+" \u25CF "+this.symbols.slice(d).map(m).join(" ");return this.name+" \u2192 "+v};function s(d,m,v,b){this.rule=d,this.dot=m,this.reference=v,this.data=[],this.wantedBy=b,this.isComplete=this.dot===d.symbols.length}s.prototype.toString=function(){return"{"+this.rule.toString(this.dot)+"}, from: "+(this.reference||0)},s.prototype.nextState=function(d){var m=new s(this.rule,this.dot+1,this.reference,this.wantedBy);return m.left=this,m.right=d,m.isComplete&&(m.data=m.build()),m},s.prototype.build=function(){var d=[],m=this;do d.push(m.right.data),m=m.left;while(m.left);return d.reverse(),d},s.prototype.finish=function(){this.rule.postprocess&&(this.data=this.rule.postprocess(this.data,this.reference,h.fail))};function a(d,m){this.grammar=d,this.index=m,this.states=[],this.wants={},this.scannable=[],this.completed={}}a.prototype.process=function(d){for(var m=this.states,v=this.wants,b=this.completed,g=0;g<m.length;g++){var w=m[g];if(w.isComplete){if(w.finish(),w.data!==h.fail){for(var N=w.wantedBy,B=N.length;B--;){var U=N[B];this.complete(U,w)}if(w.reference===this.index){var z=w.rule.name;(this.completed[z]=this.completed[z]||[]).push(w)}}}else{var z=w.rule.symbols[w.dot];if(typeof z!="string"){this.scannable.push(w);continue}if(v[z]){if(v[z].push(w),b.hasOwnProperty(z))for(var Z=b[z],B=0;B<Z.length;B++){var K=Z[B];this.complete(w,K)}}else v[z]=[w],this.predict(z)}}},a.prototype.predict=function(d){for(var m=this.grammar.byName[d]||[],v=0;v<m.length;v++){var b=m[v],g=this.wants[d],w=new s(b,0,this.index,g);this.states.push(w)}},a.prototype.complete=function(d,m){var v=d.nextState(m);this.states.push(v)};function l(d,m){this.rules=d,this.start=m||this.rules[0].name;var v=this.byName={};this.rules.forEach(function(b){v.hasOwnProperty(b.name)||(v[b.name]=[]),v[b.name].push(b)})}l.fromCompiled=function(b,m){var v=b.Lexer;b.ParserStart&&(m=b.ParserStart,b=b.ParserRules);var b=b.map(function(w){return new n(w.name,w.symbols,w.postprocess)}),g=new l(b,m);return g.lexer=v,g};function u(){this.reset("")}u.prototype.reset=function(d,m){this.buffer=d,this.index=0,this.line=m?m.line:1,this.lastLineBreak=m?-m.col:0},u.prototype.next=function(){if(this.index<this.buffer.length){var d=this.buffer[this.index++];return d===`
`&&(this.line+=1,this.lastLineBreak=this.index),{value:d}}},u.prototype.save=function(){return{line:this.line,col:this.index-this.lastLineBreak}},u.prototype.formatError=function(d,m){var v=this.buffer;if(typeof v=="string"){var b=v.indexOf(`
`,this.index);b===-1&&(b=v.length);var g=v.substring(this.lastLineBreak,b),w=this.index-this.lastLineBreak;return m+=" at line "+this.line+" col "+w+`:

`,m+="  "+g+`
`,m+="  "+Array(w).join(" ")+"^",m}else return m+" at index "+(this.index-1)};function h(d,m,v){if(d instanceof l)var b=d,v=m;else var b=l.fromCompiled(d,m);this.grammar=b,this.options={keepHistory:!1,lexer:b.lexer||new u};for(var g in v||{})this.options[g]=v[g];this.lexer=this.options.lexer,this.lexerState=void 0;var w=new a(b,0);this.table=[w],w.wants[b.start]=[],w.predict(b.start),w.process(),this.current=0}return h.fail={},h.prototype.feed=function(d){var m=this.lexer;m.reset(d,this.lexerState);for(var v;v=m.next();){var b=this.table[this.current];this.options.keepHistory||delete this.table[this.current-1];var g=this.current+1,w=new a(this.grammar,g);this.table.push(w);for(var N=v.text!==void 0?v.text:v.value,B=m.constructor===u?v.value:v,U=b.scannable,z=U.length;z--;){var Z=U[z],K=Z.rule.symbols[Z.dot];if(K.test?K.test(B):K.type?K.type===v.type:K.literal===N){var $e=Z.nextState({data:B,token:v,isToken:!0,reference:g-1});w.states.push($e)}}if(w.process(),w.states.length===0){var pe=this.lexer.formatError(v,"invalid syntax")+`
`;pe+="Unexpected "+(v.type?v.type+" token: ":""),pe+=JSON.stringify(v.value!==void 0?v.value:v)+`
`;var O=new Error(pe);throw O.offset=this.current,O.token=v,O}this.options.keepHistory&&(b.lexerState=m.save()),this.current++}return b&&(this.lexerState=m.save()),this.results=this.finish(),this},h.prototype.save=function(){var d=this.table[this.current];return d.lexerState=this.lexerState,d},h.prototype.restore=function(d){var m=d.index;this.current=m,this.table[m]=d,this.table.splice(m+1),this.lexerState=d.lexerState,this.results=this.finish()},h.prototype.rewind=function(d){if(!this.options.keepHistory)throw new Error("set option `keepHistory` to enable rewinding");this.restore(this.table[d])},h.prototype.finish=function(){var d=[],m=this.grammar.start,v=this.table[this.table.length-1];return v.states.forEach(function(b){b.rule.name===m&&b.dot===b.rule.symbols.length&&b.reference===0&&b.data!==h.fail&&d.push(b)}),d.map(function(b){return b.data})},{Parser:h,Grammar:l,Rule:n}})}),Gs=lr.Parser,Ys=lr.Grammar,qs=(...o)=>o.reduce((n,s)=>(...a)=>n(s(...a))),I=Object.assign||function(o){for(var n=1;n<arguments.length;n++){var s=arguments[n];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(o[a]=s[a])}return o},Ws=function(o,n){var s={};for(var a in o)n.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(o,a)&&(s[a]=o[a]);return s};let Q=Lt((o,n)=>{let{meta:s}=o,a=Ws(o,["meta"]);return I({},n,{meta:I({},n.meta,s)},a)}),Vs=o=>n=>n[o],Js=()=>null,Xe=o=>Array.isArray(o)?!!o.length:o!=null,Hs=o=>`${o[0]}${o[1]}`,Qs=o=>o.reduce((n,s)=>(Array.isArray(s),n.concat(s)),[]),be=o=>o.filter(Xe);var Ks={nth:Vs,nuller:Js,nonEmpty:Xe,add:Hs,flatten:Qs,compose:qs,drop:be,extendNode:Q};let Xs=o=>{let{col:n,line:s}=o;return o.lines.length?{col:n,line:s,sourceLine:o.lines[o.line-1]}:{col:n,line:s,sourceLine:""}};function Zs(o){let n=(l,u={})=>h=>{let d=h.filter(Xe),{value:m="",meta:v={}}=u,b=Xs(o),g=d[d.length-1]&&d[d.length-1].range?d[d.length-1].range[1]:I({},b,{col:b.col+m.length});return{value:m,type:null,Type:l,toString(){},meta:v,range:[b,g],params:d}},s=l=>{let[u,h,d]=l.filter(Xe),m=y.BinaryExpression;return(h.value==="||"||h.value==="&&")&&(m=y.Select),n(m,{value:h.value})([u,d])},a=l=>{let[u]=be(l);return Q({type:u!=null&&u.value!=="void"?u.value:null},n(y.FunctionResult)(l))};return{node:n,binary:s,constant:l=>{let u=l[0].value;return Q({value:`${u}`,type:u.toString().indexOf(".")!==-1?"f32":"i32"},n(y.Constant)([]))},identifier:l=>n("Identifier",{value:l.join("")})([]),unary:([l,u])=>{let h=[u];return l.value==="-"&&(h=[I({},u,{value:"0",Type:y.Constant,params:[],meta:{}}),u]),Q({value:l.value,params:h},n(y.UnaryExpression)([l,u]))},ternary:l=>Q({value:"?"},n(y.TernaryExpression)(l)),subscript:l=>{let[u,h]=l.filter(Xe);return Q({value:u.value,params:[u,h]},n(y.ArraySubscript)([u,h]))},access(l){return Q({value:l[0].value+"."+l[1].value},n(y.Access)(l))},fun:l=>{let[u,h,d,m]=l.filter(Xe);return I({},u,{Type:y.FunctionDeclaration,meta:[],params:[h,d,m]})},declaration:l=>u=>{let[h,...d]=be(u),[m,v]=h.params;return Q({value:m.value,type:v.value},n(l)(d))},call:l=>{let[u,...h]=be(l);return Q({value:u.value},n(y.FunctionCall)([u,...h]))},struct:l=>{let[u,...h]=be(l);return Q({value:u.value},n(y.Struct)(h))},result:a,string:l=>Q({value:l[0].value,type:"i32"},n(y.StringLiteral)([])),char(l){return Q({value:l[0].value,type:"i32"},n(y.CharacterLiteral)([]))},type(l){return Q({value:l[0].value,type:l[0].value,params:[]},n(y.Type)(l))},arrayType(l){let h=be(l)[0];return Q({value:h.value+"[]",type:h.type+"[]",params:[]},n(y.ArrayType)(l))},typeGeneric(l){let[u,h]=be(l);return Q({value:u.value,type:u.value,params:[h]},n(y.Type)(l))},typedef:l=>{let[u,h,d]=be(l);return Q({value:u.value,params:[n(y.FunctionArguments)(h),Q({type:d.value},n(y.FunctionResult)([d]))],type:d.type},n(y.Typedef)([u,h,a]))},voidFun:l=>{let u=be(l),[h,d,m]=u,v=Q({type:null},n(y.FunctionResult)([]));return Q({value:h.value,params:[d,v,m]},n(y.FunctionDeclaration)(u))},assignment(l,u){if(["-=","+="].includes(u)){let h=u[0],[d,m]=be(l),v=s([d,{value:h},m]);return n(y.Assignment,{value:"="})([d,v])}return n(y.Assignment,{value:u})(l)},assignmentExpr(l,u){if(["-=","+="].includes(u)){let h=u[0],[d,m]=be(l),v=s([d,{value:h},m]);return n(y.AssignmentExpression,{value:"="})([d,v])}return n(y.AssignmentExpression,{value:u})(l)},forLoop(l){let[u,h,d,...m]=be(l);return n(y.Loop)([u,h,...m,d])},whileLoop(l){let u=n(y.Noop)([]);return n(y.Loop)([u,...l])},spread(l){return n(y.Spread)(l)},builtinDecl(l){let[u,h]=be(l);return Q({value:u.value,type:h.value,params:[h]},n(y.ImmutableDeclaration)(l))},addressOf(l){let[u]=be(l);return Q({value:u.value,params:[]},n("AddressOf")(l))}}}function eo(){let o=Ms.compile(ye);return{current:null,lines:[],get line(){return o.line},get col(){return o.col},save(){return o.save()},reset(n,s){return this.lines=n.split(`
`),o.reset(n,s)},next(){let n=o.next();for(;n&&n.type==="comment";)n=o.next();return this.current=n,this.current},formatError(n){return o.formatError(n)},has(n){return o.has(n)}}}var un=Lt(function(o,n){let s=[zs,cr,...o],a={lexer:eo(),nodes:Zs,helpers:Ks,Syntax:y},l=s.slice(1).reduce((h,d)=>{let m=d.call(a);return I({},h,{ParserRules:h.ParserRules.concat(m.ParserRules)})},s[0].call(a)),u=new Gs(Ys.fromCompiled(l));return u.feed(n),$(u.results.length===1,`PANIC - Ambiguous Syntax! Number of productions (${u.results.length})`),u.results[0]});let to=o=>{let n,s=o.reduce((a,l)=>l(u=>a(u,n)),([a])=>a);return(a,l)=>(n=l,s(a,n))},no=o=>{let n=[],s=o.reduce((a,l)=>(Object.entries(l).forEach(([u,h])=>{if(u==="*"){n.push(h);return}a[u]==null&&(a[u]=[...n]),a[u].push(h)}),a),{});return Object.entries(s).reduce((a,[l,u])=>(a[l]=to(u),a),{})},ur=Symbol("scope namespace"),pr=Symbol("signature");function ro(o,n){return[...o,{[ur]:n,[pr]:{result:null,arguments:null}}]}function so(o){return o.slice(0,-1)}function fr(o){return o[o.length-1]}function oo(o,n,s){let a=fr(o);return a&&(a[n]=s),a}function io(o,n){let a=o.length-1;for(a;a>=0;a--){let l=o[a][n];if(l)return l}return null}function ao(o,n){let s=Object.keys(o).indexOf(n);return s>-1?s:Object.keys(o).length}var co={enter:ro,exit:so,add:oo,find:io,current:fr,index:ao,namespace:ur,signature:pr};let{enter:lo,exit:uo,add:po,find:fo,current:mo,namespace:ho,signature:yo,index:_o}=co;var je={enter:lo,exit:uo,add:po,find:fo,current:mo,namespace:ho,index:_o,signature:yo},mr=je.enter,bo=je.exit,Ge=je.current,Ze=je.find,go=je.add,hr=je.index,dr=je.namespace,et=je.signature;let Pe="function/index",Nt="LOCAL_INDEX",Ie="global/index",Pt="type/const",_t="TYPE_INDEX",vo="OBJECT_SIZE",pn="type/cast",fn="AST_METADATA",mn="FUNCTION_METADATA",ke=o=>{switch(o){case"i32":case"bool":return 0;case"i64":return 1;case"f32":return 2;case"f64":return 3;default:return-1}},hn=o=>{let n=o.params.reduce((a,{type:l})=>ke(a)<ke(l)?l:a,o.type),s=o.params.map(a=>a.type!=null&&ke(a.type)!==ke(n)?a.Type===y.Constant?Q({type:n},a):Q({type:n,value:a.value,Type:y.TypeCast,meta:{[pn]:{to:n,from:a.type}},params:[a]},a):a);return I({},o,{params:s,type:n})};function So(){return{semantics(){let o=n=>([s,a])=>{let l=Ge(a.scopes),u=hr(l,s.value);return l[s.value]=Q({params:s.params.map(Q({type:s.type})),meta:I({},s.meta,{[l[dr]]:u,[Pt]:s.Type===y.ImmutableDeclaration}),Type:y.Declaration},s),n([l[s.value],a])};return{[y.Export]:n=>([s,a])=>{let l=n([s,a]),[u]=l.params;return a.exports[u.value]=u,l},[y.Declaration]:o,[y.ImmutableDeclaration]:o,[y.Select]:n=>([s,a],l)=>hn(I({},s,{params:s.params.map(u=>l([u,a]))})),[y.BinaryExpression]:n=>([s,a],l)=>hn(I({},s,{params:s.params.map(u=>l([u,a]))})),[y.Pair]:n=>(s,a)=>{let[l,u]=s,h=l.params.map(g=>a([g,u])),[d,m]=h,{type:v}=d,{value:b}=m;return I({},l,{type:b,value:d.value,Type:y.TypeCast,meta:I({},l.meta,{[pn]:{to:b,from:v}}),params:[d]})},[y.Identifier]:n=>s=>{let[a,l]=s,u=Ze(l.scopes,a.value);return u?I({},a,{meta:I({},a.meta,u.meta),type:u.type}):a.value==="null"?I({},a,{value:"0",type:"i32",Type:y.Constant}):n(s)},[y.TernaryExpression]:n=>([s,a])=>n([hn(I({},s,{params:[...s.params[1].params,s.params[0]]})),a])}}}}function To(){return{semantics(){return{"*":o=>function([n,...s],a){return I({},n,{params:n.params.map(u=>a([u,...s]))})}}}}}function Eo(){return{semantics(){return{[y.Typedef]:o=>([n])=>n,[y.Program]:o=>n=>{let[s,a]=n,{types:l}=a,u=P({[y.Export]:(h,d)=>{let[m]=h.params;return m!=null&&[y.Typedef,y.Struct].includes(m.Type)?d(I({},m,{meta:I({},m.meta,{EXPORTED:!0})})):h},[y.Typedef]:(h,d)=>{let m=0,[v]=h.params,b=[];k({Assignment(w){let N=w.params[1];b.push(N)},Type(){m+=1}})(v);let g=I({},h,{meta:I({},h.meta,{FUNCTION_METADATA:{argumentsCount:m},DEFAULT_ARGUMENTS:b})});return l[h.value]=g,g}})(s);return o([u,a])}}}}}let xo={i64:63,f64:63,i32:31,f32:31},Ao={i64:"0xffffffffffff",f64:"0xffffffffffff",i32:"0xffffff",f32:"0xffffff"};function wo(){return{semantics({stmt:o}){return{[y.UnaryExpression]:n=>(s,a)=>{let[l,u]=s,[h,d]=l.params.map(m=>a([m,u]));switch(l.value){case"!":let m=xo[h.type];return a([o`(((${h} >> ${m}) | ((~${h} + 1) >> ${m})) + 1);`,u]);case"~":let v=Ao[a([h,u]).type];return a([o`(${h} ^ ${v});`,u]);case"-":if(d.Type===y.Constant)return I({},d,{meta:I({},d.meta,{SIGN:-1})});default:return a([I({},l,{type:d.type,params:[I({},h,{type:d.type}),d],Type:y.BinaryExpression}),u])}}}}}}function Co(){return{semantics(){return{[y.FunctionDeclaration]:o=>([n,s],a)=>{s.scopes=mr(s.scopes,Nt);let l=Ge(s.scopes),[u,h,d]=n.params,[m,v]=[u,h].map(g=>a([g,s])),b=I({},n,{type:l[et].result,meta:I({},n.meta,{[Pe]:Object.keys(s.functions).length,[mn]:{argumentsCount:l[et].arguments.length,locals:Ge(s.scopes)}})});return s.functions[n.value]=b,b.params=[m,v,a([d,s])],s.scopes=bo(s.scopes),b},[y.FunctionResult]:o=>([n,s])=>{let a=Ge(s.scopes);return a[et].result=n.type,n},[y.FunctionArguments]:o=>([n,s],a)=>{let l=Ge(s.scopes);return l[et].arguments=[],P({[y.Pair]:(h,d)=>{let[m,v]=h.params,b=a([v,s]);return l[et].arguments.push(h),a([I({},h,{value:m.value,type:b.value,params:[],Type:y.Declaration}),s]),I({},h,{params:[m,b]})}})(I({},n,{params:n.params.filter(Boolean)}))},[y.FunctionCall]:o=>([n,s])=>{let{functions:a}=s,l=Object.keys(a).indexOf(n.value);return o([I({},n,{type:a[n.value]!=null?a[n.value].type:null,meta:{[Pe]:l},params:n.params.slice(1)}),s])},[y.ReturnStatement]:o=>([n,s],a)=>{let l=Ge(s.scopes),[u]=n.params.map(m=>a([m,s])),{result:h}=l[et];if(u!=null&&u.Type===y.Constant&&ke(u.type)!==ke(h))return I({},n,{type:h,params:[I({},u,{type:h})]});let d=u?u.type:null;return I({},n,{params:[u],type:d})}}}}}function $o(){return{semantics:()=>({[y.Import]:o=>n=>{let[s,a]=n;return P({[y.BinaryExpression]:(l,u)=>{let[h,d]=l.params;if(h.Type!==y.Pair)return l;let[m,v]=h.params;return u(I({},h,{params:[I({},d,{meta:I({},m.meta,{AS:m.value})}),v]}))},[y.Pair]:(l,u)=>{let{types:h,functions:d}=a,[m,v]=l.params;if(h[v.value]!=null){let b=Object.keys(d).length,g=Object.keys(h).indexOf(v.value),w=I({},m,{id:m.value,type:h[v.value].type,meta:I({},m.meta,{[Pe]:b,[_t]:g,FUNCTION_METADATA:h[v.value].meta.FUNCTION_METADATA,DEFAULT_ARGUMENTS:h[v.value].meta.DEFAULT_ARGUMENTS})});return d[m.value]=w,I({},l,{params:[w,h[v.value]]})}if(["Table","Memory"].includes(v.value)){let b=v.value==="Memory"?"memories":"tables";a[b].push(m)}else{let b=Ge(a.scopes),g=hr(b,m.value);go(a.scopes,m.value,I({},m,{meta:{[b[dr]]:g,[Pt]:!0},type:v.type}))}return l}})(s)}})}}function Oo(){return{semantics(){let o=n=>([s,a])=>s.type==="bool"?n([I({},s,{type:"i32"}),a]):n([s,a]);return{[y.Identifier]:n=>(s,a)=>{let[l,u]=s;return l.value==="true"||l.value==="false"?a([I({},l,{Type:y.Constant,value:l.value==="true"?"1":"0",type:"i32"}),u]):n(s)},[y.FunctionResult]:n=>([s,a])=>s.type==="bool"?n([I({},s,{type:"i32"}),a]):n([s,a]),[y.Declaration]:o,[y.ImmutableDeclaration]:o}}}}function yr(o,n){let s=[null,n];return function(a){return s[0]=a,o(s)}}function Lo(o,n){let s={},a=0;for(a;a<o.length;a++)s[o[a]]=n[o[a]];return s}let No={i32:2,f32:2,i64:3,f64:3},Po="i32";function Io({stmt:o}){let n=u=>h=>{let[d,m]=h;if(!String(d.type).endsWith("[]"))return u(h);let v=Q({type:Po,meta:{TYPE_ARRAY:d.type.slice(0,-2)}},d);return u([v,m])};function s(u,h){let d=No[u.meta.TYPE_ARRAY]||2;return h.Type!==y.Constant||Number(h.value)?o`(${u} + (${h} << ${d}));`:o`(${u});`}function a(u){return!(u.type==null||u.index==null)}function l([u,h]){let d=u.meta.TYPE_ARRAY,m=s(u,h);return{type:d,index:m,TYPE_ARRAY:u.meta.TYPE_ARRAY}}return{[y.Declaration]:n,[y.ImmutableDeclaration]:n,[y.Identifier]:u=>h=>{let[d,m]=h,v=Ze(m.scopes,d.value);return v&&v.meta.TYPE_ARRAY?u([Q(Lo(["type","meta"],v),d),m]):u(h)},[y.Assignment]:u=>(h,d)=>{let[m,v]=h,[b,g]=m.params;if(b.Type!==y.ArraySubscript)return u(h);let w=yr(d,v),N=l(b.params.map(w)),{type:B,index:U}=N;return $(a(N),`PANIC - Cannot assign to subscript of ${b.value}`),w(o`${B}.store(${U}, ${g});`)},[y.ArraySubscript]:u=>(h,d)=>{let[m,v]=h,b=yr(d,v),g=l(m.params.map(b)),{type:w,index:N,TYPE_ARRAY:B}=g;return a(g)?Q({meta:{TYPE_ARRAY:B}},b(o`${w}.load(${N});`)):u(h)},[y.FunctionResult]:n}}function Ro(){return{semantics:Io}}let Bo=(o,n)=>{let s=o.memories[0];return s&&s.value===n.value};function Mo(){return{semantics({stmt:o}){return{[y.ImmutableDeclaration]:n=>s=>{let[a,l]=s,{scopes:u,memories:h}=l;return!u.length<2&&a.type==="Memory"&&!h.length?(h.push(I({},a,{meta:I({},a.meta,{[Ie]:-1})})),h[0]):n(s)},[y.FunctionCall]:n=>(s,a)=>{let[l,u]=s,[h,...d]=l.params,[m={},v={}]=h.params,g={dataSize:a([o`i32.load(0);`,u]),grow:I({},m,{value:"grow_memory",params:d.map(w=>a([w,u])),Type:y.NativeMethod}),size:I({},m,{value:"current_memory",params:[],Type:y.NativeMethod})}[v.value];return h.Type===y.Access&&Bo(u,m)&&g?g:n(s)}}}}}let _r=o=>{let n=[];for(;;){let s=o&127;o=o>>7;let a=s&64;if(o===0&&!a||o===-1&&a){n.push(s);break}else n.push(s|128)}return n},Fo=o=>{let n=[];for(;;){let s=o&127;if(o=o>>>7,o===0){n.push(s);break}n.push(s|128)}return n};let It=1,Rt=1<<1,Bt=1<<2,Mt=1<<3,Ft=1<<4,Ut=1<<5,br=1<<6,Dt=1<<7,jt=1<<8,kt=1<<9,zt=1<<10,Gt=1<<11,dn=1<<12,Te=4,Uo={[It]:Te,[Rt]:Te*2,[Bt]:Te,[Mt]:Te*2,[Gt]:Te,[zt]:Te>>1,[jt]:Te>>2,[Dt]:Te>>2,[kt]:Te>>1,[Ft]:Te,[Ut]:Te,[br]:Te},se=!0;var Re={i32:It,i64:Rt,f32:Bt,f64:Mt,anyfunc:Ft,func:Ut,block_type:br,i8:Dt,u8:jt,i16:kt,u16:zt,u32:Gt,u64:dn,set:(o,n,s,a)=>{switch(o){case It:return s.setInt32(n,a,se);case Rt:return s.setInt64(n,a,se);case Bt:return s.setFloat32(n,a,se);case Mt:return s.setFloat64(n,a,se);case Ft:return s.setUint32(n,a,se);case Ut:return s.setUint32(n,a,se);case Dt:return s.setInt8(n,a,se);case jt:return s.setUint8(n,a,se);case kt:return s.setInt16(n,a,se);case zt:return s.setUint16(n,a,se);case Gt:return s.setUint32(n,a,se);case dn:return s.setUint64(n,a,se);default:return s.setUint8(n,a,se)}},get:(o,n,s)=>{switch(o){case It:return s.getInt32(n,se);case Rt:return s.getInt64(n,se);case Bt:return s.getFloat32(n,se);case Mt:return s.getFloat64(n,se);case Ft:return s.getUint32(n,se);case Ut:return s.getUint32(n,se);case Dt:return s.getInt8(n,se);case jt:return s.getUint8(n,se);case kt:return s.getInt16(n,se);case zt:return s.getUint16(n,se);case Gt:return s.getUint32(n,se);case dn:return s.getUint64(n,se);default:return s.getUint8(n,se)}},sizeof:Uo},E=Re.i32,L=Re.i64,C=Re.f32,oe=Re.f64,ce=Re.u8,yn=Re.u32,gr=Re.set,_n=Re.sizeof;class le{constructor(){this.data=[],this.size=0}push(n,s,a){let l=0;switch(n){case"varuint7":case"varuint32":case"varint7":case"varint1":{s=Fo(s),l=s.length,$(l,`Cannot write a value of size ${l}`);break}case"varint32":{s=_r(s),l=s.length,$(l,`Cannot write a value of size ${l}`);break}case"varint64":{s=_r(s),l=s.length,$(l,`Cannot write a value of size ${l}`);break}default:l=_n[n],$(l,`Cannot write a value of size ${l}, type ${n}`)}return this.data.push({type:n,value:s,debug:a}),this.size+=l,this}buffer(n=new ArrayBuffer(this.size)){let s=new DataView(n),a=0;return this.data.forEach(({type:l,value:u})=>{Array.isArray(u)?u.forEach(h=>gr(ce,a++,s,h)):(gr(l,a,s,u),a+=_n[l])}),n}write(n){return n&&(this.data=this.data.concat(n.data),this.size+=n.size),this}}function*Do(o,n){let s=0,a=0,l=0,u=n;for(;;){let d=o.getUint8(u,!0);if(s|=(d&127)<<l,u+=1,!(d&128))break;l+=7}let h=0;for(;a<s;){for(h=0,l=0;;){let d=o.getUint8(u,!0);if(h|=(d&127)<<l,u+=1,!(d&128))break;l+=7}a+=1,yield h}}function vr(o){let n=new le,s=new le;s.push("varuint32",o.length,o);let a=0;for(a=0;a<o.length;a++)s.push("varuint32",o.codePointAt(a),o[a]);return n.write(s),n}let jo={["\\0"]:0,["\\a"]:7,["\\b"]:8,["\\t"]:9,["\\n"]:10,["\\v"]:11,["\\f"]:12,["\\r"]:13,["\\'"]:39},ko={i64:8,f64:8,i32:4,f32:4};function zo(o,n){let s=new le,a=Re[n];return o.forEach(l=>{s.push(a,l,String(l))}),s}function Go(){let o=0;return{semantics:({stmt:n})=>({[y.StaticDeclaration]:s=>([a,l],u)=>{let{userTypes:h,statics:d}=l,m=String(a.type).slice(0,-2),v=ko[m],b=a.params.reduce((w,N,B)=>{let U=u([N,l]);return w.OBJECT_SIZE+=v,w.TYPE_OBJECT[B]=B*v,w.OBJECT_KEY_TYPES[B]=m,w.VALUES.push(Number(U.value)),w},{OBJECT_SIZE:0,TYPE_OBJECT:{},OBJECT_KEY_TYPES:{},VALUES:[],STATIC:m}),g=`__auto_gen_${a.value}_${o}`;return o+=1,h[g]=I({},a,{value:g,Type:y.Type,meta:b,params:[]}),d[g]=zo(b.VALUES,m),u([I({},a,{meta:b,type:g,Type:y.ImmutableDeclaration,params:[I({},a.params[0],{value:g,Type:y.StaticValueList})]}),l])},[y.ArraySubscript]:s=>([a,l],u)=>{let[h,d]=a.params.map(v=>u([v,l]));if(!h.meta.STATIC)return s([a,l]);let m={i32:2,f32:2,i64:3,f64:3}[h.meta.STATIC];return u([n`${h.meta.STATIC}.load(${h} + (${d} << ${m}));`,l])},[y.CharacterLiteral]:s=>([a,l],u)=>{let h=jo[a.value]||a.value.codePointAt(0);return u([I({},a,{Type:"Constant",type:"i32",value:String(h)}),l])},[y.StringLiteral]:s=>a=>{let[l,u]=a,{statics:h}=u,{value:d}=l;return d in h||(h[d]=vr(d)),l}})}}function Yo(){return{semantics(){return{[y.ImmutableDeclaration]:o=>function(n){let[s,a]=n;return!a.locals&&s.type==="Table"?I({},s,{meta:I({},s.meta,{[Ie]:-1})}):o(n)},[y.Identifier]:o=>function(n){let[s,a]=n,{functions:l,table:u,scopes:h}=a;return Ze(h,s.value)||!l[s.value]?o(n):(u[s.value]==null&&(u[s.value]=l[s.value]),I({},s,{type:"i32",meta:{[Pe]:l[s.value].meta[Pe]},value:Object.keys(u).indexOf(s.value),Type:y.FunctionPointer}))},[y.FunctionResult]:o=>(n,s)=>{let[a,l]=n,{types:u}=l;return u[a.type]?o([Q({type:"i32",meta:{ALIAS:a.type},params:a.params.map(h=>s([h,l]))},a),l]):o(n)},[y.FunctionCall]:o=>function(n,s){let[a,l]=n,{scopes:u,types:h}=l,d=Ze(u,a.value);if(!d)return o(n);let m=h[d.type],v=Object.keys(h).indexOf(d.type),b=[...a.params.slice(1),I({},d,{Type:y.Identifier})].map(g=>s([g,l]));return I({},a,{meta:I({},a.meta,d.meta,{[_t]:v}),type:m!=null?m.type:a.type,params:b,Type:y.IndirectFunctionCall})}}}}}let Yt="i32",qo={i64:8,f64:8,i32:4,f32:4,["__DIRECT_ADDRESS__"]:4},Wo=o=>{let n={},s={},a=0;return k({[y.Pair]:l=>{let[u]=l.params,h=u.value,d=l.params[1].value;$(n[h]==null,`Duplicate key ${h} not allowed in object type`),s[h]=`${u.Type==="AddressOf"?"&":""}${d}`,n[h]=a,a+=qo[d]||4}})(o),[n,a,s]},Vo=o=>(n,s)=>{let a=o`throw;`,l={load:Q({range:s.range},o`i32.load(${a}, ${a});`),store:U=>Q({range:s.range},o`i32.store(${a}, ${U});`),offset:a,type:"void"};if(n.meta.STRUCT_TYPE==null)return l;let u=n.meta.STRUCT_TYPE,h=u.meta.TYPE_OBJECT,d=u.meta.OBJECT_KEY_TYPES,m=h[s.value];if(m==null)return l;let v=d[s.value],b=v[0]==="&",g=m?o`(${n} + ${m});`:o`(${n});`,w=null,N=null;v!=null&&typeof v=="object"&&(w=v,v=Yt),String(v).endsWith("[]")&&(N=v.slice(0,-2).replace("&",""),v="i32");let B=Q({range:n.range,meta:{STRUCT_TYPE:w,TYPE_ARRAY:N}});return{offset:g,type:v,store:U=>B(o`${v}.store(${g}, ${U});`),load:B(b?g:o`${v}.load(${g});`)}};function Jo(){return{semantics({stmt:o}){let n=Vo(o);function s(l,u){let[h,d]=l,[m,v]=h.params,[b,g]=m.params,w=n(u([b,d]),g);return u([w.store(v),d])}function a(l,u){let[h,d]=l,[m,v]=h.params,b=u([m,d]),g=[];k({[y.Identifier]:(N,B)=>{let U=n(b,N);g.push({field:U,value:N})},[y.Pair]:(N,B)=>{let[U,z]=N.params,Z=n(b,U);g.push({field:Z,value:z})},[y.Spread]:(N,B)=>{let U=u([N.params[0],d]);Object.keys(U.meta.TYPE_OBJECT).forEach(z=>{let Z=n(b,{value:z,type:null,range:U.range}),K=n(U,{value:z,type:null,range:U.range});g.push({field:Z,value:K.load})})}})(v);let w=g.filter(({field:N})=>N!=null).map(N=>u([N.field.store(N.value),d]));return I({},m,{Type:y.Block,params:w})}return{[y.Struct]:l=>([u,h],d)=>{let{userTypes:m,aliases:v}=h,[b]=u.params,g=I({},u,{meta:I({},u.meta,{TYPE_OBJECT:{},OBJECT_SIZE:0,OBJECT_KEY_TYPES:{}})}),w=()=>{v[u.value]=b.value},N=(U,z)=>{let[Z,K,$e]=Wo(U);g.meta.TYPE_OBJECT=I({},g.meta.TYPE_OBJECT,Z),g.meta.OBJECT_SIZE+=K,g.meta.OBJECT_KEY_TYPES=I({},g.meta.OBJECT_KEY_TYPES,$e)};return{[y.Type]:w,[y.Identifier]:w,[y.ObjectLiteral]:()=>{N(u),m[g.value]=g},[y.UnionType]:()=>{k({[y.ObjectLiteral]:N,[y.ArrayType]:U=>{g.meta.TYPE_ARRAY=U.type.slice(0,-2)},[y.Identifier]:U=>{let z=m[d([U,h]).value];g.meta.TYPE_OBJECT=I({},g.meta.TYPE_OBJECT,z.meta.TYPE_OBJECT),g.meta.OBJECT_SIZE=Math.max(g.meta.OBJECT_SIZE,z.meta.OBJECT_SIZE),g.meta.OBJECT_KEY_TYPES=I({},g.meta.OBJECT_KEY_TYPES,z.meta.OBJECT_KEY_TYPES)}})(b),m[g.value]=g}}[b.Type](),g.meta.OBJECT_KEY_TYPES=Object.entries(g.meta.OBJECT_KEY_TYPES).reduce((U,[z,Z])=>(U[z]=m[Z]||Z,U),{}),g},[y.DeclType]:l=>(u,h)=>{let[d,m]=u,{aliases:v}=m;return v[d.value]?h([Q({value:v[d.value],type:v[d.value]},d),m]):l(u)},[y.FunctionResult]:l=>(u,h)=>{let[d,m]=u,{userTypes:v,aliases:b}=m;return b[d.type]?h([Q({type:b[d.type]},d),m]):v[String(d.type)]?l([Q({type:Yt,meta:{STRUCT_TYPE:v[d.type]},params:d.params.map(g=>h([g,m]))},d),m]):l(u)},[y.Identifier]:l=>u=>{let[h,d]=u,{userTypes:m,scopes:v}=d,b=Ze(v,h.value);return b&&m[b.type]?I({},h,{meta:I({},h.meta,b.meta,m[b.type].meta,{STRUCT_TYPE:m[b.type]}),type:Yt}):l(u)},[y.Access]:function(l){return(u,h)=>{let[d,m]=u,[v,b]=d.params,g=n(h([v,m]),b);return h([g.load,m])}},[y.Assignment]:l=>(u,h)=>{let[d]=u,[m,v]=d.params;return m.Type===y.Access?s(u,h):v.Type===y.ObjectLiteral?a(u,h):l(u)},[y.ArraySubscript]:l=>(u,h)=>{let[d,m]=u,v=l(u);if(m.userTypes[v.meta.TYPE_ARRAY]==null)return v;let[b,g]=d.params.map(w=>h([w,m]));return h([Q({type:Yt,meta:{STRUCT_TYPE:m.userTypes[v.meta.TYPE_ARRAY]}},o`(${b} + (${g} * sizeof(${v.meta.TYPE_ARRAY})));`),m])}}}}}function Ho(){return{semantics(){return{[y.FunctionCall]:o=>(n,s)=>{let[a,l]=n,[u,...h]=a.params;if(u.Type===y.Access&&u.params[0]&&u.params[0].Type===y.Type){let[d,m]=u.params;return Q({value:`${d.value}.${m.value}`,type:d.value,params:h.map(v=>s([v,l])),Type:y.NativeMethod},a)}return o(n)},[y.Unreachable]:o=>([n])=>Q({value:"unreachable",params:[],Type:y.NativeMethod},n)}}}}function Qo(){return{grammar:cr,semantics(){return{[y.FunctionDeclaration]:o=>n=>{let[s,a]=n,[l]=s.params,u=[];return k({Assignment:h=>{let[,d]=h.params;u.push(d)}})(l),o([I({},s,{meta:I({},s.meta,{DEFAULT_ARGUMENTS:u})}),a])},[y.FunctionCall]:o=>n=>{let[s,a]=n,{functions:l}=a,[u,...h]=s.params,d=l[u.value];if(!d)return o(n);let m=d.meta.FUNCTION_METADATA.argumentsCount,v=h.length,b=m-v;return b>0?o([I({},s,{params:[...s.params,...d.meta.DEFAULT_ARGUMENTS.slice(b-1)]}),a]):o(n)}}}}}let Ko={i64:8,f64:8,i32:4,f32:4};function Xo(){return{semantics(){return{[y.FunctionCall]:o=>n=>{let[s,a]=n;if(s.value!=="sizeof")return o(n);let{scopes:l,userTypes:u,functions:h}=a,[,d]=s.params,m=Ze(l,d.value),{type:v=""}=m||{},b=u[d.value]||u[v],g=h[d.value];if(b!=null){let N=b.meta[vo];return $(N,"Object size information is missing"),I({},s,{value:N,params:[],type:"i32",Type:y.Constant})}let w=m||g;return I({},s,{value:Ko[String(w?w.type:d.value)],type:"i32",params:[],Type:y.Constant})}}}}}let Zo=()=>[To().semantics,So().semantics,$o().semantics,Eo().semantics,wo().semantics,Co().semantics,Oo().semantics,Ro().semantics,Mo().semantics,Go().semantics,Yo().semantics,Jo().semantics,Ho().semantics,Xo().semantics,Qo().semantics];function bn(o,n,s){let a=[...Zo(),...n],l=no(a.map(B=>B(s))),u={functions:{},types:{},userTypes:{},table:{},hoist:[],statics:{},path:[],scopes:mr([],Ie),memories:[],tables:[],aliases:{},exports:{}},h=x(l)([o,u]),{functions:d,scopes:m,types:v,userTypes:b,statics:g,hoist:w,exports:N}=u;return I({},h,{meta:I({},h.meta,{[fn]:{functions:d,globals:m[0],types:v,userTypes:b,statics:g,exports:N}}),params:[...h.params,...w]})}function Ce(o,n,s,a,l){let u=s.start.line,h=s.start.col,d=s.end.col,m=s.end.sourceLine,v=new Array(d-h+1).join("^").padStart(s.start.col-1," ");return`
`+m+`
`+v+` ${n}
`+o+`
  at ${l} (${a}:${u}:${h})`}let F={},ei=[],gn={},A=null,T=(o,n,s,a,l,u,h)=>{let d={result:o,first:n,second:s,size:a,code:l,name:u,text:h};return F[u]=d,ei[l]=d,gn[h]=d,d};T(A,A,A,0,0,"Unreachable","unreachable"),T(A,A,A,0,1,"Nop","nop"),T(A,A,A,0,2,"Block","block"),T(A,A,A,0,3,"Loop","loop"),T(A,A,A,0,4,"If","if"),T(A,A,A,0,5,"Else","else"),T(A,A,A,0,6,"Try","try"),T(A,A,A,0,7,"Catch","catch"),T(A,A,A,0,8,"Throw","throw"),T(A,A,A,0,9,"Rethrow","rethrow"),T(A,A,A,0,10,"CatchAll","catch_all"),T(A,A,A,0,11,"End","end"),T(A,A,A,0,12,"Br","br"),T(A,A,A,0,13,"BrIf","br_if"),T(A,A,A,0,14,"BrTable","br_table"),T(A,A,A,0,15,"Return","return"),T(A,A,A,0,16,"Call","call"),T(A,A,A,0,17,"CallIndirect","call_indirect"),T(A,A,A,0,26,"Drop","drop"),T(A,A,A,0,27,"Select","select"),T(A,A,A,0,32,"GetLocal","get_local"),T(A,A,A,0,33,"SetLocal","set_local"),T(A,A,A,0,34,"TeeLocal","tee_local"),T(A,A,A,0,35,"GetGlobal","get_global"),T(A,A,A,0,36,"SetGlobal","set_global"),T(E,E,A,4,40,"i32Load","i32.load"),T(L,E,A,8,41,"i64Load","i64.load"),T(C,E,A,4,42,"f32Load","f32.load"),T(oe,E,A,8,43,"f64Load","f64.load"),T(E,E,A,1,44,"i32Load8S","i32.load8_s"),T(E,E,A,1,45,"i32Load8U","i32.load8_u"),T(E,E,A,2,46,"i32Load16S","i32.load16_s"),T(E,E,A,2,47,"i32Load16U","i32.load16_u"),T(L,E,A,1,48,"i64Load8S","i64.load8_s"),T(L,E,A,1,49,"i64Load8U","i64.load8_u"),T(L,E,A,2,50,"i64Load16S","i64.load16_s"),T(L,E,A,2,51,"i64Load16U","i64.load16_u"),T(L,E,A,4,52,"i64Load32S","i64.load32_s"),T(L,E,A,4,53,"i64Load32U","i64.load32_u"),T(A,E,E,4,54,"i32Store","i32.store"),T(A,E,L,8,55,"i64Store","i64.store"),T(A,E,C,4,56,"f32Store","f32.store"),T(A,E,C,8,57,"f64Store","f64.store"),T(A,E,E,1,58,"i32Store8","i32.store8"),T(A,E,E,2,59,"i32Store16","i32.store16"),T(A,E,L,1,60,"i64Store8","i64.store8"),T(A,E,L,2,61,"i64Store16","i64.store16"),T(A,E,L,4,62,"i64Store32","i64.store32"),T(E,A,A,0,63,"CurrentMemory","current_memory"),T(E,E,A,0,64,"GrowMemory","grow_memory"),T(E,A,A,0,65,"i32Const","i32.const"),T(L,A,A,0,66,"i64Const","i64.const"),T(C,A,A,0,67,"f32Const","f32.const"),T(oe,A,A,0,68,"f64Const","f64.const"),T(E,E,A,0,69,"i32Eqz","i32.eqz"),T(E,E,E,0,70,"i32Eq","i32.eq"),T(E,E,E,0,71,"i32Ne","i32.ne"),T(E,E,E,0,72,"i32LtS","i32.lt_s"),T(E,E,E,0,73,"i32LtU","i32.lt_u"),T(E,E,E,0,74,"i32GtS","i32.gt_s"),T(E,E,E,0,75,"i32GtU","i32.gt_u"),T(E,E,E,0,76,"i32LeS","i32.le_s"),T(E,E,E,0,77,"i32LeU","i32.le_u"),T(E,E,E,0,78,"i32GeS","i32.ge_s"),T(E,E,E,0,79,"i32GeU","i32.ge_u"),T(E,L,A,0,80,"i64Eqz","i64.eqz"),T(E,L,L,0,81,"i64Eq","i64.eq"),T(E,L,L,0,82,"i64Ne","i64.ne"),T(E,L,L,0,83,"i64LtS","i64.lt_s"),T(E,L,L,0,84,"i64LtU","i64.lt_u"),T(E,L,L,0,85,"i64GtS","i64.gt_s"),T(E,L,L,0,86,"i64GtU","i64.gt_u"),T(E,L,L,0,87,"i64LeS","i64.le_s"),T(E,L,L,0,88,"i64LeU","i64.le_u"),T(E,L,L,0,89,"i64GeS","i64.ge_s"),T(E,L,L,0,90,"i64GeU","i64.ge_u"),T(E,C,C,0,91,"f32Eq","f32.eq"),T(E,C,C,0,92,"f32Ne","f32.ne"),T(E,C,C,0,93,"f32Lt","f32.lt"),T(E,C,C,0,94,"f32Gt","f32.gt"),T(E,C,C,0,95,"f32Le","f32.le"),T(E,C,C,0,96,"f32Ge","f32.ge"),T(E,C,C,0,97,"f64Eq","f64.eq"),T(E,C,C,0,98,"f64Ne","f64.ne"),T(E,C,C,0,99,"f64Lt","f64.lt"),T(E,C,C,0,100,"f64Gt","f64.gt"),T(E,C,C,0,101,"f64Le","f64.le"),T(E,C,C,0,102,"f64Ge","f64.ge"),T(E,E,A,0,103,"i32Clz","i32.clz"),T(E,E,A,0,104,"i32Ctz","i32.ctz"),T(E,E,A,0,105,"i32Popcnt","i32.popcnt"),T(E,E,E,0,106,"i32Add","i32.add"),T(E,E,E,0,107,"i32Sub","i32.sub"),T(E,E,E,0,108,"i32Mul","i32.mul"),T(E,E,E,0,109,"i32DivS","i32.div_s"),T(E,E,E,0,110,"i32DivU","i32.div_u"),T(E,E,E,0,111,"i32RemS","i32.rem_s"),T(E,E,E,0,112,"i32RemU","i32.rem_u"),T(E,E,E,0,113,"i32And","i32.and"),T(E,E,E,0,114,"i32Or","i32.or"),T(E,E,E,0,115,"i32Xor","i32.xor"),T(E,E,E,0,116,"i32Shl","i32.shl"),T(E,E,E,0,117,"i32ShrS","i32.shr_s"),T(E,E,E,0,118,"i32ShrU","i32.shr_u"),T(E,E,E,0,119,"i32Rotl","i32.rotl"),T(E,E,E,0,120,"i32Rotr","i32.rotr"),T(L,L,A,0,121,"i64Clz","i64.clz"),T(L,L,A,0,122,"i64Ctz","i64.ctz"),T(L,L,A,0,123,"i64Popcnt","i64.popcnt"),T(L,L,L,0,124,"i64Add","i64.add"),T(L,L,L,0,125,"i64Sub","i64.sub"),T(L,L,L,0,126,"i64Mul","i64.mul"),T(L,L,L,0,127,"i64DivS","i64.div_s"),T(L,L,L,0,128,"i64DivU","i64.div_u"),T(L,L,L,0,129,"i64RemS","i64.rem_s"),T(L,L,L,0,130,"i64RemU","i64.rem_u"),T(L,L,L,0,131,"i64And","i64.and"),T(L,L,L,0,132,"i64Or","i64.or"),T(L,L,L,0,133,"i64Xor","i64.xor"),T(L,L,L,0,134,"i64Shl","i64.shl"),T(L,L,L,0,135,"i64ShrS","i64.shr_s"),T(L,L,L,0,136,"i64ShrU","i64.shr_u"),T(L,L,L,0,137,"i64Rotl","i64.rotl"),T(L,L,L,0,138,"i64Rotr","i64.rotr"),T(C,C,C,0,139,"f32Abs","f32.abs"),T(C,C,C,0,140,"f32Neg","f32.neg"),T(C,C,C,0,141,"f32Ceil","f32.ceil"),T(C,C,C,0,142,"f32Floor","f32.floor"),T(C,C,C,0,143,"f32Trunc","f32.trunc"),T(C,C,C,0,144,"f32Nearest","f32.nearest"),T(C,C,C,0,145,"f32Sqrt","f32.sqrt"),T(C,C,C,0,146,"f32Add","f32.add"),T(C,C,C,0,147,"f32Sub","f32.sub"),T(C,C,C,0,148,"f32Mul","f32.mul"),T(C,C,C,0,149,"f32Div","f32.div"),T(C,C,C,0,150,"f32Min","f32.min"),T(C,C,C,0,151,"f32Max","f32.max"),T(C,C,C,0,152,"f32Copysign","f32.copysign"),T(C,C,C,0,153,"f32Abs","f64.abs"),T(C,C,C,0,154,"f32Neg","f64.neg"),T(C,C,C,0,155,"f32Ceil","f64.ceil"),T(C,C,C,0,156,"f32Floor","f64.floor"),T(C,C,C,0,157,"f32Trunc","f64.trunc"),T(C,C,C,0,158,"f32Nearest","f64.nearest"),T(C,C,C,0,159,"f32Sqrt","f64.sqrt"),T(oe,oe,oe,0,160,"f64Add","f64.add"),T(oe,oe,oe,0,161,"f64Sub","f64.sub"),T(oe,oe,oe,0,162,"f64Mul","f64.mul"),T(oe,oe,oe,0,163,"f64Div","f64.div"),T(oe,oe,oe,0,164,"f64Min","f64.min"),T(oe,oe,oe,0,165,"f64Max","f64.max"),T(oe,oe,oe,0,166,"f64Copysign","f64.copysign"),T(E,L,A,0,167,"i32Wrapi64","i32.wrap/i64"),T(E,C,A,0,168,"i32TruncSf32","i32.trunc_s/f32"),T(E,C,A,0,169,"i32TruncUf32","i32.trunc_u/f32"),T(E,C,A,0,170,"i32TruncSf64","i32.trunc_s/f64"),T(E,C,A,0,171,"i32TruncUf64","i32.trunc_u/f64"),T(L,E,A,0,172,"i64ExtendSi32","i64.extend_s/i32"),T(L,E,A,0,173,"i64ExtendUi32","i64.extend_u/i32"),T(L,C,A,0,174,"i64TruncSf32","i64.trunc_s/f32"),T(L,C,A,0,175,"i64TruncUf32","i64.trunc_u/f32"),T(L,C,A,0,176,"i64TruncSf64","i64.trunc_s/f64"),T(L,C,A,0,177,"i64TruncUf64","i64.trunc_u/f64"),T(C,E,A,0,178,"f32ConvertSi32","f32.convert_s/i32"),T(C,E,A,0,179,"f32ConvertUi32","f32.convert_u/i32"),T(C,L,A,0,180,"f32ConvertSi64","f32.convert_s/i64"),T(C,L,A,0,181,"f32ConvertUi64","f32.convert_u/i64"),T(C,C,A,0,182,"f32Demotef64","f32.demote/f64"),T(C,E,A,0,183,"f64ConvertSi32","f64.convert_s/i32"),T(C,E,A,0,184,"f64ConvertUi32","f64.convert_u/i32"),T(C,L,A,0,185,"f64ConvertSi64","f64.convert_s/i64"),T(C,L,A,0,186,"f64ConvertUi64","f64.convert_u/i64"),T(C,C,A,0,187,"f64Promotef32","f64.promote/f32"),T(E,C,A,0,188,"i32Reinterpretf32","i32.reinterpret/f32"),T(L,C,A,0,189,"i64Reinterpretf64","i64.reinterpret/f64"),T(C,E,A,0,190,"f32Reinterpreti32","f32.reinterpret/i32"),T(C,L,A,0,191,"f32Reinterpreti64","f64.reinterpret/i64");let Sr=(o,n)=>{let s=o[0];return["i32","bool"].includes(o)&&n==="i64"?F.i32Wrapi64:o==="i64"&&["i32","bool"].includes(n)?F.i64ExtendSi32:o==="f32"&&n==="f64"?F.f32Demotef64:o==="f64"&&n==="f32"?F.f64Promotef32:F[o+(s==="f"?"ConvertS":"TruncS")+n]},Tr=({type:o,value:n})=>({"+":F[String(o)+"Add"],"-":F[String(o)+"Sub"],"*":F[String(o)+"Mul"],"/":F[String(o)+"DivS"]||F[String(o)+"Div"],"%":F[String(o)+"RemS"]||F[String(o)+"RemU"],"==":F[String(o)+"Eq"],"!=":F[String(o)+"Ne"],">":F[String(o)+"Gt"]||F[String(o)+"GtS"],"<":F[String(o)+"Lt"]||F[String(o)+"LtS"],"<=":F[String(o)+"Le"]||F[String(o)+"LeS"],">=":F[String(o)+"Ge"]||F[String(o)+"GeS"],"?":F.If,":":F.Else,"&":F[String(o)+"And"],"|":F[String(o)+"Or"],"^":F[String(o)+"Xor"],">>":F[String(o)+"ShrS"],">>>":F[String(o)+"ShrU"],"<<":F[String(o)+"Shl"]})[n],tt=127,nt=126,rt=125,st=124,Er=112,xr=96,ti={i32:tt,i64:nt,f32:rt,f64:st},qt=o=>{switch(o){case nt:return"i64";case rt:return"f32";case st:return"f64";case xr:return"func";case Er:return"anyfunc";case tt:default:return"i32"}},vn=o=>{let n={};return k({[y.Pair]:({params:s})=>{let[{value:a},{value:l}]=s;n[a]=parseInt(l)}})(o),n},ni=o=>{let n=o.value||"??",s=o.type,a=Tr({value:n,type:s||"i32"});return s?a.text:a.text.replace("i32","??")},Ar=o=>{let n=[];return k({[y.Pair]:(s,a)=>{n.push(`${s.params[0].value} ${s.params[1].value}`)},[y.Type]:s=>{n.push(s.value)}})(o),n.length?" param("+n.join(" ")+")":""},wr=o=>o==null?"":" (result "+(o.type||"??")+")",Cr=o=>{let[n,s]=o.params;return"(type "+o.value+` (func${Ar(n)}${wr(s)}))`},ze=(o,n,{value:s,params:a})=>{a.filter(Boolean).length?(o(`(${s}`,2),a.forEach(n),o(")",0,-2)):o(`(${s})`,0,0)},ri=o=>({[y.Import]:(n,s)=>{let[a,l]=n.params;k({[y.Pair]:({params:u},h)=>{let{value:d}=u[0],m=u[1];if(m.value==="Memory"){let v=vn(m);o(`(import "${l.value}" "${d}" (memory ${v.initial}${v.max?v.max:""}))`)}else o(`(import "${l.value}" "${d}" ${Cr(m)})`)},[y.Identifier]:(u,h)=>{let{value:d}=u;o(`(import "${l.value}" "${d}" (type ??))`)}})(a)},[y.Export]:(n,s)=>{o("(export",2),n.params.forEach(s),o(")",0,-2)},[y.GenericType]:(n,s)=>{o(";; Pseudo type",0,0),o("(type-generic "+n.value+")",0,0)},[y.FunctionCall]:({value:n,params:s},a)=>{ze(o,a,{value:`call ${n}`,params:s})},[y.Block]:({params:n},s)=>{ze(o,s,{value:"block",params:n})},[y.NativeMethod]:(n,s)=>{ze(o,s,n)},[y.BinaryExpression]:(n,s)=>{let a=ni(n);ze(o,s,{value:a,params:n.params})},[y.ArraySubscript]:({params:n},s)=>{o(";; unparsed",0,0),ze(o,s,{value:"subscript",params:n})},[y.Typedef]:(n,s)=>{o(Cr(n))},[y.Struct]:(n,s)=>{o(";; Pseudo struct type",0,0),ze(o,s,{value:"type-struct "+n.value,params:n.params})},[y.Identifier]:n=>{let s=n.meta[Ie]!=null?"global":"local";o(`(get_${s} ${n.value})`)},[y.Constant]:n=>{o(`(${String(n.type)}.const ${n.value})`)},[y.FunctionPointer]:n=>{o(`(${String(n.type)}.table_pointer ${n.value})`)},[y.FunctionDeclaration]:(n,s)=>{let[a,l,...u]=n.params;o(`(func ${n.value}${Ar(a)}${wr(l)}`,2),u.forEach(s),o(")",0,-2)},[y.ReturnStatement]:({params:n},s)=>{ze(o,s,{value:"return",params:n})},[y.Declaration]:(n,s)=>{o("(local "+n.value+" "+String(n.type),2,0),n.params.forEach(s),o(")",0,-2)},[y.ImmutableDeclaration]:(n,s)=>{let a=n.meta[Ie]!=null?"global":"local";if(n.type==="Memory"){let l=vn(n);o(`(memory ${l.initial}${l.max?` ${l.max}`:""})`)}else o(`(${a} `+n.value+" "+String(n.type),2,0),n.params.forEach(s),o(")",0,-2)},[y.StringLiteral]:n=>{o(`; string "${n.value}"`,0,0),o("(i32.const ??)",0,0)},[y.Type]:n=>{o(n.value)},[y.TypeCast]:(n,s)=>{let a=n.params[0],l=Sr(String(n.type),a.type);o("("+l.text,2),n.params.forEach(s),o(")",0,-2)},[y.Access]:({params:n},s)=>{o(";; unparsed",0,0),ze(o,s,{value:"access",params:n})},[y.MemoryAssignment]:(n,s)=>{o("("+String(n.type)+".store",2,0),n.params.forEach(s),o(")",0,-2)},[y.Assignment]:(n,s)=>{let[a,...l]=n.params,u=a.meta[Ie]!=null?"global":"local";o(`(set_${u} ${a.value}`,2),[y.ArraySubscript,y.Access].includes(a.Type)&&s(a),l.forEach(s),o(")",0,-2)},[y.TernaryExpression]:(n,s)=>{let[a,l,u]=n.params;o("(select",2),s(a),s(l),s(u),o(")",0,-2)},[y.IfThenElse]:(n,s)=>{let[a,l,...u]=n.params;o("(if",2),s(a),o("(then",2),s(l),o(")",0,-2),u.length>0&&(o("(else",2),u.forEach(s),o(")",0,-2)),o(")",0,-2)},[y.ObjectLiteral]:(n,s)=>{}}),$r=o=>{if(o==null)return"";let n=0,s=[],a=[];return k(ri((h,d=0,m=0)=>{n+=m,a.push(h),s.push(n+h.length),n+=d}))(o),a.reduce((h,d,m)=>(h+=d.padStart(s[m]," ")+`
`,h),"")},Or=Lt((o,n)=>{let s=n.meta[Nt],a=n.meta[Ie],l=s!=null?s:a;$(l!=null,`Undefined index for scope Operation. Possibly missing metadata. op: ${JSON.stringify(o)} node: ${$r(n)}`);let u=s!=null?o+"Local":o+"Global",h=[Number(l)];return{kind:F[u],params:h,debug:`${n.value}<${n.meta.ALIAS||n.type}>`}}),si=o=>{switch(o){case Qe.f32:return rt;case Qe.f64:return st;case Qe.i64:return nt;case Qe.i32:default:return tt}},bt=o=>typeof o=="string"&&Qe[o]!=null,Lr=o=>({mutable:o.meta[Pt]?0:1,type:si(o.type)}),oi=Or("Set"),Nr=Or("Get"),Wt="global";function Sn(o,{filename:n}){let s=o.meta[fn];if(s==null)throw new Error("Missing AST metadata!");let{types:a,functions:l,userTypes:u}=s,h=[];k({[y.Import]:(m,v)=>{k({[y.BinaryExpression]:(b,g)=>{let[w,N]=b.range;h.push(Ce("Using an 'as' import without a type.","A type for original import "+b.params[0].value+" is not defined nor could it be inferred.",{start:w,end:N},n,Wt))},[y.Identifier]:(b,g)=>{let[w,N]=b.range;h.push(Ce("Infered type not supplied.","Looks like you'd like to infer a type, but it was never provided by a linker. Non-concrete types cannot be compiled.",{start:w,end:N},n,Wt))},[y.Pair]:(b,g)=>{let w=b.params[1];if(!bt(w.value)&&a[w.value]==null){let[N,B]=w.range;h.push(Ce(`Undefined Type ${w.value}`,`Invalid Import. ${w.value} type does not exist`,{start:N,end:B},n,Wt))}}})(m)},[y.Struct]:(m,v)=>{},[y.ImmutableDeclaration]:(m,v)=>{},[y.Declaration]:(m,v)=>{let[b,g]=m.range;!bt(m.type)&&!a[m.type]&&!u[m.type]&&h.push(Ce(`Unknown type used in a declaration, "${String(m.type)}"`,"Variables must be assigned with a known type.",{start:b,end:g},n,Wt))},[y.FunctionDeclaration]:(m,v)=>{let b=`${m.value}()`;k({[y.Declaration]:(g,w)=>{let[N,B]=g.range;!bt(g.type)&&!a[g.type]&&!u[g.type]&&h.push(Ce(`Unknown type used in a declartion, "${String(g.type)}"`,"Variables must be assigned with a known type.",{start:N,end:B},n,b))},[y.Assignment]:g=>{let[w]=g.params,[N,B]=g.range;w.meta[Pt]&&h.push(Ce(`Cannot reassign a const variable ${w.value}`,"const variables cannot be reassigned, use let instead.",{start:N,end:B},n,b))},[y.ArraySubscript]:g=>{let[w]=g.params,[N,B]=g.range;h.push(Ce("Invalid subscript target",`Expected array type for ${w.value}, received ${w.type}`,{start:N,end:B},n,b))},[y.NativeMethod]:(g,w)=>{let{value:N}=g,[B={},U]=g.params,[z,Z]=g.range;B.value==="unreachable"&&(N.includes("store")||N.includes("load"))&&h.push(Ce("Cannot generate property access",`Cannot assign "${U.value}". Key is "${B.value}"`,{start:z,end:Z},n,b))},[y.ReturnStatement]:(g,w)=>{if(g.params.map(w),m.type==null)return;let[N]=g.params,[B]=g.range,U=N!=null?N.range[1]:g.range[1],z=g.type;ke(z)!==ke(m.type)&&h.push(Ce("Missing return value","Inconsistent return value. Expected "+m.type+" received "+String(z),{start:B,end:U},n,b))},[y.FunctionCall]:(g,w)=>{if(l[g.value]==null){let[N,B]=g.range;h.push(Ce("Undefined function reference",`${g.value} is not defined.`,{start:N,end:B},n,b))}},[y.IndirectFunctionCall]:(g,w)=>{let N=g.params[g.params.length-1],B=a[N.type];if(!bt(N.type)&&B==null){let[U,z]=g.range;h.push(Ce("Cannot make an indirect call without a valid function type",`${N.value} has type ${String(N.type)} which is not defined. Indirect calls must have pre-defined types.`,{start:U,end:z},n,b))}}})(m)}})(o);let d=h.length;if(d>0){let m=h.reduce((v,b)=>v+`
${b}
`,`Cannot generate WebAssembly for ${n}. ${d} problems.
`);throw new Error(m)}}let ue=(o,n)=>(Array.isArray(n)?o=[...o,...n]:o.push(n),o),ii=(o,n)=>{let s=o.params.map(fe(n)).reduce(ue,[]),a=o.meta[Pe];return s.push({kind:F.Call,params:[a],debug:`${o.value}<${o.type?o.type:"void"}>`}),s},ai=(o,n)=>{let s=o.params.map(fe(n)).reduce(ue,[]),a=o.meta[Nt],l=o.meta[_t];return $(a!=null,"Undefined local index, not a valid function pointer"),$(l!=null,"Variable is not of a valid function pointer type"),[...s,{kind:F.CallIndirect,params:[l,0]}]},ci=(o,n)=>{let s=o.params.map(fe(n)).reduce(ue,[]);return s.push({kind:Tr(I({},o,{type:o.type})),params:[]}),s},li=(o,n)=>{let s=o.params.map(fe(n)).reduce(ue,[]);return s.push({kind:F.Select,params:[]}),s},ui=(o,n)=>{let s=fe(n),[a,l,...u]=o.params;return[...[a].map(s).reduce(ue,[]),{kind:F.If,params:[64]},...[l].map(s).reduce(ue,[]),...u.map(s).reduce(ue,[]),{kind:F.End,params:[]}]},pi=o=>[{kind:F.i32Const,params:[Number(o.value)]}],fi=o=>{let n=o.params.filter(Boolean).map(fe(null)).reduce(ue,[]);return n.push({kind:F.Return,params:[]}),n},mi=(o,n)=>[o].map(fe(n)).reduce(ue,[]),hi=(o,n)=>{let s=o.params[0];if(s){let a=o.meta[Nt],l=bt(o.type)?o.type:Ne;return[...mi(I({},s,{type:l}),n),{kind:F.SetLocal,params:[a],debug:`${o.value}<${String(o.type)}>`}]}return[]},di=o=>{let[n,s]=o.params,a=[s].map(fe(null)).reduce(ue,[]);return a.push(oi(n)),a},yi=o=>{let[n,s]=o.params,a=[s].map(fe(null)).reduce(ue,[]);return a.push({kind:F.TeeLocal,params:[Number(n.meta.LOCAL_INDEX)],debug:`${n.value}<${String(n.meta.ALIAS||n.type)}>`}),a},_i=(o,n)=>{let s=[],a=fe(n),[l,u,...h]=o.params;return s.push.apply(s,[l].map(a).reduce(ue,[])),s.push({kind:F.Block,params:[64]}),s.push({kind:F.Loop,params:[64]}),s.push.apply(s,[u].map(a).reduce(ue,[])),s.push({kind:F.i32Eqz,params:[]}),s.push({kind:F.BrIf,params:[1]}),s.push.apply(s,h.map(a).reduce(ue,[])),s.push({kind:F.Br,params:[0]}),s.push({kind:F.End,params:[]}),s.push({kind:F.End,params:[]}),s},bi=(o,n)=>{let s=o.meta[pn];$(s,`Cannot generate typecast for node: ${JSON.stringify(o)}`);let{to:a,from:l}=s;return[...o.params.map(fe(n)).reduce(ue,[]),{kind:Sr(a,l),params:[]}]},gi=()=>[{kind:F.Br,params:[2]}];function vi(){return[]}let Si=(o,n)=>o.params.map(fe(n)).reduce(ue,[]),Ti=(o,n)=>[{kind:F.Else,params:[]},...o.params.map(fe(n)).reduce(ue,[])],Ei=(o,n)=>{let[s,a]=o.params,l={kind:F.Select,params:[]},u=[s].map(fe(n)).reduce(ue,[]);return o.value==="&&"?[...[a].map(fe(n)).reduce(ue,[]),{kind:F.i32Const,params:[0]},...u,l]:[...u,...[a].map(fe(n)).reduce(ue,[]),...u,l]},Pr={load8_s:0,load8_u:0,store8:0,load16_s:1,load16_u:1,store16:1,store32:2,load32_s:2,load32_u:2,store:2,load:2},xi={grow_memory:0,current_memory:0},Ai=(o,n)=>{let s=o.params.map(fe(n)).reduce(ue,[]),a=o.value.split(".").pop();if(Pr[a]==null)s.push({kind:gn[o.value],params:[xi[o.value]]});else{let l=Pr[a];s.push({kind:gn[o.value],params:[l,0]})}return s},wi=o=>{let n=F[String(o.type)+"Const"],s=(o.meta.SIGN||1)*Number(o.value);return[{kind:n,params:[s]}]},Ci={[y.FunctionCall]:ii,[y.IndirectFunctionCall]:ai,[y.Constant]:wi,[y.BinaryExpression]:ci,[y.TernaryExpression]:li,[y.IfThenElse]:ui,[y.Else]:Ti,[y.Select]:Ei,[y.Block]:Si,[y.Identifier]:Nr,[y.FunctionIdentifier]:Nr,[y.FunctionPointer]:pi,[y.ReturnStatement]:fi,[y.Declaration]:hi,[y.Assignment]:di,[y.AssignmentExpression]:yi,[y.Loop]:_i,[y.Break]:gi,[y.TypeCast]:bi,[y.Noop]:vi,[y.NativeMethod]:Ai},fe=Lt((o,n)=>{let s=Ci[n.Type];return $(s,`Unsupported Syntax Token. ${n.Type} "${n.value}"`),s(n,o)}),$i=o=>({functionIndex:o}),Tn=0,Vt=1,Jt=2,gt=3,Oi={Memory:Jt,Table:Vt};function Li(o){let n=o.meta[Pe],s=o.meta[Ie];if(s!=null){let a=Oi[String(o.type)]||gt;return{index:[Jt,Vt].includes(a)?0:s,kind:a,field:o.value}}return{index:n,kind:Tn,field:o.value}}let Ni=o=>{let n={max:0,initial:0};return k({[y.Pair]:({params:s})=>{let[{value:a},{value:l}]=s;n[a]=parseInt(l)}})(o),n};function Pi(o){let n={max:0,initial:0,type:"element"};return k({[y.Pair]:({params:s})=>{let[{value:a},{value:l}]=s;switch(a){case"initial":n.initial=parseInt(l);break;case"element":n.type=l;break;case"max":n.max=parseInt(l);break}}})(o),n}let Ii=o=>{let n=Lr(o),[s]=o.params;if(s!=null){let{value:a}=s;switch(n.type){case rt:case st:n.init=parseFloat(a);break;case tt:case nt:default:n.init=parseInt(a)}}return n},Ri=o=>{switch(o){case"Memory":return Jt;case"Table":return Vt;case"i32":case"f32":case"i64":case"f64":return gt;default:return Tn}},Bi=o=>{let n=o.value;return o.meta.AS!=null?o.meta.AS:n};function Mi(o){let[n,s]=o.params,{value:a}=s,l=[];return k({[y.Pair]:(u,h)=>{let[d,m]=u.params,v=Bi(d),{value:b}=m,g=Ri(b),w=(()=>{let B=m.meta[_t];return B||null})(),N=b==="Memory"?vn(m):{};l.push(I({module:a,field:v,global:g===gt,kind:g,type:ti[b],typeIndex:w},N))}})(n),l}let ot=o=>{switch(o){case"f32":return rt;case"f64":return st;case"i64":return nt;case"i32":case"Function":default:return tt}},Ir=o=>{let[n]=o.params,s=o.type?ot(o.type):null,a=[];return k({[y.Pair]:l=>{let u=l.params[1];$(u,"Undefined type in a argument expression"),a.push(ot(u.value))}})(n),{params:a,result:s,id:o.value}};function Fi(o){let n=o.value;$(typeof n=="string",`Generator: A type must have a valid string identifier, node: ${JSON.stringify(o)}`);let[s,a]=o.params,l=[];return k({[y.DeclType]:(u,h)=>{l.push(ot(u.value))},[y.Type]:(u,h)=>{l.push(ot(u.value))},[y.Identifier]:(u,h)=>{l.push(ot(u.value))}})(s),{id:n,params:l,result:a.type&&a.type!=="void"?ot(a.type):null}}function Ui(o,n){let s=n,a={},l=Object.entries(o).reduce((h,[d,m])=>(h.push({offset:Number(s),data:m}),a[d]=s,s+=m.size,h),[]),u=new le;return u.push(yn,s,String(s)),{data:[{offset:0,data:u},...l],map:a}}let Di=4,ji=o=>{let[n,s,...a]=o.params,l=o.meta[mn];$(a,"Cannot generate code for function without body"),$(l,"Cannot generate code for function without metadata");let{locals:u,argumentsCount:h}=l,d={code:[],locals:Object.keys(u).slice(h).map(m=>Lr(u[m])),debug:`Function ${o.value}`};return d.code=a.map(fe(d)).reduce(ue,[]),d};function En(o,n){let s={Version:n.version,Types:[],Start:[],Element:[],Code:[],Exports:[],Imports:[],Globals:[],Functions:[],Memory:[],Table:[],Artifacts:[],Data:[],Name:{module:n.filename,functions:[],locals:[]}},{statics:a}=o.meta[fn];n.linker!=null&&(a=I({},n.linker.statics,a));let{map:l,data:u}=Ui(a,Di);Object.keys(a).length>0&&(s.Data=u);let h=g=>{let w=Ir(g);return s.Types.findIndex(N=>{let B=N.params.length===w.params.length&&N.params.reduce((z,Z,K)=>z&&Z===w.params[K],!0),U=N.result===w.result;return B&&U})},d=g=>s.Element.findIndex(w=>w.functionIndex===g),m={},v=P({[y.Typedef]:(g,w)=>{let N=s.Types.findIndex(({id:U})=>U===g.value),B=s.Types[N];return B==null&&(N=s.Types.length,s.Types.push(Fi(g))),B=I({},g,{meta:I({},g.meta,{[_t]:N})}),m[g.value]={typeIndex:N,typeNode:B},B}})(P({[y.Import]:(g,w)=>g,[y.StringLiteral]:(g,w)=>{let{value:N}=g;return l[N]==null?g:I({},g,{value:String(l[N]),Type:y.Constant})},[y.StaticValueList]:g=>{let{value:w}=g;return I({},g,{value:String(l[w]),Type:y.Constant})}})(o)),b={[y.Typedef]:(g,w)=>g,[y.Export]:g=>{let[w]=g.params;s.Exports.push(Li(w))},[y.ImmutableDeclaration]:g=>{switch(g.type){case"Memory":s.Memory.push(Ni(g));break;case"Table":s.Table.push(Pi(g));break}},[y.Declaration]:g=>{g.meta[Ie]!=null&&s.Globals.push(Ii(g))},[y.Import]:g=>{s.Imports.push(...Mi(g))},[y.FunctionDeclaration]:g=>{let w=(()=>{let U=h(g);return U===-1?(s.Types.push(Ir(g)),s.Types.length-1):U})(),N=P({FunctionPointer(U){let Z=U.meta[Pe],K=d(Z);return K<0&&(K=s.Element.length,s.Element.push($i(Z))),U}})(g),B=g.meta[Pe];if($(B!=null,"Function index must be set"),s.Functions[B]=w,s.Code[B]=ji(N),N.value==="start"&&s.Start.push(B),n.encodeNames){s.Name.functions.push({index:B,name:g.value});let U=g.meta[mn];U!=null&&Object.keys(U.locals).length&&(s.Name.locals[B]={index:B,locals:Object.entries(U.locals).map(([z,Z])=>({name:z,index:Number(Z.meta["local/index"])}))})}}};return k(b)(v),s.Code=s.Code.filter(Boolean),s}let Rr=1,ki=1836278016;function zi(o){return new le().push(yn,ki,"\\0asm").push(yn,o,`version ${o}`)}let xn="varuint7",G="varuint32",vt="varint7",it="varint1",An="varint32",Br="varint64";function Ye(o,n,s){o.push(G,n.length,s);for(let a=0;a<n.length;a++)o.push(ce,n.charCodeAt(a),n[a]);return o}let Gi=o=>{let n=new le().push(G,o.length,"entry count");return o.forEach(s=>{switch(Ye(n,s.module,"module"),Ye(n,s.field,"field"),s.kind){case gt:{n.push(ce,gt,"Global"),n.push(ce,s.type,qt(s.type)),n.push(ce,0,"immutable");break}case Tn:{n.push(ce,s.kind,"Function"),n.push(G,s.typeIndex,"type index");break}case Vt:{n.push(ce,s.kind,"Table"),n.push(ce,Er,"function table types"),n.push(it,0,"has max value"),n.push(G,0,"iniital table size");break}case Jt:{n.push(ce,s.kind,"Memory"),n.push(it,!!s.max,"has no max"),n.push(G,s.initial,"initial memory size(PAGES)"),s.max&&n.push(G,s.max,"max memory size(PAGES)");break}}}),n},Yi=o=>{let n=new le;return n.push(G,o.length,"count"),o.forEach(({field:s,kind:a,index:l})=>{Ye(n,s,"field"),n.push(ce,a,"Global"),n.push(G,l,"index")}),n},qi=(o,{type:n,init:s,mutable:a})=>{switch(o.push(ce,n,qt(n)),o.push(ce,a,"mutable"),n){case tt:o.push(ce,F.i32Const.code,F.i32Const.text),o.push(An,s,`value (${s})`);break;case rt:o.push(ce,F.f32Const.code,F.f32Const.text),o.push(C,s,`value (${s})`);break;case st:o.push(ce,F.f64Const.code,F.f64Const.text),o.push(oe,s,`value (${s})`);break;case nt:o.push(ce,F.i64Const.code,F.i64Const.text),o.push(Br,s,`value (${s})`)}o.push(ce,F.End.code,"end")},Wi=o=>{let n=new le;return n.push(G,o.length,"count"),o.forEach(s=>qi(n,s)),n},Vi=o=>{o=o.filter(s=>s!==null);let n=new le;return n.push(G,o.length,"count"),o.forEach(s=>n.push(G,s,"type index")),n};function Ji(o){let n=new le;return n.push(G,o[0],"start function"),n}let Hi=o=>({functionIndex:n},s)=>{o.push(G,0,"table index"),o.push(ce,F.i32Const.code,"offset"),o.push(G,s,s.toString()),o.push(ce,F.End.code,"end"),o.push(G,1,"number of elements"),o.push(G,n,"function index")},Qi=o=>{let n=new le;return n.push(G,o.length,"count"),o.forEach(Hi(n)),n},Ki=(o,{params:n,result:s},a)=>{o.push(vt,xr,`func type (${a})`),o.push(G,n.length,"parameter count"),n.forEach(l=>o.push(vt,l,"param")),s?(o.push(it,1,"result count"),o.push(vt,s,`result type ${qt(s)}`)):o.push(it,0,"result count")},Xi=o=>{let n=new le;return n.push(G,o.length,"count"),o.forEach((s,a)=>Ki(n,s,a)),n},Zi=(o,n)=>{o.push(G,1,"number of locals of following type"),o.push(vt,n.type,`${qt(n.type)}`)},ea=(o,{locals:n,code:s,debug:a})=>{let l=new le;s.forEach(({kind:h,params:d,debug:m})=>{$(typeof h<"u",`Fatal error! Generated undefined opcode. debug code: ${JSON.stringify(m)}`),l.push(ce,h.code,`${h.text}  ${m||""}`),d.filter(v=>typeof v<"u").forEach(v=>{let b=G,g="i32.literal";if(h.code>=40&&h.code<=64)b=G,g="memory_immediate";else switch(h.result){case oe:b=oe,g="f64.literal";break;case C:b=C,g="f32.literal";break;case E:b=An,g="i32.literal";break;case L:b=Br,g="i64.literal";break;default:b=G}l.push(b,v,`${g}`)})});let u=new le;n.forEach(h=>Zi(u,h)),o.push(G,l.size+u.size+2,a),o.push(G,n.length,"locals count"),o.write(u),o.write(l),o.push(ce,F.End.code,"end")},ta=o=>{let n=new le;return n.push(G,o.length,"function count"),o.forEach(s=>ea(n,s)),n},na=(o,n)=>{o.push(it,n.max?1:0,"has no max"),o.push(G,n.initial,"initial memory size(PAGES)"),n.max&&o.push(G,n.max,"max memory size(PAGES)")},ra=o=>{let n=new le;return n.push(G,o.length,"count"),o.forEach(s=>na(n,s)),n},sa={anyfunc:112},oa=(o,n)=>{o.push(vt,sa[n.type],n.type),o.push(it,n.max?1:0,"has max"),o.push(G,n.initial,"initial table size"),n.max&&o.push(G,n.max,"max table size")};function ia(o){let n=new le;return n.push(G,o.length,"count"),o.forEach(s=>oa(n,s)),n}let aa=(o,n)=>{o.push(G,0,"memory index");let{offset:s,data:a}=n;o.push(ce,F.i32Const.code,F.i32Const.text),o.push(An,s,`segment offset (${s})`),o.push(ce,F.End.code,"end"),o.push(G,a.size,"segment size"),o.write(a)};function ca(o){let n=new le;n.push(G,o.length,"entries");for(let s=0,a=o.length;s<a;s++){let l=o[s];aa(n,l)}return n}let la=o=>{let n=new le;return Ye(n,o,`name_len: ${o}`),n},ua=o=>{let n=new le;return n.push(G,o.length,`count: ${String(o.length)}`),o.forEach(({index:s,name:a})=>{n.push(G,s,`index: ${String(s)}`),Ye(n,a,`name_len: ${a}`)}),n},pa=o=>{let n=new le;return n.push(G,o.length,`count: ${String(o.length)}`),o.forEach(({index:s,locals:a})=>{n.push(G,s,`function index: ${String(s)}`),n.push(G,a.length,`number of params and locals ${a.length}`),a.forEach(({index:l,name:u})=>{n.push(G,l,`index: ${String(l)}`),Ye(n,u,`name_len: ${u}`)})}),n},fa=o=>{let n=new le;Ye(n,"name","name_len: name");let s=la(o.module);n.push(xn,0,"name_type: Module"),n.push(G,s.size,"name_payload_len"),n.write(s);let a=ua(o.functions);n.push(xn,1,"name_type: Function"),n.push(G,a.size,"name_payload_len"),n.write(a);let l=pa(o.locals);return n.push(xn,2,"name_type: Locals"),n.push(G,l.size,"name_payload_len"),n.write(l),n},ma=1,ha=2,da=3,ya=4,_a=5,ba=6,ga=7,va=8,Sa=9,Ta=10,Ea=11,xa=0,Ee=({type:o,label:n,emitter:s})=>a=>{let l=a[n];if(!l||Array.isArray(l)&&!l.length)return null;let u=new le().push(ce,o,n+" section"),h=s(l);return u.push(G,h.size,"size"),u.write(h),u};var xe={type:Ee({type:ma,label:"Types",emitter:Xi}),imports:Ee({type:ha,label:"Imports",emitter:Gi}),function:Ee({type:da,label:"Functions",emitter:Vi}),table:Ee({type:ya,label:"Table",emitter:ia}),memory:Ee({type:_a,label:"Memory",emitter:ra}),exports:Ee({type:ga,label:"Exports",emitter:Yi}),globals:Ee({type:ba,label:"Globals",emitter:Wi}),start:Ee({type:va,label:"Start",emitter:Ji}),element:Ee({type:Sa,label:"Element",emitter:Qi}),code:Ee({type:Ta,label:"Code",emitter:ta}),data:Ee({type:Ea,label:"Data",emitter:ca}),name:Ee({type:xa,label:"Name",emitter:fa})};function wn(o,n){let a=new le().write(zi(o.Version)).write(xe.type(o)).write(xe.imports(o)).write(xe.function(o)).write(xe.table(o)).write(xe.memory(o)).write(xe.globals(o)).write(xe.exports(o)).write(xe.start(o)).write(xe.element(o)).write(xe.code(o)).write(xe.data(o));return n.encodeNames?a.write(xe.name(o)):a}let Aa=(o,n=0,s)=>{let a=0;return o.data.slice(n,s).map(({type:l,value:u,debug:h})=>{let d=`${a.toString()} 0x${a.toString(16)}`.padStart(6," ").padEnd(o.data.length.toString().length+1),m;Array.isArray(u)?m=u.map(b=>b.toString(16)).join().padStart(16):m=u.toString(16).padStart(16);let v=`${d}: ${m} ; ${h}`;return a+=_n[l]||u.length,v}).join(`
`)+`
 ============ fin =============`},Cn=o=>{let n=s=>{try{return o(`function fragment() {
        ${s}
      }`).params[0].params[2].params[0]}catch(a){throw new Error(`PANIC - Invalid fragment input:

${s}

Parse Error: ${a.stack}`)}};return(s,...a)=>{let l=!1,u=s.reduce((d,m,v)=>{let b=a[v];return b!=null&&typeof b!="object"?d+=m+String(b):b!=null?(l=!0,d+=m+`$$rep_${v}`):d+=m},""),h=n(u);return l?P({Identifier(d){let{value:m}=d;return m.indexOf("$$rep_")?d:a[Number(m.replace("$$rep_",""))]}})(h):h}},wa="0.21.0",Ca=(o,n)=>{let{version:s=Rr,encodeNames:a=!1,lines:l=o.split(`
`),filename:u="unknown",extensions:h=[]}=n||{},d=un([]),m=Cn(d),v={version:s,encodeNames:a,lines:l,filename:u,extensions:h},b=d(o),g=bn(b,[],I({},v,{parser:d,stmt:m}));Sn(g,{lines:l,filename:u});let w=En(g,v);return wn(w,{version:s,encodeNames:a,filename:u,lines:l})},$a=(o,n)=>{let{filename:s="unknown.walt",extensions:a=[],linker:l,encodeNames:u=!1}=n||{},h={filename:s,lines:o.split(`
`),version:Rr,encodeNames:u},d=a.reduce((B,U)=>{let z=I({semantics:Z=>({}),grammar:()=>({ParserRules:[]})},U(h));return B.grammar.push(z.grammar),B.semantics.push(z.semantics),B},{grammar:[],semantics:[]}),m=un(d.grammar),v=Cn(m),b=m(o),g=bn(b,d.semantics,{parser:m,stmt:v});Sn(g,h);let w=En(g,I({},h,{linker:l})),N=wn(w,h);return{wasm:N,buffer(){return N.buffer()},ast:b,semanticAST:g}};return e.makeParser=un,e.makeFragment=Cn,e.semantics=bn,e.validate=Sn,e.generator=En,e.emitter=wn,e.prettyPrintNode=$r,e.debug=Aa,e.stringEncoder=vr,e.stringDecoder=Do,e.walkNode=k,e.mapNode=P,e.VERSION=wa,e.getIR=Ca,e.compile=$a,e}({}),Qn=uc;var pc=e=>Qn.compile(e).buffer(),fc=e=>e.trim().length?JSON.stringify([...new Uint8Array(Qn.compile(e).buffer())]):"[]",mc=e=>{let t={};return Object.getOwnPropertyNames(Object.getPrototypeOf(e)).filter(r=>!["constructor","nanoapp","initial_state","initial_component","css","__walt","__src","init"].includes(r)).map(r=>t[r]=e[r].bind(e)),t},hc=(e,t)=>{if(e.length){let r=new WebAssembly.Table({initial:10,element:"anyfunc"}),i=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array(e).buffer),{tag:mc(t),console,javascript:{table:r,setTimeout:(p,f)=>window.setTimeout(r.get(p),f),setInterval}}).exports,c={};return Object.keys(i).map(p=>c[p]=i[p]),c}return{}},xs={name:"Walt",uniqueBlock:"walt",compileWalt:fc,compile:pc,initWalt:hc};function dc(e){return e;function t(p,f,S){var _;return S<0?S+=1:S>1&&(S-=1),6*S<1?_=p+(f-p)*S*6:2*S<1?_=f:3*S<2?_=p+(f-p)*(2/3-S)*6:_=p,255*_}function r(p,f,S){var _,x,P,R,k,V,$=Math;return f/=100,S/=100,f?(S<=.5?x=S*(f+1):x=S+f-S*f,_=S*2-x,P=p/360,R=$.ceil(t(_,x,P+1/3)),k=$.ceil(t(_,x,P)),V=$.ceil(t(_,x,P-1/3))):R=k=V=S*255,{r:R,g:k,b:V}}function i(p,f,S){return"#"+((1<<24)+(1*p<<16)+(1*f<<8)+1*S).toString(16).slice(1)}var c}var As=dc;var ws={name:"min.css",processStyle:As};var yc={walt:xs,mincss:ws},He=yc;var ht=e=>class extends e{baseInit(){this.component=this.initial_component,Hn(this.component),this.animate=Se.animate,this.Spring=Ct,this.window_events={},this.checkStateObjectChanges={},this.state=this.initial_state,this.__walt&&(this.walt=He.walt.initWalt(this.__walt,this,this.state)),delete this.__proto__.baseInit}async connectedCallback(){if(this.renderer&&!this.__rendererHTML&&this.__rendererName!==this.parent.__rendererName)throw`ui.js diffferent renderers ${this.__rendererName} and ${this.parent.__rendererName}`;Fe(this.document,this.component,{state:this.state}),this.is_connected=!0,this.connected&&this.connected()}async disconnectedCallback(){this.disconnected&&await this.disconnected(),Object.keys(this.window_events).forEach(r=>this.window_events[r].forEach(i=>window.removeEventListener(r,i.cb)))}render(){this.is_connected&&Xt(this.document,this.component,{state:this.state})}attributeChangedCallback(r,i,c){if(typeof c=="object"){if(Array.isArray(this.state[r])&&Array.isArray(c)&&this.state[r].length==0&&c.length==0||this.checkStateObjectChanges[r]&&JSON.stringify(this.state[r])===JSON.stringify(c))return}else if(this.state[r]===c)return;this.state[r]=c,this.changed&&this.changed({[r]:c}),this.render()}hasEventHandler(r){return this._events?!!this._events[r]:!!this.getAttribute("on"+r)}get cookies(){return typeof document<"u"?Object.assign({},...document.cookie.split(";").filter(r=>r).map(r=>r.split("=")).map(([r,i])=>({[r.trim()]:(i+"").trim()}))):{}}get hash(){return typeof window<"u"?window.location.hash.substr(1).split("/"):[]}on(r,i,c){this.window_events[r]||(this.window_events[r]=[]);let p=this.window_events[r].find(S=>S.callback===i),f=(...S)=>i.call(this,...S);p||(this.window_events[r].push({callback:i,cb:f}),window.addEventListener(r,f,c))}off(r,i){if(!this.window_events[r])return;let c=this.window_events[r].findIndex(p=>p.callback===i);c!==-1&&(window.removeEventListener(r,this.window_events[r][c].cb),this.window_events[r].splice(c,1))}};var on=e=>class extends e{htmlInit(){if(this.animateCSS=(r,{element:i,unit:c,from:p,to:f,duration:S,easing:_,done:x})=>{i._styles[r]=Se.animateCSS(i||this,r,c===void 0?"":c,p||0,f,S||1e3,_,()=>{i._styleV[r]=f+c,x&&x()})},this.css.length){let r=document.createElement("style");r.textContent=this.css,this.ShadowDOM?this.document.append(r):setTimeout(()=>{this.document.append(r)},0)}delete this.__proto__.htmlInit}setAttribute(r,i){this.attributeChangedCallback(r,void 0,i),this.AddAttributes&&typeof i!="object"&&super.setAttribute(r,i)}$(r){return this.document.querySelector(r)}$$(r){return this.document.querySelectorAll(r)}emitNative(r,i){console.warn(`this.emitNative() is deprecated. Use this.emit(). "${this.__src}"`),this.emit(r,i)}emit(r,i){this.dispatchEvent(new CustomEvent(r,{cancelable:!1,bubbles:!1,detail:i}))}};var $t;if(typeof window<"u"){class e extends HTMLElement{constructor(){super(),this.AddAttributes=!1,this.ShadowDOM="open",this.MutationObserverOptions={childList:!0},this.baseInit(),this.init&&this.init(),this.document=["open","closed"].includes(this.ShadowDOM)?this.attachShadow({mode:this.ShadowDOM}):this,this.htmlInit(),this.slotChange&&(this._slot_observer=new MutationObserver(r=>this.slotChange(r)),this._slot_observer.observe(this,this.MutationObserverOptions))}get slotted(){let r=this.document.querySelector("slot");return r?r.assignedElements():[]}get element(){return this.ShadowDOM?this.document.host:this.document}}$t=class extends on(ht(e)){}}var Kn=class{constructor(){if(this.document=document.querySelector(this.container),!this.document)throw`i.js: target container "${this.container}" not found`;this.baseInit(),this.htmlInit(),this.init&&this.init(),this.connectedCallback()}get element(){return this.document}},an=class extends on(ht(Kn)){};var Xn=class{constructor(t,r){if(this._BASE_ELEMENT=!0,this.document={_childNodes:[],__rendererName:this.__rendererName},this._childNodes=[],this._eventListeners={},this.parent=t,this.baseInit(),this.renderer&&!this.__rendererHTML&&this.__rendererName!==this.parent.__rendererName)throw`ui.js diffferent renderers ${this.__rendererName} and ${this.parent.__rendererName}`;this.onReady=new Promise(async i=>{var c,p,f;(c=this.renderer)!=null&&c.onReady&&await this.renderer.onReady,(p=this.parent)!=null&&p.onReady&&await this.parent.onReady,(f=this.renderer)!=null&&f.onConnect&&await this.renderer.onConnect(this),this.document.renderer=this.renderer,this.document.parent=this.document,this.init&&await this.init(),Fe(this.document,this.component,{state:this.state}),i(),this.is_connected=!0,this.connected&&await this.connected()})}setAttribute(t,r){this.attributeChangedCallback(t,void 0,r)}emit(t,r){this._eventListeners[t]&&this._eventListeners[t].forEach(i=>i.cb(new CustomEvent(t,{cancelable:!1,bubbles:!1,detail:r})))}addEventListener(t,r,i){this._eventListeners[t]||(this._eventListeners[t]=[]);let c=this._eventListeners[t].find(f=>f.callback===r),p=(...f)=>r.call(this,...f);c||this._eventListeners[t].push({callback:r,cb:p})}removeEventListener(t,r){if(!this._eventListeners[t])return;let i=this._eventListeners[t].findIndex(c=>c.callback===r);i!==-1&&this._eventListeners[t].splice(i,1)}async remove(){for(await this.disconnectedCallback();this.document._childNodes.length;)await this.document._childNodes[this.document._childNodes.length-1].remove();this.renderer.onDisconnect&&await this.renderer.onDisconnect(this);let t=this.parent._childNodes.findIndex(r=>r==this);if(t!==-1)this.parent._childNodes.splice(t,1);else throw"Element not found"}after(t){this.renderer.insertAfter(this,t)}before(t){this.renderer.insertBefore(this,t)}},cn=class extends ht(Xn){};var Cs=(e,t=0)=>{for(var r=3735928559^t,i=1103547991^t,c=0,p;c<e.length;c++)p=e.charCodeAt(c),r=Math.imul(r^p,2654435761),i=Math.imul(i^p,1597334677);return r=Math.imul(r^r>>>16,2246822507)^Math.imul(i^i>>>13,3266489909),i=Math.imul(i^i>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),4294967296*(2097151&i)+(r>>>0)};function Ot(e,t){return"ui-"+String(Cs(t||e.trim())).replaceAll("-","i")}var Zn={},_c=e=>e.split("-").map(t=>t.slice(0,1).toUpperCase()+t.slice(1)).join(""),bc=e=>((t,r)=>JSON.stringify(e,(i,c)=>typeof c=="function"?r.push(c)&&t:c).replace(new RegExp('"'+t+'"',"g"),i=>r.shift()))("____"+rs(50)+"____",[]),gc=(e,t)=>{if(Zn[e])return Zn[e];let r=URL.createObjectURL(new Blob([String.raw({raw:t})],{type:"text/javascript"}));return Zn[e]=r,r},er=(e,t,r,i)=>e.reduce((c,p)=>{let f=t?p.path[0]==="@"?p.path:"i.js:"+(p.path[0]==="/"?r:r+i)+"/"+p.path:gc(p.path,p.src);return p.type==="*"?c+"const "+p.import+" = {...(await import(`"+f+"`))};\n":p.type==="object"?c+"const "+p.import+" =  (await import(`"+f+"`));\n":c+"const "+p.import+" =  (await import(`"+f+"`)).default;\n"},"");function tr(e,t,{inFunc:r=!1,parent:i}){let c=Object.values(He).filter($=>$.processStyle).reduce(($,he)=>he.processStyle($),e.style||""),p=e.walt?He.walt.compileWalt(e.walt):"undefined",f=`{${(e.state||"").trim()}}`,S=t!=="customElement"?"":new Function(`return 'static get observedAttributes() { return '+JSON.stringify(Object.keys(${f}))+' }'`)(),_=_c(e.name),x=bc(Ts(e.template,e.tag||[])),P=e.container?`get container()         { return "${e.container}" }`:"";var R="";if(e.renderer){let $=e.renderer[0].split(" ");if(R='get __rendererName(){ return "'+$[0]+'" }',$.length==2){var k=!0;R+=`
get __rendererHTML(){ return true }`}else R+=`
get renderer(){ return this.parent?.renderer }`}let V=`

        ${e.static||""};
        class ${_} extends ${t} {
            ${S}
            get nanoapp()           { return ${JSON.stringify(e.nanoapp)} }
            get initial_state()     { return ${f} }
            get initial_component() { return ${x} }
            get css()               { return \`${c}\`; }
            get __walt()            { return ${p} }
            get __src()             { return "${e.src}" }
            ${R}
            ${P}
            ${e.class||""}
        };
    `;switch(t){case"customElement":let $=`
                ${e.import?er(e.import,e.nodePath,e.BASE_URL,e.path):""}
                if(!customElements.get('${e.name}')) {
                    ${V}
                    customElements.define('${e.name}', ${_});
                    window['UIjs'].tags['${e.name}'] = true;
                };`;return r?`;(async () => {${$}})();`:$;case"uiElement":let he=`
                ${e.import?er(e.import,e.nodePath,e.BASE_URL,e.path):""}
                ${V} return new ${_}("${"parentparentparent:"+i}");`;return r?`;(async () => {${he}})();`:he;case"baseElement":let ee=`
                ${e.import?er(e.import,e.nodePath,e.BASE_URL,e.path):""}
                ${V} ;window['UIjs'].tags['${e.name}'] = ${_};`;return r?`;(async () => {${ee}})();`:ee}}async function Ls(e,t,r){let i=Ot(e.innerText);await yt(e.innerText,{name:i,path:t,nanoapp:r}),e.replaceWith(document.createElement(i))}async function nr(e,t,r,i,c,p){await yt(e,{name:t,path:r,nanoapp:i,src:p})}function $s(e,t){return e.startsWith("/https://")&&(e=e.replace("/https://","https://")),typeof window<"u"&&window.nanoapp_base_path&&!e.startsWith(window.nanoapp_base_path)?window.nanoapp_base_path+"/app"+e:e}async function Ns(e,t){if(window.document.location.protocol=="file:"){console.error(`WARNING!!! ui.js cannot fetch external resources from a 'local' filesystem: "file://${e}"`);var r=await fetch($s(e,t),{mode:"no-cors"}).catch(i=>!1)}else var r=await fetch($s(e,t)).catch(c=>!1);return r}async function Os(e,t,r){if(t)return await t(e);let i=await Ns(e,r);if(i===!1)throw"i.js  \u2764\uFE0F error loading "+e;return(await i.text()).trim()}async function rr(e,t,r="",i){if(Me[e])return!0;let c=t.substr(-4)===".tag"?t:t+".tag",p=t[0]!=="/"?dt(r+c):c,f=await Ns(p,i);if(f===!1)throw"i.js  \u2764\uFE0F error loading "+c;let S=p.substring(0,p.lastIndexOf("/"))+"/";await nr(await f.text(),e,S,i,S,t)}async function Ps(e,t,r){await yt(e.innerText,{name:Ot(e.innerText),path:r,container:t})}function dt(e){return typeof window>"u"?e:new URL(e,document.baseURI).pathname}async function sr({source:e,path:t,keepName:r,nodeFetch:i,nodePath:c,BASE_URL:p}){let f=r?t.split("/").pop().split(".")[0]:Ot(t);return{name:f,compiled:await yt(e,{name:f,path:t.substring(0,t.lastIndexOf("/"))+"/",bundle:!0,nodeFetch:i,nodePath:c,BASE_URL:p})}}async function yt(e,t={}){let r=await Es(e);if(!t.name)throw"name is undefined !!!";r.name=t.name||"i-component",r.path=t.path,r.src=t.src,r.container=t.container||"",r.nodePath=t.nodePath?t.nodePath:void 0,r.BASE_URL=t.BASE_URL,r.nanoapp=t.nanoapp||[];let i=t.nodeFetch||void 0;var c="";if(r.style&&(r.style=r.style.trim(),r.style.length&&(c=r.style)),r.css)for(let p of r.css){let f=p[0]!=="/"?dt(r.path+p):p,S=await Os(f,i,r.nanoapp);S.length&&(c+=`
`+S)}if(r.style=c.replaceAll("`","`").trim(),r.tag)for(let p of r.tag){let f=p.path;f=f.substr(-4)===".tag"?f:f+".tag",i?f=dt(f[0]==="/"?f:r.path+f):f=dt(p.path[0]==="/"?f:r.path+f);let S=Ot(f);if(p.name=S,i)p.src=await i(f);else{let _=r.nanoapp&&r.nanoapp.children&&r.nanoapp.children.find(x=>"@"+x.alias===p.alias);_&&(f.startsWith("/!"+_.alias+".tag")&&f.split("/").length==2?f=window.nanoapp_base_path+f.replace("/!"+_.alias+".tag","/imports/"+_.child_release+"/index.tag"):f.startsWith("/!"+_.alias+"/")&&(f=window.nanoapp_base_path+f.replace("/!"+_.alias+"/","/imports/"+_.child_release+"/"))),await rr(S,f,r.path,_||r.nanoapp)}}if(r.import&&!i)for(let p of r.import){let f=p.path[0]!=="/"?dt(r.path+p.path):p.path;p.path=f;let S=await Os(f,i,r.nanoapp);p.src=S}if(Me[r.name]=!0,r.renderer&&r.renderer[0].split(" ").length==1){let p=tr(r,"baseElement",{inFunc:!1});return await new tn("baseElement",p)(cn)}else if(r.container){let p=tr(r,"uiElement",{inFunc:!1});return await new tn("uiElement",p)(an)}else{let p=tr(r,"customElement",{inFunc:!0});if(t.bundle){if(r.tag){let f="";for(let S of r.tag)if(Me[S.name])console.log(`              <${S.name}> skipped`);else{let _=S.path.substr(-4)===".tag"?S.path:S.path+".tag";_[0]!=="/"&&(_=r.path+_);let{name:x,compiled:P}=await sr({source:S.src,path:_,name:S.name,nodePath:dt(r.nodePath+r.path),BASE_URL:r.BASE_URL,nodeFetch:i});f+=P}return f+p}return p}await new tn("customElement",p)($t)}}function vc(e,t){e.innerText.trim().length&&console.warn(`ui.js warning: contents of "<script type=ui ${t.map(r=>r.name).join(" ")}> will be ignored"`)}function Is(e,t){e.innerText.trim().length||console.warn(`ui.js warning: empty "<script type=ui ${t.map(r=>r.name).join(" ")}>"`)}async function Rs(){let e=Array.from(document.querySelectorAll('script[type="ui"],script[type="i"]'));try{for(let t of e){let r=window.location.pathname,i=r.substring(0,r.lastIndexOf("/"))+"/",c=Array.prototype.slice.call(t.attributes).map(S=>({name:S.name,value:t.getAttribute(S.name).trim()})),p=c.find(S=>S.name==="target"&&S.value.length);if(p){c.length>2&&console.warn(`ui.js warning: all other attributes for "<script type=ui target="${p.value}"> will be ignored"`),await Ps(t,p.value,i),t.remove();continue}let f=c.filter(S=>S.name.includes("-"));if(f.length>1)throw`ui.js ERROR: more then one attribute with hyphens "<script ${f.map(S=>S.name).join(" ")}>"`;f.length===1?(f[0].value?(vc(t,c),await rr(f[0].name,f[0].value,i,typeof window<"u"&&window.nanoapp_dependencies)):(Is(t,c),await nr(t.innerText,f[0].name,i,typeof window<"u"&&window.nanoapp_dependencies)),t.remove()):(Is(t,c),await Ls(t,i))}}catch(t){throw new Ht(t)}}var or="0.7.6-dev";!or.endsWith("-dev")&&console.log(`ui.js \u2764\uFE0F ${or} alpha experiment. Make user interfaces great again!`);var Bs={VERSION:or,tags:Me,customElement:$t,createTag:yt,compile:sr,plugins:He},dp=Bs;typeof window<"u"&&(window.UIjs=Bs,document.addEventListener("DOMContentLoaded",Rs));export{or as VERSION,sr as compile,yt as createTag,$t as customElement,dp as default,He as plugins,Me as tags};
=======
// src/compiler/nanoid.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
var nanoid = (size = 21) => {
  let id = "";
  let i = size;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
var nanoid_default = nanoid;

// src/parser/parseBrackets.js
var ParseError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "i.js \u2764\uFE0F  brackets parse ERROR";
  }
};
function closeBracket({ open, close, pos, nodes }, endPos, text) {
  return {
    nodeType: "bracket",
    open,
    close,
    nodes,
    pos: Object.assign({}, pos, { end: endPos }),
    content: text.substring(pos.start, endPos + 1),
    innerContent: text.substring(pos.start + 1, endPos)
  };
}
function toLibQuote(quoteOpts) {
  const quotes = /* @__PURE__ */ new Map();
  quoteOpts.forEach(([start, end = start]) => quotes.set(start, end));
  return { quotes };
}
function toLib(pairs) {
  const opens = {};
  const closes = {};
  pairs.forEach(([open, close]) => {
    closes[open] = close;
    opens[close] = open;
  });
  return { opens, closes };
}
function addText(p) {
  const { text, parent, start, end, opt } = p;
  if (start === end && !opt.includeEmpty)
    return;
  const escapers = opt.pairs.reduce((p2, c) => p2.concat(c.split("")), []).map((v) => `${opt.escape}${v}`);
  const delEscape = (text2) => escapers.reduce((p2, c) => p2.split(c).join(c[1]), text2);
  const depth = parent.pos.depth + 1;
  parent.nodes.push({
    nodeType: "text",
    pos: { start, end, depth },
    content: delEscape(text.substring(start, end))
  });
}
var safePop = (arr) => {
  const item = arr.pop();
  if (item === void 0)
    throw new ParseError(`LogicError :)`);
  return item;
};
function parseBrackets_default(text, options) {
  const defaultOptions = {
    pairs: ["()", "{}", "[]"],
    nestMax: 100,
    escape: "\\",
    skip: false,
    includeEmpty: false,
    quotes: [`"`, `'`, "`"]
  };
  const opt = Object.assign(defaultOptions, options || {});
  const { pairs, nestMax, escape, skip } = opt;
  const { opens, closes } = toLib(pairs);
  const { quotes } = toLibQuote(opt.quotes);
  const ns = [{ nodeType: "root", nodes: [], pos: { start: 0, end: 0, depth: -1 }, content: text }];
  let p = 0;
  let insideQuote = null;
  let quoteStart = 0;
  for (let i = 0; i < text.length; i++) {
    const parent2 = safePop(ns);
    const c = text[i];
    const atEscape = i > 0 && text[i - 1] === escape;
    if (skip && ["{", "}", "(", ")", "[", "]"].includes(c) && parent2.nodeType === "root") {
      ns.push(parent2);
    } else if (skip && ["{", "(", "["].includes(parent2.open) && (c === "<" || c === ">")) {
      ns.push(parent2);
    } else if (atEscape) {
      ns.push(parent2);
    } else if (insideQuote !== null) {
      if (insideQuote === c)
        insideQuote = null;
      ns.push(parent2);
    } else if (quotes.has(c)) {
      insideQuote = quotes.get(c);
      quoteStart = i;
      ns.push(parent2);
    } else if (closes[c] !== void 0) {
      if (ns.length >= nestMax)
        throw new ParseError(`over nest max limit. options: { nestMax: '${opt.nestMax}' }`);
      addText({ text, parent: parent2, start: p, end: i, opt });
      ns.push(parent2);
      ns.push({
        nodeType: "bracket-open",
        pos: { start: i, depth: parent2.pos.depth + 1 },
        open: c,
        close: closes[c],
        nodes: []
      });
      p = i + 1;
    } else if (opens[c] !== void 0) {
      if (parent2.nodeType === "root" || opens[c] !== parent2.open)
        throw new ParseError(`404 pair '${opens[c]}' :${i}`);
      const parent22 = safePop(ns);
      addText({ text, parent: parent2, start: p, end: i, opt });
      const closedNode = closeBracket(parent2, i, text);
      parent22.nodes.push(closedNode);
      ns.push(parent22);
      p = i + 1;
    } else {
      ns.push(parent2);
    }
  }
  if (insideQuote !== null) {
    throw new ParseError(`unclosed quote ${insideQuote} near "...${text.substring(p - 20, p + 30)}..."`);
  }
  const parent = safePop(ns);
  if (parent.nodeType !== "root")
    throw new ParseError(`404 pair '${parent.open}' :${parent.pos.start}`);
  addText({ text, parent, start: p, end: text.length, opt });
  return parent.nodes;
}

// src/parser/split.js
function splitArgs(str) {
  return [...str].reduce((p, c) => {
    if (!p.quote) {
      if (c === "=") {
        if (p.a[p.a.length - 1].length)
          p.a.push("=");
        else
          p.a[p.a.length - 1] = "=";
      } else if (c === " ") {
        if (p.a[p.a.length - 1] !== "=" && p.a[p.a.length - 1].length)
          p.a.push("");
      } else {
        if (['"', "'", "`"].includes(c))
          p.quote = c;
        p.a[p.a.length - 1] += c;
      }
    } else {
      if (c === p.quote)
        p.quote = void 0;
      p.a[p.a.length - 1] += c;
    }
    return p;
  }, { a: [""] }).a;
}
function splitByChar(str, char = "|", skipEmpty = false) {
  const splitted = [...str].reduce((p, c) => {
    if (!p.quote) {
      if (c === char) {
        p.a.push("");
      } else {
        if (['"', "'", "`"].includes(c))
          p.quote = c;
        p.a[p.a.length - 1] += c;
      }
    } else {
      if (c === p.quote)
        p.quote = void 0;
      p.a[p.a.length - 1] += c;
    }
    return p;
  }, { a: [""] }).a;
  return skipEmpty ? splitted.filter((i) => i) : splitted;
}
function splitByLast(str, delimiter = "|") {
  var lastIndex = str.lastIndexOf(delimiter);
  return [str.substr(0, lastIndex), str.substr(lastIndex + 1)];
}

// src/parser/parseAttributes.js
function isText(text) {
  if (['"', "'"].includes(text[0]) && text[0] === text[text.length - 1]) {
    var i = 1;
    while (i < text.length - 1) {
      if (text[i] === text[0] && text[i - 1] !== "\\")
        return false;
      i++;
    }
    return true;
  }
  return false;
}
function mergeAttributes(items) {
  items.filter((i) => i.opts && i.opts.length).forEach((item) => {
    item.opts2 = {};
    const loop = item.opts.find((x) => x.type === "loop");
    if (loop) {
      const key = loop.key;
      item.opts2.key = new Function(`return ${key}`)();
      const a = loop.value.split(" as ");
      if (!a[1])
        throw `Alias for the loop not defined`;
      const b = a[1].split(",");
      item.opts2.loop_fn = a[0].trim();
      item.opts2.loop_alias = b[0].trim();
      if (b[1])
        item.opts2.loop_key_alias = b[1].trim();
    }
    const text = item.opts.find((x) => x.type === "text");
    if (text) {
      if (isText(text.value)) {
        item.opts2.text = text.value.substring(1, text.value.length - 1);
      } else {
        item.opts2.textFn = text.value;
      }
    }
    const html = item.opts.find((x) => x.type === "html");
    if (html) {
      if (isText(html.value)) {
        item.opts2.html = html.value.substring(1, html.value.length - 1);
      } else {
        item.opts2.htmlFn = html.value;
      }
    }
    ["if", "style", "attrs", "enterStyles", "updateStyles", "exitStyles", "enterAttrs", "updateAttrs", "exitAttrs"].forEach((x) => {
      const block = item.opts.find((y) => y.type === x);
      if (block)
        item.opts2[x] = block.value;
    });
    const eventCallbacks = item.opts.filter((x) => x.type === "eventCallback");
    eventCallbacks.forEach((event) => {
      if (!item.opts2.events)
        item.opts2.events = {};
      const name = event.key.substr(1);
      if (item.opts2.events[name])
        throw `ui.js compile error: Duplicate event name "${name}"`;
      if (event.value[0] === "(")
        console.warn(`"${event.key}(" is deprecated. Use "${event.key}{" inside "${item.content.length > 40 ? item.content.substring(0, 40) + "..." : item.content}" declaration`);
      event.value = event.value[0] === "(" ? event.value.substring(1, event.value.length - 1).trim() : event.value.trim();
      if (event.value[0] === "{") {
        event.value = event.value.substring(0, event.value.length - 1) + ";this.render()}";
      } else {
        event.value = "(" + event.value + ")==this.render()";
      }
      item.opts2.events[name] = event.value;
    });
    const eventBinds = item.opts.filter((x) => x.type === "eventBind" || x.type === "eventBindSelfNamed");
    eventBinds.forEach((event) => {
      if (!item.opts2.events)
        item.opts2.events = {};
      const name = event.key.substr(1);
      if (item.opts2.events[name])
        throw `ui.js compile error: Duplicate event name "${name}"`;
      item.opts2.events[name] = new Function(`return (...args) => this.${event.value}(...args)`)();
    });
    const eventCallFunctions = item.opts.filter((x) => x.type === "eventCallFunction");
    eventCallFunctions.forEach((event) => {
      if (!item.opts2.events)
        item.opts2.events = {};
      const name = event.key.substr(1);
      if (item.opts2.events[name])
        throw `ui.js compile error: Duplicate event name "${name}"`;
      item.opts2.events[name] = `${event.value}${event.args}`;
    });
  });
  items.filter((i) => i.opts && i.opts.length).forEach((item) => {
    if (!item.opts2)
      item.opts2 = {};
    if (!item.opts2.attrs2) {
      item.opts2.attrs2 = {};
      item.opts2.attrsB = {};
      item.opts2.attrsR = {};
    }
    const booleanAttributes = item.opts.filter((x) => x.type === "booleanAttribute");
    booleanAttributes.forEach((attr) => {
      if (item.opts2.attrs2[attr.key]) {
        console.warn(`ui.js compile warning: direct attibute "${attr.key}" override attrs({...${attr.key}...}) declaration in tag ""!`);
      }
      item.opts2.attrs2[attr.key] = attr.key;
      item.opts2.attrsB[attr.key] = true;
    });
    const stringAttributes = item.opts.filter((x) => x.type === "stringAttribute");
    stringAttributes.forEach((attr) => {
      if (item.opts2.attrs2[attr.key]) {
        console.warn(`ui.js compile warning: direct attibute "${attr.key}" override attrs({...${attr.key}...}) declaration in tag ""!`);
      }
      item.opts2.attrs2[attr.key] = attr.value;
    });
    const jsAttributes = item.opts.filter((x) => x.type === "jsAttribute");
    jsAttributes.forEach((attr) => {
      if (attr.key[0] === "%") {
        var key = attr.key.substr(1);
        item.opts2.attrsR[key] = attr.value;
      } else {
        var key = attr.key;
      }
      if (item.opts2.attrs2[key]) {
        console.warn(`ui.js compile warning: direct attibute "${key}" override attrs({...${key}...}) declaration in tag ""!`);
      }
      item.opts2.attrs2[key] = attr.value.endsWith("%") ? attr.value : attr;
    });
  });
  items.forEach((item) => {
    if (item.opts2) {
      if (item.opts2.attrs2 && !Object.keys(item.opts2.attrs2).length) {
        delete item.opts2.attrs2;
        delete item.opts2.attrsB;
      }
    }
    if (item.opts2 && item.opts2.events && !Object.keys(item.opts2.events).length)
      delete item.opts2.events;
  });
  return items;
}
function propsBlock({ AAA, item, tag, a }, block = "enter", type = "enterStyles") {
  if (a === block && AAA.length) {
    const c = AAA.shift().content;
    if (c[0] === "(") {
      if (item.opts.find((x) => x.type === block)) {
        throw `ui.js template parse error: duplicate ${block}() inside "<${tag}>" declaration`;
      }
      item.opts.push({ type, value: c.slice(1, -1) });
    } else {
      if (c[0] === "{") {
        if (block === "if")
          throw `ui.js template parse error: expected "if(..." but "if${c[0]}..." found inside "<${tag}>"`;
        if (item.opts.find((x) => x.type === block)) {
          throw `ui.js template parse error: duplicate ${block}() inside "<${tag}>" declaration`;
        }
        item.opts.push({ type, value: c.slice(1, -1) });
      } else {
        throw `ui.js template parse error: expected "${block}{..." but "${block}${c[0]}..." found inside "<${tag}>"`;
      }
    }
    return true;
  }
  return false;
}
function parseAttributes(items) {
  items.filter((i) => i.nodeType === "bracket" && i.innerContent[0] !== "/").forEach((item) => {
    item.opts = [];
    const AAA = parseBrackets_default(item.innerContent).map((d) => ({
      nodeType: d.nodeType,
      content: d.content.trim()
    }));
    var tag = "";
    do {
      const A = AAA.shift();
      if (A.nodeType === "bracket") {
        if (item.opts.length) {
          const last = item.opts[item.opts.length - 1];
          if (last.type === "jsAttribute") {
            last.value += A.content;
          } else
            throw `ui.js template parse error: unxpected brackets "${A.content}" at the end of <${tag}> attributes`;
        } else
          throw `ui.js template parse error: unxpected brackets "${A.content}" at the end of <${tag}> attributes`;
      } else if (A.nodeType === "text") {
        const bbb = splitArgs(A.content);
        if (!tag)
          tag = bbb.shift();
        do {
          const a = bbb.shift();
          if (bbb[0] && bbb[0][0] === "=") {
            const b = bbb.shift().substr(1);
            if (a[0] === "@") {
              if (['"', "'", "`"].includes(b[0])) {
                throw `ui.js template parse error: quotes around ${b} is prohibited`;
              }
              if (AAA.length && AAA[0].nodeType === "bracket" && !bbb.length) {
                const c = AAA.shift();
                item.opts.push({ type: "eventCallFunction", key: a, value: b, args: c.content });
              } else {
                item.opts.push({ type: "eventBind", key: a, value: b.endsWith("/") ? b.substring(0, b.length - 1) : b });
              }
            } else if (b.startsWith('"') && b.endsWith('"') || b.startsWith("`") && b.endsWith("`") || b.startsWith("'") && b.endsWith("'")) {
              item.opts.push({ type: "stringAttribute", key: a, value: b.slice(1, -1) });
            } else {
              if (b.length) {
                item.opts.push({ type: "jsAttribute", key: a, value: b.endsWith("/") ? b.substring(0, b.length - 1) : b });
              } else {
                if (!AAA.length) {
                  throw `ui.js template parse error: unxpected end of attribute "...${a}=" inside "<${tag}>" declaration`;
                }
                const c = AAA.shift().content;
                if (c[0] === "{") {
                  item.opts.push({ type: "eueAttribute", key: a, value: c });
                } else if (c[0] === "[") {
                  item.opts.push({ type: "transitionAttribute", key: a, value: c });
                } else {
                  item.opts.push({ type: "jsAttribute", key: a, value: c.substring(1, c.length - 1) });
                }
              }
            }
          } else {
            if (a === "loop" && AAA.length) {
              const c = AAA.shift().content;
              if (c[0] === "(") {
                if (item.opts.find((x) => x.type === "loop")) {
                  throw `ui.js template parse error: duplicate loop${c} inside "<${tag}>" declaration`;
                }
                const [value, key] = splitByLast(c.slice(1, -1));
                if (key) {
                  item.opts.push({ type: "loop", key, value });
                } else {
                  throw `ui.js template parse error: non-keyed loop not supported yet. "loop${c}" inside "<${tag}>"`;
                }
              } else {
                throw `ui.js template parse error: expected "loop(..." but "loop${c[0]}..." found inside "<${tag}>" `;
              }
            } else if (propsBlock({ AAA, item, tag, a }, "if", "if"))
              true;
            else if (propsBlock({ AAA, item, tag, a }, "style", "style"))
              true;
            else if (propsBlock({ AAA, item, tag, a }, "attrs", "attrs"))
              true;
            else if (propsBlock({ AAA, item, tag, a }, "enter", "enterStyles"))
              true;
            else if (propsBlock({ AAA, item, tag, a }, "update", "updateStyles"))
              true;
            else if (propsBlock({ AAA, item, tag, a }, "exit", "exitStyles"))
              true;
            else if (propsBlock({ AAA, item, tag, a }, "#enter", "enterAttrs"))
              true;
            else if (propsBlock({ AAA, item, tag, a }, "#update", "updateAttrs"))
              true;
            else if (propsBlock({ AAA, item, tag, a }, "#exit", "exitAttrs"))
              true;
            else if (a === "text" && AAA.length) {
              const c = AAA.shift().content;
              if (c[0] === "(") {
                if (item.opts.find((x) => x.type === "text")) {
                  throw `ui.js template parse error: duplicate text{c} inside "<${tag}>" declaration`;
                }
                item.opts.push({ type: "text", value: c.slice(1, -1) });
              } else {
                throw `ui.js template parse error: expected "text(..." but "text{c[0]}..." found inside "<${tag}>"`;
              }
            } else if (a === "html" && AAA.length) {
              const c = AAA.shift().content;
              if (c[0] === "(") {
                if (item.opts.find((x) => x.type === "html")) {
                  throw `ui.js template parse error: duplicate html{c} inside "<${tag}>" declaration`;
                }
                item.opts.push({ type: "html", value: c.slice(1, -1) });
              } else {
                throw `ui.js template parse error: expected "html(..." but "html{c[0]}..." found inside "<${tag}>"`;
              }
            } else {
              if (a) {
                if (a[0] === "@") {
                  if (!bbb.length && AAA[0] && AAA[0].nodeType === "bracket") {
                    const c = AAA.shift();
                    item.opts.push({ type: "eventCallback", key: a, value: c.content });
                  } else {
                    if (a.endsWith("/"))
                      item.opts.push({ type: "eventBindSelfNamed", key: a.trim().slice(0, -1), value: a.trim().slice(1, -1) });
                    else
                      item.opts.push({ type: "eventBindSelfNamed", key: a.trim(), value: a.trim().slice(1) });
                  }
                } else {
                  if (a === "=") {
                    throw `ui.js template parse error: unxpected end of attribute "${a}" inside "<${tag}>" declaration`;
                  }
                  if (a !== "/") {
                    item.opts.push({ type: "booleanAttribute", key: a.endsWith("/") ? a.slice(0, -1) : a });
                  } else {
                  }
                }
              } else {
              }
            }
          }
        } while (bbb.length);
      }
    } while (AAA.length);
  });
  return mergeAttributes(items);
}

// src/parser/selfClosingTags.js
var selfClosingTags_default = {
  "!DOCTYPE": true,
  "!doctype": true,
  // void
  area: true,
  base: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  menuitem: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
  // svg
  circle: true,
  ellipse: true,
  line: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  stop: true,
  use: true
};

// src/parser/CompileError.js
var CompileError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ui.js \u2764\uFE0F  syntax ERROR";
  }
};

// src/parser/toTree.js
function renameAlias(tag, aliases = []) {
  if (!aliases.length)
    return tag;
  if (tag[0] == "@") {
    if (tag.length === 1)
      throw `empty alias tag <@>`;
    const alias = aliases.find((i) => i.alias === tag);
    if (alias) {
      tag = alias.name;
    } else {
      throw `alias <${tag}> not defined`;
    }
  }
  return tag;
}
function tagName(name, aliases) {
  const alias = aliases.find((i) => i.name === name);
  return alias ? alias.alias : name;
}
function toTree(items, aliases) {
  const tags2 = [{ children: [] }];
  tags2.last = () => tags2[tags2.length - 1];
  items.forEach((item) => {
    if (item.nodeType === "text") {
      var parent = tags2[tags2.length - 1];
      if (parent.text)
        throw `children and text() attribute at the same time`;
      parent.children.push({ tag: "#text", content: item.content });
    } else {
      var selfClosing = item.content.match(new RegExp("^<(@?[a-z][-a-z0-9]*)(\\s.*)?\\/>$", "s"));
      if (selfClosing) {
        var parent = tags2[tags2.length - 1];
        if (parent.text)
          throw `children and text() attribute at the same time`;
        parent.children.push(Object.assign({ tag: renameAlias(selfClosing[1], aliases) }, item.opts2));
      } else {
        var openTag = item.content.match(new RegExp("^<(@?[a-z][-a-z0-9]*)(\\s.*)?>$", "s"));
        if (openTag) {
          if (selfClosingTags_default[openTag[1]]) {
            const parent2 = tags2[tags2.length - 1];
            if (parent2.text)
              throw `children and text() attribute at the same time`;
            parent2.children.push(Object.assign({ tag: renameAlias(openTag[1], aliases) }, item.opts2));
          } else {
            tags2.push(Object.assign({
              tag: renameAlias(openTag[1], aliases),
              children: []
            }, item.opts2));
          }
        } else {
          var closeTag = item.content.match(new RegExp("^<\\/(@?[a-z][-a-z0-9]*)(\\s.*)?>$", "s"));
          if (closeTag) {
            if (selfClosingTags_default[closeTag[1]])
              throw `can't close self-closing tag "</${closeTag[1]}>"`;
            let parent2 = tags2[tags2.length - 2];
            let node = tags2.pop();
            if (node.children.length === 1 && node.children[0].tag === "#text") {
              node.text = node.children[0].content;
              delete node.children;
            } else if (!node.children.length)
              delete node.children;
            if (!parent2) {
              if (!node.children || node.children[0].tag !== closeTag[1])
                throw `missing the opening tag for </${closeTag[1]}>`;
              throw `closed twice tag <${node.children[0].tag}>`;
            } else {
              if (parent2.text)
                throw `children and text() attribute at the same time`;
              const opening = tagName(node.tag, aliases);
              const closing = tagName(closeTag[1], aliases);
              if (opening !== closing)
                throw `the opening and closing tags are not the same <${opening}>...</${closing}>`;
              parent2.children.push(node);
            }
          }
        }
      }
    }
  });
  if (tags2.length > 1) {
    const x = tags2.find((t) => t.tag);
    throw `Unclosed tag <${tagName(x.tag, aliases)}>`;
  }
  return tags2[0].children;
}
var toTree_default = toTree;

// src/eue/TinyAnimate.js
var exports = {};
exports.animate = function(from, to, duration, update, easing, done, element) {
  if (typeof from !== "number" || typeof to !== "number" || typeof duration !== "number" || typeof update !== "function")
    return;
  if (typeof easing === "string" && easings[easing])
    easing = easings[easing];
  if (typeof easing !== "function")
    easing = easings.linear;
  if (typeof done !== "function")
    done = function() {
    };
  var rAF = window.requestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1e3 / 60);
  };
  var canceled = false;
  var change = to - from;
  function loop(timestamp) {
    if (canceled)
      return;
    var time = (timestamp || +/* @__PURE__ */ new Date()) - start;
    if (time >= 0) {
      update(easing(time, from, change, duration));
    }
    if (time >= 0 && time >= duration) {
      update(to);
      done(element, to);
    } else {
      rAF(loop);
    }
  }
  update(from);
  if (change) {
    var start = window.performance && window.performance.now ? window.performance.now() : +/* @__PURE__ */ new Date();
    rAF(loop);
  }
  return {
    update: function(_from, _to, _easing) {
      start = window.performance && window.performance.now ? window.performance.now() : +/* @__PURE__ */ new Date();
      from = _from;
      to = _to;
      change = to - from;
      if (typeof _easing === "string" && easings[_easing])
        easing = easings[_easing];
    },
    cancel: function() {
      canceled = true;
    },
    last: to
  };
};
exports.animateCSS = function(element, property, unit, from, to, duration, easing, done) {
  var update = function(value) {
    element.style[property] = value + unit;
  };
  return exports.animate(from, to, duration, update, easing, done);
};
exports.cancel = function(animation) {
  if (!animation)
    return;
  animation.cancel();
};
var easings = exports.easings = {};
easings.linear = function(t, b, c, d) {
  return c * t / d + b;
};
easings.easeInQuad = function(t, b, c, d) {
  return c * (t /= d) * t + b;
};
easings.easeOutQuad = function(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};
easings.easeInOutQuad = function(t, b, c, d) {
  if ((t /= d / 2) < 1)
    return c / 2 * t * t + b;
  return -c / 2 * (--t * (t - 2) - 1) + b;
};
easings.easeInCubic = function(t, b, c, d) {
  return c * (t /= d) * t * t + b;
};
easings.easeOutCubic = function(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
};
easings.easeInOutCubic = function(t, b, c, d) {
  if ((t /= d / 2) < 1)
    return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
};
easings.easeInQuart = function(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
};
easings.easeOutQuart = function(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};
easings.easeInOutQuart = function(t, b, c, d) {
  if ((t /= d / 2) < 1)
    return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};
easings.easeInQuint = function(t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
};
easings.easeOutQuint = function(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
};
easings.easeInOutQuint = function(t, b, c, d) {
  if ((t /= d / 2) < 1)
    return c / 2 * t * t * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
};
easings.easeInSine = function(t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
};
easings.easeOutSine = function(t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b;
};
easings.easeInOutSine = function(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};
easings.easeInExpo = function(t, b, c, d) {
  return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
};
easings.easeOutExpo = function(t, b, c, d) {
  return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
};
easings.easeInOutExpo = function(t, b, c, d) {
  if (t == 0)
    return b;
  if (t == d)
    return b + c;
  if ((t /= d / 2) < 1)
    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
};
easings.easeInCirc = function(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
};
easings.easeOutCirc = function(t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
};
easings.easeInOutCirc = function(t, b, c, d) {
  if ((t /= d / 2) < 1)
    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};
easings.easeInElastic = function(t, b, c, d) {
  var p = 0;
  var a = c;
  if (t == 0)
    return b;
  if ((t /= d) == 1)
    return b + c;
  if (!p)
    p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  } else
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
};
easings.easeOutElastic = function(t, b, c, d) {
  var p = 0;
  var a = c;
  if (t == 0)
    return b;
  if ((t /= d) == 1)
    return b + c;
  if (!p)
    p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  } else
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
};
easings.easeInOutElastic = function(t, b, c, d) {
  var p = 0;
  var a = c;
  if (t == 0)
    return b;
  if ((t /= d / 2) == 2)
    return b + c;
  if (!p)
    p = d * (0.3 * 1.5);
  if (a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  } else
    var s = p / (2 * Math.PI) * Math.asin(c / a);
  if (t < 1)
    return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
};
easings.easeInBack = function(t, b, c, d, s) {
  if (s == void 0)
    s = 1.70158;
  return c * (t /= d) * t * ((s + 1) * t - s) + b;
};
easings.easeOutBack = function(t, b, c, d, s) {
  if (s == void 0)
    s = 1.70158;
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};
easings.easeInOutBack = function(t, b, c, d, s) {
  if (s == void 0)
    s = 1.70158;
  if ((t /= d / 2) < 1)
    return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
  return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
};
easings.easeInBounce = function(t, b, c, d) {
  return c - easings.easeOutBounce(d - t, 0, c, d) + b;
};
easings.easeOutBounce = function(t, b, c, d) {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
  }
};
easings.easeInOutBounce = function(t, b, c, d) {
  if (t < d / 2)
    return easings.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
  return easings.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
};
var TinyAnimate_default = exports;

// src/tags.js
var tags = {};
var tags_default = tags;

// src/eue/utils.js
var defaultAnimationOpts = {
  duration: 500
};
function splice(arr, a, b) {
  var tmp = arr[a];
  if (a < b) {
    for (; a < b; a++)
      arr[a] = arr[a + 1];
  } else {
    for (; a > b; a--)
      arr[a] = arr[a - 1];
  }
  arr[b] = tmp;
}
function createElement(tag, parent) {
  if (typeof tags_default[tag.tag] == "function") {
    var element = new tags_default[tag.tag](parent, tag);
  } else if (tag.svg) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", tag.tag);
  } else {
    var element = document.createElement(tag.tag);
  }
  Object.assign(element, { _attrs: {}, _styles: {}, _attrsV: {}, _styleV: {}, _colors: {}, _events: {} });
  return element;
}
function insertElement(container, element, prevElement) {
  if (!element._BASE_ELEMENT) {
    if (prevElement) {
      prevElement.after(element);
    } else {
      container.prepend(element);
    }
    ;
  } else {
    if (prevElement) {
      container._childNodes.splice(
        container._childNodes.findIndex((x) => x === prevElement) + 1,
        0,
        element
      );
    } else {
      container._childNodes.unshift(element);
    }
    ;
  }
}
function prependElement(container, element) {
  if (!element._BASE_ELEMENT) {
    container.prepend(element);
  } else {
    container._childNodes.unshift(element);
  }
}
function animateAttr(element, key, v) {
  var _a;
  var from = void 0;
  var ease = "linear";
  var fn = void 0;
  var done = void 0;
  var _default = void 0;
  if (typeof v === "object") {
    var duration = v.duration || defaultAnimationOpts.duration;
    var to = v.to;
    if (v.ease)
      ease = v.ease;
    if (v.fn)
      fn = v.fn;
    if (v.done)
      done = v.done;
    if (v.from !== void 0)
      from = v.from;
    if (v.default !== void 0)
      _default = v.default;
  } else {
    var duration = defaultAnimationOpts.duration;
    var to = v;
  }
  if (from === void 0) {
    var _from = element.__rendererName ? element.state[key] : element.getAttribute(key);
    from = _from === void 0 || _from === null ? _default ? _default : 0 : Number(_from);
  }
  TinyAnimate_default.cancel(element._attrs[key]);
  if (fn) {
    from = ((_a = element._attrs[key]) == null ? void 0 : _a.last) || 0;
    element._attrs[key] = TinyAnimate_default.animate(from, to, duration, (x) => {
      element.setAttribute(key, fn(x));
    }, ease, done, element);
  } else {
    element._attrs[key] = TinyAnimate_default.animate(from, to, duration, (x) => {
      element.setAttribute(key, x);
    }, ease, done, element);
  }
}
function animateColor(element, key, v) {
  var ease = "linear";
  var delay = 0;
  if (typeof v === "object") {
    var duration = v.duration || defaultAnimationOpts.duration;
    var to = v.to;
    if (v.ease)
      ease = v.ease;
    if (v.delay)
      delay = v.delay;
  } else {
    var duration = defaultAnimationOpts.duration;
    var to = v;
  }
  element._colors[key] = key + " " + duration + "ms " + ease + " " + delay + "ms";
  clearTimeout(element._styles[key]);
  element._styles[key] = setTimeout(() => {
    delete element._colors[key];
    var transition2 = Object.values(element._colors).join(",");
    if (element._transition != transition2) {
      element._transition = transition2;
      if (element._transition)
        element.style.setProperty("transition", element._transition);
      else
        element.style.removeProperty("transition");
    }
  }, duration + delay);
  var transition = Object.values(element._colors).join(",");
  if (element._transition != transition) {
    element._transition = transition;
    if (element._transition)
      element.style.setProperty("transition", element._transition);
    else
      element.style.removeProperty("transition");
  }
  ;
  if (!element.style.getPropertyValue(key)) {
    element.style.setProperty(key, "#000000");
  }
  element.style.setProperty(key, getComputedStyle(element)[key]);
  setTimeout(() => {
    element.style.setProperty(key, to);
  }, 0);
}
function animateCSS(element, key, v) {
  if (["color", "background", "fill", "stroke", "background-color", "border-color"].includes(key)) {
    animateColor(element, key, v);
    return;
  }
  var ease = "linear";
  var done = void 0;
  var from = void 0;
  var threshold = 0;
  var unit = "";
  var fn = void 0;
  var _default = void 0;
  if (typeof v === "object") {
    if (typeof v.duration == "function")
      v.duration = v.duration();
    if (v.duration === 0 && v.to) {
      TinyAnimate_default.cancel(element._styles[key]);
      element.style.setProperty(key, v.to);
      return;
    }
    var duration = v.duration || defaultAnimationOpts.duration;
    var to = v.to;
    if (v.from !== void 0)
      from = v.from;
    if (v.default !== void 0)
      _default = v.default;
    if (v.ease)
      ease = v.ease;
    if (v.done)
      done = v.done;
    if (v.threshold !== void 0)
      threshold = v.threshold;
    if (v.fn)
      fn = v.fn;
  } else {
    var duration = defaultAnimationOpts.duration;
    var to = v;
  }
  var isCSSVar = key.startsWith("--");
  var val = isCSSVar ? element.style.getPropertyValue(key) : element.style[key];
  if (!val && _default)
    val = _default;
  if (typeof to === "string") {
    if (!["px", "%", "deg", "vw", "vh", "em"].some((suffix) => {
      if (to.endsWith(suffix)) {
        if (from !== void 0) {
          if (from.endsWith(suffix))
            from = Number(from.substring(0, from.length - suffix.length));
        } else {
          from = Number(val.substring(0, val.length - suffix.length));
        }
        to = Number(to.substring(0, to.length - suffix.length));
        unit = suffix;
        return true;
      }
    }))
      to = Number(to);
  } else {
    if (from === void 0)
      from = Number(val);
  }
  if (threshold && Math.abs(from - to) < threshold) {
    TinyAnimate_default.cancel(element._styles[key]);
    element.style.setProperty(key, v.to);
    return;
  }
  TinyAnimate_default.cancel(element._styles[key]);
  if (fn) {
    element._styles[key] = TinyAnimate_default.animate(from, to, duration, (x) => {
      element.style.setProperty(key, fn(x + unit));
    }, ease, done, element);
  } else {
    element._styles[key] = TinyAnimate_default.animate(from, to, duration, (x) => {
      element.style.setProperty(key, x + unit);
    }, ease, done, element);
  }
}

// src/eue/isBooleanAttr.js
function isBooleanAttr(tag, key) {
  if (tag === "input") {
    if (["checked", "autofocus", "readonly", "required", "disabled", "multiple"].includes(key))
      return true;
  }
  if (tag === "option") {
    if (["selected"].includes(key))
      return true;
  }
  if (tag === "button") {
    if (["disabled", "multiple"].includes(key))
      return true;
  }
  if (tag === "select") {
    if (["disabled"].includes(key))
      return true;
  }
  return false;
}

// src/eue/EXIT.js
function Exit_Attrs_Logic(element, tag, state, key, value) {
  if (typeof value !== "object") {
    element.setAttribute(key, value);
    return defaultAnimationOpts.duration;
  }
  animateAttr(element, key, value);
  return value.duration ? value.duration : defaultAnimationOpts.duration;
}
function Exit_Styles_Logic(element, tag, state, key, value) {
  animateCSS(element, key, value);
  return value.duration ? value.duration : defaultAnimationOpts.duration;
}
function Exit_Loop_Element(element, tag, state, key, __i__, container) {
  var maxStyle = 0, maxAttrs = 0;
  if (tag.exitAttrs) {
    var exitAttrs = tag.exitAttrs(state);
    if (typeof exitAttrs === "object") {
      maxAttrs = Object.entries(exitAttrs).reduce(
        (prev, item) => Math.max(Exit_Attrs_Logic(element, tag, state, item[0], item[1]), prev),
        0
      );
    }
  }
  if (tag.exitStyles) {
    var exitStyles = tag.exitStyles(state);
    if (typeof exitStyles === "object") {
      maxStyle = Object.entries(exitStyles).reduce(
        (prev, item) => Math.max(Exit_Styles_Logic(element, tag, state, item[0], item[1]), prev),
        0
      );
    }
  }
  element.isExit = true;
  if (maxStyle > 0 || maxAttrs > 0) {
    const timeout = setTimeout(() => container.Done.then(() => {
      removeElement(element);
      __i__.exit.delete(key);
    }), maxStyle > maxAttrs ? maxStyle : maxAttrs);
    __i__.exit.set(key, {
      element,
      timeout
    });
    return;
  }
  clearTimeout(__i__.exit[key]);
  removeElement(element);
}
function Exit_Single(element, tag, state, container, index) {
  var maxStyle = 0, maxAttrs = 0;
  if (tag.exitAttrs) {
    var exitAttrs = tag.exitAttrs(state);
    if (typeof exitAttrs === "object") {
      maxAttrs = Object.entries(exitAttrs).reduce(
        (prev, item) => Math.max(Exit_Attrs_Logic(element, tag, state, item[0], item[1]), prev),
        0
      );
    }
  }
  if (tag.exitStyles) {
    var exitStyles = tag.exitStyles(state);
    if (typeof exitStyles === "object") {
      maxStyle = Object.entries(exitStyles).reduce(
        (prev, item) => Math.max(Exit_Styles_Logic(element, tag, state, item[0], item[1]), prev),
        0
      );
    }
  }
  element.isExit = true;
  if (maxStyle > 0 || maxAttrs > 0) {
    const timeout = setTimeout(() => container.Done.then(() => {
      container.__i__[index] = false;
      removeElement(element);
    }), maxStyle > maxAttrs ? maxStyle : maxAttrs);
    container.__i__[index] = {
      exit: timeout
    };
    return false;
  }
  clearTimeout(container.__i__[index]);
  container.__i__[index] = false;
  removeElement(element);
  return true;
}
async function removeElement(element) {
  if (element.nodeName === "#text") {
    console.log("TEXT");
    return;
  }
  if (element.__i__)
    for (const obj of Object.values(element.__i__)) {
      clearTimeout(obj.exit);
    }
  for (const obj of Object.values(element._attrs)) {
    if (obj == null ? void 0 : obj.cancel)
      obj.cancel();
  }
  for (const obj of Object.values(element._styles)) {
    if (obj == null ? void 0 : obj.cancel)
      obj.cancel();
  }
  const childNodes = element.__rendererName ? element.document._childNodes : element.children;
  while (childNodes.length) {
    const child = childNodes[childNodes.length - 1];
    await removeElement(child);
  }
  await element.remove();
}

// src/eue/UPDATE.js
function Update_Keyed_Loop(tag, container, prevElement, _state, __i__, index, data) {
  var keys = __i__.keys;
  var elements = __i__.elements;
  var exit = __i__.exit;
  var old_length = elements.length;
  var new_length = data.length;
  var max_length = old_length > new_length ? old_length : new_length;
  var shift = 0;
  var x = 0;
  var removeIndex = 0;
  do {
    if (x < new_length) {
      var new_key = tag.key(data[x], x);
      if (x >= old_length) {
        old_length++;
        max_length = old_length > new_length ? old_length : new_length;
        var ___exit = exit.get(new_key);
        if (___exit) {
          clearTimeout(___exit.timeout);
          var element = ___exit.element;
          delete element.isExit;
          tag.svg || (element.className = "");
          exit.delete(new_key);
        } else {
          var element = createElement(tag, container);
        }
        _state[tag.loop_alias] = data[x];
        if (tag.loop_key_alias)
          _state[tag.loop_key_alias] = x;
        Enter_Light(element, tag, _state, GLOBALS_default, ___exit);
        if (x === 0) {
          if (exit.size) {
            for (let entry of exit) {
              entry[1].element.before(element);
              break;
            }
          } else {
            if (prevElement) {
              prevElement.after(element);
            } else {
              prependElement(container, element);
            }
          }
        } else
          elements[x - 1].after(element);
        elements.splice(x, 0, element);
        element.key = new_key;
        keys[new_key] = true;
        x++;
        continue;
      } else {
        var old_key = elements[x].key;
        if (new_key === old_key) {
          _state[tag.loop_alias] = data[x];
          if (tag.loop_key_alias)
            _state[tag.loop_key_alias] = x;
          tag.Update_Tag(elements[x], tag, _state, GLOBALS_default);
          x++;
          continue;
        } else {
          if (keys[new_key]) {
            var offs_old = void 0;
            var offs_new = void 0;
            let tmp = void 0;
            var _found = void 0;
            for (var y = x + 1; y < max_length; y++) {
              if (!offs_old && y < old_length && elements[y].key === new_key)
                offs_old = y + 1;
              if (!offs_new && y < new_length && tag.key(data[y], y) === old_key)
                offs_new = y + 1;
              if (offs_old && offs_new) {
                var a_x = elements[x];
                if (offs_old >= offs_new) {
                  tmp = elements[offs_old - 1];
                  container.insertBefore(tmp, a_x);
                  _state[tag.loop_alias] = data[x];
                  if (tag.loop_key_alias)
                    _state[tag.loop_key_alias] = x;
                  tag.Update_Tag(tmp, tag, _state, GLOBALS_default);
                  if (offs_old === offs_new) {
                    if (y - x > 1) {
                      if (offs_old >= elements.length) {
                        elements[y - 1].after(a_x);
                      } else {
                        container.insertBefore(a_x, elements[offs_old]);
                      }
                    }
                    elements[x] = elements[y];
                    elements[y] = a_x;
                  } else {
                    splice(elements, offs_old - 1, x);
                    shift++;
                  }
                  x++;
                } else {
                  tmp = true;
                  var ind = offs_new - 1 + shift;
                  if (ind >= elements.length) {
                    elements[elements.length - 2].after(a_x);
                  } else {
                    if (!elements[ind])
                      throw 9999999999;
                    container.insertBefore(a_x, elements[ind]);
                  }
                  splice(elements, x, (ind > old_length ? old_length : ind) - 1);
                  _state[tag.loop_alias] = data[x];
                  if (tag.loop_key_alias)
                    _state[tag.loop_key_alias] = x;
                  tag.Update_Tag(a_x, tag, _state, GLOBALS_default);
                }
                break;
              }
            }
            if (tmp)
              continue;
          } else {
            old_length++;
            max_length = old_length > new_length ? old_length : new_length;
            var ___exit = exit.get(new_key);
            if (___exit) {
              clearTimeout(___exit.timeout);
              element = ___exit.element;
              delete element.isExit;
              tag.svg || (element.className = "");
              exit.delete(new_key);
            } else {
              var element = createElement(tag, container);
            }
            _state[tag.loop_alias] = data[x];
            if (tag.loop_key_alias)
              _state[tag.loop_key_alias] = x;
            Enter_Light(element, tag, _state, GLOBALS_default, ___exit);
            if (x === 0) {
              if (prevElement) {
                prevElement.after(element);
              } else {
                prependElement(container, element);
              }
            } else {
              elements[x - 1].after(element);
            }
            elements.splice(x, 0, element);
            element.key = new_key;
            keys[new_key] = true;
            x++;
            continue;
          }
        }
      }
    }
    delete keys[elements[x].key];
    if (tag.loop_key_alias) {
      _state[tag.loop_key_alias] = x + removeIndex;
      removeIndex++;
    }
    Exit_Loop_Element(elements[x], tag, _state, elements[x].key, __i__, container);
    elements.splice(x, 1);
    old_length--;
    max_length = old_length > new_length ? old_length : new_length;
  } while (x < max_length);
  __i__.length = elements.length;
  return exit.size + __i__.length;
}
function getFns() {
  return {
    ret_element: function(element, tag, state, GLOBALS2) {
      return element;
    },
    children: function(element, tag, state, GLOBALS2) {
      GLOBALS2.UPDATE_Chidldren(element, tag.children, state);
    },
    fn_text: function(element, tag, state, GLOBALS2) {
      var text = tag.text(state);
      if (!element) {
        console.log("NOT element.__lastText", element);
        console.trace();
        return;
      }
      if (element.__lastText !== text) {
        element.textContent = element.__lastText = text;
      }
    },
    fn_html: function(element, tag, state, GLOBALS2) {
      var html = tag.html(state);
      if (element.__lastHTML !== html) {
        element.innerHTML = element.__lastHTML = html;
      }
    },
    updateProps: function(element, tag, state, GLOBALS2) {
      tag.updateProps(element, tag, state, GLOBALS2);
    }
  };
}
function Update_Tag(tag) {
  var fns = [];
  var FF = getFns();
  if (tag.tag === "#text") {
    fns.push(FF.ret_element);
    return fns;
  }
  if (tag.children)
    fns.push(FF.children);
  else {
    if (tag.html) {
      if (typeof tag.html === "function") {
        fns.push(FF.fn_html);
      }
    } else if (tag.text) {
      if (typeof tag.text === "function") {
        fns.push(FF.fn_text);
      }
    }
  }
  if (tag.updateProps) {
    fns = [...fns, ...tag.updateProps];
  }
  fns.push(FF.ret_element);
  return fns;
}
function U_SINGLE(container, tag, state, index, childIndex, __i__) {
  tag.Update_Tag(
    container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex],
    tag,
    state,
    GLOBALS_default
  );
  return childIndex + 1;
}
function U_LOOP(container, tag, state, index, childIndex, __i__) {
  let data = tag.loop(state);
  if (!__i__ || __i__.length === 0) {
    if (!__i__ || __i__.exit.size === 0) {
      if (!data.length) {
        return childIndex;
      } else {
        if (index === 0) {
          tag.enter(tag, container, void 0, state, index, data, GLOBALS_default);
          return childIndex + container.__i__[index].length;
        } else {
          tag.enter(tag, container, childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex - 1] : container.childNodes[childIndex - 1], state, index, data, GLOBALS_default);
          return childIndex + container.__i__[index].length;
        }
      }
    } else {
      if (!data.length) {
        return childIndex + __i__.exit.size;
      } else {
        const count = Update_Keyed_Loop(tag, container, index === 0 || childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex], state, __i__, index, data);
        return childIndex + count;
      }
    }
  } else {
    if (!data.length) {
      const count = Update_Keyed_Loop(tag, container, index === 0 || childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex], state, __i__, index, data);
      return childIndex + count;
    } else {
      const count = Update_Keyed_Loop(tag, container, index === 0 || childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex - 1] : container.childNodes[childIndex - 1], state, __i__, index, data);
      return childIndex + count;
    }
  }
}
function U_IF_SINGLE(container, tag, state, index, childIndex, __i__) {
  if (__i__ === false) {
    if (!tag.if(state)) {
      return childIndex;
    } else {
      let element = createElement(tag, container);
      if (tag.children) {
        Enter_Children(element, tag.children, state);
      } else {
        if (tag.text) {
          var text = typeof tag.text === "function" ? tag.text(state) : tag.text;
          if (element.__lastText !== text) {
            element.textContent = element.__lastText = text;
          }
        } else if (tag.html) {
          var html = typeof tag.html === "function" ? tag.html(state) : tag.html;
          if (element.__lastHTML !== html) {
            element.innerHTML = element.__lastHTML = html;
          }
        }
      }
      if (tag.enterProps)
        tag.enterProps(element, tag, state, GLOBALS_default);
      if (childIndex === 0) {
        prependElement(container, element);
      } else {
        if (container.__rendererName)
          container._childNodes[childIndex - 1].after(element);
        else {
          container.childNodes[childIndex - 1].after(element);
        }
      }
      container.__i__[index] = { exit: false };
      return childIndex + 1;
    }
  } else {
    if (tag.if(state)) {
      if (__i__.exit) {
        clearTimeout(__i__.exit);
        if (tag.enterProps)
          tag.enterProps(
            container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex],
            tag,
            state,
            GLOBALS_default
          );
        container.__i__[index] = { exit: false };
        return childIndex + 1;
      } else {
        tag.Update_Tag(
          container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex],
          tag,
          state,
          GLOBALS_default
        );
        return childIndex + 1;
      }
    } else {
      if (__i__.exit) {
        return childIndex + 1;
      } else {
        let _childNodes = container.__rendererName ? container._childNodes : container.childNodes;
        let isExitNow = Exit_Single(_childNodes[childIndex], tag, state, container, index);
        if (isExitNow) {
          return childIndex;
        } else {
          return childIndex + 1;
        }
      }
    }
  }
}
function U_IF_LOOP(container, tag, state, index, childIndex, __i__) {
  if (__i__ === false || __i__.length === 0) {
    if (tag.if(state)) {
      let data = tag.loop(state);
      if (!data.length) {
        return childIndex;
      } else {
        if (index === 0) {
          tag.enter(tag, container, void 0, state, index, data, GLOBALS_default);
          return childIndex + container.__i__[index].length;
        } else {
          tag.enter(tag, container, childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex - 1] : container.childNodes[childIndex - 1], state, index, data, GLOBALS_default);
          return childIndex + container.__i__[index].length;
        }
      }
    } else {
      return childIndex;
    }
  } else {
    if (tag.if(state)) {
      let data = tag.loop(state);
      const count = Update_Keyed_Loop(tag, container, index === 0 && childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex] : container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex], state, __i__, index, data);
      return childIndex + count;
    } else {
      if (__i__.length === 0) {
        return childIndex + __i__.exit.size;
      } else {
        const count = Update_Keyed_Loop(tag, container, index === 0 && childIndex === 0 ? void 0 : container.__rendererName ? container._childNodes[childIndex] : container.childNodes[childIndex], state, __i__, index, []);
        return childIndex + count;
      }
    }
  }
}
function UPDATE_Chidldren(container, component, state) {
  if (container.isExit) {
    return;
  }
  var Finish = void 0;
  container.Done = new Promise((resolve) => Finish = resolve);
  var childIndex = 0;
  component.every((tag, index) => {
    if (!container.__i__) {
      console.groupCollapsed("Not initialized element!!! " + tag.tag);
      console.dir(container);
      console.log("component", component);
      console.log("tag", tag);
      console.trace();
      console.groupEnd();
      return false;
    }
    const __i__ = container.__i__[index];
    if (tag.tag === "#text") {
      childIndex++;
      return true;
    }
    if (tag.hasOwnProperty("if")) {
      if (tag.loop) {
        childIndex = U_IF_LOOP(container, tag, state, index, childIndex, __i__);
      } else {
        childIndex = U_IF_SINGLE(container, tag, state, index, childIndex, __i__);
      }
    } else {
      if (tag.loop) {
        childIndex = U_LOOP(container, tag, state, index, childIndex, __i__);
      } else {
        childIndex = U_SINGLE(container, tag, state, index, childIndex, __i__);
      }
    }
    return true;
  });
  Finish();
}

// src/eue/updateProps.js
function updateAttribute(tag, element, key, value) {
  var _a, _b;
  if (tag.tag === "input" && key === "value") {
    if (element._attrsV[key] !== value) {
      element._attrsV[key] = value;
      if (element.value != value)
        element.value = value;
    }
  } else if (key === "class") {
    if (typeof value === "object" && value !== null) {
      throw "Cannot do transition on class attribute";
    }
    var val = value || void 0;
    if (element._attrsV[key] !== val) {
      element._attrsV[key] = val;
      if (val) {
        if (tag.svg)
          element.setAttribute(key, val);
        else
          element.className = val;
      } else
        element.removeAttribute(key);
    }
  } else if (key === "style") {
    if (typeof value === "object" && value !== null) {
      throw "Cannot do transition on style attribute";
    }
    var val = value || void 0;
    if (element._attrsV[key] !== val) {
      element._attrsV[key] = val;
      if (val)
        element.setAttribute(key, val);
      else
        element.removeAttribute(key);
    }
  } else {
    if (typeof value === "object" || element._attrsV[key] !== value || Array.isArray(value)) {
      if (isBooleanAttr(tag.tag, key)) {
        element._attrsV[key] = value;
        if (tag.tag === "input" && tag.attrs2.type === "radio" && key === "checked" && !tag.attrsB[key]) {
          if (tag.attrs2.value) {
            if (tag.attrs2.value == value) {
              element.setAttribute(key, "");
              element[key] = key;
            } else {
              element.removeAttribute(key);
              element[key] = "";
            }
          } else {
            if (value) {
              element.setAttribute(key, "");
              element[key] = key;
            } else {
              element.removeAttribute(key);
              element[key] = "";
            }
          }
        } else {
          value ? element.setAttribute(key, "") || (element[key] = key) : element.removeAttribute(key) || (element[key] = "");
        }
      } else if (tag.tag === "textarea" && key === "value") {
        element.value = value;
      } else {
        if ((!tag.attrs3 || !tag.attrs3[key]) && typeof value === "object") {
          if (!(value == null ? void 0 : value.skip)) {
            if (element._attrsV[key] !== value.to) {
              element._attrsV[key] = value.to;
              if (value == null ? void 0 : value.disabled) {
                ((_a = element._attrs[key]) == null ? void 0 : _a.cancel) && element._attrs[key].cancel();
                element.setAttribute(key, value.to);
              } else
                animateAttr(element, key, value);
            }
          }
        } else {
          if (element._attrsV[key] !== value) {
            element._attrsV[key] = value;
            ((_b = element._attrs[key]) == null ? void 0 : _b.cancel) && element._attrs[key].cancel();
            element.setAttribute(key, value);
          }
        }
      }
    }
  }
}
function getFns2() {
  return {
    updateAttrs: function(element, tag, state, GLOBALS2) {
      Object.entries(tag.updateAttrs(state)).forEach(([key, value]) => {
        GLOBALS2.updateAttribute(tag, element, key, value);
      });
    },
    attrs3: function(element, tag, state, GLOBALS2) {
      Object.entries(tag.attrs3).forEach(([key, value]) => {
        GLOBALS2.updateAttribute(tag, element, key, typeof value === "function" ? value(state) : value);
      });
    },
    updateStyles: function(element, tag, state, GLOBALS2) {
      Object.entries(tag.updateStyles(state)).forEach(([key, value]) => {
        var _a;
        if (typeof value === "object") {
          if (element._styleV[key] !== value.to) {
            if (!(value == null ? void 0 : value.skip)) {
              element._styleV[key] = value.to;
              if (value == null ? void 0 : value.disabled) {
                ((_a = element._styles[key]) == null ? void 0 : _a.cancel) && element._styles[key].cancel();
                element.style.setProperty(key, value.to);
              } else
                GLOBALS2.animateCSS(element, key, value);
            }
          }
        } else {
          if (element._styleV[key] !== value) {
            element._styleV[key] = value;
            element.style.setProperty(key, value);
          }
        }
      });
    },
    style: function(element, tag, state, GLOBALS2) {
      Object.entries(tag.style(state)).forEach(([key, value]) => {
        if (element._styleV[key] !== value) {
          element._styleV[key] = value;
          element.style.setProperty(key, value);
        }
      });
    },
    events: function(element, tag, state, GLOBALS2) {
      element.__datum = { ...state };
      return;
    }
  };
}
function updateProps(tag) {
  const fns = [];
  const FF = getFns2();
  if (tag.updateAttrs)
    fns.push(FF.updateAttrs);
  if (tag.attrs3)
    fns.push(FF.attrs3);
  if (tag.style)
    fns.push(FF.style);
  if (tag.updateStyles)
    fns.push(FF.updateStyles);
  if (tag.events)
    fns.push(FF.events);
  return fns;
}

// src/eue/chainFunc.js
var chainFunc_default = (...funcs) => {
  return funcs.filter((func) => typeof func === "function").reduce((accumulator, func) => {
    if (accumulator === null)
      return func;
    return function chainedFunction(...args) {
      accumulator.apply(this, args);
      func.apply(this, args);
    };
  }, null);
};

// src/GLOBALS.js
var GLOBALS = {
  createElement,
  insertElement,
  prependElement,
  Enter_Children,
  UPDATE_Chidldren,
  Update_Tag,
  animateAttr,
  animateCSS,
  enterProps,
  enterAttribute,
  updateProps,
  updateAttribute
};
var GLOBALS_default = GLOBALS;

// src/eue/enterProps.js
function enterAttribute(tag, element, key, value) {
  var _a;
  if (key === "class") {
    var val = value || void 0;
    element._attrsV[key] = val;
    if (val) {
      if (tag.svg)
        element.setAttribute(key, val);
      else
        element.className = val;
    }
    ;
  } else if (key === "style") {
    var val = value || void 0;
    element._attrsV[key] = val;
    if (val)
      element.setAttribute(key, val);
  } else {
    if (key === "id") {
      element._attrsV[key] = value;
      element.id = value;
      element.setAttribute(key, value);
    } else if (isBooleanAttr(tag.tag, key)) {
      if (tag.tag === "input" && tag.attrs2.type === "radio" && key === "checked" && !tag.attrsB[key]) {
        if (tag.attrs2.value) {
          if (tag.attrs2.value == value) {
            element.setAttribute(key, "");
            element._attrsV[key] = value && true;
          }
        } else if (value) {
          element.setAttribute(key, "");
          element._attrsV[key] = value && true;
        }
      } else {
        element._attrsV[key] = value && true;
        value && element.setAttribute(key, "");
      }
    } else if (tag.tag === "textarea" && key === "value") {
      element._attrsV[key] = value;
      element.innerHTML = value;
    } else {
      ((_a = element._attrs[key]) == null ? void 0 : _a.cancel) && element._attrs[key].cancel();
      element._attrsV[key] = value;
      element.setAttribute(key, value);
    }
  }
}
function getFns3() {
  return {
    enterAttrs: function(element, tag, state, GLOBALS2) {
      Object.entries(tag.enterAttrs(state)).forEach(([key, value]) => {
        var _a;
        if (Array.isArray(value))
          throw "not implemented";
        else {
          if (typeof value === "object") {
            element._attrsV[key] = value;
            GLOBALS2.animateAttr(element, key, value);
          } else {
            ((_a = element._attrs[key]) == null ? void 0 : _a.cancel) && element._attrs[key].cancel();
            GLOBALS2.enterAttribute(tag, element, key, value);
          }
        }
      });
    },
    attrs: function(element, tag, state, GLOBALS2) {
      var attrs = tag.attrs ? tag.attrs(state) : {};
      if (tag.attrs2) {
        Object.entries(tag.attrs2).forEach(([key, value]) => {
          attrs[key] = typeof value === "function" ? value(state) : value;
        });
      }
      Object.entries(attrs).forEach(([key, value]) => {
        GLOBALS2.enterAttribute(tag, element, key, value);
      });
    },
    enterStyles: function(element, tag, state, GLOBALS2) {
      Object.entries(tag.enterStyles(state)).forEach(([key, value]) => {
        var _a;
        if (Array.isArray(value))
          throw "not implemented";
        else {
          if (typeof value === "object") {
            element._styleV[key] = value.to;
            GLOBALS2.animateCSS(element, key, value);
          } else {
            element._styleV[key] = value;
            ((_a = element._styles[key]) == null ? void 0 : _a.cancel) && element._styles[key].cancel();
            element.style.setProperty(key, value);
          }
        }
      });
    },
    style: function(element, tag, state, GLOBALS2) {
      Object.entries(tag.style(state)).forEach(([key, value]) => {
        element._styleV[key] = value;
        element.style.setProperty(key, value);
      });
    },
    events: function(element, tag, state, GLOBALS2) {
      element.__datum = { ...state };
      Object.entries(tag.events).forEach(([name, value]) => {
        element._events[name] = (event) => value(event, element.__datum, element);
        element.addEventListener(name, element._events[name]);
      });
    }
  };
}
function enterProps(tag) {
  const fns = [];
  const FF = getFns3();
  if (tag.enterAttrs)
    fns.push(FF.enterAttrs);
  if (tag.attrs || tag.attrs2)
    fns.push(FF.attrs);
  if (tag.style)
    fns.push(FF.style);
  if (tag.enterStyles)
    fns.push(FF.enterStyles);
  if (tag.events)
    fns.push(FF.events);
  return fns;
}

// src/eue/ENTER.js
function Enter_Keyed_Loop(_tag) {
  return (tag, container, _prevElement, state, index, data, GLOBALS2) => {
    var keys = {};
    var exit = /* @__PURE__ */ new Map();
    var elements = [];
    var prevElement = _prevElement;
    data.forEach((loopState, i) => {
      var element = GLOBALS2.createElement(tag, container);
      element.key = tag.key(loopState, i);
      keys[element.key] = true;
      elements.push(element);
      state[tag.loop_alias] = loopState;
      if (tag.loop_key_alias)
        state[tag.loop_key_alias] = i;
      tag.enterProps && tag.enterProps(element, tag, state, GLOBALS2);
      if (tag.children) {
        GLOBALS2.Enter_Children(element, tag.children, state);
      } else {
        if (tag.text) {
          if (typeof tag.text === "function") {
            element.textContent = element.__lastText = tag.text(state);
          } else {
            element.textContent = element.__lastText = tag.text;
          }
        }
        if (tag.html) {
          if (typeof tag.html === "function") {
            element.innerHTML = element.__lastHTML = tag.html(state);
          } else {
            element.innerHTML = element.__lastHTML = tag.html;
          }
        }
      }
      if (i === 0 && !prevElement) {
        GLOBALS2.prependElement(container, element);
      } else {
        prevElement.after(element);
      }
      prevElement = element;
    });
    container.__i__[index] = {
      length: data.length,
      exit,
      elements,
      keys
    };
    return prevElement;
  };
}
function Enter_Children_Light(container, component, state, GLOBALS2) {
  container.__i__ = {};
  component.forEach((tag, index) => {
    if (tag.if) {
      if (!tag.if(state)) {
        container.__i__[index] = false;
        return;
      }
    }
    if (tag.loop) {
      let data = tag.loop(state);
      if (!data.length) {
        container.__i__[index] = false;
        return;
      } else {
        throw 123;
        const childNodes = container.__rendererName ? container._childNodes : container.children;
        Enter_Light(childNodes[index], tag, state, GLOBALS2, true);
        return;
      }
    } else {
      const childNodes = container.__rendererName ? container._childNodes : container.children;
      Enter_Light(childNodes[index], tag, state, GLOBALS2, true);
      return;
    }
  });
}
function Enter_Light(element, tag, state, GLOBALS2, isExit) {
  if (tag.enterProps)
    tag.enterProps(element, tag, state, GLOBALS2);
  if (tag.children) {
    if (!isExit)
      Enter_Children(element, tag.children, state);
    else
      Enter_Children_Light(element, tag.children, state, GLOBALS2);
  } else {
    if (tag.text) {
      if (typeof tag.text === "function") {
        element.textContent = element.__lastText = tag.text(state);
      } else {
        element.textContent = element.__lastText = tag.text;
      }
    }
    if (tag.html) {
      if (typeof tag.html === "function") {
        element.innerHTML = element.__lastHTML = tag.html(state);
      } else {
        element.innerHTML = element.__lastHTML = tag.html;
      }
    }
  }
  return element;
}
function Enter_Text(tag, container, prevElement, state, index) {
  tag.element = document.createTextNode(tag.content);
  if (prevElement) {
    prevElement.after(tag.element);
  } else {
    container.prepend(tag.element);
  }
  container.__i__[index] = { exit: false };
  return tag.element;
}
function Enter_Single(_tag) {
  return (tag, container, prevElement, state, index, ____, GLOBALS2) => {
    var element = GLOBALS2.createElement(tag, container);
    tag.enterProps && tag.enterProps(element, tag, state, GLOBALS2);
    if (tag.text) {
      if (typeof tag.text === "function") {
        element.textContent = element.__lastText = tag.text(state);
      } else {
        element.textContent = element.__lastText = tag.text;
      }
    }
    if (tag.html) {
      if (typeof tag.html === "function") {
        element.innerHTML = element.__lastHTML = tag.html(state);
      } else {
        element.innerHTML = element.__lastHTML = tag.html;
      }
    }
    GLOBALS2.insertElement(container, element, prevElement);
    container.__i__[index] = { exit: false };
    return element;
  };
}
function Enter_Single_with_Children(_tag) {
  return (tag, container, prevElement, state, index, ____, GLOBALS2) => {
    var element = GLOBALS2.createElement(tag, container);
    tag.enterProps && tag.enterProps(element, tag, state, GLOBALS2);
    GLOBALS2.insertElement(container, element, prevElement);
    GLOBALS2.Enter_Children(element, tag.children, state);
    container.__i__[index] = { exit: false };
    return element;
  };
}
function Enter_Children(container, component, state) {
  container.__i__ = {};
  var prevElement;
  component.forEach((tag, index) => {
    if (tag.if) {
      if (!tag.if(state)) {
        container.__i__[index] = false;
        return;
      }
    }
    if (tag.loop) {
      let data = tag.loop(state);
      if (!data.length) {
        container.__i__[index] = false;
        return;
      } else {
        prevElement = tag.enter(tag, container, prevElement, state, index, data, GLOBALS_default);
        return;
      }
    } else {
      prevElement = tag.enter(tag, container, prevElement, state, index, void 0, GLOBALS_default);
      return;
    }
  });
}

// src/eue/buildEnterProps.js
function buildEnterProps(tag) {
  if (tag.tag === "#text") {
    tag.enter = Enter_Text;
    return;
  }
  tag.enterProps = enterProps(tag);
  tag.updateProps = updateProps(tag);
  tag.Update_Tag = Update_Tag(tag);
  if (tag.loop) {
    tag.enter = Enter_Keyed_Loop(tag);
  } else {
    tag.enter = tag.children ? Enter_Single_with_Children(tag) : Enter_Single(tag);
  }
}

// src/compiler/AsyncFunction.js
var AsyncFunction = Object.getPrototypeOf(async function() {
}).constructor;
var AsyncFunction_default = AsyncFunction;

// src/parser/applyContext.js
var SVG = [
  "svg",
  "g",
  "path",
  "polygon",
  "rect",
  "circle",
  "line",
  "clipPath",
  "cursor",
  "defs",
  "desc",
  "ellipse",
  "filter",
  "font",
  "glyph",
  "image",
  "text",
  "textPath",
  "animate",
  "animateMotion",
  "animateTransform"
];
var makeFn = (item, fn) => new Function(`return ({ ${item.context.join(",")} }) => ${item[fn]}`)();
var makeFn2 = (item, fn) => new Function(`return ({ ${item.context.join(",")} }) => ({${item[fn]}})`)();
var makeFn3 = (item, value, value2) => new Function(`return (event, { ${item.context.join(",")} }, element) => {setTimeout(()=>this.render(),0);${value} = event.target.${value2}} `)();
var makeFn4 = (item, props) => new Function(`return async (event, { ${item.context.join(",")} }, element) => ${props}`)();
var makeFn5 = (item, props) => new Function(`return ({ ${item.context.join(",")} }) => ${props.value + (props.args || "")}`)();
function applyContext(tree, context, proto) {
  tree.forEach((item, index) => {
    if (SVG.includes(item.tag))
      item.svg = true;
    item.context = [...context];
    if (item.loop_alias) {
      item.loop = makeFn(item, "loop_fn");
      item.context.push(item.loop_alias);
      if (item.loop_key_alias)
        item.context.push(item.loop_key_alias);
    }
    if (item.textFn) {
      item.text = makeFn(item, "textFn");
      delete item.textFn;
    }
    if (item.htmlFn) {
      item.html = makeFn(item, "htmlFn");
      delete item.htmlFn;
    }
    if (item.if) {
      item.if = makeFn(item, "if");
    }
    ["style", "attrs", "enterStyles", "updateStyles", "exitStyles", "enterAttrs", "updateAttrs", "exitAttrs"].forEach((block) => {
      if (item[block])
        item[block] = makeFn2(item, block);
    });
    if (item.events) {
      Object.entries(item.events).forEach(([name, props]) => {
        if (typeof props === "string") {
          item.events[name] = makeFn4(item, props);
        }
      });
    }
    if (item.attrsR && Object.keys(item.attrsR).length) {
      Object.entries(item.attrsR).forEach(([key, value]) => {
        if (!item.events)
          item.events = {};
        if (item.events["input"]) {
          throw "@input and reactive attr at the same time";
        } else {
          if (item.tag === "input") {
            if (key === "value") {
              item.events["input"] = makeFn3(item, value, "value");
            } else if (key === "checked") {
              if (item.attrs2.type === "checkbox") {
                item.events["input"] = makeFn3(item, value, "checked");
              } else if (item.attrs2.type === "radio") {
                item.events["input"] = makeFn3(item, value, "value");
              }
            }
          } else if (item.tag === "textarea" && key === "value") {
            item.events["input"] = makeFn3(item, value, "value");
          }
        }
      });
    }
    if (item.attrs2) {
      if (Object.keys(item.attrs2).length)
        item.attrs3 = {};
      Object.entries(item.attrs2).forEach(([name, props]) => {
        if (typeof props === "object" && props.type === "jsAttribute") {
          item.attrs3[name] = item.attrs2[name] = makeFn5(item, props);
        }
      });
      if (!Object.keys(item.attrs3).length)
        delete item.attrs3;
    }
    buildEnterProps(item);
    if (item.children)
      applyContext(item.children, item.context, proto);
  });
  return tree;
}

// src/parser/parseTemplate.js
function stripEmpty(nodes) {
  return nodes.filter((n) => {
    if (n.nodeType === "bracket") {
      const inner = n.innerContent.split(" ").join("");
      if (["", "/", "@", "@/", "/@"].includes(inner))
        throw `Empty tag <${inner}>`;
    }
    if (n.nodeType === "text" && !n.content.trim().length)
      return false;
    return true;
  });
}
function tokenize(template = "") {
  return stripEmpty(
    parseBrackets_default(template, { skip: true, pairs: ["<>", "{}", "()", "[]"] })
  );
}
function parseTemplate(template, aliases = [], proto = false) {
  return applyContext(
    toTree_default(
      parseAttributes(
        tokenize(template)
      ),
      aliases
    ),
    ["state"],
    proto
  );
}

// src/parser/parseComponent.js
var uniqueBlocks = "static|template|state|class|style|walt";
function splitNewLines(text) {
  return text.split(/\r\n|\n|\r/);
}
function testUniqueBlock(str, blocks) {
  const i = str.match(new RegExp(`^\\s*<!(${blocks})>\\s*$`, "i"));
  return i ? i[1] : null;
}
function testBlock(str, block) {
  const i = str.match(new RegExp(`^\\s*<!${block}\\s+([^>]*)>\\s*$`, "i"));
  return i ? i[1] : null;
}
async function parseBlocks(source) {
  const lines = splitNewLines(source);
  const blocks = {};
  var block = void 0;
  var templateLine = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim().length)
      continue;
    const test = testUniqueBlock(line, uniqueBlocks);
    if (!test) {
      if (["css", "import", "tag", "renderer"].some((_block) => {
        const testUB = testBlock(line, _block);
        if (testUB) {
          block = _block;
          if (!blocks[block])
            blocks[block] = [];
          blocks[_block].push(block === "tag" ? { value: testUB, line: i } : testUB);
          return true;
        }
      }))
        continue;
    }
    if (!block && !test) {
      block = "template";
      templateLine = i;
      blocks.template = "";
      blocks.template += "\n" + line;
      continue;
    }
    if (!test) {
      if (["css", "import", "tag", "renderer"].includes(block)) {
        if (!blocks.template) {
          block = "template";
          templateLine = i;
          blocks.template = "";
        } else {
          if (line.trim().startsWith("//")) {
            continue;
          } else {
            throw `unexpected "${line.trim()}" at line ${i}. Template started at line ${templateLine}`;
          }
        }
      }
      blocks[block] += "\n" + line;
      continue;
    } else {
      block = test;
      if (!blocks[test])
        blocks[test] = "";
      else
        throw `duplicate <!${test}> block at line ${i}`;
      continue;
    }
  }
  return blocks;
}
function stripQuotes(str) {
  return ['"', "'", "`"].includes(str[0]) && str[0] == str[str.length - 1] ? str.substring(1, str.length - 1).trim() : str.trim();
}
function parseTagDirective(tag) {
  const result = {};
  const args = splitByChar(tag.value, " ", true).map(stripQuotes);
  if (args.length > 2)
    throw `excess arguments <!tag ${tag.value}> at line ${tag.line}`;
  if (args.some((a) => !a))
    throw `empty argument <!tag ${tag.value}> at line ${tag.line}`;
  if (args.length === 1) {
    if (args[0][0] === "@")
      throw `alias is present but path is not <!tag ${tag.value}> at line ${tag.line}`;
    result.alias = "@" + args[0].split("\\").pop().split("/").pop();
    result.path = args[0];
  } else {
    if (args[0][0] !== "@")
      throw `missing alias identifier "@" <!tag ${tag.value}> at line ${tag.line}`;
    result.alias = args[0];
    result.path = args[1];
  }
  return result;
}
function parseCSSDirective(tag) {
  const splitted = splitByChar(tag, " ", true);
  if (splitted.length > 1)
    throw `excess parameters <!import ${tag}>`;
  return stripQuotes(tag);
}
function parseRendererDirective(tag) {
  const splitted = splitByChar(tag, " ", true);
  if (splitted.length > 2)
    throw `excess parameters <!renderer ${tag}>`;
  if (splitted.length == 2 && splitted[1] !== "html")
    throw `unknown second parameter <!renderer ${tag}>`;
  return stripQuotes(tag);
}
function validateName(name) {
  try {
    Function("var " + name);
  } catch (e) {
    return false;
  }
  return true;
}
function parseImportDirective(tag) {
  const splitted = splitByChar(tag, " ", true);
  if (splitted.length < 3)
    throw `not enough parameters <!import ${tag}>`;
  if (splitted.length === 3) {
    if (splitted[1].toLowerCase() !== "from")
      throw `wrong parameters <!import ${tag}>`;
    if (splitted[0].startsWith("{") && splitted[0].endsWith("}")) {
      const vars = splitted[0].substring(1, splitted[0].length - 1);
      if (!vars.length)
        throw `wrong parameters <!import ${tag}>`;
      const vars2 = vars.split(",").map((v) => v.trim());
      if (!vars2.every(validateName))
        throw `invalid variable name <!import ${tag}>`;
      return {
        type: "object",
        import: splitted[0],
        path: stripQuotes(splitted[2])
      };
    } else {
      if (!validateName(splitted[0]))
        throw `invalid variable name <!import ${tag}>`;
      return {
        type: "var",
        import: splitted[0],
        path: stripQuotes(splitted[2])
      };
    }
  } else {
    try {
      var brackets = parseBrackets_default(tag, { pairs: ["{}"] });
    } catch (e) {
      throw `invalid variable name <!import ${tag}>`;
    }
    if (brackets.length > 2) {
      throw `wrong parameters <!import ${tag}>`;
    } else if (brackets.length === 1) {
      if (brackets[0].nodeType === "bracket")
        throw `wrong parameters <!import ${tag}>`;
      if (splitted[0] === "*" && splitted[1].toLowerCase() === "as" && splitted[3].toLowerCase() === "from" && splitted.length === 5) {
        if (!validateName(splitted[2]))
          throw `invalid variable name <!import ${tag}>`;
        return {
          type: "*",
          import: splitted[2],
          path: stripQuotes(splitted[4])
        };
      } else
        throw `wrong parameters <!import ${tag}>`;
    } else {
      const splitted2 = splitByChar(brackets[1].content, " ", true);
      if (splitted2.length !== 2 || splitted2[0].toLowerCase() !== "from")
        throw `wrong parameters <!import ${tag}>`;
      if (!brackets[0].innerContent.trim().length)
        throw `wrong parameters <!import ${tag}>`;
      const vars2 = brackets[0].innerContent.split(",").map((v) => v.trim());
      if (!vars2.every(validateName))
        throw `invalid variable name <!import ${tag}>`;
      return {
        type: "object",
        import: "{" + vars2.join(",") + "}",
        path: stripQuotes(splitted2[1])
      };
    }
  }
}
async function parseComponent(source) {
  const blocks = await parseBlocks(source);
  if (blocks.tag)
    blocks.tag = blocks.tag.map(parseTagDirective);
  if (blocks.css)
    blocks.css = blocks.css.map(parseCSSDirective);
  if (blocks.import)
    blocks.import = blocks.import.map(parseImportDirective);
  if (blocks.renderer)
    blocks.renderer = blocks.renderer.map(parseRendererDirective);
  return blocks;
}

// src/runtime/toProto.js
function _toProto(item) {
  [
    "Update_Tag",
    "enterProps",
    "updateProps"
  ].forEach((x) => {
    if (Array.isArray(item[x])) {
      if (item[x].length) {
        item[x] = chainFunc_default(...item[x]);
      } else
        delete item[x];
    }
  });
  return item;
}
function toProto(items) {
  items.forEach((item, i) => {
    items[i] = _toProto(item);
    if (item.children)
      toProto(item.children);
  });
}

// src/eue/Spring.js
var Spring = class {
  constructor({
    stiffness = 300,
    damping = 70,
    mass = 10,
    delta = 0.01,
    target,
    current,
    callback,
    done
  } = {}) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.delta = delta;
    this.mass = mass;
    this.callback = callback;
    this.done = done;
    this.target = target || 0;
    this.current = current || 0;
    this.running = false;
    this.velocity = 0;
    this.acceleration = 0;
    this.step();
  }
  set(value, fastForward = false) {
    this.target = value;
    if (fastForward)
      this.current = value;
    else if (!this.running)
      this.step();
  }
  stop() {
    cancelAnimationFrame(this.rafId);
    if (this.done)
      this.done(this.current);
  }
  start() {
    this.step();
  }
  step() {
    if (!this.isAtTarget()) {
      let delta = this.lastFrameTime ? Math.min(Math.max((Date.now() - this.lastFrameTime) / 1e3, 1 / 120), 1 / 30) : 1 / 60;
      this.running = true;
      this.advance(delta);
      this.lastFrameTime = Date.now();
      this.rafId = requestAnimationFrame(() => this.step());
    } else {
      this.current = this.target;
      this.running = false;
      if (this.done)
        this.done(this.current);
    }
    if (this.callback)
      this.callback(this.current);
  }
  advance(delta) {
    const stiffness = -this.stiffness * (this.current - this.target);
    const damper = -this.damping * this.velocity;
    this.acceleration = (stiffness + damper) / this.mass;
    this.velocity += this.acceleration * delta;
    this.current += this.velocity * delta;
  }
  isAtTarget() {
    return Math.abs(this.target - this.current) < this.delta && Math.abs(this.velocity) <= this.delta;
  }
};

// plugins/walt/walt.js
var Walt = function(exports2) {
  "use strict";
  var immutable = extend;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function extend() {
    var target = {};
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  const identity = (id2) => id2;
  function map(visitors) {
    function mapper(input) {
      if (!Array.isArray(input)) {
        throw new Error("Transform must be used on an Array. Received " + JSON.stringify(input));
      }
      const visitor = (() => {
        const [node2] = input;
        if (node2.Type in visitors && typeof visitors[node2.Type] === "function") {
          return visitors[node2.Type];
        }
        return identity;
      })();
      if (visitor.length === 2) {
        return visitor(input, mapper);
      }
      const [node, ...rest] = visitor(input);
      const params = node.params.filter(Boolean).map((child) => mapper([child, ...rest]));
      return immutable(node, { params });
    }
    return mapper;
  }
  function mapNode$2(visitor) {
    const nodeMapper = (node) => {
      if (node == null) {
        return node;
      }
      const mappingFunction = (() => {
        if ("*" in visitor && typeof visitor["*"] === "function") {
          return visitor["*"];
        }
        if (node.Type in visitor && typeof visitor[node.Type] === "function") {
          return visitor[node.Type];
        }
        return identity;
      })();
      if (mappingFunction.length === 2) {
        return mappingFunction(node, nodeMapper);
      }
      const mappedNode = mappingFunction(node);
      const params = mappedNode.params.map(nodeMapper);
      return immutable(mappedNode, { params });
    };
    return nodeMapper;
  }
  var mapNode_1$1 = {
    map,
    mapNode: mapNode$2
  };
  var mapNode = mapNode_1$1;
  var mapNode_1 = mapNode.map;
  var mapNode_2 = mapNode.mapNode;
  var walkNode$2 = function(visitor) {
    const walkNode2 = (node) => {
      if (node == null) {
        return node;
      }
      const { params } = node;
      const mappingFunction = (() => {
        if ("*" in visitor && typeof visitor["*"] === "function") {
          return visitor["*"];
        }
        if (node.Type in visitor && typeof visitor[node.Type] === "function") {
          return visitor[node.Type];
        }
        return () => node;
      })();
      if (mappingFunction.length === 2) {
        mappingFunction(node, walkNode2);
        return node;
      }
      mappingFunction(node);
      params.forEach(walkNode2);
      return node;
    };
    return walkNode2;
  };
  var walkNode = walkNode$2;
  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (format === void 0) {
      throw new Error("invariant requires an error message argument");
    }
    if (!condition) {
      var error;
      if (format === void 0) {
        error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function() {
          return args[argIndex++];
        }));
        error.name = "Invariant Violation";
      }
      error.framesToPop = 1;
      throw error;
    }
  };
  var invariant_1 = invariant;
  var commonjsGlobal = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function unwrapExports(x) {
    return x && x.__esModule ? x["default"] : x;
  }
  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }
  var waltSyntax = createCommonjsModule(function(module, exports3) {
    (function(global2, factory2) {
      factory2(exports3);
    })(commonjsGlobal, function(exports4) {
      const tokens = {
        whitespace: /[ \t]+/,
        comment: [{ match: /\/\/.*?$/ }, { match: /\/\*[^]*?\*\//, lineBreaks: true }],
        number: [{ match: /0[xX][0-9a-fA-F]+/ }, { match: /0[oO][0-9]+/ }, { match: /0[bB][01]+/ }, { match: /(?:[0-9]+(?:\.[0-9]+)?e-?[0-9]+)/ }, { match: /[0-9]+\.[0-9]+|[0-9]+/ }],
        char: [{ match: /'(?:\\['\\bfnrtv0]|[^'\\\n])'/, value: (x) => x.slice(1, -1) }],
        string: [{ match: /"(?:\\["\\rn]|[^"\\\n])*?"/, value: (x) => x.slice(1, -1) }, { match: /'(?:\\['\\bfnrtv0]|[^'\\\n])*?'/, value: (x) => x.slice(1, -1) }, { match: /`(?:\\['\\bfnrtv0]|[^'\\])*?`/, value: (x) => x.slice(1, -1) }],
        identifier: {
          match: /[A-Za-z_$][A-Za-z0-9_$]*/,
          keywords: { keyword: [
            // EcmaScript
            "break",
            "if",
            "else",
            "import",
            "as",
            "from",
            "export",
            "return",
            "switch",
            "case",
            "default",
            "const",
            "let",
            "for",
            "continue",
            "do",
            "while",
            "throw",
            "function",
            // s-expression
            "global",
            "module",
            "type",
            "lambda"
          ], type: ["i32", "i64", "f32", "f64", "bool"] }
        },
        punctuator: ["+", "++", "-", "--", ">>", ">>>", "<<", "=", "==", "+=", "-=", "=>", "<=", ">=", "!=", "%", "*", "/", "^", "&", "~", "|", "!", "**", ":", "(", ")", ".", "{", "}", ",", "[", "]", ";", ">", "<", "?", "||", "&&", "{", "}", "..."],
        newline: { match: /(?:\r\n|\r|\n)/, lineBreaks: true }
      };
      const Program = "Program";
      const Keyword = "Keyword";
      const Export = "Export";
      const Import = "Import";
      const Statement = "Statement";
      const IfThenElse = "IfThenElse";
      const Select = "Select";
      const Else = "Else";
      const UnaryExpression = "UnaryExpression";
      const BinaryExpression = "BinaryExpression";
      const TernaryExpression = "TernaryExpression";
      const NumberLiteral = "NumberLiteral";
      const StringLiteral = "StringLiteral";
      const CharacterLiteral = "CharacterLiteral";
      const Punctuator = "Punctuator";
      const Identifier = "Identifier";
      const ArraySubscript = "ArraySubscript";
      const Constant = "Constant";
      const Type = "Type";
      const ArrayType = "ArrayType";
      const DeclType = "DeclType";
      const GenericType = "GenericType";
      const UserType = "UserType";
      const FunctionType = "FunctionType";
      const Declaration = "Declaration";
      const StaticDeclaration = "StaticDeclaration";
      const StaticValueList = "StaticValueList";
      const ImmutableDeclaration = "ImmutableDeclaration";
      const FunctionDeclaration = "FunctionDeclaration";
      const ArrayDeclaration = "ArrayDeclaration";
      const IndirectFunctionCall = "IndirectFunctionCall";
      const FunctionCall = "FunctionCall";
      const Loop = "Loop";
      const MemoryAssignment = "MemoryAssignment";
      const Assignment = "Assignment";
      const AssignmentExpression = "AssignmentExpression";
      const Param = "Param";
      const Typedef = "Typedef";
      const Struct2 = "Struct";
      const UnionType = "UnionType";
      const ReturnStatement = "ReturnStatement";
      const Sequence = "Sequence";
      const ObjectLiteral = "ObjectLiteral";
      const Pair = "Pair";
      const TypeCast = "TypeCast";
      const Break = "Break";
      const Comment = "Comment";
      const Sizeof = "Sizeof";
      const Spread = "Spread";
      const Closure = "Closure";
      const Noop = "Noop";
      const ClosureType = "ClosureType";
      const Block = "Block";
      const ObjectField = "ObjectField";
      const FunctionIndex = "FunctionIndex";
      const FunctionIdentifier = "FunctionIdentifier";
      const FunctionPointer = "FunctionPointer";
      const FunctionArguments = "FunctionArguments";
      const FunctionResult = "FunctionResult";
      const FunctionLocals = "FunctionLocals";
      const NativeMethod = "NativeMethod";
      const Unreachable = "Unreachable";
      const Access = "Access";
      const i322 = "i32";
      const f322 = "f32";
      const i642 = "i64";
      const f642 = "f64";
      const Memory = "Memory";
      const Table = "Table";
      const bool = "bool";
      exports4.Program = Program;
      exports4.Keyword = Keyword;
      exports4.Export = Export;
      exports4.Import = Import;
      exports4.Statement = Statement;
      exports4.IfThenElse = IfThenElse;
      exports4.Select = Select;
      exports4.Else = Else;
      exports4.UnaryExpression = UnaryExpression;
      exports4.BinaryExpression = BinaryExpression;
      exports4.TernaryExpression = TernaryExpression;
      exports4.NumberLiteral = NumberLiteral;
      exports4.StringLiteral = StringLiteral;
      exports4.CharacterLiteral = CharacterLiteral;
      exports4.Punctuator = Punctuator;
      exports4.Identifier = Identifier;
      exports4.ArraySubscript = ArraySubscript;
      exports4.Constant = Constant;
      exports4.Type = Type;
      exports4.ArrayType = ArrayType;
      exports4.DeclType = DeclType;
      exports4.GenericType = GenericType;
      exports4.UserType = UserType;
      exports4.FunctionType = FunctionType;
      exports4.Declaration = Declaration;
      exports4.StaticDeclaration = StaticDeclaration;
      exports4.StaticValueList = StaticValueList;
      exports4.ImmutableDeclaration = ImmutableDeclaration;
      exports4.FunctionDeclaration = FunctionDeclaration;
      exports4.ArrayDeclaration = ArrayDeclaration;
      exports4.IndirectFunctionCall = IndirectFunctionCall;
      exports4.FunctionCall = FunctionCall;
      exports4.Loop = Loop;
      exports4.MemoryAssignment = MemoryAssignment;
      exports4.Assignment = Assignment;
      exports4.AssignmentExpression = AssignmentExpression;
      exports4.Param = Param;
      exports4.Typedef = Typedef;
      exports4.Struct = Struct2;
      exports4.UnionType = UnionType;
      exports4.ReturnStatement = ReturnStatement;
      exports4.Sequence = Sequence;
      exports4.ObjectLiteral = ObjectLiteral;
      exports4.Pair = Pair;
      exports4.TypeCast = TypeCast;
      exports4.Break = Break;
      exports4.Comment = Comment;
      exports4.Sizeof = Sizeof;
      exports4.Spread = Spread;
      exports4.Closure = Closure;
      exports4.Noop = Noop;
      exports4.ClosureType = ClosureType;
      exports4.Block = Block;
      exports4.ObjectField = ObjectField;
      exports4.FunctionIndex = FunctionIndex;
      exports4.FunctionIdentifier = FunctionIdentifier;
      exports4.FunctionPointer = FunctionPointer;
      exports4.FunctionArguments = FunctionArguments;
      exports4.FunctionResult = FunctionResult;
      exports4.FunctionLocals = FunctionLocals;
      exports4.NativeMethod = NativeMethod;
      exports4.Unreachable = Unreachable;
      exports4.Access = Access;
      exports4.i32 = i322;
      exports4.f32 = f322;
      exports4.i64 = i642;
      exports4.f64 = f642;
      exports4.Memory = Memory;
      exports4.Table = Table;
      exports4.bool = bool;
      exports4.builtinTypes = {
        i32: i322,
        f32: f322,
        i64: i642,
        f64: f642,
        Memory,
        Table,
        bool
      };
      exports4.statements = {
        // Main Program
        Program,
        // Syntax Nodes
        Export,
        Import,
        IfThenElse,
        Else,
        Declaration,
        ImmutableDeclaration,
        FunctionDeclaration,
        ArrayDeclaration,
        Loop,
        MemoryAssignment,
        Assignment,
        Typedef,
        Struct: Struct2,
        UnionType,
        ReturnStatement,
        Sequence,
        ObjectLiteral,
        Pair,
        Break,
        Comment,
        Sizeof,
        Spread,
        Noop,
        Block,
        Unreachable
      };
      exports4.default = {
        // Main Program
        Program,
        // Syntax Nodes
        Keyword,
        Export,
        Import,
        Statement,
        IfThenElse,
        Select,
        Else,
        UnaryExpression,
        BinaryExpression,
        TernaryExpression,
        NumberLiteral,
        StringLiteral,
        CharacterLiteral,
        Punctuator,
        Identifier,
        ArraySubscript,
        Constant,
        Type,
        ArrayType,
        DeclType,
        GenericType,
        UserType,
        FunctionType,
        Declaration,
        ImmutableDeclaration,
        FunctionDeclaration,
        ArrayDeclaration,
        StaticDeclaration,
        StaticValueList,
        IndirectFunctionCall,
        FunctionCall,
        Loop,
        MemoryAssignment,
        Assignment,
        AssignmentExpression,
        Param,
        Typedef,
        Struct: Struct2,
        UnionType,
        ReturnStatement,
        Sequence,
        ObjectLiteral,
        Pair,
        TypeCast,
        Break,
        Comment,
        Sizeof,
        Spread,
        Closure,
        Access,
        Noop,
        // Semantic Nodes
        ClosureType,
        Block,
        ObjectField,
        FunctionIndex,
        FunctionIdentifier,
        FunctionPointer,
        FunctionArguments,
        FunctionResult,
        FunctionLocals,
        // Natives
        NativeMethod,
        Unreachable
      };
      exports4.tokens = tokens;
      Object.defineProperty(exports4, "__esModule", { value: true });
    });
  });
  var Syntax = unwrapExports(waltSyntax);
  var waltSyntax_1 = waltSyntax.tokens;
  var waltSyntax_2 = waltSyntax.semantics;
  var waltSyntax_3 = waltSyntax.builtinTypes;
  var waltSyntax_4 = waltSyntax.statements;
  var waltSyntax_5 = waltSyntax.i32;
  var waltSyntax_6 = waltSyntax.f32;
  var waltSyntax_7 = waltSyntax.i64;
  var waltSyntax_8 = waltSyntax.f64;
  var moo = createCommonjsModule(function(module) {
    (function(root, factory2) {
      if (false) {
        (void 0)([], factory2);
      } else if (module.exports) {
        module.exports = factory2();
      } else {
        root.moo = factory2();
      }
    })(commonjsGlobal, function() {
      var hasOwnProperty2 = Object.prototype.hasOwnProperty;
      var assign = typeof Object.assign === "function" ? Object.assign : (
        // https://tc39.github.io/ecma262/#sec-object.assign
        function(target, sources) {
          if (target == null) {
            throw new TypeError("Target cannot be null or undefined");
          }
          target = Object(target);
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            if (source == null)
              continue;
            for (var key in source) {
              if (hasOwnProperty2.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        }
      );
      var hasSticky = typeof new RegExp().sticky === "boolean";
      function isRegExp(o) {
        return o && o.constructor === RegExp;
      }
      function isObject(o) {
        return o && typeof o === "object" && o.constructor !== RegExp && !Array.isArray(o);
      }
      function reEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      function reGroups(s) {
        var re = new RegExp("|" + s);
        return re.exec("").length - 1;
      }
      function reCapture(s) {
        return "(" + s + ")";
      }
      function reUnion(regexps) {
        var source = regexps.map(function(s) {
          return "(?:" + s + ")";
        }).join("|");
        return "(?:" + source + ")";
      }
      function regexpOrLiteral(obj) {
        if (typeof obj === "string") {
          return "(?:" + reEscape(obj) + ")";
        } else if (isRegExp(obj)) {
          if (obj.ignoreCase) {
            throw new Error("RegExp /i flag not allowed");
          }
          if (obj.global) {
            throw new Error("RegExp /g flag is implied");
          }
          if (obj.sticky) {
            throw new Error("RegExp /y flag is implied");
          }
          if (obj.multiline) {
            throw new Error("RegExp /m flag is implied");
          }
          return obj.source;
        } else {
          throw new Error("not a pattern: " + obj);
        }
      }
      function objectToRules(object) {
        var keys = Object.getOwnPropertyNames(object);
        var result = [];
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var thing = object[key];
          var rules = Array.isArray(thing) ? thing : [thing];
          var match = [];
          rules.forEach(function(rule) {
            if (isObject(rule)) {
              if (match.length)
                result.push(ruleOptions(key, match));
              result.push(ruleOptions(key, rule));
              match = [];
            } else {
              match.push(rule);
            }
          });
          if (match.length)
            result.push(ruleOptions(key, match));
        }
        return result;
      }
      function arrayToRules(array) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
          var obj = array[i];
          if (!obj.name) {
            throw new Error("Rule has no name: " + JSON.stringify(obj));
          }
          result.push(ruleOptions(obj.name, obj));
        }
        return result;
      }
      function ruleOptions(name, obj) {
        if (typeof obj !== "object" || Array.isArray(obj) || isRegExp(obj)) {
          obj = { match: obj };
        }
        var options = assign({
          tokenType: name,
          lineBreaks: !!obj.error,
          pop: false,
          next: null,
          push: null,
          error: false,
          value: null,
          getType: null
        }, obj);
        var match = options.match;
        options.match = Array.isArray(match) ? match : match ? [match] : [];
        options.match.sort(function(a, b) {
          return isRegExp(a) && isRegExp(b) ? 0 : isRegExp(b) ? -1 : isRegExp(a) ? 1 : b.length - a.length;
        });
        if (options.keywords) {
          options.getType = keywordTransform(options.keywords);
        }
        return options;
      }
      function compileRules(rules, hasStates) {
        rules = Array.isArray(rules) ? arrayToRules(rules) : objectToRules(rules);
        var errorRule = null;
        var groups = [];
        var parts = [];
        for (var i = 0; i < rules.length; i++) {
          var options = rules[i];
          if (options.error) {
            if (errorRule) {
              throw new Error("Multiple error rules not allowed: (for token '" + options.tokenType + "')");
            }
            errorRule = options;
          }
          if (options.match.length === 0) {
            continue;
          }
          groups.push(options);
          var pat = reUnion(options.match.map(regexpOrLiteral));
          var regexp = new RegExp(pat);
          if (regexp.test("")) {
            throw new Error("RegExp matches empty string: " + regexp);
          }
          var groupCount = reGroups(pat);
          if (groupCount > 0) {
            throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: \u2026 ) instead");
          }
          if (!hasStates && (options.pop || options.push || options.next)) {
            throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.tokenType + "')");
          }
          if (!options.lineBreaks && regexp.test("\n")) {
            throw new Error("Rule should declare lineBreaks: " + regexp);
          }
          parts.push(reCapture(pat));
        }
        var suffix = hasSticky ? "" : "|(?:)";
        var flags = hasSticky ? "ym" : "gm";
        var combined = new RegExp(reUnion(parts) + suffix, flags);
        return { regexp: combined, groups, error: errorRule };
      }
      function compile4(rules) {
        var result = compileRules(rules);
        return new Lexer({ start: result }, "start");
      }
      function compileStates(states, start) {
        var keys = Object.getOwnPropertyNames(states);
        if (!start)
          start = keys[0];
        var map2 = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          map2[key] = compileRules(states[key], true);
        }
        for (var i = 0; i < keys.length; i++) {
          var groups = map2[keys[i]].groups;
          for (var j = 0; j < groups.length; j++) {
            var g = groups[j];
            var state = g && (g.push || g.next);
            if (state && !map2[state]) {
              throw new Error("Missing state '" + state + "' (in token '" + g.tokenType + "' of state '" + keys[i] + "')");
            }
            if (g && g.pop && +g.pop !== 1) {
              throw new Error("pop must be 1 (in token '" + g.tokenType + "' of state '" + keys[i] + "')");
            }
          }
        }
        return new Lexer(map2, start);
      }
      function keywordTransform(map2) {
        var reverseMap = /* @__PURE__ */ Object.create(null);
        var byLength = /* @__PURE__ */ Object.create(null);
        var types = Object.getOwnPropertyNames(map2);
        for (var i = 0; i < types.length; i++) {
          var tokenType = types[i];
          var item = map2[tokenType];
          var keywordList = Array.isArray(item) ? item : [item];
          keywordList.forEach(function(keyword) {
            (byLength[keyword.length] = byLength[keyword.length] || []).push(keyword);
            if (typeof keyword !== "string") {
              throw new Error("keyword must be string (in keyword '" + tokenType + "')");
            }
            reverseMap[keyword] = tokenType;
          });
        }
        function str(x) {
          return JSON.stringify(x);
        }
        var source = "";
        source += "(function(value) {\n";
        source += "switch (value.length) {\n";
        for (var length in byLength) {
          var keywords = byLength[length];
          source += "case " + length + ":\n";
          source += "switch (value) {\n";
          keywords.forEach(function(keyword) {
            var tokenType2 = reverseMap[keyword];
            source += "case " + str(keyword) + ": return " + str(tokenType2) + "\n";
          });
          source += "}\n";
        }
        source += "}\n";
        source += "})";
        return (0, eval)(source);
      }
      var Lexer = function(states, state) {
        this.startState = state;
        this.states = states;
        this.buffer = "";
        this.stack = [];
        this.reset();
      };
      Lexer.prototype.reset = function(data, info) {
        this.buffer = data || "";
        this.index = 0;
        this.line = info ? info.line : 1;
        this.col = info ? info.col : 1;
        this.setState(info ? info.state : this.startState);
        return this;
      };
      Lexer.prototype.save = function() {
        return {
          line: this.line,
          col: this.col,
          state: this.state
        };
      };
      Lexer.prototype.setState = function(state) {
        if (!state || this.state === state)
          return;
        this.state = state;
        var info = this.states[state];
        this.groups = info.groups;
        this.error = info.error || { lineBreaks: true, shouldThrow: true };
        this.re = info.regexp;
      };
      Lexer.prototype.popState = function() {
        this.setState(this.stack.pop());
      };
      Lexer.prototype.pushState = function(state) {
        this.stack.push(this.state);
        this.setState(state);
      };
      Lexer.prototype._eat = hasSticky ? function(re) {
        return re.exec(this.buffer);
      } : function(re) {
        var match = re.exec(this.buffer);
        if (match[0].length === 0) {
          return null;
        }
        return match;
      };
      Lexer.prototype._getGroup = function(match) {
        if (match === null) {
          return -1;
        }
        var groupCount = this.groups.length;
        for (var i = 0; i < groupCount; i++) {
          if (match[i + 1] !== void 0) {
            return i;
          }
        }
        throw new Error("oops");
      };
      function tokenToString() {
        return this.value;
      }
      Lexer.prototype.next = function() {
        var re = this.re;
        var buffer = this.buffer;
        var index2 = re.lastIndex = this.index;
        if (index2 === buffer.length) {
          return;
        }
        var match = this._eat(re);
        var i = this._getGroup(match);
        var group, text;
        if (i === -1) {
          group = this.error;
          text = buffer.slice(index2);
        } else {
          text = match[0];
          group = this.groups[i];
        }
        var lineBreaks = 0;
        if (group.lineBreaks) {
          var matchNL = /\n/g;
          var nl = 1;
          if (text === "\n") {
            lineBreaks = 1;
          } else {
            while (matchNL.exec(text)) {
              lineBreaks++;
              nl = matchNL.lastIndex;
            }
          }
        }
        var token = {
          type: group.getType && group.getType(text) || group.tokenType,
          value: group.value ? group.value(text) : text,
          text,
          toString: tokenToString,
          offset: index2,
          lineBreaks,
          line: this.line,
          col: this.col
          // nb. adding more props to token object will make V8 sad!
        };
        var size = text.length;
        this.index += size;
        this.line += lineBreaks;
        if (lineBreaks !== 0) {
          this.col = size - nl + 1;
        } else {
          this.col += size;
        }
        if (group.shouldThrow) {
          throw new Error(this.formatError(token, "invalid syntax"));
        }
        if (group.pop)
          this.popState();
        else if (group.push)
          this.pushState(group.push);
        else if (group.next)
          this.setState(group.next);
        return token;
      };
      if (typeof Symbol !== "undefined" && Symbol.iterator) {
        var LexerIterator = function(lexer) {
          this.lexer = lexer;
        };
        LexerIterator.prototype.next = function() {
          var token = this.lexer.next();
          return { value: token, done: !token };
        };
        LexerIterator.prototype[Symbol.iterator] = function() {
          return this;
        };
        Lexer.prototype[Symbol.iterator] = function() {
          return new LexerIterator(this);
        };
      }
      Lexer.prototype.formatError = function(token, message) {
        var value = token.value;
        var index2 = token.offset;
        var eol = token.lineBreaks ? value.indexOf("\n") : value.length;
        var start = Math.max(0, index2 - token.col + 1);
        var firstLine = this.buffer.substring(start, index2 + eol);
        message += " at line " + token.line + " col " + token.col + ":\n\n";
        message += "  " + firstLine + "\n";
        message += "  " + Array(token.col).join(" ") + "^";
        return message;
      };
      Lexer.prototype.clone = function() {
        return new Lexer(this.states, this.state);
      };
      Lexer.prototype.has = function(tokenType) {
        for (var s in this.states) {
          var groups = this.states[s].groups;
          for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            if (group.tokenType === tokenType)
              return true;
            if (group.keywords && hasOwnProperty2.call(group.keywords, tokenType)) {
              return true;
            }
          }
        }
        return false;
      };
      return {
        compile: compile4,
        states: compileStates,
        error: Object.freeze({ error: true })
      };
    });
  });
  var slice = Array.prototype.slice;
  var toArray = function(a) {
    return slice.call(a);
  };
  var tail = function(a) {
    return slice.call(a, 1);
  };
  var createFn = function(fn, args, totalArity) {
    var remainingArity = totalArity - args.length;
    switch (remainingArity) {
      case 0:
        return function() {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      case 1:
        return function(a) {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      case 2:
        return function(a, b) {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      case 3:
        return function(a, b, c) {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      case 4:
        return function(a, b, c, d) {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      case 5:
        return function(a, b, c, d, e) {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      case 6:
        return function(a, b, c, d, e, f) {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      case 7:
        return function(a, b, c, d, e, f, g) {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      case 8:
        return function(a, b, c, d, e, f, g, h) {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      case 9:
        return function(a, b, c, d, e, f, g, h, i) {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      case 10:
        return function(a, b, c, d, e, f, g, h, i, j) {
          return processInvocation(fn, concatArgs(args, arguments), totalArity);
        };
      default:
        return createEvalFn(fn, args, remainingArity);
    }
  };
  var concatArgs = function(args1, args2) {
    return args1.concat(toArray(args2));
  };
  var createEvalFn = function(fn, args, arity) {
    var argList = makeArgList(arity);
    var fnStr = "false||function(" + argList + "){ return processInvocation(fn, concatArgs(args, arguments)); }";
    return (0, eval)(fnStr);
  };
  var makeArgList = function(len) {
    var a = [];
    for (var i = 0; i < len; i += 1)
      a.push("a" + i.toString());
    return a.join(",");
  };
  var trimArrLength = function(arr, length) {
    if (arr.length > length)
      return arr.slice(0, length);
    else
      return arr;
  };
  var processInvocation = function(fn, argsArr, totalArity) {
    argsArr = trimArrLength(argsArr, totalArity);
    if (argsArr.length === totalArity)
      return fn.apply(null, argsArr);
    return createFn(fn, argsArr, totalArity);
  };
  var curry = function(fn) {
    return createFn(fn, [], fn.length);
  };
  curry.to = curry(function(arity, fn) {
    return createFn(fn, [], arity);
  });
  curry.adaptTo = curry(function(num, fn) {
    return curry.to(num, function(context) {
      var args = tail(arguments).concat(context);
      return fn.apply(this, args);
    });
  });
  curry.adapt = function(fn) {
    return curry.adaptTo(fn.length, fn);
  };
  var curry_1 = curry;
  function id(x) {
    return x[0];
  }
  function grammar() {
    const lexer = this.lexer;
    const Syntax2 = this.Syntax;
    const {
      extendNode: extendNode2,
      drop: drop2,
      nth: nth2,
      nuller: nuller2,
      nonEmpty: nonEmpty2,
      add: add2,
      flatten: flatten2,
      compose: compose2
    } = this.helpers;
    const {
      node,
      binary,
      constant,
      identifier,
      statement,
      unary: unary2,
      ternary,
      subscript,
      access,
      fun,
      declaration,
      call,
      struct,
      result,
      string,
      char,
      typedef,
      voidFun,
      type,
      arrayType,
      assignment,
      forLoop,
      whileLoop,
      typeGeneric,
      spread,
      builtinDecl,
      assignmentExpr,
      addressOf
    } = this.nodes(lexer);
    return {
      Lexer: lexer,
      ParserRules: [{ "name": "_$ebnf$1", "symbols": [] }, { "name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {
        return null;
      } }, { "name": "__$ebnf$1", "symbols": ["wschar"] }, { "name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {
        return null;
      } }, { "name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id }, { "name": "Struct", "symbols": ["TYPE", "__", "Identifier", "_", "EQUALS", "_", "Union", "SEPARATOR"], "postprocess": struct }, { "name": "Struct", "symbols": ["TYPE", "__", "Identifier", "_", "EQUALS", "_", "NativeType", "SEPARATOR"], "postprocess": struct }, { "name": "Union", "symbols": ["StructDefinition"], "postprocess": id }, { "name": "Union", "symbols": ["StructDefinition", "_", "OR", "_", "Union"], "postprocess": node(Syntax2.UnionType) }, { "name": "StructDefinition", "symbols": ["ArrayType"], "postprocess": id }, { "name": "StructDefinition", "symbols": ["Identifier"], "postprocess": id }, { "name": "StructDefinition", "symbols": ["LCB", "_", "StructBody", "_", "RCB"], "postprocess": compose2(node(Syntax2.ObjectLiteral), flatten2) }, { "name": "StructBody", "symbols": ["StructNameAndType"], "postprocess": id }, { "name": "StructBody", "symbols": ["StructNameAndType", "_", "COMMA", "_", "StructBody"], "postprocess": flatten2 }, { "name": "StructNameAndType", "symbols": ["Identifier", "_", "COLON", "_", "Type"], "postprocess": node(Syntax2.Pair) }, { "name": "StructNameAndType", "symbols": ["AddressOf", "_", "COLON", "_", "Type"], "postprocess": node(Syntax2.Pair) }, { "name": "AddressOf", "symbols": ["AND", "Identifier"], "postprocess": addressOf }, { "name": "TypeDef", "symbols": ["TYPE", "__", "Identifier", "_", "EQUALS", "_", "TypeDefinition", "_", "FATARROW", "_", "Type", "_", "SEPARATOR"], "postprocess": compose2(typedef) }, { "name": "TypeDefinition", "symbols": ["LB", "_", "TypeList", "_", "RB"], "postprocess": flatten2 }, { "name": "TypeDefinition", "symbols": ["LB", "_", "RB"], "postprocess": flatten2 }, { "name": "TypeList", "symbols": ["Type"], "postprocess": id }, { "name": "TypeList", "symbols": ["Type", "_", "COMMA", "_", "TypeList"], "postprocess": flatten2 }, { "name": "_Type", "symbols": ["NativeType"], "postprocess": id }, { "name": "_Type", "symbols": ["GenericType"], "postprocess": id }, { "name": "_Type", "symbols": ["Identifier"], "postprocess": id }, { "name": "ArrayType", "symbols": ["_Type", "_", "LSB", "_", "RSB"], "postprocess": arrayType }, { "name": "Type", "symbols": ["_Type"], "postprocess": id }, { "name": "Type", "symbols": ["ArrayType"], "postprocess": id }, { "name": "GenericType", "symbols": ["Identifier", "LT", "_", "StaticObjectLiteral", "_", "GT"], "postprocess": typeGeneric }, { "name": "StaticObjectLiteral", "symbols": ["LCB", "_", "RCB"], "postprocess": compose2(node(Syntax2.ObjectLiteral)) }, { "name": "StaticObjectLiteral", "symbols": ["LCB", "_", "StaticPropertyList", "_", "RCB"], "postprocess": compose2(node(Syntax2.ObjectLiteral), flatten2) }, { "name": "StaticPropertyValue", "symbols": ["Number"], "postprocess": id }, { "name": "StaticPropertyValue", "symbols": ["Boolean"], "postprocess": id }, { "name": "StaticPropertyValue", "symbols": ["StringLiteral"], "postprocess": id }, { "name": "StaticProperty", "symbols": ["Identifier", "_", "COLON", "_", "StaticPropertyValue"], "postprocess": node(Syntax2.Pair) }, { "name": "StaticPropertyList", "symbols": ["StaticProperty"], "postprocess": id }, { "name": "StaticPropertyList", "symbols": ["StaticProperty", "_", "COMMA", "_", "StaticPropertyList"], "postprocess": flatten2 }, { "name": "ObjectLiteral", "symbols": ["LCB", "_", "RCB"], "postprocess": node(Syntax2.ObjectLiteral) }, { "name": "ObjectLiteral", "symbols": ["LCB", "_", "PropertyList", "_", "RCB"], "postprocess": compose2(node(Syntax2.ObjectLiteral), flatten2) }, { "name": "PropertyList", "symbols": ["Property"], "postprocess": id }, { "name": "PropertyList", "symbols": ["Property", "_", "COMMA", "_", "PropertyList"], "postprocess": flatten2 }, { "name": "Property", "symbols": ["Identifier", "_", "COLON", "_", "Ternary"], "postprocess": node(Syntax2.Pair) }, { "name": "Property", "symbols": ["SPREAD", "Identifier"], "postprocess": spread }, { "name": "Property", "symbols": ["Identifier"], "postprocess": id }, { "name": "Import", "symbols": ["IMPORT", "_", "ImportDefinition", "__", "FROM", "__", "StringLiteral", "_", "SEPARATOR"], "postprocess": node(Syntax2.Import) }, { "name": "ImportDefinition", "symbols": ["LCB", "_", "ImportAndTypeList", "_", "RCB"], "postprocess": compose2(node(Syntax2.ObjectLiteral), flatten2) }, { "name": "ImportAndTypeList", "symbols": ["ImportName"], "postprocess": id }, { "name": "ImportAndTypeList", "symbols": ["ImportAndType"], "postprocess": id }, { "name": "ImportAndTypeList", "symbols": ["ImportName", "_", "COMMA", "_", "ImportAndTypeList"], "postprocess": flatten2 }, { "name": "ImportAndTypeList", "symbols": ["ImportAndType", "_", "COMMA", "_", "ImportAndTypeList"], "postprocess": flatten2 }, { "name": "ImportAndType", "symbols": ["ImportName", "_", "COLON", "_", "Type"], "postprocess": node(Syntax2.Pair) }, { "name": "ImportAndType", "symbols": ["ImportName", "_", "AS", "_", "Identifier"], "postprocess": node(Syntax2.BinaryExpression, { value: "as" }) }, { "name": "ImportAndType", "symbols": ["ImportAndType", "_", "AS", "_", "Identifier"], "postprocess": node(Syntax2.BinaryExpression, { value: "as" }) }, { "name": "ImportName", "symbols": ["Identifier"], "postprocess": id }, { "name": "If", "symbols": ["IF", "_", "LB", "_", "Expression", "_", "RB", "_", "BranchBody"], "postprocess": node(Syntax2.IfThenElse) }, { "name": "If", "symbols": ["IF", "_", "LB", "_", "Expression", "_", "RB", "_", "BranchBody", "_", "Else"], "postprocess": node(Syntax2.IfThenElse) }, { "name": "Else", "symbols": ["ELSE", "_", "BranchBody"], "postprocess": node(Syntax2.Else) }, { "name": "BranchBody", "symbols": ["Statement"], "postprocess": id }, { "name": "BranchBody", "symbols": ["Block"], "postprocess": id }, { "name": "For", "symbols": ["FOR", "_", "LB", "_", "ForArg", "_", "SEPARATOR", "_", "Expression", "_", "SEPARATOR", "_", "ForArg", "_", "RB", "_", "BranchBody"], "postprocess": forLoop }, { "name": "ForArg", "symbols": ["_Assignment"], "postprocess": id }, { "name": "ForArg", "symbols": ["Ternary"], "postprocess": id }, { "name": "While", "symbols": ["WHILE", "_", "LB", "_", "Expression", "_", "RB", "_", "BranchBody"], "postprocess": whileLoop }, { "name": "Break", "symbols": ["BREAK", "_", "SEPARATOR"], "postprocess": node(Syntax2.Break) }, { "name": "Program", "symbols": ["_"], "postprocess": compose2(node("Program", { value: "ROOT_NODE" }), flatten2) }, { "name": "Program", "symbols": ["_", "SourceElementList", "_"], "postprocess": compose2(node("Program", { value: "ROOT_NODE" }), flatten2) }, { "name": "SourceElementList", "symbols": ["SourceElement"], "postprocess": flatten2 }, { "name": "SourceElementList", "symbols": ["SourceElement", "_", "SourceElementList"], "postprocess": compose2(drop2, flatten2, flatten2) }, { "name": "SourceElement", "symbols": ["Function"], "postprocess": id }, { "name": "SourceElement", "symbols": ["GlobalDeclaration"], "postprocess": id }, { "name": "SourceElement", "symbols": ["GlobalImmutableDeclaration"], "postprocess": id }, { "name": "SourceElement", "symbols": ["StaticDeclaration"], "postprocess": id }, { "name": "SourceElement", "symbols": ["Struct"], "postprocess": id }, { "name": "SourceElement", "symbols": ["TypeDef"], "postprocess": id }, { "name": "SourceElement", "symbols": ["Export"], "postprocess": id }, { "name": "SourceElement", "symbols": ["Import"], "postprocess": id }, { "name": "Statement", "symbols": ["ExpressionStatement"], "postprocess": id }, { "name": "Statement", "symbols": ["Declaration"], "postprocess": id }, { "name": "Statement", "symbols": ["ImmutableDeclaration"], "postprocess": id }, { "name": "Statement", "symbols": ["Assignment"], "postprocess": id }, { "name": "Statement", "symbols": ["If"], "postprocess": id }, { "name": "Statement", "symbols": ["For"], "postprocess": id }, { "name": "Statement", "symbols": ["While"], "postprocess": id }, { "name": "Statement", "symbols": ["Break"], "postprocess": id }, { "name": "Statement", "symbols": ["Unreachable"], "postprocess": id }, { "name": "Statement", "symbols": ["ReturnStatement"], "postprocess": id }, { "name": "Block", "symbols": ["LCB", "_", "RCB"], "postprocess": node(Syntax2.Block) }, { "name": "Block", "symbols": ["LCB", "_", "StatementList", "_", "RCB"], "postprocess": compose2(node(Syntax2.Block), flatten2) }, { "name": "StatementList", "symbols": ["Statement"], "postprocess": drop2 }, { "name": "StatementList", "symbols": ["Statement", "_", "StatementList"], "postprocess": flatten2 }, { "name": "Function", "symbols": ["FUNCTION", "__", "Identifier", "_", "FunctionParameters", "_", "Block"], "postprocess": voidFun }, { "name": "Function", "symbols": ["FUNCTION", "__", "Identifier", "_", "FunctionParameters", "_", "FunctionResult", "_", "Block"], "postprocess": fun }, { "name": "FunctionParameters", "symbols": ["LB", "_", "RB"], "postprocess": node(Syntax2.FunctionArguments) }, { "name": "FunctionParameters", "symbols": ["LB", "_", "ParameterList", "_", "RB"], "postprocess": compose2(node(Syntax2.FunctionArguments), flatten2, flatten2) }, { "name": "ParameterList", "symbols": ["NameAndType"], "postprocess": id }, { "name": "ParameterList", "symbols": ["NameAndType", "_", "COMMA", "_", "ParameterList"], "postprocess": flatten2 }, { "name": "NameAndType", "symbols": ["Identifier", "_", "COLON", "_", "DeclType"], "postprocess": node(Syntax2.Pair) }, { "name": "DeclType", "symbols": ["Type"], "postprocess": compose2(extendNode2({ Type: Syntax2.DeclType }), nth2(0)) }, { "name": "FunctionResult", "symbols": ["COLON", "_", "Type"], "postprocess": compose2(result, drop2) }, { "name": "GlobalDeclaration", "symbols": ["LET", "_", "NameAndType", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.Declaration) }, { "name": "GlobalDeclaration", "symbols": ["LET", "_", "NameAndType", "_", "EQUALS", "_", "Atom", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.Declaration) }, { "name": "GlobalImmutableDeclaration", "symbols": ["CONST", "_", "Identifier", "_", "COLON", "_", "GenericType", "_", "SEPARATOR"], "postprocess": builtinDecl }, { "name": "GlobalImmutableDeclaration", "symbols": ["CONST", "_", "NameAndType", "_", "EQUALS", "_", "ObjectLiteral", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.ImmutableDeclaration) }, { "name": "GlobalImmutableDeclaration", "symbols": ["CONST", "_", "NameAndType", "_", "EQUALS", "_", "Atom", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.ImmutableDeclaration) }, { "name": "Declaration", "symbols": ["LET", "_", "NameAndType", "_", "EQUALS", "_", "Expression", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.Declaration) }, { "name": "Declaration", "symbols": ["LET", "_", "NameAndType", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.Declaration) }, { "name": "ImmutableDeclaration", "symbols": ["CONST", "_", "NameAndType", "_", "EQUALS", "_", "Expression", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.ImmutableDeclaration) }, { "name": "ImmutableDeclaration", "symbols": ["CONST", "_", "NameAndType", "_", "EQUALS", "_", "ObjectLiteral", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.ImmutableDeclaration) }, { "name": "ImmutableDeclaration", "symbols": ["CONST", "_", "Identifier", "_", "COLON", "_", "GenericType", "_", "SEPARATOR"], "postprocess": builtinDecl }, { "name": "StaticNameAndType", "symbols": ["Identifier", "_", "COLON", "_", "ArrayType"], "postprocess": node(Syntax2.Pair) }, { "name": "StaticDeclaration", "symbols": ["CONST", "_", "StaticNameAndType", "_", "EQUALS", "_", "LSB", "_", "RSB", "_", "SEPARATOR"], "postprocess": declaration(Syntax2.StaticDeclaration) }, { "name": "StaticDeclaration", "symbols": ["CONST", "_", "StaticNameAndType", "_", "EQUALS", "_", "LSB", "_", "StaticValueList", "_", "RSB", "_", "SEPARATOR"], "postprocess": compose2(declaration(Syntax2.StaticDeclaration), flatten2) }, { "name": "StaticValueList", "symbols": ["Atom"], "postprocess": id }, { "name": "StaticValueList", "symbols": ["Atom", "_", "COMMA", "_", "StaticValueList"], "postprocess": flatten2 }, { "name": "Unreachable", "symbols": ["THROW", "_", "SEPARATOR"], "postprocess": node(Syntax2.Unreachable) }, { "name": "Unreachable", "symbols": ["THROW", "_", "Expression", "_", "SEPARATOR"], "postprocess": node(Syntax2.Unreachable) }, { "name": "Pair", "symbols": ["Identifier", "_", "COLON", "_", "Identifier"], "postprocess": node(Syntax2.Pair) }, { "name": "Export", "symbols": ["EXPORT", "__", "ImmutableDeclaration"], "postprocess": node(Syntax2.Export, { value: "export" }) }, { "name": "Export", "symbols": ["EXPORT", "__", "Function"], "postprocess": node(Syntax2.Export, { value: "export" }) }, { "name": "Export", "symbols": ["EXPORT", "__", "TypeDef"], "postprocess": node(Syntax2.Export, { value: "export" }) }, { "name": "Export", "symbols": ["EXPORT", "__", "Struct"], "postprocess": node(Syntax2.Export, { value: "export" }) }, { "name": "ReturnStatement", "symbols": ["RETURN", "__", "Expression", "_", "SEPARATOR"], "postprocess": node(Syntax2.ReturnStatement) }, { "name": "ReturnStatement$subexpression$1", "symbols": [{ "literal": ";" }], "postprocess": nuller2 }, { "name": "ReturnStatement", "symbols": ["RETURN", "ReturnStatement$subexpression$1"], "postprocess": node(Syntax2.ReturnStatement) }, { "name": "Assignment", "symbols": ["_Assignment", "_", "SEPARATOR"], "postprocess": id }, { "name": "_Assignment", "symbols": ["Subscript", "_", "EQUALS", "_", "Expression"], "postprocess": (d) => assignment(d, "=") }, { "name": "_Assignment", "symbols": ["Subscript", "_", "PLSEQUALS", "_", "Expression"], "postprocess": (d) => assignment(d, "+=") }, { "name": "_Assignment", "symbols": ["Subscript", "_", "MINEQUALS", "_", "Expression"], "postprocess": (d) => assignment(d, "-=") }, { "name": "_Assignment", "symbols": ["Subscript", "_", "EQUALS", "_", "ObjectLiteral"], "postprocess": (d) => assignment(d, "=") }, { "name": "ExpressionStatement", "symbols": ["Call", "_", "SEPARATOR"], "postprocess": id }, { "name": "Expression", "symbols": ["AssignmentExpression"], "postprocess": id }, { "name": "AssignmentExpression", "symbols": ["Identifier", "_", "EQUALS", "_", "Ternary"], "postprocess": (d) => assignmentExpr(d, "=") }, { "name": "AssignmentExpression", "symbols": ["Identifier", "_", "PLSEQUALS", "_", "Ternary"], "postprocess": (d) => assignmentExpr(d, "+=") }, { "name": "AssignmentExpression", "symbols": ["Identifier", "_", "MINEQUALS", "_", "Ternary"], "postprocess": (d) => assignmentExpr(d, "-=") }, { "name": "AssignmentExpression", "symbols": ["Ternary"], "postprocess": id }, { "name": "Ternary", "symbols": ["Ternary", "_", "QUESTION", "_", "TernaryPair"], "postprocess": ternary }, { "name": "Ternary", "symbols": ["Binary"], "postprocess": id }, { "name": "TernaryPair", "symbols": ["Expression", "_", "COLON", "_", "Expression"], "postprocess": node(Syntax2.Pair) }, { "name": "Binary", "symbols": ["Logical"], "postprocess": id }, { "name": "Logical", "symbols": ["Logical", "_", { "literal": "||" }, "_", "Bitwise"], "postprocess": binary }, { "name": "Logical", "symbols": ["Logical", "_", { "literal": "&&" }, "_", "Bitwise"], "postprocess": binary }, { "name": "Logical", "symbols": ["Bitwise"], "postprocess": id }, { "name": "Bitwise", "symbols": ["Bitwise", "_", { "literal": "|" }, "_", "Sum"], "postprocess": binary }, { "name": "Bitwise", "symbols": ["Bitwise", "_", { "literal": "^" }, "_", "Sum"], "postprocess": binary }, { "name": "Bitwise", "symbols": ["Bitwise", "_", { "literal": "&" }, "_", "Sum"], "postprocess": binary }, { "name": "Bitwise", "symbols": ["Equality"], "postprocess": id }, { "name": "Equality", "symbols": ["Equality", "_", { "literal": "==" }, "_", "Comparison"], "postprocess": binary }, { "name": "Equality", "symbols": ["Equality", "_", { "literal": "!=" }, "_", "Comparison"], "postprocess": binary }, { "name": "Equality", "symbols": ["Comparison"], "postprocess": id }, { "name": "Comparison", "symbols": ["Comparison", "_", { "literal": "<" }, "_", "Shift"], "postprocess": binary }, { "name": "Comparison", "symbols": ["Comparison", "_", { "literal": ">" }, "_", "Shift"], "postprocess": binary }, { "name": "Comparison", "symbols": ["Comparison", "_", { "literal": "<=" }, "_", "Shift"], "postprocess": binary }, { "name": "Comparison", "symbols": ["Comparison", "_", { "literal": ">=" }, "_", "Shift"], "postprocess": binary }, { "name": "Comparison", "symbols": ["Shift"], "postprocess": id }, { "name": "Shift", "symbols": ["Shift", "_", { "literal": ">>" }, "_", "Sum"], "postprocess": binary }, { "name": "Shift", "symbols": ["Shift", "_", { "literal": "<<" }, "_", "Sum"], "postprocess": binary }, { "name": "Shift", "symbols": ["Shift", "_", { "literal": ">>>" }, "_", "Sum"], "postprocess": binary }, { "name": "Shift", "symbols": ["Sum"], "postprocess": id }, { "name": "Sum", "symbols": ["Sum", "_", { "literal": "+" }, "_", "Product"], "postprocess": binary }, { "name": "Sum", "symbols": ["Sum", "_", { "literal": "-" }, "_", "Product"], "postprocess": binary }, { "name": "Sum", "symbols": ["Product"], "postprocess": id }, { "name": "Product", "symbols": ["Product", "_", { "literal": "*" }, "_", "Typecast"], "postprocess": binary }, { "name": "Product", "symbols": ["Product", "_", { "literal": "/" }, "_", "Typecast"], "postprocess": binary }, { "name": "Product", "symbols": ["Product", "_", { "literal": "%" }, "_", "Typecast"], "postprocess": binary }, { "name": "Product", "symbols": ["Typecast"], "postprocess": id }, { "name": "Typecast", "symbols": ["Expression", "_", "COLON", "_", "DeclType"], "postprocess": node(Syntax2.Pair) }, { "name": "Typecast", "symbols": ["Expression", "_", "AS", "_", "DeclType"], "postprocess": node(Syntax2.Pair) }, { "name": "Typecast", "symbols": ["Unary"], "postprocess": id }, { "name": "Unary", "symbols": [{ "literal": "!" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": [{ "literal": "~" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": [{ "literal": "-" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": [{ "literal": "+" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": [{ "literal": "++" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": [{ "literal": "--" }, "Call"], "postprocess": unary2 }, { "name": "Unary", "symbols": ["Call"], "postprocess": id }, { "name": "Call", "symbols": ["Subscript", "_", "LB", "_", "ArgumentList", "_", "RB"], "postprocess": compose2(call, flatten2) }, { "name": "Call", "symbols": ["Subscript", "_", "LB", "_", "RB"], "postprocess": call }, { "name": "Call", "symbols": ["Subscript"], "postprocess": id }, { "name": "ArgumentList", "symbols": ["Expression"], "postprocess": id }, { "name": "ArgumentList", "symbols": ["NativeType"], "postprocess": id }, { "name": "ArgumentList", "symbols": ["Expression", "_", "COMMA", "_", "ArgumentList"], "postprocess": flatten2 }, { "name": "Subscript", "symbols": ["Access", "LSB", "_", "Expression", "_", "RSB", "Subscript"], "postprocess": subscript }, { "name": "Subscript", "symbols": ["Access", "LSB", "_", "Expression", "_", "RSB"], "postprocess": subscript }, { "name": "Subscript", "symbols": ["Access"], "postprocess": id }, { "name": "Access", "symbols": ["Access", "DOT", "Identifier"], "postprocess": compose2(access, drop2) }, { "name": "Access", "symbols": ["NativeType", "DOT", "Access"], "postprocess": compose2(access, drop2) }, { "name": "Access", "symbols": ["Grouping"], "postprocess": id }, { "name": "Grouping", "symbols": ["LB", "_", "Expression", "_", "RB"], "postprocess": nth2(2) }, { "name": "Grouping", "symbols": ["Atom"], "postprocess": id }, { "name": "Atom", "symbols": ["Identifier"], "postprocess": id }, { "name": "Atom", "symbols": ["StringLiteral"], "postprocess": id }, { "name": "Atom", "symbols": ["CharacterLiteral"], "postprocess": id }, { "name": "Atom", "symbols": ["Number"], "postprocess": id }, { "name": "NativeType", "symbols": [lexer.has("type") ? { type: "type" } : type], "postprocess": type }, { "name": "Identifier", "symbols": [lexer.has("identifier") ? { type: "identifier" } : identifier], "postprocess": identifier }, { "name": "Number", "symbols": [lexer.has("number") ? { type: "number" } : number], "postprocess": constant }, { "name": "StringLiteral", "symbols": [lexer.has("string") ? { type: "string" } : string], "postprocess": string }, { "name": "CharacterLiteral", "symbols": [lexer.has("char") ? { type: "char" } : char], "postprocess": char }, { "name": "word", "symbols": [/[a-zA-Z_]/], "postprocess": id }, { "name": "word", "symbols": ["word", /[a-zA-Z0-9_]/], "postprocess": add2 }, { "name": "digit", "symbols": [/[0-9]/], "postprocess": id }, { "name": "digit", "symbols": ["digit", /[0-9]/], "postprocess": add2 }, { "name": "SEPARATOR", "symbols": ["_", { "literal": ";" }], "postprocess": nuller2 }, { "name": "QUESTION", "symbols": [{ "literal": "?" }], "postprocess": nuller2 }, { "name": "COMMA", "symbols": [{ "literal": "," }], "postprocess": nuller2 }, { "name": "AND", "symbols": [{ "literal": "&" }], "postprocess": nuller2 }, { "name": "DOT", "symbols": [{ "literal": "." }], "postprocess": nuller2 }, { "name": "LB", "symbols": [{ "literal": "(" }], "postprocess": nuller2 }, { "name": "RB", "symbols": [{ "literal": ")" }], "postprocess": nuller2 }, { "name": "LSB", "symbols": [{ "literal": "[" }], "postprocess": nuller2 }, { "name": "RSB", "symbols": [{ "literal": "]" }], "postprocess": nuller2 }, { "name": "LCB", "symbols": [{ "literal": "{" }], "postprocess": nuller2 }, { "name": "RCB", "symbols": [{ "literal": "}" }], "postprocess": nuller2 }, { "name": "OR", "symbols": [{ "literal": "|" }], "postprocess": nuller2 }, { "name": "COLON", "symbols": [{ "literal": ":" }], "postprocess": nuller2 }, { "name": "EQUALS", "symbols": [{ "literal": "=" }], "postprocess": nuller2 }, { "name": "PLSEQUALS", "symbols": [{ "literal": "+=" }], "postprocess": nuller2 }, { "name": "MINEQUALS", "symbols": [{ "literal": "-=" }], "postprocess": nuller2 }, { "name": "GT", "symbols": [{ "literal": ">" }], "postprocess": nuller2 }, { "name": "LT", "symbols": [{ "literal": "<" }], "postprocess": nuller2 }, { "name": "FATARROW", "symbols": [{ "literal": "=>" }], "postprocess": nuller2 }, { "name": "SPREAD", "symbols": [{ "literal": "..." }], "postprocess": nuller2 }, { "name": "FUNCTION", "symbols": [{ "literal": "function" }], "postprocess": nuller2 }, { "name": "LET", "symbols": [{ "literal": "let" }], "postprocess": nuller2 }, { "name": "CONST", "symbols": [{ "literal": "const" }], "postprocess": nuller2 }, { "name": "EXPORT", "symbols": [{ "literal": "export" }], "postprocess": nuller2 }, { "name": "IMPORT", "symbols": [{ "literal": "import" }], "postprocess": nuller2 }, { "name": "AS", "symbols": [{ "literal": "as" }], "postprocess": nuller2 }, { "name": "FROM", "symbols": [{ "literal": "from" }], "postprocess": nuller2 }, { "name": "RETURN", "symbols": [{ "literal": "return" }], "postprocess": nuller2 }, { "name": "TYPE", "symbols": [{ "literal": "type" }], "postprocess": nuller2 }, { "name": "IF", "symbols": [{ "literal": "if" }], "postprocess": nuller2 }, { "name": "ELSE", "symbols": [{ "literal": "else" }], "postprocess": nuller2 }, { "name": "FOR", "symbols": [{ "literal": "for" }], "postprocess": nuller2 }, { "name": "WHILE", "symbols": [{ "literal": "while" }], "postprocess": nuller2 }, { "name": "SWITCH", "symbols": [{ "literal": "switch" }], "postprocess": nuller2 }, { "name": "DO", "symbols": [{ "literal": "do" }], "postprocess": nuller2 }, { "name": "THROW", "symbols": [{ "literal": "throw" }], "postprocess": nuller2 }, { "name": "BREAK", "symbols": [{ "literal": "break" }], "postprocess": nuller2 }],
      ParserStart: "Program"
    };
  }
  function id$1(x) {
    return x[0];
  }
  function grammar$1() {
    const Syntax2 = this.Syntax;
    const { flatten: flatten2 } = this.helpers;
    const { node } = this.nodes(this.lexer);
    return {
      Lexer: void 0,
      ParserRules: [{ "name": "TypeList", "symbols": ["DefaultArgument"], "postprocess": id$1 }, { "name": "TypeList", "symbols": ["DefaultArgument", "_", "COMMA", "_", "TypeList"], "postprocess": flatten2 }, { "name": "DefaultArgument", "symbols": ["Type", "_", "EQUALS", "_", "Atom"], "postprocess": node(Syntax2.Assignment) }, { "name": "ParameterList", "symbols": ["DefaultFunctionArgument"], "postprocess": id$1 }, { "name": "ParameterList", "symbols": ["DefaultFunctionArgument", "_", "COMMA", "_", "ParameterList"], "postprocess": flatten2 }, { "name": "DefaultFunctionArgument", "symbols": ["NameAndType", "_", "EQUALS", "_", "Atom"], "postprocess": node(Syntax2.Assignment) }],
      ParserStart: "TypeList"
    };
  }
  var nearley = createCommonjsModule(function(module) {
    (function(root, factory2) {
      if (module.exports) {
        module.exports = factory2();
      } else {
        root.nearley = factory2();
      }
    })(commonjsGlobal, function() {
      function Rule(name, symbols, postprocess) {
        this.id = ++Rule.highestId;
        this.name = name;
        this.symbols = symbols;
        this.postprocess = postprocess;
        return this;
      }
      Rule.highestId = 0;
      Rule.prototype.toString = function(withCursorAt) {
        function stringifySymbolSequence(e) {
          return e.literal ? JSON.stringify(e.literal) : e.type ? "%" + e.type : e.toString();
        }
        var symbolSequence = typeof withCursorAt === "undefined" ? this.symbols.map(stringifySymbolSequence).join(" ") : this.symbols.slice(0, withCursorAt).map(stringifySymbolSequence).join(" ") + " \u25CF " + this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(" ");
        return this.name + " \u2192 " + symbolSequence;
      };
      function State(rule, dot, reference, wantedBy) {
        this.rule = rule;
        this.dot = dot;
        this.reference = reference;
        this.data = [];
        this.wantedBy = wantedBy;
        this.isComplete = this.dot === rule.symbols.length;
      }
      State.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
      };
      State.prototype.nextState = function(child) {
        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
        state.left = this;
        state.right = child;
        if (state.isComplete) {
          state.data = state.build();
        }
        return state;
      };
      State.prototype.build = function() {
        var children = [];
        var node = this;
        do {
          children.push(node.right.data);
          node = node.left;
        } while (node.left);
        children.reverse();
        return children;
      };
      State.prototype.finish = function() {
        if (this.rule.postprocess) {
          this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
        }
      };
      function Column(grammar2, index2) {
        this.grammar = grammar2;
        this.index = index2;
        this.states = [];
        this.wants = {};
        this.scannable = [];
        this.completed = {};
      }
      Column.prototype.process = function(nextColumn) {
        var states = this.states;
        var wants = this.wants;
        var completed = this.completed;
        for (var w = 0; w < states.length; w++) {
          var state = states[w];
          if (state.isComplete) {
            state.finish();
            if (state.data !== Parser.fail) {
              var wantedBy = state.wantedBy;
              for (var i = wantedBy.length; i--; ) {
                var left = wantedBy[i];
                this.complete(left, state);
              }
              if (state.reference === this.index) {
                var exp = state.rule.name;
                (this.completed[exp] = this.completed[exp] || []).push(state);
              }
            }
          } else {
            var exp = state.rule.symbols[state.dot];
            if (typeof exp !== "string") {
              this.scannable.push(state);
              continue;
            }
            if (wants[exp]) {
              wants[exp].push(state);
              if (completed.hasOwnProperty(exp)) {
                var nulls = completed[exp];
                for (var i = 0; i < nulls.length; i++) {
                  var right = nulls[i];
                  this.complete(state, right);
                }
              }
            } else {
              wants[exp] = [state];
              this.predict(exp);
            }
          }
        }
      };
      Column.prototype.predict = function(exp) {
        var rules = this.grammar.byName[exp] || [];
        for (var i = 0; i < rules.length; i++) {
          var r = rules[i];
          var wantedBy = this.wants[exp];
          var s = new State(r, 0, this.index, wantedBy);
          this.states.push(s);
        }
      };
      Column.prototype.complete = function(left, right) {
        var copy = left.nextState(right);
        this.states.push(copy);
      };
      function Grammar(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        var byName = this.byName = {};
        this.rules.forEach(function(rule) {
          if (!byName.hasOwnProperty(rule.name)) {
            byName[rule.name] = [];
          }
          byName[rule.name].push(rule);
        });
      }
      Grammar.fromCompiled = function(rules, start) {
        var lexer = rules.Lexer;
        if (rules.ParserStart) {
          start = rules.ParserStart;
          rules = rules.ParserRules;
        }
        var rules = rules.map(function(r) {
          return new Rule(r.name, r.symbols, r.postprocess);
        });
        var g = new Grammar(rules, start);
        g.lexer = lexer;
        return g;
      };
      function StreamLexer() {
        this.reset("");
      }
      StreamLexer.prototype.reset = function(data, state) {
        this.buffer = data;
        this.index = 0;
        this.line = state ? state.line : 1;
        this.lastLineBreak = state ? -state.col : 0;
      };
      StreamLexer.prototype.next = function() {
        if (this.index < this.buffer.length) {
          var ch = this.buffer[this.index++];
          if (ch === "\n") {
            this.line += 1;
            this.lastLineBreak = this.index;
          }
          return { value: ch };
        }
      };
      StreamLexer.prototype.save = function() {
        return {
          line: this.line,
          col: this.index - this.lastLineBreak
        };
      };
      StreamLexer.prototype.formatError = function(token, message) {
        var buffer = this.buffer;
        if (typeof buffer === "string") {
          var nextLineBreak = buffer.indexOf("\n", this.index);
          if (nextLineBreak === -1)
            nextLineBreak = buffer.length;
          var line = buffer.substring(this.lastLineBreak, nextLineBreak);
          var col = this.index - this.lastLineBreak;
          message += " at line " + this.line + " col " + col + ":\n\n";
          message += "  " + line + "\n";
          message += "  " + Array(col).join(" ") + "^";
          return message;
        } else {
          return message + " at index " + (this.index - 1);
        }
      };
      function Parser(rules, start, options) {
        if (rules instanceof Grammar) {
          var grammar2 = rules;
          var options = start;
        } else {
          var grammar2 = Grammar.fromCompiled(rules, start);
        }
        this.grammar = grammar2;
        this.options = {
          keepHistory: false,
          lexer: grammar2.lexer || new StreamLexer()
        };
        for (var key in options || {}) {
          this.options[key] = options[key];
        }
        this.lexer = this.options.lexer;
        this.lexerState = void 0;
        var column = new Column(grammar2, 0);
        this.table = [column];
        column.wants[grammar2.start] = [];
        column.predict(grammar2.start);
        column.process();
        this.current = 0;
      }
      Parser.fail = {};
      Parser.prototype.feed = function(chunk) {
        var lexer = this.lexer;
        lexer.reset(chunk, this.lexerState);
        var token;
        while (token = lexer.next()) {
          var column = this.table[this.current];
          if (!this.options.keepHistory) {
            delete this.table[this.current - 1];
          }
          var n = this.current + 1;
          var nextColumn = new Column(this.grammar, n);
          this.table.push(nextColumn);
          var literal = token.text !== void 0 ? token.text : token.value;
          var value = lexer.constructor === StreamLexer ? token.value : token;
          var scannable = column.scannable;
          for (var w = scannable.length; w--; ) {
            var state = scannable[w];
            var expect = state.rule.symbols[state.dot];
            if (expect.test ? expect.test(value) : expect.type ? expect.type === token.type : expect.literal === literal) {
              var next = state.nextState({ data: value, token, isToken: true, reference: n - 1 });
              nextColumn.states.push(next);
            }
          }
          nextColumn.process();
          if (nextColumn.states.length === 0) {
            var message = this.lexer.formatError(token, "invalid syntax") + "\n";
            message += "Unexpected " + (token.type ? token.type + " token: " : "");
            message += JSON.stringify(token.value !== void 0 ? token.value : token) + "\n";
            var err = new Error(message);
            err.offset = this.current;
            err.token = token;
            throw err;
          }
          if (this.options.keepHistory) {
            column.lexerState = lexer.save();
          }
          this.current++;
        }
        if (column) {
          this.lexerState = lexer.save();
        }
        this.results = this.finish();
        return this;
      };
      Parser.prototype.save = function() {
        var column = this.table[this.current];
        column.lexerState = this.lexerState;
        return column;
      };
      Parser.prototype.restore = function(column) {
        var index2 = column.index;
        this.current = index2;
        this.table[index2] = column;
        this.table.splice(index2 + 1);
        this.lexerState = column.lexerState;
        this.results = this.finish();
      };
      Parser.prototype.rewind = function(index2) {
        if (!this.options.keepHistory) {
          throw new Error("set option `keepHistory` to enable rewinding");
        }
        this.restore(this.table[index2]);
      };
      Parser.prototype.finish = function() {
        var considerations = [];
        var start = this.grammar.start;
        var column = this.table[this.table.length - 1];
        column.states.forEach(function(t) {
          if (t.rule.name === start && t.dot === t.rule.symbols.length && t.reference === 0 && t.data !== Parser.fail) {
            considerations.push(t);
          }
        });
        return considerations.map(function(c) {
          return c.data;
        });
      };
      return {
        Parser,
        Grammar,
        Rule
      };
    });
  });
  var nearley_1 = nearley.Parser;
  var nearley_2 = nearley.Grammar;
  var compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var objectWithoutProperties = function(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  };
  const extendNode = curry_1((_ref, node) => {
    let { meta } = _ref, options = objectWithoutProperties(_ref, ["meta"]);
    return _extends({}, node, {
      meta: _extends({}, node.meta, meta)
    }, options);
  });
  const nth = (n) => (d) => d[n];
  const nuller = () => null;
  const nonEmpty = (d) => {
    return Array.isArray(d) ? !!d.length : d != null;
  };
  const add = (d) => `${d[0]}${d[1]}`;
  const flatten = (d) => d.reduce((acc, v) => {
    if (Array.isArray(v)) {
      return acc.concat(v);
    }
    return acc.concat(v);
  }, []);
  const drop = (d) => {
    return d.filter(nonEmpty);
  };
  var helpers = {
    nth,
    nuller,
    nonEmpty,
    add,
    flatten,
    compose,
    drop,
    extendNode
  };
  const marker = (lexer) => {
    const { col, line } = lexer;
    if (!lexer.lines.length) {
      return { col, line, sourceLine: "" };
    }
    return {
      col,
      line,
      sourceLine: lexer.lines[lexer.line - 1]
    };
  };
  function factory(lexer) {
    const node = (Type, seed = {}) => (d) => {
      const params = d.filter(nonEmpty);
      const { value = "", meta = {} } = seed;
      const start = marker(lexer);
      const end = params[params.length - 1] && params[params.length - 1].range ? params[params.length - 1].range[1] : _extends({}, start, { col: start.col + value.length });
      return {
        value,
        type: null,
        Type,
        toString() {
        },
        meta,
        range: [start, end],
        params
      };
    };
    const binary = (d) => {
      const [lhs, operator, rhs] = d.filter(nonEmpty);
      let Type = Syntax.BinaryExpression;
      if (operator.value === "||" || operator.value === "&&") {
        Type = Syntax.Select;
      }
      return node(Type, { value: operator.value })([lhs, rhs]);
    };
    const result = (d) => {
      const [type] = drop(d);
      return extendNode({
        type: type != null && type.value !== "void" ? type.value : null
      }, node(Syntax.FunctionResult)(d));
    };
    return {
      node,
      binary,
      constant: (d) => {
        const value = d[0].value;
        return extendNode({
          value: `${value}`,
          type: value.toString().indexOf(".") !== -1 ? "f32" : "i32"
        }, node(Syntax.Constant)([]));
      },
      identifier: (d) => node("Identifier", { value: d.join("") })([]),
      unary: ([operator, target]) => {
        let params = [target];
        if (operator.value === "-") {
          params = [_extends({}, target, {
            value: "0",
            Type: Syntax.Constant,
            params: [],
            meta: {}
          }), target];
        }
        return extendNode({
          value: operator.value,
          params
        }, node(Syntax.UnaryExpression)([operator, target]));
      },
      ternary: (d) => {
        return extendNode({
          value: "?"
        }, node(Syntax.TernaryExpression)(d));
      },
      subscript: (d) => {
        const [id2, field] = d.filter(nonEmpty);
        return extendNode({
          value: id2.value,
          params: [id2, field]
        }, node(Syntax.ArraySubscript)([id2, field]));
      },
      access(d) {
        return extendNode({
          value: d[0].value + "." + d[1].value
        }, node(Syntax.Access)(d));
      },
      fun: (d) => {
        const [name, args, result2, block] = d.filter(nonEmpty);
        return _extends({}, name, {
          Type: Syntax.FunctionDeclaration,
          meta: [],
          params: [args, result2, block]
        });
      },
      declaration: (Type) => (d) => {
        const [pair, ...init] = drop(d);
        const [id2, type] = pair.params;
        return extendNode({
          value: id2.value,
          type: type.value
        }, node(Type)(init));
      },
      call: (d) => {
        let [id2, ...params] = drop(d);
        return extendNode({
          value: id2.value
        }, node(Syntax.FunctionCall)([id2, ...params]));
      },
      struct: (d) => {
        const [id2, ...params] = drop(d);
        return extendNode({
          value: id2.value
        }, node(Syntax.Struct)(params));
      },
      result,
      string: (d) => {
        return extendNode({
          value: d[0].value,
          type: "i32"
        }, node(Syntax.StringLiteral)([]));
      },
      char(d) {
        return extendNode({
          value: d[0].value,
          type: "i32"
        }, node(Syntax.CharacterLiteral)([]));
      },
      type(d) {
        return extendNode({
          value: d[0].value,
          type: d[0].value,
          params: []
        }, node(Syntax.Type)(d));
      },
      arrayType(d) {
        const p = drop(d);
        const type = p[0];
        return extendNode({
          value: type.value + "[]",
          type: type.type + "[]",
          params: []
        }, node(Syntax.ArrayType)(d));
      },
      typeGeneric(d) {
        const [id2, obj] = drop(d);
        return extendNode({
          value: id2.value,
          type: id2.value,
          params: [obj]
        }, node(Syntax.Type)(d));
      },
      typedef: (d) => {
        const [id2, args, res] = drop(d);
        return extendNode({
          value: id2.value,
          params: [node(Syntax.FunctionArguments)(args), extendNode({
            type: res.value
          }, node(Syntax.FunctionResult)([res]))],
          type: res.type
        }, node(Syntax.Typedef)([id2, args, result]));
      },
      voidFun: (d) => {
        const params = drop(d);
        const [name, args, block] = params;
        const result2 = extendNode({ type: null }, node(Syntax.FunctionResult)([]));
        return extendNode({
          value: name.value,
          params: [args, result2, block]
        }, node(Syntax.FunctionDeclaration)(params));
      },
      assignment(d, value) {
        if (["-=", "+="].includes(value)) {
          const operator = value[0];
          const [target, amount] = drop(d);
          const b = binary([target, { value: operator }, amount]);
          return node(Syntax.Assignment, {
            value: "="
          })([target, b]);
        }
        return node(Syntax.Assignment, { value })(d);
      },
      assignmentExpr(d, value) {
        if (["-=", "+="].includes(value)) {
          const operator = value[0];
          const [target, amount] = drop(d);
          const b = binary([target, { value: operator }, amount]);
          return node(Syntax.AssignmentExpression, {
            value: "="
          })([target, b]);
        }
        return node(Syntax.AssignmentExpression, { value })(d);
      },
      forLoop(d) {
        const [initializer, condition, afterthought, ...body] = drop(d);
        return node(Syntax.Loop)([initializer, condition, ...body, afterthought]);
      },
      whileLoop(d) {
        const noop = node(Syntax.Noop)([]);
        return node(Syntax.Loop)([noop, ...d]);
      },
      spread(d) {
        return node(Syntax.Spread)(d);
      },
      builtinDecl(d) {
        const [id2, typeNode] = drop(d);
        return extendNode({
          value: id2.value,
          type: typeNode.value,
          params: [typeNode]
        }, node(Syntax.ImmutableDeclaration)(d));
      },
      addressOf(d) {
        const [id2] = drop(d);
        return extendNode({
          value: id2.value,
          params: []
        }, node("AddressOf")(d));
      }
    };
  }
  function makeLexer() {
    const mooLexer = moo.compile(waltSyntax_1);
    return {
      current: null,
      lines: [],
      get line() {
        return mooLexer.line;
      },
      get col() {
        return mooLexer.col;
      },
      save() {
        return mooLexer.save();
      },
      reset(chunk, info) {
        this.lines = chunk.split("\n");
        return mooLexer.reset(chunk, info);
      },
      next() {
        let token = mooLexer.next();
        while (token && token.type === "comment") {
          token = mooLexer.next();
        }
        this.current = token;
        return this.current;
      },
      formatError(token) {
        return mooLexer.formatError(token);
      },
      has(name) {
        return mooLexer.has(name);
      }
    };
  }
  var makeParser = curry_1(function(extraGrammar, source) {
    const grammarList = [grammar, grammar$1, ...extraGrammar];
    const context = {
      lexer: makeLexer(),
      nodes: factory,
      helpers,
      Syntax
    };
    const grammar$$1 = grammarList.slice(1).reduce((acc, value) => {
      const extra = value.call(context);
      return _extends({}, acc, {
        ParserRules: acc.ParserRules.concat(extra.ParserRules)
      });
    }, grammarList[0].call(context));
    const parser = new nearley_1(nearley_2.fromCompiled(grammar$$1));
    parser.feed(source);
    invariant_1(parser.results.length === 1, `PANIC - Ambiguous Syntax! Number of productions (${parser.results.length})`);
    return parser.results[0];
  });
  const combineMiddleware = (transforms) => {
    let transform;
    const chain = transforms.reduce((stack, go) => {
      return go((args) => {
        return stack(args, transform);
      });
    }, ([id2]) => id2);
    return (args, topLevelTranfrom) => {
      transform = topLevelTranfrom;
      return chain(args, transform);
    };
  };
  const combineParsers = (sortedParsers) => {
    const wildcards = [];
    const parsersByType = sortedParsers.reduce((acc, parser) => {
      Object.entries(parser).forEach(([type, cb]) => {
        if (type === "*") {
          wildcards.push(cb);
          return;
        }
        if (acc[type] == null) {
          acc[type] = [...wildcards];
        }
        acc[type].push(cb);
      });
      return acc;
    }, {});
    return Object.entries(parsersByType).reduce((acc, [key, transforms]) => {
      acc[key] = combineMiddleware(transforms);
      return acc;
    }, {});
  };
  const namespace$1 = Symbol("scope namespace");
  const signature$1 = Symbol("signature");
  function enter$1(scopes, scopeName) {
    return [...scopes, { [namespace$1]: scopeName, [signature$1]: { result: null, arguments: null } }];
  }
  function exit$1(scopes) {
    return scopes.slice(0, -1);
  }
  function current$1(scopes) {
    return scopes[scopes.length - 1];
  }
  function add$2(scopes, key, node) {
    const cur = current$1(scopes);
    if (cur) {
      cur[key] = node;
    }
    return cur;
  }
  function find$1(scopes, key) {
    const len = scopes.length;
    let i = len - 1;
    for (i; i >= 0; i--) {
      const ref = scopes[i][key];
      if (ref) {
        return ref;
      }
    }
    return null;
  }
  function index$1(scope2, key) {
    const pos = Object.keys(scope2).indexOf(key);
    return pos > -1 ? pos : Object.keys(scope2).length;
  }
  var scope$2 = {
    enter: enter$1,
    exit: exit$1,
    add: add$2,
    find: find$1,
    current: current$1,
    index: index$1,
    namespace: namespace$1,
    signature: signature$1
  };
  const {
    enter,
    exit,
    add: add$1,
    find,
    current,
    namespace,
    signature,
    index
  } = scope$2;
  var scope = {
    enter,
    exit,
    add: add$1,
    find,
    current,
    namespace,
    index,
    signature
  };
  var scope_1 = scope.enter;
  var scope_2 = scope.exit;
  var scope_3 = scope.current;
  var scope_4 = scope.find;
  var scope_5 = scope.add;
  var scope_6 = scope.index;
  var scope_7 = scope.namespace;
  var scope_8 = scope.signature;
  const FUNCTION_INDEX = "function/index";
  const LOCAL_INDEX = "LOCAL_INDEX";
  const GLOBAL_INDEX = "global/index";
  const TYPE_CONST = "type/const";
  const TYPE_INDEX = "TYPE_INDEX";
  const OBJECT_SIZE = "OBJECT_SIZE";
  const TYPE_CAST = "type/cast";
  const AST_METADATA = "AST_METADATA";
  const FUNCTION_METADATA = "FUNCTION_METADATA";
  const typeWeight = (typeString) => {
    switch (typeString) {
      case "i32":
      case "bool":
        return 0;
      case "i64":
        return 1;
      case "f32":
        return 2;
      case "f64":
        return 3;
      default:
        return -1;
    }
  };
  const balanceTypesInMathExpression = (expression) => {
    const type = expression.params.reduce((acc, { type: childType }) => {
      if (typeWeight(acc) < typeWeight(childType)) {
        return childType;
      }
      return acc;
    }, expression.type);
    const params = expression.params.map((paramNode) => {
      if (paramNode.type != null && typeWeight(paramNode.type) !== typeWeight(type)) {
        if (paramNode.Type === Syntax.Constant) {
          return extendNode({
            type
          }, paramNode);
        }
        return extendNode({
          type,
          value: paramNode.value,
          Type: Syntax.TypeCast,
          meta: {
            [TYPE_CAST]: { to: type, from: paramNode.type }
          },
          params: [paramNode]
        }, paramNode);
      }
      return paramNode;
    });
    return _extends({}, expression, {
      params,
      type
    });
  };
  function Core() {
    return {
      semantics() {
        const declaration = (next) => ([node, context]) => {
          const scope$$1 = scope_3(context.scopes);
          const index$$1 = scope_6(scope$$1, node.value);
          scope$$1[node.value] = extendNode({
            params: node.params.map(extendNode({ type: node.type })),
            meta: _extends({}, node.meta, {
              [scope$$1[scope_7]]: index$$1,
              [TYPE_CONST]: node.Type === Syntax.ImmutableDeclaration
            }),
            Type: Syntax.Declaration
          }, node);
          return next([scope$$1[node.value], context]);
        };
        return {
          [Syntax.Export]: (next) => ([node, context]) => {
            const parsed = next([node, context]);
            const [child] = parsed.params;
            context.exports[child.value] = child;
            return parsed;
          },
          [Syntax.Declaration]: declaration,
          [Syntax.ImmutableDeclaration]: declaration,
          // CharacterLiteral: next => ([node]) => next([mapCharacterLiteral(node)]),
          [Syntax.Select]: (_) => ([node, context], transform) => balanceTypesInMathExpression(_extends({}, node, {
            params: node.params.map((child) => transform([child, context]))
          })),
          [Syntax.BinaryExpression]: (_) => ([node, context], transform) => balanceTypesInMathExpression(_extends({}, node, {
            params: node.params.map((child) => transform([child, context]))
          })),
          [Syntax.Pair]: (_next) => (args, transform) => {
            const [typeCast, context] = args;
            const params = typeCast.params.map((p) => transform([p, context]));
            const [targetNode, typeNode] = params;
            const { type: from } = targetNode;
            const { value: to } = typeNode;
            return _extends({}, typeCast, {
              type: to,
              value: targetNode.value,
              Type: Syntax.TypeCast,
              meta: _extends({}, typeCast.meta, { [TYPE_CAST]: { to, from } }),
              // We need to drop the typeNode here, because it's not something we can generate
              params: [targetNode]
            });
          },
          [Syntax.Identifier]: (next) => (args) => {
            const [node, context] = args;
            let ref = scope_4(context.scopes, node.value);
            if (ref) {
              return _extends({}, node, {
                meta: _extends({}, node.meta, ref.meta),
                type: ref.type
              });
            }
            if (node.value === "null") {
              return _extends({}, node, {
                value: "0",
                type: "i32",
                Type: Syntax.Constant
              });
            }
            return next(args);
          },
          [Syntax.TernaryExpression]: (next) => ([node, context]) => {
            return next([balanceTypesInMathExpression(_extends({}, node, {
              // Flatten out the parameters, put the condition node last
              params: [...node.params[1].params, node.params[0]]
            })), context]);
          }
        };
      }
    };
  }
  function base() {
    return {
      semantics() {
        return {
          "*": (_) => function([node, ...rest], t) {
            const result = _extends({}, node, {
              params: node.params.map((child) => t([child, ...rest]))
            });
            return result;
          }
        };
      }
    };
  }
  function typePlugin() {
    return {
      semantics() {
        return {
          [Syntax.Typedef]: (_) => ([node]) => node,
          [Syntax.Program]: (next) => (args) => {
            const [ast, context] = args;
            const { types } = context;
            const astWithTypes = mapNode_2({
              [Syntax.Export]: (node, transform) => {
                const [maybeType] = node.params;
                if (maybeType != null && [Syntax.Typedef, Syntax.Struct].includes(maybeType.Type)) {
                  return transform(_extends({}, maybeType, {
                    meta: _extends({}, maybeType.meta, {
                      EXPORTED: true
                    })
                  }));
                }
                return node;
              },
              [Syntax.Typedef]: (node, _) => {
                let argumentsCount = 0;
                const [fnArgs] = node.params;
                const defaultArgs = [];
                walkNode({
                  Assignment(assignment) {
                    const defaultValue = assignment.params[1];
                    defaultArgs.push(defaultValue);
                  },
                  Type() {
                    argumentsCount += 1;
                  }
                })(fnArgs);
                const parsed = _extends({}, node, {
                  meta: _extends({}, node.meta, {
                    FUNCTION_METADATA: {
                      argumentsCount
                    },
                    DEFAULT_ARGUMENTS: defaultArgs
                  })
                });
                types[node.value] = parsed;
                return parsed;
              }
            })(ast);
            return next([astWithTypes, context]);
          }
        };
      }
    };
  }
  const shifts = {
    i64: 63,
    f64: 63,
    i32: 31,
    f32: 31
  };
  const masks = {
    i64: "0xffffffffffff",
    f64: "0xffffffffffff",
    i32: "0xffffff",
    f32: "0xffffff"
  };
  function unary() {
    return {
      semantics({ stmt }) {
        return {
          [Syntax.UnaryExpression]: (_ignore) => (args, transform) => {
            const [unaryNode, context] = args;
            const [lhs, rhs] = unaryNode.params.map((p) => transform([p, context]));
            switch (unaryNode.value) {
              case "!":
                const shift = shifts[lhs.type];
                return transform([stmt`(((${lhs} >> ${shift}) | ((~${lhs} + 1) >> ${shift})) + 1);`, context]);
              case "~":
                const mask = masks[transform([lhs, context]).type];
                return transform([stmt`(${lhs} ^ ${mask});`, context]);
              case "-":
                if (rhs.Type === Syntax.Constant) {
                  return _extends({}, rhs, {
                    meta: _extends({}, rhs.meta, {
                      // Hint for generator
                      SIGN: -1
                    })
                  });
                }
              default:
                return transform([_extends({}, unaryNode, {
                  type: rhs.type,
                  params: [_extends({}, lhs, {
                    type: rhs.type
                  }), rhs],
                  Type: Syntax.BinaryExpression
                }), context]);
            }
          }
        };
      }
    };
  }
  function coreFunctionPlugin() {
    return {
      semantics() {
        return {
          [Syntax.FunctionDeclaration]: (_ignore) => ([fun, context], transform) => {
            context.scopes = scope_1(context.scopes, LOCAL_INDEX);
            const currentScope = scope_3(context.scopes);
            const [argsNode, resultNode, block] = fun.params;
            const [args, result] = [argsNode, resultNode].map((p) => transform([p, context]));
            const ref = _extends({}, fun, {
              // This is set by the parsers below if necessary, defaults to null
              type: currentScope[scope_8].result,
              meta: _extends({}, fun.meta, {
                [FUNCTION_INDEX]: Object.keys(context.functions).length,
                [FUNCTION_METADATA]: {
                  argumentsCount: currentScope[scope_8].arguments.length,
                  locals: scope_3(context.scopes)
                }
              })
            });
            context.functions[fun.value] = ref;
            ref.params = [args, result, transform([block, context])];
            context.scopes = scope_2(context.scopes);
            return ref;
          },
          [Syntax.FunctionResult]: (_next) => ([result, context]) => {
            const currentScope = scope_3(context.scopes);
            currentScope[scope_8].result = result.type;
            return result;
          },
          [Syntax.FunctionArguments]: (_next) => ([args, context], transform) => {
            const currentScope = scope_3(context.scopes);
            currentScope[scope_8].arguments = [];
            const mapped = mapNode_2({
              [Syntax.Pair]: (node, _) => {
                const [identifier, utype] = node.params;
                const typeNode = transform([utype, context]);
                currentScope[scope_8].arguments.push(node);
                transform([_extends({}, node, {
                  value: identifier.value,
                  type: typeNode.value,
                  params: [],
                  Type: Syntax.Declaration
                }), context]);
                return _extends({}, node, { params: [identifier, typeNode] });
              }
            })(_extends({}, args, { params: args.params.filter(Boolean) }));
            return mapped;
          },
          // Regular function calls
          [Syntax.FunctionCall]: (next) => ([call, context]) => {
            const { functions } = context;
            const index2 = Object.keys(functions).indexOf(call.value);
            return next([_extends({}, call, {
              type: functions[call.value] != null ? functions[call.value].type : null,
              meta: { [FUNCTION_INDEX]: index2 },
              params: call.params.slice(1)
            }), context]);
          },
          [Syntax.ReturnStatement]: (_next) => ([returnNode, context], transform) => {
            const currentScope = scope_3(context.scopes);
            const [expression] = returnNode.params.map((p) => transform([p, context]));
            const { result } = currentScope[scope_8];
            if (expression != null && expression.Type === Syntax.Constant && typeWeight(expression.type) !== typeWeight(result)) {
              return _extends({}, returnNode, {
                type: result,
                params: [_extends({}, expression, { type: result })]
              });
            }
            const type = expression ? expression.type : null;
            return _extends({}, returnNode, {
              params: [expression],
              type
            });
          }
        };
      }
    };
  }
  function Imports() {
    return {
      semantics: () => ({
        [Syntax.Import]: (_next) => (args) => {
          const [node, context] = args;
          return mapNode_2({
            [Syntax.BinaryExpression]: (as, transform) => {
              const [maybePair, asIdentifier] = as.params;
              if (maybePair.Type !== Syntax.Pair) {
                return as;
              }
              const [original, typeNode] = maybePair.params;
              return transform(_extends({}, maybePair, {
                params: [_extends({}, asIdentifier, {
                  meta: _extends({}, original.meta, {
                    // <new-value> AS <original-value>
                    AS: original.value
                  })
                }), typeNode]
              }));
            },
            [Syntax.Pair]: (pairNode, __) => {
              const { types, functions } = context;
              const [identifierNode, typeNode] = pairNode.params;
              if (types[typeNode.value] != null) {
                const functionIndex = Object.keys(functions).length;
                const typeIndex = Object.keys(types).indexOf(typeNode.value);
                const functionNode = _extends({}, identifierNode, {
                  id: identifierNode.value,
                  type: types[typeNode.value].type,
                  meta: _extends({}, identifierNode.meta, {
                    [FUNCTION_INDEX]: functionIndex,
                    [TYPE_INDEX]: typeIndex,
                    FUNCTION_METADATA: types[typeNode.value].meta.FUNCTION_METADATA,
                    DEFAULT_ARGUMENTS: types[typeNode.value].meta.DEFAULT_ARGUMENTS
                  })
                });
                functions[identifierNode.value] = functionNode;
                return _extends({}, pairNode, {
                  params: [functionNode, types[typeNode.value]]
                });
              }
              if (!["Table", "Memory"].includes(typeNode.value)) {
                const scope$$1 = scope_3(context.scopes);
                const index$$1 = scope_6(scope$$1, identifierNode.value);
                scope_5(context.scopes, identifierNode.value, _extends({}, identifierNode, {
                  meta: { [scope$$1[scope_7]]: index$$1, [TYPE_CONST]: true },
                  type: typeNode.type
                }));
              } else {
                const bucket = typeNode.value === "Memory" ? "memories" : "tables";
                context[bucket].push(identifierNode);
              }
              return pairNode;
            }
          })(node);
        }
      })
    };
  }
  function booleanPlugin() {
    return {
      semantics() {
        const declaration = (next) => ([decl, context]) => {
          if (decl.type === "bool") {
            return next([_extends({}, decl, { type: "i32" }), context]);
          }
          return next([decl, context]);
        };
        return {
          [Syntax.Identifier]: (next) => (args, transform) => {
            const [id2, context] = args;
            if (!(id2.value === "true" || id2.value === "false")) {
              return next(args);
            }
            return transform([_extends({}, id2, {
              Type: Syntax.Constant,
              value: id2.value === "true" ? "1" : "0",
              type: "i32"
            }), context]);
          },
          [Syntax.FunctionResult]: (next) => ([result, context]) => {
            if (result.type === "bool") {
              return next([_extends({}, result, { type: "i32" }), context]);
            }
            return next([result, context]);
          },
          [Syntax.Declaration]: declaration,
          [Syntax.ImmutableDeclaration]: declaration
        };
      }
    };
  }
  function withContext(transform, context) {
    const args = [null, context];
    return function(node) {
      args[0] = node;
      return transform(args);
    };
  }
  function pick(list, obj) {
    let result = {};
    let i = 0;
    for (i; i < list.length; i++) {
      result[list[i]] = obj[list[i]];
    }
    return result;
  }
  const shifts$1 = { i32: 2, f32: 2, i64: 3, f64: 3 };
  const NATIVE_ARRAY_TYPE = "i32";
  function semantics$2({ stmt }) {
    const declaration = (next) => (args) => {
      const [node, context] = args;
      if (!String(node.type).endsWith("[]")) {
        return next(args);
      }
      const decl = extendNode({
        type: NATIVE_ARRAY_TYPE,
        meta: { TYPE_ARRAY: node.type.slice(0, -2) }
      }, node);
      return next([decl, context]);
    };
    function arrayOffset(base2, offset) {
      const shift = shifts$1[base2.meta.TYPE_ARRAY] || 2;
      return offset.Type !== Syntax.Constant || Number(offset.value) ? stmt`(${base2} + (${offset} << ${shift}));` : stmt`(${base2});`;
    }
    function sanityCheck(subscript) {
      return !(subscript.type == null || subscript.index == null);
    }
    function produceSubscript([base2, offset]) {
      const type = base2.meta.TYPE_ARRAY;
      const index2 = arrayOffset(base2, offset);
      return { type, index: index2, TYPE_ARRAY: base2.meta.TYPE_ARRAY };
    }
    return {
      [Syntax.Declaration]: declaration,
      [Syntax.ImmutableDeclaration]: declaration,
      [Syntax.Identifier]: (next) => (args) => {
        const [node, context] = args;
        const ref = scope_4(context.scopes, node.value);
        if (!(ref && ref.meta.TYPE_ARRAY)) {
          return next(args);
        }
        return next([extendNode(pick(["type", "meta"], ref), node), context]);
      },
      [Syntax.Assignment]: (next) => (args, t) => {
        const [node, context] = args;
        const [lhs, rhs] = node.params;
        if (lhs.Type !== Syntax.ArraySubscript) {
          return next(args);
        }
        const transform = withContext(t, context);
        const subscript = produceSubscript(lhs.params.map(transform));
        const { type, index: index2 } = subscript;
        invariant_1(sanityCheck(subscript), `PANIC - Cannot assign to subscript of ${lhs.value}`);
        return transform(stmt`${type}.store(${index2}, ${rhs});`);
      },
      [Syntax.ArraySubscript]: (next) => (args, t) => {
        const [node, context] = args;
        const transform = withContext(t, context);
        const subscript = produceSubscript(node.params.map(transform));
        const { type, index: index2, TYPE_ARRAY } = subscript;
        if (!sanityCheck(subscript)) {
          return next(args);
        }
        return extendNode({ meta: { TYPE_ARRAY } }, transform(stmt`${type}.load(${index2});`));
      },
      // Function result types can be (pre) parsed exactly like declarations
      [Syntax.FunctionResult]: declaration
    };
  }
  function arrayPlugin() {
    return { semantics: semantics$2 };
  }
  const isMemoryIdentifier = (context, id2) => {
    const memory = context.memories[0];
    return memory && memory.value === id2.value;
  };
  function memoryPlugin() {
    return {
      semantics({ stmt }) {
        return {
          [Syntax.ImmutableDeclaration]: (next) => (args) => {
            const [decl, context] = args;
            const { scopes, memories } = context;
            if (!scopes.length < 2 && decl.type === "Memory" && !memories.length) {
              memories.push(_extends({}, decl, {
                meta: _extends({}, decl.meta, {
                  [GLOBAL_INDEX]: -1
                })
              }));
              return memories[0];
            }
            return next(args);
          },
          [Syntax.FunctionCall]: (next) => (args, transform) => {
            const [node, context] = args;
            const [subscript, ...rest] = node.params;
            const [id2 = {}, field = {}] = subscript.params;
            const callMap = {
              dataSize: transform([stmt`i32.load(0);`, context]),
              grow: _extends({}, id2, {
                value: "grow_memory",
                params: rest.map((p) => transform([p, context])),
                Type: Syntax.NativeMethod
              }),
              size: _extends({}, id2, {
                value: "current_memory",
                params: [],
                Type: Syntax.NativeMethod
              })
            };
            const mapped = callMap[field.value];
            if (!(subscript.Type === Syntax.Access && isMemoryIdentifier(context, id2) && mapped)) {
              return next(args);
            }
            return mapped;
          }
        };
      }
    };
  }
  const encodeSigned = (value) => {
    const encoding = [];
    while (true) {
      const byte = value & 127;
      value = value >> 7;
      const signbit = byte & 64;
      if (value === 0 && !signbit || value === -1 && signbit) {
        encoding.push(byte);
        break;
      } else {
        encoding.push(byte | 128);
      }
    }
    return encoding;
  };
  const encodeUnsigned = (value) => {
    const encoding = [];
    while (true) {
      const i = value & 127;
      value = value >>> 7;
      if (value === 0) {
        encoding.push(i);
        break;
      }
      encoding.push(i | 128);
    }
    return encoding;
  };
  const i32 = 1;
  const i64 = 1 << 1;
  const f32 = 1 << 2;
  const f64 = 1 << 3;
  const anyfunc = 1 << 4;
  const func = 1 << 5;
  const block_type = 1 << 6;
  const i8 = 1 << 7;
  const u8 = 1 << 8;
  const i16 = 1 << 9;
  const u16 = 1 << 10;
  const u32 = 1 << 11;
  const u64 = 1 << 12;
  const word = 4;
  const sizeof = {
    [i32]: word,
    [i64]: word * 2,
    [f32]: word,
    [f64]: word * 2,
    [u32]: word,
    [u16]: word >> 1,
    [u8]: word >> 2,
    [i8]: word >> 2,
    [i16]: word >> 1,
    [anyfunc]: word,
    [func]: word,
    [block_type]: word
  };
  const LITTLE_ENDIAN = true;
  const get$1 = (type, index2, dataView) => {
    switch (type) {
      case i32:
        return dataView.getInt32(index2, LITTLE_ENDIAN);
      case i64:
        return dataView.getInt64(index2, LITTLE_ENDIAN);
      case f32:
        return dataView.getFloat32(index2, LITTLE_ENDIAN);
      case f64:
        return dataView.getFloat64(index2, LITTLE_ENDIAN);
      case anyfunc:
        return dataView.getUint32(index2, LITTLE_ENDIAN);
      case func:
        return dataView.getUint32(index2, LITTLE_ENDIAN);
      case i8:
        return dataView.getInt8(index2, LITTLE_ENDIAN);
      case u8:
        return dataView.getUint8(index2, LITTLE_ENDIAN);
      case i16:
        return dataView.getInt16(index2, LITTLE_ENDIAN);
      case u16:
        return dataView.getUint16(index2, LITTLE_ENDIAN);
      case u32:
        return dataView.getUint32(index2, LITTLE_ENDIAN);
      case u64:
        return dataView.getUint64(index2, LITTLE_ENDIAN);
      default:
        return dataView.getUint8(index2, LITTLE_ENDIAN);
    }
  };
  const set$1 = (type, index2, dataView, value) => {
    switch (type) {
      case i32:
        return dataView.setInt32(index2, value, LITTLE_ENDIAN);
      case i64:
        return dataView.setInt64(index2, value, LITTLE_ENDIAN);
      case f32:
        return dataView.setFloat32(index2, value, LITTLE_ENDIAN);
      case f64:
        return dataView.setFloat64(index2, value, LITTLE_ENDIAN);
      case anyfunc:
        return dataView.setUint32(index2, value, LITTLE_ENDIAN);
      case func:
        return dataView.setUint32(index2, value, LITTLE_ENDIAN);
      case i8:
        return dataView.setInt8(index2, value, LITTLE_ENDIAN);
      case u8:
        return dataView.setUint8(index2, value, LITTLE_ENDIAN);
      case i16:
        return dataView.setInt16(index2, value, LITTLE_ENDIAN);
      case u16:
        return dataView.setUint16(index2, value, LITTLE_ENDIAN);
      case u32:
        return dataView.setUint32(index2, value, LITTLE_ENDIAN);
      case u64:
        return dataView.setUint64(index2, value, LITTLE_ENDIAN);
      default:
        return dataView.setUint8(index2, value, LITTLE_ENDIAN);
    }
  };
  var index$2 = {
    i32,
    i64,
    f32,
    f64,
    anyfunc,
    func,
    block_type,
    i8,
    u8,
    i16,
    u16,
    u32,
    u64,
    set: set$1,
    get: get$1,
    sizeof
  };
  var index_1 = index$2.i32;
  var index_2 = index$2.i64;
  var index_3 = index$2.f32;
  var index_4 = index$2.f64;
  var index_9 = index$2.u8;
  var index_12 = index$2.u32;
  var index_14 = index$2.set;
  var index_16 = index$2.sizeof;
  class OutputStream {
    constructor() {
      this.data = [];
      this.size = 0;
    }
    push(type, value, debug) {
      let size = 0;
      switch (type) {
        case "varuint7":
        case "varuint32":
        case "varint7":
        case "varint1": {
          value = encodeUnsigned(value);
          size = value.length;
          invariant_1(size, `Cannot write a value of size ${size}`);
          break;
        }
        case "varint32": {
          value = encodeSigned(value);
          size = value.length;
          invariant_1(size, `Cannot write a value of size ${size}`);
          break;
        }
        case "varint64": {
          value = encodeSigned(value);
          size = value.length;
          invariant_1(size, `Cannot write a value of size ${size}`);
          break;
        }
        default: {
          size = index_16[type];
          invariant_1(size, `Cannot write a value of size ${size}, type ${type}`);
        }
      }
      this.data.push({ type, value, debug });
      this.size += size;
      return this;
    }
    // Get the BUFFER, not data array.
    // Returns a new buffer unless one is passed in to be written to.
    buffer(buffer = new ArrayBuffer(this.size)) {
      const view = new DataView(buffer);
      let pc = 0;
      this.data.forEach(({ type, value }) => {
        if (Array.isArray(value)) {
          value.forEach((v) => index_14(index_9, pc++, view, v));
        } else {
          index_14(type, pc, view, value);
          pc += index_16[type];
        }
      });
      return buffer;
    }
    // Writes source OutputStream into the current buffer
    write(source) {
      if (source) {
        this.data = this.data.concat(source.data);
        this.size += source.size;
      }
      return this;
    }
  }
  function* stringDecoder(view, start) {
    let length = 0;
    let index2 = 0;
    let shift = 0;
    let addr = start;
    while (true) {
      const byte = view.getUint8(addr, true);
      length |= (byte & 127) << shift;
      addr += 1;
      if ((byte & 128) === 0) {
        break;
      }
      shift += 7;
    }
    let result = 0;
    while (index2 < length) {
      result = 0;
      shift = 0;
      while (true) {
        const byte = view.getUint8(addr, true);
        result |= (byte & 127) << shift;
        addr += 1;
        if ((byte & 128) === 0) {
          break;
        }
        shift += 7;
      }
      index2 += 1;
      yield result;
    }
  }
  function stringEncoder(value) {
    const resultStream = new OutputStream();
    const characterStream = new OutputStream();
    characterStream.push("varuint32", value.length, value);
    let i = 0;
    for (i = 0; i < value.length; i++) {
      characterStream.push("varuint32", value.codePointAt(i), value[i]);
    }
    resultStream.write(characterStream);
    return resultStream;
  }
  const escapeMap = {
    ["\\0"]: 0,
    ["\\a"]: 7,
    ["\\b"]: 8,
    ["\\t"]: 9,
    ["\\n"]: 10,
    ["\\v"]: 11,
    ["\\f"]: 12,
    ["\\r"]: 13,
    ["\\'"]: 39
  };
  const sizeMap = {
    i64: 8,
    f64: 8,
    i32: 4,
    f32: 4
  };
  function encodeArray(array, type) {
    const stream = new OutputStream();
    const encodeType = index$2[type];
    array.forEach((v) => {
      stream.push(encodeType, v, String(v));
    });
    return stream;
  }
  function Strings() {
    let count = 0;
    return {
      semantics: ({ stmt }) => ({
        [Syntax.StaticDeclaration]: (_next) => ([node, context], transform) => {
          const { userTypes, statics } = context;
          const bareType = String(node.type).slice(0, -2);
          const typeSize = sizeMap[bareType];
          const meta = node.params.reduce((acc, v, i) => {
            const n = transform([v, context]);
            acc.OBJECT_SIZE += typeSize;
            acc.TYPE_OBJECT[i] = i * typeSize;
            acc.OBJECT_KEY_TYPES[i] = bareType;
            acc.VALUES.push(Number(n.value));
            return acc;
          }, {
            OBJECT_SIZE: 0,
            TYPE_OBJECT: {},
            OBJECT_KEY_TYPES: {},
            VALUES: [],
            STATIC: bareType
          });
          const uid = `__auto_gen_${node.value}_${count}`;
          count += 1;
          userTypes[uid] = _extends({}, node, {
            value: uid,
            Type: Syntax.Type,
            meta,
            params: []
          });
          statics[uid] = encodeArray(meta.VALUES, bareType);
          return transform([_extends({}, node, {
            meta,
            type: uid,
            Type: Syntax.ImmutableDeclaration,
            params: [_extends({}, node.params[0], {
              value: uid,
              Type: Syntax.StaticValueList
            })]
          }), context]);
        },
        [Syntax.ArraySubscript]: (next) => ([node, context], transform) => {
          const [target, offset] = node.params.map((p) => transform([p, context]));
          if (!target.meta.STATIC) {
            return next([node, context]);
          }
          const shift = { i32: 2, f32: 2, i64: 3, f64: 3 }[target.meta.STATIC];
          return transform([stmt`${target.meta.STATIC}.load(${target} + (${offset} << ${shift}));`, context]);
        },
        [Syntax.CharacterLiteral]: (_) => ([node, context], transform) => {
          const codePoint = escapeMap[node.value] || node.value.codePointAt(0);
          return transform([_extends({}, node, {
            Type: "Constant",
            type: "i32",
            value: String(codePoint)
          }), context]);
        },
        [Syntax.StringLiteral]: (_ignore) => (args) => {
          const [stringLiteral, context] = args;
          const { statics } = context;
          const { value } = stringLiteral;
          if (!(value in statics)) {
            statics[value] = stringEncoder(value);
          }
          return stringLiteral;
        }
      })
    };
  }
  function functionPointer() {
    return {
      semantics() {
        return {
          // Handle Table definitions
          [Syntax.ImmutableDeclaration]: (next) => function(args) {
            const [decl, context] = args;
            if (!context.locals && decl.type === "Table") {
              return _extends({}, decl, {
                meta: _extends({}, decl.meta, {
                  [GLOBAL_INDEX]: -1
                })
              });
            }
            return next(args);
          },
          [Syntax.Identifier]: (next) => function(args) {
            const [node, context] = args;
            const { functions, table, scopes } = context;
            if (scope_4(scopes, node.value) || !functions[node.value]) {
              return next(args);
            }
            if (table[node.value] == null) {
              table[node.value] = functions[node.value];
            }
            return _extends({}, node, {
              type: "i32",
              meta: {
                [FUNCTION_INDEX]: functions[node.value].meta[FUNCTION_INDEX]
              },
              value: Object.keys(table).indexOf(node.value),
              Type: Syntax.FunctionPointer
            });
          },
          [Syntax.FunctionResult]: (next) => (args, transform) => {
            const [node, context] = args;
            const { types } = context;
            if (!types[node.type]) {
              return next(args);
            }
            return next([extendNode({
              type: "i32",
              meta: { ALIAS: node.type },
              params: node.params.map((p) => transform([p, context]))
            }, node), context]);
          },
          [Syntax.FunctionCall]: (next) => function(args, transform) {
            const [call, context] = args;
            const { scopes, types } = context;
            const ref = scope_4(scopes, call.value);
            if (!ref) {
              return next(args);
            }
            const typedef = types[ref.type];
            const typeIndex = Object.keys(types).indexOf(ref.type);
            const params = [...call.params.slice(1), _extends({}, ref, { Type: Syntax.Identifier })].map((p) => transform([p, context]));
            return _extends({}, call, {
              meta: _extends({}, call.meta, ref.meta, {
                [TYPE_INDEX]: typeIndex
              }),
              type: typedef != null ? typedef.type : call.type,
              params,
              Type: Syntax.IndirectFunctionCall
            });
          }
        };
      }
    };
  }
  const STRUCT_NATIVE_TYPE = "i32";
  const DIRECT_ADDRESS = "__DIRECT_ADDRESS__";
  const sizeMap$1 = {
    i64: 8,
    f64: 8,
    i32: 4,
    f32: 4,
    [DIRECT_ADDRESS]: 4
  };
  const getByteOffsetsAndSize = (objectLiteralNode) => {
    const offsetsByKey = {};
    const keyTypeMap = {};
    let size = 0;
    walkNode({
      [Syntax.Pair]: (keyTypePair) => {
        const [lhs] = keyTypePair.params;
        const key = lhs.value;
        const type = keyTypePair.params[1].value;
        invariant_1(offsetsByKey[key] == null, `Duplicate key ${key} not allowed in object type`);
        keyTypeMap[key] = `${lhs.Type === "AddressOf" ? "&" : ""}${type}`;
        offsetsByKey[key] = size;
        size += sizeMap$1[type] || 4;
      }
    })(objectLiteralNode);
    return [offsetsByKey, size, keyTypeMap];
  };
  const makeStruct = (stmt) => (base2, field) => {
    const unreachable = stmt`throw;`;
    const fatal = {
      load: extendNode({ range: field.range }, stmt`i32.load(${unreachable}, ${unreachable});`),
      store: (rhs) => extendNode({ range: field.range }, stmt`i32.store(${unreachable}, ${rhs});`),
      offset: unreachable,
      type: "void"
    };
    if (base2.meta.STRUCT_TYPE == null) {
      return fatal;
    }
    const typedef = base2.meta.STRUCT_TYPE;
    const offsetMap = typedef.meta.TYPE_OBJECT;
    const typeMap = typedef.meta.OBJECT_KEY_TYPES;
    const address = offsetMap[field.value];
    if (address == null) {
      return fatal;
    }
    let type = typeMap[field.value];
    const direct = type[0] === "&";
    const offset = address ? stmt`(${base2} + ${address});` : stmt`(${base2});`;
    let STRUCT_TYPE = null;
    let TYPE_ARRAY = null;
    if (type != null && typeof type === "object") {
      STRUCT_TYPE = type;
      type = STRUCT_NATIVE_TYPE;
    }
    if (String(type).endsWith("[]")) {
      TYPE_ARRAY = type.slice(0, -2).replace("&", "");
      type = "i32";
    }
    const withMeta = extendNode({
      range: base2.range,
      meta: { STRUCT_TYPE, TYPE_ARRAY }
    });
    return {
      offset,
      type,
      store: (rhs) => withMeta(stmt`${type}.store(${offset}, ${rhs});`),
      load: withMeta(direct ? offset : stmt`${type}.load(${offset});`)
    };
  };
  function Struct() {
    return {
      semantics({ stmt }) {
        const structure = makeStruct(stmt);
        function fieldAssignment(args, transform) {
          const [node, context] = args;
          const [lhs, rhs] = node.params;
          const [root, key] = lhs.params;
          const s = structure(transform([root, context]), key);
          return transform([s.store(rhs), context]);
        }
        function objectAssignment(args, transform) {
          const [node, context] = args;
          const [lhs, rhs] = node.params;
          const base2 = transform([lhs, context]);
          const kvs = [];
          walkNode({
            // Top level Identifiers _inside_ an object literal === shorthand
            // Notice that we ignore chld mappers in both Pairs and Spread(s) so the
            // only way this is hit is if the identifier is TOP LEVEL
            [Syntax.Identifier]: (value, _) => {
              const field = structure(base2, value);
              kvs.push({ field, value });
            },
            [Syntax.Pair]: (pair, _) => {
              const [property, value] = pair.params;
              const field = structure(base2, property);
              kvs.push({ field, value });
            },
            [Syntax.Spread]: (spread, _) => {
              const target = transform([spread.params[0], context]);
              Object.keys(target.meta.TYPE_OBJECT).forEach((key) => {
                const field = structure(base2, {
                  value: key,
                  type: null,
                  range: target.range
                });
                const s = structure(target, {
                  value: key,
                  type: null,
                  range: target.range
                });
                kvs.push({
                  field,
                  value: s.load
                });
              });
            }
          })(rhs);
          const params = kvs.filter(({ field }) => field != null).map((kv) => transform([kv.field.store(kv.value), context]));
          return _extends({}, lhs, {
            Type: Syntax.Block,
            params
          });
        }
        return {
          [Syntax.Struct]: (_) => ([node, context], transform) => {
            const { userTypes, aliases } = context;
            const [union] = node.params;
            let structNode = _extends({}, node, {
              meta: _extends({}, node.meta, {
                TYPE_OBJECT: {},
                OBJECT_SIZE: 0,
                OBJECT_KEY_TYPES: {}
              })
            });
            const Alias = () => {
              aliases[node.value] = union.value;
            };
            const objectLiteral = (obj, __) => {
              const [offsets, size, typeMap] = getByteOffsetsAndSize(obj);
              structNode.meta.TYPE_OBJECT = _extends({}, structNode.meta.TYPE_OBJECT, offsets);
              structNode.meta.OBJECT_SIZE += size;
              structNode.meta.OBJECT_KEY_TYPES = _extends({}, structNode.meta.OBJECT_KEY_TYPES, typeMap);
            };
            const parsers = {
              [Syntax.Type]: Alias,
              [Syntax.Identifier]: Alias,
              [Syntax.ObjectLiteral]: () => {
                objectLiteral(node);
                userTypes[structNode.value] = structNode;
              },
              [Syntax.UnionType]: () => {
                walkNode({
                  [Syntax.ObjectLiteral]: objectLiteral,
                  [Syntax.ArrayType]: (type) => {
                    structNode.meta.TYPE_ARRAY = type.type.slice(0, -2);
                  },
                  [Syntax.Identifier]: (id2) => {
                    const structReference = userTypes[transform([id2, context]).value];
                    structNode.meta.TYPE_OBJECT = _extends({}, structNode.meta.TYPE_OBJECT, structReference.meta.TYPE_OBJECT);
                    structNode.meta.OBJECT_SIZE = Math.max(structNode.meta.OBJECT_SIZE, structReference.meta.OBJECT_SIZE);
                    structNode.meta.OBJECT_KEY_TYPES = _extends({}, structNode.meta.OBJECT_KEY_TYPES, structReference.meta.OBJECT_KEY_TYPES);
                  }
                })(union);
                userTypes[structNode.value] = structNode;
              }
            };
            parsers[union.Type]();
            structNode.meta.OBJECT_KEY_TYPES = Object.entries(structNode.meta.OBJECT_KEY_TYPES).reduce((acc, [key, value]) => {
              acc[key] = userTypes[value] || value;
              return acc;
            }, {});
            return structNode;
          },
          // Declaration type remapping is done for aliases here but not for struct
          // types since that is achieved in the declaration parser.
          [Syntax.DeclType]: (next) => (args, transform) => {
            const [node, context] = args;
            const { aliases } = context;
            if (aliases[node.value]) {
              return transform([extendNode({ value: aliases[node.value], type: aliases[node.value] }, node), context]);
            }
            return next(args);
          },
          [Syntax.FunctionResult]: (next) => (args, transform) => {
            const [node, context] = args;
            const { userTypes, aliases } = context;
            if (aliases[node.type]) {
              return transform([extendNode({ type: aliases[node.type] }, node), context]);
            }
            if (!userTypes[String(node.type)]) {
              return next(args);
            }
            return next([extendNode({
              type: STRUCT_NATIVE_TYPE,
              meta: { STRUCT_TYPE: userTypes[node.type] },
              params: node.params.map((p) => transform([p, context]))
            }, node), context]);
          },
          [Syntax.Identifier]: (next) => (args) => {
            const [node, context] = args;
            const { userTypes, scopes } = context;
            const ref = scope_4(scopes, node.value);
            if (!(ref && userTypes[ref.type])) {
              return next(args);
            }
            return _extends({}, node, {
              meta: _extends({}, node.meta, ref.meta, userTypes[ref.type].meta, {
                STRUCT_TYPE: userTypes[ref.type]
              }),
              type: STRUCT_NATIVE_TYPE
            });
          },
          [Syntax.Access]: function(_next) {
            return (args, transform) => {
              const [node, context] = args;
              const [lookup, key] = node.params;
              const s = structure(transform([lookup, context]), key);
              return transform([s.load, context]);
            };
          },
          [Syntax.Assignment]: (next) => (args, transform) => {
            const [node] = args;
            const [lhs, rhs] = node.params;
            if (lhs.Type === Syntax.Access) {
              return fieldAssignment(args, transform);
            }
            if (rhs.Type === Syntax.ObjectLiteral) {
              return objectAssignment(args, transform);
            }
            return next(args);
          },
          /**
           * Short-circuit parser for Struct[] type array subscripts. Since an
           * array of structs is a contiguous list of struct data in memory we
           * don't want to "load" the data at index into a variable, instead we
           * want the address-of the index!
           */
          [Syntax.ArraySubscript]: (next) => (args, t) => {
            const [node, context] = args;
            const parsed = next(args);
            if (context.userTypes[parsed.meta.TYPE_ARRAY] == null) {
              return parsed;
            }
            const [base2, offset] = node.params.map((p) => t([p, context]));
            return t([extendNode({
              type: STRUCT_NATIVE_TYPE,
              meta: {
                STRUCT_TYPE: context.userTypes[parsed.meta.TYPE_ARRAY]
              }
            }, stmt`(${base2} + (${offset} * sizeof(${parsed.meta.TYPE_ARRAY})));`), context]);
          }
        };
      }
    };
  }
  function nativePlugin() {
    return {
      semantics() {
        return {
          [Syntax.FunctionCall]: (next) => (args, transform) => {
            const [node, context] = args;
            const [id2, ...fnArgs] = node.params;
            if (id2.Type === Syntax.Access && id2.params[0] && id2.params[0].Type === Syntax.Type) {
              const [type, method] = id2.params;
              return extendNode({
                value: `${type.value}.${method.value}`,
                type: type.value,
                params: fnArgs.map((p) => transform([p, context])),
                Type: Syntax.NativeMethod
              }, node);
            }
            return next(args);
          },
          [Syntax.Unreachable]: (_) => ([node]) => {
            return extendNode({
              value: "unreachable",
              params: [],
              Type: Syntax.NativeMethod
            }, node);
          }
        };
      }
    };
  }
  function defaultArguments() {
    return {
      grammar: grammar$1,
      semantics() {
        return {
          [Syntax.FunctionDeclaration]: (next) => (args) => {
            const [node, context] = args;
            const [argumentsNode] = node.params;
            const defaultArguments2 = [];
            walkNode({
              Assignment: (defaultArg) => {
                const [, value] = defaultArg.params;
                defaultArguments2.push(value);
              }
            })(argumentsNode);
            return next([_extends({}, node, {
              meta: _extends({}, node.meta, { DEFAULT_ARGUMENTS: defaultArguments2 })
            }), context]);
          },
          // There isn't a need to parse out the Assignment expressions as they are
          // not actually compiled/generated into the final binary
          // [Syntax.Assignment]: next => (args, transform) => {
          //   const [node, context] = args;
          //   // Not inside arguments
          //   const currentScope = current(context.scopes);
          //   // Arguments have not been set for scope yet and the current scope is
          //   // not global
          //   if (currentScope.arguments == null && context.scopes.length > 1) {
          //     return next(args);
          //   }
          //   // Assignment has higher precedence than ":" Pair expressions so the
          //   // children of this node will be [Pair(id:type), Constant(value)]
          //   // remove the constant return the pair.
          //   //
          //   // A helpful visual of a valid default argument syntax:
          //   //
          //   //      function fn(x : i32, y : i32, z : i32 = 0) { ... }
          //   const [pair] = node.params;
          //   // Short circuit the parsers since it does not make sense to process
          //   // assignment anymore. Instead parse the Pair, which is the argument.
          //   return transform([pair, context]);
          // },
          [Syntax.FunctionCall]: (next) => (args) => {
            const [call, context] = args;
            const { functions } = context;
            const [id2, ...fnArgs] = call.params;
            const target = functions[id2.value];
            if (!target) {
              return next(args);
            }
            const expectedArguments = target.meta.FUNCTION_METADATA.argumentsCount;
            const count = fnArgs.length;
            const difference = expectedArguments - count;
            if (difference > 0) {
              return next([_extends({}, call, {
                params: [...call.params, ...target.meta.DEFAULT_ARGUMENTS.slice(difference - 1)]
              }), context]);
            }
            return next(args);
          }
        };
      }
    };
  }
  const sizes$1 = {
    i64: 8,
    f64: 8,
    i32: 4,
    f32: 4
  };
  function sizeofPlugin() {
    return {
      semantics() {
        return {
          [Syntax.FunctionCall]: (next) => (args) => {
            const [sizeof2, context] = args;
            if (sizeof2.value !== "sizeof") {
              return next(args);
            }
            const { scopes, userTypes, functions } = context;
            const [, target] = sizeof2.params;
            const ref = scope_4(scopes, target.value);
            const { type = "" } = ref || {};
            const userType = userTypes[target.value] || userTypes[type];
            const func2 = functions[target.value];
            if (userType != null) {
              const metaSize = userType.meta[OBJECT_SIZE];
              invariant_1(metaSize, "Object size information is missing");
              return _extends({}, sizeof2, {
                value: metaSize,
                params: [],
                type: "i32",
                Type: Syntax.Constant
              });
            }
            const node = ref || func2;
            return _extends({}, sizeof2, {
              value: sizes$1[String(node ? node.type : target.value)],
              type: "i32",
              params: [],
              Type: Syntax.Constant
            });
          }
        };
      }
    };
  }
  const getBuiltInParsers = () => {
    return [base().semantics, Core().semantics, Imports().semantics, typePlugin().semantics, unary().semantics, coreFunctionPlugin().semantics, booleanPlugin().semantics, arrayPlugin().semantics, memoryPlugin().semantics, Strings().semantics, functionPointer().semantics, Struct().semantics, nativePlugin().semantics, sizeofPlugin().semantics, defaultArguments().semantics];
  };
  function semantics(ast, extraSemantics, options) {
    const plugins2 = [...getBuiltInParsers(), ...extraSemantics];
    const combined = combineParsers(plugins2.map((p) => p(options)));
    const context = {
      functions: {},
      types: {},
      userTypes: {},
      table: {},
      hoist: [],
      statics: {},
      path: [],
      scopes: scope_1([], GLOBAL_INDEX),
      memories: [],
      tables: [],
      aliases: {},
      exports: {}
    };
    const parsed = mapNode_1(combined)([ast, context]);
    const {
      functions,
      scopes,
      types,
      userTypes,
      statics,
      hoist,
      exports: exports3
    } = context;
    return _extends({}, parsed, {
      meta: _extends({}, parsed.meta, {
        // Attach information collected to the AST
        [AST_METADATA]: {
          functions,
          globals: scopes[0],
          types,
          userTypes,
          statics,
          exports: exports3
        }
      }),
      params: [...parsed.params, ...hoist]
    });
  }
  function generateErrorString(msg, error, marker2, filename, func2) {
    const line = marker2.start.line;
    const col = marker2.start.col;
    const end = marker2.end.col;
    const Line = marker2.end.sourceLine;
    const highlight = new Array(end - col + 1).join("^").padStart(marker2.start.col - 1, " ");
    return "\n" + Line + "\n" + highlight + ` ${error}
` + msg + `
  at ${func2} (${filename}:${line}:${col})`;
  }
  const def = {};
  const opcodeMap = [];
  const textMap = {};
  const ___ = null;
  const opcode = (result, first, second, size, code, name, text) => {
    const definition = {
      result,
      first,
      second,
      size,
      code,
      name,
      text
    };
    def[name] = definition;
    opcodeMap[code] = definition;
    textMap[text] = definition;
    return definition;
  };
  opcode(___, ___, ___, 0, 0, "Unreachable", "unreachable");
  opcode(___, ___, ___, 0, 1, "Nop", "nop");
  opcode(___, ___, ___, 0, 2, "Block", "block");
  opcode(___, ___, ___, 0, 3, "Loop", "loop");
  opcode(___, ___, ___, 0, 4, "If", "if");
  opcode(___, ___, ___, 0, 5, "Else", "else");
  opcode(___, ___, ___, 0, 6, "Try", "try");
  opcode(___, ___, ___, 0, 7, "Catch", "catch");
  opcode(___, ___, ___, 0, 8, "Throw", "throw");
  opcode(___, ___, ___, 0, 9, "Rethrow", "rethrow");
  opcode(___, ___, ___, 0, 10, "CatchAll", "catch_all");
  opcode(___, ___, ___, 0, 11, "End", "end");
  opcode(___, ___, ___, 0, 12, "Br", "br");
  opcode(___, ___, ___, 0, 13, "BrIf", "br_if");
  opcode(___, ___, ___, 0, 14, "BrTable", "br_table");
  opcode(___, ___, ___, 0, 15, "Return", "return");
  opcode(___, ___, ___, 0, 16, "Call", "call");
  opcode(___, ___, ___, 0, 17, "CallIndirect", "call_indirect");
  opcode(___, ___, ___, 0, 26, "Drop", "drop");
  opcode(___, ___, ___, 0, 27, "Select", "select");
  opcode(___, ___, ___, 0, 32, "GetLocal", "get_local");
  opcode(___, ___, ___, 0, 33, "SetLocal", "set_local");
  opcode(___, ___, ___, 0, 34, "TeeLocal", "tee_local");
  opcode(___, ___, ___, 0, 35, "GetGlobal", "get_global");
  opcode(___, ___, ___, 0, 36, "SetGlobal", "set_global");
  opcode(index_1, index_1, ___, 4, 40, "i32Load", "i32.load");
  opcode(index_2, index_1, ___, 8, 41, "i64Load", "i64.load");
  opcode(index_3, index_1, ___, 4, 42, "f32Load", "f32.load");
  opcode(index_4, index_1, ___, 8, 43, "f64Load", "f64.load");
  opcode(index_1, index_1, ___, 1, 44, "i32Load8S", "i32.load8_s");
  opcode(index_1, index_1, ___, 1, 45, "i32Load8U", "i32.load8_u");
  opcode(index_1, index_1, ___, 2, 46, "i32Load16S", "i32.load16_s");
  opcode(index_1, index_1, ___, 2, 47, "i32Load16U", "i32.load16_u");
  opcode(index_2, index_1, ___, 1, 48, "i64Load8S", "i64.load8_s");
  opcode(index_2, index_1, ___, 1, 49, "i64Load8U", "i64.load8_u");
  opcode(index_2, index_1, ___, 2, 50, "i64Load16S", "i64.load16_s");
  opcode(index_2, index_1, ___, 2, 51, "i64Load16U", "i64.load16_u");
  opcode(index_2, index_1, ___, 4, 52, "i64Load32S", "i64.load32_s");
  opcode(index_2, index_1, ___, 4, 53, "i64Load32U", "i64.load32_u");
  opcode(___, index_1, index_1, 4, 54, "i32Store", "i32.store");
  opcode(___, index_1, index_2, 8, 55, "i64Store", "i64.store");
  opcode(___, index_1, index_3, 4, 56, "f32Store", "f32.store");
  opcode(___, index_1, index_3, 8, 57, "f64Store", "f64.store");
  opcode(___, index_1, index_1, 1, 58, "i32Store8", "i32.store8");
  opcode(___, index_1, index_1, 2, 59, "i32Store16", "i32.store16");
  opcode(___, index_1, index_2, 1, 60, "i64Store8", "i64.store8");
  opcode(___, index_1, index_2, 2, 61, "i64Store16", "i64.store16");
  opcode(___, index_1, index_2, 4, 62, "i64Store32", "i64.store32");
  opcode(index_1, ___, ___, 0, 63, "CurrentMemory", "current_memory");
  opcode(index_1, index_1, ___, 0, 64, "GrowMemory", "grow_memory");
  opcode(index_1, ___, ___, 0, 65, "i32Const", "i32.const");
  opcode(index_2, ___, ___, 0, 66, "i64Const", "i64.const");
  opcode(index_3, ___, ___, 0, 67, "f32Const", "f32.const");
  opcode(index_4, ___, ___, 0, 68, "f64Const", "f64.const");
  opcode(index_1, index_1, ___, 0, 69, "i32Eqz", "i32.eqz");
  opcode(index_1, index_1, index_1, 0, 70, "i32Eq", "i32.eq");
  opcode(index_1, index_1, index_1, 0, 71, "i32Ne", "i32.ne");
  opcode(index_1, index_1, index_1, 0, 72, "i32LtS", "i32.lt_s");
  opcode(index_1, index_1, index_1, 0, 73, "i32LtU", "i32.lt_u");
  opcode(index_1, index_1, index_1, 0, 74, "i32GtS", "i32.gt_s");
  opcode(index_1, index_1, index_1, 0, 75, "i32GtU", "i32.gt_u");
  opcode(index_1, index_1, index_1, 0, 76, "i32LeS", "i32.le_s");
  opcode(index_1, index_1, index_1, 0, 77, "i32LeU", "i32.le_u");
  opcode(index_1, index_1, index_1, 0, 78, "i32GeS", "i32.ge_s");
  opcode(index_1, index_1, index_1, 0, 79, "i32GeU", "i32.ge_u");
  opcode(index_1, index_2, ___, 0, 80, "i64Eqz", "i64.eqz");
  opcode(index_1, index_2, index_2, 0, 81, "i64Eq", "i64.eq");
  opcode(index_1, index_2, index_2, 0, 82, "i64Ne", "i64.ne");
  opcode(index_1, index_2, index_2, 0, 83, "i64LtS", "i64.lt_s");
  opcode(index_1, index_2, index_2, 0, 84, "i64LtU", "i64.lt_u");
  opcode(index_1, index_2, index_2, 0, 85, "i64GtS", "i64.gt_s");
  opcode(index_1, index_2, index_2, 0, 86, "i64GtU", "i64.gt_u");
  opcode(index_1, index_2, index_2, 0, 87, "i64LeS", "i64.le_s");
  opcode(index_1, index_2, index_2, 0, 88, "i64LeU", "i64.le_u");
  opcode(index_1, index_2, index_2, 0, 89, "i64GeS", "i64.ge_s");
  opcode(index_1, index_2, index_2, 0, 90, "i64GeU", "i64.ge_u");
  opcode(index_1, index_3, index_3, 0, 91, "f32Eq", "f32.eq");
  opcode(index_1, index_3, index_3, 0, 92, "f32Ne", "f32.ne");
  opcode(index_1, index_3, index_3, 0, 93, "f32Lt", "f32.lt");
  opcode(index_1, index_3, index_3, 0, 94, "f32Gt", "f32.gt");
  opcode(index_1, index_3, index_3, 0, 95, "f32Le", "f32.le");
  opcode(index_1, index_3, index_3, 0, 96, "f32Ge", "f32.ge");
  opcode(index_1, index_3, index_3, 0, 97, "f64Eq", "f64.eq");
  opcode(index_1, index_3, index_3, 0, 98, "f64Ne", "f64.ne");
  opcode(index_1, index_3, index_3, 0, 99, "f64Lt", "f64.lt");
  opcode(index_1, index_3, index_3, 0, 100, "f64Gt", "f64.gt");
  opcode(index_1, index_3, index_3, 0, 101, "f64Le", "f64.le");
  opcode(index_1, index_3, index_3, 0, 102, "f64Ge", "f64.ge");
  opcode(index_1, index_1, ___, 0, 103, "i32Clz", "i32.clz");
  opcode(index_1, index_1, ___, 0, 104, "i32Ctz", "i32.ctz");
  opcode(index_1, index_1, ___, 0, 105, "i32Popcnt", "i32.popcnt");
  opcode(index_1, index_1, index_1, 0, 106, "i32Add", "i32.add");
  opcode(index_1, index_1, index_1, 0, 107, "i32Sub", "i32.sub");
  opcode(index_1, index_1, index_1, 0, 108, "i32Mul", "i32.mul");
  opcode(index_1, index_1, index_1, 0, 109, "i32DivS", "i32.div_s");
  opcode(index_1, index_1, index_1, 0, 110, "i32DivU", "i32.div_u");
  opcode(index_1, index_1, index_1, 0, 111, "i32RemS", "i32.rem_s");
  opcode(index_1, index_1, index_1, 0, 112, "i32RemU", "i32.rem_u");
  opcode(index_1, index_1, index_1, 0, 113, "i32And", "i32.and");
  opcode(index_1, index_1, index_1, 0, 114, "i32Or", "i32.or");
  opcode(index_1, index_1, index_1, 0, 115, "i32Xor", "i32.xor");
  opcode(index_1, index_1, index_1, 0, 116, "i32Shl", "i32.shl");
  opcode(index_1, index_1, index_1, 0, 117, "i32ShrS", "i32.shr_s");
  opcode(index_1, index_1, index_1, 0, 118, "i32ShrU", "i32.shr_u");
  opcode(index_1, index_1, index_1, 0, 119, "i32Rotl", "i32.rotl");
  opcode(index_1, index_1, index_1, 0, 120, "i32Rotr", "i32.rotr");
  opcode(index_2, index_2, ___, 0, 121, "i64Clz", "i64.clz");
  opcode(index_2, index_2, ___, 0, 122, "i64Ctz", "i64.ctz");
  opcode(index_2, index_2, ___, 0, 123, "i64Popcnt", "i64.popcnt");
  opcode(index_2, index_2, index_2, 0, 124, "i64Add", "i64.add");
  opcode(index_2, index_2, index_2, 0, 125, "i64Sub", "i64.sub");
  opcode(index_2, index_2, index_2, 0, 126, "i64Mul", "i64.mul");
  opcode(index_2, index_2, index_2, 0, 127, "i64DivS", "i64.div_s");
  opcode(index_2, index_2, index_2, 0, 128, "i64DivU", "i64.div_u");
  opcode(index_2, index_2, index_2, 0, 129, "i64RemS", "i64.rem_s");
  opcode(index_2, index_2, index_2, 0, 130, "i64RemU", "i64.rem_u");
  opcode(index_2, index_2, index_2, 0, 131, "i64And", "i64.and");
  opcode(index_2, index_2, index_2, 0, 132, "i64Or", "i64.or");
  opcode(index_2, index_2, index_2, 0, 133, "i64Xor", "i64.xor");
  opcode(index_2, index_2, index_2, 0, 134, "i64Shl", "i64.shl");
  opcode(index_2, index_2, index_2, 0, 135, "i64ShrS", "i64.shr_s");
  opcode(index_2, index_2, index_2, 0, 136, "i64ShrU", "i64.shr_u");
  opcode(index_2, index_2, index_2, 0, 137, "i64Rotl", "i64.rotl");
  opcode(index_2, index_2, index_2, 0, 138, "i64Rotr", "i64.rotr");
  opcode(index_3, index_3, index_3, 0, 139, "f32Abs", "f32.abs");
  opcode(index_3, index_3, index_3, 0, 140, "f32Neg", "f32.neg");
  opcode(index_3, index_3, index_3, 0, 141, "f32Ceil", "f32.ceil");
  opcode(index_3, index_3, index_3, 0, 142, "f32Floor", "f32.floor");
  opcode(index_3, index_3, index_3, 0, 143, "f32Trunc", "f32.trunc");
  opcode(index_3, index_3, index_3, 0, 144, "f32Nearest", "f32.nearest");
  opcode(index_3, index_3, index_3, 0, 145, "f32Sqrt", "f32.sqrt");
  opcode(index_3, index_3, index_3, 0, 146, "f32Add", "f32.add");
  opcode(index_3, index_3, index_3, 0, 147, "f32Sub", "f32.sub");
  opcode(index_3, index_3, index_3, 0, 148, "f32Mul", "f32.mul");
  opcode(index_3, index_3, index_3, 0, 149, "f32Div", "f32.div");
  opcode(index_3, index_3, index_3, 0, 150, "f32Min", "f32.min");
  opcode(index_3, index_3, index_3, 0, 151, "f32Max", "f32.max");
  opcode(index_3, index_3, index_3, 0, 152, "f32Copysign", "f32.copysign");
  opcode(index_3, index_3, index_3, 0, 153, "f32Abs", "f64.abs");
  opcode(index_3, index_3, index_3, 0, 154, "f32Neg", "f64.neg");
  opcode(index_3, index_3, index_3, 0, 155, "f32Ceil", "f64.ceil");
  opcode(index_3, index_3, index_3, 0, 156, "f32Floor", "f64.floor");
  opcode(index_3, index_3, index_3, 0, 157, "f32Trunc", "f64.trunc");
  opcode(index_3, index_3, index_3, 0, 158, "f32Nearest", "f64.nearest");
  opcode(index_3, index_3, index_3, 0, 159, "f32Sqrt", "f64.sqrt");
  opcode(index_4, index_4, index_4, 0, 160, "f64Add", "f64.add");
  opcode(index_4, index_4, index_4, 0, 161, "f64Sub", "f64.sub");
  opcode(index_4, index_4, index_4, 0, 162, "f64Mul", "f64.mul");
  opcode(index_4, index_4, index_4, 0, 163, "f64Div", "f64.div");
  opcode(index_4, index_4, index_4, 0, 164, "f64Min", "f64.min");
  opcode(index_4, index_4, index_4, 0, 165, "f64Max", "f64.max");
  opcode(index_4, index_4, index_4, 0, 166, "f64Copysign", "f64.copysign");
  opcode(index_1, index_2, ___, 0, 167, "i32Wrapi64", "i32.wrap/i64");
  opcode(index_1, index_3, ___, 0, 168, "i32TruncSf32", "i32.trunc_s/f32");
  opcode(index_1, index_3, ___, 0, 169, "i32TruncUf32", "i32.trunc_u/f32");
  opcode(index_1, index_3, ___, 0, 170, "i32TruncSf64", "i32.trunc_s/f64");
  opcode(index_1, index_3, ___, 0, 171, "i32TruncUf64", "i32.trunc_u/f64");
  opcode(index_2, index_1, ___, 0, 172, "i64ExtendSi32", "i64.extend_s/i32");
  opcode(index_2, index_1, ___, 0, 173, "i64ExtendUi32", "i64.extend_u/i32");
  opcode(index_2, index_3, ___, 0, 174, "i64TruncSf32", "i64.trunc_s/f32");
  opcode(index_2, index_3, ___, 0, 175, "i64TruncUf32", "i64.trunc_u/f32");
  opcode(index_2, index_3, ___, 0, 176, "i64TruncSf64", "i64.trunc_s/f64");
  opcode(index_2, index_3, ___, 0, 177, "i64TruncUf64", "i64.trunc_u/f64");
  opcode(index_3, index_1, ___, 0, 178, "f32ConvertSi32", "f32.convert_s/i32");
  opcode(index_3, index_1, ___, 0, 179, "f32ConvertUi32", "f32.convert_u/i32");
  opcode(index_3, index_2, ___, 0, 180, "f32ConvertSi64", "f32.convert_s/i64");
  opcode(index_3, index_2, ___, 0, 181, "f32ConvertUi64", "f32.convert_u/i64");
  opcode(index_3, index_3, ___, 0, 182, "f32Demotef64", "f32.demote/f64");
  opcode(index_3, index_1, ___, 0, 183, "f64ConvertSi32", "f64.convert_s/i32");
  opcode(index_3, index_1, ___, 0, 184, "f64ConvertUi32", "f64.convert_u/i32");
  opcode(index_3, index_2, ___, 0, 185, "f64ConvertSi64", "f64.convert_s/i64");
  opcode(index_3, index_2, ___, 0, 186, "f64ConvertUi64", "f64.convert_u/i64");
  opcode(index_3, index_3, ___, 0, 187, "f64Promotef32", "f64.promote/f32");
  opcode(index_1, index_3, ___, 0, 188, "i32Reinterpretf32", "i32.reinterpret/f32");
  opcode(index_2, index_3, ___, 0, 189, "i64Reinterpretf64", "i64.reinterpret/f64");
  opcode(index_3, index_1, ___, 0, 190, "f32Reinterpreti32", "f32.reinterpret/i32");
  opcode(index_3, index_2, ___, 0, 191, "f32Reinterpreti64", "f64.reinterpret/i64");
  const getTypecastOpcode = (to, from) => {
    const toType = to[0];
    if (["i32", "bool"].includes(to) && from === "i64") {
      return def.i32Wrapi64;
    }
    if (to === "i64" && ["i32", "bool"].includes(from)) {
      return def.i64ExtendSi32;
    }
    if (to === "f32" && from === "f64") {
      return def.f32Demotef64;
    }
    if (to === "f64" && from === "f32") {
      return def.f64Promotef32;
    }
    const conversion = toType === "f" ? "ConvertS" : "TruncS";
    return def[to + conversion + from];
  };
  const opcodeFromOperator = ({
    type,
    value
  }) => {
    const mapping = {
      "+": def[String(type) + "Add"],
      "-": def[String(type) + "Sub"],
      "*": def[String(type) + "Mul"],
      "/": def[String(type) + "DivS"] || def[String(type) + "Div"],
      "%": def[String(type) + "RemS"] || def[String(type) + "RemU"],
      "==": def[String(type) + "Eq"],
      "!=": def[String(type) + "Ne"],
      ">": def[String(type) + "Gt"] || def[String(type) + "GtS"],
      "<": def[String(type) + "Lt"] || def[String(type) + "LtS"],
      "<=": def[String(type) + "Le"] || def[String(type) + "LeS"],
      ">=": def[String(type) + "Ge"] || def[String(type) + "GeS"],
      "?": def.If,
      ":": def.Else,
      "&": def[String(type) + "And"],
      "|": def[String(type) + "Or"],
      "^": def[String(type) + "Xor"],
      ">>": def[String(type) + "ShrS"],
      ">>>": def[String(type) + "ShrU"],
      "<<": def[String(type) + "Shl"]
    };
    return mapping[value];
  };
  const I32 = 127;
  const I64 = 126;
  const F32 = 125;
  const F64 = 124;
  const ANYFUNC = 112;
  const FUNC = 96;
  const stringToType = {
    i32: I32,
    i64: I64,
    f32: F32,
    f64: F64
  };
  const getTypeString = (type) => {
    switch (type) {
      case I64:
        return "i64";
      case F32:
        return "f32";
      case F64:
        return "f64";
      case FUNC:
        return "func";
      case ANYFUNC:
        return "anyfunc";
      case I32:
      default:
        return "i32";
    }
  };
  const parseBounds = (node) => {
    const memory = {};
    walkNode({
      [Syntax.Pair]: ({ params }) => {
        const [{ value: key }, { value }] = params;
        memory[key] = parseInt(value);
      }
    })(node);
    return memory;
  };
  const getText$1 = (node) => {
    const value = node.value || "??";
    const hasType = node.type;
    const op = opcodeFromOperator({ value, type: hasType || "i32" });
    if (!hasType) {
      return op.text.replace("i32", "??");
    }
    return op.text;
  };
  const parseParams = (node) => {
    const params = [];
    walkNode({
      [Syntax.Pair]: (pair, _) => {
        params.push(`${pair.params[0].value} ${pair.params[1].value}`);
      },
      [Syntax.Type]: (p) => {
        params.push(p.value);
      }
    })(node);
    return params.length ? " param(" + params.join(" ") + ")" : "";
  };
  const parseResult = (node) => {
    if (node == null) {
      return "";
    }
    return " (result " + (node.type || "??") + ")";
  };
  const typedefString = (node) => {
    const [paramsNode, resultNode] = node.params;
    return "(type " + node.value + ` (func${parseParams(paramsNode)}${parseResult(resultNode)}))`;
  };
  const printFormatted = (add2, print, { value, params }) => {
    if (params.filter(Boolean).length) {
      add2(`(${value}`, 2);
      params.forEach(print);
      add2(")", 0, -2);
    } else {
      add2(`(${value})`, 0, 0);
    }
  };
  const getPrinters = (add2) => ({
    [Syntax.Import]: (node, _print) => {
      const [nodes, mod] = node.params;
      walkNode({
        [Syntax.Pair]: ({ params }, _) => {
          const { value: field } = params[0];
          const type = params[1];
          if (type.value === "Memory") {
            const memory = parseBounds(type);
            add2(`(import "${mod.value}" "${field}" (memory ${memory.initial}${memory.max ? memory.max : ""}))`);
          } else {
            add2(`(import "${mod.value}" "${field}" ${typedefString(type)})`);
          }
        },
        [Syntax.Identifier]: (missing, _) => {
          const { value } = missing;
          add2(`(import "${mod.value}" "${value}" (type ??))`);
        }
      })(nodes);
    },
    [Syntax.Export]: (node, print) => {
      add2("(export", 2);
      node.params.forEach(print);
      add2(")", 0, -2);
    },
    [Syntax.GenericType]: (node, _print) => {
      add2(";; Pseudo type", 0, 0);
      add2("(type-generic " + node.value + ")", 0, 0);
    },
    [Syntax.FunctionCall]: ({ value, params }, print) => {
      printFormatted(add2, print, { value: `call ${value}`, params });
    },
    [Syntax.Block]: ({ params }, print) => {
      printFormatted(add2, print, { value: "block", params });
    },
    [Syntax.NativeMethod]: (node, print) => {
      printFormatted(add2, print, node);
    },
    [Syntax.BinaryExpression]: (node, print) => {
      const text = getText$1(node);
      printFormatted(add2, print, { value: text, params: node.params });
    },
    [Syntax.ArraySubscript]: ({ params }, print) => {
      add2(";; unparsed", 0, 0);
      printFormatted(add2, print, { value: "subscript", params });
    },
    [Syntax.Typedef]: (node, _) => {
      add2(typedefString(node));
    },
    [Syntax.Struct]: (node, print) => {
      add2(";; Pseudo struct type", 0, 0);
      printFormatted(add2, print, {
        value: "type-struct " + node.value,
        params: node.params
      });
    },
    [Syntax.Identifier]: (node) => {
      const scope2 = node.meta[GLOBAL_INDEX] != null ? "global" : "local";
      add2(`(get_${scope2} ${node.value})`);
    },
    [Syntax.Constant]: (node) => {
      add2(`(${String(node.type)}.const ${node.value})`);
    },
    [Syntax.FunctionPointer]: (node) => {
      add2(`(${String(node.type)}.table_pointer ${node.value})`);
    },
    [Syntax.FunctionDeclaration]: (node, print) => {
      const [params, result, ...rest] = node.params;
      add2(`(func ${node.value}${parseParams(params)}${parseResult(result)}`, 2);
      rest.forEach(print);
      add2(")", 0, -2);
    },
    [Syntax.ReturnStatement]: ({ params }, print) => {
      printFormatted(add2, print, { value: "return", params });
    },
    [Syntax.Declaration]: (node, print) => {
      add2("(local " + node.value + " " + String(node.type), 2, 0);
      node.params.forEach(print);
      add2(")", 0, -2);
    },
    [Syntax.ImmutableDeclaration]: (node, print) => {
      const scope2 = node.meta[GLOBAL_INDEX] != null ? "global" : "local";
      if (node.type === "Memory") {
        const memory = parseBounds(node);
        add2(`(memory ${memory.initial}${memory.max ? ` ${memory.max}` : ""})`);
      } else {
        add2(`(${scope2} ` + node.value + " " + String(node.type), 2, 0);
        node.params.forEach(print);
        add2(")", 0, -2);
      }
    },
    [Syntax.StringLiteral]: (node) => {
      add2(`; string "${node.value}"`, 0, 0);
      add2("(i32.const ??)", 0, 0);
    },
    [Syntax.Type]: (node) => {
      add2(node.value);
    },
    [Syntax.TypeCast]: (node, print) => {
      const from = node.params[0];
      const op = getTypecastOpcode(String(node.type), from.type);
      add2("(" + op.text, 2);
      node.params.forEach(print);
      add2(")", 0, -2);
    },
    [Syntax.Access]: ({ params }, print) => {
      add2(";; unparsed", 0, 0);
      printFormatted(add2, print, { value: "access", params });
    },
    [Syntax.MemoryAssignment]: (node, print) => {
      add2("(" + String(node.type) + ".store", 2, 0);
      node.params.forEach(print);
      add2(")", 0, -2);
    },
    [Syntax.Assignment]: (node, print) => {
      const [target, ...params] = node.params;
      const scope2 = target.meta[GLOBAL_INDEX] != null ? "global" : "local";
      add2(`(set_${scope2} ${target.value}`, 2);
      if ([Syntax.ArraySubscript, Syntax.Access].includes(target.Type)) {
        print(target);
      }
      params.forEach(print);
      add2(")", 0, -2);
    },
    [Syntax.TernaryExpression]: (node, print) => {
      const [lhs, rhs, condition] = node.params;
      add2("(select", 2);
      print(lhs);
      print(rhs);
      print(condition);
      add2(")", 0, -2);
    },
    [Syntax.IfThenElse]: (node, print) => {
      const [condition, then, ...rest] = node.params;
      add2("(if", 2);
      print(condition);
      add2("(then", 2);
      print(then);
      add2(")", 0, -2);
      if (rest.length > 0) {
        add2("(else", 2);
        rest.forEach(print);
        add2(")", 0, -2);
      }
      add2(")", 0, -2);
    },
    [Syntax.ObjectLiteral]: (_, __) => {
    }
  });
  const printNode = (node) => {
    if (node == null) {
      return "";
    }
    let depth = 0;
    const offsets = [];
    const pieces = [];
    const add2 = (piece, post = 0, pre = 0) => {
      depth += pre;
      pieces.push(piece);
      offsets.push(depth + piece.length);
      depth += post;
    };
    walkNode(getPrinters(add2))(node);
    const result = pieces.reduce((acc, val, i) => {
      acc += val.padStart(offsets[i], " ") + "\n";
      return acc;
    }, "");
    return result;
  };
  const scopeOperation = curry_1((op, node) => {
    const local = node.meta[LOCAL_INDEX];
    const _global = node.meta[GLOBAL_INDEX];
    const index2 = local != null ? local : _global;
    invariant_1(index2 != null, `Undefined index for scope Operation. Possibly missing metadata. op: ${JSON.stringify(op)} node: ${printNode(node)}`);
    const kind = local != null ? op + "Local" : op + "Global";
    const params = [Number(index2)];
    return {
      kind: def[kind],
      params,
      debug: `${node.value}<${node.meta.ALIAS || node.type}>`
    };
  });
  const getType = (str) => {
    switch (str) {
      case waltSyntax_3.f32:
        return F32;
      case waltSyntax_3.f64:
        return F64;
      case waltSyntax_3.i64:
        return I64;
      case waltSyntax_3.i32:
      default:
        return I32;
    }
  };
  const isBuiltinType = (type) => {
    return typeof type === "string" && waltSyntax_3[type] != null;
  };
  const generateValueType = (node) => ({
    mutable: node.meta[TYPE_CONST] ? 0 : 1,
    type: getType(node.type)
  });
  const setInScope = scopeOperation("Set");
  const getInScope = scopeOperation("Get");
  const GLOBAL_LABEL = "global";
  function validate(ast, {
    filename
  }) {
    const metadata = ast.meta[AST_METADATA];
    if (metadata == null) {
      throw new Error("Missing AST metadata!");
    }
    const { types, functions, userTypes } = metadata;
    const problems = [];
    walkNode({
      [Syntax.Import]: (importNode, _) => {
        walkNode({
          [Syntax.BinaryExpression]: (binary, __) => {
            const [start, end] = binary.range;
            problems.push(generateErrorString("Using an 'as' import without a type.", "A type for original import " + binary.params[0].value + " is not defined nor could it be inferred.", { start, end }, filename, GLOBAL_LABEL));
          },
          [Syntax.Identifier]: (identifier, __) => {
            const [start, end] = identifier.range;
            problems.push(generateErrorString("Infered type not supplied.", "Looks like you'd like to infer a type, but it was never provided by a linker. Non-concrete types cannot be compiled.", { start, end }, filename, GLOBAL_LABEL));
          },
          [Syntax.Pair]: (pair, __) => {
            const type = pair.params[1];
            if (!isBuiltinType(type.value) && types[type.value] == null) {
              const [start, end] = type.range;
              problems.push(generateErrorString(`Undefined Type ${type.value}`, `Invalid Import. ${type.value} type does not exist`, { start, end }, filename, GLOBAL_LABEL));
            }
          }
        })(importNode);
      },
      // All of the validators below need to be implemented
      [Syntax.Struct]: (_, __) => {
      },
      [Syntax.ImmutableDeclaration]: (_, __) => {
      },
      [Syntax.Declaration]: (decl, _validator) => {
        const [start, end] = decl.range;
        if (!isBuiltinType(decl.type) && !types[decl.type] && !userTypes[decl.type]) {
          problems.push(generateErrorString(`Unknown type used in a declaration, "${String(decl.type)}"`, "Variables must be assigned with a known type.", { start, end }, filename, GLOBAL_LABEL));
        }
      },
      [Syntax.FunctionDeclaration]: (func2, __) => {
        const functionName = `${func2.value}()`;
        walkNode({
          [Syntax.Declaration]: (node, _validator) => {
            const [start, end] = node.range;
            if (!isBuiltinType(node.type) && !types[node.type] && !userTypes[node.type]) {
              problems.push(generateErrorString(`Unknown type used in a declartion, "${String(node.type)}"`, "Variables must be assigned with a known type.", { start, end }, filename, functionName));
            }
          },
          [Syntax.Assignment]: (node) => {
            const [identifier] = node.params;
            const [start, end] = node.range;
            const isConst = identifier.meta[TYPE_CONST];
            if (isConst) {
              problems.push(generateErrorString(`Cannot reassign a const variable ${identifier.value}`, "const variables cannot be reassigned, use let instead.", { start, end }, filename, functionName));
            }
          },
          [Syntax.ArraySubscript]: (node) => {
            const [target] = node.params;
            const [start, end] = node.range;
            problems.push(generateErrorString("Invalid subscript target", `Expected array type for ${target.value}, received ${target.type}`, { start, end }, filename, functionName));
          },
          [Syntax.NativeMethod]: (node, _validator) => {
            const { value } = node;
            const [offset = {}, rhs] = node.params;
            const [start, end] = node.range;
            if (!(offset.value === "unreachable" && (value.includes("store") || value.includes("load")))) {
              return;
            }
            problems.push(generateErrorString("Cannot generate property access", `Cannot assign "${rhs.value}". Key is "${offset.value}"`, { start, end }, filename, functionName));
          },
          [Syntax.ReturnStatement]: (node, validator) => {
            node.params.map(validator);
            if (func2.type == null) {
              return;
            }
            const [expression] = node.params;
            const [start] = node.range;
            const end = expression != null ? expression.range[1] : node.range[1];
            const type = node.type;
            if (typeWeight(type) !== typeWeight(func2.type)) {
              problems.push(generateErrorString("Missing return value", "Inconsistent return value. Expected " + func2.type + " received " + String(type), { start, end }, filename, functionName));
            }
          },
          [Syntax.FunctionCall]: (node, _validator) => {
            if (functions[node.value] == null) {
              const [start, end] = node.range;
              problems.push(generateErrorString("Undefined function reference", `${node.value} is not defined.`, { start, end }, filename, functionName));
            }
          },
          [Syntax.IndirectFunctionCall]: (node, _validator) => {
            const identifier = node.params[node.params.length - 1];
            const type = types[identifier.type];
            if (!isBuiltinType(identifier.type) && type == null) {
              const [start, end] = node.range;
              problems.push(generateErrorString("Cannot make an indirect call without a valid function type", `${identifier.value} has type ${String(identifier.type)} which is not defined. Indirect calls must have pre-defined types.`, { start, end }, filename, functionName));
            }
          }
        })(func2);
      }
    })(ast);
    const problemCount = problems.length;
    if (problemCount > 0) {
      const errorString = problems.reduce((acc, value) => {
        return acc + `
${value}
`;
      }, `Cannot generate WebAssembly for ${filename}. ${problemCount} problems.
`);
      throw new Error(errorString);
    }
  }
  const mergeBlock = (block, v) => {
    if (Array.isArray(v)) {
      block = [...block, ...v];
    } else {
      block.push(v);
    }
    return block;
  };
  const generateFunctionCall = (node, parent) => {
    const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
    const metaFunctionIndex = node.meta[FUNCTION_INDEX];
    block.push({
      kind: def.Call,
      params: [metaFunctionIndex],
      debug: `${node.value}<${node.type ? node.type : "void"}>`
    });
    return block;
  };
  const generateIndirectFunctionCall = (node, parent) => {
    const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
    const localIndex = node.meta[LOCAL_INDEX];
    const typeIndexMeta = node.meta[TYPE_INDEX];
    invariant_1(localIndex != null, "Undefined local index, not a valid function pointer");
    invariant_1(typeIndexMeta != null, "Variable is not of a valid function pointer type");
    return [...block, {
      kind: def.CallIndirect,
      params: [typeIndexMeta, 0]
    }];
  };
  const generateBinaryExpression = (node, parent) => {
    const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
    block.push({
      kind: opcodeFromOperator(_extends({}, node, {
        type: node.type
      })),
      params: []
    });
    return block;
  };
  const generateTernary = (node, parent) => {
    const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
    block.push({
      kind: def.Select,
      params: []
    });
    return block;
  };
  const generateIf = (node, parent) => {
    const mapper = mapSyntax(parent);
    const [condition, thenBlock, ...restParams] = node.params;
    return [
      ...[condition].map(mapper).reduce(mergeBlock, []),
      {
        kind: def.If,
        // if-then-else blocks have no return value and the Wasm spec requires us to
        // provide a literal byte '0x40' for "empty block" in these cases
        params: [64]
      },
      // after the expression is on the stack and opcode is following it we can write the
      // implicit 'then' block
      ...[thenBlock].map(mapper).reduce(mergeBlock, []),
      // followed by the optional 'else'
      ...restParams.map(mapper).reduce(mergeBlock, []),
      { kind: def.End, params: [] }
    ];
  };
  const generateFunctionPointer = (node) => {
    return [{
      kind: def.i32Const,
      params: [Number(node.value)]
    }];
  };
  const generateReturn = (node) => {
    const block = node.params.filter(Boolean).map(mapSyntax(null)).reduce(mergeBlock, []);
    block.push({ kind: def.Return, params: [] });
    return block;
  };
  const generateExpression = (node, parent) => [node].map(mapSyntax(parent)).reduce(mergeBlock, []);
  const generateDeclaration = (node, parent) => {
    const initNode = node.params[0];
    if (initNode) {
      const metaIndex = node.meta[LOCAL_INDEX];
      const type = isBuiltinType(node.type) ? node.type : waltSyntax_5;
      return [...generateExpression(_extends({}, initNode, { type }), parent), {
        kind: def.SetLocal,
        params: [metaIndex],
        debug: `${node.value}<${String(node.type)}>`
      }];
    }
    return [];
  };
  const generateAssignment = (node) => {
    const [target, value] = node.params;
    const block = [value].map(mapSyntax(null)).reduce(mergeBlock, []);
    block.push(setInScope(target));
    return block;
  };
  const generateAssignment$2 = (node) => {
    const [target, value] = node.params;
    const block = [value].map(mapSyntax(null)).reduce(mergeBlock, []);
    block.push({
      kind: def.TeeLocal,
      params: [Number(target.meta.LOCAL_INDEX)],
      debug: `${target.value}<${String(target.meta.ALIAS || target.type)}>`
    });
    return block;
  };
  const generateLoop = (node, parent) => {
    const block = [];
    const mapper = mapSyntax(parent);
    const [initializer, condition, ...body] = node.params;
    block.push.apply(block, [initializer].map(mapper).reduce(mergeBlock, []));
    block.push({ kind: def.Block, params: [64] });
    block.push({ kind: def.Loop, params: [64] });
    block.push.apply(block, [condition].map(mapper).reduce(mergeBlock, []));
    block.push({ kind: def.i32Eqz, params: [] });
    block.push({ kind: def.BrIf, params: [1] });
    block.push.apply(block, body.map(mapper).reduce(mergeBlock, []));
    block.push({ kind: def.Br, params: [0] });
    block.push({ kind: def.End, params: [] });
    block.push({ kind: def.End, params: [] });
    return block;
  };
  const generateTypecast = (node, parent) => {
    const metaTypecast = node.meta[TYPE_CAST];
    invariant_1(metaTypecast, `Cannot generate typecast for node: ${JSON.stringify(node)}`);
    const { to, from } = metaTypecast;
    const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
    return [...block, {
      kind: getTypecastOpcode(to, from),
      params: []
    }];
  };
  const generateTypecast$2 = () => {
    return [{
      kind: def.Br,
      params: [2]
    }];
  };
  function generateNoop() {
    return [];
  }
  const generateBlock = (node, parent) => {
    return node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
  };
  const generateElse = (node, parent) => {
    return [{ kind: def.Else, params: [] }, ...node.params.map(mapSyntax(parent)).reduce(mergeBlock, [])];
  };
  const generateSelect = (node, parent) => {
    const [leftHandSide, rightHandSide] = node.params;
    const selectOpcode = { kind: def.Select, params: [] };
    const condition = [leftHandSide].map(mapSyntax(parent)).reduce(mergeBlock, []);
    if (node.value === "&&") {
      return [...[rightHandSide].map(mapSyntax(parent)).reduce(mergeBlock, []), { kind: def.i32Const, params: [0] }, ...condition, selectOpcode];
    }
    return [...condition, ...[rightHandSide].map(mapSyntax(parent)).reduce(mergeBlock, []), ...condition, selectOpcode];
  };
  const alignCodes = {
    load8_s: 0,
    load8_u: 0,
    store8: 0,
    load16_s: 1,
    load16_u: 1,
    store16: 1,
    store32: 2,
    load32_s: 2,
    load32_u: 2,
    store: 2,
    load: 2
  };
  const immediates = {
    grow_memory: 0,
    current_memory: 0
  };
  const generateNative = (node, parent) => {
    const block = node.params.map(mapSyntax(parent)).reduce(mergeBlock, []);
    const operation = node.value.split(".").pop();
    if (alignCodes[operation] == null) {
      block.push({ kind: textMap[node.value], params: [immediates[node.value]] });
    } else {
      const alignment = alignCodes[operation];
      block.push({ kind: textMap[node.value], params: [alignment, 0] });
    }
    return block;
  };
  const generateConstant = (node) => {
    const kind = def[String(node.type) + "Const"];
    const value = (node.meta.SIGN || 1) * Number(node.value);
    return [{
      kind,
      params: [value]
    }];
  };
  const syntaxMap = {
    [Syntax.FunctionCall]: generateFunctionCall,
    [Syntax.IndirectFunctionCall]: generateIndirectFunctionCall,
    // Unary
    [Syntax.Constant]: generateConstant,
    [Syntax.BinaryExpression]: generateBinaryExpression,
    [Syntax.TernaryExpression]: generateTernary,
    [Syntax.IfThenElse]: generateIf,
    [Syntax.Else]: generateElse,
    [Syntax.Select]: generateSelect,
    [Syntax.Block]: generateBlock,
    [Syntax.Identifier]: getInScope,
    [Syntax.FunctionIdentifier]: getInScope,
    [Syntax.FunctionPointer]: generateFunctionPointer,
    [Syntax.ReturnStatement]: generateReturn,
    // Binary
    [Syntax.Declaration]: generateDeclaration,
    [Syntax.Assignment]: generateAssignment,
    [Syntax.AssignmentExpression]: generateAssignment$2,
    // Loops
    [Syntax.Loop]: generateLoop,
    [Syntax.Break]: generateTypecast$2,
    // Typecast
    [Syntax.TypeCast]: generateTypecast,
    [Syntax.Noop]: generateNoop,
    [Syntax.NativeMethod]: generateNative
  };
  const mapSyntax = curry_1((parent, operand) => {
    const mapping = syntaxMap[operand.Type];
    invariant_1(mapping, `Unsupported Syntax Token. ${operand.Type} "${operand.value}"`);
    return mapping(operand, parent);
  });
  const generateElement = (functionIndex) => {
    return { functionIndex };
  };
  const EXTERN_FUNCTION = 0;
  const EXTERN_TABLE = 1;
  const EXTERN_MEMORY = 2;
  const EXTERN_GLOBAL = 3;
  const externaKindMap = {
    Memory: EXTERN_MEMORY,
    Table: EXTERN_TABLE
  };
  function generateExport(node) {
    const functionIndexMeta = node.meta[FUNCTION_INDEX];
    const globalIndexMeta = node.meta[GLOBAL_INDEX];
    if (globalIndexMeta != null) {
      const kind = externaKindMap[String(node.type)] || EXTERN_GLOBAL;
      const index2 = [EXTERN_MEMORY, EXTERN_TABLE].includes(kind) ? 0 : globalIndexMeta;
      return {
        index: index2,
        kind,
        field: node.value
      };
    }
    return {
      index: functionIndexMeta,
      kind: EXTERN_FUNCTION,
      field: node.value
    };
  }
  const generateMemory = (node) => {
    const memory = { max: 0, initial: 0 };
    walkNode({
      [Syntax.Pair]: ({ params }) => {
        const [{ value: key }, { value }] = params;
        memory[key] = parseInt(value);
      }
    })(node);
    return memory;
  };
  function generateMemory$2(node) {
    const table = { max: 0, initial: 0, type: "element" };
    walkNode({
      [Syntax.Pair]: ({ params }) => {
        const [{ value: key }, { value }] = params;
        switch (key) {
          case "initial":
            table.initial = parseInt(value);
            break;
          case "element":
            table.type = value;
            break;
          case "max":
            table.max = parseInt(value);
            break;
        }
      }
    })(node);
    return table;
  }
  const generateInit = (node) => {
    const _global = generateValueType(node);
    const [initializer] = node.params;
    if (initializer != null) {
      const { value } = initializer;
      switch (_global.type) {
        case F32:
        case F64:
          _global.init = parseFloat(value);
          break;
        case I32:
        case I64:
        default:
          _global.init = parseInt(value);
      }
    }
    return _global;
  };
  const getKindConstant = (value) => {
    switch (value) {
      case "Memory":
        return EXTERN_MEMORY;
      case "Table":
        return EXTERN_TABLE;
      case "i32":
      case "f32":
      case "i64":
      case "f64":
        return EXTERN_GLOBAL;
      default:
        return EXTERN_FUNCTION;
    }
  };
  const getFieldName = (node) => {
    let name = node.value;
    if (node.meta.AS != null) {
      return node.meta.AS;
    }
    return name;
  };
  function generateImportFromNode(node) {
    const [importsNode, moduleStringLiteralNode] = node.params;
    const { value: module } = moduleStringLiteralNode;
    const imports = [];
    walkNode({
      [Syntax.Pair]: (pairNode, _) => {
        const [fieldIdentifierNode, typeOrIdentifierNode] = pairNode.params;
        const field = getFieldName(fieldIdentifierNode);
        const { value: importTypeValue } = typeOrIdentifierNode;
        const kind = getKindConstant(importTypeValue);
        const typeIndex = (() => {
          const typeIndexMeta = typeOrIdentifierNode.meta[TYPE_INDEX];
          if (typeIndexMeta) {
            return typeIndexMeta;
          }
          return null;
        })();
        const bounds = importTypeValue === "Memory" ? parseBounds(typeOrIdentifierNode) : {};
        imports.push(_extends({
          module,
          field,
          global: kind === EXTERN_GLOBAL,
          kind,
          type: stringToType[importTypeValue],
          typeIndex
        }, bounds));
      }
    })(importsNode);
    return imports;
  }
  const getType$1 = (str) => {
    switch (str) {
      case "f32":
        return F32;
      case "f64":
        return F64;
      case "i64":
        return I64;
      case "i32":
      case "Function":
      default:
        return I32;
    }
  };
  const generateImplicitFunctionType = (functionNode) => {
    const [argsNode] = functionNode.params;
    const resultType = functionNode.type ? getType$1(functionNode.type) : null;
    const params = [];
    walkNode({
      [Syntax.Pair]: (pairNode) => {
        const typeNode = pairNode.params[1];
        invariant_1(typeNode, "Undefined type in a argument expression");
        params.push(getType$1(typeNode.value));
      }
    })(argsNode);
    return {
      params,
      result: resultType,
      id: functionNode.value
    };
  };
  function generateType(node) {
    const id2 = node.value;
    invariant_1(typeof id2 === "string", `Generator: A type must have a valid string identifier, node: ${JSON.stringify(node)}`);
    const [args, result] = node.params;
    const params = [];
    walkNode({
      [Syntax.DeclType]: (t, __) => {
        params.push(getType$1(t.value));
      },
      [Syntax.Type]: (t, __) => {
        params.push(getType$1(t.value));
      },
      // Generate Identifiers as UserType pointers, so i32s
      [Syntax.Identifier]: (t, __) => {
        params.push(getType$1(t.value));
      }
    })(args);
    return {
      id: id2,
      params,
      result: result.type && result.type !== "void" ? getType$1(result.type) : null
    };
  }
  function generateData(statics, DATA_SECTION_HEADER_SIZE2) {
    let offsetAccumulator = DATA_SECTION_HEADER_SIZE2;
    const map2 = {};
    const data = Object.entries(statics).reduce((acc, [key, encoded]) => {
      acc.push({ offset: Number(offsetAccumulator), data: encoded });
      map2[key] = offsetAccumulator;
      offsetAccumulator += encoded.size;
      return acc;
    }, []);
    const lengthStream = new OutputStream();
    lengthStream.push(index_12, offsetAccumulator, String(offsetAccumulator));
    return {
      data: [{ offset: 0, data: lengthStream }, ...data],
      map: map2
    };
  }
  const DATA_SECTION_HEADER_SIZE = 4;
  const generateCode = (func2) => {
    const [argsNode, resultNode, ...body] = func2.params;
    const metadata = func2.meta[FUNCTION_METADATA];
    invariant_1(body, "Cannot generate code for function without body");
    invariant_1(metadata, "Cannot generate code for function without metadata");
    const { locals, argumentsCount } = metadata;
    const block = {
      code: [],
      // On this Episode of ECMAScript Spec: Object own keys traversal!
      // Sometimes it pays to know the spec. Keys are traversed in the order
      // they are added to the object. This includes Object.keys. Because the AST is traversed
      // depth-first we can guarantee that arguments will also be added first
      // to the locals object. We can depend on the spec providing the keys,
      // such that we can slice away the number of arguments and get DECLARED locals _only_.
      locals: Object.keys(locals).slice(argumentsCount).map((key) => generateValueType(locals[key])),
      debug: `Function ${func2.value}`
    };
    block.code = body.map(mapSyntax(block)).reduce(mergeBlock, []);
    return block;
  };
  function generator(ast, config) {
    const program = {
      Version: config.version,
      Types: [],
      Start: [],
      Element: [],
      Code: [],
      Exports: [],
      Imports: [],
      Globals: [],
      Functions: [],
      Memory: [],
      Table: [],
      Artifacts: [],
      Data: [],
      Name: {
        module: config.filename,
        functions: [],
        locals: []
      }
    };
    let { statics } = ast.meta[AST_METADATA];
    if (config.linker != null) {
      statics = _extends({}, config.linker.statics, statics);
    }
    const { map: staticsMap, data } = generateData(statics, DATA_SECTION_HEADER_SIZE);
    if (Object.keys(statics).length > 0) {
      program.Data = data;
    }
    const findTypeIndex = (functionNode) => {
      const search = generateImplicitFunctionType(functionNode);
      return program.Types.findIndex((t) => {
        const paramsMatch = t.params.length === search.params.length && t.params.reduce((a, v, i) => a && v === search.params[i], true);
        const resultMatch = t.result === search.result;
        return paramsMatch && resultMatch;
      });
    };
    const findTableIndex = (functionIndex) => program.Element.findIndex((n) => n.functionIndex === functionIndex);
    const typeMap = {};
    const astWithTypes = mapNode_2({
      [Syntax.Typedef]: (node, _ignore) => {
        let typeIndex = program.Types.findIndex(({ id: id2 }) => id2 === node.value);
        let typeNode = program.Types[typeIndex];
        if (typeNode == null) {
          typeIndex = program.Types.length;
          program.Types.push(generateType(node));
        }
        typeNode = _extends({}, node, {
          meta: _extends({}, node.meta, { [TYPE_INDEX]: typeIndex })
        });
        typeMap[node.value] = { typeIndex, typeNode };
        return typeNode;
      }
    })(mapNode_2({
      [Syntax.Import]: (node, _) => node,
      [Syntax.StringLiteral]: (node, _ignore) => {
        const { value } = node;
        if (staticsMap[value] == null) {
          return node;
        }
        return _extends({}, node, {
          value: String(staticsMap[value]),
          Type: Syntax.Constant
        });
      },
      [Syntax.StaticValueList]: (node) => {
        const { value } = node;
        return _extends({}, node, {
          value: String(staticsMap[value]),
          Type: Syntax.Constant
        });
      }
    })(ast));
    const nodeMap = {
      [Syntax.Typedef]: (_, __) => _,
      [Syntax.Export]: (node) => {
        const [nodeToExport] = node.params;
        program.Exports.push(generateExport(nodeToExport));
      },
      [Syntax.ImmutableDeclaration]: (node) => {
        switch (node.type) {
          case "Memory":
            program.Memory.push(generateMemory(node));
            break;
          case "Table":
            program.Table.push(generateMemory$2(node));
            break;
        }
      },
      [Syntax.Declaration]: (node) => {
        const globalMeta = node.meta[GLOBAL_INDEX];
        if (globalMeta != null) {
          program.Globals.push(generateInit(node));
        }
      },
      [Syntax.Import]: (node) => {
        program.Imports.push(...generateImportFromNode(node));
      },
      [Syntax.FunctionDeclaration]: (node) => {
        const typeIndex = (() => {
          const index3 = findTypeIndex(node);
          if (index3 === -1) {
            program.Types.push(generateImplicitFunctionType(node));
            return program.Types.length - 1;
          }
          return index3;
        })();
        const patched = mapNode_2({
          FunctionPointer(pointer) {
            const metaFunctionIndex = pointer.meta[FUNCTION_INDEX];
            const functionIndex = metaFunctionIndex;
            let tableIndex = findTableIndex(functionIndex);
            if (tableIndex < 0) {
              tableIndex = program.Element.length;
              program.Element.push(generateElement(functionIndex));
            }
            return pointer;
          }
        })(node);
        const index2 = node.meta[FUNCTION_INDEX];
        invariant_1(index2 != null, "Function index must be set");
        program.Functions[index2] = typeIndex;
        program.Code[index2] = generateCode(patched);
        if (patched.value === "start") {
          program.Start.push(index2);
        }
        if (config.encodeNames) {
          program.Name.functions.push({
            index: index2,
            name: node.value
          });
          const functionMetadata = node.meta[FUNCTION_METADATA];
          if (functionMetadata != null && Object.keys(functionMetadata.locals).length) {
            program.Name.locals[index2] = {
              index: index2,
              locals: Object.entries(functionMetadata.locals).map(([name, local]) => {
                return {
                  name,
                  index: Number(local.meta["local/index"])
                };
              })
            };
          }
        }
      }
    };
    walkNode(nodeMap)(astWithTypes);
    program.Code = program.Code.filter(Boolean);
    return program;
  }
  const VERSION_1 = 1;
  const MAGIC = 1836278016;
  function write(version) {
    return new OutputStream().push(index_12, MAGIC, "\\0asm").push(index_12, version, `version ${version}`);
  }
  const varuint7 = "varuint7";
  const varuint32 = "varuint32";
  const varint7 = "varint7";
  const varint1 = "varint1";
  const varint32 = "varint32";
  const varint64 = "varint64";
  function emitString(stream, string, debug) {
    stream.push(varuint32, string.length, debug);
    for (let i = 0; i < string.length; i++) {
      stream.push(index_9, string.charCodeAt(i), string[i]);
    }
    return stream;
  }
  const emit$1 = (entries) => {
    const payload = new OutputStream().push(varuint32, entries.length, "entry count");
    entries.forEach((entry) => {
      emitString(payload, entry.module, "module");
      emitString(payload, entry.field, "field");
      switch (entry.kind) {
        case EXTERN_GLOBAL: {
          payload.push(index_9, EXTERN_GLOBAL, "Global");
          payload.push(index_9, entry.type, getTypeString(entry.type));
          payload.push(index_9, 0, "immutable");
          break;
        }
        case EXTERN_FUNCTION: {
          payload.push(index_9, entry.kind, "Function");
          payload.push(varuint32, entry.typeIndex, "type index");
          break;
        }
        case EXTERN_TABLE: {
          payload.push(index_9, entry.kind, "Table");
          payload.push(index_9, ANYFUNC, "function table types");
          payload.push(varint1, 0, "has max value");
          payload.push(varuint32, 0, "iniital table size");
          break;
        }
        case EXTERN_MEMORY: {
          payload.push(index_9, entry.kind, "Memory");
          payload.push(varint1, !!entry.max, "has no max");
          payload.push(varuint32, entry.initial, "initial memory size(PAGES)");
          if (entry.max) {
            payload.push(varuint32, entry.max, "max memory size(PAGES)");
          }
          break;
        }
      }
    });
    return payload;
  };
  const emit$2 = (exports3) => {
    const payload = new OutputStream();
    payload.push(varuint32, exports3.length, "count");
    exports3.forEach(({ field, kind, index: index2 }) => {
      emitString(payload, field, "field");
      payload.push(index_9, kind, "Global");
      payload.push(varuint32, index2, "index");
    });
    return payload;
  };
  const encode2 = (payload, { type, init, mutable }) => {
    payload.push(index_9, type, getTypeString(type));
    payload.push(index_9, mutable, "mutable");
    switch (type) {
      case I32:
        payload.push(index_9, def.i32Const.code, def.i32Const.text);
        payload.push(varint32, init, `value (${init})`);
        break;
      case F32:
        payload.push(index_9, def.f32Const.code, def.f32Const.text);
        payload.push(index_3, init, `value (${init})`);
        break;
      case F64:
        payload.push(index_9, def.f64Const.code, def.f64Const.text);
        payload.push(index_4, init, `value (${init})`);
        break;
      case I64:
        payload.push(index_9, def.i64Const.code, def.i64Const.text);
        payload.push(varint64, init, `value (${init})`);
    }
    payload.push(index_9, def.End.code, "end");
  };
  const emit$3 = (globals) => {
    const payload = new OutputStream();
    payload.push(varuint32, globals.length, "count");
    globals.forEach((g) => encode2(payload, g));
    return payload;
  };
  const emit$4 = (functions) => {
    functions = functions.filter((func2) => func2 !== null);
    const stream = new OutputStream();
    stream.push(varuint32, functions.length, "count");
    functions.forEach((index2) => stream.push(varuint32, index2, "type index"));
    return stream;
  };
  function emitTables(start) {
    const stream = new OutputStream();
    stream.push(varuint32, start[0], "start function");
    return stream;
  }
  const emitElement = (stream) => ({ functionIndex }, index2) => {
    stream.push(varuint32, 0, "table index");
    stream.push(index_9, def.i32Const.code, "offset");
    stream.push(varuint32, index2, index2.toString());
    stream.push(index_9, def.End.code, "end");
    stream.push(varuint32, 1, "number of elements");
    stream.push(varuint32, functionIndex, "function index");
  };
  const emit$5 = (elements) => {
    const stream = new OutputStream();
    stream.push(varuint32, elements.length, "count");
    elements.forEach(emitElement(stream));
    return stream;
  };
  const emitType = (stream, { params, result }, index2) => {
    stream.push(varint7, FUNC, `func type (${index2})`);
    stream.push(varuint32, params.length, "parameter count");
    params.forEach((type) => stream.push(varint7, type, "param"));
    if (result) {
      stream.push(varint1, 1, "result count");
      stream.push(varint7, result, `result type ${getTypeString(result)}`);
    } else {
      stream.push(varint1, 0, "result count");
    }
  };
  const emit$6 = (types) => {
    const stream = new OutputStream();
    stream.push(varuint32, types.length, "count");
    types.forEach((type, index2) => emitType(stream, type, index2));
    return stream;
  };
  const emitLocal = (stream, local) => {
    stream.push(varuint32, 1, "number of locals of following type");
    stream.push(varint7, local.type, `${getTypeString(local.type)}`);
  };
  const emitFunctionBody = (stream, { locals, code, debug: functionName }) => {
    const body = new OutputStream();
    code.forEach(({ kind, params, debug }) => {
      invariant_1(typeof kind !== "undefined", `Fatal error! Generated undefined opcode. debug code: ${JSON.stringify(debug)}`);
      body.push(index_9, kind.code, `${kind.text}  ${debug ? debug : ""}`);
      params.filter((p) => typeof p !== "undefined").forEach((p) => {
        let type = varuint32;
        let stringType = "i32.literal";
        if (kind.code >= 40 && kind.code <= 64) {
          type = varuint32;
          stringType = "memory_immediate";
        } else {
          switch (kind.result) {
            case index_4:
              type = index_4;
              stringType = "f64.literal";
              break;
            case index_3:
              type = index_3;
              stringType = "f32.literal";
              break;
            case index_1:
              type = varint32;
              stringType = "i32.literal";
              break;
            case index_2:
              type = varint64;
              stringType = "i64.literal";
              break;
            default:
              type = varuint32;
          }
        }
        body.push(type, p, `${stringType}`);
      });
    });
    const localsStream = new OutputStream();
    locals.forEach((local) => emitLocal(localsStream, local));
    stream.push(varuint32, body.size + localsStream.size + 2, functionName);
    stream.push(varuint32, locals.length, "locals count");
    stream.write(localsStream);
    stream.write(body);
    stream.push(index_9, def.End.code, "end");
  };
  const emit$7 = (functions) => {
    const stream = new OutputStream();
    stream.push(varuint32, functions.length, "function count");
    functions.forEach((func2) => emitFunctionBody(stream, func2));
    return stream;
  };
  const emitEntry = (payload, entry) => {
    payload.push(varint1, entry.max ? 1 : 0, "has no max");
    payload.push(varuint32, entry.initial, "initial memory size(PAGES)");
    if (entry.max) {
      payload.push(varuint32, entry.max, "max memory size(PAGES)");
    }
  };
  const emit$8 = (memories) => {
    const stream = new OutputStream();
    stream.push(varuint32, memories.length, "count");
    memories.forEach((entry) => emitEntry(stream, entry));
    return stream;
  };
  const typeBytecodes = {
    anyfunc: 112
  };
  const emitEntry$1 = (payload, entry) => {
    payload.push(varint7, typeBytecodes[entry.type], entry.type);
    payload.push(varint1, entry.max ? 1 : 0, "has max");
    payload.push(varuint32, entry.initial, "initial table size");
    if (entry.max) {
      payload.push(varuint32, entry.max, "max table size");
    }
  };
  function emitTables$1(tables) {
    const stream = new OutputStream();
    stream.push(varuint32, tables.length, "count");
    tables.forEach((entry) => emitEntry$1(stream, entry));
    return stream;
  }
  const emitDataSegment = (stream, segment) => {
    stream.push(varuint32, 0, "memory index");
    const { offset, data } = segment;
    stream.push(index_9, def.i32Const.code, def.i32Const.text);
    stream.push(varint32, offset, `segment offset (${offset})`);
    stream.push(index_9, def.End.code, "end");
    stream.push(varuint32, data.size, "segment size");
    stream.write(data);
  };
  function emit$9(dataSection) {
    const stream = new OutputStream();
    stream.push(varuint32, dataSection.length, "entries");
    for (let i = 0, len = dataSection.length; i < len; i++) {
      const segment = dataSection[i];
      emitDataSegment(stream, segment);
    }
    return stream;
  }
  const emitModuleName = (name) => {
    const moduleSubsection = new OutputStream();
    emitString(moduleSubsection, name, `name_len: ${name}`);
    return moduleSubsection;
  };
  const emitFunctionNames = (names) => {
    const stream = new OutputStream();
    stream.push(varuint32, names.length, `count: ${String(names.length)}`);
    names.forEach(({ index: index2, name }) => {
      stream.push(varuint32, index2, `index: ${String(index2)}`);
      emitString(stream, name, `name_len: ${name}`);
    });
    return stream;
  };
  const emitLocals = (localsMap) => {
    const stream = new OutputStream();
    stream.push(varuint32, localsMap.length, `count: ${String(localsMap.length)}`);
    localsMap.forEach(({ index: funIndex, locals }) => {
      stream.push(varuint32, funIndex, `function index: ${String(funIndex)}`);
      stream.push(varuint32, locals.length, `number of params and locals ${locals.length}`);
      locals.forEach(({ index: index2, name }) => {
        stream.push(varuint32, index2, `index: ${String(index2)}`);
        emitString(stream, name, `name_len: ${name}`);
      });
    });
    return stream;
  };
  const emit$10 = (nameSection) => {
    const stream = new OutputStream();
    emitString(stream, "name", "name_len: name");
    const moduleSubsection = emitModuleName(nameSection.module);
    stream.push(varuint7, 0, "name_type: Module");
    stream.push(varuint32, moduleSubsection.size, "name_payload_len");
    stream.write(moduleSubsection);
    const functionSubsection = emitFunctionNames(nameSection.functions);
    stream.push(varuint7, 1, "name_type: Function");
    stream.push(varuint32, functionSubsection.size, "name_payload_len");
    stream.write(functionSubsection);
    const localsSubsection = emitLocals(nameSection.locals);
    stream.push(varuint7, 2, "name_type: Locals");
    stream.push(varuint32, localsSubsection.size, "name_payload_len");
    stream.write(localsSubsection);
    return stream;
  };
  const SECTION_TYPE = 1;
  const SECTION_IMPORT = 2;
  const SECTION_FUNCTION = 3;
  const SECTION_TABLE = 4;
  const SECTION_MEMORY = 5;
  const SECTION_GLOBAL = 6;
  const SECTION_EXPORT = 7;
  const SECTION_START = 8;
  const SECTION_ELEMENT = 9;
  const SECTION_CODE = 10;
  const SECTION_DATA = 11;
  const SECTION_NAME = 0;
  const writer = ({
    type,
    label,
    emitter
  }) => (ast) => {
    const field = ast[label];
    if (!field || Array.isArray(field) && !field.length) {
      return null;
    }
    const stream = new OutputStream().push(index_9, type, label + " section");
    const entries = emitter(field);
    stream.push(varuint32, entries.size, "size");
    stream.write(entries);
    return stream;
  };
  var section = {
    type: writer({ type: SECTION_TYPE, label: "Types", emitter: emit$6 }),
    imports: writer({ type: SECTION_IMPORT, label: "Imports", emitter: emit$1 }),
    function: writer({
      type: SECTION_FUNCTION,
      label: "Functions",
      emitter: emit$4
    }),
    table: writer({ type: SECTION_TABLE, label: "Table", emitter: emitTables$1 }),
    memory: writer({ type: SECTION_MEMORY, label: "Memory", emitter: emit$8 }),
    exports: writer({
      type: SECTION_EXPORT,
      label: "Exports",
      emitter: emit$2
    }),
    globals: writer({ type: SECTION_GLOBAL, label: "Globals", emitter: emit$3 }),
    start: writer({ type: SECTION_START, label: "Start", emitter: emitTables }),
    element: writer({
      type: SECTION_ELEMENT,
      label: "Element",
      emitter: emit$5
    }),
    code: writer({ type: SECTION_CODE, label: "Code", emitter: emit$7 }),
    data: writer({ type: SECTION_DATA, label: "Data", emitter: emit$9 }),
    name: writer({ type: SECTION_NAME, label: "Name", emitter: emit$10 })
  };
  function emit(program, config) {
    const stream = new OutputStream();
    const result = stream.write(write(program.Version)).write(section.type(program)).write(section.imports(program)).write(section.function(program)).write(section.table(program)).write(section.memory(program)).write(section.globals(program)).write(section.exports(program)).write(section.start(program)).write(section.element(program)).write(section.code(program)).write(section.data(program));
    if (config.encodeNames) {
      return result.write(section.name(program));
    }
    return result;
  }
  const _debug = (stream, begin = 0, end) => {
    let pc = 0;
    return stream.data.slice(begin, end).map(({ type, value, debug }) => {
      const pcString = `${pc.toString()} 0x${pc.toString(16)}`.padStart(6, " ").padEnd(stream.data.length.toString().length + 1);
      let valueString;
      if (Array.isArray(value)) {
        valueString = value.map((v) => v.toString(16)).join().padStart(16);
      } else {
        valueString = value.toString(16).padStart(16);
      }
      const out = `${pcString}: ${valueString} ; ${debug}`;
      pc += index_16[type] || value.length;
      return out;
    }).join("\n") + "\n ============ fin =============";
  };
  const makeFragment = (parser) => {
    const parse = (src) => {
      try {
        return parser(`function fragment() {
        ${src}
      }`).params[0].params[2].params[0];
      } catch (e) {
        throw new Error(`PANIC - Invalid fragment input:

${src}

Parse Error: ${e.stack}`);
      }
    };
    return (template, ...replacements) => {
      let expandNodes = false;
      const source = template.reduce((a, v, i) => {
        const rep = replacements[i];
        if (rep != null && typeof rep !== "object") {
          return a += v + String(rep);
        }
        if (rep != null) {
          expandNodes = true;
          return a += v + `$$rep_${i}`;
        }
        return a += v;
      }, "");
      const node = parse(source);
      if (expandNodes) {
        return mapNode_2({
          Identifier(id2) {
            const { value: name } = id2;
            if (!name.indexOf("$$rep_")) {
              return replacements[Number(name.replace("$$rep_", ""))];
            }
            return id2;
          }
        })(node);
      }
      return node;
    };
  };
  const VERSION2 = "0.21.0";
  const getIR = (source, config) => {
    const {
      version = VERSION_1,
      encodeNames = false,
      lines = source.split("\n"),
      filename = "unknown",
      extensions = []
    } = config || {};
    const parser = makeParser([]);
    const stmt = makeFragment(parser);
    const options = {
      version,
      encodeNames,
      lines,
      filename,
      extensions
    };
    const ast = parser(source);
    const semanticAST = semantics(ast, [], _extends({}, options, { parser, stmt }));
    validate(semanticAST, { lines, filename });
    const intermediateCode = generator(semanticAST, options);
    const wasm = emit(intermediateCode, {
      version,
      encodeNames,
      filename,
      lines
    });
    return wasm;
  };
  const compile3 = (source, config) => {
    const {
      filename = "unknown.walt",
      extensions = [],
      linker,
      encodeNames = false
    } = config || {};
    const options = {
      filename,
      lines: source.split("\n"),
      version: VERSION_1,
      encodeNames
    };
    const plugins2 = extensions.reduce((acc, plugin) => {
      const instance = _extends({
        semantics: (_) => ({}),
        grammar: () => ({ ParserRules: [] })
      }, plugin(options));
      acc.grammar.push(instance.grammar);
      acc.semantics.push(instance.semantics);
      return acc;
    }, {
      grammar: [],
      semantics: []
    });
    const parser = makeParser(plugins2.grammar);
    const stmt = makeFragment(parser);
    const ast = parser(source);
    const semanticAST = semantics(ast, plugins2.semantics, {
      parser,
      stmt
    });
    validate(semanticAST, options);
    const intermediateCode = generator(semanticAST, _extends({}, options, { linker }));
    const wasm = emit(intermediateCode, options);
    return {
      wasm,
      buffer() {
        return wasm.buffer();
      },
      ast,
      semanticAST
    };
  };
  exports2.makeParser = makeParser;
  exports2.makeFragment = makeFragment;
  exports2.semantics = semantics;
  exports2.validate = validate;
  exports2.generator = generator;
  exports2.emitter = emit;
  exports2.prettyPrintNode = printNode;
  exports2.debug = _debug;
  exports2.stringEncoder = stringEncoder;
  exports2.stringDecoder = stringDecoder;
  exports2.walkNode = walkNode;
  exports2.mapNode = mapNode_2;
  exports2.VERSION = VERSION2;
  exports2.getIR = getIR;
  exports2.compile = compile3;
  return exports2;
}({});
var walt_default = Walt;

// plugins/walt/index.js
var compile = (source) => walt_default.compile(source).buffer();
var compileWalt = (source) => source.trim().length ? JSON.stringify([...new Uint8Array(walt_default.compile(source).buffer())]) : "[]";
var bindThis = (_this) => {
  const result = {};
  Object.getOwnPropertyNames(Object.getPrototypeOf(_this)).filter((n) => ![
    "constructor",
    "nanoapp",
    "initial_state",
    "initial_component",
    "css",
    "__walt",
    "__src",
    "init"
  ].includes(n)).map((fn) => result[fn] = _this[fn].bind(_this));
  return result;
};
var initWalt = (source, _this) => {
  if (source.length) {
    const table = new WebAssembly.Table({
      initial: 10,
      element: "anyfunc"
    });
    const exports2 = new WebAssembly.Instance(
      new WebAssembly.Module(new Uint8Array(source).buffer),
      {
        tag: bindThis(_this),
        console,
        // global javascript console
        javascript: {
          table,
          setTimeout: (callback, interval) => window.setTimeout(table.get(callback), interval),
          setInterval
        }
      }
    ).exports;
    const result = {};
    Object.keys(exports2).map((fn) => result[fn] = exports2[fn]);
    return result;
  }
  return {};
};
var walt_default2 = {
  name: "Walt",
  uniqueBlock: "walt",
  compileWalt,
  compile,
  initWalt
};

// plugins/min.css/min.css.js
function mincss(css) {
  return css;
  function hue2rgb(m1, m2, hue) {
    var v;
    if (hue < 0)
      hue += 1;
    else if (hue > 1)
      hue -= 1;
    if (6 * hue < 1)
      v = m1 + (m2 - m1) * hue * 6;
    else if (2 * hue < 1)
      v = m2;
    else if (3 * hue < 2)
      v = m1 + (m2 - m1) * (2 / 3 - hue) * 6;
    else
      v = m1;
    return 255 * v;
  }
  function hsl2rgb(h, s, l) {
    var m1, m2, hue, r, g, b, M = Math;
    s /= 100;
    l /= 100;
    if (!s)
      r = g = b = l * 255;
    else {
      if (l <= 0.5)
        m2 = l * (s + 1);
      else
        m2 = l + s - l * s;
      m1 = l * 2 - m2;
      hue = h / 360;
      r = M.ceil(hue2rgb(m1, m2, hue + 1 / 3));
      g = M.ceil(hue2rgb(m1, m2, hue));
      b = M.ceil(hue2rgb(m1, m2, hue - 1 / 3));
    }
    return {
      r,
      g,
      b
    };
  }
  function rgb2hex(r, g, b) {
    return "#" + ((1 << 24) + (1 * r << 16) + (1 * g << 8) + 1 * b).toString(16).slice(1);
  }
  var whiteSpacePlaceHolder = "|_|";
  return String(css).replace(/(:not\(.*?\))\s+(?!{)/g, "$1" + whiteSpacePlaceHolder).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\s+/g, " ").replace(/^\s+/g, "").replace(/ \{/g, "{").replace(/\;\}/g, "}").replace(/ ([+~>]) /g, "$1").replace(/([\: ,\(\)\\/])(\-*0+)(%|px|pt|pc|rem|em|ex|cm|mm|in)([, ;\(\)}\/]*?)/g, "$10$4").replace(/([: ,=\-\(\{\}])0+\.(\d)/g, "$1.$2").replace(/([^\}]*\{\s*?\})/g, "").replace(/(\*)([.:\[])/g, "$2").replace(/(\[)([^"' \]]+)(["'])([^"' \]]+)(\3)(\])/g, "$1$2$4$6").replace(/(?:{)([^{}]+?)(?:})/g, function(m, s) {
    var url = [], r = [];
    s = s.replace(/(url\s*\([^)]*\))/g, function(m2) {
      url.push(m2);
      return "$" + (url.length - 1) + "$";
    });
    s = s.match(/([a-z\-]+)\:(.+?)(;|$)/gi);
    for (var i = 0; i < s.length; i++) {
      s[i] = /([a-z\-]+)\:(.+?)(;|$)/i.exec(s[i]);
      if (s[i])
        s[i][2] = s[i][2].replace(/\$([0-9]+)\$/g, function(m2, k) {
          return url[k] || "";
        });
    }
    m = {};
    for (var i = 0; i < s.length; i++) {
      if (s[i]) {
        if (s[i][1] == "background" || s[i][1] == "background-image") {
          r.push(s[i][1] + ":" + s[i][2]);
          continue;
        }
        m[s[i][1]] = s[i][2];
      }
    }
    for (var i in m)
      r.push(i + ":" + m[i]);
    return "{" + r.join(";") + "}";
  }).replace(/ (\!important)/g, "$1").replace(/\:(\:before|\:after)/g, "$1").replace(/(rgb|rgba|hsl|hsla)\s*\(\s*(\d+)[, %]+(\d+)[, %]+(\d+)[, %]+?([0-1]?)\s*\)/g, function(m, t, v1, v2, v3, v4) {
    if (v4 === "0")
      return " transparent ";
    t = t.toLowerCase();
    if (!t.indexOf("hsl")) {
      var o = hsl2rgb(v1, v2, v3);
      v1 = o.r;
      v2 = o.g;
      v3 = o.b;
    }
    return rgb2hex(v1, v2, v3);
  }).replace(/([,: \(]#)([0-9a-f])\2([0-9a-f])\3([0-9a-f])\4/gi, "$1$2$3$4").replace(/ ?([\(\)\{\}\:\;\,]) /g, "$1").replace(/(margin|padding|border-width|border-color|border-style)\:([^;}]+)/gi, function(m, k, v) {
    function chk() {
      var a = arguments, o2 = a.length > 1 ? a : a.length == 1 ? a[0] : [];
      for (var i = 0; i < o2.length; i++) {
        if (i == 0)
          continue;
        if (o2[i] != o2[i - 1])
          return false;
      }
      return true;
    }
    var o = v.toLowerCase().split(" ");
    var r = v;
    if (chk(o))
      r = o[0];
    else if (o.length == 4 && chk(o[0], o[2]) && chk(o[1], o[3]) || o.length == 3 && chk(o[0], o[2]))
      r = o[0] + " " + o[1];
    else if (o.length == 4 && chk(o[1], o[3]))
      r = o[0] + " " + o[1] + " " + o[2];
    r = k + ":" + r;
    return r;
  }).replace(/\:\s*calc\(([^;}]+)/g, function($0) {
    return $0.replace(/\s+/g, "").replace(/([-+*/]+)/g, " $1 ").replace(/(--)\s/g, "$1");
  }).replace(/\|_\|/g, " ");
}
var min_css_default = mincss;

// plugins/min.css/index.js
var min_default = {
  name: "min.css",
  processStyle: min_css_default
};

// src/plugins.js
var plugins = {
  walt: walt_default2,
  mincss: min_default
};
var plugins_default = plugins;

// src/runtime/baseClass.js
var baseClassMixin = (superclass) => class baseClass extends superclass {
  baseInit() {
    this.component = this.initial_component;
    toProto(this.component);
    this.animate = TinyAnimate_default.animate;
    this.Spring = Spring;
    this.window_events = {};
    this.checkStateObjectChanges = {};
    this.state = this.initial_state;
    if (this.__walt) {
      this.walt = plugins_default.walt.initWalt(this.__walt, this, this.state);
    }
    delete this.__proto__.baseInit;
  }
  async connectedCallback() {
    if (this.renderer && !this.__rendererHTML && this.__rendererName !== this.parent.__rendererName) {
      throw `ui.js diffferent renderers ${this.__rendererName} and ${this.parent.__rendererName}`;
    }
    Enter_Children(this.document, this.component, { state: this.state });
    this.is_connected = true;
    if (this.connected)
      this.connected();
  }
  async disconnectedCallback() {
    this.disconnected && await this.disconnected();
    Object.keys(this.window_events).forEach(
      (event) => this.window_events[event].forEach(
        (callback) => window.removeEventListener(event, callback.cb)
      )
    );
  }
  render() {
    if (this.is_connected)
      UPDATE_Chidldren(this.document, this.component, { state: this.state });
  }
  attributeChangedCallback(key, old, value) {
    if (typeof value === "object") {
      if (Array.isArray(this.state[key]) && Array.isArray(value) && this.state[key].length == 0 && value.length == 0)
        return;
      if (this.checkStateObjectChanges[key] && JSON.stringify(this.state[key]) === JSON.stringify(value)) {
        return;
      }
    } else if (this.state[key] === value)
      return;
    this.state[key] = value;
    this.changed && this.changed({ [key]: value });
    this.render();
  }
  //--------------------------------
  //  SUGAR :)
  hasEventHandler(event) {
    if (!this._events)
      return !!this.getAttribute("on" + event);
    return !!this._events[event];
  }
  get cookies() {
    return typeof document !== "undefined" ? Object.assign(
      {},
      ...document.cookie.split(";").filter((s) => s).map((cookie) => cookie.split("=")).map(([key, value]) => ({ [key.trim()]: (value + "").trim() }))
    ) : {};
  }
  get hash() {
    return typeof window !== "undefined" ? window.location.hash.substr(1).split("/") : [];
  }
  //--------------------------------
  on(event, callback, options) {
    if (!this.window_events[event])
      this.window_events[event] = [];
    const found = this.window_events[event].find((x) => x.callback === callback);
    const cb = (...args) => callback.call(this, ...args);
    if (!found) {
      this.window_events[event].push({ callback, cb });
      window.addEventListener(event, cb, options);
    }
  }
  off(event, callback) {
    if (!this.window_events[event])
      return;
    const index = this.window_events[event].findIndex((x) => x.callback === callback);
    if (index !== -1) {
      window.removeEventListener(event, this.window_events[event][index].cb);
      this.window_events[event].splice(index, 1);
    }
  }
};

// src/runtime/htmlClass.js
var htmlClassMixin = (superclass) => class baseClass extends superclass {
  htmlInit() {
    this.animateCSS = (property, { element, unit, from, to, duration, easing, done }) => {
      element._styles[property] = TinyAnimate_default.animateCSS(element || this, property, unit === void 0 ? "" : unit, from || 0, to, duration || 1e3, easing, () => {
        element._styleV[property] = to + unit;
        if (done)
          done();
      });
    };
    if (this.css.length) {
      const style = document.createElement("style");
      style.textContent = this.css;
      if (!this.ShadowDOM)
        setTimeout(() => {
          this.document.append(style);
        }, 0);
      else
        this.document.append(style);
    }
    delete this.__proto__.htmlInit;
  }
  setAttribute(key, value) {
    this.attributeChangedCallback(key, void 0, value);
    if (this.AddAttributes && typeof value !== "object")
      super.setAttribute(key, value);
  }
  //------------------------------------------------------------------------------
  //  SUGAR :)
  $(selector) {
    return this.document.querySelector(selector);
  }
  $$(selector) {
    return this.document.querySelectorAll(selector);
  }
  // -----------------------------------------------------------------------------
  emitNative(event, payload) {
    console.warn(`this.emitNative() is deprecated. Use this.emit(). "${this.__src}"`);
    this.emit(event, payload);
  }
  emit(event, payload) {
    this.dispatchEvent(new CustomEvent(event, {
      cancelable: false,
      bubbles: false,
      detail: payload
    }));
  }
};

// src/runtime/customElement.js
var customElement;
if (typeof window !== "undefined") {
  class _customElement extends HTMLElement {
    constructor() {
      super();
      this.AddAttributes = false;
      this.ShadowDOM = "open";
      this.MutationObserverOptions = { childList: true };
      this.baseInit();
      this.init && this.init();
      this.document = ["open", "closed"].includes(this.ShadowDOM) ? this.attachShadow({ mode: this.ShadowDOM }) : this;
      this.htmlInit();
      if (this.slotChange) {
        this._slot_observer = new MutationObserver((mut) => this.slotChange(mut));
        this._slot_observer.observe(this, this.MutationObserverOptions);
      }
    }
    //------------------------------------------------------------------------------
    //  SUGAR :)
    get slotted() {
      const slot = this.document.querySelector("slot");
      return slot ? slot.assignedElements() : [];
    }
    get element() {
      return this.ShadowDOM ? this.document.host : this.document;
    }
  }
  customElement = class extends htmlClassMixin(baseClassMixin(_customElement)) {
  };
}

// src/runtime/uiElement.js
var _uiElement = class {
  constructor() {
    this.document = document.querySelector(this.container);
    if (!this.document)
      throw `i.js: target container "${this.container}" not found`;
    this.baseInit();
    this.htmlInit();
    this.init && this.init();
    this.connectedCallback();
  }
  //------------------------------------------------------------------------------
  //  SUGAR :)
  get element() {
    return this.document;
  }
};
var uiElement = class extends htmlClassMixin(baseClassMixin(_uiElement)) {
};

// src/runtime/baseElement.js
var _baseElement = class {
  constructor(parent, tag) {
    this._BASE_ELEMENT = true;
    this.document = {
      _childNodes: [],
      __rendererName: this.__rendererName
    };
    this._childNodes = [];
    this._eventListeners = {};
    this.parent = parent;
    this.baseInit();
    if (this.renderer && !this.__rendererHTML && this.__rendererName !== this.parent.__rendererName) {
      throw `ui.js diffferent renderers ${this.__rendererName} and ${this.parent.__rendererName}`;
    }
    this.onReady = new Promise(async (Ready) => {
      var _a, _b, _c;
      if ((_a = this.renderer) == null ? void 0 : _a.onReady)
        await this.renderer.onReady;
      if ((_b = this.parent) == null ? void 0 : _b.onReady)
        await this.parent.onReady;
      if ((_c = this.renderer) == null ? void 0 : _c.onConnect)
        await this.renderer.onConnect(this);
      this.document.renderer = this.renderer;
      this.document.parent = this.document;
      this.init && await this.init();
      Enter_Children(this.document, this.component, { state: this.state });
      Ready();
      this.is_connected = true;
      if (this.connected)
        await this.connected();
    });
  }
  setAttribute(key, value) {
    this.attributeChangedCallback(key, void 0, value);
  }
  //------------------------------------------------------------------------------
  emit(event, payload) {
    if (this._eventListeners[event])
      this._eventListeners[event].forEach((ev) => ev.cb(new CustomEvent(event, {
        cancelable: false,
        bubbles: false,
        detail: payload
      })));
  }
  addEventListener(event, callback, options) {
    if (!this._eventListeners[event])
      this._eventListeners[event] = [];
    const found = this._eventListeners[event].find((x) => x.callback === callback);
    const cb = (...args) => callback.call(this, ...args);
    if (!found) {
      this._eventListeners[event].push({ callback, cb });
    }
  }
  removeEventListener(event, callback) {
    if (!this._eventListeners[event])
      return;
    const index = this._eventListeners[event].findIndex((x) => x.callback === callback);
    if (index !== -1) {
      this._eventListeners[event].splice(index, 1);
    }
  }
  //------------------------------------------------------------------------------
  async remove() {
    await this.disconnectedCallback();
    while (this.document._childNodes.length) {
      await this.document._childNodes[this.document._childNodes.length - 1].remove();
    }
    if (this.renderer.onDisconnect)
      await this.renderer.onDisconnect(this);
    const index = this.parent._childNodes.findIndex((x) => x == this);
    if (index !== -1)
      this.parent._childNodes.splice(index, 1);
    else
      throw "Element not found";
  }
  after(element) {
    this.renderer.insertAfter(this, element);
  }
  before(element) {
    this.renderer.insertBefore(this, element);
  }
};
var baseElement = class extends baseClassMixin(_baseElement) {
};

// src/compiler/hashName.js
var cyrb53 = (str, seed = 0) => {
  var h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
  for (var i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
function hashName(source, url) {
  return "ui-" + String(url ? cyrb53(url) : cyrb53(source.trim())).replaceAll("-", "i");
}

// src/compiler/createTag.js
var importsCache = {};
var className = (name) => name.split("-").map((c) => c.slice(0, 1).toUpperCase() + c.slice(1)).join("");
var Stringify = (obj) => ((placeholder, functions) => JSON.stringify(obj, (_, value) => typeof value === "function" ? functions.push(value) && placeholder : value).replace(
  new RegExp('"' + placeholder + '"', "g"),
  (_) => functions.shift()
))("____" + nanoid_default(50) + "____", []);
var encode = (path, raw) => {
  if (importsCache[path])
    return importsCache[path];
  const u = URL.createObjectURL(new Blob([String.raw({ raw })], { type: "text/javascript" }));
  importsCache[path] = u;
  return u;
};
var includeImports = (imports, nodePath, BASE_URL, _path) => imports.reduce((prev, value) => {
  const path = nodePath ? value.path[0] === "@" ? value.path : "i.js:" + (value.path[0] === "/" ? BASE_URL : BASE_URL + _path) + "/" + value.path : encode(value.path, value.src);
  if (value.type === "*") {
    return prev + "const " + value.import + " = {...(await import(`" + path + "`))};\n";
  } else if (value.type === "object") {
    return prev + "const " + value.import + " =  (await import(`" + path + "`));\n";
  } else {
    return prev + "const " + value.import + " =  (await import(`" + path + "`)).default;\n";
  }
  return prev;
}, "");
function generateJS(component, baseClass, { inFunc = false, parent }) {
  const style = Object.values(plugins_default).filter((p) => p.processStyle).reduce((style2, plugin) => plugin.processStyle(style2), component.style || "");
  const walt = component.walt ? plugins_default.walt.compileWalt(component.walt) : "undefined";
  const state = `{${(component.state || "").trim()}}`;
  const observedAttributes = baseClass !== "customElement" ? "" : new Function(`return 'static get observedAttributes() { return '+JSON.stringify(Object.keys(${state}))+' }'`)();
  const class_name = className(component.name);
  const i_component = Stringify(parseTemplate(component.template, component.tag || []));
  const container = component.container ? `get container()         { return "${component.container}" }` : "";
  var renderer = "";
  if (component.renderer) {
    const split = component.renderer[0].split(" ");
    renderer = 'get __rendererName(){ return "' + split[0] + '" }';
    if (split.length == 2) {
      var rendererHTML = true;
      renderer += "\nget __rendererHTML(){ return true }";
    } else {
      renderer += "\nget renderer(){ return this.parent?.renderer }";
    }
  }
  ;
  const code1 = `

        ${component.static || ""};
        class ${class_name} extends ${baseClass} {
            ${observedAttributes}
            get nanoapp()           { return ${JSON.stringify(component.nanoapp)} }
            get initial_state()     { return ${state} }
            get initial_component() { return ${i_component} }
            get css()               { return \`${style}\`; }
            get __walt()            { return ${walt} }
            get __src()             { return "${component.src}" }
            ${renderer}
            ${container}
            ${component.class || ""}
        };
    `;
  switch (baseClass) {
    case "customElement":
      const _customElement = `
                ${component.import ? includeImports(component.import, component.nodePath, component.BASE_URL, component.path) : ""}
                if(!customElements.get('${component.name}')) {
                    ${code1}
                    customElements.define('${component.name}', ${class_name});
                    window['UIjs'].tags['${component.name}'] = true;
                };`;
      return inFunc ? `;(async () => {${_customElement}})();` : _customElement;
    case "uiElement":
      const _uiElement2 = `
                ${component.import ? includeImports(component.import, component.nodePath, component.BASE_URL, component.path) : ""}
                ${code1} return new ${class_name}("${"parentparentparent:" + parent}");`;
      return inFunc ? `;(async () => {${_uiElement2}})();` : _uiElement2;
    case "baseElement":
      const _baseElement2 = `
                ${component.import ? includeImports(component.import, component.nodePath, component.BASE_URL, component.path) : ""}
                ${code1} ;window['UIjs'].tags['${component.name}'] = ${class_name};`;
      return inFunc ? `;(async () => {${_baseElement2}})();` : _baseElement2;
  }
}
async function createAndReplaceSelf(script, path, nanoapp) {
  const name = hashName(script.innerText);
  await createTag(script.innerText, { name, path, nanoapp });
  script.replaceWith(document.createElement(name));
}
async function createNamed(source, name, path, nanoapp, path2, src) {
  await createTag(source, { name, path, nanoapp, src });
}
function AddBase(path, nanoapp) {
  if (path.startsWith("/https://"))
    path = path.replace("/https://", "https://");
  if (typeof window !== "undefined" && window.nanoapp_base_path && !path.startsWith(window.nanoapp_base_path)) {
    return window.nanoapp_base_path + "/app" + path;
  }
  return path;
}
async function _fetch(path, nanoapp) {
  if (window.document.location.protocol == "file:") {
    console.error(`WARNING!!! ui.js cannot fetch external resources from a 'local' filesystem: "file://${path}"`);
    var src = await fetch(AddBase(path, nanoapp), { mode: "no-cors" }).catch((e) => false);
  } else {
    var src = await fetch(AddBase(path, nanoapp)).catch((e) => false);
  }
  return src;
}
async function fetchFile(path, nodeFetch, nanoapp) {
  if (nodeFetch)
    return await nodeFetch(path);
  const src = await _fetch(path, nanoapp);
  if (src === false)
    throw "i.js  \u2764\uFE0F error loading " + path;
  return (await src.text()).trim();
}
async function fetchAndCreate(name, src, base = "", nanoapp) {
  if (tags_default[name])
    return true;
  const url = src.substr(-4) === ".tag" ? src : src + ".tag";
  const path = src[0] !== "/" ? normalizePath(base + url) : url;
  const source = await _fetch(path, nanoapp);
  if (source === false)
    throw "i.js  \u2764\uFE0F error loading " + url;
  const path2 = path.substring(0, path.lastIndexOf("/")) + "/";
  await createNamed(await source.text(), name, path2, nanoapp, path2, src);
}
async function mountToTarget(script, target, path) {
  await createTag(script.innerText, {
    name: hashName(script.innerText),
    path,
    container: target
  });
}
function normalizePath(path) {
  if (typeof window === "undefined")
    return path;
  return new URL(path, document.baseURI).pathname;
}
async function compile2({ source, path, keepName, nodeFetch, nodePath, BASE_URL }) {
  const name = keepName ? path.split("/").pop().split(".")[0] : hashName(path);
  return {
    name,
    compiled: await createTag(source, {
      name,
      path: path.substring(0, path.lastIndexOf("/")) + "/",
      bundle: true,
      nodeFetch,
      nodePath,
      BASE_URL
    })
  };
}
async function createTag(source, opts = {}) {
  const component = await parseComponent(source);
  if (!opts.name)
    throw "name is undefined !!!";
  component.name = opts.name || "i-component";
  component.path = opts.path;
  component.src = opts.src;
  component.container = opts.container || "";
  component.nodePath = opts.nodePath ? opts.nodePath : void 0;
  component.BASE_URL = opts.BASE_URL;
  component.nanoapp = opts.nanoapp || [];
  const nodeFetch = opts.nodeFetch || void 0;
  var style = "";
  if (component.style) {
    component.style = component.style.trim();
    if (component.style.length)
      style = component.style;
  }
  if (component.css) {
    for (const url of component.css) {
      const path = url[0] !== "/" ? normalizePath(component.path + url) : url;
      const src = await fetchFile(path, nodeFetch, component.nanoapp);
      if (src.length)
        style += "\n" + src;
    }
  }
  component.style = style.replaceAll("`", "`").trim();
  if (component.tag) {
    for (const tag of component.tag) {
      let path = tag.path;
      path = path.substr(-4) === ".tag" ? path : path + ".tag";
      if (nodeFetch)
        path = normalizePath(path[0] === "/" ? path : component.path + path);
      else {
        path = normalizePath(tag.path[0] === "/" ? path : component.path + path);
      }
      const name = hashName(path);
      tag.name = name;
      if (nodeFetch) {
        tag.src = await nodeFetch(path);
      } else {
        const x = component.nanoapp && component.nanoapp.children && component.nanoapp.children.find((x2) => "@" + x2.alias === tag.alias);
        if (x) {
          if (path.startsWith("/!" + x.alias + ".tag") && path.split("/").length == 2)
            path = window.nanoapp_base_path + path.replace("/!" + x.alias + ".tag", "/imports/" + x.child_release + "/index.tag");
          else if (path.startsWith("/!" + x.alias + "/"))
            path = window.nanoapp_base_path + path.replace("/!" + x.alias + "/", "/imports/" + x.child_release + "/");
        }
        await fetchAndCreate(name, path, component.path, x ? x : component.nanoapp);
      }
    }
  }
  if (component.import && !nodeFetch) {
    for (const js of component.import) {
      const path = js.path[0] !== "/" ? normalizePath(component.path + js.path) : js.path;
      js.path = path;
      const src = await fetchFile(path, nodeFetch, component.nanoapp);
      js.src = src;
    }
  }
  tags_default[component.name] = true;
  if (component.renderer && component.renderer[0].split(" ").length == 1) {
    const content = generateJS(component, "baseElement", { inFunc: false });
    const result = await new AsyncFunction_default("baseElement", content)(baseElement);
    return result;
  } else if (component.container) {
    const content = generateJS(component, "uiElement", { inFunc: false });
    const result = await new AsyncFunction_default("uiElement", content)(uiElement);
    return result;
  } else {
    const content = generateJS(component, "customElement", { inFunc: true });
    if (opts.bundle) {
      if (component.tag) {
        let subtags = "";
        for (const tag of component.tag) {
          if (!tags_default[tag.name]) {
            let path = tag.path.substr(-4) === ".tag" ? tag.path : tag.path + ".tag";
            if (path[0] !== "/") {
              path = component.path + path;
            }
            const { name, compiled } = await compile2({
              source: tag.src,
              path,
              name: tag.name,
              nodePath: normalizePath(component.nodePath + component.path),
              BASE_URL: component.BASE_URL,
              nodeFetch
            });
            subtags += compiled;
          } else {
            console.log(`              <${tag.name}> skipped`);
          }
        }
        return subtags + content;
      }
      return content;
    }
    await new AsyncFunction_default("customElement", content)(customElement);
  }
}

// src/processScripts.js
function warnIfNotEmpty(script, attrs) {
  if (script.innerText.trim().length)
    console.warn(`ui.js warning: contents of "<script type=ui ${attrs.map((a) => a.name).join(" ")}> will be ignored"`);
}
function warnIfEmpty(script, attrs) {
  if (!script.innerText.trim().length)
    console.warn(`ui.js warning: empty "<script type=ui ${attrs.map((a) => a.name).join(" ")}>"`);
}
async function processScripts() {
  const scripts = Array.from(document.querySelectorAll('script[type="ui"],script[type="i"]'));
  try {
    for (const script of scripts) {
      const url = window.location.pathname;
      const path = url.substring(0, url.lastIndexOf("/")) + "/";
      const attrs = Array.prototype.slice.call(script.attributes).map((attr) => ({
        name: attr.name,
        value: script.getAttribute(attr.name).trim()
      }));
      const target = attrs.find((a) => a.name === "target" && a.value.length);
      if (target) {
        if (attrs.length > 2)
          console.warn(`ui.js warning: all other attributes for "<script type=ui target="${target.value}"> will be ignored"`);
        await mountToTarget(script, target.value, path);
        script.remove();
        continue;
      }
      const attrsWithHyphens = attrs.filter((a) => a.name.includes("-"));
      if (attrsWithHyphens.length > 1) {
        throw `ui.js ERROR: more then one attribute with hyphens "<script ${attrsWithHyphens.map((a) => a.name).join(" ")}>"`;
      } else {
        if (attrsWithHyphens.length === 1) {
          if (attrsWithHyphens[0].value) {
            warnIfNotEmpty(script, attrs);
            await fetchAndCreate(attrsWithHyphens[0].name, attrsWithHyphens[0].value, path, typeof window !== "undefined" && window.nanoapp_dependencies);
          } else {
            warnIfEmpty(script, attrs);
            await createNamed(script.innerText, attrsWithHyphens[0].name, path, typeof window !== "undefined" && window.nanoapp_dependencies);
          }
          script.remove();
        } else {
          warnIfEmpty(script, attrs);
          await createAndReplaceSelf(script, path);
        }
      }
    }
  } catch (e) {
    throw new CompileError(e);
  }
}

// src/index.js
var VERSION = "0.7.5-dev";
!VERSION.endsWith("-dev") && console.log(`ui.js \u2764\uFE0F ${VERSION} alpha experiment. Make user interfaces great again!`);
var UIjs = {
  VERSION,
  tags: tags_default,
  customElement,
  createTag,
  compile: compile2,
  plugins: plugins_default
};
var src_default = UIjs;
if (typeof window !== "undefined") {
  window["UIjs"] = UIjs;
  document.addEventListener("DOMContentLoaded", processScripts);
}
export {
  VERSION,
  compile2 as compile,
  createTag,
  customElement,
  src_default as default,
  plugins_default as plugins,
  tags_default as tags
};
>>>>>>> 577e138e68ef077b5f9fd1671f37d02a39b4f225
/**
 * WASM types
 *
 * https://github.com/WebAssembly/spec/tree/master/interpreter#s-expression-syntax
 *
 * Plus some extra C type mappings
 *
 * @author arthrubuldauskas@gmail.com
 * @license MIT
 */
/**
 * min.css
 *
 * min.css is a tiny, fast and efficient JavaScript library for minifying CSS
 * files that really makes your website faster
 *
 * Site: https://github.com/w3core/min.css/
 * Online: https://w3core.github.io/min.css/
 *
 * @version 1.3.1
 *
 * @license BSD License
 * @author Max Chuhryaev
 */
