import * as functions from "./functions.js";
import questions from "./arrayTests.js";

const testString = `<div class="question__form--label-wrapper">
<input checked type="radio" class="question__form--variant" id="question__form--answer1" data-question-index="1" name="answer" value="1">
<label class="question__form--label" for="question__form--answer1" id="question__form--label-1"><input class='question__form-input' type='text' placeholder='your answer here'></label>
</div>
<div class="question__form--label-wrapper">
<input type="radio" class="question__form--variant" id="question__form--answer2" data-question-index="2" name="answer" value="2">
<label class="question__form--label" for="question__form--answer2" id="question__form--label-2"><input class='question__form-input' type='text' placeholder='your answer here'></label>
</div>
<div class="question__form--label-wrapper">
<input type="radio" class="question__form--variant" id="question__form--answer3" data-question-index="3" name="answer" value="3">
<label class="question__form--label" for="question__form--answer3" id="question__form--label-3"><input class='question__form-input' type='text' placeholder='your answer here'></label>
</div>
<div class="question__form--label-wrapper">
<input type="radio" class="question__form--variant" id="question__form--answer4" data-question-index="4" name="answer" value="4">
<label class="question__form--label" id="question__form--label-4" for="question__form--answer4"><input class='question__form-input' type='text' placeholder='your answer here'></label>
</div>`;
const refs = {};
window.localStorage.setItem(
    "volume",
    window.localStorage.getItem("volume") || 1
);
window.localStorage.setItem("bg", window.localStorage.getItem("bg") || 1);
refs.volume = +window.localStorage.getItem("volume");
document.querySelector(
    ".main"
).style.backgroundImage = `url(./img/bg${localStorage.getItem("bg")}.jpg)`;
document.querySelector(".start__btn").addEventListener("click", () => {
    document
        .querySelector(".wrapper__header__test_it")
        .classList.remove("hidden-modal");
    document.querySelector(".menu").classList.remove("hidden-modal");
    document.querySelector(".start").classList.add("hidden-modal");
    document.querySelector(".audio__main-theme").play();

});
const keyCloseModal = (event) => {
    if (event.code === "Escape") {
        document
            .querySelector(".backdrop_authors_modal")
            .classList.add("hidden-modal");
        window.removeEventListener("keydown", keyCloseModal);
    }
};

const keyCloseModal2 = (event) => {
    if (event.code === "Escape") {
        document.querySelector('.backdrop_how-to-use_modal').classList.add("hidden-modal");
        window.removeEventListener("keydown", keyCloseModal3);
    }
};

const keyCloseModal3 = (event) => {
    if (event.code === "Escape") {
        document
            .querySelector(".backdrop_settings_modal")
            .classList.add("hidden-modal");
        window.removeEventListener("keydown", keyCloseModal3);
    }
};
const backDropCloseModal = (event) => {
    if (event.target === event.currentTarget) {
        event.currentTarget.classList.add("hidden-modal");
    }
};

document.querySelector('.backdrop_how-to-use_modal').addEventListener('click', backDropCloseModal);

document.querySelector('.about_test').addEventListener('click', () => {
    window.addEventListener('keydown', keyCloseModal2);
    document.querySelector('.backdrop_how-to-use_modal').classList.remove('hidden-modal');
    document.querySelector(".audio__main-theme").play();
});

document.querySelectorAll(".settings_btn--js").forEach((btn) =>
    btn.addEventListener("click", () => {
        document.querySelector(".audio__main-theme").play();
        window.addEventListener("keydown", keyCloseModal3);
        document
            .querySelector(".backdrop_settings_modal")
            .classList.remove("hidden-modal");
    })
);
document.querySelectorAll(".close-btn--js").forEach((element) => {
    element.addEventListener("click", (event) =>
        document
            .querySelector(`#${event.currentTarget.dataset.modal}`)
            .classList.add("hidden-modal")
    );
});
document
    .querySelector(".backdrop_settings_modal")
    .addEventListener("click", backDropCloseModal);

document.querySelectorAll(".start__author--js").forEach((btn) =>
    btn.addEventListener("click", () => {
        document
            .querySelector(".backdrop_authors_modal")
            .classList.remove("hidden-modal");
        window.addEventListener("keydown", keyCloseModal);
        document.querySelector(".audio__main-theme").play();
    })
);

document
    .querySelector(".backdrop_authors_modal")
    .addEventListener("click", backDropCloseModal);

document.querySelector(".settings-modal__audio-range").value = refs.volume * 20;
if (refs.volume === 0) {
    document.querySelector("#mute").classList.remove("hidden-modal");
    document.querySelector("#high").classList.add("hidden-modal");
}
document
    .querySelector(".settings-modal__background-wrapper")
    .children[+window.localStorage.getItem("bg") - 1].classList.add(
        "settings-modal__background--active"
    );
[...document.querySelector(".audio").children].forEach((audio) => (audio.volume = +audio.dataset.volume * refs.volume));

document.querySelector(".settings-modal__audio-range").addEventListener("input", functions.checkVolume);
document.querySelector(".settings-modal__background-wrapper").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) return;
    window.localStorage.setItem("bg", event.target.dataset.bg);
    event.target.parentNode.querySelector(".settings-modal__background--active").classList.remove("settings-modal__background--active");
    event.target.classList.add("settings-modal__background--active");
    document.querySelector(".main").style.backgroundImage = `url(./img/bg${event.target.dataset.bg}.jpg)`;
});
document.querySelector('.menu__test-selection-wrapper').addEventListener('click', functions.startTest);

document.querySelectorAll('.question__btn--arrow').forEach(item => {
    item.addEventListener('click', functions.onClickBtnArrow);
});

document.querySelector('.question__submit').addEventListener('click', functions.onClickBtnSubmit);


document.querySelector('.question__btn--finish').addEventListener('click', functions.checkFinal);
document.querySelector('.results_btn_menu--restart').addEventListener('click', () => {
    document.querySelector('.results').classList.add('hidden-modal');
    functions.makeQuestion(+localStorage.getItem('test-type'), 1);
    localStorage.setItem('question-index', 1);
});
document.querySelector('.results_btn_menu--menu').addEventListener('click', () => {
    document.querySelector('.results').classList.add('hidden-modal');
    document.querySelector('.menu').classList.remove('hidden-modal');
});
document.querySelector('.test-selection__plus').addEventListener('click', functions.createTest);
document.querySelector('.question-input__btn--plus').addEventListener('click', functions.createTestPlusBtn);
document.querySelector('.question-input__btn--make-test').addEventListener('click', functions.createTestAddBtn);
localStorage.setItem('user-tests', JSON.stringify(questions))
