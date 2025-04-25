
//------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------FAQ animations(needs fix(either here or in the css(deleted the animation part))--------------------------------------------------------------------------------------------
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');

    });
});
