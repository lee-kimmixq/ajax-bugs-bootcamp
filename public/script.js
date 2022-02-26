// ============================= CONTAINERS ===================================

const createContainers = () => {
  const bugDiv = document.createElement('div');
  bugDiv.id = 'bug-form-container';
  bugDiv.style.backgroundColor = 'rgb(197,197,197)';
  document.body.appendChild(bugDiv);

  const bugListDiv = document.createElement('div');
  bugListDiv.id = 'bug-list-container';
  bugListDiv.style.backgroundColor = 'rgb(255,255,224)';
  document.body.appendChild(bugListDiv);

  const featureDiv = document.createElement('div');
  featureDiv.id = 'feature-form-container';
  featureDiv.style.backgroundColor = 'rgb(173,216,230)';
  document.body.appendChild(featureDiv);
};

// ============================= BUG LIST ===================================

const renderBugList = async () => {
  const bugListDiv = document.querySelector('#bug-list-container');

  axios
    .get('/bugs')
    .then((res) => {
      console.log(res);
      const bugListHeader = document.createElement('h4');
      bugListHeader.innerText = 'Reported Bugs';
      bugListDiv.appendChild(bugListHeader);

      // why cannot get errorText
      res.data.forEach(({
        problem, error_text, commit, feature,
      }, idx) => {
        const bug = document.createElement('p');
        bug.innerText = `${idx + 1}) Problem: ${problem}, Error: ${error_text} , Commit: ${commit}, Feature: ${feature.name}`;
        bugListDiv.appendChild(bug);
      });
    })
    .catch((err) => { console.log(err); });
};

// ============================= BUG ===================================
const getBugData = () => {
  const problem = document.querySelector('#problem').value;
  const error = document.querySelector('#error').value;
  const commit = document.querySelector('#commit').value;
  const feature = document.querySelector("input[name='features']:checked").value;

  return {
    problem, error, commit, feature,
  };
};

const postBug = (data) => {
  const bugListDiv = document.querySelector('#bug-list-container');

  axios
    .post('/', data)
    .then(() => {
      document.querySelector('#problem').value = '';
      document.querySelector('#error').value = '';
      document.querySelector('#commit').value = '';
      document.querySelector("input[name='features']:checked").checked = false;
      bugListDiv.innerHTML = '';
      renderBugList();
      console.log('bug created');
    })
    .catch((err) => { console.log(err); });
};

const createBugForm = () => {
  const bugDiv = document.querySelector('#bug-form-container');

  axios
    .get('/features')
    .then((res) => {
      const inputsDiv = document.createElement('div');
      bugDiv.appendChild(inputsDiv);

      const inputs = ['problem', 'error', 'commit'];
      inputs.forEach((field) => {
        const fieldDiv = document.createElement('div');
        bugDiv.appendChild(fieldDiv);

        const label = document.createElement('label');
        label.for = field;
        label.innerText = field;
        fieldDiv.appendChild(label);

        const input = document.createElement('input');
        input.id = field;
        input.name = field;
        input.type = 'text';
        fieldDiv.appendChild(input);
      });

      const featuresDiv = document.createElement('div');
      bugDiv.appendChild(featuresDiv);
      res.data.forEach(({ name }) => {
        const input = document.createElement('input');
        input.id = name;
        input.value = name;
        input.name = 'features';
        input.type = 'radio';
        featuresDiv.appendChild(input);

        const label = document.createElement('label');
        label.for = name;
        label.innerText = name;
        featuresDiv.appendChild(label);
      });

      const submitBtn = document.createElement('button');
      submitBtn.id = 'submit';
      submitBtn.innerText = 'Report Bug';
      submitBtn.addEventListener('click', () => {
        postBug(getBugData());
      });
      bugDiv.appendChild(submitBtn);
    })
    .catch((err) => { console.log(err); });
};

// ============================= FEATURE ===================================

const getFeatureData = () => {
  const featureName = document.querySelector('#feature').value;
  return { name: featureName };
};

const postFeature = (data) => {
  const bugDiv = document.querySelector('#bug-form-container');

  axios
    .post('/features', data)
    .then(() => {
      document.querySelector('#feature').value = '';
      bugDiv.innerHTML = '';
      createBugForm();
      console.log('feature created');
    })
    .catch((err) => { console.log(err); });
};

const createFeatureForm = () => {
  const featureDiv = document.querySelector('#feature-form-container');

  const fieldDiv = document.createElement('div');
  featureDiv.appendChild(fieldDiv);

  const label = document.createElement('label');
  label.for = 'feature';
  label.innerText = 'feature';
  fieldDiv.appendChild(label);

  const input = document.createElement('input');
  input.id = 'feature';
  input.name = 'feature';
  input.type = 'text';
  fieldDiv.appendChild(input);

  const submitBtn = document.createElement('button');
  submitBtn.id = 'submit';
  submitBtn.innerText = 'Create New Feature';
  submitBtn.addEventListener('click', () => {
    postFeature(getFeatureData());
  });
  featureDiv.appendChild(submitBtn);
};

const main = () => {
  createContainers();
  createBugForm();
  renderBugList();
  createFeatureForm();
};

main();
