const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const splash=$('#splash'),locks=$('#locks'),unlocked=$('#unlocked'),go=$('#continueBtn');
setTimeout(()=>{splash.classList.remove('active');setTimeout(()=>locks.classList.add('active'),180)},3000);
const state={one:false,two:false};
function updateGo(){if(state.one&&state.two)go.classList.add('show')}
function result(card,icon,status,ok,msg){const c=$(card),i=$(icon),s=$(status);s.textContent=msg;s.className='status '+(ok?'ok':'bad');if(ok){c.classList.add('unlocked');i.textContent='🔓'}else{c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake')}}
const time=$('#timeCode');
time.addEventListener('input',()=>{const d=time.value.replace(/\D/g,'').slice(0,4);time.value=d.length>2?d.slice(0,2)+':'+d.slice(2):d});
time.addEventListener('keydown',e=>{if(e.key==='Enter')$('#unlockOne').click()});
$('#unlockOne').onclick=()=>{const ok=time.value==='02:13';state.one=ok;result('#lockOneCard','#lockOneIcon','#statusOne',ok,ok?'Yesss. That one is yours. ♡':'Nope 😼 — try the hint again.');updateGo()};
const pins=$$('#pinRow input');
pins.forEach((input,i)=>{input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(-1);if(input.value&&i<5)pins[i+1].focus()});input.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!input.value&&i>0)pins[i-1].focus();if(e.key==='Enter')$('#unlockTwo').click()});input.addEventListener('paste',e=>{const d=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6);if(d){e.preventDefault();d.split('').forEach((x,j)=>{if(pins[j])pins[j].value=x});pins[Math.min(d.length,6)-1].focus()}})});
$('#unlockTwo').onclick=()=>{const ok=pins.map(i=>i.value).join('')==='150906';state.two=ok;result('#lockTwoCard','#lockTwoIcon','#statusTwo',ok,ok?'Perfect. Mine Guggu remembered. ♡':'Six digits. One very obvious Guggu memory 👀');updateGo()};
go.onclick=()=>{locks.classList.remove('active');setTimeout(()=>unlocked.classList.add('active'),180)};