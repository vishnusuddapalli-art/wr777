const S={coins:+localStorage.coins||10000,phone:localStorage.phone||'',id:localStorage.id||'',name:localStorage.name||''};
const screen=document.getElementById('screen'),nav=document.getElementById('nav');
function save(){localStorage.coins=S.coins;localStorage.phone=S.phone;localStorage.id=S.id;localStorage.name=S.name}
function login(){nav.classList.add('hidden');screen.innerHTML=`<div class="center"><div class="logo" style="font-size:42px">WR777</div><p class="notice">Demo gaming platform • virtual credits only</p><input id="phone" class="field" inputmode="numeric" placeholder="10-digit mobile number"><button onclick="sendOtp()">Continue with OTP</button><p class="notice">Test mode — no real SMS or payment connection.</p></div>`}
function sendOtp(){let p=document.getElementById('phone').value.replace(/\D/g,'');if(p.length<10)return alert('Enter a 10-digit number');screen.innerHTML=`<div class="center"><h2>Verify number</h2><p class="notice">Demo OTP for +91 ${p}</p><input id="otp" class="field" value="123456" inputmode="numeric"><button onclick="verify('${p}')">Verify & Create Account</button><p class="notice">Demo OTP: <b>123456</b></p></div>`}
function verify(p){if(document.getElementById('otp').value!=='123456')return alert('Use OTP 123456');S.phone=p;S.id='WR'+(Math.abs(hash(p))%900000+100000);S.name='Player '+p.slice(-4);save();home()}
function hash(x){let h=0;for(let i=0;i<x.length;i++)h=((h<<5)-h)+x.charCodeAt(i)|0;return h}
function header(){return `<div class="balance"><small>Virtual Balance</small><strong>${S.coins.toLocaleString()} Coins</strong></div>`}
function game(i,t,s,f){return `<div class="card game"><div><h3>${i} ${t}</h3><p>${s}</p></div><button onclick="${f}">Play</button></div>`}
function home(){if(!S.id)return login();nav.classList.remove('hidden');screen.innerHTML=`<div class="content">${header()}<div class="actions"><button onclick="money('Deposit Demo Coins')">＋ Deposit</button><button class="outline" onclick="money('Withdrawal Demo Coins')">↗ Withdrawal</button></div><div class="section-title">Games</div>
${game('🎰','Slots','Virtual demo','slots()')}${game('🎲','Roulette','Virtual demo','roulette()')}${game('🃏','Rummy Demo','Practice-style demo','rummy()')}${game('✈️','Multiplier Demo','Virtual multiplier','mult()')}${game('7️⃣','7 Up 7 Down','Virtual dice demo','seven()')}${game('🐔','Chicken Road Demo','Virtual arcade demo','chicken()')}
<p class="notice">DEMO ONLY: coins have no cash value and cannot be exchanged for money.</p></div>`}
function games(){home()}
function money(t){screen.innerHTML=`<div class="content"><div class="section-title">${t}</div><div class="card"><p>This demo wallet has no UPI, bank account, payment gateway or cash withdrawal.</p><button onclick="admin()">Admin Demo: +10,000 Coins</button></div><button class="outline" onclick="home()">← Home</button></div>`}
function wallet(){screen.innerHTML=`<div class="content">${header()}<div class="section-title">Wallet</div><div class="card"><p>All balance is virtual demo credit.</p><div class="row"><button onclick="money('Deposit Demo Coins')">Deposit</button><button class="outline" onclick="money('Withdrawal Demo Coins')">Withdrawal</button></div></div></div>`}
function admin(){S.coins+=10000;save();alert('10,000 virtual coins added');home()}
function profile(){screen.innerHTML=`<div class="content"><div class="section-title">Profile</div><div class="card"><p><b>Name:</b> ${S.name}</p><p><b>Wr777 ID:</b> ${S.id}</p><p><b>Mobile:</b> +91 ${S.phone}</p><button onclick="admin()">Admin Demo: +10,000 Coins</button></div></div>`}
function play(cost,fn){if(S.coins<cost)return false;S.coins-=cost;S.coins+=fn();save();return true}
function slots(){let a=['🍒','🍋','⭐','7️⃣','💎'],x=a[Math.random()*5|0],y=a[Math.random()*5|0],z=a[Math.random()*5|0],w=x===y&&y===z?1000:(x===y||y===z||x===z?200:0);play(100,()=>w);alert(`${x} ${y} ${z}\n${w?'Demo WIN':'Demo LOST'}`);home()}
function roulette(){if(!play(100,()=>Math.random()<.5?200:0))return;alert('Roulette demo complete');home()}
function rummy(){let w=Math.floor(Math.random()*401);play(100,()=>w);alert('Rummy demo return: '+w);home()}
function mult(){let w=Math.floor(100*(1+Math.random()*5));play(100,()=>w);alert('Multiplier demo return: '+w);home()}
function seven(){let d=Math.floor(Math.random()*11)+2;play(100,()=>d===7?200:0);alert('Dice total: '+d);home()}
function chicken(){let w=Math.floor(100*(1+Math.random()*5));play(100,()=>w);alert('Chicken Road demo return: '+w);home()}
document.getElementById('profileBtn').onclick=profile;home();