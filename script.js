function toggleSidebar(){
  var s=document.getElementById("sidebar"),o=document.getElementById("overlay"),h=document.getElementById("hamburger");
  s.classList.toggle("open");o.classList.toggle("show");h.classList.toggle("active");
  document.body.style.overflow=s.classList.contains("open")?"hidden":"";
}
function closeSidebar(){
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
  document.getElementById("hamburger").classList.remove("active");
  document.body.style.overflow="";
}
function openModal(course,plan){
  var m=document.getElementById("enrollModal");
  m.classList.add("show");document.body.style.overflow="hidden";
  if(course){var s=document.getElementById("courseSelect");for(var i=0;i<s.options.length;i++){if(s.options[i].value===course){s.value=course;break;}}}
  if(plan){
    document.querySelectorAll(".plan-opt").forEach(function(o){o.classList.remove("sel");if(o.dataset.plan===plan)o.classList.add("sel");});
    document.getElementById("selPlan").value=plan||"Standard";
    if(plan==="Trial")document.getElementById("trialChk").checked=true;
  }
}
function closeModal(){document.getElementById("enrollModal").classList.remove("show");document.body.style.overflow="";}
function selectPlan(el,plan){document.querySelectorAll(".plan-opt").forEach(function(o){o.classList.remove("sel");});el.classList.add("sel");document.getElementById("selPlan").value=plan;}
async function handleEnrollForm(e){
  e.preventDefault();
  var btn=document.getElementById("enrollBtn");btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Submitting...';
  var f=document.getElementById("enrollForm"),d=new FormData(f);
  try{
    var r=await fetch(f.action,{method:"POST",body:d,headers:{"Accept":"application/json"}});
    if(r.ok){closeModal();document.getElementById("successModal").classList.add("show");f.reset();document.querySelectorAll(".plan-opt").forEach(function(o){o.classList.remove("sel");});document.querySelector("[data-plan='Standard']").classList.add("sel");document.getElementById("selPlan").value="Standard";}
    else{alert("Something went wrong. Please try again or contact us via WhatsApp.");}
  }catch(err){alert("Network error. Please check your connection.");}
  btn.disabled=false;btn.innerHTML='<i class="fas fa-paper-plane"></i> Complete Registration';
}
function closeSuccess(){document.getElementById("successModal").classList.remove("show");document.body.style.overflow="";window.scrollTo({top:0,behavior:"smooth"});}
async function handleContactForm(e){
  e.preventDefault();
  var f=document.getElementById("contactForm"),btn=f.querySelector("button[type=submit]");
  btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...';
  var d=new FormData(f);
  try{
    var r=await fetch(f.action,{method:"POST",body:d,headers:{"Accept":"application/json"}});
    if(r.ok){document.getElementById("contactSuccessModal").classList.add("show");f.reset();}
    else{alert("Something went wrong. Please try again.");}
  }catch(err){alert("Network error. Please try again.");}
  btn.disabled=false;btn.innerHTML='<i class="fas fa-paper-plane"></i> Send Message';
}
function closeContactSuccess(){document.getElementById("contactSuccessModal").classList.remove("show");window.scrollTo({top:0,behavior:"smooth"});}
function filterCourses(cat,btn){
  document.querySelectorAll(".filter-btn").forEach(function(b){b.classList.remove("active");});btn.classList.add("active");
  document.querySelectorAll(".course-card").forEach(function(c){
    if(cat==="all"||c.dataset.cat.includes(cat)){c.style.display="";}else{c.style.display="none";}
  });
}
function toggleFaq(el){
  var item=el.closest(".faq-item"),isOpen=item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach(function(i){i.classList.remove("open");});
  if(!isOpen)item.classList.add("open");
}
// scroll animations
var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);}});},{threshold:0.1});
document.querySelectorAll(".fade-in").forEach(function(el){obs.observe(el);});
// scroll top
window.addEventListener("scroll",function(){
  var btn=document.getElementById("scrollTop");
  if(window.scrollY>400)btn.classList.add("show");else btn.classList.remove("show");
});
// close modals on bg click
document.getElementById("enrollModal").addEventListener("click",function(e){if(e.target===this)closeModal();});
document.getElementById("successModal").addEventListener("click",function(e){if(e.target===this)closeSuccess();});
document.getElementById("contactSuccessModal").addEventListener("click",function(e){if(e.target===this)closeContactSuccess();});