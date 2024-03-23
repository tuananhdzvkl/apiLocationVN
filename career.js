fetch('dataCareer.json')
    .then(response => response.json())
    .then(data => {
        const firstPreferenceSelect = document.getElementById('majors_name');
        const firstPreferenceMajorSelect = document.getElementById('faculties_name');
        const secondPreferenceSelect = document.getElementById('majors_name_1');
        const secondPreferenceMajorSelect = document.getElementById('faculties_name_1');

        // Function to create option element
        const createOption = (value, text) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = text;
            return option;
        };

        // Populate majors name select
        data.forEach(entry => {
            if (!firstPreferenceSelect.querySelector(`option[value="${entry.majors_name}"]`)) {
                firstPreferenceSelect.appendChild(createOption(entry.majors_name, entry.majors_name));
                secondPreferenceSelect.appendChild(createOption(entry.majors_name, entry.majors_name));
            }
        });

        // Function to populate faculties name select based on selected majors name
        const populateFacultiesName = (majorsSelect, facultiesSelect) => {
            const selectedMajorsName = majorsSelect.value;
            facultiesSelect.innerHTML = '';
            let isHidden = true;
            data.forEach(entry => {
                if (entry.majors_name === selectedMajorsName) {
                    facultiesSelect.appendChild(createOption(entry.faculties_name, entry.faculties_name));
                    if (isHidden) {
                        hideNganhLabel(facultiesSelect);
                        isHidden = false;
                    }
                } else if (!selectedMajorsName) { // Show only "Công nghệ thông tin" if no majors selected
                    if (entry.faculties_name === "Ngành") {
                        facultiesSelect.appendChild(createOption(entry.faculties_name, entry.faculties_name));
                        hideNganhLabel(facultiesSelect);
                        isHidden = false;
                    }
                }
            });
            facultiesSelect.disabled = false;
        };

      

        // Event listeners for majors name select
        firstPreferenceSelect.addEventListener('change', () => {
            populateFacultiesName(firstPreferenceSelect, firstPreferenceMajorSelect);
            // Auto select corresponding faculty
            const selectedMajorsName = firstPreferenceSelect.value;
            const correspondingFaculties = data.find(entry => entry.majors_name === selectedMajorsName)?.faculties_name;
            if (correspondingFaculties) {
                firstPreferenceMajorSelect.value = correspondingFaculties;
            }
        });

        secondPreferenceSelect.addEventListener('change', () => {
            populateFacultiesName(secondPreferenceSelect, secondPreferenceMajorSelect);
            // Auto select corresponding faculty
            const selectedMajorsName = secondPreferenceSelect.value;
            const correspondingFaculties = data.find(entry => entry.majors_name === selectedMajorsName)?.faculties_name;
            if (correspondingFaculties) {
                secondPreferenceMajorSelect.value = correspondingFaculties;
            }
        });

        // Define hideNganhLabel function
        const hideNganhLabel = (facultiesSelect) => {
            const nganhLabel = facultiesSelect.querySelector('option[value="Ngành"]');
            if (nganhLabel) {
                nganhLabel.style.display = 'none';
            }
        };

    });
