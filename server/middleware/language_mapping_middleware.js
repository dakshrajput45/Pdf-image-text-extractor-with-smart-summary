const languageMapping = {
    english: 'eng',
    spanish: 'spa',
    french: 'fra',
    german: 'deu',
    italian: 'ita',
    hindi: 'hin',
};

exports.mapLanguage = (req, res, next) => {
    const { language } = req.query;
    console.log(language);

    if (!language) {
        return res.status(400).json({ error: 'Language is required' });
    }

    const langCode = languageMapping[language.toLowerCase()];

    if (!langCode) {
        return res.status(400).json({ error: 'Unsupported language' });
    }

    req.langCode = langCode;
    next();
};