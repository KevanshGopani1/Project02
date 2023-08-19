const sname = document.querySelector(".name");
const semail = document.querySelector(".email");
const sgpa = document.querySelector(".gpa");
const sage = document.querySelector(".age");
const sdegree = document.querySelector(".degree");
const sbutton = document.querySelector(".button");
const table = document.querySelector(".tbody");
const error = document.querySelector(".error");
const editButton = document.querySelector(".btn");
const search = document.querySelector(".search");

let student = localStorage.getItem("student");
student = JSON.parse(student);
if (!student) {
  student = [];
}

const clickOnAddStudent = () => {
  addValue();
};

let index = 1;
const getId = () => {
  if (student?.length) {
    let temp = student[student?.length - 1];
    if (temp?.id) {
      return temp.id + 1;
    }
  }
  return index++;
};

const reset = () => {
  sname.value = "";
  sgpa.value = "";
  semail.value = "";
  sage.value = "";
  sdegree.value = "";
};

const addValue = () => {
  let value = getValue();
  if (value) {
    student.push(value);
    tableData(student);
    reset();
  }

  localStorage.setItem("student", JSON.stringify(student));
};

const getValue = () => {
  const name = sname.value;
  const gpa = sgpa.value;
  const email = semail.value;
  const age = sage.value;
  const degree = sdegree.value;
  const id = getId();

  if (!(name && gpa && email && age && degree)) {
    let error1 = "All Fields Are Required";
    return (error.innerHTML = error1);
  } else {
    error.innerHTML = "";
  }

  const data = {
    id,
    name,
    email,
    gpa,
    age,
    degree,
  };
  return data;
};

const onClickEdit = (id) => {
  sbutton.remove();
  editButton.innerHTML = `
    <button class="button editStudent"
    onclick="clickOnEditStudent(${id})">
    Edit Student
  </button>
    `;

  let stud = student.find((e) => {
    return e.id === id;
  });

  if (stud) {
    sname.value = stud.name;
    semail.value = stud.email;
    sgpa.value = stud.gpa;
    sage.value = stud.age;
    sdegree.value = stud.degree;
  }
};

const onClickDelete = (id) => {
  let findIndex = student.findIndex((x) => x.id === id);
  if (findIndex > -1) {
    student.splice(findIndex, 1);
  }
  localStorage.setItem("student", JSON.stringify(student));
  tableData(student);
};

const tableData = (student) => {
  if (student?.length) {
    let info = "";
    for (let data of student) {
      info += `
              <tr id=${data.id}>
              <td>${data.id}</td>
              <td>${data.name}</td>
              <td>${data.email}</td>
              <td>${data.age}</td>
              <td>${data.gpa}</td>
              <td>
                <div class="edit-delete">
                  <div>${data.degree}</div>
                  <div class="button2">
                    <button onclick="onClickEdit(${data.id})" class="edit">Edit</button>
                    <button onclick="onClickDelete(${data.id})" class="delete">
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
                `;
    }
    table.innerHTML = info;
  }
};
tableData(student);
const clickOnEditStudent = (id) => {
  let updatedData = getValue();
  updatedData.id = id;
  let findIndex = student.findIndex((x) => x.id === id);
  if (findIndex > -1) {
    student[findIndex] = updatedData;
  }
  tableData(student);
  reset();
  localStorage.setItem("student", JSON.stringify(student));
};

let searchInfo = search.value;

const searchData = (searchInfo) => {
  let temp = student.filter(
    (x) =>
      x.name.includes(searchInfo) ||
      x.email.includes(searchInfo) ||
      x.degree.includes(searchInfo)
  );

  tableData(temp);
};
