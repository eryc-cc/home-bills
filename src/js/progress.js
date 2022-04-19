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
    const box = document.createElement('svg');
    box.id = 'box' + key;
    box.className = 'pie-box';
    
    // Sets viewBox attributes
    box.setAttribute('viewBox', '0 0 64 64');

    
    /****************************
     * Creates SVG Circle
     ****************************/
    const circle = document.createElement('circle');
    circle.className = 'pie-circle';
    
    // Sets circle attributes
    circle.setAttribute('r', '5');
    circle.setAttribute('cx', '10');
    circle.setAttribute('cy', '10');
    circle.setAttribute('stroke-width', '10');
    circle.setAttribute('transform', 'rotate(-90deg) translate(-20px)');

    // Calculates progress percentage
    circle.setAttribute('stroke-dasharray', (percent * 31.4 / 100) + ' 31.4');

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
    pieCircle.setAttribute('stroke-dasharray', (percent * 31.4 / 100) + ' 31.4');

    // Returns the <svg> element
    return pie;
}
