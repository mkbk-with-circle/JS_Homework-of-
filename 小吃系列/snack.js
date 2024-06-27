document.addEventListener('DOMContentLoaded', () => {
    new fullpage('#fullpage', {
        autoScrolling: true,
        navigation: true,
        navigationPosition: 'right',
        scrollHorizontally: true
    });
});
const scrollElements = document.querySelectorAll('.js-scroll')
scrollElements.forEach((el) => {undefined
    el.style.opacity = 0
})
const elementInView = (el, percentageScroll = 100) => {
   const elementTop = el.getBoundingClientRect().top 
   return ( 
   elementTop <=
   (window.innerHeight || document.documentElement.clientHeight) *
   (percentageScroll / 100) 
   ) 
}
const displayScrollElement = (element) => {undefined
    element.classList.add('scrolled')
}
const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
    displayScrollElement(el);
    } else {
    hideScrollElement(el);
    } 
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const sentences = document.querySelectorAll('.sentence');
    const container = document.querySelector('.container1');

    function randomPosition() {
        return (Math.random() * 400) + 'px'; // 50px 是句子的高度近似值
    }

    function animateSentence(sentence) {
        const fromLeft = Math.random() < 0.5;
        const animationIn = fromLeft ? 'slideInLeft' : 'slideInRight';
        const animationOut = fromLeft ? 'slideOutRight' : 'slideOutLeft';

        sentence.style.top = randomPosition();
        sentence.style.animation = `${animationIn} 2s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards`;

        setTimeout(() => {
            sentence.style.animation = `${animationOut} 2s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards`;
        }, 1500); // 句子停留的时间
    }

    function showSentences() {
        sentences.forEach((sentence, index) => {
            setTimeout(() => {
                sentence.textContent = sentence.getAttribute('data-text');
                animateSentence(sentence);
            }, index * 1500); // 每隔5秒显示一个句子
        });
    }

    showSentences();

    // 循环显示句子
    setInterval(showSentences, sentences.length * 1500);
});
