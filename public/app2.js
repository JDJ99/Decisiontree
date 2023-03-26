import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

function loadSavedModel() {
    fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}

function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)
    let glucoseInput = document.getElementById("glucose")
    let bmiInput = document.getElementById("bmi")
    let insulinInput = document.getElementById("insulin")
    let bpInput = document.getElementById("bp")
    let pedigreeInput = document.getElementById("pedigree")
    let ageInput = document.getElementById("age")
    let skinInput = document.getElementById("skin")
    let predictButton = document.getElementById("predict")

    predictButton.addEventListener("click", () => {
        let diabetes = {
            Glucose: glucoseInput.value,
            bmi: bmiInput.value,
            Insulin: insulinInput.value,
            Bp: bpInput.value,
            Pedigree: pedigreeInput.value,
            Age: ageInput.value,
            Skin: skinInput.value
        }
        let prediction = decisionTree.predict(diabetes)
        console.log("predicted " + prediction)
    })
}

loadSavedModel()
