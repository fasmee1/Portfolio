gsap.registerPlugin(ScrollTrigger);

let scollingboxskill = gsap.timeline({
 scrollTrigger: {
  trigger: ".skill-grid",
  start: "top 80%",
  end: "top -980px",
  scrub: 0.5,
  // markers: true,
 }
});

// ทำให้ทั้งสามอนิเมชันเริ่มพร้อมกัน
scollingboxskill.fromTo(
 [".img-left-grid", ".img-right-grid"],
 {
  x: (index) => [-150, 250][index] // ค่าเริ่มต้นสำหรับ img-left-grid, img-right-grid
 },
 {
  x: (index) => [150, -250][index], // ค่าสุดท้ายสำหรับ img-left-grid, img-right-grid
  stagger: 0,
  duration: 1.5
 }
);

let scollAboutMe = gsap.timeline({
 scrollTrigger: {
  trigger: ".section-aboutme",
  start: "top 80%",
  end: "top 0%",
  scrub: 3,
  // markers: true,
 }
});


// ให้ .imgbootom-right เริ่มก่อน
scollAboutMe.to(".imgtop-lift", { x: 50, y: -10, opacity: 1, duration: 10 }
);
scollAboutMe.to(".imgtop-right", { x: -50, y: -60, opacity: 1, duration: 10 }, "+=.3"
);
scollAboutMe.to(".imgbootom-right", { x: -50, y: -70, opacity: 1, duration: 10 }, "+=1.5");
scollAboutMe.to(".imgbootom-lift", { x: 50, y: -70, opacity: 1, duration: 10 }, "+=1.5");
// เปลี่ยนสีหัวข้อเป็นขาว
scollAboutMe.to(".section-aboutme h1", { color: "#ffffff", duration: 35, ease: "none" });

// รอ 1 วินาทีค่อยให้ .imgbootom-lift เริ่ม
// scollAboutMe.to(".imgbootom-lift", { x: 50, y: -70, opacity: 1, duration: 10 }, "+=1");

// Reveal each line from left to right as user scrolls; fully visible by the ScrollTrigger end
gsap.fromTo(
 ".section-aboutme .about-box-main p .reveal-line",
 { x: -50, opacity: 0 },
 {
  x: 0,
  opacity: 1,
  stagger: 0.25,
  ease: "none",
  scrollTrigger: {
   trigger: ".section-aboutme",
   start: "top 60%",
   end: "top 0%",
   scrub: true,
   // markers: true,
  }
 }
);


// ------------------- Services Box Animation ------------------ //

let scollServicesBox = gsap.timeline({
 scrollTrigger: {
  trigger: ".Services-section",
  start: "top 80%",
  end: "top 50%",
  scrub: 3,
  // markers: true,
 }
});
scollServicesBox.to(".Services-box-main h1", { color: "#000", duration: 10, ease: "none" });


gsap.utils.toArray(".Service-box .box").forEach((box, i) => {
 gsap.fromTo(
  box,
  { y: 100, opacity: 0 }, // เริ่มจากล่างและจาง
  {
   y: 0,
   opacity: 1,
   duration: 1.2,
   ease: "power3.out",
   scrollTrigger: {
    trigger: box,
    start: "top 85%",  // เริ่มเมื่อกล่องเข้ามาใน viewport
    end: "top 60%",    // จบเมื่อขึ้นมาประมาณกลางจอ
    scrub: true,       // ผูกกับการ scroll
    // markers: true,  // เปิดไว้ถ้าจะ debug
   },
  }
 );
});



// -------------------- Projects Box Animation ------------------ //
let scollProjectBox = gsap.timeline({
 scrollTrigger: {
  trigger: ".section-project",
  start: "top 80%",
  end: "top 50%",
  scrub: 3,
  // markers: true,
 }
});
scollProjectBox.to(".section-project h1", { color: "#ffffffff", duration: 10, ease: "none" });

let sections = gsap.utils.toArray(".panel");

// 1. กำหนด Timeline หลักสำหรับการเลื่อนแนวนอน
let horizontalScroll = gsap.to(sections, {
 xPercent: -100 * (sections.length - 1),
 ease: "none",
 scrollTrigger: {
  trigger: ".container",
  pin: true,
  scrub: 1,
  snap: 1 / (sections.length - 1),
  end: "+=3000",
  id: "main-scroll"
 }
});

// 2. ลูปสร้างแอนิเมชันย่อยสำหรับ panel__number
gsap.utils.toArray(".panel").forEach((panel, i) => {
 const number = panel.querySelector('.panel-box-main');
 gsap.fromTo(number,
  { y: 50, opacity: 1, scale: 0.1 },
  {
   y: 0,
   opacity: 1,
   scale: 1,
   duration: 0.8,
   ease: "power3.out",
   scrollTrigger: {
    trigger: panel,
    start: "top 90%",
    end: "top 0%",
    // containerAnimation: horizontalScroll, // ใช้สำหรับการเลื่อนแนวนอน
    scrub: 1,
    // markers: true,
   }

  }
 );
});

// -------------------- contect me ------------------ //

let scollContactBox = gsap.timeline({
 scrollTrigger: {
  trigger: ".section-contact-me",
  start: "top 80%",
  end: "top 50%",
  scrub: 3,
  // markers: true,
 }
});
scollContactBox.to(".section-contact-me .right", { x: -80, y: 70, opacity: 1, duration: 10 }, "+=1.5");
scollContactBox.to(".section-contact-me .left", { x: 230, y: -80, opacity: 1, duration: 10 }, "+=1.5");








// -------------------- Skill-grid auto slider ---------------- //
; (function initSkillAutoSlider() {
 const grid = document.querySelector('.skill-grid');
 if (!grid) return;
 // prevent double-init
 if (grid.dataset.autoInit) return;

 const originalItems = Array.from(grid.children);
 if (originalItems.length === 0) return;

 // clone once for seamless loop
 const clones = originalItems.map(n => n.cloneNode(true));
 grid.append(...clones);
 grid.dataset.autoInit = 'true';

 function computeWidth() {
  const gapStyle = getComputedStyle(grid).gap || getComputedStyle(grid).columnGap || '0px';
  const gap = parseFloat(gapStyle) || 0;
  let w = 0;
  for (let i = 0; i < originalItems.length; i++) {
   const el = grid.children[i];
   w += (el.offsetWidth || el.getBoundingClientRect().width) + gap;
  }
  if (!w || w < 20) w = Math.max(800, originalItems.length * 100);
  return Math.round(w);
 }

 let oneSetWidth = computeWidth();
 gsap.set(grid, { width: (oneSetWidth * 2) + 'px', x: 0 });

 // auto slider: pixels per second
 const speedPxPerSec = 140;
 const duration = Math.max(6, Math.round(oneSetWidth / speedPxPerSec));

 const tween = gsap.to(grid, {
  x: () => -oneSetWidth,
  ease: 'none',
  duration: duration,
  repeat: -1,
  modifiers: {
   x: gsap.utils.unitize(x => gsap.utils.wrap(-oneSetWidth, 0, parseFloat(x)))
  }
 });

 // pause/resume on hover
 grid.addEventListener('mouseenter', () => tween.pause());
 grid.addEventListener('mouseleave', () => tween.resume());

 // recalc on resize
 window.addEventListener('resize', () => {
  oneSetWidth = computeWidth();
  gsap.set(grid, { width: (oneSetWidth * 2) + 'px' });
 });

})();





