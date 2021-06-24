$(document).ready(function(){
     if(window.innerWidth <= 700){
          $("#btn").css("--font-size", "25px");
          $("#font-size-adjuster").val(25);
          $("#font-size-slider-value").text("25");
     }
})

$(window).on("resize", function(){
     let fontSize = $("#btn").css("--font-size");
     fontSize = Number(fontSize.replace("px", ""));
     if(window.innerWidth <= 700 && fontSize >= 25){
          $("#btn").css("--font-size", "25px");
          $("#font-size-adjuster").val(25);
          $("#font-size-slider-value").text("25");
          currentFontSize = 25;

     }
     if(window.innerWidth > 700){
          console.log("increase")
          $("#btn").css("--font-size", `${currentFontSize}px`);
          $("#font-size-adjuster").val(currentFontSize);
          $("#font-size-slider-value").text(currentFontSize);
     }
})

let currentFontSize = 50;
let keysPressed = {};
let activeHover = ".hover-none";
let hover = [  "hover-scale-up",
               "hover-scale-down",
               "hover-expand",
               "hover-shrink",
               "hover-fade-out",
               "hover-fade-in",
               "hover-rainbow",
               "hover-border-light-up",
               "hover-empty",
               "hover-raise",
               "hover-pulse",
               "hover-stretchable",
               "hover-none"];

// Background Selector
$("#btn-bg").on("change", function(){
     let value = $(this).val();
     $("#btn").css('--background-color', value);
     $("#bg-picker").val(value);
});
// Background Color Picker
$("#bg-picker").on("input", function(){
     let value = $(this).val();
     $("#btn").css('--background-color', value);
     $("#btn-bg").val("none");
     $("#custom-bg-color").text(value);
});


// Text Color Selector
$("#btn-txt").on("change", function(){
     let value = $(this).val();
     $("#btn").css('--color', value);
     $("#font-color-picker").val(value);
});
// Font Color Picker
$("#font-color-picker").on("input", function(){
     let value = $(this).val();
     $("#btn").css("--color", value);
     $("#btn-txt").val("none");
     $("#custom-text-color").text(value);
});


// Shape Selector
$("#btn-shape").on("change", function(){
     var value = $(this).val();
     if(value === "0px"){
          // 1. Enable the radius slider     2. Appears enabled       3. Change border radius value
          $("#border-radius-adjuster").prop("disabled", false);
          $(".border-radius").removeClass("disabled");
          $("#btn").css("--border-radius", value);
     }
     else{
          // 1. Disable the radius slider    2. Appears disabled      3. Change border radius value
          $("#border-radius-adjuster").prop("disabled", true);
          $(".border-radius").addClass("disabled");
          $("#btn").css("--border-radius", value);
     }
});


// Hover animation changer
$("#btn-hover").on("change", function(){
     let value = $(this).val();
     changeClass(value, "hover");
     activeHover = `.${value}`;
});


// Padding Block Adjuster
$("#padding-block-adjuster").on("input", function(){
     var value = $(this).val();
     $("#btn").css("--padding-block", `${value}em`);
     $("#padding-block-slider-value").text(value);
});
// Padding Inline Adjuster
$("#padding-inline-adjuster").on("input", function(){
     var value = $(this).val();
     $("#btn").css("--padding-inline", `${value}em`);
     $("#padding-inline-slider-value").text(value);
});


// Font Size Adjuster
$("#font-size-adjuster").on("input", function(){
     var value = $(this).val();
     $("#btn").css("--font-size", `${value}px`);
     $("#font-size-slider-value").text(value);
     currentFontSize = value;
});


// PlaceHolder Text
$("#placeholder-text").on("input", function(){
     $("#btn").text($(this).val());
});


// Border Radius Adjuster
$("#border-radius-adjuster").on("input", function(){
     var value = $(this).val();
     $("#btn").css("--border-radius",`${value}em`);
     $("#border-radius-slider-value").text(value);
     if(value == 0){
          // 1. Enable Shape input      2. Appears enabled
          $("#btn-shape").prop("disabled", false);
          $(".btn-shape").removeClass("disabled");
     }
     else{
          // 1. Disable Shape input     3. Appears disabled
          $("#btn-shape").prop("disabled", true);
          $(".btn-shape").addClass("disabled");
     }
});


// Create a random button when user presses the "Control + Space" key
$("html").on("keydown", function(){
     keysPressed[event.key] = true;
     if(keysPressed['Control'] && event.key === " ") randomButton()
     if(keysPressed['Control'] && (event.key === "r" || event.key === "R")) {
          location.reload()
     }
     if(event.key === "Enter") generateCss();
     if(event.key === "Escape") {
          $(".modal").addClass("modal-hidden");
          $("header").removeClass("disabled");
          $("form").removeClass("disabled");
     }
})

//
$("html").on("keyup", function(){
     delete keysPressed[event.key];
})

// Body- click on body hides the code window
$(".modal-close").on("click", function(){
     $(".modal").addClass("modal-hidden");
     $("header").removeClass("disabled");
     $("form").removeClass("disabled");
     //$("#btn").fadeIn();//removeClass("disabled");
})

// Modal toggle is binded on the button
$("#btn").on("click", function(){
     generateCss();
})

// Prevent form submit
$("form").on("submit", function(){
     event.preventDefault()
})

// css copy button
$(".css-copy").on("click", function(){
     // copies css of the button
     let copy = $(".modal-content-css").text()

     // creates a textarea -> copies the css from it -> removes textarea
     const el = document.createElement("textarea");
     el.value = copy;
     document.body.appendChild(el);
     el.select();
     document.execCommand("copy");
     document.body.removeChild(el);
})


/*-------------------------------------------- Functions -------------------------------------------- */
// changes css class of the "type" with the "value" and removes all other classes with same "type"
function changeClass(value, type){
     if(type === "hover"){
          let classes = [...hover]; 
          removeElement(classes, value);
          $("#btn").addClass(value).removeClass(classes);
     }
}


// removes the "element" from the "arr" array
function removeElement(arr, element){
     for(let i = 0; i < arr.length; i++){
          if(arr[i] === element) arr.splice(i, 1);
     }
     return arr;
}


// console.log(getClassProp(".hover-fade-in"))
// console.log(getClassProp("hover-shrink"))
function getClassProp(value){
     let rules = document.styleSheets[0].cssRules;
     let classes = [];
     // for(i = 0; i < (rules.length); i++){
     //      if((!rules[i].cssText.includes("@keyframes")) && rules[i].selectorText.includes(value)) classes.push(rules[i].cssText)
     //      // console.log(rules[i].selectorText)
     // }
     // for(i = 0; i < rules.length; i++){
     //      if(!rules[i].cssText.includes("@keyframes")){
     //           if(rules[i].selectorText.includes(value) || !rules[i].cssText.includes("")){
     //                classes.push(rules[i].selectorText)
     //           }
     //      }
     // }
     for(i = 0; i < (rules.length); i++){
          if(rules[i].cssText.includes(value)){
               classes.push(rules[i].cssText)
          }
     }
     // console.log(rules)
     return classes;
}


// getAnimationProp(".hover-pulse")
// gets the animation on "selector" from the original stylesheet
function getAnimationProp(animationName){
     if(animationName === "none"){
          return "";
     }
     let rules = document.styleSheets[0].cssRules;
     for(i = 0; i < rules.length; i++){
          if(rules[i].name === animationName) return rules[i].cssText;
     }
}

// generates a random color in #HEX code
function randomColorGen(){
     // return `#${Math.floor(Math.random()*16777215).toString(16)}`;
     return "#" + Math.random().toString(16).slice(2, 8)
}


// generates CSS for the button
function generateCss(){
     $(".modal").fadeIn();
     $(".modal").toggleClass("modal-hidden"); // toggles the modal
     
     // "disabled" class reduces opacity
     $("header").toggleClass("disabled");
     $("form").toggleClass("disabled");
     //$("#btn").fadeOut();//toggleClass("disabled");
     
     // innerHTML of button
     let contentHTML = `<button class="${$("#btn").attr("class")}">${$("#btn").text()}</button>`; 

     // comments
     let comment = "/* ----------------------------------------------\n* Generated by CssButtonAnimations.com\n* Licensed under FreeBSD License.\n* ---------------------------------------------- */\n\n";

     
     // initial styles needed to generate button CSS
     let buttonCSS = getClassProp(".bcg-button");

     // altered styles upon which the entire class depends on
     let bcgButtonProp = `--color:${$("#btn").css("--color")};--background-color:${$("#btn").css("--background-color")};--padding-block:${$("#btn").css("--padding-block")};--padding-inline:${$("#btn").css("--padding-inline")};--font-size:${$("#btn").css("--font-size")};--border-radius:${$("#btn").css("--border-radius")};`;
     // combines initial and altered styles together to create a working button
     buttonCSS[0] = buttonCSS[0].replace(".", `${comment}.`).replace("{", "{\n\t" + bcgButtonProp).replaceAll(";", ";\n\t").replace("}", "}\n\n");
     
     // hover animations are stored as an array -> hoverCSS, which are then converted to working styles using Regex
     let hoverCSS = getClassProp(activeHover).toString();
     hoverCSS = hoverCSS.replaceAll("},.", "}\n.").replaceAll("{", "{\n\t").replaceAll(";", ";\n\t").replaceAll("}", "}\n");
      
     // Output to the modal
     $(".modal-content-html").text(contentHTML); // outputs HTML of button

     // outputs CSS of the button
     if(activeHover === ".hover-none"){
          $(".modal-content-css").text(buttonCSS[0]);
     }
     else if(activeHover != ".hover-none" && $("#btn").css("animation-name") != "none"){
          $(".modal-content-css").text(buttonCSS[0] + hoverCSS + "\n" + getAnimationProp($("#btn").css("animation-name")));
     }
     else{
          $(".modal-content-css").text(buttonCSS[0] + hoverCSS);
     }
}

// randomiseCSS();
function randomButton(){
     let bgColor = randomColorGen()
     let fontColor = randomColorGen()
     let hoverStyle = hover[Math.floor(Math.random() * (hover.length - 1))]
     // console.log(hoverStyle)
     let paddingInline = Math.random() * 2
     let paddingBlock = Math.random()
     let borderRadius = Math.random() * 2
     // display randomized selectors on webpage
     $("#btn-bg").val("none");
     $("#custom-bg-color").text(bgColor)
     $("#bg-picker").val(bgColor)
     $("#btn-txt").val("none")
     $("#custom-text-color").text(fontColor)
     $("#font-color-picker").val(fontColor)
     $("#btn-hover").val(hoverStyle)
     $("#padding-block-adjuster").val(paddingBlock)
     $("#padding-block-slider-value").text($("#padding-block-adjuster").val())
     $("#padding-inline-adjuster").val(paddingInline)
     $("#padding-inline-slider-value").text($("#padding-inline-adjuster").val())
     $("#border-radius-adjuster").val(borderRadius)
     $("#border-radius-slider-value").text($("#border-radius-adjuster").val())

     // port the above selected styles on the button
     $("#btn").css("--background-color", bgColor)
     $("#btn").css({"--color": fontColor, "--shadow-color": fontColor})
     $("#btn").css("--padding-inline", `${paddingInline.toPrecision(4)}em`)
     $("#btn").css("--padding-block", `${paddingBlock.toPrecision(4)}em`)
     $("#btn").css("--border-radius", `${borderRadius.toPrecision(4)}em`)
     // set and update hover
     changeClass(hoverStyle, "hover")
     activeHover = `.${hoverStyle}`
}



