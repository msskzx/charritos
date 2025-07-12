import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const arabicSentences = [
  'يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِمَّا رَزَقْنَاكُم مِّن قَبْلِ أَن يَأْتِيَ يَوْمٌ لَّا بَيْعٌ فِيهِ وَلَا خُلَّةٌ وَلَا شَفَاعَةٌ ۗ وَالْكَافِرُونَ هُمُ الظَّالِمُونَ ﴿٢٥٤ البقرة﴾',
  'الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ ثُمَّ لَا يُتْبِعُونَ مَا أَنفَقُوا مَنًّا وَلَا أَذًى ۙ لَّهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ ﴿٢٦٢ البقرة﴾',
  'يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُم مِّنَ الْأَرْضِ ۖ وَلَا تَيَمَّمُوا الْخَبِيثَ مِنْهُ تُنفِقُونَ وَلَسْتُم بِآخِذِيهِ إِلَّا أَن تُغْمِضُوا فِيهِ ۚ وَاعْلَمُوا أَنَّ اللَّهَ غَنِيٌّ حَمِيدٌ ﴿٢٦٧ البقرة﴾',
  'وَالَّذِينَ إِذَا أَنفَقُوا لَمْ يُسْرِفُوا وَلَمْ يَقْتُرُوا وَكَانَ بَيْنَ ذَٰلِكَ قَوَامًا ﴿٦٧ الفرقان﴾',
  'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ ﴿٣ البقرة﴾',
  'وَأَنفِقُوا فِي سَبِيلِ اللَّهِ وَلَا تُلْقُوا بِأَيْدِيكُمْ إِلَى التَّهْلُكَةِ ۛ وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ ﴿١٩٥ البقرة﴾',
  'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ لِمَن يَشَاءُ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ ﴿٢٦١ البقرة﴾',
  'الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ ﴿٢٧٤ البقرة﴾',
  'لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ ۚ وَمَا تُنفِقُوا مِن شَيْءٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ ﴿٩٢ آل عمران﴾',
  'الَّذِينَ يُنفِقُونَ فِي السَّرَّاءِ وَالضَّرَّاءِ وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ ۗ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ ﴿١٣٤ آل عمران﴾',
  'آمِنُوا بِاللَّهِ وَرَسُولِهِ وَأَنفِقُوا مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ ۖ فَالَّذِينَ آمَنُوا مِنكُمْ وَأَنفَقُوا لَهُمْ أَجْرٌ كَبِيرٌ ﴿7 الحديد﴾',
  'وَأَنفِقُوا مِن مَّا رَزَقْنَاكُم مِّن قَبْلِ أَن يَأْتِيَ أَحَدَكُمُ الْمَوْتُ فَيَقُولَ رَبِّ لَوْلَا أَخَّرْتَنِي إِلَىٰ أَجَلٍ قَرِيبٍ فَأَصَّدَّقَ وَأَكُن مِّنَ الصَّالِحِينَ ﴿10 المنافقون﴾',
  'فَاتَّقُوا اللَّهَ مَا اسْتَطَعْتُمْ وَاسْمَعُوا وَأَطِيعُوا وَأَنفِقُوا خَيْرًا لِّأَنفُسِكُمْ ۗ وَمَن يُوقَ شُحَّ نَفْسِهِ فَأُولَـٰئِكَ هُمُ الْمُفْلِحُونَ ﴿16 التغابن﴾',
];

const ArabicSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % arabicSentences.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => setIndex(i);
  const goPrev = () => setIndex((prev) => (prev - 1 + arabicSentences.length) % arabicSentences.length);
  const goNext = () => setIndex((prev) => (prev + 1) % arabicSentences.length);

  return (
    <div className="w-full flex flex-col justify-center items-center py-10 bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 h-72 md:h-96 lg:h-[32rem] min-h-[8rem] max-h-[40rem] relative">
      <div
        className="text-xl md:text-2xl lg:text-4xl text-center text-black dark:text-white font-bold mb-10"
        style={{
          fontFamily: 'Amiri, serif',
          direction: 'rtl',
          letterSpacing: '0.01em',
          lineHeight: '2.8rem',
          maxWidth: '900px',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        {arabicSentences[index]}
      </div>
      <div className="flex justify-center items-center gap-2 absolute bottom-0 left-0 right-0 pb-12">
        <button
          aria-label="Previous slide"
          onClick={goPrev}
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold text-sm hover:bg-yellow-200 dark:hover:bg-yellow-600 transition-colors border border-gray-300 dark:border-gray-600 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {arabicSentences.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              i === index
                ? 'bg-yellow-400 border-yellow-500 scale-110 shadow'
                : 'bg-transparent border-gray-400 hover:bg-yellow-200 dark:hover:bg-yellow-600'
            }`}
            style={{ outline: 'none' }}
          />
        ))}
        <button
          aria-label="Next slide"
          onClick={goNext}
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold text-sm hover:bg-yellow-200 dark:hover:bg-yellow-600 transition-colors border border-gray-300 dark:border-gray-600 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default ArabicSlider; 