//Create a program which picks data from an object
const programmers = [
    {
        name: 'John',
        age: '40',
        tecnologies: [
            {name: 'JavaScript', specialty: 'Web/Mobile'},
            {name: 'Python', specialty: 'Desktop'},
            {name: 'Swift', specialty: 'IOS'},
            {name: 'React', specialty: 'Web'}
        ]
    },
    {
        name: 'Sue',
        age: '22',
        tecnologies: [
            {name: 'Java', specialty: 'Desktop'},
            {name: 'Python', specialty: 'Desktop'},
            {name: 'Kotlin', specialty: 'Mobile'},
            {name: 'Dart', specialty: 'Desktop'}
        ]
    },
    {
        name: 'Suellen',
        age: '20',
        tecnologies: [
            {name: 'PHP', specialty: 'Web Server'},
            {name: 'Go', specialty: 'Desktop'},
            {name: 'Kotlin', specialty: 'Mobile'}
        ]
    },
    {
        name: 'Kel',
        age: '26',
        tecnologies: [
            {name: 'CSS', specialty: 'Web Front End'},
            {name: 'UX Design', specialty: 'Web Front End'},
            {name: 'HTML', specialty: 'Web'}
        ]
    }
] 


identifyTecnologies = (anObject) => {
    let tecnologiesLength = anObject.tecnologies.length;
    let tecnologies = "";
        for (let j = 0; j < tecnologiesLength; j++) {
            if(j !== tecnologiesLength - 1)
                tecnologies += anObject.tecnologies[j].name + ` (${anObject.tecnologies[j].specialty})` + ", ";
            else
                tecnologies +=  anObject.tecnologies[j].name + ` (${anObject.tecnologies[j].specialty})`; 
        }
    console.log(tecnologies);
}



//For each programmer, use identifyTecnologies
identifyProgrammers = (anArray) => {
    let anArrayLength = anArray.length;
    for(let i = 0; i < anArrayLength; i++) {
        console.log(`${anArray[i].name} works with the following tecnologies: `);
        identifyTecnologies(anArray[i]);
    }
}

//Execution
//identifyProgrammers(programmers);

//Check if a programmer works with CSS
function checkIfWorksWithCSS(aProgrammer) {
    let numberOfTecnologies = aProgrammer.tecnologies.length;
    let worksWithCSS = false;
    for(let i = 0; i < numberOfTecnologies; i++) {
        if(aProgrammer.tecnologies[i].name === "CSS")
            worksWithCSS = true;
    }
    return worksWithCSS;
}

//Print a message saying if a programmer works with CSS
function printMessage(aProgrammer) {
    if(checkIfWorksWithCSS(aProgrammer))
        console.log(`${aProgrammer.name} works with CSS.`);
    else
        console.log(`${aProgrammer.name} does not work with CSS.`);
}

//Iterate over the array data and execute printMessage 
function showEverybody(programmers) {
    for(let programmer of programmers) {
        printMessage(programmer);
    }
}

//Execution
showEverybody(programmers);
