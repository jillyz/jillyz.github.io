$(() => {
    const form = $('#form-login');
    const username = $('#username');
    const password = $('#password');
    const verifycode = $('#verifycode');
    const messageBox = $('.GSMis-alert-wrapper');
    const message = $('.GSMis-alert-danger .text');
    let isMatch=false;
    let isCodeMatch=false;


    function checkMatch(){
        // for模擬驗證
        isMatch = confirm('帳密是否match？');
        
        if(isMatch){
            // 狀態
            username.parent().removeClass('error');
            password.parent().removeClass('error');
            messageBox.fadeOut();     
            
            // 檢查驗證碼
            checkCode()
        }else{
            message.text('帳號或密碼無效');
            // 狀態
            username.parent().addClass('error');
            password.parent().addClass('error');
            messageBox.fadeIn();
        }

         // 第一個error focus
         $(".error input").first().focus();
         console.log('username:', username.val(), 'password:', password.val(), '驗證碼', verifycode.val())
    }

    function checkCode(){
        // for模擬驗證
        isCodeMatch = confirm('驗證碼是否正確？');
        
        if(isCodeMatch){
            // 狀態
            verifycode.parent().removeClass('error');
            messageBox.fadeOut();
        }else{
            message.text('驗證碼錯誤');
            // 狀態
            verifycode.parent().addClass('error');
            messageBox.fadeIn();
        }
    }

    function processFormData(e) {
        e.preventDefault();      
        
        // 檢查帳號、密碼
        checkMatch();
        
        // 條件皆符合
        if (isMatch && isCodeMatch) {
            window.location.href='index.html'
        }
    }

    form.on('submit', processFormData)
    
});
