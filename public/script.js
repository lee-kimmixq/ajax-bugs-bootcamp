const createContainer = (conId, conColour) => {
  const newDiv = document.createElement('div');
  newDiv.id = conId;
  newDiv.style.backgroundColor = conColour;
  document.body.appendChild(newDiv);
  return newDiv;
};

const createLabel = (labelFor, labelText) => {
  const newLabel = document.createElement('label');
  newLabel.for = labelFor;
  newLabel.innerText = labelText;
  return newLabel;
};

const createInput = (inputType, inputId, inputName, inputValue, inputRequired) => {
  const newInput = document.createElement('input');
  newInput.type = inputType;
  newInput.id = inputId;
  newInput.name = inputName;
  newInput.value = inputValue;
  newInput.required = inputRequired;
  return newInput;
};

const createButton = (btnId, btnText, btnCallback) => {
  const newBtn = document.createElement('button');
  newBtn.id = btnId;
  newBtn.innerText = btnText;
  newBtn.addEventListener('click', btnCallback);
  return newBtn;
};

// ============================= BUG LIST ===================================

const renderBugListData = async () => {
  const bugDataDiv = document.querySelector('#bug-data-container');
  const sortBtn = document.querySelector('#sort-btn');
  const sortBy = sortBtn.classList.contains('sort-by-date') ? 'feature' : 'date';

  bugDataDiv.innerText = '';

  axios
    .get(`/bugs?sort=${sortBy}`)
    .then((res) => {
      // populate bug data
      res.data.forEach(({
        problem, errorText, commit, feature,
      }, idx) => {
        const bug = document.createElement('p');
        bug.innerText = `${idx + 1}) Problem: ${problem}, Error: ${errorText} , Commit: ${commit}, Feature: ${feature.name}`;
        bugDataDiv.appendChild(bug);
      });
    })
    .catch((err) => { console.log(err); });
};

const createBugList = async () => {
  const bugListDiv = document.querySelector('#bug-list-container');

  // create header
  const bugListHeader = document.createElement('h4');
  bugListHeader.innerText = 'Reported Bugs';
  bugListDiv.appendChild(bugListHeader);

  // create sort button
  const sortBtn = createButton('sort-btn', 'Sort by Feature', (event) => {
    event.target.classList.toggle('sort-by-date');
    const btnText = event.target.classList.contains('sort-by-date') ? 'Sort by Feature' : 'Sort by Date';
    event.target.innerText = btnText;
    renderBugListData();
  });
  bugListDiv.appendChild(sortBtn);

  bugListDiv.appendChild(createContainer('bug-data-container'));
  renderBugListData();
};

// ============================= BUG FORM ===================================

const getBugInputData = () => {
  const problem = document.querySelector('#problem').value;
  const error = document.querySelector('#error').value;
  const commit = document.querySelector('#commit').value;
  const feature = document.querySelector("input[name='features']:checked").value;

  return {
    problem, error, commit, feature,
  };
};

const postBug = () => {
  axios
    .post('/', getBugInputData())
    .then(() => {
      const bugListDiv = document.querySelector('#bug-list-container');

      // clear form data
      document.querySelector('#problem').value = '';
      document.querySelector('#error').value = '';
      document.querySelector('#commit').value = '';
      document.querySelector("input[name='features']:checked").checked = false;

      // refresh bug list
      bugListDiv.innerHTML = '';
      renderBugList();

      console.log('bug created');
    })
    .catch((err) => { console.log(err); });
};

const createBugForm = () => {
  axios
    .get('/features')
    .then((res) => {
      const bugDiv = document.querySelector('#bug-form-container');

      // create inputs
      ['problem', 'error', 'commit'].forEach((field) => {
        const fieldDiv = document.createElement('div');
        bugDiv.appendChild(fieldDiv);
        fieldDiv.appendChild(createLabel(field, field));
        const fieldRequired = field === 'problem';
        fieldDiv.appendChild(createInput('text', field, field, '', fieldRequired));
      });

      // create radio buttons for features
      res.data.forEach(({ name }) => {
        bugDiv.appendChild(createInput('radio', name, 'features', name, true));
        bugDiv.appendChild(createLabel(name, name));
      });

      // create submit button
      bugDiv.appendChild(createButton('submit', 'Report Bug', postBug));
    })
    .catch((err) => { console.log(err); });
};

// ============================= FEATURE ===================================

const getFeatureInputData = () => {
  const featureName = document.querySelector('#feature').value;
  return { name: featureName };
};

const postFeature = () => {
  axios
    .post('/features', getFeatureInputData())
    .then(() => {
      const bugDiv = document.querySelector('#bug-form-container');

      // clear form data
      document.querySelector('#feature').value = '';

      // refresh bug form
      bugDiv.innerHTML = '';
      createBugForm();

      console.log('feature created');
    })
    .catch((err) => { console.log(err); });
};

const createFeatureForm = () => {
  const featureDiv = document.querySelector('#feature-form-container');

  // create input
  featureDiv.appendChild(createLabel('feature', 'feature'));
  featureDiv.appendChild(createInput('text', 'feature', 'feature', ''));

  // create submit button
  featureDiv.appendChild(createButton('submit', 'Create New Feature', postFeature));
};

// ============================= MAIN ===================================

const main = () => {
  createContainer('bug-form-container', 'rgb(197,197,197)');
  createContainer('bug-list-container', 'rgb(255,255,224)');
  createContainer('feature-form-container', 'rgb(173,216,230)');
  createBugForm();
  createBugList();
  createFeatureForm();
};

main();
