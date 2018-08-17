function separateSpanishEnglish(contents, option) {
    const spanish = [];
    const english = [];

    const titles = identifyTitle();
    if(titles) {
        spanish.push(titles[0]);
        english.push(titles[1]);
        $(".thePassage h2").remove();
    }

    $.each(contents, (idx, val) => {
        if (val.lang === 'es-mx' && !($(val).is('h2'))) {
            spanish.push(val);
        } else if (!($(val).is('h2'))) {
            english.push(val);
        }
    });

    const spanishBlock = $('<div></div>');
    $.each(spanish, (idx, val) => {
        $(spanishBlock).append(val);
    });

    if (option) {
        $(spanishBlock).addClass("spanish-answer");
    } else {
        $(spanishBlock).addClass("spanish");
    }

    const englishBlock = $('<div></div>');
    
    $.each(english, (idx, val) => {
        $(englishBlock).append(val);
    });

    // for (let index = 0; index < english.length; index++) {
    //     englishBlock.append(english[index]);
    // }
    if (option) {
        $(englishBlock).addClass("english-answer");
    } else {
        $(englishBlock).addClass("english");
    }

    const newPassage = $('<div></div>');
    newPassage.append(spanishBlock).append(englishBlock);

    return newPassage;
}

function rearrange(colType, option) {
    const col = $(colType);
    const children = col.children();
    const newChildren = separateSpanishEnglish(children, option);
    $(col).append(newChildren);
}

function addButton() {
    const englishButton = $('<button></button>')
        .addClass('button_click')
        .text('English');

    const spanishButton = $('<button></button>')
        .addClass('button')
        .text('Español');

    // const bothButton = $('<button></button>')
    //     .addClass('button')
    //     .text('Both');

    const buttons = $('<div></div>')
        .addClass('buttons')
        .append(englishButton)
        .append(spanishButton);
        // .append(bothButton);

    const questionNumber = $('.questionNumber');
    $(buttons).insertBefore(questionName);
}

function switchLang() {
    const unselected = $('.button_click');
    const selected = $('.button');

    $(unselected).removeClass('button_click')
        .addClass('button')
        .click(switchLang);

    $(selected).removeClass('button')
        .addClass('button_click')
        .unbind();
    
    const lang = $(selected).text();
    if (lang === 'English') {
        $('.spanish').hide();
        $('.spanish-answer').hide();

        $('.english').show();
        $('.english-answer').show();
    } else {
        $('.english').hide();
        $('.english-answer').hide();

        $('.spanish').show();
        $('.spanish-answer').show();
    }
}

function identifyTitle() {
    const langDivider = $('h2 .languagedivider');
    if (langDivider.length === 1) {
        $('.thePassage h2 p').remove();
        const passage = $('.thePassage h2').contents();

        console.table(passage);

        const spanish = '';
        const english = '';
        const titles = [];        
        for (let content of passage) {
            console.log(`content.textContent.trim(): ${content.textContent.trim()}`);
            if (content.textContent.trim()) {
                titles.push($(`<h2>${content.textContent}</h2>`));
            }
        }

        return titles;
    }

    return false;
}

passageName = '.thePassage .padding';
questionName = '.stemContainer';
choiceName = '.optionContent';

if (($(passageName)).length !== 0) {
    rearrange(passageName);
} else {
    const table = $('.bigTable');
    table.addClass("center");
    const questions = $('.theQuestions');
    questions.css("width", '80%');
}

if (questionName) {
    rearrange(questionName);
}

const choices = $(choiceName);
if (choices) {
    choices.addClass("number");
    const td = $(".tableItem tbody tr td .languagedivider");
    if (td) {
        td.prev().addClass("spanish-answer");
        td.next().addClass("english-answer");
    }
}

const options = $(".optionContent .languagedivider");
if (options) {
    options.prev().addClass("spanish-answer");
    options.next().addClass("english-answer");
}

const th = $(".tableItem thead tr th .languagedivider");
if (th) {
    const pre = th.prevAll();
    const next = th.nextAll();
    for (let i = 0; i < pre.length; i++) {
        const html = $(pre[i]).html();
        if (html !== "&nbsp;") {
          $(pre[i]).addClass('spanish-answer');
        }
    }

    for (let i = 0; i < next.length; i++) {
        const html = $(next[i]).html();
        if (html !== "&nbsp;") {
            $(next[i]).addClass('english-answer');
        }
    }
}

const answerContainer = $('.answerContainer .tableItem');
if (answerContainer) {
    const goal = $('.answerContainer');
    const width = $(goal).width();
    $(answerContainer).css("width", width);
}

const numContainer = $('<div class="num-container"></div>');
const questionNumber = $('.questionNumber');
if (questionNumber) {
    $(numContainer).append(questionNumber);
}

const hamburgerIcon = $('<div class="hamburger-icon"></div>');
$(numContainer).append(hamburgerIcon);

const questions = $('.theQuestions');
$(questions).prepend(numContainer);

addButton();

$(".spanish").hide();
$(".spanish-answer").hide();

$(".button").click(switchLang);
$(".languagedivider").remove();