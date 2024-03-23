window.onload = function() {
    var form = document.querySelector('form');
    var errorLabels = document.querySelectorAll('.error');
    var submitted = false; // Biến cờ để theo dõi việc người dùng đã ấn submit hay chưa
    hideAddressFields();
    // Ẩn tất cả label lỗi khi trang được tải
    errorLabels.forEach(function(label) {
        label.style.display = "none";
    });

    // Gắn sự kiện 'input' cho mỗi input
    var inputs = document.querySelectorAll('input');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            // Chỉ kiểm tra nếu người dùng đã ấn submit trước đó
            if (submitted) {
                // Giả sử mỗi input có một id và label lỗi có id tương ứng nhưng kết thúc bằng '-error'
                var errorLabelId = input.id + '-error';
                var errorLabel = document.getElementById(errorLabelId);
                if (errorLabel) {
                    errorLabel.style.display = input.value.trim() === "" ? "block" : "none";
                }
            }
        });
    });

    

    form.addEventListener('submit', function(event) {
        var inputs = document.querySelectorAll('input.large, select.large, #input_32_42, #input_32_43, #input_32_12');
        var errors = document.querySelectorAll('.error');
        submitted = true; // Đặt biến cờ thành true khi người dùng ấn submit
        var valid = true;

        var checkboxGroups = [
            { id: '#input_32_31', labelId: 'checkRecceiver-error' },
            { id: '#input_32_32', labelId: 'checkAddress-error' },
            { id: '#field_32_39', labelId: 'cam_ket_xac_nhan-error' },
            { id: '#field_32_41', labelId: 'cam_ket_tai_chinh-error' }
        ];

        checkboxGroups.forEach(function(group) {
            var checkboxes = document.querySelectorAll(group.id + ' input[type="checkbox"]');
            var checked = false;
            checkboxes.forEach(function(checkbox) {
                if (checkbox.checked) {
                    checked = true;
                }
            });
            var errorLabel = document.getElementById(group.labelId);
            if (!checked) {
                errorLabel.style.display = "block";
                valid = false;
            } else {
                errorLabel.style.display = "none";
            }
        });

    // Validate ảnh CMND/CCCD mặt trước
    var img42Input = document.getElementById('input_32_42');
    var img42ErrorLabel = document.getElementById('input_32_42-error');
    if (!img42Input.files || img42Input.files.length === 0) {
        img42ErrorLabel.style.display = "block";
        valid = false;
    } else {
        var img42FileType = img42Input.files[0].type;
        if (img42FileType !== 'image/jpeg' && img42FileType !== 'image/jpg' && img42FileType !== 'image/png') {
            img42ErrorLabel.innerText = "File không đúng định dạng ảnh (.jpg, .jpeg, .png,...)";
            img42ErrorLabel.style.display = "block";
            valid = false;
        } else {
            img42ErrorLabel.style.display = "none";
        }
    }
    // Lắng nghe sự kiện change của input file ảnh CMND/CCCD mặt trước
    img42Input.addEventListener('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
  
        reader.onload = function(e) {
            var imgPreview = document.getElementById('img_preview_32_42');
            imgPreview.srcset = e.target.result;
        };
  
        // Đọc file dưới dạng URL data
        reader.readAsDataURL(file);
    });
    

    // Validate ảnh CMND/CCCD mặt sau
    var img43Input = document.getElementById('input_32_43');
    var img43ErrorLabel = document.getElementById('input_32_43-error');
    if (!img43Input.files || img43Input.files.length === 0) {
        img43ErrorLabel.style.display = "block";
        valid = false;
    } else {
        var img43FileType = img43Input.files[0].type;
        if (img43FileType !== 'image/jpeg' && img43FileType !== 'image/jpg' && img43FileType !== 'image/png') {
            img43ErrorLabel.innerText = "File không đúng định dạng ảnh (.jpg, .jpeg, .png,...)";
            img43ErrorLabel.style.display = "block";
            valid = false;
        } else {
            img43ErrorLabel.style.display = "none";
        }
    }

    // Lắng nghe sự kiện change của input file ảnh CMND/CCCD mặt sau
    img43Input.addEventListener('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var imgPreview = document.getElementById('img_preview_32_43');
            imgPreview.srcset = e.target.result;
        };

        // Đọc file dưới dạng URL data
        reader.readAsDataURL(file);
    });

    // Validate ảnh tốt nghiệp
    var img44Input = document.getElementById('input_32_44');
    var img44ErrorLabel = document.getElementById('input_32_44-error');
    if (!img44Input.files || img44Input.files.length === 0) {
        img44ErrorLabel.style.display = "block";
        valid = false;
    } else {
        var img44FileType = img44Input.files[0].type;
        if (img44FileType !== 'image/jpeg' && img44FileType !== 'image/jpg' && img44FileType !== 'image/png') {
            img44ErrorLabel.innerText = "File không đúng định dạng ảnh (.jpg, .jpeg, .png,...)";
            img44ErrorLabel.style.display = "block";
            valid = false;
        }
    }

    // Lắng nghe sự kiện change của input file ảnh tốt nghiệp
    img44Input.addEventListener('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var imgPreview = document.getElementById('img_preview_32_44');
            imgPreview.srcset = e.target.result;
        };

        // Đọc file dưới dạng URL data
        reader.readAsDataURL(file);
    });



  
        // Kiểm tra các trường input khác
        for (var i = 0; i < inputs.length; i++) {
            errors[i].style.display = "none";
            inputs[i].setAttribute('aria-invalid', 'false');

            if (inputs[i].value.trim() === "") {
                errors[i].style.display = "block";
                inputs[i].setAttribute('aria-invalid', 'true');
                valid = false;
            } else if ((inputs[i].id === 'input_32_2' || inputs[i].id === 'input_32_7') && !isValidDate(inputs[i].value)) {
                errors[i].innerText = "Ngày sinh không hợp lệ (DD/MM/YYYY)";
                errors[i].style.display = "block";
                inputs[i].setAttribute('aria-invalid', 'true');
                valid = false;
            } else if (inputs[i].id === 'input_32_6' && !isValidCCCD(inputs[i].value)) {
                errors[i].innerText = "Số CCCD/CMND phải có 9 hoặc 12 số và là số tự nhiên";
                errors[i].style.display = "block";
                inputs[i].setAttribute('aria-invalid', 'true');
                valid = false;
            } else if (inputs[i].id === 'input_32_14' || inputs[i].id === 'input_32_17') {
                // Kiểm tra số điện thoại
                if (!isValidPhoneNumber(inputs[i].value)) {
                    if (inputs[i].id === 'input_32_14') {
                        errors[i].innerText = "Số điện thoại thí sinh phải có 10 số và là số tự nhiên";
                    } else if (inputs[i].id === 'input_32_17') {
                        errors[i].innerText = "Số điện thoại phụ huynh/người bảo trợ phải có 10 số và là số tự nhiên";
                    }
                    errors[i].style.display = "block";
                    inputs[i].setAttribute('aria-invalid', 'true');
                    valid = false;
                }
            }
        }


        if (!valid) {
            event.preventDefault();
        }
    });
// Hàm kiểm tra định dạng ngày tháng
function isValidDate(dateString) {
    var regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!regex.test(dateString)) {
        return false;
    }
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        return false;
    }
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }
    return day > 0 && day <= monthLength[month - 1];
}

// Sự kiện khi rời khỏi ô nhập ngày
function onDateBlur(event) {
    var input = event.target;
    var dateString = input.value;

    // Kiểm tra định dạng ngày tháng
    if (isValidDate(dateString)) {
        // Nếu định dạng hợp lệ và không có dấu '/', thêm dấu '/'
        if (dateString.indexOf('/') === -1) {
            input.value = dateString.slice(0, 2) + '/' + dateString.slice(2, 4) + '/' + dateString.slice(4);
        }
    }
}

// Lắng nghe sự kiện khi rời khỏi ô nhập ngày trên input có id là "dateInput"
var dateInput = document.getElementById('dateInput');
dateInput.addEventListener('blur', onDateBlur);

// Sự kiện khi nhập ngày
function onDateInput(event) {
    var input = event.target;
    var key = event.key;

    // Nếu người dùng nhấn phím '/' và ngày tháng đã đủ dài, tự động thêm dấu '/'
    if (key === '/' && input.value.length === 2) {
        input.value += '/';
    }
}

// Lắng nghe sự kiện khi nhập ngày trên input có id là "dateInput"
var dateInput = document.getElementById('dateInput');
dateInput.addEventListener('keypress', onDateInput);


    // Hàm kiểm tra số CCCD/CMND
    function isValidCCCD(cccdString) {
        // Kiểm tra xem chuỗi chỉ chứa các chữ số và có độ dài là 9 hoặc 12
        var regex = /^(?:\d{9}|\d{12})$/;
        if (!regex.test(cccdString)) {
            return false; // Không phải là số CCCD/CMND hợp lệ
        }

        // Kiểm tra xem chuỗi có chứa ký tự khác số không
        var numericValue = parseInt(cccdString, 10);
        if (isNaN(numericValue)) {
            return false; // Chuỗi chứa ký tự không phải số
        }

        // Kiểm tra xem số CCCD/CMND có dương không
        if (numericValue <= 0) {
            return false; // Số CCCD/CMND phải là số tự nhiên (dương)
        }
        return true;
    }
    // Hàm kiểm tra số điện thoại
    function isValidPhoneNumber(phoneNumber) {
        // Kiểm tra xem số điện thoại chỉ chứa các chữ số và có độ dài là 10
        var regex = /^\d{10}$/;
        return regex.test(phoneNumber);
    }

};

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("gform_32");
    
    // Lưu trữ thông tin về select và nhãn lỗi của select thứ nhất
    const provinceSelectInfo = {
        select: document.getElementById("province_codename_1"),
        errorLabel: document.getElementById("input_32_10-error")
    };
    const districtSelectInfo = {
        select: document.getElementById("district_codename_1"),
        errorLabel: document.getElementById("input_32_11-error")
    };
    const wardSelectInfo = {
        select: document.getElementById("ward_codename_1"),
        errorLabel: document.getElementById("input_32_12-error")
    };

    // Lưu trữ thông tin về select và nhãn lỗi của select thứ hai
    const provinceSelect2Info = {
        select: document.getElementById("province_codename_2"),
        errorLabel: document.getElementById("input_32_27-error")
    };
    const districtSelect2Info = {
        select: document.getElementById("district_codename_2"),
        errorLabel: document.getElementById("input_32_28-error")
    };
    const wardSelect2Info = {
        select: document.getElementById("ward_codename_2"),
        errorLabel: document.getElementById("input_32_29-error")
    };
    const firstChoiceInfo = {
        select: document.getElementById("majors_name"),
        errorLabel: document.getElementById("input_32_20-error")
    };

    // Hàm để kiểm tra và ẩn hiện nhãn lỗi khi người dùng thay đổi giá trị trong select
    function handleSelectChange(selectInfo) {
        if (selectInfo.select.value !== "") {
            selectInfo.errorLabel.style.display = "none";
        }
    }

    // Thêm sự kiện change cho select thứ nhất
    provinceSelectInfo.select.addEventListener("change", function() {
        handleSelectChange(provinceSelectInfo);
    });
    districtSelectInfo.select.addEventListener("change", function() {
        handleSelectChange(districtSelectInfo);
    });
    wardSelectInfo.select.addEventListener("change", function() {
        handleSelectChange(wardSelectInfo);
    });
    firstChoiceInfo.select.addEventListener("change", function() {
        handleSelectChange(firstChoiceInfo);
    });

    // Thêm sự kiện change cho select thứ hai
    provinceSelect2Info.select.addEventListener("change", function() {
        handleSelectChange(provinceSelect2Info);
    });
    districtSelect2Info.select.addEventListener("change", function() {
        handleSelectChange(districtSelect2Info);
    });
    wardSelect2Info.select.addEventListener("change", function() {
        handleSelectChange(wardSelect2Info);
    });

    // Xử lý sự kiện submit form
    form.addEventListener("submit", function(event) {
        if (provinceSelectInfo.select.value === "") {
            event.preventDefault();
            provinceSelectInfo.errorLabel.style.display = "block";
        } else {
            provinceSelectInfo.errorLabel.style.display = "none";
        }

        if (districtSelectInfo.select.value === "") {
            event.preventDefault();
            districtSelectInfo.errorLabel.style.display = "block";
        } else {
            districtSelectInfo.errorLabel.style.display = "none";
        }

        if (wardSelectInfo.select.value === "") {
            event.preventDefault();
            wardSelectInfo.errorLabel.style.display = "block";
        } else {
            wardSelectInfo.errorLabel.style.display = "none";
        }

        if (provinceSelect2Info.select.value === "") {
            event.preventDefault();
            provinceSelect2Info.errorLabel.style.display = "block";
        } else {
            provinceSelect2Info.errorLabel.style.display = "none";
        }

        if (districtSelect2Info.select.value === "") {
            event.preventDefault();
            districtSelect2Info.errorLabel.style.display = "block";
        } else {
            districtSelect2Info.errorLabel.style.display = "none";
        }

        if (wardSelect2Info.select.value === "") {
            event.preventDefault();
            wardSelect2Info.errorLabel.style.display = "block";
        } else {
            wardSelect2Info.errorLabel.style.display = "none";
        }
        if(firstChoiceInfo.select.value === ""){
            event.preventDefault();
            firstChoiceInfo.errorLabel.style.display = "block";
        } else {
            firstChoiceInfo.errorLabel.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var checkboxes1 = document.querySelectorAll('#field_32_31 input[type="checkbox"]');
    var checkboxes2 = document.querySelectorAll('#field_32_32 input[type="checkbox"]');
    
    checkboxes1.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                checkboxes1.forEach(function(otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

    checkboxes2.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                checkboxes2.forEach(function(otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

    // Thêm sự kiện cho ô checkbox "Khác"
    var checkboxKhac = document.getElementById("choice_32_32_2");
    checkboxKhac.addEventListener('change', function() {
        if (this.checked) {
            hienThiInput();
        } else {
            hideAddressFields();
        }
    });

    // Thêm sự kiện cho nút Xóa
    var xoaButton = document.getElementById("xoaDiaChiKhac");
    xoaButton.addEventListener('click', function() {
        hideAddressFields();
    });
});

// Hàm này ẩn các trường địa chỉ
function hideAddressFields() {
    document.getElementById("diaChiHienThi").style.display = "none";
    document.getElementById("inputDiaChiKhac").style.display = "none";
    document.getElementById("luuDiaChiKhac").style.display = "none";
    document.getElementById("xoaDiaChiKhac").style.display = "none";
}

// Hàm này được gọi khi người dùng chọn ô khác
function hienThiInput() {
    // Hiển thị các trường địa chỉ khác
    document.getElementById("inputDiaChiKhac").style.display = "inline-block";
    document.getElementById("luuDiaChiKhac").style.display = "inline-block";
    document.getElementById("xoaDiaChiKhac").style.display = "inline-block";

     // Thêm sự kiện cho nút Xóa "xoaDiaChiKhac"
     var xoaDiaChiButton = document.getElementById('xoaDiaChiKhac');
     xoaDiaChiButton.addEventListener('click', function() {
         // Hiển thị lại ô nhập, nút Lưu và nút Xóa
         document.getElementById("inputDiaChiKhac").style.display = "inline-block";
         document.getElementById("luuDiaChiKhac").style.display = "inline-block";
         document.getElementById("xoaDiaChiKhac").style.display = "inline-block";
         // Xóa nội dung đã nhập và ẩn kết quả địa chỉ
         var displayArea = document.getElementById("diaChiHienThi");
         if (displayArea) {
             displayArea.textContent = ""; // Xóa nội dung
             displayArea.style.display = "none"; // Ẩn kết quả
         }
     });
}

// Hàm này được gọi khi người dùng chọn ô địa chỉ thường trú
function hienThiInputThuongTru() {
    // Ẩn các trường địa chỉ khác
    hideAddressFields();
}

function luuDiaChiKhac() {
    var diaChiInput = document.getElementById("inputDiaChiKhac").value;
    var displayArea = document.getElementById("diaChiHienThi");

    // Kiểm tra nếu chưa có span hiển thị địa chỉ, tạo mới
    if (!displayArea) {
        displayArea = document.createElement("span");
        displayArea.id = "diaChiHienThi";
        var container = document.getElementById("choice_32_32_2").parentNode;
        container.appendChild(displayArea); // Đặt span sau ô input
    }

    // Cập nhật nội dung và hiển thị địa chỉ
    displayArea.textContent = '(' + diaChiInput + ')';
    displayArea.style.display = "inline"; // Hiển thị kết quả

    // Ẩn ô nhập và nút Lưu, chỉ hiển thị nút Xóa
    document.getElementById("inputDiaChiKhac").style.display = "none";
    document.getElementById("luuDiaChiKhac").style.display = "none";
    document.getElementById("xoaDiaChiKhac").style.display = "inline-block";
}   

function xoaDiaChiKhac() {
    // Xóa nội dung đã nhập và ẩn kết quả địa chỉ
    var displayArea = document.getElementById("diaChiHienThi");
    if (displayArea) {
        displayArea.textContent = ""; // Xóa nội dung
        displayArea.style.display = "none"; // Ẩn kết quả
    }

    // Hiển thị lại ô nhập, nút Lưu và nút Xóa
    document.getElementById("inputDiaChiKhac").style.display = "inline-block";
    document.getElementById("luuDiaChiKhac").style.display = "inline-block";
    document.getElementById("xoaDiaChiKhac").style.display = "inline-block"; // Ẩn nút Xóa vì không cần thiết khi không có địa chỉ hiển thị
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("gform_32");

    // Lưu trữ thông tin về các checkbox
    const checkboxesInfo = [
        {
            checkboxes: document.querySelectorAll("#input_32_31 input[type='checkbox']"),
            errorLabel: document.getElementById("checkRecceiver-error"),
            hasError: false // Biến để theo dõi trạng thái lỗi
        },
        {
            checkboxes: document.querySelectorAll("#input_32_32 input[type='checkbox']"),
            errorLabel: document.getElementById("checkAddress-error"),
            otherInput: document.getElementById("inputDiaChiKhac"),
            hasError: false // Biến để theo dõi trạng thái lỗi
        },
        {
            checkboxes: document.querySelectorAll("#input_32_39 input[type='checkbox']"),
            errorLabel: document.getElementById("cam_ket_xac_nhan-error"),
            hasError: false // Biến để theo dõi trạng thái lỗi
        },
        {
            checkboxes: document.querySelectorAll("#input_32_41 input[type='checkbox']"),
            errorLabel: document.getElementById("cam_ket_tai_chinh-error"),
            hasError: false // Biến để theo dõi trạng thái lỗi
        }
    ];

    // Hàm để kiểm tra và ẩn hiện nhãn lỗi khi người dùng chọn checkbox
    function handleCheckboxClick(checkboxInfo) {
        let checkedCount = 0;
        checkboxInfo.checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                checkedCount++;
            }
        });
        if (checkedCount === 0) {
            checkboxInfo.errorLabel.style.display = "block";
            checkboxInfo.hasError = true; // Đánh dấu có lỗi
            if (checkboxInfo.otherInput) {
                checkboxInfo.otherInput.style.display = "none";
            }
        } else {
            checkboxInfo.errorLabel.style.display = "none";
            checkboxInfo.hasError = false; // Đánh dấu không có lỗi
            if (checkboxInfo.otherInput) {
                checkboxInfo.otherInput.style.display = "block";
            }
        }
    }

    // Thêm sự kiện click cho các checkbox
    checkboxesInfo.forEach(function(checkboxInfo) {
        checkboxInfo.checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener("click", function() {
                handleCheckboxClick(checkboxInfo);
            });
        });
    });

    // Xử lý sự kiện submit form
    form.addEventListener("submit", function(event) {
        // Kiểm tra nếu có checkbox nào không được chọn và có lỗi
        const hasUncheckedError = checkboxesInfo.some(function(checkboxInfo) {
            return !checkboxInfo.hasError && !isCheckboxChecked(checkboxInfo);
        });
        if (hasUncheckedError) {
            event.preventDefault(); // Ngăn form khỏi được gửi đi
            checkboxesInfo.forEach(function(checkboxInfo) {
                handleCheckboxClick(checkboxInfo);
            });
            // Scroll đến phần tử đầu tiên có lỗi để người dùng có thể thấy
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    // Hàm kiểm tra xem có checkbox nào được chọn không
    function isCheckboxChecked(checkboxInfo) {
        let checked = false;
        checkboxInfo.checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                checked = true;
            }
        });
        return checked;
    }
});