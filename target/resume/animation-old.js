// if (window.innerWidth > 800) {

//   let sections = document.getElementsByTagName('section');

//   let sectionsHeightList = [];
//   for (let i = 0; i < sections.length; i++) {
//     sectionsHeightList.push(sections[i].scrollHeight);
//   }

//   let position = getScrollTop();
//   let sectionIndexNow = 0;
//   let sectionBegin = 0;
//   let sectionEnd = sectionsHeightList[0];

//   let isChanging = false;
//   let scrollHandler = () => {
//     if (!isChanging) {
//       changePage();
//       isChanging = true;
//       setTimeout(() => {
//         isChanging = false;
//       }, 1000)
//     }
//   };

//   let changePage = () => {
//     let changeFlag = false;
//     let scrollPositionNow = getScrollTop();
//     if (scrollPositionNow < position) {
//       sectionEnd -= sectionsHeightList[sectionIndexNow];
//       sectionIndexNow--;
//       sectionBegin -= sectionsHeightList[sectionIndexNow];

//       changeFlag = true;
//     }


//     if (scrollPositionNow > position) {
//       if (scrollPositionNow + window.innerHeight > sectionEnd) {
//         sectionBegin += sectionsHeightList[sectionIndexNow];
//         sectionIndexNow++;
//         sectionEnd += sectionsHeightList[sectionIndexNow] || 0;

//         changeFlag = true;
//       } else {
//         Math.easeout(scrollPositionNow, sectionEnd - window.innerHeight, 3, position => {
//           window.scrollTo(0, position);
//         });
//       }
//     }
//     //
//     // console.log("----------------");
//     // console.log("sectionBegin: " + sectionBegin);
//     // console.log("position: " + position);
//     // console.log("scrollPositionNow: " + scrollPositionNow);
//     // console.log("window.innerHeight: " + window.innerHeight);
//     // console.log("sectionIndexNow: " + sectionIndexNow);
//     // console.log("sectionEnd: " + sectionEnd);
//     // console.log("----------------");

//     if (changeFlag) {
//       Math.easeout(scrollPositionNow, sectionBegin, 5, position => {
//         window.scrollTo(0, position);
//       });

//       position = sectionBegin;
//     }
//   };

//   window.onwheel = scrollHandler;
//   window.onscroll = scrollHandler;
//   window.ontouchmove = scrollHandler;

//   function getScrollTop() {
//     return document.documentElement.scrollTop + document.body.scrollTop;
//   }

//   Math.easeout = (start, end = 0, rate = 2, callback) => {
//     if (start === end || typeof start !== 'number' || typeof end !== 'number') {
//       return;
//     }

//     let step = () => {
//       if (Math.abs(end - start) < 0.1) {
//         callback(end);
//         return;
//       }
//       start = start + (end - start) / rate;
//       callback(start);
//       requestAnimationFrame(step);
//     };

//     step();
//   };
// }