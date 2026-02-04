import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiFileText, FiDownload, FiAward } from 'react-icons/fi';
import { REGISTRATION_FORM_URL } from '../constants';

const HomePage = () => {
  const { t, i18n } = useTranslation();

  const sections = [
    { num: 1, key: 'section1' },
    { num: 2, key: 'section2' },
    { num: 3, key: 'section3' },
    { num: 4, key: 'section4' },
    { num: 5, key: 'section5' },
    { num: 6, key: 'section6' },
  ];

  const importantDates = [
    { label: t('dates.registration'), date: t('dates.registrationDate') },
    { label: t('dates.confirmation'), date: t('dates.confirmationDate') },
    { label: t('dates.arrival'), date: t('dates.arrivalDate') },
    { label: t('dates.conference'), date: t('dates.conferenceDate') },
    { label: t('dates.departure'), date: t('dates.departureDate') },
  ];

  return (
    <div className="bg-white">
      {/* Professional Hero Section */}
      <section className="gradient-header text-white py-24 md:py-32">
        <div className="container-professional">
          <div className="max-w-4xl mx-auto text-center fade-in">
            {/* KZ: badge → title. RU/EN: title → badge */}
            {i18n.language === 'kz' ? (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 mb-8">
                  <FiAward className="text-alice-blue" size={18} />
                  <span className="text-sm font-medium">{t('home.dedicated')}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {t('home.title')}
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {t('home.title')}
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 mb-8">
                  <FiAward className="text-alice-blue" size={18} />
                  <span className="text-sm font-medium">{t('home.dedicated')}</span>
                </div>
              </>
            )}
            
            {/* Subtitle */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-medium text-alice-blue leading-relaxed">
                {t('home.subtitle')}
              </h2>
            </div>

            {/* Date & Location */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-lg">
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <FiCalendar size={20} />
                <span className="font-medium">{t('home.date')}</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <FiMapPin size={20} />
                <span className="font-medium">{t('home.location')}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={REGISTRATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-brilliant-azure font-semibold rounded-lg hover:bg-alice-blue transition-colors shadow-elevated"
              >
                {t('home.registerBtn')}
              </a>
              <a href="#sections" className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-colors">
                {t('home.learnMore')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Organizer Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-professional">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm uppercase tracking-wider text-brilliant-azure font-bold mb-3 block">
              {t('home.organizer')}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-cobalt-blue mb-6">
              {t('home.organizerName')}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('home.formatDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Conference Sections */}
      <section id="sections" className="py-20">
        <div className="container-professional">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto mb-4">{t('sections.title')}</h2>
            <p className="section-subtitle mx-auto text-center">
              {i18n.language === 'kz' 
                ? 'Конференция 6 негізгі бағыттарды қамтиды'
                : i18n.language === 'en'
                ? 'The conference covers 6 main directions'
                : 'Конференция охватывает 6 основных направлений'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sections.map((section) => (
              <div 
                key={section.num}
                className="card border-l-4 border-brilliant-azure hover:shadow-elevated transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-brilliant-azure flex items-center justify-center text-white font-bold text-xl shadow-card">
                      {section.num}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {t(`sections.${section.key}`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 bg-alice-blue/30">
        <div className="container-professional">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto">{t('dates.title')}</h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {importantDates.map((item, index) => (
              <div 
                key={index}
                className="card-bordered hover:border-brilliant-azure transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-cobalt-blue text-lg mb-1">{item.label}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block px-4 py-2 bg-brilliant-azure/10 text-brilliant-azure font-semibold rounded-lg">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Fee */}
      <section className="py-20">
        <div className="container-professional">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto">{t('fees.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Regular Fee */}
            <div className="card-bordered text-center hover:border-brilliant-azure transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-brilliant-azure/10 flex items-center justify-center">
                <FiUsers className="text-brilliant-azure" size={32} />
              </div>
              <h3 className="text-xl font-bold text-cobalt-blue mb-3">
                {t('fees.regular')}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-brilliant-azure">
                  {t('fees.regularAmount').split(' ')[0]}
                </span>
                <span className="text-gray-600 ml-2">{t('fees.regularAmount').split(' ').slice(1).join(' ')}</span>
              </div>
            </div>
            
            {/* Student Fee */}
            <div className="card-bordered text-center border-2 border-brilliant-azure">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-brilliant-azure text-white text-xs font-bold rounded-full uppercase">
                  {i18n.language === 'en' ? 'Special' : 'Скидка'}
                </span>
              </div>
              <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-brilliant-azure flex items-center justify-center">
                <FiAward className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-cobalt-blue mb-3">
                {t('fees.student')}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-brilliant-azure">
                  {t('fees.studentAmount').split(' ')[0]}
                </span>
                <span className="text-gray-600 ml-2">{t('fees.studentAmount').split(' ').slice(1).join(' ')}</span>
              </div>
            </div>
          </div>
          
          <p className="text-center text-gray-600 mt-8 text-lg">
            {t('fees.note')}
          </p>
        </div>
      </section>

      {/* Documents CTA */}
      <section className="py-20 gradient-header text-white">
        <div className="container-professional text-center">
          <div className="w-16 h-16 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <FiDownload className="text-white" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('documents.title')}</h2>
          <p className="text-xl text-alice-blue mb-8 max-w-2xl mx-auto">
            {t('documents.infoLetter')} & {t('documents.templates')}
          </p>
          
          <Link 
            to="/documents" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brilliant-azure font-semibold rounded-lg hover:bg-alice-blue transition-colors shadow-elevated"
          >
            <FiDownload size={20} />
            {t('documents.download')}
          </Link>
        </div>
      </section>

      {/* Committee Section */}
      <section id="committee" className="py-20 bg-gray-50">
        <div className="container-professional">
          <div className="text-center mb-16">
            <h2 className="section-title mx-auto">{t('committee.title')}</h2>
          </div>
          
          <div className="card-bordered max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-brilliant-azure flex items-center justify-center flex-shrink-0">
                <FiAward className="text-white" size={24} />
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>{t('committee.chairman')}:</strong>{' '}
                  {i18n.language === 'kz'
                    ? 'Академик Е. А. Бөкетов атындағы ҚарҰЗУ ректоры, проф., ҚР ҰҒА академигі Н. О. Дулатбеков'
                    : i18n.language === 'en'
                    ? 'Rector of Buketov Karaganda National Research University, Prof., academician of the National Academy of Sciences of the Republic of Kazakhstan N. O. Dulatbekov'
                    : 'Ректор КарНИУ имени академика Е. А. Букетова, проф., академик НАН РК Н. О. Дулатбеков'}
                </p>
                <div className="pl-6 text-gray-600 border-l-2 border-gray-200 mb-4">
                  <strong>{t('committee.coChairman')}:</strong>{' '}
                  {i18n.language === 'kz'
                    ? 'проф. Бруно Пуаза (Франция, Лион)'
                    : i18n.language === 'en'
                    ? 'Prof. Bruno Poizat (France, Lyon)'
                    : 'проф. Бруно Пуаза (Франция, Лион)'}
                </div>
                <div className="pl-6 text-gray-600 border-l-2 border-gray-200 mb-4">
                  <strong>{t('committee.coChairman')}:</strong>{' '}
                  {i18n.language === 'kz'
                    ? 'РҒА академигі С. С. Гончаров (Ресей, Новосибирск)'
                    : i18n.language === 'en'
                    ? 'Acad. of the RAS S.S. Goncharov (Russia, Novosibirsk)'
                    : 'акад. РАН С.С. Гончаров (Россия, Новосибирск)'}
                </div>
                <div className="pl-6 text-gray-600 border-l-2 border-gray-200 space-y-1">
                  <strong>
                    {i18n.language === 'kz' ? 'Комитет мүшелері:' : i18n.language === 'en' ? 'Committee members:' : 'Члены комитета:'}
                  </strong>
                  <div className="pt-1 text-gray-700 leading-relaxed space-y-1">
                  {[
                    'акад. АН РТ М.М. Арсланов (Россия, Казань)',
                    'проф. А.Т. Асанова',
                    'акад. НАН РК Б.С. Байжанов',
                    'проф. Н.А. Бокаев',
                    'проф. В. В. Вербовский',
                    'проф. М. Т. Дженалиев',
                    'акад. НАН РК А.С. Джумадильдаев',
                    'проф. Б.Е. Кангужин',
                    'проф. Н. Х. Касымов (Узбекистан, Ташкент)',
                    'акад. НАН РК Т.Ш. Кальменов',
                    'акад. НАН РК Б.Ш. Кулпешов',
                    'проф. Крис Ласковски (США, Колледж-Парк)',
                    'проф. А. С. Морозов (Россия, Новосибирск)',
                    'проф. А. М. Нуракунов (Кыргызстан, Бишкек)',
                    'проф. Е.Д. Нурсултанов',
                    'проф. Е. Нурхайдаров (США, Пенсильвания)',
                    'акад. НАН РК. Р.О. Ойнаров',
                    'акад. НАН РК М.О. Отелбаев',
                    'проф. А.В. Псху (Россия, Нальчик)',
                    'проф. М.И. Рамазанов',
                    'акад. НАН РК М.А. Садыбеков',
                    'проф. А.А. Степанова (Россия, Владивосток)',
                    'проф. С.В. Судоплатов (Россия, Новосибирск)',
                    'акад. РАН И.А. Тайманов (Россия, Новосибирск)',
                    'проф. Д.А. Тусупов',
                    'акад. НАН РК У.У. Умирбаев (США, Детройт)',
                    'проф. Франк Вагнер (Франция, Лион)',
                    'проф. Б.И. Зильбер (Великобритания, Оксфорд)',
                  ].map((member, idx) => (
                    <div key={idx}>{member}</div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center my-16">
            <h2 className="section-title mx-auto">{t('committee.orgTitle')}</h2>
          </div>
          
          <div className="card-bordered max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-cool-sky flex items-center justify-center flex-shrink-0">
                <FiUsers className="text-white" size={24} />
              </div>
              <div>
                <div className="text-gray-700 leading-relaxed mb-4">
                  <strong>
                    {i18n.language === 'kz'
                      ? 'Төраға:'
                      : i18n.language === 'en'
                      ? 'Chairman:'
                      : 'Председатель:'}
                  </strong>
                  {' '}
                  {i18n.language === 'kz'
                    ? 'Академик Е. А. Бөкетов атындағы ҚарҰЗУ Басқарма мүшесі – ғылыми жұмыс жөніндегі проректор, проф. Е. М. Тажбаев'
                    : i18n.language === 'en'
                    ? 'Member of the Board - Vice-Rector for Research of Buketov Karaganda National Research University, prof. E.M. Tazhbayev'
                    : 'Член правления — проректор по научной работе КарНИУ имени академика Е.А. Букетова, проф. Е.М. Тажбаев'}
                </div>
                <div className="pl-6 text-gray-600 border-l-2 border-gray-200 mb-4">
                  <strong>
                    {i18n.language === 'kz'
                      ? 'Төрағаның орынбасары:'
                      : i18n.language === 'en'
                      ? 'Co-chairman:'
                      : 'Сопредседатель:'}
                  </strong>
                  {' '}
                  {i18n.language === 'kz'
                    ? 'МжАТ факультетінің деканы А. О. Танин'
                    : i18n.language === 'en'
                    ? 'Dean of the Faculty of MandIT A.O. Tanin'
                    : 'Декан факультета МиИТ А.О. Танин'}
                </div>
                <div className="pl-6 text-gray-700 leading-relaxed mb-2">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      {i18n.language === 'kz'
                        ? 'МиИТ факультетінің деканының ғылыми жұмыс жөніндегі орынбасары С.К. Жумагулова'
                        : i18n.language === 'en'
                        ? 'Deputy Dean for Science, Faculty of MandIT S.K. Zhumagulova'
                        : 'Зам. декана по науке С.К. Жумагулова'}
                    </li>
                    <li>У.А. Косыбаева</li>
                    <li>Ж.М. Тулеутаева</li>
                    <li>Р.А. Кайыров</li>
                    <li>Н.В. Попова</li>
                    <li>М.Т. Касыметова</li>
                    <li>О.И. Ульбрихт</li>
                    <li>Г.Е. Жумабекова</li>
                    <li>А.К. Исаева</li>
                    <li>М.Т. Омарова</li>
                    <li>Н.М. Мусина</li>
                    <li>И.О. Тунгушбаева</li>
                    <li>А.Р. Яруллина</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
