// Get references to the elements using class names
const elements1 = document.querySelectorAll('.window_back');
const elements2 = document.querySelectorAll('.window_content');

// Function to set height of element1 based on height of element2
function setHeightOfElement1BasedOnElement2() {
  elements1.forEach(element1 => {
    elements2.forEach(element2 => {
      const heightOfElement2 = element2.clientHeight; // Get height of element2
      
      // Set height of element1 to be the same as element2
      element1.style.height = heightOfElement2 + 'px';
    });
  });
}

// Call the function initially and whenever needed
setHeightOfElement1BasedOnElement2();
