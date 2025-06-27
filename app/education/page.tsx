"use client";

import React, { useState } from "react";
import DefaultLayout from '@/app/(default)/layout';

export default function EducationPage() {
    const [activeSection, setActiveSection] = useState<string | null>('education');
    const handleSection = (section: string) => {
        setActiveSection(section);
    };

    return (
        <DefaultLayout>
            <div className="relative min-h-screen flex flex-col md:flex-row bg-[url('/images/planet-overlay.svg')] bg-no-repeat bg-top bg-cover bg-gray-50">
                {/* Кнопка "Назад" фиксирована и адаптивна */}
                <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-8 sm:py-10 bg-gray-50 rounded-3xl shadow-none mt-20 md:mt-20">
                    <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Обучающие материалы</h1>
                    {/* Добавлен дополнительный отступ для смещения меню ниже */}
                    <div className="h-2 md:h-4" />
                    {/* Меню разделов: горизонтальный скролл на мобилках, сетка на десктопе */}
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 pb-2 -mx-2 px-2 snap-x pt-1">
                        <button className="min-w-[180px] snap-start bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold py-5 xs:py-8 px-2 xs:px-4 rounded-xl shadow-lg text-base xs:text-xl transition w-full focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => handleSection('poems')}>Стихотворения</button>
                        <button className="min-w-[180px] snap-start bg-green-100 hover:bg-green-200 text-green-900 font-bold py-5 xs:py-8 px-2 xs:px-4 rounded-xl shadow-lg text-base xs:text-xl transition w-full focus:outline-none focus:ring-2 focus:ring-green-400" onClick={() => handleSection('games')}>Логопедические игры</button>
                        <button className="min-w-[180px] snap-start bg-yellow-100 hover:bg-yellow-200 text-yellow-900 font-bold py-5 xs:py-8 px-2 xs:px-4 rounded-xl shadow-lg text-base xs:text-xl transition w-full focus:outline-none focus:ring-2 focus:ring-yellow-400" onClick={() => handleSection('motorics')}>Пальчиковая гимнастика</button>
                        <button className="min-w-[180px] snap-start bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-5 xs:py-8 px-2 xs:px-4 rounded-xl shadow-lg text-base xs:text-xl transition w-full focus:outline-none focus:ring-2 focus:ring-purple-400" onClick={() => handleSection('grossmotorics')}>Развитие общей моторики</button>
                    </div>
                    {/* Секции: адаптивные паддинги, шрифты, плавные переходы */}
                    {activeSection === 'poems' && (
                        <div className="w-full max-w-3xl mx-auto mt-6 md:mt-8 bg-white rounded-2xl shadow-2xl p-4 xs:p-6 md:p-8 border border-blue-100 transition-all duration-300">
                            <h2 className="text-2xl xs:text-3xl md:text-3xl font-extrabold mb-4 xs:mb-6 text-blue-900 text-center">Стихи и потешки для развития речи детей от 0 до 3 лет</h2>
                            <div className="mb-4 xs:mb-6 text-base xs:text-lg space-y-4 xs:space-y-6 text-gray-800">
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-blue-800">Сорока. Русская народная потешка.</span><br/>
                                    Сорока, сорока,<br/>
                                    Сорока — белобока<br/>
                                    Кашку варила,<br/>
                                    Детишек кормила.<br/>
                                    <span className="block text-sm text-gray-500 mt-1">Указательным пальцем правой руки водят по ладошке левой</span>
                                    Этому дала,<br/>
                                    Этому дала,<br/>
                                    Этому дала,<br/>
                                    Этому дала.<br/>
                                    Этому не дала:<br/>
                                    <span className="block text-sm text-gray-500">Мизинец не загибать.</span><br/>
                                    Ты воды не носил,<br/>
                                    Дров не рубил,<br/>
                                    Каши не варил<br/>
                                    Тебе ничего нет!
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-blue-800">Братья. Русская народная потешка.</span><br/>
                                    Ивану-большаку — дрова рубить,<br/>
                                    Ваське-указке — воду носить.<br/>
                                    Мишке-середке — печку топить.<br/>
                                    Тришке-сиротке — кашу варить.<br/>
                                    А крошке Тимошке — песенки петь,<br/>
                                    Песни петь и плясать,<br/>
                                    Родных братьев потешать.<br/>
                                    <span className="block text-sm text-gray-500 mt-1">Загибая по одному пальцы, начиная с большого, пропевают потешку.</span>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-blue-800">Ладушки. Русская народная потешка.</span><br/>
                                    — Ладушки, ладушки! Где были?<br/>
                                    — У бабушки.<br/>
                                    — Что ели?<br/>
                                    — Кашку.<br/>
                                    — Что пили?<br/>
                                    — Бражку.<br/>
                                    <span className="block text-sm text-gray-500 mt-1">Ребенок и взрослый, ритмично хлопают текст потешки</span><br/>
                                    Кашку поели,<br/>
                                    Бражку попили.<br/>
                                    Шу-у-у… Полетели!<br/>
                                    Нa головку сели,<br/>
                                    Петушком запели.<br/>
                                    Ку-ка-ре-ку!<br/>
                                    <span className="block text-sm text-gray-500">Поднимают рук вверх и опускают на голову</span>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-blue-800">Братцы.</span><br/>
                                    Идут четыре брата<br/>
                                    Навстречу старшему.<br/>
                                    — Здравствуй, большак! —– говорят.<br/>
                                    — Здорово, Васька — указка,<br/>
                                    Гришка – сиротка<br/>
                                    Мишка – середка.<br/>
                                    Да крошка Тимошка.<br/>
                                    <span className="block text-sm text-gray-500 mt-1">Соединяют большой палец одной руки с другими пальцами по очереди.</span>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-blue-800">Кто приехал. Болгарская народная потешка</span><br/>
                                    Кто приехал?<br/>
                                    <span className="block text-sm text-gray-500 mt-1">Пальцы обеих рук складываются кончиками вместе. Быстро хлопать кончиками больших пальцев.</span><br/>
                                    Мы, мы, мы!<br/>
                                    <span className="block text-sm text-gray-500">Кончики больших пальцев прижать друг к другу, а кончики остальных одновременно быстро хлопают</span><br/>
                                    Мама, мама, это ты?<br/>
                                    <span className="block text-sm text-gray-500">Хлопать кончиками больших пальцев</span><br/>
                                    Дa, да, да!<br/>
                                    <span className="block text-sm text-gray-500">Хлопать копчиками указательных пальцев.</span><br/>
                                    Папа, папа, это ты?<br/>
                                    <span className="block text-sm text-gray-500">Хлопать кончиками больших пальцев</span><br/>
                                    Дa, да, да!<br/>
                                    <span className="block text-sm text-gray-500">Хлопать кончиками средних пальцев.</span><br/>
                                    Братец, братец, это ты?<br/>
                                    <span className="block text-sm text-gray-500">Хлопать кончиками больших пальцев</span><br/>
                                    Да, да, да!<br/>
                                    <span className="block text-sm text-gray-500">Хлопать кончиками безымянных пальцев</span><br/>
                                    Ох, сестричка, это ты?<br/>
                                    <span className="block text-sm text-gray-500">Хлопать кончиками больших пальцев</span><br/>
                                    Дa, да, да!<br/>
                                    <span className="block text-sm text-gray-500">Хлопать кончиками мизинцами.</span><br/>
                                    Все мы вместе,<br/>
                                    <span className="block text-sm text-gray-500">Хлопать всеми пальцами</span><br/>
                                    Дa, да, да!
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-blue-800">Апельсин. Л. В. Зубкова</span><br/>
                                    Мы делили апельсин.<br/>
                                    Много нас,<br/>
                                    А он один.<br/>
                                    <span className="block text-sm text-gray-500 mt-1">Дети сжимают и разжимают пальцы обеих рук в кулаки.</span><br/>
                                    Эта долька — для ежа.<br/>
                                    Эта долька — для стрижа.<br/>
                                    Эта долька — для утят.<br/>
                                    Эта долька — для котят.<br/>
                                    Эта долька — для бобра<br/>
                                    <span className="block text-sm text-gray-500">По очереди загибают пальцы, начиная с большого.</span><br/>
                                    А для волка — кожура.<br/>
                                    <span className="block text-sm text-gray-500">Сжимают пальцы обеих рук в кулаки</span><br/>
                                    Он сердит на нас — беда;<br/>
                                    Разбегайтесь – Кто куда!<br/>
                                    <span className="block text-sm text-gray-500">Резко разжимают пальцы, сжатые в кулаки</span>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-blue-800">Пять малышей.  По мотивам английского фольклора</span><br/>
                                    Один малыш<br/>
                                    качается в саду,<br/>
                                    <span className="block text-sm text-gray-500 mt-1">Указательный, палец правой руки выпрямлен и направлен вверх, остальные сжаты в кулак</span><br/>
                                    Два малыша<br/>
                                    купаются в пруду,<br/>
                                    <span className="block text-sm text-gray-500">Теперь выпрямлены два пальца указательный и средний.</span><br/>
                                    Три малыша<br/>
                                    ползут к дверям в квартире,<br/>
                                    <span className="block text-sm text-gray-500">Выпрямить еще и безымянный палец.</span><br/>
                                    А в эту дверь<br/>
                                    стучат еще четыре.<br/>
                                    <span className="block text-sm text-gray-500">Выпрямлены все пальцы, кроме большого</span><br/>
                                    С пятью другими<br/>
                                    тоже все в порядке:<br/>
                                    <span className="block text-sm text-gray-500">Раскрыть всю ладонь</span><br/>
                                    Им весело,<br/>
                                    они играют в прятки.<br/>
                                    <span className="block text-sm text-gray-500">Закрыть лицо руками.</span><br/>
                                    Где притаились, ясно и ежу,<br/>
                                    <span className="block text-sm text-gray-500">Пальцы обеих рук сжаты в замок. Выпрямить пальцы левой руки и большой палец правой.</span><br/>
                                    Но я глаза зажмурил и вожу:<br/>
                                    <span className="block text-sm text-gray-500">Закрыть глаза рукой.</span><br/>
                                    «Один, два, три, четы ре, пять…<br/>
                                    <span className="block text-sm text-gray-500">По очереди раскрывают пальцы, сжатые в кулак: указательный, средний, безымянный, мизинец, большой</span><br/>
                                    Ну, берегитесь: я иду искать!»<br/>
                                    <span className="block text-sm text-gray-500">Погрозить указательным пальцем.</span>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-blue-800">Котята. По мотивам английского фольклора</span><br/>
                                    Вот пятеро котят.<br/>
                                    Один ушел — и нет его.<br/>
                                    <span className="block text-sm text-gray-500 mt-1">Ладонь правой руки раскрыта</span><br/>
                                    Ну, нет его и нет.<br/>
                                    Котят осталось четверо.<br/>
                                    <span className="block text-sm text-gray-500">Загните большой палец.</span><br/>
                                    Вот четверо котят.<br/>
                                    Один ночной порою<br/>
                                    На дерево залез<br/>
                                    котят осталось трое.<br/>
                                    <span className="block text-sm text-gray-500">Загнуть мизинец</span><br/>
                                    Но где-то запищал<br/>
                                    мышонок тонко-тонко.<br/>
                                    Котенок услыхал —<br/>
                                    осталось два котенка.<br/>
                                    <span className="block text-sm text-gray-500">Загнуть безымянный палец</span><br/>
                                    Один из них с мячом<br/>
                                    исчез в дверях бесследно,<br/>
                                    <span className="block text-sm text-gray-500">Загнуть средний палец.</span><br/>
                                    А самый умный — тот,<br/>
                                    оставшийся, последний,<br/>
                                    <span className="block text-sm text-gray-500">Указательный палец приложите ко лбу</span><br/>
                                    Он к миске подошел<br/>
                                    и, как и должно киске,<br/>
                                    Лакать за пятерых<br/>
                                    стал молоко из миски.<br/>
                                    <span className="block text-sm text-gray-500">Ладонь сложить ковшиком. Языком изобразить лакающие движения.</span>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-blue-800">Варежка</span><br/>
                                    Маша варежку надела:<br/>
                                    <span className="block text-sm text-gray-500 mt-1">Сжать пальцы в кулак</span><br/>
                                    Ой, куда я пальчик дела?<br/>
                                    Нету пальчика, пропал,<br/>
                                    <span className="block text-sm text-gray-500">Все пальцы разжать, кроме большого.</span><br/>
                                    В свой домишко не попал».<br/>
                                    <span className="block text-sm text-gray-500">Разогнуть оставшийся согнутым палец</span><br/>
                                    Маша варежку сняла:<br/>
                                    «Поглядите-ка, нашла! Ищешь, ищешь — и найдешь,<br/>
                                    Здравствуй, пальчик, как живешь?»<br/>
                                    <span className="block text-sm text-gray-500">Сжать пальцы в кулачок</span>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-blue-800">Дом и ворота. Т. А. Ткаченко</span><br/>
                                    На поляне дом стоит,<br/>
                                    <span className="block text-sm text-gray-500 mt-1">Изобразить крышу дома пальцами правой и левой рук, соприкасающимися друг с другом</span><br/>
                                    Ну, а к дому путь закрыт.<br/>
                                    <span className="block text-sm text-gray-500">Развернуть ладони к себе, средние пальцы соприкасаются друг с другом</span><br/>
                                    Мы ворота открываем,<br/>
                                    <span className="block text-sm text-gray-500">Развернуть ладони параллельно друг другу</span><br/>
                                    В тот домик приглашаем.<br/>
                                    <span className="block text-sm text-gray-500">Изобразить крышу дома</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeSection === 'games' && (
                        <div className="w-full max-w-3xl mx-auto mt-6 md:mt-8 bg-green-50 rounded-2xl shadow-2xl p-4 xs:p-6 md:p-8 border border-green-200 transition-all duration-300">
                            <h2 className="text-2xl xs:text-3xl md:text-3xl font-extrabold mb-4 xs:mb-6 text-green-900 text-center">Артикуляционные, пальчиковые гимнастики. Логопедические игры. Правила.</h2>
                            <div className="mb-4 xs:mb-6 text-base xs:text-lg space-y-4 xs:space-y-6 text-gray-800">
                                <div className="bg-green-100 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-green-800">Введение</span><br/>
                                    По большому счету, человек разговаривает «головой» — именно в коре головного мозга рождается замысел высказывания, подбираются нужные слова, отдается приказ мышцам артикуляционного аппарата произнести тот или иной звук. Но и мышцы эти должны быть готовы к правильному произнесению звуков. Раньше наши бабушки «играли» с младенцами во всякие непонятные «жужжалочки» и «трещотки», пальчиком по губам, чтобы получалось странное «брим-брим». А вообще-то это и были самые первые артикуляционные упражнения, развивающие силу и подвижность губ, щек, языка. Ребенок и не знал, что он сейчас занимается логопедическими упражнениями. Давайте сделаем так же – поиграем с малышом. Точнее, он будет «играть», а мы, взрослые, сначала узнаем, что и как делать правильно.
                                </div>
                                <div className="bg-green-100 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-green-800">Правила проведения</span>
                                    <ol className="list-decimal list-inside space-y-1 pl-4 mt-2 text-base">
                                        <li>Заниматься гимнастикой нужно ежедневно, лучше в игровой форме 2-3 раза в день, между делом.</li>
                                        <li>Лучше всего заниматься перед зеркалом, чтобы ребенок видел свои движения. Простые упражнения можно выполнять и на прогулке или в ванне.</li>
                                        <li>За один раз не брать больше 3-4 упражнений, новым может быть только одно.</li>
                                        <li>Статические упражнения удерживать по 5-10 секунд, динамические — по 5-7 раз.</li>
                                        <li>Сначала взрослый объясняет и показывает упражнение, затем предлагает повторить.</li>
                                        <li>Для малышей 2-3 лет подойдут простые упражнения на развитие губ, щек, дыхания.</li>
                                    </ol>
                                </div>
                                <div className="bg-green-100 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-green-800">Упражнения для губ и щек</span>
                                    <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
                                        <li><b>Массаж щек.</b> Похлопывание и растирание щек, покусывание щек изнутри.</li>
                                        <li><b>Сытый хомячок.</b> Надуть обе щеки, потом поочередно. Удерживать 3-5 сек.</li>
                                        <li><b>Голодный хомячок.</b> Втянуть щеки внутрь, можно помочь руками.</li>
                                        <li><b>Шарик лопнул.</b> Хлопнуть кулачками по надутым щекам, чтобы воздух вышел с шумом.</li>
                                    </ul>
                                </div>
                                <div className="bg-green-100 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-green-800">Упражнения для губ</span>
                                    <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
                                        <li><b>Улыбка.</b> Растянуть губы в улыбку, зубы видны. Удерживать 5-10 секунд.</li>
                                        <li><b>Трубочка.</b> Вытянуть губы вперед трубочкой («как хобот у слона»).</li>
                                        <li><b>Заборчик.</b> Губы в улыбке, зубы стоят друг на друге и видны.</li>
                                        <li><b>Бублик.</b> Губы округлены и чуть вытянуты вперед, резцы видны.</li>
                                        <li><b>Заборчик — Бублик.</b> Чередование положений губ, следить чтобы зубы не размыкались.</li>
                                        <li><b>Кролик.</b> Верхняя губа приподнята и обнажает верхние резцы.</li>
                                    </ul>
                                </div>
                                <div className="bg-green-100 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-green-800">Упражнения для подвижности губ</span>
                                    <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
                                        <li><b>Массаж губ зубами.</b> Покусывание и почесывание зубами верхней и нижней губы.</li>
                                        <li><b>Пятачок.</b> Вытянутые губы двигать вправо-влево, вращать по кругу.</li>
                                        <li><b>Рыбки разговаривают.</b> Хлопать губами друг о друга (звук ППП без выдоха).</li>
                                        <li><b>Еще рыбки разговаривают.</b> Растягивать губы вверх-вниз, помогая пальцами.</li>
                                        <li><b>Снова рыбки разговаривают.</b> Щеки втянуть внутрь, потом резко открыть рот — должен быть звук «поцелуя».</li>
                                        <li><b>Уточка.</b> Вытянуть губы вперед, массируя их пальцами, как клюв уточки.</li>
                                        <li><b>Недовольная лошадка.</b> Выдыхать воздух к губам, чтобы они вибрировали (фырканье).</li>
                                        <li><b>Спрятать губки.</b> Губы втянуть внутрь рта, прижать к зубам.</li>
                                    </ul>
                                </div>
                                <div className="bg-green-100 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-green-800">Дополнительные упражнения</span>
                                    <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
                                        <li>Сильно надувать щеки, удерживать воздух во рту.</li>
                                        <li>Удерживать губами карандаш, рисовать круги в воздухе.</li>
                                        <li>Удерживать губами марлевую салфетку, взрослый пытается вытянуть.</li>
                                        <li>Пить через трубочку, дуть в воду через трубочку.</li>
                                        <li>Дуть на бумажки, чтобы они разлетелись.</li>
                                    </ul>
                                </div>
                                <div className="bg-green-100 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-green-800">Упражнения для нижней челюсти</span>
                                    <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
                                        <li><b>Трусливый птенчик.</b> Широко открывать и закрывать рот, челюсть опускается, язычок лежит на дне рта.</li>
                                        <li><b>Акулы.</b> Челюсть двигается вправо-влево, вперед-назад, медленно и осторожно.</li>
                                        <li><b>Имитация жевания.</b> С закрытым и открытым ртом.</li>
                                        <li><b>Обезьяна.</b> Челюсть опускается вниз с вытягиванием языка к подбородку.</li>
                                        <li><b>Силач.</b> Подбородок поднимать вверх, напрягая мышцы, затем расслабиться.</li>
                                        <li><b>Давление подбородком на ладони.</b> Открывая рот, давить подбородком на ладони.</li>
                                        <li><b>Опустить челюсть вниз с сопротивлением.</b> Взрослый держит руку под челюстью ребенка.</li>
                                        <li><b>Открывать рот с сопротивлением руки взрослого на затылке.</b></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeSection === 'motorics' && (
                        <div className="w-full max-w-3xl mx-auto mt-6 md:mt-8 bg-white rounded-2xl shadow-2xl p-4 xs:p-6 md:p-8 border border-yellow-100 transition-all duration-300">
                            <h2 className="text-2xl xs:text-3xl md:text-3xl font-extrabold mb-4 xs:mb-6 text-yellow-900 text-center">Пальчиковая гимнастика</h2>
                            <div className="mb-4 xs:mb-6 text-base xs:text-lg space-y-4 xs:space-y-6 text-gray-800">
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Цель — развитие мелкой моторики</span><br/>
                                    Массаж ладоней и пальцев.
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Сорока – белобока</span><br/>
                                    Кашу варила,<br/>
                                    Детишек кормила.<br/>
                                    Этому дала,<br/>
                                    Этому дала,<br/>
                                    Этому дала,<br/>
                                    Этому дала,<br/>
                                    А этому не дала:<br/>
                                    Ты воды не носил,<br/>
                                    Ты дров не рубил,<br/>
                                    Ты кашу не варил –<br/>
                                    Тебе ничего нет!
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Массаж прижимающий: Шел медведь к своей берлоге</span><br/>
                                    Да споткнулся по дороге.<br/>
                                    «Видно очень мало сил<br/>
                                    Я на зиму накопил», —<br/>
                                    Так подумал и пошел<br/>
                                    Он на поиск диких пчел.<br/>
                                    Все медведи – сладкоежки,<br/>
                                    Любят есть медок без спешки,<br/>
                                    А наевшись, без тревоги<br/>
                                    До весны сопят в берлоге.<br/>
                                    <span className="block text-sm text-gray-500 mt-1">(Кисти рук лежат на столе, ладонями вниз, пальцы разведены. Указательным пальцем по очереди прижимать каждый ноготь, катать его на подушечке влево — вправо. На каждую сточку – нажим на один палец.)</span>
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Щелчки</span><br/>
                                    Поднял ушки бурундук,<br/>
                                    Он в лесу услышал звук:<br/>
                                    — Это что за громкий стук,<br/>
                                    Тук да тук, тук да тук?<br/>
                                    — А пойдем, — сказал барсук, —<br/>
                                    Сам увидишь этот трюк:<br/>
                                    Это дятел сел на сук<br/>
                                    И без крыльев и без рук<br/>
                                    Ищет он, где спрятан жук,<br/>
                                    Вот и слышен перестук!<br/>
                                    <span className="block text-sm text-gray-500 mt-1">(Ладонь прижата к столу, пальцы разведены. Взрослый поднимает пальцы по одному (ребенок с силой прижимает ладонь, сопротивляясь подъёму). Затем палец отпускают, и он со стуком падает вниз).</span>
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Ладонь – кулак</span><br/>
                                    Руки, как глазки,<br/>
                                    Закрылись – открылись,<br/>
                                    Словно из сказки<br/>
                                    Они появились!<br/>
                                    <span className="block text-sm text-gray-500 mt-1">(Руки ладонями вниз лежат на столе. Затем одновременно сжимаются в кулак и снова ложатся ладонями на стол.)</span><br/>
                                    Один кулак – одна ладошка,<br/>
                                    И поменяй их быстро, крошка!<br/>
                                    Теперь – ладошка и кулак,<br/>
                                    И всё быстрее делай так!<br/>
                                    <span className="block text-sm text-gray-500">(Одновременно – правая рука сжимается в кулак, а левая распрямляется. Потом наоборот).</span>
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Поочередное соединение всех пальцев</span><br/>
                                    у       с       б        м<br/>
                                    Ищет птичка и в траве,<br/>
                                    м       б         с         у<br/>
                                    И на ветках, и в листве,<br/>
                                    у      с          б          м<br/>
                                    И среди больших лугов<br/>
                                    м      б            с            у<br/>
                                    Мух, червей, слепней, жуков.<br/>
                                    <span className="block text-sm text-gray-500">(Поочередное соединение всех пальцев с большим, на каждый ударный слог.)</span>
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Пианист</span><br/>
                                    5 4 3        2 1<br/>
                                    Пианист Бемоль<br/>
                                    5 4 3       2 1<br/>
                                    В мурке король.<br/>
                                    5 4 3      2 1<br/>
                                    Говорит Бемоль<br/>
                                    5 4    3      2 1<br/>
                                    Ноты как пароль:<br/>
                                    5    4    3     2     1<br/>
                                    «До, ре, ми, фа, соль,<br/>
                                    5 4 3 2        1<br/>
                                    Принесите соль.<br/>
                                    5    4    3    2      1<br/>
                                    До, ре, ми, фа, соль,<br/>
                                    5 4 3        2 1<br/>
                                    Посолить фасоль».<br/>
                                    <span className="block text-sm text-gray-500">(Пальцы опускаются на стол по порядку – от мизинца к большому – на каждый слог стиха. После каждой строчки —  смена рук.)</span>
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Упражнение с пробками</span><br/>
                                    Крышки пальчики обули,<br/>
                                    Смело в них вперед шагнули.<br/>
                                    Смена рук<br/>
                                    И пошли по переулку<br/>
                                    На веселую прогулку.<br/>
                                    Смена рук<br/>
                                    Пальцы – словно балеринки,<br/>
                                    Но одетые в ботинки.<br/>
                                    Смена рук<br/>
                                    Каждый пальчик – будто ножка,<br/>
                                    Только шаркает немножко.<br/>
                                    <span className="block text-sm text-gray-500">(Взять пластмассовые крышки от бутылок (4 штуки) надеть их, как обувь на указательные и средние пальцы обеих рук. Шагать пальцами, не отрывая «обувь» от стола, «шаркая». После каждого двустишия – смена рук.)</span>
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Комканье платка</span><br/>
                                    У меня живет проглот –<br/>
                                    Весь платок он скушал, вот!<br/>
                                    Сразу стало у проглота<br/>
                                    Брюшко, как у бегемота!<br/>
                                    <span className="block text-sm text-gray-500">(Взять небольшой носовой платок за уголок и показать ребенку, как целиком вобрать его в ладонь, используя пальцы только одной руки. Другая рука не помогает!  Потом предлагаем то же самое сделать ребенку. Сначала одной рукой, потом другой. Можно одновременно комкать и 2 платка (маленькие).</span>
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Семья</span><br/>
                                    <span className="block text-sm text-gray-500">(соединить запястья, поочередно соединяя пальцы, начиная с больших, в конце соединить все пальцы.)</span><br/>
                                    Этот пальчик – дедушка,<br/>
                                    Этот пальчик – бабушка,<br/>
                                    Этот пальчик – папочка,<br/>
                                    Этот пальчик – мамочка,<br/>
                                    А вот этот пальчик – я,<br/>
                                    Вот и вся моя семья.
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Братья</span><br/>
                                    Выполни задание одной рукой.<br/>
                                    Пальцы в кулак, поочерёдно отгибаем пальцы, начиная с большого.<br/>
                                    Пальчик, пальчик, где ты был?<br/>
                                    С этим братцем в лес ходил.<br/>
                                    С этим братцем щи варил.<br/>
                                    С этим братцем кашу ел.<br/>
                                    С этим братцем песни пел.<br/>
                                    Выполни задание двумя руками.
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Сон</span><br/>
                                    <span className="block text-sm text-gray-500">(Пальцы одной руки открыты,  поочередно загибаем пальцы).</span><br/>
                                    Этот пальчик хочет спать,<br/>
                                    этот пальчик лёг в кровать,<br/>
                                    этот пальчик чуть вздремнул,<br/>
                                    этот пальчик уж уснул,<br/>
                                    этот крепко, крепко спит.<br/>
                                    Тише, мыши, не шумите,<br/>
                                    пальчики не разбудите.
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Грибы</span><br/>
                                    <span className="block text-sm text-gray-500">(Выполнять отдельно правой и левой рукой. Пальцы собраны в кулак.)</span><br/>
                                    Раз, два, три, четыре, пять. (На каждый счет раскрывай по одному пальцу, начиная с большого).<br/>
                                    Вышли пальчики гулять. (Пошевели всеми пальцами).<br/>
                                    Этот пальчик гриб сорвал, этот пальчик чистить стал,<br/>
                                    Этот резал,<br/>
                                    Этот ел,<br/>
                                    (на каждую строку загибай по одному пальцу, начиная с большого).<br/>
                                    Ну а этот лишь смотрел.<br/>
                                    (мизинец не загибай).
                                </div>
                                <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-yellow-800">Этот пальчик маленький...</span><br/>
                                    Этот пальчик маленький,<br/>
                                    Этот пальчик слабенький,<br/>
                                    Этот пальчик самый длинный,<br/>
                                    Этот пальчик самый сильный,<br/>
                                    <span className="block text-sm text-gray-500">(все пальчики, начиная с мизинца, дотрагиваются до большого пальца той же руки в ритме стиха; остальные пальцы стараться держать прямыми).</span><br/>
                                    Этот пальчик – толстячок,<br/>
                                    <span className="block text-sm text-gray-500">(Большой палец пригибается к ладони)</span><br/>
                                    А все вместе – кулачок.<br/>
                                    <span className="block text-sm text-gray-500">(все пальчики собираются в кулак)</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeSection === 'grossmotorics' && (
                        <div className="w-full max-w-3xl mx-auto mt-6 md:mt-8 bg-white rounded-2xl shadow-2xl p-4 xs:p-6 md:p-8 border border-purple-100 transition-all duration-300">
                            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 xs:mb-8 text-center text-purple-900">Развитие общей моторики</h2>
                            <div className="mb-4 xs:mb-6 text-base xs:text-lg space-y-4 xs:space-y-6 text-gray-800">
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«На параде».</span><br/>
                                    Предложите ребенку пройти по комнате, как на параде, — под барабан. Объясните, что каждый шаг нужно делать вместе с ударами барабана. Предложите нормальный темп, быстрый, замедленный…
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Гимнаст».</span><br/>
                                    Положите на пол доску шириной 20 см. Попросите ребенка пройти по ней, не сходя на пол, вперёд и в обратном направлении. В конце – мягкий соскок на пол.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«По тропинке».</span><br/>
                                    По доске шириной 20 см нужно пройти, перешагивая через камушки, палочки…
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Мишка на бревне».</span><br/>
                                    По той же доске можно проползти на четвереньках туда и обратно.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Акробат».</span><br/>
                                    На полу — шнур, вытянутый по прямой линии. Малыш идет по шнуру, приставляя пятку к носку. Руки — в стороны.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Тропинка».</span><br/>
                                    Ребенок шагает по шнуру, выложенному зигзагообразно.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Котёнок».</span><br/>
                                    На конце гибкого прутика – нитка длиной 0,5 м. К концу её привязан бантик. Пусть малыш, как котёнок, подпрыгнет и попытается достать бантик над его головой.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Прыжки».</span><br/>
                                    Возьмите ребёнка за руки, помогите ему подпрыгнуть, мягко приземлиться. Потом несколько ослабляйте поддержку.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Ручеёк».</span><br/>
                                    Ребенок должен перепрыгнуть на двух ногах через ленту или шнур, лежащий на полу.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«По камушкам».</span><br/>
                                    Ребенок продвигается вперед на двух ногах или поочередно перепрыгивая «с камушка на камушек».
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Волчок».</span><br/>
                                    Ребенок подпрыгивает и вращается вокруг себя.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">Игры с воображаемыми предметами.</span><br/>
                                    Дети стихийно подражают действиям, заинтересовавшим их. Наблюдая с детьми за людьми разных профессий, обсудите их действия, позы, способ пользования инструментами, орудиями труда. Хорошо (скорее необходимо), чтобы эти инструменты и орудия труда ребенок рассмотрел, подержал в руках, понял, как ими пользуются. Впоследствии в играх он может применять инструменты из игрушечных наборов. Очень полезно для развития воображения ребенка, способности заменять предмет символом, использовать вместо реальных инструментов любые другие предметы. Например, заменить рубанок бруском из строительного набора, метлу – простой палкой и т.д. После этого легко перейти к упражнениям с воображаемыми предметами. Предложите ребенку отгадать загадку – определять по вашим действиям род занятий человека. Пусть малыш вслед за вами загадает загадку вам.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Шофёр».</span><br/>
                                    Вращая руками воображаемый руль, очень интересно быстро мчаться по условным дорожкам, поворачивая то вправо, то влево. Хорошо, если «шофёр» сумеет правильно реагировать на зеленый, красный, желтый свет (цветные кружки).
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Дворник»</span><br/>
                                    А. руки – одна наверху, другая внизу – обхватывают рукоятку воображаемой метлы. Широкими взмахами «подметаем тротуар».<br/>
                                    Б. Руки — в том же положении – «обхватывают лом».  «Колем лёд».<br/>
                                    В. Руки «обхватывают черенок лопаты».  «Сгребаем снег».
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Дровосеки»</span><br/>
                                    А. Встать друг против друга. Левая нога выдвинута вперед. Правой рукой двигать воображаемую пилу к себе и от себя.<br/>
                                    Б. Рубим дрова. Расставить ноги на ширину плеч.  Руки со сцепленными пальцами над головой. Наклоняясь, широким взмахом опускать руки вниз.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Гребец»</span><br/>
                                    Сидя. Вращать сжатыми в кулаки руками – «грести веслами» от себя и к себе, одновременно наклоняя и разгибая корпус.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Рыбак»</span><br/>
                                    На корточках. Ладони, сложенные вместе, «держат удочку». Резкий взмах руками снизу вверх – «поймали рыбку».
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Плотник»</span><br/>
                                    Опираясь левой рукой о стол, «плотник» широкими движениями право руки «строгает доску» — водит воображаемым рубанком. Затем «распиливает доску пилой». И, наконец, «сколачивает полку» — забивает гвозди» воображаемым молотком.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Маляр»</span><br/>
                                    Приносит тяжелое ведро с краской, размешивает её, окунает кисть и широкими движениями рук красит стену.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">Бытовые сценки</span><br/>
                                    Пусть ребенок сам изображает то, что часто видит дома. Наблюдательность и воображение развиваются лучше, если он старается подробно и точно воспроизвести последовательность действий, движений в процессе игры, прибегая только к помощи жестов (не употребляя предметов).
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Стирка»</span><br/>
                                    Трём кулачок о кулачок – «отстирываем пятна». «Полощем» полотенце, затем «отжимаем». Встряхиваем, расправляем ткань. Вешаем на веревку. Зажимаем прищепками.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Варим кашу»</span><br/>
                                    Вымоем руки. Снимем с полки и наполним водой кастрюлю. Зажжем горелку.  Поставим кастрюлю на плиту. Насыпаем из пакета крупу. Помешиваем ложкой кашу. Солим. Накрываем крышкой. Затем пробуем кашу и раскладываем по тарелкам.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">«Портниха»</span><br/>
                                    Эта роль требует более тонких движений рук. Двумя пальцами «держим иголку». «Сматываем нитку с катушки». «Вдеваем нитку в иголку». Проводим вдоль воображаемой нитки сложенными большим и указательным пальцами – «делаем узелок». Теперь нужно изобразить, как иголка проходит сквозь ткань и тянет за собой нитку.
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
                                    <span className="font-semibold text-purple-800">Игры с мячом.</span><br/>
                                    Непросто научиться ловить мяч. Начните с мяча среднего размера (чуть меньше волейбольного). Киньте (или вложите в руки ребенка) мяч с близкого расстояния. Малыш должен научиться подбрасывать мяч, ударять им об пол, перебрасывать маме.<br/>
                                    Встаньте напротив малыша на расстоянии одного метра. Прокатите мяч по полу, чтобы он поймал его. Предложите ему прокатить мяч, чтобы он попал к вам.<br/>
                                    На расстоянии одного метра поставьте стул. Покажите ребенку, как направлять мяч, чтобы он прокатился между ножками стула. Первый раз направьте его руку, второй раз пусть попробует сам.<br/>
                                    стоя рядом с ребенком слегка толкните лежащий на полу мяч вперед. Пусть малыш догонит мяч, поймает его.<br/>
                                    Киньте мяч ребенку с ближнего расстояния, чтобы он наверняка мог поймать его. Пусть его вдохновит первая удача. Постепенно увеличивайте расстояние.<br/>
                                    Теперь предложите малышу кинуть мяч вам. Подбадривайте его: «Повыше, повыше!»<br/>
                                    ударить мяч о землю и поймать его.<br/>
                                    подбросить мяч вверх и поймать его совсем непросто. Придется поупражняться.<br/>
                                    покажите, как ударить мяч о землю, чтобы он отлетел к стоящему напротив партнеру по игре. Помогите малышу освоить это упражнение.<br/>
                                    Постепенно уменьшайте размеры мячей. Учите малыша перекладывать мяч из одной руки в другую. Маленький резиновый мяч ребенок должен уметь удерживать одной рукой, сжимать его. Научите его выполнять команды: прокатить мяч вперед, назад, подбросить вверх, бросить вниз.<br/>
                                    Перебросить мяч через препятствие (скамеечку, веревку и т.п.) – очень увлекательная задача. А от вас к ребенку мячик вернется по полу.<br/>
                                    Попасть мячом в широкую корзину, стоящую на полу. Малыш будет в восторге, если сможет точно забросить  в корзину 2-3 мячика.<br/>
                                    А теперь корзинка (коробка) расположена на высоте. Научите ребенка забрасывать мяч из поднятых  кверху рук.<br/>
                                    Ударить мячом об стену, а затем поймать отскочивший от пола мяч.<br/>
                                    Сбить мячом кегли, игрушки. Сначала любую, потом какую-то конкретную игрушку из ряда стоящих перед ребенком.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
