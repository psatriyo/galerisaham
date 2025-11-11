// GaleriSaham - Optimized JavaScript
(function(){'use strict';
// Mobile menu toggle
const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
if(menuToggle){
menuToggle.addEventListener('click',()=>{
navLinks.classList.toggle('active');
menuToggle.classList.toggle('active');
});
// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link=>{
link.addEventListener('click',()=>{
navLinks.classList.remove('active');
menuToggle.classList.remove('active');
});
});
}
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
anchor.addEventListener('click',function(e){
const target=document.querySelector(this.getAttribute('href'));
if(target){
e.preventDefault();
target.scrollIntoView({behavior:'smooth',block:'start'});
}
});
});
// Lazy load images
const lazyImages=document.querySelectorAll('.lazy');
if('IntersectionObserver'in window){
const imageObserver=new IntersectionObserver((entries,observer)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const img=entry.target;
if(img.dataset.src){
img.src=img.dataset.src;
img.classList.add('loaded');
imageObserver.unobserve(img);
}
}
});
},{rootMargin:'50px'});
lazyImages.forEach(img=>imageObserver.observe(img));
}else{
// Fallback for older browsers
lazyImages.forEach(img=>{
if(img.dataset.src){
img.src=img.dataset.src;
img.classList.add('loaded');
}
});
}
// Add animation on scroll
const observeElements=document.querySelectorAll('.card,.feature');
if('IntersectionObserver'in window&&observeElements.length>0){
const animObserver=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.style.opacity='1';
entry.target.style.transform='translateY(0)';
}
});
},{threshold:0.1});
observeElements.forEach(el=>{
el.style.opacity='0';
el.style.transform='translateY(20px)';
el.style.transition='opacity 0.6s ease, transform 0.6s ease';
animObserver.observe(el);
});
}
// Performance: Defer non-critical resources
window.addEventListener('load',()=>{
// Any non-critical operations after page load
console.log('GaleriSaham loaded');
});
})();
