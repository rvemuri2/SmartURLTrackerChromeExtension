const btn = document.getElementById("input-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
const ul = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads);
}

tabBtn.addEventListener("click", function () {
  // Save the url instead of logging it out
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  });
});
function renderLeads(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
          <a target='_blank' href="${leads[i]}">
              ${leads[i]}
          </a>
      </li>
  `;

    //const li = document.createElement("li")
    //li.textContent = myLeads[i]
    //ulEl.append(li)
  }
  ul.innerHTML = listItems;
}
deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
});
btn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads(myLeads);
});
