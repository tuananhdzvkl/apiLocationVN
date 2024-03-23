fetch('https://raw.githubusercontent.com/tuananhdzvkl/apiLocationVN/main/dataLocation.json')
    .then(response => response.json())
    .then(data => {
        const provinceSelect1 = document.getElementById('province_codename_1');
        const districtSelect1 = document.getElementById('district_codename_1');
        const wardSelect1 = document.getElementById('ward_codename_1');
        const provinceSelect2 = document.getElementById('province_codename_2');
        const districtSelect2 = document.getElementById('district_codename_2');
        const wardSelect2 = document.getElementById('ward_codename_2');

        // Function to create option element
        const createOption = (value, text) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = text;
            return option;
        };

        // Populate province select
        data.forEach(entry => {
            if (!provinceSelect1.querySelector(`option[value="${entry.province_codename}"]`)) {
                provinceSelect1.appendChild(createOption(entry.province_codename, entry.province_name));
                provinceSelect2.appendChild(createOption(entry.province_codename, entry.province_name));
            }
        });

        // Function to populate district select based on selected province
        const populateDistrict = (provinceSelect, districtSelect) => {
            const selectedProvinceCodename = provinceSelect.value;
            districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';
            data.forEach(entry => {
                if (entry.province_codename === selectedProvinceCodename) {
                    if (!districtSelect.querySelector(`option[value="${entry.district_codename}"]`)) {
                        districtSelect.appendChild(createOption(entry.district_codename, entry.district_name));
                    }
                }
            });
            districtSelect.disabled = false;
            wardSelect.innerHTML = '<option value="">Phường/Xã/Thị Trấn</option>';
            wardSelect.disabled = true;
        };

        // Event listeners for province select
        provinceSelect1.addEventListener('change', () => {
            populateDistrict(provinceSelect1, districtSelect1);
        });

        provinceSelect2.addEventListener('change', () => {
            populateDistrict(provinceSelect2, districtSelect2);
        });

        // Function to populate ward select based on selected district
        const populateWard = (districtSelect, wardSelect) => {
            const selectedDistrictCodename = districtSelect.value;
            wardSelect.innerHTML = '<option value="">Chọn xã/phường/thị trấn</option>';
            data.forEach(entry => {
                if (entry.district_codename === selectedDistrictCodename) {
                    if (!wardSelect.querySelector(`option[value="${entry.ward_codename}"]`)) {
                        wardSelect.appendChild(createOption(entry.ward_codename, entry.ward_name));
                    }
                }
            });
            wardSelect.disabled = false;
        };

        // Event listeners for district select
        districtSelect1.addEventListener('change', () => {
            populateWard(districtSelect1, wardSelect1);
        });

        districtSelect2.addEventListener('change', () => {
            populateWard(districtSelect2, wardSelect2);
        });
    })
    .catch(error => {
        console.error('Error fetching or parsing data: ', error);
    });
