const faqButton = document.getElementById('faqButton');

function InitializeListeners()
{
    faqButton.addEventListener('click', function()
    {
        const m_msgWidth = 1152;
        const m_msgHeight = 720;
        const m_screenWidthPos = (screen.width % m_msgWidth) / 2;
        const m_screenHeightPos = (screen.height % m_msgHeight) / 3;

        //alert(m_screenWidthPos + "x" + m_screenHeightPos)
        window.open('./pages/faq/faq.html', 'MsgWindow', `toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, top=${m_screenHeightPos}, left=${m_screenWidthPos},width=${m_msgWidth},height=${m_msgHeight}`);
            // Animations
        PlayButtonAnimation(faqButton.id);
    });
}



// Executing
InitializeListeners();