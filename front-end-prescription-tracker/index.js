// Display today's date
const todayDateTag = document.getElementById("spanDate");
todayDateTag.innerHTML = new Date().toLocaleDateString();
// todayDateTag.innerHTML = new Date();

const divMissedMed = document.querySelector("div.missed-medications");
const url = "http://localhost:3000/api/v1/prescriptions/";

const addBtn = document.querySelector("a.add-button");
const prescriptionFormContainer = document.getElementById(
  "prescription-form-container"
);

const medDetailDiv = document.querySelector(".medication-detail");
const medUl = document.querySelector("ul#medication-list-ul");
const refreshBtn = document.querySelector("a.refresh-button");
const breakTag = document.createElement("br");
const editPrescription = document.querySelector("#edit-prescription-container");
const missedUl = document.querySelector("ul#missed-medication-ul");

addPrescription = false;

addBtn.addEventListener("click", () => {
  addPrescription = !addPrescription;
  if (addPrescription) {
    prescriptionFormContainer.style.display = "block";
  } else {
    prescriptionFormContainer.style.display = "none";
  }
});

function fetchData() {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => renderAllPrescriptions(data));
}
fetchData();

function renderAllPrescriptions(prescriptions) {
  for (const prescription of prescriptions) {
    dipslayPrescription(prescription);
  }
}

function dipslayPrescription(prescription) {
  const medLi = document.createElement("li");
  medUl.append(medLi);

  const medNamDiv = document.createElement("div");
  const medNameP = document.createElement("strong");
  const medStrengthSpan = document.createElement("span");
  const medTimeSpan = document.createElement("span");
  medTimeSpan.className = "med-time";

  // condition to show the prescription on left div

  if (2 > 1) {
  }

  medNameP.innerText = prescription.medication_name + " ";
  medStrengthSpan.innerText = prescription.medication_strength + " ";
  medTimeSpan.innerText = prescription.time_to_take;

  const btnDiv = document.createElement("div");
  btnDiv.className = "list-item-menu";

  // bell, delete and edit icons
  const checkTag = document.createElement("a");
  checkTag.innerHTML = `<a class="check-button" uk-icon="icon: bell; ratio: 2"></a>`;

  checkTag.addEventListener("click", () => {
    const medTakenUl = document.querySelector("ul.taken-medication");
    const medTakenLi = document.createElement("li");

    medTakenUl.append(medTakenLi);

    medLi.innerText = "";
    // console.log(prescription.medication.name);
    medTakenLi.innerText = prescription.medication_name;
  });

  const editATag = document.createElement("a");
  editATag.innerHTML = `<a class="edit-button" uk-icon="icon: pencil" uk-tooltip="Edit prescription" uk-toggle="target: #edit-prescription-container"></a>`;

  editPrescription.addEventListener("submit", () => {
    // debugger
    let med_frequency = event.target[0].value;
    let med_dose = event.target[1].value;
    let med_time_to_take = event.target[2].value;

    configObj = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        frequency: med_frequency,
        dose: med_dose,
        time_to_take: med_time_to_take,
      }),
    };
    fetch(url + prescription.id, configObj)
      .then((resp) => resp.json())
      .then((updatedPrescription) => dipslayPrescription(updatedPrescription));
    // .then((updatedPrescription) => console.log(updatedPrescription));

    editPrescription.reset();
    event.preventDefault;
  });

  const deleteATag = document.createElement("a");
  deleteATag.innerHTML = `<a class="delete-button" uk-icon="icon: trash" uk-tooltip="Delete prescription"></a>`;

  // Delete request - delete a prescription

  deleteATag.addEventListener("click", () => {
    console.log("Clicked");

    fetch(url + prescription.id, {
      method: "DELETE",
    });
    medLi.innerText = "";
  });

  medNamDiv.append(medNameP, medStrengthSpan, medTimeSpan, breakTag);
  medLi.append(medNamDiv, checkTag, editATag, deleteATag);

  medNamDiv.addEventListener("click", () => {
    const containerDiv = document.createElement("div");
    containerDiv.innerHTML = "";

    const polaroidDiv = document.createElement("div");
    polaroidDiv.className = "polaroid";

    const medNameTag = document.createElement("h3");
    const medImprintTag = document.createElement("h3");
    const medImage = document.createElement("img");
    medImage.className = "medication-image";

    medNameTag.innerText =
      "Name: " +
      prescription.medication_name +
      " " +
      prescription.medication_strength;
    medImprintTag.innerText = "Imprint: " + prescription.medication_imprint;

    medImage.src = prescription.medication_image;

    polaroidDiv.append(medImage, medImprintTag, medNameTag);
    containerDiv.append(polaroidDiv);
    medDetailDiv.append(containerDiv);
  });

  // Missed medications alert
  // var date = new Date();
  console.log(new Date().toLocaleTimeString());
  // console.log(new Date().getHours());
  // var timeString = date.toLocaleTimeString();
  // debugger;
  prsTime = prescription.time_to_take;
  console.log(prsTime);
  // console.log(timeString);

  if (2 > 3) {
    const headerInnerDiv = document.createElement("div");

    headerInnerDiv.innerHTML = `
      <div class="uk-card-header">
        <h3 class="uk-card-title" style="color: red;">Missed Medications</h3>
      </div>
      <div class="list-of-missed-medication uk-card-body">
        <h4>
          <ul id="missed-medication-ul" class="uk-list uk-list-striped"></ul>
        </h4>
      </div>`;
    divMissedMed.append(headerInnerDiv);

    const missedLi = document.createElement("li");
    missedLi.innerText = prescription.medication_name;
    missedUl.append(missedLi);
  }
}

// editPrescription.addEventListener("submit", () => {
//   console.log(prescription);
//   debugger;
//   let med_frequency = event.target[0].value;
//   let med_dose = event.target[1].value;
//   let med_time_to_take = event.target[2].value;

//   configObj = {
//     method: "PATCH",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       frequency: med_frequency,
//       dose: med_dose,
//       time_to_take: med_time_to_take,
//     }),
//   };
//   fetch(url + prescription.id, configObj)
//     .then((resp) => resp.json())
//     // .then(updatedPrescription => dipslayPrescription(updatedPrescription))
//     .then((updatedPrescription) => console.log(updatedPrescription));

//   // editPrescription.reset()

//   console.log(prescription);
//   event.preventDefault;
// });

// POST - add new prescription

prescriptionFormContainer.addEventListener("submit", () => {
  event.preventDefault;

  let medication_name = event.target[0].value;
  let medication_strength = event.target[1].value;
  let medication_imprint = event.target[2].value;
  let medication_precaution = event.target[3].value;
  let medication_category = event.target[4].value;
  let medication_image = event.target[5].value;
  let frequency = event.target[6].value;
  let dose = event.target[7].value;
  let time_to_take = event.target[8].value;

  configObj = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: 1,
      medication_name,
      medication_strength,
      medication_imprint,
      medication_precaution,
      medication_category,
      medication_image,
      frequency,
      dose,
      time_to_take,
    }),
  };
  fetch(url, configObj)
    .then((resp) => resp.json())
    .then((newPrescription) => dipslayPrescription(newPrescription));

  prescriptionFormContainer.reset();
});
