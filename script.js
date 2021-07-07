var req = new XMLHttpRequest();
req.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
  true
);
req.send();
req.onload = function () {
  var data = JSON.parse(this.response);
  console.log(data);

  var table = document.createElement("table");
  table.className = "table table-striped";
  document.body.append(table);

  var thead = document.createElement("thead");
  table.append(thead);
  createRowelement(thead, "th", "col", ["ID", "Name", "Email"]);

  var max_data_in_a_page = 10;
  var total_no_of_pages = data.length / max_data_in_a_page;

  var page_container = document.createElement("div");
  page_container.className = "btn-group d-flex flex-row bd-highlight mb-3";
  document.body.append(page_container);

  var first = document.createElement("button");
  first.className = "btn btn-outline-primary btn-lg p-2 bd-highlight";
  first.innerText = "First";
  page_container.append(first);

  var prev = document.createElement("button");
  prev.className = "btn btn-outline-primary btn-lg p-2 bd-highlight";
  prev.innerText = "Previous";
  page_container.append(prev);

  for (let p = 0; p < total_no_of_pages; p++) {
    var page = document.createElement("button");
    page.className = "btn btn-outline-primary btn-lg p-2 bd-highlight";
    var id = "page" + p;
    page.setAttribute("id", id);
    page.innerText = p + 1;
    page_container.append(page);
  }

  printTable(); //initially when page is loaded and any botton isn't clicked

  buttons = document.getElementsByClassName("btn");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function (e) {
      if (this.textContent === "First") {
        page = 1;
        pageClick(1);
      } else if (this.textContent === "Previous") {
        if (page != 1) {
          page = page - 1;
          pageClick(page);
        }
      } else {
        page = +this.textContent;
        pageClick(+this.textContent);
      }
    };
  }

  function pageClick(page_no) {
    var start = page_no * 10 - 10;
    var end = page_no * 10 > data.length ? data.length : page_no * 10;
    if (document.getElementById("tbody"))
      document.getElementById("tbody").remove();
    printTable(start, end);
  }

  function printTable(start = 0, end = 10) {
    var tbody = document.createElement("tbody");
    tbody.id = "tbody";
    table.appendChild(tbody);
    for (let j = start; j < end; j++) {
      createRowelement(tbody, "td", "", [
        data[j].id,
        data[j].name,
        data[j].email,
      ]);
    }
  }

  function createRowelement(attachTo, ele, scope, data) {
    var row = document.createElement("tr");
    attachTo.append(row);
    for (let i = 0; i < 3; i++) {
      var elem = document.createElement(ele);
      elem.setAttribute("scope", scope);
      elem.innerHTML = data[i];
      row.append(elem);
    }
  }
};



    



