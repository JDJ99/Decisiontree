import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA
//
const csvFile = "./data/diabetes.csv"
const trainingLabel = "Label"  
const ignored = ["Pregnant", "Label"]  

//
// laad csv data als json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)
    })
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    // todo : splits data in traindata en testdata
    // Shuffle the data randomly
    data.sort(() => (Math.random() - 0.5))
    // Split the data into train and test sets
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8))

    // maak het algoritme aan
    let decisionTree = new DecisionTree({
        ignoredAttributes: ['Pregnant','Label'],
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let json = decisionTree.toJSON()
    let visual = new VegaTree('#view', 2300, 1000, json)

    // maak een prediction met een sample uit de testdata
    let diabetes = testData[0]
    let diabetesPrediction = decisionTree.predict(diabetes)
    console.log(`Prediction for diabetes: ${diabetesPrediction}`)
    console.log("diabetes data:", diabetes);
    console.log("DecisionTree object:", decisionTree);


    // bereken de accuracy met behulp van alle test data
    let correctPredictions = 0
    for (let i = 0; i < testData.length; i++) {
        if (decisionTree.predict(testData[i]) === testData[i][trainingLabel]) {
            correctPredictions++
        }
    }
    let accuracy = correctPredictions / testData.length
    console.log(`Accuracy: ${accuracy}`)
}

loadData()



// import { DecisionTree } from "./libraries/decisiontree.js"
// import { VegaTree } from "./libraries/vegatree.js"

// //
// // DATA
// //
// const csvFile = "./data/diabetes.csv"
// const trainingLabel = "Label"  
// const ignored = []  

// //
// // laad csv data als json
// //
// function loadData() {
//     Papa.parse(csvFile, {
//         download: true,
//         header: true,
//         dynamicTyping: true,
//         complete: results => console.log(results.data)   // gebruik deze data om te trainen
//     })
// }



// //
// // MACHINE LEARNING - Decision Tree
// //
// function trainModel(data) {
//     // todo : splits data in traindata en testdata
//     // Shuffle the data randomly
//     data.sort(() => (Math.random() - 0.5))
//     // Split the data into train and test sets
//     let trainData = data.slice(0, Math.floor(data.length * 0.8))
//     let testData = data.slice(Math.floor(data.length * 0.8) + 1)


//     // maak het algoritme aan
//     let decisionTree = new DecisionTree({
//         ignoredAttributes: ['Pregnancies', 'Outcome'],
//         trainingSet: trainData,
//         categoryAttr: trainingLabel
//     })

//     // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
//     let json = decisionTree.toJSON()
//     let visual = new VegaTree('#view', 2300, 1000, json)

//     // todo : maak een prediction met een sample uit de testdata
//     let diabetes = testData[0]
//     let diabetesPrediction = decisionTree.predict(diabetes)
//     console.log(`Survived the holiday : ${diabetesPrediction}`)


//     // todo : bereken de accuracy met behulp van alle test data
//     function testDiabetes(diabetes) {
//         // kopie van diabetes maken, zonder het "Label" label
//         const diabetesWithoutLabel = { ...diabetes }
//         delete diabetesWithoutLabel.Label
    
//         // prediction
//         let prediction = decisionTree.predict(diabetesWithoutLabel)
    
//         // vergelijk de prediction met het echte label
//         let message = (prediction === diabetes[trainingLabel]) ? "goed voorspeld!" : "fout voorspeld!"
//         console.log(message)
//     }
   
    
//     testPassenger(testData[0])


// }


// loadData()