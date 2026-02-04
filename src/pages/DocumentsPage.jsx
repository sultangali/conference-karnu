import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiFileText, FiFile, FiExternalLink, FiInfo } from 'react-icons/fi';

const DocumentsPage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    const t = setTimeout(scrollToTop, 10);
    return () => clearTimeout(t);
  }, []);

  const infoLetters = [
    { lang: 'kz', name: 'Қазақша', file: '/documents/kz/info_letter_kz.docx', flag: '' },
    { lang: 'ru', name: 'Русский', file: '/documents/ru/info_letter_ru.docx', flag: '' },
    { lang: 'en', name: 'English', file: '/documents/en/info_letter_en.docx', flag: '' },
  ];

  const latexTemplates = [
    { lang: 'kz', name: 'Қазақша', file: '/documents/templates/latex_kz.tex', flag: '' },
    { lang: 'ru', name: 'Русский', file: '/documents/templates/latex_ru.tex', flag: '' },
    { lang: 'en', name: 'English', file: '/documents/templates/latex_en.tex', flag: '' },
  ];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container-professional">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-lg bg-brilliant-azure flex items-center justify-center mx-auto mb-6  mt-10 shadow-card">
            <FiDownload className="text-white" size={32} />
          </div>
          <h1 className="page-title mx-auto mb-4">{t('documents.title')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {i18n.language === 'kz'
              ? 'Конференция құжаттары мен үлгілерін жүктеп алыңыз'
              : i18n.language === 'en'
              ? 'Download conference documents and templates'
              : 'Скачайте документы и шаблоны конференции'}
          </p>
        </div>

        {/* Info Letters (DOCX) */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-cobalt-blue mb-2 flex items-center justify-center gap-3">
              <FiFileText className="text-brilliant-azure" />
              {t('documents.infoLetter')}
            </h2>
            <p className="text-gray-600 text-sm">
              {i18n.language === 'kz' ? 'DOCX форматында' : i18n.language === 'en' ? 'DOCX format' : 'Формат DOCX'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {infoLetters.map((letter) => (
              <a
                key={letter.lang}
                href={letter.file}
                download
                className="card hover:shadow-elevated transition-all hover:border-brilliant-azure border-2 border-transparent"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{letter.flag}</div>
                  <div className="w-16 h-16 rounded-lg bg-brilliant-azure/10 flex items-center justify-center mx-auto mb-4">
                    <FiFileText className="text-brilliant-azure" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-cobalt-blue mb-2">{letter.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{t('documents.infoLetter')}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-brilliant-azure text-white font-semibold rounded-lg hover:bg-twitter-blue transition-colors">
                    <FiDownload size={16} />
                    <span>{t('documents.download')}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
{/* 
          <div className="mt-8 max-w-5xl mx-auto card-bordered bg-yellow-50 border-yellow-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <FiInfo className="text-yellow-700" size={20} />
              </div>
              <div>
                <p className="font-semibold text-yellow-900 mb-1">
                  {i18n.language === 'kz' ? 'Ескерту' : i18n.language === 'en' ? 'Note' : 'Примечание'}
                </p>
                <p className="text-sm text-yellow-800">
                  {i18n.language === 'kz'
                    ? 'Егер құжаттар жүктелмесе, оларды client/public/documents/ папкасына қосқаныңызды тексеріңіз'
                    : i18n.language === 'en'
                    ? 'If documents don\'t download, ensure files are in client/public/documents/'
                    : 'Если документы не загружаются, убедитесь, что файлы добавлены в client/public/documents/'}
                </p>
              </div>
            </div>
          </div> */}
        </section>

        {/* LaTeX templates (.tex) — 3 languages */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-cobalt-blue mb-2 flex items-center justify-center gap-3">
              <FiFile className="text-cool-sky" />
              {t('documents.templates')}
            </h2>
            <p className="text-gray-600 text-sm">
              LaTeX (.tex) — {i18n.language === 'kz' ? 'үш тілде' : i18n.language === 'en' ? 'in three languages' : 'на трёх языках'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {latexTemplates.map((template) => (
              <a
                key={template.lang}
                href={template.file}
                download
                className="card hover:shadow-elevated transition-all hover:border-cool-sky border-2 border-transparent"
              >
                <div className="text-center">
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-cool-sky text-white text-xs font-bold rounded-full uppercase">
                      .tex
                    </span>
                  </div>
                  <div className="text-4xl mb-4">{template.flag}</div>
                  <div className="w-16 h-16 rounded-lg bg-cool-sky/10 flex items-center justify-center mx-auto mb-4">
                    <FiFile className="text-cool-sky" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-cobalt-blue mb-2">{template.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">LaTeX {t('documents.template')}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-cool-sky text-white font-semibold rounded-lg hover:bg-brilliant-azure transition-colors">
                    <FiDownload size={16} />
                    <span>{t('documents.download')}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section>
          <div className="card-bordered max-w-5xl mx-auto bg-alice-blue/50">
            <h3 className="text-2xl font-bold text-cobalt-blue mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brilliant-azure flex items-center justify-center">
                <FiInfo className="text-white" size={20} />
              </div>
              {i18n.language === 'kz' ? 'Нұсқаулық' : i18n.language === 'en' ? 'Instructions' : 'Инструкция'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-brilliant-azure text-white flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">
                  {i18n.language === 'kz' 
                    ? 'Тезистерді conf.karaganda.2026@mail.ru электрондық пошта мекенжайына жіберіңіз'
                    : i18n.language === 'en'
                    ? 'Send abstracts to conf.karaganda.2026@mail.ru'
                    : 'Отправляйте тезисы на адрес conf.karaganda.2026@mail.ru'}
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-brilliant-azure text-white flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">
                  {i18n.language === 'kz'
                    ? 'Мерзім: 2026 жылдың 15 мамыры'
                    : i18n.language === 'en'
                    ? 'Deadline: May 15, 2026'
                    : 'Срок: 15 мая 2026 года'}
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-brilliant-azure text-white flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">
                  {i18n.language === 'kz'
                    ? 'Барлық сұрақтар бойынша: +7 775 151 03 36 (Мусина Н.М.)'
                    : i18n.language === 'en'
                    ? 'For questions: +7 775 151 03 36 (Mussina N.M.)'
                    : 'По всем вопросам: +7 775 151 03 36 (Мусина Н.М.)'}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSchIYdEj8Hi2RwRYgcxuTIJxOWvrHDw6ByjH30Tmz7UDQ3ugg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-brilliant-azure font-semibold rounded-lg hover:shadow-card transition-all border-2 border-brilliant-azure"
              >
                <FiExternalLink />
                <span>{t('documents.googleFormRegistration')}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocumentsPage;
