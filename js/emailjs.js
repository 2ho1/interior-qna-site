// ===== EmailJS 설정 =====

// EmailJS 초기화
function initializeEmailJS() {
    // EmailJS 공개 키
    emailjs.init("1UhNeQb6TPSktcisp");
    
    console.log('EmailJS initialized');
}

// 견적 문의 이메일 발송
async function sendQuoteEmail(formData) {
    try {
        // EmailJS 서비스 ID와 템플릿 ID
        const serviceID = "service_5cfjlz4";
        const templateID = "template_bzstmir";
        
        // 이메일 템플릿 파라미터
        const templateParams = {
            customer_name: formData.customerName,
            phone: formData.phone,
            address: formData.address,
            property_type: formData.propertyType,
            area: formData.area + '평',
            budget: formData.budget,
            preferred_date: formData.preferredDate,
            details: formData.details || '요청사항 없음',
            submit_time: formData.submitTime,
            user_agent: formData.userAgent,
            referrer: formData.referrer
        };
        
        // 이메일 발송
        const result = await emailjs.send(serviceID, templateID, templateParams);
        
        console.log('Email sent successfully:', result);
        
        // 성공 로그 저장 (선택사항)
        saveEmailLog('success', templateParams);
        
        return result;
        
    } catch (error) {
        console.error('Email sending failed:', error);
        
        // 실패 로그 저장
        saveEmailLog('error', { error: error.message, formData });
        
        throw error;
    }
}

// 이메일 로그 저장
function saveEmailLog(status, data) {
    try {
        const logData = {
            status: status,
            timestamp: new Date().toISOString(),
            data: data
        };
        
        // 로컬 스토리지에 로그 저장 (최대 50개)
        const logs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
        logs.push(logData);
        
        if (logs.length > 50) {
            logs.splice(0, logs.length - 50);
        }
        
        localStorage.setItem('emailLogs', JSON.stringify(logs));
        
    } catch (error) {
        console.error('Failed to save email log:', error);
    }
}

// EmailJS 설정 검증
function validateEmailJSConfig() {
    const requiredConfig = [
        '1UhNeQb6TPSktcisp', // Public Key
        'service_5cfjlz4',   // Service ID
        'template_bzstmir'   // Template ID
    ];
    
    const missingConfig = requiredConfig.filter(config => 
        config.includes('YOUR_') || config === ''
    );
    
    if (missingConfig.length > 0) {
        console.warn('EmailJS configuration is incomplete:', missingConfig);
        showEmailJSConfigWarning();
        return false;
    }
    
    console.log('EmailJS configuration is complete and ready to use!');
    return true;
}

// EmailJS 설정 경고 표시
function showEmailJSConfigWarning() {
    const warningHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i>
            <strong>EmailJS 설정 필요:</strong> 이메일 발송 기능을 사용하려면 EmailJS 설정을 완료해주세요.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    const form = document.querySelector('.quote-form');
    if (form) {
        form.insertAdjacentHTML('afterbegin', warningHTML);
    }
}

// 이메일 템플릿 예시 생성
function generateEmailTemplate() {
    const template = `
        견적 문의가 접수되었습니다.
        
        고객 정보:
        - 이름: {{customer_name}}
        - 연락처: {{phone}}
        - 주소: {{address}}
        
        시공 정보:
        - 주거지 형태: {{property_type}}
        - 평수: {{area}}
        - 예상 예산: {{budget}}
        - 희망 시공일: {{preferred_date}}
        
        요청사항:
        {{details}}
        
        문의 시간: {{submit_time}}
        
        빠른 시일 내에 고객님께 연락드리겠습니다.
    `;
    
    console.log('EmailJS Template Example:');
    console.log(template);
    
    return template;
}

// EmailJS 설정 가이드 표시
function showEmailJSSetupGuide() {
    const guideHTML = `
        <div class="modal fade" id="emailjsGuideModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">EmailJS 설정 가이드</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>1. EmailJS 계정 생성</h6>
                        <p>https://www.emailjs.com 에서 무료 계정을 생성하세요.</p>
                        
                        <h6>2. 이메일 서비스 연결</h6>
                        <p>Gmail, Outlook 등의 이메일 서비스를 연결하세요.</p>
                        
                        <h6>3. 이메일 템플릿 생성</h6>
                        <p>다음 템플릿을 사용하여 이메일 템플릿을 생성하세요:</p>
                        <pre class="bg-light p-3 rounded"><code>${generateEmailTemplate()}</code></pre>
                        
                        <h6>4. JavaScript 설정</h6>
                        <p>emailjs.js 파일에서 다음 값들을 실제 값으로 변경하세요:</p>
                        <ul>
                            <li><code>YOUR_EMAILJS_PUBLIC_KEY</code></li>
                            <li><code>YOUR_SERVICE_ID</code></li>
                            <li><code>YOUR_TEMPLATE_ID</code></li>
                        </ul>
                        
                        <h6>5. 테스트</h6>
                        <p>견적 문의 폼을 통해 이메일 발송을 테스트해보세요.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', guideHTML);
    
    const modal = new bootstrap.Modal(document.getElementById('emailjsGuideModal'));
    modal.show();
    
    // 모달이 닫힐 때 제거
    document.getElementById('emailjsGuideModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// 이메일 발송 통계
function getEmailStats() {
    try {
        const logs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
        const successCount = logs.filter(log => log.status === 'success').length;
        const errorCount = logs.filter(log => log.status === 'error').length;
        
        return {
            total: logs.length,
            success: successCount,
            error: errorCount,
            successRate: logs.length > 0 ? (successCount / logs.length * 100).toFixed(1) : 0
        };
    } catch (error) {
        console.error('Failed to get email stats:', error);
        return { total: 0, success: 0, error: 0, successRate: 0 };
    }
}

// 이메일 로그 초기화
function clearEmailLogs() {
    localStorage.removeItem('emailLogs');
    console.log('Email logs cleared');
}

// 이메일 발송 재시도
async function retryEmailSend(formData, maxRetries = 3) {
    let attempts = 0;
    
    while (attempts < maxRetries) {
        try {
            attempts++;
            console.log(`Email send attempt ${attempts}/${maxRetries}`);
            
            const result = await sendQuoteEmail(formData);
            return result;
            
        } catch (error) {
            console.error(`Email send attempt ${attempts} failed:`, error);
            
            if (attempts >= maxRetries) {
                throw new Error(`이메일 발송에 실패했습니다. (${maxRetries}회 시도 후 실패)`);
            }
            
            // 재시도 전 대기 (지수 백오프)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
        }
    }
}

// 전역 함수로 내보내기
window.sendQuoteEmail = sendQuoteEmail;
window.showEmailJSSetupGuide = showEmailJSSetupGuide;
window.getEmailStats = getEmailStats;
window.clearEmailLogs = clearEmailLogs;
window.retryEmailSend = retryEmailSend;

// 초기화 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeEmailJS();
    validateEmailJSConfig();
});
