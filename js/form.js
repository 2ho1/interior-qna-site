// ===== 폼 JavaScript =====

let quoteForm;
let formValidator;

// 폼 초기화
function initializeForm() {
    quoteForm = document.getElementById('quoteForm');
    
    if (!quoteForm) {
        console.error('Quote form not found');
        return;
    }
    
    setupFormValidation();
    setupFormEvents();
    setupInputFormatters();
    setupDatePicker();
}

// 폼 유효성 검사 설정
function setupFormValidation() {
    // HTML5 유효성 검사 메시지 커스터마이징
    const inputs = quoteForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            showFieldError(this, getValidationMessage(this));
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// 폼 이벤트 설정
function setupFormEvents() {
    // 폼 제출 이벤트
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
    
    // 실시간 유효성 검사
    const inputs = quoteForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(function() {
            validateField(this);
        }, 300));
    });
    
    // 전화번호 포맷팅
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
        
        phoneInput.addEventListener('keypress', function(e) {
            // 숫자와 하이픈만 입력 허용
            if (!/[0-9-]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    // 평수 입력 제한
    const areaInput = document.getElementById('area');
    if (areaInput) {
        areaInput.addEventListener('input', function() {
            // 숫자만 입력 허용
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // 최대값 제한
            if (parseInt(this.value) > 200) {
                this.value = '200';
                showFieldError(this, '평수는 200평 이하로 입력해주세요.');
            }
        });
    }
}

// 입력 포맷터 설정
function setupInputFormatters() {
    // 전화번호 자동 포맷팅
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length >= 11) {
                value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
            }
            
            this.value = value;
        });
    }
}

// 날짜 선택기 설정
function setupDatePicker() {
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        // 최소 날짜를 오늘로 설정
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        dateInput.min = tomorrow.toISOString().split('T')[0];
        
        // 최대 날짜를 1년 후로 설정
        const maxDate = new Date(today);
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        dateInput.max = maxDate.toISOString().split('T')[0];
        
        // 날짜 변경 시 유효성 검사
        dateInput.addEventListener('change', function() {
            validateDate(this);
        });
    }
}

// 필드 유효성 검사
function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    
    switch (fieldName) {
        case 'customerName':
            return validateName(field, value);
        case 'phone':
            return validatePhone(field, value);
        case 'address':
            return validateAddress(field, value);
        case 'propertyType':
            return validatePropertyType(field, value);
        case 'area':
            return validateArea(field, value);
        case 'budget':
            return validateBudget(field, value);
        case 'preferredDate':
            return validateDate(field, value);
        case 'privacyAgreement':
            return validatePrivacyAgreement(field, value);
        default:
            return true;
    }
}

// 이름 유효성 검사
function validateName(field, value) {
    if (!value) {
        showFieldError(field, '이름을 입력해주세요.');
        return false;
    }
    
    if (value.length < 2) {
        showFieldError(field, '이름은 2글자 이상 입력해주세요.');
        return false;
    }
    
    if (!/^[가-힣a-zA-Z\s]+$/.test(value)) {
        showFieldError(field, '이름은 한글 또는 영문만 입력 가능합니다.');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// 전화번호 유효성 검사
function validatePhone(field, value) {
    if (!value) {
        showFieldError(field, '연락처를 입력해주세요.');
        return false;
    }
    
    const phoneRegex = /^01[0-9]-[0-9]{4}-[0-9]{4}$/;
    if (!phoneRegex.test(value)) {
        showFieldError(field, '올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// 주소 유효성 검사
function validateAddress(field, value) {
    if (!value) {
        showFieldError(field, '주소를 입력해주세요.');
        return false;
    }
    
    if (value.length < 5) {
        showFieldError(field, '주소를 더 자세히 입력해주세요.');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// 주거지 형태 유효성 검사
function validatePropertyType(field, value) {
    if (!value) {
        showFieldError(field, '주거지 형태를 선택해주세요.');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// 평수 유효성 검사
function validateArea(field, value) {
    if (!value) {
        showFieldError(field, '평수를 입력해주세요.');
        return false;
    }
    
    const area = parseInt(value);
    if (isNaN(area) || area < 1 || area > 200) {
        showFieldError(field, '평수는 1평 이상 200평 이하로 입력해주세요.');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// 예산 유효성 검사
function validateBudget(field, value) {
    if (!value) {
        showFieldError(field, '예상 예산을 선택해주세요.');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// 날짜 유효성 검사
function validateDate(field, value) {
    if (!value) {
        showFieldError(field, '희망 시공일을 선택해주세요.');
        return false;
    }
    
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showFieldError(field, '희망 시공일은 오늘 이후로 선택해주세요.');
        return false;
    }
    
    const maxDate = new Date(today);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    
    if (selectedDate > maxDate) {
        showFieldError(field, '희망 시공일은 1년 이내로 선택해주세요.');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// 개인정보 동의 유효성 검사
function validatePrivacyAgreement(field, value) {
    if (!field.checked) {
        showFieldError(field, '개인정보 처리방침에 동의해주세요.');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// 필드 에러 표시
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    
    // 필드에 포커스
    field.focus();
}

// 필드 성공 표시
function showFieldSuccess(field) {
    clearFieldError(field);
    field.classList.add('is-valid');
}

// 필드 에러 제거
function clearFieldError(field) {
    field.classList.remove('is-invalid', 'is-valid');
    
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// 유효성 검사 메시지 가져오기
function getValidationMessage(field) {
    switch (field.name) {
        case 'customerName':
            return '이름을 입력해주세요.';
        case 'phone':
            return '연락처를 입력해주세요.';
        case 'address':
            return '주소를 입력해주세요.';
        case 'propertyType':
            return '주거지 형태를 선택해주세요.';
        case 'area':
            return '평수를 입력해주세요.';
        case 'budget':
            return '예상 예산을 선택해주세요.';
        case 'preferredDate':
            return '희망 시공일을 선택해주세요.';
        case 'privacyAgreement':
            return '개인정보 처리방침에 동의해주세요.';
        default:
            return '필수 입력 항목입니다.';
    }
}

// 폼 제출 처리
function handleFormSubmit() {
    if (!validateForm()) {
        showAlert('입력 정보를 확인해주세요.', 'error');
        return;
    }
    
    const formData = getFormData();
    const submitButton = quoteForm.querySelector('button[type="submit"]');
    
    // 제출 버튼 비활성화
    showLoading(submitButton);
    
    // EmailJS를 통한 이메일 발송
    sendQuoteEmail(formData)
        .then(() => {
            showAlert('견적 문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
            resetForm();
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            showAlert('견적 문의 전송에 실패했습니다. 다시 시도해주세요.', 'error');
        })
        .finally(() => {
            hideLoading(submitButton, '<i class="fas fa-paper-plane me-2"></i>무료 견적 문의하기');
        });
}

// 전체 폼 유효성 검사
function validateForm() {
    const requiredFields = quoteForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// 폼 데이터 수집
function getFormData() {
    const formData = new FormData(quoteForm);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // 추가 정보
    data.submitTime = new Date().toLocaleString('ko-KR');
    data.userAgent = navigator.userAgent;
    data.referrer = document.referrer;
    
    return data;
}

// 폼 리셋
function resetForm() {
    quoteForm.reset();
    
    // 모든 필드의 유효성 상태 초기화
    const inputs = quoteForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        clearFieldError(input);
    });
    
    // 개인정보 동의 체크박스 초기화
    const privacyCheckbox = document.getElementById('privacyAgreement');
    if (privacyCheckbox) {
        privacyCheckbox.checked = false;
    }
}

// 전화번호 포맷팅
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
        value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (value.length >= 7) {
        value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
    }
    
    input.value = value;
}

// 폼 초기화 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});
