/**
 * createPie() - Creates a progress pie
 * 
 * @param {String} key - Identifies the progress pie.
 * @param {Number} percent - Defines the progress percentage. Any number from 0 to 100.
 * @returns - The SVG Element
 */
function createPie(key, percent) {
    
    /****************************
     * Creates SVG Viewbox
     ****************************/
    const box = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    box.id = 'box' + key;
    box.classList.add('pie-box');
    
    // Sets viewBox attributes
    box.setAttributeNS(null, 'viewBox', '0 0 20 20');
    box.setAttributeNS(null, 'height', '20');
    box.setAttributeNS(null, 'width', '20');

    
    /****************************
     * Creates SVG Circle
     ****************************/
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.classList.add('pie-circle');
    
    // Sets circle attributes
    circle.setAttributeNS(null, 'r', '5');
    circle.setAttributeNS(null, 'cx', '10');
    circle.setAttributeNS(null, 'cy', '10');

    // Calculates progress percentage
    circle.setAttributeNS(null, 'stroke-width', '10');
    circle.setAttributeNS(null, 'stroke-dasharray', 'calc('+percent+' * 31.4 / 100) 31.4');
    circle.setAttributeNS(null, 'style', "transform: rotate(-90deg) translate(-20px);");

    // Appends Circle to SVG
    box.append(circle);

    return box;
}

/**
 * updatePie() - Updates the percentage value of a progress pie.
 * 
 * @param {Object} pie - The SVG Element you want to update
 * @param {Number} percent - The progress percentage you want to update. Any number from 0 to 100.
 * @returns - The SVG element
 */
function updatePie(pie, percent) {
    // Gets <circle> element
    const pieCircle = pie.firstChild;
    
    // Updates attribute
    pieCircle.setAttributeNS(null, 'stroke-dasharray', 'calc('+percent+' * 31.4 / 100) 31.4');

    // Returns the <svg> element
    return pie;
}

/**
 * getPies()
 * 
 * @returns Returns an Array with all the progress pies in the DOM.
 */
function getPies() {
    // Gets all the pies and circles in the DOM
    const pieBoxes = document.querySelectorAll('.pie-box');
    const pieCircles = document.querySelectorAll('.pie-circle');
    
    // Creates an array of all Pies
    const allPies = [];

    pieBoxes.forEach((box, index) => {
        // Adds the pie (<svg>) and circle (<circle>) to an object
        const pieObject = {
            box,
            circle: pieCircles[index]
        };
        
        // Pushes pieObject to the allPies array
        allPies.push(pieObject);
    });

    // Returns allPies
    return allPies;
}

const pies = document.querySelectorAll('.pie');

pies.forEach((pie, index) => {
    const key = pie.getAttribute('data-key');
    const pieEl = createPie(key, 32);

    // console.log(key, pieEl);

    pie.append(pieEl);
});