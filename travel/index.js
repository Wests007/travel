console.log(' 1. Слайдер изображений в секции destinations. На десктопе клик по левой картинке вытягивает изображение в центр. На мобильной версии клик по стрелкам слева и справа. Слайдер конечный. Под слайдером три точки, обозначающие какой слайд выбран из трёх. На мобильном слайдере они тоже присутствуют. ТАкже там есть стрелки навигации. При достижении конца слайдера, стрелка приглушается полупрозначностью. Слайдер анимирован плавным перемещением. \n 2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап. Попап соответствует макету. Выход из всплывающего окна реализован по клику за пределами окна. В окне есть два поля ввода(e-mail и пароль). При нажатии на кнопку Sign In показывается браузерный алерт с введенными данными. Реализована проверка корректности ввода данных(контроль пустых полей и соответствие эл.адреса виду student@rsschool.com) \n 3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). \n Итого: Работа выполнена в соответствии с заданием.');



// Burger Active

(function () {
    const burgerItem = document.querySelector('.burger'); //иконка бургера
    const menu = document.querySelector('.burger-nav'); //бургер-меню
    const menulinefirst = document.querySelector('.burger-line-first');
    const menulinesecond = document.querySelector('.burger-line-second');
    const menulinethird = document.querySelector('.burger-line-third');
    const menuCloselinefirst = document.querySelector('.burger-nav-close-line-first');
    const menuCloselinelast = document.querySelector('.burger-nav-close-line-last');
    const overlay = document.querySelector('.overlay'); //экран с затемнением
    const menuCloseItem = document.querySelector('.burger-nav-close'); // иконка-крестик: закрыть меню

    burgerItem.addEventListener('click', () => { //слушаем клик по иконке бургера
        menu.classList.add('burger-nav-active'); //и делаем burger-nav-active - отрисовать бургер-меню
        overlay.classList.add('overlay-active'); //и делаем overlay-active - отрисовать затемняющий фон
        document.body.classList.toggle('lock'); //запрет скролла при открытом меню.
        menulinefirst.classList.toggle('active');
        menulinesecond.classList.toggle('active');
        menulinethird.classList.toggle('active');
        menuCloselinefirst.classList.toggle('active');
        menuCloselinelast.classList.toggle('active');
    });
    menuCloseItem.addEventListener('click', () => { //слушаем клик по иконке-крестику
        menu.classList.remove('burger-nav-active'); //и делаем отмену burger-nav-active - убрать бургер-меню
        overlay.classList.remove('overlay-active'); //убираем затемнение
        document.body.classList.remove('lock'); //отмена запрета скролла при открытом меню
        menulinefirst.classList.remove('active');
        menulinesecond.classList.remove('active');
        menulinethird.classList.remove('active');
        menuCloselinefirst.classList.remove('active');
        menuCloselinelast.classList.remove('active');

    });

    overlay.addEventListener('click', () => { //слушаем клик по любой части оверлея
        menu.classList.remove('burger-nav-active'); //и делаем отмену burger-nav-active - убрать бургер-меню
        overlay.classList.remove('overlay-active'); //убираем затемнение
        document.body.classList.remove('lock'); //отмена запрета скролла при открытом меню
        menulinefirst.classList.remove('active');
        menulinesecond.classList.remove('active');
        menulinethird.classList.remove('active');
        menuCloselinefirst.classList.remove('active');
        menuCloselinelast.classList.remove('active');
    });


    menu.addEventListener('click', () => { //слушаем клик по всему меню
        menu.classList.remove('burger-nav-active'); //и делаем отмену burger-nav-active - убрать бургер-меню
        overlay.classList.remove('overlay-active'); //убираем затемнение
        document.body.classList.remove('lock'); //отмена запрета скролла при открытом меню
        menulinefirst.classList.remove('active');
        menulinesecond.classList.remove('active');
        menulinethird.classList.remove('active');
        menuCloselinefirst.classList.remove('active');
        menuCloselinelast.classList.remove('active');
    });

}());


// POPUP

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
let unlock = true;
let isLinkReg = true;
// цифра должна совпадать с transition в .popup (0.8s = 800ms)
const timeout = 500;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const popupActual = document.getElementById(popupName);
            popupOpen(popupActual);
            e.preventDefault(); // запрет перезагрузки страницы при вызове попапа
        });
    }
}

function popupOpen(popupActual) {
    if (popupActual && unlock) {
        const popupActive = document.querySelector('.popup.active');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        popupActual.classList.add('active');
        popupActual.addEventListener("click", function (e) {
            if (!e.target.closest('.popup-container')) {
                popupClose(e.target.closest('.popup')); //возвращает ближайший родительский элемент
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('active');
        document.getElementById("input-mail").value = '';
        document.getElementById("input-pass").value = '';
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    body.classList.add('lock'); //запрет скролла при открытом popup
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    body.classList.remove('lock');
    unlock = false;
    setTimeout(function () {
        unlock = true;
        isLinkReg = true;
        LoginHeader.innerHTML = 'Log in to your account';
        ButtonFB.classList.remove('reg');
        ButtonGG.classList.remove('reg');
        OrBox.classList.remove('reg');
        SignIn.textContent = 'Sign In';
        ForgotPass.classList.remove('reg');
        DontHave.textContent = 'Don’t have an account?';
        RegLink.innerHTML = 'Register';
        PopupContainer.classList.remove('fix-height-popup');
    }, timeout);
}


// REGISTER POPUP

const RegLink = document.getElementById('reg-link');
const LoginHeader = document.querySelector('.popup-title');
const ButtonFB = document.querySelector('.popup-button-sighin-fb');
const ButtonGG = document.querySelector('.popup-button-sighin-google');
const OrBox = document.querySelector('.or-box');
const SignIn = document.querySelector('.button-sighin');
const ForgotPass = document.querySelector('.popup-forgotpass');
const DontHave = document.querySelector('.popup-question');
const PopupContainer = document.querySelector('.popup-container');
const PopupTitle = document.querySelector('.popup-title');
const PopupLine = document.querySelector('.line-register');
const PopupDonthave = document.querySelector('.popup-donthave');

// let isLinkReg = true;
RegLink.addEventListener('click', () => {
    if (isLinkReg) {
        isLinkReg = false;
        LoginHeader.innerHTML = 'Create account';
        ButtonFB.classList.add('reg');
        ButtonGG.classList.add('reg');
        OrBox.classList.add('reg');
        SignIn.textContent = 'Sign Up';
        ForgotPass.classList.add('reg');
        DontHave.textContent = 'Already have an account?';
        RegLink.innerHTML = 'Log In';
        PopupContainer.classList.add('fix-height-popup');
        PopupTitle.classList.add('fix-popup-title');
        PopupLine.classList.add('fix-line-register');
        PopupDonthave.classList.add('fix-popup-donthave');
    }
    else {
        isLinkReg = true;
        LoginHeader.innerHTML = 'Log in to your account';
        ButtonFB.classList.remove('reg');
        ButtonGG.classList.remove('reg');
        OrBox.classList.remove('reg');
        SignIn.textContent = 'Sign In';
        ForgotPass.classList.remove('reg');
        DontHave.textContent = 'Don’t have an account?';
        RegLink.innerHTML = 'Register';
        PopupContainer.classList.remove('fix-height-popup');
    }
})


// Отслеживание клика по Sign In

SignIn.addEventListener('click', () => {
    InputMail = document.getElementById("input-mail").value;
    InputPass = document.getElementById("input-pass").value;
    if (document.getElementById("input-mail").value.includes("@") && document.getElementById("input-mail").value.includes(".")) {
        alert('E-mail: ' + InputMail + ' \nPassword: ' + InputPass + '');
        popupActive.classList.remove('active');
    }
    else {
        if (document.getElementById("input-mail").value.length == 0 || document.getElementById("input-pass").value.length == 0) {
            alert('Заполните поля ввода логина/пароля');
        } else {
            alert('Введите корректный e-mail адрес');
        }
        //alert-метод для es5
    }
});


// SLIDER

const CAROUSEL = document.querySelector("#slider");
const CAROUSELMOBILE = document.querySelector("#slider-mobile");

const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");
const ITEM_CENTER = document.querySelector("#item-active");
const ITEM_LEFT_LEFT = document.querySelector("#item-left-left");
const ITEM_RIGHT_RIGHT = document.querySelector("#item-right-right");

const ITEM_LEFT_MOB = document.querySelector("#item-left-mob");
const ITEM_CENTER_MOB = document.querySelector("#item-center-mob");
const ITEM_RIGHT_MOB = document.querySelector("#item-right-mob");
const ITEM_LEFT_LEFT_MOB = document.querySelector("#item-left-left-mob");
const ITEM_RIGHT_RIGHT_MOB = document.querySelector("#item-right-right-mob");

const POINT1 = document.getElementById("point-1");
const POINT2 = document.getElementById("point-2");
const POINT3 = document.getElementById("point-3");

const ARROW_LEFT = document.querySelector("#arrow-left-pic");
const ARROW_RIGHT = document.querySelector("#arrow-right-pic");

let index = 2;

POINT2.classList.add('point-center');



const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");
    CAROUSELMOBILE.classList.add("transition-left");
    ITEM_LEFT.removeEventListener("click", moveLeft);
    ITEM_RIGHT.removeEventListener("click", moveRight);
    ARROW_LEFT.removeEventListener("click", moveLeft);
    ARROW_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    CAROUSEL.classList.add("transition-right");
    CAROUSELMOBILE.classList.add("transition-right");
    ITEM_RIGHT.removeEventListener("click", moveRight);
    ITEM_LEFT.removeEventListener("click", moveLeft);
    ARROW_LEFT.removeEventListener("click", moveLeft);
    ARROW_RIGHT.removeEventListener("click", moveRight);
};

ITEM_LEFT.addEventListener("click", moveLeft);
ITEM_RIGHT.addEventListener("click", moveRight);
ARROW_LEFT.addEventListener("click", moveLeft);
ARROW_RIGHT.addEventListener("click", moveRight);

    if (CAROUSELMOBILE.classList.contains("active")) {
    CAROUSEL.addEventListener("animationend", (animationEvent) => {
        // console.log(animationEvent);
        if (animationEvent.animationName === "move-left") {
            CAROUSEL.classList.remove("transition-left");
            document.querySelector("#item-right-right").innerHTML = ITEM_RIGHT.innerHTML;
            document.querySelector("#item-right").innerHTML = ITEM_CENTER.innerHTML;
            document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
            document.querySelector("#item-left").innerHTML = ITEM_LEFT_LEFT.innerHTML;
            ITEM_LEFT_LEFT.innerHTML = "";
            CAROUSELMOBILE.classList.remove("transition-left");
            document.querySelector("#item-right-right-mob").innerHTML = ITEM_RIGHT_MOB.innerHTML;
            document.querySelector("#item-right-mob").innerHTML = ITEM_CENTER_MOB.innerHTML;
            document.querySelector("#item-center-mob").innerHTML = ITEM_LEFT_MOB.innerHTML;
            document.querySelector("#item-left-mob").innerHTML = ITEM_LEFT_LEFT_MOB.innerHTML;
            ITEM_LEFT_LEFT_MOB.innerHTML = "";
            index = index - 1;
            // console.log(index);
            POINT2.classList.add('point-center');
    
        } else {
            CAROUSEL.classList.remove("transition-right");
            document.querySelector("#item-left-left").innerHTML = ITEM_LEFT.innerHTML;
            document.querySelector("#item-left").innerHTML = ITEM_CENTER.innerHTML;
            document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
            document.querySelector("#item-right").innerHTML = ITEM_RIGHT_RIGHT.innerHTML;
            ITEM_RIGHT_RIGHT.innerHTML = "";
            CAROUSELMOBILE.classList.remove("transition-right");
            document.querySelector("#item-left-left-mob").innerHTML = ITEM_LEFT_MOB.innerHTML;
            document.querySelector("#item-left-mob").innerHTML = ITEM_CENTER_MOB.innerHTML;
            document.querySelector("#item-center-mob").innerHTML = ITEM_RIGHT_MOB.innerHTML;
            document.querySelector("#item-right-mob").innerHTML = ITEM_RIGHT_RIGHT_MOB.innerHTML;
            ITEM_RIGHT_RIGHT_MOB.innerHTML = "";
            index = index + 1;
            // console.log(index);
        }
    
        if (index === 1) {
            ITEM_LEFT.removeEventListener("click", moveLeft);
            ITEM_RIGHT.addEventListener("click", moveRight);
            POINT1.classList.add('point-center');
            POINT2.classList.remove('point-center');
            POINT3.classList.remove('point-center');
            ARROW_LEFT.removeEventListener("click", moveLeft);
            ARROW_RIGHT.addEventListener("click", moveRight);
            ARROW_LEFT.classList.add('arrow-opacity');
        } else {
            if (index === 3) {
                ITEM_RIGHT.removeEventListener("click", moveRight);
                ITEM_LEFT.addEventListener("click", moveLeft);
                POINT1.classList.remove('point-center');
                POINT2.classList.remove('point-center');
                POINT3.classList.add('point-center');
                ARROW_RIGHT.removeEventListener("click", moveRight);
                ARROW_LEFT.addEventListener("click", moveLeft);
                ARROW_RIGHT.classList.add('arrow-opacity');
            } else {
                ITEM_LEFT.addEventListener("click", moveLeft);
                ITEM_RIGHT.addEventListener("click", moveRight);
                POINT1.classList.remove('point-center');
                POINT2.classList.add('point-center');
                POINT3.classList.remove('point-center');
                ARROW_LEFT.addEventListener("click", moveLeft);
                ARROW_RIGHT.addEventListener("click", moveRight);
                ARROW_LEFT.classList.remove('arrow-opacity');
                ARROW_RIGHT.classList.remove('arrow-opacity');
            }
        }
    });
// console.log('display none');
} else {
    CAROUSELMOBILE.addEventListener("animationend", (animationEvent) => {
            // console.log(animationEvent);
            if (animationEvent.animationName === "move-left") {
                CAROUSEL.classList.remove("transition-left");
                document.querySelector("#item-right-right").innerHTML = ITEM_RIGHT.innerHTML;
                document.querySelector("#item-right").innerHTML = ITEM_CENTER.innerHTML;
                document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
                document.querySelector("#item-left").innerHTML = ITEM_LEFT_LEFT.innerHTML;
                ITEM_LEFT_LEFT.innerHTML = "";
                CAROUSELMOBILE.classList.remove("transition-left");
                document.querySelector("#item-right-right-mob").innerHTML = ITEM_RIGHT_MOB.innerHTML;
                document.querySelector("#item-right-mob").innerHTML = ITEM_CENTER_MOB.innerHTML;
                document.querySelector("#item-center-mob").innerHTML = ITEM_LEFT_MOB.innerHTML;
                document.querySelector("#item-left-mob").innerHTML = ITEM_LEFT_LEFT_MOB.innerHTML;
                ITEM_LEFT_LEFT_MOB.innerHTML = "";
                index = index - 1;
                // console.log(index);
                POINT2.classList.add('point-center');
        
            } else {
                CAROUSEL.classList.remove("transition-right");
                document.querySelector("#item-left-left").innerHTML = ITEM_LEFT.innerHTML;
                document.querySelector("#item-left").innerHTML = ITEM_CENTER.innerHTML;
                document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
                document.querySelector("#item-right").innerHTML = ITEM_RIGHT_RIGHT.innerHTML;
                ITEM_RIGHT_RIGHT.innerHTML = "";
                CAROUSELMOBILE.classList.remove("transition-right");
                document.querySelector("#item-left-left-mob").innerHTML = ITEM_LEFT_MOB.innerHTML;
                document.querySelector("#item-left-mob").innerHTML = ITEM_CENTER_MOB.innerHTML;
                document.querySelector("#item-center-mob").innerHTML = ITEM_RIGHT_MOB.innerHTML;
                document.querySelector("#item-right-mob").innerHTML = ITEM_RIGHT_RIGHT_MOB.innerHTML;
                ITEM_RIGHT_RIGHT_MOB.innerHTML = "";
                index = index + 1;
                // console.log(index);
            }
        
            if (index === 1) {
                ITEM_LEFT.removeEventListener("click", moveLeft);
                ITEM_RIGHT.addEventListener("click", moveRight);
                POINT1.classList.add('point-center');
                POINT2.classList.remove('point-center');
                POINT3.classList.remove('point-center');
                ARROW_LEFT.removeEventListener("click", moveLeft);
                ARROW_RIGHT.addEventListener("click", moveRight);
                ARROW_LEFT.classList.add('arrow-opacity');
            } else {
                if (index === 3) {
                    ITEM_RIGHT.removeEventListener("click", moveRight);
                    ITEM_LEFT.addEventListener("click", moveLeft);
                    POINT1.classList.remove('point-center');
                    POINT2.classList.remove('point-center');
                    POINT3.classList.add('point-center');
                    ARROW_RIGHT.removeEventListener("click", moveRight);
                    ARROW_LEFT.addEventListener("click", moveLeft);
                    ARROW_RIGHT.classList.add('arrow-opacity');
                } else {
                    ITEM_LEFT.addEventListener("click", moveLeft);
                    ITEM_RIGHT.addEventListener("click", moveRight);
                    POINT1.classList.remove('point-center');
                    POINT2.classList.add('point-center');
                    POINT3.classList.remove('point-center');
                    ARROW_LEFT.addEventListener("click", moveLeft);
                    ARROW_RIGHT.addEventListener("click", moveRight);
                    ARROW_LEFT.classList.remove('arrow-opacity');
                    ARROW_RIGHT.classList.remove('arrow-opacity');
                }
            }
        });
// console.log('display block');
}




